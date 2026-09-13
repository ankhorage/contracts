import { expect, it } from 'bun:test';

import type { AppEnvironmentId } from './environments';
import type {
  InfraAdapterDescriptor,
  InfraAuthSpec,
  InfraAuthzSpec,
  InfraControlPlaneCredentialRef,
  InfraDeploymentSpec,
  InfraDestroyRequest,
  InfraManifest,
  InfraObjectStorageSpec,
  InfraOutput,
  InfraRuntimeProviderId,
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
