/**
 * Memory Palace Component
 * Phase 6: Interactive learning mode for memory sentences
 * 
 * Sub-modes:
 * - Explore: Swipe through cards one at a time
 * - Learn: See country, tap to reveal sentence + capital
 * - Quiz: See sentence with blanked capital, type to guess
 * - Browse: Gallery view of all sentences
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import countriesData from '../data/countries.json';
import {
  getAllMemorySentences,
  getMemorySentencesByRegion,
  getMemorySentenceRegions,
  formatSentenceWithHighlights
} from '../utils/memorySentences';
import './MemoryPalace.css';

// Create a map of country ID to country data
const countriesMap = countriesData.reduce((acc, country) => {
  acc[country.id] = country;
  return acc;
}, {});

// Shuffle array using Fisher-Yates
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get sentence with capital blanked for quiz mode
function blankCapital(sentence, capital) {
  const capitalUpper = capital.toUpperCase();
  const words = capitalUpper.split(' ');
  let blanked = sentence;
  
  words.forEach(word => {
    if (word.length > 2) {
      const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      blanked = blanked.replace(regex, '_'.repeat(word.length));
    }
  });
  
  return blanked;
}

export default function MemoryPalace({ onExit }) {
  const [mode, setMode] = useState('menu'); // 'menu', 'explore', 'learn', 'quiz', 'browse'
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [learnedCards, setLearnedCards] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);

  const regions = useMemo(() => getMemorySentenceRegions(), []);

  // Get cards based on region
  const getCardsForRegion = useCallback((region) => {
    const sentences = region === 'All' 
      ? getAllMemorySentences()
      : getMemorySentencesByRegion(region);
    
    return Object.entries(sentences).map(([id, data]) => ({
      id,
      country: countriesMap[id]?.country || id,
      capital: countriesMap[id]?.capital || '',
      ...data
    })).filter(card => card.capital);
  }, []);

  // Start a mode
  const startMode = (newMode, region = selectedRegion) => {
    const regionCards = getCardsForRegion(region);
    setCards(shuffleArray(regionCards));
    setCurrentIndex(0);
    setIsRevealed(false);
    setQuizAnswer('');
    setQuizFeedback(null);
    setScore({ correct: 0, total: 0 });
    setMode(newMode);
  };

  // Navigation
  const goToNext = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsRevealed(false);
      setQuizAnswer('');
      setQuizFeedback(null);
    }
  }, [currentIndex, cards.length]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsRevealed(false);
      setQuizAnswer('');
      setQuizFeedback(null);
    }
  }, [currentIndex]);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleMarkLearned = () => {
    if (cards[currentIndex]) {
      setLearnedCards(prev => new Set([...prev, cards[currentIndex].id]));
    }
    goToNext();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (mode === 'menu' || mode === 'browse' || mode === 'quiz-complete') return;
      
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === ' ' && mode === 'learn' && !isRevealed) {
        e.preventDefault();
        handleReveal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, isRevealed, goToNext, goToPrev]);

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (!quizAnswer.trim() || quizFeedback) return;

    const currentCard = cards[currentIndex];
    const correct = quizAnswer.toLowerCase().trim() === currentCard.capital.toLowerCase().trim();
    setQuizFeedback(correct ? 'correct' : 'incorrect');
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));

    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        goToNext();
      } else {
        setMode('quiz-complete');
      }
    }, 1500);
  };

  const currentCard = cards[currentIndex];
  const progress = cards.length > 0 ? ((currentIndex + 1) / cards.length) * 100 : 0;

  // Browse mode filtering
  const filteredCards = useMemo(() => {
    let allCards = getCardsForRegion(selectedRegion);
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      allCards = allCards.filter(card => 
        card.country.toLowerCase().includes(query) ||
        card.capital.toLowerCase().includes(query) ||
        card.sentence.toLowerCase().includes(query)
      );
    }
    
    return allCards;
  }, [selectedRegion, searchQuery, getCardsForRegion]);

  // Menu Screen
  if (mode === 'menu') {
    return (
      <div className="memory-palace">
        <div className="mp-header">
          <button className="mp-back-btn" onClick={onExit}>
            ← Home
          </button>
          <h1 className="mp-title">
            <span className="mp-icon">🧠</span>
            Memory Palace
          </h1>
          <div className="mp-spacer"></div>
        </div>

        <p className="mp-intro">
          Learn capitals with unforgettable, absurd memory tricks!
        </p>

        <div className="mp-region-select">
          <label htmlFor="mp-region">Region:</label>
          <select
            id="mp-region"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {regions.map(region => (
              <option key={region} value={region}>
                {region === 'All' ? '🌍 All Regions' : region}
              </option>
            ))}
          </select>
          <span className="mp-card-count">
            {getCardsForRegion(selectedRegion).length} cards
          </span>
        </div>

        <div className="mp-modes">
          <button 
            className="mp-mode-btn explore"
            onClick={() => startMode('explore')}
          >
            <span className="mode-icon">🔀</span>
            <span className="mode-name">Explore</span>
            <span className="mode-desc">Swipe through cards freely</span>
          </button>

          <button 
            className="mp-mode-btn learn"
            onClick={() => startMode('learn')}
          >
            <span className="mode-icon">📖</span>
            <span className="mode-name">Learn</span>
            <span className="mode-desc">Reveal and memorize</span>
          </button>

          <button 
            className="mp-mode-btn quiz"
            onClick={() => startMode('quiz')}
          >
            <span className="mode-icon">🎯</span>
            <span className="mode-name">Quiz</span>
            <span className="mode-desc">Test your memory</span>
          </button>

          <button 
            className="mp-mode-btn browse"
            onClick={() => setMode('browse')}
          >
            <span className="mode-icon">📚</span>
            <span className="mode-name">Browse All</span>
            <span className="mode-desc">View the full gallery</span>
          </button>
        </div>

        {learnedCards.size > 0 && (
          <div className="mp-progress-summary">
            <span className="progress-icon">✓</span>
            <span>{learnedCards.size} cards marked as learned</span>
          </div>
        )}
      </div>
    );
  }

  // Quiz Complete Screen
  if (mode === 'quiz-complete') {
    const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    
    return (
      <div className="memory-palace">
        <div className="mp-complete">
          <h2 className="complete-title">Quiz Complete! 🎉</h2>
          
          <div className="quiz-results">
            <div className="result-circle">
              <span className="result-score">{score.correct}/{score.total}</span>
              <span className="result-percent">{percentage}%</span>
            </div>
          </div>

          <div className="complete-message">
            {percentage >= 80 ? "Amazing! You've mastered these memory tricks! 🧠" :
             percentage >= 60 ? "Good job! Keep practicing to improve! 💪" :
             "Keep learning! The absurd sentences will stick eventually! 🎯"}
          </div>

          <div className="complete-actions">
            <button className="mp-btn primary" onClick={() => startMode('quiz')}>
              Try Again
            </button>
            <button className="mp-btn secondary" onClick={() => setMode('menu')}>
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Browse Mode (Gallery)
  if (mode === 'browse') {
    return (
      <div className="memory-palace">
        <div className="mp-header">
          <button className="mp-back-btn" onClick={() => setMode('menu')}>
            ← Menu
          </button>
          <h2 className="mp-subtitle">Browse All</h2>
          <div className="mp-spacer"></div>
        </div>

        <div className="browse-controls">
          <input
            type="text"
            className="browse-search"
            placeholder="Search country or capital..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="browse-region"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {regions.map(region => (
              <option key={region} value={region}>
                {region === 'All' ? '🌍 All' : region}
              </option>
            ))}
          </select>
        </div>

        <div className="browse-count">
          {filteredCards.length} memory tricks
        </div>

        <div className="browse-gallery">
          {filteredCards.map(card => (
            <div
              key={card.id}
              className={`browse-card ${expandedCard === card.id ? 'expanded' : ''}`}
              onClick={() => setExpandedCard(expandedCard === card.id ? null : card.id)}
            >
              <div className="browse-card-header">
                <span className="browse-country">{card.country}</span>
                <span className="browse-capital">{card.capital}</span>
              </div>
              {expandedCard === card.id && (
                <div className="browse-card-body">
                  <span className="browse-brain">🧠</span>
                  <p className="browse-sentence">
                    {formatSentenceWithHighlights(card.sentence, card.highlightedWords).map(part => (
                      part.isHighlight ? (
                        <span key={part.key} className="highlight">{part.text}</span>
                      ) : (
                        <span key={part.key}>{part.text}</span>
                      )
                    ))}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Interactive Modes (Explore, Learn, Quiz)
  if (!currentCard) {
    return (
      <div className="memory-palace">
        <div className="mp-empty">
          <p>No cards available for this region.</p>
          <button className="mp-btn primary" onClick={() => setMode('menu')}>
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="memory-palace">
      <div className="mp-header">
        <button className="mp-back-btn" onClick={() => setMode('menu')}>
          ← Menu
        </button>
        <div className="mp-mode-indicator">
          {mode === 'explore' && '🔀 Explore'}
          {mode === 'learn' && '📖 Learn'}
          {mode === 'quiz' && '🎯 Quiz'}
        </div>
        <div className="mp-counter">
          {currentIndex + 1} / {cards.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mp-progress-bar">
        <div className="mp-progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Quiz Score */}
      {mode === 'quiz' && (
        <div className="mp-quiz-score">
          Score: {score.correct}/{score.total}
        </div>
      )}

      {/* Card */}
      <div className={`mp-card ${isRevealed ? 'revealed' : ''} ${quizFeedback || ''}`}>
        <div className="mp-card-front">
          {/* Show country for all modes */}
          <div className="mp-country">{currentCard.country}</div>
          <div className="mp-region-badge">{currentCard.region}</div>

          {/* Explore mode: show everything */}
          {mode === 'explore' && (
            <>
              <div className="mp-capital">{currentCard.capital}</div>
              <div className="mp-sentence-container">
                <span className="mp-brain">🧠</span>
                <p className="mp-sentence">
                  {formatSentenceWithHighlights(currentCard.sentence, currentCard.highlightedWords).map(part => (
                    part.isHighlight ? (
                      <span key={part.key} className="highlight">{part.text}</span>
                    ) : (
                      <span key={part.key}>{part.text}</span>
                    )
                  ))}
                </p>
              </div>
            </>
          )}

          {/* Learn mode: tap to reveal */}
          {mode === 'learn' && !isRevealed && (
            <button className="mp-reveal-btn" onClick={handleReveal}>
              Tap to Reveal
            </button>
          )}

          {mode === 'learn' && isRevealed && (
            <>
              <div className="mp-capital">{currentCard.capital}</div>
              <div className="mp-sentence-container">
                <span className="mp-brain">🧠</span>
                <p className="mp-sentence">
                  {formatSentenceWithHighlights(currentCard.sentence, currentCard.highlightedWords).map(part => (
                    part.isHighlight ? (
                      <span key={part.key} className="highlight">{part.text}</span>
                    ) : (
                      <span key={part.key}>{part.text}</span>
                    )
                  ))}
                </p>
              </div>
            </>
          )}

          {/* Quiz mode: show blanked sentence, guess capital */}
          {mode === 'quiz' && (
            <>
              <div className="mp-sentence-container quiz-mode">
                <span className="mp-brain">🧠</span>
                <p className="mp-sentence blanked">
                  {blankCapital(currentCard.sentence, currentCard.capital)}
                </p>
              </div>

              {!quizFeedback ? (
                <form className="mp-quiz-form" onSubmit={handleQuizSubmit}>
                  <input
                    type="text"
                    className="mp-quiz-input"
                    placeholder="Type the capital..."
                    value={quizAnswer}
                    onChange={(e) => setQuizAnswer(e.target.value)}
                    autoFocus
                    autoComplete="off"
                  />
                  <button type="submit" className="mp-quiz-submit">
                    Submit
                  </button>
                </form>
              ) : (
                <div className={`mp-quiz-result ${quizFeedback}`}>
                  {quizFeedback === 'correct' ? (
                    <span>✓ Correct!</span>
                  ) : (
                    <span>✗ It was: {currentCard.capital}</span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="mp-nav">
        <button 
          className="mp-nav-btn prev"
          onClick={goToPrev}
          disabled={currentIndex === 0}
        >
          ← Prev
        </button>

        {mode === 'learn' && isRevealed && (
          <button className="mp-nav-btn learned" onClick={handleMarkLearned}>
            ✓ Got it!
          </button>
        )}

        {mode !== 'quiz' && (
          <button 
            className="mp-nav-btn next"
            onClick={goToNext}
            disabled={currentIndex === cards.length - 1}
          >
            Next →
          </button>
        )}
      </div>

      {/* Keyboard hints */}
      <div className="mp-keyboard-hints">
        <span>← → to navigate</span>
        {mode === 'learn' && !isRevealed && <span>Space to reveal</span>}
      </div>
    </div>
  );
}

MemoryPalace.propTypes = {
  onExit: PropTypes.func.isRequired
};
