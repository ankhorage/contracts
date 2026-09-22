import { expect, test } from 'bun:test';

import { STRUCTURE_DESCRIPTOR } from './structure';

test('publishes AuthSignUpSpec open-string ordered field semantics from the generated owner document', () => {
  expect(STRUCTURE_DESCRIPTOR.roots['auth-sign-up']).toBe('AuthSignUpSpec');
  expect(STRUCTURE_DESCRIPTOR.descriptors.AuthSignUpField.descriptor).toEqual({
    kind: 'scalar',
    type: 'string',
  });
  expect(STRUCTURE_DESCRIPTOR.descriptors.AuthSignUpSpec.descriptor).toEqual({
    kind: 'object',
    fields: {
      optionalFields: {
        value: {
          kind: 'ordered-list',
          item: { kind: 'ref', id: 'AuthSignUpField' },
        },
        optional: true,
      },
      requiredFields: {
        value: {
          kind: 'ordered-list',
          item: { kind: 'ref', id: 'AuthSignUpField' },
        },
      },
      signUpPolicy: {
        value: {
          kind: 'enum',
          values: ['autoSignIn', 'requireVerification'],
        },
        optional: true,
      },
    },
  });
});
