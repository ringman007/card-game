# answer-validation Specification

## Purpose
TBD - created by archiving change implement-phase1-mvp. Update Purpose after archive.
## Requirements
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
The system SHALL accept minor spelling variations using adaptive thresholds based on word length.

#### Scenario: Short word threshold (1-4 characters)
- **WHEN** the correct answer has 1-4 characters
- **THEN** only exact matches (after normalization) SHALL be accepted

#### Scenario: Medium word threshold (5-7 characters)
- **WHEN** the correct answer has 5-7 characters
- **THEN** answers within Levenshtein distance of 1 SHALL be accepted

#### Scenario: Long word threshold (8+ characters)
- **WHEN** the correct answer has 8 or more characters
- **THEN** answers within Levenshtein distance of 2 SHALL be accepted

#### Scenario: Very long word threshold (12+ characters)
- **WHEN** the correct answer has 12 or more characters
- **THEN** answers within Levenshtein distance of 3 SHALL be accepted

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

### Requirement: Phonetic Matching
The system SHALL accept phonetically similar answers for commonly confused spellings.

#### Scenario: Phonetic similarity accepted
- **WHEN** the correct answer is "Kyiv"
- **AND** the user enters "Kiev"
- **THEN** the answer SHALL be marked as correct (phonetically equivalent)

#### Scenario: Common phonetic variations
- **WHEN** the user's answer sounds similar to the correct answer
- **THEN** the system SHALL apply phonetic matching as a fallback after Levenshtein matching fails

---

### Requirement: Compound Word Handling
The system SHALL handle compound words and hyphenated names flexibly.

#### Scenario: Hyphen optional
- **WHEN** the correct answer is "Guinea-Bissau"
- **AND** the user enters "Guinea Bissau" (without hyphen)
- **THEN** the answer SHALL be marked as correct

#### Scenario: Word order flexibility for two-word names
- **WHEN** the correct answer contains two words
- **AND** the user enters both words in either order
- **THEN** the system SHALL check both orderings

---

### Requirement: Transliteration Tolerance
The system SHALL accept common ASCII substitutions for non-ASCII characters.

#### Scenario: Umlaut substitution
- **WHEN** the correct answer contains "ü"
- **AND** the user enters "ue" or "u"
- **THEN** the answer SHALL be marked as correct

#### Scenario: Nordic characters
- **WHEN** the correct answer contains "ø" or "å"
- **AND** the user enters "o" or "a" respectively
- **THEN** the answer SHALL be marked as correct

