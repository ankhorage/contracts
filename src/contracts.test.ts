import { readdir, readFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

import { COLOR_HARMONIES, type ColorHarmony } from '@ankhorage/color-theory';
import { describe, expect, it } from 'bun:test';

import {
  APP_CATEGORIES,
  type AppCategory,
  AUTH_PROVIDERS,
  AUTH_SIGN_IN_IDENTIFIERS,
  AUTH_SIGN_UP_POLICIES,
  type AuthFlowConfig,
  type AuthSpec,
  DEPLOYMENT_TARGETS,
  NAVIGATOR_TYPES,
  type ThemeConfig,
  type ThemeModeConfig,
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
    expect(theme.light.harmony).toBe('analogous');
  });

  it('ThemeModeConfig.harmony accepts all ColorHarmony values', () => {
    for (const harmony of COLOR_HARMONIES) {
      const config: ThemeModeConfig = { primaryColor: '#ff0000', harmony };
      expect(config.harmony).toBe(harmony);
    }
  });

  it('serialized theme contains only primaryColor and harmony fields', () => {
    const mode: ThemeModeConfig = { primaryColor: '#3366ff', harmony: 'complementary' };
    const keys = Object.keys(mode);
    expect(keys).toEqual(['primaryColor', 'harmony']);
  });

  it('does not ship color generation files from contracts', async () => {
    const srcEntries = await readdir(join(process.cwd(), 'src'), { withFileTypes: true });
    const names = srcEntries.map((entry) => entry.name);

    expect(names.includes('colors')).toBe(false);
    expect(names.includes('color-theory.ts')).toBe(false);
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
