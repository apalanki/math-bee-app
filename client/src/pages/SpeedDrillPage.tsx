// SpeedDrillPage — Rapid-fire computation drills, 5 seconds each
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { speedDrills, SpeedDrill, speedDrillCategories, getSpeedDrillsByCategory } from "@/data/questions";
import { useSpeedScores } from "@/hooks/useProgress";

const DRILL_TIME = 5; // seconds per question
const DRILL_COUNT = 20; // questions per session

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Phase = 'select' | 'countdown' | 'drilling' | 'results';

export default function SpeedDrillPage() {
  const [, navigate] = useLocation();
  const { getScores, addScore } = useSpeedScores();

  const [phase, setPhase] = useState<Phase>('select');
  const [category, setCategory] = useState('All');
  const [drillCount, setDrillCount] = useState(DRILL_COUNT);
  const [questions, setQuestions] = useState<SpeedDrill[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(DRILL_TIME);
  const [results, setResults] = useState<{q: SpeedDrill; userAns: string; correct: boolean}[]>([]);
  const [flashClass, setFlashClass] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [questionKey, setQuestionKey] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pastScores = getScores().slice(0, 5);

  const startDrill = () => {
    const pool = getSpeedDrillsByCategory(category);
    const shuffled = shuffleArray(pool);
    const selected = shuffled.slice(0, Math.min(drillCount, shuffled.length));
    setQuestions(selected);
    setCurrentIdx(0);
    setResults([]);
    setUserAnswer("");
    setTimeLeft(DRILL_TIME);
    setFlashClass("");
    setPhase('countdown');
    setCountdown(3);
  };

  // Countdown before drill
  useEffect(() => {
    if (phase !== 'countdown') return;
    if (countdown <= 0) {
      setPhase('drilling');
      setStartTime(Date.now());
      return;
    }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdown]);

  // Per-question timer
  useEffect(() => {
    if (phase !== 'drilling') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handleTimeout();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentIdx, questionKey]);

  const handleTimeout = useCallback(() => {
    const q = questions[currentIdx];
    if (!q) return;
    setResults(prev => [...prev, { q, userAns: "(time up)", correct: false }]);
    setFlashClass("speed-wrong");
    setTimeout(() => {
      setFlashClass("");
      advanceQuestion();
    }, 400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, currentIdx]);

  const advanceQuestion = useCallback(() => {
    const nextIdx = currentIdx + 1;
    if (nextIdx >= questions.length) {
      // Done
      const totalTime = (Date.now() - startTime) / 1000;
      const correctCount = results.filter(r => r.correct).length + 0; // will be updated
      setPhase('results');
      return;
    }
    setCurrentIdx(nextIdx);
    setUserAnswer("");
    setTimeLeft(DRILL_TIME);
    setQuestionKey(k => k + 1);
    setTimeout(() => inputRef.current?.focus(), 50);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx, questions.length, results, startTime]);

  const handleSubmit = useCallback(() => {
    const q = questions[currentIdx];
    if (!q) return;
    clearInterval(timerRef.current!);

    const correct = userAnswer.trim().toLowerCase() === q.answer.toLowerCase() ||
      parseFloat(userAnswer) === parseFloat(q.answer);

    const newResult = { q, userAns: userAnswer, correct };
    const newResults = [...results, newResult];
    setResults(newResults);

    if (correct) {
      setFlashClass("speed-correct");
    } else {
      setFlashClass("speed-wrong");
    }

    setTimeout(() => {
      setFlashClass("");
      const nextIdx = currentIdx + 1;
      if (nextIdx >= questions.length) {
        const totalTime = (Date.now() - startTime) / 1000;
        const correctCount = newResults.filter(r => r.correct).length;
        addScore({
          date: new Date().toLocaleDateString(),
          category,
          correct: correctCount,
          total: questions.length,
          timePerQuestion: Math.round(totalTime / questions.length),
        });
        setPhase('results');
      } else {
        setCurrentIdx(nextIdx);
        setUserAnswer("");
        setTimeLeft(DRILL_TIME);
        setQuestionKey(k => k + 1);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    }, 350);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, currentIdx, userAnswer, results, startTime, category, addScore]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && userAnswer.trim()) handleSubmit();
  };

  const currentQ = questions[currentIdx];
  const timerPct = (timeLeft / DRILL_TIME) * 100;
  const timerColor = timeLeft > 3 ? "#22C55E" : timeLeft > 1 ? "#F97316" : "#EF4444";

  // ── SELECT PHASE ──
  if (phase === 'select') {
    return (
      <div className="min-h-screen honeycomb-bg">
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-200 shadow-sm">
          <div className="container flex items-center gap-3 py-3">
            <button onClick={() => navigate("/")} className="text-amber-600 hover:text-amber-800 font-bold transition-colors">← Back</button>
            <span className="text-2xl">⚡</span>
            <h1 className="font-display text-xl text-violet-700">Speed Drill Mode</h1>
          </div>
        </header>

        <main className="container py-8 max-w-2xl mx-auto space-y-6">
          <div className="bg-gradient-to-br from-violet-500 to-indigo-600 rounded-3xl p-8 text-white text-center shadow-xl">
            <div className="text-6xl mb-3">⚡</div>
            <h2 className="font-display text-4xl mb-2">Speed Drill!</h2>
            <p className="text-violet-200 font-semibold">
              {speedDrills.length} rapid-fire computation questions. You have <strong>5 seconds</strong> per question. Build your mental math speed!
            </p>
          </div>

          {/* Category selector */}
          <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-6">
            <h3 className="font-display text-xl text-amber-700 mb-4">Choose Category</h3>
            <div className="flex flex-wrap gap-2">
              {speedDrillCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                    category === cat
                      ? 'bg-violet-500 text-white shadow-md scale-105'
                      : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {cat} ({getSpeedDrillsByCategory(cat).length})
                </button>
              ))}
            </div>
          </div>

          {/* Question count */}
          <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-6">
            <h3 className="font-display text-xl text-amber-700 mb-4">Number of Questions</h3>
            <div className="flex flex-wrap gap-2">
              {[10, 20, 30, 50].map(n => (
                <button
                  key={n}
                  onClick={() => setDrillCount(n)}
                  className={`px-5 py-2 rounded-xl font-bold transition-all ${
                    drillCount === n
                      ? 'bg-amber-500 text-white shadow-md scale-105'
                      : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Past scores */}
          {pastScores.length > 0 && (
            <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-6">
              <h3 className="font-display text-xl text-amber-700 mb-3">🏆 Recent Scores</h3>
              <div className="space-y-2">
                {pastScores.map((s, i) => (
                  <div key={i} className="flex items-center justify-between bg-amber-50 rounded-xl px-4 py-2">
                    <span className="text-sm font-bold text-amber-700">{s.category}</span>
                    <span className="text-sm text-gray-500">{s.date}</span>
                    <span className={`font-bold text-sm ${s.correct/s.total >= 0.8 ? 'text-green-600' : 'text-orange-600'}`}>
                      {s.correct}/{s.total} ({Math.round(s.correct/s.total*100)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={startDrill}
            className="w-full py-5 bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-display text-2xl rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            🚀 Start Speed Drill!
          </button>
        </main>
      </div>
    );
  }

  // ── COUNTDOWN PHASE ──
  if (phase === 'countdown') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-500 to-indigo-700 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="font-display text-9xl mb-4 animate-celebrate">
            {countdown === 0 ? "GO! ⚡" : countdown}
          </div>
          <p className="text-2xl font-semibold text-violet-200">Get ready...</p>
        </div>
      </div>
    );
  }

  // ── RESULTS PHASE ──
  if (phase === 'results') {
    const correctCount = results.filter(r => r.correct).length;
    const pct = Math.round((correctCount / results.length) * 100);
    const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;

    return (
      <div className="min-h-screen honeycomb-bg">
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-200 shadow-sm">
          <div className="container flex items-center gap-3 py-3">
            <button onClick={() => setPhase('select')} className="text-amber-600 font-bold">← Back</button>
            <h1 className="font-display text-xl text-violet-700">Speed Drill Results</h1>
          </div>
        </header>

        <main className="container py-8 max-w-2xl mx-auto space-y-6">
          <div className={`rounded-3xl p-8 text-white text-center shadow-xl ${pct >= 80 ? 'bg-gradient-to-br from-green-500 to-emerald-600' : pct >= 60 ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-gradient-to-br from-red-500 to-rose-600'}`}>
            <div className="text-5xl mb-2">{"⭐".repeat(stars)}{stars < 3 ? "☆".repeat(3-stars) : ""}</div>
            <div className="font-display text-5xl mb-1">{pct}%</div>
            <div className="text-xl font-semibold text-white/90">{correctCount} / {results.length} correct</div>
            <div className="mt-2 text-white/80">
              {pct >= 90 ? "🔥 Blazing fast! You're a math champion!" :
               pct >= 70 ? "💪 Great work! Keep practicing!" :
               pct >= 50 ? "👍 Good effort! Practice makes perfect!" :
               "🌱 Keep going — you'll get faster with practice!"}
            </div>
          </div>

          {/* Results breakdown */}
          <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-6">
            <h3 className="font-display text-xl text-amber-700 mb-4">Question Review</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {results.map((r, i) => (
                <div key={i} className={`flex items-center gap-3 px-4 py-2 rounded-xl ${r.correct ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
                  <span className="text-lg">{r.correct ? '✅' : '❌'}</span>
                  <span className="font-bold text-gray-700 flex-1">{r.q.question}</span>
                  <span className="text-sm font-bold text-green-700">{r.q.answer}</span>
                  {!r.correct && <span className="text-sm text-red-500">You: {r.userAns}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={startDrill}
              className="flex-1 py-4 bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-display text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              🔄 Try Again
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-4 border-2 border-amber-300 text-amber-700 font-bold rounded-2xl hover:bg-amber-50 transition-all"
            >
              🏠 Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  // ── DRILLING PHASE ──
  return (
    <div className={`min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 transition-colors ${flashClass}`}>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-violet-200 shadow-sm">
        <div className="container flex items-center gap-3 py-3">
          <span className="text-xl">⚡</span>
          <h1 className="font-display text-lg text-violet-700 flex-1">Speed Drill — {category}</h1>
          <span className="text-sm font-bold text-violet-600">
            {currentIdx + 1} / {questions.length}
          </span>
        </div>
        <div className="h-1.5 bg-violet-100">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300"
            style={{width: `${((currentIdx) / questions.length) * 100}%`}}
          />
        </div>
      </header>

      <main className="container py-8 max-w-xl mx-auto">
        {currentQ && (
          <div className="space-y-6" key={questionKey}>
            {/* Timer bar */}
            <div className="relative">
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${timerPct}%`,
                    background: timerColor,
                    transition: 'width 1s linear, background 0.5s ease'
                  }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-xs font-bold text-white drop-shadow">{timeLeft}s</span>
              </div>
            </div>

            {/* Question card */}
            <div className="bg-white rounded-3xl border-2 border-violet-200 shadow-xl p-8 text-center animate-float-up">
              <div className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">{currentQ.category}</div>
              <div className="font-display text-5xl text-gray-800 mb-6">{currentQ.question}</div>
              <input
                ref={inputRef}
                type="text"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Answer..."
                className="w-full text-center border-2 border-violet-200 rounded-2xl px-6 py-4 font-display text-3xl text-gray-800 bg-violet-50 focus:bg-white focus:border-violet-500 focus:outline-none transition-all"
                autoFocus
              />
              <button
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className="mt-4 w-full py-3 bg-gradient-to-r from-violet-500 to-indigo-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-display text-xl rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                Submit ⚡
              </button>
            </div>

            {/* Score so far */}
            <div className="flex justify-center gap-6 text-sm font-bold">
              <span className="text-green-600">✓ {results.filter(r => r.correct).length} correct</span>
              <span className="text-red-500">✗ {results.filter(r => !r.correct).length} wrong</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
