import { isRecord } from '@ankhorage/utility/object';
import { isNonEmptyString } from '@ankhorage/utility/string';

import type { InfraWorkloadScalarValue } from '../types/infraWorkload.js';
import { isInfraCredentialRef, isInfraSecretReference } from './isInfraCredentialRef.js';
import { isInfraShape } from './isInfraShape.js';

/*** Workload values explicitly distinguish public literals, output dependencies and secret references. */
export function isInfraWorkloadValue(value: unknown): boolean {
  return (
    isInfraWorkloadScalarValue(value) ||
    isInfraShape(value, {
      kind: (kind) => kind === 'template',
      segments: (segments) =>
        Array.isArray(segments) &&
        segments.length > 0 &&
        segments.every(isInfraWorkloadScalarValue),
    })
  );
}

/*** Validate one non-composite workload value segment. */
function isInfraWorkloadScalarValue(value: unknown): value is InfraWorkloadScalarValue {
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
        resourceId: isNonEmptyString,
        output: isNonEmptyString,
      });
    case 'secret':
      return isInfraShape(value, {
        kind: (kind) => kind === 'secret',
        reference: isInfraSecretReference,
      });
    case 'credential':
      return isInfraShape(value, {
        kind: (kind) => kind === 'credential',
        reference: isInfraCredentialRef,
        key: isNonEmptyString,
      });
    default:
      return false;
  }
}
