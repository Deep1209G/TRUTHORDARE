# PlayerSetupScreen Redesign

## Overview
Redesign the Player Setup screen with a prominent circular **+** button that opens a modal for adding players. Includes Quick Add preset names. Start Game is disabled until ≥ 2 players.

## Steps

### 1. Main Screen Layout
- Top: Back `<` button + title "TRUTH OR DARE" / "ADD PLAYERS"
- **Circular + button** centered near top — taps open the Add Player modal
- **Empty state**: subtle "No players added yet" text when no players exist
- **Player list** (FlatList): each row = avatar circle + name + red x remove button
- **START GAME** at bottom — gray/disabled when < 2, purple + glow when ≥ 2
- Player count: "0 / 10 players"

### 2. Add Player Modal (triggered by + button)
- Dark overlay + centered card matching TruthDareModal style
- **TextInput** with placeholder "Enter name..."
- **"Add Player" button** — validates: non-empty, no duplicates, max 10; adds to in-modal preview list
- **"Quick Add" button** — picks a random name from `PRESET_NAMES` not already added
- **Preview list** inside the modal showing names added so far (each with x to remove)
- **"Done" button** — closes modal, merges modal players into the main screen list

### 3. State
| State | Type | Description |
|---|---|---|
| `modalVisible` | `boolean` | Show/hide the modal |
| `newName` | `string` | TextInput value inside the modal |
| `modalPlayers` | `Player[]` | Players added during this modal session (not yet committed) |
| `players` | `Player[]` | Final list of players on the main screen |

### 4. Behavior
- Tapping **+** opens modal with empty input and empty preview
- **Add Player** validates → appends to `modalPlayers`, clears input
- **Quick Add** picks a random unused preset → appends to `modalPlayers`
- Tap **x** on a preview row removes from `modalPlayers`
- **Done** → merges `modalPlayers` into `players` → closes modal
- **x** on main screen row removes from `players`
- **START GAME** disabled when `players.length < 2`

### 5. Files to modify
- `src/screens/PlayerSetupScreen.tsx` — full rewrite
