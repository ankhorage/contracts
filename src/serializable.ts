import { isRecord } from '@ankhorage/utility/object';

import type { ValueMap } from './collections';

export type SerializableValue =
  | string
  | number
  | boolean
  | null
  | readonly SerializableValue[]
  | ValueMap<string, SerializableValue>;

/*** Validate recursively serializable manifest/config values without accepting functions or host objects. */
export function isSerializableValue(value: unknown): value is SerializableValue {
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return true;
  }
  if (Array.isArray(value)) return value.every(isSerializableValue);
  return isRecord(value) && Object.values(value).every(isSerializableValue);
}
