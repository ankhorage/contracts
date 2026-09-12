# Provider-neutral infrastructure contracts

`@ankhorage/contracts/infra` is the canonical boundary for standalone infrastructure manifests,
adapter discovery and lifecycle data. It has no dependency on an infrastructure provider,
Kubernetes, Expo shipment or `@ankhorage/deploy`.

This is the Contracts release gate for [Infra roadmap Phase 1](https://github.com/ankhorage/infra/issues/145).
It defines and validates the shared model; it does not provision infrastructure. Adapter
implementations and orchestration follow in later roadmap phases.

## Environments and selection

```ts
import type { InfraManifest } from '@ankhorage/contracts/infra';

const infra = {
  environments: {
    local: {
      deployment: {
        compute: { provider: 'local' },
        runtime: { provider: 'minikube' },
      },
      database: { provider: 'supabase' },
      auth: { provider: 'supabase' },
      objectStorage: { provider: 'supabase', buckets: ['media'] },
    },
    production: {
      deployment: {
        compute: {
          provider: 'hetzner',
          location: 'nbg1',
          credentials: { source: 'control-plane', name: 'hetzner' },
        },
        runtime: { provider: 'k3s', topology: { servers: 1, agents: 0 } },
      },
      database: { provider: 'supabase' },
      auth: { provider: 'supabase' },
      authz: { provider: 'cerbos', kind: 'ABAC' },
      objectStorage: { provider: 'r2', buckets: ['media'] },
      secretStore: { provider: 'supabase-vault' },
      networking: { domain: 'api.example.ch' },
    },
  },
  modules: [],
} satisfies InfraManifest;
```

`local` is required; `preview` and `production` are optional. Environment names come from
`APP_ENVIRONMENT_IDS` / `AppEnvironmentId` at `@ankhorage/contracts/environments`, shared with
application shipment and OAuth setup. The schema never chooses a non-local environment implicitly.

`InfraDeploymentSpec` derives its union from `INFRA_RUNTIME_COMPATIBILITY`:

| Runtime          | Allowed compute    |
| ---------------- | ------------------ |
| `minikube`       | `local`            |
| `k3s`            | `local`, `hetzner` |
| `docker-compose` | `local`, `hetzner` |

Both TypeScript and `isInfraDeploymentSpec` reject Hetzner + Minikube and unknown provider IDs.
The config maps are provider-specific: for example, Hetzner requires a location; Minikube fields
cannot be added to a Compose selection; k3s topology requires positive server and nonnegative agent
integers. Additional runtime prerequisites such as host OS, installed binaries, topology feasibility
and provider credential validity belong to each adapter's read-only `validateAsync` operation.

Auth, Authz, database, object storage and secret store are sibling capabilities. No dedicated Authz
is represented by omission, not a `native` infrastructure provider. One selected Supabase adapter
owns the DB/Auth/ObjectStorage platform even if several of those capabilities select it. R2 remains
independent. Supabase Vault requires the database capability; dependencies are checked from catalog
metadata. There is no speculative observability or automatic DNS/CDN vendor selection.

Auth routing, sign-in/sign-up, OAuth references and profile intent remain available on
`InfraAuthSpec`. They are not Navigator flows. Application runtime `supabase-auth`, `supabase-db`
and `supabase-storage` adapters continue to consume the provisioned platform.

## Validation and discovery

`parseInfraManifest(unknown)` returns `InfraResult<InfraManifest>`. Validation is side-effect free
and works without an AppManifest. It rejects obsolete fields rather than ignoring them, including
`deployment.target`, `monitoring`, `storage`, `infra.state`, nested `auth.authorization` and open
provider strings. `parseAppManifest` uses this same Infra boundary.

`INFRA_ADAPTER_CATALOG` identifies each package, kind, capabilities, dependency capabilities,
portable target kinds and configuration version. Configuration shapes are the corresponding public
`Infra*ConfigMap` types and canonical manifest validators. `InfraAdapterDescriptor<P>` binds an
exported descriptor to its exact catalog entry. `isInfraAdapterDescriptor` is the reusable package
conformance check; optional operational capabilities are explicit.

`validateInfraAdapterSelection(environment, installedDescriptors)` verifies the installed
descriptors for selected providers and deduplicates a multi-capability provider. Missing,
mismatched or duplicate selected descriptors produce diagnostics naming the required package.
Unselected packages are not required. The Infra resolver supplies descriptors after dynamically
resolving only selected packages; Contracts performs no imports or filesystem discovery.

Optional credential references/account configuration may instead come from trusted execution
configuration. Schema success does not assert that credentials exist or that the provider accepts
them. The orchestrator combines structural validation, descriptor validation and adapter
`validateAsync` results before mutation.

## Portable workloads and execution ports

`InfraComputeTarget` contains local-host or SSH-host access, OS and architecture. Remote targets
carry an expected host-key fingerprint and a control-plane credential reference. Runtime adapters
must verify host authenticity; they do not import compute-provider implementations.

`InfraWorkloadSpec` describes a prebuilt image, process command/arguments, named ports, environment
values, config/policy files, health checks, resource budgets, persistent volumes, exposure, replicas
and dependency IDs. It has no Kubernetes resource types or registry build/push requirements.
Minikube, k3s and Compose accept the same workload shape. Runtime drivers map it to their technology.

Workload values distinguish literals, resource output references and privileged secret references.
The producer must use references for secrets. Config files allow Cerbos policies and service config
to be contributed without Kubernetes YAML. The orchestrator validates missing/cyclic dependencies
after composing application and provider workloads; a manifest can reference provider-contributed
workload IDs that are not available during structural parsing.

The compute, runtime and service ports expose operations relevant to each capability:

| Port    | Responsibilities                                                                                                     |
| ------- | -------------------------------------------------------------------------------------------------------------------- |
| Compute | validate/plan, ensure portable targets, status, destroy                                                              |
| Runtime | validate/plan, ensure runtime and workloads, status, reversible suspension, destroy, optional artifact generation    |
| Service | validate/plan, contribute workloads, reconcile/bootstrap after runtime outputs, status, destroy, optional suspension |

Service reconciliation owns migrations/bootstrap/readiness. Runtime ensure owns runtime/workload
readiness. Repeated ensure/reconcile must converge. Providers without suspension retain their
resources on `down`; `down` is not a zero-cost promise. These are implementation obligations of
later phases, not behavior implemented by Contracts. Public CLI commands remain owned by Infra.

## Secrets, ownership and destructive actions

`InfraControlPlaneCredentialRef` is resolved by trusted execution configuration and cannot name a
managed secret store. Infrastructure bootstrap therefore cannot depend on the store it is creating.
`InfraSecretReference` identifies a scoped runtime secret by project, environment, reference and key.
Resolved values are execution-only; runtime materialization does not change their source of truth.

`InfraOutput` is either public with a primitive value and optional environment export name, or
privileged with a reference. A privileged output cannot contain a value or environment export name.
Diagnostics and generated artifacts must be sanitized by their producers. Contracts cannot infer
whether an arbitrary string labelled public is actually sensitive.

`InfraResourceIdentity` binds a resource to project, environment, adapter and logical resource ID.
`InfraOwnedResource` adds external identity, dependency identities, persistence and retention.
Ledgers track resources and generated paths under a versioned project/environment scope. They have
no built-in timestamps or plaintext secret payloads. Writers must validate paths and ownership
before updating or removing files/resources. Unowned resources must never be pruned.

Plan actions identify owner, operation, destructive impact, dependencies and reviewable detail.
Status aggregates canonical resource states; provider detail is diagnostic information.
`InfraResult` carries explicit success/failure and diagnostics.

`InfraDestroyRequest` requires environment, project and matching confirmation identity. Persistent
data deletion additionally requires an explicit list of confirmed resource identities. The
orchestrator must compare confirmation/scope, enforce retention, and destroy in reverse dependency
order. A volume's `delete-on-destroy` intent alone is not permission to delete data. `down` preserves
persistent data in all environments. Production mutations must always be explicitly selected.

## Breaking consumer migration and release order

1. Merge and publish this Contracts major release.
2. Update direct consumers against the actual published version; never invent a future version or
   import sibling source files.
3. Move authored environment capabilities under `infra.environments.local` and explicitly declare
   additional environments. Replace old imports with the `/infra` topic and shared environment IDs
   with `/environments`.
4. Rename storage to objectStorage, select Supabase/R2 explicitly, move Authz to the sibling field,
   and remove obsolete monitoring/CDN/native-Authz intent.
5. Move state to optional `AppManifest.state`, using `{ provider: 'legend' }` or
   `{ provider: 'legend', persistence: false }`. The current Legend runtime has no persistence
   implementation; old strings including `local` are rejected rather than silently downgraded.

Templates/generated manifests and Studio need follow-up consumer migrations after release. Infra
orchestration and local runtime parity remain gated by the later adapter phases. The roadmap must
remain open, and Phase 1 must not be marked complete solely because this Contracts PR is merged.
