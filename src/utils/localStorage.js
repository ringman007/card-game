/**
 * Local storage utility for persisting user progress
 * Implements FR-4.1, FR-4.2, FR-4.3
 */

const STORAGE_KEY = 'capitalCardGame_progress';
const SETTINGS_KEY = 'capitalCardGame_settings';

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
 * Updates progress for a specific question
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
      difficultyScore: 0.5
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
  
  // Calculate difficulty score (0 = easy, 1 = hard)
  const totalAttempts = questionProgress.correctCount + questionProgress.incorrectCount;
  questionProgress.difficultyScore = totalAttempts > 0 
    ? questionProgress.incorrectCount / totalAttempts 
    : 0.5;
  
  // Calculate next review date using spaced repetition
  questionProgress.nextReview = calculateNextReview(questionProgress);
  
  saveUserProgress(progress);
  return progress;
}

/**
 * Calculates next review date based on performance
 * Implements simplified spaced repetition algorithm
 */
function calculateNextReview(questionProgress) {
  const now = new Date();
  
  if (questionProgress.incorrectCount === 0 && questionProgress.correctCount > 0) {
    // Never got it wrong - schedule far in future
    const interval = Math.min(questionProgress.correctCount, 10) * 24 * 60 * 60 * 1000; // Days in ms
    return new Date(now.getTime() + interval).toISOString();
  } else if (questionProgress.difficultyScore > 0.5) {
    // Difficult question - review soon
    return new Date(now.getTime() + 60 * 60 * 1000).toISOString(); // 1 hour
  } else {
    // Medium difficulty
    return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(); // 1 day
  }
}

/**
 * Gets settings from local storage
 */
export function getSettings() {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? JSON.parse(data) : { lastRegion: 'World' };
  } catch (error) {
    console.error('Error reading settings:', error);
    return { lastRegion: 'World' };
  }
}

/**
 * Saves settings to local storage
 */
export function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

/**
 * Clears all progress data (for testing/reset)
 */
export function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing progress:', error);
  }
}
