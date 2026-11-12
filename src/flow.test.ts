import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'bun:test';

import type {
  FlowApprovalRequest,
  FlowDefinition,
  FlowNodeConfig,
  FlowRunSnapshot,
  FlowSecretRef,
} from './flow.js';

type JsonRecord = Readonly<Record<string, unknown>>;

const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isString = (value: unknown): value is string => typeof value === 'string';

const isFlowFixture = (value: unknown): value is FlowDefinition => {
  if (
    !isRecord(value) ||
    !isString(value.id) ||
    !Number.isInteger(value.version) ||
    !isString(value.title)
  ) {
    return false;
  }

  return (
    Array.isArray(value.nodes) &&
    value.nodes.every(
      (node) =>
        isRecord(node) &&
        isString(node.id) &&
        isRecord(node.capability) &&
        isString(node.capability.providerId) &&
        isString(node.capability.capabilityId) &&
        Array.isArray(node.ports) &&
        node.ports.every(
          (port) =>
            isRecord(port) &&
            isString(port.id) &&
            (port.direction === 'input' || port.direction === 'output'),
        ),
    ) &&
    Array.isArray(value.edges) &&
    value.edges.every(
      (edge) =>
        isRecord(edge) &&
        isString(edge.id) &&
        isRecord(edge.source) &&
        isString(edge.source.nodeId) &&
        isString(edge.source.portId) &&
        isRecord(edge.target) &&
        isString(edge.target.nodeId) &&
        isString(edge.target.portId),
    ) &&
    Array.isArray(value.triggers) &&
    value.triggers.every(
      (trigger) => isRecord(trigger) && isString(trigger.id) && isString(trigger.kind),
    )
  );
};

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
  step: { id: 'step-compose', nodeId: 'compose', attempt: 1, runId: run.id },
  status: 'pending',
  requestedAt: '2026-11-12T09:01:00.000Z',
  context: { kind: 'artifact', artifactId: 'artifact-post' },
} as const satisfies FlowApprovalRequest;

describe('Flow contract serialization', () => {
  it('round-trips a standalone versioned workflow fixture', () => {
    const fixturePath = join(process.cwd(), 'test/flow/fixtures/versioned-workflow.json');
    const fixture = JSON.parse(readFileSync(fixturePath, 'utf8')) as unknown;

    expect(isFlowFixture(fixture)).toBe(true);
    expect(JSON.parse(JSON.stringify(fixture))).toEqual(fixture);
  });

  it('rejects malformed fixture structure independently of JSON serialization', () => {
    const malformedFixture = {
      id: 'missing-port-direction',
      version: 1,
      title: 'Malformed fixture',
      nodes: [
        {
          id: 'compose',
          capability: { providerId: '@ankhorage/flow/social', capabilityId: 'post.compose' },
          ports: [{ id: 'post', direction: 'sideways' }],
        },
      ],
      edges: [],
      triggers: [],
    };

    expect(isFlowFixture(malformedFixture)).toBe(false);
    expect(JSON.parse(JSON.stringify(malformedFixture))).toEqual(malformedFixture);
  });

  it('round-trips a versioned graph, run snapshot, and approval without runtime values', () => {
    expect(JSON.parse(JSON.stringify({ definition, run, approval }))).toEqual({
      definition,
      run,
      approval,
    });
  });
});

describe('Flow contract boundaries', () => {
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

    // @ts-expect-error Node configuration requires an explicit data or secret reference.
    const plaintextCredential: FlowNodeConfig = { credential: 'api-key' };
    expect(plaintextCredential).toBeDefined();
  });

  it('requires a JSON Pointer whenever a condition compares a port value', () => {
    // @ts-expect-error Value conditions must name an RFC 6901 JSON Pointer, including '' for root.
    const implicitRootComparison: FlowDefinition = {
      ...definition,
      edges: [
        {
          id: 'implicit-root',
          source: { nodeId: 'compose', portId: 'post' },
          target: { nodeId: 'notify', portId: 'post' },
          condition: { kind: 'value', equals: 'published' },
        },
      ],
    };
    expect(implicitRootComparison).toBeDefined();
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
