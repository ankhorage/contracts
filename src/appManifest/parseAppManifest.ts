import type { AppManifestParseResult } from '../types/appManifest.js';
import { isAppManifest } from './isAppManifest.js';

/**
 * Parse unknown JSON-compatible input at the canonical AppManifest boundary.
 *
 * Contracts owns structural manifest validation. Consumers may add semantic
 * diagnostics after this parser succeeds, but should not reconstruct the
 * AppManifest shape in their own packages.
 */
export function parseAppManifest(value: unknown): AppManifestParseResult {
  return isAppManifest(value)
    ? { ok: true, manifest: value }
    : { ok: false, message: 'Value is not a canonical AppManifest.' };
}
