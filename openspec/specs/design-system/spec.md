# design-system Specification

## Purpose
TBD - created by archiving change redesign-visual-experience. Update Purpose after archive.
## Requirements
### Requirement: CSS Custom Properties Architecture
The system SHALL use CSS custom properties (variables) for all visual styling tokens.

#### Scenario: Token categories
- **WHEN** design tokens are defined
- **THEN** they SHALL be organized into categories: colors, typography, spacing, shadows, borders, animations
- **AND** all tokens SHALL be defined in a central `tokens.css` file

#### Scenario: Component token usage
- **WHEN** a component needs styling values
- **THEN** it SHALL reference CSS variables rather than hardcoded values
- **AND** this enables theme switching without component changes

### Requirement: Warm Paper Color Palette
The system SHALL implement a warm, educational aesthetic with paper-inspired colors.

#### Scenario: Light theme base colors
- **WHEN** the light theme is active
- **THEN** backgrounds SHALL use warm cream tones (#FAF8F5, #F5F1EB)
- **AND** text SHALL use warm dark brown (#2D2926)
- **AND** primary accent SHALL be terracotta (#C45D3E)
- **AND** secondary accent SHALL be forest green (#4A7C59)

#### Scenario: Interactive element colors
- **WHEN** elements are interactive
- **THEN** correct answers SHALL use forest green (#4A7C59)
- **AND** incorrect answers SHALL use muted red (#B85450)
- **AND** focus states SHALL use golden amber (#D4A84B)

### Requirement: Typography System
The system SHALL use a cohesive typography scale.

#### Scenario: Font family selection
- **WHEN** text is displayed
- **THEN** headings SHALL use a rounded, friendly font (e.g., Nunito, Quicksand)
- **AND** body text SHALL use a readable sans-serif
- **AND** fallbacks SHALL include system fonts

#### Scenario: Type scale
- **WHEN** text sizes are needed
- **THEN** the scale SHALL follow: 0.75rem, 0.875rem, 1rem, 1.125rem, 1.25rem, 1.5rem, 2rem, 2.5rem, 3rem
- **AND** line heights SHALL be optimized per size

### Requirement: Spacing System
The system SHALL use a consistent spacing scale based on a 4px unit.

#### Scenario: Spacing values
- **WHEN** spacing is applied
- **THEN** available values SHALL be: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px
- **AND** components SHALL use these tokens exclusively

### Requirement: Shadow System
The system SHALL use warm-tinted shadows for depth.

#### Scenario: Shadow definition
- **WHEN** shadows are applied
- **THEN** shadow color SHALL use warm tones (rgba with brown/orange tint)
- **AND** shadows SHALL have multiple levels: sm, md, lg, xl
- **AND** cards SHALL use softer, more diffuse shadows than typical designs

### Requirement: Animation Tokens
The system SHALL define consistent animation timing.

#### Scenario: Timing values
- **WHEN** animations are used
- **THEN** durations SHALL be: fast (150ms), normal (250ms), slow (400ms), slower (600ms)
- **AND** easing SHALL use natural curves (ease-out for entrances, ease-in for exits)

### Requirement: Dark Theme Support
The system SHALL provide a complete dark theme alternative.

#### Scenario: Dark theme activation
- **WHEN** dark theme is selected or system preference is dark
- **THEN** all color tokens SHALL be overridden with dark-appropriate values
- **AND** backgrounds SHALL use warm dark tones (#1A1816, #252220)
- **AND** text SHALL use warm light tones (#F5F1EB, #E8E2D9)
- **AND** shadows SHALL be more subtle or use light glows

#### Scenario: Theme persistence
- **WHEN** user selects a theme preference
- **THEN** the preference SHALL be saved to localStorage
- **AND** the preference SHALL be restored on next visit
- **AND** "system" option SHALL follow prefers-color-scheme

