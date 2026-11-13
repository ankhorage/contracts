import type { MediaAssetReference } from './media.js';
import type { SerializableValue } from './serializable.js';
import type { UiNode } from './types.js';

/*** A versioned, portable capture of the observable state of one website. */
export interface WebsiteObservationDocument {
  readonly schemaVersion: 1;
  readonly documentId: string;
  readonly collectedAt: string;
  readonly source: WebsiteSource;
  readonly site: WebsiteSite;
  readonly pages: readonly WebsitePageObservation[];
}

/*** The scraper identity and immutable crawl revision that produced a website document. */
export interface WebsiteSource {
  readonly crawlerId: string;
  readonly crawlerVersion: string;
  readonly crawlId: string;
  readonly revision: string | null;
}

/*** A site identity and its canonical entry URL. */
export interface WebsiteSite {
  readonly id: string;
  readonly url: string;
}

/*** One observed page, including its ordered navigation and captured render states. */
export interface WebsitePageObservation {
  readonly id: string;
  readonly url: string;
  readonly path: string;
  readonly navigation: readonly WebsiteNavigationItem[];
  readonly viewports: readonly WebsiteViewport[];
  readonly states: readonly WebsiteState[];
  readonly nodes: readonly WebsiteObservedNode[];
  readonly assets: readonly WebsiteAsset[];
}

/*** One ordered, source-linked navigation target observed on a page. */
export interface WebsiteNavigationItem {
  readonly id: string;
  readonly label: string;
  readonly url: string;
  readonly sourceRef: string;
}

/*** A rendered viewport used while observing responsive website state. */
export interface WebsiteViewport {
  readonly id: string;
  readonly width: number;
  readonly height: number;
  readonly devicePixelRatio: number;
}

/*** A named rendered state, such as default, hover, or expanded. */
export interface WebsiteState {
  readonly id: string;
  readonly name: string;
}

/*** A stable DOM node and every source-linked observation collected for it. */
export interface WebsiteObservedNode {
  readonly sourceRef: string;
  readonly parentSourceRef: string | null;
  readonly ancestorSourceRefs: readonly string[];
  readonly dom: WebsiteDomNode;
  readonly textRuns: readonly WebsiteTextRun[];
  readonly links: readonly WebsiteLink[];
  readonly media: readonly WebsiteMediaReference[];
  readonly observations: readonly WebsiteNodeObservation[];
}

/*** A portable DOM identity with safe semantic attributes only. */
export interface WebsiteDomNode {
  readonly tagName: string;
  readonly childIndex: number;
  readonly attributes: Readonly<Record<string, string>>;
}

/*** A text run retained separately from its DOM node so inline styled spans are not lost. */
export interface WebsiteTextRun {
  readonly sourceRef: string;
  readonly text: string;
  readonly start: number;
  readonly end: number;
}

/*** A source-linked hyperlink observed on a DOM node. */
export interface WebsiteLink {
  readonly sourceRef: string;
  readonly url: string;
  readonly label: string | null;
}

/*** An image, video, audio, or embedded media reference observed on a DOM node. */
export interface WebsiteMediaReference {
  readonly sourceRef: string;
  readonly assetId: string | null;
  readonly url: string;
  readonly kind: 'audio' | 'document' | 'embed' | 'image' | 'video';
  readonly alt: string | null;
}

/*** One viewport/state-specific visual observation of a DOM node. */
export interface WebsiteNodeObservation {
  readonly viewportId: string;
  readonly stateId: string;
  readonly availability: WebsiteAvailability;
  readonly semanticAttributes?: Readonly<
    Partial<Record<WebsiteSemanticAttributeName, WebsiteSemanticAttributeValue>>
  >;
  readonly rect: WebsiteBoundingRect | null;
  readonly css: WebsiteComputedCss | null;
  readonly provenance: WebsiteObservationProvenance;
}

/*** A safe semantic attribute that may differ for one DOM node across observed states. */
export type WebsiteSemanticAttributeName =
  | 'aria-label'
  | 'aria-valuemax'
  | 'aria-valuemin'
  | 'aria-valuenow'
  | 'aria-valuetext'
  | 'role'
  | 'value';

/*** An explicitly observed semantic value; omission means absent and null remains a real value. */
export type WebsiteSemanticAttributeValue = boolean | number | string | null;

/*** Whether a source value was available without fabricating a replacement. */
export interface WebsiteAvailability {
  readonly status: 'available' | 'missing';
  readonly missing: WebsiteMissingValue | null;
}

/*** The explicit reason a website source value could not be observed. */
export interface WebsiteMissingValue {
  readonly code: string;
  readonly message: string;
}

