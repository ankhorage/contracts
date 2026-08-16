import { isComponentDataBindingRegistry } from './appManifest/bindings';
import { isDataSourceRegistry } from './appManifest/dataSources';
import { isAppDeployManifest } from './appManifest/deploy';
import { isInfraManifest } from './appManifest/infra';
import { isMediaManifest } from './appManifest/media';
import {
  isManifestMetadata,
  isNavigatorSpec,
  isScreenRegistry,
  isSplashScreenSpec,
  isThemeConfig,
} from './appManifest/screens';
import { isOptionalString, isRecord, isStringArray } from './appManifest/shared';
import type { AppManifest } from './types';

export type AppManifestParseResult =
  | { readonly ok: true; readonly manifest: AppManifest }
  | { readonly ok: false; readonly message: string };

const APP_MANIFEST_KEY_POLICY = {
  metadata: 'required',
  themes: 'required',
  activeThemeId: 'required',
  activeThemeMode: 'optional',
  splashScreen: 'optional',
  media: 'optional',
  deploy: 'optional',
  infra: 'required',
  navigator: 'required',
  screens: 'required',
  dataSources: 'optional',
  dataBindings: 'optional',
  settings: 'required',
} as const satisfies Record<keyof AppManifest, 'optional' | 'required'>;

/**
 * Parse unknown JSON-compatible input at the canonical AppManifest boundary.
 *
 * Contracts owns structural manifest validation. Consumers may add semantic
 * diagnostics after this parser succeeds, but should not reconstruct the
 * AppManifest shape in their own packages.
 */
export function parseAppManifest(value: unknown): AppManifestParseResult {
  return isAppManifest(value)
    ? { ok: true, manifest: value }
    : { ok: false, message: 'Value is not a canonical AppManifest.' };
}

/** Return whether an unknown value satisfies the canonical AppManifest shape. */
export function isAppManifest(value: unknown): value is AppManifest {
  return (
    isRecord(value) &&
    hasRequiredManifestKeys(value) &&
    !('generatedApis' in value) &&
    isManifestMetadata(value.metadata) &&
    Array.isArray(value.themes) &&
    value.themes.every(isThemeConfig) &&
    typeof value.activeThemeId === 'string' &&
    isActiveThemeMode(value.activeThemeMode) &&
    (value.splashScreen === undefined || isSplashScreenSpec(value.splashScreen)) &&
    (value.media === undefined || isMediaManifest(value.media)) &&
    (value.deploy === undefined || isAppDeployManifest(value.deploy)) &&
    isInfraManifest(value.infra) &&
    isNavigatorSpec(value.navigator) &&
    isScreenRegistry(value.screens) &&
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

function isActiveThemeMode(value: unknown): boolean {
  return value === undefined || value === 'dark' || value === 'light';
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
