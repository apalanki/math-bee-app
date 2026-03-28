// ResultsPage — shows quiz session summary
// All bg colors use inline style to avoid Tailwind v4 CSS-var generation gaps
import { useLocation } from "wouter";
import { getTopic } from "@/data/questions";
import { useProgress } from "@/hooks/useProgress";

export default function ResultsPage() {
  const [location, navigate] = useLocation();
  const params = new URLSearchParams(location.split("?")[1] || "");
  const topicId = params.get("topic") || "";
  const topic = getTopic(topicId);
  const { getTopicProgress, resetTopicProgress } = useProgress();
  const progress = topic ? getTopicProgress(topicId) : null;

  const correct = progress?.correct ?? 0;
  const total = topic?.questions.length ?? 0;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;

  const heroBg =
    pct >= 80 ? "linear-gradient(135deg, #16A34A, #059669)" :
    pct >= 60 ? "linear-gradient(135deg, #F59E0B, #EA580C)" :
    "linear-gradient(135deg, #6366F1, #7C3AED)";

  return (
    <div className="min-h-screen honeycomb-bg flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        <div className="rounded-3xl p-8 text-white text-center shadow-xl" style={{ background: heroBg }}>
          <div className="text-5xl mb-3">{"⭐".repeat(stars)}{"☆".repeat(3 - stars)}</div>
          {topic && <div className="text-4xl mb-2">{topic.emoji}</div>}
          <h2 className="font-display text-3xl mb-1">
            {topic ? topic.name : "Quiz"} Complete!
          </h2>
          <div className="font-display text-6xl my-3">{pct}%</div>
          <div className="text-xl font-semibold text-white/90">{correct} / {total} correct</div>
          <div className="mt-3 text-white/80 font-semibold">
            {pct >= 90 ? "🔥 Outstanding! You're a Math Bee champion!" :
             pct >= 70 ? "💪 Excellent work! Keep it up!" :
             pct >= 50 ? "👍 Good effort! Review the hints and try again!" :
             "🌱 Don't give up! Practice makes perfect!"}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {topic && (
            <button
              onClick={() => navigate(`/quiz/${topicId}`)}
              className="w-full py-4 rounded-2xl text-white font-display text-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              style={{ background: topic.color }}
            >
              🔄 Practice Again
            </button>
          )}
          {topic && (
            <button
              onClick={() => { resetTopicProgress(topicId); navigate(`/quiz/${topicId}`); }}
              className="w-full py-3 border-2 border-amber-300 text-amber-700 font-bold rounded-2xl transition-all"
              style={{ backgroundColor: "transparent" }}
            >
              ↺ Reset &amp; Start Fresh
            </button>
          )}
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 border-2 border-amber-200 text-amber-700 font-bold rounded-2xl shadow-md transition-all"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
