/**
 * ResultsScreen Component
 * Shows session results and statistics
 */

import { useGame } from '../context/GameContext';
import './ResultsScreen.css';

export default function ResultsScreen() {
  const { answers, returnToHome } = useGame();

  const correctCount = answers.filter(a => a.isCorrect).length;
  const totalCount = answers.length;
  const percentage = Math.round((correctCount / totalCount) * 100);

  return (
    <div className="results-screen">
      <div className="results-container">
        <h1 className="results-title">Session Complete!</h1>
        
        <div className="score-display">
          <div className="score-number">
            {correctCount}/{totalCount}
          </div>
          <div className="score-percentage">{percentage}% Correct</div>
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

        <button 
          onClick={returnToHome}
          className="home-button"
          aria-label="Return to home page"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
