import { isRecord } from '../../../appManifest/shared';

/** Validate an exact Infra object shape, rejecting unknown and superseded configuration keys. */
export function isInfraShape(
  value: unknown,
  fields: Readonly<Record<string, (field: unknown) => boolean>>,
): boolean {
  if (!isRecord(value)) return false;
  const entries = Object.entries(fields);
  return (
    Object.keys(value).every((key) => Object.hasOwn(fields, key)) &&
    entries.every(([key, validate]) =>
      validate(Object.hasOwn(value, key) ? Reflect.get(value, key) : undefined),
    )
  );
}
