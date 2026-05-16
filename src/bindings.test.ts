import { describe, expect, it } from 'bun:test';

import type {
  BindingValueSource,
  DbCollectionQueryBinding,
  NodePropBinding,
  UiNode,
} from './index';

describe('binding contracts', () => {
  it('serializes a node prop bound to state', () => {
    const binding: NodePropBinding = {
      prop: 'value',
      valueFrom: {
        source: 'state',
        path: 'forms.contact.values.firstname',
      },
      transform: 'trim',
    };
    const node: UiNode = {
      id: 'firstname-input',
      type: 'Input',
      props: {
        label: 'Firstname',
      },
      bindings: [binding],
    };

    expect(JSON.parse(JSON.stringify(node))).toEqual(node);
    expect(node.bindings?.[0]?.valueFrom.source).toBe('state');
  });

  it('serializes a node prop bound to a DB collection query', () => {
    const query: DbCollectionQueryBinding = {
      collection: 'posts',
      schema: 'public',
      columns: ['id', 'title', 'published'],
      filters: [{ field: 'published', operator: 'eq', value: true }],
      sort: [{ field: 'created_at', direction: 'desc' }],
      page: { limit: 10, offset: 0 },
      refresh: 'live',
    };
    const node: UiNode = {
      id: 'posts-list',
      type: 'CollectionList',
      bindings: [
        {
          prop: 'items',
          valueFrom: {
            source: 'db.collection',
            query,
          },
        },
      ],
    };

    expect(JSON.parse(JSON.stringify(node))).toEqual(node);
    expect(node.bindings?.[0]?.valueFrom.source).toBe('db.collection');
  });

  it('supports literal, context, and event value sources', () => {
    const sources: readonly BindingValueSource[] = [
      { source: 'literal', value: { fallback: 'Untitled' } },
      { source: 'context', path: 'auth.user.displayName' },
      { source: 'event', path: 'payload.values.search' },
    ];

    expect(JSON.parse(JSON.stringify(sources))).toEqual(sources);
    expect(sources.map((source) => source.source)).toEqual(['literal', 'context', 'event']);
  });

  it('supports static, focus, poll, and live refresh intent', () => {
    const refreshModes = ['static', 'focus', 'poll', 'live'] as const;
    const bindings = refreshModes.map(
      (refresh): NodePropBinding => ({
        prop: `items.${refresh}`,
        valueFrom: {
          source: 'db.collection',
          query: {
            collection: 'posts',
            refresh,
            pollIntervalMs: refresh === 'poll' ? 30_000 : undefined,
          },
        },
      }),
    );

    expect(JSON.parse(JSON.stringify(bindings))).toEqual(bindings);
    expect(bindings.map((binding) => binding.valueFrom.source)).toEqual([
      'db.collection',
      'db.collection',
      'db.collection',
      'db.collection',
    ]);
  });
});
