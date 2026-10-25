/** Canonical standalone infrastructure contracts, catalog and side-effect-free validation. */
export { isInfraAdapterDescriptor } from './infra/isInfraAdapterDescriptor.js';
export { isInfraAuthSpec } from './infra/isInfraAuthSpec.js';
export { isInfraDeploymentSpec } from './infra/isInfraDeploymentSpec.js';
export { isInfraEnvironmentSpec } from './infra/isInfraEnvironmentSpec.js';
export { isInfraManifest } from './infra/isInfraManifest.js';
export { isInfraWorkloadSpec } from './infra/isInfraWorkloadSpec.js';
export { parseInfraManifest } from './infra/parseInfraManifest.js';
export { validateInfraAdapterSelection } from './infra/validateInfraAdapterSelection.js';
export { INFRA_ADAPTER_CATALOG, INFRA_RUNTIME_COMPATIBILITY } from './infraCatalog.js';
export type * from './types/infraAdapters.js';
export type * from './types/infraLifecycle.js';
export type * from './types/infraManifest.js';
export type * from './types/infraSecrets.js';
export type * from './types/infraTargets.js';
export type * from './types/infraWorkload.js';
