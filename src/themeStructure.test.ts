import { COLOR_HARMONIES } from '@ankhorage/color-theory';
import { expect, test } from 'bun:test';

import { STRUCTURE_DESCRIPTOR } from './structure';

test('publishes ThemeConfig and canonical Theme authoring semantics', () => {
  expect(STRUCTURE_DESCRIPTOR.roots['theme-config']).toBe('ThemeConfig');

  expect(STRUCTURE_DESCRIPTOR.descriptors.ThemeModeConfig.descriptor.fields).toEqual({
    harmony: {
      value: {
        kind: 'enum',
        values: [...COLOR_HARMONIES].sort(),
      },
    },
    primaryColor: {
      value: { kind: 'scalar', type: 'string' },
    },
  });

  const numericMap = {
    kind: 'value-map',
    key: { kind: 'scalar', type: 'string' },
    value: { kind: 'scalar', type: 'number' },
  } as const;
  const globalTokens = STRUCTURE_DESCRIPTOR.descriptors.ThemeGlobalTokenOverrides.descriptor.fields;

  expect(globalTokens.spacing.value).toEqual(numericMap);
  expect(globalTokens.radii.value).toEqual(numericMap);
  expect(globalTokens.shadows.value).toEqual(numericMap);

  const typography =
    STRUCTURE_DESCRIPTOR.descriptors.ThemeTypographyTokenOverrides.descriptor.fields;
  expect(typography.sizes.value).toEqual(numericMap);
  expect(typography.weights.value).toEqual({
    kind: 'value-map',
    key: { kind: 'scalar', type: 'string' },
    value: { kind: 'scalar', type: 'string' },
  });
  expect(typography.headings.value).toEqual({
    kind: 'value-map',
    key: { kind: 'scalar', type: 'string' },
    value: { kind: 'ref', id: 'ThemeTypographyHeadingOverrides' },
  });
});
