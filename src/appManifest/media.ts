import { hasOnlyKeys, isRecord } from '@ankhorage/utility/object';
import { isNonEmptyString } from '@ankhorage/utility/string';

import {
  MEDIA_ASSET_KINDS,
  type MediaAsset,
  type MediaAssetMetadata,
  type MediaAssetSource,
  type MediaManifest,
} from '../media';

const MEDIA_ASSET_KIND_SET = new Set<string>(MEDIA_ASSET_KINDS);

export function isMediaManifest(value: unknown): value is MediaManifest {
  if (!isRecord(value) || !hasOnlyKeys(value, ['assets']) || !isRecord(value.assets)) return false;

  return Object.entries(value.assets).every(
    ([assetId, asset]) => isMediaAsset(asset) && asset.id === assetId,
  );
}

function isMediaAsset(value: unknown): value is MediaAsset {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, ['id', 'name', 'kind', 'source', 'contentType', 'metadata']) &&
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.name) &&
    typeof value.kind === 'string' &&
    MEDIA_ASSET_KIND_SET.has(value.kind) &&
    isMediaAssetSource(value.source) &&
    (value.contentType === undefined || typeof value.contentType === 'string') &&
    (value.metadata === undefined || isMediaAssetMetadata(value.metadata))
  );
}

function isMediaAssetSource(value: unknown): value is MediaAssetSource {
  if (!isRecord(value) || typeof value.kind !== 'string') return false;

  if (value.kind === 'storage') {
    return (
      hasOnlyKeys(value, ['kind', 'storageId', 'bucket', 'path']) &&
      (value.storageId === undefined || typeof value.storageId === 'string') &&
      isNonEmptyString(value.bucket) &&
      isNonEmptyString(value.path)
    );
  }

  if (value.kind === 'url') {
    return hasOnlyKeys(value, ['kind', 'url']) && isStableRemoteUrl(value.url);
  }

  return (
    value.kind === 'bundled' && hasOnlyKeys(value, ['kind', 'path']) && isBundledPath(value.path)
  );
}

function isMediaAssetMetadata(value: unknown): value is MediaAssetMetadata {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, [
      'originalFileName',
      'sizeBytes',
      'createdAt',
      'width',
      'height',
      'durationMs',
    ]) &&
    hasValidMediaTextMetadata(value) &&
    hasValidMediaDimensions(value) &&
    hasValidMediaFileMeasurements(value)
  );
}

/*** Validate optional text metadata owned by a media asset. */
function hasValidMediaTextMetadata(value: Record<string, unknown>): boolean {
  return (
    (value.originalFileName === undefined || typeof value.originalFileName === 'string') &&
    (value.createdAt === undefined || typeof value.createdAt === 'string')
  );
}

/*** Validate optional pixel dimensions owned by image media. */
function hasValidMediaDimensions(value: Record<string, unknown>): boolean {
  return (
    (value.width === undefined ||
      (typeof value.width === 'number' && Number.isFinite(value.width) && value.width > 0)) &&
    (value.height === undefined ||
      (typeof value.height === 'number' && Number.isFinite(value.height) && value.height > 0))
  );
}

/*** Validate optional media byte size and duration measurements. */
function hasValidMediaFileMeasurements(value: Record<string, unknown>): boolean {
  return (
    (value.sizeBytes === undefined ||
      (typeof value.sizeBytes === 'number' &&
        Number.isFinite(value.sizeBytes) &&
        value.sizeBytes >= 0)) &&
    (value.durationMs === undefined ||
      (typeof value.durationMs === 'number' &&
        Number.isFinite(value.durationMs) &&
        value.durationMs >= 0))
  );
}

function isStableRemoteUrl(value: unknown): boolean {
  return typeof value === 'string' && /^https?:\/\//iu.test(value.trim());
}

function isBundledPath(value: unknown): boolean {
  if (!isNonEmptyString(value)) return false;
  const path = value.trim();
  if (path.startsWith('/') || /^[a-z][a-z0-9+.-]*:/iu.test(path)) return false;
  return !path.split('/').includes('..');
}
