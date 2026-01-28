/**
 * Game Context for state management using React Context API
 */

import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getSessionQuestions, getAvailableRegions } from '../utils/questionSelector';
import { updateQuestionProgress, getSettings, saveSettings } from '../utils/localStorage';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState('home'); // 'home', 'playing', 'results'
  const [selectedRegion, setSelectedRegion] = useState('World');
  const [gameMode, setGameMode] = useState('countryToCapital'); // 'countryToCapital' or 'capitalToCountry'
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [availableRegions, setAvailableRegions] = useState([]);

  // Load settings on mount
  useEffect(() => {
    const settings = getSettings();
    setSelectedRegion(settings.lastRegion || 'World');
    setGameMode(settings.lastMode || 'countryToCapital');
    setAvailableRegions(getAvailableRegions());
  }, []);

  const startGame = (region, mode) => {
    const sessionQuestions = getSessionQuestions(region, 10, mode);
    setQuestions(sessionQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setGameState('playing');
    setSelectedRegion(region);
    setGameMode(mode);
    
    // Save preferences
    saveSettings({ lastRegion: region, lastMode: mode });
  };

  const submitAnswer = (userAnswer, isCorrect) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Record answer
    const answerRecord = {
      question: currentQuestion,
      userAnswer,
      isCorrect,
      timestamp: new Date().toISOString()
    };
    
    setAnswers([...answers, answerRecord]);
    
    // Update progress in local storage
    updateQuestionProgress(currentQuestion.id, isCorrect);
    
    // Move to next question or end game
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameState('results');
    }
  };

  const returnToHome = () => {
    setGameState('home');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const value = {
    gameState,
    selectedRegion,
    setSelectedRegion,
    gameMode,
    setGameMode,
    questions,
    currentQuestionIndex,
    currentQuestion: questions[currentQuestionIndex],
    answers,
    availableRegions,
    startGame,
    submitAnswer,
    returnToHome
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

GameProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
