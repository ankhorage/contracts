import { isRecord } from '@ankhorage/utility/object';

import { isMediaAssetReference } from '../media';

/*** Validate a serializable icon as either a named font glyph or an SVG media reference. */
export function isIconSpec(value: unknown): boolean {
  if (!isRecord(value)) return false;

  const hasValidPresentation =
    (value.size === undefined ||
      typeof value.size === 'string' ||
      typeof value.size === 'number') &&
    (value.color === undefined || typeof value.color === 'string');
  if (!hasValidPresentation) return false;

  if ('source' in value) {
    return (
      isMediaAssetReference(value.source) &&
      value.name === undefined &&
      value.provider === undefined
    );
  }

  return (
    typeof value.name === 'string' &&
    (value.provider === undefined || typeof value.provider === 'string') &&
    value.source === undefined
  );
}
