import type { EntityRegistry } from '../collections.js';
import type { EndpointId } from './ids.js';
import type { DataOperationRegistry } from './operations.js';
import type { CredentialRef } from './refs.js';
import type { DataContractValue } from './values.js';

export type DataEndpointKind = 'database' | 'graphql' | 'http' | (string & {});

export interface DataEndpointConfig {
  readonly id: EndpointId;
  readonly kind: DataEndpointKind;
  readonly name?: string;
  readonly description?: string;
  readonly baseUrl?: string;
  readonly path?: string;
  readonly credential?: CredentialRef;
  readonly operations: DataOperationRegistry;
  readonly metadata?: DataContractValue;
}

export type DataEndpointRegistry = EntityRegistry<EndpointId, DataEndpointConfig, 'id'>;
