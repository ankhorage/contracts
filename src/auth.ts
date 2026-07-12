import type { SecretRef } from './secrets';
import type { IconSpec } from './types';

export const AUTH_IDENTIFIER_KINDS = ['email', 'phone', 'username'] as const;
export type AuthIdentifierKind = (typeof AUTH_IDENTIFIER_KINDS)[number];

export const AUTH_SIGN_UP_FIELDS = [
  ...AUTH_IDENTIFIER_KINDS,
  'password',
  'displayName',
  'firstName',
  'lastName',
] as const;
export type KnownAuthSignUpField = (typeof AUTH_SIGN_UP_FIELDS)[number];
export type AuthSignUpField = KnownAuthSignUpField | (string & {});

export const AUTH_OAUTH_PROVIDER_IDS = [
  'apple',
  'azure',
  'bitbucket',
  'discord',
  'facebook',
  'figma',
  'github',
  'gitlab',
  'google',
  'kakao',
  'keycloak',
  'linkedin',
  'notion',
  'slack',
  'spotify',
  'twitch',
  'twitter',
  'workos',
  'zoom',
] as const;
export type KnownAuthOAuthProviderId = (typeof AUTH_OAUTH_PROVIDER_IDS)[number];
export type AuthOAuthProviderId = KnownAuthOAuthProviderId | (string & {});

export interface AuthIdentifier {
  kind: AuthIdentifierKind;
  value: string;
}

export interface AuthFlowConfig {
  signInRoute: string;
  signUpRoute?: string;
  signOutRoute?: string;
  forgotPasswordRoute?: string;
  otpRoute?: string;
  postSignInRoute: string;
  unauthorizedRoute?: string;
}

export const DEFAULT_AUTH_FLOW = {
  signInRoute: 'sign-in',
  signUpRoute: 'sign-up',
  signOutRoute: 'sign-out',
  forgotPasswordRoute: 'forgot-password',
  postSignInRoute: '/',
  unauthorizedRoute: 'sign-in',
} as const satisfies AuthFlowConfig;

export function resolveAuthFlow(flow?: AuthFlowConfig): AuthFlowConfig {
  return { ...(flow ?? DEFAULT_AUTH_FLOW) };
}

export interface AuthSignInConfig {
  identifiers: AuthIdentifierKind[];
}

export interface AuthSignUpConfig {
  requiredFields: AuthSignUpField[];
  optionalFields?: AuthSignUpField[];
}

export interface AuthOAuthProviderConfig {
  id: AuthOAuthProviderId;
  label?: string;
  enabled?: boolean;
  scopes?: string[];
  redirectTo?: string;
  queryParams?: Record<string, string>;
  icon?: IconSpec;
  /** Logical server-side secret reference; raw credentials must never be stored here. */
  credentialsRef?: SecretRef;
}

export interface AuthOAuthConfig {
  enabled: boolean;
  callbackRoute: string;
  providers: AuthOAuthProviderConfig[];
}

export interface AuthProviderConfig {
  provider: string;
  signIn: AuthSignInConfig;
  signUp?: AuthSignUpConfig;
  oauth?: AuthOAuthConfig;
  passwordReset?: {
    enabled: boolean;
  };
  otp?: {
    enabled: boolean;
  };
}

