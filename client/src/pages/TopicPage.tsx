// TopicPage — shows topic overview, progress, and lets user start/reset quiz
// All bg colors use inline style to avoid Tailwind v4 CSS-var generation gaps
import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { getTopic } from "@/data/questions";
import { useProgress } from "@/hooks/useProgress";

export default function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const [, navigate] = useLocation();
  const topic = getTopic(topicId);
  const { getTopicProgress, resetTopicProgress } = useProgress();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!topic) {
    return (
      <div className="min-h-screen honeycomb-bg flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🐝</div>
          <h2 className="font-display text-2xl text-amber-700">Topic not found!</h2>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-white px-6 py-2 rounded-xl font-bold"
            style={{ backgroundColor: "#F59E0B" }}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const progress = getTopicProgress(topic.id);
  const pct = Math.round((progress.answered / topic.questions.length) * 100);
  const correctPct = progress.answered > 0 ? Math.round((progress.correct / progress.answered) * 100) : 0;

  const diffCounts = {
    easy: topic.questions.filter(q => q.difficulty === "easy").length,
    medium: topic.questions.filter(q => q.difficulty === "medium").length,
    hard: topic.questions.filter(q => q.difficulty === "hard").length,
  };

  const handleReset = () => {
    resetTopicProgress(topic.id);
    setShowResetConfirm(false);
  };

  return (
    <div className="min-h-screen honeycomb-bg">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="container flex items-center gap-3 py-3">
          <button onClick={() => navigate("/")} className="text-amber-600 hover:text-amber-800 font-bold text-lg transition-colors">
            ← Back
          </button>
          <span className="text-amber-300">|</span>
          <span className="text-2xl">{topic.emoji}</span>
          <h1 className="font-display text-xl text-amber-700">{topic.name}</h1>
          <span
            className="ml-auto px-3 py-1 rounded-full text-white text-sm font-bold"
            style={{ background: topic.color }}
          >
            Rank #{topic.rank}
          </span>
        </div>
      </header>

      <main className="container py-8 max-w-3xl mx-auto space-y-6">
        {/* Hero card */}
        <div
          className="rounded-3xl p-8 text-white shadow-xl"
          style={{ background: `linear-gradient(135deg, ${topic.color}, ${topic.color}cc)` }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{topic.emoji}</span>
            <div>
              <h2 className="font-display text-3xl">{topic.name}</h2>
              <p className="text-white/80 font-semibold">{topic.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { val: topic.questions.length, label: "Questions" },
              { val: progress.correct, label: "Correct" },
              { val: `${correctPct}%`, label: "Accuracy" },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                <div className="font-display text-2xl">{s.val}</div>
                <div className="text-xs text-white/80">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-2 flex justify-between text-sm text-white/80">
            <span>Progress</span>
            <span>{progress.answered}/{topic.questions.length}</span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.25)" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: "rgba(255,255,255,0.8)" }} />
          </div>
        </div>

        {/* Difficulty breakdown */}
        <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-6">
          <h3 className="font-display text-xl text-amber-700 mb-4">Question Breakdown</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl p-3 text-center" style={{ backgroundColor: "#DCFCE7", border: "1px solid #BBF7D0" }}>
              <div className="font-display text-2xl" style={{ color: "#166534" }}>{diffCounts.easy}</div>
              <div className="text-xs font-bold" style={{ color: "#16A34A" }}>Easy</div>
            </div>
            <div className="rounded-xl p-3 text-center" style={{ backgroundColor: "#FEF9C3", border: "1px solid #FEF08A" }}>
              <div className="font-display text-2xl" style={{ color: "#854D0E" }}>{diffCounts.medium}</div>
              <div className="text-xs font-bold" style={{ color: "#CA8A04" }}>Medium</div>
            </div>
            <div className="rounded-xl p-3 text-center" style={{ backgroundColor: "#FEE2E2", border: "1px solid #FECACA" }}>
              <div className="font-display text-2xl" style={{ color: "#991B1B" }}>{diffCounts.hard}</div>
              <div className="text-xs font-bold" style={{ color: "#DC2626" }}>Hard</div>
            </div>
          </div>
        </div>

        {/* Hint system explanation */}
        <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-6">
          <h3 className="font-display text-xl text-amber-700 mb-4">🔍 The 3-Hint System</h3>
          <div className="space-y-3">
            <div className="hint-hard rounded-xl p-3">
              <div className="font-bold text-sm mb-1" style={{ color: "#EF4444" }}>🔴 Hint 1 — Hardest Clue</div>
              <div className="text-sm text-gray-600">A subtle nudge in the right direction. Tests if you can figure it out with minimal help.</div>
            </div>
            <div className="hint-medium rounded-xl p-3">
              <div className="font-bold text-sm mb-1" style={{ color: "#F97316" }}>🟠 Hint 2 — Medium Clue</div>
              <div className="text-sm text-gray-600">More specific guidance. Helps you identify the right approach or method.</div>
            </div>
            <div className="hint-easy rounded-xl p-3">
              <div className="font-bold text-sm mb-1" style={{ color: "#22C55E" }}>🟢 Hint 3 — Easiest Clue</div>
              <div className="text-sm text-gray-600">Step-by-step walkthrough. Use only when you're truly stuck!</div>
            </div>
          </div>
        </div>

        {/* Session persistence notice */}
        <div className="rounded-2xl border border-blue-100 p-4 flex items-start gap-3" style={{ backgroundColor: "#EFF6FF" }}>
          <span className="text-2xl">💾</span>
          <div>
            <p className="font-bold text-blue-800 text-sm">Progress is saved automatically</p>
            <p className="text-blue-700 text-xs mt-0.5">
              Your answers are stored in this browser. You can close the app and come back later — your progress will still be here!
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate(`/quiz/${topic.id}`)}
            className="flex-1 py-4 rounded-2xl text-white font-display text-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: `linear-gradient(135deg, ${topic.color}, ${topic.color}cc)` }}
          >
            {progress.answered === 0 ? "🚀 Start Practice!" : pct === 100 ? "↺ Practice Again" : "▶ Continue Practice"}
          </button>

          {/* Reset button */}
          {progress.answered > 0 && !showResetConfirm && (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-6 py-4 rounded-2xl border-2 font-bold transition-all"
              style={{ borderColor: "#FCA5A5", color: "#DC2626", backgroundColor: "transparent" }}
            >
              🗑 Clear Progress
            </button>
          )}
        </div>

        {/* Reset confirmation */}
        {showResetConfirm && (
          <div className="rounded-2xl border-2 border-red-200 p-5 animate-float-up" style={{ backgroundColor: "#FEF2F2" }}>
            <p className="font-bold text-red-700 mb-1">⚠️ Clear all progress for {topic.name}?</p>
            <p className="text-red-600 text-sm mb-4">
              This will reset your {progress.answered} answered questions and {progress.correct} correct answers for this topic. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 rounded-xl text-white font-bold transition-all active:scale-95"
                style={{ backgroundColor: "#DC2626" }}
              >
                Yes, clear it
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl font-bold border-2 border-gray-200 text-gray-600 transition-all"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
