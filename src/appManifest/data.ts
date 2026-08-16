import {
  isManifestValue,
  isOptionalBoolean,
  isOptionalString,
  isRecord,
  isStringArray,
} from './shared';

const DATA_SCHEMA_TYPES = new Set([
  'array',
  'boolean',
  'integer',
  'null',
  'number',
  'object',
  'string',
]);
const OPERATION_INTENTS = new Set(['action', 'create', 'delete', 'read', 'update']);
const PARAMETER_LOCATIONS = new Set(['body', 'cookie', 'header', 'path', 'query']);

export function isDataEndpointRegistry(value: unknown): boolean {
  return isRecord(value) && Object.values(value).every(isDataEndpointConfig);
}

export function isDataSchemaRegistry(value: unknown): boolean {
  return isRecord(value) && Object.values(value).every(isDataSchema);
}

export function isCredentialRef(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.kind === 'string' &&
    isOptionalString(value.label) &&
    isOptionalString(value.scope)
  );
}

export function isAdapterRef(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.kind === 'string' &&
    isOptionalString(value.packageName) &&
    isOptionalString(value.exportName) &&
    (value.config === undefined || isManifestValue(value.config))
  );
}

function isDataEndpointConfig(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.kind === 'string' &&
    isOptionalString(value.name) &&
    isOptionalString(value.description) &&
    isOptionalString(value.baseUrl) &&
    isOptionalString(value.path) &&
    (value.credential === undefined || isCredentialRef(value.credential)) &&
    isRecord(value.operations) &&
    Object.values(value.operations).every(isDataOperationConfig) &&
    (value.metadata === undefined || isManifestValue(value.metadata))
  );
}

function isDataOperationConfig(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    isOptionalString(value.endpointId) &&
    isOptionalString(value.name) &&
    isOptionalString(value.description) &&
    typeof value.protocol === 'string' &&
    typeof value.intent === 'string' &&
    OPERATION_INTENTS.has(value.intent) &&
    isOptionalString(value.method) &&
    isOptionalString(value.path) &&
    (value.request === undefined || isDataOperationRequest(value.request)) &&
    (value.response === undefined || isDataOperationResponse(value.response)) &&
    (value.pagination === undefined || isRecord(value.pagination)) &&
    (value.credential === undefined || isCredentialRef(value.credential)) &&
    (value.metadata === undefined || isManifestValue(value.metadata))
  );
}

function isDataOperationRequest(value: unknown): boolean {
  return (
    isRecord(value) &&
    isDataSchemaSlot(value) &&
    isOptionalString(value.contentType) &&
    (value.parameters === undefined ||
      (Array.isArray(value.parameters) && value.parameters.every(isDataOperationParameter)))
  );
}

function isDataOperationParameter(value: unknown): boolean {
  return (
    isRecord(value) &&
    isDataSchemaSlot(value) &&
    typeof value.name === 'string' &&
    typeof value.location === 'string' &&
    PARAMETER_LOCATIONS.has(value.location) &&
    isOptionalBoolean(value.required) &&
    isOptionalString(value.description) &&
    (value.default === undefined || isManifestValue(value.default))
  );
}

function isDataOperationResponse(value: unknown): boolean {
  return (
    isRecord(value) &&
    isDataSchemaSlot(value) &&
    (value.status === undefined ||
      typeof value.status === 'string' ||
      typeof value.status === 'number') &&
    isOptionalString(value.contentType) &&
    isOptionalString(value.description)
  );
}

function isDataSchemaSlot(value: Record<string, unknown>): boolean {
  return (
    (value.schema === undefined || isDataSchema(value.schema)) &&
    (value.schemaRef === undefined || isDataSchemaRef(value.schemaRef))
  );
}

function isDataSchema(value: unknown): boolean {
  if (!isRecord(value) || !isDataSchemaType(value.type)) return false;
  if (!isOptionalSchemaScalars(value)) return false;
  if (!isOptionalSchemaCollections(value)) return false;
  return isOptionalSchemaComposition(value);
}

function isDataSchemaType(value: unknown): boolean {
  if (value === undefined) return true;
  if (typeof value === 'string') return DATA_SCHEMA_TYPES.has(value);
  return (
    Array.isArray(value) &&
    value.every((entry) => typeof entry === 'string' && DATA_SCHEMA_TYPES.has(entry))
  );
}

function isOptionalSchemaScalars(value: Record<string, unknown>): boolean {
  return (
    isOptionalString(value.title) &&
    isOptionalString(value.description) &&
    isOptionalString(value.format) &&
    isOptionalBoolean(value.nullable) &&
    (value.const === undefined || isManifestValue(value.const)) &&
    (value.default === undefined || isManifestValue(value.default)) &&
    (value.enum === undefined ||
      (Array.isArray(value.enum) && value.enum.every(isManifestValue))) &&
    (value.ref === undefined || isDataSchemaRef(value.ref))
  );
}

function isOptionalSchemaCollections(value: Record<string, unknown>): boolean {
  return (
    (value.required === undefined || isStringArray(value.required)) &&
    (value.properties === undefined ||
      (isRecord(value.properties) && Object.values(value.properties).every(isDataSchema))) &&
    (value.additionalProperties === undefined ||
      typeof value.additionalProperties === 'boolean' ||
      isDataSchema(value.additionalProperties)) &&
    (value.items === undefined || isDataSchema(value.items))
  );
}

function isOptionalSchemaComposition(value: Record<string, unknown>): boolean {
  return ['allOf', 'anyOf', 'oneOf'].every((key) => {
    const entry = value[key];
    return entry === undefined || (Array.isArray(entry) && entry.every(isDataSchema));
  });
}

function isDataSchemaRef(value: unknown): boolean {
  return isRecord(value) && typeof value.id === 'string';
}
