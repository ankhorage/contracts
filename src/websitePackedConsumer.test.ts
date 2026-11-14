import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from 'bun:test';

const packageRoot = process.cwd();
const temporaryCacheDirectory = join(tmpdir(), 'contracts-website-consumer-cache');

const runCommand = (command: string[], cwd: string): string => {
  const result = Bun.spawnSync(command, {
    cwd,
    env: {
      ...process.env,
      BUN_INSTALL_CACHE_DIR: temporaryCacheDirectory,
      npm_config_cache: temporaryCacheDirectory,
    },
  });
  const output = `${result.stdout.toString()}${result.stderr.toString()}`;

  expect(result.exitCode, output).toBe(0);
  return output;
};

const writeConsumerFiles = (consumerDirectory: string): void => {
  writeFileSync(
    join(consumerDirectory, 'consumer.mjs'),
    [
      "import {} from '@ankhorage/contracts/website';",
      "console.log('published website contract is available');",
    ].join('\n'),
  );
  writeFileSync(
    join(consumerDirectory, 'consumer.ts'),
    [
      "import type { WebsiteAnimationEvidence, WebsiteNodeObservation } from '@ankhorage/contracts/website';",
      "const schemaV1Observation: WebsiteNodeObservation = { viewportId: 'desktop', stateId: 'default', availability: { status: 'available', missing: null }, rect: null, css: null, provenance: { sourceUrl: 'https://example.test/', capturedAt: '2026-11-10T00:00:00.000Z', method: 'browser' } };",
      "const observation: WebsiteNodeObservation = { viewportId: 'desktop', stateId: 'settled', availability: { status: 'available', missing: null }, semanticAttributes: { 'aria-valuenow': '72', value: 0 }, rect: null, css: null, provenance: { sourceUrl: 'https://example.test/', capturedAt: '2026-11-13T00:00:00.000Z', method: 'browser' } };",
      "const animationEvidence: WebsiteAnimationEvidence = { trigger: 'scroll-into-view', target: { animation: { availability: { status: 'available', missing: null }, value: 'none' }, transform: { availability: { status: 'available', missing: null }, value: 'matrix(1, 0, 0, 1, 0, 0)' }, transition: { availability: { status: 'available', missing: null }, value: 'width 80ms linear' } }, pseudoElements: [], uncertainty: [] };",
      'void schemaV1Observation;',
      'void observation;',
      'void animationEvidence;',
    ].join('\n'),
  );
};

const packAndInstall = (consumerDirectory: string, packedDirectory: string): void => {
  runCommand(['bun', 'run', 'build'], packageRoot);
  runCommand(
    ['npm', 'pack', '--ignore-scripts', '--pack-destination', packedDirectory],
    packageRoot,
  );

  const archiveName = readdirSync(packedDirectory).find((entry) => entry.endsWith('.tgz'));
  expect(archiveName).toBeDefined();
  runCommand(
    ['bun', 'add', '--ignore-scripts', join(packedDirectory, archiveName ?? 'missing.tgz')],
    consumerDirectory,
  );
};

const verifyConsumer = (consumerDirectory: string): void => {
  runCommand(['node', 'consumer.mjs'], consumerDirectory);
  runCommand(['bun', 'consumer.mjs'], consumerDirectory);
  runCommand(
    [
      join(packageRoot, 'node_modules/.bin/tsc'),
      '--noEmit',
      '--module',
      'NodeNext',
      '--moduleResolution',
      'NodeNext',
      '--target',
      'ES2022',
      '--skipLibCheck',
      'consumer.ts',
    ],
    consumerDirectory,
  );
};

describe('packed Website consumer', () => {
  it('supports native Node ESM, Bun, and public declarations', () => {
    const temporaryDirectory = mkdtempSync(join(tmpdir(), 'contracts-website-consumer-'));
    const consumerDirectory = join(temporaryDirectory, 'package');
    const packedDirectory = join(temporaryDirectory, 'packed');

    try {
      mkdirSync(consumerDirectory);
      mkdirSync(packedDirectory);
      writeFileSync(
        join(consumerDirectory, 'package.json'),
        JSON.stringify({ name: 'contracts-website-consumer', private: true, type: 'module' }),
      );
      writeConsumerFiles(consumerDirectory);
      packAndInstall(consumerDirectory, packedDirectory);
      verifyConsumer(consumerDirectory);
    } finally {
      rmSync(temporaryDirectory, { force: true, recursive: true });
    }
  });
});