export interface AuthUser {
  id: string;
  email?: string;
  phone?: string;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface AuthSession {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
  tokenType?: string;
  user: AuthUser;
}

export interface AuthAdapterError {
  code: string;
  message: string;
  cause?: unknown;
}

export type AuthResult<
  TData = void,
  TError extends AuthAdapterError = AuthAdapterError,
> =
  | {
      ok: true;
      data?: TData;
    }
  | {
      ok: false;
      error: TError;
    };

export interface SignInInput {
  identifier: AuthIdentifier;
  password?: string;
  otp?: string;
  redirectTo?: string;
  metadata?: Record<string, unknown>;
}

export interface SignUpInput {
  identifier: AuthIdentifier;
  password?: string;
  profile?: Record<string, unknown>;
  redirectTo?: string;
  metadata?: Record<string, unknown>;
}

export interface SignOutInput {
  allDevices?: boolean;
}

export interface PasswordResetInput {
  identifier: AuthIdentifier;
  redirectTo?: string;
}

export interface VerifyOtpInput {
  identifier: AuthIdentifier;
  token: string;
  redirectTo?: string;
  metadata?: Record<string, unknown>;
}

export const AUTH_OAUTH_ERROR_STAGES = [
  'start',
  'transport',
  'callback',
  'exchange',
  'session',
  'profile',
] as const;
export type AuthOAuthErrorStage = (typeof AUTH_OAUTH_ERROR_STAGES)[number];

export const AUTH_OAUTH_ERROR_CODES = [
  'oauth_unavailable',
  'provider_disabled',
  'provider_misconfigured',
  'invalid_redirect_uri',
  'authorization_failed',
  'authorization_attempt_not_found',
  'invalid_callback',
  'state_mismatch',
  'pkce_mismatch',
  'callback_already_completed',
  'code_exchange_failed',
  'network_error',
  'session_persistence_failed',
  'profile_creation_failed',
  'provider_error',
] as const;
export type AuthOAuthErrorCode = (typeof AUTH_OAUTH_ERROR_CODES)[number];

export interface AuthOAuthError extends AuthAdapterError {
  code: AuthOAuthErrorCode;
  stage: AuthOAuthErrorStage;
  provider?: AuthOAuthProviderId;
  recoverable: boolean;
}

export const AUTH_OAUTH_TRANSPORT_CANCELLATION_REASONS = [
  'user_cancelled',
  'browser_dismissed',
] as const;
export type AuthOAuthTransportCancellationReason =
  (typeof AUTH_OAUTH_TRANSPORT_CANCELLATION_REASONS)[number];

export const AUTH_OAUTH_CANCELLATION_REASONS = [
  ...AUTH_OAUTH_TRANSPORT_CANCELLATION_REASONS,
  'provider_denied',
] as const;
export type AuthOAuthCancellationReason = (typeof AUTH_OAUTH_CANCELLATION_REASONS)[number];

export const AUTH_OAUTH_TRANSPORT_ERROR_CODES = [
  'browser_unavailable',
  'transport_failed',
] as const;
export type AuthOAuthTransportErrorCode = (typeof AUTH_OAUTH_TRANSPORT_ERROR_CODES)[number];

export interface AuthOAuthTransportError {
  code: AuthOAuthTransportErrorCode;
  message: string;
  cause?: unknown;
}

export interface StartOAuthAuthorizationInput {
  provider: AuthOAuthProviderId;
  redirectUri: string;
  scopes?: readonly string[];
  queryParams?: Readonly<Record<string, string>>;
}

export interface AuthOAuthAuthorizationRequest {
  attemptId: string;
  provider: AuthOAuthProviderId;
  authorizationUrl: string;
  redirectUri: string;
}

export type AuthOAuthStartResult =
  | {
      ok: true;
      data: AuthOAuthAuthorizationRequest;
    }
  | {
      ok: false;
      error: AuthOAuthError;
    };

export type AuthOAuthAuthorizationResponse =
  | {
      type: 'callback';
      url: string;
    }
  | {
      type: 'cancelled';
      reason: AuthOAuthTransportCancellationReason;
    }
  | {
      type: 'error';
      error: AuthOAuthTransportError;
    };

export interface CompleteOAuthAuthorizationInput {
  attemptId: string;
  response: AuthOAuthAuthorizationResponse;
}

export type AuthOAuthCompletionResult =
  | {
      ok: true;
      status: 'authenticated';
      provider: AuthOAuthProviderId;
      session: AuthSession;
    }
  | {
      ok: false;
      status: 'cancelled';
      provider: AuthOAuthProviderId;
      reason: AuthOAuthCancellationReason;
    }
  | {
      ok: false;
      status: 'error';
      error: AuthOAuthError;
    };

export interface AuthOAuthCapabilities {
  /** Enabled providers for which start and callback completion are operational. */
  providers: readonly [AuthOAuthProviderId, ...AuthOAuthProviderId[]];
}

export interface AuthOAuthAdapter {
  readonly capabilities: AuthOAuthCapabilities;

  startAuthorization(input: StartOAuthAuthorizationInput): Promise<AuthOAuthStartResult>;
  completeAuthorization(
    input: CompleteOAuthAuthorizationInput,
  ): Promise<AuthOAuthCompletionResult>;
}

export interface AuthAdapterCapabilities {
  signInIdentifiers: AuthIdentifierKind[];
  supportsSignUp: boolean;
  supportsPasswordReset: boolean;
  supportsOtp: boolean;
  supportsSessionRefresh: boolean;
}

export interface AuthAdapter {
  readonly capabilities?: AuthAdapterCapabilities;
  /**
   * Presence is the canonical OAuth capability signal. When present, both authorization start and
   * callback completion are mandatory and operational for every advertised provider.
   */
  readonly oauth?: AuthOAuthAdapter;

  signIn(input: SignInInput): Promise<AuthResult<AuthSession>>;
  signUp(input: SignUpInput): Promise<AuthResult<AuthSession | AuthUser>>;
  signOut(input?: SignOutInput): Promise<AuthResult>;

  getSession(): Promise<AuthResult<AuthSession | null>>;
  refreshSession?(): Promise<AuthResult<AuthSession | null>>;

  requestPasswordReset?(input: PasswordResetInput): Promise<AuthResult>;
  verifyOtp?(input: VerifyOtpInput): Promise<AuthResult<AuthSession>>;
}
