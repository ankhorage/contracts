import type { DataSchema } from './data/schemas.js';

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

export interface StorageObjectMetadata {
  storageId?: string;
  bucket: string;
  path: string;
  contentType?: string;
  sizeBytes?: number;
  createdAt?: string;
  updatedAt?: string;
  etag?: string;
}

export interface StorageListInput {
  storageId?: string;
  bucket: string;
  prefix?: string;
  cursor?: string;
  limit?: number;
}

export interface StorageListResult {
  objects: readonly StorageObjectMetadata[];
  nextCursor?: string;
}

export type StorageResolvedAccess = 'public' | 'signed';

export interface StorageResolveInput {
  storageId?: string;
  bucket: string;
  path: string;
  access?: StorageResolvedAccess;
  expiresInSeconds?: number;
}

export interface StorageResolvedAsset {
  storageId?: string;
  bucket: string;
  path: string;
  url: string;
  access: StorageResolvedAccess;
  expiresAt?: string;
}

export interface StorageResolveResult {
  asset: StorageResolvedAsset;
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

export interface StorageListAdapter {
  list(input: StorageListInput): Promise<StorageResult<StorageListResult>>;
}

export interface StorageResolveAdapter {
  resolve(input: StorageResolveInput): Promise<StorageResult<StorageResolveResult>>;
}

/**
 * Storage capability required by the app-authoring media service.
 *
 * Remote URL import/ingest is intentionally not part of this low-level object-storage
 * contract. It is a trusted service operation that can be implemented by reading the
 * remote object and delegating to `upload` when ingestion is requested.
 */
export interface MediaStorageAdapter
  extends StorageAdapter, StorageListAdapter, StorageResolveAdapter {}

/**
 * Portable schema sources for provider-neutral storage values and operations.
 *
 * Upload bytes use a standard Base64 string. The source `StorageUploadInput` remains a
 * `Uint8Array` at the adapter boundary; catalogs serialize its `body` with this schema and
 * reconstruct the bytes before invoking an adapter.
 */
export const STORAGE_BYTES_SCHEMA = {
  type: 'string',
  format: 'base64',
} as const satisfies DataSchema;

export const STORAGE_IDENTITY_SCHEMA = {
  type: 'object',
  required: ['bucket', 'path'],
  properties: {
    storageId: { type: 'string' },
    bucket: { type: 'string' },
    path: { type: 'string' },
  },
} as const satisfies DataSchema;

export const STORAGE_ASSET_REFERENCE_SCHEMA = {
  ...STORAGE_IDENTITY_SCHEMA,
  properties: {
    ...STORAGE_IDENTITY_SCHEMA.properties,
    publicUrl: { type: 'string' },
  },
} as const satisfies DataSchema;

export const STORAGE_OBJECT_METADATA_SCHEMA = {
  ...STORAGE_IDENTITY_SCHEMA,
  properties: {
    ...STORAGE_IDENTITY_SCHEMA.properties,
    contentType: { type: 'string' },
    sizeBytes: { type: 'integer' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    etag: { type: 'string' },
  },
} as const satisfies DataSchema;

export const STORAGE_UPLOAD_INPUT_SCHEMA = {
  ...STORAGE_IDENTITY_SCHEMA,
  required: ['bucket', 'path', 'body'],
  properties: {
    ...STORAGE_IDENTITY_SCHEMA.properties,
    body: STORAGE_BYTES_SCHEMA,
    contentType: { type: 'string' },
    cacheControl: { type: 'string' },
    upsert: { type: 'boolean' },
  },
} as const satisfies DataSchema;

export const STORAGE_UPLOAD_RESULT_SCHEMA = {
  type: 'object',
  required: ['asset'],
  properties: { asset: STORAGE_ASSET_REFERENCE_SCHEMA },
} as const satisfies DataSchema;

export const STORAGE_REMOVE_INPUT_SCHEMA = {
  ...STORAGE_IDENTITY_SCHEMA,
  description: 'Identifies the stored object to remove.',
} as const satisfies DataSchema;

export const STORAGE_PUBLIC_URL_INPUT_SCHEMA = {
  ...STORAGE_IDENTITY_SCHEMA,
  description: 'Identifies the stored object whose public URL is requested.',
} as const satisfies DataSchema;

export const STORAGE_PUBLIC_URL_RESULT_SCHEMA = {
  type: 'object',
  required: ['publicUrl'],
  properties: { publicUrl: { type: 'string' } },
} as const satisfies DataSchema;

export const STORAGE_LIST_INPUT_SCHEMA = {
  type: 'object',
  required: ['bucket'],
  properties: {
    storageId: { type: 'string' },
    bucket: { type: 'string' },
    prefix: { type: 'string' },
    cursor: { type: 'string' },
    limit: { type: 'integer' },
  },
} as const satisfies DataSchema;

export const STORAGE_LIST_RESULT_SCHEMA = {
  type: 'object',
  required: ['objects'],
  properties: {
    objects: { type: 'array', items: STORAGE_OBJECT_METADATA_SCHEMA },
    nextCursor: { type: 'string' },
  },
} as const satisfies DataSchema;

export const STORAGE_RESOLVE_INPUT_SCHEMA = {
  ...STORAGE_IDENTITY_SCHEMA,
  properties: {
    ...STORAGE_IDENTITY_SCHEMA.properties,
    access: { type: 'string', enum: ['public', 'signed'] },
    expiresInSeconds: { type: 'integer' },
  },
} as const satisfies DataSchema;

export const STORAGE_RESOLVED_ASSET_SCHEMA = {
  ...STORAGE_IDENTITY_SCHEMA,
  required: ['bucket', 'path', 'url', 'access'],
  properties: {
    ...STORAGE_IDENTITY_SCHEMA.properties,
    url: { type: 'string' },
    access: { type: 'string', enum: ['public', 'signed'] },
    expiresAt: { type: 'string' },
  },
} as const satisfies DataSchema;

export const STORAGE_RESOLVE_RESULT_SCHEMA = {
  type: 'object',
  required: ['asset'],
  properties: { asset: STORAGE_RESOLVED_ASSET_SCHEMA },
} as const satisfies DataSchema;

export const STORAGE_ADAPTER_ERROR_SCHEMA = {
  type: 'object',
  required: ['code', 'message'],
  properties: {
    code: { type: 'string' },
    message: { type: 'string' },
    cause: {},
  },
} as const satisfies DataSchema;

export const STORAGE_SUCCESS_SCHEMA = {
  type: 'object',
  required: ['ok'],
  properties: { ok: { const: true } },
} as const satisfies DataSchema;

export const STORAGE_ERROR_RESULT_SCHEMA = {
  type: 'object',
  required: ['ok', 'error'],
  properties: {
    ok: { const: false },
    error: STORAGE_ADAPTER_ERROR_SCHEMA,
  },
} as const satisfies DataSchema;

export const STORAGE_VOID_RESULT_SCHEMA = {
  oneOf: [STORAGE_SUCCESS_SCHEMA, STORAGE_ERROR_RESULT_SCHEMA],
} as const satisfies DataSchema;

export const STORAGE_UPLOAD_OPERATION_RESULT_SCHEMA = {
  oneOf: [
    {
      ...STORAGE_SUCCESS_SCHEMA,
      properties: { ...STORAGE_SUCCESS_SCHEMA.properties, data: STORAGE_UPLOAD_RESULT_SCHEMA },
    },
    STORAGE_ERROR_RESULT_SCHEMA,
  ],
} as const satisfies DataSchema;

export const STORAGE_PUBLIC_URL_OPERATION_RESULT_SCHEMA = {
  oneOf: [
    {
      ...STORAGE_SUCCESS_SCHEMA,
      properties: { ...STORAGE_SUCCESS_SCHEMA.properties, data: STORAGE_PUBLIC_URL_RESULT_SCHEMA },
    },
    STORAGE_ERROR_RESULT_SCHEMA,
  ],
} as const satisfies DataSchema;

export const STORAGE_LIST_OPERATION_RESULT_SCHEMA = {
  oneOf: [
    {
      ...STORAGE_SUCCESS_SCHEMA,
      properties: { ...STORAGE_SUCCESS_SCHEMA.properties, data: STORAGE_LIST_RESULT_SCHEMA },
    },
    STORAGE_ERROR_RESULT_SCHEMA,
  ],
} as const satisfies DataSchema;

export const STORAGE_RESOLVE_OPERATION_RESULT_SCHEMA = {
  oneOf: [
    {
      ...STORAGE_SUCCESS_SCHEMA,
      properties: { ...STORAGE_SUCCESS_SCHEMA.properties, data: STORAGE_RESOLVE_RESULT_SCHEMA },
    },
    STORAGE_ERROR_RESULT_SCHEMA,
  ],
} as const satisfies DataSchema;
