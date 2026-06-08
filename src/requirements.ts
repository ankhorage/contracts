export interface ScreenRequirements {
  readonly permissions?: readonly string[];
  readonly capabilities?: readonly string[];
}

declare module './types' {
  interface ScreenSpec {
    readonly requires?: ScreenRequirements;
  }
}
