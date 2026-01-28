# Question Presentation - Phase 2 Enhancements

## ADDED Requirements

### Requirement: Card Flip Animation
The system SHALL display a card flip animation when revealing the answer.

#### Scenario: Correct answer animation
- **WHEN** the user submits a correct answer
- **THEN** the card SHALL display a subtle pulse/glow animation
- **AND** a success indicator SHALL appear with a smooth fade-in

#### Scenario: Incorrect answer animation
- **WHEN** the user submits an incorrect answer
- **THEN** the card SHALL display a subtle shake animation
- **AND** the correct answer SHALL be revealed with a flip effect

#### Scenario: Animation timing
- **WHEN** any answer animation plays
- **THEN** the total animation duration SHALL NOT exceed 400ms
- **AND** animations SHALL use CSS transforms for smooth 60fps performance

---

### Requirement: Streak Counter Display
The system SHALL display the current streak during gameplay.

#### Scenario: Streak visibility
- **WHEN** the user is in a game session
- **THEN** the current streak count SHALL be visible in the session header

#### Scenario: Streak indicator
- **WHEN** the streak is 3 or higher
- **THEN** a fire emoji 🔥 SHALL appear next to the streak count

#### Scenario: Streak milestone celebration
- **WHEN** the user reaches streak milestones (5, 10, 15...)
- **THEN** a brief celebration animation SHALL play

---

### Requirement: Mastery Level Indicator
The system SHALL indicate the mastery level of each question.

#### Scenario: Question mastery badge
- **WHEN** a question is displayed
- **THEN** a small badge SHALL indicate its bucket (new, learning, review, mastered)

#### Scenario: Badge styling
- **WHEN** displaying mastery badges
- **THEN** the following colors SHALL be used:
  - New: gray
  - Learning: yellow/orange
  - Review: blue
  - Mastered: green

---

### Requirement: Mobile Touch Optimization
The system SHALL be fully usable on mobile devices.

#### Scenario: Touch target size
- **WHEN** rendering interactive elements on mobile
- **THEN** all touch targets SHALL be at least 44×44 pixels

#### Scenario: Input field sizing
- **WHEN** displaying the answer input on mobile
- **THEN** the input field SHALL be appropriately sized to prevent zoom on focus

#### Scenario: Responsive card layout
- **WHEN** the viewport width is less than 480px
- **THEN** the card layout SHALL adjust to use full width with appropriate padding
