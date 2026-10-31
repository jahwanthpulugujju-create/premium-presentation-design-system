import { mkdir, readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import type { SlideSpec } from "../core/slide-spec.js";
import { validateSlideSpec } from "../core/validate-slide-spec.js";
import { renderConceptDeck } from "../renderers/pptx/render-concept-deck.js";

const sourceDir = resolve(process.cwd(), "examples", "three-concepts");
const outputDir = resolve(process.cwd(), "artifacts");
const names = (await readdir(sourceDir)).filter((name) => name.endsWith(".json")).sort();
if (names.length !== 3) throw new Error("The proof build expects exactly three JSON concept specifications.");
const specs: SlideSpec[] = [];
for (const name of names) {
  const input: unknown = JSON.parse(await readFile(join(sourceDir, name), "utf8"));
  const result = validateSlideSpec(input);
  const errors = result.issues.filter((issue) => issue.severity === "error");
  for (const issue of result.issues) {
    const line = name + " — " + issue.severity.toUpperCase() + " " + issue.code + ": " + issue.message;
    if (issue.severity === "error") console.error(line);
    else console.warn(line);
  }
  if (errors.length) throw new Error("Concept specification failed: " + name);
  specs.push(input as SlideSpec);
}
await mkdir(outputDir, { recursive: true });
const outputPath = join(outputDir, "ppd-three-concept-proof.pptx");
await renderConceptDeck(specs, outputPath);
console.log("Created editable PowerPoint proof: " + outputPath);
