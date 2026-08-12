import { COLOR_HARMONIES } from '@ankhorage/color-theory';

import { AUTH_OAUTH_PROVIDER_IDS } from './auth';
import {
  APP_CATEGORIES,
  AUTH_PROFILE_CREATE_STRATEGIES,
  AUTH_PROFILE_PRIMARY_KEY_STRATEGIES,
  AUTH_PROFILE_UPDATE_STRATEGIES,
  AUTH_SCOPES,
  AUTH_SIGN_IN_IDENTIFIERS,
  AUTH_SIGN_UP_POLICIES,
  AUTHZ_ENGINES,
  AUTHZ_KINDS,
  DATABASE_TIERS,
  NAVIGATOR_TYPES,
  STATE_PERSISTENCE_MODES,
  STORAGE_PROVIDERS,
  type AppManifest,
} from './types';

export type AppManifestParseResult =
  | { readonly ok: true; readonly manifest: AppManifest }
  | { readonly ok: false; readonly message: string };

const APP_MANIFEST_KEY_POLICY = {
  metadata: 'required',
  themes: 'required',
  activeThemeId: 'required',
  activeThemeMode: 'optional',
  splashScreen: 'optional',
  infra: 'required',
  navigator: 'required',
  screens: 'required',
  generatedApis: 'optional',
  dataSources: 'optional',
  dataBindings: 'optional',
  settings: 'required',
} as const satisfies Record<keyof AppManifest, 'optional' | 'required'>;

const APP_CATEGORY_SET = new Set<string>(APP_CATEGORIES);
const AUTH_OAUTH_PROVIDER_SET = new Set<string>(AUTH_OAUTH_PROVIDER_IDS);
const AUTH_PROFILE_CREATE_STRATEGY_SET = new Set<string>(AUTH_PROFILE_CREATE_STRATEGIES);
const AUTH_PROFILE_PRIMARY_KEY_STRATEGY_SET = new Set<string>(AUTH_PROFILE_PRIMARY_KEY_STRATEGIES);
const AUTH_PROFILE_UPDATE_STRATEGY_SET = new Set<string>(AUTH_PROFILE_UPDATE_STRATEGIES);
const AUTH_SCOPE_SET = new Set<string>(AUTH_SCOPES);
const AUTH_SIGN_IN_IDENTIFIER_SET = new Set<string>(AUTH_SIGN_IN_IDENTIFIERS);
const AUTH_SIGN_UP_POLICY_SET = new Set<string>(AUTH_SIGN_UP_POLICIES);
const AUTHZ_ENGINE_SET = new Set<string>(AUTHZ_ENGINES);
const AUTHZ_KIND_SET = new Set<string>(AUTHZ_KINDS);
const COLOR_HARMONY_SET = new Set<string>(COLOR_HARMONIES);
const DATABASE_TIER_SET = new Set<string>(DATABASE_TIERS);
const NAVIGATOR_TYPE_SET = new Set<string>(NAVIGATOR_TYPES);
const SPLASH_SCREEN_RESIZE_MODE_SET = new Set<string>(['contain', 'cover', 'native']);
const STATE_PERSISTENCE_MODE_SET = new Set<string>(STATE_PERSISTENCE_MODES);
const STORAGE_PROVIDER_SET = new Set<string>(STORAGE_PROVIDERS);

export function parseAppManifest(value: unknown): AppManifestParseResult {
  return isAppManifest(value)
    ? { ok: true, manifest: value }
    : { ok: false, message: 'Value is not a canonical AppManifest.' };
}

export function isAppManifest(value: unknown): value is AppManifest {
  return (
    isRecord(value) &&
    hasRequiredManifestKeys(value) &&
    isManifestMetadata(value.metadata) &&
    Array.isArray(value.themes) &&
    value.themes.every(isThemeConfig) &&
    typeof value.activeThemeId === 'string' &&
    (value.activeThemeMode === undefined ||
      value.activeThemeMode === 'dark' ||
      value.activeThemeMode === 'light') &&
    (value.splashScreen === undefined || isSplashScreenSpec(value.splashScreen)) &&
    isInfraManifest(value.infra) &&
    isNavigatorSpec(value.navigator) &&
    isScreenRegistry(value.screens) &&
    (value.generatedApis === undefined || isGeneratedApiRegistry(value.generatedApis)) &&
    (value.dataSources === undefined || isDataSourceRegistry(value.dataSources)) &&
    (value.dataBindings === undefined || isComponentDataBindingRegistry(value.dataBindings)) &&
    isAppSettings(value.settings)
  );
}

