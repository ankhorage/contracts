import { describe, expect, it } from 'bun:test';

import type { Capability } from './capabilities';

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
] as const satisfies readonly Capability[];

describe('Capability', () => {
  it('serializes bindable and executable package capabilities through one contract', () => {
    expect(JSON.parse(JSON.stringify(CAPABILITIES))).toEqual(CAPABILITIES);
  });
});
