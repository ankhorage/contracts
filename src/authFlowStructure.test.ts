import { expect, test } from 'bun:test';

import { STRUCTURE_DESCRIPTOR } from './structure';

test('publishes AuthFlowConfig route semantics from the generated owner document', () => {
  expect(STRUCTURE_DESCRIPTOR.roots['auth-flow']).toBe('AuthFlowConfig');
  expect(STRUCTURE_DESCRIPTOR.descriptors.AuthFlowConfig.descriptor).toEqual({
    kind: 'object',
    fields: {
      forgotPasswordRoute: {
        value: { kind: 'scalar', type: 'string' },
        optional: true,
      },
      otpRoute: {
        value: { kind: 'scalar', type: 'string' },
        optional: true,
      },
      postSignInRoute: {
        value: { kind: 'scalar', type: 'string' },
      },
      signInRoute: {
        value: { kind: 'scalar', type: 'string' },
      },
      signOutRoute: {
        value: { kind: 'scalar', type: 'string' },
        optional: true,
      },
      signUpRoute: {
        value: { kind: 'scalar', type: 'string' },
        optional: true,
      },
      unauthorizedRoute: {
        value: { kind: 'scalar', type: 'string' },
        optional: true,
      },
    },
  });
});
