import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { validateSlideSpec } from "../core/validate-slide-spec.js";

const directory = resolve(process.cwd(), "examples", "three-concepts");
const files = (await readdir(directory)).filter((name) => name.endsWith(".json")).sort();
let errors = 0;
let warnings = 0;
if (files.length === 0) {
  console.error("No concept JSON files found.");
  process.exitCode = 1;
} else {
  for (const name of files) {
    try {
      const input: unknown = JSON.parse(await readFile(join(directory, name), "utf8"));
      const result = validateSlideSpec(input);
      console.log((result.valid ? "PASS " : "FAIL ") + name);
      for (const issue of result.issues) {
        console.log("  " + issue.severity.toUpperCase() + " " + issue.code + " (" + issue.path + "): " + issue.message);
        if (issue.severity === "error") errors += 1;
        else warnings += 1;
      }
      if (!result.valid) process.exitCode = 1;
    } catch (error) {
      errors += 1;
      process.exitCode = 1;
      console.error("FAIL " + name + ": " + (error instanceof Error ? error.message : String(error)));
    }
  }
  console.log("Validated " + files.length + " concept(s): " + errors + " error(s), " + warnings + " warning(s).");
}
