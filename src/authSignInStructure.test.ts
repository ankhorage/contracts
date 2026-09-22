import { expect, test } from 'bun:test';

import { STRUCTURE_DESCRIPTOR } from './structure';

test('publishes AuthSignInSpec ordered identifier semantics from the generated owner document', () => {
  expect(STRUCTURE_DESCRIPTOR.roots['auth-sign-in']).toBe('AuthSignInSpec');
  expect(STRUCTURE_DESCRIPTOR.descriptors.AuthSignInSpec.descriptor).toEqual({
    kind: 'object',
    fields: {
      identifiers: {
        value: {
          kind: 'ordered-list',
          item: { kind: 'ref', id: 'AuthIdentifierKind' },
        },
      },
    },
  });
  expect(STRUCTURE_DESCRIPTOR.descriptors.AuthIdentifierKind.descriptor).toEqual({
    kind: 'enum',
    values: ['email', 'phone', 'username'],
  });
});
