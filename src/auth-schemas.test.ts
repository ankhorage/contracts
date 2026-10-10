import { describe, expect, it } from 'bun:test';

import {
  AUTH_ADAPTER_ERROR_SCHEMA,
  AUTH_EMPTY_INPUT_SCHEMA,
  AUTH_IDENTIFIER_SCHEMA,
  AUTH_NULLABLE_SESSION_RESULT_SCHEMA,
  AUTH_OAUTH_AUTHORIZATION_REQUEST_SCHEMA,
  AUTH_OAUTH_AUTHORIZATION_RESPONSE_SCHEMA,
  AUTH_OAUTH_COMPLETION_RESULT_SCHEMA,
  AUTH_OAUTH_ERROR_SCHEMA,
  AUTH_OAUTH_START_RESULT_SCHEMA,
  AUTH_SESSION_RESULT_SCHEMA,
  AUTH_SESSION_SCHEMA,
  AUTH_SUCCESS_SCHEMA,
  AUTH_USER_SCHEMA,
  AUTH_VOID_RESULT_SCHEMA,
  COMPLETE_OAUTH_AUTHORIZATION_INPUT_SCHEMA,
  PASSWORD_RESET_INPUT_SCHEMA,
  SIGN_IN_INPUT_SCHEMA,
  SIGN_IN_RESULT_SCHEMA,
  SIGN_OUT_INPUT_SCHEMA,
  SIGN_UP_INPUT_SCHEMA,
  SIGN_UP_RESULT_SCHEMA,
  START_OAUTH_AUTHORIZATION_INPUT_SCHEMA,
  VERIFY_OTP_INPUT_SCHEMA,
} from './auth';
import { isDataSchema } from './data';

const AUTH_SCHEMAS = [
  AUTH_IDENTIFIER_SCHEMA,
  AUTH_USER_SCHEMA,
  AUTH_SESSION_SCHEMA,
  AUTH_ADAPTER_ERROR_SCHEMA,
  SIGN_IN_INPUT_SCHEMA,
  SIGN_UP_INPUT_SCHEMA,
  SIGN_OUT_INPUT_SCHEMA,
  PASSWORD_RESET_INPUT_SCHEMA,
  VERIFY_OTP_INPUT_SCHEMA,
  AUTH_SUCCESS_SCHEMA,
  AUTH_VOID_RESULT_SCHEMA,
  SIGN_IN_RESULT_SCHEMA,
  SIGN_UP_RESULT_SCHEMA,
  AUTH_SESSION_RESULT_SCHEMA,
  AUTH_NULLABLE_SESSION_RESULT_SCHEMA,
  AUTH_EMPTY_INPUT_SCHEMA,
  START_OAUTH_AUTHORIZATION_INPUT_SCHEMA,
  AUTH_OAUTH_AUTHORIZATION_REQUEST_SCHEMA,
  AUTH_OAUTH_ERROR_SCHEMA,
  AUTH_OAUTH_START_RESULT_SCHEMA,
  AUTH_OAUTH_AUTHORIZATION_RESPONSE_SCHEMA,
  COMPLETE_OAUTH_AUTHORIZATION_INPUT_SCHEMA,
  AUTH_OAUTH_COMPLETION_RESULT_SCHEMA,
] as const;

describe('auth/session capability schemas', () => {
  it('publishes valid, serializable schema sources for every auth operation and value', () => {
    expect(AUTH_SCHEMAS.every(isDataSchema)).toBe(true);
    expect(JSON.parse(JSON.stringify(AUTH_SCHEMAS))).toEqual(AUTH_SCHEMAS);
  });

  it('keeps user metadata open for schema-derived nested paths', () => {
    expect(AUTH_USER_SCHEMA.properties.metadata).toEqual({
      type: 'object',
      additionalProperties: {},
    });
  });

  it('preserves the real auth input and result distinctions', () => {
    expect(SIGN_IN_INPUT_SCHEMA.required).toEqual(['identifier']);
    expect(VERIFY_OTP_INPUT_SCHEMA.required).toEqual(['identifier', 'token']);
    expect(SIGN_OUT_INPUT_SCHEMA.required).toBeUndefined();
    expect(AUTH_NULLABLE_SESSION_RESULT_SCHEMA.oneOf).toHaveLength(2);
    expect(AUTH_OAUTH_COMPLETION_RESULT_SCHEMA.oneOf).toHaveLength(3);
  });

  it('requires result data when an auth operation is non-void and keeps errors portable', () => {
    expect(SIGN_IN_RESULT_SCHEMA.oneOf[0].required).toEqual(['ok', 'data']);
    expect(SIGN_UP_RESULT_SCHEMA.oneOf[0].required).toEqual(['ok', 'data']);
    expect(AUTH_SESSION_RESULT_SCHEMA.oneOf[0].required).toEqual(['ok', 'data']);
    expect(AUTH_NULLABLE_SESSION_RESULT_SCHEMA.oneOf[0].required).toEqual(['ok', 'data']);
    expect(AUTH_ADAPTER_ERROR_SCHEMA.properties).not.toHaveProperty('cause');
    expect(AUTH_OAUTH_ERROR_SCHEMA.properties).not.toHaveProperty('cause');
    expect(
      AUTH_OAUTH_AUTHORIZATION_RESPONSE_SCHEMA.oneOf[2].properties.error.properties,
    ).not.toHaveProperty('cause');
  });
});
