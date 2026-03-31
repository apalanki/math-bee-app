// ─ QuizPage — Geo-Explorer Style Layout
// ─ Full-height two-panel: large question text left, answer input/choices right
// ─ Timer runs continuously; never resets between retries or hint reveals
// ─ Wrong answer progressively reveals hints: Hint1 → Hint2 → Hint3 → final answer
// ─ Questions with choices[] always show A/B/C/D tap targets (both modes)
// ─ Tap mode: auto-generated 4-choice buttons for open-ended questions
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useLocation, useParams } from "wouter";
import { getTopic, Question } from "@/data/questions";
import { useProgress } from "@/hooks/useProgress";
import { useInputMode } from "@/hooks/useInputMode";
import { playCorrect, playWrong, playHint, playFanfare } from "@/hooks/useSounds";
import InputModeToggle from "@/components/InputModeToggle";
import ClockFace from "@/components/ClockFace";
import GeometryShape, { shouldShowShape } from "@/components/GeometryShape";

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
export default function QuizPage({ topicId: topicIdProp }: { topicId?: string }) {
  const params = useParams<{ topicId: string }>();
  const topicId = topicIdProp ?? params.topicId;
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

  // Reset all session state whenever the topic changes
  useEffect(() => {
    if (!topic) return;
    setQuestions(shuffleArray(topic.questions));
    setCurrentIdx(0);
    setUserAnswer("");
    setQState("answering");
    setTimeLeft(QUESTION_TIME);
    setSessionCorrect(0);
    setSessionAnswered(0);
    setQuestionKey(k => k + 1);
    setSelectedChoice(null);
    recordedRef.current = false;
    clearInterval(timerRef.current!);
  }, [topicId]); // eslint-disable-line react-hooks/exhaustive-deps

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
    { label: "Hint 1 🔴", cls: "hint-hard", color: "#EF4444" },
    { label: "Hint 2 🟠", cls: "hint-medium", color: "#F97316" },
    { label: "Hint 3 🟢", cls: "hint-easy", color: "#22C55E" },
  ];

  const feedbackMsg = () => {
    if (qState === "correct") return { emoji: "🎉", title: "Correct!", sub: `Answer: ${currentQ.answer}`, bg: "#F0FDF4", border: "#BBF7D0", titleColor: "#166534", subColor: "#16A34A" };
    if (qState === "timed_out") return { emoji: "⏰", title: "Time's up!", sub: `Answer: ${currentQ.answer}`, bg: "#FFF7ED", border: "#FED7AA", titleColor: "#C2410C", subColor: "#EA580C" };
    if (qState === "wrong_h3") return { emoji: "💡", title: "Here's the answer!", sub: `Answer: ${currentQ.answer}`, bg: "#FEF2F2", border: "#FECACA", titleColor: "#991B1B", subColor: "#DC2626" };
    if (qState === "wrong_h0") return { emoji: "😅", title: "Not quite! Here's a hint...", sub: "", bg: "#FEF9C3", border: "#FDE68A", titleColor: "#92400E", subColor: "" };
    if (qState === "wrong_h1") return { emoji: "🤔", title: "Try again! One more hint...", sub: "", bg: "#FEF9C3", border: "#FDE68A", titleColor: "#92400E", subColor: "" };
    if (qState === "wrong_h2") return { emoji: "💪", title: "Almost there! Final hint...", sub: "", bg: "#FEF9C3", border: "#FDE68A", titleColor: "#92400E", subColor: "" };
    return null;
  };
  const fb = feedbackMsg();

  const hasVisual = currentQ.clockTime || (currentQ.topicId === 'geometry' && shouldShowShape(currentQ.question));

  return (
    <div className="qp-wrapper honeycomb-bg">
      {/* ── Slim top bar ── */}
      <header className="qp-header bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="qp-header-inner">
          <button
            onClick={() => navigate(`/topic/${topicId}`)}
            className="qp-back-btn text-amber-600 hover:text-amber-800 font-bold transition-colors"
          >
            ← Back
          </button>
          <span className="text-lg">{topic.emoji}</span>
          <h1 className="qp-topic-name font-display text-amber-700 truncate flex-1">{topic.name}</h1>
          <span className="qp-counter text-amber-500 font-bold">Q {currentIdx + 1}/{questions.length}</span>
          <span className="qp-score text-green-600 font-bold">✓ {sessionCorrect}/{sessionAnswered}</span>
          <InputModeToggle />
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-amber-100">
          <div className="h-full honey-bar transition-all duration-300"
            style={{ width: `${(currentIdx / questions.length) * 100}%` }} />
        </div>
      </header>

      {/* ── Two-panel body ── */}
      <div className="qp-body">

        {/* ── LEFT PANEL: Question text (maximized) ── */}
        <div className="qp-left">
          <div className="qp-question-card" key={questionKey}>
            {/* Floating timer circle — top right corner */}
            <div className="qp-timer-float">
              <svg className="qp-timer-svg -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#FEF3C7" strokeWidth="9" />
                <circle cx="50" cy="50" r="45" fill="none" stroke={timerColor} strokeWidth="9"
                  strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset}
                  style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s ease" }} />
              </svg>
              <div className="qp-timer-label">
                <span className="qp-timer-num" style={{ color: timerColor }}>{timeLeft}</span>
                <span className="qp-timer-unit">sec</span>
              </div>
            </div>

            {/* Difficulty badge */}
            <div className="qp-difficulty-badge">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                currentQ.difficulty === "easy" ? "badge-easy" :
                currentQ.difficulty === "medium" ? "badge-medium" : "badge-hard"
              }`}>
                {currentQ.difficulty.charAt(0).toUpperCase() + currentQ.difficulty.slice(1)}
              </span>
            </div>

            {/* Question text — the star of the show */}
            <div className="qp-question-body">
              <p className="qp-question-text font-body font-bold text-gray-800 leading-relaxed">
                {currentQ.question}
              </p>

              {/* Geometry SVG shape */}
              {currentQ.topicId === 'geometry' && shouldShowShape(currentQ.question) && (
                <div className="qp-visual-area flex justify-center">
                  <GeometryShape question={currentQ.question} size={hasVisual ? 180 : 160} />
                </div>
              )}

              {/* Analog clock(s) */}
              {currentQ.clockTime && (
                <div className="qp-visual-area flex items-center gap-6 flex-wrap">
                  <div className="flex flex-col items-center gap-1">
                    {currentQ.clockTime2 && (
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">Start</span>
                    )}
                    <ClockFace time={currentQ.clockTime} size={140} />
                  </div>
                  {currentQ.clockTime2 && (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">End</span>
                      <ClockFace time={currentQ.clockTime2} size={140} />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Hints revealed in left panel */}
            {hintsToShow > 0 && (
              <div className="qp-hints-area">
                <div className="space-y-2">
                  {hintMeta.slice(0, hintsToShow).map((h, i) => (
                    <div key={i} className={`${h.cls} rounded-xl p-3 animate-hint-drop`}>
                      <p className="text-xs font-bold mb-0.5" style={{ color: h.color }}>{h.label}</p>
                      <p className="text-sm text-gray-700 font-medium">{currentQ.hints[i]}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL: Answer input / choices ── */}
        <div className="qp-right">
          <div className="qp-right-inner">

            {/* ── CHOICE BUTTONS ── */}
            {showChoices && (
              <div className="qp-answer-section">
                {!done ? (
                  <>
                    <p className="qp-answer-label">
                      {isTap ? "👆 Tap your answer" : "Choose the correct answer"}
                    </p>
                    <div className="qp-choices-grid">
                      {choices.map((choice, i) => {
                        const c = CHOICE_COLORS[i % CHOICE_COLORS.length];
                        const isSelected = selectedChoice === choice;
                        return (
                          <button key={choice} onClick={() => handleChoiceSelect(choice)}
                            className="qp-choice-btn font-display font-bold transition-all active:scale-95 text-left flex items-center gap-2"
                            style={{
                              backgroundColor: isSelected ? c.sel : c.bg,
                              color: isSelected ? "#FFFFFF" : c.text,
                              border: `2px solid ${isSelected ? c.sel : c.border}`,
                              boxShadow: isSelected ? `0 4px 12px ${c.sel}44` : "0 2px 6px rgba(0,0,0,0.06)",
                            }}>
                            <span className="qp-choice-label opacity-60">{CHOICE_LABELS[i]}.</span>
                            <span>{choice}</span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="qp-answer-label">Answer review</p>
                    <div className="qp-choices-grid">
                      {choices.map((choice, i) => {
                        const c = CHOICE_COLORS[i % CHOICE_COLORS.length];
                        const isCorrectChoice = checkAnswer(choice, currentQ.answer);
                        const wasSelected = selectedChoice === choice;
                        let bg = c.bg, border = c.border, color = c.text;
                        if (isCorrectChoice) { bg = "#F0FDF4"; border = "#22C55E"; color = "#166534"; }
                        else if (wasSelected && !isCorrectChoice) { bg = "#FEF2F2"; border = "#EF4444"; color = "#991B1B"; }
                        return (
                          <div key={choice} className="qp-choice-btn font-display font-bold flex items-center gap-2 relative"
                            style={{ backgroundColor: bg, border: `2px solid ${border}`, color }}>
                            <span className="qp-choice-label opacity-60">{CHOICE_LABELS[i]}.</span>
                            <span>{choice}</span>
                            {isCorrectChoice && <span className="absolute top-1 right-2 text-base">✅</span>}
                            {wasSelected && !isCorrectChoice && <span className="absolute top-1 right-2 text-base">❌</span>}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ── KEYBOARD TEXT INPUT ── */}
            {!showChoices && !done && (
              <div className="qp-answer-section">
                <p className="qp-answer-label">Type your answer</p>
                {currentQ.answerFormat && (
                  <p className="text-xs font-bold text-indigo-500 mb-2 flex items-center gap-1">
                    <span>📝</span> Format:
                    <span className="bg-indigo-50 border border-indigo-200 rounded px-1.5 py-0.5 font-mono text-indigo-700 ml-1">
                      {currentQ.answerFormat}
                    </span>
                  </p>
                )}
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={currentQ.answerFormat ? `e.g. ${currentQ.answerFormat}` : "Type your answer..."}
                    className={`qp-text-input flex-1 border-2 rounded-xl px-4 py-3 font-bold text-lg text-gray-800 bg-amber-50 focus:bg-white transition-all outline-none focus:border-amber-400 ${shakeInput ? "animate-shake-wrong" : ""}`}
                    autoFocus
                  />
                  <button
                    onClick={() => handleSubmit()}
                    disabled={!userAnswer.trim()}
                    className="qp-submit-btn px-5 py-3 text-white font-display font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
                    style={{ backgroundColor: userAnswer.trim() ? "#F59E0B" : "#FCD34D" }}>
                    Check ✓
                  </button>
                </div>
                {!done && !isTap && (
                  <p className="text-center text-xs text-amber-400 font-semibold mt-2">
                    Press <kbd style={{background:'#FEF3C7', color:'#92400E', padding:'1px 5px', borderRadius:'4px', fontWeight:'bold'}}>Enter ↵</kbd> to submit
                  </p>
                )}
              </div>
            )}

            {/* ── FEEDBACK BANNER ── */}
            {fb && (
              <div className="qp-feedback animate-float-up flex items-center gap-3"
                style={{ backgroundColor: fb.bg, border: `1.5px solid ${fb.border}` }}>
                <span className="text-3xl">{fb.emoji}</span>
                <div>
                  <p className="font-bold text-base" style={{ color: fb.titleColor }}>{fb.title}</p>
                  {fb.sub && <p className="text-sm font-semibold" style={{ color: fb.subColor }}>{fb.sub}</p>}
                </div>
              </div>
            )}

            {/* ── HINT REVEAL BUTTONS (when answering, no hints shown yet) ── */}
            {qState === "answering" && (
              <div className="qp-hint-buttons">
                <p className="text-xs font-bold text-amber-500 mb-2 uppercase tracking-wide">🔍 Need a hint?</p>
                <div className="space-y-2">
                  {hintMeta.map((h, i) => (
                    <button key={i}
                      onClick={() => {
                        if (i === 0) setQState("wrong_h0");
                        else if (i === 1) setQState("wrong_h1");
                        else setQState("wrong_h2");
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl border-2 border-dashed font-semibold text-xs transition-all hover:opacity-80"
                      style={{ borderColor: h.color, color: h.color }}>
                      👁 Reveal {h.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── NEXT BUTTON ── */}
            {done && (
              <div className="qp-next-section">
                <button onClick={handleNext}
                  className="w-full py-4 text-white font-display text-xl font-bold rounded-2xl shadow-md transition-all active:scale-95 hover:opacity-90"
                  style={{ backgroundColor: "#6366F1" }}>
                  {currentIdx + 1 >= questions.length ? "Finish 🏁" : "Next Question →"}
                </button>
                <p className="text-center text-xs text-amber-400 mt-2 font-semibold">
                  Press <kbd style={{background:'#FEF3C7', color:'#92400E', padding:'1px 5px', borderRadius:'4px', fontWeight:'bold'}}>Enter ↵</kbd> for next
                </p>
              </div>
            )}

            {/* Spacer prompt when nothing else is showing */}
            {!done && showChoices && (
              <div className="qp-pick-prompt">
                <p className="text-amber-300 font-bold text-sm">👇 Pick your answer above</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
