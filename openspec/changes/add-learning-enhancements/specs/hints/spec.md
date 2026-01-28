# Hints Capability

## ADDED Requirements

### Requirement: HINT-1 Progressive Hint System
The game MUST provide progressive hints to help users when stuck.

#### Scenario: User requests first hint
- Given: User is viewing a question and has been thinking for 3+ seconds
- When: User clicks "Get Hint" button
- Then: First hint is displayed showing first letter of answer
- And: Hint button changes to show "Next Hint" option

#### Scenario: User requests second hint
- Given: User has already used first hint
- When: User clicks "Next Hint" button
- Then: Second hint is displayed showing first letter + total length (e.g., "P _ _ _ _")

#### Scenario: User requests third hint
- Given: User has already used two hints
- When: User clicks "Next Hint" button
- Then: Third hint is displayed showing first 3 letters (or half for short answers)
- And: No more hints are available

### Requirement: HINT-2 Hint Score Impact
Using hints MUST reduce the score awarded for a correct answer.

#### Scenario: Correct answer with no hints
- Given: User answers correctly without using hints
- When: Answer is submitted
- Then: Full credit (100%) is awarded

#### Scenario: Correct answer with one hint
- Given: User used one hint before answering correctly
- When: Answer is submitted
- Then: Half credit (50%) is awarded

#### Scenario: Correct answer with two hints
- Given: User used two hints before answering correctly
- When: Answer is submitted
- Then: Quarter credit (25%) is awarded

#### Scenario: Correct answer with three hints
- Given: User used all three hints before answering correctly
- When: Answer is submitted
- Then: Minimal credit (10%) is awarded

### Requirement: HINT-3 Hint Tracking
The game MUST track hints used for session statistics.

#### Scenario: Session summary includes hints
- Given: User completes a session using hints on some questions
- When: Results screen is displayed
- Then: Total hints used is shown in session summary

#### Scenario: Hint usage in answer review
- Given: User reviews answers at end of session
- When: Viewing a question where hints were used
- Then: Number of hints used is indicated for that question
