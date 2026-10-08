import { describe, expect, it } from 'bun:test';

import type { Capability } from './capabilities';
import {
  areCapabilitiesEqual,
  CAPABILITY_ACCESS,
  CAPABILITY_BINDING_KINDS,
  CAPABILITY_BINDING_ROLES,
  isCapability,
  isCapabilityId,
  normalizeCapability,
} from './capabilities';
import { isDataSchema, isDataSchemaSlot } from './data';

const CAPABILITIES = [
  {
    id: 'state.value',
    owner: '@ankhorage/runtime',
    access: ['read', 'write', 'subscribe'],
    binding: { kind: 'state', bindableAs: ['source', 'target'] },
    label: 'Runtime state value',
  },
  {
    id: 'button.press',
    owner: '@ankhorage/zora',
    access: ['emit'],
    binding: { kind: 'event', bindableAs: ['source'] },
    output: {
      schema: {
        type: 'object',
        properties: { sourceNodeId: { type: 'string' } },
      },
    },
  },
  {
    id: 'navigator.navigate',
    owner: '@ankhorage/navigator',
    access: ['invoke'],
    binding: { kind: 'action', bindableAs: ['target'] },
    label: 'Navigate',
    input: {
      schema: {
        type: 'object',
        required: ['route'],
        properties: {
          route: { type: 'string' },
          params: { type: 'object', additionalProperties: true },
        },
      },
    },
  },
  {
    id: 'api.catalog.product.create',
    owner: '@ankhorage/api',
    access: ['invoke'],
    binding: { kind: 'api', bindableAs: ['target'] },
    input: {
      schema: {
        type: 'object',
        required: ['name'],
        properties: { name: { type: 'string' } },
      },
    },
    output: {
      schema: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } },
      },
    },
  },
  {
    id: 'auth.user',
    owner: '@ankhorage/auth',
    access: ['read', 'subscribe'],
    binding: { kind: 'auth', bindableAs: ['source'] },
    output: {
      schema: {
        type: 'object',
        properties: { id: { type: 'string' } },
      },
    },
  },
  {
    id: 'permission.camera.request',
    owner: '@ankhorage/permissions',
    access: ['invoke'],
    binding: { kind: 'permission', bindableAs: ['target'] },
    output: {
      schema: {
        type: 'object',
        properties: { granted: { type: 'boolean' } },
      },
    },
  },
  {
    id: 'storage.upload',
    owner: '@ankhorage/storage',
    access: ['invoke'],
    binding: { kind: 'storage', bindableAs: [] },
    label: 'Upload storage object',
  },
] as const satisfies readonly Capability[];

describe('Capability serialization', () => {
  it('serializes bindable and executable package capabilities through one contract', () => {
    expect(JSON.parse(JSON.stringify(CAPABILITIES))).toEqual(CAPABILITIES);
  });
});

describe('Capability runtime API', () => {
  it('exports the canonical runtime literals that derive the public contract unions', () => {
    expect(CAPABILITY_ACCESS).toEqual(['emit', 'invoke', 'read', 'subscribe', 'write']);
    expect(CAPABILITY_BINDING_KINDS).toEqual([
      'action',
      'api',
      'auth',
      'authorization',
      'context',
      'event',
      'permission',
      'state',
      'storage',
    ]);
    expect(CAPABILITY_BINDING_ROLES).toEqual(['source', 'target']);
  });

  it('validates canonical capability identifiers', () => {
    expect(isCapabilityId('state.profile')).toBeTrue();
    expect(isCapabilityId('api.catalog.product.create')).toBeTrue();
    expect(isCapabilityId('state')).toBeFalse();
    expect(isCapabilityId('state.')).toBeFalse();
    expect(isCapabilityId('.state')).toBeFalse();
    expect(isCapabilityId('state..profile')).toBeFalse();
    expect(isCapabilityId('  .profile')).toBeFalse();
  });

  it('publishes DataSchema and DataSchemaSlot validation for capability input and output', () => {
    expect(isDataSchema({ type: 'object', properties: { id: { type: 'string' } } })).toBeTrue();
    expect(isDataSchemaSlot({ schemaRef: { id: 'customer' } })).toBeTrue();
    expect(isDataSchema({ type: 'date' })).toBeFalse();
    expect(isDataSchemaSlot({ schema: { type: 'date' } })).toBeFalse();
  });

  it('validates complete capability descriptors through the shared schema validators', () => {
    expect(isCapability(CAPABILITIES[3])).toBeTrue();
    expect(isCapability(CAPABILITIES[6])).toBeTrue();
    expect(
      isCapability({
        ...CAPABILITIES[3],
        binding: { kind: 'command', bindableAs: ['target'] },
      }),
    ).toBeFalse();
    expect(
      isCapability({
        ...CAPABILITIES[3],
        binding: { kind: 'api', bindableAs: ['bidirectional'] },
      }),
    ).toBeFalse();
    expect(isCapability({ ...CAPABILITIES[3], access: ['delete'] })).toBeFalse();
    expect(isCapability({ ...CAPABILITIES[3], input: { schema: { type: 'date' } } })).toBeFalse();
  });
});

