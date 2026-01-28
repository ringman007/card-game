/**
 * ThemeToggle Component
 * Allows users to switch between light, dark, and system themes.
 */

import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const { themePreference, setTheme } = useTheme();

  const options = [
    { value: 'light', icon: '☀️', label: 'Light' },
    { value: 'dark', icon: '🌙', label: 'Dark' },
    { value: 'system', icon: '💻', label: 'System' },
  ];

  return (
    <div className="theme-toggle" role="radiogroup" aria-label="Theme selection">
      {options.map((option) => (
        <button
          key={option.value}
          className={`theme-option ${themePreference === option.value ? 'active' : ''}`}
          onClick={() => setTheme(option.value)}
          role="radio"
          aria-checked={themePreference === option.value}
          aria-label={`${option.label} theme`}
          title={option.label}
        >
          <span className="theme-icon">{option.icon}</span>
          <span className="theme-label">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
