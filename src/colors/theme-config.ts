import type { ThemeConfig, ThemeModeConfig } from '../types';
import { type GeneratedHarmonyPalette, generateHarmonyPalette } from './harmony';
import type { HexColor } from './hex';
import { normalizeHexColorOrThrow } from './hex';
import { generateNeutralSwatch, type NeutralSwatchResult } from './neutral';
import { type ColorSwatch, generateColorSwatch } from './swatches';

export interface GeneratedThemeModeColors {
  primary: { color: HexColor; swatch: ColorSwatch };
  secondary?: { color: HexColor; swatch: ColorSwatch };
  tertiary?: { color: HexColor; swatch: ColorSwatch };
  quaternary?: { color: HexColor; swatch: ColorSwatch };
  harmonyPalette: GeneratedHarmonyPalette;
  neutral: NeutralSwatchResult;
}

export function getThemeModePrimaryHex(mode: ThemeModeConfig): HexColor {
  return normalizeHexColorOrThrow(mode.primaryColor);
}

export function generateThemeModeColors(mode: ThemeModeConfig): GeneratedThemeModeColors {
  const primaryHex = getThemeModePrimaryHex(mode);
  const harmonyPalette = generateHarmonyPalette(primaryHex, mode.harmony);

  const primarySwatch = generateColorSwatch(harmonyPalette.primary.color).swatch;
  const secondarySwatch = harmonyPalette.secondary
    ? generateColorSwatch(harmonyPalette.secondary.color).swatch
    : undefined;
  const tertiarySwatch = harmonyPalette.tertiary
    ? generateColorSwatch(harmonyPalette.tertiary.color).swatch
    : undefined;
  const quaternarySwatch = harmonyPalette.quaternary
    ? generateColorSwatch(harmonyPalette.quaternary.color).swatch
    : undefined;

  const neutral = generateNeutralSwatch(harmonyPalette);

  return {
    harmonyPalette,
    neutral,
    primary: { color: harmonyPalette.primary.color, swatch: primarySwatch },
    ...(harmonyPalette.secondary && secondarySwatch
      ? { secondary: { color: harmonyPalette.secondary.color, swatch: secondarySwatch } }
      : {}),
    ...(harmonyPalette.tertiary && tertiarySwatch
      ? { tertiary: { color: harmonyPalette.tertiary.color, swatch: tertiarySwatch } }
      : {}),
    ...(harmonyPalette.quaternary && quaternarySwatch
      ? { quaternary: { color: harmonyPalette.quaternary.color, swatch: quaternarySwatch } }
      : {}),
  };
}

export function generateThemeConfigColors(theme: ThemeConfig): {
  light: GeneratedThemeModeColors;
  dark: GeneratedThemeModeColors;
} {
  return {
    light: generateThemeModeColors(theme.light),
    dark: generateThemeModeColors(theme.dark),
  };
}
