import { expect, it } from 'bun:test';

import type { AppEnvironmentId } from './environments';
import type {
  InfraAdapterDescriptor,
  InfraAuthSpec,
  InfraAuthzSpec,
  InfraComputeAdapter,
  InfraComputeSnapshot,
  InfraControlPlaneCredentialRef,
  InfraCredentialPort,
  InfraDatabaseSpec,
  InfraDeploymentSpec,
  InfraDestroyRequest,
  InfraExecutionContext,
  InfraGraphDatabaseSpec,
  InfraManifest,
  InfraObjectStorageSpec,
  InfraOutput,
  InfraResult,
  InfraRuntimeAdapter,
  InfraRuntimeDesiredState,
  InfraRuntimeProviderId,
  InfraServiceAdapter,
} from './infra';
import type { AppStateSpec } from './state';

type Assignable<T, U> = [T] extends [U] ? true : false;
interface Deployment<C, R> {
  readonly compute: C;
  readonly runtime: R;
}
interface Local {
  readonly provider: 'local';
}
interface Hetzner {
  readonly provider: 'hetzner';
  readonly location: 'nbg1';
}
interface Runtime<P extends InfraRuntimeProviderId> {
  readonly provider: P;
}

it('compiles the entire deployment matrix with exact assignability', () => {
  const matrix: readonly [
    Assignable<Deployment<Local, Runtime<'minikube'>>, InfraDeploymentSpec>,
    Assignable<Deployment<Local, Runtime<'k3s'>>, InfraDeploymentSpec>,
    Assignable<Deployment<Local, Runtime<'docker-compose'>>, InfraDeploymentSpec>,
    Assignable<Deployment<Hetzner, Runtime<'minikube'>>, InfraDeploymentSpec>,
    Assignable<Deployment<Hetzner, Runtime<'k3s'>>, InfraDeploymentSpec>,
    Assignable<Deployment<Hetzner, Runtime<'docker-compose'>>, InfraDeploymentSpec>,
    Assignable<Deployment<{ provider: 'gcp' }, { provider: 'ecs' }>, InfraDeploymentSpec>,
    Assignable<Deployment<Hetzner, { provider: 'eks' }>, InfraDeploymentSpec>,
    Assignable<Deployment<{ provider: 'hetzner' }, Runtime<'k3s'>>, InfraDeploymentSpec>,
    Assignable<Deployment<{ provider: string }, { provider: string }>, InfraDeploymentSpec>,
  ] = [true, true, true, false, true, true, false, false, false, false];
  expect(matrix).toEqual([true, true, true, false, true, true, false, false, false, false]);
});

it('closes environment, app-state, bootstrap and privileged-output boundaries', () => {
  const closed: readonly [
    Assignable<'staging', AppEnvironmentId>,
    Assignable<{ provider: 'legend'; persistence: 'local' }, AppStateSpec>,
    Assignable<{ provider: 'custom' }, AppStateSpec>,
    Assignable<{ source: 'secret-store'; ref: string }, InfraControlPlaneCredentialRef>,
    Assignable<{ modules: [] }, InfraManifest>,
    Assignable<{ projectId: string; environment: 'production' }, InfraDestroyRequest>,
    Assignable<
      Omit<InfraAdapterDescriptor<'supabase'>, 'package'> & { package: '@ankhorage/supabase-db' },
      InfraAdapterDescriptor
    >,
    Assignable<
      Omit<Extract<InfraOutput, { visibility: 'secret' }>, 'value'> & { value: string },
      InfraOutput
    >,
  ] = [false, false, false, false, false, false, false, false];
  expect(closed).toEqual([false, false, false, false, false, false, false, false]);
});

it('rejects open or fictional service providers in typed selections', () => {
  const providers: readonly [
    Assignable<{ provider: string }, InfraAuthSpec>,
    Assignable<{ provider: 'native'; kind: 'RBAC' }, InfraAuthzSpec>,
    Assignable<{ provider: 'auto' }, InfraObjectStorageSpec>,
    Assignable<{ provider: 's3' }, InfraObjectStorageSpec>,
  ] = [false, false, false, false];
  expect(providers).toEqual([false, false, false, false]);
});

