import { describe, expect, it } from 'bun:test';

import type { GeneratedApiDefinition, GeneratedApiRegistry } from './apis';
import { GENERATED_API_CRUD_OPERATIONS } from './apis';

function assertSerializable<TValue>(value: TValue): void {
  expect(JSON.parse(JSON.stringify(value))).toEqual(value);
}

function createGeneratedApi(): GeneratedApiDefinition {
  return {
    id: 'catalog-api',
    protocol: 'rest',
    name: 'Catalog API',
    description: 'Generated CRUD API for catalog resources.',
    basePath: '/api/catalog',
    database: {
      id: 'primary-db',
      kind: 'database',
      packageName: '@ankhorage/supabase-db',
    },
    auth: {
      required: true,
      roles: ['editor'],
    },
    resources: [
      {
        id: 'products',
        name: 'Products',
        path: '/products',
        collection: {
          name: 'products',
          schema: 'public',
          primaryKey: 'id',
          fields: [
            { name: 'id', type: 'uuid', required: true, unique: true },
            { name: 'name', type: 'text', required: true },
            { name: 'price', type: 'number', required: true },
          ],
        },
        operations: GENERATED_API_CRUD_OPERATIONS,
        seed: [{ id: 'product-1', name: 'Keyboard', price: 120 }],
        policies: [
          { id: 'catalog.read', operation: 'list' },
          { id: 'catalog.write', operation: 'create' },
        ],
      },
    ],
  };
}

describe('generated API desired-state contracts', () => {
  it('serializes generated REST/CRUD resources independently of runtime operations', () => {
    const api = createGeneratedApi();

    assertSerializable(api);
    expect(api.database.kind).toBe('database');
    expect(api.resources[0]?.operations).toEqual(GENERATED_API_CRUD_OPERATIONS);
    expect(api.resources[0]?.seed?.[0]?.name).toBe('Keyboard');
  });

  it('stores generated APIs in a dedicated canonical registry', () => {
    const api = createGeneratedApi();
    const registry: GeneratedApiRegistry = { [api.id]: api };

    assertSerializable(registry);
    expect(registry['catalog-api']?.protocol).toBe('rest');
  });
});
