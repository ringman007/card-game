/**
 * Game Context for state management using React Context API
 * Phase 2: Added streak tracking and session statistics
 * Phase 3: Added practice mode, improve mode, session mode tracking
 * Phase 4: Added achievements integration
 */

import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getSessionQuestions, getPracticeQuestions, getImproveQuestions, getAvailableRegions } from '../utils/questionSelector';
import { updateQuestionProgress, getSettings, saveSettings, saveSessionStats, getStats, getUserProgress } from '../utils/localStorage';
import { checkNewAchievements } from '../data/achievements';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState('home'); // 'home', 'playing', 'results'
  const [sessionMode, setSessionMode] = useState('standard'); // 'standard', 'practice', 'improve'
  const [selectedRegion, setSelectedRegion] = useState('World');
  const [gameMode, setGameMode] = useState('countryToCapital'); // 'countryToCapital' or 'capitalToCountry'
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [availableRegions, setAvailableRegions] = useState([]);
  
  // Streak tracking
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestSessionStreak, setBestSessionStreak] = useState(0);
  const [allTimeBestStreak, setAllTimeBestStreak] = useState(0);
  
  // Achievement notifications queue
  const [pendingAchievements, setPendingAchievements] = useState([]);

  // Load settings on mount
  useEffect(() => {
    const settings = getSettings();
    setSelectedRegion(settings.lastRegion || 'World');
    setGameMode(settings.lastMode || 'countryToCapital');
    setAvailableRegions(getAvailableRegions());
    
    // Load best streak from stats
    const stats = getStats();
    setAllTimeBestStreak(stats.bestStreak || 0);
  }, []);

  const startGame = (region, mode) => {
    const sessionQuestions = getSessionQuestions(region, 10, mode);
    setQuestions(sessionQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCurrentStreak(0);
    setBestSessionStreak(0);
    setSessionMode('standard');
    setGameState('playing');
    setSelectedRegion(region);
    setGameMode(mode);
    
    // Save preferences
    saveSettings({ lastRegion: region, lastMode: mode });
  };

  const startPracticeMode = (mode) => {
    const practiceQuestions = getPracticeQuestions(10, mode);
    if (practiceQuestions.length === 0) {
      return; // No questions available
    }
    setQuestions(practiceQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCurrentStreak(0);
    setBestSessionStreak(0);
    setSessionMode('practice');
    setGameState('playing');
    setGameMode(mode);
  };

  const startImproveMode = (mode) => {
    const improveQuestions = getImproveQuestions(10, mode);
    if (improveQuestions.length === 0) {
      return; // No incorrect questions available
    }
    setQuestions(improveQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCurrentStreak(0);
    setBestSessionStreak(0);
    setSessionMode('improve');
    setGameState('playing');
    setGameMode(mode);
  };

  const submitAnswer = (userAnswer, isCorrect, hintsUsed = 0) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Update streak
    let newStreak = currentStreak;
    if (isCorrect) {
      newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > bestSessionStreak) {
        setBestSessionStreak(newStreak);
      }
    } else {
      setCurrentStreak(0);
    }
    
    // Record answer with hints tracking
    const answerRecord = {
      question: currentQuestion,
      userAnswer,
      isCorrect,
      hintsUsed,
      streakAtTime: newStreak,
      timestamp: new Date().toISOString()
    };
    
    const newAnswers = [...answers, answerRecord];
    setAnswers(newAnswers);
    
    // Update progress in local storage
    updateQuestionProgress(currentQuestion.id, isCorrect);
    
    // Move to next question or end game
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of session - save stats
      const correctCount = newAnswers.filter(a => a.isCorrect).length;
      const incorrectCount = newAnswers.filter(a => !a.isCorrect).length;
      const finalBestStreak = isCorrect && newStreak > bestSessionStreak ? newStreak : bestSessionStreak;
      
      saveSessionStats({
        correctCount,
        incorrectCount,
        bestStreak: finalBestStreak
      });
      
      // Update all-time best if needed
      if (finalBestStreak > allTimeBestStreak) {
        setAllTimeBestStreak(finalBestStreak);
      }
      
      // Check for newly unlocked achievements
      const stats = getStats();
      const progress = getUserProgress();
      const sessionHints = newAnswers.reduce((total, a) => total + (a.hintsUsed || 0), 0);
      const sessionData = { correct: correctCount, total: newAnswers.length, hintsUsed: sessionHints };
      const newAchievements = checkNewAchievements(stats, sessionData, progress);
      if (newAchievements.length > 0) {
        setPendingAchievements(prev => [...prev, ...newAchievements]);
      }
      
      setGameState('results');
    }
  };

  const returnToHome = () => {
    setGameState('home');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCurrentStreak(0);
    setBestSessionStreak(0);
    setSessionMode('standard');
  };

  const dismissAchievement = () => {
    setPendingAchievements(prev => prev.slice(1));
  };

  const value = {
    gameState,
    sessionMode,
    selectedRegion,
    setSelectedRegion,
    gameMode,
    setGameMode,
    questions,
    currentQuestionIndex,
    currentQuestion: questions[currentQuestionIndex],
    answers,
    availableRegions,
    currentStreak,
    bestSessionStreak,
    allTimeBestStreak,
    sessionCorrect: answers.filter(a => a.isCorrect).length,
    sessionAnswered: answers.length,
    sessionHintsUsed: answers.reduce((total, a) => total + (a.hintsUsed || 0), 0),
    startGame,
    startPracticeMode,
    startImproveMode,
    submitAnswer,
    returnToHome,
    pendingAchievements,
    dismissAchievement
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
