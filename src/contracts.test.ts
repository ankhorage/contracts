import { describe, expect, it } from 'bun:test';

import { AUTH_PROVIDERS, DEPLOYMENT_TARGETS, NAVIGATOR_TYPES, type ThemeConfig } from './index';

describe('contracts', () => {
  it('exports stable platform constants', () => {
    expect(NAVIGATOR_TYPES).toEqual(['stack', 'tabs', 'drawer']);
    expect(DEPLOYMENT_TARGETS).toEqual(['minikube']);
    expect(AUTH_PROVIDERS).toEqual(['supabase']);
  });

  it('accepts the current serialized theme config shape', () => {
    const theme: ThemeConfig = {
      id: 'theme-default',
      name: 'Default',
      light: {
        primaryColor: '#3366ff',
        harmony: 'analogous',
        systemTone: 'neutral',
      },
      dark: {
        primaryColor: '#3366ff',
        harmony: 'analogous',
        systemTone: 'neutral',
      },
    };

    expect(theme.light.primaryColor).toBe('#3366ff');
    expect(theme.dark.systemTone).toBe('neutral');
  });
});
