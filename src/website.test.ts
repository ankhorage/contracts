import { expect, it } from 'bun:test';

import phpObservation from '../test/website/fixtures/php-observation.json' with { type: 'json' };
import phpRecognition from '../test/website/fixtures/php-recognition.json' with { type: 'json' };
import typescriptObservation from '../test/website/fixtures/typescript-observation.json' with { type: 'json' };
import typescriptRecognition from '../test/website/fixtures/typescript-recognition.json' with { type: 'json' };
import type {
  WebsiteNodeObservation,
  WebsiteObservationDocument,
  WebsiteRecognitionDocument,
} from './website.js';

const websiteObservationFixture = typescriptObservation as unknown as WebsiteObservationDocument;
const websiteRecognitionFixture = typescriptRecognition as unknown as WebsiteRecognitionDocument;

const schemaV1ObservationWithoutSemanticAttributes: WebsiteNodeObservation = {
  availability: { missing: null, status: 'available' },
  css: null,
  provenance: {
    capturedAt: '2026-11-10T00:00:00.000Z',
    method: 'browser',
    sourceUrl: 'https://example.test/',
  },
  rect: null,
  stateId: 'default',
  viewportId: 'desktop',
};

const animationEvidenceObservations: readonly WebsiteNodeObservation[] = [
  {
    availability: { missing: null, status: 'available' },
    animationEvidence: {
      pseudoElements: [
        {
          availability: { missing: null, status: 'available' },
          boxSize: {
            height: { availability: { missing: null, status: 'available' }, value: '4px' },
            width: { availability: { missing: null, status: 'available' }, value: '0px' },
          },
          content: { availability: { missing: null, status: 'available' }, value: '""' },
          css: null,
          pseudo: '::before',
        },
        {
          availability: {
            missing: { code: 'pseudo-element-unavailable', message: 'No generated after element.' },
            status: 'missing',
          },
          content: {
            availability: {
              missing: {
                code: 'pseudo-element-unavailable',
                message: 'No generated after element.',
              },
              status: 'missing',
            },
            value: null,
          },
          boxSize: {
            height: {
              availability: {
                missing: {
                  code: 'pseudo-element-unavailable',
                  message: 'No generated after element.',
                },
                status: 'missing',
              },
              value: null,
            },
            width: {
              availability: {
                missing: {
                  code: 'pseudo-element-unavailable',
                  message: 'No generated after element.',
                },
                status: 'missing',
              },
              value: null,
            },
          },
          css: null,
          pseudo: '::after',
        },
      ],
      target: {
        animation: { availability: { missing: null, status: 'available' }, value: 'none' },
        transform: {
          availability: { missing: null, status: 'available' },
          value: 'matrix(1, 0, 0, 1, 0, 0)',
        },
        transition: {
          availability: { missing: null, status: 'available' },
          value: 'width 80ms linear',
        },
      },
      trigger: 'scroll-into-view',
      uncertainty: [],
    },
    css: null,
    provenance: {
      capturedAt: '2026-11-14T00:00:00.000Z',
      method: 'browser',
      sourceUrl: 'https://example.test/',
    },
    rect: null,
    stateId: 'initial',
    viewportId: 'desktop',
  },
  {
    availability: { missing: null, status: 'available' },
    animationEvidence: {
      pseudoElements: [
        {
          availability: { missing: null, status: 'available' },
          boxSize: {
            height: { availability: { missing: null, status: 'available' }, value: '4px' },
            width: { availability: { missing: null, status: 'available' }, value: '75px' },
          },
          content: { availability: { missing: null, status: 'available' }, value: '""' },
          css: null,
          pseudo: '::before',
        },
      ],
      target: {
        animation: { availability: { missing: null, status: 'available' }, value: 'none' },
        transform: {
          availability: { missing: null, status: 'available' },
          value: 'matrix(1, 0, 0, 1, 0, 0)',
        },
        transition: {
          availability: { missing: null, status: 'available' },
          value: 'width 80ms linear',
        },
      },
      trigger: 'scroll-into-view',
      uncertainty: [],
    },
    css: null,
    provenance: {
      capturedAt: '2026-11-14T00:00:01.000Z',
      method: 'browser',
      sourceUrl: 'https://example.test/',
    },
    rect: null,
    stateId: 'settled',
    viewportId: 'desktop',
  },
];

it('keeps TypeScript and PHP website observation fixtures identical and serializable', () => {
  expect(typescriptObservation).toEqual(phpObservation);
  expect(typescriptObservation.pages).toHaveLength(2);
  expect(typescriptObservation.pages[0]?.viewports).toHaveLength(3);
  const cssSkillObservations = websiteObservationFixture.pages[0]?.nodes.find(
    (node) => node.sourceRef === 'home:skills:css',
  )?.observations;

  expect(
    cssSkillObservations?.find((observation) => observation.stateId === 'initial'),
  ).toMatchObject({
    animationEvidence: { pseudoElements: [{ boxSize: { width: { value: '0px' } } }] },
  });
  expect(
    cssSkillObservations?.find((observation) => observation.stateId === 'settled'),
  ).toMatchObject({
    animationEvidence: { pseudoElements: [{ boxSize: { width: { value: '75px' } } }] },
  });
  expect(JSON.parse(JSON.stringify(websiteObservationFixture))).toEqual(websiteObservationFixture);
});

