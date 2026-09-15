import type {
  AndroidDeploymentBuilder,
  AndroidDeploymentPublisher,
  DeploymentMonetizationAdapter,
  DeploymentProviderRegistration,
  DeploymentProviderSetupAdapter,
  DeploymentReleaseAdapter,
  DeploymentStoreListingAdapter,
  IosDeploymentBuilder,
  IosDeploymentPublisher,
  WebDeploymentPublisher,
} from '@ankhorage/contracts/deploy-provider';

export type DeployProviderNodeNextContract = readonly [
  DeploymentProviderRegistration,
  DeploymentProviderSetupAdapter,
  WebDeploymentPublisher,
  AndroidDeploymentBuilder,
  AndroidDeploymentPublisher,
  IosDeploymentBuilder,
  IosDeploymentPublisher,
  DeploymentStoreListingAdapter,
  DeploymentMonetizationAdapter,
  DeploymentReleaseAdapter,
];
