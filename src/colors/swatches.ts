import { deltaEoklch, oklchToHex, parseHexToOklch } from './culori';
import type { HexColor } from './hex';

export const COLOR_SWATCH_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
export type ColorSwatchStep = (typeof COLOR_SWATCH_STEPS)[number];

export const COLOR_SWATCH_BASE_STEP = 500 as const;

export type ColorSwatch = Record<ColorSwatchStep, HexColor>;

export type ColorSwatchWarningCode = 'weak_step';

export interface ColorSwatchWarning {
  code: ColorSwatchWarningCode;
  step: ColorSwatchStep;
  message: string;
  deltaEFromBase: number;
}

export interface ColorSwatchDiagnostics {
  warnings: ColorSwatchWarning[];
}

const BASELINE_LIGHTNESS_BY_STEP: Record<ColorSwatchStep, number> = {
  50: 0.985,
  100: 0.967,
  200: 0.928,
  300: 0.872,
  400: 0.707,
  500: 0.551,
  600: 0.446,
  700: 0.373,
  800: 0.278,
  900: 0.21,
  950: 0.13,
};

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function chromaMultiplierForStep(step: ColorSwatchStep): number {
  if (step <= 200) return 0.55;
  if (step <= 400) return 0.75;
  if (step === 500) return 1;
  if (step <= 700) return 0.9;
  return 0.8;
}

export function generateColorSwatch(baseColor: HexColor): {
  swatch: ColorSwatch;
  diagnostics: ColorSwatchDiagnostics;
} {
  const baseOklch = parseHexToOklch(baseColor);
  const baseOffset = baseOklch.l - BASELINE_LIGHTNESS_BY_STEP[500];

  const warnings: ColorSwatchWarning[] = [];
  const swatch = {} as ColorSwatch;

  for (const step of COLOR_SWATCH_STEPS) {
    if (step === COLOR_SWATCH_BASE_STEP) {
      swatch[step] = baseColor;
      continue;
    }

    const targetL = clamp01(BASELINE_LIGHTNESS_BY_STEP[step] + baseOffset);
    const targetC = clamp01(baseOklch.c * chromaMultiplierForStep(step));
    const target = { ...baseOklch, l: targetL, c: targetC };
    const hex = oklchToHex(target);
    swatch[step] = hex;

    const candidateOklch = parseHexToOklch(hex);
    const deltaEFromBase = deltaEoklch(baseOklch, candidateOklch);
    if (deltaEFromBase < 0.02) {
      warnings.push({
        code: 'weak_step',
        step,
        deltaEFromBase,
        message: `Swatch step ${step} is visually close to the base color.`,
      });
    }
  }

  return { swatch, diagnostics: { warnings } };
}
