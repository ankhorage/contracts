import type { ColorHarmony } from '@ankhorage/color-theory';

import type { AuthFlowConfig, AuthIdentifierKind, AuthOAuthConfig, AuthSignUpField } from './auth';
import type {
  BindingValueSource,
  ComponentDataBindingRegistry,
  ScreenDataLoaderDefinition,
} from './bindings';
import type { ApiDefinitionList, DataSourceRegistry } from './data';
import type { AppDeployManifest } from './deploy';
import type { MediaManifest } from './media';
import type { ScreenRequirements } from './requirements';
import type { ThemeGlobalTokenOverrides, ThemeRecipeOverrides } from './theme';

export interface ThemeModeConfig {
  primaryColor: string;
  harmony: ColorHarmony;
}

export interface ThemeConfig {
  id: string;
  name: string;
  light: ThemeModeConfig;
  dark: ThemeModeConfig;
  /** Theme-global authored token overrides shared by light and dark mode. */
  tokens?: ThemeGlobalTokenOverrides;
  /** Component/pattern recipe override values; recipe schemas remain package-owned metadata. */
  recipes?: ThemeRecipeOverrides;
}

export type ActionType =
  'navigate' | 'alert' | 'console' | 'toggleDarkMode' | 'setLanguage' | 'search' | 'filter';

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

export type ManifestValue =
  | string
  | number
  | boolean
  | null
  | readonly ManifestValue[]
  | { readonly [key: string]: ManifestValue };

export type ComponentEventPayloadValue = ManifestValue;

export interface ComponentEventDto<
  TType extends string = string,
  TPayload extends object = Record<string, ComponentEventPayloadValue>,
> {
  readonly type: TType;
  readonly sourceNodeId: string;
  readonly payload: TPayload;
}

export type FormSubmitValues = Record<string, ComponentEventPayloadValue>;

export type FormSubmitEventDto = ComponentEventDto<
  'form.submit',
  {
    readonly values: FormSubmitValues;
  }
>;

export type ButtonPressEventDto = ComponentEventDto<'button.press', Record<string, never>>;

export interface CollectionItemPressPayload {
  readonly itemId: string | number;
  readonly item: Record<string, ComponentEventPayloadValue>;
}

export type CollectionItemPressEventDto = ComponentEventDto<
  'collection.itemPress',
  CollectionItemPressPayload
>;

export type ComponentEventDtoKind =
  ButtonPressEventDto['type'] | CollectionItemPressEventDto['type'] | FormSubmitEventDto['type'];

export type KnownComponentEventDto =
  ButtonPressEventDto | CollectionItemPressEventDto | FormSubmitEventDto;

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

export const STATE_PROVIDERS = ['legend'] as const;
export type KnownStateProvider = (typeof STATE_PROVIDERS)[number];
export type StateProvider = KnownStateProvider | (string & {});

export const STATE_PERSISTENCE_MODES = ['none', 'local', 'secure', 'database'] as const;
export type StatePersistenceMode = (typeof STATE_PERSISTENCE_MODES)[number];

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

export const AUTH_PROFILE_PRIMARY_KEY_STRATEGIES = ['authUserId'] as const;
export type AuthProfilePrimaryKeyStrategy = (typeof AUTH_PROFILE_PRIMARY_KEY_STRATEGIES)[number];

export const AUTH_PROFILE_CREATE_STRATEGIES = ['trigger', 'api', 'app'] as const;
export type AuthProfileCreateStrategy = (typeof AUTH_PROFILE_CREATE_STRATEGIES)[number];

export const AUTH_PROFILE_UPDATE_STRATEGIES = ['api', 'app'] as const;
export type AuthProfileUpdateStrategy = (typeof AUTH_PROFILE_UPDATE_STRATEGIES)[number];

export interface IconSpec {
  name: string;
  provider?: string;
  size?: number | string;
  color?: string;
}

export interface UiNodeRepeatSpec {
  source: BindingValueSource;
  itemAlias?: string;
  keyPath?: string;
  empty?: readonly UiNode[];
}

export interface UiNode {
  id: string;
  type: string;
  alias?: string;
  props?: Record<string, unknown>;
  children?: UiNode[];
  style?: Record<string, number | string>;
  repeat?: UiNodeRepeatSpec;
}

export interface ScreenSpec {
  id: string;
  name: string;
  title?: string;
  description?: string;
  root: UiNode;
  dataLoaders?: readonly ScreenDataLoaderDefinition[];
  requires?: ScreenRequirements;
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
  /**
   * Whether this route appears in Tabs and Drawer primary navigation.
   *
   * Omitted routes are visible by default. Setting this to `false` hides the
   * route from primary navigation without making it unnavigable. Stack
   * navigators preserve the value but do not present primary navigation.
   */
  showInPrimaryNavigation?: boolean;
  guards?: string[];
  screenId?: string;
  navigator?: NavigatorSpec;
}

export type SplashScreenResizeMode = 'contain' | 'cover' | 'native';

export interface SplashScreenAssetSpec {
  readonly image?: string;
  readonly imageWidth?: number;
  readonly resizeMode?: SplashScreenResizeMode;
}

export interface SplashScreenModeSpec extends SplashScreenAssetSpec {
  readonly backgroundColor?: string;
}

export interface SplashScreenSpec extends SplashScreenModeSpec {
  readonly dark?: SplashScreenModeSpec;
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

export interface StateSpec {
  readonly provider: StateProvider;
  readonly persistence?: StatePersistenceMode;
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
  table?: string;
  primaryKey?: AuthProfilePrimaryKeyStrategy;
  createStrategy?: AuthProfileCreateStrategy;
  updateStrategy?: AuthProfileUpdateStrategy;
}

export interface AuthSpec {
  scope: AuthScope;
  provider: AuthProvider;
  authorization?: AuthzSpec;
  flow?: AuthFlowConfig;
  signIn?: AuthSignInSpec;
  signUp?: AuthSignUpSpec;
  oauth?: AuthOAuthConfig;
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
  state?: StateSpec;
  networking?: NetworkingSpec;
  apis?: ApiDefinitionList;
  modules: string[];
  modulesConfig?: Record<string, unknown>;
}

export interface AppSettings {
  localization: {
    defaultLocale: string;
    locales: string[];
  };
}

export interface AppRepositoryConfig {
  readonly provider: 'github';
  readonly owner: string;
  readonly name: string;
  readonly url: string;
  readonly defaultBranch: 'main';
}

export interface AppManifest {
  metadata: {
    name: string;
    slug: string;
    version: string;
    category: AppCategory;
    themeId: string;
    created?: string;
    updated?: string;
  };
  themes: ThemeConfig[];
  activeThemeId: string;
  activeThemeMode?: 'dark' | 'light';
  splashScreen?: SplashScreenSpec;
  /** Studio-managed authoring media. Runtime/user uploads are intentionally separate. */
  media?: MediaManifest;
  /** App distribution desired state. Infrastructure deployment remains under `infra.deployment`. */
  deploy?: AppDeployManifest;
  infra: InfraManifest;
  navigator: NavigatorSpec;
  screens: Record<string, ScreenSpec>;
  dataSources?: DataSourceRegistry;
  dataBindings?: ComponentDataBindingRegistry;
  repository?: AppRepositoryConfig;
  settings: AppSettings;
}
