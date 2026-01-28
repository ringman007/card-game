/**
 * ProgressIndicator Component
 * Shows current question number, streak, session stats, and mode
 * Phase 2: Enhanced with streak and accuracy display
 * Phase 3: Added session mode indicator
 */

import PropTypes from 'prop-types';
import { useGame } from '../context/GameContext';
import './ProgressIndicator.css';

/**
 * Mode badge configuration
 */
const MODE_CONFIG = {
  standard: { label: null, color: null },
  practice: { label: 'Practice', color: '#10b981', emoji: '📚' },
  improve: { label: 'Improve', color: '#f59e0b', emoji: '🎯' }
};

export default function ProgressIndicator({ current, total }) {
  const { currentStreak, sessionCorrect, sessionAnswered, sessionMode, selectedRegion } = useGame();
  const percentage = (current / total) * 100;
  const accuracy = sessionAnswered > 0 
    ? Math.round((sessionCorrect / sessionAnswered) * 100) 
    : 0;

  const modeConfig = MODE_CONFIG[sessionMode] || MODE_CONFIG.standard;

  return (
    <div className="progress-indicator">
      <div className="progress-header">
        <div className="progress-left">
          <div className="progress-text">
            Question {current} of {total}
          </div>
          {sessionMode === 'standard' && selectedRegion !== 'World' && (
            <div className="region-badge">{selectedRegion}</div>
          )}
          {modeConfig.label && (
            <div 
              className="mode-badge"
              style={{ backgroundColor: modeConfig.color }}
            >
              <span>{modeConfig.emoji}</span>
              <span>{modeConfig.label}</span>
            </div>
          )}
        </div>
        <div className="session-stats">
          {currentStreak >= 3 && (
            <div className="streak-display" title="Current streak">
              🔥 {currentStreak}
            </div>
          )}
          {sessionAnswered > 0 && (
            <div className="accuracy-display" title="Session accuracy">
              {accuracy}% accurate
            </div>
          )}
        </div>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin="0"
          aria-valuemax={total}
        />
      </div>
    </div>
  );
}

ProgressIndicator.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};
