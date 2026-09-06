import { COLOR_HARMONIES } from '@ankhorage/color-theory';

import { APP_CATEGORIES } from '../types';
import { isBindingValueSource, isScreenDataLoaderDefinition } from './bindings';
import { isOptionalNumber, isOptionalString, isRecord } from './shared';

export { isAppNavigatorManifest } from './navigator';

const APP_CATEGORY_SET = new Set<string>(APP_CATEGORIES);
const COLOR_HARMONY_SET = new Set<string>(COLOR_HARMONIES);
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
