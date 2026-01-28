/**
 * Theme Context
 * Provides theme state (light/dark/system) with localStorage persistence
 * and system preference detection.
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = 'capitalCardGame_theme';

/**
 * Get the effective theme based on preference and system setting
 */
function getEffectiveTheme(preference) {
  if (preference === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return preference;
}

/**
 * Load theme preference from localStorage
 */
function loadThemePreference() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored;
    }
  } catch (e) {
    console.warn('Failed to load theme preference:', e);
  }
  return 'system'; // Default to system
}

/**
 * Save theme preference to localStorage
 */
function saveThemePreference(preference) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch (e) {
    console.warn('Failed to save theme preference:', e);
  }
}

/**
 * Apply theme to document
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  // Update meta theme-color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#1A1816' : '#FAF8F5');
  }
}

export function ThemeProvider({ children }) {
  const [themePreference, setThemePreference] = useState(loadThemePreference);
  const [effectiveTheme, setEffectiveTheme] = useState(() => 
    getEffectiveTheme(loadThemePreference())
  );

  // Apply theme on mount and when it changes
  useEffect(() => {
    const newEffectiveTheme = getEffectiveTheme(themePreference);
    setEffectiveTheme(newEffectiveTheme);
    applyTheme(newEffectiveTheme);
    saveThemePreference(themePreference);
  }, [themePreference]);

  // Listen for system preference changes
  useEffect(() => {
    if (themePreference !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setEffectiveTheme(newTheme);
      applyTheme(newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themePreference]);

  // Add theme-transition class temporarily for smooth theme switching
  const setTheme = useCallback((preference) => {
    document.documentElement.classList.add('theme-transition');
    setThemePreference(preference);
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = effectiveTheme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  }, [effectiveTheme, setTheme]);

  const value = {
    theme: effectiveTheme,
    themePreference,
    setTheme,
    toggleTheme,
    isDark: effectiveTheme === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
