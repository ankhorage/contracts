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

export interface ScreenPermissionRequirement {
  readonly permission: AnkhoragePermissionName;
}

export interface ScreenCapabilityRequirement {
  readonly capability: AnkhorageCapabilityName;
}

export interface ScreenRequirements {
  readonly permissions?: readonly ScreenPermissionRequirement[];
  readonly capabilities?: readonly ScreenCapabilityRequirement[];
}

export interface ComponentRequirements {
  readonly permissions?: readonly ScreenPermissionRequirement[];
  readonly capabilities?: readonly ScreenCapabilityRequirement[];
}
