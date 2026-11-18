import { expect, it } from 'bun:test';

import typescriptRecognition from '../test/website/fixtures/typescript-recognition.json' with { type: 'json' };
import type { WebsiteRecognitionDocument, WebsiteSiteChromeCandidate } from './website.js';

const websiteRecognitionFixture = typescriptRecognition as unknown as WebsiteRecognitionDocument;
const pageLocalClassification: WebsiteSiteChromeCandidate['classification'] = 'page-local';

it('retains page-local site-chrome evidence without asserting site-wide ownership', () => {
  expect(websiteRecognitionFixture.siteChrome?.candidates[0]).toMatchObject({
    classification: 'site-candidate',
    memberships: [
      {
        pageId: 'home',
        source: {
          ancestorSourceRefs: [],
          dom: { tagName: 'header' },
          semantics: { role: 'banner' },
        },
        state: 'present',
      },
      { pageId: 'about', state: 'missing', subtree: null },
    ],
    role: 'header',
    uncertainty: [{ code: 'cross-page-unverified' }],
  });
  expect(
    websiteRecognitionFixture.siteChrome?.candidates[0]?.memberships[0]?.subtree?.root,
  ).toMatchObject({
    children: [{ id: 'home:chrome:nav', type: 'Navigation' }],
    id: 'home:chrome:header',
    type: 'Flex',
  });
});

it('publishes page-local as a distinct candidate classification', () => {
  expect(pageLocalClassification).toBe('page-local');
});

it('retains one-page ambiguous evidence and its explicit uncertainty', () => {
  expect(websiteRecognitionFixture.siteChrome?.candidates.at(-1)).toMatchObject({
    classification: 'ambiguous',
    memberships: [{ pageId: 'home', state: 'present' }],
    role: 'footer',
    uncertainty: [{ code: 'cross-page-unverified' }, { code: 'scope-ambiguous' }],
  });
});

it('classifies article header and footer evidence as page-local with every recursive UiNode mapped in order', () => {
  const pageLocalCandidates = websiteRecognitionFixture.siteChrome?.candidates.filter(
    (candidate) => candidate.classification === 'page-local',
  );

  expect(pageLocalCandidates).toHaveLength(2);
  expect(pageLocalCandidates?.map((candidate) => candidate.role)).toEqual(['header', 'footer']);

  for (const candidate of pageLocalCandidates ?? []) {
    const [membership] = candidate.memberships;
    const subtree = membership?.subtree;

    expect(membership?.source).toMatchObject({
      ancestorSourceRefs: ['home:main', 'home:article'],
      parentSourceRef: 'home:article',
    });
    expect(membership?.source?.dom.tagName).toBe(candidate.role);
    expect(subtree).not.toBeNull();
    expect(flattenUiNodeIds(subtree?.root)).toEqual(subtree?.nodes.map((node) => node.id));
    expect(subtree?.nodes.map((node) => node.sourceRefs)).toEqual(
      subtree?.nodes.map((node) => [node.id]),
    );
  }
});

const flattenUiNodeIds = (node: WebsiteRecognitionDocument['pages'][number]['root']): string[] => [
  node.id,
  ...(node.children?.flatMap(flattenUiNodeIds) ?? []),
];
