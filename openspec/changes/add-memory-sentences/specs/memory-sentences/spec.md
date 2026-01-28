# Spec: Memory Sentences

## ADDED Requirements

### Requirement: MEM-1 Memory Sentence Data
The system SHALL provide a comprehensive JSON file with absurd, memorable sentences for 50+ countries using proven mnemonic techniques: vivid imagery, sound association, action verbs, and emotional humor.

**Acceptance Criteria:**
- JSON file with country ID as key
- Each entry has: sentence, highlightedWords (for visual emphasis), region
- Sentences use puns/sounds from both country AND capital names
- Sentences are family-friendly but genuinely funny
- At least 50 countries covered across all regions

#### Scenario: Memory sentence exists for a country
Given the user is learning France
When the sentence data is loaded
Then the sentence "A PAIR of FRANCE-enstein monsters dance the can-can on the Eiffel Tower" is available
And the highlightedWords include "PAIR" and "FRANCE"

### Requirement: MEM-2 Quiz Feedback Integration
The system SHALL display memory sentences in Card.jsx feedback after answering questions.

**Acceptance Criteria:**
- Memory sentence appears in feedback section (correct or incorrect)
- Styled distinctively with brain icon
- Key words highlighted in bold/accent color
- Animated entrance for engagement
- Only shows if sentence exists for that country

#### Scenario: Memory sentence shown after correct answer
Given the user answers a question about France correctly
When the feedback is displayed
Then the memory sentence for France is shown with a brain icon
And the keywords are highlighted

#### Scenario: No sentence for country
Given a country has no memory sentence defined
When the user answers a question about that country
Then the feedback shows normally without a memory sentence section

### Requirement: MEM-3 Memory Palace Gallery
The system SHALL provide a browsable gallery to view all memory sentences.

**Acceptance Criteria:**
- New button on HomePage opens gallery
- Grid layout of country cards with sentences
- Filter by region dropdown
- Search by country or capital name
- Tap card to expand full sentence
- Back button returns to home
- Responsive for mobile

#### Scenario: Browse all sentences
Given the user is on the homepage
When they click the Memory Palace button
Then the gallery opens showing all countries with sentences
And they can filter by region or search by name

### Requirement: MEM-4 Flashcard Integration
The system SHALL show memory sentences on Study Mode flashcard backs.

**Acceptance Criteria:**
- Sentence appears on card back after answer reveal
- Consistent styling with quiz feedback
- Only shows if sentence exists for that country

#### Scenario: Flashcard shows memory sentence
Given the user is in Study Mode
When they flip a flashcard for France
Then the back shows the capital Paris
And the memory sentence is displayed below

### Requirement: MEM-5 Visual Design
Memory sentences MUST have distinctive, fun styling.

**Acceptance Criteria:**
- Brain icon to identify memory sentences
- Highlighted keywords stand out (bold, accent color)
- Card-like container with subtle background
- Smooth fade-in animation
- Dark mode support
- Consistent with app design tokens

#### Scenario: Visual styling applied
Given a memory sentence is displayed
Then it has a brain icon prefix
And keywords are in bold with accent color
And the container has a card-like appearance
