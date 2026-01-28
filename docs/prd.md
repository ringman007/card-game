# Product Requirements Document: World Capitals Card Game

## 1. Overview
A web-based educational card game to help users memorize world capitals through active recall and spaced repetition, deployed on Vercel.

## 2. Core Functionality

### 2.1 Game Modes
- **Mode A**: Display country → User types capital
- **Mode B**: Display capital → User types country
- Modes can be mixed within a single session

### 2.2 Input & Validation
- Text input field for user answers
- Fuzzy matching algorithm for spelling tolerance
- Case-insensitive matching
- Accepts alternative names (e.g., "New Delhi" vs "Delhi")
- Handles diacritics (assumes user types without special characters)

### 2.3 Game Flow
- 10 cards per session (fixed)
- Present one card at a time
- Immediate feedback on answer correctness
- Advance to next card after answer submission
- Self-paced (no time limits)
- No penalties for wrong answers
- Short animations between card transitions

### 2.4 Adaptive Learning System
- Spaced repetition algorithm
- Tracks user performance per question
- Shows incorrectly answered questions more frequently
- Intelligently schedules card reviews based on answer history
- Questions answered correctly appear at increasing intervals

### 2.5 Region Selection
- Users can filter by specific regions/continents
- Session always contains 10 cards regardless of region selected
- Available regions: Africa, Asia, Europe, North America, South America, Oceania, World (all)

## 3. Technical Requirements

### 3.1 Technology Stack
- **Frontend Framework**: React
- **State Management**: React Context API + useState hooks
- **Deployment**: Vercel
- **Data Storage**: Browser Local Storage (client-side)
- **Responsive Design**: Mobile and desktop compatible

### 3.2 Performance
- Fast load times
- Smooth card transitions
- No testing requirements for MVP

### 3.3 Accessibility
- Keyboard navigation support
- Screen reader compatibility
- WCAG 2.1 Level AA compliance target

## 4. Data Requirements

### 4.1 Country Dataset
- All UN member countries (193 countries)
- No territories included
- Countries with multiple capitals supported (e.g., South Africa)
- Alternative spellings/names supported (e.g., Myanmar/Burma)

### 4.2 Data Structure (per country)
- Country name (primary)
- Country name alternatives (array)
- Capital name (primary)
- Capital name alternatives (array)
- Multiple capitals flag (boolean)
- Region/continent classification

### 4.3 User Progress Data (Local Storage)
- Question ID
- Number of times shown
- Number of correct answers
- Number of incorrect answers
- Last shown timestamp
- Next review timestamp (for spaced repetition)
- Difficulty score (calculated)

## 5. User Experience

### 5.1 Visual Design
- Minimalist aesthetic
- Clean, uncluttered interface
- Clear typography for readability
- Subtle color scheme
- Card-based layout

### 5.2 User Feedback
- Visual indicators for correct/incorrect answers
- Helpful hints for countries with special cases:
  - "This country has multiple capitals" note when applicable
  - "Alternative names accepted" note when applicable
- Show correct answer after incorrect submission

### 5.3 Practice Mode
- Dedicated mode for reviewing difficult/flagged capitals
- Accessible from main menu

## 6. Functional Requirements

### FR-1: Game Session
- User can start a new session from the home screen
- User can select region before starting session
- Session presents exactly 10 questions
- Session cannot be paused or resumed

### FR-2: Question Presentation
- Display country/capital name clearly
- Display helper text for special cases
- Provide text input field
- Provide submit button
- Support Enter key for submission

### FR-3: Answer Validation
- Validate answer using fuzzy matching
- Ignore case differences
- Accept alternative names
- Ignore diacritics/special characters
- Provide immediate feedback

### FR-4: Progress Tracking
- Store all user interactions in local storage
- Calculate performance metrics per question
- Persist data across sessions
- Calculate next review dates using spaced repetition

### FR-5: Adaptive Algorithm
- Prioritize questions user answered incorrectly
- Implement spaced repetition intervals
- Balance between review and new content
- Adjust difficulty based on user performance

### FR-6: Region Filtering
- Allow selection of geographic regions
- Filter question pool based on selection
- Maintain 10-card session size across all regions

### FR-7: Practice Mode
- Show only previously answered questions
- Prioritize difficult/incorrectly answered questions
- Same 10-card session format

## 7. Non-Functional Requirements

### NFR-1: Performance
- Page load time < 2 seconds
- Card transition time < 300ms
- Instant answer validation

### NFR-2: Browser Compatibility
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### NFR-3: Data Privacy
- No user authentication required
- No personal data collected
- All data stored locally
- No analytics tracking (optional for future)

### NFR-4: Scalability
- Support for adding more countries in future
- Extensible to other learning topics
- Modular code architecture

## 8. Success Metrics
- Session completion rate
- Answer accuracy over time
- User retention (returning sessions)
- Average questions per user
- Improvement rate (accuracy trend)

---

## 9. Requirements Traceability Matrix

