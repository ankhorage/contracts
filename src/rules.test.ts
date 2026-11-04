import { expect, it } from 'bun:test';

import phpRuleResult from '../test/rules/fixtures/php-rule-result.json' with { type: 'json' };
import typescriptRuleResult from '../test/rules/fixtures/typescript-rule-result.json' with { type: 'json' };
import {
  phpRuleResultFixture,
  typescriptRuleResultFixture,
} from '../test/rules/ruleResultFixtures.js';
import type { FactEnvelope, GraphProjection, RuleResultDto } from './rules.js';

it('keeps PHP and TypeScript complete wire result fixtures identical and serializable', () => {
  expect(phpRuleResult).toEqual(typescriptRuleResult);
  expect(phpRuleResult).toEqual(phpRuleResultFixture);
  expect(typescriptRuleResult).toEqual(typescriptRuleResultFixture);
  expect(JSON.parse(JSON.stringify(phpRuleResultFixture))).toEqual(typescriptRuleResultFixture);
});

it('keeps missing data explicit in diagnostics, findings, and the incomplete result status', () => {
  expect(phpRuleResultFixture.status).toBe('INCOMPLETE');
  expect(phpRuleResultFixture.diagnostics).toEqual([
    {
      code: 'missing-capability',
      message: 'Rule requires unavailable viewport capture capability.',
      ruleId: 'design.color.usage-distribution',
    },
  ]);
  expect(phpRuleResultFixture.findings[0]?.evidence).toEqual({
    missing: { code: 'missing-capability', message: 'Viewport capture is unavailable.' },
    status: 'missing',
  });
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
  const result: RuleResultDto = {
    diagnostics: [],
    findings: [],
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
