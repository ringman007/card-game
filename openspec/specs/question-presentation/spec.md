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

