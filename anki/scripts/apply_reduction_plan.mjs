import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { ROOT, walk, readAllCards, readArchivedCards } from "./lib.mjs";

const planPath = path.join(ROOT, "reduction-plan.yaml");
if (!fs.existsSync(planPath)) throw new Error("anki/reduction-plan.yaml がありません");

const plan = YAML.parse(fs.readFileSync(planPath, "utf8").replace(/^\uFEFF/, "")) || {};
const items = Array.isArray(plan.items) ? plan.items : [];
const batchId = String(plan.batch_id || "reduction-batch").replace(/[^A-Za-z0-9._-]/g, "-");
const allowedBuckets = new Set(["duplicates", "low_priority", "too_specific", "reference_only"]);

if (!items.length) {
  console.log("Anki reduction plan: no items");
  process.exit(0);
}

function parseChunk(chunk, file) {
  const match = chunk.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`${path.relative(ROOT, file)}: YAML front matter がありません`);
  return { meta: YAML.parse(match[1]), body: match[2].trim() };
}

function renderChunk(meta, body) {
  return `---\n${YAML.stringify(meta).trimEnd()}\n---\n${body.trim()}\n`;
}

function readCardFiles() {
  return walk(path.join(ROOT, "cards"))
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const source = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
      const chunks = source.split(/^<!-- CARD -->\s*$/m).map((part) => part.trim()).filter(Boolean);
      return { file, chunks: chunks.map((chunk) => ({ raw: chunk, ...parseChunk(chunk, file) })) };
    });
}

function readArchiveCardFiles() {
  return walk(path.join(ROOT, "archive"))
    .filter((file) => file.endsWith(".md"))
    .filter((file) => {
      const source = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trimStart();
      // archive/README.md and similar documentation are not card corpora.
      return source.startsWith("---\n") || source.startsWith("---\r\n");
    });
}

const files = readCardFiles();
const cardIndex = new Map();
for (const source of files) {
  source.chunks.forEach((chunk, index) => {
    const id = String(chunk.meta.id || "");
    if (!id) throw new Error(`${path.relative(ROOT, source.file)}: id がありません`);
    if (cardIndex.has(id)) throw new Error(`重複カードID: ${id}`);
    cardIndex.set(id, { source, index, chunk });
  });
}

const archiveIds = new Set();
const canonicalMap = new Map();
const coverageMap = new Map();
for (const item of items) {
  const id = String(item.id || "").trim();
  if (!id) throw new Error("reduction-plan.yaml: item.id がありません");
  if (archiveIds.has(id)) throw new Error(`reduction-plan.yaml: ${id} が重複しています`);
  if (!allowedBuckets.has(item.bucket)) throw new Error(`${id}: bucket=${item.bucket} は未対応です`);
  if (!String(item.reason || "").trim()) throw new Error(`${id}: reason がありません`);
  archiveIds.add(id);
  if (item.canonical_card) canonicalMap.set(id, String(item.canonical_card));
  if (item.coverage_card) coverageMap.set(id, String(item.coverage_card));
}

for (const id of archiveIds) {
  if (!cardIndex.has(id)) throw new Error(`${id}: cards/ に存在しません。既にarchive済みならplanから外してください`);
}
for (const [id, canonical] of canonicalMap) {
  if (archiveIds.has(canonical)) throw new Error(`${id}: canonical_card=${canonical} も同じplanでarchive対象です。1 batch内では最終canonicalへ直接向けてください`);
  if (!cardIndex.has(canonical)) throw new Error(`${id}: canonical_card=${canonical} がcards/に存在しません`);
}
for (const [id, replacement] of coverageMap) {
  if (archiveIds.has(replacement)) throw new Error(`${id}: coverage_card=${replacement} も同じplanでarchive対象です`);
  if (!cardIndex.has(replacement)) throw new Error(`${id}: coverage_card=${replacement} がcards/に存在しません`);
  const sourceSubcategory = cardIndex.get(id).chunk.meta.subcategory;
  const replacementSubcategory = cardIndex.get(replacement).chunk.meta.subcategory;
  if (sourceSubcategory !== replacementSubcategory) {
    throw new Error(`${id}: coverage_card=${replacement} は同一subcategory ${sourceSubcategory} から選んでください`);
  }
}

const archiveByBucket = new Map();
for (const item of items) {
  const entry = cardIndex.get(item.id);
  const meta = { ...entry.chunk.meta };
  meta.archive_reason = String(item.reason);
  if (item.canonical_card) meta.canonical_card = String(item.canonical_card);
  if (item.coverage_card) meta.coverage_card = String(item.coverage_card);
  if (item.note) meta.archive_note = String(item.note);
  const rendered = renderChunk(meta, entry.chunk.body).trim();
  if (!archiveByBucket.has(item.bucket)) archiveByBucket.set(item.bucket, []);
  archiveByBucket.get(item.bucket).push(rendered);
}

for (const source of files) {
  const kept = source.chunks.filter((chunk) => !archiveIds.has(String(chunk.meta.id)));
  if (kept.length === source.chunks.length) continue;
  if (!kept.length) {
    fs.unlinkSync(source.file);
    console.log(`removed empty source file: ${path.relative(ROOT, source.file)}`);
  } else {
    const content = kept.map((chunk) => chunk.raw.trim()).join("\n\n<!-- CARD -->\n\n") + "\n";
    fs.writeFileSync(source.file, content, "utf8");
    console.log(`updated: ${path.relative(ROOT, source.file)} (${source.chunks.length} -> ${kept.length})`);
  }
}

