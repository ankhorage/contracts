# contracts

Shared public contracts for Ankhorage packages and standalone provider packages.

## 🎯 What you get

- Strongly typed app structures
- Serializable schemas for app manifests and UI definitions
- Provider-neutral runtime contracts for auth and database adapters
- Clear contracts between systems without depending on framework internals

## ✨ Features

- Serializable app, action, theme, infra, and auth config contracts
- UI and navigation definitions
- Auth adapter contracts using `signIn`, `signUp`, and `signOut` naming
- Database adapter contracts for provider-neutral CRUD-style access
- Dedicated subpath exports for focused imports

## 📦 Usage

```ts
import type { AppManifest } from '@ankhorage/contracts';
import type { AuthAdapter } from '@ankhorage/contracts/auth';
import type { AppMood, ColorHarmony, ColorTone } from '@ankhorage/contracts/color-theory';
import type { DbAdapter } from '@ankhorage/contracts/db';
```

`ColorTone` describes the visual palette tone, such as `pastel`, `earth`, `jewel`, or
`fluorescent`.

`AppMood` describes psychological/product intent, such as `calm`, `trustworthy`, or
`playful`.

`ColorHarmony` describes hue relationships.

Provider packages can implement the shared contracts without importing runtime,
CLI, ZORA, Expo Router, or app-generation logic.

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

## 🧠 Why this exists

Contracts separates shared data and runtime contracts from implementation details.
Standalone packages such as Supabase, Clerk, or database providers can depend on
these contracts while staying independent from Ankhorage app generation,
runtime, CLI, and UI packages.