function hasRequiredManifestKeys(value: Record<string, unknown>): boolean {
  return Object.entries(APP_MANIFEST_KEY_POLICY).every(
    ([key, policy]) => policy === 'optional' || key in value,
  );
}

function isManifestMetadata(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.name === 'string' &&
    typeof value.slug === 'string' &&
    typeof value.version === 'string' &&
    typeof value.category === 'string' &&
    APP_CATEGORY_SET.has(value.category) &&
    typeof value.themeId === 'string' &&
    isOptionalString(value.created) &&
    isOptionalString(value.updated)
  );
}

function isThemeConfig(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    isThemeModeConfig(value.light) &&
    isThemeModeConfig(value.dark)
  );
}

function isThemeModeConfig(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.primaryColor === 'string' &&
    typeof value.harmony === 'string' &&
    COLOR_HARMONY_SET.has(value.harmony)
  );
}

function isUiNode(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.type === 'string' &&
    isOptionalString(value.alias) &&
    (value.props === undefined || isRecord(value.props)) &&
    (value.style === undefined || isRecord(value.style)) &&
    (value.repeat === undefined || isUiNodeRepeatSpec(value.repeat)) &&
    (value.children === undefined ||
      (Array.isArray(value.children) && value.children.every(isUiNode)))
  );
}

function isUiNodeRepeatSpec(value: unknown): boolean {
  return (
    isRecord(value) &&
    isBindingValueSource(value.source) &&
    isOptionalString(value.itemAlias) &&
    isOptionalString(value.keyPath) &&
    (value.empty === undefined ||
      (Array.isArray(value.empty) && value.empty.every(isUiNode)))
  );
}

function isScreenSpec(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    isOptionalString(value.title) &&
    isOptionalString(value.description) &&
    (value.dataLoaders === undefined ||
      (Array.isArray(value.dataLoaders) && value.dataLoaders.every(isScreenDataLoaderDefinition))) &&
    (value.requires === undefined || isScreenRequirements(value.requires)) &&
    isUiNode(value.root)
  );
}

function isScreenRegistry(value: unknown): boolean {
  return (
    isRecord(value) &&
    Object.entries(value).every(
      ([registryKey, screen]) => isScreenSpec(screen) && isRecord(screen) && registryKey === screen.id,
    )
  );
}

function isNavigatorSpec(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.type === 'string' &&
    NAVIGATOR_TYPE_SET.has(value.type) &&
    isOptionalString(value.initialRouteName) &&
    Array.isArray(value.routes) &&
    value.routes.every(isRouteDefinition) &&
    (value.options === undefined || isRecord(value.options))
  );
}

function isRouteDefinition(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.name === 'string' &&
    isOptionalString(value.path) &&
    isOptionalString(value.label) &&
    (value.icon === undefined || isIconSpec(value.icon)) &&
    isOptionalBoolean(value.showInPrimaryNavigation) &&
    (value.guards === undefined || isStringArray(value.guards)) &&
    isOptionalString(value.screenId) &&
    (value.navigator === undefined || isNavigatorSpec(value.navigator))
  );
}

function isIconSpec(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.name === 'string' &&
    isOptionalString(value.provider) &&
    (value.size === undefined || typeof value.size === 'string' || typeof value.size === 'number') &&
    isOptionalString(value.color)
  );
}

function isSplashScreenSpec(value: unknown): boolean {
  return (
    isSplashScreenModeSpec(value) &&
    isRecord(value) &&
    (value.dark === undefined || isSplashScreenModeSpec(value.dark))
  );
}

function isSplashScreenModeSpec(value: unknown): boolean {
  return (
    isRecord(value) &&
    isOptionalString(value.image) &&
    isOptionalNumber(value.imageWidth) &&
    (value.resizeMode === undefined ||
      (typeof value.resizeMode === 'string' && SPLASH_SCREEN_RESIZE_MODE_SET.has(value.resizeMode))) &&
    isOptionalString(value.backgroundColor)
  );
}

function isInfraManifest(value: unknown): boolean {
  return (
    isRecord(value) &&
    (value.deployment === undefined || isDeploymentSpec(value.deployment)) &&
    (value.auth === undefined || isAuthSpec(value.auth)) &&
    (value.database === undefined || isDatabaseSpec(value.database)) &&
    (value.storage === undefined || isStorageSpec(value.storage)) &&
    (value.state === undefined || isStateSpec(value.state)) &&
    (value.networking === undefined || isNetworkingSpec(value.networking)) &&
    Array.isArray(value.modules) &&
    value.modules.every((moduleId) => typeof moduleId === 'string') &&
    (value.modulesConfig === undefined || isRecord(value.modulesConfig)) &&
    !('plugins' in value) &&
    !('pluginsConfig' in value)
  );
}

