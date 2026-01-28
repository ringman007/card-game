/**
 * Mnemonics Utility
 * Provides memory tips for learning capitals
 * Phase 5: Learning Enhancements
 */

import mnemonicsData from '../data/mnemonics.json';

/**
 * Category display labels
 */
const CATEGORY_LABELS = {
  wordplay: '🎭 Wordplay',
  etymology: '📖 Etymology',
  fact: '💡 Fun Fact',
  association: '🔗 Association',
  proverb: '📜 Proverb'
};

/**
 * Category colors for styling
 */
const CATEGORY_COLORS = {
  wordplay: 'var(--color-sage-600)',
  etymology: 'var(--color-terracotta-500)',
  fact: 'var(--feedback-warning)',
  association: 'var(--interactive-primary)',
  proverb: 'var(--color-amber-600)'
};

/**
 * Get mnemonic for a specific country
 * @param {string} countryId - The country ID (e.g., 'USA', 'GBR')
 * @returns {Object|null} Mnemonic object with tip and category, or null if not found
 */
export function getMnemonic(countryId) {
  return mnemonicsData[countryId] || null;
}

/**
 * Check if a country has a mnemonic
 * @param {string} countryId - The country ID
 * @returns {boolean} True if mnemonic exists
 */
export function hasMnemonic(countryId) {
  return countryId in mnemonicsData;
}

/**
 * Get category label with emoji
 * @param {string} category - Category key
 * @returns {string} Display label with emoji
 */
export function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] || '💡 Tip';
}

/**
 * Get category color
 * @param {string} category - Category key
 * @returns {string} CSS color value
 */
export function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || 'var(--text-secondary)';
}

/**
 * Get all mnemonics as an array for study purposes
 * @returns {Array} Array of {id, tip, category} objects
 */
export function getAllMnemonics() {
  return Object.entries(mnemonicsData).map(([id, data]) => ({
    id,
    ...data
  }));
}

/**
 * Get mnemonic count
 * @returns {number} Total number of mnemonics available
 */
export function getMnemonicCount() {
  return Object.keys(mnemonicsData).length;
}
