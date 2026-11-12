import type { DataSchemaSlot } from './data/schemas.js';
import type { DataContractValue } from './data/values.js';
import type { SecretRef } from './secrets.js';

export type FlowId = string;
export type FlowNodeId = string;
export type FlowPortId = string;
export type FlowEdgeId = string;
export type FlowRunId = string;
export type FlowStepId = string;
export type FlowArtifactId = string;
export type FlowProviderCapabilityId = string;

/** A serializable reference to a provider-owned flow capability. */
export interface FlowProviderCapabilityRef {
  readonly providerId: string;
  readonly capabilityId: FlowProviderCapabilityId;
}

/** A persisted artifact reference for data too large or unsuitable for inline graph data. */
export interface FlowArtifactRef {
  readonly kind: 'artifact';
  readonly artifactId: FlowArtifactId;
  readonly mediaType?: string;
  readonly byteLength?: number;
  readonly checksum?: string;
}

/*** A schema-agnostic inline data reference.
 *
 * Inline values are ordinary non-secret data. Consumers must reject a value at a credential
 * configuration position and require a `FlowSecretRef` there; TypeScript cannot prove that
 * invariant after JSON has crossed a trust boundary.
 */
export interface FlowInlineDataRef {
  readonly kind: 'inline';
  readonly value: DataContractValue;
}

/** A schema-agnostic data reference exchanged by node ports, runs, and traces. */
export type FlowDataRef = FlowArtifactRef | FlowInlineDataRef;

/*** A secret-store reference that deliberately excludes secret material.
 *
 * @security Credential configuration must use this reference. Flow consumers must validate
 * provider configuration at their boundary, reject inline credentials, and redact secrets from
 * errors and traces. This portable DTO cannot determine which arbitrary provider fields are
 * credentials, so it provides no runtime validation and makes no static guarantee for untyped
 * JSON.
 */
export interface FlowSecretRef {
  readonly kind: 'secret';
  readonly ref: SecretRef;
}

/*** JSON-safe node configuration references.
 *
 * A configuration value is always explicitly either non-secret data or a secret-store reference;
 * raw JSON values are intentionally not accepted. Provider consumers own validation of the
 * declared configuration shape and credential positions before execution.
 */
export type FlowNodeConfigValue = FlowDataRef | FlowSecretRef;
export type FlowNodeConfig = Readonly<Record<string, FlowNodeConfigValue>>;

/** A typed node port. Direction determines whether a node consumes or produces the port value. */
export interface FlowPortDescriptor {
  readonly id: FlowPortId;
  readonly direction: 'input' | 'output';
  readonly label?: string;
  readonly description?: string;
  readonly required?: boolean;
  readonly data?: DataSchemaSlot;
}

/** One provider-backed executable step within a portable flow graph. */
export interface FlowNode {
  readonly id: FlowNodeId;
  readonly capability: FlowProviderCapabilityRef;
  readonly label?: string;
  readonly config?: FlowNodeConfig;
  readonly ports: readonly FlowPortDescriptor[];
}

/*** A condition declared on an edge without embedding executable expressions.
 *
 * A `value` condition evaluates `path` as an RFC 6901 JSON Pointer against the source port's
 * JSON value; the empty string denotes the complete value. Missing-pointer evaluation does not
 * match. `equals` uses JSON structural equality: values have the same type and recursive array
 * order and object member/value pairs, independent of object member order. Engines must not use
 * coercion, locale comparison, or executable expressions.
 */
export type FlowEdgeCondition =
  | { readonly kind: 'always' }
  | { readonly kind: 'outcome'; readonly outcome: 'failure' | 'success' }
  | { readonly kind: 'value'; readonly path: string; readonly equals: DataContractValue };

/** A directed connection from one output port to one input port. */
export interface FlowEdge {
  readonly id: FlowEdgeId;
  readonly source: { readonly nodeId: FlowNodeId; readonly portId: FlowPortId };
  readonly target: { readonly nodeId: FlowNodeId; readonly portId: FlowPortId };
  readonly condition?: FlowEdgeCondition;
}

/*** A portable trigger declaration; runtime scheduling and delivery remain provider-owned.
 *
 * A schedule uses a five-field POSIX cron expression: minute, hour, day of month, month, and day
 * of week. Seconds, years, macros, and implementation-specific extensions are invalid. `timezone`
 * is an IANA time-zone name and defaults to `Etc/UTC`. Match it against local wall-clock time; a
 * spring-forward nonexistent local time is skipped and each occurrence of a repeated local time
 * during a fall-back transition fires separately. When both day-of-month and day-of-week are
 * restricted, either match is sufficient, following POSIX cron semantics.
 */
