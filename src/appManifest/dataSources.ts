import {
  isManifestValue,
  isOptionalBoolean,
  isOptionalString,
  isRecord,
} from './shared';

export function isDataSourceRegistry(value: unknown): boolean {
  return isRecord(value) && Object.values(value).every(isDataSourceConfig);
}

function isDataSourceConfig(value: unknown): boolean {
  if (!hasBaseDataSourceShape(value)) return false;
  if (value.kind === 'database') return isDatabaseDataSource(value);
  if (value.origin === 'generated') return isGeneratedDataSource(value);
  if (value.origin !== 'external') return false;
  return isExternalDataSource(value);
}

function hasBaseDataSourceShape(value: unknown): value is Record<string, unknown> {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    (value.kind === 'api' || value.kind === 'database') &&
    isOptionalString(value.name) &&
    isOptionalString(value.description) &&
    (value.credential === undefined || isCredentialRef(value.credential)) &&
    isDataEndpointRegistry(value.endpoints) &&
    (value.schemas === undefined || isRecord(value.schemas)) &&
    (value.metadata === undefined || isManifestValue(value.metadata))
  );
}

function isDatabaseDataSource(value: Record<string, unknown>): boolean {
  return isRecord(value.adapter) && value.adapter.kind === 'database' && isAdapterRef(value.adapter);
}

function isGeneratedDataSource(value: Record<string, unknown>): boolean {
  return (
    value.protocol === 'rest' &&
    typeof value.generatedApiId === 'string' &&
    isRecord(value.adapter) &&
    value.adapter.kind === 'database' &&
    isAdapterRef(value.adapter)
  );
}

function isExternalDataSource(value: Record<string, unknown>): boolean {
  if (value.protocol === 'rest') {
    return (
      typeof value.baseUrl === 'string' &&
      (value.openApi === undefined || isOpenApiDocumentRef(value.openApi))
    );
  }

  if (value.protocol === 'graphql') {
    return (
      typeof value.endpointUrl === 'string' &&
      (value.introspection === undefined || isGraphQlIntrospection(value.introspection))
    );
  }

  return false;
}

function isOpenApiDocumentRef(value: unknown): boolean {
  return (
    isRecord(value) &&
    isOptionalString(value.url) &&
    isOptionalString(value.documentId) &&
    isOptionalString(value.version)
  );
}

function isGraphQlIntrospection(value: unknown): boolean {
  return isRecord(value) && typeof value.enabled === 'boolean' && isOptionalString(value.schemaVersion);
}

function isDataEndpointRegistry(value: unknown): boolean {
  return isRecord(value) && Object.values(value).every(isDataEndpointConfig);
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
    ['action', 'create', 'delete', 'read', 'update'].includes(value.intent) &&
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
    ['body', 'cookie', 'header', 'path', 'query'].includes(value.location) &&
    isOptionalBoolean(value.required) &&
    isOptionalString(value.description) &&
    (value.default === undefined || isManifestValue(value.default))
  );
}

function isDataOperationResponse(value: unknown): boolean {
  return (
    isRecord(value) &&
    isDataSchemaSlot(value) &&
    (value.status === undefined || typeof value.status === 'string' || typeof value.status === 'number') &&
    isOptionalString(value.contentType) &&
    isOptionalString(value.description)
  );
}

function isDataSchemaSlot(value: unknown): boolean {
  return isRecord(value) && (value.schema === undefined || isRecord(value.schema));
}

function isCredentialRef(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.kind === 'string' &&
    isOptionalString(value.label) &&
    isOptionalString(value.scope)
  );
}

function isAdapterRef(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.kind === 'string' &&
    isOptionalString(value.packageName) &&
    isOptionalString(value.exportName) &&
    (value.config === undefined || isManifestValue(value.config))
  );
}
