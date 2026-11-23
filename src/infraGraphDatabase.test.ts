import { expect, it } from 'bun:test';

import {
  INFRA_ADAPTER_CATALOG,
  type InfraEnvironmentSpec,
  validateInfraAdapterSelection,
} from './infra';

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
