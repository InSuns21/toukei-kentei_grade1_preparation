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

export function loadCurationPolicy() {
  const file = path.join(ROOT, "curation.yaml");
  if (!fs.existsSync(file)) {
    return {
      schema_version: 1,
      active_card_limit: 950,
      hard_max_cards: 999,
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

export function selectActiveCards(cards = readAllCards(), policy = loadCurationPolicy()) {
  const limit = Number(policy.active_card_limit);
  const hardMax = Number(policy.hard_max_cards ?? 999);
  if (!Number.isInteger(limit) || limit < 1 || limit > hardMax || hardMax > 999) {
    throw new Error("curation.yaml: active_card_limit は1以上 hard_max_cards 以下、hard_max_cards は999以下にします");
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
    throw new Error(`curation.yaml: 必須カード${required.size}枚が active_card_limit=${limit} を超えています`);
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
  return process.env.ANKI_CARD_MODE === "active" ? readActiveCards() : readAllCards();
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
