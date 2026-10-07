import type { DataSchemaSlot } from './data/schemas';

export type CapabilityBindingKind =
  'action' | 'api' | 'auth' | 'authorization' | 'context' | 'event' | 'permission' | 'state';

export type CapabilityBindingRole = 'source' | 'target';

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
  readonly access: readonly ('emit' | 'invoke' | 'read' | 'subscribe' | 'write')[];
  readonly binding: {
    readonly kind: CapabilityBindingKind;
    readonly bindableAs: readonly CapabilityBindingRole[];
  };
  readonly label?: string;
  readonly description?: string;
  readonly input?: DataSchemaSlot;
  readonly output?: DataSchemaSlot;
}
