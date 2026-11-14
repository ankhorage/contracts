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
] as const;

describe('repository metadata contract', () => {
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
