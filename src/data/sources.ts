import type { DataEndpointRegistry } from './endpoints';
import type { DataSourceId } from './ids';
import type { CredentialRef, DatabaseAdapterRef } from './refs';
import type { DataSchemaRegistry } from './schemas';
import type { DataContractValue } from './values';

export type DataSourceKind = 'api' | 'database';
export type ApiOrigin = 'external' | 'generated';
export type ApiProtocol = 'graphql' | 'rest';

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

export interface ApiDataSourceBaseConfig extends DataSourceBaseConfig {
  readonly kind: 'api';
  readonly origin: ApiOrigin;
  readonly protocol: ApiProtocol;
}

export interface OpenApiDocumentRef {
  readonly url?: string;
  readonly documentId?: string;
  readonly version?: string;
}

export interface ExternalRestApiDataSourceConfig extends ApiDataSourceBaseConfig {
  readonly origin: 'external';
  readonly protocol: 'rest';
  readonly baseUrl: string;
  readonly openApi?: OpenApiDocumentRef;
}

export interface ExternalGraphQlApiDataSourceConfig extends ApiDataSourceBaseConfig {
  readonly origin: 'external';
  readonly protocol: 'graphql';
  readonly endpointUrl: string;
  readonly introspection?: {
    readonly enabled: boolean;
    readonly schemaVersion?: string;
  };
}

export interface GeneratedRestApiDataSourceConfig extends ApiDataSourceBaseConfig {
  readonly origin: 'generated';
  readonly protocol: 'rest';
  readonly generatedApiId: string;
  readonly adapter: DatabaseAdapterRef;
}

export type ApiDataSourceConfig =
  | ExternalGraphQlApiDataSourceConfig
  | ExternalRestApiDataSourceConfig
  | GeneratedRestApiDataSourceConfig;

export interface DatabaseDataSourceConfig extends DataSourceBaseConfig {
  readonly kind: 'database';
  readonly adapter: DatabaseAdapterRef;
}

export type DataSourceConfig = ApiDataSourceConfig | DatabaseDataSourceConfig;

export type DataSourceRegistry = Readonly<Record<DataSourceId, DataSourceConfig>>;
