import type {
  AppDeployAndroidTargetConfig,
  AppDeployIosTargetConfig,
  AppDeployManifest,
  AppDeployProviderSelection,
  AppDeployTargets,
  AppDeployWebTargetConfig,
} from '../deploy';
import { isRecord } from './shared';

const DEPLOY_KEYS = new Set(['targets']);
const TARGET_KEYS = new Set(['web', 'android', 'ios']);
const PROVIDER_KEYS = new Set(['build', 'publish']);
const WEB_KEYS = new Set(['enabled', 'providers']);
const ANDROID_KEYS = new Set(['enabled', 'package', 'scheme', 'providers']);
const IOS_KEYS = new Set(['enabled', 'bundleIdentifier', 'scheme', 'providers']);
const URI_SCHEME_PATTERN = /^[A-Za-z][A-Za-z0-9+.-]*$/u;

export function isAppDeployManifest(value: unknown): value is AppDeployManifest {
  return isRecord(value) && hasOnlyKeys(value, DEPLOY_KEYS) && isAppDeployTargets(value.targets);
}

function isAppDeployTargets(value: unknown): value is AppDeployTargets {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, TARGET_KEYS) &&
    (value.web === undefined || isWebTarget(value.web)) &&
    (value.android === undefined || isAndroidTarget(value.android)) &&
    (value.ios === undefined || isIosTarget(value.ios))
  );
}

function isWebTarget(value: unknown): value is AppDeployWebTargetConfig {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, WEB_KEYS) &&
    typeof value.enabled === 'boolean' &&
    isOptionalProviders(value.providers)
  );
}

function isAndroidTarget(value: unknown): value is AppDeployAndroidTargetConfig {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, ANDROID_KEYS) &&
    typeof value.enabled === 'boolean' &&
    isNonEmptyString(value.package) &&
    isOptionalScheme(value.scheme) &&
    isOptionalProviders(value.providers)
  );
}

function isIosTarget(value: unknown): value is AppDeployIosTargetConfig {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, IOS_KEYS) &&
    typeof value.enabled === 'boolean' &&
    isNonEmptyString(value.bundleIdentifier) &&
    isOptionalScheme(value.scheme) &&
    isOptionalProviders(value.providers)
  );
}

function isOptionalScheme(value: unknown): value is string | undefined {
  return value === undefined || (typeof value === 'string' && URI_SCHEME_PATTERN.test(value));
}

function isOptionalProviders(value: unknown): value is AppDeployProviderSelection | undefined {
  return value === undefined || isProviderSelection(value);
}

function isProviderSelection(value: unknown): value is AppDeployProviderSelection {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, PROVIDER_KEYS) &&
    (value.build === undefined || isNonEmptyString(value.build)) &&
    (value.publish === undefined || isNonEmptyString(value.publish))
  );
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function hasOnlyKeys(value: Record<string, unknown>, allowed: ReadonlySet<string>): boolean {
  return Object.keys(value).every((key) => allowed.has(key));
}