it('keeps Neon database resources and its control-plane credential reference in the canonical contract', () => {
  const neon: InfraDatabaseSpec = {
    provider: 'neon',
    project: {
      name: 'zefix-leads',
      regionId: 'aws-eu-central-1',
      credentials: { source: 'control-plane', name: 'NEON_API_KEY' },
    },
    branch: { name: 'production' },
    database: { name: 'leads' },
    role: { name: 'lead_writer' },
  };
  const descriptor: InfraServiceAdapter['descriptor'] = {
    id: 'neon',
    package: '@ankhorage/infra-neon',
    kind: 'service',
    configVersion: 1,
    capabilities: ['database'],
    targets: [],
    dependencies: [],
  };
  expect([neon.provider, descriptor.id]).toEqual(['neon', 'neon']);
});

it('keeps graph database providers separate from relational database selection', () => {
  const graph: InfraGraphDatabaseSpec = {
    provider: 'neo4j',
    endpoint: 'https://acquisition.databases.neo4j.io',
    credentials: {
      source: 'secret-store',
      projectId: 'acquisition',
      environment: 'production',
      ref: 'graph/neo4j',
      key: 'credentials',
    },
  };
  const descriptor: InfraServiceAdapter['descriptor'] = {
    id: 'neo4j',
    package: '@ankhorage/neo4j',
    kind: 'service',
    configVersion: 1,
    capabilities: ['graphDatabase'],
    targets: [],
    dependencies: [],
  };
  expect([graph.provider, descriptor.id]).toEqual(['neo4j', 'neo4j']);
});

it('requires resolved outputs at the runtime desired-state boundary', () => {
  interface RuntimeInput {
    readonly selection: { readonly provider: 'minikube' };
    readonly targets: readonly [];
    readonly workloads: readonly [];
  }
  const outputBoundary: readonly [
    Assignable<RuntimeInput, InfraRuntimeDesiredState<'minikube'>>,
    Assignable<RuntimeInput & { readonly availableOutputs: readonly [] }, InfraRuntimeDesiredState>,
  ] = [false, true];

  expect(outputBoundary).toEqual([false, true]);
});

it('requires runtime desired state for every target-dependent lifecycle operation', () => {
  type Adapter = InfraRuntimeAdapter<'docker-compose'>;
  type Desired = InfraRuntimeDesiredState<'docker-compose'>;

  const lifecycleBoundary: readonly [
    Assignable<Parameters<Adapter['statusAsync']>, [context: unknown, desired: Desired]>,
    Assignable<Parameters<Adapter['suspendAsync']>, [context: unknown, desired: Desired]>,
    Assignable<
      Parameters<Adapter['destroyAsync']>,
      [context: unknown, desired: Desired, request: InfraDestroyRequest]
    >,
  ] = [true, true, true];

  expect(lifecycleBoundary).toEqual([true, true, true]);
});

it('requires read-only compute discovery separately from mutating ensure', () => {
  type Adapter = InfraComputeAdapter<'local'>;

  const computeBoundary: readonly [
    Assignable<Awaited<ReturnType<Adapter['inspectAsync']>>, InfraResult<InfraComputeSnapshot>>,
    Assignable<Awaited<ReturnType<Adapter['ensureAsync']>>, InfraResult<InfraComputeSnapshot>>,
  ] = [true, true];

  expect(computeBoundary).toEqual([true, true]);
});

it('shares one generic credential port and optional service preparation lifecycle', () => {
  type CredentialBundle = Readonly<Record<string, string>>;
  type Service = InfraServiceAdapter;

  const boundary: readonly [
    Assignable<InfraExecutionContext['credentials'], InfraCredentialPort>,
    Assignable<
      Awaited<ReturnType<InfraCredentialPort['findAsync']>>,
      InfraResult<CredentialBundle | null>
    >,
    Assignable<
      Awaited<ReturnType<InfraCredentialPort['resolveAsync']>>,
      InfraResult<CredentialBundle>
    >,
    Assignable<Awaited<ReturnType<InfraCredentialPort['persistAsync']>>, InfraResult<null>>,
    Assignable<
      Exclude<Service['prepareAsync'], undefined>,
      (context: InfraExecutionContext) => Promise<InfraResult<null>>
    >,
  ] = [true, true, true, true, true];

  expect(boundary).toEqual([true, true, true, true, true]);
});
