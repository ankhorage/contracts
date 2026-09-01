import { createConfig } from '@ankhorage/devtools/eslint';

function legacyRuleExceptions(rule, files) {
  return { files, rules: { [rule]: 'off' } };
}

export default [
  ...createConfig({
    files: ['src/**/*.test.ts'],
    project: ['./tsconfig.eslint.json'],
    tsconfigRootDir: import.meta.dirname,
  }),
  legacyRuleExceptions('complexity', [
    'src/appManifest.ts',
    'src/appManifest/data.ts',
    'src/appManifest/dataSources.ts',
    'src/appManifest/infra.ts',
    'src/bindings.test.ts',
  ]),
  legacyRuleExceptions('max-lines', [
    'src/auth.ts',
    'src/bindings.test.ts',
    'src/contracts.test.ts',
    'src/types.ts',
    'src/ui.test.ts',
  ]),
  legacyRuleExceptions('max-lines-per-function', [
    'src/appManifest.test.ts',
    'src/auth-flow-contract.test.ts',
    'src/auth-oauth-setup.test.ts',
    'src/auth-oauth.test.ts',
    'src/bindings.test.ts',
    'src/cli.test.ts',
    'src/contracts.test.ts',
    'src/deploy.test.ts',
    'src/secrets.test.ts',
    'src/state.test.ts',
    'src/ui.test.ts',
  ]),
  legacyRuleExceptions('security/detect-object-injection', [
    'src/appManifest/data.ts',
    'src/appManifest/screens.ts',
  ]),
];
