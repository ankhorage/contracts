import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { describe, expect, it } from 'bun:test';

import { isAppNavigatorManifest } from './appManifest/screens';
import {
  type AppNavigatorManifest,
  NAVIGATOR_PRESETS,
  type TabsNavigatorConfig,
} from './navigator';

function createAdaptiveTabs(): AppNavigatorManifest {
  return {
    type: 'tabs',
    preset: 'tabs-stack',
    implementation: 'adaptive',
    web: {
      presentation: 'responsive',
      responsive: {
        compact: 'bottom',
        medium: 'rail',
        expanded: 'sidebar',
      },
    },
    flows: { onboarding: true },
    routes: [{ name: 'home', path: '/', screenId: 'home' }],
  };
}

describe('app navigator manifest topology', () => {
  it('keeps canonical topology presets finite and authorable', () => {
    expect(NAVIGATOR_PRESETS).toContain('root-stack-tabs-stack');
    expect(NAVIGATOR_PRESETS).toContain('root-stack-drawer-tabs-stack');
  });

  it('accepts adaptive native/Web tabs with responsive custom presentation', () => {
    expect(isAppNavigatorManifest(createAdaptiveTabs())).toBe(true);
  });

  it('treats omitted tabs implementation as the canonical adaptive default', () => {
    const tabs: TabsNavigatorConfig = { type: 'tabs' };
    const navigator: AppNavigatorManifest = { ...tabs, routes: [] };

    expect(isAppNavigatorManifest(navigator)).toBe(true);
  });
});

describe('app navigator manifest presentation', () => {
  it('accepts fixed and registered custom Web presentations', () => {
    expect(
      isAppNavigatorManifest({
        type: 'tabs',
        implementation: 'custom',
        presentation: 'sidebar',
        routes: [],
      }),
    ).toBe(true);

    expect(
      isAppNavigatorManifest({
        type: 'tabs',
        implementation: 'custom',
        presentation: 'custom',
        customPresentationId: 'workspace-tabs',
        routes: [],
      }),
    ).toBe(true);
  });

  it('rejects incomplete responsive and custom presentation configuration', () => {
    expect(
      isAppNavigatorManifest({
        type: 'tabs',
        implementation: 'custom',
        presentation: 'responsive',
        routes: [],
      }),
    ).toBe(false);

    expect(
      isAppNavigatorManifest({
        type: 'tabs',
        implementation: 'custom',
        presentation: 'custom',
        routes: [],
      }),
    ).toBe(false);
  });

  it('keeps nested topology separate from app-level flow metadata', () => {
    expect(
      isAppNavigatorManifest({
        type: 'stack',
        flows: { authentication: true },
        routes: [
          {
            name: 'app',
            navigator: {
              type: 'tabs',
              routes: [{ name: 'home', screenId: 'home' }],
            },
          },
        ],
      }),
    ).toBe(true);
  });

  it('publishes the focused navigator contract subpath', async () => {
    const packageJson = JSON.parse(await readFile(join(process.cwd(), 'package.json'), 'utf8')) as {
      exports?: Record<string, { default?: string; types?: string }>;
    };

    expect(packageJson.exports?.['./navigator']).toEqual({
      types: './dist/navigator.d.ts',
      default: './dist/navigator.js',
    });
  });
});
