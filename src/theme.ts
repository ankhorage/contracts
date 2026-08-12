/** Numeric token values authored at theme level. */
export type ThemeNumericTokenOverrides = Readonly<Record<string, number>>;

/** String token values authored at theme level. */
export type ThemeStringTokenOverrides = Readonly<Record<string, string>>;

/** Partial authored override for one semantic heading recipe. */
export interface ThemeTypographyHeadingOverrides {
  readonly size?: number;
  readonly lineHeight?: number;
  readonly weight?: string;
}

/** Theme-global typography source overrides. Font installation remains module-owned. */
export interface ThemeTypographyTokenOverrides {
  readonly headings?: Readonly<Record<string, ThemeTypographyHeadingOverrides>>;
  readonly sizes?: ThemeNumericTokenOverrides;
  readonly weights?: ThemeStringTokenOverrides;
}

/**
 * Theme-global authored token overrides.
 *
 * Color source remains mode-specific on ThemeModeConfig. These values are shared by
 * light and dark mode and are resolved by the render-theme owner rather than copied
 * into every mode branch.
 */
export interface ThemeGlobalTokenOverrides {
  readonly spacing?: ThemeNumericTokenOverrides;
  readonly radii?: ThemeNumericTokenOverrides;
  readonly typography?: ThemeTypographyTokenOverrides;
  readonly shadows?: ThemeNumericTokenOverrides;
}

/** Serializable value supported by the current theme-recipe metadata field kinds. */
export type ThemeRecipeOverrideValue = boolean | string;

/** Persisted values for one component or pattern recipe. */
export type ThemeRecipeFieldOverrides = Readonly<Record<string, ThemeRecipeOverrideValue>>;

/**
 * Generic persisted recipe values.
 *
 * The owning UI package defines available recipes, field schemas, defaults and token
 * relationships. Contracts stores selected values only and does not duplicate that metadata.
 */
export interface ThemeRecipeOverrides {
  readonly components?: Readonly<Record<string, ThemeRecipeFieldOverrides>>;
  readonly patterns?: Readonly<Record<string, ThemeRecipeFieldOverrides>>;
}
