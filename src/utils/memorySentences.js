/**
 * Memory Sentences Utility
 * Phase 6: Functions for looking up absurd memory sentences
 */

import memorySentencesData from '../data/memorySentences.json';

/**
 * Get memory sentence for a country by ID
 * @param {string} countryId - The country ID (e.g., "FRA", "USA")
 * @returns {Object|null} - Sentence object with sentence, highlightedWords, region or null
 */
export function getMemorySentence(countryId) {
  if (!countryId) return null;
  return memorySentencesData[countryId] || null;
}

/**
 * Check if a country has a memory sentence
 * @param {string} countryId - The country ID
 * @returns {boolean}
 */
export function hasMemorySentence(countryId) {
  return !!memorySentencesData[countryId];
}

/**
 * Get all memory sentences
 * @returns {Object} - All memory sentences keyed by country ID
 */
export function getAllMemorySentences() {
  return memorySentencesData;
}

/**
 * Get memory sentences filtered by region
 * @param {string} region - The region to filter by
 * @returns {Object} - Filtered memory sentences
 */
export function getMemorySentencesByRegion(region) {
  if (!region || region === 'All') {
    return memorySentencesData;
  }
  
  const filtered = {};
  Object.entries(memorySentencesData).forEach(([id, data]) => {
    if (data.region === region) {
      filtered[id] = data;
    }
  });
  return filtered;
}

/**
 * Get count of memory sentences
 * @returns {number}
 */
export function getMemorySentenceCount() {
  return Object.keys(memorySentencesData).length;
}

/**
 * Get unique regions from memory sentences
 * @returns {string[]}
 */
export function getMemorySentenceRegions() {
  const regions = new Set();
  Object.values(memorySentencesData).forEach(data => {
    if (data.region) {
      regions.add(data.region);
    }
  });
  return ['All', ...Array.from(regions).sort()];
}

/**
 * Format sentence with highlighted words wrapped in spans
 * @param {string} sentence - The memory sentence
 * @param {string[]} highlightedWords - Words to highlight
 * @returns {Array} - Array of text and highlight objects for React rendering
 */
export function formatSentenceWithHighlights(sentence, highlightedWords) {
  if (!sentence || !highlightedWords || highlightedWords.length === 0) {
    return [{ text: sentence, isHighlight: false }];
  }
  
  const parts = [];
  let remaining = sentence;
  
  // Create a regex that matches any of the highlighted words (case-insensitive)
  const pattern = new RegExp(
    `(${highlightedWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi'
  );
  
  const matches = sentence.split(pattern);
  
  matches.forEach((part, index) => {
    if (!part) return;
    
    const isHighlight = highlightedWords.some(
      word => part.toLowerCase() === word.toLowerCase()
    );
    
    parts.push({
      text: part,
      isHighlight,
      key: index
    });
  });
  
  return parts;
}

/**
 * Search memory sentences by country name or capital
 * @param {string} query - Search query
 * @param {Object} countriesMap - Map of country ID to country data
 * @returns {Object} - Matching memory sentences
 */
export function searchMemorySentences(query, countriesMap) {
  if (!query || !countriesMap) {
    return memorySentencesData;
  }
  
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) {
    return memorySentencesData;
  }
  
  const filtered = {};
  Object.entries(memorySentencesData).forEach(([id, data]) => {
    const country = countriesMap[id];
    if (!country) return;
    
    const matchesCountry = country.country.toLowerCase().includes(lowerQuery);
    const matchesCapital = country.capital.toLowerCase().includes(lowerQuery);
    const matchesSentence = data.sentence.toLowerCase().includes(lowerQuery);
    
    if (matchesCountry || matchesCapital || matchesSentence) {
      filtered[id] = data;
    }
  });
  
  return filtered;
}
