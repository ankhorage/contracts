import type { WebsiteObservationDocument, WebsiteRecognitionDocument } from '../../src/website.js';

const source = {
  crawlerId: 'ankhorage.website-scraper',
  crawlerVersion: '1.0.0',
  crawlId: 'crawl-001',
  revision: 'sha256:source-001',
};
const site = { id: 'example.test', url: 'https://example.test/' };
const viewports = [
  { id: 'mobile', width: 390, height: 844, devicePixelRatio: 3 },
  { id: 'tablet', width: 768, height: 1024, devicePixelRatio: 2 },
  { id: 'desktop', width: 1440, height: 900, devicePixelRatio: 1 },
];
const css = {
  display: 'block',
  position: 'static',
  visibility: 'visible',
  color: 'rgb(34, 34, 34)',
  backgroundColor: 'rgb(255, 255, 255)',
  borderColor: 'rgb(0, 0, 0)',
  borderRadius: '0px',
  borderWidth: '0px',
  fontFamily: 'Inter',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '400',
  letterSpacing: '0px',
  lineHeight: '24px',
  textAlign: 'start',
  textDecoration: 'none',
  margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
  padding: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
  gap: '24px',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'auto',
};
const observation = () => ({
  viewportId: 'desktop',
  stateId: 'default',
  availability: { status: 'available' as const, missing: null },
  rect: { x: 0, y: 0, width: 400, height: 240 },
  css,
  provenance: {
    sourceUrl: 'https://example.test/',
    capturedAt: '2026-11-11T16:30:00.000Z',
    method: 'browser' as const,
  },
});
const node = (
  sourceRef: string,
  parentSourceRef: string | null,
  tagName: string,
  childIndex: number,
) => ({
  sourceRef,
  parentSourceRef,
  ancestorSourceRefs: parentSourceRef === null ? [] : [parentSourceRef],
  dom: { tagName, childIndex, attributes: {} },
  textRuns: [],
  links: [],
  media: [],
  observations: [observation()],
});

export const websiteObservationFixture: WebsiteObservationDocument = {
  schemaVersion: 1,
  documentId: 'crawl:example.test:2026-11-11T16:30:00.000Z',
  collectedAt: '2026-11-11T16:30:00.000Z',
  source,
  site,
  pages: [
    {
      id: 'home',
      url: 'https://example.test/',
      path: '/',
      navigation: [
        {
          id: 'nav:about',
          label: 'About',
          url: 'https://example.test/about',
          sourceRef: 'home:nav:about',
        },
      ],
      viewports,
      states: [{ id: 'default', name: 'default' }],
      nodes: [
        node('home:grid', null, 'main', 0),
        node('home:card:1', 'home:grid', 'article', 0),
        node('home:card:2', 'home:grid', 'article', 1),
        node('home:card:3', 'home:grid', 'article', 2),
        {
          ...node('home:hero:span', 'home:card:1', 'span', 0),
          textRuns: [
            { sourceRef: 'home:hero:span:text:0', text: 'red styled text', start: 0, end: 15 },
          ],
          observations: [{ ...observation(), css: { ...css, color: 'rgb(217, 51, 58)' } }],
        },
        node('home:visible-unresolved', 'home:grid', 'aside', 3),
      ],
      assets: [
        {
          id: 'asset:hero',
          url: 'https://example.test/hero.jpg',
          kind: 'image',
          contentType: 'image/jpeg',
          sourceRefs: ['home:card:1'],
        },
      ],
    },
    {
      id: 'about',
      url: 'https://example.test/about',
      path: '/about',
      navigation: [
        {
          id: 'nav:home',
          label: 'Home',
          url: 'https://example.test/',
          sourceRef: 'about:nav:home',
        },
      ],
      viewports,
      states: [{ id: 'default', name: 'default' }],
      nodes: [node('about:main', null, 'main', 0)],
      assets: [],
    },
  ],
};

