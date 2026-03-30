// ─ QuizPage — Honeycomb Kingdom Design
// ─ Timer runs continuously; never resets between retries or hint reveals
// ─ Wrong answer progressively reveals hints: Hint1 → Hint2 → Hint3 → final answer
// ─ Questions with choices[] always show A/B/C/D tap targets (both modes)
// ─ Tap mode: auto-generated 4-choice buttons for open-ended questions
// ─ All bg colors use inline style (Tailwind v4 CSS-var generation gap fix)
// ─ Landscape layout: two-column (question left, input/hints right) fits Fire 10 800px height
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useLocation, useParams } from "wouter";
import { getTopic, Question } from "@/data/questions";
import { useProgress } from "@/hooks/useProgress";
import { useInputMode } from "@/hooks/useInputMode";
import { playCorrect, playWrong, playHint, playFanfare } from "@/hooks/useSounds";
import InputModeToggle from "@/components/InputModeToggle";
import ClockFace from "@/components/ClockFace";

const QUESTION_TIME = 60;

// ── Helpers ────────────────────────────────────────────────────────────────
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalizeAnswer(s: string): string {
  return s.toLowerCase()
    .replace(/\s+/g, "").replace(/,/g, "").replace(/\$/g, "")
    .replace(/meters?/g, "").replace(/feet?/g, "").replace(/ft/g, "")
    .replace(/cm/g, "").replace(/km/g, "").replace(/kg/g, "")
    .replace(/ml/g, "").replace(/minutes?/g, "").replace(/hours?/g, "")
    .replace(/days?/g, "").replace(/miles?/g, "").replace(/sq/g, "")
    .replace(/square/g, "").trim();
}

function checkAnswer(userAnswer: string, correctAnswer: string): boolean {
  const u = normalizeAnswer(userAnswer);
  const c = normalizeAnswer(correctAnswer);
  if (u === c) return true;
  const uNum = parseFloat(userAnswer.replace(/[^0-9./-]/g, ""));
  const cNum = parseFloat(correctAnswer.replace(/[^0-9./-]/g, ""));
  if (!isNaN(uNum) && !isNaN(cNum) && Math.abs(uNum - cNum) < 0.01) return true;
  return false;
}

/** Generate 3 plausible wrong answers from the correct answer */
function generateDistractors(correct: string): string[] {
  const distractors: string[] = [];
  const num = parseFloat(correct.replace(/[^0-9./-]/g, ""));

  if (!isNaN(num) && num > 0) {
    const offsets = shuffleArray([
      Math.round(num * 0.8), Math.round(num * 1.2),
      num + 1, num - 1, num + 2, num - 2,
      num + 5, num - 5, Math.round(num * 1.5), Math.round(num / 2),
    ].filter(v => v > 0 && String(Math.round(v)) !== String(Math.round(num))));

    for (const v of offsets) {
      const candidate = correct.includes(".") ? v.toFixed(1) : String(Math.round(v));
      const formatted = correct.replace(/\d+(\.\d+)?/, candidate);
      if (formatted !== correct && !distractors.includes(formatted)) {
        distractors.push(formatted);
        if (distractors.length >= 3) break;
      }
    }
  }

  if (correct.includes("/") && distractors.length < 3) {
    const [n, d] = correct.split("/").map(Number);
    const candidates = [
      `${n + 1}/${d}`, `${Math.max(1, n - 1)}/${d}`,
      `${n}/${d + 1}`, `${n + 1}/${d + 1}`,
    ].filter(c => c !== correct);
    for (const c of candidates) {
      if (!distractors.includes(c) && distractors.length < 3) distractors.push(c);
    }
  }

  while (distractors.length < 3) {
    distractors.push(`${distractors.length + 2}`);
  }

  return distractors.slice(0, 3);
}

// ── Choice button colours ──────────────────────────────────────────────────
const CHOICE_COLORS = [
  { bg: "#EFF6FF", border: "#93C5FD", text: "#1D4ED8", sel: "#2563EB" },
  { bg: "#F0FDF4", border: "#86EFAC", text: "#166534", sel: "#16A34A" },
  { bg: "#FFF7ED", border: "#FDB47A", text: "#9A3412", sel: "#EA580C" },
  { bg: "#FDF4FF", border: "#E879F9", text: "#86198F", sel: "#A21CAF" },
];
const CHOICE_LABELS = ["A", "B", "C", "D"];

