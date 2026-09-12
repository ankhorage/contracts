import { isRecord } from '../../../appManifest/shared';
import type { AppStateSpec } from '../../../state';

/** Application state cannot claim persistence unsupported by the selected Legend adapter. */
export function isAppStateSpec(value: unknown): value is AppStateSpec {
  return (
    isRecord(value) &&
    value.provider === 'legend' &&
    (value.persistence === undefined || value.persistence === false) &&
    Object.keys(value).every((key) => key === 'provider' || key === 'persistence')
  );
}
