import type { DbCollectionDefinition } from '../db';
import type { DataOperationRequest, DataOperationResponse } from './operations';
import type { DataContractValue } from './values';

export const APP_API_KINDS = ['external', 'generated'] as const;
export type AppApiKind = (typeof APP_API_KINDS)[number];

export const APP_API_GENERATED_PRESETS = ['crud'] as const;
export type AppApiGeneratedPreset = (typeof APP_API_GENERATED_PRESETS)[number];

export const APP_API_ENDPOINT_METHODS = [
  'DELETE',
  'GET',
  'HEAD',
  'OPTIONS',
  'PATCH',
  'POST',
  'PUT',
] as const;
export type AppApiEndpointMethod = (typeof APP_API_ENDPOINT_METHODS)[number];

export const APP_API_ENDPOINT_INTENTS = [
  'create',
  'custom',
  'delete',
  'list',
  'read',
  'update',
] as const;
export type AppApiEndpointIntent = (typeof APP_API_ENDPOINT_INTENTS)[number];

export type AppApiId = string;
export type AppApiEndpointId = string;
export type AppApiSeedRecord = Readonly<Record<string, DataContractValue>>;

export interface AppApiAuthRequirement {
  readonly required?: boolean;
  readonly roles?: readonly string[];
  readonly permissions?: readonly string[];
  readonly policy?: string;
  readonly metadata?: DataContractValue;
}

export interface AppApiCollectionResourceDefinition {
  readonly kind: 'collection';
  readonly collection: DbCollectionDefinition;
  readonly seed?: readonly AppApiSeedRecord[];
  readonly metadata?: DataContractValue;
}

export type AppApiResourceDefinition = AppApiCollectionResourceDefinition;

export interface AppApiEndpointDefinition {
  readonly id: AppApiEndpointId;
  readonly label?: string;
  readonly description?: string;
  readonly method: AppApiEndpointMethod;
  /**
   * Path relative to the API base path. Use `/` for the base collection endpoint.
   */
  readonly path: string;
  readonly intent?: AppApiEndpointIntent;
  readonly request?: DataOperationRequest;
  readonly response?: DataOperationResponse;
  readonly auth?: AppApiAuthRequirement;
  readonly metadata?: DataContractValue;
}

interface AppApiDefinitionBase {
  readonly id: AppApiId;
  readonly kind: AppApiKind;
  readonly label?: string;
  readonly description?: string;
  readonly basePath: string;
  readonly endpoints: readonly AppApiEndpointDefinition[];
  readonly auth?: AppApiAuthRequirement;
  readonly metadata?: DataContractValue;
}

export interface AppGeneratedApiDefinition extends AppApiDefinitionBase {
  readonly kind: 'generated';
  /**
   * Preset used by authoring tools to seed standard endpoints. The resulting
   * serialized API still stores concrete `endpoints[]` so custom endpoints can
   * live next to generated CRUD operations.
   */
  readonly preset?: AppApiGeneratedPreset;
  readonly resource?: AppApiResourceDefinition;
}

export interface AppExternalApiDefinition extends AppApiDefinitionBase {
  readonly kind: 'external';
  readonly baseUrl?: string;
  readonly openApiUrl?: string;
}

export type AppApiDefinition = AppExternalApiDefinition | AppGeneratedApiDefinition;

export type AppApiRegistry = Readonly<Record<AppApiId, AppApiDefinition>>;

export interface AppApiManifest {
  readonly apis?: AppApiRegistry;
}
