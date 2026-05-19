import { describe, expect, it } from 'bun:test';

import type {
  DataSourceConfig,
  DataSourceDiagnostic,
  GraphQlDataSourceConfig,
  ManagedApiDataSourceConfig,
  OpenApiDataSourceConfig,
  RestDataSourceConfig,
} from './index';

function assertSerializable<TValue>(value: TValue): void {
  expect(JSON.parse(JSON.stringify(value))).toEqual(value);
}

describe('data source contracts', () => {
  it('serializes a manual REST data source with read and create operations', () => {
    const source: RestDataSourceConfig = {
      id: 'cms-rest',
      kind: 'rest',
      name: 'CMS REST API',
      baseUrl: 'https://cms.example.com',
      credential: {
        id: 'cms-api-key',
        kind: 'apiKey',
        label: 'CMS API key',
      },
      schemas: {
        post: {
          type: 'object',
          required: ['id', 'title'],
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            published: { type: 'boolean', default: false },
          },
        },
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
              request: {
                parameters: [
                  {
                    name: 'limit',
                    location: 'query',
                    schema: { type: 'integer', default: 20 },
                  },
                ],
              },
              response: {
                status: 200,
                schema: {
                  type: 'array',
                  items: { ref: { id: 'post' } },
                },
              },
              pagination: {
                kind: 'limit-offset',
                limitParameter: 'limit',
                offsetParameter: 'offset',
              },
            },
            'posts.create': {
              id: 'posts.create',
              endpointId: 'posts',
              protocol: 'http',
              intent: 'create',
              method: 'POST',
              path: '/posts',
              request: {
                contentType: 'application/json',
                schema: { ref: { id: 'post' } },
              },
              response: {
                status: 201,
                schemaRef: { id: 'post' },
              },
            },
          },
        },
      },
    };

    assertSerializable(source);
    expect(source.endpoints.posts?.operations['posts.list']?.intent).toBe('read');
    expect(source.endpoints.posts?.operations['posts.create']?.intent).toBe('create');
  });

  it('serializes an imported OpenAPI data source', () => {
    const source: OpenApiDataSourceConfig = {
      id: 'shop-openapi',
      kind: 'openapi',
      name: 'Shop OpenAPI',
      baseUrl: 'https://shop.example.com/api',
      import: {
        url: 'https://shop.example.com/openapi.json',
        version: '2026-05-19',
      },
      endpoints: {
        products: {
          id: 'products',
          kind: 'http',
          path: '/products/{productId}',
          operations: {
            getProduct: {
              id: 'getProduct',
              endpointId: 'products',
              protocol: 'http',
              intent: 'read',
              method: 'GET',
              path: '/products/{productId}',
              request: {
                parameters: [
                  {
                    name: 'productId',
                    location: 'path',
                    required: true,
                    schema: { type: 'string' },
                  },
                ],
              },
              response: {
                status: 200,
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    price: { type: 'number' },
                  },
                },
              },
            },
          },
        },
      },
    };

    assertSerializable(source);
    expect(source.import?.url).toContain('openapi.json');
    expect(
      source.endpoints.products?.operations.getProduct?.request?.parameters?.[0]?.location,
    ).toBe('path');
  });

  it('serializes a GraphQL data source with query and mutation operations', () => {
    const source: GraphQlDataSourceConfig = {
      id: 'content-graphql',
      kind: 'graphql',
      endpointUrl: 'https://content.example.com/graphql',
      introspection: {
        enabled: true,
        schemaVersion: '2026-05-19',
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
              request: {
                schema: {
                  type: 'object',
                  properties: {
                    search: { type: 'string' },
                  },
                },
              },
              response: {
                schema: {
                  type: 'object',
                  properties: {
                    posts: {
                      type: 'array',
                      items: { type: 'object' },
                    },
                  },
                },
              },
            },
            CreatePost: {
              id: 'CreatePost',
              endpointId: 'graphql',
              protocol: 'graphql',
              intent: 'create',
              request: {
                schema: {
                  type: 'object',
                  required: ['title'],
                  properties: {
                    title: { type: 'string' },
                  },
                },
              },
              response: {
                schema: {
                  type: 'object',
                  properties: {
                    createPost: { type: 'object' },
                  },
                },
              },
            },
          },
        },
      },
    };

    assertSerializable(source);
    expect(source.endpoints.graphql?.operations.PostsQuery?.protocol).toBe('graphql');
    expect(source.endpoints.graphql?.operations.CreatePost?.intent).toBe('create');
  });

  it('serializes a managed API backed by a database adapter reference', () => {
    const source: ManagedApiDataSourceConfig = {
      id: 'app-managed-api',
      kind: 'managed-api',
      name: 'App managed API',
      adapter: {
        id: 'primary-db',
        kind: 'database',
        packageName: '@ankhorage/supabase-db',
      },
      resources: [
        {
          name: 'posts',
          collection: {
            name: 'posts',
            schema: 'public',
            primaryKey: 'id',
            fields: [
              { name: 'id', type: 'uuid', required: true, unique: true },
              { name: 'title', type: 'text', required: true },
              { name: 'published', type: 'boolean', defaultValue: false },
            ],
          },
          operations: ['list', 'read', 'create', 'update', 'delete'],
        },
      ],
      endpoints: {
        posts: {
          id: 'posts',
          kind: 'database',
          operations: {
            'posts.list': {
              id: 'posts.list',
              endpointId: 'posts',
              protocol: 'database',
              intent: 'read',
            },
            'posts.delete': {
              id: 'posts.delete',
              endpointId: 'posts',
              protocol: 'database',
              intent: 'delete',
            },
          },
        },
      },
    };

    assertSerializable(source);
    expect(source.adapter.kind).toBe('database');
    expect(source.resources[0]?.collection.fields.map((field) => field.name)).toEqual([
      'id',
      'title',
      'published',
    ]);
  });

  it('accepts a provider-neutral data source registry and diagnostics', () => {
    const source: DataSourceConfig = {
      id: 'public-rest',
      kind: 'rest',
      baseUrl: 'https://public.example.com',
      endpoints: {},
    };
    const diagnostic: DataSourceDiagnostic = {
      code: 'missing-operation',
      severity: 'error',
      message: 'Operation not found.',
      dataSourceId: 'public-rest',
      endpointId: 'posts',
      operationId: 'posts.list',
    };

    assertSerializable({ source, diagnostic });
    expect(diagnostic.code).toBe('missing-operation');
  });
});
