# Study Mode Capability

## ADDED Requirements

### Requirement: STUDY-1 Flashcard Interface
The game MUST provide a flashcard-based study mode for self-paced review.

#### Scenario: Entering study mode
- Given: User is on the home page
- When: User clicks "Study Mode" button
- Then: Flashcard interface is displayed
- And: First card shows country/capital question side

#### Scenario: Flipping a flashcard
- Given: User is viewing a flashcard front
- When: User clicks/taps the card
- Then: Card flips with animation to reveal the answer
- And: "Know It" and "Need Review" buttons appear

### Requirement: STUDY-2 Study Mode Filtering
Users MUST be able to filter which cards to study.

#### Scenario: Filter by region
- Given: User is in study mode
- When: User selects a region from dropdown
- Then: Only cards from that region are shown

#### Scenario: Filter by mastery level
- Given: User is in study mode
- When: User selects a mastery filter (New, Learning, Review, Mastered)
- Then: Only cards matching that mastery level are shown

#### Scenario: Shuffle cards
- Given: User is in study mode
- When: User enables shuffle option
- Then: Cards are presented in random order

### Requirement: STUDY-3 Study Mode Progress Marking
Users MUST be able to mark cards as known or needing review.

#### Scenario: Mark card as known
- Given: User has flipped a flashcard to see the answer
- When: User clicks "Know It" button
- Then: Card is marked as known for this study session
- And: Next card is displayed

#### Scenario: Mark card as need review
- Given: User has flipped a flashcard to see the answer
- When: User clicks "Need Review" button
- Then: Card is marked for review
- And: Next card is displayed

#### Scenario: Study session summary
- Given: User has gone through all cards in study session
- When: Study session ends
- Then: Summary shows cards marked as "known" vs "need review"

### Requirement: STUDY-4 No Scoring in Study Mode
Study mode MUST be pressure-free with no scoring.

#### Scenario: Study mode has no score
- Given: User is in study mode
- When: User interacts with flashcards
- Then: No score is calculated or displayed
- And: No streak tracking is active

#### Scenario: Study mode does not affect game statistics
- Given: User completes a study session
- When: User returns to home
- Then: Session count is not incremented
- And: Correct/incorrect counts are not affected
