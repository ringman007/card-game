/**
 * AchievementToast Component
 * Phase 4: Displays achievement unlock notifications
 */

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { playAchievementSound } from '../utils/audio';
import './AchievementToast.css';

export default function AchievementToast({ achievement, onDismiss }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Play achievement sound
    playAchievementSound();
    
    // Trigger entrance animation
    const showTimer = setTimeout(() => setIsVisible(true), 50);
    
    // Auto-dismiss after 4 seconds
    const dismissTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onDismiss, 300);
    }, 4000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(dismissTimer);
    };
  }, [onDismiss]);

  const handleClick = () => {
    setIsExiting(true);
    setTimeout(onDismiss, 300);
  };

  return (
    <div 
      className={`achievement-toast ${isVisible ? 'visible' : ''} ${isExiting ? 'exiting' : ''}`}
      onClick={handleClick}
      role="alert"
      aria-live="polite"
    >
      <div className="achievement-toast-icon">
        {achievement.emoji}
      </div>
      <div className="achievement-toast-content">
        <div className="achievement-toast-title">Achievement Unlocked!</div>
        <div className="achievement-toast-name">{achievement.name}</div>
        <div className="achievement-toast-description">{achievement.description}</div>
      </div>
    </div>
  );
}

AchievementToast.propTypes = {
  achievement: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired
  }).isRequired,
  onDismiss: PropTypes.func.isRequired
};
