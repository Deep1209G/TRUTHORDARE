# Truth or Dare - App Development Plan

## Current State
React Native app with spinning bottle mechanic, dynamic players (2-10), game context, premium dark UI, and animated truth/dare selection modal.

**Built:** HomeScreen, Bottle (SVG), GameBoard, SpinButton, Header, TruthDareModal, PlayerSetupScreen, Theme, Navigation, GameContext.

---

## Phase 1: Core Game Logic ✅

### 1.1 Determine Selected Player ✅
- After bottle spin animation ends, calculate which player the bottle points to
- Use final rotation angle modulo 360 → map to player index
- Store selected player in state

### 1.2 Truth or Dare Selection ✅
- Show Truth/Dare choice modal after spin completes
- Two buttons: "Truth" and "Dare"
- Randomly pick a question/challenge from data

### 1.3 Question/Dare Data ✅
- Created `src/data/truths.ts` — 25 truth questions
- Created `src/data/dares.ts` — 25 dare challenges

---

## Phase 2: New Screens

### 2.1 PlayerSetupScreen ✅
- Add/remove players (min 2, max 10)
- Assigned player colors from palette
- Quick add with preset names

### 2.2 TruthDareModal ✅
- Animated modal with celebration effects
- Player avatar with glow
- Truth/Dare buttons with bounce animation
- Question reveal with fade

### 2.3 SettingsScreen ✅
- Difficulty level selector (mild/medium/wild)
- Sound toggle
- Reset game / clear history

---

## Phase 3: Game State Management ✅

### 3.1 GameContext ✅
- Created `src/context/GameContext.tsx`
- State: players[], selectedPlayerIndex, selectedType, currentQuestion, scores, rotation
- Actions: setPlayers(), spin(), resolvePlayer(), selectType(), nextTurn(), resetGame()

### 3.2 Score Tracking ✅
- +1 point for completing a dare
- +1 point for answering a truth
- Display scores on HomeScreen or a ScoreBoard component

---

## Phase 4: UI Polish

### 4.1 Animations ✅
- Bottle rotation with spring timing
- Player avatar pulse when selected
- Segment opacity animation
- Screen transitions with fade

### 4.2 Result Card ✅
- Styled card for displaying truth/dare text
- Color-coded (purple for truth, orange for dare)

---

## Phase 5: Sound & Haptics ✅

### 5.1 Sound Effects ✅
- Spin sound, result reveal sound, button tap
- Use `react-native-sound`

### 5.2 Haptic Feedback ✅
- Light tap on button press
- Success vibration on dare completion

---

## File Structure

```
src/
├── components/
│   ├── Bottle.tsx          ✅ done
│   ├── GameBoard.tsx        ✅ done
│   ├── Header.tsx           ✅ done
│   ├── SpinButton.tsx       ✅ done
│   ├── TruthDareModal.tsx   ✅ done
│   ├── ResultCard.tsx       ✅ done
│   ├── ScoreBoard.tsx       ✅ done
│   └── shared/
├── screens/
│   ├── HomeScreen.tsx       ✅ done
│   ├── PlayerSetupScreen.tsx ✅ done
│   └── SettingsScreen.tsx    ✅ done
├── context/
│   └── GameContext.tsx       ✅ done
├── data/
│   ├── truths.ts            ✅ done
│   └── dares.ts             ✅ done
├── navigation/
│   └── AppNavigator.tsx     ✅ done
└── theme/
    └── theme.ts             ✅ done
```

---

## Priority Order

| Step | Task | Status |
|------|------|--------|
| 1 | Create truth/dare data files | ✅ done |
| 2 | Build GameContext for state | ✅ done |
| 3 | Add player selection logic to GameBoard | ✅ done |
| 4 | Build TruthDareModal component | ✅ done |
| 5 | Integrate modal into HomeScreen | ✅ done |
| 6 | Add PlayerSetupScreen | ✅ done |
| 7 | Add score tracking | ✅ done |
| 8 | Add SettingsScreen | ✅ done |
| 9 | Add sound effects & haptics | ✅ done |
| 10 | PlayerSetupScreen mode toggle UI improve | ⬜ |
| 11 | Polish UI & final testing | ⬜ |

