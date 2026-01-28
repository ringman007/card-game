# Change: Phase 4 - Visual Experience Redesign

## Why
The current design uses a generic purple gradient and sterile white cards that look like typical AI-generated output. Users need a distinctive, warm, educational aesthetic that fits the geography learning context, along with sensory feedback (sound), motivational features (achievements), and accessibility options (dark mode).

## What Changes
- **Design System Overhaul**: Complete CSS variable-based design tokens with Warm Paper/Educational theme
- **Sound Effects**: Audio feedback for correct/incorrect answers and session milestones
- **Achievements System**: Unlockable badges and goals to motivate continued learning
- **Dark Mode**: Full dark theme with system preference detection and manual toggle

## Impact
- Affected specs: question-presentation, progress-tracking, accessibility
- New specs: design-system, sound-effects, achievements
- Affected code: All CSS files, new audio assets, GameContext.jsx, localStorage.js
- New components: AchievementToast, ThemeToggle, SoundToggle

## Scope
This is a major visual overhaul that touches every component's styling while adding three new feature systems. The warm paper theme will differentiate the app from typical tech products.

## Success Criteria
- All components use CSS variables from central design tokens
- Sound effects play on correct/incorrect with user toggle
- At least 10 achievements with toast notifications on unlock
- Dark mode toggles without page refresh and persists
- Theme respects prefers-color-scheme by default
