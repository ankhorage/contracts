import { isNonEmptyString } from '@ankhorage/utility/string';

import { APP_ENVIRONMENT_IDS } from '../environments.js';
import type { InfraSecretReference } from '../types/infraSecrets.js';
import { isInfraShape } from './isInfraShape.js';

/*** Bootstrap credential references are explicitly separate from managed runtime secrets. */
export function isInfraCredentialRef(value: unknown): boolean {
  return isInfraShape(value, {
    source: (source) => source === 'control-plane',
    name: isNonEmptyString,
  });
}

/*** Managed secret references contain identity only and never privileged material. */
export function isInfraSecretReference(value: unknown): value is InfraSecretReference {
  return isInfraShape(value, {
    source: (source) => source === 'secret-store',
    projectId: isNonEmptyString,
    environment: (environment) => APP_ENVIRONMENT_IDS.some((id) => id === environment),
    ref: isNonEmptyString,
    key: isNonEmptyString,
  });
}
