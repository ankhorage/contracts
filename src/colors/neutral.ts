import { normalizeHueDegrees, oklchToHex, parseHexToOklch } from './culori';
import type { ColorHarmony, GeneratedHarmonyPalette } from './harmony';
import type { HexColor } from './hex';
import { type ColorSwatch, type ColorSwatchDiagnostics, generateColorSwatch } from './swatches';

export const MIN_HUEFUL_CHROMA = 0.015;

export interface NeutralSwatchResult {
  neutralKeyColor: HexColor;
  neutral: ColorSwatch;
  diagnostics: ColorSwatchDiagnostics;
}

function pickTintSourceHex(palette: GeneratedHarmonyPalette, harmony: ColorHarmony): HexColor {
  const byMapping: Partial<Record<ColorHarmony, HexColor | undefined>> = {
    monochromatic: palette.primary.color,
    complementary: palette.secondary?.color,
    analogous: palette.tertiary?.color,
    splitComplementary: palette.tertiary?.color,
    triadic: palette.tertiary?.color,
    tetradic: palette.tertiary?.color,
  };

  return (
    byMapping[harmony] ??
    palette.tertiary?.color ??
    palette.secondary?.color ??
    palette.primary.color
  );
}

function clampNumber(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function generateNeutralSwatch(palette: GeneratedHarmonyPalette): NeutralSwatchResult {
  const tintSourceHex = pickTintSourceHex(palette, palette.harmony);
  const tintSource = parseHexToOklch(tintSourceHex);

  const primary = parseHexToOklch(palette.primary.color);

  const preferGray = tintSource.c < MIN_HUEFUL_CHROMA;

  const hue = palette.harmony === 'monochromatic' ? primary.h : tintSource.h;
  const sourceChroma = palette.harmony === 'monochromatic' ? primary.c : tintSource.c;
  const neutralHue = preferGray ? 0 : normalizeHueDegrees(hue);
  const neutralChroma = preferGray ? 0 : clampNumber(sourceChroma * 0.06, 0.004, 0.012);

  const neutralLightness500 = 0.6;

  const neutralKeyColor = oklchToHex({
    mode: 'oklch',
    l: neutralLightness500,
    c: neutralChroma,
    h: neutralHue,
  });

  const { swatch, diagnostics } = generateColorSwatch(neutralKeyColor);

  return { neutralKeyColor, neutral: swatch, diagnostics };
}
