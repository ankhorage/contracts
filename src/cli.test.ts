import { describe, expect, it } from 'bun:test';

import type { Capability } from './capability';
import type {
  AnkhCommandDescriptor,
  AnkhCommandProviderManifest,
  AnkhPackageMetadata,
} from './index';

const INFRA_CAPABILITIES = [
  {
    id: 'infra.up',
    owner: '@ankhorage/infra',
    access: ['invoke'],
    label: 'Bring infrastructure up',
  },
  {
    id: 'infra.status',
    owner: '@ankhorage/infra',
    access: ['read'],
    label: 'Read infrastructure status',
  },
] as const satisfies readonly Capability[];

describe('cli contracts', () => {
  it('accepts provider package metadata and provider manifests', () => {
    const packageMetadata = {
      category: 'infra',
      provider: './dist/cli/index.js',
      capabilities: INFRA_CAPABILITIES,
    } as const satisfies AnkhPackageMetadata;

    const upCommand = {
      path: ['up'],
      summary: 'Bring project infrastructure up',
      capability: 'infra.up',
      aliases: ['start'],
      examples: ['ankh infra up shop'],
    } as const satisfies AnkhCommandDescriptor;

    const manifest = {
      id: '@ankhorage/infra',
      category: 'infra',
      version: '1.0.0',
      capabilities: INFRA_CAPABILITIES,
      commands: [upCommand],
    } as const satisfies AnkhCommandProviderManifest;

    expect(JSON.parse(JSON.stringify(packageMetadata))).toEqual(packageMetadata);
    expect(JSON.parse(JSON.stringify(manifest))).toEqual(manifest);
    expect(manifest.id).toBe('@ankhorage/infra');
    expect(manifest.category).toBe('infra');
    expect(manifest.commands[0].path).toEqual(['up']);
  });

  it('accepts an empty path as a category-root command', () => {
    const deployCapability = {
      id: 'deploy.release',
      owner: '@ankhorage/deploy',
      access: ['invoke'],
    } as const satisfies Capability;
    const deployCommand = {
      path: [],
      summary: 'Deploy the authored release',
      capability: deployCapability.id,
      examples: ['ankh deploy'],
    } as const satisfies AnkhCommandDescriptor;

    const manifest = {
      id: '@ankhorage/deploy',
      category: 'deploy',
      version: '1.0.0',
      capabilities: [deployCapability],
      commands: [deployCommand],
    } as const satisfies AnkhCommandProviderManifest;

    expect(manifest.commands[0].path).toEqual([]);
    expect(JSON.parse(JSON.stringify(manifest))).toEqual(manifest);
  });

  it('accepts metadata-only packages without a provider module', () => {
    const capability = {
      id: 'contracts.cli',
      owner: '@ankhorage/contracts',
      access: ['read'],
    } as const satisfies Capability;
    const packageMetadata = {
      category: 'contracts',
      provider: null,
      capabilities: [capability],
    } as const satisfies AnkhPackageMetadata;

    expect(JSON.parse(JSON.stringify(packageMetadata))).toEqual(packageMetadata);
    expect(packageMetadata.provider).toBeNull();
  });

  it('keeps command paths relative to the provider category', () => {
    const capability = {
      id: 'dev.android.scan',
      owner: '@ankhorage/dev',
      access: ['invoke'],
    } as const satisfies Capability;
    const androidScanCommand = {
      path: ['android', 'scan'],
      summary: 'Scan an Android target',
      capability: capability.id,
      examples: ['ankh dev android scan'],
    } as const satisfies AnkhCommandDescriptor;

    const manifest = {
      id: '@ankhorage/dev',
      category: 'dev',
      version: '1.0.0',
      capabilities: [capability],
      commands: [androidScanCommand],
    } as const satisfies AnkhCommandProviderManifest;

    expect(manifest.category).toBe('dev');
    expect(manifest.commands[0].path).toEqual(['android', 'scan']);
    expect(manifest.commands[0].path[0]).not.toBe(manifest.category);
  });
});
