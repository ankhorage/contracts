import type { ManifestValue } from './types';

export const SCREEN_PERMISSION_NAMES = ['camera'] as const;
export type KnownScreenPermissionName = (typeof SCREEN_PERMISSION_NAMES)[number];
export type ScreenPermissionName = KnownScreenPermissionName | (string & {});

export const SCREEN_CAPABILITY_NAMES = ['barcodeScanner'] as const;
export type KnownScreenCapabilityName = (typeof SCREEN_CAPABILITY_NAMES)[number];
export type ScreenCapabilityName = KnownScreenCapabilityName | (string & {});

export interface ScreenRequirementSource {
  readonly kind: 'component' | (string & {});
  readonly