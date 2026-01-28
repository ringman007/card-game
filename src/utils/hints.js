/**
 * Hints Utility
 * Phase 5: Progressive hint system for learning assistance
 */

/**
 * Generate a hint for the given answer at the specified level
 * @param {string} answer - The correct answer
 * @param {number} level - Hint level (1-3)
 * @returns {string} The hint text
 */
export function getHint(answer, level) {
  if (!answer || typeof answer !== 'string') {
    return '';
  }

  const cleanAnswer = answer.trim();
  
  switch (level) {
    case 1:
      // Level 1: First letter only
      return `Starts with "${cleanAnswer.charAt(0).toUpperCase()}"`;
    
    case 2:
      // Level 2: First letter + total length with blanks
      return formatWithBlanks(cleanAnswer, 1);
    
    case 3: {
      // Level 3: First 3 letters (or half for short answers)
      const revealCount = Math.max(3, Math.ceil(cleanAnswer.length / 2));
      return formatWithBlanks(cleanAnswer, revealCount);
    }
    
    default:
      return '';
  }
}

/**
 * Format answer with some letters revealed and rest as blanks
 * @param {string} answer - The correct answer
 * @param {number} revealCount - Number of characters to reveal from start
 * @returns {string} Formatted hint string
 */
function formatWithBlanks(answer, revealCount) {
  const chars = answer.split('');
  let result = '';
  let letterIndex = 0;
  
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    
    // Keep spaces and punctuation as-is
    if (char === ' ' || char === '-' || char === "'") {
      result += char;
    } else {
      // Reveal first N letters, rest are blanks
      if (letterIndex < revealCount) {
        result += char.toUpperCase();
      } else {
        result += '_';
      }
      letterIndex++;
    }
  }
  
  return result;
}

/**
 * Get the maximum number of hints available
 * @returns {number} Maximum hint level
 */
export function getMaxHintLevel() {
  return 3;
}

/**
 * Calculate score multiplier based on hints used
 * @param {number} hintsUsed - Number of hints the user used (0-3)
 * @returns {number} Score multiplier (0-1)
 */
export function getHintScoreMultiplier(hintsUsed) {
  switch (hintsUsed) {
    case 0: return 1.0;   // Full credit
    case 1: return 0.5;   // Half credit
    case 2: return 0.25;  // Quarter credit
    case 3: return 0.1;   // Minimal credit
    default: return hintsUsed > 3 ? 0.1 : 1.0;
  }
}

/**
 * Get hint button label based on current hint level
 * @param {number} currentLevel - Current hint level (0 = no hints used yet)
 * @param {number} maxLevel - Maximum hint level
 * @returns {string} Button label text
 */
export function getHintButtonLabel(currentLevel, maxLevel = 3) {
  if (currentLevel >= maxLevel) {
    return 'No more hints';
  }
  if (currentLevel === 0) {
    return '💡 Get Hint';
  }
  return '💡 Next Hint';
}

export default {
  getHint,
  getMaxHintLevel,
  getHintScoreMultiplier,
  getHintButtonLabel
};