describe('Capability packed Node ESM boundary', () => {
  it('imports the built public capabilities entrypoint with Node ESM resolution', async () => {
    const subprocess = Bun.spawn(['node', '-e', "import('./dist/capabilities.js')"], {
      cwd: process.cwd(),
      stderr: 'pipe',
      stdout: 'pipe',
    });
    const [exitCode, stderr] = await Promise.all([
      subprocess.exited,
      new Response(subprocess.stderr).text(),
    ]);

    expect(stderr).toBe('');
    expect(exitCode).toBe(0);
  });
});

describe('Capability canonical projection', () => {
  it('projects accepted runtime capabilities to their canonical descriptor', () => {
    const runtimeCapability = {
      ...CAPABILITIES[3],
      access: ['invoke', 'invoke'],
      binding: {
        kind: 'api',
        bindableAs: ['target', 'target'],
        runtimeBindingMetadata: { generatedBy: 'runtime' },
      },
      label: undefined,
      description: undefined,
      runtimeMetadata: { transport: 'local' },
    };
    const canonicalCapability: Capability = {
      id: 'api.catalog.product.create',
      owner: '@ankhorage/api',
      access: ['invoke'],
      binding: { kind: 'api', bindableAs: ['target'] },
      input: CAPABILITIES[3].input,
      output: CAPABILITIES[3].output,
    };

    expect(isCapability(runtimeCapability)).toBeTrue();
    expect(normalizeCapability(runtimeCapability)).toEqual(canonicalCapability);
    expect(areCapabilitiesEqual(runtimeCapability, canonicalCapability)).toBeTrue();
  });
});

describe('Capability canonicalization', () => {
  it('normalizes unordered access and binding roles', () => {
    const normalized = normalizeCapability({
      ...CAPABILITIES[0],
      access: ['write', 'read', 'write', 'subscribe'],
      binding: { kind: 'state', bindableAs: ['target', 'source', 'target'] },
    });

    expect(normalized.access).toEqual(['read', 'subscribe', 'write']);
    expect(normalized.binding.bindableAs).toEqual(['source', 'target']);
  });

  it('preserves trusted-only storage capabilities without a generic UI binding role', () => {
    const normalized = normalizeCapability({
      ...CAPABILITIES[6],
      access: ['invoke', 'invoke'],
    });

    expect(normalized).toEqual(CAPABILITIES[6]);
    expect(normalized.binding.bindableAs).toEqual([]);
  });

  it('compares normalized capability descriptors semantically', () => {
    const equivalent: Capability = {
      id: 'state.value',
      owner: '@ankhorage/runtime',
      access: ['read', 'subscribe', 'write'],
      binding: { kind: 'state', bindableAs: ['source', 'target'] },
      label: 'Runtime state value',
    };

    expect(
      areCapabilitiesEqual(
        normalizeCapability({
          ...CAPABILITIES[0],
          access: ['write', 'read', 'write', 'subscribe'],
          binding: { kind: 'state', bindableAs: ['target', 'source', 'target'] },
        }),
        equivalent,
      ),
    ).toBeTrue();
    expect(
      areCapabilitiesEqual(equivalent, {
        ...equivalent,
        binding: { kind: 'event', bindableAs: ['source', 'target'] },
      }),
    ).toBeFalse();
  });
});
