from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def write(path: str, content: str) -> None:
    target = ROOT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content, encoding="utf-8")


def replace(path: str, old: str, new: str) -> None:
    target = ROOT / path
    content = target.read_text(encoding="utf-8")
    if old not in content:
        raise RuntimeError(f"Expected text not found in {path}: {old[:80]!r}")
    target.write_text(content.replace(old, new), encoding="utf-8")


write(
    "src/data/refs.ts",
    """import type { AdapterId, CredentialId } from './ids';
import type { DataContractValue } from './values';

export type CredentialKind = 'apiKey' | 'basic' | 'bearer' | 'custom' | 'oauth2';

export interface CredentialRef {
  readonly id: CredentialId;
  readonly kind: CredentialKind | (string & {});
  readonly label?: string;
  readonly scope?: string;
}

export type AdapterKind = 'auth' | 'database' | 'storage' | 'transport' | (string & {});

export interface AdapterRef {
  readonly id: AdapterId;
  readonly kind: AdapterKind;
  readonly packageName?: string;
  readonly exportName?: string;
  readonly config?: DataContractValue;
}

export interface DatabaseAdapterRef extends AdapterRef {
  readonly kind: 'database';
}
""",
)

write(
    "src/data/sources.ts",
    """import type { DbCollectionDefinition } from '../db';
import type { DataEndpointRegistry } from './endpoints';
import type { DataSourceId } from './ids';
import type { CredentialRef, DatabaseAdapterRef } from './refs';
import type { DataSchemaRegistry } from './schemas';
import type { DataContractValue } from './values';

export type DataSourceKind = 'database' | 'graphql' | 'managed-api' | 'openapi' | 'rest';

export const MANAGED_API_CRUD_OPERATIONS = [
  'list',
  'read',
  'create',
  'update',
  'delete',
] as const;
export type ManagedApiCrudOperation = (typeof MANAGED_API_CRUD_OPERATIONS)[number];
export type ManagedApiSeedRecord = Readonly<Record<string, DataContractValue>>;

export interface DataSourceBaseConfig {
  readonly id: DataSourceId;
  readonly kind: DataSourceKind;
  readonly name?: string;
  readonly description?: string;
  readonly credential?: CredentialRef;
  readonly endpoints: DataEndpointRegistry;
  readonly schemas?: DataSchemaRegistry;
  readonly metadata?: DataContractValue;
}

export interface RestDataSourceConfig extends DataSourceBaseConfig {
  readonly kind: 'rest';
  readonly baseUrl: string;
}

export interface OpenApiImportRef {
  readonly url?: string;
  readonly documentId?: string;
  readonly version?: string;
}

export interface OpenApiDataSourceConfig extends DataSourceBaseConfig {
  readonly kind: 'openapi';
  readonly baseUrl?: string;
  readonly import?: OpenApiImportRef;
}

export interface GraphQlDataSourceConfig extends DataSourceBaseConfig {
  readonly kind: 'graphql';
  readonly endpointUrl: string;
  readonly introspection?: {
    readonly enabled: boolean;
    readonly schemaVersion?: string;
  };
}

export interface DatabaseDataSourceConfig extends DataSourceBaseConfig {
  readonly kind: 'database';
  readonly adapter: DatabaseAdapterRef;
}

export interface ManagedApiOperationPolicyRef {
  readonly id: string;
  readonly operation?: ManagedApiCrudOperation;
}

export interface ManagedApiResourceConfig {
  readonly id: string;
  readonly name?: string;
  readonly description?: string;
  readonly path: string;
  readonly collection: DbCollectionDefinition;
  readonly operations: readonly ManagedApiCrudOperation[];
  readonly seed?: readonly ManagedApiSeedRecord[];
  readonly policies?: readonly ManagedApiOperationPolicyRef[];
  readonly metadata?: DataContractValue;
}

export interface ManagedApiDataSourceConfig extends DataSourceBaseConfig {
  readonly kind: 'managed-api';
  readonly adapter: DatabaseAdapterRef;
  readonly basePath: string;
  readonly resources: readonly ManagedApiResourceConfig[];
}

export type DataSourceConfig =
  | DatabaseDataSourceConfig
  | GraphQlDataSourceConfig
  | ManagedApiDataSourceConfig
  | OpenApiDataSourceConfig
  | RestDataSourceConfig;

export type DataSourceRegistry = Readonly<Record<DataSourceId, DataSourceConfig>>;
""",
)

write(
    "src/data/index.ts",
    """export * from './diagnostics';
export * from './endpoints';
export * from './ids';
export * from './operations';
export * from './refs';
export * from './schemas';
export * from './sources';
export * from './values';
""",
)

replace(
    "src/types.ts",
    "import type { AppDataManifest, DataSourceRegistry } from './data';",
    "import type { DataSourceRegistry } from './data';",
)
replace("src/types.ts", "  data?: AppDataManifest;\n", "")

