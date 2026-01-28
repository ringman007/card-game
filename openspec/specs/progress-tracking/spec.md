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
The system SHALL track extended performance metrics for each question using the SM-2 algorithm.

#### Scenario: SM-2 fields tracked
- **WHEN** a question is answered
- **THEN** the following metrics SHALL be updated:
  - `timesShown`: Total times the question has been presented
  - `correctCount`: Number of correct answers
  - `incorrectCount`: Number of incorrect answers
  - `lastShown`: ISO timestamp of last presentation
  - `nextReview`: ISO timestamp for next scheduled review
  - `easeFactor`: SM-2 ease factor (default 2.5, min 1.3)
  - `interval`: Current interval in days
  - `repetitions`: Consecutive correct answers count
  - `bucket`: Learning stage (new, learning, review, mastered)

#### Scenario: SM-2 calculation on correct answer
- **WHEN** the user answers correctly
- **THEN** the system SHALL:
  - Increment repetitions count
  - Calculate new interval: I(1)=1, I(2)=6, I(n)=I(n-1)×easeFactor
  - Adjust easeFactor based on response quality
  - Update bucket based on interval thresholds

#### Scenario: SM-2 calculation on incorrect answer
- **WHEN** the user answers incorrectly
- **THEN** the system SHALL:
  - Reset repetitions to 0
  - Set interval to 1 day
  - Decrease easeFactor by 0.2 (minimum 1.3)
  - Set bucket to "learning"

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

### Requirement: Difficulty Buckets
The system SHALL classify questions into learning stages based on their SM-2 metrics.

#### Scenario: New question bucket
- **WHEN** a question has never been answered
- **THEN** its bucket SHALL be "new"

#### Scenario: Learning bucket
- **WHEN** a question has been answered but interval is less than 7 days
- **THEN** its bucket SHALL be "learning"

#### Scenario: Review bucket
- **WHEN** a question has interval between 7 and 21 days
- **THEN** its bucket SHALL be "review"

#### Scenario: Mastered bucket
- **WHEN** a question has interval greater than 21 days
- **THEN** its bucket SHALL be "mastered"

---

### Requirement: Streak Tracking
The system SHALL track user streaks for motivation.

#### Scenario: Current streak
- **WHEN** the user answers correctly
- **THEN** the current session streak SHALL increment

#### Scenario: Streak broken
- **WHEN** the user answers incorrectly
- **THEN** the current session streak SHALL reset to 0

#### Scenario: Best streak persistence
- **WHEN** a session ends
- **THEN** if the session's best streak exceeds the all-time best streak
- **THEN** the all-time best streak SHALL be updated in local storage

---

### Requirement: Session Statistics
The system SHALL calculate and store session-level statistics.

#### Scenario: Session accuracy
- **WHEN** a session ends
- **THEN** the system SHALL calculate and display accuracy percentage

#### Scenario: Session history
- **WHEN** sessions are completed
- **THEN** the last 10 session summaries SHALL be stored for trend analysis

### Requirement: Session History
The system SHALL maintain a history of completed game sessions.

#### Scenario: Session recorded
- **WHEN** user completes a game session
- **THEN** session is recorded with timestamp, score, mode, region, and question details
- **AND** history is persisted in localStorage

#### Scenario: Session history limit
- **WHEN** session history exceeds 100 entries
- **THEN** oldest sessions are automatically pruned
- **AND** aggregate statistics are preserved

### Requirement: Performance Trends
The system SHALL calculate performance trends over time.

#### Scenario: Accuracy trend calculation
- **WHEN** user views statistics
- **THEN** 7-day, 30-day, and all-time accuracy percentages are shown
- **AND** trend direction (improving/declining/stable) is indicated

### Requirement: Mastery Statistics by Region
The system SHALL track mastery progress per geographic region.

#### Scenario: Region mastery breakdown
- **WHEN** user views statistics dashboard
- **THEN** each region shows: total countries, mastered count, learning count, new count
- **AND** mastery percentage is calculated per region

### Requirement: Export Progress Data
The system SHALL allow users to export their progress data.

#### Scenario: Export to JSON
- **WHEN** user clicks "Export Progress" button
- **THEN** a JSON file is downloaded containing all progress data
- **AND** file is named with current date (capital-progress-YYYY-MM-DD.json)

### Requirement: Statistics Display
The system SHALL provide a comprehensive statistics dashboard.

#### Scenario: Stats dashboard content
- **WHEN** user navigates to statistics view
- **THEN** dashboard displays:
  - Total questions answered
  - Overall accuracy percentage
  - Current streak and best streak
  - Mastery breakdown by region
  - Recent session history
  - Performance trend chart

