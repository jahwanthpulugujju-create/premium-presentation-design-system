export type NarrativeRole = "opening" | "context" | "problem" | "evidence" | "insight" | "solution" | "comparison" | "process" | "recommendation" | "closing";
export type VisualDirection = "editorial" | "scientific" | "technical" | "cinematic" | "corporate" | "experimental";
export interface SourceReference {
  id: string;
  title: string;
  url?: string;
  publisher?: string;
  accessedAt?: string;
  kind?: "primary" | "secondary" | "illustrative";
}
export interface TextElement {
  id: string; type: "text"; role: "eyebrow" | "headline" | "body" | "caption" | "source"; text: string;
}
export interface ImageElement {
  id: string; type: "image"; description: string; altText: string;
  origin: "user-provided" | "sourced" | "original-illustration" | "ai-generated";
  rightsStatus: "cleared" | "unknown" | "restricted"; sourceReferenceId?: string;
}
export interface MetricElement {
  id: string; type: "metric"; value: string; label: string; context?: string; sourceReferenceIds: string[];
}
export interface ChartElement {
  id: string; type: "chart"; chartType: "bar"; title: string; unit: string; interpretation: string;
  dataStatus: "verified" | "illustrative"; data: Array<{label: string; value: number}>; sourceReferenceIds: string[];
}
export interface DiagramElement {
  id: string; type: "diagram"; description: string; nodes: string[];
  relationships: Array<{from: string; to: string; label?: string}>;
}
export type SlideElement = TextElement | ImageElement | MetricElement | ChartElement | DiagramElement;
export interface SlideSpec {
  version: "0.1"; id: string; title: string; takeaway: string; narrativeRole: NarrativeRole;
  visualDirection: VisualDirection; compositionBrief: string; elements: SlideElement[];
  sources: SourceReference[];
  constraints: {allowAiGeneratedImages: boolean; allowDecorativeIcons: boolean; preserveEditableObjects: boolean};
}
