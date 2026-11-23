import { isRecord } from '@ankhorage/utility/object';
import { isOptionalString } from '@ankhorage/utility/string';

import { isManifestValue } from './isManifestValue.js';

/*** Validate every component binding in the authored registry. */
export function isComponentDataBindingRegistry(value: unknown): boolean {
  return (
    isRecord(value) &&
    Object.entries(value).every(
      ([componentId, binding]) =>
        isComponentDataBinding(binding) && isRecord(binding) && binding.componentId === componentId,
    )
  );
}

/*** Validate a readable capability reference or a recursive binding expression. */
export function isBindingExpression(value: unknown): boolean {
  return isBindingCapabilityReference(value) || isBindingExpressionNode(value);
}

/*** Validate a screen loader as one portable capability invocation. */
export function isScreenDataLoaderDefinition(value: unknown): boolean {
  return isBindingInvocation(value);
}

/*** Validate component identity and its property and event bindings. */
function isComponentDataBinding(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.componentId === 'string' &&
    isOptionalString(value.componentType) &&
    (value.props === undefined ||
      (isRecord(value.props) && Object.values(value.props).every(isPropBinding))) &&
    (value.events === undefined ||
      (isRecord(value.events) &&
        Object.values(value.events).every(
          (bindings) => Array.isArray(bindings) && bindings.every(isEventBinding),
        )))
  );
}

/*** Validate a property expression and its lifecycle-specific render behavior. */
function isPropBinding(value: unknown): boolean {
  return (
    isRecord(value) &&
    isBindingExpression(value.value) &&
    (value.loading === undefined || isBindingLifecycleBehavior(value.loading)) &&
    (value.error === undefined || isBindingLifecycleBehavior(value.error)) &&
    (value.empty === undefined || isBindingLifecycleBehavior(value.empty))
  );
}

/*** Validate an event binding and its one canonical invocation target. */
function isEventBinding(value: unknown): boolean {
  return (
    isRecord(value) &&
    isBindingInvocation(value.target) &&
    (value.when === undefined || isBindingCondition(value.when))
  );
}

/*** Validate a serializable capability invocation and optional result slot. */
function isBindingInvocation(value: unknown): boolean {
  return (
    isBindingCapabilityReference(value) &&
    (value.input === undefined || isBindingInputMap(value.input))
  );
}

/*** Validate a capability identity with optional output path or cached-result slot. */
function isBindingCapabilityReference(value: unknown): value is Record<string, unknown> {
  return (
    isRecord(value) &&
    typeof value.capability === 'string' &&
    value.capability.includes('.') &&
    isOptionalString(value.path) &&
    isOptionalString(value.result)
  );
}

/*** Validate array, fallback, literal, lookup, object and transform expression forms. */
function isBindingExpressionNode(value: unknown): boolean {
  if (!isRecord(value)) return false;

  return [
    isBindingArrayExpression,
    isBindingFallbackExpression,
    isBindingLiteralExpression,
    isBindingLookupExpression,
    isBindingObjectExpression,
    isBindingTransformExpression,
  ].some((isExpression) => isExpression(value));
}

/*** Validate an ordered sequence of recursively resolved binding expressions. */
function isBindingArrayExpression(value: Record<string, unknown>): boolean {
  return (
    value.kind === 'array' && Array.isArray(value.items) && value.items.every(isBindingExpression)
  );
}

/*** Validate a primary expression and its fallback expression. */
function isBindingFallbackExpression(value: Record<string, unknown>): boolean {
  return (
    value.kind === 'fallback' &&
    isBindingExpression(value.value) &&
    isBindingExpression(value.fallback)
  );
}

/*** Validate one serializable literal binding expression. */
function isBindingLiteralExpression(value: Record<string, unknown>): boolean {
  return value.kind === 'literal' && isManifestValue(value.value);
}

/*** Validate a source expression, closed primitive cases, and its declared fallback. */
function isBindingLookupExpression(value: Record<string, unknown>): boolean {
  return (
    value.kind === 'lookup' &&
    isBindingExpression(value.source) &&
    isBindingLookupCases(value.cases) &&
    isBindingExpression(value.fallback)
  );
}

/*** Validate named fields whose values are recursive binding expressions. */
function isBindingObjectExpression(value: Record<string, unknown>): boolean {
  return value.kind === 'object' && isBindingInputMap(value.fields);
}

/*** Validate one expression and its ordered portable transform names. */
function isBindingTransformExpression(value: Record<string, unknown>): boolean {
  return (
    value.kind === 'transform' &&
    isBindingExpression(value.value) &&
    isBindingTransforms(value.transforms)
  );
}

/*** Validate finite, unique primitive-key lookup cases and their result expressions. */
function isBindingLookupCases(value: unknown): boolean {
  if (!Array.isArray(value)) return false;

  const cases = value.filter(isBindingLookupCase);
  if (cases.length !== value.length) return false;

  return new Set(cases.map((entry) => bindingLookupKeyIdentity(entry.key))).size === cases.length;
}

/*** Validate one closed-lookup case without accepting non-serializable key values. */
function isBindingLookupCase(
  value: unknown,
): value is { readonly key: boolean | null | number | string; readonly value: unknown } {
  return (
    isRecord(value) &&
    Object.keys(value).length === 2 &&
    'key' in value &&
    'value' in value &&
    isBindingLookupKey(value.key) &&
    isBindingExpression(value.value)
  );
}

/*** Validate the JSON primitive identity domain supported by closed lookup expressions. */
function isBindingLookupKey(value: unknown): value is boolean | null | number | string {
  return (
    value === null ||
    typeof value === 'boolean' ||
    typeof value === 'string' ||
    (typeof value === 'number' && Number.isFinite(value))
  );
}

/*** Encode one primitive lookup identity so strings and other primitive kinds cannot collide. */
function bindingLookupKeyIdentity(value: boolean | null | number | string): string {
  return value === null ? 'null' : `${typeof value}:${String(value)}`;
}

/*** Validate a condition expressed through the same recursive binding vocabulary. */
function isBindingCondition(value: unknown): boolean {
  return (
    isRecord(value) &&
    isBindingExpression(value.source) &&
    ['eq', 'exists', 'neq', 'notExists'].includes(String(value.operator)) &&
    (value.value === undefined || isBindingExpression(value.value))
  );
}

/*** Validate a lifecycle state and its optional bound display expression. */
function isBindingLifecycleBehavior(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.state === 'string' &&
    ['empty', 'error', 'loading'].includes(value.state) &&
    (value.value === undefined || isBindingExpression(value.value)) &&
    isOptionalString(value.message)
  );
}

/*** Validate every recursively authored invocation input expression. */
function isBindingInputMap(value: unknown): boolean {
  return isRecord(value) && Object.values(value).every(isBindingExpression);
}

/*** Validate ordered expression transforms. */
function isBindingTransforms(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.every((transform) =>
      ['length', 'lowercase', 'number', 'trim', 'uppercase'].includes(String(transform)),
    )
  );
}
