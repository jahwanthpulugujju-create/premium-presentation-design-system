import type { SlideElement, SlideSpec } from "./slide-spec.js";

export type ValidationSeverity = "error" | "warning";
export interface ValidationIssue { severity: ValidationSeverity; code: string; path: string; message: string; }
export interface ValidationResult { valid: boolean; issues: ValidationIssue[]; }

const roles = ["opening","context","problem","evidence","insight","solution","comparison","process","recommendation","closing"];
const directions = ["editorial","scientific","technical","cinematic","corporate","experimental"];
const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const nonEmpty = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;
const placeholder = (v: string) => /\[(SOURCE VALUE|MEASURE AND UNIT|EXPLAIN|INSERT|TODO)[^\]]*\]|to be supplied|replace with verified/i.test(v);
const validUrl = (value: string) => { try { return ["http:","https:"].includes(new URL(value).protocol); } catch { return false; } };

export function validateSlideSpec(input: unknown): ValidationResult {
  const issues: ValidationIssue[] = [];
  const add = (severity: ValidationSeverity, code: string, path: string, message: string) => issues.push({severity,code,path,message});
  if (!isRecord(input)) return {valid:false,issues:[{severity:"error",code:"SPEC_NOT_OBJECT",path:"$",message:"Slide spec must be an object."}]};
  const s = input as unknown as SlideSpec;
  if (s.version !== "0.1") add("error","UNSUPPORTED_VERSION","version","Expected slide spec version 0.1.");
  if (!nonEmpty(s.id)) add("error","MISSING_ID","id","A non-empty slide id is required.");
  if (!nonEmpty(s.title)) add("error","MISSING_TITLE","title","A slide title is required.");
  if (!nonEmpty(s.takeaway)) add("error","MISSING_TAKEAWAY","takeaway","State the single most important takeaway.");
  if (!nonEmpty(s.compositionBrief)) add("error","MISSING_COMPOSITION_BRIEF","compositionBrief","Describe the intended composition.");
  if (!roles.includes(s.narrativeRole)) add("error","INVALID_NARRATIVE_ROLE","narrativeRole","Choose a supported narrative role.");
  if (!directions.includes(s.visualDirection)) add("error","INVALID_VISUAL_DIRECTION","visualDirection","Choose a supported visual direction.");

  const sourceIds = new Set<string>();
  if (!Array.isArray(s.sources)) add("error","INVALID_SOURCES","sources","Sources must be an array.");
  else s.sources.forEach((source,i) => {
    const path = "sources[" + i + "]";
    if (!isRecord(source)) return add("error","INVALID_SOURCE",path,"Each source must be an object.");
    if (!nonEmpty(source.id)) add("error","MISSING_SOURCE_ID",path + ".id","Each source needs a non-empty id.");
    else if (sourceIds.has(source.id)) add("error","DUPLICATE_SOURCE_ID",path + ".id","Source ids must be unique.");
    else sourceIds.add(source.id);
    if (!nonEmpty(source.title)) add("error","MISSING_SOURCE_TITLE",path + ".title","Each source needs a title.");
    if (source.url !== undefined && (!nonEmpty(source.url) || !validUrl(source.url))) add("error","INVALID_SOURCE_URL",path + ".url","Source URL must be valid HTTP or HTTPS.");
  });

  if (!Array.isArray(s.elements) || s.elements.length === 0) add("error","NO_ELEMENTS","elements","A slide needs at least one content element.");
  else {
    const elementIds = new Set<string>();
    s.elements.forEach((raw,i) => {
      const path = "elements[" + i + "]";
      if (!isRecord(raw)) return add("error","INVALID_ELEMENT",path,"Each element must be an object.");
      const e = raw as SlideElement & Record<string, unknown>;
      if (!nonEmpty(e.id)) add("error","MISSING_ELEMENT_ID",path + ".id","Element id is required.");
      else if (elementIds.has(e.id)) add("error","DUPLICATE_ELEMENT_ID",path + ".id","Element ids must be unique.");
      else elementIds.add(e.id);
      if (e.type === "text") {
        if (!["eyebrow","headline","body","caption","source"].includes(e.role)) add("error","INVALID_TEXT_ROLE",path + ".role","Unsupported text role.");
        if (!nonEmpty(e.text)) add("error","EMPTY_TEXT",path + ".text","Text cannot be empty.");
        else if (placeholder(e.text)) add("warning","PLACEHOLDER_TEXT",path + ".text","Replace placeholder copy before final delivery.");
      } else if (e.type === "image") {
        if (!nonEmpty(e.description) || !nonEmpty(e.altText)) add("error","IMAGE_DESCRIPTION_REQUIRED",path,"Images need a description and meaningful alt text.");
        if (e.origin === "ai-generated" && s.constraints?.allowAiGeneratedImages === false) add("error","AI_IMAGE_NOT_ALLOWED",path + ".origin","This deck disallows AI-generated images.");
        if (e.rightsStatus === "restricted") add("error","IMAGE_RIGHTS_RESTRICTED",path + ".rightsStatus","Restricted assets cannot be distributed.");
        if (e.rightsStatus === "unknown") add("warning","IMAGE_RIGHTS_UNVERIFIED",path + ".rightsStatus","Confirm usage rights before publishing.");
        if (e.origin === "sourced" && !nonEmpty(e.sourceReferenceId)) add("error","SOURCED_IMAGE_NEEDS_REFERENCE",path + ".sourceReferenceId","Sourced images need a source reference.");
        if (nonEmpty(e.sourceReferenceId) && !sourceIds.has(e.sourceReferenceId)) add("error","UNKNOWN_IMAGE_SOURCE",path + ".sourceReferenceId","Image source is not declared.");
      } else if (e.type === "metric") {
        if (!nonEmpty(e.value) || !nonEmpty(e.label)) add("error","INCOMPLETE_METRIC",path,"Metric needs a value and label.");
        if (Array.isArray(e.sourceReferenceIds)) e.sourceReferenceIds.forEach(id => { if (!sourceIds.has(id)) add("error","UNKNOWN_METRIC_SOURCE",path,"Metric source is not declared: " + id); });
      } else if (e.type === "chart") {
        if (e.chartType !== "bar") add("error","UNSUPPORTED_CHART_TYPE",path + ".chartType","The initial renderer supports bar charts only.");
        if (!nonEmpty(e.title) || !nonEmpty(e.unit) || !nonEmpty(e.interpretation)) add("error","INCOMPLETE_CHART",path,"Chart needs a title, unit and interpretation.");
        if (!["verified","illustrative"].includes(e.dataStatus)) add("error","INVALID_CHART_DATA_STATUS",path + ".dataStatus","Chart data must be verified or illustrative.");
        if (!Array.isArray(e.data) || e.data.length < 2) add("error","INSUFFICIENT_CHART_DATA",path + ".data","Chart needs at least two points.");
        else {
          const labels = new Set<string>();
          e.data.forEach((point,j) => {
            if (!isRecord(point) || !nonEmpty(point.label) || typeof point.value !== "number" || !Number.isFinite(point.value)) add("error","INVALID_CHART_POINT",path + ".data[" + j + "]","Each point needs a label and finite numeric value.");
            else if (labels.has(point.label)) add("error","DUPLICATE_CHART_LABEL",path + ".data[" + j + "].label","Chart labels must be unique.");
            else labels.add(point.label);
          });
        }
        if (e.dataStatus === "illustrative") add("warning","ILLUSTRATIVE_CHART_DATA",path + ".dataStatus","Synthetic values must be visibly labelled in the slide.");
        if (e.dataStatus === "verified" && (!Array.isArray(e.sourceReferenceIds) || e.sourceReferenceIds.length === 0)) add("error","VERIFIED_CHART_NEEDS_SOURCE",path + ".sourceReferenceIds","Verified chart data must cite a source.");
        if (Array.isArray(e.sourceReferenceIds)) e.sourceReferenceIds.forEach(id => { if (!sourceIds.has(id)) add("error","UNKNOWN_CHART_SOURCE",path,"Chart source is not declared: " + id); });
      } else if (e.type === "diagram") {
        if (!Array.isArray(e.nodes) || e.nodes.length < 2 || e.nodes.some(n => !nonEmpty(n))) add("error","INCOMPLETE_DIAGRAM",path + ".nodes","Diagram needs at least two named nodes.");
        else if (new Set(e.nodes).size !== e.nodes.length) add("error","DUPLICATE_DIAGRAM_NODE",path + ".nodes","Diagram nodes must be unique.");
        if (!Array.isArray(e.relationships)) add("error","INVALID_DIAGRAM_RELATIONSHIPS",path + ".relationships","Relationships must be an array.");
        else e.relationships.forEach((r,j) => {
          if (!isRecord(r) || !nonEmpty(r.from) || !nonEmpty(r.to)) add("error","INVALID_DIAGRAM_RELATIONSHIP",path + ".relationships[" + j + "]","Relationship needs from and to nodes.");
          else if (!Array.isArray(e.nodes) || !e.nodes.includes(r.from) || !e.nodes.includes(r.to)) add("error","UNKNOWN_DIAGRAM_NODE",path + ".relationships[" + j + "]","Relationship endpoint is not declared.");
          else if (r.from === r.to) add("error","DIAGRAM_SELF_LOOP",path + ".relationships[" + j + "]","A node cannot connect to itself.");
        });
      } else add("error","UNSUPPORTED_ELEMENT_TYPE",path + ".type","Unsupported element type.");
    });
  }
  if (!isRecord(s.constraints)) add("error","MISSING_CONSTRAINTS","constraints","Design constraints are required.");
  else ["allowAiGeneratedImages","allowDecorativeIcons","preserveEditableObjects"].forEach(key => {
    if (typeof (s.constraints as Record<string, unknown>)[key] !== "boolean") add("error","INVALID_CONSTRAINT","constraints." + key,"Constraint must be boolean.");
  });
  return {valid:!issues.some(i => i.severity === "error"),issues};
}

export function assertValidSlideSpec(input: unknown): asserts input is SlideSpec {
  const result = validateSlideSpec(input);
  if (!result.valid) throw new Error(result.issues.filter(i => i.severity === "error").map(i => i.path + ": " + i.message).join("\n"));
}
