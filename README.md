# @ankhorage/contracts

Serializable app, action, and theme-config contracts for the Ankhorage ecosystem.

## Scope

This package owns the serializable shapes shared across Ankhorage packages and generated
apps:

- app manifest contracts
- screen and navigator schema
- action contracts
- theme configuration contracts
- infra and auth configuration contracts

It does not own rendering behavior, runtime action execution, Studio authoring behavior,
or project generation.

## Installation

```sh
bun add @ankhorage/contracts
```

## Usage

```ts
import type { AppManifest, ThemeConfig, UiNode } from '@ankhorage/contracts';

const theme: ThemeConfig = {
  id: 'default',
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

const root: UiNode = {
  id: 'root',
  type: 'Container',
};

const manifest: AppManifest = {
  metadata: {
    name: 'Example',
    slug: 'example',
    version: '1.0.0',
    themeId: theme.id,
  },
  themes: [theme],
  activeThemeId: theme.id,
  infra: {
    plugins: [],
  },
  navigator: {
    type: 'stack',
    routes: [],
  },
  screens: {
    home: {
      id: 'home',
      name: 'home',
      root,
    },
  },
  settings: {
    localization: {
      defaultLocale: 'en',
      locales: ['en'],
    },
    authFlow: {
      loginRoute: '/login',
      unauthorizedRoute: '/login',
      postLoginRoute: '/',
    },
  },
};
```

## Non-Goals

- runtime rendering
- Studio authoring behavior
- Expo or React Native UI primitives
- CLI project generation
