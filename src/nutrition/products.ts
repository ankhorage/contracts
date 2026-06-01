import type {
  NutritionBarcode,
  NutritionDataSource,
  NutritionIsoDateTime,
  NutritionJsonValue,
  NutritionProductId,
  NutritionProductStatus,
  NutritionSourceConfidence,
} from './common';

export type NutritionMeasurementBasis = 'per_100g' | 'per_100ml';

export interface NutritionFactsPer100g {
  readonly basis?: NutritionMeasurementBasis;
  readonly energyKcal?: number;
  readonly energyKj?: number;
  readonly proteinG?: number;
  readonly carbohydratesG?: number;
  readonly sugarsG?: number;
  readonly fatG?: number;
  readonly saturatedFatG?: number;
  readonly fiberG?: number;
  readonly saltG?: number;
  readonly sodiumG?: number;
}

export interface NutritionServing {
  readonly label?: string;
  readonly sizeG?: number;
  readonly sizeMl?: number;
  readonly servingsPerPackage?: number;
}

export interface NutritionIngredientStatement {
  readonly text?: string;
  readonly locale?: string;
  readonly rawText?: string;
}

export type NutritionAllergenTag =
  | 'celery'
  | 'cereals_containing_gluten'
  | 'crustaceans'
  | 'eggs'
  | 'fish'
  | 'lupin'
  | 'milk'
  | 'molluscs'
  | 'mustard'
  | 'nuts'
  | 'peanuts'
  | 'sesame'
  | 'soybeans'
  | 'sulphur_dioxide_and_sulphites'
  | (string & {});

export interface NutritionStoreObservation {
  readonly countryCode?: string;
  readonly storeChain?: string;
  readonly storeName?: string;
  readonly storeLocationLabel?: string;
  readonly observedAt?: NutritionIsoDateTime;
}

export const NUTRITION_IMAGE_KINDS = [
  'front',
  'nutrition_label',
  'ingredients',
  'barcode',
  'package_back',
  'other',
] as const;
export type NutritionImageKind = (typeof NUTRITION_IMAGE_KINDS)[number];

export interface NutritionImageEvidence {
  readonly id?: string;
  readonly kind: NutritionImageKind;
  readonly storageId?: string;
  readonly bucket?: string;
  readonly path?: string;
  readonly publicUrl?: string;
  readonly contentType?: string;
  readonly width?: number;
  readonly height?: number;
  readonly capturedAt?: NutritionIsoDateTime;
  readonly metadata?: Record<string, NutritionJsonValue>;
}

export interface NutritionProductSummary {
  readonly id: NutritionProductId;
  readonly primaryBarcode: NutritionBarcode;
  readonly name: string;
  readonly brand?: string;
  readonly quantity?: string;
  readonly status: NutritionProductStatus;
  readonly source: NutritionDataSource;
  readonly sourceConfidence: NutritionSourceConfidence;
  readonly imageUrl?: string;
  readonly updatedAt: NutritionIsoDateTime;
}

export interface NutritionProduct {
  readonly id: NutritionProductId;
  readonly primaryBarcode: NutritionBarcode;
  readonly barcodes?: readonly NutritionBarcode[];
  readonly name: string;
  readonly brand?: string;
  readonly quantity?: string;
  readonly packageSizeG?: number;
  readonly packageSizeMl?: number;
  readonly serving?: NutritionServing;
  readonly nutrientsPer100g?: NutritionFactsPer100g;
  readonly ingredients?: NutritionIngredientStatement;
  readonly allergens?: readonly NutritionAllergenTag[];
  readonly traces?: readonly NutritionAllergenTag[];
  readonly stores?: readonly NutritionStoreObservation[];
  readonly images?: readonly NutritionImageEvidence[];
  readonly status: NutritionProductStatus;
  readonly source: NutritionDataSource;
  readonly sourceConfidence: NutritionSourceConfidence;
  readonly sourcePayload?: NutritionJsonValue;
  readonly verifiedByUser?: boolean;
  readonly createdAt: NutritionIsoDateTime;
  readonly updatedAt: NutritionIsoDateTime;
  readonly publishedAt?: NutritionIsoDateTime | null;
}

export interface NutritionProductDetail {
  readonly product: NutritionProduct;
}

export interface NutritionProductLookupByBarcodeResponse {
  readonly product: NutritionProduct;
}
