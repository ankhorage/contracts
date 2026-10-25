import { isNonEmptyString } from '@ankhorage/utility/string';

import { isInfraShape } from './isInfraShape.js';

/*** Bootstrap credential references are explicitly separate from managed runtime secrets. */
export function isInfraCredentialRef(value: unknown): boolean {
  return isInfraShape(value, {
    source: (source) => source === 'control-plane',
    name: isNonEmptyString,
  });
}
