# Answer Validation - Phase 2 Enhancements

## MODIFIED Requirements

### Requirement: Fuzzy Matching for Spelling Tolerance
The system SHALL accept minor spelling variations using adaptive thresholds based on word length.

#### Scenario: Short word threshold (1-4 characters)
- **WHEN** the correct answer has 1-4 characters
- **THEN** only exact matches (after normalization) SHALL be accepted

#### Scenario: Medium word threshold (5-7 characters)
- **WHEN** the correct answer has 5-7 characters
- **THEN** answers within Levenshtein distance of 1 SHALL be accepted

#### Scenario: Long word threshold (8+ characters)
- **WHEN** the correct answer has 8 or more characters
- **THEN** answers within Levenshtein distance of 2 SHALL be accepted

#### Scenario: Very long word threshold (12+ characters)
- **WHEN** the correct answer has 12 or more characters
- **THEN** answers within Levenshtein distance of 3 SHALL be accepted

---

## ADDED Requirements

### Requirement: Phonetic Matching
The system SHALL accept phonetically similar answers for commonly confused spellings.

#### Scenario: Phonetic similarity accepted
- **WHEN** the correct answer is "Kyiv"
- **AND** the user enters "Kiev"
- **THEN** the answer SHALL be marked as correct (phonetically equivalent)

#### Scenario: Common phonetic variations
- **WHEN** the user's answer sounds similar to the correct answer
- **THEN** the system SHALL apply phonetic matching as a fallback after Levenshtein matching fails

---

### Requirement: Compound Word Handling
The system SHALL handle compound words and hyphenated names flexibly.

#### Scenario: Hyphen optional
- **WHEN** the correct answer is "Guinea-Bissau"
- **AND** the user enters "Guinea Bissau" (without hyphen)
- **THEN** the answer SHALL be marked as correct

#### Scenario: Word order flexibility for two-word names
- **WHEN** the correct answer contains two words
- **AND** the user enters both words in either order
- **THEN** the system SHALL check both orderings

---

### Requirement: Transliteration Tolerance
The system SHALL accept common ASCII substitutions for non-ASCII characters.

#### Scenario: Umlaut substitution
- **WHEN** the correct answer contains "ü"
- **AND** the user enters "ue" or "u"
- **THEN** the answer SHALL be marked as correct

#### Scenario: Nordic characters
- **WHEN** the correct answer contains "ø" or "å"
- **AND** the user enters "o" or "a" respectively
- **THEN** the answer SHALL be marked as correct
