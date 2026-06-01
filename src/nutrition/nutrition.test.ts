import { describe, expect, it } from 'bun:test';

import {
  NUTRITION_BARCODE_TYPES,
  NUTRITION_CAPTURE_SUBMISSION_STATUSES,
  NUTRITION_DATA_SOURCES,
  NUTRITION_PRODUCT_STATUSES,
  NUTRITION_REVIEW_DECISIONS,
  type NutritionCaptureSubmission,
  type NutritionProduct,
  type NutritionProductCaptureRequest,
  type NutritionReviewDecisionRequest,
} from './index';

describe('nutrition contracts', () => {
  it('exports stable literal unions for nutrition workflows', () => {
    expect(NUTRITION_BARCODE_TYPES).toEqual([
      'ean_8',
      'ean_13',
      'upc_a',
      'upc_e',
      'gtin_14',
      'unknown',
    ]);
    expect(NUTRITION_PRODUCT_STATUSES).toEqual([
      'draft',
      'pending_review',
      'published',
      'rejected',
      'archived',
    ]);
    expect(NUTRITION_DATA_SOURCES).toEqual([
      'manual_scan',
      'user_correction',
      'open_food_facts',
      'foodrepo_legacy',
      'retailer_import',
      'admin_import',
    ]);
    expect(NUTRITION_CAPTURE_SUBMISSION_STATUSES).toEqual([
      'queued',
      'needs_more_data',
      'accepted',
      'rejected',
      'merged',
    ]);
    expect(NUTRITION_REVIEW_DECISIONS).toEqual([
      'accept',
      'reject',
      'merge',
      'request_changes',
      'publish',
    ]);
  });

  it('serializes a published barcode product', () => {
    const product: NutritionProduct = {
      id: 'product_01',
      primaryBarcode: {
        value: '7612345678901',
        type: 'ean_13',
        normalizedValue: '7612345678901',
      },
      name: 'Example Yogurt Nature',
      brand: 'Example Brand',
      quantity: '250 g',
      packageSizeG: 250,
      serving: { label: '1 cup', sizeG: 250, servingsPerPackage: 1 },
      nutrientsPer100g: {
        basis: 'per_100g',
        energyKcal: 62,
        energyKj: 260,
        proteinG: 11,
        carbohydratesG: 3.8,
        sugarsG: 3.8,
        fatG: 0.2,
        saturatedFatG: 0.1,
        fiberG: 0,
        saltG: 0.1,
        sodiumG: 0.04,
      },
      ingredients: { locale: 'de-CH', text: 'Milk, cultures.' },
      allergens: ['milk'],
      stores: [{ countryCode: 'CH', storeChain: 'Example Store' }],
      images: [{ kind: 'nutrition_label', path: 'labels/7612345678901.jpg' }],
      status: 'published',
      source: 'manual_scan',
      sourceConfidence: 'high',
      verifiedByUser: true,
      createdAt: '2026-06-01T12:00:00.000Z',
      updatedAt: '2026-06-01T12:05:00.000Z',
      publishedAt: '2026-06-01T12:10:00.000Z',
    };

    expect(JSON.parse(JSON.stringify(product))).toEqual(product);
    expect(product.nutrientsPer100g?.proteinG).toBe(11);
  });

  it('serializes capture submissions and review decisions', () => {
    const capture: NutritionProductCaptureRequest = {
      draft: {
        barcode: { value: '7612345678901', type: 'ean_13' },
        name: 'Example Yogurt Nature',
        nutrientsPer100g: { energyKcal: 62, proteinG: 11 },
        storeObservation: { countryCode: 'CH', storeChain: 'Example Store' },
        rawPayload: { source: 'manual' },
      },
      client: {
        anonymousDeviceId: 'device-1',
        platform: 'ios',
        appVersion: '0.1.0',
        clientCapturedAt: '2026-06-01T12:00:00.000Z',
      },
    };

    const submission: NutritionCaptureSubmission = {
      id: 'submission_01',
      status: 'queued',
      draft: capture.draft,
      client: capture.client,
      matchedProductId: null,
      createdAt: '2026-06-01T12:00:00.000Z',
      updatedAt: '2026-06-01T12:00:00.000Z',
    };

    const decision: NutritionReviewDecisionRequest = {
      submissionId: submission.id,
      decision: 'accept',
      reviewerId: 'reviewer-1',
      note: 'Readable label.',
    };

    expect(JSON.parse(JSON.stringify(capture))).toEqual(capture);
    expect(JSON.parse(JSON.stringify(submission))).toEqual(submission);
    expect(decision.decision).toBe('accept');
  });
});
