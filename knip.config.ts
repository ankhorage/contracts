import { createKnipConfig } from '@ankhorage/devtools/knip';

export default createKnipConfig({
  entry: ['consumer-tests/deployProviderNodeNext.ts'],
  ignoreFiles: [
    '.prettierrc.js',
    'eslint.config.mjs',
    'eslint.local.config.mjs',
    'paradox.config.ts',
    'prettier.local.config.js',
  ],
});
