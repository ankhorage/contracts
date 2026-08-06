import { describe, expect, it } from 'bun:test';

import type {
  DataSourceConfig,
  DataSourceDiagnostic,
  DatabaseDataSourceConfig,
  ExternalGraphQlApiDataSourceConfig,
  ExternalRestApiDataSourceConfig,
  GeneratedRestApiDataSourceConfig,
} from './index';

function assertSerializable<TValue>(value: TValue): void {
  expect(JSON.parse(JSON.stringify(value))).toEqual(value);
}

describe('data source contracts', () => {
  it('serializes an external REST API with manual operations', () => {
    const source: ExternalRestApiDataSourceConfig = {
      id: 'cms-rest',
      kind: 'api',
      origin: 'external',
      protocol: 'rest',
      name: 'CMS REST API',
      baseUrl: 'https://cms.example.com',
      credential: {
        id: 'cms-api-key',
        kind: 'apiKey',
        label: 'CMS API key',
      },
      endpoints: {
        posts: {
          id: 'posts',
          kind: 'http',
          path: '/posts',
          operations: {
            'posts.list': {
              id: 'posts.list',
              endpointId: 'posts',
              protocol: 'http',
              intent: 'read',
              method: 'GET',
              path: '/posts',
            },
          },
        },
      },
    };

    assertSerializable(source);
    expect(source.endpoints.posts?.operations['posts.list']?.intent).toBe('read');
  });

  it('models OpenAPI as optional metadata on an external REST API', () => {
    const source: ExternalRestApiDataSourceConfig = {
      id: 'shop-api',
      kind: 'api',
      origin: 'external',
      protocol: 'rest',
      name: 'Shop API',
      baseUrl: 'https://shop.example.com/api',
      openApi: {
        url: 'https://shop.example.com/openapi.json',
        version: '2026-08-06',
      },
      endpoints: {},
    };

    assertSerializable(source);
    expect(source.openApi?.url).toContain('openapi.json');
    expect(source.kind).toBe('api');
  });

  it('serializes an external GraphQL API independently of origin', () => {
    const source: ExternalGraphQlApiDataSourceConfig = {
      id: 'content-graphql',
      kind: 'api',
      origin: 'external',
      protocol: 'graphql',
      endpointUrl: 'https://content.example.com/graphql',
      introspection: {
        enabled: true,
        schemaVersion: '2026-08-06',
      },
      endpoints: {
        graphql: {
          id: 'graphql',
          kind: 'graphql',
          operations: {
            PostsQuery: {
              id: 'PostsQuery',
              endpointId: 'graphql',
              protocol: 'graphql',
              intent: 'read',
            },
          },
        },
      },
    };

    assertSerializable(source);
    expect(source.protocol).toBe('graphql');
    expect(source.endpoints.graphql?.operations.PostsQuery?.intent).toBe('read');
  });

  it('serializes a normalized generated REST API projection', () => {
    const source: GeneratedRestApiDataSourceConfig = {
      id: 'catalog-api',
      kind: 'api',
      origin: 'generated',
      protocol: 'rest',
      generatedApiId: 'catalog-api',
      name: 'Catalog API',
      adapter: {
        id: 'primary-db',
        kind: 'database',
        packageName: '@ankhorage/supabase-db',
      },
      schemas: {
        products: {
          type: 'object',
          required: ['id', 'name'],
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
          },
        },
      },
      endpoints: {
        products: {
          id: 'products',
          kind: 'database',
          path: '/products',
          operations: {
            'products.list': {
              id: 'products.list',
              endpointId: 'products',
              protocol: 'database',
              intent: 'read',
            },
            'products.create': {
              id: 'products.create',
              endpointId: 'products',
              protocol: 'database',
              intent: 'create',
            },
          },
        },
      },
    };

    assertSerializable(source);
    expect(source.adapter.kind).toBe('database');
    expect(source.origin).toBe('generated');
    expect(source.endpoints.products?.operations['products.create']?.intent).toBe('create');
  });

  it('keeps database sources separate from API origin and protocol', () => {
    const source: DatabaseDataSourceConfig = {
      id: 'primary-db',
      kind: 'database',
      adapter: { id: 'supabase-db', kind: 'database' },
      endpoints: {},
    };

    assertSerializable(source);
    expect(source.kind).toBe('database');
  });

  it('accepts a provider-neutral source union and diagnostics', () => {
    const source: DataSourceConfig = {
      id: 'public-api',
      kind: 'api',
      origin: 'external',
      protocol: 'rest',
      baseUrl: 'https://public.example.com',
      endpoints: {},
    };
    const diagnostic: DataSourceDiagnostic = {
      code: 'missing-operation',
      severity: 'error',
      message: 'Operation not found.',
      dataSourceId: 'public-api',
      endpointId: 'posts',
      operationId: 'posts.list',
    };

    assertSerializable({ source, diagnostic });
    expect(diagnostic.code).toBe('missing-operation');
  });
});
