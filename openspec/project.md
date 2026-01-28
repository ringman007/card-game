# Project Context

## Purpose
A web-based educational card game to help users memorize world capitals through active recall and spaced repetition. The game presents flashcard-style questions where users type answers (country→capital or capital→country), receive immediate feedback, and track progress over time.

**Goals:**
- Educational tool for learning 193 UN member country capitals
- Adaptive learning using spaced repetition algorithm
- 10 cards per session with immediate feedback
- Region filtering (Africa, Asia, Europe, North America, South America, Oceania, World)
- Progress persistence across sessions via local storage

## Tech Stack
- **Framework:** React 18 with Vite
- **State Management:** React Context API + useState hooks
- **Styling:** Plain CSS (component-scoped CSS files)
- **Build Tool:** Vite 5
- **Linting:** ESLint 9 with React plugins
- **Deployment:** Vercel
- **Data Storage:** Browser Local Storage (client-side only)

## Project Conventions

### Code Style
- **Language:** JavaScript (JSX) - no TypeScript
- **Components:** Functional components with hooks only
- **Naming:** 
  - PascalCase for components (e.g., `GameSession.jsx`)
  - camelCase for utilities and functions (e.g., `fuzzyMatch.js`)
  - Component files paired with matching CSS files
- **Documentation:** JSDoc-style comments at top of component files referencing PRD requirements (e.g., `FR-2.1-2.4`)
- **Imports:** Absolute paths from `src/` not configured - use relative paths
- **Formatting:** ESLint recommended rules for React

### Architecture Patterns
- **File Structure:**
  - `src/components/` - React components with co-located CSS
  - `src/context/` - React Context providers
  - `src/utils/` - Pure utility functions
  - `src/data/` - Static JSON data files
- **State Flow:** Centralized in GameContext, components consume via `useGame()` hook
- **Game States:** `'home'` → `'playing'` → `'results'` (managed in context)
- **Routing:** State-based routing via switch statement (no React Router)

### Testing Strategy
- No testing requirements for MVP
- Future phases may add tests

### Git Workflow
- Main branch: `main`
- No formal branching strategy defined for MVP

## Domain Context
- **Countries Dataset:** 193 UN member countries (no territories)
- **Multi-capital countries:** Some countries have multiple capitals (e.g., South Africa, Bolivia)
- **Alternative names:** Countries and capitals may have alternate spellings (e.g., Myanmar/Burma, New Delhi/Delhi)
- **Fuzzy matching:** Answer validation tolerates minor spelling variations, ignores case and diacritics
- **Spaced repetition:** Questions answered incorrectly appear more frequently; correct answers appear at increasing intervals
- **Game Modes:**
  - Mode A: Display country → User types capital
  - Mode B: Display capital → User types country

## Important Constraints
- **No authentication** - fully anonymous usage
- **No server-side storage** - all data in browser local storage
- **No analytics tracking** in MVP
- **10 cards per session** - fixed, cannot be paused/resumed
- **Accessibility target:** WCAG 2.1 Level AA compliance
- **Performance:** Page load < 2s, card transitions < 300ms
- **Browser support:** Latest 2 versions of Chrome, Firefox, Safari, Edge

## External Dependencies
- No external APIs - all data bundled in `src/data/countries.json`
- Vercel for hosting/deployment
- No database or backend services
