# achievements Specification

## Purpose
TBD - created by archiving change redesign-visual-experience. Update Purpose after archive.
## Requirements
### Requirement: Achievement Definitions
The system SHALL define a set of unlockable achievements to motivate users.

#### Scenario: Achievement data structure
- **WHEN** an achievement is defined
- **THEN** it SHALL include: id, title, description, icon/emoji, category, criteria
- **AND** criteria SHALL be machine-checkable conditions

#### Scenario: Achievement categories
- **WHEN** achievements are organized
- **THEN** categories SHALL include: Getting Started, Streaks, Mastery, Regions, Milestones, Special

### Requirement: Core Achievement Set
The system SHALL include at least 10 achievements across categories.

#### Scenario: Getting Started achievements
- **WHEN** user starts playing
- **THEN** "First Steps" unlocks on completing first session
- **AND** "Polyglot" unlocks when both game modes are used

#### Scenario: Streak achievements
- **WHEN** user answers correctly in sequence
- **THEN** "Hot Streak" unlocks at 5 consecutive correct answers
- **AND** "On Fire" unlocks at 10 consecutive correct answers

#### Scenario: Mastery achievements
- **WHEN** user masters regions
- **THEN** "Master of Europe" unlocks when all European countries reach mastered status
- **AND** similar achievements exist for each region

#### Scenario: Milestone achievements
- **WHEN** user reaches question count milestones
- **THEN** "Century" unlocks at 100 total questions answered
- **AND** higher milestones unlock at 500, 1000 questions

#### Scenario: Special achievements
- **WHEN** user plays at specific times
- **THEN** "Night Owl" unlocks for sessions completed after 10 PM
- **AND** "Early Bird" unlocks for sessions completed before 7 AM
- **AND** "Perfect Ten" unlocks for 10/10 session scores

### Requirement: Achievement Tracking
The system SHALL track progress toward achievements.

#### Scenario: Progress persistence
- **WHEN** progress is made toward an achievement
- **THEN** current progress SHALL be stored in localStorage
- **AND** unlocked achievements SHALL be timestamped

#### Scenario: Progress checking
- **WHEN** a game event occurs (answer submitted, session complete)
- **THEN** relevant achievement criteria SHALL be checked
- **AND** newly unlocked achievements SHALL be identified

### Requirement: Achievement Unlock Notification
The system SHALL notify users when achievements unlock.

#### Scenario: Toast notification
- **WHEN** an achievement is unlocked
- **THEN** a toast notification SHALL appear
- **AND** the toast SHALL show achievement icon, title, and description
- **AND** the toast SHALL auto-dismiss after 4 seconds
- **AND** multiple toasts SHALL queue (not overlap)

#### Scenario: First unlock emphasis
- **WHEN** an achievement unlocks for the first time
- **THEN** the notification SHALL have celebratory styling
- **AND** a sound effect SHALL play (if sounds enabled)

### Requirement: Achievement Display
The system SHALL provide a view of all achievements and progress.

#### Scenario: Achievements in stats dashboard
- **WHEN** user opens the stats dashboard
- **THEN** an achievements section SHALL display
- **AND** unlocked achievements SHALL show with unlock date
- **AND** locked achievements SHALL show with progress percentage

#### Scenario: Achievement icons
- **WHEN** achievements are displayed
- **THEN** unlocked achievements SHALL appear in full color
- **AND** locked achievements SHALL appear grayed out
- **AND** each achievement SHALL have a unique emoji or icon

