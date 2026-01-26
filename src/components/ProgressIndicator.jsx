/**
 * ProgressIndicator Component
 * Shows current question number out of total
 */

import './ProgressIndicator.css';

export default function ProgressIndicator({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-indicator">
      <div className="progress-text">
        Question {current} of {total}
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
