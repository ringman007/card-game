# Implementation Tasks: Phase 2 - Enhanced Learning System

## 1. Fuzzy Matching Refinement ✅
- [x] 1.1 Add configurable threshold based on word length
- [x] 1.2 Implement phonetic similarity check (Soundex or Metaphone)
- [x] 1.3 Handle compound words (split on spaces/hyphens)
- [x] 1.4 Add common transliteration mappings (ü→u, ø→o, etc.)
- [x] 1.5 Create test cases for edge cases

## 2. Spaced Repetition (SM-2 Algorithm) ✅
- [x] 2.1 Add SM-2 fields to progress data (easeFactor, interval, repetitions)
- [x] 2.2 Implement calculateNextReview() using SM-2 formula
- [x] 2.3 Add difficulty buckets (new, learning, review, mastered)
- [x] 2.4 Implement getBucketForQuestion() classifier
- [x] 2.5 Update updateQuestionProgress() to use SM-2

## 3. Adaptive Question Selection ✅
- [x] 3.1 Calculate urgency score (overdue days × difficulty)
- [x] 3.2 Implement 70/30 review/new balance
- [x] 3.3 Add consecutive failure detection
- [x] 3.4 Insert easier questions after 3+ failures
- [x] 3.5 Track and persist streak data

## 4. UI Enhancements - Card Animations ✅
- [x] 4.1 Add card flip animation on answer reveal
- [x] 4.2 Implement success celebration effect (confetti/pulse)
- [x] 4.3 Add subtle shake animation for incorrect answers
- [x] 4.4 Smooth card entrance/exit transitions

## 5. UI Enhancements - Progress Display ✅
- [x] 5.1 Add streak counter to GameSession header
- [x] 5.2 Show current streak with fire emoji 🔥
- [x] 5.3 Add mastery level indicator per question
- [x] 5.4 Create session statistics summary (accuracy, avg response time)

## 6. Mobile Responsiveness ✅
- [x] 6.1 Test and fix card layout on small screens
- [x] 6.2 Optimize touch targets (min 48px per spec)
- [x] 6.3 ~~Add swipe gestures for navigation~~ Deferred - not critical for MVP
- [x] 6.4 Responsive breakpoints for 400px and 600px viewports

## Dependencies
- Tasks 2.x must complete before 3.x (SM-2 needed for adaptive selection) ✅
- Tasks 4.x and 5.x can run in parallel ✅
- Tasks 1.x are independent and can run anytime ✅
- Task 6.x is final polish ✅

## Implementation Notes
- Swipe gestures (6.3) deferred to Phase 3 - current button-based navigation works well on mobile
- Touch targets set to 48px (industry best practice) vs. 44px minimum spec
