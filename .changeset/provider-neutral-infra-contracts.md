---
'@ankhorage/contracts': major
---

Replace the single-target Infra manifest with canonical local/preview/production environments and
closed compute/runtime/service selections. The public `@ankhorage/contracts/infra` entrypoint owns
provider config maps, exact compatibility typing and validation, adapter/package descriptors,
portable compute targets and workloads, lifecycle results, outputs, diagnostics and ownership/
retention contracts.

Move `storage` to environment-local `objectStorage`, move nested authorization to sibling `authz`,
and remove deployment monitoring, implicit storage providers and unused CDN flags. Move app state
to optional `AppManifest.state`; Legend can only declare `persistence: false` or omit persistence.
Superseded Infra types and the secret-store module augmentation are removed, with no compatibility
aliases or dual manifest shapes. Auth flow, profile and OAuth references remain supported.

Shared environment IDs now live at `@ankhorage/contracts/environments` as `APP_ENVIRONMENT_IDS` and
`AppEnvironmentId`, replacing Deploy-specific environment names. App shipment target IDs remain
unchanged. Existing application runtime SecretStore/DB/Auth/Storage/State adapter ports remain
separate from infrastructure providers.

Release Contracts before migrating direct consumers. Templates and Studio must then adopt the
published API and correct their Legend persistence manifests; this release alone does not complete
Phase 1 of ankhorage/infra#145 or implement provider lifecycle behavior.
