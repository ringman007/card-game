# Phase 5 Tasks: Learning Enhancements

## 1. Hint System
- [ ] Create `src/utils/hints.js` with hint generation logic
  - [ ] `getHint(answer, level)` - returns progressive hints (level 1-3)
  - [ ] Level 1: First letter
  - [ ] Level 2: First letter + total length
  - [ ] Level 3: First 3 letters (or half for short words)
- [ ] Update `Card.jsx` to add hint functionality
  - [ ] Add "Get Hint" button (appears after 3 seconds)
  - [ ] Track current hint level (0-3) in component state
  - [ ] Display current hint text
  - [ ] Style hint button and display area
- [ ] Update `GameContext.jsx` to track hints
  - [ ] Add `hintsUsed` to answer record
  - [ ] Track hints per question in session
- [ ] Update scoring logic
  - [ ] Full credit (no hints): 100%
  - [ ] 1 hint used: 50%
  - [ ] 2 hints used: 25%
  - [ ] 3 hints used: 10%
- [ ] Update `ResultsScreen.jsx` to show hints used in summary
- [ ] Add hint-related achievement: "No Hints Needed" (10 correct without hints)

## 2. Study Mode (Flashcard Mode)
- [ ] Create `src/components/StudyMode.jsx`
  - [ ] Flashcard-style interface
  - [ ] Filter by region dropdown
  - [ ] Filter by mastery level (New, Learning, Review, Mastered)
  - [ ] Shuffle option
- [ ] Create `src/components/Flashcard.jsx`
  - [ ] Front: Country name (or capital based on mode)
  - [ ] Back: Answer + region info
  - [ ] Flip animation on click/tap
  - [ ] "Know It" / "Need Review" buttons
- [ ] Create `src/components/StudyMode.css` and `Flashcard.css`
- [ ] Update `GameContext.jsx`
  - [ ] Add `'study'` to gameState options
  - [ ] Add `startStudyMode(region, filter)` function
- [ ] Update `HomePage.jsx`
  - [ ] Add "📖 Study Mode" button
- [ ] Update `App.jsx` to render StudyMode when gameState is 'study'

## 3. Mnemonics System
- [ ] Create `src/data/mnemonics.json` with curated memory tips
  - [ ] Add mnemonics for ~30 hardest capitals
  - [ ] Format: `{ "countryId": "mnemonic text" }`
- [ ] Create `src/utils/mnemonics.js`
  - [ ] `getMnemonic(countryId)` - get curated mnemonic
  - [ ] `getUserMnemonic(countryId)` - get from localStorage
  - [ ] `saveUserMnemonic(countryId, text)` - save to localStorage
- [ ] Update `Card.jsx`
  - [ ] Add collapsible "💡 Memory Tip" section
  - [ ] Show curated mnemonic if available
  - [ ] Allow user to add/edit their own mnemonic
- [ ] Create styles for mnemonic section in `Card.css`

## 4. Interactive World Map
- [ ] Research and choose map approach
  - [ ] Option A: Custom SVG map (smaller bundle)
  - [ ] Option B: react-simple-maps library (easier interactivity)
- [ ] Create `src/components/ProgressMap.jsx`
  - [ ] SVG world map with clickable country paths
  - [ ] Color-coded by mastery level
  - [ ] Filter by region
  - [ ] Legend showing color meanings
- [ ] Create `src/components/CountryDetail.jsx`
  - [ ] Popup/modal showing country details on click
  - [ ] Country name, capital, region
  - [ ] Times answered, accuracy percentage
  - [ ] Current mastery bucket
  - [ ] Quick study button
- [ ] Create `ProgressMap.css` and `CountryDetail.css`
- [ ] Update `HomePage.jsx`
  - [ ] Add "🗺️ Progress Map" button
- [ ] Update `GameContext.jsx`
  - [ ] Add `'map'` to gameState options
  - [ ] Add `showProgressMap()` function
- [ ] Update `App.jsx` to render ProgressMap

## 5. Integration & Polish
- [ ] Add new achievements for Phase 5 features
  - [ ] "Self-Taught" - Complete 50 flashcards in study mode
  - [ ] "Memory Master" - Add 10 personal mnemonics
  - [ ] "World Explorer" - View all countries on the map
  - [ ] "No Hints Needed" - Get 10 correct in a row without hints
- [ ] Ensure dark mode works for all new components
- [ ] Test on mobile devices
- [ ] Update design tokens if needed for new components
- [ ] Performance optimization for map rendering

## Files to Create
- `src/utils/hints.js`
- `src/utils/mnemonics.js`
- `src/data/mnemonics.json`
- `src/components/StudyMode.jsx`
- `src/components/StudyMode.css`
- `src/components/Flashcard.jsx`
- `src/components/Flashcard.css`
- `src/components/ProgressMap.jsx`
- `src/components/ProgressMap.css`
- `src/components/CountryDetail.jsx`
- `src/components/CountryDetail.css`

## Files to Modify
- `src/components/Card.jsx` - hints + mnemonics
- `src/components/Card.css` - hint and mnemonic styles
- `src/components/HomePage.jsx` - new mode buttons
- `src/components/HomePage.css` - button styles
- `src/context/GameContext.jsx` - new states and functions
- `src/App.jsx` - new route handlers
- `src/data/achievements.js` - new achievements
- `src/components/ResultsScreen.jsx` - hints summary
