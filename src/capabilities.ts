import { uniqueSortedStrings } from '@ankhorage/utility/array';
import { isRecord } from '@ankhorage/utility/object';
import { isNonEmptyString, isOptionalString } from '@ankhorage/utility/string';

import { isDataSchemaSlot } from './data/dataValidation';
import type { DataSchemaSlot } from './data/schemas';

/*** Enumerate the operations a capability exposes to other packages. */
export const CAPABILITY_ACCESS = ['emit', 'invoke', 'read', 'subscribe', 'write'] as const;

export type CapabilityAccess = (typeof CAPABILITY_ACCESS)[number];

/*** Enumerate the portable runtime families supported by capability bindings. */
export const CAPABILITY_BINDING_KINDS = [
  'action',
  'api',
  'auth',
  'authorization',
  'context',
  'event',
  'permission',
  'state',
] as const;

export type CapabilityBindingKind = (typeof CAPABILITY_BINDING_KINDS)[number];

/*** Enumerate the directions in which a capability can participate in a binding. */
export const CAPABILITY_BINDING_ROLES = ['source', 'target'] as const;

export type CapabilityBindingRole = (typeof CAPABILITY_BINDING_ROLES)[number];

/**
 * Portable description of one bindable or executable Ankhorage capability.
 *
 * Packages publish capability catalogs from `src/capabilities/index.ts`. Runtime registries,
 * handlers, adapters, transport details, and framework objects remain package-owned and are not
 * part of this serializable contract.
 */
export interface Capability {
  readonly id: `${string}.${string}`;
  readonly owner: string;
  readonly access: readonly CapabilityAccess[];
  readonly binding: {
    readonly kind: CapabilityBindingKind;
    readonly bindableAs: readonly CapabilityBindingRole[];
  };
  readonly label?: string;
  readonly description?: string;
  readonly input?: DataSchemaSlot;
  readonly output?: DataSchemaSlot;
}

/*** Validate a stable dot-separated identifier for one capability. */
export function isCapabilityId(value: unknown): value is Capability['id'] {
  return (
    isNonEmptyString(value) &&
    value.split('.').length >= 2 &&
    value.split('.').every(isNonEmptyString)
  );
}

/*** Validate an untrusted value as one complete portable capability descriptor. */
export function isCapability(value: unknown): value is Capability {
  return (
    isRecord(value) &&
    isCapabilityId(value.id) &&
    isNonEmptyString(value.owner) &&
    isCapabilityAccessList(value.access) &&
    isCapabilityBinding(value.binding) &&
    isOptionalString(value.label) &&
    isOptionalString(value.description) &&
    (value.input === undefined || isDataSchemaSlot(value.input)) &&
    (value.output === undefined || isDataSchemaSlot(value.output))
  );
}

/*** Return a capability with access and binding-role collections sorted and deduplicated. */
export function normalizeCapability(capability: Capability): Capability {
  return {
    ...capability,
    access: normalizeCapabilityAccess(capability.access),
    binding: {
      ...capability.binding,
      bindableAs: normalizeCapabilityBindingRoles(capability.binding.bindableAs),
    },
  };
}

/*** Compare capability descriptors independent of object property and unordered collection ordering. */
export function areCapabilitiesEqual(left: Capability, right: Capability): boolean {
  return areCapabilityValuesEqual(normalizeCapability(left), normalizeCapability(right));
}

/*** Validate a non-empty collection of supported capability access operations. */
function isCapabilityAccessList(value: unknown): value is readonly CapabilityAccess[] {
  return (
    Array.isArray(value) && value.length > 0 && value.every((entry) => isCapabilityAccess(entry))
  );
}

/*** Validate a portable capability binding descriptor. */
function isCapabilityBinding(value: unknown): value is Capability['binding'] {
  return (
    isRecord(value) &&
    isCapabilityBindingKind(value.kind) &&
    Array.isArray(value.bindableAs) &&
    value.bindableAs.every((entry) => isCapabilityBindingRole(entry))
  );
}

/*** Validate one supported capability access operation. */
function isCapabilityAccess(value: unknown): value is CapabilityAccess {
  return typeof value === 'string' && CAPABILITY_ACCESS.some((access) => access === value);
}

/*** Validate one supported capability binding family. */
function isCapabilityBindingKind(value: unknown): value is CapabilityBindingKind {
  return (
    typeof value === 'string' &&
    CAPABILITY_BINDING_KINDS.some((bindingKind) => bindingKind === value)
  );
}

/*** Validate one supported capability binding direction. */
function isCapabilityBindingRole(value: unknown): value is CapabilityBindingRole {
  return (
    typeof value === 'string' &&
    CAPABILITY_BINDING_ROLES.some((bindingRole) => bindingRole === value)
  );
}

/*** Sort and deduplicate supported access operations using the canonical Utility collection helper. */
function normalizeCapabilityAccess(
  access: readonly CapabilityAccess[],
): readonly CapabilityAccess[] {
  return uniqueSortedStrings(access).filter(isCapabilityAccess);
}

/*** Sort and deduplicate supported binding directions using the canonical Utility collection helper. */
function normalizeCapabilityBindingRoles(
  bindingRoles: readonly CapabilityBindingRole[],
): readonly CapabilityBindingRole[] {
  return uniqueSortedStrings(bindingRoles).filter(isCapabilityBindingRole);
}

/*** Compare the serializable values contained by two normalized capability descriptors. */
function areCapabilityValuesEqual(left: unknown, right: unknown): boolean {
  if (Object.is(left, right)) return true;
  if (Array.isArray(left) || Array.isArray(right)) return areCapabilityArraysEqual(left, right);
  if (isRecord(left) && isRecord(right)) return areCapabilityRecordsEqual(left, right);
  return false;
}

/*** Compare two serializable arrays in their authored order. */
function areCapabilityArraysEqual(left: unknown, right: unknown): boolean {
  return (
    Array.isArray(left) &&
    Array.isArray(right) &&
    left.length === right.length &&
    left.every((value, index) => areCapabilityValuesEqual(value, right.at(index)))
  );
}

/*** Compare two serializable records independent of their authored property order. */
function areCapabilityRecordsEqual(
  left: Record<string, unknown>,
  right: Record<string, unknown>,
): boolean {
  const leftEntries = Object.entries(left);
  const rightEntries = Object.entries(right);
  return (
    leftEntries.length === rightEntries.length &&
    leftEntries.every(([leftKey, leftValue]) =>
      rightEntries.some(
        ([rightKey, rightValue]) =>
          leftKey === rightKey && areCapabilityValuesEqual(leftValue, rightValue),
      ),
    )
  );
}
