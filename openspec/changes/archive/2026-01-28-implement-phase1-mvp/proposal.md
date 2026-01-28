# Change: Implement Phase 1 MVP

## Why
The World Capitals Card Game needs a formal specification for its core functionality. While reference code exists, this proposal establishes the foundational requirements for the MVP: a complete game loop with 10 flashcard questions, basic answer validation, and progress persistence. This enables future phases to build upon a well-documented baseline.

## What Changes
- **Game Session**: Core game loop with start, play, and results states
- **Question Presentation**: Card-based UI with country/capital display and text input
- **Answer Validation**: Case-insensitive exact matching with diacritics handling
- **Progress Tracking**: Local storage for session history and basic metrics
- **Countries Data**: 193 UN member countries dataset with region classification

### Phase 1 Scope (MVP)
Per PRD Section 11, Phase 1 includes:
- Basic game session (10 cards, both modes)
- UN member countries dataset
- Simple validation (exact match for short words, basic fuzzy for longer)
- Local storage for basic progress
- Minimal UI with desktop-first responsive design
- Keyboard navigation and basic accessibility

### Deferred to Phase 2
- Full fuzzy matching algorithm refinement
- Spaced repetition scheduling optimization
- Alternative names support enhancement
- Improved UI/animations

## Impact
- **Affected specs**: New capabilities (none exist yet)
  - `game-session` - Game lifecycle management
  - `question-presentation` - Card UI and input handling
  - `answer-validation` - Answer matching logic
  - `progress-tracking` - Local storage persistence
  - `countries-data` - Dataset structure and regions
- **Affected code**: 
  - `src/components/` - React components
  - `src/context/GameContext.jsx` - State management
  - `src/utils/` - Utility functions
  - `src/data/countries.json` - Countries dataset

## Success Criteria
- User can complete a 10-question session in either game mode
- Answers validated correctly (case-insensitive, diacritics-tolerant)
- Progress persists across browser sessions
- Keyboard-navigable interface
- Page load < 2 seconds, transitions < 300ms
