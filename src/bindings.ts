import type { Capability } from './capability';
import type { EntityRegistry, ValueMap } from './collections';
import type { SerializableValue } from './serializable';

export type ComponentInstanceId = string;
export type ComponentTypeId = string;
export type BindingValue = SerializableValue;
export type BindingDataPath = string;
export type BindingValueTransform = 'lowercase' | 'trim' | 'uppercase';

/** A portable reference to a readable capability value or a cached invocation result. */
export interface BindingCapabilityReference {
  readonly capability: Capability['id'];
  readonly path?: BindingDataPath;
  readonly result?: string;
}

/** A portable request to invoke a capability and optionally retain its result in a local slot. */
export interface BindingInvocation {
  readonly capability: Capability['id'];
  readonly input?: BindingInputMap;
  readonly result?: string;
}

/** A recursive, serializable value expression used by bindings and invocation inputs. */
export type BindingExpression =
  | BindingCapabilityReference
  | { readonly kind: 'array'; readonly items: readonly BindingExpression[] }
  | {
      readonly kind: 'fallback';
      readonly value: BindingExpression;
      readonly fallback: BindingExpression;
    }
  | { readonly kind: 'literal'; readonly value: BindingValue }
  | { readonly kind: 'object'; readonly fields: ValueMap<string, BindingExpression> }
  | {
      readonly kind: 'transform';
      readonly value: BindingExpression;
      readonly transforms: readonly BindingValueTransform[];
    };

export type BindingInputValue = BindingExpression;
export type BindingInputMap = ValueMap<string, BindingInputValue>;
export type BindingConditionOperator = 'eq' | 'exists' | 'neq' | 'notExists';

/** A condition evaluated from portable binding expressions. */
export interface BindingCondition {
  readonly source: BindingExpression;
  readonly operator: BindingConditionOperator;
  readonly value?: BindingExpression;
}

/** A lifecycle-specific expression rendered when a bound value reaches one state. */
export interface BindingLifecycleBehavior {
  readonly state: BindingLifecycleState;
  readonly value?: BindingExpression;
  readonly message?: string;
}

export type BindingLifecycleState = 'empty' | 'error' | 'loading';

export interface PropBinding {
  readonly value: BindingExpression;
  readonly loading?: BindingLifecycleBehavior;
  readonly error?: BindingLifecycleBehavior;
  readonly empty?: BindingLifecycleBehavior;
}

/** A screen loader is one capability invocation, optionally storing its result by slot name. */
export type ScreenDataLoaderDefinition = BindingInvocation;

export interface EventBinding {
  readonly target: BindingInvocation;
  readonly when?: BindingCondition;
}

export interface ComponentDataBinding {
  readonly componentId: ComponentInstanceId;
  readonly componentType?: ComponentTypeId;
  readonly props?: ValueMap<string, PropBinding>;
  readonly events?: ValueMap<string, readonly EventBinding[]>;
}

export type ComponentDataBindingRegistry = EntityRegistry<
  ComponentInstanceId,
  ComponentDataBinding,
  'componentId'
>;
