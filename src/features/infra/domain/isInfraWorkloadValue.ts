import { isRecord } from '../../../appManifest/shared';
import { APP_ENVIRONMENT_IDS } from '../../../environments';
import { infraFields } from './infraFields';
import { isInfraShape } from './isInfraShape';

/** Workload values explicitly distinguish public literals, output dependencies and secret references. */
export function isInfraWorkloadValue(value: unknown): boolean {
  if (!isRecord(value)) return false;
  switch (value.kind) {
    case 'literal':
      return isInfraShape(value, {
        kind: (kind) => kind === 'literal',
        value: (field) => typeof field === 'string',
      });
    case 'output':
      return isInfraShape(value, {
        kind: (kind) => kind === 'output',
        resourceId: infraFields.text,
        output: infraFields.text,
      });
    case 'secret':
      return isInfraShape(value, {
        kind: (kind) => kind === 'secret',
        reference: isSecretReference,
      });
    default:
      return false;
  }
}

/** Managed secret references contain identity only, never privileged payloads. */
function isSecretReference(value: unknown): boolean {
  return isInfraShape(value, {
    source: (source) => source === 'secret-store',
    projectId: infraFields.text,
    environment: (environment) => APP_ENVIRONMENT_IDS.some((id) => id === environment),
    ref: infraFields.text,
    key: infraFields.text,
  });
}
