import type { AppEnvironmentId } from '../environments';
import type { INFRA_ADAPTER_CATALOG } from '../features/infra/domain/constants';
import type {
  InfraDestroyRequest,
  InfraGeneratedArtifact,
  InfraLedger,
  InfraOutput,
  InfraOwnedResource,
  InfraPlanAction,
  InfraResourceStatus,
  InfraResult,
} from './infraLifecycle';
import type {
  InfraAdapterId,
  InfraComputeProviderId,
  InfraComputeSelection,
  InfraEnvironmentSpec,
  InfraRuntimeProviderId,
  InfraRuntimeSelection,
} from './infraManifest';
import type { InfraControlPlaneCredentialRef, InfraSecretReference } from './infraSecrets';
import type { InfraWorkloadSpec } from './infraWorkload';

/** Package exports must match this exact catalog entry; optional operations are advertised explicitly. */
export type InfraAdapterDescriptor<P extends InfraAdapterId = InfraAdapterId> = {
  [K in P]: (typeof INFRA_ADAPTER_CATALOG)[K] & {
    readonly operations?: readonly ('suspend' | 'resume' | 'generate' | 'diagnostics')[];
  };
}[P];

export type InfraComputeTarget = {
  readonly id: string;
  readonly os: 'linux' | 'darwin' | 'windows';
  readonly architecture: 'amd64' | 'arm64';
} & (
  | { readonly kind: 'local-host' }
  | {
      readonly kind: 'ssh-host';
      readonly host: string;
      readonly port: number;
      readonly user: string;
      readonly credential: InfraControlPlaneCredentialRef;
      /** Expected host key supplied by the compute owner; runtimes must verify host authenticity. */
      readonly hostKeyFingerprint: string;
    }
);

/** Trusted execution-only ports. Implementations must not serialize resolved credential values. */
export interface InfraExecutionContext {
  readonly projectId: string;
  readonly environment: AppEnvironmentId;
  readonly desired: InfraEnvironmentSpec;
  readonly previous?: InfraLedger;
  readonly signal?: AbortSignal;
  readonly credentials: {
    resolveAsync(
      reference: InfraControlPlaneCredentialRef,
    ): Promise<InfraResult<Readonly<Record<string, string>>>>;
  };
  readonly secrets: {
    resolveAsync(reference: InfraSecretReference): Promise<InfraResult<string>>;
  };
}

export interface InfraReconcileResult {
  readonly resources: readonly InfraOwnedResource[];
  readonly outputs: readonly InfraOutput[];
}

export interface InfraComputeAdapter<P extends InfraComputeProviderId = InfraComputeProviderId> {
  readonly descriptor: InfraAdapterDescriptor<P>;
  /** Read-only prerequisites, config and control-plane credential validation. */
  validateAsync(
    context: InfraExecutionContext,
    selection: InfraComputeSelection<P>,
  ): Promise<InfraResult<null>>;
  planAsync(
    context: InfraExecutionContext,
    selection: InfraComputeSelection<P>,
  ): Promise<InfraResult<readonly InfraPlanAction[]>>;
  ensureAsync(
    context: InfraExecutionContext,
    selection: InfraComputeSelection<P>,
  ): Promise<
    InfraResult<InfraReconcileResult & { readonly targets: readonly InfraComputeTarget[] }>
  >;
  statusAsync(context: InfraExecutionContext): Promise<InfraResult<readonly InfraResourceStatus[]>>;
  destroyAsync(
    context: InfraExecutionContext,
    request: InfraDestroyRequest,
  ): Promise<InfraResult<InfraReconcileResult>>;
}

export interface InfraRuntimeDesiredState<
  P extends InfraRuntimeProviderId = InfraRuntimeProviderId,
> {
  readonly selection: InfraRuntimeSelection<P>;
  readonly targets: readonly InfraComputeTarget[];
  readonly workloads: readonly InfraWorkloadSpec[];
}

export interface InfraRuntimeAdapter<P extends InfraRuntimeProviderId = InfraRuntimeProviderId> {
  readonly descriptor: InfraAdapterDescriptor<P>;
  /** Read-only prerequisites and desired-state validation; no cluster creation. */
  validateAsync(
    context: InfraExecutionContext,
    desired: InfraRuntimeDesiredState<P>,
  ): Promise<InfraResult<null>>;
  planAsync(
    context: InfraExecutionContext,
    desired: InfraRuntimeDesiredState<P>,
  ): Promise<InfraResult<readonly InfraPlanAction[]>>;
  ensureAsync(
    context: InfraExecutionContext,
    desired: InfraRuntimeDesiredState<P>,
  ): Promise<InfraResult<InfraReconcileResult>>;
  statusAsync(context: InfraExecutionContext): Promise<InfraResult<readonly InfraResourceStatus[]>>;
  suspendAsync(context: InfraExecutionContext): Promise<InfraResult<InfraReconcileResult>>;
  destroyAsync(
    context: InfraExecutionContext,
    request: InfraDestroyRequest,
  ): Promise<InfraResult<InfraReconcileResult>>;
  generateAsync?(
    context: InfraExecutionContext,
    desired: InfraRuntimeDesiredState<P>,
  ): Promise<InfraResult<readonly InfraGeneratedArtifact[]>>;
}

/** A service can own several capabilities but contributes one deduplicated platform instance. */
export interface InfraServiceAdapter {
  readonly descriptor: InfraAdapterDescriptor<'supabase' | 'cerbos' | 'r2' | 'supabase-vault'>;
  /** Read-only service config, bootstrap credentials and dependency validation. */
  validateAsync(context: InfraExecutionContext): Promise<InfraResult<null>>;
  planAsync(context: InfraExecutionContext): Promise<InfraResult<readonly InfraPlanAction[]>>;
  desiredWorkloadsAsync(
    context: InfraExecutionContext,
  ): Promise<InfraResult<readonly InfraWorkloadSpec[]>>;
  reconcileAsync(
    context: InfraExecutionContext,
    runtimeOutputs: readonly InfraOutput[],
  ): Promise<InfraResult<InfraReconcileResult>>;
  statusAsync(context: InfraExecutionContext): Promise<InfraResult<readonly InfraResourceStatus[]>>;
  destroyAsync(
    context: InfraExecutionContext,
    request: InfraDestroyRequest,
  ): Promise<InfraResult<InfraReconcileResult>>;
  suspendAsync?(context: InfraExecutionContext): Promise<InfraResult<InfraReconcileResult>>;
}
