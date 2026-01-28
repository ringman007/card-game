# progress-tracking Specification

## Purpose
TBD - created by archiving change implement-phase1-mvp. Update Purpose after archive.
## Requirements
### Requirement: Local Storage for Progress
The system SHALL store all user progress data in browser local storage.

#### Scenario: Progress persistence
- **WHEN** the user completes a question
- **THEN** the result SHALL be saved to local storage
- **AND** the data SHALL persist across browser sessions

#### Scenario: Storage key
- **WHEN** progress data is stored
- **THEN** it SHALL use the key `capitalCardGame_progress`

#### Scenario: New browser/cleared storage
- **WHEN** no progress data exists in local storage
- **THEN** the system SHALL initialize with empty progress
- **AND** all questions SHALL be treated as new

---

### Requirement: Per-Question Metrics
The system SHALL track performance metrics for each question individually.

#### Scenario: Metrics tracked
- **WHEN** a question is answered
- **THEN** the following metrics SHALL be updated:
  - `timesShown`: Total times the question has been presented
  - `correctCount`: Number of correct answers
  - `incorrectCount`: Number of incorrect answers
  - `lastShown`: ISO timestamp of last presentation
  - `difficultyScore`: Calculated ratio (incorrectCount / totalAttempts)

#### Scenario: First-time question
- **WHEN** a question is answered for the first time
- **THEN** a new progress record SHALL be created with initial values

#### Scenario: Difficulty calculation
- **WHEN** a question has been answered multiple times
- **THEN** difficultyScore SHALL be calculated as incorrectCount / (correctCount + incorrectCount)
- **AND** the score SHALL range from 0 (easy) to 1 (hard)

---

### Requirement: Settings Persistence
The system SHALL persist user preferences across sessions.

#### Scenario: Settings storage
- **WHEN** settings are saved
- **THEN** they SHALL use the key `capitalCardGame_settings`

#### Scenario: Region preference
- **WHEN** the user selects a region
- **THEN** the selection SHALL be saved as `lastRegion`
- **AND** it SHALL be restored on next visit

#### Scenario: Mode preference
- **WHEN** the user selects a game mode
- **THEN** the selection SHALL be saved as `lastMode`
- **AND** it SHALL be restored on next visit

---

### Requirement: Session Answer Recording
The system SHALL record all answers within a session for the results screen.

#### Scenario: Answer record structure
- **WHEN** the user submits an answer
- **THEN** the following SHALL be recorded:
  - The question object
  - The user's answer text
  - Whether the answer was correct
  - Timestamp of the answer

#### Scenario: Results review
- **WHEN** the session ends
- **THEN** all recorded answers SHALL be available for display on the results screen

---

### Requirement: Storage Error Handling
The system SHALL gracefully handle local storage errors.

#### Scenario: Storage unavailable
- **WHEN** local storage is not available (private browsing, disabled)
- **THEN** the game SHALL still function
- **AND** progress SHALL not be persisted (in-memory only)
- **AND** no error messages SHALL disrupt the user experience

#### Scenario: Corrupted data
- **WHEN** stored data cannot be parsed as valid JSON
- **THEN** the system SHALL reset to empty progress
- **AND** log an error to the console

