/**
 * Simple fuzzy matching algorithm for answer validation
 * Implements FR-3.1, FR-3.2, FR-3.3, FR-3.4
 */

/**
 * Normalizes a string by removing diacritics, converting to lowercase, and trimming
 */
export function normalizeString(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/['']/g, "'") // Normalize apostrophes
    .trim();
}

/**
 * Calculates Levenshtein distance between two strings
 */
function levenshteinDistance(str1, str2) {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * Checks if the user's answer matches any of the correct answers
 * Uses fuzzy matching with a tolerance threshold
 * @param {string} userAnswer - The user's input
 * @param {string[]} correctAnswers - Array of acceptable answers
 * @param {number} threshold - Maximum allowed distance (default: 2)
 * @returns {boolean}
 */
export function fuzzyMatch(userAnswer, correctAnswers, threshold = 2) {
  const normalizedUserAnswer = normalizeString(userAnswer);
  
  for (const correctAnswer of correctAnswers) {
    const normalizedCorrect = normalizeString(correctAnswer);
    
    // Exact match after normalization
    if (normalizedUserAnswer === normalizedCorrect) {
      return true;
    }
    
    // Fuzzy match using Levenshtein distance
    const distance = levenshteinDistance(normalizedUserAnswer, normalizedCorrect);
    const maxLength = Math.max(normalizedUserAnswer.length, normalizedCorrect.length);
    
    // Allow threshold characters difference for longer words
    // For shorter words (< 5 chars), require exact match
    if (maxLength < 5) {
      if (distance === 0) return true;
    } else if (distance <= threshold) {
      return true;
    }
  }
  
  return false;
}

/**
 * Gets all possible answers for a question (including alternatives)
 */
export function getAllAnswers(question) {
  if (question.mode === 'countryToCapital') {
    return [question.capital, ...question.capitalAlternatives];
  } else {
    return [question.country, ...question.countryAlternatives];
  }
}
