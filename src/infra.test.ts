import { describe, expect, it } from 'bun:test';

import {
  INFRA_ADAPTER_CATALOG,
  type InfraEnvironmentSpec,
  type InfraManifest,
  isInfraAdapterDescriptor,
  isInfraDeploymentSpec,
  isInfraEnvironmentSpec,
  isInfraManifest,
  parseInfraManifest,
  validateInfraAdapterSelection,
} from './infra';

const local = {
  deployment: { compute: { provider: 'local' }, runtime: { provider: 'minikube' } },
} as const satisfies InfraEnvironmentSpec;
const production = {
  deployment: {
    compute: { provider: 'hetzner', location: 'nbg1' },
    runtime: { provider: 'k3s', topology: { servers: 1, agents: 0 } },
  },
  database: { provider: 'supabase' },
  graphDatabase: {
    provider: 'neptune',
    endpoint: 'bolt://cluster.neptune.amazonaws.com:8182',
    credentials: {
      source: 'secret-store',
      projectId: 'acquisition',
      environment: 'production',
      ref: 'graph/neptune',
      key: 'credentials',
    },
  },
  auth: { provider: 'supabase' },
  objectStorage: { provider: 'r2', buckets: { media: true } },
  authz: { provider: 'cerbos', kind: 'ABAC' },
  secretStore: { provider: 'supabase-vault' },
  networking: { domain: 'api.example.ch', publicBaseUrl: 'https://api.example.ch' },
} as const satisfies InfraEnvironmentSpec;

describe('standalone Infra environments', () => {
  it('parses local/preview/production without an AppManifest or Deploy', () => {
    const manifest = {
      environments: { local, preview: production, production },
      modules: {},
    } satisfies InfraManifest;
    expect(parseInfraManifest(JSON.parse(JSON.stringify(manifest)))).toEqual({
      ok: true,
      value: manifest,
      diagnostics: [],
    });
  });

  it.each([
    null,
    {},
    { modules: {} },
    { environments: {}, modules: {} },
    { environments: { production }, modules: {} },
    { environments: { local, staging: local }, modules: {} },
    { environments: { local, preview: null }, modules: {} },
    { environments: { local }, modules: { invalid: 42 } },
    { environments: { local }, modules: {}, modulesConfig: {} },
    { environments: { local }, modules: {}, apis: 'invalid' },
  ])('rejects invalid environment boundaries: %j', (value) => {
    expect(isInfraManifest(value)).toBe(false);
    expect(parseInfraManifest(value).ok).toBe(false);
  });

  it.each([
    'deployment',
    'storage',
    'state',
    'auth',
    'database',
    'networking',
    'secretStore',
    'plugins',
    'pluginsConfig',
  ])('rejects removed top-level %s', (key) => {
    expect(isInfraManifest({ environments: { local }, modules: {}, [key]: {} })).toBe(false);
  });

  it.each(['storage', 'state', 'monitoring', 'observability', 'target'])(
    'rejects obsolete or speculative environment %s',
    (key) => {
      expect(isInfraEnvironmentSpec({ ...local, [key]: {} })).toBe(false);
    },
  );
});

describe('runtime topology configuration', () => {
  it.each([
    { provider: 'k3s', topology: { servers: 0, agents: 1 } },
    { provider: 'k3s', topology: { servers: 1, agents: -1 } },
    { provider: 'k3s', topology: { servers: 1.5, agents: 0 } },
    { provider: 'k3s', topology: { servers: 1, agents: Infinity } },
    { provider: 'k3s', topology: { servers: 1 } },
    { provider: 'minikube', cpus: 0 },
    { provider: 'minikube', memoryMiB: NaN },
    { provider: 'minikube', driver: 'unknown' },
    { provider: 'docker-compose', profile: 'minikube' },
  ])('rejects malformed runtime configuration: %j', (runtime) => {
    expect(isInfraDeploymentSpec({ compute: { provider: 'local' }, runtime })).toBe(false);
  });

  it('accepts multi-node topology on both supported k3s computes', () => {
    for (const compute of [{ provider: 'local' }, { provider: 'hetzner', location: 'nbg1' }]) {
      expect(
        isInfraDeploymentSpec({
          compute,
          runtime: { provider: 'k3s', topology: { servers: 3, agents: 4 } },
        }),
      ).toBe(true);
    }
  });
});

describe('Cerbos policy configuration', () => {
  it('accepts portable policy files', () => {
    expect(
      isInfraEnvironmentSpec({
        ...local,
        authz: {
          provider: 'cerbos',
          kind: 'ABAC',
          policies: { 'app.yaml': 'apiVersion: api.cerbos.dev/v1' },
        },
      }),
    ).toBe(true);
  });

  it.each([
    { policies: { '../app.yaml': 'x' } },
    { policies: { 'app.yaml': 42 } },
    { policies: [{ path: 'app.yaml', content: 'legacy-array-shape' }] },
  ])('rejects unsafe or non-canonical policy files: %j', ({ policies }) => {
    expect(
      isInfraEnvironmentSpec({
        ...local,
        authz: { provider: 'cerbos', kind: 'ABAC', policies },
      }),
    ).toBe(false);
  });
});

