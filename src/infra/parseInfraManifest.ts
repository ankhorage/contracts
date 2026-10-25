import type { InfraResult } from '../types/infraLifecycle.js';
import type { InfraManifest } from '../types/infraManifest.js';
import { isInfraManifest } from './isInfraManifest.js';

/** Parse unknown infrastructure input; package availability and credentials are separate validation stages. */
export function parseInfraManifest(value: unknown): InfraResult<InfraManifest> {
  return isInfraManifest(value)
    ? { ok: true, value, diagnostics: [] }
    : {
        ok: false,
        diagnostics: [
          {
            severity: 'error',
            code: 'invalid_manifest',
            message:
              'Expected canonical Infra environments with supported provider configuration and compute/runtime compatibility.',
          },
        ],
      };
}
