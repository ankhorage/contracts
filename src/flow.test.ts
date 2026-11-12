import { describe, expect, it } from 'bun:test';

import type {
  FlowApprovalRequest,
  FlowDefinition,
  FlowRunSnapshot,
  FlowSecretRef,
} from './flow.js';

const definition = {
  id: 'social-publish',
  version: 3,
  title: 'Publish approved social media',
  nodes: [
    {
      id: 'compose',
      capability: { providerId: '@ankhorage/flow/social', capabilityId: 'post.compose' },
      config: {
        audience: { kind: 'inline', value: { segment: 'subscribers' } },
        credential: { kind: 'secret', ref: 'flow/social/publisher' },
      },
      ports: [
        { id: 'draft', direction: 'input', required: true, data: { schema: { type: 'object' } } },
        { id: 'post', direction: 'output', data: { schema: { type: 'object' } } },
      ],
    },
    {
      id: 'notify',
      capability: { providerId: '@ankhorage/flow/social', capabilityId: 'notification.send' },
      ports: [{ id: 'post', direction: 'input', required: true }],
    },
  ],
  edges: [
    {
      id: 'notify-success',
      source: { nodeId: 'compose', portId: 'post' },
      target: { nodeId: 'notify', portId: 'post' },
      condition: { kind: 'outcome', outcome: 'success' },
    },
  ],
  triggers: [{ id: 'manual', kind: 'manual' }],
} as const satisfies FlowDefinition;

const run = {
  id: 'run-42',
  flow: { id: definition.id, version: definition.version },
  status: 'waiting_for_approval',
  trigger: { triggerId: 'manual', kind: 'manual' },
  createdAt: '2026-11-12T09:00:00.000Z',
  steps: [
    {
      id: 'step-compose',
      nodeId: 'compose',
      status: 'succeeded',
      attempt: 1,
      output: {
        post: { kind: 'artifact', artifactId: 'artifact-post', mediaType: 'application/json' },
      },
    },
  ],
} as const satisfies FlowRunSnapshot;

const approval = {
  id: 'approval-7',
  runId: run.id,
  stepId: 'step-compose',
  status: 'pending',
  requestedAt: '2026-11-12T09:01:00.000Z',
  context: { kind: 'artifact', artifactId: 'artifact-post' },
} as const satisfies FlowApprovalRequest;

describe('Flow contracts', () => {
  it('round-trips a versioned graph, run snapshot, and approval without runtime values', () => {
    expect(JSON.parse(JSON.stringify({ definition, run, approval }))).toEqual({
      definition,
      run,
      approval,
    });
  });

  it('accepts secret references but excludes inline secret material from their contract', () => {
    const secret = {
      kind: 'secret',
      ref: 'flow/social/publisher',
    } as const satisfies FlowSecretRef;

    expect(JSON.parse(JSON.stringify(secret))).toEqual(secret);
    // @ts-expect-error Flow secret references must not carry secret material.
    const inlineSecret: FlowSecretRef = {
      kind: 'secret',
      ref: 'flow/social/publisher',
      value: 'secret',
    };
    expect(inlineSecret).toBeDefined();
  });

  it('keeps node ports directional and edge endpoints precise', () => {
    // @ts-expect-error Edges may only originate at a named port.
    const incompleteEdge: FlowDefinition = {
      ...definition,
      edges: [
        {
          id: 'missing-port',
          source: { nodeId: 'compose' },
          target: { nodeId: 'notify', portId: 'post' },
        },
      ],
    };
    expect(incompleteEdge).toBeDefined();
  });
});