describe('authentication configuration', () => {
  it('preserves auth flow, profile and OAuth credential references', () => {
    expect(
      isInfraEnvironmentSpec({
        ...production,
        auth: {
          provider: 'supabase',
          scope: 'global',
          flow: { signInRoute: '/sign-in', postSignInRoute: '/' },
          signIn: { identifiers: ['email'] },
          signUp: { requiredFields: ['email', 'password'], signUpPolicy: 'requireVerification' },
          profile: {
            fields: ['email'],
            primaryKey: 'authUserId',
            createStrategy: 'trigger',
            updateStrategy: 'api',
          },
          oauth: {
            enabled: true,
            callbackRoute: '/auth/callback',
            providers: [{ id: 'google', credentialsRef: 'auth/oauth/google' }],
          },
        },
      }),
    ).toBe(true);
  });

  it.each([
    { flow: { signInRoute: '/' } },
    { signIn: { identifiers: ['social'] } },
    { signUp: { requiredFields: [], signUpPolicy: 'unknown' } },
    { profile: { fields: ['email'], createStrategy: 'unknown' } },
    {
      oauth: {
        enabled: true,
        callbackRoute: '/',
        providers: [{ id: 'google', clientSecret: 'sentinel' }],
      },
    },
  ])('rejects malformed auth configuration: %j', (config) => {
    expect(isInfraEnvironmentSpec({ ...local, auth: { provider: 'supabase', ...config } })).toBe(
      false,
    );
  });
});

describe('adapter package descriptor contracts', () => {
  it('accepts every canonical descriptor and deduplicates a multi-capability Supabase platform', () => {
    for (const descriptor of Object.values(INFRA_ADAPTER_CATALOG))
      expect(isInfraAdapterDescriptor(descriptor)).toBe(true);
    const environment = { ...production, objectStorage: { provider: 'supabase' } } as const;
    const result = validateInfraAdapterSelection(environment, Object.values(INFRA_ADAPTER_CATALOG));
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error('Expected installed descriptors.');
    expect(result.value.filter((descriptor) => descriptor.id === 'supabase')).toHaveLength(1);
    expect(result.value.some((descriptor) => descriptor.id === 'r2')).toBe(false);
  });

  it.each([
    { package: '@ankhorage/supabase-db' },
    { id: 'custom' },
    { kind: 'runtime' },
    { configVersion: 2 },
    { capabilities: ['auth'] },
    { dependencies: [] },
    { targets: ['local-host'] },
    { operations: ['drop-all'] },
  ])('rejects a mismatched package descriptor: %j', (override) => {
    expect(isInfraAdapterDescriptor({ ...INFRA_ADAPTER_CATALOG.supabase, ...override })).toBe(
      false,
    );
  });
});

describe('adapter package selection contracts', () => {
  it('selects the canonical Neon database adapter by its control-plane credential reference', () => {
    const environment = {
      ...local,
      database: {
        provider: 'neon',
        project: {
          name: 'zefix-leads',
          regionId: 'aws-eu-central-1',
          credentials: { source: 'control-plane', name: 'NEON_API_KEY' },
        },
      },
    } as const satisfies InfraEnvironmentSpec;
    const result = validateInfraAdapterSelection(environment, [
      INFRA_ADAPTER_CATALOG.local,
      INFRA_ADAPTER_CATALOG.minikube,
      INFRA_ADAPTER_CATALOG.neon,
    ]);
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error('Expected Neon adapter selection.');
    expect(result.value).toContain(INFRA_ADAPTER_CATALOG.neon);
  });

  it('reports the exact missing selected package without requiring unselected providers', () => {
    expect(
      validateInfraAdapterSelection(local, [
        INFRA_ADAPTER_CATALOG.local,
        INFRA_ADAPTER_CATALOG.minikube,
      ]).ok,
    ).toBe(true);
    const result = validateInfraAdapterSelection(local, [INFRA_ADAPTER_CATALOG.local]);
    expect(result.ok).toBe(false);
    expect(result.diagnostics[0]?.message).toContain('@ankhorage/infra-minikube');
    expect(result.diagnostics[0]?.code).toBe('adapter_unavailable');
  });

  it('rejects ambiguous duplicate installed descriptors', () => {
    expect(
      validateInfraAdapterSelection(local, [
        INFRA_ADAPTER_CATALOG.local,
        INFRA_ADAPTER_CATALOG.local,
        INFRA_ADAPTER_CATALOG.minikube,
      ]).ok,
    ).toBe(false);
  });
});
