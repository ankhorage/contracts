import { isRecord } from '@ankhorage/utility/object';

export type SerializableSet<T extends string = string> = Readonly<Partial<Record<T, true>>>;

/*** Validate the canonical JSON-safe representation for unordered string membership. */
export function isSerializableSet(value: unknown): value is SerializableSet {
  return isRecord(value) && Object.values(value).every((member) => member === true);
}