export const websiteRecognitionFixture: WebsiteRecognitionDocument = {
  schemaVersion: 1,
  documentId: 'recognition:example.test:2026-11-11T16:31:00.000Z',
  observedDocumentId: websiteObservationFixture.documentId,
  recognizedAt: '2026-11-11T16:31:00.000Z',
  source,
  site,
  navigation: [
    {
      id: 'nav:about',
      label: 'About',
      url: 'https://example.test/about',
      sourceRef: 'home:nav:about',
    },
  ],
  pages: [
    {
      id: 'home',
      url: 'https://example.test/',
      path: '/',
      root: {
        id: 'home:grid',
        type: 'Grid',
        props: { columns: 3 },
        children: [
          {
            id: 'home:card:1',
            type: 'Card',
            children: [
              { id: 'home:heading', type: 'Heading', props: { children: 'Welcome' } },
              { id: 'home:rich-text', type: 'RichText', props: { children: 'red styled text' } },
            ],
          },
          { id: 'home:card:2', type: 'Card' },
          { id: 'home:card:3', type: 'Card' },
        ],
      },
      nodes: [
        {
          id: 'home:grid',
          componentType: 'Grid',
          sourceRefs: ['home:grid'],
          confidence: 1,
          props: [{ name: 'columns', value: 3, originalValues: ['repeat(3, 1fr)'] }],
          responsive: [
            {
              viewportId: 'mobile',
              props: [{ name: 'columns', value: 1, originalValues: ['1fr'] }],
            },
          ],
          status: 'recognized',
          unresolved: null,
        },
        {
          id: 'home:card:1',
          componentType: 'Card',
          sourceRefs: ['home:card:1'],
          confidence: 0.98,
          props: [],
          responsive: [],
          status: 'recognized',
          unresolved: null,
        },
        {
          id: 'home:card:2',
          componentType: 'Card',
          sourceRefs: ['home:card:2'],
          confidence: 0.98,
          props: [],
          responsive: [],
          status: 'recognized',
          unresolved: null,
        },
        {
          id: 'home:card:3',
          componentType: 'Card',
          sourceRefs: ['home:card:3'],
          confidence: 0.98,
          props: [],
          responsive: [],
          status: 'recognized',
          unresolved: null,
        },
        {
          id: 'home:rich-text',
          componentType: 'RichText',
          sourceRefs: ['home:hero:span'],
          confidence: 0.96,
          props: [
            { name: 'children', value: 'red styled text', originalValues: ['red styled text'] },
            { name: 'color', value: 'red.500', originalValues: ['rgb(217, 51, 58)'] },
          ],
          responsive: [],
          status: 'recognized',
          unresolved: null,
        },
        {
          id: 'home:visible-unresolved',
          componentType: 'Unknown',
          sourceRefs: ['home:visible-unresolved'],
          confidence: 0,
          props: [],
          responsive: [],
          status: 'unresolved',
          unresolved: {
            reason: 'Visible source node has no canonical component mapping.',
            sourceRefs: ['home:visible-unresolved'],
          },
        },
      ],
    },
    {
      id: 'about',
      url: 'https://example.test/about',
      path: '/about',
      root: { id: 'about:main', type: 'Grid' },
      nodes: [
        {
          id: 'about:main',
          componentType: 'Grid',
          sourceRefs: ['about:main'],
          confidence: 1,
          props: [],
          responsive: [],
          status: 'recognized',
          unresolved: null,
        },
      ],
    },
  ],
  designTokens: [
    {
      id: 'color:red.500',
      kind: 'color',
      value: '#D9333A',
      originalValues: ['rgb(217, 51, 58)'],
      sourceRefs: ['home:hero:span'],
    },
  ],
  media: [
    {
      id: 'asset:hero',
      sourceRefs: ['home:card:1'],
      originalUrl: 'https://example.test/hero.jpg',
      asset: null,
    },
  ],
};
