export type AnkhCommandCategory = string;

export type AnkhProviderReference = `./${string}`;

export type AnkhCapabilityId = `${string}.${string}`;

export interface AnkhCommandDescriptor {
  readonly path: readonly [string, ...string[]];
  readonly summary: string;
  readonly capability: AnkhCapabilityId;
  readonly aliases?: readonly string[];
  readonly examples?: readonly string[];
}

export interface AnkhCommandProviderManifest {
  readonly id: string;
  readonly category: AnkhCommandCategory;
  readonly version: string;
  readonly capabilities: readonly AnkhCapabilityId[];
  readonly commands: readonly AnkhCommandDescriptor[];
}

export interface AnkhPackageMetadata {
  readonly category: AnkhCommandCategory;
  readonly provider: AnkhProviderReference | null;
  readonly capabilities: readonly AnkhCapabilityId[];
}
