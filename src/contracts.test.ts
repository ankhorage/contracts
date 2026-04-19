import { describe, expect, it } from 'bun:test';

import {
  APP_CATEGORIES,
  type AppCategory,
  AUTH_PROVIDERS,
  DEPLOYMENT_TARGETS,
  NAVIGATOR_TYPES,
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
