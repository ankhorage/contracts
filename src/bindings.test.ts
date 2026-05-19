import { describe, expect, it } from 'bun:test';

import type {
  AppManifest,
  BindingInputMap,
  BindingValueSource,
  ComponentDataBinding,
  ComponentDataBindingRegistry,
  EventBinding,
  PropBinding,
} from './index';

function assertSerializable<TValue>(value: TValue): void {
  expect(JSON.parse(JSON.stringify(value))).toEqual(value);
}

describe('component data-binding contracts', () => {
  it('serializes a component prop bound to an operation response path', () => {
    const binding: ComponentDataBinding = {
      componentId: 'hero-title',
      componentType: 'Text',
      props: {
        children: {
          source: {
            kind: 'operation',
            operation: {
              dataSourceId: 'cms',
              endpointId: 'pages',
              operationId: 'pages.getHome',
            },
            path: '$.data.title',
          },
          fallback: {
            value: 'Untitled',
          },
          loading: {
            state: 'loading',
            fallback: {
              value: 'Loading…',
            },
          },
          error: {
            state: 'error',
            message: 'Could not load title.',
            fallback: {
              value: 'Untitled',
            },
          },
          transforms: ['trim'],
        },
      },
    };

    assertSerializable(binding);
    expect(binding.props?.children?.source.kind).toBe('operation');
  });

  it('serializes literal, context, event, state, and operation value sources', () => {
    const sources: readonly BindingValueSource[] = [
      { kind: 'literal', value: { fallback: 'Untitled' } },
      { kind: 'context', path: 'auth.user.displayName' },
      { kind: 'event', path: 'payload.values.search' },
      { kind: 'state', path: 'forms.search.query' },
      {
        kind: 'operation',
        operation: {
          dataSourceId: 'search-api',
          operationId: 'search.query',
        },
        path: '$.results',
      },
    ];

    assertSerializable(sources);
    expect(sources.map((source) => source.kind)).toEqual([
      'literal',
      'context',
      'event',
      'state',
      'operation',
    ]);
  });

  it('serializes an event binding that executes a data-source operation', () => {
    const input: BindingInputMap = {
      email: {
        kind: 'source',
        source: {
          kind: 'event',
          path: 'payload.values.email',
        },
        transforms: ['trim', 'lowercase'],
      },
      message: {
        kind: 'source',
        source: {
          kind: 'event',
          path: 'payload.values.message',
        },
      },
      source: {
        kind: 'literal',
        value: 'contact-form',
      },
      metadata: {
        kind: 'object',
        fields: {
          userId: {
            kind: 'source',
            source: {
              kind: 'context',
              path: 'auth.user.id',
            },
          },
        },
      },
    };

    const binding: EventBinding = {
      target: {
        kind: 'operation',
        operation: {
          dataSourceId: 'contact-api',
          endpointId: 'messages',
          operationId: 'messages.create',
        },
      },
      input,
      when: {
        source: {
          kind: 'event',
          path: 'payload.values.email',
        },
        operator: 'exists',
      },
    };

    assertSerializable(binding);
    expect(binding.target.kind).toBe('operation');
    expect(binding.input?.email?.kind).toBe('source');
  });

  it('serializes an event binding that targets a named action', () => {
    const binding: EventBinding = {
      target: {
        kind: 'action',
        type: 'toast.show',
      },
      input: {
        message: {
          kind: 'literal',
          value: 'Saved successfully.',
        },
      },
    };

    assertSerializable(binding);
    expect(binding.target.kind).toBe('action');
  });

  it('serializes component data-binding registries', () => {
    const bindings: ComponentDataBindingRegistry = {
      'submit-button': {
        componentId: 'submit-button',
        componentType: 'Button',
        props: {
          children: {
            source: {
              kind: 'literal',
              value: 'Send',
            },
          },
          disabled: {
            source: {
              kind: 'state',
              path: 'forms.contact.isSubmitting',
            },
          },
        },
        events: {
          press: [
            {
              target: {
                kind: 'operation',
                operation: {
                  dataSourceId: 'contact-api',
                  operationId: 'messages.create',
                },
              },
            },
          ],
        },
      },
    };

    assertSerializable(bindings);
    expect(bindings['submit-button']?.events?.press?.[0]?.target.kind).toBe('operation');
  });

  it('serializes app-level dataSources and dataBindings on the manifest', () => {
    const propBinding: PropBinding = {
      source: {
        kind: 'operation',
        operation: {
          dataSourceId: 'cms',
          endpointId: 'pages',
          operationId: 'pages.getHome',
        },
        path: '$.data.heroTitle',
      },
    };

    const manifest: AppManifest = {
      metadata: {
        name: 'Demo',
        slug: 'demo',
        version: '1.0.0',
        themeId: 'default',
      },
      themes: [
        {
          id: 'default',
          name: 'Default',
          light: {
            primaryColor: '#3366ff',
            harmony: 'analogous',
          },
          dark: {
            primaryColor: '#3366ff',
            harmony: 'analogous',
          },
        },
      ],
      activeThemeId: 'default',
      infra: {
        plugins: [],
      },
      navigator: {
        type: 'stack',
        routes: [
          {
            name: 'home',
            screenId: 'home',
          },
        ],
      },
      screens: {
        home: {
          id: 'home',
          name: 'Home',
          root: {
            id: 'screen-root',
            type: 'Screen',
            children: [
              {
                id: 'hero-title',
                type: 'Text',
              },
            ],
          },
        },
      },
      dataSources: {
        cms: {
          id: 'cms',
          kind: 'rest',
          baseUrl: 'https://cms.example.com',
          endpoints: {
            pages: {
              id: 'pages',
              kind: 'http',
              path: '/pages/home',
              operations: {
                'pages.getHome': {
                  id: 'pages.getHome',
                  endpointId: 'pages',
                  protocol: 'http',
                  intent: 'read',
                  method: 'GET',
                  path: '/pages/home',
                },
              },
            },
          },
        },
      },
      dataBindings: {
        'hero-title': {
          componentId: 'hero-title',
          componentType: 'Text',
          props: {
            children: propBinding,
          },
        },
      },
      settings: {
        localization: {
          defaultLocale: 'en',
          locales: ['en'],
        },
        authFlow: {
          signInRoute: '/sign-in',
          signUpRoute: '/sign-up',
          signOutRoute: '/sign-out',
          forgotPasswordRoute: '/forgot-password',
          postSignInRoute: '/',
          unauthorizedRoute: '/sign-in',
        },
      },
    };

    assertSerializable(manifest);
    expect(manifest.dataBindings?.['hero-title']?.props?.children?.source.kind).toBe('operation');
    expect(manifest.dataSources?.cms?.kind).toBe('rest');
  });
});
