import { expect, test } from 'bun:test';

import { STRUCTURE_DESCRIPTOR } from './structure';

test('publishes AuthProfileSpec open-string field and finite strategy semantics', () => {
  expect(STRUCTURE_DESCRIPTOR.roots['auth-profile']).toBe('AuthProfileSpec');
  expect(STRUCTURE_DESCRIPTOR.descriptors.AuthProfileField.descriptor).toEqual({
    kind: 'scalar',
    type: 'string',
  });
  expect(STRUCTURE_DESCRIPTOR.descriptors.AuthProfileSpec.descriptor).toEqual({
    kind: 'object',
    fields: {
      createStrategy: {
        value: {
          kind: 'enum',
          values: ['api', 'app', 'trigger'],
        },
        optional: true,
      },
      fields: {
        value: {
          kind: 'ordered-list',
          item: { kind: 'ref', id: 'AuthProfileField' },
        },
      },
      primaryKey: {
        value: {
          kind: 'enum',
          values: ['authUserId'],
        },
        optional: true,
      },
      table: {
        value: {
          kind: 'scalar',
          type: 'string',
        },
        optional: true,
      },
      updateStrategy: {
        value: {
          kind: 'enum',
          values: ['api', 'app'],
        },
        optional: true,
      },
    },
  });
});
