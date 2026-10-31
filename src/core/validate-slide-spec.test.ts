import test from "node:test";
import assert from "node:assert/strict";
import { validateSlideSpec } from "./validate-slide-spec.js";

const valid = {
  version: "0.1", id: "sample", title: "A clear message", takeaway: "One point matters.",
  narrativeRole: "insight", visualDirection: "editorial", compositionBrief: "A deliberate title-led composition.",
  elements: [{id:"title",type:"text",role:"headline",text:"A precise headline"}], sources: [],
  constraints: {allowAiGeneratedImages:false,allowDecorativeIcons:false,preserveEditableObjects:true}
};

test("accepts a valid minimal slide", () => assert.equal(validateSlideSpec(valid).valid, true));
test("rejects a missing title", () => assert.ok(validateSlideSpec({...valid,title:""}).issues.some(x=>x.code==="MISSING_TITLE")));
test("rejects duplicate element ids", () => {
  const r=validateSlideSpec({...valid,elements:[{id:"x",type:"text",role:"headline",text:"One"},{id:"x",type:"text",role:"body",text:"Two"}]});
  assert.ok(r.issues.some(x=>x.code==="DUPLICATE_ELEMENT_ID"));
});
test("rejects AI imagery when disabled", () => {
  const r=validateSlideSpec({...valid,elements:[{id:"img",type:"image",description:"Portrait",altText:"Portrait of a presenter",origin:"ai-generated",rightsStatus:"cleared"}]});
  assert.ok(r.issues.some(x=>x.code==="AI_IMAGE_NOT_ALLOWED"));
});
test("warns for unverified image rights", () => {
  const r=validateSlideSpec({...valid,sources:[{id:"s1",title:"Photo archive"}],elements:[{id:"img",type:"image",description:"Factory photo",altText:"Factory interior",origin:"sourced",rightsStatus:"unknown",sourceReferenceId:"s1"}]});
  assert.ok(r.issues.some(x=>x.code==="IMAGE_RIGHTS_UNVERIFIED"));
});
test("labels illustrative chart values with a warning", () => {
  const r=validateSlideSpec({...valid,sources:[{id:"demo",title:"Synthetic values",kind:"illustrative"}],elements:[{id:"chart",type:"chart",chartType:"bar",title:"Example allocation",unit:"%",interpretation:"Shows the method only.",dataStatus:"illustrative",data:[{label:"A",value:20},{label:"B",value:80}],sourceReferenceIds:["demo"]}]});
  assert.equal(r.valid,true);
  assert.ok(r.issues.some(x=>x.code==="ILLUSTRATIVE_CHART_DATA"));
});
test("requires a source for verified chart data", () => {
  const r=validateSlideSpec({...valid,elements:[{id:"chart",type:"chart",chartType:"bar",title:"Measured values",unit:"items",interpretation:"Compare A and B.",dataStatus:"verified",data:[{label:"A",value:2},{label:"B",value:4}],sourceReferenceIds:[]}]});
  assert.ok(r.issues.some(x=>x.code==="VERIFIED_CHART_NEEDS_SOURCE"));
});
test("rejects a diagram edge with an unknown endpoint", () => {
  const r=validateSlideSpec({...valid,elements:[{id:"flow",type:"diagram",description:"Flow",nodes:["Brief","Export"],relationships:[{from:"Brief",to:"Missing"}]}]});
  assert.ok(r.issues.some(x=>x.code==="UNKNOWN_DIAGRAM_NODE"));
});