---

---

## Phase 6: Leave Game → Leaderboard Flow

### 6.1 GameContext – add `endGame` action
- `endGame()` – preserves `players` and `scores` (needed for the leaderboard), resets everything else (`selectedPlayerIndex`, `selectedType`, `currentQuestion`, `spinning`, `rotation`).

### 6.2 SettingsScreen – "Leave Game" button
- Add a red-styled "Leave Game" button below the existing "Reset Game" section.
- On press → `Alert.alert` confirmation: *"Are you sure you want to end the game? All progress will be lost and the entire game will stop."*
- On confirm → call `endGame()` → `navigation.navigate('GameOver')`.

### 6.3 New screen – `src/screens/GameOverScreen.tsx`
- Reads `players` and `scores` from `useGame()`.
- Title: **"Game Over"**.
- **Leaderboard**: players sorted by score descending, showing rank, name/avatar, and score.
- **"Restart Game"** button → `resetGame()`, `setPlayers([])`, `navigation.navigate('PlayerSetup')`.
- **"Go to Home"** button → `resetGame()`, `setPlayers([])`, `navigation.navigate('HomeMenu')`.

### 6.4 Navigation – register new screen
- Add `GameOverScreen` to `AppNavigator.tsx` stack.
- Export from `src/index.ts`.

---

## Phase 7: Redesign PlayerSetupScreen with Modal

### 7.1 Main Screen Layout
- Top: Back `<` button + title "TRUTH OR DARE" / "ADD PLAYERS"
- **Circular + button** centered near top — taps open the Add Player modal
- **Empty state**: subtle "No players added yet" text when no players exist
- **Player list** (FlatList): each row = avatar circle + name + red x remove button
- **START GAME** at bottom — gray/disabled when < 2, purple + glow when ≥ 2
- Player count: "0 / 10 players"

### 7.2 Add Player Modal (triggered by + button)
- Dark overlay + centered card matching TruthDareModal style
- **TextInput** with placeholder "Enter name..."
- **"Add Player" button** — validates: non-empty, no duplicates, max 10; adds to in-modal preview list
- **"Quick Add" button** — picks a random name from `PRESET_NAMES` not already added
- **Preview list** inside the modal showing names added so far (each with x to remove)
- **"Done" button** — closes modal, merges modal players into the main screen list

### 7.3 State
| State | Type | Description |
|---|---|---|
| `modalVisible` | `boolean` | Show/hide the modal |
| `newName` | `string` | TextInput value inside the modal |
| `modalPlayers` | `Player[]` | Players added during this modal session (not yet committed) |
| `players` | `Player[]` | Final list of players on the main screen |

### 7.4 Behavior
- Tapping **+** opens modal with empty input and empty preview
- **Add Player** validates → appends to `modalPlayers`, clears input
- **Quick Add** picks a random unused preset → appends to `modalPlayers`
- Tap **x** on a preview row removes from `modalPlayers`
- **Done** → merges `modalPlayers` into `players` → closes modal
- **x** on main screen row removes from `players`
- **START GAME** disabled when `players.length < 2`

---

## Phase 8: Physical Dares Mode

### 8.1 GameContext changes
- Add `gameMode: 'standard' | 'physical'` state + `setGameMode(mode)` action
- `resetGame()` and `endGame()` — also reset `gameMode`

### 8.2 PlayerSetupScreen – mode toggle UI improve
- Replace the flat segmented control with two stacked selectable cards
- Each card: emoji icon (🎯 Standard / 💪 Physical) + bold title + short description
- Active card: purple background (`#818CF8`) with glow shadow
- Inactive card: surface background (`#1E293B`), dimmed text
- **Always visible** — remove the `players.length === 0` conditional hide
- Add a mode indicator badge above the "Players" section header (e.g., `💪 Physical Mode`)

### 8.3 TruthDareModal – physical mode flow
When `mode === 'physical'`:
- After TRUTH/DARE is chosen, show the type label and player name (no predefined question)
- Text reads: "Make up a {truth/dare} for the group!"
- Nailed It / Forfeit buttons remain for group voting

No new data files, no target selection UI.

---

---

