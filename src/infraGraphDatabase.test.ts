import { expect, it } from 'bun:test';

import {
  INFRA_ADAPTER_CATALOG,
  type InfraEnvironmentSpec,
  isInfraEnvironmentSpec,
  validateInfraAdapterSelection,
} from './infra';

const deployment = {
  compute: { provider: 'local' },
  runtime: { provider: 'minikube' },
} as const;
const credentials = {
  source: 'secret-store',
  projectId: 'acquisition',
  environment: 'production',
  ref: 'graph/default',
  key: 'credentials',
} as const;

it('selects the canonical graph database adapter independently from relational services', () => {
  const environment = {
    deployment: { compute: { provider: 'local' }, runtime: { provider: 'minikube' } },
    graphDatabase: {
      provider: 'neptune',
      endpoint: 'bolt://cluster.neptune.amazonaws.com:8182',
      credentials: {
        source: 'secret-store',
        projectId: 'acquisition',
        environment: 'local',
        ref: 'graph/neptune',
        key: 'credentials',
      },
    },
  } as const satisfies InfraEnvironmentSpec;
  const result = validateInfraAdapterSelection(environment, [
    INFRA_ADAPTER_CATALOG.local,
    INFRA_ADAPTER_CATALOG.minikube,
    INFRA_ADAPTER_CATALOG.neptune,
  ]);
  expect(result.ok).toBe(true);
  if (!result.ok) throw new Error('Expected Neptune adapter selection.');
  expect(result.value).toContain(INFRA_ADAPTER_CATALOG.neptune);
});

it.each([
  'https://cluster.neptune.amazonaws.com:8182/gremlin',
  'bolt://cluster.example.com:7687',
  'bolt+s://cluster.example.com:7687',
  'bolt+ssc://cluster.example.com:7687',
  'neo4j://cluster.example.com:7687',
  'neo4j+s://cluster.example.com:7687',
  'neo4j+ssc://cluster.example.com:7687',
])('accepts a supported credential-free graph endpoint: %s', (endpoint) => {
  expect(
    isInfraEnvironmentSpec({
      deployment,
      graphDatabase: { provider: 'neptune', endpoint, credentials },
    }),
  ).toBe(true);
});

it.each([
  'ftp://cluster.example.com:7687',
  'postgres://cluster.example.com:5432',
  'not a URL',
  'bolt://',
  'bolt://cluster.example.com:invalid',
  'bolt://user:password@cluster.example.com:7687',
  'bolt://user@cluster.example.com:7687',
  'https://cluster.example.com:8182/gremlin?access_token=secret',
  'https://cluster.example.com:8182/gremlin#token=secret',
])('rejects malformed or credential-bearing graph endpoint: %s', (endpoint) => {
  expect(
    isInfraEnvironmentSpec({
      deployment,
      graphDatabase: { provider: 'neo4j', endpoint, credentials },
    }),
  ).toBe(false);
});
