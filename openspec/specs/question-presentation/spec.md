# question-presentation Specification

## Purpose
TBD - created by archiving change implement-phase1-mvp. Update Purpose after archive.
## Requirements
### Requirement: Card Display
The system SHALL display one question at a time using a card-based layout.

#### Scenario: Country to Capital mode
- **WHEN** a question is displayed in "Country → Capital" mode
- **THEN** the country name SHALL be prominently displayed
- **AND** the prompt "What is the capital?" SHALL be shown

#### Scenario: Capital to Country mode
- **WHEN** a question is displayed in "Capital → Country" mode
- **THEN** the capital name SHALL be prominently displayed
- **AND** the prompt "Which country is this the capital of?" SHALL be shown

#### Scenario: Card transition
- **WHEN** the user advances to the next question
- **THEN** the transition SHALL complete in under 300ms

---

### Requirement: Answer Input Field
The system SHALL provide a text input field for user answers.

#### Scenario: Input field presence
- **WHEN** a question card is displayed
- **THEN** a text input field SHALL be visible
- **AND** the field SHALL have placeholder text "Type your answer..."
- **AND** the field SHALL be focused automatically

#### Scenario: Input field accessibility
- **WHEN** a screen reader encounters the input field
- **THEN** the field SHALL have an accessible label "Answer input field"

#### Scenario: Input disabled during feedback
- **WHEN** feedback is being displayed after answer submission
- **THEN** the input field SHALL be disabled
- **AND** the submit button SHALL be disabled

---

### Requirement: Submit Answer
The system SHALL allow answer submission via button click or Enter key.

#### Scenario: Submit button
- **WHEN** the user has entered text in the answer field
- **THEN** a "Submit" button SHALL be enabled
- **AND** clicking the button SHALL submit the answer

#### Scenario: Enter key submission
- **WHEN** the user presses Enter while the input field is focused
- **THEN** the answer SHALL be submitted

#### Scenario: Empty answer prevention
- **WHEN** the input field is empty or contains only whitespace
- **THEN** the Submit button SHALL be disabled
- **AND** pressing Enter SHALL NOT submit the answer

---

### Requirement: Helper Text for Special Cases
The system SHALL display contextual hints for questions with special characteristics.

#### Scenario: Multiple capitals hint
- **WHEN** a question is about a country with multiple capitals
- **AND** the mode is "Country → Capital"
- **THEN** the hint "This country has multiple capitals" SHALL be displayed

#### Scenario: Alternative names hint
- **WHEN** a question accepts alternative spellings or names
- **THEN** the hint "Alternative names accepted" SHALL be displayed

---

### Requirement: Progress Indicator
The system SHALL display the user's progress through the session.

#### Scenario: Progress display
- **WHEN** the user is on question N of 10
- **THEN** a progress indicator SHALL show "N / 10"

#### Scenario: Visual progress bar
- **WHEN** progress is displayed
- **THEN** a visual indicator (bar or dots) SHALL reflect completion percentage

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

### Requirement: Region Badge Display
The system SHALL display the current region filter during gameplay.

#### Scenario: Region indicator shown
- **WHEN** user is in a game session
- **THEN** the selected region is displayed in the progress header
- **AND** region name is accompanied by an appropriate emoji/icon

### Requirement: Mode Indicator
The system SHALL display the current game mode during gameplay.

#### Scenario: Mode badge shown
- **WHEN** user is in practice or improve mode
- **THEN** a badge indicates the current mode (Practice/Improve)
- **AND** badge is styled distinctively from standard mode

### Requirement: Touch Gesture Support
The system SHALL support touch gestures for navigation on mobile devices.

#### Scenario: Swipe to skip (optional)
- **WHEN** user swipes left on a card
- **THEN** current question is skipped (marked as incorrect)
- **AND** next question is presented

#### Scenario: Touch-friendly input
- **WHEN** user taps on answer input on mobile
- **THEN** virtual keyboard appears
- **AND** input remains visible above keyboard

### Requirement: Loading States
The system SHALL display loading states for asynchronous operations.

#### Scenario: Question loading
- **WHEN** session is being prepared
- **THEN** a loading indicator is displayed
- **AND** loading completes in under 500ms

### Requirement: Empty States
The system SHALL display appropriate empty states.

#### Scenario: Practice mode empty
- **WHEN** user has no answered questions
- **THEN** empty state message is displayed
- **AND** user is directed to start a regular session

#### Scenario: Improve mode empty
- **WHEN** user has no incorrect answers
- **THEN** empty state celebrates "Perfect record!"
- **AND** user is encouraged to continue practicing

