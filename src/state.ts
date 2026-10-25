import type { SerializableValue } from './serializable.js';

/** Legend currently implements in-memory state only; unsupported persistence cannot be selected. */
export interface AppStateSpec {
  readonly provider: 'legend';
  readonly persistence?: false;
}

export type StatePrimitive = string | number | boolean | null;

export type StateValue = SerializableValue;

export type StatePath = string | readonly string[];

/** A portable state transition that appends one serializable value to an array. */
export interface StateAppendUpdate {
  readonly kind: 'append';
  readonly value: StateValue;
}

/** A portable state transition applied atomically by a StateAdapter. */
export type StateUpdate = StateAppendUpdate;

export interface StateAdapterCapabilities {
  readonly subscriptions: boolean;
  readonly computed: boolean;
  readonly persistence: boolean;
}

export interface StateAdapterError {
  readonly code: string;
  readonly message: string;
  readonly cause?: unknown;
}

export type StateSuccess<TValue = void> = [TValue] extends [void]
  ? {
      readonly ok: true;
    }
  : {
      readonly ok: true;
      readonly data: TValue;
    };

export type StateResult<TValue = void> =
  | StateSuccess<TValue>
  | {
      readonly ok: false;
      readonly error: StateAdapterError;
    };

export interface StateSnapshot<TValue extends StateValue = StateValue> {
  readonly path: StatePath;
  readonly value: TValue | undefined;
}

export type StateListener<TValue extends StateValue = StateValue> = (
  snapshot: StateSnapshot<TValue>,
) => void;

export interface StateSubscription {
  unsubscribe(): Promise<void> | void;
}

export interface StateAdapter {
  readonly capabilities: StateAdapterCapabilities;

  get<TValue extends StateValue = StateValue>(path: StatePath): StateResult<TValue | undefined>;
  set<TValue extends StateValue = StateValue>(path: StatePath, value: TValue): StateResult;
  update?<TValue extends StateValue = StateValue>(
    path: StatePath,
    update: StateUpdate,
  ): StateResult<TValue>;
  subscribe<TValue extends StateValue = StateValue>(
    path: StatePath,
    listener: StateListener<TValue>,
  ): StateResult<StateSubscription>;
  delete?(path: StatePath): StateResult;
}
