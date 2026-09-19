import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { describe, expect, test } from 'bun:test';

import {
  isStructureDescriptor,
  isStructureDescriptorDocument,
  type StructureDescriptorDocument,
} from './structure';

describe('structural descriptor validation', () => {
  test('accepts every canonical structural kind', () => {
    expect(isStructureDescriptor({ kind: 'scalar', type: 'string' })).toBe(true);
    expect(isStructureDescriptor({ kind: 'enum', values: ['light', 'dark'] })).toBe(true);
    expect(
      isStructureDescriptor({
        kind: 'object',
        fields: {
          name: { value: { kind: 'scalar', type: 'string' } },
          enabled: { value: { kind: 'scalar', type: 'boolean' }, optional: true },
        },
      }),
    ).toBe(true);
    expect(
      isStructureDescriptor({
        kind: 'entity-registry',
        key: { kind: 'scalar', type: 'string' },
        value: { kind: 'ref', id: 'theme' },
        identityField: 'id',
      }),
    ).toBe(true);
    expect(
      isStructureDescriptor({
        kind: 'value-map',
        key: { kind: 'scalar', type: 'string' },
        value: { kind: 'scalar', type: 'number' },
      }),
    ).toBe(true);
    expect(
      isStructureDescriptor({
        kind: 'set',
        member: { kind: 'enum', values: ['camera', 'microphone'] },
      }),
    ).toBe(true);
    expect(
      isStructureDescriptor({
        kind: 'ordered-list',
        item: { kind: 'scalar', type: 'string' },
      }),
    ).toBe(true);
    expect(
      isStructureDescriptor({
        kind: 'union',
        discriminator: 'kind',
        variants: [
          { kind: 'ref', id: 'literal-source' },
          { kind: 'ref', id: 'state-source' },
        ],
      }),
    ).toBe(true);
  });

  test('rejects malformed or ambiguous descriptor shapes', () => {
    expect(isStructureDescriptor({ kind: 'unknown' })).toBe(false);
    expect(isStructureDescriptor({ kind: 'enum', values: [] })).toBe(false);
    expect(isStructureDescriptor({ kind: 'enum', values: ['x', 'x'] })).toBe(false);
    expect(isStructureDescriptor({ kind: 'enum', values: [Number.NaN] })).toBe(false);
    expect(
      isStructureDescriptor({
        kind: 'value-map',
        key: { kind: 'scalar', type: 'number' },
        value: { kind: 'scalar', type: 'string' },
      }),
    ).toBe(false);
    expect(
      isStructureDescriptor({
        kind: 'set',
        member: { kind: 'scalar', type: 'boolean' },
      }),
    ).toBe(false);
    expect(
      isStructureDescriptor({
        kind: 'union',
        variants: [{ kind: 'scalar', type: 'string' }],
      }),
    ).toBe(false);
  });

  test('rejects cyclic inline object graphs without overflowing', () => {
    const cyclic: Record<string, unknown> = {
      kind: 'object',
      fields: {},
    };
    cyclic.fields = {
      self: { value: cyclic },
    };

    expect(isStructureDescriptor(cyclic)).toBe(false);
  });
});

describe('structural descriptor documents', () => {
  test('accepts recursive local references and package-qualified external references', () => {
    const document = recursiveDocument();

    expect(isStructureDescriptorDocument(document)).toBe(true);
    expect(JSON.parse(JSON.stringify(document))).toEqual(document);
  });

  test('rejects unresolved local roots and references', () => {
    const document = recursiveDocument();

    expect(
      isStructureDescriptorDocument({
        ...document,
        roots: { app: 'missing' },
      }),
    ).toBe(false);
    expect(
      isStructureDescriptorDocument({
        ...document,
        descriptors: {
          ...document.descriptors,
          app: {
            id: 'app',
            descriptor: { kind: 'ref', id: 'missing' },
          },
        },
      }),
    ).toBe(false);
  });

  test('rejects registry key/definition identity mismatches', () => {
    const document = recursiveDocument();

    expect(
      isStructureDescriptorDocument({
        ...document,
        descriptors: {
          ...document.descriptors,
          app: {
            id: 'different-id',
            descriptor: document.descriptors.app?.descriptor,
          },
        },
      }),
    ).toBe(false);
  });

  test('proves referenced map keys and set members are strings', () => {
    const document = recursiveDocument();

    expect(
      isStructureDescriptorDocument({
        ...document,
        descriptors: {
          ...document.descriptors,
          numeric: {
            id: 'numeric',
            descriptor: { kind: 'scalar', type: 'number' },
          },
          app: {
            id: 'app',
            descriptor: {
              kind: 'set',
              member: { kind: 'ref', id: 'numeric' },
            },
          },
        },
      }),
    ).toBe(false);
  });

  test('publishes the dedicated structure subpath', async () => {
    const packageJson = JSON.parse(
      await readFile(join(process.cwd(), 'package.json'), 'utf8'),
    ) as {
      exports?: Readonly<Record<string, { default?: string; types?: string }>>;
    };

    expect(packageJson.exports?.['./structure']).toEqual({
      types: './dist/structure/index.d.ts',
      default: './dist/structure/index.js',
    });
  });
});

function recursiveDocument(): StructureDescriptorDocument {
  return {
    protocolVersion: 1,
    packageName: '@ankhorage/contracts',
    packageVersion: '0.0.0-test',
    roots: { app: 'app' },
    descriptors: {
      app: {
        id: 'app',
        descriptor: {
          kind: 'object',
          fields: {
            themes: {
              value: {
                kind: 'entity-registry',
                key: { kind: 'scalar', type: 'string' },
                value: { kind: 'ref', id: 'theme' },
                identityField: 'id',
              },
            },
            permissions: {
              optional: true,
              value: {
                kind: 'set',
                member: { kind: 'ref', id: 'permission-name' },
              },
            },
            external: {
              optional: true,
              value: {
                kind: 'ref',
                packageName: '@ankhorage/example-owner',
                id: 'external-config',
              },
            },
          },
        },
      },
      theme: {
        id: 'theme',
        descriptor: {
          kind: 'object',
          fields: {
            id: { value: { kind: 'scalar', type: 'string' } },
            children: {
              optional: true,
              value: {
                kind: 'ordered-list',
                item: { kind: 'ref', id: 'theme' },
              },
            },
          },
        },
      },
      'permission-name': {
        id: 'permission-name',
        descriptor: {
          kind: 'enum',
          values: ['camera', 'microphone'],
        },
      },
    },
  };
}
