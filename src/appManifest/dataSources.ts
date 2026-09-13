import { hasOnlyKeys, isRecord } from '@ankhorage/utility/object';

import {
  isAdapterRef,
  isCredentialRef,
  isDataEndpointRegistry,
  isDataSchemaRegistry,
} from './data';
import { isManifestValue } from './isManifestValue';

const DATABASE_SOURCE_KEYS = [
  'id',
  'kind',
  'name',
  'description',
  'credential',
  'adapter',
  'endpoints',
  'schemas',
  'metadata',
] as const;

export function isDataSourceRegistry(value: unknown): boolean {
  return (
    isRecord(value) &&
    Object.entries(value).every(([id, source]) => isDatabaseDataSource(source) && source.id === id)
  );
}

function isDatabaseDataSource(value: unknown): value is Record<string, unknown> {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, DATABASE_SOURCE_KEYS) &&
    typeof value.id === 'string' &&
    value.kind === 'database' &&
    (value.name === undefined || typeof value.name === 'string') &&
    (value.description === undefined || typeof value.description === 'string') &&
    (value.credential === undefined || isCredentialRef(value.credential)) &&
    isRecord(value.adapter) &&
    value.adapter.kind === 'database' &&
    isAdapterRef(value.adapter) &&
    isDataEndpointRegistry(value.endpoints) &&
    (value.schemas === undefined || isDataSchemaRegistry(value.schemas)) &&
    (value.metadata === undefined || isManifestValue(value.metadata))
  );
}
