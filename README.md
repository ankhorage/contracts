# contracts

Shared public contracts for Ankhorage packages and standalone provider packages.

## What you get

- Strongly typed app structures
- Serializable schemas for app manifests and UI definitions
- Provider-neutral runtime contracts for auth and database adapters
- Clear contracts between systems without depending on framework internals

## Features

- Serializable app, action, theme, infra, and auth config contracts
- UI and navigation definitions
- Auth adapter contracts using signIn, signUp, and signOut naming
- Database adapter contracts for provider-neutral CRUD-style access
- Dedicated subpath exports for focused imports

## Usage

```ts
import type { AppManifest } from '@ankhorage/contracts';
import type { AuthAdapter } from '@ankhorage/contracts/auth';
import type { AnkhCommandProviderManifest, AnkhPackageMetadata } from '@ankhorage/contracts/cli';
import type { DbAdapter } from '@ankhorage/contracts/db';
import type { StorageAdapter } from '@ankhorage/contracts/storage';
```

Contracts keeps theme configuration serializable. Color validation, harmony,
swatch generation, contrast helpers, and semantic color references live in
`@ankhorage/color-theory`.

```ts
import type { ThemeConfig } from '@ankhorage/contracts';

const theme: ThemeConfig = {
  id: 'theme-default',
  name: 'Default',
  light: { primaryColor: '#3366ff', harmony: 'analogous' },
  dark: { primaryColor: '#3366ff', harmony: 'analogous' },
};
```

Provider packages can implement the shared contracts without importing runtime,
CLI, ZORA, Expo Router, color generation, or app-generation logic.

```ts
import type { AuthAdapter } from '@ankhorage/contracts/auth';

export function createSupabaseAuthAdapter(): AuthAdapter {
  return {
    async signIn(input) {
      return {
        ok: true,
        data: {
          accessToken: `token:${input.identifier.value}`,
          user: { id: 'user-1', email: input.identifier.value },
        },
      };
    },
    async signUp(input) {
      return { ok: true, data: { id: 'user-1', email: input.identifier.value } };
    },
    async signOut() {
      return { ok: true };
    },
    async getSession() {
      return { ok: true, data: null };
    },
  };
}
```

## CLI discovery contracts

`@ankhorage/contracts/cli` contains metadata-only discovery contracts for Ankh
packages and command providers.

```ts
import type { AnkhCommandProviderManifest, AnkhPackageMetadata } from '@ankhorage/contracts/cli';
```

Provider packages expose `package.json.ankh` metadata using a package-relative
provider module path:

```json
{
  "ankh": {
    "category": "infra",
    "provider": "./dist/ankh.provider.js",
    "capabilities": ["infra.up", "infra.status"]
  }
}
```

Metadata-only packages use `null` for `provider`:

```json
{
  "ankh": {
    "category": "contracts",
    "provider": null,
    "capabilities": ["contracts.cli"]
  }
}
```

`@ankhorage/contracts` now publishes this metadata shape directly from its own
`package.json`:

```json
{
  "ankh": {
    "category": "contracts",
    "provider": null,
    "capabilities": ["contracts.cli"]
  }
}
```

Command descriptor paths are relative to the provider category:

- `category: "infra"` with `path: ["up"]` maps to `ankh infra up`
- `category: "dev"` with `path: ["android", "scan"]` maps to `ankh dev android scan`

This subpath contains contracts only. It must not depend on `commander`,
`@ankhorage/ankh`, provider implementations, or runtime CLI execution logic.

Capability names are dot-separated package metadata identifiers.

Preferred forms:

- `<category>.<action>` for simple capabilities
- `<category>.<resource>.<action>` for nested or domain-specific capabilities

Valid examples:

- `infra.up`
- `templates.create`
- `contracts.cli`
- `board.web.import`
- `doctor.repo.validate`
- `dev.android.rebuild`
- `expoRuntime.plan`

Invalid examples:

- `infra`
- `infra-up`
- `.status`
- `infra.`
- `infra..up`

`AnkhCapabilityId` remains intentionally broad at the TypeScript level so
packages can publish stable serializable metadata without embedding policy
validation logic here. Stricter validation belongs later in
`@ankhorage/doctor`.

## Profile contract

Auth providers own identity records. App-facing profile data should be modeled separately, usually in an app table such as `profiles`.

```ts
const auth = {
  scope: 'global',
  provider: 'supabase',
  authorization: { kind: 'RBAC', engine: 'native' },
  profile: {
    fields: ['email', 'displayName', 'avatarUrl'],
    table: 'profiles',
    primaryKey: 'authUserId',
    createStrategy: 'trigger',
    updateStrategy: 'api',
  },
};
```

Generated infra can use this metadata to create and maintain app profile rows while leaving identity lifecycle changes to the auth provider.

## Why this exists

Contracts separates shared data and runtime contracts from implementation details.
Standalone packages such as Supabase, Clerk, database providers, or UI/color
packages can depend on these contracts while staying independent from Ankhorage
app generation, runtime, CLI, and UI packages.
