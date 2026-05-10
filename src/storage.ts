export interface StorageAdapterError {
  code: string;
  message: string;
  cause?: unknown;
}

export type StorageOkResult<TData> = [TData] extends [void]
  ? { ok: true; data?: undefined }
  : { ok: true; data: TData };

export type StorageResult<TData = void> =
  | StorageOkResult<TData>
  | {
      ok: false;
      error: StorageAdapterError;
    };

export interface StorageAssetReference {
  storageId?: string;
  bucket: string;
  path: string;
  publicUrl?: string;
}

export interface StorageUploadInput {
  storageId?: string;
  bucket: string;
  path: string;
  body: Uint8Array;
  contentType?: string;
  cacheControl?: string;
  upsert?: boolean;
}

export interface StorageUploadResult {
  asset: StorageAssetReference;
}

export interface StorageRemoveInput {
  storageId?: string;
  bucket: string;
  path: string;
}

export interface StoragePublicUrlInput {
  storageId?: string;
  bucket: string;
  path: string;
}

export interface StoragePublicUrlResult {
  publicUrl: string;
}

export interface ImageMetadata {
  fileName?: string;
  sizeBytes?: number;
  createdAt?: string;
}

export interface StorageImageAssetSource {
  kind: 'storage';
  storageId?: string;
  bucket: string;
  path: string;
  publicUrl?: string;
  alt?: string;
  width?: number;
  height?: number;
  contentType?: string;
  metadata?: ImageMetadata;
}

export interface UrlImageAssetSource {
  kind: 'url';
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  contentType?: string;
  metadata?: ImageMetadata;
}

export type ImageAssetSource = StorageImageAssetSource | UrlImageAssetSource;

export interface StorageAdapter {
  upload(input: StorageUploadInput): Promise<StorageResult<StorageUploadResult>>;
  remove(input: StorageRemoveInput): Promise<StorageResult>;
  publicUrl(input: StoragePublicUrlInput): Promise<StorageResult<StoragePublicUrlResult>>;
  getImageMetadata?(input: StorageAssetReference): Promise<StorageResult<ImageMetadata>>;
}
