import { createKnipConfig } from '@ankhorage/devtools/knip';

export default createKnipConfig({
  ignoreFiles: ['.prettierrc.cjs', 'eslint.config.js'],
});
