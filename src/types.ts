import type { AuthFlowConfig, AuthIdentifierKind, AuthSignUpField } from './auth';
import type { ColorHarmony, ColorTone } from './color-theory';

export interface ThemeModeConfig {
  primaryColor: string;
  harmony: ColorHarmony;
  colorTone: ColorTone;
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

export const APP_CATEGORIES = [
  'books_reading',
  'business_productivity',
  'developer_tools',
  'education_learning',
  'entertainment_media',
  'finance_money',
  'food_drink',
  'games',
  'graphics_design',
  'health_fitness',
  'kids_family',
  'lifestyle',
  'medical',
  'music_audio',
  'navigation_travel',
  'news_magazines',
  'photo_video',
  'reference',
  'shopping_commerce',
  'social_community',
  'sports',
  'utilities_tools',
  'weather',
] as const;
export type AppCategory = (typeof APP_CATEGORIES)[number];

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

export const AUTH_SIGN_IN_IDENTIFIERS = ['email', 'username', 'phone'] as const;
export type AuthSignInIdentifier = AuthIdentifierKind;

export const AUTH_SIGN_UP_POLICIES = ['autoSignIn', 'requireVerification'] as const;
export type AuthSignUpPolicy = (typeof AUTH_SIGN_UP_POLICIES)[number];

export const AUTH_PROFILE_FIELDS = [
  ...AUTH_SIGN_IN_IDENTIFIERS,
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

export interface AuthSignInSpec {
  identifiers: AuthSignInIdentifier[];
}

export interface AuthSignUpSpec {
  requiredFields: AuthSignUpField[];
  optionalFields?: AuthSignUpField[];
  signUpPolicy?: AuthSignUpPolicy;
}

export interface AuthProfileSpec {
  fields: AuthProfileField[];
}

export interface AuthSpec {
  scope: AuthScope;
  provider: AuthProvider;
  authorization: AuthzSpec;
  flow?: AuthFlowConfig;
  signIn?: AuthSignInSpec;
  signUp?: AuthSignUpSpec;
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
    authFlow: AuthFlowConfig;
  };
}
