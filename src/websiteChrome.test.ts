import { expect, it } from 'bun:test';

import type { WebsiteSiteChromeRecognition } from './website.js';

const available = { missing: null, status: 'available' } as const;

const globalChromeEvidence = {
  candidates: [
    {
      id: 'chrome:header',
      role: 'header',
      status: 'observed',
      scope: 'global',
      confidence: 0.99,
      memberships: [
        {
          pageId: 'home',
          state: 'present',
          source: {
            sourceRef: 'home:site-header',
            parentSourceRef: 'home:body',
            ancestorSourceRefs: ['home:html', 'home:body'],
            semantics: { tagName: 'header', role: 'banner', ariaLabel: 'Primary' },
            observations: [
              {
                viewportId: 'desktop',
                stateId: 'default',
                availability: available,
                rect: null,
                visibility: 'visible',
              },
            ],
          },
          subtree: {
            root: {
              id: 'home:site-header',
              type: 'Header',
              children: [{ id: 'home:brand', type: 'Heading' }],
            },
            nodes: [
              {
                id: 'home:site-header',
                componentType: 'Header',
                sourceRefs: ['home:site-header'],
                confidence: 0.99,
                props: [],
                responsive: [],
                status: 'recognized',
                unresolved: null,
              },
            ],
          },
        },
        {
          pageId: 'about',
          state: 'present',
          source: {
            sourceRef: 'about:site-header',
            parentSourceRef: 'about:body',
            ancestorSourceRefs: ['about:html', 'about:body'],
            semantics: { tagName: 'header', role: 'banner', ariaLabel: 'Primary' },
            observations: [],
          },
          subtree: null,
        },
      ],
    },
  ],
} as const satisfies WebsiteSiteChromeRecognition;

const articleChromeEvidence = {
  candidates: [
    {
      id: 'chrome:article-header',
      role: 'header',
      status: 'observed',
      scope: 'page-local',
      confidence: 1,
      memberships: [
        {
          pageId: 'article',
          state: 'present',
          source: {
            sourceRef: 'article:header',
            parentSourceRef: 'article:content',
            ancestorSourceRefs: ['article:main', 'article:content'],
            semantics: { tagName: 'header', role: null, ariaLabel: null },
            observations: [],
          },
          subtree: null,
        },
      ],
    },
    {
      id: 'chrome:article-footer',
      role: 'footer',
      status: 'observed',
      scope: 'page-local',
      confidence: 1,
      memberships: [
        {
          pageId: 'article',
          state: 'present',
          source: {
            sourceRef: 'article:footer',
            parentSourceRef: 'article:content',
            ancestorSourceRefs: ['article:main', 'article:content'],
            semantics: { tagName: 'footer', role: null, ariaLabel: null },
            observations: [],
          },
          subtree: null,
        },
      ],
    },
  ],
} as const satisfies WebsiteSiteChromeRecognition;

const absentChromeEvidence = { candidates: [] } as const satisfies WebsiteSiteChromeRecognition;

const ambiguousChromeEvidence = {
  candidates: [
    {
      id: 'chrome:possible-header',
      role: 'header',
      status: 'inferred',
      scope: 'ambiguous',
      confidence: 0.42,
      memberships: [
        {
          pageId: 'only-page',
          state: 'present',
          source: {
            sourceRef: 'only-page:header',
            parentSourceRef: 'only-page:body',
            ancestorSourceRefs: ['only-page:html', 'only-page:body'],
            semantics: { tagName: 'header', role: null, ariaLabel: null },
            observations: [],
          },
          subtree: null,
        },
      ],
    },
  ],
} as const satisfies WebsiteSiteChromeRecognition;

it('retains global candidates, article-local chrome, absence, variants, and single-page uncertainty', () => {
  const [globalHeader] = globalChromeEvidence.candidates;
  const [articleHeader] = articleChromeEvidence.candidates;
  const [ambiguousHeader] = ambiguousChromeEvidence.candidates;
  expect(globalHeader.memberships.map(({ pageId }) => pageId)).toEqual(['home', 'about']);
  expect(globalHeader.memberships[0].subtree.root.children[0]).toMatchObject({
    id: 'home:brand',
  });
  expect(articleChromeEvidence.candidates.map(({ scope }) => scope)).toEqual([
    'page-local',
    'page-local',
  ]);
  expect(articleHeader.memberships[0].source.ancestorSourceRefs).toContain('article:content');
  expect(absentChromeEvidence.candidates).toEqual([]);
  expect(ambiguousHeader).toMatchObject({
    memberships: [{ pageId: 'only-page', subtree: null }],
    scope: 'ambiguous',
    status: 'inferred',
  });
  const variantEvidence = {
    ...globalChromeEvidence,
    candidates: [
      {
        ...globalHeader,
        memberships: [
          globalHeader.memberships[0],
          { ...globalHeader.memberships[1], state: 'variant' as const },
        ],
      },
    ],
  } satisfies WebsiteSiteChromeRecognition;
  expect(variantEvidence.candidates[0].memberships[1].state).toBe('variant');
  expect(JSON.parse(JSON.stringify({ absentChromeEvidence, ambiguousChromeEvidence }))).toEqual({
    absentChromeEvidence,
    ambiguousChromeEvidence,
  });
});
