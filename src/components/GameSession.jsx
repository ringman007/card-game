/**
 * GameSession Component
 * Implements FR-1.3, FR-2.1-2.4
 * Phase 4: Added back to home button
 */

import { useGame } from '../context/GameContext';
import Card from './Card';
import ProgressIndicator from './ProgressIndicator';
import './GameSession.css';

export default function GameSession() {
  const { currentQuestion, currentQuestionIndex, questions, returnToHome } = useGame();

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-session">
      <div className="game-session-header">
        <button 
          className="back-to-home-button"
          onClick={returnToHome}
          aria-label="Return to home"
          title="Back to Home"
        >
          <svg 
            className="back-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          <span className="back-text">Home</span>
        </button>
        <ProgressIndicator 
          current={currentQuestionIndex + 1} 
          total={questions.length} 
        />
      </div>
      <Card question={currentQuestion} />
    </div>
  );
}
