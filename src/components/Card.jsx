/**
 * Card Component
 * Implements FR-2.1-2.4, FR-3.1-3.6
 * Phase 2: Enhanced animations, mastery badges
 * Phase 4: Sound effects integration
 * Phase 5: Hint system integration
 * Phase 6: Memory sentences in feedback
 */

import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useGame } from '../context/GameContext';
import { fuzzyMatch, getAllAnswers } from '../utils/fuzzyMatch';
import { playCorrectSound, playIncorrectSound } from '../utils/audio';
import { getHint, getMaxHintLevel, getHintButtonLabel } from '../utils/hints';
import { getMnemonic, getCategoryLabel } from '../utils/mnemonics';
import { getMemorySentence, formatSentenceWithHighlights } from '../utils/memorySentences';
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
  const [hintLevel, setHintLevel] = useState(0);
  const [showHintButton, setShowHintButton] = useState(false);
  const inputRef = useRef(null);

  // Get the correct answer for hints
  const getCorrectAnswer = () => {
    if (question.mode === 'countryToCapital') {
      return question.capital;
    } else {
      return question.country;
    }
  };

  // Focus input when card loads
  useEffect(() => {
    inputRef.current?.focus();
    setUserAnswer('');
    setFeedback(null);
    setShowingFeedback(false);
    setAnimationClass('card-enter');
    setHintLevel(0);
    setShowHintButton(false);
    
    // Show hint button after 3 seconds of thinking
    const hintTimer = setTimeout(() => setShowHintButton(true), 3000);
    
    // Remove entrance animation class after it plays
    const timer = setTimeout(() => setAnimationClass(''), 300);
    return () => {
      clearTimeout(timer);
      clearTimeout(hintTimer);
    };
  }, [question]);

  const handleGetHint = () => {
    if (hintLevel < getMaxHintLevel()) {
      setHintLevel(hintLevel + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!userAnswer.trim() || showingFeedback) return;

    const correctAnswers = getAllAnswers(question);
    const isCorrect = fuzzyMatch(userAnswer, correctAnswers);

    // Trigger animation
    setAnimationClass(isCorrect ? 'card-success' : 'card-shake');

    // Play sound effect
    if (isCorrect) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }

    // Show feedback
    setFeedback({
      isCorrect,
      correctAnswer: correctAnswers[0]
    });
    setShowingFeedback(true);

    // Wait before moving to next question
    setTimeout(() => {
      submitAnswer(userAnswer, isCorrect, hintLevel);
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

          {/* Hint Section */}
          {!showingFeedback && (showHintButton || hintLevel > 0) && (
            <div className="hint-section">
              {hintLevel > 0 && (
                <div className="hint-display">
                  <span className="hint-label">Hint:</span>
                  <span className="hint-text">{getHint(getCorrectAnswer(), hintLevel)}</span>
                </div>
              )}
              {hintLevel < getMaxHintLevel() && (
                <button
                  type="button"
                  className="hint-button"
                  onClick={handleGetHint}
                  aria-label={getHintButtonLabel(hintLevel)}
                >
                  {getHintButtonLabel(hintLevel)}
                  {hintLevel > 0 && (
                    <span className="hint-count">({hintLevel}/{getMaxHintLevel()})</span>
                  )}
                </button>
              )}
              {hintLevel > 0 && (
                <div className="hint-penalty">
                  Using hints reduces your score
                </div>
              )}
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
            
            {/* Mnemonic tip - show after correct or incorrect answer */}
            {getMnemonic(question.id) && (
              <div className="mnemonic-tip">
                <div className="mnemonic-header">
                  <span className="mnemonic-category">{getCategoryLabel(getMnemonic(question.id).category)}</span>
                </div>
                <p className="mnemonic-text">{getMnemonic(question.id).tip}</p>
              </div>
            )}

            {/* Memory Sentence - Phase 6 */}
            {getMemorySentence(question.id) && (
              <div className="memory-sentence">
                <div className="memory-sentence-header">
                  <span className="memory-icon">🧠</span>
                  <span className="memory-label">Memory Trick</span>
                </div>
                <p className="memory-sentence-text">
                  {formatSentenceWithHighlights(
                    getMemorySentence(question.id).sentence,
                    getMemorySentence(question.id).highlightedWords
                  ).map((part) => (
                    part.isHighlight ? (
                      <span key={part.key} className="memory-highlight">{part.text}</span>
                    ) : (
                      <span key={part.key}>{part.text}</span>
                    )
                  ))}
                </p>
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
