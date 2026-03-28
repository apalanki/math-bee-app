// ParentReportPage — progress overview for parents
// Shows: accuracy per topic (bar chart), weakest topics, speed drill history, per-topic reset
// All bg colors use inline style to avoid Tailwind v4 CSS-var generation gaps
import { useLocation } from "wouter";
import { topics } from "@/data/questions";
import { useProgress, useSpeedScores } from "@/hooks/useProgress";

const C = {
  amber: "#F59E0B",
  amberLight: "#FFFBEB",
  amberBorder: "#FDE68A",
  orange: "#F97316",
  green: "#16A34A",
  greenLight: "#F0FDF4",
  red: "#DC2626",
  redLight: "#FEF2F2",
  blue: "#2563EB",
  blueLight: "#EFF6FF",
  violet: "#7C3AED",
  violetLight: "#EDE9FE",
  gray: "#6B7280",
  grayLight: "#F9FAFB",
  border: "#E5E7EB",
};

function AccuracyBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height: 12, backgroundColor: "#E5E7EB" }}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

function getBarColor(pct: number): string {
  if (pct >= 80) return C.green;
  if (pct >= 50) return C.amber;
  return C.red;
}

function getStatusEmoji(pct: number): string {
  if (pct >= 80) return "🌟";
  if (pct >= 50) return "📈";
  if (pct > 0) return "🔥";
  return "⬜";
}

