import type { Props as ExpoSplashScreenPluginProps } from 'expo-splash-screen/plugin';

import type { MediaAssetReference } from '../media';

type ExpoSplashScreenRootProps = Pick<
  ExpoSplashScreenPluginProps,
  'backgroundColor' | 'image' | 'imageWidth' | 'resizeMode'
>;

type PortableSplashScreenProps<T extends { readonly image?: string }> = Readonly<
  Omit<T, 'image'>
> & {
  readonly image?: MediaAssetReference;
};

export type SplashScreenResizeMode = NonNullable<ExpoSplashScreenPluginProps['resizeMode']>;

export type SplashScreenModeSpec = PortableSplashScreenProps<
  NonNullable<ExpoSplashScreenPluginProps['dark']>
>;

export type SplashScreenSpec = PortableSplashScreenProps<ExpoSplashScreenRootProps> & {
  readonly dark?: SplashScreenModeSpec;
};
