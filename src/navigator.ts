import type { IconSpec } from './types';

export const NAVIGATOR_TYPES = ['stack', 'tabs', 'drawer'] as const;
export type NavigatorType = (typeof NAVIGATOR_TYPES)[number];

export const NAVIGATOR_PRESETS = [
  'stack',
  'tabs',
  'tabs-stack',
  'drawer',
  'drawer-stack',
  'drawer-tabs',
  'drawer-tabs-stack',
  'root-stack-tabs',
  'root-stack-tabs-stack',
  'root-stack-drawer',
  'root-stack-drawer-stack',
  'root-stack-drawer-tabs',
  'root-stack-drawer-tabs-stack',
] as const;
export type NavigatorPreset = (typeof NAVIGATOR_PRESETS)[number];

export const FIXED_CUSTOM_TABS_PRESENTATIONS = ['bottom', 'top', 'rail', 'sidebar'] as const;
export type FixedCustomTabsPresentation = (typeof FIXED_CUSTOM_TABS_PRESENTATIONS)[number];

export const CUSTOM_TABS_PRESENTATIONS = [
  ...FIXED_CUSTOM_TABS_PRESENTATIONS,
  'responsive',
  'custom',
] as const;
export type CustomTabsPresentation = (typeof CUSTOM_TABS_PRESENTATIONS)[number];

export const JAVASCRIPT_TABS_PRESENTATIONS = ['bottom', 'top'] as const;
export type JavaScriptTabsPresentation = (typeof JAVASCRIPT_TABS_PRESENTATIONS)[number];

export interface ResponsiveTabsPresentation {
  compact: FixedCustomTabsPresentation;
  medium?: FixedCustomTabsPresentation;
  expanded: FixedCustomTabsPresentation;
}

export interface CustomTabsConfig {
  implementation: 'custom';
  presentation: CustomTabsPresentation;
  responsive?: ResponsiveTabsPresentation;
  /** Serializable registered presentation id used when `presentation` is `custom`. */
  customPresentationId?: string;
}

export interface NativeTabsConfig {
  implementation: 'native';
}

export interface JavaScriptTabsConfig {
  implementation: 'javascript';
  presentation?: JavaScriptTabsPresentation;
}

export interface AdaptiveTabsConfig {
  /** Omission selects the canonical adaptive default. */
  implementation?: 'adaptive';
  /** Android/iOS branch. Expo Router may expose this implementation as unstable. */
  native?: NativeTabsConfig;
  /** Web branch rendered through headless custom tabs. */
  web?: Omit<CustomTabsConfig, 'implementation'>;
}

export type TabsImplementationConfig = AdaptiveTabsConfig | CustomTabsConfig | JavaScriptTabsConfig | NativeTabsConfig;

interface NavigatorNodeBase {
  initialRouteName?: string;
  routes: RouteDefinition[];
  /** Typed upstream options can be layered by the owning Navigator package. */
  options?: Record<string, unknown>;
}

export interface StackNavigatorNode extends NavigatorNodeBase {
  type: 'stack';
}

export interface DrawerNavigatorNode extends NavigatorNodeBase {
  type: 'drawer';
}

export type TabsNavigatorConfig = {
  type: 'tabs';
} & TabsImplementationConfig;

export type TabsNavigatorNode = NavigatorNodeBase & TabsNavigatorConfig;

export type NavigatorNode = DrawerNavigatorNode | StackNavigatorNode | TabsNavigatorNode;

export interface RouteDefinition {
  name: string;
  path?: string;
  label?: string;
  icon?: IconSpec;
  /** Hide this route from primary Tabs/Drawer presentation without making it unnavigable. */
  showInPrimaryNavigation?: boolean;
  guards?: string[];
  screenId?: string;
  navigator?: NavigatorNode;
}

export interface NavigatorFlows {
  onboarding?: boolean;
  authentication?: boolean;
}

export interface NavigatorDefaults {
  tabs?: TabsImplementationConfig;
}

export interface NavigatorPlatformConfig {
  tabs?: TabsImplementationConfig;
}

export interface NavigatorPlatforms {
  android?: NavigatorPlatformConfig;
  ios?: NavigatorPlatformConfig;
  web?: NavigatorPlatformConfig;
}

/**
 * Serializable desired state for `AppManifest.navigator`.
 *
 * The manifest slice is the root navigator tree itself; optional authoring metadata does not add
 * a redundant `root` wrapper. The standalone Navigator capability consumes this slice directly.
 */
export type AppNavigatorManifest = NavigatorNode & {
  preset?: NavigatorPreset;
  flows?: NavigatorFlows;
  defaults?: NavigatorDefaults;
  platforms?: NavigatorPlatforms;
};