it('keeps TypeScript and PHP website recognition fixtures identical and serializable', () => {
  expect(typescriptRecognition).toEqual(phpRecognition);
  expect(typescriptRecognition.pages[0]?.root.children).toHaveLength(4);
  expect(JSON.parse(JSON.stringify(websiteRecognitionFixture))).toEqual(websiteRecognitionFixture);
});

it('retains the visible unresolved node and the styled inline text run', () => {
  const redStyledSpan = websiteObservationFixture.pages[0]?.nodes.find(
    (node) => node.sourceRef === 'home:hero:span',
  );

  expect(redStyledSpan).toMatchObject({
    observations: [
      {
        css: { color: 'rgb(217, 51, 58)' },
        rect: { height: 24, width: 120, x: 0, y: 0 },
        semanticAttributes: {},
      },
    ],
    textRuns: [{ text: 'red styled text' }],
  });
  expect(
    websiteRecognitionFixture.pages[0]?.nodes.find((node) => node.status === 'unresolved'),
  ).toMatchObject({ sourceRefs: ['home:visible-unresolved'] });
  expect(websiteRecognitionFixture.pages[0]?.root.children?.at(-1)).toMatchObject({
    id: 'home:visible-unresolved',
  });
  expect(websiteRecognitionFixture.pages[0]?.root.children?.[0]?.children?.[1]).toMatchObject({
    id: 'home:rich-text',
    type: 'RichText',
  });
});

it('keeps safe semantic values distinct by state and viewport without conflating null or incomplete evidence', () => {
  const observations = websiteObservationFixture.pages[0]?.nodes.find(
    (node) => node.sourceRef === 'home:skills:css',
  )?.observations;

  expect(observations?.find((observation) => observation.stateId === 'initial')).toMatchObject({
    semanticAttributes: { 'aria-valuenow': '20' },
    viewportId: 'desktop',
  });
  expect(observations?.find((observation) => observation.stateId === 'triggered')).toMatchObject({
    semanticAttributes: { 'aria-valuenow': '72', 'aria-valuetext': null },
    viewportId: 'desktop',
  });
  expect(
    observations?.find((observation) => observation.stateId === 'initial')?.semanticAttributes?.[
      'aria-valuetext'
    ],
  ).toBeUndefined();
  expect(
    observations?.find((observation) => observation.stateId === 'triggered')?.semanticAttributes?.[
      'aria-valuetext'
    ],
  ).toBeNull();
  expect(observations?.find((observation) => observation.viewportId === 'tablet')).toMatchObject({
    semanticAttributes: { 'aria-valuenow': '0' },
    stateId: 'settled',
  });
  expect(observations?.find((observation) => observation.stateId === 'incomplete')).toMatchObject({
    availability: { missing: { code: 'animation-incomplete' }, status: 'missing' },
    semanticAttributes: {},
    viewportId: 'mobile',
  });
});

it('retains a true zero semantic value', () => {
  const settledSemanticAttributes = websiteObservationFixture.pages[0]?.nodes
    .find((node) => node.sourceRef === 'home:skills:css')
    ?.observations.find((observation) => observation.stateId === 'settled')?.semanticAttributes;

  expect(settledSemanticAttributes?.value).toBe(0);
});

it('accepts schema-v1 observations without semantic attribute evidence', () => {
  expect('semanticAttributes' in schemaV1ObservationWithoutSemanticAttributes).toBeFalse();
  expect(schemaV1ObservationWithoutSemanticAttributes.semanticAttributes).toBeUndefined();
});

it('retains state-paired pseudo-element dimensions without fabricating a DOM rectangle', () => {
  expect(JSON.parse(JSON.stringify(animationEvidenceObservations))).toEqual(
    animationEvidenceObservations,
  );
  expect(animationEvidenceObservations).toMatchObject([
    {
      animationEvidence: {
        pseudoElements: [
          { boxSize: { width: { value: '0px' } }, pseudo: '::before' },
          {
            availability: { missing: { code: 'pseudo-element-unavailable' }, status: 'missing' },
            boxSize: { width: { value: null } },
            pseudo: '::after',
          },
        ],
        target: { transform: { value: 'matrix(1, 0, 0, 1, 0, 0)' } },
        trigger: 'scroll-into-view',
      },
      rect: null,
    },
    {
      animationEvidence: { pseudoElements: [{ boxSize: { width: { value: '75px' } } }] },
      rect: null,
    },
  ]);
  expect(
    animationEvidenceObservations[0]?.animationEvidence?.pseudoElements[0]?.boxSize.width,
  ).toEqual({ availability: { missing: null, status: 'available' }, value: '0px' });
  expect(
    animationEvidenceObservations[1]?.animationEvidence?.pseudoElements[0]?.boxSize.width,
  ).toEqual({ availability: { missing: null, status: 'available' }, value: '75px' });
});
