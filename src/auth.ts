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

export interface AuthSignInConfig {
  identifiers: AuthIdentifierKind[];
}

export interface AuthSignUpConfig {
  requiredFields: AuthSignUpField[];
  optionalFields?: AuthSignUpField[];
}

export interface AuthProviderConfig {
  provider: string;
  flow: AuthFlowConfig;
  signIn: AuthSignInConfig;
  signUp?: AuthSignUpConfig;
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

export type AuthResult<TData = void> =
  | {
      ok: true;
      data?: TData;
    }
  | {
      ok: false;
      error: AuthAdapterError;
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

export interface AuthAdapterCapabilities {
  signInIdentifiers: AuthIdentifierKind[];
  supportsSignUp: boolean;
  supportsPasswordReset: boolean;
  supportsOtp: boolean;
  supportsSessionRefresh: boolean;
}

export interface AuthAdapter {
  readonly capabilities?: AuthAdapterCapabilities;

  signIn(input: SignInInput): Promise<AuthResult<AuthSession>>;
  signUp(input: SignUpInput): Promise<AuthResult<AuthSession | AuthUser>>;
  signOut(input?: SignOutInput): Promise<AuthResult>;

  getSession(): Promise<AuthResult<AuthSession | null>>;
  refreshSession?(): Promise<AuthResult<AuthSession | null>>;

  requestPasswordReset?(input: PasswordResetInput): Promise<AuthResult>;
  verifyOtp?(input: VerifyOtpInput): Promise<AuthResult<AuthSession>>;
}
