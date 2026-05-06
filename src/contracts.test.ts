import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { describe, expect, it } from 'bun:test';

import {
  APP_CATEGORIES,
  type AppCategory,
  AUTH_PROVIDERS,
  AUTH_SIGN_IN_IDENTIFIERS,
  AUTH_SIGN_UP_POLICIES,
  type AuthAdapter,
  type AuthFlowConfig,
  type AuthSpec,
  COLOR_HARMONIES,
  COLOR_SWATCH_BASE_STEP,
  COLOR_SWATCH_STEPS,
  type DbAdapter,
  DEPLOYMENT_TARGETS,
  generateColorSwatch,
  generateHarmonyPalette,
  generateNeutralSwatch,
  NAVIGATOR_TYPES,
  normalizeHexColorOrThrow,
  parseHexToOklch,
  type SignInInput,
  type ThemeConfig,
} from './index';

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
      const roles = [
        palette.primary,
        palette.secondary,
        palette.tertiary,
        palette.quaternary,
      ].filter(Boolean);
      expect(roles.length).toBe(expectedRoleCount[harmony]);
    }
  });

  it('preserves the primary color exactly in harmony palettes', () => {
    const primary = normalizeHexColorOrThrow('#3366ff');
    const palette = generateHarmonyPalette(primary, 'triadic');
    expect(palette.primary.color).toBe(primary);
  });

  it('generates swatches with exactly 11 steps and preserves 500', () => {
    const base = normalizeHexColorOrThrow('#3366ff');
    const { swatch } = generateColorSwatch(base);

    expect(Object.keys(swatch).length).toBe(COLOR_SWATCH_STEPS.length);
    expect(swatch[COLOR_SWATCH_BASE_STEP]).toBe(base);
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
    expect(diagnostics.warnings.length).toBeGreaterThan(0);
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

  it('removes all old tone/mood/recommendation symbols from src', async () => {
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

    const srcDir = join(process.cwd(), 'src');
    const srcFiles = (await readdir(srcDir)).filter((name) => name.endsWith('.ts'));

    for (const file of srcFiles) {
      if (file === 'contracts.test.ts') continue;
      const content = await readFile(join(srcDir, file), 'utf8');
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

  it('accepts provider-neutral auth and db adapter implementations', async () => {
    const authAdapter: AuthAdapter = {
      capabilities: {
        signInIdentifiers: ['email'],
        supportsSignUp: true,
        supportsPasswordReset: true,
        supportsOtp: false,
        supportsSessionRefresh: true,
      },
      async signIn(input: SignInInput) {
        await new Promise((resolve) => setTimeout(resolve, 1));
        return {
          ok: true,
          data: {
            accessToken: `token:${input.identifier.value}`,
            user: {
              id: 'user-1',
              email: input.identifier.value,
            },
          },
        };
      },
      async signUp(input) {
        await new Promise((resolve) => setTimeout(resolve, 1));
        return {
          ok: true,
          data: {
            id: 'user-1',
            email: input.identifier.value,
          },
        };
      },
      async signOut() {
        await new Promise((resolve) => setTimeout(resolve, 1));
        return { ok: true };
      },
      async getSession() {
        await new Promise((resolve) => setTimeout(resolve, 1));
        return { ok: true, data: null };
      },
    };

    const dbAdapter: DbAdapter = {
      async select() {
        await new Promise((resolve) => setTimeout(resolve, 1));
        return { ok: true, data: [] };
      },
      async findById() {
        await new Promise((resolve) => setTimeout(resolve, 1));
        return { ok: true, data: null };
      },
      async insert(input) {
        const values = Array.isArray(input.values) ? input.values : [input.values];
        await new Promise((resolve) => setTimeout(resolve, 1));
        return { ok: true, data: values };
      },
      async update() {
        await new Promise((resolve) => setTimeout(resolve, 1));
        return { ok: true, data: [] };
      },
      async delete() {
        await new Promise((resolve) => setTimeout(resolve, 1));
        return { ok: true, data: [] };
      },
    };

    const signInResult = await authAdapter.signIn({
      identifier: { kind: 'email', value: 'hello@example.com' },
      password: 'secret',
    });
    const selectResult = await dbAdapter.select({ table: 'profiles' });

    expect(signInResult.ok).toBe(true);
    expect(selectResult.ok).toBe(true);
  });
});
