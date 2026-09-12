import { isRecord } from '../../../appManifest/shared';
import type { InfraShape } from '../../../types/infraValidation';
import type { InfraWorkloadSpec } from '../../../types/infraWorkload';
import { infraFields } from './infraFields';
import { isInfraShape } from './isInfraShape';
import { isInfraWorkloadHealth } from './isInfraWorkloadHealth';
import { isInfraWorkloadValue } from './isInfraWorkloadValue';

/** Validate the portable desired workload; runtime-specific fields and plaintext secret objects fail. */
export function isInfraWorkloadSpec(value: unknown): value is InfraWorkloadSpec {
  return isInfraShape(value, {
    id: infraFields.text,
    artifact: (artifact) =>
      isInfraShape(artifact, { kind: (kind) => kind === 'image', image: infraFields.text }),
    command: infraFields.optionalStrings,
    args: (args) =>
      args === undefined || (Array.isArray(args) && args.every((arg) => typeof arg === 'string')),
    ports: (ports) =>
      ports === undefined ||
      (Array.isArray(ports) && ports.every(isPort) && hasUniqueField(ports, 'name')),
    environment: (environment) =>
      environment === undefined ||
      (isRecord(environment) && Object.values(environment).every(isInfraWorkloadValue)),
    files: (files) =>
      files === undefined ||
      (Array.isArray(files) && files.every(isFile) && hasUniqueField(files, 'path')),
    health: (health) => health === undefined || isInfraWorkloadHealth(health),
    resources: (resources) =>
      resources === undefined ||
      isInfraShape(resources, {
        cpuMillis: infraFields.optionalPositiveInteger,
        memoryMiB: infraFields.optionalPositiveInteger,
      }),
    persistence: (volumes) =>
      volumes === undefined ||
      (Array.isArray(volumes) &&
        volumes.every(isVolume) &&
        hasUniqueField(volumes, 'id') &&
        hasUniqueField(volumes, 'mountPath')),
    exposure: (exposure) =>
      exposure === undefined || exposure === 'internal' || exposure === 'public',
    replicas: infraFields.optionalNonnegativeInteger,
    dependsOn: infraFields.optionalStrings,
  } satisfies InfraShape<InfraWorkloadSpec>);
}

/** Named transport ports stay independent from runtime resource types. */
function isPort(value: unknown): boolean {
  return isInfraShape(value, {
    name: infraFields.text,
    port: infraFields.port,
    protocol: (protocol) => protocol === undefined || protocol === 'tcp' || protocol === 'udp',
  });
}

/** Portable files model policy/config materialization without host filesystem access. */
function isFile(value: unknown): boolean {
  return isInfraShape(value, { path: isAbsoluteWorkloadPath, content: isInfraWorkloadValue });
}

/** Persistence has explicit ownership-local identity and a retention policy. */
function isVolume(value: unknown): boolean {
  return isInfraShape(value, {
    id: infraFields.text,
    mountPath: isAbsoluteWorkloadPath,
    sizeGiB: infraFields.positiveInteger,
    retention: (retention) => retention === 'retain' || retention === 'delete-on-destroy',
  });
}

/** Workload paths are absolute container paths, never relative host traversal. */
function isAbsoluteWorkloadPath(value: unknown): boolean {
  return (
    typeof value === 'string' &&
    value.startsWith('/') &&
    value.length > 1 &&
    !value.split('/').includes('..')
  );
}

/** Duplicate workload-local identities would make runtime projection ambiguous. */
function hasUniqueField(values: readonly unknown[], field: string): boolean {
  const ids = values.map((value) => (isRecord(value) ? Reflect.get(value, field) : undefined));
  return new Set(ids).size === ids.length;
}
