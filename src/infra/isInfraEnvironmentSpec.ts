import { isRecord } from '@ankhorage/utility/object';
import { isNonEmptyString } from '@ankhorage/utility/string';

import type { InfraEnvironmentSpec, InfraObjectStorageSpec } from '../types/infraManifest';
import type { InfraShape } from '../types/infraValidation';
import { INFRA_ADAPTER_CATALOG } from './constants';
import { infraFields } from './infraFields';
import { isInfraAuthSpec } from './isInfraAuthSpec';
import { isInfraCredentialRef } from './isInfraCredentialRef';
import { isInfraDeploymentSpec } from './isInfraDeploymentSpec';
import { isInfraShape } from './isInfraShape';
import { isInfraWorkloadSpec } from './isInfraWorkloadSpec';

/*** Validate sibling capabilities and their required relationships within one environment. */
export function isInfraEnvironmentSpec(value: unknown): value is InfraEnvironmentSpec {
  return isEnvironmentShape(value) && hasServiceDependencies(value);
}

/*** Check all environment field shapes before inspecting canonical dependency metadata. */
function isEnvironmentShape(value: unknown): value is InfraEnvironmentSpec {
  return isInfraShape(value, {
    deployment: isInfraDeploymentSpec,
    database: (database) =>
      database === undefined ||
      isInfraShape(database, {
        provider: (provider) => provider === 'supabase',
        tier: (tier) => tier === undefined || tier === 'dev' || tier === 'prod',
      }),
    objectStorage: (storage) => storage === undefined || isObjectStorage(storage),
    auth: (auth) => auth === undefined || isInfraAuthSpec(auth),
    authz: (authz) =>
      authz === undefined ||
      isInfraShape(authz, {
        provider: (provider) => provider === 'cerbos',
        kind: (kind) => kind === 'ABAC' || kind === 'RBAC',
        policies: (policies) => policies === undefined || isPolicyFiles(policies),
      }),
    secretStore: (store) =>
      store === undefined ||
      isInfraShape(store, {
        provider: (provider) => provider === 'supabase-vault',
        schema: infraFields.optionalText,
      }),
    networking: (networking) =>
      networking === undefined ||
      isInfraShape(networking, {
        domain: infraFields.optionalText,
        publicBaseUrl: (publicBaseUrl) =>
          publicBaseUrl === undefined || isPublicHttpOrigin(publicBaseUrl),
      }),
    workloads: (workloads) => workloads === undefined || isWorkloads(workloads),
  } satisfies InfraShape<InfraEnvironmentSpec>);
}

/*** Public workload configuration uses one canonical absolute HTTP(S) origin without path state. */
function isPublicHttpOrigin(value: unknown): boolean {
  if (!isNonEmptyString(value)) return false;
  try {
    const url = new URL(value);
    return (url.protocol === 'http:' || url.protocol === 'https:') && url.origin === value;
  } catch {
    return false;
  }
}

/*** Validate portable, unique Cerbos policy files without host paths or traversal. */
function isPolicyFiles(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.every((policy) =>
      isInfraShape(policy, {
        path: (path) =>
          isNonEmptyString(path) && !path.startsWith('/') && !path.split('/').includes('..'),
        content: isNonEmptyString,
      }),
    ) &&
    new Set(value.map((policy) => (isRecord(policy) ? policy.path : undefined))).size ===
      value.length
  );
}

/*** Object storage can vary independently from database/auth; there is no implicit auto provider. */
function isObjectStorage(value: unknown): boolean {
  if (!isRecord(value)) return false;
  const common = {
    provider: (provider: unknown) => provider === value.provider,
    buckets: infraFields.optionalStrings,
  };
  if (value.provider === 'supabase') return isInfraShape(value, common);
  return isInfraShape(value, {
    ...common,
    provider: (provider) => provider === 'r2',
    accountId: infraFields.optionalText,
    credentials: (credentials) => credentials === undefined || isInfraCredentialRef(credentials),
  } satisfies InfraShape<Extract<InfraObjectStorageSpec, { readonly provider: 'r2' }>>);
}

/*** Duplicate desired workload identities cannot be reconciled safely. */
function isWorkloads(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.every(isInfraWorkloadSpec) &&
    new Set(value.map((workload) => workload.id)).size === value.length
  );
}

/*** Check catalog dependencies against selected sibling capabilities and runtime capabilities. */
function hasServiceDependencies(value: InfraEnvironmentSpec): boolean {
  const selections = [
    value.database,
    value.auth,
    value.authz,
    value.objectStorage,
    value.secretStore,
  ];
  const runtime = Object.values(INFRA_ADAPTER_CATALOG).find(
    (entry) => entry.id === value.deployment.runtime.provider,
  );
  const capabilities = new Set<string>([
    'compute',
    ...(runtime?.capabilities ?? []),
    ...Object.entries(value)
      .filter(([, selection]) => selection !== undefined)
      .map(([capability]) => capability),
  ]);
  return Object.values(INFRA_ADAPTER_CATALOG)
    .filter((entry) => selections.some((selection) => selection?.provider === entry.id))
    .every((entry) => entry.dependencies.every((dependency) => capabilities.has(dependency)));
}
