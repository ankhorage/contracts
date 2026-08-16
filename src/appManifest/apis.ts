import type { ApiDefinition, ApiDefinitionList } from '../data';
import { isCredentialRef, isDataEndpointRegistry, isDataSchemaRegistry } from './data';
import { isManifestValue, isOptionalString, isRecord } from './shared';

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
const EXTERNAL_REST_KEYS = new Set([...API_BASE_KEYS, 'baseUrl', 'openApi']);
const EXTERNAL_GRAPHQL_KEYS = new Set([...API_BASE_KEYS, 'endpointUrl', 'introspection']);
const INTERNAL_REST_KEYS = new Set([...API_BASE_KEYS, 'basePath']);
const OPEN_API_KEYS = new Set(['url', 'documentId', 'version']);
const INTROSPECTION_KEYS = new Set(['enabled', 'schemaVersion']);

export function isApiDefinitionList(value: unknown): value is ApiDefinitionList {
  if (!Array.isArray(value) || !value.every(isApiDefinition)) return false;
  const ids = value.map((api) => api.id);
  return new Set(ids).size === ids.length;
}

function isApiDefinition(value: unknown): value is ApiDefinition {
  if (!isApiBaseDefinition(value)) return false;
  if (value.origin === 'external' && value.protocol === 'rest') return isExternalRestApi(value);
  if (value.origin === 'external' && value.protocol === 'graphql') {
    return isExternalGraphQlApi(value);
  }
  if (value.origin === 'internal' && value.protocol === 'rest') return isInternalRestApi(value);
  return false;
}

function isApiBaseDefinition(value: unknown): value is Record<string, unknown> {
  return (
    isRecord(value) &&
    isNonEmptyString(value.id) &&
    (value.origin === 'external' || value.origin === 'internal') &&
    (value.protocol === 'graphql' || value.protocol === 'rest') &&
    isOptionalString(value.name) &&
    isOptionalString(value.description) &&
    (value.credential === undefined || isCredentialRef(value.credential)) &&
    isDataEndpointRegistry(value.endpoints) &&
    (value.schemas === undefined || isDataSchemaRegistry(value.schemas)) &&
    (value.metadata === undefined || isManifestValue(value.metadata))
  );
}

function isExternalRestApi(value: Record<string, unknown>): boolean {
  return (
    hasOnlyKeys(value, EXTERNAL_REST_KEYS) &&
    isNonEmptyString(value.baseUrl) &&
    (value.openApi === undefined || isOpenApiDocumentRef(value.openApi))
  );
}

function isExternalGraphQlApi(value: Record<string, unknown>): boolean {
  return (
    hasOnlyKeys(value, EXTERNAL_GRAPHQL_KEYS) &&
    isNonEmptyString(value.endpointUrl) &&
    (value.introspection === undefined || isGraphQlIntrospection(value.introspection))
  );
}

function isInternalRestApi(value: Record<string, unknown>): boolean {
  return hasOnlyKeys(value, INTERNAL_REST_KEYS) && isNonEmptyString(value.basePath);
}

function isOpenApiDocumentRef(value: unknown): boolean {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, OPEN_API_KEYS) &&
    isOptionalString(value.url) &&
    isOptionalString(value.documentId) &&
    isOptionalString(value.version)
  );
}

function isGraphQlIntrospection(value: unknown): boolean {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, INTROSPECTION_KEYS) &&
    typeof value.enabled === 'boolean' &&
    isOptionalString(value.schemaVersion)
  );
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function hasOnlyKeys(value: Record<string, unknown>, allowed: ReadonlySet<string>): boolean {
  return Object.keys(value).every((key) => allowed.has(key));
}
