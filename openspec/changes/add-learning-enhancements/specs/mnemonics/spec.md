# Mnemonics Capability

## ADDED Requirements

### Requirement: MNEM-1 Curated Mnemonics
The game MUST provide curated memory tips for difficult capitals.

#### Scenario: View curated mnemonic
- Given: User is viewing a question with a curated mnemonic
- When: User expands the "Memory Tip" section
- Then: Curated mnemonic is displayed
- And: Mnemonic helps associate country with capital

#### Scenario: No mnemonic available
- Given: User is viewing a question without a curated mnemonic
- When: User looks for memory tip
- Then: Memory tip section shows "No tip available" or is hidden
- And: Option to add personal mnemonic is shown

### Requirement: MNEM-2 Personal Mnemonics
Users MUST be able to create their own mnemonics.

#### Scenario: Add personal mnemonic
- Given: User is viewing a question
- When: User clicks "Add Memory Tip" button
- Then: Text input appears for user to enter mnemonic
- And: User can save their mnemonic

#### Scenario: View personal mnemonic
- Given: User previously saved a mnemonic for a country
- When: User sees that country in a question
- Then: Personal mnemonic is displayed in Memory Tip section
- And: Personal mnemonic is marked as "Your tip"

#### Scenario: Edit personal mnemonic
- Given: User has a saved personal mnemonic
- When: User clicks edit button
- Then: Mnemonic text becomes editable
- And: User can save changes or delete

### Requirement: MNEM-3 Mnemonic Persistence
Personal mnemonics MUST persist across sessions.

#### Scenario: Mnemonics saved to local storage
- Given: User creates a personal mnemonic
- When: User closes and reopens the app
- Then: Personal mnemonic is still available
- And: Mnemonic appears when viewing that country

#### Scenario: Mnemonic deletion
- Given: User has a saved personal mnemonic
- When: User deletes the mnemonic
- Then: Mnemonic is removed from storage
- And: Memory tip section reverts to curated or empty state

### Requirement: MNEM-4 Mnemonic Display Location
Mnemonics MUST be accessible but not distracting.

#### Scenario: Collapsed by default
- Given: User is viewing a question
- When: Card loads
- Then: Memory Tip section is collapsed by default
- And: User must click to expand

#### Scenario: Expand mnemonic section
- Given: User wants to see the memory tip
- When: User clicks "💡 Memory Tip" header
- Then: Section expands to show mnemonic content
- And: Section can be collapsed again
