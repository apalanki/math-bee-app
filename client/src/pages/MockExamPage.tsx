// MockExamPage — Competition-style mock exam
// 25 random questions drawn from all topics, 30-minute countdown timer
// No hints allowed. No retries — one answer per question.
// Shows full results at the end with topic breakdown.
// All bg colors use inline style to avoid Tailwind v4 CSS-var generation gaps
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useLocation } from "wouter";
import { getAllQuestions, Question } from "@/data/questions";
import { useInputMode } from "@/hooks/useInputMode";
import { playCorrect, playWrong, playFanfare } from "@/hooks/useSounds";
import InputModeToggle from "@/components/InputModeToggle";
import ClockFace from "@/components/ClockFace";
import GeometryShape, { shouldShowShape } from "@/components/GeometryShape";

const EXAM_QUESTIONS = 25;
const EXAM_MINUTES = 30;
const EXAM_SECONDS = EXAM_MINUTES * 60;

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
    const candidates = [`${n + 1}/${d}`, `${Math.max(1, n - 1)}/${d}`, `${n}/${d + 1}`, `${n + 1}/${d + 1}`].filter(c => c !== correct);
    for (const c of candidates) {
      if (!distractors.includes(c) && distractors.length < 3) distractors.push(c);
    }
  }
  while (distractors.length < 3) distractors.push(`${distractors.length + 2}`);
  return distractors.slice(0, 3);
}

const CHOICE_COLORS = [
  { bg: "#EFF6FF", border: "#93C5FD", text: "#1D4ED8", sel: "#2563EB" },
  { bg: "#F0FDF4", border: "#86EFAC", text: "#166534", sel: "#16A34A" },
  { bg: "#FFF7ED", border: "#FDB47A", text: "#9A3412", sel: "#EA580C" },
  { bg: "#FDF4FF", border: "#E879F9", text: "#86198F", sel: "#A21CAF" },
];
const CHOICE_LABELS = ["A", "B", "C", "D"];

type Phase = "intro" | "countdown" | "exam" | "results";

interface ExamResult {
  q: Question;
  userAns: string;
  correct: boolean;
  skipped: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────
export default function MockExamPage() {
  const [, navigate] = useLocation();
  const { mode } = useInputMode();
  const isTap = mode === "tap";

  const [phase, setPhase] = useState<Phase>("intro");
  const [countdown, setCountdown] = useState(3);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(EXAM_SECONDS);
  const [results, setResults] = useState<ExamResult[]>([]);
  const [shakeInput, setShakeInput] = useState(false);
  const [questionKey, setQuestionKey] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Start exam ────────────────────────────────────────────────────────
  const startExam = useCallback(() => {
    const all = getAllQuestions();
    const selected = shuffleArray(all).slice(0, EXAM_QUESTIONS);
    setQuestions(selected);
    setCurrentIdx(0);
    setResults([]);
    setUserAnswer("");
    setSelectedChoice(null);
    setTimeLeft(EXAM_SECONDS);
    setQuestionKey(0);
    setPhase("countdown");
    setCountdown(3);
  }, []);

  // ── Countdown ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown <= 0) { setPhase("exam"); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdown]);

  // ── Global exam timer ─────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "exam") return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setPhase("results");
          setTimeout(() => playFanfare(), 300);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [phase]);

  // ── Auto-focus keyboard input ─────────────────────────────────────────
  useEffect(() => {
    if (phase !== "exam" || isTap) return;
    const t = setTimeout(() => inputRef.current?.focus(), 40);
    return () => clearTimeout(t);
  }, [phase, questionKey, isTap]);

  const currentQ = questions[currentIdx];

  const choices = useMemo(() => {
    if (!currentQ) return [];
    if (currentQ.choices && currentQ.choices.length >= 2) return currentQ.choices;
    return shuffleArray([currentQ.answer, ...generateDistractors(currentQ.answer)]);
  }, [currentQ]);

  const showChoices = !!(currentQ?.choices?.length) || isTap;

