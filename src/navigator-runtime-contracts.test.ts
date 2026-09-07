import { expect, test } from 'bun:test';

import type {
  CustomNavigatorRegistration,
  NavigatorGeneratedFile,
  NavigatorGenerationBindings,
  NavigatorPlan,
} from './navigator';

test('keeps generation bindings and plan output portable across package boundaries', () => {
  const bindings: NavigatorGenerationBindings = {
    screens: { home: { module: '@/screens/Home', exportName: 'Home' } },
    guards: {},
  };
  const file: NavigatorGeneratedFile = {
    path: 'src/app/index.tsx',
    contents: 'export default Home;',
  };
  const plan: NavigatorPlan = {
    context: { platform: 'web', expoRouterVersion: '57.0.18' },
    root: {
      type: 'slot',
      pointer: '',
      adapter: {
        id: 'slot',
        module: 'expo-router',
        exportName: 'Slot',
        support: 'supported',
        stability: 'stable',
        limitations: [],
      },
      routes: [],
    },
    diagnostics: [],
    supported: true,
    flows: { onboarding: false, authentication: false },
  };
  expect(JSON.parse(JSON.stringify({ bindings, file, plan }))).toEqual({ bindings, file, plan });
});

test('describes a custom extension without importing Navigator or a UI runtime', () => {
  const registration: CustomNavigatorRegistration = {
    id: 'example',
    platforms: ['web'],
    stability: 'stable',
    integration: 'expo-router-standard',
    router: 'stack',
    module: '@example/navigation',
    exportName: 'ExampleNavigator',
    validateConfig: () => [],
  };
  expect(registration.validateConfig({ mode: 'compact' })).toEqual([]);
});
