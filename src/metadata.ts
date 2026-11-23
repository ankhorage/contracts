/*** Portable, authored metadata that describes one repository without duplicating package manifests.
 *
 * The document is static JSON. It deliberately excludes derivable package identity, source-control
 * location, dependency graphs, exported APIs, contributor data, and executable package metadata.
 */
export interface RepositoryMetadata {
  /** The version of this portable document shape. */
  readonly schemaVersion: 1;
  /** The repository profile that determines which optional descriptions are meaningful. */
  readonly kind: RepositoryMetadataKind;
  /** A concise human-facing repository name. */
  readonly title: string;
  /** A concise explanation of what the repository provides. */
  readonly summary: string;
  /** The durable reason this repository exists. */
  readonly purpose: string;
  /** The domain or product area the repository serves when that classification is useful. */
  readonly domain?: string;
  /** Responsibilities the repository owns. */
  readonly responsibilities?: readonly string[];
  /** Intentional boundaries and responsibilities the repository does not own. */
  readonly boundaries?: readonly string[];
  /** People or systems for which the repository is intended. */
  readonly audience?: readonly string[];
  /** Evidence-backed tasks the repository enables. */
  readonly useCases?: readonly string[];
  /** Architectural facts that are useful to consumers and maintainers. */
  readonly architecture?: RepositoryMetadataArchitecture;
  /** Explicit implementation relationships, distinct from package dependencies and consumers. */
  readonly implements?: readonly RepositoryImplementationRef[];
  /** Declarative build artifacts published by this repository. */
  readonly build?: RepositoryMetadataBuild;
  /** Platform, configuration, security, or limitation facts that apply to this repository. */
  readonly constraints?: RepositoryMetadataConstraints;
}

/** Repository profiles used to apply metadata requirements without assuming a source layout. */
export type RepositoryMetadataKind =
  | 'adapter'
  | 'application'
  | 'configuration'
  | 'contract'
  | 'infrastructure'
  | 'library'
  | 'tooling'
  | 'website';

/** Architectural role and invariants that are intentionally authored rather than derived. */
export interface RepositoryMetadataArchitecture {
  /** The repository's role in the wider architecture. */
  readonly role?: string;
  /** Stable design constraints that implementations must preserve. */
  readonly invariants?: readonly string[];
}

/** A relation to an interface or port implemented by this repository. */
export interface RepositoryImplementationRef {
  /** The package identity that owns the implemented contract. */
  readonly packageName: string;
  /** The public package subpath that owns the contract, when applicable. */
  readonly subpath?: string;
  /** The explicit interface or port identifier implemented by this repository. */
  readonly interfaceId?: string;
}

/** Declarative build artifacts published by this repository. */
export interface RepositoryMetadataBuild {
  /** Build target declarations keyed by their authored identifiers. */
  readonly targets: Readonly<Record<string, RepositoryMetadataBuildTarget>>;
}

/** One portable build artifact emitted by a repository. */
export interface RepositoryMetadataBuildTarget {
  /** The implementation language used by this build target. */
  readonly language: string;
  /** The framework the target is built for. */
  readonly framework: string;
  /** Platforms supported by the emitted artifact. */
  readonly platforms: readonly string[];
  /** The public package export subpath provided by the target. */
  readonly entry: string;
  /** The repository-relative output directory for the target artifacts. */
  readonly outDir: string;
  /** Explicit authored compiler inputs, independent from the public package export subpath. */
  readonly sources?: RepositoryMetadataBuildTargetSources;
  /** An optional reference to the repository-owned script that builds this target. */
  readonly builder?: RepositoryMetadataBuildTargetBuilder;
}

/** Explicit repository-relative source inputs for one build target. */
export interface RepositoryMetadataBuildTargetSources {
  /** Authored compiler entrypoint filenames when they can be enumerated explicitly. */
  readonly entries?: readonly string[];
  /** Authored source patterns when enumerating entrypoints is impractical. */
  readonly include?: readonly string[];
}

/** A repository-owned build script reference for one target. */
export interface RepositoryMetadataBuildTargetBuilder {
  /** The exact key of the repository-owned package.json script. */
  readonly script: string;
}

/** Optional evidence-backed constraints; omitted categories do not imply their absence. */
export interface RepositoryMetadataConstraints {
  /** Supported or required platforms. */
  readonly platforms?: readonly string[];
  /** Configuration facts users must know. */
  readonly configuration?: readonly string[];
  /** Security constraints or guarantees that are intentionally documented. */
  readonly security?: readonly string[];
  /** Known limitations that are intentionally documented. */
  readonly limitations?: readonly string[];
}
