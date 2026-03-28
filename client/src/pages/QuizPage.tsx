// QuizPage — The main practice quiz with timer, 3 hints, and answer checking
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useParams } from "wouter";
import { getTopic, Question } from "@/data/questions";
import { useProgress } from "@/hooks/useProgress";

const QUESTION_TIME = 60; // seconds per question

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalizeAnswer(s: string): string {
  return s.toLowerCase().replace(/\s+/g, '').replace(/,/g, '').replace(/\$/g, '').replace(/meters?/g,'').replace(/feet?/g,'').replace(/ft/g,'').replace(/cm/g,'').replace(/km/g,'').replace(/kg/g,'').replace(/ml/g,'').replace(/minutes?/g,'').replace(/hours?/g,'').replace(/days?/g,'').replace(/miles?/g,'').replace(/sq/g,'').replace(/square/g,'').replace(/\./g,'').trim();
}

function checkAnswer(userAnswer: string, correctAnswer: string): boolean {
  const u = normalizeAnswer(userAnswer);
  const c = normalizeAnswer(correctAnswer);
  if (u === c) return true;
  // Also try numeric comparison
  const uNum = parseFloat(userAnswer.replace(/[^0-9./-]/g, ''));
  const cNum = parseFloat(correctAnswer.replace(/[^0-9./-]/g, ''));
  if (!isNaN(uNum) && !isNaN(cNum) && Math.abs(uNum - cNum) < 0.01) return true;
  return false;
}

