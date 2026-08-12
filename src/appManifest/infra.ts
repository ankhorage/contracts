import { AUTH_OAUTH_PROVIDER_IDS } from '../auth';
import {
  AUTH_PROFILE_CREATE_STRATEGIES,
  AUTH_PROFILE_PRIMARY_KEY_STRATEGIES,
  AUTH_PROFILE_UPDATE_STRATEGIES,
  AUTH_SCOPES,
  AUTH_SIGN_IN_IDENTIFIERS,
  AUTH_SIGN_UP_POLICIES,
  AUTHZ_ENGINES,
  AUTHZ_KINDS,
  DATABASE_TIERS,
  STATE_PERSISTENCE_MODES,
  STORAGE_PROVIDERS,
} from '../types';
import {
  isOptionalBoolean,
  isOptionalString,
  isRecord,
  isStringArray,
  isStringRecord,
} from './shared';

const AUTH_OAUTH_PROVIDER_SET = new Set<string>(AUTH_OAUTH_PROVIDER_IDS);
const AUTH_PROFILE_CREATE_STRATEGY_SET = new Set<string>(AUTH_PROFILE_CREATE_STRATEGIES);
const AUTH_PROFILE_PRIMARY_KEY_STRATEGY_SET = new Set<string>(AUTH_PROFILE_PRIMARY_KEY_STRATEGIES);
const AUTH_PROFILE_UPDATE_STRATEGY_SET = new Set<string>(AUTH_PROFILE_UPDATE_STRATEGIES);
const AUTH_SCOPE_SET = new Set<string>(AUTH_SCOPES);
const AUTH_SIGN_IN_IDENTIFIER_SET = new Set<string>(AUTH_SIGN_IN_IDENTIFIERS);
const AUTH_SIGN_UP_POLICY_SET = new Set<string>(AUTH_SIGN_UP_POLICIES);
const AUTHZ_ENGINE_SET = new Set<string>(AUTHZ_ENGINES);
const AUTHZ_KIND_SET = new Set<string>(AUTHZ_KINDS);
const DATABASE_TIER_SET = new Set<string>(DATABASE_TIERS);
const STATE_PERSISTENCE_MODE_SET = new Set<string>(STATE_PERSISTENCE_MODES);
const STORAGE_PROVIDER_SET = new Set<string>(STORAGE_PROVIDERS);

export function isInfraManifest(value: unknown): boolean {
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
    (value.credentialsRef === undefined || typeof value.credentialsRef === 'string')
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

function isIconSpec(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.name === 'string' &&
    isOptionalString(value.provider) &&
    (value.size === undefined || typeof value.size === 'string' || typeof value.size === 'number') &&
    isOptionalString(value.color)
  );
}
