---
'@ankhorage/contracts': major
---

Remove the old tone/mood/theme-recommendation contracts and keep theme config serialized-only:

- Removed `COLOR_TONES`, `ColorTone`, `APP_MOODS`, `AppMood`, recommendation
  types/constants, and `suggestedColorTone`.
- Removed `ThemeModeConfig.colorTone`; `ThemeModeConfig` is now
  `{ primaryColor: string; harmony: string }`.
- Removed the legacy `@ankhorage/contracts/color-theory` export.
- Removed color generation, swatch, contrast, neutral, and semantic color APIs from
  Contracts; color generation now belongs in `@ankhorage/color-theory`.
- Removed the Contracts dependency on `culori`.
