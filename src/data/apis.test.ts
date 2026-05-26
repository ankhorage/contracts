import { describe, expect, test } from 'bun:test';

import type {
  AppApiDefinition,
  AppApiEndpointDefinition,
  AppApiManifest,
  AppGeneratedApiDefinition,
} from './apis';
import { APP_API_ENDPOINT_INTENTS, APP_API_ENDPOINT_METHODS, APP_API_KINDS } from './apis';

const crudEndpoints = [
  {
    id: 'players.list',
    method: 'GET',
    path: '/',
    intent: 'list',
  },
  {
    id: 'players.create',
    method: 'POST',
    path: '/',
    intent: 'create',
  },
  {
    id: 'players.read',
    method: 'GET',
    path: '/{id}',
    intent: 'read',
  },
  {
    id: 'players.update',
    method: 'PATCH',
    path: '/{id}',
    intent: 'update',
  },
  {
    id: 'players.delete',
    method: 'DELETE',
    path: '/{id}',
    intent: 'delete',
  },
] satisfies readonly AppApiEndpointDefinition[];

describe('app API authoring contracts', () => {
  test('exports stable API authoring constants', () => {
    expect(APP_API_KINDS).toEqual(['external', 'generated']);
    expect(APP_API_ENDPOINT_METHODS).toEqual([
      'DELETE',
      'GET',
      'HEAD',
      'OPTIONS',
      'PATCH',
      'POST',
      'PUT',
    ]);
    expect(APP_API_ENDPOINT_INTENTS).toEqual([
      'create',
      'custom',
      'delete',
      'list',
      'read',
      'update',
    ]);
  });

  test('serializes generated APIs with a CRUD preset and explicit custom endpoints', () => {
    const generatedApi: AppGeneratedApiDefinition = {
      id: 'players',
      kind: 'generated',
      label: 'Players',
      basePath: '/api/players',
      preset: 'crud',
      resource: {
        kind: 'collection',
        collection: {
          name: 'players',
          primaryKey: 'id',
          fields: [
            { name: 'id', type: 'uuid', required: true },
            { name: 'name', type: 'text', required: true },
            { name: 'score', type: 'number' },
          ],
        },
        seed: [
          {
            id: 'player-1',
            name: 'Ada',
            score: 42,
          },
        ],
      },
      endpoints: [
        ...crudEndpoints,
        {
          id: 'players.leaderboard',
          method: 'GET',
          path: '/leaderboard',
          intent: 'custom',
        },
      ],
    };
    const manifest: AppApiManifest = {
      apis: {
        players: generatedApi,
      },
    };

    expect(JSON.parse(JSON.stringify(manifest))).toEqual({
      apis: {
        players: generatedApi,
      },
    });
    expect(manifest.apis?.players?.endpoints.map((endpoint) => endpoint.path)).toEqual([
      '/',
      '/',
      '/{id}',
      '/{id}',
      '/{id}',
      '/leaderboard',
    ]);
  });

  test('serializes external APIs without generated resource definitions', () => {
    const externalApi: AppApiDefinition = {
      id: 'stripe',
      kind: 'external',
      label: 'Stripe',
      basePath: '/api/stripe',
      baseUrl: 'https://api.stripe.com',
      endpoints: [
        {
          id: 'stripe.createCheckoutSession',
          method: 'POST',
          path: '/checkout/sessions',
          intent: 'custom',
          auth: {
            required: true,
            permissions: ['payments:create'],
          },
        },
      ],
    };

    expect(JSON.parse(JSON.stringify(externalApi))).toEqual(externalApi);
  });
});
