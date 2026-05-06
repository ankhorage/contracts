import { normalizeHueDegrees, oklchToHex, parseHexToOklch } from './culori';
import type { HexColor } from './hex';

export const COLOR_HARMONIES = [
  'monochromatic',
  'analogous',
  'complementary',
  'triadic',
  'tetradic',
  'splitComplementary',
] as const;

export type ColorHarmony = (typeof COLOR_HARMONIES)[number];

export type GeneratedColorRole = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

export interface GeneratedHarmonyColor {
  role: GeneratedColorRole;
  color: HexColor;
  hueOffsetDegrees: number;
}

export interface GeneratedHarmonyPalette {
  harmony: ColorHarmony;
  primary: GeneratedHarmonyColor;
  secondary?: GeneratedHarmonyColor;
  tertiary?: GeneratedHarmonyColor;
  quaternary?: GeneratedHarmonyColor;
}

const ROLE_ORDER_BY_HARMONY: Record<ColorHarmony, GeneratedColorRole[]> = {
  monochromatic: ['primary'],
  complementary: ['primary', 'secondary'],
  analogous: ['primary', 'secondary', 'tertiary'],
  splitComplementary: ['primary', 'secondary', 'tertiary'],
  triadic: ['primary', 'secondary', 'tertiary'],
  tetradic: ['primary', 'secondary', 'tertiary', 'quaternary'],
};

const OFFSETS_BY_HARMONY: Record<ColorHarmony, number[]> = {
  monochromatic: [0],
  analogous: [0, -30, 30],
  complementary: [0, 180],
  splitComplementary: [0, 150, 210],
  triadic: [0, 120, 240],
  tetradic: [0, 90, 180, 270],
};

export function generateHarmonyPalette(
  primaryColor: HexColor,
  harmony: ColorHarmony,
): GeneratedHarmonyPalette {
  const base = parseHexToOklch(primaryColor);
  const roles = ROLE_ORDER_BY_HARMONY[harmony];
  const offsets = OFFSETS_BY_HARMONY[harmony];

  const primary: GeneratedHarmonyColor = {
    role: 'primary',
    color: primaryColor,
    hueOffsetDegrees: 0,
  };
  const palette: GeneratedHarmonyPalette = { harmony, primary };

  for (let index = 1; index < roles.length; index++) {
    const role = roles[index];
    if (!role) continue;
    const hueOffsetDegrees = offsets[index] ?? 0;
    const rotatedHue = normalizeHueDegrees(base.h + hueOffsetDegrees);
    const rotatedHex = oklchToHex({ ...base, h: rotatedHue });

    const generated: GeneratedHarmonyColor = { role, color: rotatedHex, hueOffsetDegrees };

    if (role === 'secondary') palette.secondary = generated;
    if (role === 'tertiary') palette.tertiary = generated;
    if (role === 'quaternary') palette.quaternary = generated;
  }

  return palette;
}
