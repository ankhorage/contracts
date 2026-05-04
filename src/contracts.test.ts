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
  type DbAdapter,
  DEPLOYMENT_TARGETS,
  NAVIGATOR_TYPES,
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
        colorTone: 'neutral',
      },
      dark: {
        primaryColor: '#3366ff',
        harmony: 'analogous',
        colorTone: 'neutral',
      },
    };

    expect(theme.light.primaryColor).toBe('#3366ff');
    expect(theme.dark.colorTone).toBe('neutral');
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
        return { ok: true, data: [{ id: 'row-1' }] };
      },
      async findById() {
        await new Promise((resolve) => setTimeout(resolve, 1));
        return { ok: true, data: { id: 'row-1' } };
      },
      async insert(input) {
        const values = Array.isArray(input.values) ? input.values : [input.values];
        await new Promise((resolve) => setTimeout(resolve, 1));
        return { ok: true, data: values };
      },
      async update(input) {
        await new Promise((resolve) => setTimeout(resolve, 1));
        return { ok: true, data: [input.values] };
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
