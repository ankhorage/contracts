import { describe, expect, it } from 'bun:test';

import { isAppManifest } from './appManifest';
import {
  type InfraWorkloadSpec,
  isInfraDeploymentSpec,
  isInfraEnvironmentSpec,
  isInfraWorkloadSpec,
} from './infra';
import type { AppManifest } from './types';

const reference = {
  source: 'secret-store',
  projectId: 'example',
  environment: 'local',
  ref: 'database',
  key: 'password',
} as const;
const workload = {
  id: 'backend',
  artifact: { kind: 'image', image: 'example/backend@sha256:abc' },
  command: ['server'],
  args: ['--verbose'],
  ports: [{ name: 'http', port: 8080 }],
  environment: {
    NODE_ENV: { kind: 'literal', value: 'production' },
    DB_PASSWORD: { kind: 'secret', reference },
    DB_HOST: { kind: 'output', resourceId: 'database', output: 'host' },
  },
  files: [{ path: '/etc/backend/config.json', content: { kind: 'literal', value: '{}' } }],
  health: { kind: 'http', port: 8080, path: '/health', intervalSeconds: 5 },
  resources: { cpuMillis: 500, memoryMiB: 256 },
  persistence: [{ id: 'data', mountPath: '/data', sizeGiB: 10, retention: 'retain' }],
  exposure: 'public',
  replicas: 1,
  dependsOn: ['database'],
} as const satisfies InfraWorkloadSpec;

const invalidWorkloads = [
  { artifact: { kind: 'build', dockerfile: 'Dockerfile' } },
  { artifact: { kind: 'image', image: '' } },
  { ports: [{ name: 'http', port: 0 }] },
  { ports: [{ name: 'http', port: 65536 }] },
  { ports: [{ name: 'http', port: 1.5 }] },
  { ports: [{ name: 'http', port: 80, protocol: 'sctp' }] },
  {
    ports: [
      { name: 'http', port: 80 },
      { name: 'http', port: 81 },
    ],
  },
  { replicas: -1 },
  { replicas: NaN },
  { replicas: 1.5 },
  { resources: { memoryMiB: Infinity } },
  { resources: { cpuMillis: 0 } },
  { persistence: [{ id: 'data', mountPath: '/data', sizeGiB: 1 }] },
  { persistence: [{ id: 'data', mountPath: '../data', sizeGiB: 1, retention: 'retain' }] },
  { files: [{ path: '/etc/../secret', content: { kind: 'literal', value: 'x' } }] },
  { health: { kind: 'http', port: 80, path: '/health', failureThreshold: 0 } },
  { health: { kind: 'tcp', port: 80, path: '/health' } },
  { health: { kind: 'command', command: [] } },
  { nodeSelector: {} },
  { apiVersion: 'apps/v1' },
  { ingressClassName: 'nginx' },
  { environment: { PASSWORD: 'plaintext' } },
  { environment: { PASSWORD: { kind: 'secret', reference, value: 'sentinel-secret' } } },
  {
    environment: { PASSWORD: { kind: 'secret', reference: { ...reference, token: 'sentinel' } } },
  },
  {
    environment: {
      TOKEN: { kind: 'secret', reference: { source: 'control-plane', name: 'HCLOUD_TOKEN' } },
    },
  },
];

describe('runtime-neutral workload boundary', () => {
  it('accepts prebuilt images, dependency outputs, config files and secret references on every runtime', () => {
    expect(isInfraWorkloadSpec(JSON.parse(JSON.stringify(workload)))).toBe(true);
    for (const provider of ['minikube', 'k3s', 'docker-compose']) {
      expect(
        isInfraEnvironmentSpec({
          deployment: { compute: { provider: 'local' }, runtime: { provider } },
          workloads: [workload],
        }),
      ).toBe(true);
    }
  });

  it.each(invalidWorkloads)(
    'rejects invalid or runtime-specific workload fields: %j',
    (override) => {
      expect(isInfraWorkloadSpec({ ...workload, ...override })).toBe(false);
    },
  );

  it('accepts TCP/command health probes and zero replicas for reversible suspension', () => {
    expect(
      isInfraWorkloadSpec({ ...workload, health: { kind: 'tcp', port: 8080 }, replicas: 0 }),
    ).toBe(true);
    expect(
      isInfraWorkloadSpec({ ...workload, health: { kind: 'command', command: ['check'] } }),
    ).toBe(true);
  });

  it('rejects duplicate workload identities', () => {
    expect(
      isInfraEnvironmentSpec({
        deployment: { compute: { provider: 'local' }, runtime: { provider: 'k3s' } },
        workloads: [workload, workload],
      }),
    ).toBe(false);
  });
});

describe('control-plane credential separation', () => {
  it('accepts a bootstrap reference while rejecting managed-store bootstrap and inline tokens', () => {
    for (const credentials of [
      { source: 'control-plane', name: 'HCLOUD' },
      reference,
      'secret-token',
      { source: 'control-plane', name: 'HCLOUD', token: 'sentinel' },
    ]) {
      const value = {
        compute: { provider: 'hetzner', location: 'nbg1', credentials },
        runtime: { provider: 'k3s' },
      };
      expect(isInfraDeploymentSpec(value)).toBe(
        typeof credentials === 'object' &&
          'source' in credentials &&
          credentials.source === 'control-plane' &&
          !('token' in credentials),
      );
    }
  });
});

describe('application state boundary', () => {
  const manifest = {
    metadata: {
      name: 'Example',
      slug: 'example',
      version: '1.0.0',
      category: 'developer_tools',
      themeId: 'default',
    },
    themes: [],
    activeThemeId: 'default',
    screens: {},
    navigator: { type: 'stack', routes: [] },
    infra: {
      environments: {
        local: {
          deployment: { compute: { provider: 'local' }, runtime: { provider: 'minikube' } },
        },
      },
      modules: [],
    },
    settings: { localization: { defaultLocale: 'en', locales: ['en'] } },
  } satisfies AppManifest;

  it('keeps app state optional and accepts only implemented Legend persistence behavior', () => {
    expect(isAppManifest(manifest)).toBe(true);
    expect(isAppManifest({ ...manifest, state: { provider: 'legend' } })).toBe(true);
    expect(isAppManifest({ ...manifest, state: { provider: 'legend', persistence: false } })).toBe(
      true,
    );
  });

  it.each(['none', 'local', 'secure', 'database', true, null])(
    'rejects unsupported persistence %j',
    (persistence) => {
      expect(isAppManifest({ ...manifest, state: { provider: 'legend', persistence } })).toBe(
        false,
      );
    },
  );

  it('rejects open state providers and the obsolete infra.state placement', () => {
    expect(isAppManifest({ ...manifest, state: { provider: 'custom' } })).toBe(false);
    expect(
      isAppManifest({ ...manifest, infra: { ...manifest.infra, state: { provider: 'legend' } } }),
    ).toBe(false);
  });
});
