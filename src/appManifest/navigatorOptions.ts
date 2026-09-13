import { hasOnlyKeys, isRecord } from '@ankhorage/utility/object';
import { isOneOf } from '@ankhorage/utility/value';

import {
  DRAWER_POSITIONS,
  DRAWER_TYPES,
  FIXED_HEADLESS_TABS_PRESENTATIONS,
  HEADLESS_TABS_PRESENTATIONS,
  JAVASCRIPT_STACK_PRESENTATIONS,
  JAVASCRIPT_TABS_PRESENTATIONS,
  NATIVE_TABS_MINIMIZE_BEHAVIORS,
  STACK_PRESENTATIONS,
} from '../navigator';

/*** Validate stable native, JavaScript, or alpha Experimental Stack desired state. */
export function isStackImplementationConfig(value: Record<string, unknown>): boolean {
  if (
    !hasNoDefinedKeys(value, [
      'native',
      'web',
      'presentation',
      'responsive',
      'customPresentationId',
      'minimizeBehavior',
      'bottomAccessory',
    ])
  ) {
    return false;
  }
  if (value.implementation === undefined || value.implementation === 'native') {
    return value.options === undefined || isStackScreenOptions(value.options);
  }
  if (value.implementation === 'javascript') {
    return value.options === undefined || isJavaScriptStackScreenOptions(value.options);
  }
  return (
    value.implementation === 'experimental' &&
    (value.options === undefined || isStackHeaderOptions(value.options))
  );
}

/*** Validate the serializable native-stack screen option subset. */
export function isStackScreenOptions(value: unknown): boolean {
  if (
    !isRecord(value) ||
    !hasOnlyKeys(value, [
      'title',
      'headerShown',
      'headerTransparent',
      'headerBackVisible',
      'presentation',
      'sheetAllowedDetents',
      'sheetGrabberVisible',
    ]) ||
    !isStackHeaderOptionsShape(value) ||
    (value.presentation !== undefined &&
      (typeof value.presentation !== 'string' || !isOneOf(value.presentation, STACK_PRESENTATIONS)))
  ) {
    return false;
  }

  if (value.presentation !== 'formSheet') {
    return value.sheetAllowedDetents === undefined && value.sheetGrabberVisible === undefined;
  }
  return (
    (value.sheetAllowedDetents === undefined || isSheetAllowedDetents(value.sheetAllowedDetents)) &&
    (value.sheetGrabberVisible === undefined || typeof value.sheetGrabberVisible === 'boolean')
  );
}

/*** Validate the finite serializable Drawer option subset. */
export function isDrawerNavigatorOptions(value: unknown): boolean {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, ['drawerPosition', 'drawerType', 'swipeEnabled', 'headerShown']) &&
    (value.drawerPosition === undefined ||
      (typeof value.drawerPosition === 'string' &&
        isOneOf(value.drawerPosition, DRAWER_POSITIONS))) &&
    (value.drawerType === undefined ||
      (typeof value.drawerType === 'string' && isOneOf(value.drawerType, DRAWER_TYPES))) &&
    (value.swipeEnabled === undefined || typeof value.swipeEnabled === 'boolean') &&
    (value.headerShown === undefined || typeof value.headerShown === 'boolean')
  );
}

/*** Validate tabs implementation desired state, with omitted implementation meaning adaptive. */
export function isTabsImplementationConfig(value: Record<string, unknown>): boolean {
  if (value.implementation === undefined || value.implementation === 'adaptive') {
    return isAdaptiveTabsConfig(value);
  }
  if (value.implementation === 'native') return isFullNativeTabsConfig(value);
  if (value.implementation === 'javascript') return isJavaScriptTabsConfig(value);
  return (
    value.implementation === 'headless' &&
    hasNoDefinedKeys(value, ['options', 'native', 'web', 'minimizeBehavior', 'bottomAccessory']) &&
    isHeadlessTabsPresentationConfig(value)
  );
}

/*** Validate a reference into the app-owned screen registry. */
export function isNavigatorScreenReference(value: unknown): boolean {
  return isRecord(value) && hasOnlyKeys(value, ['screenId']) && typeof value.screenId === 'string';
}

/*** Validate JavaScript Stack options without accepting native-only presentations. */
function isJavaScriptStackScreenOptions(value: unknown): boolean {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, [
      'title',
      'headerShown',
      'headerTransparent',
      'headerBackVisible',
      'presentation',
    ]) &&
    isStackHeaderOptionsShape(value) &&
    (value.presentation === undefined ||
      (typeof value.presentation === 'string' &&
        isOneOf(value.presentation, JAVASCRIPT_STACK_PRESENTATIONS)))
  );
}

/*** Validate the portable header subset supported by Experimental Stack. */
function isStackHeaderOptions(value: unknown): boolean {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, ['title', 'headerShown', 'headerTransparent', 'headerBackVisible']) &&
    isStackHeaderOptionsShape(value)
  );
}

