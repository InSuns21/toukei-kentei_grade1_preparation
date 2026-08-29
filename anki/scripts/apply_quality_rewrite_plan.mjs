import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { ROOT, walk } from "./lib.mjs";

const planPath = path.join(ROOT, "quality-rewrite-plan.yaml");
if (!fs.existsSync(planPath)) {
  console.log("quality rewrite plan not found; nothing to do");
  process.exit(0);
}

const plan = YAML.parse(fs.readFileSync(planPath, "utf8"));
if (plan?.schema_version !== 1) throw new Error("quality-rewrite-plan.yaml: schema_version must be 1");
if (!Array.isArray(plan.items)) throw new Error("quality-rewrite-plan.yaml: items must be an array");

const targetIds = new Set();
for (const item of plan.items) {
  if (!item?.id || typeof item.id !== "string") throw new Error("quality rewrite item requires id");
  if (targetIds.has(item.id)) throw new Error(`duplicate rewrite target: ${item.id}`);
  targetIds.add(item.id);
  if (!item.sections || typeof item.sections !== "object" || Array.isArray(item.sections)) {
    throw new Error(`${item.id}: sections object is required`);
  }
  if (!Object.keys(item.sections).length) throw new Error(`${item.id}: sections must not be empty`);
  for (const [section, value] of Object.entries(item.sections)) {
    if (!section.trim()) throw new Error(`${item.id}: section name must not be empty`);
    if (typeof value !== "string" || !value.trim()) throw new Error(`${item.id}/${section}: replacement must be non-empty text`);
  }
}

function cardIdFromChunk(chunk) {
  const match = chunk.match(/^\s*---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const meta = YAML.parse(match[1]);
  return meta?.id || null;
}

function replaceSectionInBody(body, sectionName, replacement) {
  const eol = body.includes("\r\n") ? "\r\n" : "\n";
  const lines = body.split(/\r?\n/);
  const headings = [];
  for (let i = 0; i < lines.length; i += 1) {
    const match = lines[i].match(/^##\s+(.+?)\s*$/);
    if (match) headings.push({ index: i, name: match[1].trim() });
  }

  const currentIndex = headings.findIndex((heading) => heading.name === sectionName);
  const replacementLines = replacement.trim().split(/\r?\n/);
  if (currentIndex >= 0) {
    const start = headings[currentIndex].index + 1;
    const end = currentIndex + 1 < headings.length ? headings[currentIndex + 1].index : lines.length;
    lines.splice(start, end - start, ...replacementLines, "");
    return lines.join(eol).replace(/\s+$/, "");
  }

  const preferredOrder = ["問題", "記号・用語", "使用公式・定理", "なぜ", "なぜ？", "一手", "重要な一手", "方針", "答え", "計算例", "条件・注意", "注意"];
  const desiredRank = preferredOrder.indexOf(sectionName);
  let insertAt = lines.length;
  if (desiredRank >= 0) {
    const next = headings.find((heading) => {
      const rank = preferredOrder.indexOf(heading.name);
      return rank >= 0 && rank > desiredRank;
    });
    if (next) insertAt = next.index;
  } else {
    const noteHeading = headings.find((heading) => heading.name === "注意" || heading.name === "条件・注意");
    if (noteHeading) insertAt = noteHeading.index;
  }

  const block = [`## ${sectionName}`, ...replacementLines, ""];
  lines.splice(insertAt, 0, ...(insertAt > 0 && lines[insertAt - 1] !== "" ? [""] : []), ...block);
  return lines.join(eol).replace(/\s+$/, "");
}

function rewriteChunk(chunk, item) {
  const front = chunk.match(/^(\s*---\r?\n[\s\S]*?\r?\n---\r?\n)([\s\S]*)$/);
  if (!front) throw new Error(`${item.id}: malformed card chunk`);
  let body = front[2].replace(/\s+$/, "");
  for (const [section, replacement] of Object.entries(item.sections)) {
    body = replaceSectionInBody(body, section, replacement);
  }
  const trailing = chunk.match(/\s*$/)?.[0] ?? "";
  return `${front[1]}${body}${trailing}`;
}

const files = walk(path.join(ROOT, "cards")).filter((file) => file.endsWith(".md"));
const found = new Map();
let changedCards = 0;
let changedFiles = 0;

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const parts = source.split(/(^<!-- CARD -->\s*$)/m);
  let changed = false;

  for (let i = 0; i < parts.length; i += 2) {
    const id = cardIdFromChunk(parts[i]);
    if (!id || !targetIds.has(id)) continue;
    if (found.has(id)) throw new Error(`${id}: found in multiple files`);
    const item = plan.items.find((candidate) => candidate.id === id);
    const next = rewriteChunk(parts[i], item);
    found.set(id, file);
    if (next !== parts[i]) {
      parts[i] = next;
      changed = true;
      changedCards += 1;
    }
  }

  if (changed) {
    fs.writeFileSync(file, parts.join(""), "utf8");
    changedFiles += 1;
  }
}

const missing = [...targetIds].filter((id) => !found.has(id));
if (missing.length) throw new Error(`rewrite targets not found in canonical cards: ${missing.join(", ")}`);

console.log(`quality rewrite plan ${plan.batch_id || "unnamed"}: ${changedCards} cards changed in ${changedFiles} files`);
for (const item of plan.items) {
  console.log(`- ${item.id}: ${Object.keys(item.sections).join(", ")}${item.note ? ` — ${item.note}` : ""}`);
}
