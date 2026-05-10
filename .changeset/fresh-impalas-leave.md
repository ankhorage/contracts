---
'@ankhorage/contracts': minor
---

Add provider-neutral storage and image asset contracts.

This introduces serializable storage asset references, a `StorageAdapter` contract for upload, remove, and public URL workflows, and manifest-safe `ImageAssetSource` variants for storage-backed and URL-backed images.

The storage upload boundary uses `Uint8Array` only, avoids DOM-specific `File`/`Blob` types, and keeps storage identity provider-neutral through `storageId`, `bucket`, and `path`.
