/**
 * GameSession Component
 * Implements FR-1.3, FR-2.1-2.4
 */

import { useGame } from '../context/GameContext';
import Card from './Card';
import ProgressIndicator from './ProgressIndicator';
import './GameSession.css';

export default function GameSession() {
  const { currentQuestion, currentQuestionIndex, questions } = useGame();

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-session">
      <ProgressIndicator 
        current={currentQuestionIndex + 1} 
        total={questions.length} 
      />
      <Card question={currentQuestion} />
    </div>
  );
}
