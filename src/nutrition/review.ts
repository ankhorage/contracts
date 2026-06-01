import type {
  NutritionCaptureSubmissionId,
  NutritionIsoDateTime,
  NutritionJsonValue,
  NutritionProductId,
  NutritionReviewId,
  NutritionUserId,
} from './common';
import type { NutritionCaptureSubmission, NutritionCaptureSubmissionStatus } from './capture';
import type { NutritionProduct } from './products';

export const NUTRITION_REVIEW_DECISIONS = [
  'accept',
  'reject',
  'merge',
  'request_changes',
  'publish',
] as const;
export type NutritionReviewDecision = (typeof NUTRITION_REVIEW_DECISIONS)[number];

export interface NutritionReviewDecisionRequest {
  readonly decision: NutritionReviewDecision;
  readonly submissionId: NutritionCaptureSubmissionId;
  readonly reviewerId?: NutritionUserId;
  readonly targetProductId?: NutritionProductId;
  readonly productOverride?: Partial<NutritionProduct>;
  readonly note?: string;
  readonly metadata?: Record<string, NutritionJsonValue>;
}

export interface NutritionReviewDecisionResponse {
  readonly reviewId: NutritionReviewId;
  readonly submissionId: NutritionCaptureSubmissionId;
  readonly decision: NutritionReviewDecision;
  readonly status: NutritionCaptureSubmissionStatus;
  readonly productId?: NutritionProductId;
  readonly decidedAt: NutritionIsoDateTime;
}

export interface NutritionReviewRecord {
  readonly id: NutritionReviewId;
  readonly submissionId: NutritionCaptureSubmissionId;
  readonly reviewerId?: NutritionUserId;
  readonly decision: NutritionReviewDecision;
  readonly previousStatus: NutritionCaptureSubmissionStatus;
  readonly nextStatus: NutritionCaptureSubmissionStatus;
  readonly targetProductId?: NutritionProductId | null;
  readonly note?: string;
  readonly metadata?: Record<string, NutritionJsonValue>;
  readonly createdAt: NutritionIsoDateTime;
}

export interface NutritionReviewSubmissionListRequest {
  readonly status?: NutritionCaptureSubmissionStatus;
  readonly barcode?: string;
  readonly store?: string;
  readonly limit?: number;
  readonly offset?: number;
}

export interface NutritionReviewSubmissionListResponse {
  readonly submissions: readonly NutritionCaptureSubmission[];
  readonly limit?: number;
  readonly offset?: number;
}