// ── State machine for a single question ───────────────────────────────────
type QState = "answering" | "wrong_h0" | "wrong_h1" | "wrong_h2" | "wrong_h3" | "correct" | "timed_out";

const HINT_STATES: QState[] = ["wrong_h0", "wrong_h1", "wrong_h2", "wrong_h3"];
const hintsRevealedForState = (s: QState): number => {
  if (s === "wrong_h0") return 1;
  if (s === "wrong_h1") return 2;
  if (s === "wrong_h2") return 3;
  if (s === "wrong_h3") return 3;
  return 0;
};
const isDone = (s: QState) => s === "correct" || s === "timed_out" || s === "wrong_h3";

// ── Component ─────────────────────────────────────────────────────────────
export default function QuizPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const [, navigate] = useLocation();
  const topic = getTopic(topicId);
  const { recordAnswer } = useProgress();
  const { mode } = useInputMode();
  const isTap = mode === "tap";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [qState, setQState] = useState<QState>("answering");
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionAnswered, setSessionAnswered] = useState(0);
  const [questionKey, setQuestionKey] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [shakeInput, setShakeInput] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordedRef = useRef(false);

  useEffect(() => {
    if (!topic) return;
    setQuestions(shuffleArray(topic.questions));
  }, [topic]);

  useEffect(() => {
    if (questions.length === 0 || isTap) return;
    const t = setTimeout(() => inputRef.current?.focus(), 40);
    return () => clearTimeout(t);
  }, [questionKey, questions.length, isTap]);

  useEffect(() => {
    if (isDone(qState) || questions.length === 0) {
      clearInterval(timerRef.current!);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current!); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionKey, questions.length]);

  useEffect(() => {
    if (timeLeft === 0 && !isDone(qState)) {
      if (!recordedRef.current) {
        recordedRef.current = true;
        recordAnswer(topicId, currentQ?.id ?? "", false);
        setSessionAnswered(s => s + 1);
      }
      setQState("timed_out");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const currentQ = questions[currentIdx];

  const choices = useMemo(() => {
    if (!currentQ) return [];
    if (currentQ.choices && currentQ.choices.length >= 2) return currentQ.choices;
    return shuffleArray([currentQ.answer, ...generateDistractors(currentQ.answer)]);
  }, [currentQ]);

  const showChoices = !!(currentQ?.choices?.length) || isTap;

  const handleSubmit = useCallback((answerOverride?: string) => {
    if (!currentQ || isDone(qState)) return;
    const answer = answerOverride ?? userAnswer;
    if (!answer.trim()) return;

    const correct = checkAnswer(answer, currentQ.answer);

    if (correct) {
      clearInterval(timerRef.current!);
      if (!recordedRef.current) {
        recordedRef.current = true;
        recordAnswer(topicId, currentQ.id, true);
        setSessionAnswered(s => s + 1);
        setSessionCorrect(s => s + 1);
      }
      if (currentIdx + 1 >= questions.length) setTimeout(() => playFanfare(), 80);
      else playCorrect();
      setQState("correct");
    } else {
      if (!recordedRef.current) {
        recordedRef.current = true;
        recordAnswer(topicId, currentQ.id, false);
        setSessionAnswered(s => s + 1);
      }
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
      playWrong();
      const hintIdx = HINT_STATES.indexOf(qState);
      if (hintIdx === -1) {
        setQState("wrong_h0");
        setTimeout(() => playHint(), 400);
      } else if (hintIdx < HINT_STATES.length - 1) {
        setQState(HINT_STATES[hintIdx + 1]);
        setTimeout(() => playHint(), 400);
      }
      setUserAnswer("");
      setSelectedChoice(null);
    }
  }, [currentQ, qState, userAnswer, topicId, recordAnswer, currentIdx, questions.length]);

  const handleChoiceSelect = useCallback((choice: string) => {
    if (isDone(qState)) return;
    setSelectedChoice(choice);
    setUserAnswer(choice);
    setTimeout(() => handleSubmit(choice), 100);
  }, [qState, handleSubmit]);

  const handleNext = useCallback(() => {
    if (currentIdx + 1 >= questions.length) {
      navigate(`/results?topic=${topicId}`);
      return;
    }
    setCurrentIdx(i => i + 1);
    setUserAnswer("");
    setSelectedChoice(null);
    setQState("answering");
    setTimeLeft(QUESTION_TIME);
    setQuestionKey(k => k + 1);
    recordedRef.current = false;
    setTimeout(() => inputRef.current?.focus(), 80);
  }, [currentIdx, questions.length, navigate, topicId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!isDone(qState) && userAnswer.trim()) handleSubmit();
      else if (isDone(qState)) handleNext();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return;
      if (document.activeElement === inputRef.current) return;
      if (isDone(qState)) { e.preventDefault(); handleNext(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [qState, handleNext]);

  if (!topic || questions.length === 0) {
    return (
      <div className="min-h-screen honeycomb-bg flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bee-float">🐝</div>
          <p className="font-display text-xl text-amber-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  const timerPct = (timeLeft / QUESTION_TIME) * 100;
  const timerColor = timeLeft > 30 ? "#22C55E" : timeLeft > 10 ? "#F97316" : "#EF4444";
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference * (1 - timerPct / 100);

  const hintsToShow = hintsRevealedForState(qState);
  const done = isDone(qState);

  const hintMeta = [
    { label: "Hint 1 — Hardest Clue 🔴", cls: "hint-hard", color: "#EF4444" },
    { label: "Hint 2 — Medium Clue 🟠", cls: "hint-medium", color: "#F97316" },
    { label: "Hint 3 — Easiest Clue 🟢", cls: "hint-easy", color: "#22C55E" },
  ];

  const feedbackMsg = () => {
    if (qState === "correct") return { emoji: "🎉", title: "Correct! Amazing! 🌟", sub: `Answer: ${currentQ.answer}`, bg: "#F0FDF4", border: "#BBF7D0", titleColor: "#166534", subColor: "#16A34A" };
    if (qState === "timed_out") return { emoji: "⏰", title: "Time's up!", sub: `Correct answer: ${currentQ.answer}`, bg: "#FFF7ED", border: "#FED7AA", titleColor: "#C2410C", subColor: "#EA580C" };
    if (qState === "wrong_h3") return { emoji: "💡", title: "Here's the answer!", sub: `Correct answer: ${currentQ.answer}`, bg: "#FEF2F2", border: "#FECACA", titleColor: "#991B1B", subColor: "#DC2626" };
    if (qState === "wrong_h0") return { emoji: "😅", title: "Not quite! Here's a hint...", sub: "", bg: "#FEF9C3", border: "#FDE68A", titleColor: "#92400E", subColor: "" };
    if (qState === "wrong_h1") return { emoji: "🤔", title: "Try again! One more hint...", sub: "", bg: "#FEF9C3", border: "#FDE68A", titleColor: "#92400E", subColor: "" };
    if (qState === "wrong_h2") return { emoji: "💪", title: "Almost there! Final hint...", sub: "", bg: "#FEF9C3", border: "#FDE68A", titleColor: "#92400E", subColor: "" };
    return null;
  };
  const fb = feedbackMsg();

  return (
    /* Outer wrapper: portrait = scrollable, landscape = fixed viewport height */
    <div className="quiz-page-wrapper honeycomb-bg">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-200 shadow-sm quiz-header">
        <div className="container flex items-center gap-2 py-2">
          <button onClick={() => navigate(`/topic/${topicId}`)} className="text-amber-600 hover:text-amber-800 font-bold transition-colors text-sm">
            ← Back
          </button>
          <span className="text-xl">{topic.emoji}</span>
          <h1 className="font-display text-base text-amber-700 flex-1 truncate">{topic.name}</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-green-600">✓ {sessionCorrect}/{sessionAnswered}</span>
            <span className="text-xs text-amber-500 font-semibold hidden sm:inline">Q {currentIdx + 1}/{questions.length}</span>
            <InputModeToggle />
          </div>
        </div>
        <div className="h-1" style={{ backgroundColor: "#FEF3C7" }}>
          <div className="h-full honey-bar transition-all duration-300"
            style={{ width: `${(currentIdx / questions.length) * 100}%` }} />
        </div>
      </header>

      {/* ── Main content: portrait = single column, landscape = two columns ── */}
      <main className="quiz-main container">
        {/* ── LEFT COLUMN: Timer + Question ── */}
        <div className="quiz-left">
          {/* Difficulty badge + counter */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-600">Q {currentIdx + 1} / {questions.length}</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              currentQ.difficulty === "easy" ? "badge-easy" :
              currentQ.difficulty === "medium" ? "badge-medium" : "badge-hard"
            }`}>
              {currentQ.difficulty.charAt(0).toUpperCase() + currentQ.difficulty.slice(1)}
            </span>
          </div>

          {/* Timer + Question card */}
          <div className="bg-white rounded-2xl border border-amber-100 shadow-xl overflow-hidden animate-float-up" key={questionKey}>
            <div className="p-4">
              <div className="flex items-start gap-4">
                {/* Circular timer */}
                <div className="flex-shrink-0 relative quiz-timer-size">
                  <svg className="quiz-timer-size -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#FEF3C7" strokeWidth="8" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke={timerColor} strokeWidth="8"
                      strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset}
                      style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s ease" }} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display quiz-timer-text" style={{ color: timerColor }}>{timeLeft}</span>
                    <span className="text-xs text-gray-400">sec</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-body quiz-question-text font-bold text-gray-800 leading-snug">{currentQ.question}</p>
                  {/* Render analog clock(s) for time questions */}
                  {currentQ.clockTime && (
                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                      <div className="flex flex-col items-center gap-1">
                        {currentQ.clockTime2 && (
                          <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">Start</span>
                        )}
                        <ClockFace time={currentQ.clockTime} size={120} />
                      </div>
                      {currentQ.clockTime2 && (
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">End</span>
                          <ClockFace time={currentQ.clockTime2} size={120} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Manual hint reveal buttons — shown in left column on landscape */}
            {qState === "answering" && (
              <div className="px-4 pb-4 quiz-hints-left-only">
                <div className="border-t border-amber-100 pt-3">
                  <p className="text-xs font-bold text-amber-600 mb-2 uppercase tracking-wide">🔍 Need a hint?</p>
                  <div className="space-y-1.5">
                    {hintMeta.map((h, i) => (
                      <button key={i}
                        onClick={() => {
                          if (i === 0) setQState("wrong_h0");
                          else if (i === 1) setQState("wrong_h1");
                          else setQState("wrong_h2");
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl border-2 border-dashed font-semibold text-xs transition-all"
                        style={{ borderColor: h.color, color: h.color }}>
                        👁 Reveal {h.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN: Input + Hints + Feedback + Next ── */}
        <div className="quiz-right">

          {/* ── CHOICE BUTTONS ── */}
          {showChoices && (
            <div className="quiz-section">
              {!done && (
                <>
                  <p className="text-xs font-bold text-amber-500 uppercase tracking-wide mb-2">
                    {isTap ? "👆 Tap your answer" : "Choose the correct answer"}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {choices.map((choice, i) => {
                      const c = CHOICE_COLORS[i % CHOICE_COLORS.length];
                      const isSelected = selectedChoice === choice;
                      return (
                        <button key={choice} onClick={() => handleChoiceSelect(choice)}
                          className="rounded-xl quiz-choice-btn font-display font-bold transition-all active:scale-95 text-left flex items-center gap-2"
                          style={{
                            backgroundColor: isSelected ? c.sel : c.bg,
                            color: isSelected ? "#FFFFFF" : c.text,
                            border: `2px solid ${isSelected ? c.sel : c.border}`,
                            boxShadow: isSelected ? `0 4px 12px ${c.sel}44` : "0 1px 3px rgba(0,0,0,0.06)",
                          }}>
                          <span className="text-xs font-black opacity-60">{CHOICE_LABELS[i]}.</span>
                          <span>{choice}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
              {done && (
                <div className="grid grid-cols-2 gap-2">
                  {choices.map((choice, i) => {
                    const c = CHOICE_COLORS[i % CHOICE_COLORS.length];
                    const isCorrectChoice = checkAnswer(choice, currentQ.answer);
                    const wasSelected = selectedChoice === choice;
                    let bg = c.bg, border = c.border, color = c.text;
                    if (isCorrectChoice) { bg = "#F0FDF4"; border = "#22C55E"; color = "#166534"; }
                    else if (wasSelected && !isCorrectChoice) { bg = "#FEF2F2"; border = "#EF4444"; color = "#991B1B"; }
                    return (
                      <div key={choice} className="rounded-xl quiz-choice-btn font-display font-bold flex items-center gap-2 relative"
                        style={{ backgroundColor: bg, border: `2px solid ${border}`, color }}>
                        <span className="text-xs font-black opacity-60">{CHOICE_LABELS[i]}.</span>
                        <span>{choice}</span>
                        {isCorrectChoice && <span className="absolute top-0.5 right-1.5 text-sm">✅</span>}
                        {wasSelected && !isCorrectChoice && <span className="absolute top-0.5 right-1.5 text-sm">❌</span>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── KEYBOARD TEXT INPUT ── */}
          {!showChoices && !done && (
            <div className="quiz-section">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={userAnswer}
                  onChange={e => setUserAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your answer here..."
                  className={`answer-input flex-1 border-2 rounded-xl px-3 py-2.5 font-bold text-base text-gray-800 bg-amber-50 focus:bg-white transition-all ${shakeInput ? "animate-shake-wrong" : ""}`}
                  autoFocus
                />
                <button
                  onClick={() => handleSubmit()}
                  disabled={!userAnswer.trim()}
                  className="px-4 py-2.5 text-white font-display text-base rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
                  style={{ backgroundColor: userAnswer.trim() ? "#F59E0B" : "#FCD34D" }}>
                  Check ✓
                </button>
              </div>
              {qState !== "answering" && (
                <p className="text-xs text-amber-500 font-semibold mt-1">Try again with the hint! 👆</p>
              )}
            </div>
          )}

          {/* ── FEEDBACK BANNER ── */}
          {fb && (
            <div className="quiz-section">
              <div className="p-3 rounded-xl animate-float-up flex items-center gap-2"
                style={{ backgroundColor: fb.bg, border: `1px solid ${fb.border}` }}>
                <span className="text-2xl">{fb.emoji}</span>
                <div>
                  <p className="font-bold text-sm" style={{ color: fb.titleColor }}>{fb.title}</p>
                  {fb.sub && <p className="text-xs font-semibold" style={{ color: fb.subColor }}>{fb.sub}</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── PROGRESSIVE HINTS (right column) ── */}
          {hintsToShow > 0 && (
            <div className="quiz-section">
              <div className="space-y-1.5">
                {hintMeta.slice(0, hintsToShow).map((h, i) => (
                  <div key={i} className={`${h.cls} rounded-xl p-2.5 animate-hint-drop`}>
                    <p className="text-xs font-bold mb-0.5" style={{ color: h.color }}>{h.label}</p>
                    <p className="text-xs text-gray-700 font-medium">{currentQ.hints[i]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── MANUAL HINT REVEAL (portrait only — landscape shows in left column) ── */}
          {qState === "answering" && (
            <div className="quiz-section quiz-hints-portrait-only">
              <div className="border-t border-amber-100 pt-3">
                <p className="text-xs font-bold text-amber-600 mb-2 uppercase tracking-wide">🔍 Need a hint? (Try without first!)</p>
                <div className="space-y-1.5">
                  {hintMeta.map((h, i) => (
                    <button key={i}
                      onClick={() => {
                        if (i === 0) setQState("wrong_h0");
                        else if (i === 1) setQState("wrong_h1");
                        else setQState("wrong_h2");
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl border-2 border-dashed font-semibold text-xs transition-all"
                      style={{ borderColor: h.color, color: h.color }}>
                      👁 Reveal {h.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── NEXT BUTTON ── */}
          {done && (
            <div className="quiz-section">
              <button onClick={handleNext}
                className="w-full py-3 text-white font-display text-lg rounded-2xl shadow-md transition-all active:scale-95"
                style={{ backgroundColor: "#6366F1" }}>
                {currentIdx + 1 >= questions.length ? "Finish 🏁" : "Next Question →"}
              </button>
              <p className="text-center text-xs text-amber-400 mt-1.5 font-semibold">
                Press <kbd style={{background:'#FEF3C7', color:'#92400E', padding:'1px 5px', borderRadius:'4px', fontWeight:'bold'}}>Enter ↵</kbd> for next
              </p>
            </div>
          )}

          {/* Enter hint for keyboard mode */}
          {!done && !isTap && !showChoices && (
            <p className="text-center text-xs text-amber-400 font-semibold">
              Press <kbd style={{background:'#FEF3C7', color:'#92400E', padding:'1px 5px', borderRadius:'4px', fontWeight:'bold'}}>Enter ↵</kbd> to submit
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
