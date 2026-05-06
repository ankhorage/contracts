import type { ThemeConfig, ThemeModeConfig } from '../types';
import { type GeneratedHarmonyPalette, generateHarmonyPalette } from './harmony';
import type { HexColor } from './hex';
import { normalizeHexColorOrThrow } from './hex';
import { generateNeutralSwatch, type NeutralSwatchResult } from './neutral';
import { type ColorSwatch, generateColorSwatch } from './swatches';

export interface GeneratedThemeSwatches {
  primary: ColorSwatch;
  secondary?: ColorSwatch;
  tertiary?: ColorSwatch;
  quaternary?: ColorSwatch;
  neutral: ColorSwatch;
}

export interface GeneratedThemeModeColors {
  harmonyPalette: GeneratedHarmonyPalette;
  swatches: GeneratedThemeSwatches;
  primary: { hex: HexColor; swatch: ColorSwatch };
  secondary?: { hex: HexColor; swatch: ColorSwatch };
  tertiary?: { hex: HexColor; swatch: ColorSwatch };
  quaternary?: { hex: HexColor; swatch: ColorSwatch };
  neutral: NeutralSwatchResult;
}

export function getThemeModePrimaryHex(mode: ThemeModeConfig): HexColor {
  return normalizeHexColorOrThrow(mode.primaryColor);
}

export function generateThemeModeColors(mode: ThemeModeConfig): GeneratedThemeModeColors {
  const primaryHex = getThemeModePrimaryHex(mode);
  const harmonyPalette = generateHarmonyPalette(primaryHex, mode.harmony);

  const primarySwatch = generateColorSwatch(harmonyPalette.primary.hex).swatch;
  const secondarySwatch = harmonyPalette.secondary
    ? generateColorSwatch(harmonyPalette.secondary.hex).swatch
    : undefined;
  const tertiarySwatch = harmonyPalette.tertiary
    ? generateColorSwatch(harmonyPalette.tertiary.hex).swatch
    : undefined;
  const quaternarySwatch = harmonyPalette.quaternary
    ? generateColorSwatch(harmonyPalette.quaternary.hex).swatch
    : undefined;

  const neutral = generateNeutralSwatch(harmonyPalette);
  const swatches: GeneratedThemeSwatches = {
    primary: primarySwatch,
    neutral: neutral.neutral,
    ...(secondarySwatch ? { secondary: secondarySwatch } : {}),
    ...(tertiarySwatch ? { tertiary: tertiarySwatch } : {}),
    ...(quaternarySwatch ? { quaternary: quaternarySwatch } : {}),
  };

  return {
    harmonyPalette,
    swatches,
    neutral,
    primary: { hex: harmonyPalette.primary.hex, swatch: primarySwatch },
    ...(harmonyPalette.secondary && secondarySwatch
      ? { secondary: { hex: harmonyPalette.secondary.hex, swatch: secondarySwatch } }
      : {}),
    ...(harmonyPalette.tertiary && tertiarySwatch
      ? { tertiary: { hex: harmonyPalette.tertiary.hex, swatch: tertiarySwatch } }
      : {}),
    ...(harmonyPalette.quaternary && quaternarySwatch
      ? { quaternary: { hex: harmonyPalette.quaternary.hex, swatch: quaternarySwatch } }
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
