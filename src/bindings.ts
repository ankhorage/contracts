import type { DbFilter, DbPage, DbSort } from './db';

export type BindingValue =
  | string
  | number
  | boolean
  | null
  | readonly BindingValue[]
  | {
      readonly [key: string]: BindingValue;
    };

export type BindingRefreshMode = 'focus' | 'live' | 'poll' | 'static';

export interface DbCollectionQueryBinding {
  readonly collection: string;
  readonly schema?: string;
  readonly columns?: readonly string[];
  readonly filters?: readonly DbFilter[];
  readonly sort?: readonly DbSort[];
  readonly page?: DbPage;
  readonly refresh?: BindingRefreshMode;
  readonly pollIntervalMs?: number;
}

export type BindingValueSource =
  | {
      readonly source: 'context';
      readonly path: string;
    }
  | {
      readonly source: 'db.collection';
      readonly query: DbCollectionQueryBinding;
    }
  | {
      readonly source: 'event';
      readonly path: string;
    }
  | {
      readonly source: 'literal';
      readonly value: BindingValue;
    }
  | {
      readonly source: 'state';
      readonly path: string;
    };

export type BindingValueTransform = 'lowercase' | 'trim' | 'uppercase';

export interface NodePropBinding {
  readonly prop: string;
  readonly valueFrom: BindingValueSource;
  readonly transform?: BindingValueTransform | readonly BindingValueTransform[];
}
