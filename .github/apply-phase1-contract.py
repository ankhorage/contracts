from pathlib import Path
from textwrap import dedent


def replace_once(content: str, old: str, new: str, label: str) -> str:
    if content.count(old) != 1:
        raise SystemExit(f'Expected exactly one {label}')
    return content.replace(old, new, 1)


types_path = Path('src/types.ts')
types = types_path.read_text(encoding='utf-8')
types = replace_once(
    types,
    '  authorization: AuthzSpec;\n',
    '  authorization?: AuthzSpec;\n',
    'required AuthSpec.authorization declaration',
)
old_manifest = dedent('''\
export interface AppManifest {
  metadata: {
    name: string;
    slug: string;
    version: string;
    themeId: string;
    created?: string;
    updated?: string;
  };
  themes: ThemeConfig[];
  activeThemeId: string;
  activeThemeMode?: 'dark' | 'light';
  splashScreen?: SplashScreenSpec;
  infra: InfraManifest;
  navigator: NavigatorSpec;
  screens: Record<string, ScreenSpec>;
  data?: AppDataManifest;
  dataSources?: DataSourceRegistry;
  dataBindings?: ComponentDataBindingRegistry;
  settings: {
    apiBaseUrl?: string;
    localization: {
      defaultLocale: string;
      locales: string[];
    };
    authFlow: AuthFlowConfig;
  };
}
''')
new_manifest = dedent('''\
export interface AppSettings {
  apiBaseUrl?: string;
  localization: {
    defaultLocale: string;
    locales: string[];
  };
}

export interface AppManifest {
  metadata: {
    name: string;
    slug: string;
    version: string;
    themeId: string;
    created?: string;
    updated?: string;
  };
  themes: ThemeConfig[];
  activeThemeId: string;
  activeThemeMode?: 'dark' | 'light';
  splashScreen?: SplashScreenSpec;
  infra: InfraManifest;
  navigator: NavigatorSpec;
  screens: Record<string, ScreenSpec>;
  data?: AppDataManifest;
  dataSources?: DataSourceRegistry;
  dataBindings?: ComponentDataBindingRegistry;
  settings: AppSettings;
}
''')
types = replace_once(types, old_manifest, new_manifest, 'AppManifest settings block')
types_path.write_text(types, encoding='utf-8')

auth_path = Path('src/auth.ts')
auth = auth_path.read_text(encoding='utf-8')
flow_interface = dedent('''\
export interface AuthFlowConfig {
  signInRoute: string;
  signUpRoute?: string;
  signOutRoute?: string;
  forgotPasswordRoute?: string;
  otpRoute?: string;
  postSignInRoute: string;
  unauthorizedRoute?: string;
}
''')
flow_contract = flow_interface + dedent('''\

export const DEFAULT_AUTH_FLOW = {
  signInRoute: 'sign-in',
  signUpRoute: 'sign-up',
  signOutRoute: 'sign-out',
  forgotPasswordRoute: 'forgot-password',
  postSignInRoute: '/',
  unauthorizedRoute: 'sign-in',
} as const satisfies AuthFlowConfig;

export function resolveAuthFlow(flow?: AuthFlowConfig): AuthFlowConfig {
  return { ...(flow ?? DEFAULT_AUTH_FLOW) };
}
''')
auth = replace_once(auth, flow_interface, flow_contract, 'AuthFlowConfig interface')
auth_path.write_text(auth, encoding='utf-8')

