/**
 * Question selection algorithm with adaptive difficulty
 * Implements FR-5.1, FR-5.2, FR-5.3, FR-7.1, FR-7.2
 * Phase 2: SM-2 based urgency scoring, review/new balance
 * Phase 3: Practice mode, Improve mode
 */

import countriesData from '../data/countries.json';
import { getUserProgress, getBucketForQuestion } from './localStorage';

/**
 * Target ratio for review vs new questions
 */
const REVIEW_RATIO = 0.7; // 70% review, 30% new

/**
 * Calculates urgency score for a question
 * Higher score = more urgent to review
 */
function calculateUrgencyScore(userProgress) {
  if (!userProgress) {
    return 0; // New questions have no urgency
  }
  
  const now = new Date();
  const nextReview = new Date(userProgress.nextReview);
  const daysSinceReview = (now - nextReview) / (1000 * 60 * 60 * 24);
  
  // Base urgency: how overdue the question is
  let urgency = Math.max(0, daysSinceReview);
  
  // Multiply by inverse of ease factor (harder questions more urgent)
  const easeFactor = userProgress.easeFactor || 2.5;
  urgency *= (3.0 - easeFactor);
  
  // Boost for questions with low repetition count (still learning)
  if (userProgress.repetitions < 3) {
    urgency *= 1.5;
  }
  
  return urgency;
}

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
  
  // Separate questions into review and new pools
  const reviewPool = [];
  const newPool = [];
  
  countries.forEach(country => {
    const questionId = country.id;
    const userProgress = progress[questionId];
    const bucket = getBucketForQuestion(userProgress);
    
    const questionData = {
      ...country,
      bucket,
      urgencyScore: calculateUrgencyScore(userProgress),
      userProgress
    };
    
    if (bucket === 'new') {
      newPool.push(questionData);
    } else {
      reviewPool.push(questionData);
    }
  });
  
  // Sort review pool by urgency (highest first)
  reviewPool.sort((a, b) => b.urgencyScore - a.urgencyScore);
  
  // Shuffle new pool for variety
  shuffleArray(newPool);
  
  // Calculate target counts (70% review, 30% new)
  const targetReviewCount = Math.min(
    Math.ceil(count * REVIEW_RATIO),
    reviewPool.length
  );
  const targetNewCount = Math.min(
    count - targetReviewCount,
    newPool.length
  );
  
  // If we don't have enough reviews, fill with new
  let actualReviewCount = targetReviewCount;
  let actualNewCount = targetNewCount;
  
  if (actualReviewCount + actualNewCount < count) {
    // Fill remaining with whatever we have
    const remaining = count - actualReviewCount - actualNewCount;
    if (newPool.length > actualNewCount) {
      actualNewCount = Math.min(newPool.length, actualNewCount + remaining);
    } else if (reviewPool.length > actualReviewCount) {
      actualReviewCount = Math.min(reviewPool.length, actualReviewCount + remaining);
    }
  }
  
  // Select questions
  const selectedQuestions = [
    ...reviewPool.slice(0, actualReviewCount),
    ...newPool.slice(0, actualNewCount)
  ];
  
  // Create question objects with the specified mode and bucket info
  const questions = selectedQuestions.map(country => ({
    id: country.id,
    mode,
    country: country.country,
    countryAlternatives: country.countryAlternatives,
    capital: country.capital,
    capitalAlternatives: country.capitalAlternatives,
    multipleCapitals: country.multipleCapitals,
    region: country.region,
    bucket: country.bucket
  }));
  
  // Shuffle questions for variety in presentation order
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
 * Gets questions for Practice mode - previously answered questions sorted by difficulty
 * @param {number} count - Number of questions to return (default: 10)
 * @param {string} mode - Game mode: 'countryToCapital' or 'capitalToCountry'
 * @returns {Array} Array of question objects
 */
export function getPracticeQuestions(count = 10, mode = 'countryToCapital') {
  const progress = getUserProgress();
  
  // Filter to only answered questions
  const answeredQuestions = countriesData.filter(country => {
    const userProgress = progress[country.id];
    return userProgress && userProgress.timesShown > 0;
  });
  
  if (answeredQuestions.length === 0) {
    return [];
  }
  
  // Sort by difficulty (lowest ease factor = hardest, so they come first)
  const sortedQuestions = answeredQuestions.map(country => {
    const userProgress = progress[country.id];
    const bucket = getBucketForQuestion(userProgress);
    
    // Calculate difficulty score (lower = harder)
    const easeFactor = userProgress.easeFactor || 2.5;
    const accuracy = userProgress.correctCount / (userProgress.timesShown || 1);
    const difficultyScore = easeFactor * accuracy;
    
    return {
      ...country,
      bucket,
      difficultyScore,
      userProgress
    };
  }).sort((a, b) => a.difficultyScore - b.difficultyScore);
  
  // Take top N hardest questions
  const selectedQuestions = sortedQuestions.slice(0, count);
  
  // Create question objects
  const questions = selectedQuestions.map(country => ({
    id: country.id,
    mode,
    country: country.country,
    countryAlternatives: country.countryAlternatives,
    capital: country.capital,
    capitalAlternatives: country.capitalAlternatives,
    multipleCapitals: country.multipleCapitals,
    region: country.region,
    bucket: country.bucket
  }));
  
  return shuffleArray(questions);
}

/**
 * Gets questions for Improve mode - only previously incorrect answers
 * Sorted by miss frequency (most missed first)
 * @param {number} count - Number of questions to return (default: 10)
 * @param {string} mode - Game mode: 'countryToCapital' or 'capitalToCountry'
 * @returns {Array} Array of question objects
 */
export function getImproveQuestions(count = 10, mode = 'countryToCapital') {
  const progress = getUserProgress();
  
  // Filter to only questions with incorrect answers
  const incorrectQuestions = countriesData.filter(country => {
    const userProgress = progress[country.id];
    return userProgress && userProgress.incorrectCount > 0;
  });
  
  if (incorrectQuestions.length === 0) {
    return [];
  }
  
  // Sort by miss frequency (most incorrect first)
  const sortedQuestions = incorrectQuestions.map(country => {
    const userProgress = progress[country.id];
    const bucket = getBucketForQuestion(userProgress);
    
    return {
      ...country,
      bucket,
      incorrectCount: userProgress.incorrectCount,
      missRate: userProgress.incorrectCount / (userProgress.timesShown || 1),
      userProgress
    };
  }).sort((a, b) => {
    // Primary: more incorrect answers first
    if (b.incorrectCount !== a.incorrectCount) {
      return b.incorrectCount - a.incorrectCount;
    }
    // Secondary: higher miss rate first
    return b.missRate - a.missRate;
  });
  
  // Take top N most missed questions
  const selectedQuestions = sortedQuestions.slice(0, count);
  
  // Create question objects
  const questions = selectedQuestions.map(country => ({
    id: country.id,
    mode,
    country: country.country,
    countryAlternatives: country.countryAlternatives,
    capital: country.capital,
    capitalAlternatives: country.capitalAlternatives,
    multipleCapitals: country.multipleCapitals,
    region: country.region,
    bucket: country.bucket
  }));
  
  return shuffleArray(questions);
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
