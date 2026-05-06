---
'@ankhorage/contracts': major
---

Replace the previous tone/mood/theme-recommendation model with canonical shared color contracts and deterministic color generation:

- Removed `COLOR_TONES`, `ColorTone`, `APP_MOODS`, `AppMood`, recommendation
  types/constants, and `suggestedColorTone`.
- Removed `ThemeModeConfig.colorTone`; `ThemeModeConfig` is now
  `{ primaryColor: string; harmony: ColorHarmony }`.
- Color APIs now live under `src/colors/` and are exported from
  `@ankhorage/contracts` and `@ankhorage/contracts/colors`.
- Generated swatches preserve the exact base/key color at step `500`.
- Neutral swatch generation is required, and `neutral[500] === neutralKeyColor`.
