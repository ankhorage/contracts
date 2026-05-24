import { describe, expect, it } from 'bun:test';

import {
  AUTH_OAUTH_PROVIDER_IDS,
  type AuthAdapter,
  type AuthOAuthConfig,
  type AuthSpec,
} from './index';

describe('OAuth auth contracts', () => {
  it('accepts provider-neutral OAuth provider config on auth specs', () => {
    const oauth: AuthOAuthConfig = {
      enabled: true,
      callbackRoute: '/auth/callback',
      providers: [
        {
          id: 'google',
          label: 'Google',
          enabled: true,
          scopes: ['openid', 'email', 'profile'],
          icon: {
            provider: 'FontAwesome',
            name: 'google',
          },
        },
        {
          id: 'custom-sso',
          label: 'Custom SSO',
          enabled: false,
          redirectTo: '/auth/custom/callback',
          queryParams: {
            prompt: 'select_account',
          },
        },
      ],
    };

    const auth: AuthSpec = {
      scope: 'global',
      provider: 'supabase',
      authorization: { kind: 'RBAC', engine: 'native' },
      oauth,
    };

    expect(AUTH_OAUTH_PROVIDER_IDS.includes('google')).toBe(true);
    expect(auth.oauth?.providers[0]?.icon?.name).toBe('google');
    expect(auth.oauth?.providers[1]?.id).toBe('custom-sso');
    expect(auth.oauth?.providers[1]?.enabled).toBe(false);
  });

  it('accepts optional OAuth adapter capabilities and redirect flow methods', async () => {
    const adapter: AuthAdapter = {
      capabilities: {
        signInIdentifiers: ['email'],
        supportsSignUp: true,
        supportsPasswordReset: true,
        supportsOtp: true,
        supportsSessionRefresh: true,
        supportsOAuth: true,
        oauthProviders: ['google', 'custom-sso'],
      },
      signIn() {
        return Promise.resolve({
          ok: false,
          error: { code: 'unsupported', message: 'Password sign-in is not implemented.' },
        });
      },
      signUp() {
        return Promise.resolve({
          ok: false,
          error: { code: 'unsupported', message: 'Sign-up is not implemented.' },
        });
      },
      signOut() {
        return Promise.resolve({ ok: true });
      },
      getSession() {
        return Promise.resolve({ ok: true, data: null });
      },
      signInWithOAuth(input) {
        return Promise.resolve({
          ok: true,
          data: {
            provider: input.provider,
            url: `https://auth.example.com/oauth/${input.provider}`,
          },
        });
      },
    };

    const result = await adapter.signInWithOAuth?.({
      provider: 'google',
      redirectTo: '/auth/callback',
      scopes: ['openid', 'email', 'profile'],
    });

    expect(adapter.capabilities?.supportsOAuth).toBe(true);
    expect(adapter.capabilities?.oauthProviders).toEqual(['google', 'custom-sso']);
    expect(result?.ok).toBe(true);
    expect(result?.ok === true ? result.data?.provider : undefined).toBe('google');
    expect(result?.ok === true ? result.data?.url : undefined).toContain('/oauth/google');
  });
});
