// useInputMode — persists "keyboard" vs "tap" input mode in localStorage
// Tap mode: multiple-choice for Quiz, number-pad for Speed Drill
import { useState, useEffect, useCallback } from "react";

export type InputMode = "keyboard" | "tap";

const STORAGE_KEY = "mathbee_input_mode";
const UPDATE_EVENT = "mathbee_input_mode_update";

function loadMode(): InputMode {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw === "tap" ? "tap" : "keyboard";
  } catch {
    return "keyboard";
  }
}

function saveMode(mode: InputMode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
  } catch { /* ignore */ }
}

export function useInputMode() {
  const [mode, setModeState] = useState<InputMode>(loadMode);

  useEffect(() => {
    const handler = () => setModeState(loadMode());
    window.addEventListener(UPDATE_EVENT, handler);
    return () => window.removeEventListener(UPDATE_EVENT, handler);
  }, []);

  const setMode = useCallback((m: InputMode) => {
    saveMode(m);
    setModeState(m);
  }, []);

  const toggle = useCallback(() => {
    const next: InputMode = mode === "keyboard" ? "tap" : "keyboard";
    saveMode(next);
    setModeState(next);
  }, [mode]);

  return { mode, setMode, toggle };
}
