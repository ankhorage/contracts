import { isStringArray } from '@ankhorage/utility/array';
import { isRecord } from '@ankhorage/utility/object';
import { isNonEmptyString } from '@ankhorage/utility/string';

import type { InfraShape } from '../types/infraValidation';
import type { InfraWorkloadSpec } from '../types/infraWorkload';
import { infraFields } from './infraFields';
import { isInfraShape } from './isInfraShape';
import { isInfraWorkloadHealth } from './isInfraWorkloadHealth';
import { isInfraWorkloadValue } from './isInfraWorkloadValue';

/*** Validate the portable desired workload; runtime-specific fields and plaintext secret objects fail. */
export function isInfraWorkloadSpec(value: unknown): value is InfraWorkloadSpec {
  if (
    !isInfraShape(value, {
      id: isNonEmptyString,
      artifact: (artifact) =>
        isInfraShape(artifact, { kind: (kind) => kind === 'image', image: isNonEmptyString }),
      command: infraFields.optionalStrings,
      args: (args) => args === undefined || isStringArray(args),
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
    } satisfies InfraShape<InfraWorkloadSpec>)
  ) {
    return false;
  }
  return hasValidPublishedPorts(value);
}

/*** Named transport ports stay independent from runtime resource types. */
function isPort(value: unknown): boolean {
  return isInfraShape(value, {
    name: isNonEmptyString,
    port: infraFields.port,
    protocol: (protocol) => protocol === undefined || protocol === 'tcp' || protocol === 'udp',
    publishedPort: infraFields.optionalPort,
  });
}

/*** Require fixed external listeners to belong to one public workload replica. */
function hasValidPublishedPorts(workload: unknown): boolean {
  if (!isRecord(workload)) return false;
  const ports = Array.isArray(workload.ports) ? workload.ports : [];
  const published = ports.flatMap((port) => {
    if (!isRecord(port) || typeof port.publishedPort !== 'number') return [];
    return [port.publishedPort];
  });
  return (
    new Set(published).size === published.length &&
    (published.length === 0 ||
      (workload.exposure === 'public' &&
        (workload.replicas === undefined ||
          (typeof workload.replicas === 'number' && workload.replicas <= 1))))
  );
}

/*** Portable files model policy/config materialization without host filesystem access. */
function isFile(value: unknown): boolean {
  return isInfraShape(value, { path: isAbsoluteWorkloadPath, content: isInfraWorkloadValue });
}

/*** Persistence has explicit ownership-local identity, optional initialization and retention policy. */
function isVolume(value: unknown): boolean {
  return isInfraShape(value, {
    id: isNonEmptyString,
    mountPath: isAbsoluteWorkloadPath,
    sizeGiB: infraFields.positiveInteger,
    seed: (seed) => seed === undefined || seed === 'image',
    retention: (retention) => retention === 'retain' || retention === 'delete-on-destroy',
  });
}

/*** Workload paths are absolute container paths, never relative host traversal. */
function isAbsoluteWorkloadPath(value: unknown): boolean {
  return (
    typeof value === 'string' &&
    value.startsWith('/') &&
    value.length > 1 &&
    !value.split('/').includes('..')
  );
}

/*** Duplicate workload-local identities would make runtime projection ambiguous. */
function hasUniqueField(values: readonly unknown[], field: string): boolean {
  const ids = values.map((value) => (isRecord(value) ? Reflect.get(value, field) : undefined));
  return new Set(ids).size === ids.length;
}
