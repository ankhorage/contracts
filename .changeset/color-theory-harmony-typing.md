---
'@ankhorage/contracts': minor
---

`ThemeModeConfig.harmony` now uses `ColorHarmony` from `@ankhorage/color-theory` instead of `string`.

- `ThemeModeConfig.harmony` is now typed as `ColorHarmony` (one of `"monochromatic"`, `"analogous"`, `"complementary"`, `"triadic"`, `"tetradic"`, `"splitComplementary"`).
- `ColorHarmony` is re-exported as a type-only export from the root entrypoint.
- Color generation helpers (`generateHarmonyRoleColors`, `generateThemeModeColors`, etc.) are not exported from Contracts; consumers must import them from `@ankhorage/color-theory` directly.
- Old tone/mood/recommendation APIs (`ColorTone`, `AppMood`, `APP_MOODS`, etc.) are not present in this package.
