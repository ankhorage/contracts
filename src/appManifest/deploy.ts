import { hasOnlyKeys, isRecord } from '@ankhorage/utility/object';
import { isNonEmptyString } from '@ankhorage/utility/string';

import type {
  AppDeployAndroidTargetConfig,
  AppDeployIosTargetConfig,
  AppDeployManifest,
  AppDeployProviderSelection,
  AppDeployTargets,
  AppDeployWebTargetConfig,
} from '../deploy';

const DEPLOY_KEYS = ['targets'] as const;
const TARGET_KEYS = ['web', 'android', 'ios'] as const;
const PROVIDER_KEYS = ['build', 'publish'] as const;
const WEB_KEYS = ['enabled', 'providers'] as const;
const ANDROID_KEYS = ['enabled', 'package', 'scheme', 'providers'] as const;
const IOS_KEYS = ['enabled', 'bundleIdentifier', 'scheme', 'providers'] as const;
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
