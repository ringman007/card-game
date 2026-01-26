/**
 * Main App Component
 * Routes between different game states
 */

import { GameProvider, useGame } from './context/GameContext';
import HomePage from './components/HomePage';
import GameSession from './components/GameSession';
import ResultsScreen from './components/ResultsScreen';
import './App.css';

function GameRouter() {
  const { gameState } = useGame();

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
}

function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}

export default App;
