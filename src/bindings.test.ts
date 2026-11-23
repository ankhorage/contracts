import { describe, expect, it } from 'bun:test';

import {
  isComponentDataBindingRegistry,
  isScreenDataLoaderDefinition,
} from './appManifest/bindings';
import type {
  BindingExpression,
  BindingInvocation,
  ComponentDataBindingRegistry,
  ScreenDataLoaderDefinition,
} from './index';

function assertSerializable<TValue>(value: TValue): void {
  expect(JSON.parse(JSON.stringify(value))).toEqual(value);
}

describe('capability binding contracts', () => {
  it('uses an emitted capability as a readable reference with a projected path', () => {
    const reference: BindingExpression = {
      capability: 'event.formChanged',
      path: 'payload.values.email',
    };

    assertSerializable(reference);
    expect(reference).toEqual({ capability: 'event.formChanged', path: 'payload.values.email' });
  });

  it('uses an invoke capability as the one event target shape', () => {
    const target: BindingInvocation = {
      capability: 'api.contact.createMessage',
      input: {
        email: { capability: 'event.formChanged', path: 'payload.values.email' },
      },
      result: 'submittedMessage',
    };

    assertSerializable(target);
    expect(target.capability).toBe('api.contact.createMessage');
  });

  it('references a cached invocation result without modelling another execution target', () => {
    const reference: BindingExpression = {
      capability: 'api.products.lookup',
      result: 'lookup',
      path: 'product.id',
    };

    assertSerializable(reference);
    expect(reference.result).toBe('lookup');
  });

  it('keeps nested literal and reference objects and arrays expressible', () => {
    const expression: BindingExpression = {
      kind: 'object',
      fields: {
        route: { kind: 'literal', value: '/products/[id]' },
        params: {
          kind: 'object',
          fields: {
            id: { capability: 'api.products.lookup', result: 'lookup', path: 'product.id' },
            tags: {
              kind: 'array',
              items: [
                { kind: 'literal', value: 'featured' },
                { capability: 'state.search', path: 'selectedTag' },
              ],
            },
          },
        },
      },
    };

    assertSerializable(expression);
    expect(expression.kind).toBe('object');
  });

  it('uses recursive expressions for transforms, conditions and fallbacks', () => {
    const bindings: ComponentDataBindingRegistry = {
      submit: {
        componentId: 'submit',
        props: {
          children: {
            value: {
              kind: 'fallback',
              value: {
                kind: 'transform',
                value: { capability: 'state.profile', path: 'displayName' },
                transforms: ['trim', 'length'],
              },
              fallback: { kind: 'literal', value: 'Guest' },
            },
          },
        },
        events: {
          press: [
            {
              target: {
                capability: 'navigator.navigate',
                input: { route: { kind: 'literal', value: 'home' } },
              },
              when: {
                source: { capability: 'event.press', path: 'payload.enabled' },
                operator: 'eq',
                value: { kind: 'literal', value: true },
              },
            },
          ],
        },
      },
    };

    assertSerializable(bindings);
    expect(isComponentDataBindingRegistry(bindings)).toBe(true);
  });

  it('uses a serializable closed lookup expression with a fallback', () => {
    const expression: BindingExpression = {
      kind: 'lookup',
      source: { capability: 'context.value', path: 'pane' },
      cases: [
        { key: 'master', value: { kind: 'literal', value: 'list' } },
        {
          key: 'detail',
          value: {
            kind: 'transform',
            value: { kind: 'literal', value: 'details' },
            transforms: ['uppercase'],
          },
        },
      ],
      fallback: { kind: 'literal', value: 'unknown' },
    };

    assertSerializable(expression);
    expect(
      isComponentDataBindingRegistry({
        pane: { componentId: 'pane', props: { value: { value: expression } } },
      }),
    ).toBe(true);
  });

  it('rejects malformed closed lookup mappings', () => {
    const source = { capability: 'context.value', path: 'pane' };

    expect(
      isComponentDataBindingRegistry({
        pane: {
          componentId: 'pane',
          props: {
            value: {
              value: {
                kind: 'lookup',
                source,
                cases: [{ key: 'master', value: { kind: 'literal', value: 'list' } }],
              },
            },
          },
        },
      }),
    ).toBe(false);
    expect(
      isComponentDataBindingRegistry({
        pane: {
          componentId: 'pane',
          props: {
            value: {
              value: {
                kind: 'lookup',
                source,
                cases: [
                  { key: 'master', value: { kind: 'literal', value: 'list' } },
                  { key: 'master', value: { kind: 'literal', value: 'duplicate' } },
                ],
                fallback: { kind: 'literal', value: 'unknown' },
              },
            },
          },
        },
      }),
    ).toBe(false);
    expect(
      isComponentDataBindingRegistry({
        pane: {
          componentId: 'pane',
          props: {
            value: {
              value: {
                kind: 'lookup',
                source,
                cases: [{ key: {}, value: { kind: 'literal', value: 'list' } }],
                fallback: { kind: 'literal', value: 'unknown' },
              },
            },
          },
        },
      }),
    ).toBe(false);
  });

  it('accepts the portable finite-number transform', () => {
    const bindings: ComponentDataBindingRegistry = {
      board: {
        componentId: 'board',
        props: {
          columns: {
            value: {
              kind: 'transform',
              value: { capability: 'state.board', path: 'columns' },
              transforms: ['number'],
            },
          },
        },
      },
    };

    assertSerializable(bindings);
    expect(isComponentDataBindingRegistry(bindings)).toBe(true);
  });

  it('uses the same invocation shape for screen loaders', () => {
    const loader: ScreenDataLoaderDefinition = {
      capability: 'api.products.getById',
      result: 'product',
      input: { id: { capability: 'context.route', path: 'params.id' } },
    };

    assertSerializable(loader);
    expect(isScreenDataLoaderDefinition(loader)).toBe(true);
  });

  it('rejects superseded action, operation and source union shapes', () => {
    expect(
      isComponentDataBindingRegistry({
        submit: {
          componentId: 'submit',
          events: { press: [{ target: { kind: 'action', type: 'navigate' } }] },
        },
      }),
    ).toBe(false);
    expect(
      isScreenDataLoaderDefinition({
        kind: 'operation',
        operation: { apiId: 'products', operationId: 'products.list' },
      }),
    ).toBe(false);
  });
});
