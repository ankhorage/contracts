import { readdir, readFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

import { describe, expect, it } from 'bun:test';

import { parseHexToOklch } from './colors/culori';
import {
  APP_CATEGORIES,
  type AppCategory,
  AUTH_PROVIDERS,
  AUTH_SIGN_IN_IDENTIFIERS,
  AUTH_SIGN_UP_POLICIES,
  type AuthFlowConfig,
  type AuthSpec,
  COLOR_HARMONIES,
  COLOR_SWATCH_BASE_STEP,
  COLOR_SWATCH_STEPS,
  DEPLOYMENT_TARGETS,
  generateColorSwatch,
  generateHarmonyPalette,
  generateNeutralSwatch,
  generateThemeModeColors,
  NAVIGATOR_TYPES,
  normalizeHexColorOrThrow,
  type ThemeConfig,
} from './index';

async function collectTypeScriptFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectTypeScriptFiles(path)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.ts')) {
      files.push(path);
    }
  }

  return files;
}

describe('contracts', () => {
  it('exports stable platform constants', () => {
    expect(NAVIGATOR_TYPES).toEqual(['stack', 'tabs', 'drawer']);
    expect(APP_CATEGORIES).toEqual([
      'books_reading',
      'business_productivity',
      'developer_tools',
      'education_learning',
      'entertainment_media',
      'finance_money',
      'food_drink',
      'games',
      'graphics_design',
      'health_fitness',
      'kids_family',
      'lifestyle',
      'medical',
      'music_audio',
      'navigation_travel',
      'news_magazines',
      'photo_video',
      'reference',
      'shopping_commerce',
      'social_community',
      'sports',
      'utilities_tools',
      'weather',
    ]);
    expect(DEPLOYMENT_TARGETS).toEqual(['minikube']);
    expect(AUTH_PROVIDERS).toEqual(['supabase']);
  });

  it('exports the app category union for template packages', () => {
    const category: AppCategory = 'developer_tools';
    expect(category).toBe('developer_tools');
  });

  it('accepts the current serialized theme config shape', () => {
    const theme: ThemeConfig = {
      id: 'theme-default',
      name: 'Default',
      light: {
        primaryColor: '#3366ff',
        harmony: 'analogous',
      },
      dark: {
        primaryColor: '#3366ff',
        harmony: 'analogous',
      },
    };

    expect(theme.light.primaryColor).toBe('#3366ff');
  });

  it('generates harmony palettes with expected role counts', () => {
    const primary = normalizeHexColorOrThrow('#3366ff');

    const expectedRoleCount: Record<(typeof COLOR_HARMONIES)[number], number> = {
      monochromatic: 1,
      complementary: 2,
      analogous: 3,
      splitComplementary: 3,
      triadic: 3,
      tetradic: 4,
    };

    for (const harmony of COLOR_HARMONIES) {
      const palette = generateHarmonyPalette(primary, harmony);
      expect(palette.colors.length).toBe(expectedRoleCount[harmony]);
    }
  });

  it('preserves the primary color exactly in harmony palettes', () => {
    const primary = normalizeHexColorOrThrow('#3366ff');
    const palette = generateHarmonyPalette(primary, 'triadic');

    expect(palette.primary.hex).toBe(primary);
    expect(palette.primary.source).toBe('selected');
    expect(palette.primary.hueDegrees).toBeGreaterThanOrEqual(0);
    expect(palette.primary.hueDegrees).toBeLessThan(360);
    expect(palette.secondary?.source).toBe('generated');
  });

  it('generates swatches with exactly 11 steps and preserves 500', () => {
    const base = normalizeHexColorOrThrow('#3366ff');
    const { swatch } = generateColorSwatch(base);

    expect(Object.keys(swatch).length).toBe(COLOR_SWATCH_STEPS.length);
    expect(swatch[COLOR_SWATCH_BASE_STEP]).toBe(base);
  });

  it('preserves lowercase primary colors at swatch step 500', () => {
    const primary = normalizeHexColorOrThrow('#3366ff');
    const generated = generateThemeModeColors({ primaryColor: primary, harmony: 'analogous' });

    expect(generated.swatches.primary[500]).toBe('#3366ff');
    expect(generated.primary.hex).toBe('#3366ff');
  });

  it('returns generated theme swatches with required neutral', () => {
    const primary = normalizeHexColorOrThrow('#3366ff');
    const generated = generateThemeModeColors({ primaryColor: primary, harmony: 'tetradic' });

    expect(generated.swatches.primary[500]).toBe(primary);
    expect(generated.swatches.secondary?.[500]).toBe(generated.secondary?.hex);
    expect(generated.swatches.tertiary?.[500]).toBe(generated.tertiary?.hex);
    expect(generated.swatches.quaternary?.[500]).toBe(generated.quaternary?.hex);
    expect(generated.swatches.neutral[500]).toBe(generated.neutral.neutralKeyColor);
  });

  it('generates neutral swatches for non-monochromatic harmonies', () => {
    const primary = normalizeHexColorOrThrow('#3366ff');
    const palette = generateHarmonyPalette(primary, 'triadic');
    const neutral = generateNeutralSwatch(palette);

    expect(neutral.neutral[500]).toBe(neutral.neutralKeyColor);
  });

  it('generates neutral swatches for monochromatic harmony with expected OKLCH policy', () => {
    const primary = normalizeHexColorOrThrow('#3366ff');
    const palette = generateHarmonyPalette(primary, 'monochromatic');
    const neutral = generateNeutralSwatch(palette);

    const primaryOklch = parseHexToOklch(primary);
    const neutralOklch = parseHexToOklch(neutral.neutralKeyColor);

    expect(Math.abs(neutralOklch.l - 0.6)).toBeLessThan(0.02);
    expect(neutralOklch.c).toBeGreaterThanOrEqual(0.004);
    expect(neutralOklch.c).toBeLessThanOrEqual(0.014);
    expect(Math.abs(neutralOklch.h - primaryOklch.h)).toBeLessThan(6);
    expect(neutral.neutral[500]).toBe(neutral.neutralKeyColor);
  });

  it('prefers a truly neutral gray for low-chroma tint sources', () => {
    const primary = normalizeHexColorOrThrow('#808080');
    const palette = generateHarmonyPalette(primary, 'analogous');
    const neutral = generateNeutralSwatch(palette);
    const neutralOklch = parseHexToOklch(neutral.neutralKeyColor);

    expect(neutralOklch.c).toBeLessThan(0.002);
  });

  it('reports weak swatch diagnostics without altering the base color', () => {
    const base = normalizeHexColorOrThrow('#FFFFFF');
    const { swatch, diagnostics } = generateColorSwatch(base);

    expect(swatch[500]).toBe(base);
    expect(diagnostics.isUsable).toBe(false);
    expect(diagnostics.warnings.length).toBeGreaterThan(0);
    expect(diagnostics.minAdjacentDelta).toBeLessThan(diagnostics.maxAdjacentDelta);
    expect(diagnostics.lightnessRange.max).toBeGreaterThanOrEqual(diagnostics.lightnessRange.min);
  });

  it('does not include forbidden src/colors files', async () => {
    const files = (await readdir(join(process.cwd(), 'src/colors'))).filter((name) =>
      name.endsWith('.ts'),
    );

    expect(files.sort()).toEqual(
      [
        'contrast.ts',
        'culori.ts',
        'harmony.ts',
        'hex.ts',
        'index.ts',
        'neutral.ts',
        'semantics.ts',
        'swatches.ts',
        'theme-config.ts',
      ].sort(),
    );
  });

  it('only src/colors/culori.ts imports culori', async () => {
    const colorsDir = join(process.cwd(), 'src/colors');
    const files = (await readdir(colorsDir)).filter((name) => name.endsWith('.ts'));

    for (const file of files) {
      const content = await readFile(join(colorsDir, file), 'utf8');
      const culoriSpec = 'cul' + 'ori';
      const importRegex = new RegExp(`\\bfrom\\s+['"]${culoriSpec}['"]`);
      const importsCulori = importRegex.test(content);

      if (file === 'culori.ts') {
        expect(importsCulori).toBe(true);
      } else {
        expect(importsCulori).toBe(false);
      }
    }
  });

  it('does not export the internal culori adapter from the public colors barrel', async () => {
    const content = await readFile(join(process.cwd(), 'src/colors/index.ts'), 'utf8');

    expect(content.includes('./culori')).toBe(false);
  });

  it('removes all old tone/mood/recommendation symbols from src recursively', async () => {
    const banned = [
      'Color' + 'Tone',
      'color' + 'Tone',
      'COLOR_' + 'TONES',
      'Color' + 'Mood',
      'App' + 'Mood',
      'APP_' + 'MOODS',
      'suggested' + 'Color' + 'Tone',
      'APP_CATEGORY_' + 'THEME_RECOMMENDATIONS',
    ];

    const srcFiles = await collectTypeScriptFiles(join(process.cwd(), 'src'));

    for (const file of srcFiles) {
      if (basename(file) === 'contracts.test.ts') continue;
      const content = await readFile(file, 'utf8');
      for (const symbol of banned) {
        expect(content.includes(symbol)).toBe(false);
      }
    }
  });

  it('accepts canonical auth flow config without legacy route fields', () => {
    const authFlow: AuthFlowConfig = {
      signInRoute: '/sign-in',
      signUpRoute: '/sign-up',
      signOutRoute: '/sign-out',
      forgotPasswordRoute: '/forgot-password',
      postSignInRoute: '/',
      unauthorizedRoute: '/sign-in',
    };

    const auth: AuthSpec = {
      scope: 'global',
      provider: 'supabase',
      authorization: { kind: 'RBAC', engine: 'cerbos' },
      flow: authFlow,
      signIn: { identifiers: ['email'] },
      signUp: {
        requiredFields: ['email', 'password'],
        optionalFields: ['displayName'],
        signUpPolicy: 'requireVerification',
      },
    };

    expect(AUTH_SIGN_IN_IDENTIFIERS).toEqual(['email', 'username', 'phone']);
    expect(AUTH_SIGN_UP_POLICIES).toEqual(['autoSignIn', 'requireVerification']);
    expect(auth.flow?.signInRoute).toBe('/sign-in');
    expect(auth.signUp?.signUpPolicy).toBe('requireVerification');
  });
});
