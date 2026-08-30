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

const allowedMetadataKeys = new Set(["title", "topic", "type", "difficulty", "priority", "hashtags"]);
const targetIds = new Set();
for (const item of plan.items) {
  if (!item?.id || typeof item.id !== "string") throw new Error("quality rewrite item requires id");
  if (targetIds.has(item.id)) throw new Error(`duplicate rewrite target: ${item.id}`);
  targetIds.add(item.id);

  const hasSections = item.sections && typeof item.sections === "object" && !Array.isArray(item.sections) && Object.keys(item.sections).length;
  const hasMetadata = item.metadata && typeof item.metadata === "object" && !Array.isArray(item.metadata) && Object.keys(item.metadata).length;
  if (!hasSections && !hasMetadata) {
    throw new Error(`${item.id}: sections or metadata must contain at least one rewrite`);
  }

  if (item.sections !== undefined) {
    if (!item.sections || typeof item.sections !== "object" || Array.isArray(item.sections)) {
      throw new Error(`${item.id}: sections must be an object`);
    }
    for (const [section, value] of Object.entries(item.sections)) {
      if (!section.trim()) throw new Error(`${item.id}: section name must not be empty`);
      if (typeof value !== "string" || !value.trim()) throw new Error(`${item.id}/${section}: replacement must be non-empty text`);
    }
  }

  if (item.metadata !== undefined) {
    if (!item.metadata || typeof item.metadata !== "object" || Array.isArray(item.metadata)) {
      throw new Error(`${item.id}: metadata must be an object`);
    }
    for (const key of Object.keys(item.metadata)) {
      if (!allowedMetadataKeys.has(key)) {
        throw new Error(`${item.id}: metadata.${key} is not rewriteable; id/category/subcategory and other structural fields must remain stable`);
      }
    }
  }
}

function cardIdFromChunk(chunk) {
  const match = chunk.match(/^\s*---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const meta = YAML.parse(match[1]);
  return meta?.id || null;
}

const strategySectionAliases = new Set(["一手／方針", "一手", "重要な一手", "方針"]);

function normalizedSectionName(sectionName) {
  return strategySectionAliases.has(sectionName) ? "一手／方針" : sectionName;
}

function sectionAliasNames(sectionName) {
  return strategySectionAliases.has(sectionName) ? strategySectionAliases : new Set([sectionName]);
}

function collectHeadings(lines) {
  const headings = [];
  for (let i = 0; i < lines.length; i += 1) {
    const match = lines[i].match(/^##\s+(.+?)\s*$/);
    if (match) headings.push({ index: i, name: match[1].trim() });
  }
  return headings;
}

function replaceSectionInBody(body, sectionName, replacement) {
  const eol = body.includes("\r\n") ? "\r\n" : "\n";
  const lines = body.split(/\r?\n/);
  const canonicalName = normalizedSectionName(sectionName);
  const aliasNames = sectionAliasNames(sectionName);
  let headings = collectHeadings(lines);
  const matching = headings.filter((heading) => aliasNames.has(heading.name));
  const replacementLines = replacement.trim().split(/\r?\n/);

  if (matching.length) {
    // A strategy section has historically appeared under several aliases.
    // Keep the earliest position, remove later aliases, and normalize the heading.
    for (let i = matching.length - 1; i >= 1; i -= 1) {
      headings = collectHeadings(lines);
      const duplicate = headings.find((heading) => heading.name === matching[i].name && heading.index >= matching[i].index);
      if (!duplicate) continue;
      const duplicatePosition = headings.findIndex((heading) => heading.index === duplicate.index);
      const end = duplicatePosition + 1 < headings.length ? headings[duplicatePosition + 1].index : lines.length;
      lines.splice(duplicate.index, end - duplicate.index);
    }

    headings = collectHeadings(lines);
    const current = headings.find((heading) => aliasNames.has(heading.name));
    if (!current) throw new Error(`${sectionName}: failed to resolve existing section alias`);
    const currentPosition = headings.findIndex((heading) => heading.index === current.index);
    const end = currentPosition + 1 < headings.length ? headings[currentPosition + 1].index : lines.length;
    lines[current.index] = `## ${canonicalName}`;
    lines.splice(current.index + 1, end - current.index - 1, ...replacementLines, "");
    return lines.join(eol).replace(/\s+$/, "");
  }

  const preferredOrder = ["問題", "記号・用語", "使用公式・定理", "なぜ", "なぜ？", "一手／方針", "答え", "計算例", "条件・注意", "注意"];
  const desiredRank = preferredOrder.indexOf(canonicalName);
  let insertAt = lines.length;
  if (desiredRank >= 0) {
    const next = headings.find((heading) => {
      const headingName = normalizedSectionName(heading.name);
      const rank = preferredOrder.indexOf(headingName);
      return rank >= 0 && rank > desiredRank;
    });
    if (next) insertAt = next.index;
  } else {
    const noteHeading = headings.find((heading) => heading.name === "注意" || heading.name === "条件・注意");
    if (noteHeading) insertAt = noteHeading.index;
  }

  const block = [`## ${canonicalName}`, ...replacementLines, ""];
  lines.splice(insertAt, 0, ...(insertAt > 0 && lines[insertAt - 1] !== "" ? [""] : []), ...block);
  return lines.join(eol).replace(/\s+$/, "");
}

function rewriteChunk(chunk, item) {
  const front = chunk.match(/^(\s*---\r?\n)([\s\S]*?)(\r?\n---\r?\n)([\s\S]*)$/);
  if (!front) throw new Error(`${item.id}: malformed card chunk`);

  const meta = YAML.parse(front[2]);
  if (item.metadata) {
    for (const [key, value] of Object.entries(item.metadata)) meta[key] = value;
  }

  let body = front[4].replace(/\s+$/, "");
  for (const [section, replacement] of Object.entries(item.sections || {})) {
    body = replaceSectionInBody(body, section, replacement);
  }

  const trailing = chunk.match(/\s*$/)?.[0] ?? "";
  const renderedFront = item.metadata
    ? `${front[1]}${YAML.stringify(meta).trimEnd()}${front[3]}`
    : `${front[1]}${front[2]}${front[3]}`;
  return `${renderedFront}${body}${trailing}`;
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
  const changes = [
    ...Object.keys(item.metadata || {}).map((key) => `meta:${key}`),
    ...Object.keys(item.sections || {}),
  ];
  console.log(`- ${item.id}: ${changes.join(", ")}${item.note ? ` — ${item.note}` : ""}`);
}
