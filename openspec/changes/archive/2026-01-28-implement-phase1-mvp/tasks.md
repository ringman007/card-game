# Implementation Tasks: Phase 1 MVP

## 1. Countries Dataset
- [x] 1.1 Validate countries.json contains all 193 UN member countries (194 including Vatican City observer)
- [x] 1.2 Verify data structure matches spec (id, country, capital, region, alternatives, multipleCapitals)
- [x] 1.3 Confirm all 6 regions represented (Africa, Asia, Europe, North America, South America, Oceania)
- [x] 1.4 Validate multi-capital countries are correctly flagged (South Africa, Bolivia, Malaysia, Sri Lanka, Eswatini)

## 2. Game Session Core
- [x] 2.1 Implement GameContext with state machine (home → playing → results)
- [x] 2.2 Create HomePage with region selector and game mode selector
- [x] 2.3 Implement startGame() to select 10 questions from dataset
- [x] 2.4 Create GameSession component with question flow
- [x] 2.5 Implement ResultsScreen showing session summary
- [x] 2.6 Add returnToHome() to reset and restart

## 3. Question Presentation
- [x] 3.1 Create Card component with question display
- [x] 3.2 Implement mode-aware prompt text (Country→Capital or Capital→Country)
- [x] 3.3 Add text input field with proper labeling
- [x] 3.4 Implement submit button with Enter key support
- [x] 3.5 Add helper text for special cases (multiple capitals, alternatives)
- [x] 3.6 Create ProgressIndicator showing current/total questions

## 4. Answer Validation
- [x] 4.1 Implement normalizeString() for case and diacritics handling
- [x] 4.2 Create fuzzyMatch() with Levenshtein distance calculation
- [x] 4.3 Implement getAllAnswers() to collect primary + alternatives
- [x] 4.4 Add immediate visual feedback (correct/incorrect)
- [x] 4.5 Show correct answer after incorrect submission
- [x] 4.6 Auto-advance to next question after feedback delay

## 5. Progress Tracking
- [x] 5.1 Implement getUserProgress() to read from localStorage
- [x] 5.2 Create saveUserProgress() to persist data
- [x] 5.3 Implement updateQuestionProgress() with metrics tracking
- [x] 5.4 Add getSettings()/saveSettings() for user preferences
- [x] 5.5 Track: timesShown, correctCount, incorrectCount, lastShown

## 6. Question Selection Algorithm
- [x] 6.1 Implement getSessionQuestions() with region filtering
- [x] 6.2 Add basic scoring for question prioritization
- [x] 6.3 Implement shuffleArray() for randomization
- [x] 6.4 Create getAvailableRegions() from dataset

## 7. Accessibility & Polish
- [x] 7.1 Add ARIA labels to all interactive elements
- [x] 7.2 Ensure keyboard navigation (Tab, Enter, focus management)
- [x] 7.3 Add role="alert" for feedback announcements
- [ ] 7.4 Test with screen reader (VoiceOver) - manual testing required
- [x] 7.5 Verify focus returns to input after card transition

## 8. Performance Validation
- [x] 8.1 Measure initial page load time (target: < 2s) - Bundle: 54KB gzipped, builds in 708ms
- [x] 8.2 Verify card transition timing (target: < 300ms) - All transitions 200-300ms
- [ ] 8.3 Test on Chrome, Firefox, Safari, Edge (latest 2 versions) - Manual testing required

## Dependencies
- Tasks 1.x must complete before 2.x (dataset needed for game)
- Tasks 2.x and 3.x can run in parallel
- Tasks 4.x depends on 3.x (validation needs input)
- Tasks 5.x can run in parallel with 2-4
- Tasks 7.x and 8.x are final polish after core functionality