function isDeploymentSpec(value: unknown): boolean {
  return isRecord(value) && typeof value.target === 'string' && typeof value.monitoring === 'boolean';
}

function isDatabaseSpec(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.provider === 'string' &&
    typeof value.tier === 'string' &&
    DATABASE_TIER_SET.has(value.tier)
  );
}

function isStorageSpec(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.provider === 'string' &&
    STORAGE_PROVIDER_SET.has(value.provider) &&
    isStringArray(value.buckets)
  );
}

function isStateSpec(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.provider === 'string' &&
    (value.persistence === undefined ||
      (typeof value.persistence === 'string' && STATE_PERSISTENCE_MODE_SET.has(value.persistence)))
  );
}

function isNetworkingSpec(value: unknown): boolean {
  return isRecord(value) && isOptionalString(value.domain) && typeof value.cdn === 'boolean';
}

function isAuthSpec(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.scope === 'string' &&
    AUTH_SCOPE_SET.has(value.scope) &&
    typeof value.provider === 'string' &&
    (value.authorization === undefined || isAuthzSpec(value.authorization)) &&
    (value.flow === undefined || isAuthFlow(value.flow)) &&
    (value.signIn === undefined || isAuthSignInSpec(value.signIn)) &&
    (value.signUp === undefined || isAuthSignUpSpec(value.signUp)) &&
    (value.oauth === undefined || isAuthOAuthConfig(value.oauth)) &&
    (value.profile === undefined || isAuthProfileSpec(value.profile))
  );
}

function isAuthzSpec(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.kind === 'string' &&
    AUTHZ_KIND_SET.has(value.kind) &&
    typeof value.engine === 'string' &&
    AUTHZ_ENGINE_SET.has(value.engine)
  );
}

function isAuthFlow(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.signInRoute === 'string' &&
    isOptionalString(value.signUpRoute) &&
    isOptionalString(value.signOutRoute) &&
    isOptionalString(value.forgotPasswordRoute) &&
    isOptionalString(value.otpRoute) &&
    typeof value.postSignInRoute === 'string' &&
    isOptionalString(value.unauthorizedRoute)
  );
}

function isAuthSignInSpec(value: unknown): boolean {
  return (
    isRecord(value) &&
    Array.isArray(value.identifiers) &&
    value.identifiers.every(
      (identifier) => typeof identifier === 'string' && AUTH_SIGN_IN_IDENTIFIER_SET.has(identifier),
    )
  );
}

function isAuthSignUpSpec(value: unknown): boolean {
  return (
    isRecord(value) &&
    isStringArray(value.requiredFields) &&
    (value.optionalFields === undefined || isStringArray(value.optionalFields)) &&
    (value.signUpPolicy === undefined ||
      (typeof value.signUpPolicy === 'string' && AUTH_SIGN_UP_POLICY_SET.has(value.signUpPolicy)))
  );
}

function isAuthOAuthConfig(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.enabled === 'boolean' &&
    typeof value.callbackRoute === 'string' &&
    Array.isArray(value.providers) &&
    value.providers.every(isAuthOAuthProviderConfig)
  );
}

function isAuthOAuthProviderConfig(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    (AUTH_OAUTH_PROVIDER_SET.has(value.id) || value.id.length > 0) &&
    isOptionalString(value.label) &&
    isOptionalBoolean(value.enabled) &&
    (value.scopes === undefined || isStringArray(value.scopes)) &&
    (value.queryParams === undefined || isStringRecord(value.queryParams)) &&
    (value.icon === undefined || isIconSpec(value.icon)) &&
    (value.credentialsRef === undefined || isSecretRef(value.credentialsRef))
  );
}

function isAuthProfileSpec(value: unknown): boolean {
  return (
    isRecord(value) &&
    isStringArray(value.fields) &&
    isOptionalString(value.table) &&
    (value.primaryKey === undefined ||
      (typeof value.primaryKey === 'string' &&
        AUTH_PROFILE_PRIMARY_KEY_STRATEGY_SET.has(value.primaryKey))) &&
    (value.createStrategy === undefined ||
      (typeof value.createStrategy === 'string' &&
        AUTH_PROFILE_CREATE_STRATEGY_SET.has(value.createStrategy))) &&
    (value.updateStrategy === undefined ||
      (typeof value.updateStrategy === 'string' &&
        AUTH_PROFILE_UPDATE_STRATEGY_SET.has(value.updateStrategy)))
  );
}

