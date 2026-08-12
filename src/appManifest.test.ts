import { describe, expect, it } from 'bun:test';

import { isAppManifest, parseAppManifest } from './appManifest';

function createManifest(): Record<string, unknown> {
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
    activeThemeMode: 'light',
    splashScreen: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
      dark: { backgroundColor: '#000000' },
    },
    infra: {
      deployment: { target: 'minikube', monitoring: true },
      database: { provider: 'supabase', tier: 'dev' },
      storage: { provider: 'auto', buckets: ['media'] },
      state: { provider: 'legend', persistence: 'local' },
      networking: { domain: 'example.test', cdn: false },
      modules: ['expo-localization'],
      modulesConfig: { localization: { defaultLocale: 'en' } },
    },
    navigator: {
      type: 'stack',
      initialRouteName: 'home',
      routes: [
        {
          name: 'home',
          path: '/',
          screenId: 'home',
          showInPrimaryNavigation: true,
        },
      ],
    },
    screens: {
      home: {
        id: 'home',
        name: 'Home',
        root: {
          id: 'root',
          type: 'Stack',
          children: [
            {
              id: 'title',
              type: 'Text',
              repeat: { source: { kind: 'state', path: 'items' }, itemAlias: 'item' },
            },
          ],
        },
        dataLoaders: [
          {
            kind: 'operation',
            id: 'load-users',
            operation: { dataSourceId: 'external', endpointId: 'main', operationId: 'list' },
          },
        ],
        requires: {
          permissions: [{ permission: 'camera' }],
          capabilities: [{ capability: 'barcodeScanner' }],
        },
      },
    },
    generatedApis: {
      users: {
        id: 'users',
        protocol: 'rest',
        basePath: '/users',
        database: { id: 'primary', kind: 'database' },
        resources: [
          {
            id: 'users',
            path: '/users',
            collection: {
              name: 'users',
              fields: [{ name: 'id', type: 'uuid', required: true }],
              primaryKey: 'id',
            },
            operations: ['list', 'read'],
          },
        ],
      },
    },
    dataSources: {
      external: {
        id: 'external',
        kind: 'api',
        origin: 'external',
        protocol: 'rest',
        baseUrl: 'https://example.test',
        endpoints: {
          main: {
            id: 'main',
            kind: 'http',
            operations: {
              list: { id: 'list', protocol: 'rest', intent: 'read', path: '/users' },
            },
          },
        },
      },
    },
    dataBindings: {
      title: {
        componentId: 'title',
        props: { text: { source: { kind: 'state', path: 'title' } } },
        events: {
          press: [{ target: { kind: 'action', type: 'console' } }],
        },
      },
    },
    settings: {
      apiBaseUrl: 'https://example.test/api',
      localization: { defaultLocale: 'en', locales: ['en', 'de'] },
    },
  };
}

describe('AppManifest runtime parsing', () => {
  it('accepts the canonical manifest including optional nested sections', () => {
    const manifest = createManifest();

    expect(isAppManifest(manifest)).toBe(true);
    expect(parseAppManifest(manifest)).toEqual({ ok: true, manifest });
  });

  it('rejects missing required top-level sections', () => {
    const manifest = createManifest();
    delete manifest.settings;

    expect(isAppManifest(manifest)).toBe(false);
  });

  it('rejects malformed nested canonical structures', () => {
    const manifest = createManifest();
    const themes = manifest.themes as Array<Record<string, unknown>>;
    const light = themes[0]?.light as Record<string, unknown>;
    light.harmony = 'not-a-harmony';

    expect(parseAppManifest(manifest)).toEqual({
      ok: false,
      message: 'Value is not a canonical AppManifest.',
    });
  });

  it('rejects legacy infra plugin state', () => {
    const manifest = createManifest();
    const infra = manifest.infra as Record<string, unknown>;
    infra.plugins = ['legacy'];

    expect(isAppManifest(manifest)).toBe(false);
  });

  it('rejects screen registries whose key disagrees with screen id', () => {
    const manifest = createManifest();
    const screens = manifest.screens as Record<string, unknown>;
    screens.other = screens.home;
    delete screens.home;

    expect(isAppManifest(manifest)).toBe(false);
  });

  it('rejects invalid data-binding source kinds', () => {
    const manifest = createManifest();
    const bindings = manifest.dataBindings as Record<string, Record<string, unknown>>;
    const props = bindings.title?.props as Record<string, Record<string, unknown>>;
    props.text = { source: { kind: 'provider-specific', path: 'title' } };

    expect(isAppManifest(manifest)).toBe(false);
  });
});
