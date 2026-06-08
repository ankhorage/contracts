import type { ManifestValue } from './types';

declare module './types' {
  interface ScreenSpec {
    readonly requires?: ScreenRequirements;
  }
}

export interface RequirementSource {
  readonly nodeId?: string;
  readonly componentType?: string;
}

export interface ScreenPermissionRequirement {
  readonly permission: string;
  readonly source?: RequirementSource;
  readonly metadata?: Record<string, ManifestValue>;
}
