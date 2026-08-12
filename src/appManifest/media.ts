import {
  MEDIA_ASSET_KINDS,
  type MediaAsset,
  type MediaAssetMetadata,
  type MediaAssetSource,
  type MediaManifest,
} from '../media';
import { isOptionalString, isRecord } from './shared';

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
    isOptionalString(value.contentType) &&
    (value.metadata === undefined || isMediaAssetMetadata(value.metadata))
  );
}

function isMediaAssetSource(value: unknown): value is MediaAssetSource {
  if (!isRecord(value) || typeof value.kind !== 'string') return false;

  if (value.kind === 'storage') {
    return (
      hasOnlyKeys(value, ['kind', 'storageId', 'bucket', 'path']) &&
      isOptionalString(value.storageId) &&
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
    isOptionalString(value.originalFileName) &&
    isOptionalString(value.createdAt) &&
    isOptionalFiniteNonNegativeNumber(value.sizeBytes) &&
    isOptionalFinitePositiveNumber(value.width) &&
    isOptionalFinitePositiveNumber(value.height) &&
    isOptionalFiniteNonNegativeNumber(value.durationMs)
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

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isOptionalFiniteNonNegativeNumber(value: unknown): boolean {
  return value === undefined || (typeof value === 'number' && Number.isFinite(value) && value >= 0);
}

function isOptionalFinitePositiveNumber(value: unknown): boolean {
  return value === undefined || (typeof value === 'number' && Number.isFinite(value) && value > 0);
}

function hasOnlyKeys(value: Record<string, unknown>, allowedKeys: readonly string[]): boolean {
  const allowed = new Set(allowedKeys);
  return Object.keys(value).every((key) => allowed.has(key));
}
