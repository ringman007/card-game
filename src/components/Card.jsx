/**
 * Card Component
 * Implements FR-2.1-2.4, FR-3.1-3.6
 * Phase 2: Enhanced animations, mastery badges
 */

import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useGame } from '../context/GameContext';
import { fuzzyMatch, getAllAnswers } from '../utils/fuzzyMatch';
import './Card.css';

/**
 * Bucket badge colors and labels
 */
const BUCKET_CONFIG = {
  new: { label: 'New', color: '#6b7280', emoji: '🆕' },
  learning: { label: 'Learning', color: '#f59e0b', emoji: '📚' },
  review: { label: 'Review', color: '#3b82f6', emoji: '🔄' },
  mastered: { label: 'Mastered', color: '#10b981', emoji: '⭐' }
};

export default function Card({ question }) {
  const { submitAnswer, currentStreak } = useGame();
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showingFeedback, setShowingFeedback] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const inputRef = useRef(null);

  // Focus input when card loads
  useEffect(() => {
    inputRef.current?.focus();
    setUserAnswer('');
    setFeedback(null);
    setShowingFeedback(false);
    setAnimationClass('card-enter');
    
    // Remove entrance animation class after it plays
    const timer = setTimeout(() => setAnimationClass(''), 300);
    return () => clearTimeout(timer);
  }, [question]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!userAnswer.trim() || showingFeedback) return;

    const correctAnswers = getAllAnswers(question);
    const isCorrect = fuzzyMatch(userAnswer, correctAnswers);

    // Trigger animation
    setAnimationClass(isCorrect ? 'card-success' : 'card-shake');

    // Show feedback
    setFeedback({
      isCorrect,
      correctAnswer: correctAnswers[0]
    });
    setShowingFeedback(true);

    // Wait before moving to next question
    setTimeout(() => {
      submitAnswer(userAnswer, isCorrect);
    }, 1500);
  };

  const getQuestionText = () => {
    if (question.mode === 'countryToCapital') {
      return question.country;
    } else {
      return question.capital;
    }
  };

  const getPromptText = () => {
    if (question.mode === 'countryToCapital') {
      return 'What is the capital?';
    } else {
      return 'Which country is this the capital of?';
    }
  };

  const getHelperText = () => {
    const helpers = [];
    
    if (question.multipleCapitals && question.mode === 'countryToCapital') {
      helpers.push('This country has multiple capitals');
    }
    
    if (question.mode === 'countryToCapital') {
      if (question.capitalAlternatives.length > 0) {
        helpers.push('Alternative names accepted');
      }
    } else {
      if (question.countryAlternatives.length > 0) {
        helpers.push('Alternative names accepted');
      }
    }
    
    return helpers;
  };

  const bucketInfo = BUCKET_CONFIG[question.bucket] || BUCKET_CONFIG.new;

  return (
    <div className={`card ${showingFeedback ? 'showing-feedback' : ''} ${animationClass}`}>
      <div className="card-header">
        <div 
          className="mastery-badge"
          style={{ backgroundColor: bucketInfo.color }}
          title={bucketInfo.label}
        >
          <span className="badge-emoji">{bucketInfo.emoji}</span>
          <span className="badge-label">{bucketInfo.label}</span>
        </div>
        {currentStreak >= 3 && (
          <div className="streak-indicator">
            🔥 {currentStreak}
          </div>
        )}
      </div>
      
      <div className="card-content">
        <div className="question-display">
          <div className="prompt-text">{getPromptText()}</div>
          <div className="question-text">{getQuestionText()}</div>
          
          {getHelperText().length > 0 && (
            <div className="helper-text">
              {getHelperText().map((helper, index) => (
                <div key={index} className="helper-item">
                  {helper}
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="answer-form">
          <input
            ref={inputRef}
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer..."
            className="answer-input"
            disabled={showingFeedback}
            aria-label="Answer input field"
            autoComplete="off"
          />
          <button 
            type="submit" 
            className="submit-button"
            disabled={!userAnswer.trim() || showingFeedback}
            aria-label="Submit answer"
          >
            Submit
          </button>
        </form>

        {feedback && (
          <div 
            className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}
            role="alert"
            aria-live="polite"
          >
            {feedback.isCorrect ? (
              <div className="feedback-content">
                <span className="feedback-icon">✓</span>
                <span>Correct!</span>
              </div>
            ) : (
              <div className="feedback-content">
                <span className="feedback-icon">✗</span>
                <span>The correct answer is: {feedback.correctAnswer}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

Card.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    countryAlternatives: PropTypes.arrayOf(PropTypes.string).isRequired,
    capital: PropTypes.string.isRequired,
    capitalAlternatives: PropTypes.arrayOf(PropTypes.string).isRequired,
    multipleCapitals: PropTypes.bool.isRequired,
    region: PropTypes.string.isRequired,
    bucket: PropTypes.string
  }).isRequired
};