function isAppSettings(value: unknown): boolean {
  return (
    isRecord(value) &&
    isRecord(value.localization) &&
    typeof value.localization.defaultLocale === 'string' &&
    isStringArray(value.localization.locales) &&
    isOptionalString(value.apiBaseUrl)
  );
}

function isScreenRequirements(value: unknown): boolean {
  return (
    isRecord(value) &&
    (value.permissions === undefined ||
      (Array.isArray(value.permissions) &&
        value.permissions.every(
          (entry) => isRecord(entry) && typeof entry.permission === 'string',
        ))) &&
    (value.capabilities === undefined ||
      (Array.isArray(value.capabilities) &&
        value.capabilities.every(
          (entry) => isRecord(entry) && typeof entry.capability === 'string',
        )))
  );
}

function isGeneratedApiRegistry(value: unknown): boolean {
  return isRecord(value) && Object.values(value).every(isGeneratedApiDefinition);
}

function isGeneratedApiDefinition(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    value.protocol === 'rest' &&
    isOptionalString(value.name) &&
    isOptionalString(value.description) &&
    typeof value.basePath === 'string' &&
    isRecord(value.database) &&
    value.database.kind === 'database' &&
    isAdapterRef(value.database) &&
    Array.isArray(value.resources) &&
    value.resources.every(isGeneratedApiResourceDefinition) &&
    (value.auth === undefined || isGeneratedApiAuthRequirement(value.auth)) &&
    (value.metadata === undefined || isManifestValue(value.metadata))
  );
}

function isGeneratedApiAuthRequirement(value: unknown): boolean {
  return (
    isRecord(value) &&
    isOptionalBoolean(value.required) &&
    (value.roles === undefined || isStringArray(value.roles)) &&
    (value.permissions === undefined || isStringArray(value.permissions)) &&
    isOptionalString(value.policy) &&
    (value.metadata === undefined || isManifestValue(value.metadata))
  );
}

function isGeneratedApiResourceDefinition(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    isOptionalString(value.name) &&
    isOptionalString(value.description) &&
    typeof value.path === 'string' &&
    isDbCollectionDefinition(value.collection) &&
    Array.isArray(value.operations) &&
    value.operations.every(isGeneratedApiCrudOperation) &&
    (value.seed === undefined ||
      (Array.isArray(value.seed) &&
        value.seed.every(
          (record) => isRecord(record) && Object.values(record).every(isManifestValue),
        ))) &&
    (value.policies === undefined ||
      (Array.isArray(value.policies) && value.policies.every(isGeneratedApiPolicyRef))) &&
    (value.metadata === undefined || isManifestValue(value.metadata))
  );
}

function isGeneratedApiCrudOperation(value: unknown): boolean {
  return ['create', 'delete', 'list', 'read', 'update'].includes(String(value));
}

function isGeneratedApiPolicyRef(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    (value.operation === undefined || isGeneratedApiCrudOperation(value.operation))
  );
}

function isDbCollectionDefinition(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.name === 'string' &&
    isOptionalString(value.schema) &&
    Array.isArray(value.fields) &&
    value.fields.every(isDbFieldDefinition) &&
    isOptionalString(value.primaryKey)
  );
}

function isDbFieldDefinition(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.name === 'string' &&
    typeof value.type === 'string' &&
    ['text', 'number', 'boolean', 'datetime', 'json', 'uuid'].includes(value.type) &&
    isOptionalBoolean(value.required) &&
    isOptionalBoolean(value.unique) &&
    (value.defaultValue === undefined ||
      value.defaultValue === null ||
      ['boolean', 'number', 'string'].includes(typeof value.defaultValue))
  );
}

function isDataSourceRegistry(value: unknown): boolean {
  return isRecord(value) && Object.values(value).every(isDataSourceConfig);
}

