import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { describe, expect, it } from 'bun:test';

import {
  DEPLOYMENT_PROVIDER_CAPABILITY_IDS,
  type DeploymentProviderRegistration,
} from './deployProvider';

const fakeProvider: DeploymentProviderRegistration = {
  descriptor: {
    id: 'fake',
    packageName: '@ankhorage/deploy-provider-fake',
    displayName: 'Fake provider',
    capabilities: [{ id: 'web-publish', targets: ['web'] }],
  },
  webPublisher: {
    publishAsync: (request) =>
      Promise.resolve({
        status: 'completed',
        value: {
          target: 'web',
          revision: request.revision,
          provider: 'fake',
          deploymentId: 'fake-deployment',
          url: 'https://example.test',
          production: request.intent.mode === 'production',
        },
      }),
  },
};

describe('deployment provider contracts', () => {
  it('defines the portable provider capability vocabulary', () => {
    expect(DEPLOYMENT_PROVIDER_CAPABILITY_IDS).toEqual([
      'setup',
      'web-publish',
      'android-build',
      'android-publish',
      'ios-build',
      'ios-publish',
      'store-listing',
      'monetization',
      'release',
    ]);
  });

  it('supports an external provider registration without Deploy implementation types', async () => {
    const result = await fakeProvider.webPublisher?.publishAsync({
      projectRoot: '/project',
      exportDirectory: '/tmp/export',
      revision: 'revision-1',
      intent: { mode: 'production' },
      credentials: [],
      resolveSecret: () => Promise.resolve(null),
    });

    expect(result).toEqual({
      status: 'completed',
      value: {
        target: 'web',
        revision: 'revision-1',
        provider: 'fake',
        deploymentId: 'fake-deployment',
        url: 'https://example.test',
        production: true,
      },
    });
  });

  it('publishes the focused deployment provider contract subpath', async () => {
    const packageJson = JSON.parse(await readFile(join(process.cwd(), 'package.json'), 'utf8')) as {
      exports?: Record<string, { default?: string; types?: string }>;
    };

    expect(packageJson.exports?.['./deploy-provider']).toEqual({
      types: './dist/deployProvider.d.ts',
      default: './dist/deployProvider.js',
    });
  });
});
