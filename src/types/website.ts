import type { UiNode } from '../types.js';
import type {
  WebsiteAvailability,
  WebsiteBoundingRect,
  WebsiteRecognizedNode,
  WebsiteSemanticAttributeName,
  WebsiteSemanticAttributeValue,
} from '../website.js';

/*** Page-observed header and footer evidence. An empty candidate list explicitly records no candidate. */
export interface WebsiteSiteChromeRecognition {
  readonly candidates: readonly WebsiteSiteChromeCandidate[];
}

/*** One candidate whose scope is grounded in page membership rather than assumed from its HTML tag. */
export interface WebsiteSiteChromeCandidate {
  readonly id: string;
  readonly role: 'footer' | 'header';
  readonly status: 'inferred' | 'observed';
  readonly scope: 'ambiguous' | 'global' | 'page-local';
  readonly confidence: number;
  readonly memberships: readonly WebsiteSiteChromeMembership[];
}

/*** Evidence for one candidate on one page; omission of a page never asserts its presence or absence. */
export interface WebsiteSiteChromeMembership {
  readonly pageId: string;
  readonly state: 'missing' | 'present' | 'variant';
  readonly source: WebsiteSiteChromeSourceEvidence | null;
  readonly subtree: WebsiteSiteChromeSubtree | null;
}

/*** Stable DOM and semantic evidence for one page-specific chrome membership. */
export interface WebsiteSiteChromeSourceEvidence {
  readonly sourceRef: string;
  readonly parentSourceRef: string | null;
  readonly ancestorSourceRefs: readonly string[];
  readonly semantics: WebsiteSiteChromeSemantics;
  readonly observations: readonly WebsiteSiteChromeViewportObservation[];
}

/*** Landmark and ARIA semantics retained without introducing framework-specific identifiers. */
export interface WebsiteSiteChromeSemantics {
  readonly tagName: string;
  readonly role: string | null;
  readonly ariaLabel: string | null;
}

/*** One viewport/state observation relevant to chrome visibility and responsive variants. */
export interface WebsiteSiteChromeViewportObservation {
  readonly viewportId: string;
  readonly stateId: string;
  readonly availability: WebsiteAvailability;
  readonly rect: WebsiteBoundingRect | null;
  readonly visibility?: 'hidden' | 'visible';
  readonly semanticAttributes?: Readonly<
    Partial<Record<WebsiteSemanticAttributeName, WebsiteSemanticAttributeValue>>
  >;
}

/*** A recursive canonical UiNode subtree with its ordered source-linked node mapping. */
export interface WebsiteSiteChromeSubtree {
  readonly root: UiNode;
  readonly nodes: readonly WebsiteRecognizedNode[];
}
