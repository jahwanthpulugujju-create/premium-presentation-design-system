import pptxgen from "pptxgenjs";
import type { ChartElement, DiagramElement, SlideSpec } from "../../core/slide-spec.js";

type Pptx = InstanceType<typeof pptxgen>;
type Slide = ReturnType<Pptx["addSlide"]>;
type TextOptions = Parameters<Slide["addText"]>[1];
type ShapeType = Parameters<Slide["addShape"]>[0];

const C = { ink:"121B20", inkSoft:"26343B", paper:"F3F0E7", white:"FFFFFF", muted:"7D898A", accent:"D4EF70", accentDeep:"A5BE4D", line:"C8C7BC" };
const DISPLAY = "Georgia";
const BODY = "Arial";
const rect = "rect" as ShapeType;
const line = "line" as ShapeType;

function text(slide: Slide, value: string, options: TextOptions) {
  slide.addText(value, { margin:0, fit:"shrink", ...options });
}
function footer(slide: Slide, number: number, dark = false) {
  const c = dark ? "AAB5B3" : "667277";
  slide.addShape(line,{x:0.72,y:7.08,w:11.9,h:0,line:{color:dark?"465258":C.line,width:0.7}});
  text(slide,"PPD  /  PREMIUM PRESENTATION DESIGN SYSTEM",{x:0.74,y:7.13,w:8.2,h:0.16,fontFace:BODY,fontSize:7,charSpacing:1.1,color:c});
  text(slide,String(number).padStart(2,"0")+"  /  03",{x:11.9,y:7.11,w:0.7,h:0.18,fontFace:BODY,fontSize:7,color:c,align:"right"});
}
function renderOpener(pptx:Pptx,s:SlideSpec) {
  const slide=pptx.addSlide(); slide.background={color:C.ink};
  const eyebrow=s.elements.find(e=>e.type==="text"&&e.role==="eyebrow");
  const title=s.elements.find(e=>e.type==="text"&&e.role==="headline");
  const caption=s.elements.find(e=>e.type==="text"&&e.role==="caption");
  if(eyebrow?.type==="text") text(slide,eyebrow.text,{x:0.82,y:0.72,w:7.5,h:0.3,fontFace:BODY,fontSize:9,bold:true,charSpacing:2,color:C.accent});
  if(title?.type==="text") text(slide,title.text,{x:0.8,y:2,w:11.3,h:2.35,fontFace:DISPLAY,fontSize:39,color:C.paper,valign:"mid"});
  slide.addShape(line,{x:0.84,y:5,w:1.05,h:0,line:{color:C.accent,width:2.3}});
  if(caption?.type==="text") text(slide,caption.text,{x:0.84,y:5.28,w:7.7,h:0.55,fontFace:BODY,fontSize:13,color:"B8C1BD"});
  text(slide,"QUALITY IS A DESIGN DECISION",{x:9,y:5.35,w:3.3,h:0.2,fontFace:BODY,fontSize:7,charSpacing:1.2,color:C.muted,align:"right"});
  footer(slide,1,true);
}
function renderData(pptx:Pptx,s:SlideSpec) {
  const slide=pptx.addSlide(); slide.background={color:C.paper};
  const headline=s.elements.find(e=>e.type==="text"&&e.role==="headline");
  const chart=s.elements.find((e):e is ChartElement=>e.type==="chart");
  text(slide,"EVIDENCE / DESIGN PROCESS",{x:0.78,y:0.62,w:4,h:0.22,fontFace:BODY,fontSize:8,charSpacing:1.5,bold:true,color:C.muted});
  if(headline?.type==="text") text(slide,headline.text,{x:0.78,y:1.05,w:11.8,h:1,fontFace:DISPLAY,fontSize:29,color:C.ink});
  if(chart){
    text(slide,chart.title.toUpperCase(),{x:0.82,y:2.42,w:6.5,h:0.22,fontFace:BODY,fontSize:8,bold:true,charSpacing:1.2,color:C.muted});
    const max=Math.max(...chart.data.map(p=>p.value),1);
    chart.data.forEach((point,i)=>{
      const y=2.95+i*0.77;
      text(slide,point.label,{x:0.82,y:y+0.06,w:2.05,h:0.22,fontFace:BODY,fontSize:10,color:C.inkSoft});
      slide.addShape(rect,{x:3,y,w:4.4*(point.value/max),h:0.34,line:{color:C.accentDeep,transparency:100},fill:{color:i===chart.data.length-1?C.accentDeep:C.inkSoft}});
      text(slide,String(point.value),{x:7.52,y:y+0.02,w:0.6,h:0.24,fontFace:BODY,fontSize:10,bold:true,color:C.ink,align:"right"});
    });
    text(slide,chart.unit,{x:3,y:6.18,w:4.4,h:0.2,fontFace:BODY,fontSize:8,color:C.muted});
    slide.addShape(rect,{x:9,y:2.65,w:3.15,h:2.42,line:{color:C.line,width:0.8},fill:{color:C.paper,transparency:100}});
    text(slide,chart.dataStatus==="illustrative"?"DEMONSTRATION DATA":"KEY INTERPRETATION",{x:9.28,y:2.95,w:2.55,h:0.22,fontFace:BODY,fontSize:8,bold:true,charSpacing:0.8,color:C.muted});
    text(slide,chart.interpretation,{x:9.28,y:3.38,w:2.55,h:1.1,fontFace:DISPLAY,fontSize:16,color:C.ink,valign:"top"});
    if(chart.dataStatus==="illustrative") text(slide,"SYNTHETIC VALUES — NOT MEASURED DATA",{x:9.28,y:4.69,w:2.55,h:0.22,fontFace:BODY,fontSize:6.5,bold:true,color:"8A4C39"});
  }
  footer(slide,2);
}
function renderArchitecture(pptx:Pptx,s:SlideSpec) {
  const slide=pptx.addSlide(); slide.background={color:C.paper};
  const headline=s.elements.find(e=>e.type==="text"&&e.role==="headline");
  const diagram=s.elements.find((e):e is DiagramElement=>e.type==="diagram");
  text(slide,"SYSTEM DESIGN / TARGET ARCHITECTURE",{x:0.78,y:0.62,w:5,h:0.22,fontFace:BODY,fontSize:8,charSpacing:1.5,bold:true,color:C.muted});
  if(headline?.type==="text") text(slide,headline.text,{x:0.78,y:1,w:11.8,h:0.8,fontFace:DISPLAY,fontSize:25,color:C.ink});
  if(diagram){
    const positions=[{x:0.55,y:3.3},{x:2.78,y:3.3},{x:5.08,y:1.95},{x:5.08,y:4.55},{x:7.68,y:3.3},{x:10.25,y:3.3}];
    const width=1.92,height=0.83;
    const centers=new Map<string,{x:number;y:number}>();
    diagram.nodes.forEach((node,i)=>{const p=positions[i]??{x:0.8+(i%5)*2.35,y:5.7};centers.set(node,{x:p.x+width/2,y:p.y+height/2});});
    diagram.relationships.forEach(r=>{
      const a=centers.get(r.from),b=centers.get(r.to);if(!a||!b)return;
      slide.addShape(line,{x:a.x,y:a.y,w:b.x-a.x,h:b.y-a.y,line:{color:C.accentDeep,width:1.35,endArrowType:"triangle"}});
    });
    diagram.nodes.forEach((node,i)=>{
      const p=positions[i]??{x:0.8+(i%5)*2.35,y:5.7};
      slide.addShape(rect,{x:p.x,y:p.y,w:width,h:height,line:{color:i===diagram.nodes.length-1?C.ink:C.line,width:1},fill:{color:i===diagram.nodes.length-1?C.ink:C.white}});
      text(slide,node,{x:p.x+0.12,y:p.y+0.12,w:width-0.24,h:height-0.24,fontFace:BODY,fontSize:9,bold:i===diagram.nodes.length-1,color:i===diagram.nodes.length-1?C.white:C.ink,align:"center",valign:"mid"});
    });
    text(slide,"TARGET ARCHITECTURE — NOT ALL COMPONENTS ARE IMPLEMENTED",{x:0.82,y:6.55,w:8.5,h:0.2,fontFace:BODY,fontSize:7,charSpacing:0.7,color:C.muted});
  }
  footer(slide,3);
}
export async function renderConceptDeck(specs:SlideSpec[],outputPath:string):Promise<void>{
  if(specs.length!==3) throw new Error("The proof renderer currently expects exactly three concept specifications.");
  const pptx=new pptxgen();
  pptx.layout="LAYOUT_WIDE";
  pptx.author="Jahwanth Pulugujju";
  pptx.subject="PPD editable three-concept proof";
  pptx.title="PPD — Premium Presentation Design System";
  pptx.company="PPD";
  pptx.theme={headFontFace:DISPLAY,bodyFontFace:BODY,lang:"en-US"};
  renderOpener(pptx,specs[0]);
  renderData(pptx,specs[1]);
  renderArchitecture(pptx,specs[2]);
  await pptx.writeFile({fileName:outputPath});
}
