# @ankhorage/contracts

## 1.19.3

### Patch Changes

- 01a73ed: Update CLI provider metadata examples.

## 1.19.2

### Patch Changes

- 20bd7b6: Add shared runtime callback contracts for node prop resolvers and callback maps.

## 1.19.1

### Patch Changes

- 37105b0: Add published ankh package metadata and document capability naming conventions.

## 1.19.0

### Minor Changes

- b618979: Add `@ankhorage/contracts/cli` metadata contracts for Ankh package discovery.

## 1.18.3

### Patch Changes

- eae9dfc: Add typed screen data-loader definitions for generic operation loaders and support repeat empty-state nodes on UI repeats.

## 1.18.2

### Patch Changes

- ece9644: Add a generic `UiNode.repeat` manifest primitive for repeated child rendering from binding sources.

## 1.18.1

### Patch Changes

- fde5aeb: Add scanner workflow binding coverage to confirm existing generic contracts support runtime-aligned barcode lookup and conditional navigation flows without new domain-specific types.

## 1.18.0

### Minor Changes

- 7db80ba: Add manifest contracts for inferred screen permissions and capabilities.

## 1.17.0

### Minor Changes

- aab2073: Add profile table metadata to auth profile specs.

## 1.16.0

### Minor Changes

- 5105c41: Add API authoring contracts for generated and external APIs with explicit endpoints, generated CRUD presets, and collection-backed resources.

## 1.15.0

### Minor Changes

- 94d5656: Add frontend-first app dataset contracts and state provider selection to app manifests.

## 1.14.0

### Minor Changes

- d55e849: Add a provider-neutral splash screen branding contract to app manifests.

## 1.13.0

### Minor Changes

- 15e9234: Add provider-neutral OAuth2 auth contracts and manifest auth config support.

## 1.12.0

### Minor Changes

- 440f28e: Replace node-local prop bindings with app-level component data-binding contracts that reference data-source operations.

## 1.11.0

### Minor Changes

- 17b8d75: Add bindable component metadata contracts for declaring data-bindable component props and events.

## 1.10.0

### Minor Changes

- d637fdc: Add provider-neutral UI component metadata contracts for component registries and extension package manifests.

## 1.9.0

### Minor Changes

- d1e08cc: Add provider-neutral data-source, endpoint, operation, schema, credential, adapter, and diagnostic contracts.

## 1.8.0

### Minor Changes

- e70556e: Add provider-neutral data and state binding contracts for manifest node props and database collection queries.

## 1.7.0

### Minor Changes

- eff4efc: Add provider-neutral state adapter contracts for path-based reads, writes, subscriptions, and optional removal support.

## 1.6.0

### Minor Changes

- bde43ab: Add provider-neutral action value sources, typed action bindings, and normalized command DTO contracts for event-driven runtime action resolution.

## 1.5.0

### Minor Changes

- 524a288: Add normalized component event DTO contracts for stable component-emitted event envelopes, including form submit, button press, and collection item press events.

## 1.4.0

### Minor Changes

- 3172bd4: Add manifest node event bindings so `UiNode` can declare provider-neutral event-to-action mappings such as `submit` actions for email and database persistence.

## 1.3.1

### Patch Changes

- f7580f4: Update packages

## 1.3.0

### Minor Changes

- 9dadeaf: Replace the database contract surface with canonical provider-neutral CRUD capabilities and add realtime subscription plus privileged admin/schema contracts.

## 1.2.0

### Minor Changes

- f773215: Add provider-neutral storage and image asset contracts.

  This introduces serializable storage asset references, a `StorageAdapter` contract for upload, remove, and public URL workflows, and manifest-safe `ImageAssetSource` variants for storage-backed and URL-backed images.

  The storage upload boundary uses `Uint8Array` only, avoids DOM-specific `File`/`Blob` types, and keeps storage identity provider-neutral through `storageId`, `bucket`, and `path`.

## 1.1.1

### Patch Changes

- 1a4c2b5: update package

## 1.1.0

### Minor Changes

- e7fad36: `ThemeModeConfig.harmony` now uses `ColorHarmony` from `@ankhorage/color-theory` instead of `string`.
  - `ThemeModeConfig.harmony` is now typed as `ColorHarmony` (one of `"monochromatic"`, `"analogous"`, `"complementary"`, `"triadic"`, `"tetradic"`, `"splitComplementary"`).
  - `ColorHarmony` is re-exported as a type-only export from the root entrypoint.
  - Color generation helpers (`generateHarmonyRoleColors`, `generateThemeModeColors`, etc.) are not exported from Contracts; consumers must import them from `@ankhorage/color-theory` directly.
  - Old tone/mood/recommendation APIs (`ColorTone`, `AppMood`, `APP_MOODS`, etc.) are not present in this package.

## 1.0.0

### Major Changes

- b0632c9: Remove the old tone/mood/theme-recommendation contracts and keep theme config serialized-only:
  - Removed `COLOR_TONES`, `ColorTone`, `APP_MOODS`, `AppMood`, recommendation
    types/constants, and `suggestedColorTone`.
  - Removed `ThemeModeConfig.colorTone`; `ThemeModeConfig` is now
    `{ primaryColor: string; harmony: string }`.
  - Removed the legacy `@ankhorage/contracts/color-theory` export.
  - Removed color generation, swatch, contrast, neutral, and semantic color APIs from
    Contracts; color generation now belongs in `@ankhorage/color-theory`.
  - Removed the Contracts dependency on `culori`.

## 0.3.2

### Patch Changes

- bb775a6: Standardize package metadata and workflow files.

## 0.3.1

### Patch Changes

- d5ca119: Release Trigger

## 0.3.0

### Minor Changes

- 9e27c89: Add app category theme recommendation contracts and a partial category recommendation map for theme tooling.

## 0.2.0

### Minor Changes

- 3536f12: Adds shared color-theory contracts and renames theme mode configuration from `systemTone` / `SystemTone` to `colorTone` / `ColorTone`.

## 0.1.3

### Patch Changes

- 7eb0dbc: Add canonical auth flow config types using sign-in, sign-up, and sign-out terminology.

## 0.1.2

### Patch Changes

- fc2928d: update publish config to 'public' access

## 0.1.1

### Patch Changes

- 7075528: add repository metadata

## 0.1.0

### Minor Changes

- 07b8da7: Add shared auth and database adapter contracts.

### Patch Changes

- 5c800d8: add missing script

## 0.0.4

### Patch Changes

- Refresh the README copy so the published package overview and usage example stay aligned with the current messaging.

## 0.0.3

### Patch Changes

- 908b4de: Export `APP_CATEGORIES` and `AppCategory` so template packages can consume the shared category contract instead of redefining it.

## 0.0.2

### Patch Changes

- 2c2e771: Migrate to @ankhorage/devtools for shared ESLint and Prettier configuration.
