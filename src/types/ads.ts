/**
 * Portable, provider-neutral advertising data contracts.
 *
 * Values use JSON-compatible primitives only. Provider-specific capabilities belong in optional
 * extensions so a provider never has to imitate another provider's resource names or settings.
 */

/** ISO 4217 currency code carried with every monetary amount. */
export type AdsCurrencyCode = Uppercase<string>;

/** Integer monetary amount in micros; no currency conversion is implied by this contract. */
export interface AdsMoney {
  readonly currencyCode: AdsCurrencyCode;
  readonly amountMicros: string;
}

/** Common lifecycle status shared by advertising resources. */
export type AdsResourceStatus = 'active' | 'archived' | 'paused' | 'unknown';

/** JSON-compatible value used by explicitly optional provider extensions and change values. */
export type AdsValue =
  boolean | number | string | null | readonly AdsValue[] | { readonly [key: string]: AdsValue };

/** Provider-specific data that does not alter the common Ads contract. */
export interface AdsProviderExtension {
  readonly provider: string;
  readonly values: Readonly<Record<string, AdsValue>>;
}

/** Portable identity for an advertising account or customer. */
export interface AdsAccount {
  readonly id: string;
  readonly displayName?: string;
  readonly currencyCode?: AdsCurrencyCode;
  readonly status?: AdsResourceStatus;
  readonly extensions?: readonly AdsProviderExtension[];
}

/** Portable campaign representation owned by an advertising account. */
export interface AdsCampaign {
  readonly id: string;
  readonly accountId: string;
  readonly name: string;
  readonly status: AdsResourceStatus;
  readonly extensions?: readonly AdsProviderExtension[];
}

/** Portable ad-group representation owned by a campaign. */
export interface AdsAdGroup {
  readonly id: string;
  readonly accountId: string;
  readonly campaignId: string;
  readonly name: string;
  readonly status: AdsResourceStatus;
  readonly extensions?: readonly AdsProviderExtension[];
}

/** Portable advertisement representation, optionally scoped to an ad group. */
export interface AdsAd {
  readonly id: string;
  readonly accountId: string;
  readonly campaignId: string;
  readonly adGroupId?: string;
  readonly status: AdsResourceStatus;
  readonly extensions?: readonly AdsProviderExtension[];
}

/** Aggregate conversion count and optional attributed monetary value. */
export interface AdsConversionSummary {
  readonly count: number;
  readonly value?: AdsMoney;
}

/** Provider-neutral measured performance for an advertising resource. */
export interface AdsPerformanceSummary {
  readonly impressions?: number;
  readonly clicks?: number;
  readonly cost?: AdsMoney;
  readonly conversions?: AdsConversionSummary;
}

/** Structured provider or validation failure without executable error behavior. */
export interface AdsError {
  readonly code: string;
  readonly message: string;
  readonly path?: readonly string[];
  readonly extensions?: readonly AdsProviderExtension[];
}

/** Successful result carrying portable response data. */
export interface AdsSuccessResult<T> {
  readonly ok: true;
  readonly value: T;
}

/** Failed result carrying structured, serializable errors. */
export interface AdsFailureResult {
  readonly ok: false;
  readonly errors: readonly AdsError[];
}

/** Structured result for provider-neutral Ads operations. */
export type AdsResult<T> = AdsFailureResult | AdsSuccessResult<T>;

/** Hierarchy resource kinds addressable by a portable change. */
export type AdsResourceKind = 'account' | 'campaign' | 'ad-group' | 'ad';

/** Lifecycle stage represented by a data-only change descriptor. */
export type AdsChangeStage = 'prepare' | 'validate' | 'apply';

/** Data-only description of a planned Ads resource change. */
export interface AdsChangeDescriptor {
  readonly id: string;
  readonly stage: AdsChangeStage;
  readonly resource: {
    readonly kind: AdsResourceKind;
    readonly accountId: string;
    readonly resourceId?: string;
    readonly campaignId?: string;
    readonly adGroupId?: string;
  };
  readonly operation: 'create' | 'update' | 'delete';
  readonly values: Readonly<Record<string, AdsValue>>;
  readonly extensions?: readonly AdsProviderExtension[];
}
