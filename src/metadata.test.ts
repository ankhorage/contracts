import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'bun:test';

import type { RepositoryMetadata } from './metadata.js';

const fixtureSpecifications = [
  {
    filename: 'adapter.json',
    metadata: {
      schemaVersion: 1,
      kind: 'adapter',
      title: 'PostgreSQL database adapter',
      summary: 'Connects a portable persistence contract to PostgreSQL.',
      purpose:
        'Allow applications to use PostgreSQL without coupling their core to its client API.',
      domain: 'persistence',
      responsibilities: ['Translate portable persistence operations into PostgreSQL queries.'],
      boundaries: ['Does not own application authorization policy.'],
      implements: [
        {
          packageName: '@ankhorage/contracts',
          subpath: './db',
          interfaceId: 'DatabaseAdapter',
        },
      ],
      constraints: { platforms: ['Node.js'], configuration: ['Requires a PostgreSQL connection.'] },
    } satisfies RepositoryMetadata,
  },
  {
    filename: 'application.json',
    metadata: {
      schemaVersion: 1,
      kind: 'application',
      title: 'Studio',
      summary: 'Authors applications from reusable product and platform capabilities.',
      purpose: 'Provide a visual environment for application creation and delivery.',
      audience: ['Application authors'],
      useCases: ['Create an application from a template.'],
      architecture: {
        role: 'Application authoring product.',
        invariants: ['Consumes published contracts rather than sibling repository sources.'],
      },
    } satisfies RepositoryMetadata,
  },
  {
    filename: 'contract.json',
    metadata: {
      schemaVersion: 1,
      kind: 'contract',
      title: 'Portable contracts',
      summary: 'Defines serializable declarations exchanged by independent packages.',
      purpose: 'Keep shared data contracts independent from runtime implementations.',
      boundaries: ['Contains no executable validation or provider integration.'],
    } satisfies RepositoryMetadata,
  },
  {
    filename: 'core-library.json',
    metadata: {
      schemaVersion: 1,
      kind: 'library',
      title: 'Utility library',
      summary: 'Provides reusable runtime-neutral utilities.',
      purpose: 'Centralize generic behavior that would otherwise be duplicated.',
      architecture: { role: 'Reusable library.' },
    } satisfies RepositoryMetadata,
  },
  {
    filename: 'non-source-configuration.json',
    metadata: {
      schemaVersion: 1,
      kind: 'configuration',
      title: 'Organization workflows',
      summary: 'Maintains shared automation configuration without a source directory.',
      purpose: 'Version shared workflow policy as reviewable configuration.',
      boundaries: ['Does not publish a runtime package.'],
      constraints: { limitations: ['Applies only to the workflows it declares.'] },
    } satisfies RepositoryMetadata,
  },
  {
    filename: 'tooling.json',
    metadata: {
      schemaVersion: 1,
      kind: 'tooling',
      title: 'Repository developer tools',
      summary: 'Provides repeatable repository setup and maintenance commands.',
      purpose: 'Keep repository policy automation consistent and independently usable.',
      useCases: ['Initialize managed repository instructions.'],
    } satisfies RepositoryMetadata,
  },
  {
    filename: 'native-web-library.json',
    metadata: {
      schemaVersion: 1,
      kind: 'library',
      title: 'Cross-platform UI library',
      summary: 'Publishes native and web UI entrypoints.',
      purpose: 'Provide reusable interfaces for React Native and React applications.',
      build: {
        targets: {
          native: {
            language: 'typescript',
            framework: 'react-native',
            platforms: ['ios', 'android', 'web'],
            entry: '.',
            outDir: 'dist',
            sources: { entries: ['src/index.ts'] },
            builder: { script: 'build' },
          },
          web: {
            language: 'typescript',
            framework: 'react',
            platforms: ['web'],
            entry: './web',
            outDir: 'web-dist',
            sources: { include: ['src/web/**/*.tsx'] },
            builder: { script: 'build:web-components' },
          },
        },
      },
    } satisfies RepositoryMetadata,
  },
] as const;

describe('repository metadata fixtures', () => {
  it('round-trips portable JSON fixtures for each supported repository profile', () => {
    for (const fixture of fixtureSpecifications) {
      const fixturePath = join(process.cwd(), 'test/metadata/fixtures', fixture.filename);
      const parsed = JSON.parse(readFileSync(fixturePath, 'utf8')) as unknown;

      expect(parsed).toEqual(fixture.metadata);
      expect(JSON.parse(JSON.stringify(parsed))).toEqual(parsed);
    }
  });

  it('models implementation relationships separately from dependencies and consumers', () => {
    const [adapterFixture] = fixtureSpecifications;
    const { metadata } = adapterFixture;

    expect(metadata.implements).toEqual([
      {
        packageName: '@ankhorage/contracts',
        subpath: './db',
        interfaceId: 'DatabaseAdapter',
      },
    ]);
    expect('usedBy' in metadata).toBe(false);
    expect('dependencies' in metadata).toBe(false);
  });
});

describe('repository metadata build targets', () => {
  it('keeps build target identifiers and language or framework values open', () => {
    const metadata: RepositoryMetadata = {
      schemaVersion: 1,
      kind: 'library',
      title: 'Future library',
      summary: 'Publishes an independently built artifact.',
      purpose: 'Exercise portable target extensibility.',
      build: {
        targets: {
          custom: {
            language: 'future-language',
            framework: 'future-framework',
            platforms: ['future-platform'],
            entry: './custom',
            outDir: 'custom-dist',
          },
        },
      },
    };

    expect(metadata.build?.targets.custom).toEqual({
      language: 'future-language',
      framework: 'future-framework',
      platforms: ['future-platform'],
      entry: './custom',
      outDir: 'custom-dist',
    });
  });
});

describe('repository metadata source ownership', () => {
  it('models declarative source inputs and builder references', () => {
    const target = fixtureSpecifications[6].metadata.build.targets;

    expect(target.native).toMatchObject({
      entry: '.',
      outDir: 'dist',
      sources: { entries: ['src/index.ts'] },
      builder: { script: 'build' },
    });
    expect(target.web).toMatchObject({
      entry: './web',
      outDir: 'web-dist',
      sources: { include: ['src/web/**/*.tsx'] },
      builder: { script: 'build:web-components' },
    });
  });

  it('keeps source inputs and builder references optional', () => {
    const legacyTarget: RepositoryMetadata = {
      schemaVersion: 1,
      kind: 'library',
      title: 'Existing library',
      summary: 'Keeps its existing metadata shape.',
      purpose: 'Verify additive metadata compatibility.',
      build: {
        targets: {
          existing: {
            language: 'typescript',
            framework: 'react',
            platforms: ['web'],
            entry: './web',
            outDir: 'web-dist',
          },
        },
      },
    };

    expect(legacyTarget.build?.targets.existing).toEqual({
      language: 'typescript',
      framework: 'react',
      platforms: ['web'],
      entry: './web',
      outDir: 'web-dist',
    });
  });
});
