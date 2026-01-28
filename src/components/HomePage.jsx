/**
 * HomePage Component
 * Implements FR-1.1, FR-1.2, FR-7.1
 * Phase 3: Added Practice and Improve mode buttons, Stats Dashboard
 * Phase 4: Added ThemeToggle and SoundToggle
 * Phase 5: Added Study Mode for flashcard learning
 */

import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { getUserProgress, getStats } from '../utils/localStorage';
import { initializeAudio } from '../utils/audio';
import { getSessionQuestions } from '../utils/questionSelector';
import StatsDashboard from './StatsDashboard';
import ThemeToggle from './ThemeToggle';
import SoundToggle from './SoundToggle';
import StudyMode from './StudyMode';
import ProgressMap from './ProgressMap';
import './HomePage.css';

/**
 * Region emoji mapping for visual differentiation
 */
const REGION_EMOJI = {
  'World': '🌎',
  'Africa': '🌍',
  'Asia': '🌏',
  'Europe': '🇪🇺',
  'North America': '🌎',
  'South America': '🌎',
  'Oceania': '🌊'
};

export default function HomePage() {
  const { selectedRegion, setSelectedRegion, gameMode, setGameMode, availableRegions, startGame, startPracticeMode, startImproveMode } = useGame();
  const [showStats, setShowStats] = useState(false);
  const [showProgressMap, setShowProgressMap] = useState(false);
  const [studyModeCards, setStudyModeCards] = useState(null);
  
  // Check if practice/improve modes are available
  const progress = getUserProgress();
  const stats = getStats();
  const answeredCount = Object.keys(progress).filter(id => progress[id].timesShown > 0).length;
  const incorrectQuestions = Object.entries(progress).filter(([, p]) => p.incorrectCount > 0);
  
  const canPractice = answeredCount > 0;
  const canImprove = incorrectQuestions.length > 0;

  const handleStartGame = () => {
    initializeAudio(); // Enable audio on user interaction
    startGame(selectedRegion, gameMode);
  };

  const handlePractice = () => {
    initializeAudio();
    startPracticeMode(gameMode);
  };

  const handleImprove = () => {
    initializeAudio();
    startImproveMode(gameMode);
  };

  const handleStartStudy = () => {
    initializeAudio();
    // Get 20 cards for study mode (more than quiz for better practice)
    const cards = getSessionQuestions(selectedRegion, 20, gameMode);
    setStudyModeCards(cards);
  };

  const handleExitStudy = () => {
    setStudyModeCards(null);
  };

  // Show study mode if active
  if (studyModeCards) {
    return (
      <StudyMode
        cards={studyModeCards}
        region={selectedRegion}
        gameMode={gameMode}
        onExit={handleExitStudy}
      />
    );
  }

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-header-controls">
          <SoundToggle />
          <ThemeToggle />
        </div>
        <div className="header">
          <div className="icon">🌍</div>
          <h1 className="title">World Capitals</h1>
          <p className="subtitle">Master geography through active learning</p>
        </div>
        
        <div className="game-info">
          <div className="info-item">
            <span className="info-icon">🎯</span>
            <span>10 questions per session</span>
          </div>
          <div className="info-item">
            <span className="info-icon">🧠</span>
            <span>Adaptive learning algorithm</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📊</span>
            <span>Track your progress</span>
          </div>
        </div>

        {/* Stats preview */}
        {stats.totalSessions > 0 && (
          <div 
            className="stats-preview clickable"
            onClick={() => setShowStats(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setShowStats(true)}
            aria-label="View detailed statistics"
          >
            <div className="stat-item">
              <span className="stat-value">{stats.totalSessions}</span>
              <span className="stat-label">Sessions</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{Math.round((stats.totalCorrect / (stats.totalCorrect + stats.totalIncorrect)) * 100)}%</span>
              <span className="stat-label">Accuracy</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">🔥 {stats.bestStreak}</span>
              <span className="stat-label">Best Streak</span>
            </div>
            <div className="stats-preview-hint">Tap for details</div>
          </div>
        )}

        {/* World Progress Quick Access */}
        {answeredCount > 0 && (
          <button 
            className="world-progress-btn"
            onClick={() => setShowProgressMap(true)}
            aria-label="View world progress map"
          >
            <span className="progress-btn-icon">📍</span>
            <span className="progress-btn-text">World Progress</span>
            <span className="progress-btn-count">{answeredCount} explored</span>
          </button>
        )}

        <div className="settings-container">
          <div className="setting-group">
            <label htmlFor="mode-select" className="setting-label">
              <span className="label-icon">🎮</span>
              Game Mode
            </label>
            <select
              id="mode-select"
              value={gameMode}
              onChange={(e) => setGameMode(e.target.value)}
              className="setting-select"
              aria-label="Select game mode"
            >
              <option value="countryToCapital">🏛️ Country → Capital</option>
              <option value="capitalToCountry">🗺️ Capital → Country</option>
            </select>
            <p className="setting-description">
              {gameMode === 'countryToCapital' 
                ? 'You\'ll be shown a country and need to name its capital'
                : 'You\'ll be shown a capital and need to name its country'
              }
            </p>
          </div>

          <div className="setting-group">
            <label htmlFor="region-select" className="setting-label">
              <span className="label-icon">🌐</span>
              Region
            </label>
            <select
              id="region-select"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="setting-select"
              aria-label="Select geographical region"
            >
              {availableRegions.map(region => (
                <option key={region} value={region}>
                  {REGION_EMOJI[region] || '📍'} {region}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            onClick={handleStartGame}
            className="start-button"
            aria-label="Start game session"
          >
            <span>Start Learning</span>
            <span className="button-icon">→</span>
          </button>

          <div className="secondary-buttons">
            <button 
              onClick={handleStartStudy}
              className="study-button"
              title="Study with flashcards at your own pace"
              aria-label="Start study mode with flashcards"
            >
              <span className="button-emoji">🃏</span>
              <span>Study</span>
            </button>

            <button 
              onClick={handlePractice}
              className="practice-button"
              disabled={!canPractice}
              title={canPractice ? 'Practice previously answered questions' : 'Answer some questions first'}
              aria-label="Start practice mode"
            >
              <span className="button-emoji">📚</span>
              <span>Practice</span>
            </button>

            <button 
              onClick={handleImprove}
              className="improve-button"
              disabled={!canImprove}
              title={canImprove ? `Review ${incorrectQuestions.length} incorrect answers` : 'No incorrect answers to review'}
              aria-label="Start improve mode"
            >
              <span className="button-emoji">🎯</span>
              <span>Improve</span>
              {canImprove && <span className="badge">{incorrectQuestions.length}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Dashboard Modal */}
      {showStats && <StatsDashboard onClose={() => setShowStats(false)} />}
      
      {/* Progress Map Modal */}
      {showProgressMap && <ProgressMap onClose={() => setShowProgressMap(false)} />}
    </div>
  );
}
