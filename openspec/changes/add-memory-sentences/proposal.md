# Phase 6: Memory Sentences

## Overview
Add absurd, hilarious memory sentences that combine each country with its capital in unforgettable ways. These sentences enhance the existing learning experience - shown in quiz feedback and browsable in a gallery. All existing modes (Start Learning, Study, Practice, Improve) remain unchanged.

## Goals
1. Create memorable sentences for 50+ countries using proven memory techniques
2. Display sentences in Card feedback after answering questions
3. Add a "Memory Palace" gallery to browse all sentences
4. Show sentences on Study Mode flashcard backs
5. Make learning capitals genuinely fun and sticky

## Memory Technique Principles
- **Vivid Imagery**: Paint a mental picture so bizarre you can't forget it
- **Sound Association**: Puns, alliteration, rhymes on country/capital names
- **Action/Movement**: Active verbs create mental movies
- **Emotional Hook**: Funny = memorable
- **Exaggeration**: The more ridiculous, the better

## Features

### 1. Memory Sentence in Quiz Feedback
- Show in Card feedback section after correct/incorrect answers
- Styled distinctively with a "brain" icon
- Key words highlighted for the puns
- Animated entrance for engagement

### 2. Memory Palace Gallery (Browse Only)
- New button on homepage to open gallery
- Browsable collection of all sentences
- Filter by region
- Search by country or capital
- Visual cards with country flags/emojis

### 3. Study Mode Flashcard Integration
- Show memory sentence on the back of flashcards
- Appears after the answer reveal
- Consistent styling with quiz feedback

## Example Sentences (Silly Mode)

### Europe
- **France → Paris**: "A **PAIR** of **FRANCE**-enstein monsters dance the can-can on the Eiffel Tower"
- **Germany → Berlin**: "A grizzly **BEAR** is **LIN**e-dancing with sausages across **GERMANY**"
- **Spain → Madrid**: "A **MAD** **RID**iculous bull is doing flamenco in **SPAIN**"
- **Italy → Rome**: "A giant pizza is **ROAM**ing around **ITALY** eating tourists"
- **Portugal → Lisbon**: "**LIZ** the **BON**kers mermaid surfs through **PORTUGAL**"

### Asia
- **Japan → Tokyo**: "A **TOE** stubbed on **KYO**to temples makes samurai cry in **JAPAN**"
- **China → Beijing**: "**BAY**-watching lifeguards **JING**le bells on the Great Wall of **CHINA**"
- **Thailand → Bangkok**: "My head went **BANG** when I **KOK**-a-doodle-dooed in **THAILAND**"
- **India → New Delhi**: "A **NEW** **DELI** sells curry sandwiches to elephants in **INDIA**"

### Americas
- **USA → Washington**: "George **WASHING** his **TON** of laundry in the **USA**"
- **Canada → Ottawa**: "An **OTTER** said '**WA**!' when a moose sat on him in **CANADA**"
- **Brazil → Brasília**: "A **BRA** full of **ZILLIONS** of soccer balls bounces through **BRAZIL**"
- **Mexico → Mexico City**: "A **MEX**ican taco opened a **CITY** inside itself - inception!"

### Africa
- **Egypt → Cairo**: "**CARE**-ful! **OH** no! A mummy's driving a **CAIRO** cab in **EGYPT**"
- **Kenya → Nairobi**: "A lion said '**NAI** **ROB** me!' to a giraffe in **KENYA**"
- **Morocco → Rabat**: "A **RABBIT** wearing a fez hops through **MOROCCO**"

### Oceania
- **Australia → Canberra**: "A kangaroo **CAN** **BEAR** a koala while boxing in **AUSTRALIA**"
- **New Zealand → Wellington**: "**WELL**-**ING**-ton of sheep fell into a volcano in **NEW ZEALAND**"

## Non-Goals
- No inappropriate or adult content
- No offensive stereotypes
- No political references

## Success Metrics
- User engagement with memory sentences
- Improved recall rates for countries with sentences
- Positive user feedback on humor

## Technical Approach
1. Create `src/data/memorySentences.json` with 50+ sentences
2. Create `src/utils/memorySentences.js` for sentence lookup
3. Enhance `Card.jsx` to display memory sentence in feedback
4. Create `MemoryPalace.jsx` component for gallery view
5. Enhance `Flashcard.jsx` to show sentence on card back
6. Add "Memory Palace" button on HomePage
7. Add navigation to gallery from App.jsx
