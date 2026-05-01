export type AuthIdentifierKind = 'email' | 'phone' | 'username';

export interface AuthIdentifier {
  kind: AuthIdentifierKind;
  value: string;
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
