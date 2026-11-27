import { isRecord } from '@ankhorage/utility/object';
import { isNonEmptyString } from '@ankhorage/utility/string';

import { INFRA_RUNTIME_COMPATIBILITY } from '../infraCatalog.js';
import type {
  InfraComputeSelection,
  InfraDeploymentSpec,
  InfraRuntimeSelection,
} from '../types/infraManifest.js';
import type { InfraShape } from '../types/infraValidation.js';
import { infraFields } from './infraFields.js';
import { isInfraCredentialRef } from './isInfraCredentialRef.js';
import { isInfraShape } from './isInfraShape.js';

/*** Validate provider-specific config and the exact same compatibility map used by TypeScript. */
export function isInfraDeploymentSpec(value: unknown): value is InfraDeploymentSpec {
  if (!isInfraShape(value, { compute: isCompute, runtime: isRuntime }) || !isRecord(value))
    return false;
  if (!isRecord(value.compute) || !isRecord(value.runtime)) return false;
  const compute = value.compute.provider;
  const runtime = value.runtime.provider;
  return Object.entries(INFRA_RUNTIME_COMPATIBILITY).some(
    ([id, providers]) => id === runtime && providers.some((provider) => provider === compute),
  );
}

/*** Compute configuration is closed per provider; control-plane refs cannot be managed secrets. */
function isCompute(value: unknown): boolean {
  if (!isRecord(value)) return false;
  if (value.provider === 'local')
    return isInfraShape(value, {
      provider: (provider) => provider === 'local',
      workingDirectory: infraFields.optionalText,
    } satisfies InfraShape<InfraComputeSelection<'local'>>);
  if (value.provider === 'hetzner')
    return isInfraShape(value, {
      provider: (provider) => provider === 'hetzner',
      location: isNonEmptyString,
      serverType: infraFields.optionalText,
      image: infraFields.optionalText,
      credentials: (credentials) => credentials === undefined || isInfraCredentialRef(credentials),
      ssh: (ssh) =>
        ssh === undefined ||
        isInfraShape(ssh, {
          user: infraFields.optionalText,
          port: infraFields.optionalPositiveInteger,
          credentials: (credentials) =>
            credentials === undefined || isInfraCredentialRef(credentials),
        }),
    } satisfies InfraShape<InfraComputeSelection<'hetzner'>>);
  return isAwsEc2Compute(value);
}

/*** Validate the closed portable AWS EC2 compute selection. */
function isAwsEc2Compute(value: Readonly<Record<string, unknown>>): boolean {
  return isInfraShape(value, {
    provider: (provider) => provider === 'aws-ec2',
    region: isNonEmptyString,
    instanceType: isNonEmptyString,
    ami: isNonEmptyString,
    architecture: (architecture) => architecture === 'x86_64' || architecture === 'arm64',
    vpcId: isNonEmptyString,
    subnetId: isNonEmptyString,
    securityGroupIds: (ids) => Array.isArray(ids) && infraFields.strings(ids) && ids.length > 0,
    credentials: (credentials) => credentials === undefined || isInfraCredentialRef(credentials),
    iamInstanceProfile: infraFields.optionalText,
    ssh: (ssh) =>
      isInfraShape(ssh, {
        keyName: isNonEmptyString,
        credentials: isInfraCredentialRef,
        hostKeyFingerprint: isNonEmptyString,
        authorizedCidrs: (cidrs) =>
          Array.isArray(cidrs) && infraFields.strings(cidrs) && cidrs.length > 0,
        user: infraFields.optionalText,
        port: infraFields.optionalPort,
      }),
    rootVolume: (volume) =>
      volume === undefined ||
      isInfraShape(volume, {
        sizeGiB: infraFields.optionalPositiveInteger,
        type: (type) => type === undefined || isEbsVolumeType(type),
        iops: infraFields.optionalPositiveInteger,
        throughputMiBps: infraFields.optionalPositiveInteger,
        deleteOnTermination: (deleteOnTermination) =>
          deleteOnTermination === undefined || typeof deleteOnTermination === 'boolean',
      }),
    tags: (tags) => tags === undefined || isStringRecord(tags),
  } satisfies InfraShape<InfraComputeSelection<'aws-ec2'>>);
}

/*** Identify the supported EBS root-volume types. */
function isEbsVolumeType(value: unknown): value is 'gp3' | 'gp2' | 'io1' | 'io2' {
  return value === 'gp3' || value === 'gp2' || value === 'io1' || value === 'io2';
}

/** Validate user-supplied non-secret tags without accepting arbitrary nested configuration. */
function isStringRecord(value: unknown): boolean {
  return (
    isRecord(value) &&
    Object.entries(value).every(
      ([key, entry]) => isNonEmptyString(key) && typeof entry === 'string' && entry.length > 0,
    )
  );
}

/*** Runtime topology expresses host roles and never couples k3s to a compute vendor. */
function isRuntime(value: unknown): boolean {
  if (!isRecord(value)) return false;
  switch (value.provider) {
    case 'minikube':
      return isInfraShape(value, {
        provider: (provider) => provider === 'minikube',
        profile: infraFields.optionalText,
        driver: (driver) => driver === undefined || driver === 'docker' || driver === 'podman',
        cpus: infraFields.optionalPositiveInteger,
        memoryMiB: infraFields.optionalPositiveInteger,
      } satisfies InfraShape<InfraRuntimeSelection<'minikube'>>);
    case 'k3s':
      return isInfraShape(value, {
        provider: (provider) => provider === 'k3s',
        version: infraFields.optionalText,
        topology: (topology) =>
          topology === undefined ||
          isInfraShape(topology, {
            servers: infraFields.positiveInteger,
            agents: infraFields.nonnegativeInteger,
          }),
      } satisfies InfraShape<InfraRuntimeSelection<'k3s'>>);
    case 'docker-compose':
      return isInfraShape(value, {
        provider: (provider) => provider === 'docker-compose',
        projectName: infraFields.optionalText,
      } satisfies InfraShape<InfraRuntimeSelection<'docker-compose'>>);
    default:
      return false;
  }
}
