import type {
  NutritionBarcode,
  NutritionCaptureSubmissionId,
  NutritionIsoDateTime,
  NutritionJsonValue,
  NutritionProductId,
  NutritionUserId,
} from './common';
import type {
  NutritionFactsPer100g,
  NutritionImageEvidence,
  NutritionIngredientStatement,
  NutritionServing,
  NutritionStoreObservation,
} from './products';

export const NUTRITION_CAPTURE_SUBMISSION_STATUSES = [
  'queued',
  'needs_more_data',
  'accepted',
  'rejected',
  'merged',
] as const;
export type NutritionCaptureSubmissionStatus =
  (typeof NUTRITION_CAPTURE_SUBMISSION_STATUSES)[number];

export interface NutritionCaptureClientContext {
  readonly userId?: NutritionUserId;
  readonly anonymousDeviceId?: string;
  readonly platform?: 'android' | 'ios' | 'web' | (string & {});
  readonly appVersion?: string;
  readonly locale?: string;
  readonly clientCapturedAt?: NutritionIsoDateTime;
}

export interface NutritionProductCaptureDraft {
  readonly barcode: NutritionBarcode;
  readonly name?: string;
  readonly brand?: string;
  readonly quantity?: string;
  readonly packageSizeG?: number;
  readonly packageSizeMl?: number;
  readonly serving?: NutritionServing;
  readonly nutrientsPer100g?: NutritionFactsPer100g;
  readonly ingredients?: NutritionIngredientStatement;
  readonly storeObservation?: NutritionStoreObservation;
  readonly images?: readonly NutritionImageEvidence[];
  readonly rawPayload?: NutritionJsonValue;
}

export interface NutritionProductCaptureRequest {
  readonly draft: NutritionProductCaptureDraft;
  readonly client?: NutritionCaptureClientContext;
}

export interface NutritionProductCaptureResponse {
  readonly submissionId: NutritionCaptureSubmissionId;
  readonly status: NutritionCaptureSubmissionStatus;
  readonly productId?: NutritionProductId;
  readonly message?: string;
}

export interface NutritionProductCorrectionRequest {
  readonly productId: NutritionProductId;
  readonly patch: Partial<NutritionProductCaptureDraft>;
  readonly client?: NutritionCaptureClientContext;
  readonly note?: string;
}

export interface NutritionCaptureSubmission {
  readonly id: NutritionCaptureSubmissionId;
  readonly status: NutritionCaptureSubmissionStatus;
  readonly draft: NutritionProductCaptureDraft;
  readonly client?: NutritionCaptureClientContext;
  readonly matchedProductId?: NutritionProductId | null;
  readonly reviewerNote?: string;
  readonly createdAt: NutritionIsoDateTime;
  readonly updatedAt: NutritionIsoDateTime;
  readonly decidedAt?: NutritionIsoDateTime | null;
}
