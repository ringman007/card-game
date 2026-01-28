/**
 * Main App Component
 * Routes between different game states
 * Phase 3: Added accessibility features (skip nav, focus management)
 * Phase 4: Added ThemeProvider for dark mode support, achievement toasts
 */

import { useEffect, useRef } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './components/HomePage';
import GameSession from './components/GameSession';
import ResultsScreen from './components/ResultsScreen';
import AchievementToast from './components/AchievementToast';
import './App.css';

function GameRouter() {
  const { gameState, pendingAchievements, dismissAchievement } = useGame();
  const mainRef = useRef(null);
  const prevGameState = useRef(gameState);

  // Focus management on route changes
  useEffect(() => {
    if (prevGameState.current !== gameState && mainRef.current) {
      // Focus the main content on state change
      mainRef.current.focus();
    }
    prevGameState.current = gameState;
  }, [gameState]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Escape to go back to home (when not in input)
      if (e.key === 'Escape' && gameState !== 'home') {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
          // Could trigger returnToHome, but need to be careful about context
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  const renderContent = () => {
    switch (gameState) {
      case 'home':
        return <HomePage />;
      case 'playing':
        return <GameSession />;
      case 'results':
        return <ResultsScreen />;
      default:
        return <HomePage />;
    }
  };

  return (
    <main 
      id="main-content" 
      ref={mainRef} 
      tabIndex={-1}
      style={{ outline: 'none' }}
    >
      {renderContent()}
      {pendingAchievements.length > 0 && (
        <AchievementToast 
          achievement={pendingAchievements[0]} 
          onDismiss={dismissAchievement} 
        />
      )}
    </main>
  );
}

function App() {
  return (
    <ThemeProvider>
      <GameProvider>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <GameRouter />
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;
