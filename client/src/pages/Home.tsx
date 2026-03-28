// Home page — Honeycomb Kingdom design
// Shows hero, topic grid ranked by importance, speed drill CTA, progress overview

import { useLocation } from "wouter";
import { topics, getTotalQuestionCount, speedDrills } from "@/data/questions";
import { useProgress } from "@/hooks/useProgress";

export default function Home() {
  const [, navigate] = useLocation();
  const { getTopicProgress, getTotalProgress } = useProgress();
  const total = getTotalQuestionCount();
  const { answered, correct } = getTotalProgress();

  return (
    <div className="min-h-screen honeycomb-bg">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐝</span>
            <div>
              <h1 className="font-display text-2xl text-amber-600 leading-none">Math Bee</h1>
              <p className="text-xs text-amber-500 font-semibold tracking-wide">National Bee Practice</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/speed-drill")}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-xl text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              ⚡ Speed Drill
            </button>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-10">
        {/* ── Hero ── */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 text-white p-8 shadow-xl">
          <div className="absolute inset-0 opacity-10"
            style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0-2l26-15V18L28 2 2 18v31l26 15z' fill='white'/%3E%3Cpath d='M28 100L0 84V50l28-16 28 16v34L28 100zm0-2l26-15V52L28 36 2 52v31l26 15z' fill='white'/%3E%3C/svg%3E\")"}}
          />
          <div className="relative flex flex-col md:flex-row items-center gap-6">
            <div className="text-7xl animate-bee-float select-none">🐝</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-display text-4xl md:text-5xl mb-2 drop-shadow">
                Welcome, Math Champ! 🏆
              </h2>
              <p className="text-amber-100 text-lg font-semibold mb-4">
                Practice all {total} questions across 14 topics — ranked from most to least important for the National Math Bee!
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center">
                  <div className="font-display text-2xl">{total}</div>
                  <div className="text-xs text-amber-100">Questions</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center">
                  <div className="font-display text-2xl">{speedDrills.length}</div>
                  <div className="text-xs text-amber-100">Speed Drills</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center">
                  <div className="font-display text-2xl">14</div>
                  <div className="text-xs text-amber-100">Topics</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center">
                  <div className="font-display text-2xl">{correct}</div>
                  <div className="text-xs text-amber-100">Correct ✓</div>
                </div>
              </div>
            </div>
          </div>
          {/* Overall progress */}
          {answered > 0 && (
            <div className="relative mt-5">
              <div className="flex justify-between text-sm text-amber-100 mb-1">
                <span>Overall Progress</span>
                <span>{answered}/{total} answered ({Math.round((correct/total)*100)}% correct)</span>
              </div>
              <div className="h-3 bg-white/25 rounded-full overflow-hidden">
                <div
                  className="h-full honey-bar"
                  style={{width: `${(answered/total)*100}%`}}
                />
              </div>
            </div>
          )}
        </section>

        {/* ── Speed Drill CTA ── */}
        <section
          onClick={() => navigate("/speed-drill")}
          className="cursor-pointer rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl">⚡</div>
            <div>
              <h3 className="font-display text-2xl mb-1">Speed Drill Mode</h3>
              <p className="text-violet-200 font-semibold">
                Race against the clock! {speedDrills.length} rapid-fire computation questions — addition, subtraction, multiplication, division, squares & more. 5 seconds each!
              </p>
            </div>
            <div className="ml-auto text-3xl">→</div>
          </div>
        </section>

        {/* ── Topics Grid ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 flex-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full" />
            <h2 className="font-display text-3xl text-amber-700">Practice Topics</h2>
            <div className="h-1 flex-1 bg-gradient-to-l from-amber-400 to-transparent rounded-full" />
          </div>
          <p className="text-center text-amber-600 font-semibold mb-6 -mt-3">
            📊 Ranked from most important (#1) to least important (#14) for the National Math Bee
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {topics.map((topic) => {
              const progress = getTopicProgress(topic.id);
              const pct = topic.questions.length > 0
                ? Math.round((progress.answered / topic.questions.length) * 100)
                : 0;
              const correctPct = progress.answered > 0
                ? Math.round((progress.correct / progress.answered) * 100)
                : 0;

              return (
                <div
                  key={topic.id}
                  className="topic-card bg-white rounded-2xl border border-amber-100 shadow-md overflow-hidden"
                  onClick={() => navigate(`/topic/${topic.id}`)}
                >
                  {/* Color bar */}
                  <div className="h-2" style={{background: topic.color}} />

                  <div className="p-4">
                    {/* Rank badge + emoji */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{topic.emoji}</span>
                        <span
                          className="font-display text-lg font-bold px-2 py-0.5 rounded-lg text-white text-sm"
                          style={{background: topic.color}}
                        >
                          #{topic.rank}
                        </span>
                      </div>
                      {pct === 100 && (
                        <span className="text-xl animate-sparkle-pop">⭐</span>
                      )}
                    </div>

                    <h3 className="font-display text-lg text-gray-800 leading-tight mb-1">
                      {topic.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3 leading-snug">{topic.description}</p>

                    {/* Question count */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>{topic.questions.length} questions</span>
                      {progress.answered > 0 && (
                        <span className="text-green-600 font-bold">{correctPct}% correct</span>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 bg-amber-100 rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          background: topic.color,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{progress.answered}/{topic.questions.length} done</span>
                      <button
                        className="text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-all hover:opacity-90 active:scale-95"
                        style={{background: topic.color}}
                      >
                        {progress.answered === 0 ? "Start →" : pct === 100 ? "Review ↺" : "Continue →"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Tips Section ── */}
        <section className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6">
          <h3 className="font-display text-2xl text-green-700 mb-4">🌟 How to Use This App</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: "📚", title: "Topic Practice", desc: "Work through topics in order (#1 first). Each question has 3 hints — try to answer without hints first!" },
              { icon: "⚡", title: "Speed Drills", desc: "Practice computation speed with 5-second rapid-fire questions. Great for building mental math skills!" },
              { icon: "🏆", title: "3-Hint System", desc: "Hint 1 is the hardest clue. Hint 2 gives more help. Hint 3 basically walks you through it. Use them wisely!" },
            ].map(tip => (
              <div key={tip.title} className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
                <div className="text-3xl mb-2">{tip.icon}</div>
                <h4 className="font-bold text-green-800 mb-1">{tip.title}</h4>
                <p className="text-sm text-green-700">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="text-center py-6 text-amber-500 text-sm font-semibold">
        🐝 Math Bee Practice App — National Mathematics Bee (Grade 3 & Under) 🐝
      </footer>
    </div>
  );
}
