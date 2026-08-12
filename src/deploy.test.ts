import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { describe, expect, it } from 'bun:test';

import { isAppManifest } from './appManifest';
import { APP_DEPLOY_TARGET_IDS, isAppDeployManifest } from './deploy';
import { DEPLOYMENT_TARGETS } from './types';

function createManifest(deploy?: unknown): Record<string, unknown> {
  return {
    metadata: {
      name: 'Example',
      slug: 'example',
      version: '1.0.0',
      category: 'developer_tools',
      themeId: 'default',
    },
    themes: [
      {
        id: 'default',
        name: 'Default',
        light: { primaryColor: '#3366ff', harmony: 'analogous' },
        dark: { primaryColor: '#6699ff', harmony: 'analogous' },
      },
    ],
    activeThemeId: 'default',
    ...(deploy === undefined ? {} : { deploy }),
    infra: { deployment: { target: 'minikube', monitoring: true }, modules: [] },
    navigator: { type: 'stack', routes: [] },
    screens: {},
    settings: { localization: { defaultLocale: 'en', locales: ['en'] } },
  };
}

describe('app deployment contracts', () => {
  it('keeps app distribution targets distinct from Infra deployment targets', () => {
    expect(APP_DEPLOY_TARGET_IDS).toEqual(['web', 'android', 'ios']);
    expect(DEPLOYMENT_TARGETS).toEqual(['minikube']);
  });

  it('accepts canonical web, Android, and iOS desired state', () => {
    const deploy = {
      targets: {
        web: { enabled: true, providers: { publish: 'eas' } },
        android: {
          enabled: true,
          package: 'com.example.app',
          providers: { build: 'eas', publish: 'google-play' },
        },
        ios: {
          enabled: false,
          bundleIdentifier: 'com.example.app',
          providers: { build: 'eas', publish: 'app-store-connect' },
        },
      },
    };

    expect(isAppDeployManifest(deploy)).toBe(true);
    expect(isAppManifest(createManifest(deploy))).toBe(true);
  });

  it('keeps deployment optional and accepts an empty target registry structurally', () => {
    expect(isAppManifest(createManifest())).toBe(true);
    expect(isAppDeployManifest({ targets: {} })).toBe(true);
  });

  it('keeps provider identifiers opaque but non-empty', () => {
    expect(
      isAppDeployManifest({
        targets: {
          web: {
            enabled: true,
            providers: { build: 'custom-build', publish: 'custom-host' },
          },
        },
      }),
    ).toBe(true);
  });

  it('rejects malformed, unknown, and credential-shaped deployment fields', () => {
    const invalidValues: readonly unknown[] = [
      null,
      {},
      { targets: null },
      { targets: { desktop: { enabled: true } } },
      { targets: { web: { enabled: 'yes' } } },
      { targets: { android: { enabled: true, package: '' } } },
      { targets: { ios: { enabled: true, bundleIdentifier: ' ' } } },
      { targets: { web: { enabled: true, providers: { publish: '' } } } },
      { targets: { web: { enabled: true, providerConfig: { region: 'eu' } } } },
      { targets: { web: { enabled: true, credentials: { token: 'secret' } } } },
      { targets: {}, credentials: { token: 'secret' } },
    ];

    for (const value of invalidValues) {
      expect(isAppDeployManifest(value)).toBe(false);
    }
  });

  it('rejects a malformed deploy subtree through the canonical AppManifest parser', () => {
    expect(
      isAppManifest(
        createManifest({
          targets: { android: { enabled: true, package: 'com.example.app', credentials: {} } },
        }),
      ),
    ).toBe(false);
  });

  it('publishes the focused deployment contract subpath', async () => {
    const packageJson = JSON.parse(await readFile(join(process.cwd(), 'package.json'), 'utf8')) as {
      exports?: Record<string, { default?: string; types?: string }>;
    };

    expect(packageJson.exports?.['./deploy']).toEqual({
      types: './dist/deploy.d.ts',
      default: './dist/deploy.js',
    });
  });
});
