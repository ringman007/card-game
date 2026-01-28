/**
 * ResultsScreen Component
 * Shows session results and statistics
 * Phase 2: Enhanced with streak display and session summary
 * Phase 3: Added session mode display and mode-aware play again
 * Phase 4: Added session complete sound effect
 */

import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { getStats } from '../utils/localStorage';
import { playCompleteSound } from '../utils/audio';
import './ResultsScreen.css';

/**
 * Session mode labels
 */
const MODE_LABELS = {
  standard: 'Learning Session',
  practice: 'Practice Session',
  improve: 'Improve Session'
};

export default function ResultsScreen() {
  const { answers, returnToHome, bestSessionStreak, allTimeBestStreak, startGame, startPracticeMode, startImproveMode, selectedRegion, gameMode, sessionMode, sessionHintsUsed } = useGame();
  const stats = getStats();

  // Play celebration sound on mount
  useEffect(() => {
    playCompleteSound();
  }, []);

  const correctCount = answers.filter(a => a.isCorrect).length;
  const totalCount = answers.length;
  const percentage = Math.round((correctCount / totalCount) * 100);

  // Determine performance message
  const getPerformanceMessage = () => {
    if (percentage >= 90) return { text: 'Outstanding! 🏆', color: '#10b981' };
    if (percentage >= 70) return { text: 'Great job! 🌟', color: '#3b82f6' };
    if (percentage >= 50) return { text: 'Good effort! 💪', color: '#f59e0b' };
    return { text: 'Keep practicing! 📚', color: '#6b7280' };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="results-screen">
      <div className="results-container">
        <h1 className="results-title">Session Complete!</h1>
        <div className="session-type">{MODE_LABELS[sessionMode] || MODE_LABELS.standard}</div>
        
        <div className="score-display">
          <div className="score-number">
            {correctCount}/{totalCount}
          </div>
          <div className="score-percentage">{percentage}% Correct</div>
          <div className="performance-message" style={{ color: performance.color }}>
            {performance.text}
          </div>
        </div>

        {/* Streak and Stats Summary */}
        <div className="session-summary">
          <div className="summary-item">
            <span className="summary-label">Best Streak This Session</span>
            <span className="summary-value streak">
              {bestSessionStreak > 0 ? `🔥 ${bestSessionStreak}` : '-'}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Hints Used</span>
            <span className="summary-value hints">
              {sessionHintsUsed > 0 ? `💡 ${sessionHintsUsed}` : '✨ None!'}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">All-Time Best Streak</span>
            <span className="summary-value">
              {allTimeBestStreak > 0 ? `🏆 ${allTimeBestStreak}` : '-'}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Sessions</span>
            <span className="summary-value">{stats.totalSessions || 1}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">All-Time Accuracy</span>
            <span className="summary-value">
              {stats.totalAnswered > 0 
                ? `${Math.round((stats.totalCorrect / stats.totalAnswered) * 100)}%`
                : '-'
              }
            </span>
          </div>
        </div>

        <div className="answers-review">
          <h2 className="review-title">Review Your Answers</h2>
          <div className="answers-list">
            {answers.map((answer, index) => (
              <div 
                key={index} 
                className={`answer-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}
              >
                <div className="answer-number">{index + 1}</div>
                <div className="answer-details">
                  <div className="answer-question">
                    {answer.question.mode === 'countryToCapital' 
                      ? `${answer.question.country} →`
                      : `${answer.question.capital} →`
                    }
                  </div>
                  <div className="answer-user">
                    Your answer: <span className="user-answer">{answer.userAnswer}</span>
                    {answer.hintsUsed > 0 && (
                      <span className="hints-used-badge" title={`Used ${answer.hintsUsed} hint${answer.hintsUsed > 1 ? 's' : ''}`}>
                        💡{answer.hintsUsed}
                      </span>
                    )}
                  </div>
                  {!answer.isCorrect && (
                    <div className="answer-correct">
                      Correct answer: <span className="correct-answer">
                        {answer.question.mode === 'countryToCapital' 
                          ? answer.question.capital
                          : answer.question.country
                        }
                      </span>
                    </div>
                  )}
                </div>
                <div className="answer-icon">
                  {answer.isCorrect ? '✓' : '✗'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <button 
            onClick={() => {
              if (sessionMode === 'practice') {
                startPracticeMode(gameMode);
              } else if (sessionMode === 'improve') {
                startImproveMode(gameMode);
              } else {
                startGame(selectedRegion, gameMode);
              }
            }}
            className="play-again-button"
            aria-label="Play again with same settings"
          >
            Play Again
          </button>
          <button 
            onClick={returnToHome}
            className="home-button"
            aria-label="Return to home page"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