export type FlowTrigger =
  | { readonly id: string; readonly kind: 'manual' }
  | {
      readonly id: string;
      readonly kind: 'schedule';
      readonly cron: string;
      readonly timezone?: string;
    }
  | {
      readonly id: string;
      readonly kind: 'event';
      readonly capability: FlowProviderCapabilityRef;
      readonly event: string;
    }
  | { readonly id: string; readonly kind: 'webhook'; readonly path: string };

/** An immutable revision of a portable workflow graph. */
export interface FlowDefinition {
  readonly id: FlowId;
  readonly version: number;
  readonly title: string;
  readonly description?: string;
  readonly nodes: readonly FlowNode[];
  readonly edges: readonly FlowEdge[];
  readonly triggers: readonly FlowTrigger[];
}

/** An immutable workflow revision reference. */
export interface FlowDefinitionRef {
  readonly id: FlowId;
  readonly version: number;
}

export type FlowExecutionStatus =
  | 'cancelled'
  | 'failed'
  | 'pending'
  | 'running'
  | 'succeeded'
  | 'timed_out'
  | 'waiting_for_approval';

/** A portable error observation that never carries a host Error object. */
export interface FlowError {
  readonly code: string;
  readonly message: string;
  readonly retryable: boolean;
  readonly details?: FlowDataRef;
}

/** A redaction-safe trace observation emitted by a run or step. */
export interface FlowTraceEvent {
  readonly timestamp: string;
  readonly level: 'debug' | 'error' | 'info' | 'warn';
  readonly message: string;
  readonly attributes?: Readonly<Record<string, DataContractValue>>;
}

/*** A durable snapshot of one execution attempt for a graph node.
 *
 * `attempt` is a one-based, monotonically increasing number for this run and node. A retry has a
 * new step snapshot and attempt number; consumers must not overwrite a completed attempt.
 */
export interface FlowStepSnapshot {
  readonly id: FlowStepId;
  readonly nodeId: FlowNodeId;
  readonly status: FlowExecutionStatus;
  readonly attempt: number;
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly input?: Readonly<Record<FlowPortId, FlowDataRef>>;
  readonly output?: Readonly<Record<FlowPortId, FlowDataRef>>;
  readonly error?: FlowError;
  readonly trace?: readonly FlowTraceEvent[];
}

/** A stable reference to one immutable step attempt in a run. */
export interface FlowStepRef {
  readonly runId: FlowRunId;
  readonly id: FlowStepId;
  readonly nodeId: FlowNodeId;
  readonly attempt: number;
}

/** A reference to the triggering event or request that started a run. */
export interface FlowRunTrigger {
  readonly triggerId: string;
  readonly kind: FlowTrigger['kind'];
  readonly data?: FlowDataRef;
}

/*** A durable snapshot of an execution against one immutable flow revision.
 *
 * A run begins `pending`, may move to `running` or `cancelled`, and is terminal once
 * `cancelled`, `failed`, `succeeded`, or `timed_out`. `waiting_for_approval` pauses an otherwise
 * running run; resolving its pending approval resumes it or ends it as cancelled or failed.
 * Consumers must validate these transitions and must retain the referenced definition revision.
 */
export interface FlowRunSnapshot {
  readonly id: FlowRunId;
  readonly flow: FlowDefinitionRef;
  readonly status: FlowExecutionStatus;
  readonly trigger: FlowRunTrigger;
  readonly createdAt: string;
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly input?: Readonly<Record<FlowPortId, FlowDataRef>>;
  readonly output?: Readonly<Record<FlowPortId, FlowDataRef>>;
  readonly steps: readonly FlowStepSnapshot[];
  readonly error?: FlowError;
  readonly trace?: readonly FlowTraceEvent[];
}

/** A stable reference to a run against one immutable workflow revision. */
export interface FlowRunRef {
  readonly id: FlowRunId;
  readonly flow: FlowDefinitionRef;
}

export type FlowApprovalStatus = 'approved' | 'cancelled' | 'expired' | 'pending' | 'rejected';

/*** A serializable human-approval request associated with one durable run.
 *
 * An approval starts `pending` and transitions exactly once to `approved`, `rejected`, `expired`,
 * or `cancelled`; those states are terminal. A step approval identifies its exact attempt so a
 * later retry cannot resolve an earlier request. Consumers validate timestamps and transitions.
 */
export interface FlowApprovalRequest {
  readonly id: string;
  readonly runId: FlowRunId;
  readonly step?: FlowStepRef;
  readonly status: FlowApprovalStatus;
  readonly requestedAt: string;
  readonly expiresAt?: string;
  readonly resolvedAt?: string;
  readonly requestedBy?: string;
  readonly resolvedBy?: string;
  readonly message?: string;
  readonly context?: FlowDataRef;
}
