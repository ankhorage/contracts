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
  readonly compact: FixedCustomTabsPresentation;
  readonly medium?: FixedCustomTabsPresentation;
  readonly expanded: FixedCustomTabsPresentation;
}

export interface CustomTabsConfig {
  readonly implementation: 'custom';
  readonly presentation: CustomTabsPresentation;
  readonly responsive?: ResponsiveTabsPresentation;
  /** Serializable registered presentation id used when `presentation` is `custom`. */
  readonly customPresentationId?: string;
}

export interface NativeTabsConfig {
  readonly implementation: 'native';
}

export interface JavaScriptTabsConfig {
  readonly implementation: 'javascript';
  readonly presentation?: JavaScriptTabsPresentation;
}

export interface AdaptiveTabsConfig {
  /** Omission selects the canonical adaptive default. */
  readonly implementation?: 'adaptive';
  /** Android/iOS branch. Expo Router may expose this implementation as unstable. */
  readonly native?: NativeTabsConfig;
  /** Web branch rendered through headless custom tabs. */
  readonly web?: Omit<CustomTabsConfig, 'implementation'>;
}

export type TabsImplementationConfig =
  | AdaptiveTabsConfig
  | CustomTabsConfig
  | JavaScriptTabsConfig
  | NativeTabsConfig;

interface NavigatorNodeBase {
  readonly initialRouteName?: string;
  readonly routes: readonly RouteDefinition[];
  /** Typed upstream options can be layered by the owning Navigator package. */
  readonly options?: Record<string, unknown>;
}

export interface StackNavigatorNode extends NavigatorNodeBase {
  readonly type: 'stack';
}

export interface DrawerNavigatorNode extends NavigatorNodeBase {
  readonly type: 'drawer';
}

export type TabsNavigatorConfig = {
  readonly type: 'tabs';
} & TabsImplementationConfig;

export type TabsNavigatorNode = NavigatorNodeBase & TabsNavigatorConfig;

export type NavigatorNode = DrawerNavigatorNode | StackNavigatorNode | TabsNavigatorNode;

export interface RouteDefinition {
  readonly name: string;
  readonly path?: string;
  readonly label?: string;
  readonly icon?: IconSpec;
  /** Hide this route from primary Tabs/Drawer presentation without making it unnavigable. */
  readonly showInPrimaryNavigation?: boolean;
  readonly guards?: readonly string[];
  readonly screenId?: string;
  readonly navigator?: NavigatorNode;
}

export interface NavigatorFlows {
  readonly onboarding?: boolean;
  readonly authentication?: boolean;
}

export interface NavigatorDefaults {
  readonly tabs?: TabsImplementationConfig;
}

export interface NavigatorPlatformConfig {
  readonly tabs?: TabsImplementationConfig;
}

export interface NavigatorPlatforms {
  readonly android?: NavigatorPlatformConfig;
  readonly ios?: NavigatorPlatformConfig;
  readonly web?: NavigatorPlatformConfig;
}

/**
 * Serializable desired state for `AppManifest.navigator`.
 *
 * The manifest slice is the root navigator tree itself; optional authoring metadata does not add
 * a redundant `root` wrapper. The standalone Navigator capability consumes this slice directly.
 */
export type AppNavigatorManifest = NavigatorNode & {
  readonly preset?: NavigatorPreset;
  readonly flows?: NavigatorFlows;
  readonly defaults?: NavigatorDefaults;
  readonly platforms?: NavigatorPlatforms;
};
