# Phase 5: Learning Enhancements

## Summary
Add learning-focused features to help users better memorize capitals: a hint system, flashcard/study mode, interactive world map showing progress, and mnemonics for challenging capitals.

## Motivation
While the game effectively uses spaced repetition for learning, users sometimes get stuck on difficult questions with no way to progress. Additionally, users may want to study without the pressure of scoring, or visualize their progress geographically. These enhancements transform the app from a quiz into a more complete learning tool.

## Goals
1. **Hint System** - Help users when stuck, with progressive hints that reveal more information
2. **Study/Flashcard Mode** - Self-paced review without scoring, allowing users to flip cards and mark as "known" or "need review"
3. **Interactive World Map** - Visual representation of progress by country, with color-coded mastery levels
4. **Mnemonics** - Memory aids for tricky capitals (user-contributed or curated)

## Non-Goals
- Multiplayer or social features
- Authentication or user accounts
- Server-side storage
- Mobile native app features

## User Stories

### Hint System
- As a learner, I want to get a hint when I'm stuck so I can continue learning without giving up
- As a learner, I want hints to be progressive (first letter → more letters) so I can challenge myself
- As a learner, I want using hints to affect my score so there's incentive to try without hints first

### Study Mode  
- As a learner, I want a no-pressure flashcard mode so I can review at my own pace
- As a learner, I want to flip cards to reveal answers so I can test my recall
- As a learner, I want to mark cards as "known" or "need review" so I can focus on weak areas

### World Map
- As a learner, I want to see a world map with my progress so I can visualize what I've learned
- As a learner, I want to click on countries to see their capital and my stats
- As a learner, I want countries color-coded by mastery level so I can identify weak regions

### Mnemonics
- As a learner, I want memory tips for tricky capitals so I can remember them better
- As a learner, I want to add my own mnemonics so I can use techniques that work for me
- As a learner, I want to see community/curated mnemonics for popular difficult pairs

## Proposed Changes

### 1. Hint System
- Add "Get Hint" button to Card component (visible after 3 seconds of thinking)
- Progressive hints: 
  - Hint 1: First letter of the answer
  - Hint 2: Number of letters + first letter
  - Hint 3: First 3 letters (or half for short answers)
- Hints used reduces score for that question (full credit → half credit → quarter credit)
- Track "hints used" in session stats

### 2. Study Mode
- New game mode accessible from HomePage: "📖 Study Mode"
- Flashcard interface showing country on front, capital on back
- Tap/click to flip card
- Swipe or buttons: "✓ Know it" / "✗ Need Review"
- Filter by region and mastery level
- No scoring, no time pressure
- Updates progress data (increases familiarity without affecting bucket)

### 3. Interactive World Map
- New "🗺️ Progress Map" button on HomePage
- SVG world map with clickable countries
- Color coding:
  - Gray: Not yet answered
  - Red: Struggling (bucket: learning, high incorrect count)
  - Yellow: In progress (bucket: review)
  - Green: Mastered (bucket: mastered)
- Click country to see: name, capital, times answered, accuracy, last seen
- Filter by region

### 4. Mnemonics System
- Add optional "memory tip" field to countries.json for curated mnemonics
- "💡 Memory Tip" section on Card component (collapsed by default)
- Allow users to add personal mnemonics (stored in localStorage)
- Show user's mnemonic or curated one if available

## Technical Approach

### Hint System
- Modify `Card.jsx` to add hint button and state
- New `src/utils/hints.js` for hint generation logic
- Update `GameContext` to track hints used per question
- Modify scoring calculation to account for hints

### Study Mode
- New `src/components/StudyMode.jsx` and `StudyMode.css`
- New `src/components/Flashcard.jsx` for flip animation
- Add `'study'` to gameState options
- Separate progress tracking for study mode (optional)

### World Map
- Add SVG world map asset to `public/` or use a lightweight library
- New `src/components/ProgressMap.jsx` and `ProgressMap.css`
- New `src/components/CountryTooltip.jsx` for click details
- Read progress data to color-code countries

### Mnemonics
- Extend `countries.json` schema with optional `mnemonic` field
- Add curated mnemonics for ~50 hardest capitals
- New localStorage key for user mnemonics
- Update Card component with collapsible mnemonic section

## Dependencies
- Consider lightweight map library (e.g., react-simple-maps or custom SVG)
- No new external dependencies required for hints, study mode, or mnemonics

## Rollout Plan
1. Implement Hint System (simplest, immediate value)
2. Implement Study Mode (new user journey)
3. Add Mnemonics (content enhancement)
4. Implement World Map (most complex, best visual impact)

## Success Metrics
- Increased session completion rate
- Higher return user rate
- More countries reaching "mastered" bucket
- Study mode usage alongside quiz mode