replace(
    "src/bindings.ts",
    """export interface ApiScreenDataLoaderDefinition {
  readonly kind: 'api';
  readonly apiId: string;
  readonly mode: 'byId' | 'list' | 'one' | 'random';
  readonly targetPath: string;
  readonly id?: string | number;
}

""",
    "",
)
replace(
    "src/bindings.ts",
    """export type ScreenDataLoaderDefinition =
  | ApiScreenDataLoaderDefinition
  | OperationScreenDataLoaderDefinition;
""",
    "export type ScreenDataLoaderDefinition = OperationScreenDataLoaderDefinition;\n",
)

replace("src/bindings.test.ts", "  ApiScreenDataLoaderDefinition,\n", "")
bindings_test = ROOT / "src/bindings.test.ts"
bindings_content = bindings_test.read_text(encoding="utf-8")
start = bindings_content.index("  it('serializes supported screen data-loader definitions")
end = bindings_content.index("  it('serializes scanner lookup", start)
replacement = """  it('serializes canonical operation screen data loaders', () => {
    const loader: ScreenDataLoaderDefinition = {
      kind: 'operation',
      id: 'product-detail',
      operation: {
        dataSourceId: 'nutrition-api',
        endpointId: 'products',
        operationId: 'nutrition.products.getById',
      },
      input: {
        id: {
          kind: 'source',
          source: {
            kind: 'context',
            path: 'route.params.id',
          },
        },
      },
    } satisfies OperationScreenDataLoaderDefinition;

    assertSerializable(loader);
    expect(loader.kind).toBe('operation');
  });

"""
bindings_test.write_text(bindings_content[:start] + replacement + bindings_content[end:], encoding="utf-8")

replace(
    "src/data/data.test.ts",
    """} from './index';

function assertSerializable""",
    """} from './index';
import { MANAGED_API_CRUD_OPERATIONS } from './index';

function assertSerializable""",
)
data_test = ROOT / "src/data/data.test.ts"
data_content = data_test.read_text(encoding="utf-8")
start = data_content.index("  it('serializes a managed API")
end = data_content.index("  it('accepts a provider-neutral", start)
replacement = """  it('serializes one canonical generated API data source contract', () => {
    const source: ManagedApiDataSourceConfig = {
      id: 'catalog-api',
      kind: 'managed-api',
      name: 'Catalog API',
      description: 'Generated CRUD API for catalog resources.',
      basePath: '/api/catalog',
      adapter: {
        id: 'primary-db',
        kind: 'database',
        packageName: '@ankhorage/supabase-db',
      },
      resources: [
        {
          id: 'products',
          name: 'Products',
          path: '/products',
          collection: {
            name: 'products',
            schema: 'public',
            primaryKey: 'id',
            fields: [
              { name: 'id', type: 'uuid', required: true, unique: true },
              { name: 'name', type: 'text', required: true },
              { name: 'price', type: 'number', required: true },
            ],
          },
          operations: MANAGED_API_CRUD_OPERATIONS,
          seed: [{ id: 'product-1', name: 'Keyboard', price: 120 }],
          policies: [
            { id: 'catalog.read', operation: 'list' },
            { id: 'catalog.write', operation: 'create' },
          ],
        },
      ],
      schemas: {
        products: {
          type: 'object',
          required: ['id', 'name', 'price'],
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            price: { type: 'number' },
          },
        },
      },
      endpoints: {
        products: {
          id: 'products',
          kind: 'database',
          path: '/products',
          operations: {
            'products.list': {
              id: 'products.list',
              endpointId: 'products',
              protocol: 'database',
              intent: 'read',
              method: 'GET',
              path: '/api/catalog/products',
            },
            'products.create': {
              id: 'products.create',
              endpointId: 'products',
              protocol: 'database',
              intent: 'create',
              method: 'POST',
              path: '/api/catalog/products',
            },
          },
        },
      },
    };

    assertSerializable(source);
    expect(source.adapter.kind).toBe('database');
    expect(source.resources[0]?.operations).toEqual(MANAGED_API_CRUD_OPERATIONS);
    expect(source.resources[0]?.seed?.[0]?.name).toBe('Keyboard');
    expect(source.endpoints.products?.operations['products.list']?.intent).toBe('read');
  });

"""
data_test.write_text(data_content[:start] + replacement + data_content[end:], encoding="utf-8")

for obsolete in ("src/data/apis.ts", "src/data/apis.test.ts"):
    (ROOT / obsolete).unlink()

write(
    ".changeset/solid-managed-api-contract.md",
    """---
'@ankhorage/contracts': major
---

Consolidate generated APIs into canonical managed API data sources with database adapter references, stable routes, resource collections, explicit CRUD operations, seed records, policies, normalized endpoints, and schemas. Remove the parallel app API registry and API-specific screen loader contract so generated and external APIs are consumed through the same operation model.
""",
)