export default function QuizPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const [, navigate] = useLocation();
  const topic = getTopic(topicId);
  const { recordAnswer } = useProgress();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [timedOut, setTimedOut] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionAnswered, setSessionAnswered] = useState(0);
  const [inputClass, setInputClass] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const [questionKey, setQuestionKey] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize questions
  useEffect(() => {
    if (!topic) return;
    setQuestions(shuffleArray(topic.questions));
  }, [topic]);

  // Timer
  useEffect(() => {
    if (submitted || timedOut || questions.length === 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setTimedOut(true);
          setSubmitted(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [submitted, timedOut, questions, currentIdx, questionKey]);

  const currentQ = questions[currentIdx];

  const handleSubmit = useCallback(() => {
    if (!currentQ || submitted) return;
    clearInterval(timerRef.current!);
    const correct = checkAnswer(userAnswer, currentQ.answer);
    setIsCorrect(correct);
    setSubmitted(true);
    recordAnswer(topicId, currentQ.id, correct);
    setSessionAnswered(s => s + 1);
    if (correct) {
      setSessionCorrect(s => s + 1);
      setInputClass("correct");
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1500);
    } else {
      setInputClass("wrong");
    }
  }, [currentQ, submitted, userAnswer, topicId, recordAnswer]);

  const handleNext = useCallback(() => {
    if (currentIdx + 1 >= questions.length) {
      navigate(`/results?topic=${topicId}&correct=${sessionCorrect + (isCorrect ? 0 : 0)}&total=${questions.length}`);
      return;
    }
    setCurrentIdx(i => i + 1);
    setUserAnswer("");
    setSubmitted(false);
    setIsCorrect(false);
    setHintsRevealed([]);
    setTimeLeft(QUESTION_TIME);
    setTimedOut(false);
    setInputClass("");
    setShowCelebration(false);
    setQuestionKey(k => k + 1);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [currentIdx, questions.length, navigate, topicId, sessionCorrect, isCorrect]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!submitted) handleSubmit();
      else handleNext();
    }
  };

  const revealHint = (idx: number) => {
    if (!hintsRevealed.includes(idx)) {
      setHintsRevealed(prev => [...prev, idx]);
    }
  };

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
  const circumference = 2 * Math.PI * 45; // r=45
  const dashOffset = circumference * (1 - timerPct / 100);

  const hintLabels = [
    { label: "Hint 1 — Hardest Clue 🔴", cls: "hint-hard", color: "#EF4444" },
    { label: "Hint 2 — Medium Clue 🟠", cls: "hint-medium", color: "#F97316" },
    { label: "Hint 3 — Easiest Clue 🟢", cls: "hint-easy", color: "#22C55E" },
  ];

  return (
    <div className="min-h-screen honeycomb-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="container flex items-center gap-3 py-3">
          <button onClick={() => navigate(`/topic/${topicId}`)} className="text-amber-600 hover:text-amber-800 font-bold transition-colors">
            ← Back
          </button>
          <span className="text-xl">{topic.emoji}</span>
          <h1 className="font-display text-lg text-amber-700 flex-1">{topic.name}</h1>
          <div className="flex items-center gap-2 text-sm font-bold">
            <span className="text-green-600">✓ {sessionCorrect}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{sessionAnswered}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-amber-100">
          <div
            className="h-full honey-bar transition-all duration-300"
            style={{width: `${((currentIdx) / questions.length) * 100}%`}}
          />
        </div>
      </header>

      <main className="container py-6 max-w-2xl mx-auto">
        {/* Question counter */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-amber-600">
            Question {currentIdx + 1} of {questions.length}
          </span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            currentQ.difficulty === 'easy' ? 'badge-easy' :
            currentQ.difficulty === 'medium' ? 'badge-medium' : 'badge-hard'
          }`}>
            {currentQ.difficulty.charAt(0).toUpperCase() + currentQ.difficulty.slice(1)}
          </span>
        </div>

        {/* Main quiz card */}
        <div className="bg-white rounded-3xl border border-amber-100 shadow-xl overflow-hidden animate-float-up" key={questionKey}>
          {/* Timer + Question */}
          <div className="p-6 pb-4">
            <div className="flex items-start gap-5">
              {/* Circular timer */}
              <div className="flex-shrink-0 relative w-24 h-24">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#FEF3C7" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="45" fill="none"
                    stroke={timerColor}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    style={{transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease'}}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-2xl" style={{color: timerColor}}>{timeLeft}</span>
                  <span className="text-xs text-gray-400">sec</span>
                </div>
              </div>

              {/* Question text */}
              <div className="flex-1">
                <p className="font-body text-lg font-bold text-gray-800 leading-snug">
                  {currentQ.question}
                </p>
              </div>
            </div>
          </div>

          {/* Answer area */}
          <div className="px-6 pb-4">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={submitted}
                placeholder="Type your answer here..."
                className={`answer-input flex-1 border-2 rounded-xl px-4 py-3 font-bold text-lg text-gray-800 bg-amber-50 focus:bg-white transition-all ${inputClass}`}
                autoFocus
              />
              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer.trim()}
                  className="px-5 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-200 text-white font-display text-lg rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  Check ✓
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-5 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-display text-lg rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  {currentIdx + 1 >= questions.length ? "Finish 🏁" : "Next →"}
                </button>
              )}
            </div>

            {/* Result feedback */}
            {submitted && (
              <div className={`mt-3 p-4 rounded-xl animate-float-up ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                {isCorrect ? (
                  <div className="flex items-center gap-3">
                    <span className={`text-3xl ${showCelebration ? 'animate-celebrate' : ''}`}>🎉</span>
                    <div>
                      <p className="font-bold text-green-700 text-lg">Correct! Amazing! 🌟</p>
                      <p className="text-green-600 text-sm">Answer: <strong>{currentQ.answer}</strong></p>
                    </div>
                  </div>
                ) : timedOut ? (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">⏰</span>
                    <div>
                      <p className="font-bold text-orange-700 text-lg">Time's up!</p>
                      <p className="text-orange-600 text-sm">Correct answer: <strong>{currentQ.answer}</strong></p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl animate-shake-wrong">😅</span>
                    <div>
                      <p className="font-bold text-red-700 text-lg">Not quite! Keep trying! 💪</p>
                      <p className="text-red-600 text-sm">Correct answer: <strong>{currentQ.answer}</strong></p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hints section */}
          {!submitted && (
            <div className="px-6 pb-6">
              <div className="border-t border-amber-100 pt-4">
                <p className="text-xs font-bold text-amber-600 mb-3 uppercase tracking-wide">
                  🔍 Need a hint? (Try without first!)
                </p>
                <div className="space-y-2">
                  {hintLabels.map((h, i) => (
                    <div key={i}>
                      {!hintsRevealed.includes(i) ? (
                        <button
                          onClick={() => revealHint(i)}
                          className="w-full text-left px-4 py-2.5 rounded-xl border-2 border-dashed font-semibold text-sm transition-all hover:bg-amber-50"
                          style={{borderColor: h.color, color: h.color}}
                        >
                          👁 Reveal {h.label}
                        </button>
                      ) : (
                        <div className={`${h.cls} rounded-xl p-3 animate-hint-drop`}>
                          <p className="text-xs font-bold mb-1" style={{color: h.color}}>{h.label}</p>
                          <p className="text-sm text-gray-700 font-medium">{currentQ.hints[i]}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Show all hints after submission if wrong */}
          {submitted && !isCorrect && (
            <div className="px-6 pb-6">
              <div className="border-t border-amber-100 pt-4">
                <p className="text-xs font-bold text-amber-600 mb-3 uppercase tracking-wide">
                  💡 Here's how to solve it:
                </p>
                <div className="space-y-2">
                  {hintLabels.map((h, i) => (
                    <div key={i} className={`${h.cls} rounded-xl p-3`}>
                      <p className="text-xs font-bold mb-1" style={{color: h.color}}>{h.label}</p>
                      <p className="text-sm text-gray-700 font-medium">{currentQ.hints[i]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Keyboard hint */}
        <p className="text-center text-xs text-amber-400 mt-4 font-semibold">
          Press <kbd className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-bold">Enter</kbd> to submit or advance
        </p>
      </main>
    </div>
  );
}
