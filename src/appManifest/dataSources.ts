import {
  isAdapterRef,
  isCredentialRef,
  isDataEndpointRegistry,
  isDataSchemaRegistry,
} from './data';
import { isManifestValue, isOptionalString, isRecord } from './shared';

const DATABASE_SOURCE_KEYS = new Set([
  'id',
  'kind',
  'name',
  'description',
  'credential',
  'adapter',
  'endpoints',
  'schemas',
  'metadata',
]);

export function isDataSourceRegistry(value: unknown): boolean {
  return (
    isRecord(value) &&
    Object.entries(value).every(
      ([id, source]) => isDatabaseDataSource(source) && source.id === id,
    )
  );
}

function isDatabaseDataSource(value: unknown): value is Record<string, unknown> {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, DATABASE_SOURCE_KEYS) &&
    typeof value.id === 'string' &&
    value.kind === 'database' &&
    isOptionalString(value.name) &&
    isOptionalString(value.description) &&
    (value.credential === undefined || isCredentialRef(value.credential)) &&
    isRecord(value.adapter) &&
    value.adapter.kind === 'database' &&
    isAdapterRef(value.adapter) &&
    isDataEndpointRegistry(value.endpoints) &&
    (value.schemas === undefined || isDataSchemaRegistry(value.schemas)) &&
    (value.metadata === undefined || isManifestValue(value.metadata))
  );
}

function hasOnlyKeys(value: Record<string, unknown>, allowed: ReadonlySet<string>): boolean {
  return Object.keys(value).every((key) => allowed.has(key));
}
