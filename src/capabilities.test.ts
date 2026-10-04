import { describe, expect, it } from 'bun:test';

import type { Capability } from './capabilities';

describe('Capability', () => {
  it('serializes bindable and executable package capabilities through one contract', () => {
    const capabilities = [
      {
        id: 'state.value',
        owner: '@ankhorage/runtime',
        access: ['read', 'write', 'subscribe'],
        label: 'Runtime state value',
      },
      {
        id: 'navigator.navigate',
        owner: '@ankhorage/navigator',
        access: ['invoke'],
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
        id: 'button.press',
        owner: '@ankhorage/zora',
        access: ['emit'],
        label: 'Button press',
      },
    ] as const satisfies readonly Capability[];

    expect(JSON.parse(JSON.stringify(capabilities))).toEqual(capabilities);
  });
});
