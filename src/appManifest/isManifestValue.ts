import { isRecord } from '@ankhorage/utility/object';

/*** Return whether an unknown value is serializable manifest data. */
export function isManifestValue(value: unknown): boolean {
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every(isManifestValue);
  }

  return isRecord(value) && Object.values(value).every(isManifestValue);
}
