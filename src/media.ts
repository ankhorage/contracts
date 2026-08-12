export const MEDIA_ASSET_KINDS = ['image', 'audio', 'video', 'font', 'file'] as const;

export type MediaAssetKind = (typeof MEDIA_ASSET_KINDS)[number];

export interface MediaStorageSource {
  readonly kind: 'storage';
  /** Optional logical storage connection identifier for future multi-storage apps. */
  readonly storageId?: string;
  readonly bucket: string;
  readonly path: string;
}

export interface MediaUrlSource {
  readonly kind: 'url';
  /** Stable remote URL. Transient/local URL schemes are not canonical media sources. */
  readonly url: string;
}

export interface MediaBundledSource {
  readonly kind: 'bundled';
  /** App-relative bundled asset path resolved by the generated/runtime host. */
  readonly path: string;
}

export type MediaAssetSource = MediaStorageSource | MediaUrlSource | MediaBundledSource;

export interface MediaAssetMetadata {
  readonly originalFileName?: string;
  readonly sizeBytes?: number;
  readonly createdAt?: string;
  readonly width?: number;
  readonly height?: number;
  readonly durationMs?: number;
}

/** Canonical Studio-managed authoring media entry. */
export interface MediaAsset {
  readonly id: string;
  readonly name: string;
  readonly kind: MediaAssetKind;
  readonly source: MediaAssetSource;
  readonly contentType?: string;
  readonly metadata?: MediaAssetMetadata;
}

export type MediaAssetRegistry = Readonly<Record<string, MediaAsset>>;

/** App-authoring media pool. Runtime/user-generated uploads do not belong here. */
export interface MediaManifest {
  readonly assets: MediaAssetRegistry;
}

/** Stable component/property reference to one entry in `AppManifest.media.assets`. */
export interface MediaAssetReference {
  readonly mediaId: string;
}

export function isMediaAssetReference(value: unknown): value is MediaAssetReference {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.keys(value).length === 1 &&
    'mediaId' in value &&
    typeof value.mediaId === 'string' &&
    value.mediaId.trim().length > 0
  );
}
