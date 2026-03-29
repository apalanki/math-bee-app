// SpeedDrillPage — Rapid-fire computation drills, 5 seconds each
// Tap Mode: on-screen number pad (no OS keyboard)
// Keyboard Mode: text input with Enter to submit
// All bg colors use inline style to avoid Tailwind v4 CSS-var generation gaps
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { speedDrills, SpeedDrill, speedDrillCategories, getSpeedDrillsByCategory } from "@/data/questions";
import { useSpeedScores } from "@/hooks/useProgress";
import { useInputMode } from "@/hooks/useInputMode";
import InputModeToggle from "@/components/InputModeToggle";
import { playSpeedCorrect, playSpeedWrong, playFanfare } from "@/hooks/useSounds";

const DRILL_TIME = 5;

const C = {
  violet: "#7C3AED", violetLight: "#EDE9FE",
  indigo: "#4F46E5", indigoLight: "#EEF2FF",
  amber: "#F59E0B", amberLight: "#FFFBEB", amberBorder: "#FDE68A",
  green: "#16A34A", greenLight: "#F0FDF4",
  red: "#DC2626", redLight: "#FEF2F2",
  gray: "#E5E7EB", white: "#FFFFFF",
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Phase = "select" | "countdown" | "drilling" | "results";

/** On-screen number pad for tablet mode */
function NumberPad({ value, onChange, onSubmit, disabled }: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}) {
  const handleKey = (k: string) => {
    if (disabled) return;
    if (k === "⌫") { onChange(value.slice(0, -1)); return; }
    if (k === "." && value.includes(".")) return;
    if (k === "-" && value.length > 0) return; // only allow minus at start
    if (value.length >= 8) return;
    onChange(value + k);
  };

  const keys = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["-", "0", "⌫"],
  ];

  return (
    <div className="mt-2 space-y-1.5">
      {keys.map((row, ri) => (
        <div key={ri} className="grid grid-cols-3 gap-1.5">
          {row.map(k => (
            <button
              key={k}
              onClick={() => handleKey(k)}
              disabled={disabled}
              className="rounded-xl font-display transition-all active:scale-90 disabled:opacity-30 drill-numpad-btn"
              style={{
                backgroundColor: k === "⌫" ? "#FEE2E2" : "#F5F3FF",
                color: k === "⌫" ? C.red : C.violet,
                border: `2px solid ${k === "⌫" ? "#FECACA" : "#DDD6FE"}`,
                boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
              }}
            >
              {k}
            </button>
          ))}
        </div>
      ))}
      <button
        onClick={onSubmit}
        disabled={disabled || !value.trim()}
        className="w-full text-white font-display rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-40 drill-numpad-submit"
        style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.indigo})` }}
      >
        Submit ⚡
      </button>
    </div>
  );
}

export default function SpeedDrillPage() {
  const [, navigate] = useLocation();
  const { getScores, addScore } = useSpeedScores();
  const { mode } = useInputMode();
  const isTap = mode === "tap";

  const [phase, setPhase] = useState<Phase>("select");
  const [category, setCategory] = useState("All");
  const [drillCount, setDrillCount] = useState(20);
  const [questions, setQuestions] = useState<SpeedDrill[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(DRILL_TIME);
  const [results, setResults] = useState<{ q: SpeedDrill; userAns: string; correct: boolean }[]>([]);
  const [flashBg, setFlashBg] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [questionKey, setQuestionKey] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pastScores = getScores().slice(0, 5);

  const startDrill = () => {
    const pool = getSpeedDrillsByCategory(category);
    const selected = shuffleArray(pool).slice(0, Math.min(drillCount, pool.length));
    setQuestions(selected);
    setCurrentIdx(0);
    setResults([]);
    setUserAnswer("");
    setTimeLeft(DRILL_TIME);
    setFlashBg(null);
    setPhase("countdown");
    setCountdown(3);
  };

  // Countdown
  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown <= 0) { setPhase("drilling"); setStartTime(Date.now()); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdown]);

  // Re-focus keyboard input on each new question
  useEffect(() => {
    if (phase !== "drilling" || isTap) return;
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [phase, questionKey, isTap]);

  // Per-question timer
  useEffect(() => {
    if (phase !== "drilling") return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current!); handleTimeout(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentIdx, questionKey]);

  const advanceOrFinish = useCallback((newResults: typeof results) => {
    const nextIdx = currentIdx + 1;
    if (nextIdx >= questions.length) {
      const correctCount = newResults.filter(r => r.correct).length;
      addScore({
        date: new Date().toLocaleDateString(), category,
        correct: correctCount, total: questions.length,
        timePerQuestion: Math.round((Date.now() - startTime) / 1000 / questions.length),
      });
      setTimeout(() => playFanfare(), 200);
      setPhase("results");
    } else {
      setCurrentIdx(nextIdx);
      setUserAnswer("");
      setTimeLeft(DRILL_TIME);
      setQuestionKey(k => k + 1);
      if (!isTap) setTimeout(() => inputRef.current?.focus(), 50);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx, questions.length, results, startTime, category, addScore, isTap]);

  const handleTimeout = useCallback(() => {
    const q = questions[currentIdx];
    if (!q) return;
    const newResults = [...results, { q, userAns: "(time up)", correct: false }];
    setResults(newResults);
    setFlashBg(C.redLight);
    setTimeout(() => { setFlashBg(null); advanceOrFinish(newResults); }, 400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, currentIdx, results]);

  const handleSubmit = useCallback(() => {
    const q = questions[currentIdx];
    if (!q || !userAnswer.trim()) return;
    clearInterval(timerRef.current!);
    const correct = userAnswer.trim().toLowerCase() === q.answer.toLowerCase() ||
      parseFloat(userAnswer) === parseFloat(q.answer);
    const newResults = [...results, { q, userAns: userAnswer, correct }];
    setResults(newResults);
    setFlashBg(correct ? C.greenLight : C.redLight);
    if (correct) playSpeedCorrect(); else playSpeedWrong();
    setTimeout(() => { setFlashBg(null); advanceOrFinish(newResults); }, 350);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, currentIdx, userAnswer, results]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && userAnswer.trim()) handleSubmit();
  };

  const currentQ = questions[currentIdx];
  const timerPct = (timeLeft / DRILL_TIME) * 100;
  const timerColor = timeLeft > 3 ? C.green : timeLeft > 1 ? C.amber : C.red;

  // ── SELECT PHASE ──
  if (phase === "select") {
    return (
      <div className="min-h-screen honeycomb-bg">
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-200 shadow-sm">
          <div className="container flex items-center gap-3 py-3">
            <button onClick={() => navigate("/")} className="text-amber-600 hover:text-amber-800 font-bold transition-colors">← Back</button>
            <span className="text-2xl">⚡</span>
            <h1 className="font-display text-xl flex-1" style={{ color: C.violet }}>Speed Drill Mode</h1>
            <InputModeToggle />
          </div>
        </header>

        <main className="container py-8 max-w-2xl mx-auto space-y-6">
          <div className="rounded-3xl p-8 text-white text-center shadow-xl"
            style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.indigo})` }}>
            <div className="text-6xl mb-3">⚡</div>
            <h2 className="font-display text-4xl mb-2">Speed Drill!</h2>
            <p className="font-semibold" style={{ color: "#DDD6FE" }}>
              {speedDrills.length} rapid-fire questions — <strong>5 seconds</strong> each!
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
              {isTap ? "👆 Tap Mode: Number Pad" : "⌨️ Keyboard Mode: Type answers"}
            </div>
          </div>

          {/* Category selector */}
          <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-6">
            <h3 className="font-display text-xl text-amber-700 mb-4">Choose Category</h3>
            <div className="flex flex-wrap gap-2">
              {speedDrillCategories.map(cat => {
                const selected = category === cat;
                return (
                  <button key={cat} onClick={() => setCategory(cat)}
                    className="px-4 py-2 rounded-xl font-bold text-sm transition-all"
                    style={{
                      backgroundColor: selected ? C.violet : C.amberLight,
                      color: selected ? "#FFFFFF" : "#92400E",
                      border: selected ? "none" : `1px solid ${C.amberBorder}`,
                      boxShadow: selected ? "0 4px 12px rgba(124,58,237,0.3)" : "none",
                      transform: selected ? "scale(1.05)" : "scale(1)",
                    }}>
                    {cat} ({getSpeedDrillsByCategory(cat).length})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question count */}
          <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-6">
            <h3 className="font-display text-xl text-amber-700 mb-4">Number of Questions</h3>
            <div className="flex flex-wrap gap-2">
              {[10, 20, 30, 50].map(n => {
                const selected = drillCount === n;
                return (
                  <button key={n} onClick={() => setDrillCount(n)}
                    className="px-5 py-2 rounded-xl font-bold transition-all"
                    style={{
                      backgroundColor: selected ? C.amber : C.amberLight,
                      color: selected ? "#FFFFFF" : "#92400E",
                      border: selected ? "none" : `1px solid ${C.amberBorder}`,
                      boxShadow: selected ? "0 4px 12px rgba(245,158,11,0.3)" : "none",
                      transform: selected ? "scale(1.05)" : "scale(1)",
                    }}>
                    {n}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Past scores */}
          {pastScores.length > 0 && (
            <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-6">
              <h3 className="font-display text-xl text-amber-700 mb-3">🏆 Recent Scores</h3>
              <div className="space-y-2">
                {pastScores.map((s, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl px-4 py-2"
                    style={{ backgroundColor: C.amberLight }}>
                    <span className="text-sm font-bold text-amber-700">{s.category}</span>
                    <span className="text-sm text-gray-500">{s.date}</span>
                    <span className="font-bold text-sm" style={{ color: s.correct / s.total >= 0.8 ? C.green : "#EA580C" }}>
                      {s.correct}/{s.total} ({Math.round((s.correct / s.total) * 100)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={startDrill}
            className="w-full py-5 text-white font-display text-2xl rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.indigo})` }}>
            🚀 Start Speed Drill!
          </button>
        </main>
      </div>
    );
  }

  // ── COUNTDOWN PHASE ──
  if (phase === "countdown") {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.indigo})` }}>
        <div className="text-center text-white">
          <div className="font-display text-9xl mb-4 animate-celebrate">
            {countdown === 0 ? "GO! ⚡" : countdown}
          </div>
          <p className="text-2xl font-semibold" style={{ color: "#DDD6FE" }}>Get ready...</p>
        </div>
      </div>
    );
  }

  // ── RESULTS PHASE ──
  if (phase === "results") {
    const correctCount = results.filter(r => r.correct).length;
    const pct = Math.round((correctCount / results.length) * 100);
    const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;
    const heroBg = pct >= 80 ? `linear-gradient(135deg, #16A34A, #059669)`
      : pct >= 60 ? `linear-gradient(135deg, ${C.amber}, #EA580C)`
      : `linear-gradient(135deg, ${C.red}, #BE123C)`;

    return (
      <div className="min-h-screen honeycomb-bg">
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-200 shadow-sm">
          <div className="container flex items-center gap-3 py-3">
            <button onClick={() => setPhase("select")} className="text-amber-600 font-bold">← Back</button>
            <h1 className="font-display text-xl" style={{ color: C.violet }}>Speed Drill Results</h1>
          </div>
        </header>
        <main className="container py-8 max-w-2xl mx-auto space-y-6">
          <div className="rounded-3xl p-8 text-white text-center shadow-xl" style={{ background: heroBg }}>
            <div className="text-5xl mb-2">{"⭐".repeat(stars)}{"☆".repeat(3 - stars)}</div>
            <div className="font-display text-5xl mb-1">{pct}%</div>
            <div className="text-xl font-semibold text-white/90">{correctCount} / {results.length} correct</div>
            <div className="mt-2 text-white/80">
              {pct >= 90 ? "🔥 Blazing fast! You're a math champion!" :
               pct >= 70 ? "💪 Great work! Keep practicing!" :
               pct >= 50 ? "👍 Good effort! Practice makes perfect!" :
               "🌱 Keep going — you'll get faster with practice!"}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-6">
            <h3 className="font-display text-xl text-amber-700 mb-4">Question Review</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {results.map((r, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2 rounded-xl"
                  style={{ backgroundColor: r.correct ? "#F0FDF4" : "#FEF2F2", border: `1px solid ${r.correct ? "#BBF7D0" : "#FECACA"}` }}>
                  <span className="text-lg">{r.correct ? "✅" : "❌"}</span>
                  <span className="font-bold text-gray-700 flex-1">{r.q.question}</span>
                  <span className="text-sm font-bold" style={{ color: C.green }}>{r.q.answer}</span>
                  {!r.correct && <span className="text-sm" style={{ color: C.red }}>You: {r.userAns}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={startDrill}
              className="flex-1 py-4 text-white font-display text-xl rounded-2xl shadow-lg transition-all hover:scale-[1.02]"
              style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.indigo})` }}>
              🔄 Try Again
            </button>
            <button onClick={() => navigate("/")}
              className="px-6 py-4 border-2 border-amber-300 text-amber-700 font-bold rounded-2xl transition-all">
              🏠 Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  // ── DRILLING PHASE ──
  return (
    <div className="drill-page-wrapper transition-colors duration-200"
      style={{ backgroundColor: flashBg ?? "#F5F3FF" }}>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm" style={{ borderColor: "#C4B5FD" }}>
        <div className="container flex items-center gap-3 py-2">
          <span className="text-xl">⚡</span>
          <h1 className="font-display text-base flex-1" style={{ color: C.violet }}>Speed Drill — {category}</h1>
          <span className="text-sm font-bold mr-2" style={{ color: C.violet }}>{currentIdx + 1}/{questions.length}</span>
          <InputModeToggle />
        </div>
        <div className="h-1" style={{ backgroundColor: "#EDE9FE" }}>
          <div className="h-full transition-all duration-300"
            style={{ width: `${(currentIdx / questions.length) * 100}%`, background: `linear-gradient(90deg, ${C.violet}, ${C.indigo})` }} />
        </div>
      </header>

      <main className="drill-main">
        {currentQ && (
          <div className="drill-card" key={questionKey}>
            {/* Timer bar */}
            <div className="relative mb-3">
              <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: C.gray }}>
                <div className="h-full rounded-full"
                  style={{ width: `${timerPct}%`, backgroundColor: timerColor, transition: "width 1s linear, background-color 0.5s ease" }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-xs font-bold text-white drop-shadow">{timeLeft}s</span>
              </div>
            </div>

            {/* Question card */}
            <div className="bg-white rounded-2xl border-2 shadow-xl p-4 text-center animate-float-up"
              style={{ borderColor: "#C4B5FD" }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#A78BFA" }}>
                {currentQ.category}
              </div>
              <div className={`font-display text-gray-800 mb-3 drill-question-text`}>{currentQ.question}</div>

              {/* Display typed answer */}
              <div className="drill-answer-display flex items-center justify-center rounded-xl mb-2 font-display"
                style={{ backgroundColor: "#F5F3FF", border: "2px solid #C4B5FD", color: C.violet }}>
                {userAnswer || <span style={{ color: "#C4B5FD" }}>?</span>}
              </div>

              {/* Keyboard mode: text input */}
              {!isTap && (
                <>
                  <input
                    ref={inputRef}
                    type="text"
                    value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type answer..."
                    className={`w-full text-center rounded-xl px-4 py-2 font-display text-gray-800 focus:outline-none transition-all mt-1 drill-input-text`}
                    style={{ border: "2px solid #C4B5FD", backgroundColor: "#F5F3FF" }}
                    autoFocus
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={!userAnswer.trim()}
                    className="mt-2 w-full py-2.5 text-white font-display text-lg rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-40"
                    style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.indigo})` }}>
                    Submit ⚡
                  </button>
                </>
              )}

              {/* Tap mode: compact number pad */}
              {isTap && (
                <NumberPad
                  value={userAnswer}
                  onChange={setUserAnswer}
                  onSubmit={handleSubmit}
                  disabled={false}
                />
              )}
            </div>

            {/* Live score */}
            <div className="flex justify-center gap-6 text-sm font-bold mt-2">
              <span style={{ color: C.green }}>✓ {results.filter(r => r.correct).length} correct</span>
              <span style={{ color: C.red }}>✗ {results.filter(r => !r.correct).length} wrong</span>
            </div>

            {!isTap && (
              <p className="text-center text-xs font-semibold mt-1" style={{ color: "#A78BFA" }}>
                Press <kbd className="px-2 py-0.5 rounded font-bold" style={{ backgroundColor: "#EDE9FE", color: C.violet }}>Enter</kbd> to submit
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
