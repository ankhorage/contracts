import type { UiNode } from './types.js';
import type {
  WebsiteAvailability,
  WebsiteBoundingRect,
  WebsiteDomNode,
  WebsiteMissingValue,
  WebsiteRecognizedNode,
  WebsiteSemanticAttributeName,
  WebsiteSemanticAttributeValue,
} from './website.js';

/*** Source-grounded header and footer evidence collected without asserting cross-page identity. */
export interface WebsiteSiteChromeRecognition {
  readonly candidates: readonly WebsiteSiteChromeCandidate[];
}

/*** A header or footer candidate that remains local evidence until a consumer compares pages. */
export interface WebsiteSiteChromeCandidate {
  readonly id: string;
  readonly role: 'footer' | 'header';
  readonly classification: 'ambiguous' | 'site-candidate';
  readonly confidence: number;
  readonly memberships: readonly WebsiteSiteChromeMembership[];
  readonly uncertainty: readonly WebsiteMissingValue[];
}

/*** The observed state of one candidate on one page, including an explicit absence when evaluated. */
export interface WebsiteSiteChromeMembership {
  readonly pageId: string;
  readonly state: 'missing' | 'present' | 'variant';
  readonly source: WebsiteSiteChromeSourceEvidence | null;
  readonly subtree: WebsiteSiteChromeSubtree | null;
}

/*** DOM, ARIA, ancestry, and viewport evidence for a page-local chrome membership. */
export interface WebsiteSiteChromeSourceEvidence {
  readonly sourceRef: string;
  readonly parentSourceRef: string | null;
  readonly ancestorSourceRefs: readonly string[];
  readonly dom: WebsiteDomNode;
  readonly semantics: WebsiteSiteChromeSemantics;
  readonly observations: readonly WebsiteSiteChromeViewportObservation[];
}

/*** Landmark semantics retained separately from generic DOM attributes for direct classification audit. */
export interface WebsiteSiteChromeSemantics {
  readonly ariaLabel: string | null;
  readonly role: string | null;
}

/*** One measured viewport and state, preserving conditional visibility without inferring a fallback. */
export interface WebsiteSiteChromeViewportObservation {
  readonly viewportId: string;
  readonly stateId: string;
  readonly availability: WebsiteAvailability;
  readonly rect: WebsiteBoundingRect | null;
  readonly visibility: 'hidden' | 'unknown' | 'visible';
  readonly semanticAttributes?: Readonly<
    Partial<Record<WebsiteSemanticAttributeName, WebsiteSemanticAttributeValue>>
  >;
}

/*** The ordered recursive component tree and every source-linked recognition it contains. */
export interface WebsiteSiteChromeSubtree {
  readonly root: UiNode;
  readonly nodes: readonly WebsiteRecognizedNode[];
}
