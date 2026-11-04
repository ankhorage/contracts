import type { SerializableValue } from '../serializable.js';

/*** A tenant, project, and semantic target partitioning one Rules evaluation. */
export interface TargetIdentity {
  readonly kind: string;
  readonly projectId: string;
  readonly targetId: string;
  readonly tenantId: string;
}

/*** The exact semantic scope of a fact or rule evaluation. */
export interface Scope {
  readonly id: string;
  readonly kind: string;
  readonly target: TargetIdentity;
}

/*** The producer and source revision from which portable Rules data was observed. */
export interface RulesProvenance {
  readonly collectedAt: string;
  readonly producer: {
    readonly id: string;
    readonly version: string;
  };
  readonly source: {
    readonly id: string;
    readonly revision: string | null;
  };
}

/*** An explicit reason that a fact or evidence value could not be supplied. */
export interface MissingData {
  readonly code: string;
  readonly message: string;
}

/*** A versioned portable fact with content integrity, provenance, and explicit availability. */
export type FactEnvelope = AvailableFactEnvelope | MissingFactEnvelope;

/*** A fact whose serializable value was available to the producing adapter. */
export interface AvailableFactEnvelope {
  readonly contentHash: string;
  readonly id: string;
  readonly kind: string;
  readonly provenance: RulesProvenance;
  readonly schemaVersion: 1;
  readonly scope: Scope;
  readonly status: 'available';
  readonly value: SerializableValue;
}

/*** A fact whose required value was unavailable without fabricating a replacement. */
export interface MissingFactEnvelope {
  readonly contentHash: string;
  readonly id: string;
  readonly kind: string;
  readonly missing: MissingData;
  readonly provenance: RulesProvenance;
  readonly schemaVersion: 1;
  readonly scope: Scope;
  readonly status: 'missing';
}

/*** Evidence retained by a rule result, including explicit unavailable evidence. */
export type RuleEvidence = AvailableRuleEvidence | MissingRuleEvidence;

/*** Evidence whose serializable observations are available to consumers. */
export interface AvailableRuleEvidence {
  readonly contentHash: string;
  readonly factIds: readonly string[];
  readonly id: string;
  readonly kind: string;
  readonly provenance: RulesProvenance;
  readonly schemaVersion: 1;
  readonly status: 'available';
  readonly value: SerializableValue;
}

/*** Evidence that remains explicitly unavailable to prevent implicit passing. */
export interface MissingRuleEvidence {
  readonly contentHash: string;
  readonly factIds: readonly string[];
  readonly id: string;
  readonly kind: string;
  readonly missing: MissingData;
  readonly provenance: RulesProvenance;
  readonly schemaVersion: 1;
  readonly status: 'missing';
}

/*** The stable, versioned identity of a provider-owned rule. */
export interface RuleIdentity {
  readonly id: string;
  readonly version: string;
}

/*** One subject affected by a rule finding, preserved independently of a presentation consumer. */
export interface RuleFindingSubject {
  readonly id: string;
  readonly kind: string;
  readonly path?: string;
}

/*** An optional source location retained with a portable rule finding. */
export interface RuleFindingSourceLocation {
  readonly column?: number;
  readonly endColumn?: number;
  readonly endLine?: number;
  readonly line: number;
  readonly path: string;
}

/*** One serializable finding emitted by a published Rules evaluation. */
export interface RuleFinding {
  readonly evidence: SerializableValue;
  readonly message: string;
  readonly ruleId: string;
  readonly severity: RuleFindingSeverity;
  readonly sourceLocation?: RuleFindingSourceLocation;
  readonly subjects: readonly RuleFindingSubject[];
}

/*** The canonical impact levels emitted by the published Rules evaluator. */
export type RuleFindingSeverity = 'error' | 'info' | 'warning';

/*** A serializable evaluator diagnostic retained with a versioned wire result. */
export interface RuleResultDiagnostic {
  readonly code:
    | 'ambiguous-rule-id'
    | 'cycle'
    | 'dependency-error'
    | 'dependency-incomplete'
    | 'dependency-scope-mismatch'
    | 'disabled-dependency'
    | 'invalid-options'
    | 'missing-capability'
    | 'missing-dependency'
    | 'rule-error'
    | 'unresolved-dependencies';
  readonly message: string;
  readonly ruleId?: string;
}

/***
 * The versioned, serializable wire form of one `@ankhorage/rules` evaluation result.
 *
 * This mirrors the published engine result while adding only wire metadata. Engine-native types,
 * evaluation, validation, and mappings belong to the consuming adapter, not Contracts.
 */
export interface RuleResultDto {
  readonly diagnostics: readonly RuleResultDiagnostic[];
  readonly findings: readonly RuleFinding[];
  readonly resultHash: string;
  readonly rule: RuleIdentity;
  readonly schemaVersion: 1;
  readonly scope: Scope;
  readonly status: RuleResultStatus;
}

/*** The canonical status set for a portable rule result. */
export type RuleResultStatus = 'ERROR' | 'FAIL' | 'INCOMPLETE' | 'PASS' | 'SKIPPED';

/*** A serializable Rules DAG projection for consumers such as graph visualizations. */
export interface GraphProjection {
  readonly edges: readonly GraphProjectionEdge[];
  readonly nodes: readonly GraphProjectionNode[];
  readonly projectionHash: string;
  readonly schemaVersion: 1;
  readonly scope: Scope;
}

/*** One directed dependency edge in a portable Rules graph projection. */
export interface GraphProjectionEdge {
  readonly fromNodeId: string;
  readonly toNodeId: string;
}

/*** One evaluated rule node in a portable Rules graph projection. */
export interface GraphProjectionNode {
  readonly id: string;
  readonly result: RuleResultDto;
}