readme_path = Path('README.md')
readme = readme_path.read_text(encoding='utf-8')
auth_section = dedent('''\
## Authentication flow contract

Authentication flow belongs only at `manifest.infra.auth.flow`. Application
`settings` contains unrelated runtime settings and has no authentication fields.

```ts
import { resolveAuthFlow, type AppManifest } from '@ankhorage/contracts';

declare const manifest: AppManifest;

const flow = resolveAuthFlow(manifest.infra.auth?.flow);
```

`resolveAuthFlow` is the single defaulting boundary. It returns the configured
flow unchanged as a fresh object, or the current canonical routes when no flow
is configured. It never mutates the manifest or writes configuration into
`settings`.

Authentication does not imply authorization. `infra.auth.authorization` is
optional, and no RBAC, ABAC, Cerbos, or native authorization model is selected
by this package when the block is absent.

```ts
const auth = {
  scope: 'global',
  provider: 'supabase',
  flow: {
    signInRoute: 'sign-in',
    signUpRoute: 'sign-up',
    signOutRoute: 'sign-out',
    forgotPasswordRoute: 'forgot-password',
    postSignInRoute: '/',
    unauthorizedRoute: 'sign-in',
  },
};
```

''')
readme = replace_once(readme, '## Profile contract\n', auth_section + '## Profile contract\n', 'Profile contract heading')
readme = readme.replace("  authorization: { kind: 'RBAC', engine: 'native' },\n", '', 1)
readme_path.write_text(readme, encoding='utf-8')

Path('src/auth-flow-contract.test.ts').write_text(
    dedent('''\
import { readdir, readFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

import { describe, expect, it } from 'bun:test';

import {
  DEFAULT_AUTH_FLOW,
  resolveAuthFlow,
  type AppSettings,
  type AuthFlowConfig,
  type AuthSpec,
} from './index';

async function collectTypeScriptFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectTypeScriptFiles(path)));
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      files.push(path);
    }
  }

  return files;
}

describe('canonical authentication flow contract', () => {
  it('resolves one canonical default without mutating shared state', () => {
    const first = resolveAuthFlow();
    const second = resolveAuthFlow();

    expect(first).toEqual(DEFAULT_AUTH_FLOW);
    expect(second).toEqual(DEFAULT_AUTH_FLOW);
    expect(first).not.toBe(DEFAULT_AUTH_FLOW);
    expect(second).not.toBe(first);
  });

  it('preserves an explicitly configured flow without inventing optional routes', () => {
    const configured: AuthFlowConfig = {
      signInRoute: 'login',
      postSignInRoute: 'dashboard',
    };
    const resolved = resolveAuthFlow(configured);

    expect(resolved).toEqual(configured);
    expect(resolved).not.toBe(configured);
    expect(resolved.signUpRoute).toBeUndefined();
  });

  it('allows authentication without an authorization model', () => {
    const auth: AuthSpec = {
      scope: 'global',
      provider: 'supabase',
      flow: DEFAULT_AUTH_FLOW,
    };

    expect(auth.authorization).toBeUndefined();
  });

  it('removes auth flow from application settings at compile time', () => {
    const settings: AppSettings = {
      localization: {
        defaultLocale: 'en',
        locales: ['en'],
      },
    };

    const removedProperty = {
      localization: settings.localization,
      // @ts-expect-error Authentication flow no longer belongs in application settings.
      authFlow: DEFAULT_AUTH_FLOW,
    } satisfies AppSettings;

    expect(removedProperty.localization).toEqual(settings.localization);
  });

  it('makes authorization access require explicit narrowing', () => {
    const assumesAuthorization = (auth: AuthSpec): string => {
      // @ts-expect-error Authorization is optional and must be checked before use.
      return auth.authorization.kind;
    };

    expect(typeof assumesAuthorization).toBe('function');
  });

  it('prevents the removed settings auth-flow path from returning to source', async () => {
    const removedPath = 'settings.' + 'authFlow';
    const files = await collectTypeScriptFiles(join(process.cwd(), 'src'));

    for (const file of files) {
      if (basename(file) === 'auth-flow-contract.test.ts') continue;
      const content = await readFile(file, 'utf8');
      expect(content.includes(removedPath)).toBe(false);
    }
  });
});
'''),
    encoding='utf-8',
)

Path('.changeset/canonical-auth-flow.md').write_text(
    dedent('''\
---
'@ankhorage/contracts': major
---

Make `infra.auth.flow` the only authentication-flow contract, remove auth flow from application settings, make authorization optional, and export the canonical auth-flow resolver.
'''),
    encoding='utf-8',
)

Path('.github/workflows/phase1-contract-patch.yml').unlink()
Path('.github/apply-phase1-contract.py').unlink()
