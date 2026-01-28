# question-presentation Spec Delta

## ADDED Requirements

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
