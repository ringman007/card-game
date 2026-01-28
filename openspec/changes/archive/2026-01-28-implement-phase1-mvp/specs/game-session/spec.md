# Game Session

Core game lifecycle management for the World Capitals card game.

## ADDED Requirements

### Requirement: Game State Machine
The system SHALL manage game state as a finite state machine with three states: `home`, `playing`, and `results`.

#### Scenario: Initial state
- **WHEN** the application loads
- **THEN** the game state SHALL be `home`

#### Scenario: Starting a game
- **WHEN** the user clicks the Start button from the home screen
- **THEN** the game state SHALL transition to `playing`
- **AND** a new session with 10 questions SHALL be initialized

#### Scenario: Completing a session
- **WHEN** the user answers the 10th question
- **THEN** the game state SHALL transition to `results`

#### Scenario: Returning to home
- **WHEN** the user clicks "Back to Home" from the results screen
- **THEN** the game state SHALL transition to `home`
- **AND** the session data SHALL be cleared

---

### Requirement: Session Configuration
The system SHALL allow users to configure their session before starting.

#### Scenario: Region selection
- **WHEN** the user is on the home screen
- **THEN** the user SHALL be able to select a geographic region
- **AND** the available options SHALL include: World, Africa, Asia, Europe, North America, South America, Oceania

#### Scenario: Game mode selection
- **WHEN** the user is on the home screen
- **THEN** the user SHALL be able to select between two game modes:
  - Country → Capital (given country, type capital)
  - Capital → Country (given capital, type country)

#### Scenario: Persisted preferences
- **WHEN** the user selects a region or game mode
- **THEN** the selection SHALL be saved to local storage
- **AND** the selection SHALL be restored on next visit

---

### Requirement: Fixed Session Length
The system SHALL present exactly 10 questions per session regardless of region or mode selection.

#### Scenario: Session with World region
- **WHEN** the user starts a session with "World" selected
- **THEN** exactly 10 questions SHALL be presented from the full dataset

#### Scenario: Session with specific region
- **WHEN** the user starts a session with a specific region selected
- **THEN** exactly 10 questions SHALL be presented from that region only

#### Scenario: Region with fewer than 10 countries
- **WHEN** the user selects a region with fewer than 10 countries
- **THEN** the system SHALL still present 10 questions (with potential repeats or fallback to World)

---

### Requirement: Session Cannot Be Paused
The system SHALL NOT support pausing or resuming a game session.

#### Scenario: Browser refresh during session
- **WHEN** the user refreshes the browser during a session
- **THEN** the current session SHALL be lost
- **AND** the user SHALL return to the home screen

#### Scenario: No pause control
- **WHEN** the user is in a game session
- **THEN** no pause button or mechanism SHALL be available
