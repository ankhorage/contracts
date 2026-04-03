export type ColorHarmony =
  | 'monochromatic'
  | 'analogous'
  | 'complementary'
  | 'triadic'
  | 'tetradic'
  | 'splitComplementary';

export type SystemTone = 'neutral' | 'pastel' | 'earth' | 'jewel' | 'fluorescent';

export interface ThemeModeConfig {
  primaryColor: string;
  harmony: ColorHarmony;
  systemTone: SystemTone;
}

export interface ThemeConfig {
  id: string;
  name: string;
  light: ThemeModeConfig;
  dark: ThemeModeConfig;
}

export type ActionType =
  | 'navigate'
  | 'alert'
  | 'console'
  | 'toggleDarkMode'
  | 'setLanguage'
  | 'search'
  | 'filter';

export interface NavigateAction {
  type: 'navigate';
  payload: {
    route: string;
    params?: Record<string, number | string>;
  };
}

export interface AlertAction {
  type: 'alert';
  payload?: {
    message?: string;
  };
}

export interface ConsoleAction {
  type: 'console';
  payload?: Record<string, unknown>;
}

export interface ToggleDarkModeAction {
  type: 'toggleDarkMode';
  payload?: never;
}

export interface SetLanguageAction {
  type: 'setLanguage';
  payload: {
    locale: string;
  };
}

export interface SearchAction {
  type: 'search';
  payload: {
    query: string;
    scope?: string;
  };
}

export interface FilterAction {
  type: 'filter';
  payload: {
    filterKey: string;
    filterValue: string;
  };
}

export type Action =
  | AlertAction
  | ConsoleAction
  | FilterAction
  | NavigateAction
  | SearchAction
  | SetLanguageAction
  | ToggleDarkModeAction;

export const NAVIGATOR_TYPES = ['stack', 'tabs', 'drawer'] as const;
export type NavigatorType = (typeof NAVIGATOR_TYPES)[number];

export const DEPLOYMENT_TARGETS = ['minikube'] as const;
export type KnownDeploymentTarget = (typeof DEPLOYMENT_TARGETS)[number];
export type DeploymentTarget = KnownDeploymentTarget | (string & {});

export const DATABASE_PROVIDERS = ['supabase'] as const;
export type KnownDatabaseProvider = (typeof DATABASE_PROVIDERS)[number];
export type DatabaseProvider = KnownDatabaseProvider | (string & {});

export const DATABASE_TIERS = ['dev', 'prod'] as const;
export type DatabaseTier = (typeof DATABASE_TIERS)[number];

export const STORAGE_PROVIDERS = ['auto', 's3', 'r2'] as const;
export type StorageProvider = (typeof STORAGE_PROVIDERS)[number];

export const AUTHZ_KINDS = ['RBAC', 'ABAC'] as const;
export type AuthzKind = (typeof AUTHZ_KINDS)[number];

export const AUTHZ_ENGINES = ['cerbos', 'native'] as const;
export type AuthzEngine = (typeof AUTHZ_ENGINES)[number];

export const AUTH_SCOPES = ['global', 'none', 'integrated'] as const;
export type AuthScope = (typeof AUTH_SCOPES)[number];

export const AUTH_PROVIDERS = ['supabase'] as const;
export type KnownAuthProvider = (typeof AUTH_PROVIDERS)[number];
export type AuthProvider = KnownAuthProvider | (string & {});

export const AUTH_LOGIN_IDENTIFIERS = ['email', 'username', 'phone'] as const;
export type AuthLoginIdentifier = (typeof AUTH_LOGIN_IDENTIFIERS)[number];

export const AUTH_REGISTRATION_FIELDS = [
  ...AUTH_LOGIN_IDENTIFIERS,
  'password',
  'firstName',
  'lastName',
  'displayName',
  'avatarUrl',
] as const;
export type KnownAuthRegistrationField = (typeof AUTH_REGISTRATION_FIELDS)[number];
export type AuthRegistrationField = KnownAuthRegistrationField | (string & {});

export const AUTH_SIGNUP_POLICIES = ['autoSignIn', 'requireVerification'] as const;
export type AuthSignupPolicy = (typeof AUTH_SIGNUP_POLICIES)[number];

export const AUTH_PROFILE_FIELDS = [
  ...AUTH_LOGIN_IDENTIFIERS,
  'firstName',
  'lastName',
  'displayName',
  'avatarUrl',
] as const;
export type KnownAuthProfileField = (typeof AUTH_PROFILE_FIELDS)[number];
export type AuthProfileField = KnownAuthProfileField | (string & {});

export interface IconSpec {
  name: string;
  provider?: string;
  size?: number | string;
  color?: string;
}

export interface UiNode {
  id: string;
  type: string;
  alias?: string;
  props?: Record<string, unknown>;
  children?: UiNode[];
  style?: Record<string, number | string>;
}

export interface ScreenSpec {
  id: string;
  name: string;
  title?: string;
  description?: string;
  root: UiNode;
}

export interface NavigatorSpec {
  type: NavigatorType;
  initialRouteName?: string;
  routes: RouteDefinition[];
  options?: Record<string, unknown>;
}

export interface RouteDefinition {
  name: string;
  path?: string;
  label?: string;
  icon?: IconSpec;
  hideInTabBar?: boolean;
  guards?: string[];
  screenId?: string;
  navigator?: NavigatorSpec;
}

export interface DeploymentSpec {
  target: DeploymentTarget;
  monitoring: boolean;
}

export interface DatabaseSpec {
  provider: DatabaseProvider;
  tier: DatabaseTier;
}

export interface StorageSpec {
  provider: StorageProvider;
  buckets: string[];
}

export interface AuthzSpec {
  kind: AuthzKind;
  engine: AuthzEngine;
}

export interface AuthLoginSpec {
  identifiers: AuthLoginIdentifier[];
}

export interface AuthRegistrationSpec {
  requiredFields: AuthRegistrationField[];
  optionalFields?: AuthRegistrationField[];
  signupPolicy?: AuthSignupPolicy;
}

export interface AuthProfileSpec {
  fields: AuthProfileField[];
}

export interface AuthSpec {
  scope: AuthScope;
  provider: AuthProvider;
  authorization: AuthzSpec;
  login?: AuthLoginSpec;
  registration?: AuthRegistrationSpec;
  profile?: AuthProfileSpec;
}

export interface NetworkingSpec {
  domain?: string;
  cdn: boolean;
}

export interface InfraManifest {
  deployment?: DeploymentSpec;
  auth?: AuthSpec;
  database?: DatabaseSpec;
  storage?: StorageSpec;
  networking?: NetworkingSpec;
  plugins: string[];
  pluginsConfig?: Record<string, unknown>;
}

export interface AppManifest {
  metadata: {
    name: string;
    slug: string;
    version: string;
    themeId: string;
    created?: string;
    updated?: string;
  };
  themes: ThemeConfig[];
  activeThemeId: string;
  activeThemeMode?: 'dark' | 'light';
  infra: InfraManifest;
  navigator: NavigatorSpec;
  screens: Record<string, ScreenSpec>;
  settings: {
    apiBaseUrl?: string;
    localization: {
      defaultLocale: string;
      locales: string[];
    };
    authFlow: {
      loginRoute: string;
      unauthorizedRoute: string;
      postLoginRoute: string;
    };
  };
}
