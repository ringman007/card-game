/**
 * Question selection algorithm with adaptive difficulty
 * Implements FR-5.1, FR-5.2, FR-5.3
 */

import countriesData from '../data/countries.json';
import { getUserProgress } from './localStorage';

/**
 * Gets questions for a session based on region and user progress
 * Implements adaptive difficulty and spaced repetition
 * @param {string} region - Selected region or 'World'
 * @param {number} count - Number of questions to return (default: 10)
 * @param {string} mode - Game mode: 'countryToCapital' or 'capitalToCountry'
 * @returns {Array} Array of question objects
 */
export function getSessionQuestions(region, count = 10, mode = 'countryToCapital') {
  // Filter countries by region
  let countries = region === 'World' 
    ? [...countriesData] 
    : countriesData.filter(c => c.region === region);
  
  // Get user progress
  const progress = getUserProgress();
  
  // Score each country based on when it should be reviewed
  const scoredCountries = countries.map(country => {
    const questionId = country.id;
    const userProgress = progress[questionId];
    
    let score = Math.random(); // Base randomness
    
    if (userProgress) {
      // Increase score for questions that need review
      const nextReview = new Date(userProgress.nextReview);
      const now = new Date();
      
      if (nextReview <= now) {
        // Due for review - high priority
        score += 10;
      }
      
      // Prioritize difficult questions
      score += userProgress.difficultyScore * 5;
      
      // Slightly deprioritize recently shown questions
      const hoursSinceLastShown = (now - new Date(userProgress.lastShown)) / (1000 * 60 * 60);
      if (hoursSinceLastShown < 1) {
        score -= 2;
      }
    } else {
      // New question - medium priority
      score += 3;
    }
    
    return { ...country, score };
  });
  
  // Sort by score (highest first) and take top N
  scoredCountries.sort((a, b) => b.score - a.score);
  const selectedCountries = scoredCountries.slice(0, count);
  
  // Create question objects with the specified mode
  const questions = selectedCountries.map(country => ({
    id: country.id,
    mode,
    country: country.country,
    countryAlternatives: country.countryAlternatives,
    capital: country.capital,
    capitalAlternatives: country.capitalAlternatives,
    multipleCapitals: country.multipleCapitals,
    region: country.region
  }));
  
  // Shuffle questions
  return shuffleArray(questions);
}

/**
 * Gets available regions from the dataset
 */
export function getAvailableRegions() {
  const regions = new Set(countriesData.map(c => c.region));
  return ['World', ...Array.from(regions).sort()];
}

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
