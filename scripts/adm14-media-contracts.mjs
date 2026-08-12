import { readFile, writeFile } from 'node:fs/promises';

async function patch(path, replacements) {
  let content = await readFile(path, 'utf8');
  for (const [before, after] of replacements) {
    if (!content.includes(before)) throw new Error(`Missing patch anchor in ${path}: ${before}`);
    content = content.replace(before, after);
  }
  await writeFile(path, content);
}

await patch('src/types.ts', [
  [
    "import type { DataSourceRegistry, GeneratedApiRegistry } from './data';\n",
    "import type { DataSourceRegistry, GeneratedApiRegistry } from './data';\nimport type { MediaManifest } from './media';\n",
  ],
  [
    "  splashScreen?: SplashScreenSpec;\n  infra: InfraManifest;\n",
    "  splashScreen?: SplashScreenSpec;\n  /** Studio-managed authoring media. Runtime/user uploads are intentionally separate. */\n  media?: MediaManifest;\n  infra: InfraManifest;\n",
  ],
]);

await patch('src/appManifest.ts', [
  [
    "import { isInfraManifest } from './appManifest/infra';\n",
    "import { isInfraManifest } from './appManifest/infra';\nimport { isMediaManifest } from './appManifest/media';\n",
  ],
  [
    "  splashScreen: 'optional',\n  infra: 'required',\n",
    "  splashScreen: 'optional',\n  media: 'optional',\n  infra: 'required',\n",
  ],
  [
    "    (value.splashScreen === undefined || isSplashScreenSpec(value.splashScreen)) &&\n    isInfraManifest(value.infra) &&\n",
    "    (value.splashScreen === undefined || isSplashScreenSpec(value.splashScreen)) &&\n    (value.media === undefined || isMediaManifest(value.media)) &&\n    isInfraManifest(value.infra) &&\n",
  ],
]);

await patch('src/index.ts', [
  ["export * from './db';\n", "export * from './db';\nexport * from './media';\n"],
]);

const packagePath = 'package.json';
const packageJson = JSON.parse(await readFile(packagePath, 'utf8'));
packageJson.exports['./media'] = {
  types: './dist/media.d.ts',
  default: './dist/media.js',
};
if (!packageJson.keywords.includes('media')) packageJson.keywords.push('media');
if (!packageJson.keywords.includes('assets')) packageJson.keywords.push('assets');
await writeFile(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);

await patch('src/appManifest.test.ts', [
  [
    "    splashScreen: {\n      image: './assets/splash.png',\n      resizeMode: 'contain',\n      backgroundColor: '#ffffff',\n      dark: { backgroundColor: '#000000' },\n    },\n    infra: {\n",
    "    splashScreen: {\n      image: './assets/splash.png',\n      resizeMode: 'contain',\n      backgroundColor: '#ffffff',\n      dark: { backgroundColor: '#000000' },\n    },\n    media: {\n      assets: {\n        hero: {\n          id: 'hero',\n          name: 'Hero image',\n          kind: 'image',\n          source: { kind: 'storage', bucket: 'media', path: 'studio/hero.webp' },\n        },\n      },\n    },\n    infra: {\n",
  ],
  [
    "  it('rejects legacy infra plugin state', () => {\n",
    "  it('rejects transient media URLs at the manifest boundary', () => {\n    const manifest = createManifest();\n    const media = manifest.media as Record<string, Record<string, Record<string, unknown>>>;\n    media.assets.hero.source = { kind: 'url', url: 'blob:https://example.test/transient' };\n\n    expect(isAppManifest(manifest)).toBe(false);\n  });\n\n  it('rejects legacy infra plugin state', () => {\n",
  ],
]);

await patch('src/appManifest/media.ts', [
  [
    "  return value === undefined || (isOptionalNumber(value) && Number.isFinite(value) && value >= 0);\n",
    "  return value === undefined || (typeof value === 'number' && Number.isFinite(value) && value >= 0);\n",
  ],
  [
    "  return value === undefined || (isOptionalNumber(value) && Number.isFinite(value) && value > 0);\n",
    "  return value === undefined || (typeof value === 'number' && Number.isFinite(value) && value > 0);\n",
  ],
  [
    "import { isOptionalNumber, isOptionalString, isRecord } from './shared';\n",
    "import { isOptionalString, isRecord } from './shared';\n",
  ],
]);
