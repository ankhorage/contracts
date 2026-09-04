import { COLOR_HARMONIES } from '@ankhorage/color-theory';

import {
  CUSTOM_TABS_PRESENTATIONS,
  FIXED_CUSTOM_TABS_PRESENTATIONS,
  JAVASCRIPT_TABS_PRESENTATIONS,
  NAVIGATOR_PRESETS,
  NAVIGATOR_TYPES,
} from '../navigator';
import { APP_CATEGORIES } from '../types';
import { isBindingValueSource, isScreenDataLoaderDefinition } from './bindings';
import {
  isOptionalBoolean,
  isOptionalNumber,
  isOptionalString,
  isRecord,
  isStringArray,
} from './shared';

const APP_CATEGORY_SET = new Set<string>(APP_CATEGORIES);
const COLOR_HARMONY_SET = new Set<string>(COLOR_HARMONIES);
const CUSTOM_TABS_PRESENTATION_SET = new Set<string>(CUSTOM_TABS_PRESENTATIONS);
const FIXED_CUSTOM_TABS_PRESENTATION_SET = new Set<string>(FIXED_CUSTOM_TABS_PRESENTATIONS);
const JAVASCRIPT_TABS_PRESENTATION_SET = new Set<string>(JAVASCRIPT_TABS_PRESENTATIONS);
const NAVIGATOR_PRESET_SET = new Set<string>(NAVIGATOR_PRESETS);
const NAVIGATOR_TYPE_SET = new Set<string>(NAVIGATOR_TYPES);
const SPLASH_SCREEN_RESIZE_MODE_SET = new Set<string>(['contain', 'cover', 'native']);

export function isManifestMetadata(value: unknown): boolean {
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

export function isThemeConfig(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    isThemeModeConfig(value.light) &&
    isThemeModeConfig(value.dark)
  );
}

/*** Validate the complete serialized `AppManifest.navigator` slice. */
export function isAppNavigatorManifest(value: unknown): boolean {
  return (
    isRecord(value) &&
    isNavigatorNode(value) &&
    (value.preset === undefined ||
      (typeof value.preset === 'string' && NAVIGATOR_PRESET_SET.has(value.preset))) &&
    (value.flows === undefined || isNavigatorFlows(value.flows)) &&
    (value.defaults === undefined || isNavigatorDefaults(value.defaults)) &&
    (value.platforms === undefined || isNavigatorPlatforms(value.platforms))
  );
}

export function isScreenRegistry(value: unknown): boolean {
  return (
    isRecord(value) &&
    Object.entries(value).every(
      ([registryKey, screen]) =>
        isScreenSpec(screen) && isRecord(screen) && registryKey === screen.id,
    )
  );
}

export function isSplashScreenSpec(value: unknown): boolean {
  return (
    isSplashScreenModeSpec(value) &&
    isRecord(value) &&
    (value.dark === undefined || isSplashScreenModeSpec(value.dark))
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
    (value.empty === undefined || (Array.isArray(value.empty) && value.empty.every(isUiNode)))
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
      (Array.isArray(value.dataLoaders) &&
        value.dataLoaders.every(isScreenDataLoaderDefinition))) &&
    (value.requires === undefined || isScreenRequirements(value.requires)) &&
    isUiNode(value.root)
  );
}

/*** Validate one nested navigator node independently from app-level authoring metadata. */
function isNavigatorNode(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.type === 'string' &&
    NAVIGATOR_TYPE_SET.has(value.type) &&
    isOptionalString(value.initialRouteName) &&
    Array.isArray(value.routes) &&
    value.routes.every(isRouteDefinition) &&
    (value.options === undefined || isRecord(value.options)) &&
    (value.type !== 'tabs' || isTabsImplementationConfig(value))
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
    (value.navigator === undefined || isNavigatorNode(value.navigator))
  );
}

function isIconSpec(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.name === 'string' &&
    isOptionalString(value.provider) &&
    (value.size === undefined ||
      typeof value.size === 'string' ||
      typeof value.size === 'number') &&
    isOptionalString(value.color)
  );
}

/*** Validate tabs implementation desired state, with omitted implementation meaning adaptive. */
function isTabsImplementationConfig(value: Record<string, unknown>): boolean {
  if (value.implementation === undefined || value.implementation === 'adaptive') {
    return (
      (value.native === undefined || isNativeTabsConfig(value.native)) &&
      (value.web === undefined || isCustomTabsWebConfig(value.web))
    );
  }

  if (value.implementation === 'native') return true;

  if (value.implementation === 'javascript') {
    return (
      value.presentation === undefined ||
      (typeof value.presentation === 'string' &&
        JAVASCRIPT_TABS_PRESENTATION_SET.has(value.presentation))
    );
  }

  return value.implementation === 'custom' && isCustomTabsConfig(value);
}

