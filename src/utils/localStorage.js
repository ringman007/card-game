/**
 * Local storage utility for persisting user progress
 * Implements FR-4.1, FR-4.2, FR-4.3
 * Phase 2: SM-2 algorithm, difficulty buckets, streak tracking
 */

const STORAGE_KEY = 'capitalCardGame_progress';
const SETTINGS_KEY = 'capitalCardGame_settings';
const STATS_KEY = 'capitalCardGame_stats';

/**
 * SM-2 Algorithm Constants
 */
const SM2_DEFAULT_EASE_FACTOR = 2.5;
const SM2_MIN_EASE_FACTOR = 1.3;

/**
 * Difficulty bucket thresholds (in days)
 */
const BUCKET_THRESHOLDS = {
  learning: 7,   // < 7 days = learning
  review: 21,    // 7-21 days = review
  // > 21 days = mastered
};

/**
 * Gets user progress data from local storage
 */
export function getUserProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error reading from local storage:', error);
    return {};
  }
}

/**
 * Saves user progress data to local storage
 */
export function saveUserProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving to local storage:', error);
  }
}

/**
 * Determines the difficulty bucket for a question
 * @param {object} questionProgress - Progress data for the question
 * @returns {string} - 'new', 'learning', 'review', or 'mastered'
 */
export function getBucketForQuestion(questionProgress) {
  if (!questionProgress || questionProgress.timesShown === 0) {
    return 'new';
  }
  
  const interval = questionProgress.interval || 1;
  
  if (interval < BUCKET_THRESHOLDS.learning) {
    return 'learning';
  } else if (interval < BUCKET_THRESHOLDS.review) {
    return 'review';
  } else {
    return 'mastered';
  }
}

/**
 * Calculates next review using SM-2 algorithm
 * @param {object} questionProgress - Current progress data
 * @param {boolean} isCorrect - Whether the answer was correct
 * @param {number} quality - Response quality (0-5), default 4 for correct, 1 for incorrect
 * @returns {object} - Updated SM-2 fields
 */
function calculateSM2(questionProgress, isCorrect, quality = null) {
  // Default quality: 4 for correct (good recall), 1 for incorrect (complete failure)
  const q = quality !== null ? quality : (isCorrect ? 4 : 1);
  
  let { easeFactor = SM2_DEFAULT_EASE_FACTOR, interval = 1, repetitions = 0 } = questionProgress;
  
  if (isCorrect) {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
    
    // Adjust ease factor based on quality
    easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  } else {
    // Incorrect response - reset
    repetitions = 0;
    interval = 1;
    easeFactor = easeFactor - 0.2;
  }
  
  // Ensure ease factor doesn't go below minimum
  easeFactor = Math.max(SM2_MIN_EASE_FACTOR, easeFactor);
  
  // Calculate next review date
  const now = new Date();
  const nextReview = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000).toISOString();
  
  return { easeFactor, interval, repetitions, nextReview };
}

/**
 * Updates progress for a specific question using SM-2 algorithm
 */
export function updateQuestionProgress(questionId, isCorrect) {
  const progress = getUserProgress();
  
  if (!progress[questionId]) {
    progress[questionId] = {
      timesShown: 0,
      correctCount: 0,
      incorrectCount: 0,
      lastShown: null,
      nextReview: null,
      easeFactor: SM2_DEFAULT_EASE_FACTOR,
      interval: 1,
      repetitions: 0,
      bucket: 'new'
    };
  }
  
  const questionProgress = progress[questionId];
  questionProgress.timesShown += 1;
  questionProgress.lastShown = new Date().toISOString();
  
  if (isCorrect) {
    questionProgress.correctCount += 1;
  } else {
    questionProgress.incorrectCount += 1;
  }
  
  // Apply SM-2 algorithm
  const sm2Result = calculateSM2(questionProgress, isCorrect);
  questionProgress.easeFactor = sm2Result.easeFactor;
  questionProgress.interval = sm2Result.interval;
  questionProgress.repetitions = sm2Result.repetitions;
  questionProgress.nextReview = sm2Result.nextReview;
  
  // Update bucket
  questionProgress.bucket = getBucketForQuestion(questionProgress);
  
  saveUserProgress(progress);
  return progress;
}

/**
 * Gets settings from local storage
 */
export function getSettings() {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? JSON.parse(data) : { lastRegion: 'World', lastMode: 'countryToCapital' };
  } catch (error) {
    console.error('Error reading settings:', error);
    return { lastRegion: 'World', lastMode: 'countryToCapital' };
  }
}

/**
 * Saves settings to local storage
 */
export function saveSettings(settings) {
  try {
    const current = getSettings();
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...current, ...settings }));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

/**
 * Gets user statistics from local storage
 */
export function getStats() {
  try {
    const data = localStorage.getItem(STATS_KEY);
    return data ? JSON.parse(data) : {
      bestStreak: 0,
      totalSessions: 0,
      totalCorrect: 0,
      totalIncorrect: 0,
      sessionHistory: []
    };
  } catch (error) {
    console.error('Error reading stats:', error);
    return { bestStreak: 0, totalSessions: 0, totalCorrect: 0, totalIncorrect: 0, sessionHistory: [] };
  }
}

/**
 * Saves session statistics
 */
export function saveSessionStats(sessionData) {
  try {
    const stats = getStats();
    
    // Update totals
    stats.totalSessions += 1;
    stats.totalCorrect += sessionData.correctCount;
    stats.totalIncorrect += sessionData.incorrectCount;
    
    // Update best streak
    if (sessionData.bestStreak > stats.bestStreak) {
      stats.bestStreak = sessionData.bestStreak;
    }
    
    // Add to session history (keep last 10)
    stats.sessionHistory.unshift({
      date: new Date().toISOString(),
      correctCount: sessionData.correctCount,
      incorrectCount: sessionData.incorrectCount,
      accuracy: sessionData.correctCount / (sessionData.correctCount + sessionData.incorrectCount),
      bestStreak: sessionData.bestStreak
    });
    stats.sessionHistory = stats.sessionHistory.slice(0, 10);
    
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving session stats:', error);
  }
}

/**
 * Clears all progress data (for testing/reset)
 */
export function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STATS_KEY);
  } catch (error) {
    console.error('Error clearing progress:', error);
  }
}