  // ── Advance to next question or finish ────────────────────────────────
  const advanceOrFinish = useCallback((newResults: ExamResult[]) => {
    const nextIdx = currentIdx + 1;
    if (nextIdx >= questions.length) {
      clearInterval(timerRef.current!);
      setPhase("results");
      setTimeout(() => playFanfare(), 300);
    } else {
      setCurrentIdx(nextIdx);
      setUserAnswer("");
      setSelectedChoice(null);
      setQuestionKey(k => k + 1);
      if (!isTap) setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [currentIdx, questions.length, isTap]);

  // ── Submit answer ─────────────────────────────────────────────────────
  const handleSubmit = useCallback((answerOverride?: string) => {
    if (!currentQ || phase !== "exam") return;
    const answer = answerOverride ?? userAnswer;
    if (!answer.trim()) return;
    const correct = checkAnswer(answer, currentQ.answer);
    const newResults = [...results, { q: currentQ, userAns: answer, correct, skipped: false }];
    setResults(newResults);
    if (correct) playCorrect(); else { playWrong(); setShakeInput(true); setTimeout(() => setShakeInput(false), 400); }
    setTimeout(() => advanceOrFinish(newResults), correct ? 200 : 400);
  }, [currentQ, phase, userAnswer, results, advanceOrFinish]);

  const handleChoiceSelect = useCallback((choice: string) => {
    if (phase !== "exam") return;
    setSelectedChoice(choice);
    setTimeout(() => handleSubmit(choice), 120);
  }, [phase, handleSubmit]);

  // ── Skip question ─────────────────────────────────────────────────────
  const handleSkip = useCallback(() => {
    if (!currentQ || phase !== "exam") return;
    const newResults = [...results, { q: currentQ, userAns: "", correct: false, skipped: true }];
    setResults(newResults);
    advanceOrFinish(newResults);
  }, [currentQ, phase, results, advanceOrFinish]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && userAnswer.trim()) handleSubmit();
  };

  // ── Format timer ──────────────────────────────────────────────────────
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const timerPct = (timeLeft / EXAM_SECONDS) * 100;
  const timerColor = timeLeft > 600 ? "#22C55E" : timeLeft > 180 ? "#F59E0B" : "#EF4444";

  // ── Results summary ───────────────────────────────────────────────────
  const correctCount = results.filter(r => r.correct).length;
  const skippedCount = results.filter(r => r.skipped).length;
  const wrongCount = results.filter(r => !r.correct && !r.skipped).length;
  const pct = Math.round((correctCount / EXAM_QUESTIONS) * 100);
  const grade = pct >= 90 ? "🏆 Excellent!" : pct >= 75 ? "⭐ Great Job!" : pct >= 60 ? "👍 Good Effort!" : pct >= 40 ? "📚 Keep Practicing!" : "💪 Don't Give Up!";

  // ── Topic breakdown ─────────────────────────────────────────────────────
  const TOPIC_META: Record<string, { name: string; emoji: string; color: string }> = {
    'arithmetic':    { name: 'Arithmetic',        emoji: '🔢', color: '#F59E0B' },
    'word-problems': { name: 'Word Problems',     emoji: '📖', color: '#8B5CF6' },
    'place-value':   { name: 'Place Value',       emoji: '🏛️', color: '#10B981' },
    'fractions':     { name: 'Fractions',         emoji: '🍕', color: '#EF4444' },
    'money':         { name: 'Money',             emoji: '💰', color: '#F97316' },
    'time':          { name: 'Time',              emoji: '⏰', color: '#06B6D4' },
    'measurement':   { name: 'Measurement',       emoji: '📏', color: '#84CC16' },
    'patterns':      { name: 'Number Patterns',   emoji: '🔄', color: '#6366F1' },
    'geometry':      { name: 'Geometry',          emoji: '📐', color: '#EC4899' },
    'counting':      { name: 'Counting',          emoji: '🎯', color: '#14B8A6' },
    'logic':         { name: 'Logic & Reasoning', emoji: '🧠', color: '#A855F7' },
    'decimals':      { name: 'Decimals',          emoji: '🔵', color: '#3B82F6' },
    'comparison':    { name: 'Comparison',        emoji: '⚖️', color: '#F43F5E' },
    'probability':   { name: 'Probability',       emoji: '🎲', color: '#22C55E' },
  };
  type TopicStat = { id: string; name: string; emoji: string; color: string; total: number; correct: number; wrong: number; skipped: number };
  const topicStats: Record<string, TopicStat> = {};
  for (const r of results) {
    const tid = r.q.topicId;
    if (!topicStats[tid]) {
      const meta = TOPIC_META[tid] ?? { name: tid, emoji: '📚', color: '#6B7280' };
      topicStats[tid] = { id: tid, ...meta, total: 0, correct: 0, wrong: 0, skipped: 0 };
    }
    topicStats[tid].total++;
    if (r.correct) topicStats[tid].correct++;
    else if (r.skipped) topicStats[tid].skipped++;
    else topicStats[tid].wrong++;
  }
  const topicList = Object.values(topicStats).sort((a, b) => {
    const aPct = a.total > 0 ? a.correct / a.total : 1;
    const bPct = b.total > 0 ? b.correct / b.total : 1;
    return aPct - bPct; // worst first
  });
  const focusAreas = topicList.filter(t => t.total > 0 && t.correct / t.total < 0.7);

  // ── INTRO SCREEN ──────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="min-h-screen honeycomb-bg flex flex-col">
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-200 shadow-sm">
          <div className="container flex items-center gap-2 py-3">
            <button onClick={() => navigate("/")} className="text-amber-600 hover:text-amber-800 font-bold transition-colors text-sm">← Home</button>
            <span className="text-xl">📋</span>
            <h1 className="font-display text-xl text-amber-700 flex-1">Mock Exam</h1>
            <InputModeToggle />
          </div>
        </header>
        <main className="container py-10 flex-1 flex flex-col items-center justify-center gap-6 max-w-lg mx-auto">
          {/* Hero card */}
          <div className="w-full rounded-3xl text-white p-8 shadow-2xl text-center"
            style={{ background: "linear-gradient(135deg, #1E1B4B, #4338CA)" }}>
            <div className="text-6xl mb-4">📋</div>
            <h2 className="font-display text-4xl mb-2">Mock Exam</h2>
            <p className="text-indigo-200 font-semibold text-lg">Competition-style practice test</p>
          </div>

          {/* Rules card */}
          <div className="w-full bg-white rounded-2xl border border-amber-100 shadow-lg p-6 space-y-4">
            <h3 className="font-display text-xl text-amber-700">Exam Rules</h3>
            <div className="space-y-3">
              {[
                { icon: "📝", title: "25 Questions", desc: "Randomly selected from all 14 topics" },
                { icon: "⏱️", title: "30 Minutes", desc: "One shared countdown for the entire exam" },
                { icon: "🚫", title: "No Hints", desc: "Competition mode — no hints or retries" },
                { icon: "⏭️", title: "Skip Allowed", desc: "You can skip questions and move on" },
                { icon: "📊", title: "Full Results", desc: "Detailed score breakdown at the end" },
              ].map(r => (
                <div key={r.title} className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{r.icon}</span>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{r.title}</p>
                    <p className="text-xs text-gray-500">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={startExam}
            className="w-full py-4 text-white font-display text-xl rounded-2xl shadow-xl transition-all active:scale-95 hover:shadow-2xl"
            style={{ background: "linear-gradient(135deg, #1E1B4B, #4338CA)" }}>
            Start Exam 🚀
          </button>
        </main>
      </div>
    );
  }

  // ── COUNTDOWN SCREEN ──────────────────────────────────────────────────
  if (phase === "countdown") {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #1E1B4B, #4338CA)" }}>
        <div className="text-center text-white">
          <p className="font-display text-2xl mb-4 text-indigo-200">Get Ready!</p>
          <div className="font-display text-9xl animate-ping-once"
            style={{ textShadow: "0 0 40px rgba(255,255,255,0.5)" }}>
            {countdown === 0 ? "GO!" : countdown}
          </div>
        </div>
      </div>
    );
  }

  // ── RESULTS SCREEN ────────────────────────────────────────────────────
  if (phase === "results") {
    return (
      <div className="min-h-screen honeycomb-bg">
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-200 shadow-sm">
          <div className="container flex items-center gap-2 py-3">
            <span className="text-xl">📋</span>
            <h1 className="font-display text-xl text-amber-700 flex-1">Mock Exam Results</h1>
          </div>
        </header>
        <main className="container py-8 space-y-6 max-w-2xl mx-auto">

          {/* ── Score hero ── */}
          <div className="rounded-3xl text-white p-8 text-center shadow-2xl"
            style={{ background: "linear-gradient(135deg, #1E1B4B, #4338CA)" }}>
            <div className="text-5xl mb-3">{grade.split(" ")[0]}</div>
            <div className="font-display text-6xl mb-1">{pct}%</div>
            <p className="text-indigo-200 font-semibold text-lg mb-4">{grade.split(" ").slice(1).join(" ")}</p>
            <div className="flex justify-center gap-6">
              <div className="text-center">
                <div className="font-display text-3xl text-green-300">{correctCount}</div>
                <div className="text-xs text-indigo-200">Correct</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl text-red-300">{wrongCount}</div>
                <div className="text-xs text-indigo-200">Wrong</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl text-yellow-300">{skippedCount}</div>
                <div className="text-xs text-indigo-200">Skipped</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl text-indigo-200">{formatTime(EXAM_SECONDS - timeLeft)}</div>
                <div className="text-xs text-indigo-200">Time Used</div>
              </div>
            </div>
          </div>

          {/* ── Focus Areas (only if there are weak topics) ── */}
          {focusAreas.length > 0 && (
            <div className="rounded-2xl p-5 shadow-md"
              style={{ background: "linear-gradient(135deg, #FFF7ED, #FEF3C7)", border: "2px solid #FDE68A" }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎯</span>
                <h3 className="font-display text-lg" style={{ color: "#92400E" }}>Focus Areas</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FDE68A", color: "#78350F" }}>Needs Practice</span>
              </div>
              <p className="text-sm text-amber-700 mb-3">These topics had less than 70% accuracy. Spend extra time practicing them!</p>
              <div className="space-y-2">
                {focusAreas.map(t => {
                  const topicPct = t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0;
                  return (
                    <div key={t.name} className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 shadow-sm">
                      <span className="text-xl">{t.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm text-gray-800">{t.name}</span>
                          <span className="text-xs font-bold" style={{ color: topicPct < 40 ? "#DC2626" : "#D97706" }}>
                            {t.correct}/{t.total} correct ({topicPct}%)
                          </span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#E5E7EB" }}>
                          <div className="h-full rounded-full transition-all"
                            style={{ width: `${topicPct}%`, backgroundColor: topicPct < 40 ? "#EF4444" : "#F59E0B" }} />
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/quiz/${t.id}`)}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-all active:scale-95"
                        style={{ backgroundColor: t.color }}>
                        Practice →
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Topic-by-topic breakdown ── */}
          <div className="bg-white rounded-2xl border border-amber-100 shadow-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-amber-100 flex items-center justify-between">
              <h3 className="font-display text-lg text-amber-700">📊 Topic Breakdown</h3>
              <span className="text-xs text-gray-400 font-medium">{topicList.length} topics covered</span>
            </div>
            <div className="divide-y divide-gray-50">
              {topicList.map(t => {
                const topicPct = t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0;
                const status = topicPct >= 80 ? { label: "Strong", bg: "#F0FDF4", text: "#16A34A", bar: "#22C55E" }
                  : topicPct >= 60 ? { label: "OK", bg: "#FFFBEB", text: "#D97706", bar: "#F59E0B" }
                  : { label: "Needs Work", bg: "#FEF2F2", text: "#DC2626", bar: "#EF4444" };
                return (
                  <div key={t.name} className="px-5 py-3" style={{ backgroundColor: status.bg + "55" }}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl flex-shrink-0">{t.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-sm text-gray-800">{t.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold" style={{ color: status.text }}>{t.correct}/{t.total}</span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: status.bg, color: status.text, border: `1px solid ${status.bar}33` }}>
                              {status.label}
                            </span>
                          </div>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#E5E7EB" }}>
                          <div className="h-full rounded-full"
                            style={{ width: `${topicPct}%`, backgroundColor: status.bar }} />
                        </div>
                        {(t.wrong > 0 || t.skipped > 0) && (
                          <div className="flex gap-3 mt-1">
                            {t.wrong > 0 && <span className="text-xs text-red-500">✗ {t.wrong} wrong</span>}
                            {t.skipped > 0 && <span className="text-xs text-amber-500">– {t.skipped} skipped</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Question-by-question review ── */}
          <div className="bg-white rounded-2xl border border-amber-100 shadow-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-amber-100">
              <h3 className="font-display text-lg text-amber-700">📝 Question Review</h3>
            </div>
            <div className="divide-y divide-amber-50">
              {results.map((r, i) => (
                <div key={i} className="px-5 py-3 flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white"
                    style={{ backgroundColor: r.correct ? "#22C55E" : r.skipped ? "#F59E0B" : "#EF4444" }}>
                    {r.correct ? "✓" : r.skipped ? "–" : "✗"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">Q{i + 1}: {r.q.question}</p>
                    <div className="flex flex-wrap gap-3 mt-0.5">
                      {!r.skipped && (
                        <span className="text-xs font-medium" style={{ color: r.correct ? "#16A34A" : "#DC2626" }}>
                          Your answer: {r.userAns || "(empty)"}
                        </span>
                      )}
                      {!r.correct && !r.skipped && (
                        <span className="text-xs font-bold text-indigo-600">✓ {r.q.answer}</span>
                      )}
                      <span className="text-xs font-medium px-1.5 py-0.5 rounded" style={{ backgroundColor: (TOPIC_META[r.q.topicId]?.color ?? '#6B7280') + '22', color: TOPIC_META[r.q.topicId]?.color ?? '#6B7280' }}>
                        {TOPIC_META[r.q.topicId]?.emoji} {TOPIC_META[r.q.topicId]?.name ?? r.q.topicId}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="flex gap-3">
            <button
              onClick={startExam}
              className="flex-1 py-3 text-white font-display text-base rounded-2xl shadow-md transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #1E1B4B, #4338CA)" }}>
              Try Again 🔄
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 py-3 font-display text-base rounded-2xl shadow-md transition-all active:scale-95"
              style={{ backgroundColor: "#FEF3C7", color: "#92400E", border: "2px solid #FDE68A" }}>
              Home 🏠
            </button>
          </div>
        </main>
      </div>
    );
  }

  // ── EXAM SCREEN ───────────────────────────────────────────────────────
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference * (1 - timerPct / 100);

  return (
    <div className="quiz-page-wrapper honeycomb-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-indigo-200 shadow-sm quiz-header">
        <div className="container flex items-center gap-2 py-2">
          <button onClick={() => { if (window.confirm("Quit exam? Your progress will be lost.")) navigate("/"); }}
            className="font-bold transition-colors text-sm" style={{ color: "#4338CA" }}>
            ✕ Quit
          </button>
          <span className="text-xl">📋</span>
          <h1 className="font-display text-base flex-1" style={{ color: "#4338CA" }}>Mock Exam</h1>
          <div className="flex items-center gap-2">
            {/* Global countdown */}
            <div className="flex items-center gap-1 px-3 py-1 rounded-xl font-display text-sm font-black"
              style={{
                backgroundColor: timeLeft <= 180 ? "#FEF2F2" : "#EEF2FF",
                color: timerColor,
                border: `2px solid ${timerColor}`,
              }}>
              ⏱ {formatTime(timeLeft)}
            </div>
            <span className="text-xs font-bold" style={{ color: "#4338CA" }}>
              {currentIdx + 1}/{questions.length}
            </span>
            <InputModeToggle />
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1" style={{ backgroundColor: "#EEF2FF" }}>
          <div className="h-full transition-all duration-300"
            style={{ width: `${(currentIdx / questions.length) * 100}%`, backgroundColor: "#4338CA" }} />
        </div>
      </header>

      {/* Main content */}
      <main className="quiz-main container">
        {/* LEFT: Question */}
        <div className="quiz-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold" style={{ color: "#4338CA" }}>Q {currentIdx + 1} / {questions.length}</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              currentQ.difficulty === "easy" ? "badge-easy" :
              currentQ.difficulty === "medium" ? "badge-medium" : "badge-hard"
            }`}>
              {currentQ.difficulty.charAt(0).toUpperCase() + currentQ.difficulty.slice(1)}
            </span>
          </div>

          <div className="bg-white rounded-2xl border shadow-xl overflow-hidden animate-float-up"
            style={{ borderColor: "#C7D2FE" }} key={questionKey}>
            <div className="p-4">
              <div className="flex items-start gap-3">
                {/* Question number badge */}
                <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-display text-base font-black text-white"
                  style={{ backgroundColor: "#4338CA" }}>
                  {currentIdx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-body quiz-question-text font-bold text-gray-800 leading-snug">{currentQ.question}</p>
                  {/* Geometry shape */}
                  {currentQ.topicId === 'geometry' && shouldShowShape(currentQ.question) && (
                    <div className="mt-3 flex justify-center">
                      <GeometryShape question={currentQ.question} size={150} />
                    </div>
                  )}
                  {/* Clock faces */}
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
            {/* No hints in exam mode — just a reminder */}
            <div className="px-4 pb-3">
              <p className="text-xs font-semibold text-indigo-400">🚫 No hints in exam mode</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Input + Skip */}
        <div className="quiz-right">
          {/* Choice buttons */}
          {showChoices && (
            <div className="quiz-section">
              <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "#4338CA" }}>
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
            </div>
          )}

          {/* Keyboard text input */}
          {!showChoices && (
            <div className="quiz-section">
              {currentQ.answerFormat && (
                <p className="text-xs font-bold text-indigo-500 mb-1.5 flex items-center gap-1">
                  <span>📝</span> Format: <span className="bg-indigo-50 border border-indigo-200 rounded px-1.5 py-0.5 font-mono text-indigo-700">{currentQ.answerFormat}</span>
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
                  className={`answer-input flex-1 border-2 rounded-xl px-3 py-2.5 font-bold text-base text-gray-800 bg-indigo-50 focus:bg-white transition-all ${shakeInput ? "animate-shake-wrong" : ""}`}
                  style={{ borderColor: "#C7D2FE" }}
                  autoFocus
                />
                <button
                  onClick={() => handleSubmit()}
                  disabled={!userAnswer.trim()}
                  className="px-4 py-2.5 text-white font-display text-base rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
                  style={{ backgroundColor: userAnswer.trim() ? "#4338CA" : "#A5B4FC" }}>
                  Submit ✓
                </button>
              </div>
            </div>
          )}

          {/* Skip button */}
          <div className="quiz-section">
            <button
              onClick={handleSkip}
              className="w-full py-2.5 font-display text-sm rounded-xl border-2 border-dashed transition-all active:scale-95"
              style={{ borderColor: "#F59E0B", color: "#92400E", backgroundColor: "#FFFBEB" }}>
              ⏭ Skip This Question
            </button>
          </div>

          {/* Progress summary */}
          <div className="quiz-section">
            <div className="rounded-xl p-3 flex items-center justify-between"
              style={{ backgroundColor: "#EEF2FF", border: "1px solid #C7D2FE" }}>
              <div className="text-center">
                <div className="font-display text-lg" style={{ color: "#4338CA" }}>{results.filter(r => r.correct).length}</div>
                <div className="text-xs font-semibold text-green-600">Correct</div>
              </div>
              <div className="text-center">
                <div className="font-display text-lg" style={{ color: "#4338CA" }}>{results.filter(r => !r.correct && !r.skipped).length}</div>
                <div className="text-xs font-semibold text-red-500">Wrong</div>
              </div>
              <div className="text-center">
                <div className="font-display text-lg" style={{ color: "#4338CA" }}>{results.filter(r => r.skipped).length}</div>
                <div className="text-xs font-semibold text-amber-600">Skipped</div>
              </div>
              <div className="text-center">
                <div className="font-display text-lg" style={{ color: "#4338CA" }}>{questions.length - currentIdx - 1}</div>
                <div className="text-xs font-semibold text-gray-500">Remaining</div>
              </div>
            </div>
          </div>

          {/* Enter hint */}
          {!isTap && !showChoices && (
            <p className="text-center text-xs font-semibold" style={{ color: "#A5B4FC" }}>
              Press <kbd style={{ background: "#EEF2FF", color: "#4338CA", padding: "1px 5px", borderRadius: "4px", fontWeight: "bold" }}>Enter ↵</kbd> to submit
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
