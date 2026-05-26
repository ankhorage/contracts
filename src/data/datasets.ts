import type { DbCollectionDefinition } from '../db';
import type { DataContractValue } from './values';

export const APP_DATASET_OPERATIONS = ['create', 'delete', 'list', 'read', 'update'] as const;
export type AppDatasetOperation = (typeof APP_DATASET_OPERATIONS)[number];

export type AppDatasetId = string;
export type AppDatasetSeedRecord = Readonly<Record<string, DataContractValue>>;

export interface AppDatasetDefinition {
  readonly id: AppDatasetId;
  readonly label?: string;
  readonly description?: string;
  readonly collection: DbCollectionDefinition;
  readonly operations?: readonly AppDatasetOperation[];
  readonly seed?: readonly AppDatasetSeedRecord[];
  readonly metadata?: DataContractValue;
}

export type AppDatasetRegistry = Readonly<Record<AppDatasetId, AppDatasetDefinition>>;

export interface AppDataManifest {
  readonly datasets?: AppDatasetRegistry;
}
