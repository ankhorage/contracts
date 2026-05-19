import type { DbCollectionDefinition } from '../db';
import type { DataEndpointRegistry } from './endpoints';
import type { DataSourceId } from './ids';
import type { AdapterRef, CredentialRef } from './refs';
import type { DataSchemaRegistry } from './schemas';
import type { DataContractValue } from './values';

export type DataSourceKind = 'database' | 'graphql' | 'managed-api' | 'openapi' | 'rest';

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
  readonly adapter: AdapterRef;
}

export interface ManagedApiResourceConfig {
  readonly name: string;
  readonly collection: DbCollectionDefinition;
  readonly operations?: readonly ('create' | 'delete' | 'list' | 'read' | 'update')[];
  readonly metadata?: DataContractValue;
}

export interface ManagedApiDataSourceConfig extends DataSourceBaseConfig {
  readonly kind: 'managed-api';
  readonly adapter: AdapterRef;
  readonly resources: readonly ManagedApiResourceConfig[];
}

export type DataSourceConfig =
  | DatabaseDataSourceConfig
  | GraphQlDataSourceConfig
  | ManagedApiDataSourceConfig
  | OpenApiDataSourceConfig
  | RestDataSourceConfig;

export type DataSourceRegistry = Readonly<Record<DataSourceId, DataSourceConfig>>;
