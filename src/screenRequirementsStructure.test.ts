import { expect, test } from 'bun:test';

import { STRUCTURE_DESCRIPTOR } from './structure';

test('publishes ScreenRequirements set semantics from the generated owner document', () => {
  expect(STRUCTURE_DESCRIPTOR.roots['screen-requirements']).toBe('ScreenRequirements');
  expect(STRUCTURE_DESCRIPTOR.descriptors.ScreenRequirements.descriptor).toEqual({
    kind: 'object',
    fields: {
      capabilities: {
        value: {
          kind: 'set',
          member: { kind: 'ref', id: 'AnkhorageCapabilityName' },
        },
        optional: true,
      },
      permissions: {
        value: {
          kind: 'set',
          member: { kind: 'ref', id: 'AnkhoragePermissionName' },
        },
        optional: true,
      },
    },
  });
  expect(STRUCTURE_DESCRIPTOR.descriptors.AnkhoragePermissionName.descriptor).toEqual({
    kind: 'enum',
    values: [
      'camera',
      'clipboard',
      'locationBackground',
      'locationForeground',
      'mediaLibrary',
      'mediaLibraryWrite',
      'microphone',
      'notifications',
    ],
  });
  expect(STRUCTURE_DESCRIPTOR.descriptors.AnkhorageCapabilityName.descriptor).toEqual({
    kind: 'enum',
    values: [
      'barcodeScanner',
      'cameraPreview',
      'clipboard',
      'ebookReader',
      'filePicker',
      'location',
      'mediaPicker',
      'notifications',
    ],
  });
});
