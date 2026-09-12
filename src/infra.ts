/** Canonical standalone infrastructure contracts, catalog and side-effect-free validation. */
export {
  INFRA_ADAPTER_CATALOG,
  INFRA_RUNTIME_COMPATIBILITY,
} from './features/infra/domain/constants';
export { isInfraAdapterDescriptor } from './features/infra/domain/isInfraAdapterDescriptor';
export { isInfraAuthSpec } from './features/infra/domain/isInfraAuthSpec';
export { isInfraDeploymentSpec } from './features/infra/domain/isInfraDeploymentSpec';
export { isInfraEnvironmentSpec } from './features/infra/domain/isInfraEnvironmentSpec';
export { isInfraManifest } from './features/infra/domain/isInfraManifest';
export { isInfraWorkloadSpec } from './features/infra/domain/isInfraWorkloadSpec';
export { parseInfraManifest } from './features/infra/domain/parseInfraManifest';
export { validateInfraAdapterSelection } from './features/infra/domain/validateInfraAdapterSelection';
export type * from './types/infraAdapters';
export type * from './types/infraLifecycle';
export type * from './types/infraManifest';
export type * from './types/infraSecrets';
export type * from './types/infraWorkload';
