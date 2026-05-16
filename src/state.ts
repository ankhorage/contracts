export type StatePrimitive = string | number | boolean | null;

export type StateValue =
  | StatePrimitive
  | readonly StateValue[]
  | {
      readonly [key: string]: StateValue;
    };

export type StatePath = string | readonly string[];

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
  subscribe<TValue extends StateValue = StateValue>(
    path: StatePath,
    listener: StateListener<TValue>,
  ): StateResult<StateSubscription>;
  delete?(path: StatePath): StateResult;
}