| Req ID | Requirement | Type | Priority | Acceptance Criteria | Status |
|--------|-------------|------|----------|---------------------|--------|
| FR-1.1 | Start new game session | Functional | High | User can click "Start" and begin session | Not Started |
| FR-1.2 | Select region before session | Functional | High | Dropdown/buttons for region selection | Not Started |
| FR-1.3 | 10 questions per session | Functional | High | Session ends after exactly 10 questions | Not Started |
| FR-2.1 | Display question (country/capital) | Functional | High | Text clearly visible on card | Not Started |
| FR-2.2 | Show helper text for special cases | Functional | Medium | "Multiple capitals" note appears when needed | Not Started |
| FR-2.3 | Text input field | Functional | High | Input field accepts keyboard input | Not Started |
| FR-2.4 | Submit answer functionality | Functional | High | Button + Enter key submit answer | Not Started |
| FR-3.1 | Fuzzy matching validation | Functional | High | Accepts minor spelling variations | Not Started |
| FR-3.2 | Case-insensitive matching | Functional | High | "delhi" = "Delhi" = "DELHI" | Not Started |
| FR-3.3 | Alternative names accepted | Functional | Medium | "New Delhi" and "Delhi" both correct | Not Started |
| FR-3.4 | Handle diacritics | Functional | Medium | User types without special chars | Not Started |
| FR-3.5 | Immediate feedback | Functional | High | Correct/incorrect shown instantly | Not Started |
| FR-3.6 | Show correct answer on error | Functional | High | Display correct answer after wrong submission | Not Started |
| FR-4.1 | Store data in local storage | Functional | High | Progress persists across sessions | Not Started |
| FR-4.2 | Track performance per question | Functional | High | Correct/incorrect count stored | Not Started |
| FR-4.3 | Calculate metrics | Functional | Medium | Performance metrics computed | Not Started |
| FR-5.1 | Spaced repetition algorithm | Functional | High | Questions scheduled at intervals | Not Started |
| FR-5.2 | Prioritize incorrect answers | Functional | High | Wrong answers appear more frequently | Not Started |
| FR-5.3 | Adaptive difficulty | Functional | Medium | Question selection based on performance | Not Started |
| FR-6.1 | Region filter functionality | Functional | Medium | Questions limited to selected region | Not Started |
| FR-6.2 | All regions available | Functional | Medium | 7 regions selectable | Not Started |
| FR-7.1 | Practice mode access | Functional | Low | Dedicated practice mode available | Not Started |
| FR-7.2 | Show difficult questions | Functional | Low | Practice prioritizes weak areas | Not Started |
| NFR-1.1 | Page load < 2 seconds | Performance | High | Measured with Lighthouse | Not Started |
| NFR-1.2 | Card transition < 300ms | Performance | Medium | Smooth visual transitions | Not Started |
| NFR-2.1 | Cross-browser support | Compatibility | High | Works on Chrome, Firefox, Safari, Edge | Not Started |
| NFR-3.1 | No authentication required | Privacy | High | Anonymous access enabled | Not Started |
| NFR-3.2 | Local data storage only | Privacy | High | No server-side user data | Not Started |
| NFR-4.1 | Keyboard navigation | Accessibility | High | Full keyboard control | Not Started |
| NFR-4.2 | Screen reader support | Accessibility | High | ARIA labels and semantic HTML | Not Started |
| DATA-1 | 193 UN member countries | Data | High | Complete dataset included | Not Started |
| DATA-2 | Multiple capitals support | Data | Medium | South Africa, Bolivia, etc. handled | Not Started |
| DATA-3 | Alternative spellings | Data | Medium | Myanmar/Burma, etc. included | Not Started |

## 10. Out of Scope (Future Considerations)
- User authentication/accounts
- Leaderboards and social features
- Scoring system
- Session pause/resume
- Multiple language support
- Native mobile apps
- Multiplayer modes
- Territories and dependencies
- Offline support (PWA)

## 11. Development Phases

### Phase 1: MVP (Minimum Viable Product)
- Basic game session (10 cards, both modes)
- UN member countries dataset
- Simple validation (exact match)
- Local storage for basic progress
- Minimal UI
- Desktop-first responsive design

### Phase 2: Enhanced Learning
- Fuzzy matching algorithm
- Spaced repetition implementation
- Adaptive difficulty
- Alternative names support
- Improved UI/animations

### Phase 3: Advanced Features
- Region filtering
- Practice mode
- Full accessibility compliance
- Mobile optimization
- Enhanced data tracking
- **Improve Mode**: Display a list of previously incorrect answers and allow users to start a session with only those cards (10-card format, prioritizing most frequently missed)

## 12. Technical Architecture

### 12.1 Component Structure
```
App
├── HomePage
│   ├── RegionSelector
│   └── StartButton
├── GameSession
│   ├── Card
│   │   ├── QuestionDisplay
│   │   └── AnswerInput
│   ├── FeedbackDisplay
│   └── ProgressIndicator
├── PracticeMode
└── ResultsScreen
```

### 12.2 Data Flow
1. User selects region and starts session
2. App queries local storage for user history
3. Spaced repetition algorithm selects 10 questions
4. Questions presented one at a time
5. User submits answer → validated → feedback shown
6. Results stored in local storage
7. Next question or end session

### 12.3 Local Storage Schema
```json
{
  "userProgress": {
    "questionId": {
      "timesShown": 0,
      "correctCount": 0,
      "incorrectCount": 0,
      "lastShown": "timestamp",
      "nextReview": "timestamp",
      "difficultyScore": 0.5
    }
  },
  "settings": {
    "lastRegion": "World"
  }
}
```

## 13. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Fuzzy matching too permissive | Medium | Medium | Test with various inputs, tune threshold |
| Local storage cleared by user | Medium | Low | Inform users about data storage |
| Dataset accuracy | High | Low | Use authoritative source (UN data) |
| Spaced repetition complexity | Medium | Medium | Use proven algorithm (SM-2 or similar) |
| Browser compatibility issues | Low | Low | Test on all major browsers |
| Performance on mobile | Medium | Medium | Optimize bundle size, lazy loading |

## 14. Dependencies & Assumptions

### Dependencies
- React library
- Vercel hosting platform
- Countries/capitals dataset (JSON)
- Fuzzy matching library (e.g., fuzzball.js)
- Spaced repetition algorithm library or custom implementation

### Assumptions
- Users have modern browsers with JavaScript enabled
- Users have stable internet connection for initial load
- Local storage is available and has sufficient space
- Users understand English (game language)
- Users have basic keyboard skills 

