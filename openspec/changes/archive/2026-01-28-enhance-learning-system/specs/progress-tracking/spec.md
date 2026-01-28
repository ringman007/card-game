# Progress Tracking - Phase 2 Enhancements

## MODIFIED Requirements

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

## ADDED Requirements

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