## Phase 9: Replace Emoji Icons with SVG Assets

### 9.1 Import SVG icons from `src/assets/icon/`
- 9 SVG files exist but are currently unused (`addplayer.svg`, `close.svg`, `global.svg`, `mute.svg`, `reset.svg`, `rulebook.svg`, `setting.svg`, `tick.svg`, `volume.svg`)
- `react-native-svg-transformer` is already configured — import as React components: `import Icon from '../assets/icon/foo.svg'`

### 9.2 Replace all emoji/unicode icons across screens

| File | Current Emoji | Replace With |
|------|---------------|--------------|
| `Header.tsx` | `🔊`/`🔇` sound, `⚙` settings | `volume.svg`/`mute.svg`, `setting.svg` |
| `HomeMenuScreen.tsx` | `📖` rules, `🔊` sound, `📤` share, `🌐` language | `rulebook.svg`, `volume.svg`, `tick.svg`, `global.svg` |
| `PlayerSetupScreen.tsx` | `🎯` Standard, `💪` Physical mode cards | `tick.svg`, `reset.svg` |
| `SettingsScreen.tsx` | unicode icons in list rows | `reset.svg`, `mute.svg`, `volume.svg` |
| `LanguageScreen.tsx` | unicode/emoji | `global.svg` |
| `SoundScreen.tsx` | unicode/emoji | `volume.svg`, `mute.svg` |
| `RulesScreen.tsx` | unicode/emoji | `rulebook.svg` |

### 9.3 (Optional) Create a reusable `<Icon>` wrapper
- Accepts `name`, `size`, `color` props
- Maps name string to the corresponding SVG import
- Simplifies usage across all screens

---

// Flow
Home
   │
Play
   │
Host Mode
   │
├── 🤖 App Host
│      │
│      ▼
│   Age Selection
│      │
│      ├── Kids
│      ├── Teens
│      └── Adults
│      │
│      ▼
│   Category Selection
│      │
│      ▼
│   Question Type
│      │
│      ├── If Kids:
│      │      • Funny
│      │      • Family
│      │      • School
│      │      • Adventure
│      │      • Silly
│      │
│      ├── If Teens:
│      │      • Funny
│      │      • Friends
│      │      • School
│      │      • Party
│      │      • Embarrassing
│      │      • Challenge
│      │
│      └── If Adults:
│             • Funny
│             • Friends
│             • Party
│             • Romantic
│             • Spicy
│             • Extreme
│
│      ▼
│   Player Setup
│      │
│      ▼
│   Start Game
│      │
│      ▼
│   Game Screen
│
└── 👤 Player Host
       │
       ▼
    Player Setup
       │
       ▼
    Start Game
       │
       ▼
    Game Screen

## Phase 10: Question Type Selection (App Host flow)

### 10.1 New data file – `src/data/questionTypes.ts`
- Define `export type QuestionType = 'Funny' | 'Family' | 'School' | 'Adventure' | 'Silly' | 'Friends' | 'Party' | 'Embarrassing' | 'Challenge' | 'Romantic' | 'Spicy' | 'Extreme'`
- Export map `AGE_QUESTION_TYPES: Record<AgeGroup, QuestionType[]>`:
  - kids: `['Funny', 'Family', 'School', 'Adventure', 'Silly']`
  - teens: `['Funny', 'Friends', 'School', 'Party', 'Embarrassing', 'Challenge']`
  - adults: `['Funny', 'Friends', 'Party', 'Romantic', 'Spicy', 'Extreme']`

### 10.2 GameContext changes
- Add `questionTypes: QuestionType[]` state + `setQuestionTypes(action)` (empty array default, reset in `resetGame()`)
- Stored only for now; question filtering wired up later when `truths.ts`/`dares.ts` get type tags

### 10.3 New screen – `src/screens/QuestionTypeScreen.tsx`
- Same layout as other flow screens: `SafeAreaView` → `Box background` → header (BackIcon → `goBack()`) + title
- Reads `ageGroup` from `useGame()`, renders matching types as **toggle chips** (active = `#818CF8`, inactive = `surface`)
- **Multi-select** (user confirmed): tapping a chip toggles it on/off
- **Continue** button at bottom — disabled until ≥1 type selected → `setQuestionTypes(...)` → `navigation.navigate('PlayerSetup')`
- `lightTap()` haptics on chip taps

