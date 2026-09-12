import { isStringArray } from '../../../appManifest/shared';

/** Primitive field rules for portable Infra configuration, shared by its exact-shape validators. */
export const infraFields = {
  text: (value: unknown): boolean => typeof value === 'string' && value.trim().length > 0,
  optionalText: (value: unknown): boolean =>
    value === undefined || (typeof value === 'string' && value.trim().length > 0),
  strings: (value: unknown): boolean =>
    isStringArray(value) && value.every((item) => item.trim().length > 0),
  optionalStrings: (value: unknown): boolean =>
    value === undefined || (isStringArray(value) && value.every((item) => item.trim().length > 0)),
  positiveInteger: (value: unknown): boolean =>
    typeof value === 'number' && Number.isSafeInteger(value) && value > 0,
  nonnegativeInteger: (value: unknown): boolean =>
    typeof value === 'number' && Number.isSafeInteger(value) && value >= 0,
  optionalPositiveInteger: (value: unknown): boolean =>
    value === undefined || (typeof value === 'number' && Number.isSafeInteger(value) && value > 0),
  optionalNonnegativeInteger: (value: unknown): boolean =>
    value === undefined || (typeof value === 'number' && Number.isSafeInteger(value) && value >= 0),
  port: (value: unknown): boolean =>
    typeof value === 'number' && Number.isInteger(value) && value > 0 && value <= 65535,
};