/*** Validate shared stack header field values after branch-specific key filtering. */
function isStackHeaderOptionsShape(value: Record<string, unknown>): boolean {
  return (
    (value.title === undefined || typeof value.title === 'string') &&
    (value.headerShown === undefined || typeof value.headerShown === 'boolean') &&
    (value.headerTransparent === undefined || typeof value.headerTransparent === 'boolean') &&
    (value.headerBackVisible === undefined || typeof value.headerBackVisible === 'boolean')
  );
}

/*** Validate sorted, finite native sheet detents or the fit-to-content sentinel. */
function isSheetAllowedDetents(value: unknown): boolean {
  if (value === 'fitToContents') return true;
  if (!Array.isArray(value) || value.length === 0) return false;
  return value.every(
    (detent, index) =>
      typeof detent === 'number' &&
      Number.isFinite(detent) &&
      detent > 0 &&
      detent <= 1 &&
      (index === 0 || detent > value[index - 1]),
  );
}

/*** Validate an adaptive tabs branch and reject implementation-specific conflicts. */
function isAdaptiveTabsConfig(value: Record<string, unknown>): boolean {
  return (
    hasNoDefinedKeys(value, [
      'options',
      'presentation',
      'responsive',
      'customPresentationId',
      'minimizeBehavior',
      'bottomAccessory',
    ]) &&
    (value.native === undefined || isNativeTabsConfig(value.native)) &&
    (value.web === undefined || isHeadlessTabsWebConfig(value.web))
  );
}

/*** Validate the top-level native tabs implementation. */
function isFullNativeTabsConfig(value: Record<string, unknown>): boolean {
  return (
    hasNoDefinedKeys(value, [
      'options',
      'native',
      'web',
      'presentation',
      'responsive',
      'customPresentationId',
    ]) && isNativeTabsFields(value)
  );
}

/*** Validate the top-level JavaScript tabs implementation. */
function isJavaScriptTabsConfig(value: Record<string, unknown>): boolean {
  return (
    hasNoDefinedKeys(value, [
      'options',
      'native',
      'web',
      'responsive',
      'customPresentationId',
      'minimizeBehavior',
      'bottomAccessory',
    ]) &&
    (value.presentation === undefined ||
      (typeof value.presentation === 'string' &&
        isOneOf(value.presentation, JAVASCRIPT_TABS_PRESENTATIONS)))
  );
}

/*** Validate the native branch used by adaptive tabs. */
function isNativeTabsConfig(value: unknown): boolean {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, ['implementation', 'minimizeBehavior', 'bottomAccessory']) &&
    value.implementation === 'native' &&
    isNativeTabsFields(value)
  );
}

/*** Validate fields supported by the native tabs branch. */
function isNativeTabsFields(value: Record<string, unknown>): boolean {
  return (
    (value.minimizeBehavior === undefined ||
      (typeof value.minimizeBehavior === 'string' &&
        isOneOf(value.minimizeBehavior, NATIVE_TABS_MINIMIZE_BEHAVIORS))) &&
    (value.bottomAccessory === undefined || isNavigatorScreenReference(value.bottomAccessory))
  );
}

/*** Validate the implementation-free headless-tabs Web branch inside adaptive tabs. */
function isHeadlessTabsWebConfig(value: unknown): boolean {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, ['presentation', 'responsive', 'customPresentationId']) &&
    isHeadlessTabsPresentationConfig(value)
  );
}

/*** Validate headless-tab presentation and its conditional serializable configuration. */
function isHeadlessTabsPresentationConfig(value: Record<string, unknown>): boolean {
  if (
    typeof value.presentation !== 'string' ||
    !isOneOf(value.presentation, HEADLESS_TABS_PRESENTATIONS)
  ) {
    return false;
  }
  if (value.responsive !== undefined && !isResponsiveTabsPresentation(value.responsive)) {
    return false;
  }
  if (!(
    value.customPresentationId === undefined || typeof value.customPresentationId === 'string'
  )) {
    return false;
  }
  if (isOneOf(value.presentation, FIXED_HEADLESS_TABS_PRESENTATIONS)) {
    return value.responsive === undefined && value.customPresentationId === undefined;
  }
  if (value.presentation === 'responsive') {
    return value.responsive !== undefined && value.customPresentationId === undefined;
  }
  return (
    value.responsive === undefined &&
    typeof value.customPresentationId === 'string' &&
    value.customPresentationId.length > 0
  );
}

/*** Validate semantic compact/medium/expanded headless-tab presentation mapping. */
function isResponsiveTabsPresentation(value: unknown): boolean {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, ['compact', 'medium', 'expanded']) &&
    typeof value.compact === 'string' &&
    isOneOf(value.compact, FIXED_HEADLESS_TABS_PRESENTATIONS) &&
    (value.medium === undefined ||
      (typeof value.medium === 'string' &&
        isOneOf(value.medium, FIXED_HEADLESS_TABS_PRESENTATIONS))) &&
    typeof value.expanded === 'string' &&
    isOneOf(value.expanded, FIXED_HEADLESS_TABS_PRESENTATIONS)
  );
}

/*** Check that mutually exclusive branch fields are absent. */
function hasNoDefinedKeys(value: Record<string, unknown>, keys: readonly string[]): boolean {
  const prohibited = new Set(keys);
  return !Object.entries(value).some(([key, entry]) => prohibited.has(key) && entry !== undefined);
}