/*** Validate the native branch used by adaptive tabs. */
function isNativeTabsConfig(value: unknown): boolean {
  return isRecord(value) && value.implementation === 'native';
}

/*** Validate a full custom-tabs implementation config. */
function isCustomTabsConfig(value: Record<string, unknown>): boolean {
  return value.implementation === 'custom' && isCustomTabsPresentationConfig(value);
}

/*** Validate the implementation-free custom-tabs Web branch inside adaptive tabs. */
function isCustomTabsWebConfig(value: unknown): boolean {
  return (
    isRecord(value) && value.implementation === undefined && isCustomTabsPresentationConfig(value)
  );
}

/*** Validate custom-tab presentation and its conditional serializable configuration. */
function isCustomTabsPresentationConfig(value: Record<string, unknown>): boolean {
  if (
    typeof value.presentation !== 'string' ||
    !CUSTOM_TABS_PRESENTATION_SET.has(value.presentation)
  ) {
    return false;
  }

  if (value.responsive !== undefined && !isResponsiveTabsPresentation(value.responsive)) {
    return false;
  }

  if (!isOptionalString(value.customPresentationId)) return false;
  if (value.presentation === 'responsive' && value.responsive === undefined) return false;

  return (
    value.presentation !== 'custom' ||
    (typeof value.customPresentationId === 'string' && value.customPresentationId.length > 0)
  );
}

/*** Validate semantic compact/medium/expanded custom-tab presentation mapping. */
function isResponsiveTabsPresentation(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.compact === 'string' &&
    FIXED_CUSTOM_TABS_PRESENTATION_SET.has(value.compact) &&
    (value.medium === undefined ||
      (typeof value.medium === 'string' && FIXED_CUSTOM_TABS_PRESENTATION_SET.has(value.medium))) &&
    typeof value.expanded === 'string' &&
    FIXED_CUSTOM_TABS_PRESENTATION_SET.has(value.expanded)
  );
}

/*** Validate optional app-level navigator flow intent. */
function isNavigatorFlows(value: unknown): boolean {
  return (
    isRecord(value) &&
    isOptionalBoolean(value.onboarding) &&
    isOptionalBoolean(value.authentication)
  );
}

/*** Validate package-owned navigator defaults without requiring a navigator node type. */
function isNavigatorDefaults(value: unknown): boolean {
  return (
    isRecord(value) &&
    (value.tabs === undefined || (isRecord(value.tabs) && isTabsImplementationConfig(value.tabs)))
  );
}

/*** Validate per-platform navigator implementation overrides. */
function isNavigatorPlatforms(value: unknown): boolean {
  return (
    isRecord(value) &&
    (value.android === undefined || isNavigatorPlatformConfig(value.android)) &&
    (value.ios === undefined || isNavigatorPlatformConfig(value.ios)) &&
    (value.web === undefined || isNavigatorPlatformConfig(value.web))
  );
}

/*** Validate one platform-specific navigator override slice. */
function isNavigatorPlatformConfig(value: unknown): boolean {
  return (
    isRecord(value) &&
    (value.tabs === undefined || (isRecord(value.tabs) && isTabsImplementationConfig(value.tabs)))
  );
}

function isSplashScreenModeSpec(value: unknown): boolean {
  return (
    isRecord(value) &&
    isOptionalString(value.image) &&
    isOptionalNumber(value.imageWidth) &&
    (value.resizeMode === undefined ||
      (typeof value.resizeMode === 'string' &&
        SPLASH_SCREEN_RESIZE_MODE_SET.has(value.resizeMode))) &&
    isOptionalString(value.backgroundColor)
  );
}

function isScreenRequirements(value: unknown): boolean {
  return (
    isRecord(value) &&
    (value.permissions === undefined || isRequirementArray(value.permissions, 'permission')) &&
    (value.capabilities === undefined || isRequirementArray(value.capabilities, 'capability'))
  );
}

function isRequirementArray(value: unknown, key: 'capability' | 'permission'): boolean {
  return (
    Array.isArray(value) &&
    value.every((entry) => isRecord(entry) && typeof entry[key] === 'string')
  );
}