export default function ParentReportPage() {
  const [, navigate] = useLocation();
  const { store, getTopicProgress, getTotalProgress, resetTopicProgress, resetAllProgress } = useProgress();
  const { getScores } = useSpeedScores();

  const { answered: totalAnswered, correct: totalCorrect } = getTotalProgress();
  const overallPct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const speedScores = getScores().slice(0, 10);

  // Sort topics: attempted first (by accuracy asc = weakest first), then unattempted
  const topicsWithStats = topics.map(t => {
    const prog = getTopicProgress(t.id);
    const pct = prog.answered > 0 ? Math.round((prog.correct / prog.answered) * 100) : -1;
    return { topic: t, prog, pct };
  });

  const attempted = topicsWithStats.filter(x => x.pct >= 0).sort((a, b) => a.pct - b.pct);
  const unattempted = topicsWithStats.filter(x => x.pct < 0);
  const weakest = attempted.slice(0, 3); // bottom 3 by accuracy

  const handleResetTopic = (topicId: string, topicName: string) => {
    if (window.confirm(`Reset all progress for "${topicName}"? This cannot be undone.`)) {
      resetTopicProgress(topicId);
    }
  };

  const handleResetAll = () => {
    if (window.confirm("Reset ALL progress across every topic? This cannot be undone.")) {
      resetAllProgress();
    }
  };

  return (
    <div className="min-h-screen honeycomb-bg">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="container flex items-center gap-3 py-3">
          <button onClick={() => navigate("/")} className="text-amber-600 hover:text-amber-800 font-bold transition-colors">
            ← Back
          </button>
          <span className="text-2xl">📊</span>
          <h1 className="font-display text-xl flex-1" style={{ color: C.amber }}>Parent Report</h1>
          <button
            onClick={handleResetAll}
            className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
            style={{ backgroundColor: C.redLight, color: C.red, border: `1px solid #FECACA` }}
          >
            Reset All
          </button>
        </div>
      </header>

      <main className="container py-8 max-w-3xl mx-auto space-y-8">

        {/* ── Overall Summary ── */}
        <section className="rounded-3xl p-8 text-white shadow-xl"
          style={{ background: `linear-gradient(135deg, ${C.amber}, ${C.orange})` }}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-7xl">🐝</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-display text-3xl mb-1">Overall Progress</h2>
              <p className="text-amber-100 text-sm mb-4">
                {totalAnswered} questions attempted across all topics
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { val: totalAnswered, label: "Attempted" },
                  { val: totalCorrect, label: "Correct ✓" },
                  { val: `${overallPct}%`, label: "Accuracy" },
                ].map(s => (
                  <div key={s.label} className="rounded-xl px-3 py-2 text-center"
                    style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                    <div className="font-display text-2xl">{s.val}</div>
                    <div className="text-xs text-amber-100">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Weakest Topics ── */}
        {weakest.length > 0 && (
          <section className="bg-white rounded-2xl border shadow-md overflow-hidden"
            style={{ borderColor: "#FECACA" }}>
            <div className="px-6 py-4 flex items-center gap-2"
              style={{ background: "linear-gradient(90deg, #FEF2F2, #FFF7ED)" }}>
              <span className="text-2xl">🔥</span>
              <h2 className="font-display text-xl" style={{ color: C.red }}>
                Needs More Practice
              </h2>
              <span className="ml-auto text-xs font-semibold px-2 py-1 rounded-full"
                style={{ backgroundColor: "#FEE2E2", color: C.red }}>
                Focus here!
              </span>
            </div>
            <div className="divide-y" style={{ borderColor: C.border }}>
              {weakest.map(({ topic, prog, pct }) => (
                <div key={topic.id} className="px-6 py-4 flex items-center gap-4">
                  <span className="text-3xl">{topic.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm truncate" style={{ color: "#1F2937" }}>
                        {topic.name}
                      </span>
                      <span className="text-sm font-bold ml-2" style={{ color: getBarColor(pct) }}>
                        {pct}%
                      </span>
                    </div>
                    <AccuracyBar pct={pct} color={getBarColor(pct)} />
                    <p className="text-xs mt-1" style={{ color: C.gray }}>
                      {prog.correct}/{prog.answered} correct
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/quiz/${topic.id}`)}
                    className="text-xs font-bold px-3 py-2 rounded-xl whitespace-nowrap transition-all"
                    style={{ backgroundColor: "#FEF3C7", color: "#92400E", border: "1px solid #FDE68A" }}
                  >
                    Practice →
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── All Topics Accuracy ── */}
        <section className="bg-white rounded-2xl border shadow-md overflow-hidden"
          style={{ borderColor: C.amberBorder }}>
          <div className="px-6 py-4"
            style={{ background: "linear-gradient(90deg, #FFFBEB, #FFF7ED)" }}>
            <h2 className="font-display text-xl" style={{ color: C.amber }}>
              📚 All Topics
            </h2>
          </div>
          <div className="divide-y" style={{ borderColor: C.border }}>
            {[...attempted, ...unattempted].map(({ topic, prog, pct }) => {
              const isAttempted = pct >= 0;
              const displayPct = isAttempted ? pct : 0;
              return (
                <div key={topic.id} className="px-6 py-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{topic.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm" style={{ color: "#1F2937" }}>
                          <span className="text-xs font-normal mr-1" style={{ color: C.gray }}>#{topic.rank}</span>
                          {topic.name}
                          <span className="ml-2">{getStatusEmoji(displayPct)}</span>
                        </span>
                        <span className="text-sm font-bold" style={{ color: isAttempted ? getBarColor(displayPct) : C.gray }}>
                          {isAttempted ? `${displayPct}%` : "Not started"}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => navigate(`/quiz/${topic.id}`)}
                        className="text-xs font-bold px-2 py-1 rounded-lg transition-all"
                        style={{ backgroundColor: C.amberLight, color: "#92400E", border: `1px solid ${C.amberBorder}` }}
                      >
                        Practice
                      </button>
                      {isAttempted && (
                        <button
                          onClick={() => handleResetTopic(topic.id, topic.name)}
                          className="text-xs font-bold px-2 py-1 rounded-lg transition-all"
                          style={{ backgroundColor: C.redLight, color: C.red, border: "1px solid #FECACA" }}
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                  <AccuracyBar pct={displayPct} color={getBarColor(displayPct)} />
                  {isAttempted && (
                    <p className="text-xs mt-1" style={{ color: C.gray }}>
                      {prog.correct} correct out of {prog.answered} answered
                      {prog.answered < topic.questions.length && (
                        <span> · {topic.questions.length - prog.answered} remaining</span>
                      )}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Speed Drill History ── */}
        {speedScores.length > 0 && (
          <section className="bg-white rounded-2xl border shadow-md overflow-hidden"
            style={{ borderColor: "#DDD6FE" }}>
            <div className="px-6 py-4"
              style={{ background: "linear-gradient(90deg, #EDE9FE, #EEF2FF)" }}>
              <h2 className="font-display text-xl" style={{ color: C.violet }}>
                ⚡ Speed Drill History
              </h2>
            </div>
            <div className="divide-y" style={{ borderColor: C.border }}>
              {speedScores.map((s, i) => {
                const pct = Math.round((s.correct / s.total) * 100);
                return (
                  <div key={i} className="px-6 py-3 flex items-center gap-4">
                    <div className="text-2xl font-display" style={{ color: C.violet, minWidth: 32 }}>
                      #{i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm" style={{ color: "#1F2937" }}>
                          {s.category} · {s.date}
                        </span>
                        <span className="font-bold text-sm" style={{ color: getBarColor(pct) }}>
                          {pct}%
                        </span>
                      </div>
                      <AccuracyBar pct={pct} color={getBarColor(pct)} />
                      <p className="text-xs mt-1" style={{ color: C.gray }}>
                        {s.correct}/{s.total} correct · ~{s.timePerQuestion}s per question
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Tips for Parents ── */}
        <section className="bg-white rounded-2xl border shadow-md p-6"
          style={{ borderColor: C.amberBorder }}>
          <h2 className="font-display text-xl mb-4" style={{ color: C.amber }}>
            💡 Tips for Parents
          </h2>
          <div className="space-y-3">
            {[
              { icon: "🎯", title: "Focus on weakest topics first", desc: "The red topics above need the most attention. Do 5–10 questions per day in those areas." },
              { icon: "⚡", title: "Speed drills build mental math", desc: "Aim for 80%+ accuracy before increasing speed. Accuracy first, then speed." },
              { icon: "💡", title: "Use hints strategically", desc: "Encourage trying without hints first. Hints are scaffolding — the goal is to need them less over time." },
              { icon: "🏆", title: "Short daily sessions beat long ones", desc: "15–20 minutes per day is more effective than a 2-hour session once a week." },
            ].map(tip => (
              <div key={tip.title} className="flex gap-3 p-3 rounded-xl" style={{ backgroundColor: C.amberLight }}>
                <span className="text-2xl shrink-0">{tip.icon}</span>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#92400E" }}>{tip.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#B45309" }}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
