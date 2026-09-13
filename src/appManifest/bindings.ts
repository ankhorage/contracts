import { isRecord } from '@ankhorage/utility/object';

import { isManifestValue } from './isManifestValue';

export function isComponentDataBindingRegistry(value: unknown): boolean {
  return isRecord(value) && Object.values(value).every(isComponentDataBinding);
}

export function isBindingValueSource(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.kind === 'string' &&
    ['context', 'event', 'literal', 'operation', 'state'].includes(value.kind) &&
    (value.kind === 'literal'
      ? isManifestValue(value.value)
      : value.kind === 'operation'
        ? isBindingOperationRef(value.operation) &&
          (value.path === undefined || typeof value.path === 'string')
        : typeof value.path === 'string')
  );
}

export function isScreenDataLoaderDefinition(value: unknown): boolean {
  return (
    isRecord(value) &&
    value.kind === 'operation' &&
    (value.id === undefined || typeof value.id === 'string') &&
    isBindingOperationRef(value.operation) &&
    (value.input === undefined || isBindingInputMap(value.input))
  );
}

function isComponentDataBinding(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.componentId === 'string' &&
    (value.componentType === undefined || typeof value.componentType === 'string') &&
    (value.props === undefined ||
      (isRecord(value.props) && Object.values(value.props).every(isPropBinding))) &&
    (value.events === undefined ||
      (isRecord(value.events) &&
        Object.values(value.events).every(
          (bindings) => Array.isArray(bindings) && bindings.every(isEventBinding),
        )))
  );
}

function isPropBinding(value: unknown): boolean {
  return (
    isRecord(value) &&
    isBindingValueSource(value.source) &&
    (value.fallback === undefined || isBindingFallback(value.fallback)) &&
    (value.loading === undefined || isBindingLifecycleBehavior(value.loading)) &&
    (value.error === undefined || isBindingLifecycleBehavior(value.error)) &&
    (value.empty === undefined || isBindingLifecycleBehavior(value.empty)) &&
    isOptionalBindingTransforms(value.transforms)
  );
}

function isEventBinding(value: unknown): boolean {
  return (
    isRecord(value) &&
    isEventBindingTarget(value.target) &&
    (value.input === undefined || isBindingInputMap(value.input)) &&
    (value.when === undefined || isBindingCondition(value.when))
  );
}

function isEventBindingTarget(value: unknown): boolean {
  return (
    isRecord(value) &&
    ((value.kind === 'action' && typeof value.type === 'string') ||
      (value.kind === 'operation' && isBindingOperationRef(value.operation)))
  );
}

function isBindingCondition(value: unknown): boolean {
  return (
    isRecord(value) &&
    isBindingValueSource(value.source) &&
    ['eq', 'exists', 'neq', 'notExists'].includes(String(value.operator)) &&
    (value.value === undefined || isManifestValue(value.value))
  );
}

function isBindingOperationRef(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.apiId === 'string' &&
    typeof value.operationId === 'string' &&
    (value.endpointId === undefined || typeof value.endpointId === 'string')
  );
}

function isBindingFallback(value: unknown): boolean {
  return (
    isRecord(value) &&
    (value.value === undefined || isManifestValue(value.value)) &&
    (value.source === undefined || isBindingValueSource(value.source))
  );
}

function isBindingLifecycleBehavior(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.state === 'string' &&
    ['empty', 'error', 'loading'].includes(value.state) &&
    (value.fallback === undefined || isBindingFallback(value.fallback)) &&
    (value.message === undefined || typeof value.message === 'string')
  );
}

function isOptionalBindingTransforms(value: unknown): boolean {
  return (
    value === undefined ||
    (Array.isArray(value) &&
      value.every((transform) => ['lowercase', 'trim', 'uppercase'].includes(String(transform))))
  );
}

function isBindingInputMap(value: unknown): boolean {
  return isRecord(value) && Object.values(value).every(isBindingInputValue);
}

function isBindingInputValue(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.kind === 'string' &&
    ((value.kind === 'array' &&
      Array.isArray(value.items) &&
      value.items.every(isBindingInputValue)) ||
      (value.kind === 'literal' && isManifestValue(value.value)) ||
      (value.kind === 'object' && isBindingInputMap(value.fields)) ||
      (value.kind === 'source' &&
        isBindingValueSource(value.source) &&
        isOptionalBindingTransforms(value.transforms)))
  );
}
