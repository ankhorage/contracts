import {
  isManifestValue,
  isOptionalBoolean,
  isOptionalString,
  isRecord,
  isStringArray,
} from './shared';

export function isGeneratedApiRegistry(value: unknown): boolean {
  return isRecord(value) && Object.values(value).every(isGeneratedApiDefinition);
}

function isGeneratedApiDefinition(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    value.protocol === 'rest' &&
    isOptionalString(value.name) &&
    isOptionalString(value.description) &&
    typeof value.basePath === 'string' &&
    isDatabaseAdapterRef(value.database) &&
    Array.isArray(value.resources) &&
    value.resources.every(isGeneratedApiResourceDefinition) &&
    (value.auth === undefined || isGeneratedApiAuthRequirement(value.auth)) &&
    (value.metadata === undefined || isManifestValue(value.metadata))
  );
}

function isDatabaseAdapterRef(value: unknown): boolean {
  return isRecord(value) && value.kind === 'database' && isAdapterRef(value);
}

function isGeneratedApiAuthRequirement(value: unknown): boolean {
  return (
    isRecord(value) &&
    isOptionalBoolean(value.required) &&
    (value.roles === undefined || isStringArray(value.roles)) &&
    (value.permissions === undefined || isStringArray(value.permissions)) &&
    isOptionalString(value.policy) &&
    (value.metadata === undefined || isManifestValue(value.metadata))
  );
}

function isGeneratedApiResourceDefinition(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    isOptionalString(value.name) &&
    isOptionalString(value.description) &&
    typeof value.path === 'string' &&
    isDbCollectionDefinition(value.collection) &&
    Array.isArray(value.operations) &&
    value.operations.every(isGeneratedApiCrudOperation) &&
    (value.seed === undefined || isSeedRecords(value.seed)) &&
    (value.policies === undefined ||
      (Array.isArray(value.policies) && value.policies.every(isGeneratedApiPolicyRef))) &&
    (value.metadata === undefined || isManifestValue(value.metadata))
  );
}

function isSeedRecords(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.every((record) => isRecord(record) && Object.values(record).every(isManifestValue))
  );
}

function isGeneratedApiCrudOperation(value: unknown): boolean {
  return ['create', 'delete', 'list', 'read', 'update'].includes(String(value));
}

function isGeneratedApiPolicyRef(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    (value.operation === undefined || isGeneratedApiCrudOperation(value.operation))
  );
}

function isDbCollectionDefinition(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.name === 'string' &&
    isOptionalString(value.schema) &&
    Array.isArray(value.fields) &&
    value.fields.every(isDbFieldDefinition) &&
    isOptionalString(value.primaryKey)
  );
}

function isDbFieldDefinition(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.name === 'string' &&
    typeof value.type === 'string' &&
    ['text', 'number', 'boolean', 'datetime', 'json', 'uuid'].includes(value.type) &&
    isOptionalBoolean(value.required) &&
    isOptionalBoolean(value.unique) &&
    isDbDefaultValue(value.defaultValue)
  );
}

function isDbDefaultValue(value: unknown): boolean {
  return (
    value === undefined ||
    value === null ||
    typeof value === 'boolean' ||
    typeof value === 'number' ||
    typeof value === 'string'
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
