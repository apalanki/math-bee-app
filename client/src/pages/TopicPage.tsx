// TopicPage — shows topic overview and lets user start quiz
import { useLocation, useParams } from "wouter";
import { getTopic } from "@/data/questions";
import { useProgress } from "@/hooks/useProgress";

export default function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const [, navigate] = useLocation();
  const topic = getTopic(topicId);
  const { getTopicProgress, resetTopicProgress } = useProgress();

  if (!topic) {
    return (
      <div className="min-h-screen honeycomb-bg flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🐝</div>
          <h2 className="font-display text-2xl text-amber-700">Topic not found!</h2>
          <button onClick={() => navigate("/")} className="mt-4 bg-amber-500 text-white px-6 py-2 rounded-xl font-bold">
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
    easy: topic.questions.filter(q => q.difficulty === 'easy').length,
    medium: topic.questions.filter(q => q.difficulty === 'medium').length,
    hard: topic.questions.filter(q => q.difficulty === 'hard').length,
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
          <span className="ml-auto px-3 py-1 rounded-full text-white text-sm font-bold" style={{background: topic.color}}>
            Rank #{topic.rank}
          </span>
        </div>
      </header>

      <main className="container py-8 max-w-3xl mx-auto space-y-6">
        {/* Hero card */}
        <div className="rounded-3xl p-8 text-white shadow-xl" style={{background: `linear-gradient(135deg, ${topic.color}, ${topic.color}cc)`}}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{topic.emoji}</span>
            <div>
              <h2 className="font-display text-3xl">{topic.name}</h2>
              <p className="text-white/80 font-semibold">{topic.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <div className="font-display text-2xl">{topic.questions.length}</div>
              <div className="text-xs text-white/80">Questions</div>
            </div>
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <div className="font-display text-2xl">{progress.correct}</div>
              <div className="text-xs text-white/80">Correct</div>
            </div>
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <div className="font-display text-2xl">{correctPct}%</div>
              <div className="text-xs text-white/80">Accuracy</div>
            </div>
          </div>

          <div className="mb-2 flex justify-between text-sm text-white/80">
            <span>Progress</span>
            <span>{progress.answered}/{topic.questions.length}</span>
          </div>
          <div className="h-3 bg-white/25 rounded-full overflow-hidden">
            <div className="h-full bg-white/80 rounded-full transition-all" style={{width: `${pct}%`}} />
          </div>
        </div>

        {/* Difficulty breakdown */}
        <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-6">
          <h3 className="font-display text-xl text-amber-700 mb-4">Question Breakdown</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="badge-easy rounded-xl p-3 text-center">
              <div className="font-display text-2xl text-green-700">{diffCounts.easy}</div>
              <div className="text-xs font-bold text-green-600">Easy</div>
            </div>
            <div className="badge-medium rounded-xl p-3 text-center">
              <div className="font-display text-2xl text-yellow-700">{diffCounts.medium}</div>
              <div className="text-xs font-bold text-yellow-600">Medium</div>
            </div>
            <div className="badge-hard rounded-xl p-3 text-center">
              <div className="font-display text-2xl text-red-700">{diffCounts.hard}</div>
              <div className="text-xs font-bold text-red-600">Hard</div>
            </div>
          </div>
        </div>

        {/* Hint system explanation */}
        <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-6">
          <h3 className="font-display text-xl text-amber-700 mb-4">🔍 The 3-Hint System</h3>
          <div className="space-y-3">
            <div className="hint-hard rounded-xl p-3">
              <div className="font-bold text-red-700 text-sm mb-1">🔴 Hint 1 — Hardest Clue</div>
              <div className="text-sm text-gray-600">A subtle nudge in the right direction. Tests if you can figure it out with minimal help.</div>
            </div>
            <div className="hint-medium rounded-xl p-3">
              <div className="font-bold text-orange-700 text-sm mb-1">🟠 Hint 2 — Medium Clue</div>
              <div className="text-sm text-gray-600">More specific guidance. Helps you identify the right approach or method.</div>
            </div>
            <div className="hint-easy rounded-xl p-3">
              <div className="font-bold text-green-700 text-sm mb-1">🟢 Hint 3 — Easiest Clue</div>
              <div className="text-sm text-gray-600">Step-by-step walkthrough. Use only when you're truly stuck!</div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate(`/quiz/${topic.id}`)}
            className="flex-1 py-4 rounded-2xl text-white font-display text-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{background: `linear-gradient(135deg, ${topic.color}, ${topic.color}cc)`}}
          >
            {progress.answered === 0 ? "🚀 Start Practice!" : pct === 100 ? "↺ Practice Again" : "▶ Continue Practice"}
          </button>
          {progress.answered > 0 && (
            <button
              onClick={() => { resetTopicProgress(topic.id); navigate(`/quiz/${topic.id}`); }}
              className="px-6 py-4 rounded-2xl border-2 border-amber-300 text-amber-700 font-bold hover:bg-amber-50 transition-all"
            >
              🔄 Reset & Restart
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
