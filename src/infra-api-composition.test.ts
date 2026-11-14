import { describe, expect, it } from 'bun:test';

import { isInfraWorkloadSpec } from './infra';

describe('Infra workload API composition', () => {
  it('declares served APIs without selecting a transport or handler', () => {
    const workload = {
      id: 'api',
      artifact: { kind: 'image', image: 'example/api@sha256:abc' },
      apis: { apiIds: { projects: true } },
    };

    expect(isInfraWorkloadSpec(workload)).toBe(true);
    expect(
      isInfraWorkloadSpec({
        ...workload,
        apis: { apiIds: { projects: true }, transport: 'fastify' },
      }),
    ).toBe(false);
  });
});
