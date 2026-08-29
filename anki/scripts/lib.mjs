import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

export const ROOT = path.resolve(import.meta.dirname, "..");

export function walk(dir) {
  return fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        return entry.isDirectory() ? walk(full) : [full];
      })
    : [];
}

export function readAllCards() {
  return walk(path.join(ROOT, "cards"))
    .filter((file) => file.endsWith(".md"))
    .flatMap((file) => parseCards(file))
    .filter((card) => card.published !== false);
}

export function readArchivedCards() {
  return walk(path.join(ROOT, "archive"))
    .filter((file) => file.endsWith(".md") && path.basename(file).toLowerCase() !== "readme.md")
    .flatMap((file) => parseCards(file))
    .filter((card) => card.published !== false);
}

export function loadCurationPolicy() {
  const file = path.join(ROOT, "curation.yaml");
  if (!fs.existsSync(file)) {
    return {
      schema_version: 2,
      selection_mode: "canonical_only",
      audit_mode: true,
      target_min_cards: 580,
      target_max_cards: 620,
      hard_max_cards: 620,
      priority_order: ["S", "A", "B", "C", "D"],
      preserve_official_term_coverage: true,
      preserve_subcategory_coverage: true,
    };
  }
  return YAML.parse(fs.readFileSync(file, "utf8"));
}

function cardEvidenceScore(card) {
  const frequency = card.frequency || {};
  return Number(frequency.past_exam || 0) * 1000
    + Number(frequency.independent_problems || 0) * 100
    + Number(frequency.source_confirmations || 0) * 10
    + Number(frequency.textbook || 0);
}

function cardComparator(priorityOrder) {
  const priorityRank = new Map(priorityOrder.map((priority, index) => [priority, index]));
  return (a, b) => {
    const priorityDiff = (priorityRank.get(a.priority) ?? priorityOrder.length) - (priorityRank.get(b.priority) ?? priorityOrder.length);
    if (priorityDiff) return priorityDiff;
    const evidenceDiff = cardEvidenceScore(b) - cardEvidenceScore(a);
    if (evidenceDiff) return evidenceDiff;
    const difficultyDiff = Number(b.difficulty || 0) - Number(a.difficulty || 0);
    if (difficultyDiff) return difficultyDiff;
    return String(a.id).localeCompare(String(b.id), "ja");
  };
}

/**
 * Return the cards used by the normal build.
 *
 * canonical_only is the v2 policy: cards/ itself is the canonical deck, so this
 * function must not hide excess cards by ranking them. During audit_mode an
 * oversized cards/ tree is intentionally returned as-is and curation.mjs
 * reports the remaining editorial work.
 *
 * legacy_ranked is retained only so an old branch/config can still be read.
 */
export function selectActiveCards(cards = readAllCards(), policy = loadCurationPolicy()) {
  const selectionMode = policy.selection_mode || "canonical_only";
  if (selectionMode === "canonical_only") return [...cards];

  if (selectionMode !== "legacy_ranked") {
    throw new Error(`curation.yaml: 未知の selection_mode=${selectionMode}`);
  }

  const hardMax = Number(policy.hard_max_cards ?? 999);
  const limit = Number(policy.active_card_limit ?? policy.target_max_cards ?? hardMax);
  if (!Number.isInteger(limit) || limit < 1 || limit > hardMax) {
    throw new Error("curation.yaml: legacy_ranked の上限値が不正です");
  }
  if (cards.length <= limit) return [...cards];

  const priorityOrder = Array.isArray(policy.priority_order) && policy.priority_order.length
    ? policy.priority_order
    : ["S", "A", "B", "C", "D"];
  const compare = cardComparator(priorityOrder);
  const ranked = [...cards].sort(compare);
  const byId = new Map(cards.map((card) => [card.id, card]));
  const required = new Set((policy.always_include_ids || []).filter((id) => byId.has(id)));

  if (policy.preserve_official_term_coverage !== false) {
    const coverageFile = path.join(ROOT, "syllabus", "coverage.yaml");
    if (fs.existsSync(coverageFile)) {
      const coverage = YAML.parse(fs.readFileSync(coverageFile, "utf8"));
      for (const item of coverage.items || []) {
        for (const term of item.terms || []) {
          if (term.status !== "card") continue;
          const candidates = (term.cards || []).map((id) => byId.get(id)).filter(Boolean).sort(compare);
          if (candidates.length) required.add(candidates[0].id);
        }
      }
    }
  }

  if (policy.preserve_subcategory_coverage !== false) {
    const syllabus = loadSyllabus();
    for (const subcategory of Object.keys(syllabus.subcategories || {})) {
      const candidate = ranked.find((card) => card.subcategory === subcategory);
      if (candidate) required.add(candidate.id);
    }
  }

  if (required.size > limit) {
    throw new Error(`curation.yaml: 必須カード${required.size}枚が limit=${limit} を超えています`);
  }

  const selected = [];
  const selectedIds = new Set();
  for (const card of ranked) {
    if (required.has(card.id)) {
      selected.push(card);
      selectedIds.add(card.id);
    }
  }
  for (const card of ranked) {
    if (selected.length >= limit) break;
    if (!selectedIds.has(card.id)) {
      selected.push(card);
      selectedIds.add(card.id);
    }
  }
  return selected;
}

export function readActiveCards() {
  return selectActiveCards(readAllCards());
}

export function readCards() {
  const mode = process.env.ANKI_CARD_MODE;
  if (mode === "active") return readActiveCards();
  if (mode === "reviewed") return [...readAllCards(), ...readArchivedCards()];
  return readAllCards();
}

export function parseCards(file) {
  const source = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  const chunks = source.split(/^<!-- CARD -->\s*$/m).map((part) => part.trim()).filter(Boolean);
  return chunks.map((chunk) => parseCardChunk(file, chunk));
}

function parseCardChunk(file, source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`${path.relative(ROOT, file)}: カードの YAML front matter がありません`);
  const meta = YAML.parse(match[1]);
  const body = match[2].trim();
  const sections = {};
  let current = "";
  for (const line of body.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      current = heading[1].trim();
      sections[current] = [];
    } else if (current) {
      sections[current].push(line);
    }
  }
  return {
    ...meta,
    file,
    body,
    sections: Object.fromEntries(Object.entries(sections).map(([key, lines]) => [key, lines.join("\n").trim()])),
  };
}

export function loadSyllabus() {
  return YAML.parse(fs.readFileSync(path.join(ROOT, "syllabus", "syllabus.yaml"), "utf8"));
}

export function baselineFile(workId) {
  return path.join(ROOT, ".state", `${workId}-baseline.yaml`);
}

export function readBaseline(workId) {
  const file = baselineFile(workId);
  return fs.existsSync(file) ? YAML.parse(fs.readFileSync(file, "utf8")) : null;
}

export function plainText(value = "") {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\$+/g, " ")
    .replace(/[\\*_`#>\[\](){}|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
