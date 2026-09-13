import { hasOnlyKeys, isRecord } from '@ankhorage/utility/object';
import { isNonEmptyString } from '@ankhorage/utility/string';

import type { ApiDefinition, ApiDefinitionList } from '../data';
import { isCredentialRef, isDataEndpointRegistry, isDataSchemaRegistry } from './data';
import { isManifestValue } from './isManifestValue';

const API_BASE_KEYS = [
  'id',
  'origin',
  'protocol',
  'name',
  'description',
  'credential',
  'endpoints',
  'schemas',
  'metadata',
] as const;
const EXTERNAL_REST_KEYS = [...API_BASE_KEYS, 'baseUrl', 'openApi'] as const;
const EXTERNAL_GRAPHQL_KEYS = [...API_BASE_KEYS, 'endpointUrl', 'introspection'] as const;
const INTERNAL_REST_KEYS = [...API_BASE_KEYS, 'basePath'] as const;
const OPEN_API_KEYS = ['url', 'documentId', 'version'] as const;
const INTROSPECTION_KEYS = ['enabled', 'schemaVersion'] as const;

/*** Validate API definitions and require unique API identities. */
export function isApiDefinitionList(value: unknown): value is ApiDefinitionList {
  if (!Array.isArray(value) || !value.every(isApiDefinition)) return false;
  const ids = value.map((api) => api.id);
  return new Set(ids).size === ids.length;
}

/*** Validate one API definition against its origin and protocol branch. */
function isApiDefinition(value: unknown): value is ApiDefinition {
  if (!isApiBaseDefinition(value)) return false;
  if (value.origin === 'external' && value.protocol === 'rest') return isExternalRestApi(value);
  if (value.origin === 'external' && value.protocol === 'graphql') {
    return isExternalGraphQlApi(value);
  }
  if (value.origin === 'internal' && value.protocol === 'rest') return isInternalRestApi(value);
  return false;
}

/*** Validate common API identity, endpoint, schema and authored metadata fields. */
function isApiBaseDefinition(value: unknown): value is Record<string, unknown> {
  return (
    isRecord(value) &&
    isNonEmptyString(value.id) &&
    (value.origin === 'external' || value.origin === 'internal') &&
    (value.protocol === 'graphql' || value.protocol === 'rest') &&
    [value.name, value.description].every(
      (entry) => entry === undefined || typeof entry === 'string',
    ) &&
    (value.credential === undefined || isCredentialRef(value.credential)) &&
    isDataEndpointRegistry(value.endpoints) &&
    (value.schemas === undefined || isDataSchemaRegistry(value.schemas)) &&
    (value.metadata === undefined || isManifestValue(value.metadata))
  );
}

/*** Validate external REST endpoint and optional OpenAPI metadata. */
function isExternalRestApi(value: Record<string, unknown>): boolean {
  return (
    hasOnlyKeys(value, EXTERNAL_REST_KEYS) &&
    isNonEmptyString(value.baseUrl) &&
    (value.openApi === undefined || isOpenApiDocumentRef(value.openApi))
  );
}

/*** Validate external GraphQL endpoint and optional introspection metadata. */
function isExternalGraphQlApi(value: Record<string, unknown>): boolean {
  return (
    hasOnlyKeys(value, EXTERNAL_GRAPHQL_KEYS) &&
    isNonEmptyString(value.endpointUrl) &&
    (value.introspection === undefined || isGraphQlIntrospection(value.introspection))
  );
}

/*** Validate the supported internal REST API configuration. */
function isInternalRestApi(value: Record<string, unknown>): boolean {
  return hasOnlyKeys(value, INTERNAL_REST_KEYS) && isNonEmptyString(value.basePath);
}

/*** Validate optional OpenAPI document location and version fields. */
function isOpenApiDocumentRef(value: unknown): boolean {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, OPEN_API_KEYS) &&
    (value.url === undefined || typeof value.url === 'string') &&
    (value.documentId === undefined || typeof value.documentId === 'string') &&
    (value.version === undefined || typeof value.version === 'string')
  );
}

/*** Validate explicit GraphQL introspection settings. */
function isGraphQlIntrospection(value: unknown): boolean {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, INTROSPECTION_KEYS) &&
    typeof value.enabled === 'boolean' &&
    (value.schemaVersion === undefined || typeof value.schemaVersion === 'string')
  );
}
