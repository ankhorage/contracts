import type { AppCategory } from './types';

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

export interface AppCategoryThemeRecommendation extends ColorThemeRecommendation {
  appCategory: AppCategory;
}

export const APP_CATEGORY_THEME_RECOMMENDATIONS = {
  finance_money: {
    appCategory: 'finance_money',
    appMood: 'trustworthy',
    suggestedColorTone: 'mineral',
    suggestedHarmony: 'analogous',
    suggestedPrimaryHueDegrees: 195,
  },
  health_fitness: {
    appCategory: 'health_fitness',
    appMood: 'calm',
    suggestedColorTone: 'pastel',
    suggestedHarmony: 'analogous',
    suggestedPrimaryHueDegrees: 155,
  },
  developer_tools: {
    appCategory: 'developer_tools',
    appMood: 'focused',
    suggestedColorTone: 'obsidian',
    suggestedHarmony: 'analogous',
    suggestedPrimaryHueDegrees: 220,
  },
  graphics_design: {
    appCategory: 'graphics_design',
    appMood: 'creative',
    suggestedColorTone: 'vaporwave',
    suggestedHarmony: 'splitComplementary',
    suggestedPrimaryHueDegrees: 305,
  },
  social_community: {
    appCategory: 'social_community',
    appMood: 'friendly',
    suggestedColorTone: 'jewel',
    suggestedHarmony: 'triadic',
    suggestedPrimaryHueDegrees: 265,
  },
} as const satisfies Partial<Record<AppCategory, AppCategoryThemeRecommendation>>;
