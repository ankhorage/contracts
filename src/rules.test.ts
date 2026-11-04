import { expect, it } from 'bun:test';

import phpRuleResult from './fixtures/rules/php-rule-result.json' with { type: 'json' };
import typescriptRuleResult from './fixtures/rules/typescript-rule-result.json' with { type: 'json' };
import type { FactEnvelope, GraphProjection, RuleResult } from './rules.js';

it('keeps PHP and TypeScript rule-result fixtures identical and serializable', () => {
  expect(phpRuleResult).toEqual(typescriptRuleResult);
  expect(JSON.parse(JSON.stringify(phpRuleResult))).toEqual(typescriptRuleResult);
  expect(phpRuleResult.status).toBe('INCOMPLETE');
  expect(phpRuleResult.evidence.map((evidence) => evidence.status)).toEqual([
    'available',
    'missing',
  ]);
});

it('keeps available and missing facts explicit in a graph-ready rule result', () => {
  const availableFact: FactEnvelope = {
    contentHash: 'sha256:fact-4e01',
    id: 'painted-area',
    kind: 'rendered-area',
    provenance: {
      collectedAt: '2026-11-04T10:15:00.000Z',
      producer: { id: 'ankhorage.studio', version: '1.0.0' },
      source: { id: 'project-example', revision: null },
    },
    schemaVersion: 1,
    scope: phpRuleResult.scope,
    status: 'available',
    value: { pixels: 240000 },
  };
  const missingFact: FactEnvelope = {
    contentHash: 'sha256:fact-4e02',
    id: 'viewport-sample',
    kind: 'viewport',
    missing: { code: 'missing-capability', message: 'Viewport capture is unavailable.' },
    provenance: availableFact.provenance,
    schemaVersion: 1,
    scope: availableFact.scope,
    status: 'missing',
  };
  const result: RuleResult = {
    diagnostics: [],
    evidence: [],
    resultHash: 'sha256:result-4e01',
    rule: { id: 'design.color.usage-distribution', version: '1.0.0' },
    schemaVersion: 1,
    scope: availableFact.scope,
    status: 'INCOMPLETE',
  };
  const projection: GraphProjection = {
    edges: [],
    nodes: [{ id: 'design.color.usage-distribution', result }],
    projectionHash: 'sha256:projection-4e01',
    schemaVersion: 1,
    scope: availableFact.scope,
  };

  expect(JSON.parse(JSON.stringify({ availableFact, missingFact, projection }))).toEqual({
    availableFact,
    missingFact,
    projection,
  });
});
