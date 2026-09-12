import { isComponentDataBindingRegistry } from '../../../appManifest/bindings';
import { isDataSourceRegistry } from '../../../appManifest/dataSources';
import { isAppDeployManifest } from '../../../appManifest/deploy';
import { isMediaManifest } from '../../../appManifest/media';
import {
  isAppNavigatorManifest,
  isManifestMetadata,
  isScreenRegistry,
  isSplashScreenSpec,
  isThemeConfig,
} from '../../../appManifest/screens';
import { isRecord, isStringArray } from '../../../appManifest/shared';
import { isAppStateSpec } from '../../../features/appState/domain/isAppStateSpec';
import { isInfraManifest } from '../../../features/infra/domain/isInfraManifest';
import type { AppManifest } from '../../../types';
import { APP_MANIFEST_KEY_POLICY } from './constants';

/** Return whether an unknown value satisfies the canonical AppManifest shape. */
export function isAppManifest(value: unknown): value is AppManifest {
  return (
    isRecord(value) &&
    hasRequiredManifestKeys(value) &&
    !('generatedApis' in value) &&
    isManifestMetadata(value.metadata) &&
    isPresentation(value) &&
    isOptionalCapabilities(value) &&
    isInfraManifest(value.infra) &&
    isAppNavigatorManifest(value.navigator) &&
    isScreenRegistry(value.screens) &&
    isAppSettings(value.settings)
  );
}

/*** Validate the canonical application manifest field policy. */
function hasRequiredManifestKeys(value: Record<string, unknown>): boolean {
  return Object.entries(APP_MANIFEST_KEY_POLICY).every(
    ([key, policy]) => policy === 'optional' || key in value,
  );
}

/*** Validate the canonical application manifest field policy. */
function isActiveThemeMode(value: unknown): boolean {
  return value === undefined || value === 'dark' || value === 'light';
}

/*** Validate the canonical application manifest field policy. */
function isRepositoryManifest(value: unknown): boolean {
  return (
    isRecord(value) &&
    value.provider === 'github' &&
    typeof value.owner === 'string' &&
    value.owner.length > 0 &&
    typeof value.name === 'string' &&
    value.name.length > 0 &&
    typeof value.url === 'string' &&
    value.url.length > 0 &&
    value.defaultBranch === 'main'
  );
}

/*** Validate the canonical application manifest field policy. */
function isAppSettings(value: unknown): boolean {
  return (
    isRecord(value) &&
    !('apiBaseUrl' in value) &&
    isRecord(value.localization) &&
    typeof value.localization.defaultLocale === 'string' &&
    isStringArray(value.localization.locales)
  );
}

/*** Validate authored appearance as one cohesive manifest concern. */
function isPresentation(value: Record<string, unknown>): boolean {
  return (
    Array.isArray(value.themes) &&
    value.themes.every(isThemeConfig) &&
    typeof value.activeThemeId === 'string' &&
    isActiveThemeMode(value.activeThemeMode) &&
    (value.splashScreen === undefined || isSplashScreenSpec(value.splashScreen)) &&
    (value.media === undefined || isMediaManifest(value.media))
  );
}

/*** Validate independently optional application capability selections. */
function isOptionalCapabilities(value: Record<string, unknown>): boolean {
  return (
    (value.deploy === undefined || isAppDeployManifest(value.deploy)) &&
    (value.state === undefined || isAppStateSpec(value.state)) &&
    (value.dataSources === undefined || isDataSourceRegistry(value.dataSources)) &&
    (value.dataBindings === undefined || isComponentDataBindingRegistry(value.dataBindings)) &&
    (value.repository === undefined || isRepositoryManifest(value.repository))
  );
}
