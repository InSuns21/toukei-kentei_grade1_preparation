#!/usr/bin/env node
/**
 * Cross-series structural / canonical reference gate for BHI I–II.
 * This is an executable review inventory, NOT a proof that all mathematics is true.
 * Run: node scripts/audit-bhi-series-closeout.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const relative = (p) => path.relative(root, p).replaceAll(path.sep, "/");
const read = (p) => fs.readFileSync(p, "utf8");
const base = path.join(root, "textbook/volumes/dream_thater/物理系/BHI");
const manifest = read(path.join(root, "textbook/dream-theater-series/BHI.yaml"));
const toc = read(path.join(root, "textbook/dream-theater-toc/080_物理系/106_black-hole-information.md"));
const issues = [];
const rows = [];
let totalExercises = 0, totalProofs = 0, totalDefs = 0, linkChecks = 0;
const matchedIds = [...manifest.matchAll(/^  - id: (BHI\d+)$/gm)].map((m) => m[1]);
const completed = [...manifest.matchAll(/^    status: completed$/gm)].length;
if (matchedIds.length !== 36 || completed !== 36) issues.push("BHI manifest: not exactly 36 completed chapters");
for (let n = 1; n <= 36; n++) {
  const id = "BHI" + n;
  if (matchedIds[n-1] !== id) issues.push("BHI manifest order: " + id);
  const folder = path.join(base, id);
  const index = path.join(folder, "index.md");
  const meta = read(path.join(folder, "chapter.yaml"));
  const know = read(path.join(folder, "knowledge.yaml"));
  const text = read(index);
  const ids = [...text.matchAll(/<a id="([^"]+)"/g)].map((m) => m[1]);
  const ex = ids.filter((z) => z.startsWith("ex-bhi" + n + "-"));
  const def = ids.filter((z) => z.startsWith("def-bhi" + n + "-"));
  const result = ids.filter((z) => /^(thm|prop|lem)-bhi[0-9]+-/.test(z));
  const count = (re) => [...text.matchAll(re)].length;
  const proof = count(/<!-- proof-start -->/g);
  const solution = count(/<!-- solution-start -->/g);
  const formal = count(/<!-- formal-statement-start -->/g);
  const example = count(/<!-- definition-example-start:/g);
  const a = ex.filter((z) => /-a[0-9]+$/.test(z)).length;
  const b = ex.filter((z) => /-b[0-9]+$/.test(z)).length;
  const c = ex.filter((z) => /-c[0-9]+$/.test(z)).length;
  if (!meta.match(new RegExp("^id:\\s*" + id + "$", "m"))) issues.push(id + ": chapter.yaml ID");
  if (!know.match(new RegExp("^chapter:\\s*" + id + "$", "m"))) issues.push(id + ": knowledge.yaml ID");
  if (!know.includes("coverage: complete")) issues.push(id + ": knowledge coverage incomplete");
  if (a < 4 || b < 3 || c < 1) issues.push(id + ": A/B/C exercise minimum");
  if (solution !== ex.length || count(/<!-- solution-end -->/g) !== solution) issues.push(id + ": solution markers");
  if (proof !== count(/<!-- proof-end -->/g) || proof < result.length - 1) issues.push(id + ": proof markers");
  if (formal !== count(/<!-- formal-statement-end -->/g)) issues.push(id + ": formal markers");
  if (example < def.length) issues.push(id + ": definition example missing");
  if (new Set(ids).size !== ids.length) issues.push(id + ": duplicate anchors");
  const exerciseCounts = meta.match(/exercise_counts:\s*\{\s*level_a:\s*(\d+),\s*level_b:\s*(\d+),\s*level_c:\s*(\d+)/);
  if (!exerciseCounts || [+exerciseCounts[1],+exerciseCounts[2],+exerciseCounts[3]].join(",") !== [a,b,c].join(",")) {
    issues.push(id + ": exercise_counts mismatch / not parseable");
  }
  if (!toc.includes("[" + id + " ")) issues.push(id + ": missing from published TOC source");
  for (const match of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    const href = match[1];
    if (/^(https?:|mailto:|data:|javascript:)/i.test(href)) continue;
    const sep = href.indexOf("#");
    const filePart = sep < 0 ? href : href.slice(0, sep);
    const anchor = sep < 0 ? "" : href.slice(sep+1);
    const target = filePart ? path.resolve(folder, decodeURIComponent(filePart)) : index;
    if (!target.startsWith(root + path.sep)) { issues.push(id + ": link escapes repo: " + href); continue; }
    if (!fs.existsSync(target)) { issues.push(id + ": missing file " + relative(target)); continue; }
    if (/^(def|thm|prop|lem|ex)-/.test(anchor)) {
      const targetText = read(target);
      if (!targetText.includes('id="' + anchor + '"')) {
        issues.push(id + ": unresolved canonical fragment " + href);
      }
      linkChecks++;
    }
  }
  rows.push({ id, definitions: def.length, results: result.length, proofs: proof, exercises: ex.length, A: a, B: b, C: c, anchors: ids.length });
  totalDefs += def.length; totalProofs += proof; totalExercises += ex.length;
}

const finishedPath = path.join(root, "textbook/plan_done/DREAM_THEATER_BLACK_HOLE_INFORMATION_I_II_PLAN.md");
const progressPath = path.join(root, "textbook/plans_progress/DREAM_THEATER_BLACK_HOLE_INFORMATION_I_II_PLAN.md");
if (!fs.existsSync(finishedPath) || fs.existsSync(progressPath)) {
  issues.push("BHI PLAN must exist only in plan_done, not plans_progress");
}
if (!manifest.includes("plan: textbook/plan_done/DREAM_THEATER_BLACK_HOLE_INFORMATION_I_II_PLAN.md")) {
  issues.push("BHI series manifest must route to done PLAN");
}
// Search every existing text/yaml source for the old *exact* path, not only
// known top-level manifests, so renamed direct links cannot be overlooked.
const stale = "plans_progress/DREAM_THEATER_BLACK_HOLE_INFORMATION_I_II_PLAN.md";
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === "dist") continue;
    const filename = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(filename);
    else if (/\.(?:md|yaml|yml|json|mjs|js|py)$/.test(entry.name) &&
             read(filename).includes(stale)) issues.push("stale PLAN reference: " + relative(filename));
  }
}
walk(path.join(root, "textbook"));

console.log("BHI1–36: chapters=" + rows.length + ", definitions=" + totalDefs +
  ", proofs=" + totalProofs + ", exercises=" + totalExercises +
  ", canonical link checks=" + linkChecks + ", findings=" + issues.length);
for (const row of rows) console.log(JSON.stringify(row));
for (const issue of issues) console.error("ERROR: " + issue);
if (issues.length) process.exitCode = 1;
