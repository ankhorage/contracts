import { infraFields } from './infraFields';
import { isInfraShape } from './isInfraShape';

/** Bootstrap credential references are explicitly separate from managed runtime secrets. */
export function isInfraCredentialRef(value: unknown): boolean {
  return isInfraShape(value, {
    source: (source) => source === 'control-plane',
    name: infraFields.text,
  });
}
