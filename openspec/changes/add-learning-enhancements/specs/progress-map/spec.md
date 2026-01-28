# Progress Map Capability

## ADDED Requirements

### Requirement: MAP-1 Interactive World Map Display
The game MUST provide an interactive world map showing learning progress.

#### Scenario: Opening progress map
- Given: User is on the home page
- When: User clicks "Progress Map" button
- Then: Interactive world map is displayed
- And: Countries are color-coded by mastery level

#### Scenario: Map color coding
- Given: User is viewing the progress map
- When: Map renders
- Then: Not yet answered countries are gray
- And: Struggling countries (learning bucket, high errors) are red
- And: In-progress countries (review bucket) are yellow
- And: Mastered countries are green

### Requirement: MAP-2 Country Interaction
Users MUST be able to interact with countries on the map.

#### Scenario: Click country for details
- Given: User is viewing the progress map
- When: User clicks on a country
- Then: Country detail popup appears
- And: Shows country name, capital, region
- And: Shows times answered and accuracy percentage
- And: Shows current mastery bucket

#### Scenario: Hover country preview
- Given: User is viewing the progress map
- When: User hovers over a country
- Then: Country name is highlighted or shown in tooltip

### Requirement: MAP-3 Map Filtering
Users MUST be able to filter the map view.

#### Scenario: Filter by region
- Given: User is viewing the progress map
- When: User selects a region filter
- Then: Map zooms to or highlights that region
- And: Other regions are dimmed or hidden

#### Scenario: Filter by mastery level
- Given: User is viewing the progress map
- When: User selects a mastery level filter
- Then: Only countries matching that level are highlighted
- And: Other countries are dimmed

### Requirement: MAP-4 Map Legend
The map MUST include a legend explaining the color coding.

#### Scenario: Legend display
- Given: User is viewing the progress map
- When: Map is rendered
- Then: Legend is visible showing color meanings
- And: Legend shows count of countries in each category
