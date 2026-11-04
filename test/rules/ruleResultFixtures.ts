import type { RuleResultDto } from '../../src/rules.js';

export const phpRuleResultFixture = {
  diagnostics: [
    {
      code: 'missing-capability',
      message: 'Rule requires unavailable viewport capture capability.',
      ruleId: 'design.color.usage-distribution',
    },
  ],
  findings: [
    {
      evidence: {
        missing: { code: 'missing-capability', message: 'Viewport capture is unavailable.' },
        status: 'missing',
      },
      message: 'Cannot evaluate the viewport color distribution without a viewport sample.',
      ruleId: 'design.color.usage-distribution',
      severity: 'warning',
      sourceLocation: { line: 1, path: 'https://example.test/' },
      subjects: [{ id: 'page:home:desktop', kind: 'page' }],
    },
  ],
  resultHash: 'sha256:result-4e01',
  rule: { id: 'design.color.usage-distribution', version: '1.0.0' },
  schemaVersion: 1,
  scope: {
    id: 'page:home:desktop',
    kind: 'page',
    target: {
      kind: 'site',
      projectId: 'project-example',
      targetId: 'https://example.test/',
      tenantId: 'tenant-example',
    },
  },
  status: 'INCOMPLETE',
} satisfies RuleResultDto;

export const typescriptRuleResultFixture = {
  ...phpRuleResultFixture,
  diagnostics: [...phpRuleResultFixture.diagnostics],
  findings: [...phpRuleResultFixture.findings],
} satisfies RuleResultDto;