const remainingIds = new Set([...cardIndex.keys()].filter((id) => !archiveIds.has(id)));

for (const [bucket, chunks] of archiveByBucket) {
  const dir = path.join(ROOT, "archive", bucket);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${batchId}.md`);
  if (fs.existsSync(file)) throw new Error(`${path.relative(ROOT, file)} は既に存在します。batch_idを変えてください`);
  fs.writeFileSync(file, chunks.join("\n\n<!-- CARD -->\n\n") + "\n", "utf8");
  console.log(`archived: ${chunks.length} -> ${path.relative(ROOT, file)}`);
}

// A card that was yesterday's canonical may itself be consolidated later.
// Keep every historical archive pointer aimed at the currently active
// canonical card rather than leaving chains such as A -> B(archived) -> C.
// Documentation files such as archive/README.md are deliberately excluded.
for (const file of readArchiveCardFiles()) {
  const source = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  const rawChunks = source.split(/^<!-- CARD -->\s*$/m).map((part) => part.trim()).filter(Boolean);
  let changed = false;
  const rendered = rawChunks.map((raw) => {
    const parsed = parseChunk(raw, file);
    const meta = { ...parsed.meta };
    let target = meta.canonical_card ? String(meta.canonical_card) : null;
    if (target && archiveIds.has(target)) {
      const replacement = canonicalMap.get(target);
      if (!replacement) {
        throw new Error(`${path.relative(ROOT, file)}/${meta.id}: canonical_card=${target} を今回archiveしますが、新canonicalが指定されていません`);
      }
      meta.canonical_card = replacement;
      target = replacement;
      changed = true;
    }
    if (target && !remainingIds.has(target)) {
      throw new Error(`${path.relative(ROOT, file)}/${meta.id}: canonical_card=${target} がactive cards/にありません`);
    }
    return renderChunk(meta, parsed.body).trim();
  });
  if (changed) {
    fs.writeFileSync(file, rendered.join("\n\n<!-- CARD -->\n\n") + "\n", "utf8");
    console.log(`remapped archived canonical links: ${path.relative(ROOT, file)}`);
  }
}

const coveragePath = path.join(ROOT, "syllabus", "coverage.yaml");
const coverage = YAML.parse(fs.readFileSync(coveragePath, "utf8").replace(/^\uFEFF/, ""));

function remapIds(ids = [], coverageItemId) {
  const out = [];
  for (const rawId of ids || []) {
    const id = String(rawId);
    if (!archiveIds.has(id)) {
      if (!out.includes(id)) out.push(id);
      continue;
    }

    // Conceptual canonical cards may live in another syllabus subcategory.
    // coverage.yaml, however, must only reference cards whose primary
    // subcategory is the coverage item itself. Prefer an explicit
    // coverage_card; otherwise reuse canonical_card only when it belongs to
    // this same subcategory. If neither applies, simply remove the archived
    // ID and let the remaining same-subcategory cards carry coverage.
    let replacement = coverageMap.get(id) || null;
    if (!replacement) {
      const canonical = canonicalMap.get(id);
      if (canonical && cardIndex.get(canonical)?.chunk.meta.subcategory === coverageItemId) {
        replacement = canonical;
      }
    }
    if (replacement && cardIndex.get(replacement)?.chunk.meta.subcategory === coverageItemId && !out.includes(replacement)) {
      out.push(replacement);
    }
  }
  return out;
}

for (const coverageItem of coverage.items || []) {
  coverageItem.cards = remapIds(coverageItem.cards || [], coverageItem.id);
  for (const term of coverageItem.terms || []) {
    term.cards = remapIds(term.cards || [], coverageItem.id);
    if (term.status === "card" && !term.cards.some((id) => remainingIds.has(id))) {
      throw new Error(`coverage喪失: ${coverageItem.id}/${term.name} に同一subcategoryのcanonical cardが残りません。coverage_cardを指定するか、このカードを残してください`);
    }
  }
}

fs.writeFileSync(coveragePath, YAML.stringify(coverage), "utf8");

// During the canonical-deck audit we may introduce a stronger replacement
// card before archiving weaker historical cards. Use exactly the same readers
// as validation so published:false cards and archive parsing semantics cannot
// drift between the reduction script and the validator.
const progressPath = path.join(ROOT, "progress.yaml");
const progress = YAML.parse(fs.readFileSync(progressPath, "utf8").replace(/^\uFEFF/, ""));
const activeCount = readAllCards().length;
const archiveCount = readArchivedCards().length;
progress.reviewed_card_count = activeCount + archiveCount;
progress.updated_at = new Date().toISOString().slice(0, 10);
fs.writeFileSync(progressPath, YAML.stringify(progress), "utf8");

console.log(`coverage remapped for ${items.length} archived cards`);
console.log(`reviewed corpus synchronized: ${activeCount} canonical + ${archiveCount} archive = ${progress.reviewed_card_count}`);
console.log(`Anki reduction plan applied: ${items.length} cards`);
