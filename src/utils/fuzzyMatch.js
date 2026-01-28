/**
 * Enhanced fuzzy matching algorithm for answer validation
 * Implements FR-3.1, FR-3.2, FR-3.3, FR-3.4
 * Phase 2: Adaptive thresholds, phonetic matching, compound words, transliteration
 */

/**
 * Common transliteration mappings for non-ASCII characters
 */
const TRANSLITERATIONS = {
  'ü': ['ue', 'u'],
  'ö': ['oe', 'o'],
  'ä': ['ae', 'a'],
  'ø': ['o', 'oe'],
  'å': ['a', 'aa'],
  'æ': ['ae', 'a'],
  'ß': ['ss', 's'],
  'ñ': ['n', 'ny'],
  'ç': ['c', 's'],
  'ð': ['d', 'th'],
  'þ': ['th'],
  'ł': ['l'],
  'ń': ['n'],
  'ś': ['s'],
  'ź': ['z'],
  'ż': ['z'],
};

/**
 * Phonetic equivalents for commonly confused city/country names
 */
const PHONETIC_EQUIVALENTS = [
  ['kyiv', 'kiev'],
  ['beijing', 'peking'],
  ['mumbai', 'bombay'],
  ['kolkata', 'calcutta'],
  ['chennai', 'madras'],
  ['myanmar', 'burma'],
  ['eswatini', 'swaziland'],
  ['czechia', 'czech republic'],
  ['timor-leste', 'east timor'],
  ['cabo verde', 'cape verde'],
];

/**
 * Normalizes a string by removing diacritics, converting to lowercase, and trimming
 */
export function normalizeString(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/['']/g, "'") // Normalize apostrophes
    .replace(/[-–—]/g, ' ') // Normalize hyphens to spaces
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();
}

/**
 * Applies transliteration mappings to generate alternative forms
 */
function getTransliteratedForms(str) {
  const forms = [str];
  const normalized = str.toLowerCase();
  
  for (const [char, replacements] of Object.entries(TRANSLITERATIONS)) {
    if (normalized.includes(char)) {
      for (const replacement of replacements) {
        forms.push(normalized.replace(new RegExp(char, 'g'), replacement));
      }
    }
  }
  
  return forms;
}

/**
 * Checks if two strings are phonetic equivalents
 */
function isPhoneticMatch(str1, str2) {
  const norm1 = normalizeString(str1);
  const norm2 = normalizeString(str2);
  
  for (const equivalents of PHONETIC_EQUIVALENTS) {
    if (equivalents.includes(norm1) && equivalents.includes(norm2)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Gets adaptive threshold based on word length
 * Short words (1-4): exact match only
 * Medium words (5-7): 1 character tolerance
 * Long words (8-11): 2 character tolerance
 * Very long words (12+): 3 character tolerance
 */
function getAdaptiveThreshold(length) {
  if (length < 5) return 0;
  if (length < 8) return 1;
  if (length < 12) return 2;
  return 3;
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
 * Checks compound word match (handles word order flexibility)
 */
function compoundWordMatch(userAnswer, correctAnswer) {
  const userWords = userAnswer.split(' ').filter(w => w.length > 0);
  const correctWords = correctAnswer.split(' ').filter(w => w.length > 0);
  
  // Only apply to 2-word compounds
  if (userWords.length !== 2 || correctWords.length !== 2) {
    return false;
  }
  
  // Check both orderings
  const directMatch = userWords[0] === correctWords[0] && userWords[1] === correctWords[1];
  const reversedMatch = userWords[0] === correctWords[1] && userWords[1] === correctWords[0];
  
  return directMatch || reversedMatch;
}

/**
 * Checks if the user's answer matches any of the correct answers
 * Uses enhanced fuzzy matching with adaptive thresholds
 * @param {string} userAnswer - The user's input
 * @param {string[]} correctAnswers - Array of acceptable answers
 * @returns {boolean}
 */
export function fuzzyMatch(userAnswer, correctAnswers) {
  const normalizedUserAnswer = normalizeString(userAnswer);
  
  for (const correctAnswer of correctAnswers) {
    const normalizedCorrect = normalizeString(correctAnswer);
    
    // 1. Exact match after normalization
    if (normalizedUserAnswer === normalizedCorrect) {
      return true;
    }
    
    // 2. Phonetic equivalents check
    if (isPhoneticMatch(normalizedUserAnswer, normalizedCorrect)) {
      return true;
    }
    
    // 3. Compound word match (word order flexibility)
    if (compoundWordMatch(normalizedUserAnswer, normalizedCorrect)) {
      return true;
    }
    
    // 4. Transliteration check
    const transliteratedForms = getTransliteratedForms(correctAnswer);
    for (const form of transliteratedForms) {
      if (normalizeString(form) === normalizedUserAnswer) {
        return true;
      }
    }
    
    // 5. Fuzzy match with adaptive threshold
    const maxLength = Math.max(normalizedUserAnswer.length, normalizedCorrect.length);
    const threshold = getAdaptiveThreshold(maxLength);
    const distance = levenshteinDistance(normalizedUserAnswer, normalizedCorrect);
    
    if (distance <= threshold) {
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
