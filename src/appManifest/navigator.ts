import { NAVIGATOR_PRESETS, NAVIGATOR_TYPES } from '../navigator';
import { isIconSpec } from './icon';
import {
  hasOnlyKeys,
  isDrawerNavigatorOptions,
  isNavigatorScreenReference,
  isStackImplementationConfig,
  isStackScreenOptions,
  isTabsImplementationConfig,
} from './navigatorOptions';
import { isOptionalBoolean, isOptionalString, isRecord, isStringArray } from './shared';

const NAVIGATOR_PRESET_SET = new Set<string>(NAVIGATOR_PRESETS);
const NAVIGATOR_TYPE_SET = new Set<string>(NAVIGATOR_TYPES);

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

/*** Validate one nested navigator node independently from app-level authoring metadata. */
function isNavigatorNode(value: unknown): boolean {
  if (
    !isRecord(value) ||
    typeof value.type !== 'string' ||
    !NAVIGATOR_TYPE_SET.has(value.type) ||
    !isOptionalString(value.initialRouteName) ||
    !Array.isArray(value.routes) ||
    !value.routes.every(isRouteDefinition)
  ) {
    return false;
  }

  switch (value.type) {
    case 'slot':
      return value.options === undefined && value.implementation === undefined;
    case 'stack':
      return isStackImplementationConfig(value);
    case 'tabs':
      return isTabsImplementationConfig(value);
    case 'drawer':
      return (
        value.implementation === undefined &&
        (value.options === undefined || isDrawerNavigatorOptions(value.options))
      );
    case 'split-view':
      return isSplitViewNavigatorNode(value);
    case 'custom':
      return isCustomNavigatorNode(value);
    default:
      return false;
  }
}

/*** Validate one route and preserve its portable metadata and nested navigator. */
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
    (value.stackOptions === undefined || isStackScreenOptions(value.stackOptions)) &&
    (value.navigator === undefined || isNavigatorNode(value.navigator))
  );
}

/*** Validate Split View screen references without duplicating the routed secondary tree. */
function isSplitViewNavigatorNode(value: Record<string, unknown>): boolean {
  return (
    value.implementation === undefined &&
    value.options === undefined &&
    isRecord(value.columns) &&
    hasOnlyKeys(value.columns, ['primary', 'supplementary']) &&
    isNavigatorScreenReference(value.columns.primary) &&
    (value.columns.supplementary === undefined ||
      isNavigatorScreenReference(value.columns.supplementary)) &&
    (value.inspector === undefined || isNavigatorScreenReference(value.inspector)) &&
    (value.topColumnForCollapsing === undefined ||
      value.topColumnForCollapsing === 'primary' ||
      value.topColumnForCollapsing === 'supplementary' ||
      value.topColumnForCollapsing === 'secondary')
  );
}

/*** Validate a registered custom navigator with JSON-safe configuration only. */
function isCustomNavigatorNode(value: Record<string, unknown>): boolean {
  return (
    value.implementation === undefined &&
    value.options === undefined &&
    typeof value.navigatorId === 'string' &&
    (value.config === undefined || isNavigatorJsonRecord(value.config))
  );
}

/*** Validate an acyclic, finite JSON object used by a custom navigator adapter. */
function isNavigatorJsonRecord(value: unknown): boolean {
  return isRecord(value) && isNavigatorJsonValue(value, new Set<object>());
}

/*** Recursively validate the portable manifest value domain and reject cycles. */
function isNavigatorJsonValue(value: unknown, ancestors: Set<object>): boolean {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return true;
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value !== 'object' || ancestors.has(value)) return false;

  if (Array.isArray(value)) {
    if (
      Object.keys(value).length !== value.length ||
      Object.getOwnPropertySymbols(value).length > 0
    ) {
      return false;
    }
  } else {
    const prototype = Object.getPrototypeOf(value) as object | null;
    if (prototype !== Object.prototype && prototype !== null) return false;
    if (Reflect.ownKeys(value).some((key) => typeof key !== 'string')) return false;
  }

  ancestors.add(value);
  const isValid = Object.values(value).every((entry) => isNavigatorJsonValue(entry, ancestors));
  ancestors.delete(value);
  return isValid;
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
    hasOnlyKeys(value, ['tabs', 'stack']) &&
    (value.tabs === undefined ||
      (isRecord(value.tabs) && isTabsImplementationConfig(value.tabs))) &&
    (value.stack === undefined ||
      (isRecord(value.stack) && isStackImplementationConfig(value.stack)))
  );
}

/*** Validate per-platform navigator implementation overrides. */
function isNavigatorPlatforms(value: unknown): boolean {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, ['android', 'ios', 'web']) &&
    (value.android === undefined || isNavigatorPlatformConfig(value.android)) &&
    (value.ios === undefined || isNavigatorPlatformConfig(value.ios)) &&
    (value.web === undefined || isNavigatorPlatformConfig(value.web))
  );
}

/*** Validate one platform-specific navigator override slice. */
function isNavigatorPlatformConfig(value: unknown): boolean {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, ['tabs', 'stack']) &&
    (value.tabs === undefined ||
      (isRecord(value.tabs) && isTabsImplementationConfig(value.tabs))) &&
    (value.stack === undefined ||
      (isRecord(value.stack) && isStackImplementationConfig(value.stack)))
  );
}
