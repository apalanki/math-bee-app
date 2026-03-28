// useProgress — persists quiz progress to localStorage and keeps React state in sync
// Uses a custom event ("mathbee_progress_update") so all mounted components re-render on change
import { useState, useEffect, useCallback } from "react";

export interface TopicProgress {
  answered: number;
  correct: number;
  answeredIds: string[];
}

interface ProgressStore {
  [topicId: string]: TopicProgress;
}

const STORAGE_KEY = "mathbee_progress_v2";
const UPDATE_EVENT = "mathbee_progress_update";

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
    // Notify all hook instances in the same tab
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
  } catch {
    // ignore quota errors
  }
}

// ── Main progress hook ──────────────────────────────────────────────────────
export function useProgress() {
  // Local state mirrors localStorage so components re-render on changes
  const [store, setStore] = useState<ProgressStore>(() => loadProgress());

  // Re-sync when another component writes progress
  useEffect(() => {
    const handler = () => setStore(loadProgress());
    window.addEventListener(UPDATE_EVENT, handler);
    // Also sync across tabs via storage event
    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEY) setStore(loadProgress());
    });
    return () => {
      window.removeEventListener(UPDATE_EVENT, handler);
    };
  }, []);

  const getTopicProgress = useCallback((topicId: string): TopicProgress => {
    return store[topicId] ?? { answered: 0, correct: 0, answeredIds: [] };
  }, [store]);

  const recordAnswer = useCallback((topicId: string, questionId: string, isCorrect: boolean) => {
    const current = loadProgress(); // always read fresh from storage
    const existing = current[topicId] ?? { answered: 0, correct: 0, answeredIds: [] };
    // Only count each question once
    if (!existing.answeredIds.includes(questionId)) {
      existing.answeredIds = [...existing.answeredIds, questionId];
      existing.answered += 1;
      if (isCorrect) existing.correct += 1;
    }
    current[topicId] = existing;
    saveProgress(current);
    setStore({ ...current });
  }, []);

  const getTotalProgress = useCallback(() => {
    let answered = 0;
    let correct = 0;
    for (const tp of Object.values(store)) {
      answered += tp.answered;
      correct += tp.correct;
    }
    return { answered, correct };
  }, [store]);

  const resetTopicProgress = useCallback((topicId: string) => {
    const current = loadProgress();
    delete current[topicId];
    saveProgress(current);
    setStore({ ...current });
  }, []);

  const resetAllProgress = useCallback(() => {
    saveProgress({});
    setStore({});
  }, []);

  return { store, getTopicProgress, recordAnswer, getTotalProgress, resetTopicProgress, resetAllProgress };
}

// ── Speed drill scores ──────────────────────────────────────────────────────
const SPEED_KEY = "mathbee_speed_scores_v2";

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
      localStorage.setItem(SPEED_KEY, JSON.stringify(scores.slice(0, 50)));
    } catch { /* ignore */ }
  }, [getScores]);

  return { getScores, addScore };
}
