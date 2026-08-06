import type { DbCollectionDefinition } from '../db';
import type { DataEndpointRegistry } from './endpoints';
import type { DataSourceId } from './ids';
import type { CredentialRef, DatabaseAdapterRef } from './refs';
import type { DataSchemaRegistry } from './schemas';
import type { DataContractValue } from './values';

export type DataSourceKind = 'database' | 'graphql' | 'managed-api' | 'openapi' | 'rest';

export const MANAGED_API_CRUD_OPERATIONS = ['list', 'read', 'create', 'update', 'delete'] as const;
export type ManagedApiCrudOperation = (typeof MANAGED_API_CRUD_OPERATIONS)[number];
export type ManagedApiSeedRecord = Readonly<Record<string, DataContractValue>>;

export interface DataSourceBaseConfig {
  readonly id: DataSourceId;
  readonly kind: DataSourceKind;
  readonly name?: string;
  readonly description?: string;
  readonly credential?: CredentialRef;
  readonly endpoints: DataEndpointRegistry;
  readonly schemas?: DataSchemaRegistry;
  readonly metadata?: DataContractValue;
}

export interface RestDataSourceConfig extends DataSourceBaseConfig {
  readonly kind: 'rest';
  readonly baseUrl: string;
}

export interface OpenApiImportRef {
  readonly url?: string;
  readonly documentId?: string;
  readonly version?: string;
}

export interface OpenApiDataSourceConfig extends DataSourceBaseConfig {
  readonly kind: 'openapi';
  readonly baseUrl?: string;
  readonly import?: OpenApiImportRef;
}

export interface GraphQlDataSourceConfig extends DataSourceBaseConfig {
  readonly kind: 'graphql';
  readonly endpointUrl: string;
  readonly introspection?: {
    readonly enabled: boolean;
    readonly schemaVersion?: string;
  };
}

export interface DatabaseDataSourceConfig extends DataSourceBaseConfig {
  readonly kind: 'database';
  readonly adapter: DatabaseAdapterRef;
}

export interface ManagedApiOperationPolicyRef {
  readonly id: string;
  readonly operation?: ManagedApiCrudOperation;
}

export interface ManagedApiResourceConfig {
  readonly id: string;
  readonly name?: string;
  readonly description?: string;
  readonly path: string;
  readonly collection: DbCollectionDefinition;
  readonly operations: readonly ManagedApiCrudOperation[];
  readonly seed?: readonly ManagedApiSeedRecord[];
  readonly policies?: readonly ManagedApiOperationPolicyRef[];
  readonly metadata?: DataContractValue;
}

export interface ManagedApiDataSourceConfig extends DataSourceBaseConfig {
  readonly kind: 'managed-api';
  readonly adapter: DatabaseAdapterRef;
  readonly basePath: string;
  readonly resources: readonly ManagedApiResourceConfig[];
}

export type DataSourceConfig =
  | DatabaseDataSourceConfig
  | GraphQlDataSourceConfig
  | ManagedApiDataSourceConfig
  | OpenApiDataSourceConfig
  | RestDataSourceConfig;

export type DataSourceRegistry = Readonly<Record<DataSourceId, DataSourceConfig>>;
