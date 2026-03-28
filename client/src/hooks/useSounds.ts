// useSounds — Web Audio API sound effects for Math Bee
// No external library needed — all sounds synthesized in-browser
// Sounds: correct (cheerful buzz), wrong (gentle low tone), hint (soft chime), fanfare (victory), speedCorrect (quick ping)

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  gainValue = 0.3,
  startDelay = 0,
  fadeOut = true
) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + startDelay);
    gain.gain.setValueAtTime(gainValue, ctx.currentTime + startDelay);
    if (fadeOut) {
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startDelay + duration);
    }
    osc.start(ctx.currentTime + startDelay);
    osc.stop(ctx.currentTime + startDelay + duration);
  } catch {
    // Silently ignore if audio is not supported
  }
}

/** Cheerful ascending buzz — correct answer */
export function playCorrect() {
  playTone(523, 0.12, "triangle", 0.35, 0.00); // C5
  playTone(659, 0.12, "triangle", 0.35, 0.10); // E5
  playTone(784, 0.20, "triangle", 0.35, 0.20); // G5
}

/** Gentle descending tone — wrong answer */
export function playWrong() {
  playTone(330, 0.15, "sine", 0.25, 0.00); // E4
  playTone(262, 0.25, "sine", 0.20, 0.12); // C4
}

/** Soft chime — hint revealed */
export function playHint() {
  playTone(880, 0.08, "sine", 0.18, 0.00); // A5
  playTone(1047, 0.15, "sine", 0.15, 0.08); // C6
}

/** Victory fanfare — topic completed */
export function playFanfare() {
  // C E G C (ascending arpeggio + held note)
  playTone(523, 0.10, "triangle", 0.40, 0.00);  // C5
  playTone(659, 0.10, "triangle", 0.40, 0.12);  // E5
  playTone(784, 0.10, "triangle", 0.40, 0.24);  // G5
  playTone(1047, 0.40, "triangle", 0.40, 0.36); // C6 — held
  // Harmony
  playTone(784, 0.40, "sine", 0.20, 0.36);      // G5 harmony
}

/** Quick ping — speed drill correct */
export function playSpeedCorrect() {
  playTone(1047, 0.08, "square", 0.15, 0.00); // C6 quick
}

/** Low buzz — speed drill wrong */
export function playSpeedWrong() {
  playTone(196, 0.18, "sawtooth", 0.12, 0.00); // G3 buzz
}

/** Timer warning — last 10 seconds */
export function playTimerWarning() {
  playTone(880, 0.05, "sine", 0.10, 0.00);
}

// Hook for components that want a clean API
export function useSounds() {
  return {
    playCorrect,
    playWrong,
    playHint,
    playFanfare,
    playSpeedCorrect,
    playSpeedWrong,
    playTimerWarning,
  };
}
