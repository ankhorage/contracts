export const ANKHORAGE_PERMISSION_NAMES = ['camera','microphone','mediaLibrary','mediaLibraryWrite','locationForeground','locationBackground','notifications','clipboard'] as const;
export type AnkhoragePermissionName = (typeof ANKHORAGE_PERMISSION_NAMES)[number];

export const ANKHORAGE_CAPABILITY_NAMES = ['barcodeScanner','cameraPreview','mediaPicker','filePicker','location','notifications','clipboard'] as const;
export type Ankh