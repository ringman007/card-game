# game-session Spec Delta

## ADDED Requirements

### Requirement: Region Filter Selection
The system SHALL allow users to select a geographic region before starting a game session.

#### Scenario: User selects region
- **WHEN** user opens the home page
- **THEN** a region selector is displayed with options: World, Africa, Asia, Europe, North America, South America, Oceania
- **AND** the last selected region is pre-selected

#### Scenario: Region persists across sessions
- **WHEN** user selects a region and completes a session
- **THEN** the selected region is saved to localStorage
- **AND** the same region is pre-selected on next visit

### Requirement: Practice Mode Session
The system SHALL provide a practice mode that focuses on previously answered questions.

#### Scenario: Starting practice mode
- **WHEN** user clicks "Practice" button
- **THEN** a session starts with 10 questions from previously answered pool
- **AND** questions are sorted by difficulty (hardest first)

#### Scenario: No practice data available
- **WHEN** user has not answered any questions yet
- **THEN** the Practice button is disabled
- **AND** tooltip explains "Answer some questions first"

### Requirement: Improve Mode Session
The system SHALL provide an improve mode that focuses only on previously incorrect answers.

#### Scenario: Starting improve mode
- **WHEN** user clicks "Improve" button
- **THEN** a list of previously incorrect capitals is displayed
- **AND** user can start a session with those questions

#### Scenario: Improve mode question ordering
- **WHEN** improve mode session starts
- **THEN** questions are ordered by miss frequency (most missed first)
- **AND** session contains up to 10 questions

#### Scenario: No incorrect answers available
- **WHEN** user has no incorrect answers in history
- **THEN** the Improve button is disabled
- **AND** tooltip explains "No incorrect answers to review"

### Requirement: Session Question Selection
The system SHALL select questions based on region filter and mode (standard, practice, improve).

#### Scenario: Filtered session
- **WHEN** user starts session with region "Europe"
- **THEN** all 10 questions are from European countries
- **AND** spaced repetition still applies within that pool
