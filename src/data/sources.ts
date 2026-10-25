import type { EntityRegistry } from '../collections.js';
import type { DataEndpointRegistry } from './endpoints.js';
import type { DataSourceId } from './ids.js';
import type { CredentialRef, DatabaseAdapterRef } from './refs.js';
import type { DataSchemaRegistry } from './schemas.js';
import type { DataContractValue } from './values.js';

export type DataSourceKind = 'database';

export interface DatabaseDataSourceConfig {
  readonly id: DataSourceId;
  readonly kind: 'database';
  readonly name?: string;
  readonly description?: string;
  readonly credential?: CredentialRef;
  readonly adapter: DatabaseAdapterRef;
  readonly endpoints: DataEndpointRegistry;
  readonly schemas?: DataSchemaRegistry;
  readonly metadata?: DataContractValue;
}

export type DataSourceConfig = DatabaseDataSourceConfig;
export type DataSourceRegistry = EntityRegistry<DataSourceId, DataSourceConfig, 'id'>;
