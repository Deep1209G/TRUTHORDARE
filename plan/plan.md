# Plan: DeviceHelper (useDeviceHelper)

## Goal
Create a production-ready, reusable DeviceHelper for the React Native (TypeScript) app using **only React Native Core APIs** (no `react-native-device-info`, `react-native-size-matters`, or `react-native-responsive-screen`). Implemented as a custom hook `useDeviceHelper` that auto-updates on screen resize / rotation.

## Approach
- **`useWindowDimensions()`** for reactive `width`, `height`, `scale`, `fontScale` (re-renders the hook on any size/orientation/font-scale change).
- **`Platform`** for Android/iOS detection.
- **`useMemo`** keyed on `[width, height, scale, fontScale]` → stable return-object identity between changes.

## Files & changes

1. **`src/hooks/useDeviceHelper.ts`** (new — `src/hooks/` dir doesn't exist yet)
   - Imports: `useMemo` from `react`; `Platform`, `StatusBar`, `PixelRatio`, `useWindowDimensions` from `react-native`.
   - Exports:
     - `UseDeviceHelperOptions` — `{ tabletMinWidth?: number; smallDeviceMaxHeight?: number; expandedMinWidth?: number }` (defaults `600` / `667` / `840`).
     - `UseDeviceHelperResult` — the return object (below).
     - `DeviceOrientation` = `'portrait' | 'landscape'`; `DeviceSizeClass` = `'compact' | 'medium' | 'expanded'`.
   - Return object (computed in `useMemo`):
     | Field | Source |
     |---|---|
     | `width`, `height` | `useWindowDimensions()` |
     | `isIOS`, `isAndroid`, `platform` | `Platform.OS === 'ios' / 'android'` |
     | `osVersion` | `Platform.Version` |
     | `isPad` | `Platform.OS === 'ios' ? Platform.isPad : false` (typed only on iOS variant) |
     | `isTablet` | `isPad \|\| shortEdge >= tabletMinWidth` |
     | `isPhone` | `!isTablet` |
     | `isSmallDevice` | `!isTablet && height <= smallDeviceMaxHeight` |
     | `isLandscape` / `isPortrait` | `width > height` / otherwise |
     | `orientation` | derived from above |
     | `shortEdge` / `longEdge` | `Math.min/max(width, height)` |
     | `sizeClass` | Material-style on `shortEdge`: compact `<600`, medium `600–840`, expanded `≥840` |
     | `pixelRatio` | `PixelRatio.get()` |
     | `scale`, `fontScale` | from `useWindowDimensions` (reactive to OS font-size too) |
     | `statusBarHeight` | Android: `StatusBar.currentHeight ?? 0`; iOS: `isNotched ? 44 : 20` |
     | `isNotched` | iOS heuristic `height >= 812`; Android heuristic `(StatusBar.currentHeight ?? 0) > 24` |
   - **Notes:**
     - `statusBarHeight` / `isNotched` are Core-API heuristics; the app already uses `react-native-safe-area-context` for real insets — these are convenience, not a replacement.
     - No barrel export added to `src/index.ts` (consistent with services); consumers import directly.

2. **`__tests__/useDeviceHelper.test.tsx`** (new)
   - Uses existing `react-test-renderer` + jest (no new deps).
   - `jest.mock('react-native', ...)` to spy `useWindowDimensions`; reassign `Platform.OS` per test; harness component captures the returned object.
   - Cases: portrait vs. landscape flags, tablet vs. phone vs. small-device detection at mocked dimensions, `sizeClass` boundaries, `isIOS`/`isAndroid`.

## Verification
- `npx tsc --noEmit`
- `npm run lint`
- `npm test` (new test + existing suite)

## Open decisions (defaults chosen)
- **Notch/status-bar heuristics**: included, clearly heuristic (no device-info). Can drop if undesired.
- **No code comments** per repo convention; can add brief JSDoc to exported types if requested.
