/**
 * Flashcard Component
 * Interactive flashcard for study mode - flip to reveal answer
 * Phase 5: Learning Enhancements
 * Phase 6: Memory sentence on card back
 */

import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getMemorySentence, formatSentenceWithHighlights } from '../utils/memorySentences';
import './Flashcard.css';

export default function Flashcard({ card, gameMode, onKnew, onDidntKnow, onNext }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Reset state when card changes
  useEffect(() => {
    setIsFlipped(false);
    setHasAnswered(false);
  }, [card]);

  const handleFlip = useCallback(() => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  }, [isFlipped]);

  const handleKnew = useCallback(() => {
    setHasAnswered(true);
    onKnew();
  }, [onKnew]);

  const handleDidntKnow = useCallback(() => {
    setHasAnswered(true);
    onDidntKnow();
  }, [onDidntKnow]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        if (!isFlipped) {
          e.preventDefault();
          handleFlip();
        } else if (hasAnswered) {
          e.preventDefault();
          onNext();
        }
      } else if (e.key === '1' && isFlipped && !hasAnswered) {
        handleKnew();
      } else if (e.key === '2' && isFlipped && !hasAnswered) {
        handleDidntKnow();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, hasAnswered, handleFlip, onNext, handleKnew, handleDidntKnow]);

  // Determine front and back content based on game mode
  const frontContent = gameMode === 'countryToCapital' ? card.country : card.capital;
  const backContent = gameMode === 'countryToCapital' ? card.capital : card.country;
  const frontLabel = gameMode === 'countryToCapital' ? 'Country' : 'Capital';
  const backLabel = gameMode === 'countryToCapital' ? 'Capital' : 'Country';

  // Get memory sentence for this card
  const memorySentence = getMemorySentence(card.id);

  return (
    <div className="flashcard-container">
      <div 
        className={`flashcard ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
        onKeyDown={(e) => e.key === 'Enter' && handleFlip()}
        role="button"
        tabIndex={0}
        aria-label={isFlipped ? `Answer: ${backContent}` : `Question: ${frontContent}. Click to flip.`}
      >
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <div className="flashcard-label">{frontLabel}</div>
            <div className="flashcard-content">{frontContent}</div>
            <div className="flashcard-hint">Click or press Space to flip</div>
          </div>
          <div className="flashcard-back">
            <div className="flashcard-label">{backLabel}</div>
            <div className="flashcard-content">{backContent}</div>
            <div className="flashcard-region">{card.region}</div>
            
            {/* Memory Sentence - Phase 6 */}
            {memorySentence && (
              <div className="flashcard-memory">
                <div className="memory-header">
                  <span className="memory-icon">🧠</span>
                  <span className="memory-title">Memory Trick</span>
                </div>
                <p className="memory-text">
                  {formatSentenceWithHighlights(
                    memorySentence.sentence,
                    memorySentence.highlightedWords
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
        </div>
      </div>

      {isFlipped && !hasAnswered && (
        <div className="flashcard-actions">
          <p className="self-assess-prompt">Did you know the answer?</p>
          <div className="flashcard-buttons">
            <button 
              onClick={handleKnew}
              className="flashcard-btn knew"
              aria-label="I knew the answer"
            >
              <span className="btn-icon">✓</span>
              <span>I Knew It</span>
              <span className="keyboard-hint">[1]</span>
            </button>
            <button 
              onClick={handleDidntKnow}
              className="flashcard-btn didnt-know"
              aria-label="I didn't know the answer"
            >
              <span className="btn-icon">✗</span>
              <span>Didn&apos;t Know</span>
              <span className="keyboard-hint">[2]</span>
            </button>
          </div>
        </div>
      )}

      {hasAnswered && (
        <div className="flashcard-actions">
          <button 
            onClick={onNext}
            className="flashcard-btn next"
            aria-label="Next card"
          >
            Next Card →
          </button>
        </div>
      )}
    </div>
  );
}

Flashcard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    capital: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired
  }).isRequired,
  gameMode: PropTypes.oneOf(['countryToCapital', 'capitalToCountry']).isRequired,
  onKnew: PropTypes.func.isRequired,
  onDidntKnow: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};
