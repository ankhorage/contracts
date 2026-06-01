export type NutritionIsoDateTime = string;
export type NutritionProductId = string;
export type NutritionCaptureSubmissionId = string;
export type NutritionReviewId = string;
export type NutritionUserId = string;

export type NutritionJsonValue =
  | boolean
  | number
  | string
  | null
  | readonly NutritionJsonValue[]
  | { readonly [key: string]: NutritionJsonValue };

export const NUTRITION_BARCODE_TYPES = [
  'ean_8',
  'ean_13',
  'upc_a',
  'upc_e',
  'gtin_14',
  'unknown',
] as const;
export type NutritionBarcodeType = (typeof NUTRITION_BARCODE_TYPES)[number];

export interface NutritionBarcode {
  readonly value: string;
  readonly type: NutritionBarcodeType;
  readonly normalizedValue?: string;
}

export const NUTRITION_PRODUCT_STATUSES = [
  'draft',
  'pending_review',
  'published',
  'rejected',
  'archived',
] as const;
export type NutritionProductStatus = (typeof NUTRITION_PRODUCT_STATUSES)[number];

export const NUTRITION_DATA_SOURCES = [
  'manual_scan',
  'user_correction',
  'open_food_facts',
  'foodrepo_legacy',
  'retailer_import',
  'admin_import',
] as const;
export type NutritionDataSource = (typeof NUTRITION_DATA_SOURCES)[number];

export const NUTRITION_SOURCE_CONFIDENCE_LEVELS = ['unknown', 'low', 'medium', 'high'] as const;
export type NutritionSourceConfidence = (typeof NUTRITION_SOURCE_CONFIDENCE_LEVELS)[number];
