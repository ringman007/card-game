# Answer Validation

Logic for validating user answers against correct answers.

## ADDED Requirements

### Requirement: Case-Insensitive Matching
The system SHALL ignore case differences when validating answers.

#### Scenario: Lowercase input
- **WHEN** the correct answer is "Berlin"
- **AND** the user enters "berlin"
- **THEN** the answer SHALL be marked as correct

#### Scenario: Uppercase input
- **WHEN** the correct answer is "Paris"
- **AND** the user enters "PARIS"
- **THEN** the answer SHALL be marked as correct

#### Scenario: Mixed case input
- **WHEN** the correct answer is "Tokyo"
- **AND** the user enters "tOkYo"
- **THEN** the answer SHALL be marked as correct

---

### Requirement: Diacritics Handling
The system SHALL accept answers without diacritical marks when the correct answer contains them.

#### Scenario: Accented characters omitted
- **WHEN** the correct answer is "São Paulo"
- **AND** the user enters "Sao Paulo"
- **THEN** the answer SHALL be marked as correct

#### Scenario: Umlauts omitted
- **WHEN** the correct answer is "Zürich"
- **AND** the user enters "Zurich"
- **THEN** the answer SHALL be marked as correct

---

### Requirement: Fuzzy Matching for Spelling Tolerance
The system SHALL accept minor spelling variations for longer words.

#### Scenario: One character difference
- **WHEN** the correct answer is "Canberra"
- **AND** the user enters "Camberra"
- **THEN** the answer SHALL be marked as correct (1 character difference allowed)

#### Scenario: Two character difference on long word
- **WHEN** the correct answer is "Washington"
- **AND** the user enters "Washingten"
- **THEN** the answer SHALL be marked as correct (within threshold)

#### Scenario: Exact match required for short words
- **WHEN** the correct answer is "Bern" (4 characters)
- **AND** the user enters "Burn"
- **THEN** the answer SHALL be marked as incorrect (short words require exact match)

#### Scenario: Threshold exceeded
- **WHEN** the correct answer is "Madrid"
- **AND** the user enters "Madred" (distance > 2)
- **THEN** the answer SHALL be marked as incorrect

---

### Requirement: Alternative Names Accepted
The system SHALL accept any valid alternative name for a country or capital.

#### Scenario: Capital alternative
- **WHEN** the correct answer is "New Delhi"
- **AND** "Delhi" is listed as an alternative
- **AND** the user enters "Delhi"
- **THEN** the answer SHALL be marked as correct

#### Scenario: Country alternative
- **WHEN** the correct answer is "Myanmar"
- **AND** "Burma" is listed as an alternative
- **AND** the user enters "Burma"
- **THEN** the answer SHALL be marked as correct

---

### Requirement: Immediate Feedback
The system SHALL provide instant visual feedback after answer submission.

#### Scenario: Correct answer feedback
- **WHEN** the user submits a correct answer
- **THEN** a success indicator (✓) SHALL be displayed immediately
- **AND** the word "Correct!" SHALL be shown

#### Scenario: Incorrect answer feedback
- **WHEN** the user submits an incorrect answer
- **THEN** an error indicator (✗) SHALL be displayed immediately
- **AND** the correct answer SHALL be shown

#### Scenario: Feedback announcement for screen readers
- **WHEN** feedback is displayed
- **THEN** the feedback container SHALL have role="alert"
- **AND** the content SHALL be announced to screen readers

---

### Requirement: Auto-Advance After Feedback
The system SHALL automatically advance to the next question after displaying feedback.

#### Scenario: Advance timing
- **WHEN** feedback is displayed
- **THEN** the system SHALL wait approximately 1.5 seconds
- **AND** then advance to the next question (or results if last question)
