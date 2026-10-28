import { expect, it } from 'bun:test';

import type { AdsAccount, AdsChangeDescriptor, AdsResult, AdsValue } from './ads';

const CHANGE: AdsChangeDescriptor = {
  id: 'change-1',
  stage: 'validate',
  resource: {
    kind: 'campaign',
    accountId: 'customer-1',
    resourceId: 'campaign-1',
  },
  operation: 'update',
  values: { status: 'paused' },
  extensions: [
    {
      provider: 'example-provider',
      values: { providerOnlySetting: { enabled: true } },
    },
  ],
};

it('serializes provider-neutral Ads data and optional provider extensions', () => {
  const account: AdsAccount = {
    id: 'customer-1',
    displayName: 'Example advertiser',
    currencyCode: 'CHF',
  };
  const result: AdsResult<AdsChangeDescriptor> = { ok: true, value: CHANGE };

  expect(JSON.parse(JSON.stringify({ account, result }))).toEqual({ account, result });
});

it('keeps common change values and extensions JSON-compatible', () => {
  const value: AdsValue = {
    enabled: true,
    labels: ['seasonal'],
    nested: { amountMicros: '2500000' },
  };

  expect(JSON.parse(JSON.stringify(value))).toEqual(value);
});
