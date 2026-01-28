/**
 * Achievements Data
 * Phase 4: Gamification - achievement definitions and unlock logic
 */

/**
 * Achievement categories for organization
 */
export const ACHIEVEMENT_CATEGORIES = {
  BEGINNER: 'beginner',
  PROGRESS: 'progress',
  MASTERY: 'mastery',
  STREAK: 'streak',
  EXPLORER: 'explorer',
  LEARNING: 'learning'
};

/**
 * Achievement definitions
 * Each achievement has:
 * - id: unique identifier
 * - name: display name
 * - description: how to unlock
 * - emoji: visual icon
 * - category: grouping
 * - checkUnlock: function to check if achievement should unlock
 */
export const ACHIEVEMENTS = [
  // Beginner achievements
  {
    id: 'first_session',
    name: 'Getting Started',
    description: 'Complete your first learning session',
    emoji: '🎉',
    category: ACHIEVEMENT_CATEGORIES.BEGINNER,
    checkUnlock: (stats) => stats.totalSessions >= 1
  },
  {
    id: 'first_perfect',
    name: 'Perfect Score',
    description: 'Get 100% in a session',
    emoji: '💯',
    category: ACHIEVEMENT_CATEGORIES.BEGINNER,
    checkUnlock: (stats, sessionData) => 
      sessionData && sessionData.correct === sessionData.total && sessionData.total > 0
  },
  {
    id: 'first_capital',
    name: 'Capital Knowledge',
    description: 'Answer your first question correctly',
    emoji: '🌟',
    category: ACHIEVEMENT_CATEGORIES.BEGINNER,
    checkUnlock: (stats) => stats.totalCorrect >= 1
  },

  // Progress achievements
  {
    id: 'ten_sessions',
    name: 'Dedicated Learner',
    description: 'Complete 10 learning sessions',
    emoji: '📚',
    category: ACHIEVEMENT_CATEGORIES.PROGRESS,
    checkUnlock: (stats) => stats.totalSessions >= 10
  },
  {
    id: 'fifty_correct',
    name: 'Half Century',
    description: 'Answer 50 questions correctly',
    emoji: '🎯',
    category: ACHIEVEMENT_CATEGORIES.PROGRESS,
    checkUnlock: (stats) => stats.totalCorrect >= 50
  },
  {
    id: 'hundred_correct',
    name: 'Century Club',
    description: 'Answer 100 questions correctly',
    emoji: '🏅',
    category: ACHIEVEMENT_CATEGORIES.PROGRESS,
    checkUnlock: (stats) => stats.totalCorrect >= 100
  },
  {
    id: 'five_hundred_correct',
    name: 'Geography Expert',
    description: 'Answer 500 questions correctly',
    emoji: '🏆',
    category: ACHIEVEMENT_CATEGORIES.PROGRESS,
    checkUnlock: (stats) => stats.totalCorrect >= 500
  },

  // Mastery achievements
  {
    id: 'first_mastery',
    name: 'First Mastery',
    description: 'Master your first country-capital pair',
    emoji: '⭐',
    category: ACHIEVEMENT_CATEGORIES.MASTERY,
    checkUnlock: (stats, sessionData, progress) => {
      const masteredCount = Object.values(progress || {}).filter(p => p.bucket === 'mastered').length;
      return masteredCount >= 1;
    }
  },
  {
    id: 'ten_mastered',
    name: 'Rising Scholar',
    description: 'Master 10 country-capital pairs',
    emoji: '🌟',
    category: ACHIEVEMENT_CATEGORIES.MASTERY,
    checkUnlock: (stats, sessionData, progress) => {
      const masteredCount = Object.values(progress || {}).filter(p => p.bucket === 'mastered').length;
      return masteredCount >= 10;
    }
  },
  {
    id: 'fifty_mastered',
    name: 'World Scholar',
    description: 'Master 50 country-capital pairs',
    emoji: '🌍',
    category: ACHIEVEMENT_CATEGORIES.MASTERY,
    checkUnlock: (stats, sessionData, progress) => {
      const masteredCount = Object.values(progress || {}).filter(p => p.bucket === 'mastered').length;
      return masteredCount >= 50;
    }
  },

  // Streak achievements
  {
    id: 'streak_5',
    name: 'On Fire',
    description: 'Get a streak of 5 correct answers',
    emoji: '🔥',
    category: ACHIEVEMENT_CATEGORIES.STREAK,
    checkUnlock: (stats) => stats.bestStreak >= 5
  },
  {
    id: 'streak_10',
    name: 'Unstoppable',
    description: 'Get a streak of 10 correct answers',
    emoji: '💪',
    category: ACHIEVEMENT_CATEGORIES.STREAK,
    checkUnlock: (stats) => stats.bestStreak >= 10
  },
  {
    id: 'streak_20',
    name: 'Legendary',
    description: 'Get a streak of 20 correct answers',
    emoji: '👑',
    category: ACHIEVEMENT_CATEGORIES.STREAK,
    checkUnlock: (stats) => stats.bestStreak >= 20
  },

  // Explorer achievements
  {
    id: 'explore_europe',
    name: 'European Explorer',
    description: 'Answer a Europe question correctly',
    emoji: '🇪🇺',
    category: ACHIEVEMENT_CATEGORIES.EXPLORER,
    checkUnlock: (stats, sessionData, progress) => {
      return Object.entries(progress || {}).some(([id, p]) => 
        id.startsWith('Europe-') && p.timesCorrect > 0
      );
    }
  },
  {
    id: 'explore_asia',
    name: 'Asian Adventurer',
    description: 'Answer an Asia question correctly',
    emoji: '🌏',
    category: ACHIEVEMENT_CATEGORIES.EXPLORER,
    checkUnlock: (stats, sessionData, progress) => {
      return Object.entries(progress || {}).some(([id, p]) => 
        id.startsWith('Asia-') && p.timesCorrect > 0
      );
    }
  },
  {
    id: 'explore_africa',
    name: 'African Safari',
    description: 'Answer an Africa question correctly',
    emoji: '🌍',
    category: ACHIEVEMENT_CATEGORIES.EXPLORER,
    checkUnlock: (stats, sessionData, progress) => {
      return Object.entries(progress || {}).some(([id, p]) => 
        id.startsWith('Africa-') && p.timesCorrect > 0
      );
    }
  },
  {
    id: 'explore_all',
    name: 'Global Citizen',
    description: 'Answer questions from all continents',
    emoji: '🌐',
    category: ACHIEVEMENT_CATEGORIES.EXPLORER,
    checkUnlock: (stats, sessionData, progress) => {
      const regions = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];
      return regions.every(region => 
        Object.entries(progress || {}).some(([id, p]) => 
          id.startsWith(`${region}-`) && p.timesCorrect > 0
        )
      );
    }
  },

  // Learning achievements (Phase 5)
  {
    id: 'no_hints_session',
    name: 'Pure Knowledge',
    description: 'Complete a perfect session without using any hints',
    emoji: '🧠',
    category: ACHIEVEMENT_CATEGORIES.LEARNING,
    checkUnlock: (stats, sessionData) => 
      sessionData && 
      sessionData.correct === sessionData.total && 
      sessionData.total > 0 &&
      sessionData.hintsUsed === 0
  },
  {
    id: 'wise_learner',
    name: 'Wise Learner',
    description: 'Use hints to learn and still get the answer right',
    emoji: '💡',
    category: ACHIEVEMENT_CATEGORIES.LEARNING,
    checkUnlock: (stats, sessionData) => 
      sessionData && 
      sessionData.hintsUsed > 0 &&
      sessionData.correct > 0
  },
  {
    id: 'region_complete',
    name: 'Regional Expert',
    description: 'Explore at least 25 unique countries',
    emoji: '🗺️',
    category: ACHIEVEMENT_CATEGORIES.LEARNING,
    checkUnlock: (stats, sessionData, progress) => {
      // Count unique countries explored
      const exploreCount = Object.values(progress || {}).filter(p => p.timesShown > 0).length;
      return exploreCount >= 25;
    }
  }
];

