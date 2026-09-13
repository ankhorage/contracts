import type { InfraSecretReference } from './infraSecrets';

export interface InfraWorkloadArtifact {
  readonly kind: 'image';
  /** Prebuilt image, optionally pinned by digest. No registry/build provider requirement. */
  readonly image: string;
}

export type InfraWorkloadValue =
  | { readonly kind: 'literal'; readonly value: string }
  | { readonly kind: 'secret'; readonly reference: InfraSecretReference }
  | { readonly kind: 'output'; readonly resourceId: string; readonly output: string };

export interface InfraWorkloadPort {
  readonly name: string;
  readonly port: number;
  readonly protocol?: 'tcp' | 'udp';
}

export type InfraWorkloadHealthSpec = {
  readonly intervalSeconds?: number;
  readonly timeoutSeconds?: number;
  readonly failureThreshold?: number;
} & (
  | { readonly kind: 'http'; readonly port: number; readonly path: string }
  | { readonly kind: 'tcp'; readonly port: number }
  | { readonly kind: 'command'; readonly command: readonly string[] }
);

export interface InfraWorkloadResourceSpec {
  readonly cpuMillis?: number;
  readonly memoryMiB?: number;
}

export interface InfraWorkloadVolumeSpec {
  readonly id: string;
  readonly mountPath: string;
  readonly sizeGiB: number;
  /** Persistence survives down and is retained by default on destroy. */
  readonly retention: 'retain' | 'delete-on-destroy';
}

/** Portable config/policy files; secret values are materialized by the runtime. */
export interface InfraWorkloadFileSpec {
  readonly path: string;
  readonly content: InfraWorkloadValue;
}

export interface InfraWorkloadSpec {
  readonly id: string;
  readonly artifact: InfraWorkloadArtifact;
  readonly command?: readonly string[];
  readonly args?: readonly string[];
  readonly ports?: readonly InfraWorkloadPort[];
  readonly environment?: Readonly<Record<string, InfraWorkloadValue>>;
  readonly files?: readonly InfraWorkloadFileSpec[];
  readonly health?: InfraWorkloadHealthSpec;
  readonly resources?: InfraWorkloadResourceSpec;
  readonly persistence?: readonly InfraWorkloadVolumeSpec[];
  readonly exposure?: 'internal' | 'public';
  readonly replicas?: number;
  /** IDs in the composed desired-state graph; the orchestrator validates missing/cyclic edges. */
  readonly dependsOn?: readonly string[];
}