/*** A bounding rectangle measured in CSS pixels. */
export interface WebsiteBoundingRect {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

/*** Computed visual CSS values needed to describe, not assess, a rendered website. */
export interface WebsiteComputedCss {
  readonly display: string;
  readonly position: string;
  readonly visibility: string;
  readonly color: string;
  readonly backgroundColor: string;
  readonly borderColor: string;
  readonly borderRadius: string;
  readonly borderWidth: string;
  readonly boxShadow: string;
  readonly fontFamily: string;
  readonly fontSize: string;
  readonly fontStyle: string;
  readonly fontWeight: string;
  readonly letterSpacing: string;
  readonly lineHeight: string;
  readonly textAlign: string;
  readonly textDecoration: string;
  readonly opacity: string;
  readonly overflow: string;
  readonly overflowX: string;
  readonly overflowY: string;
  readonly backgroundImage: string;
  readonly backgroundPosition: string;
  readonly backgroundRepeat: string;
  readonly backgroundSize: string;
  readonly margin: WebsiteBoxEdges;
  readonly padding: WebsiteBoxEdges;
  readonly alignContent: string;
  readonly alignItems: string;
  readonly alignSelf: string;
  readonly gap: string;
  readonly flexDirection: string;
  readonly flexBasis: string;
  readonly flexGrow: string;
  readonly flexShrink: string;
  readonly flexWrap: string;
  readonly justifyContent: string;
  readonly justifyItems: string;
  readonly justifySelf: string;
  readonly order: string;
  readonly placeContent: string;
  readonly placeItems: string;
  readonly placeSelf: string;
  readonly gridAutoColumns: string;
  readonly gridAutoFlow: string;
  readonly gridAutoRows: string;
  readonly gridColumn: string;
  readonly gridColumnEnd: string;
  readonly gridColumnStart: string;
  readonly gridRow: string;
  readonly gridRowEnd: string;
  readonly gridRowStart: string;
  readonly gridTemplateColumns: string;
  readonly gridTemplateRows: string;
}

/*** The four computed edges of a CSS box value. */
export interface WebsiteBoxEdges {
  readonly top: string;
  readonly right: string;
  readonly bottom: string;
  readonly left: string;
}

/*** How an observation was obtained from the source page. */
export interface WebsiteObservationProvenance {
  readonly sourceUrl: string;
  readonly capturedAt: string;
  readonly method: 'browser' | 'html' | 'network';
}

/*** A reusable media asset discovered during the crawl. */
export interface WebsiteAsset {
  readonly id: string;
  readonly url: string;
  readonly kind: WebsiteMediaReference['kind'];
  readonly contentType: string | null;
  readonly sourceRefs: readonly string[];
}

/*** A versioned canonical component recognition derived from website observations. */
export interface WebsiteRecognitionDocument {
  readonly schemaVersion: 1;
  readonly documentId: string;
  readonly observedDocumentId: string;
  readonly recognizedAt: string;
  readonly source: WebsiteSource;
  readonly site: WebsiteSite;
  readonly navigation: readonly WebsiteNavigationItem[];
  readonly pages: readonly WebsitePageRecognition[];
  readonly designTokens: readonly WebsiteDesignToken[];
  readonly media: readonly WebsiteRecognizedMedia[];
}

/*** A recognized page with its canonical UiNode tree and retained source mapping. */
export interface WebsitePageRecognition {
  readonly id: string;
  readonly url: string;
  readonly path: string;
  readonly root: UiNode;
  readonly nodes: readonly WebsiteRecognizedNode[];
}

/*** A source-linked canonical UiNode mapping; component shape remains owned by UiNode. */
export interface WebsiteRecognizedNode {
  readonly id: UiNode['id'];
  readonly componentType: UiNode['type'];
  readonly sourceRefs: readonly string[];
  readonly confidence: number;
  readonly props: readonly WebsiteRecognizedProp[];
  readonly responsive: readonly WebsiteResponsiveVariant[];
  readonly status: 'recognized' | 'unresolved';
  readonly unresolved: WebsiteUnresolvedNode | null;
}

/*** A normalized UiNode property and the exact serializable values observed before normalization. */
export interface WebsiteRecognizedProp {
  readonly name: string;
  readonly value: SerializableValue;
  readonly originalValues: readonly SerializableValue[];
}

/*** A viewport-specific UiNode property override retained by the recognition. */
export interface WebsiteResponsiveVariant {
  readonly viewportId: string;
  readonly props: readonly WebsiteRecognizedProp[];
}

/*** A visible source node that could not be mapped without silently discarding it. */
export interface WebsiteUnresolvedNode {
  readonly reason: string;
  readonly sourceRefs: readonly string[];
}

/*** A normalized design token with its exact source values retained. */
export interface WebsiteDesignToken {
  readonly id: string;
  readonly kind: 'color' | 'radius' | 'shadow' | 'spacing' | 'typography';
  readonly value: SerializableValue;
  readonly originalValues: readonly SerializableValue[];
  readonly sourceRefs: readonly string[];
}

/*** A recognized portable media reference, optionally compatible with an app media asset. */
export interface WebsiteRecognizedMedia {
  readonly id: string;
  readonly sourceRefs: readonly string[];
  readonly originalUrl: string;
  readonly asset: MediaAssetReference | null;
}