/**
 * LocalStorage key for unlocked achievements
 */
const ACHIEVEMENTS_STORAGE_KEY = 'capitalCardGame_achievements';

/**
 * Get unlocked achievements from localStorage
 */
export function getUnlockedAchievements() {
  try {
    const stored = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.warn('Failed to load achievements:', e);
    return {};
  }
}

/**
 * Save unlocked achievement to localStorage
 */
export function saveAchievementUnlock(achievementId) {
  try {
    const unlocked = getUnlockedAchievements();
    if (!unlocked[achievementId]) {
      unlocked[achievementId] = {
        unlockedAt: new Date().toISOString()
      };
      localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(unlocked));
    }
  } catch (e) {
    console.warn('Failed to save achievement:', e);
  }
}

/**
 * Check for newly unlocked achievements
 * Returns array of newly unlocked achievement objects
 */
export function checkNewAchievements(stats, sessionData, progress) {
  const unlocked = getUnlockedAchievements();
  const newlyUnlocked = [];

  for (const achievement of ACHIEVEMENTS) {
    // Skip already unlocked
    if (unlocked[achievement.id]) continue;

    // Check if should unlock
    try {
      if (achievement.checkUnlock(stats, sessionData, progress)) {
        saveAchievementUnlock(achievement.id);
        newlyUnlocked.push(achievement);
      }
    } catch (e) {
      console.warn(`Error checking achievement ${achievement.id}:`, e);
    }
  }

  return newlyUnlocked;
}

/**
 * Get all achievements with unlock status
 */
export function getAllAchievementsWithStatus() {
  const unlocked = getUnlockedAchievements();
  return ACHIEVEMENTS.map(achievement => ({
    ...achievement,
    isUnlocked: !!unlocked[achievement.id],
    unlockedAt: unlocked[achievement.id]?.unlockedAt || null
  }));
}

export default {
  ACHIEVEMENTS,
  ACHIEVEMENT_CATEGORIES,
  getUnlockedAchievements,
  saveAchievementUnlock,
  checkNewAchievements,
  getAllAchievementsWithStatus
};
