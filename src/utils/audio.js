/**
 * Sound Effects Utility
 * Phase 4: Audio feedback for game events
 * 
 * Uses Web Audio API with fallback to HTML5 Audio.
 * Sounds are generated programmatically to avoid external dependencies.
 */

const SOUND_STORAGE_KEY = 'capitalCardGame_soundEnabled';

// Audio context for generating sounds
let audioContext = null;

/**
 * Initialize the audio context (must be called after user interaction)
 */
function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

/**
 * Load sound preference from localStorage
 */
export function getSoundEnabled() {
  try {
    const stored = localStorage.getItem(SOUND_STORAGE_KEY);
    // Default to enabled if not set
    return stored === null ? true : stored === 'true';
  } catch {
    return true;
  }
}

/**
 * Save sound preference to localStorage
 */
export function setSoundEnabled(enabled) {
  try {
    localStorage.setItem(SOUND_STORAGE_KEY, String(enabled));
  } catch (e) {
    console.warn('Failed to save sound preference:', e);
  }
}

/**
 * Play a success/correct sound
 * A pleasant ascending two-note chime
 */
export function playCorrectSound() {
  if (!getSoundEnabled()) return;
  
  try {
    const ctx = initAudioContext();
    const now = ctx.currentTime;
    
    // Create oscillator for first note
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.frequency.value = 523.25; // C5
    osc1.type = 'sine';
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialDecayTo = 0.01;
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialDecayTo?.(0.01, now + 0.15) || gain1.gain.linearRampToValueAtTime(0.01, now + 0.15);
    osc1.start(now);
    osc1.stop(now + 0.15);
    
    // Create oscillator for second note (higher)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.frequency.value = 659.25; // E5
    osc2.type = 'sine';
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.setValueAtTime(0.3, now + 0.1);
    gain2.gain.linearRampToValueAtTime(0.01, now + 0.35);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.35);
  } catch (e) {
    console.warn('Could not play correct sound:', e);
  }
}

/**
 * Play an incorrect/error sound
 * A gentle low tone - not punishing
 */
export function playIncorrectSound() {
  if (!getSoundEnabled()) return;
  
  try {
    const ctx = initAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 220; // A3
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
    osc.start(now);
    osc.stop(now + 0.25);
  } catch (e) {
    console.warn('Could not play incorrect sound:', e);
  }
}

/**
 * Play session complete celebration sound
 * A triumphant three-note ascending sequence
 */
export function playCompleteSound() {
  if (!getSoundEnabled()) return;
  
  try {
    const ctx = initAudioContext();
    const now = ctx.currentTime;
    
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 - major chord arpeggio
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      const startTime = now + (i * 0.12);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.linearRampToValueAtTime(0.01, startTime + 0.3);
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  } catch (e) {
    console.warn('Could not play complete sound:', e);
  }
}

/**
 * Play achievement unlock sound
 * A magical sparkle effect
 */
export function playAchievementSound() {
  if (!getSoundEnabled()) return;
  
  try {
    const ctx = initAudioContext();
    const now = ctx.currentTime;
    
    // Quick ascending sparkle
    const notes = [783.99, 987.77, 1174.66, 1318.51]; // G5, B5, D6, E6
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      const startTime = now + (i * 0.08);
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.linearRampToValueAtTime(0.01, startTime + 0.2);
      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  } catch (e) {
    console.warn('Could not play achievement sound:', e);
  }
}

/**
 * Initialize audio on first user interaction
 * Call this on a button click to enable audio
 */
export function initializeAudio() {
  try {
    initAudioContext();
    // Resume context if suspended (browser autoplay policy)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
  } catch (e) {
    console.warn('Could not initialize audio:', e);
  }
}

export default {
  getSoundEnabled,
  setSoundEnabled,
  playCorrectSound,
  playIncorrectSound,
  playCompleteSound,
  playAchievementSound,
  initializeAudio,
};
