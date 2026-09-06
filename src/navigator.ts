import type { IconSpec, ManifestValue } from './types';

export const NAVIGATOR_TYPES = ['slot', 'stack', 'tabs', 'drawer', 'split-view', 'custom'] as const;
export type NavigatorType = (typeof NAVIGATOR_TYPES)[number];

export const NAVIGATOR_PRESETS = [
  'slot',
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
  'split-view',
  'custom',
] as const;
export type NavigatorPreset = (typeof NAVIGATOR_PRESETS)[number];

export const STACK_IMPLEMENTATIONS = ['native', 'javascript', 'experimental'] as const;
export type StackImplementation = (typeof STACK_IMPLEMENTATIONS)[number];

export const STACK_PRESENTATIONS = [
  'card',
  'modal',
  'transparentModal',
  'containedModal',
  'containedTransparentModal',
  'fullScreenModal',
  'formSheet',
] as const;
export type StackPresentation = (typeof STACK_PRESENTATIONS)[number];

export const JAVASCRIPT_STACK_PRESENTATIONS = ['card', 'modal', 'transparentModal'] as const;
export type JavaScriptStackPresentation = (typeof JAVASCRIPT_STACK_PRESENTATIONS)[number];

export interface StackHeaderOptions {
  title?: string;
  headerShown?: boolean;
  headerTransparent?: boolean;
  headerBackVisible?: boolean;
}

export type StackScreenOptions = StackHeaderOptions &
  (
    | {
        presentation?: Exclude<StackPresentation, 'formSheet'>;
        sheetAllowedDetents?: never;
        sheetGrabberVisible?: never;
      }
    | {
        presentation: 'formSheet';
        sheetAllowedDetents?: 'fitToContents' | number[];
        sheetGrabberVisible?: boolean;
      }
  );

export type JavaScriptStackScreenOptions = StackHeaderOptions & {
  presentation?: JavaScriptStackPresentation;
};

export type StackImplementationConfig =
  | {
      /** Omission selects the stable native stack implementation. */
      implementation?: 'native';
      options?: StackScreenOptions;
    }
  | {
      implementation: 'javascript';
      options?: JavaScriptStackScreenOptions;
    }
  | {
      /** Expo Router Experimental Stack is alpha, native-only, and available from SDK 56. */
      implementation: 'experimental';
      options?: StackHeaderOptions;
    };

export const DRAWER_POSITIONS = ['left', 'right'] as const;
export type DrawerPosition = (typeof DRAWER_POSITIONS)[number];

export const DRAWER_TYPES = ['front', 'back', 'slide', 'permanent'] as const;
export type DrawerType = (typeof DRAWER_TYPES)[number];

export interface DrawerNavigatorOptions {
  drawerPosition?: DrawerPosition;
  drawerType?: DrawerType;
  swipeEnabled?: boolean;
  headerShown?: boolean;
}

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

export const NATIVE_TABS_MINIMIZE_BEHAVIORS = [
  'automatic',
  'never',
  'onScrollDown',
  'onScrollUp',
] as const;
export type NativeTabsMinimizeBehavior = (typeof NATIVE_TABS_MINIMIZE_BEHAVIORS)[number];

export interface ResponsiveTabsPresentation {
  compact: FixedCustomTabsPresentation;
  medium?: FixedCustomTabsPresentation;
  expanded: FixedCustomTabsPresentation;
}

export type CustomTabsPresentationConfig =
  | {
      presentation: FixedCustomTabsPresentation;
      responsive?: never;
      customPresentationId?: never;
    }
  | {
      presentation: 'responsive';
      responsive: ResponsiveTabsPresentation;
      customPresentationId?: never;
    }
  | {
      presentation: 'custom';
      responsive?: never;
      /** Serializable registered presentation id. */
      customPresentationId: string;
    };

export type CustomTabsConfig = {
  implementation: 'custom';
} & CustomTabsPresentationConfig;

export type CustomTabsWebConfig = CustomTabsPresentationConfig;

export interface NavigatorScreenReference {
  screenId: string;
}

export interface NativeTabsConfig {
  implementation: 'native';
  /** Expo Router Native Tabs is alpha; minimizing is available on iOS 26+ from SDK 55. */
  minimizeBehavior?: NativeTabsMinimizeBehavior;
  /** Registered screen rendered through NativeTabs.BottomAccessory, available from SDK 55. */
  bottomAccessory?: NavigatorScreenReference;
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
  web?: CustomTabsWebConfig;
}

export type TabsImplementationConfig =
  AdaptiveTabsConfig | CustomTabsConfig | JavaScriptTabsConfig | NativeTabsConfig;

interface NavigatorNodeBase {
  initialRouteName?: string;
  routes: RouteDefinition[];
}

export interface SlotNavigatorNode extends NavigatorNodeBase {
  type: 'slot';
}

export type StackNavigatorNode = NavigatorNodeBase & {
  type: 'stack';
} & StackImplementationConfig;

export interface DrawerNavigatorNode extends NavigatorNodeBase {
  type: 'drawer';
  options?: DrawerNavigatorOptions;
}

export type TabsNavigatorConfig = {
  type: 'tabs';
} & TabsImplementationConfig;

export type TabsNavigatorNode = NavigatorNodeBase & TabsNavigatorConfig;

export interface SplitViewNavigatorNode extends NavigatorNodeBase {
  type: 'split-view';
  columns: {
    primary: NavigatorScreenReference;
    supplementary?: NavigatorScreenReference;
  };
  inspector?: NavigatorScreenReference;
  /** Split View is alpha and iOS-only; other platforms fall back to Slot. */
  topColumnForCollapsing?: 'primary' | 'supplementary' | 'secondary';
}

export interface CustomNavigatorNode extends NavigatorNodeBase {
  type: 'custom';
  navigatorId: string;
  config?: Readonly<Record<string, ManifestValue>>;
}

export type NavigatorNode =
  | CustomNavigatorNode
  | DrawerNavigatorNode
  | SlotNavigatorNode
  | SplitViewNavigatorNode
  | StackNavigatorNode
  | TabsNavigatorNode;

export interface RouteDefinition {
  name: string;
  path?: string;
  label?: string;
  icon?: IconSpec;
  /** Hide this route from primary Tabs/Drawer presentation without making it unnavigable. */
  showInPrimaryNavigation?: boolean;
  guards?: string[];
  screenId?: string;
  /** Presentation applied by the resolved parent stack implementation. */
  stackOptions?: StackScreenOptions;
  navigator?: NavigatorNode;
}

export interface NavigatorFlows {
  onboarding?: boolean;
  authentication?: boolean;
}

export interface NavigatorDefaults {
  tabs?: TabsImplementationConfig;
  stack?: StackImplementationConfig;
}

export interface NavigatorPlatformConfig {
  tabs?: TabsImplementationConfig;
  stack?: StackImplementationConfig;
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