function isDataSourceConfig(value: unknown): boolean {
  if (
    !isRecord(value) ||
    typeof value.id !== 'string' ||
    (value.kind !== 'api' && value.kind !== 'database') ||
    !isOptionalString(value.name) ||
    !isOptionalString(value.description) ||
    (value.credential !== undefined && !isCredentialRef(value.credential)) ||
    !isDataEndpointRegistry(value.endpoints) ||
    (value.schemas !== undefined && !isRecord(value.schemas)) ||
    (value.metadata !== undefined && !isManifestValue(value.metadata))
  ) {
    return false;
  }

  if (value.kind === 'database') {
    return isRecord(value.adapter) && value.adapter.kind === 'database' && isAdapterRef(value.adapter);
  }

  if (value.origin === 'generated') {
    return (
      value.protocol === 'rest' &&
      typeof value.generatedApiId === 'string' &&
      isRecord(value.adapter) &&
      value.adapter.kind === 'database' &&
      isAdapterRef(value.adapter)
    );
  }

  if (value.origin !== 'external') return false;
  if (value.protocol === 'rest') {
    return typeof value.baseUrl === 'string' &&
      (value.openApi === undefined || isOpenApiDocumentRef(value.openApi));
  }
  if (value.protocol === 'graphql') {
    return typeof value.endpointUrl === 'string' &&
      (value.introspection === undefined || isGraphQlIntrospection(value.introspection));
  }
  return false;
}

function isOpenApiDocumentRef(value: unknown): boolean {
  return (
    isRecord(value) &&
    isOptionalString(value.url) &&
    isOptionalString(value.documentId) &&
    isOptionalString(value.version)
  );
}

function isGraphQlIntrospection(value: unknown): boolean {
  return isRecord(value) && typeof value.enabled === 'boolean' && isOptionalString(value.schemaVersion);
}

function isDataEndpointRegistry(value: unknown): boolean {
  return isRecord(value) && Object.values(value).every(isDataEndpointConfig);
}

function isDataEndpointConfig(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.kind === 'string' &&
    isOptionalString(value.name) &&
    isOptionalString(value.description) &&
    isOptionalString(value.baseUrl) &&
    isOptionalString(value.path) &&
    (value.credential === undefined || isCredentialRef(value.credential)) &&
    isRecord(value.operations) &&
    Object.values(value.operations).every(isDataOperationConfig) &&
    (value.metadata === undefined || isManifestValue(value.metadata))
  );
}

function isDataOperationConfig(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    isOptionalString(value.endpointId) &&
    isOptionalString(value.name) &&
    isOptionalString(value.description) &&
    typeof value.protocol === 'string' &&
    typeof value.intent === 'string' &&
    ['action', 'create', 'delete', 'read', 'update'].includes(value.intent) &&
    isOptionalString(value.method) &&
    isOptionalString(value.path) &&
    (value.request === undefined || isDataOperationRequest(value.request)) &&
    (value.response === undefined || isDataOperationResponse(value.response)) &&
    (value.pagination === undefined || isRecord(value.pagination)) &&
    (value.credential === undefined || isCredentialRef(value.credential)) &&
    (value.metadata === undefined || isManifestValue(value.metadata))
  );
}

function isDataOperationRequest(value: unknown): boolean {
  return (
    isRecord(value) &&
    isDataSchemaSlot(value) &&
    (value.parameters === undefined ||
      (Array.isArray(value.parameters) && value.parameters.every(isDataOperationParameter)))
  );
}

function isDataOperationParameter(value: unknown): boolean {
  return (
    isRecord(value) &&
    isDataSchemaSlot(value) &&
    typeof value.name === 'string' &&
    typeof value.location === 'string' &&
    ['body', 'cookie', 'header', 'path', 'query'].includes(value.location) &&
    isOptionalBoolean(value.required) &&
    isOptionalString(value.description) &&
    (value.default === undefined || isManifestValue(value.default))
  );
}

function isDataOperationResponse(value: unknown): boolean {
  return (
    isRecord(value) &&
    isDataSchemaSlot(value) &&
    (value.status === undefined || typeof value.status === 'string' || typeof value.status === 'number') &&
    isOptionalString(value.contentType) &&
    isOptionalString(value.description)
  );
}

function isDataSchemaSlot(value: unknown): boolean {
  return isRecord(value) && (value.schema === undefined || isRecord(value.schema));
}

function isComponentDataBindingRegistry(value: unknown): boolean {
  return isRecord(value) && Object.values(value).every(isComponentDataBinding);
}

function isComponentDataBinding(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.componentId === 'string' &&
    isOptionalString(value.componentType) &&
    (value.props === undefined ||
      (isRecord(value.props) && Object.values(value.props).every(isPropBinding))) &&
    (value.events === undefined ||
      (isRecord(value.events) &&
        Object.values(value.events).every(
          (bindings) => Array.isArray(bindings) && bindings.every(isEventBinding),
        )))
  );
}

