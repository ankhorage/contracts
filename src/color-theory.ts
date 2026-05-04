export const COLOR_HARMONIES = [
  'monochromatic',
  'analogous',
  'complementary',
  'triadic',
  'tetradic',
  'splitComplementary',
] as const;

export type ColorHarmony = (typeof COLOR_HARMONIES)[number];

export const COLOR_TONES = [
  'neutral',
  'pastel',
  'earth',
  'mineral',
  'muted',
  'jewel',
  'fluorescent',
  'obsidian',
  'vaporwave',
  'monochromeAccent',
] as const;

export type ColorTone = (typeof COLOR_TONES)[number];

export const APP_MOODS = [
  'trustworthy',
  'calm',
  'focused',
  'playful',
  'premium',
  'energetic',
  'serious',
  'creative',
  'friendly',
  'technical',
] as const;

export type AppMood = (typeof APP_MOODS)[number];

export interface ColorToneLaneRecipe {
  backgroundTone: ColorTone;
  foregroundTone: ColorTone;
}

export interface ColorThemeRecommendation {
  appMood: AppMood;
  suggestedColorTone: ColorTone;
  suggestedHarmony: ColorHarmony;
  suggestedPrimaryHueDegrees?: number;
}
