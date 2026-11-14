import type { Capability } from './capability.js';
import type { SerializableSet } from './collections.js';

export const ANKHORAGE_PERMISSION_NAMES = [
  'camera',
  'microphone',
  'mediaLibrary',
  'mediaLibraryWrite',
  'locationForeground',
  'locationBackground',
  'notifications',
  'clipboard',
] as const;

export type AnkhoragePermissionName = (typeof ANKHORAGE_PERMISSION_NAMES)[number];

export const ANKHORAGE_CAPABILITY_NAMES = [
  'barcodeScanner',
  'cameraPreview',
  'ebookReader',
  'mediaPicker',
  'filePicker',
  'location',
  'notifications',
  'clipboard',
] as const;

export type AnkhorageCapabilityName = (typeof ANKHORAGE_CAPABILITY_NAMES)[number];

export interface ScreenRequirements {
  readonly permissions?: SerializableSet<AnkhoragePermissionName>;
  readonly capabilities?: SerializableSet<AnkhorageCapabilityName>;
}

export interface ComponentRequirements {
  readonly permissions?: SerializableSet<AnkhoragePermissionName>;
  readonly capabilities?: SerializableSet<AnkhorageCapabilityName>;
}

/** A released package identity that can provide one declared app-wide capability. */
export interface AppCapabilityProviderReference {
  readonly packageName: string;
}

/** A portable app-wide requirement; its executable implementation remains package-owned. */
export interface AppCapabilityRequirement {
  readonly capability: Capability['id'];
  readonly provider?: AppCapabilityProviderReference;
}

/** App-wide requirements are distinct from screen-local device requirements. */
export interface AppRequirements {
  readonly capabilities?: readonly AppCapabilityRequirement[];
}
