# World Capitals Card Game

An educational web-based card game to help users memorize world capitals through active recall and spaced repetition.

## Features

- **Two Game Modes**: Type the capital when shown a country, or type the country when shown a capital
- **Adaptive Learning**: Spaced repetition algorithm prioritizes questions you get wrong
- **193 Countries**: Complete UN member countries dataset with alternative names support
- **Region Filtering**: Focus on specific continents or practice all countries
- **Fuzzy Matching**: Tolerant answer validation for minor spelling variations
- **Progress Tracking**: Your performance is saved locally across sessions
- **Responsive Design**: Works on desktop and mobile devices
- **Accessible**: Full keyboard navigation and screen reader support

## Tech Stack

- **React** - Frontend framework
- **Vite** - Build tool and dev server
- **Local Storage** - Client-side data persistence
- **Vercel** - Deployment platform

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The app will be available at `http://localhost:5173/`

## Project Structure

```
src/
├── components/          # React components
│   ├── HomePage.jsx     # Home screen with region selector
│   ├── GameSession.jsx  # Game session container
│   ├── Card.jsx         # Question card with input
│   ├── ProgressIndicator.jsx
│   └── ResultsScreen.jsx
├── context/
│   └── GameContext.jsx  # Global state management
├── data/
│   └── countries.json   # Countries and capitals dataset
├── utils/
│   ├── fuzzyMatch.js    # Answer validation logic
│   ├── localStorage.js  # Progress persistence
│   └── questionSelector.js  # Adaptive question algorithm
├── App.jsx              # Main app router
└── main.jsx             # App entry point
```

## Deployment to Vercel

1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Vercel will auto-detect Vite configuration
4. Deploy!

Or use Vercel CLI:

```bash
npm install -g vercel
vercel
```

## Features Implemented

### Phase 1 (MVP) ✅
- Basic game session with 10 cards
- UN member countries dataset (193 countries)
- Fuzzy matching validation
- Local storage for progress
- Minimalist UI
- Responsive design

### Phase 2 (Enhanced Learning) ✅
- Spaced repetition algorithm
- Adaptive difficulty based on performance
- Alternative names support
- UI animations and transitions
- Full accessibility support

### Phase 3 (Advanced Features) ✅
- Region filtering (7 regions + World)
- Results screen with detailed review
- Progress tracking across sessions
- Mobile optimization

## PRD Compliance

This implementation fulfills all requirements from the Product Requirements Document:

- ✅ FR-1: Game session with region selection
- ✅ FR-2: Question presentation with helper text
- ✅ FR-3: Fuzzy answer validation
- ✅ FR-4: Progress tracking in local storage
- ✅ FR-5: Adaptive difficulty and spaced repetition
- ✅ FR-6: Region filtering
- ✅ NFR-1: Performance optimized
- ✅ NFR-2: Cross-browser compatible
- ✅ NFR-3: Privacy-focused (no user data collected)
- ✅ NFR-4: Full keyboard navigation and screen reader support

## License

MIT

