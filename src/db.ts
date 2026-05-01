export type DbRecord = Record<string, unknown>;
export type DbSortDirection = 'asc' | 'desc';

export interface DbAdapterError {
  code: string;
  message: string;
  cause?: unknown;
}

export type DbResult<TData = void> =
  | {
      ok: true;
      data?: TData;
    }
  | {
      ok: false;
      error: DbAdapterError;
    };

export interface DbSort {
  field: string;
  direction?: DbSortDirection;
}

export interface DbPage {
  limit?: number;
  offset?: number;
}

export type DbFilterOperator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'in'
  | 'contains'
  | 'startsWith'
  | 'endsWith';

export interface DbFilter {
  field: string;
  operator: DbFilterOperator;
  value: unknown;
}

export interface DbSelectInput {
  table: string;
  columns?: string[];
  filters?: DbFilter[];
  sort?: DbSort[];
  page?: DbPage;
}

export interface DbFindByIdInput {
  table: string;
  id: string | number;
  columns?: string[];
}

export interface DbInsertInput<TRecord extends object = DbRecord> {
  table: string;
  values: TRecord | TRecord[];
}

export interface DbUpdateInput<TRecord extends object = DbRecord> {
  table: string;
  values: Partial<TRecord>;
  filters: DbFilter[];
}

export interface DbDeleteInput {
  table: string;
  filters: DbFilter[];
}

export interface DbAdapterCapabilities {
  supportsTransactions: boolean;
  supportsReturning: boolean;
  supportsRealtime: boolean;
}

export interface DbAdapter {
  readonly capabilities?: DbAdapterCapabilities;

  select<TRecord extends object = DbRecord>(input: DbSelectInput): Promise<DbResult<TRecord[]>>;
  findById<TRecord extends object = DbRecord>(
    input: DbFindByIdInput,
  ): Promise<DbResult<TRecord | null>>;
  insert<TRecord extends object = DbRecord>(
    input: DbInsertInput<TRecord>,
  ): Promise<DbResult<TRecord[]>>;
  update<TRecord extends object = DbRecord>(
    input: DbUpdateInput<TRecord>,
  ): Promise<DbResult<TRecord[]>>;
  delete<TRecord extends object = DbRecord>(input: DbDeleteInput): Promise<DbResult<TRecord[]>>;

  transaction?<TResult>(run: (adapter: DbAdapter) => Promise<TResult>): Promise<DbResult<TResult>>;
}
