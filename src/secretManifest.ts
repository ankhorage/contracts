import type { SecretStoreProvider } from './secrets';

export interface InfraSecretStoreSpec {
  provider: SecretStoreProvider;
}

declare module './types' {
  interface InfraManifest {
    /** Non-secret provider selection. Bootstrap credentials stay in trusted environment config. */
    secretStore?: InfraSecretStoreSpec;
  }
}