### 10.4 Navigation wiring
- `CategorySelectionScreen` — navigate to `'QuestionType'` instead of `'PlayerSetup'`
- Register `QuestionType` screen in `AppNavigator.tsx` (after `CategorySelection`)
- Export `QuestionTypeScreen` from `src/index.ts`

### 10.5 Scope
- Player Host flow unchanged (goes straight to Player Setup)
- Back from Question Type returns to Category Selection via stack `goBack()`
- No changes to HomeMenu, GameOver, HostMode, AgeSelection, CategorySelection, or PlayerSetup

## Phase 11: Turn Timer (Player Host flow)

### 11.1 GameContext changes
- Add `turnTimer: number` state + `setTurnTimer(seconds)` action (`0` = No Timer, default, reset in `resetGame()`)
- Note: `turnTimer: number` type field already added to `GameState`

### 11.2 New screen – `src/screens/TurnTimerScreen.tsx`
- Same layout as other flow screens: `SafeAreaView` (`#120826`) → `Box background` → header (BackIcon → `goBack()`) + title
- Title: **"Choose Turn Timer"**
- **Single-select** option cards (styled like CategorySelection with tick indicator):
  - No Timer (0), 15 Seconds, 30 Seconds, 45 Seconds, 60 Seconds
  - **Custom Time** card — when selected, reveals numeric `TextInput` (validated 1–3600 seconds)
- **CONTINUE** button — enabled when a preset is selected OR a valid custom value entered → `setTurnTimer(seconds)` → `navigation.navigate('PlayerSetup')`
- `lightTap()` haptics on taps

### 11.3 HostModeScreen changes
- Player Host target: `'PlayerSetup'` → `'TurnTimer'`

### 11.4 Navigation wiring
- Register `TurnTimer` screen in `AppNavigator.tsx` (after `HostMode`)
- Export `TurnTimerScreen` from `src/index.ts`

### 11.5 TruthDareModal changes – use saved timer
- Read `turnTimer` from `useGame()`; `hasTimer = turnTimer > 0`
- Replace hardcoded `setTimeLeft(60)` → `setTimeLeft(turnTimer)` (add `turnTimer` to effect deps)
- Physical-mode flow:
  - **No Timer:** skip START TIMER + countdown → ResultCard + **DONE** → vote (FORFEIT / NAILED IT)
  - **With timer:** START TIMER → countdown at selected duration → DONE → vote (existing flow, uses `turnTimer`)
- Standard (App Host) mode unchanged

### 11.6 Scope
- App Host flow untouched — Turn Timer appears only in the Player Host branch
- Verify with `npx tsc --noEmit` and `npx eslint .`

## Phase 12: Make Age / Category / Question Type drive questions

### 12.1 Data model – add `Question` type
- File: `src/data/questionTypes.ts` (already has `QuestionType` + `AgeGroup` import; no runtime cycle)
```ts
export type Question = {
  text: string;
  ageGroup: AgeGroup;    // kids | teens | adults
  type: QuestionType;    // must belong to that age group's type list
  category: Difficulty;  // mild | medium | wild
};
```

### 12.2 Rewrite question datasets
- Files: `src/data/truths.ts`, `src/data/dares.ts` → change from `string[]` to `Question[]`, authored in-app
- Each age group's types get questions across all 3 categories (mild/medium/wild):
  - Kids: Funny, Family, School, Adventure, Silly
  - Teens: Funny, Friends, School, Party, Embarrassing, Challenge
  - Adults: Funny, Friends, Party, Romantic, Spicy, Extreme
- Reuse existing 25+25 questions where they fit; author the rest (~5–7 per type, ~90–110 per file)

