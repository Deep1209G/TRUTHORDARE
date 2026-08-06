# Plan: Bottle Selection Bottom Sheet in GameScreen

## Goal
In `GameScreen`, when the user clicks on the bottle button (located at the bottom below the play button), open a modern, interactive **Bottom Sheet** displaying multiple bottle options. Selecting a bottle updates the active bottle on the `GameBoard` in real time.

---

## Proposed Architecture & Workflow

```mermaid
flowchart TD
    A[GameScreen Bottle Button] -->|onPress| B[Set isBottleSheetVisible = true]
    B --> C[BottleBottomSheet Modal Slides Up]
    C --> D[Display Grid of 8 Bottle Designs]
    D -->|User Selects Bottle| E[Call setSelectedBottleId in GameContext]
    E --> F[Play Haptic & Sound Feedback]
    E --> G[GameBoard Renders Selected Bottle Image]
    C -->|Close Button or Backdrop Press| H[Dismiss Bottom Sheet]
```

---

## Files to Create & Modify

1. **`src/data/bottles.ts`** *(New)*
   - Define catalog of 7 available bottles utilizing assets in `src/assets/bottle_stock/`:
     - **Bottle 1** (`b1.png`) — `#7C5CFF`
     - **Bottle 2** (`b2.png`) — `#38BDF8`
     - **Bottle 3** (`b3.png`) — `#A855F7`
     - **Bottle 4** (`b4.png`) — `#10B981`
     - **Bottle 5** (`b5.png`) — `#EC4899`
     - **Bottle 6** (`b6.png`) — `#F59E0B`
     - **Bottle 7** (`b7.png`) — `#EF4444`

2. **`src/context/GameContext.tsx`** *(Modify)*
   - Add `selectedBottleId` state (default `'b1'`).
   - Expose `selectedBottle` object and `setSelectedBottleId` method in `GameContextType`.

3. **`src/components/GameBoard.tsx`** *(Modify)*
   - Replace static `vodka.png` source with `selectedBottle.image` from `useGame()`.

4. **`src/components/BottleBottomSheet.tsx`** *(New)*
   - Slide-up bottom sheet modal using React Native `<Modal>`.
   - Semi-transparent backdrop + smooth sheet container with handle bar, header title, and close button.
   - 2-column responsive grid showing bottle preview images with glowing accent borders, bottle name, and active badge.

5. **`src/screens/GameScreen.tsx`** *(Modify)*
   - State `isBottleSheetVisible` (`useState(false)`).
   - Update bottle button `onPress` to trigger sound, haptic tap, and set `isBottleSheetVisible(true)`.
   - Render `<BottleBottomSheet visible={isBottleSheetVisible} onClose={() => setIsBottleSheetVisible(false)} />`.

6. **`src/i18n/locales/en.json`, `hi.json`, `gu.json`** *(Modify)*
   - Add localized keys for `bottles.title`, `bottles.subtitle`, and individual bottle names.

---

## Execution Steps

- [x] **Step 1**: Create `src/data/bottles.ts` with all 8 bottle configs.
- [x] **Step 2**: Update `src/context/GameContext.tsx` to handle bottle selection state.
- [x] **Step 3**: Update `src/components/GameBoard.tsx` to display selected bottle dynamically.
- [x] **Step 4**: Create `src/components/BottleBottomSheet.tsx` component.
- [x] **Step 5**: Update `src/screens/GameScreen.tsx` to connect bottle button to bottom sheet.
- [x] **Step 6**: Add translation strings in `en.json`, `hi.json`, and `gu.json`.
- [x] **Step 7**: Verify build & TypeScript compilation.
