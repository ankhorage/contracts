import { expect, it } from 'bun:test';

import phpObservation from '../test/website/fixtures/php-observation.json' with { type: 'json' };
import phpRecognition from '../test/website/fixtures/php-recognition.json' with { type: 'json' };
import typescriptObservation from '../test/website/fixtures/typescript-observation.json' with { type: 'json' };
import typescriptRecognition from '../test/website/fixtures/typescript-recognition.json' with { type: 'json' };
import type { WebsiteObservationDocument, WebsiteRecognitionDocument } from './website.js';

const websiteObservationFixture = typescriptObservation as unknown as WebsiteObservationDocument;
const websiteRecognitionFixture = typescriptRecognition as unknown as WebsiteRecognitionDocument;

it('keeps TypeScript and PHP website observation fixtures identical and serializable', () => {
  expect(typescriptObservation).toEqual(phpObservation);
  expect(typescriptObservation.pages).toHaveLength(2);
  expect(typescriptObservation.pages[0]?.viewports).toHaveLength(3);
  expect(JSON.parse(JSON.stringify(websiteObservationFixture))).toEqual(websiteObservationFixture);
});

it('keeps TypeScript and PHP website recognition fixtures identical and serializable', () => {
  expect(typescriptRecognition).toEqual(phpRecognition);
  expect(typescriptRecognition.pages[0]?.root.children).toHaveLength(4);
  expect(JSON.parse(JSON.stringify(websiteRecognitionFixture))).toEqual(websiteRecognitionFixture);
});

it('retains the visible unresolved node and the styled inline text run', () => {
  expect(
    websiteObservationFixture.pages[0]?.nodes.find((node) => node.sourceRef === 'home:hero:span'),
  ).toMatchObject({ textRuns: [{ text: 'red styled text' }] });
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
