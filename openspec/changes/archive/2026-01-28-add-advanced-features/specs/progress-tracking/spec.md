# progress-tracking Spec Delta

## ADDED Requirements

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
