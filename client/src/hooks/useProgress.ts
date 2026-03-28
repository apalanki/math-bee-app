// useProgress — persists quiz progress to localStorage
import { useCallback } from "react";

interface TopicProgress {
  answered: number;
  correct: number;
  answeredIds: string[];
}

interface ProgressStore {
  [topicId: string]: TopicProgress;
}

const STORAGE_KEY = "mathbee_progress";

function loadProgress(): ProgressStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(store: ProgressStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore
  }
}

export function useProgress() {
  const getTopicProgress = useCallback((topicId: string): TopicProgress => {
    const store = loadProgress();
    return store[topicId] ?? { answered: 0, correct: 0, answeredIds: [] };
  }, []);

  const recordAnswer = useCallback((topicId: string, questionId: string, isCorrect: boolean) => {
    const store = loadProgress();
    const existing = store[topicId] ?? { answered: 0, correct: 0, answeredIds: [] };
    if (!existing.answeredIds.includes(questionId)) {
      existing.answeredIds.push(questionId);
      existing.answered += 1;
      if (isCorrect) existing.correct += 1;
    }
    store[topicId] = existing;
    saveProgress(store);
  }, []);

  const getTotalProgress = useCallback(() => {
    const store = loadProgress();
    let answered = 0;
    let correct = 0;
    for (const tp of Object.values(store)) {
      answered += tp.answered;
      correct += tp.correct;
    }
    return { answered, correct };
  }, []);

  const resetTopicProgress = useCallback((topicId: string) => {
    const store = loadProgress();
    delete store[topicId];
    saveProgress(store);
  }, []);

  const resetAllProgress = useCallback(() => {
    saveProgress({});
  }, []);

  return { getTopicProgress, recordAnswer, getTotalProgress, resetTopicProgress, resetAllProgress };
}

// Speed drill scores
const SPEED_KEY = "mathbee_speed_scores";

export interface SpeedScore {
  date: string;
  category: string;
  correct: number;
  total: number;
  timePerQuestion: number;
}

export function useSpeedScores() {
  const getScores = useCallback((): SpeedScore[] => {
    try {
      const raw = localStorage.getItem(SPEED_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }, []);

  const addScore = useCallback((score: SpeedScore) => {
    try {
      const scores = getScores();
      scores.unshift(score);
      const trimmed = scores.slice(0, 50); // keep last 50
      localStorage.setItem(SPEED_KEY, JSON.stringify(trimmed));
    } catch { /* ignore */ }
  }, [getScores]);

  return { getScores, addScore };
}
