import { expect, it } from 'bun:test';

import type { AuthResult } from './auth';
import type { DbResult } from './db';
import type { SecretStoreResult } from './secrets';
import type { StateResult } from './state';
import type { StorageResult } from './storage';

type IsAssignable<TSource, TTarget> = [TSource] extends [TTarget] ? true : false;

it('requires data only for successful non-void portable results', () => {
  interface Data {
    readonly id: string;
  }

  const resultShapes: readonly [
    IsAssignable<{ readonly ok: true }, AuthResult<Data>>,
    IsAssignable<{ readonly ok: true }, DbResult<Data>>,
    IsAssignable<{ readonly ok: true }, SecretStoreResult<Data>>,
    IsAssignable<{ readonly ok: true }, StateResult<Data>>,
    IsAssignable<{ readonly ok: true }, StorageResult<Data>>,
    IsAssignable<{ readonly ok: true }, AuthResult>,
    IsAssignable<{ readonly ok: true }, DbResult>,
    IsAssignable<{ readonly ok: true }, SecretStoreResult>,
    IsAssignable<{ readonly ok: true }, StateResult>,
    IsAssignable<{ readonly ok: true }, StorageResult>,
  ] = [false, false, false, false, false, true, true, true, true, true];

  expect(resultShapes).toEqual([false, false, false, false, false, true, true, true, true, true]);
});