### 12.3 GameContext – shuffled "one-by-one" deck dealing
- File: `src/context/GameContext.tsx`
- Add deck state: `truthDeck: Question[]`, `dareDeck: Question[]`, per-type index, and `deckSignature` string (`ageGroup|difficulty|types`)
- In `selectType` (standard mode only):
  1. If `deckSignature` changed (age/category/types changed), rebuild both decks: filter by age + category + selected types (empty types = all), **Fisher-Yates shuffle**
  2. **Deal one by one**: return `deck[index].text`, increment index; on exhaustion reshuffle and restart
  3. **Safety fallback**: if a filtered pool is empty, relax category → then type, but **always keep the age filter** (kids never see adult content)
- `resetGame()` clears the decks

### 12.4 Behavior recap
- e.g. Adults + Wild + [Party, Spicy] → deck = adult wild Party+Spicy questions, shuffled, asked one per turn without repeats until exhausted, then reshuffled
- Player Host mode unchanged (players make up questions)

### 12.5 Verify
- `npx tsc --noEmit` and `npx eslint .`

## Phase 13: Question Screen (dedicated full-screen round UI)

### 13.1 Flow
- `HomeScreen` spin → `TruthDareModal` (player + TRUTH/DARE) → select type → **navigate to `Question` screen** → press NEXT → player name + countdown + question card → FORFEIT / NAILED IT → record result → back to wheel

### 13.2 GameContext – round counter
- Add `round` state (init 1); increment in `selectType` (each asked question = one round); reset in `resetGame()`/`endGame()`; expose in context

### 13.3 TruthDareModal simplified
- Strip question-display/timer branches (moved to QuestionScreen); keep type selection only
- Add `onSelectType` prop → after `selectType(type)` → `onClose()` → `onSelectType?.()`

### 13.4 New QuestionScreen (`src/screens/QuestionScreen.tsx`)
- Header: Back button, `ROUND {n}`, Question Type pill (→ `QuestionType` with `{ source: 'game' }`), Leaderboard button (🏆 → modal)
- READY stage: avatar, player name, "IT'S YOUR TURN", TRUTH/DARE badge, **NEXT**
- PLAY stage: player name + countdown (App Host = 60s; Player Host = `turnTimer`, none if 0) + `ResultCard` + FORFEIT / NAILED IT
- Timer colors: >10 teal, >5 orange, ≤5 red; `result` sound + haptic at 0
- FORFEIT/NAILED IT → `completeDare(false/true)` → `goBack()`

### 13.5 LeaderboardModal (`src/components/LeaderboardModal.tsx`)
- Transparent modal with sorted standings (medals top 3, close button)

### 13.6 QuestionTypeScreen changes
- Seed `selected` from context `questionTypes` (mid-game reopen shows current picks)
- CONTINUE → if `route.params.source === 'game'` → `setQuestionTypes` + `goBack()`; else `PlayerSetup` (setup flow unchanged)

### 13.7 Wiring
- Register `Question` screen in `AppNavigator.tsx`; export from `src/index.ts`
- Verify with `npx tsc --noEmit` and `npx eslint .`

## Phase 14: In-game Player Management

### 14.1 GameContext – player actions
- Add `addPlayer(name): boolean` (non-empty, unique, max 10, `getRandomColor(players.length)`)
- Add `removePlayer(index): boolean` (min 2, delete `scores[name]`, clamp `selectedPlayerIndex`)
- Add `renamePlayer(index, newName): boolean` (non-empty, unique; migrate `scores` key)
- All read `players`/`scores` from context → wheel, leaderboard, turns sync automatically

### 14.2 New PlayerListModal (`src/components/PlayerListModal.tsx`)
- Header: `👥 PLAYERS` + count pill (`n / 10`) + close
- Add input + Quick Add (reuses `PRESET_NAMES`)
- Scrollable rows: avatar, name, inline rename (pencil → TextInput with tick/cancel), remove (x, confirm Alert)
- Alerts for duplicate name / max 10 / min 2

### 14.3 Header changes (`src/components/Header.tsx`)
- Right side becomes a row: `👥` Player List button + Settings button (46×46 surface)
- Opens `PlayerListModal` via local state

### 14.4 Verify
- `npx tsc --noEmit` and `npx eslint .`

## Tech Stack
- React Native 0.86 + TypeScript
- @shopify/restyle (theme)
- react-native-svg (bottle + wheel)
- @react-navigation/native-stack (navigation)
- Animated API (all animations)
