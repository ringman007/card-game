# Countries Data

Dataset structure for UN member countries and their capitals.

## ADDED Requirements

### Requirement: Complete UN Member Dataset
The system SHALL include data for all 193 UN member countries.

#### Scenario: Dataset completeness
- **WHEN** the countries dataset is loaded
- **THEN** it SHALL contain exactly 193 country entries

#### Scenario: No territories
- **WHEN** reviewing the dataset
- **THEN** it SHALL NOT include territories, dependencies, or disputed regions
- **AND** only sovereign UN member states SHALL be included

---

### Requirement: Country Data Structure
The system SHALL use a consistent data structure for each country entry.

#### Scenario: Required fields
- **WHEN** a country entry is defined
- **THEN** it SHALL contain:
  - `id`: Unique 3-letter ISO code (e.g., "USA", "GBR")
  - `country`: Primary country name in English
  - `countryAlternatives`: Array of alternative country names
  - `capital`: Primary capital city name
  - `capitalAlternatives`: Array of alternative capital names
  - `region`: Geographic region classification
  - `multipleCapitals`: Boolean flag for countries with multiple capitals

#### Scenario: Example entry
- **WHEN** accessing data for South Africa
- **THEN** the entry SHALL include:
  - `id`: "ZAF"
  - `country`: "South Africa"
  - `capital`: "Pretoria" (administrative)
  - `capitalAlternatives`: ["Cape Town", "Bloemfontein"]
  - `multipleCapitals`: true

---

### Requirement: Region Classification
The system SHALL classify each country into one of six geographic regions.

#### Scenario: Available regions
- **WHEN** filtering by region
- **THEN** the available regions SHALL be:
  - Africa
  - Asia
  - Europe
  - North America
  - South America
  - Oceania

#### Scenario: Region assignment
- **WHEN** a country is added to the dataset
- **THEN** it SHALL be assigned to exactly one region

#### Scenario: World option
- **WHEN** the user selects "World" region
- **THEN** all 193 countries SHALL be included in the question pool

---

### Requirement: Multiple Capitals Support
The system SHALL correctly handle countries with multiple capital cities.

#### Scenario: Multiple capitals flag
- **WHEN** a country has more than one capital (administrative, legislative, judicial)
- **THEN** `multipleCapitals` SHALL be set to true

#### Scenario: Known multi-capital countries
- **WHEN** reviewing the dataset
- **THEN** the following countries SHALL have `multipleCapitals: true`:
  - South Africa (Pretoria, Cape Town, Bloemfontein)
  - Bolivia (Sucre, La Paz)
  - Malaysia (Kuala Lumpur, Putrajaya)
  - Sri Lanka (Colombo, Sri Jayawardenepura Kotte)

---

### Requirement: Alternative Names
The system SHALL support alternative spellings and names for countries and capitals.

#### Scenario: Capital alternatives
- **WHEN** a capital has common alternative names
- **THEN** they SHALL be listed in `capitalAlternatives`
- **AND** all alternatives SHALL be accepted as correct answers

#### Scenario: Country alternatives
- **WHEN** a country has common alternative names
- **THEN** they SHALL be listed in `countryAlternatives`
- **AND** all alternatives SHALL be accepted as correct answers

#### Scenario: Known alternatives
- **WHEN** reviewing the dataset
- **THEN** the following alternatives SHALL be included:
  - Myanmar: ["Burma"]
  - Czechia: ["Czech Republic"]
  - New Delhi: ["Delhi"]
  - Vienna: ["Wien"]
