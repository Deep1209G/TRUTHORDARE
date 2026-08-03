# Plan: Gemini-generated questions for App Host mode

## Goal
In **App Host** mode (`gameMode === 'standard'`), generate Truth/Dare questions with Gemini instead of only serving the static decks. **Player Host** mode is unchanged (it already uses "Make up a …"). Questions are generated in **English**, in **batch** (~10 per call), with **fallback to the existing static questions** on any error/offline.

## Architecture
Direct client-side call to the Gemini REST API via **axios** (added to `package.json`). API key lives in a config file.

- **Model:** `gemini-3.5-flash` (cheap + fast; constant, easy to change).
- **Endpoint:** `POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}`.
- **Structured output:** use `responseMimeType: "application/json"` + `responseSchema: { questions: [{ text: string }] }` so results parse reliably.
- **HTTP client:** `axios.post(url, payload, { timeout: 15000 })`; any thrown axios error / non-2xx / malformed body returns `[]` → static fallback.

## Files & changes

1. **`src/config/gemini.ts`** (new)
   - `export const GEMINI_API_KEY = 'YOUR_GEMINI_KEY';` with placeholder.
   - `export const GEMINI_MODEL = 'gemini-3.5-flash';`
   - Add a note in code that a placeholder key disables AI (graceful fallback). This avoids breaking builds on fresh clones instead of gitignoring the file.

2. **`src/services/GeminiService.ts`** (new)
   - `generateQuestions({ type, ageGroup, difficulty, questionTypes, count, exclude }): Promise<Question[]>`
   - Builds a prompt: "Party-game Truth/Dare question, one short sentence, age-appropriate for `{ageGroup}` (`kids`=never spicy, `teens`, `adults`), intensity `{difficulty}`, only types from `{questionTypes}`, English, unique vs. excluded list, output JSON array."
   - Calls Gemini with `axios.post` (15s timeout); axios auto-deserializes the JSON body.
   - Validates the response: `JSON.parse` the `candidates[0].content.parts[0].text`, checks shape/fields, dedupes against `exclude`, trims to `count`.
   - Returns `[]` on any failure (network, non-2xx, timeout, bad JSON, missing key).

3. **`src/context/GameContext.tsx`** (core integration)
   - New state: `aiDecks: { truth: Question[]; dare: Question[] }`, `aiIndex`, `aiLoading`, `aiUsed: string[]` (texts already shown this session to avoid repeats).
   - In `selectType` for `standard` mode:
     - If AI deck for that type is exhausted (or below a refill threshold like 3), kick off async `generateQuestions` (batch of 10), set `aiLoading = true`, fall back to static `buildPool` if the fetch returns `[]`.
     - Otherwise pop the next AI question and append it to `aiUsed`.
     - Keep the existing static-deck path as the failure fallback (exactly today's logic).
   - Expose `aiLoading` on the context so the UI can show a loading state.

4. **`src/screens/QuestionScreen.tsx`**
   - When `aiLoading` is true, render a spinner + "Generating your Truth/Dare…" instead of the `ResultCard` (today it returns `null` on empty `currentQuestion`, which would flash).

5. **`__tests__/GeminiService.test.ts`** (new)
   - Mock `axios` (`jest.mock('axios')`) and the gemini config module: valid JSON response → parsed `Question[]`; malformed JSON → `[]`; request rejection → `[]`; missing text → `[]`; placeholder/unconfigured key → `[]` (no call made).

## Behavior summary
- Player picks Truth or Dare → if AI deck has a question, show instantly; otherwise generate a new batch (spinner shows ~1–2 s) → on failure, silently serve the static deck.
- English only; respects `ageGroup`, `difficulty` (mild/medium/wild), and selected `questionTypes` in the prompt.
- No repeats within a game session; refill happens before the deck runs dry.

## Verification
- `npm run lint`, `npx tsc --noEmit`, `npm test`.
- Manual: play an App Host game on Android/iOS with a real key; kill network mid-game to confirm static fallback.

## Notes / caveats
- The API key is embedded in the app binary (extractable). Fine for personal use; if you later ship to the App Store, the `GeminiService` interface is designed to swap to a backend proxy without touching the UI.