function isPropBinding(value: unknown): boolean {
  return (
    isRecord(value) &&
    isBindingValueSource(value.source) &&
    (value.fallback === undefined || isBindingFallback(value.fallback)) &&
    (value.loading === undefined || isBindingLifecycleBehavior(value.loading)) &&
    (value.error === undefined || isBindingLifecycleBehavior(value.error)) &&
    (value.empty === undefined || isBindingLifecycleBehavior(value.empty)) &&
    isOptionalBindingTransforms(value.transforms)
  );
}

function isEventBinding(value: unknown): boolean {
  return (
    isRecord(value) &&
    isEventBindingTarget(value.target) &&
    (value.input === undefined || isBindingInputMap(value.input)) &&
    (value.when === undefined || isBindingCondition(value.when))
  );
}

function isEventBindingTarget(value: unknown): boolean {
  return (
    isRecord(value) &&
    ((value.kind === 'action' && typeof value.type === 'string') ||
      (value.kind === 'operation' && isBindingOperationRef(value.operation)))
  );
}

function isBindingCondition(value: unknown): boolean {
  return (
    isRecord(value) &&
    isBindingValueSource(value.source) &&
    ['eq', 'exists', 'neq', 'notExists'].includes(String(value.operator)) &&
    (value.value === undefined || isManifestValue(value.value))
  );
}

function isBindingValueSource(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.kind === 'string' &&
    ['context', 'event', 'literal', 'operation', 'state'].includes(value.kind) &&
    (value.kind === 'literal'
      ? isManifestValue(value.value)
      : value.kind === 'operation'
        ? isBindingOperationRef(value.operation) && isOptionalString(value.path)
        : typeof value.path === 'string')
  );
}

function isBindingOperationRef(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.dataSourceId === 'string' &&
    typeof value.operationId === 'string' &&
    isOptionalString(value.endpointId)
  );
}

function isBindingFallback(value: unknown): boolean {
  return (
    isRecord(value) &&
    (value.value === undefined || isManifestValue(value.value)) &&
    (value.source === undefined || isBindingValueSource(value.source))
  );
}

function isBindingLifecycleBehavior(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.state === 'string' &&
    ['empty', 'error', 'loading'].includes(value.state) &&
    (value.fallback === undefined || isBindingFallback(value.fallback)) &&
    isOptionalString(value.message)
  );
}

function isOptionalBindingTransforms(value: unknown): boolean {
  return (
    value === undefined ||
    (Array.isArray(value) &&
      value.every((transform) => ['lowercase', 'trim', 'uppercase'].includes(String(transform))))
  );
}

function isScreenDataLoaderDefinition(value: unknown): boolean {
  return (
    isRecord(value) &&
    value.kind === 'operation' &&
    isOptionalString(value.id) &&
    isBindingOperationRef(value.operation) &&
    (value.input === undefined || isBindingInputMap(value.input))
  );
}

function isBindingInputMap(value: unknown): boolean {
  return isRecord(value) && Object.values(value).every(isBindingInputValue);
}

function isBindingInputValue(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.kind === 'string' &&
    ((value.kind === 'array' && Array.isArray(value.items) && value.items.every(isBindingInputValue)) ||
      (value.kind === 'literal' && isManifestValue(value.value)) ||
      (value.kind === 'object' && isBindingInputMap(value.fields)) ||
      (value.kind === 'source' &&
        isBindingValueSource(value.source) &&
        isOptionalBindingTransforms(value.transforms)))
  );
}

function isCredentialRef(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.kind === 'string' &&
    isOptionalString(value.label) &&
    isOptionalString(value.scope)
  );
}

function isAdapterRef(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.kind === 'string' &&
    isOptionalString(value.packageName) &&
    isOptionalString(value.exportName) &&
    (value.config === undefined || isManifestValue(value.config))
  );
}

function isSecretRef(value: unknown): boolean {
  return typeof value === 'string';
}

function isManifestValue(value: unknown): boolean {
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every(isManifestValue);
  }

  return isRecord(value) && Object.values(value).every(isManifestValue);
}

function isStringRecord(value: unknown): boolean {
  return isRecord(value) && Object.values(value).every((entry) => typeof entry === 'string');
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === 'string');
}

function isOptionalString(value: unknown): boolean {
  return value === undefined || typeof value === 'string';
}

function isOptionalNumber(value: unknown): boolean {
  return value === undefined || typeof value === 'number';
}

function isOptionalBoolean(value: unknown): boolean {
  return value === undefined || typeof value === 'boolean';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
