import type { ComponentEventDtoKind } from './types';

export type UiComponentCategory = 'component' | 'foundation' | 'layout' | 'pattern';

export type UiComponentPropType =
  | 'action'
  | 'array'
  | 'boolean'
  | 'color'
  | 'enum'
  | 'imageAsset'
  | 'number'
  | 'radius'
  | 'shadow'
  | 'spacing'
  | 'string'
  | 'typographySize'
  | 'typographyWeight';

export type UiComponentPropValue =
  | string
  | number
  | boolean
  | null
  | readonly UiComponentPropValue[]
  | {
      readonly [key: string]: UiComponentPropValue;
    };

export interface UiComponentPropArrayItemSchema {
  readonly key: string;
  readonly schema: UiComponentPropSchema;
}

export interface UiComponentPropSchema {
  readonly type: UiComponentPropType;
  readonly category: string;
  readonly label?: string;
  readonly enum?: readonly (number | string)[];
  readonly default?: UiComponentPropValue;
  readonly itemSchema?: readonly UiComponentPropArrayItemSchema[];
}

export interface UiComponentBlueprintIcon {
  readonly name: string;
  readonly provider?: string;
}

export interface UiComponentBlueprint {
  readonly label: string;
  readonly icon?: UiComponentBlueprintIcon;
  readonly defaultProps?: Readonly<Record<string, UiComponentPropValue>>;
}

export interface UiComponentI18nFieldMeta {
  readonly keyProp: string;
  readonly defaultTextProp: string;
}

export interface UiComponentI18nMeta {
  readonly fields: readonly UiComponentI18nFieldMeta[];
}

export type UiComponentEventPayloadKind = ComponentEventDtoKind | (string & {});

export type UiComponentEventPayloadFieldType =
  | 'boolean'
  | 'number'
  | 'object'
  | 'record'
  | 'string'
  | 'unknown';

export interface UiComponentEventPayloadFieldMeta {
  readonly path: string;
  readonly type: UiComponentEventPayloadFieldType;
  readonly label?: string;
  readonly description?: string;
}

export interface UiComponentEventMeta {
  readonly label: string;
  readonly eventType: UiComponentEventPayloadKind;
  readonly description?: string;
  readonly payloadFields?: readonly UiComponentEventPayloadFieldMeta[];
}

export interface UiComponentSlotMeta {
  readonly label?: string;
  readonly allowedChildren?: readonly string[];
}

export interface UiComponentMeta {
  readonly name: string;
  readonly category: UiComponentCategory;
  readonly description?: string;
  readonly directManifestNode: boolean;
  readonly allowedChildren: readonly string[];
  readonly blueprint?: UiComponentBlueprint;
  readonly events?: Readonly<Record<string, UiComponentEventMeta>>;
  readonly i18n?: UiComponentI18nMeta;
  readonly slots?: Readonly<Record<string, UiComponentSlotMeta>>;
  readonly note?: string;
  readonly props: Readonly<Record<string, UiComponentPropSchema>>;
}

export type UiComponentMetaRegistry = Readonly<Record<string, UiComponentMeta>>;

export interface UiComponentPackageManifest {
  readonly packageName: string;
  readonly displayName?: string;
  readonly components: UiComponentMetaRegistry;
}
