import { describe, expect, it } from 'bun:test';

import type {
  Capability,
  CapabilityAccess,
  CapabilityBindingKind,
  CapabilityBindingRole,
} from './capability';

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

describe('Capability declarations', () => {
  it('models the portable capability vocabulary without runtime behavior', () => {
    const access: CapabilityAccess = 'invoke';
    const bindingKind: CapabilityBindingKind = 'action';
    const bindingRole: CapabilityBindingRole = 'target';

    expect({ access, bindingKind, bindingRole }).toEqual({
      access: 'invoke',
      bindingKind: 'action',
      bindingRole: 'target',
    });
  });
});
