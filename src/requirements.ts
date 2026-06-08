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
}

export interface ScreenCapabilityRequirement {
  readonly capability: string;
  readonly source?: RequirementSource;
}

export interface ScreenRequirements {
  readonly