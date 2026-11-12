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

/** A schema-agnostic inline data reference. */
export interface FlowInlineDataRef {
  readonly kind: 'inline';
  readonly value: DataContractValue;
}

/** A schema-agnostic data reference exchanged by node ports, runs, and traces. */
export type FlowDataRef = FlowArtifactRef | FlowInlineDataRef;

/** A secret-store reference that deliberately excludes secret material. */
export interface FlowSecretRef {
  readonly kind: 'secret';
  readonly ref: SecretRef;
}

/** JSON-safe node configuration, including data and secret references. */
export type FlowNodeConfigValue = DataContractValue | FlowDataRef | FlowSecretRef;
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

/** A condition declared on an edge without embedding executable expressions. */
export type FlowEdgeCondition =
  | { readonly kind: 'always' }
  | { readonly kind: 'outcome'; readonly outcome: 'failure' | 'success' }
  | { readonly kind: 'value'; readonly path?: string; readonly equals: DataContractValue };

/** A directed connection from one output port to one input port. */
export interface FlowEdge {
  readonly id: FlowEdgeId;
  readonly source: { readonly nodeId: FlowNodeId; readonly portId: FlowPortId };
  readonly target: { readonly nodeId: FlowNodeId; readonly portId: FlowPortId };
  readonly condition?: FlowEdgeCondition;
}

/** A portable trigger declaration; runtime scheduling and delivery remain provider-owned. */
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

/** A durable snapshot of one execution attempt for a graph node. */
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

/** A reference to the triggering event or request that started a run. */
export interface FlowRunTrigger {
  readonly triggerId: string;
  readonly kind: FlowTrigger['kind'];
  readonly data?: FlowDataRef;
}

/** A durable snapshot of an execution against one immutable flow revision. */
export interface FlowRunSnapshot {
  readonly id: FlowRunId;
  readonly flow: { readonly id: FlowId; readonly version: number };
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

export type FlowApprovalStatus = 'approved' | 'cancelled' | 'expired' | 'pending' | 'rejected';

/** A serializable human-approval request associated with one durable run. */
export interface FlowApprovalRequest {
  readonly id: string;
  readonly runId: FlowRunId;
  readonly stepId?: FlowStepId;
  readonly status: FlowApprovalStatus;
  readonly requestedAt: string;
  readonly expiresAt?: string;
  readonly resolvedAt?: string;
  readonly requestedBy?: string;
  readonly resolvedBy?: string;
  readonly message?: string;
  readonly context?: FlowDataRef;
}
