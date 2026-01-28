/**
 * StudyMode Component
 * Manages flashcard study session with self-assessment
 * Phase 5: Learning Enhancements
 */

import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Flashcard from './Flashcard';
import './StudyMode.css';

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function StudyMode({ cards, region, gameMode, onExit }) {
  const [deck, setDeck] = useState(() => shuffleArray(cards));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knewCount, setKnewCount] = useState(0);
  const [didntKnowCount, setDidntKnowCount] = useState(0);
  const [reviewPile, setReviewPile] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isReviewRound, setIsReviewRound] = useState(false);

  const currentCard = deck[currentIndex];
  const totalCards = deck.length;
  const progress = ((currentIndex) / totalCards) * 100;

  const handleKnew = useCallback(() => {
    setKnewCount(prev => prev + 1);
  }, []);

  const handleDidntKnow = useCallback(() => {
    setDidntKnowCount(prev => prev + 1);
    // Add to review pile for later
    setReviewPile(prev => [...prev, currentCard]);
  }, [currentCard]);

  const handleNext = useCallback(() => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // End of deck - check if there's a review pile
      if (reviewPile.length > 0 && !isReviewRound) {
        // Start review round
        setDeck(shuffleArray(reviewPile));
        setReviewPile([]);
        setCurrentIndex(0);
        setIsReviewRound(true);
      } else {
        setIsComplete(true);
      }
    }
  }, [currentIndex, deck.length, reviewPile, isReviewRound]);

  const handleRestart = () => {
    setDeck(shuffleArray(cards));
    setCurrentIndex(0);
    setKnewCount(0);
    setDidntKnowCount(0);
    setReviewPile([]);
    setIsComplete(false);
    setIsReviewRound(false);
  };

  if (isComplete) {
    const totalAnswered = knewCount + didntKnowCount;
    const knewPercentage = totalAnswered > 0 ? Math.round((knewCount / totalAnswered) * 100) : 0;

    return (
      <div className="study-mode">
        <div className="study-complete">
          <h2 className="complete-title">Study Session Complete! 📚</h2>
          
          <div className="study-stats">
            <div className="stat-item knew">
              <span className="stat-icon">✓</span>
              <span className="stat-value">{knewCount}</span>
              <span className="stat-label">Knew</span>
            </div>
            <div className="stat-item didnt-know">
              <span className="stat-icon">✗</span>
              <span className="stat-value">{didntKnowCount}</span>
              <span className="stat-label">Didn&apos;t Know</span>
            </div>
          </div>

          <div className="mastery-bar">
            <div className="mastery-label">
              <span>Mastery</span>
              <span>{knewPercentage}%</span>
            </div>
            <div className="mastery-track">
              <div 
                className="mastery-fill" 
                style={{ width: `${knewPercentage}%` }}
              />
            </div>
          </div>

          {knewPercentage >= 80 ? (
            <p className="mastery-message success">🌟 Excellent! You&apos;ve mastered these cards!</p>
          ) : knewPercentage >= 50 ? (
            <p className="mastery-message progress">💪 Good progress! Keep practicing!</p>
          ) : (
            <p className="mastery-message encourage">📖 Keep studying, you&apos;ll get there!</p>
          )}

          <div className="complete-actions">
            <button onClick={handleRestart} className="study-btn primary">
              Study Again
            </button>
            <button onClick={onExit} className="study-btn secondary">
              Exit Study Mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="study-mode">
      <div className="study-header">
        <button onClick={onExit} className="exit-btn" aria-label="Exit study mode">
          ← Exit
        </button>
        <div className="study-info">
          <span className="study-region">{region}</span>
          {isReviewRound && <span className="review-badge">Review Round</span>}
        </div>
        <div className="study-count">
          {currentIndex + 1} / {totalCards}
        </div>
      </div>

      <div className="study-progress">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={currentIndex + 1}
          aria-valuemin={1}
          aria-valuemax={totalCards}
        />
      </div>

      <div className="study-session-stats">
        <span className="session-stat knew">✓ {knewCount}</span>
        <span className="session-stat didnt-know">✗ {didntKnowCount}</span>
        {reviewPile.length > 0 && (
          <span className="session-stat review">📚 {reviewPile.length} to review</span>
        )}
      </div>

      <Flashcard
        card={currentCard}
        gameMode={gameMode}
        onKnew={handleKnew}
        onDidntKnow={handleDidntKnow}
        onNext={handleNext}
      />
    </div>
  );
}

StudyMode.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
      capital: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired
    })
  ).isRequired,
  region: PropTypes.string.isRequired,
  gameMode: PropTypes.oneOf(['countryToCapital', 'capitalToCountry']).isRequired,
  onExit: PropTypes.func.isRequired
};
