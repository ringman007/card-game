/**
 * HomePage Component
 * Implements FR-1.1, FR-1.2
 */

import { useGame } from '../context/GameContext';
import './HomePage.css';

export default function HomePage() {
  const { selectedRegion, setSelectedRegion, gameMode, setGameMode, availableRegions, startGame } = useGame();

  const handleStartGame = () => {
    startGame(selectedRegion, gameMode);
  };

  return (
    <div className="home-page">
      <div className="home-container">
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
                  {region === 'World' ? '🌎 ' : '📍 '}{region}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button 
          onClick={handleStartGame}
          className="start-button"
          aria-label="Start game session"
        >
          <span>Start Learning</span>
          <span className="button-icon">→</span>
        </button>
      </div>
    </div>
  );
}
