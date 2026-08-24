import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { ROOT, loadCurationPolicy, loadSyllabus, readActiveCards, readAllCards } from "./lib.mjs";

const checkOnly = process.argv.includes("--check");
const policy = loadCurationPolicy();
const syllabus = loadSyllabus();
const coverage = YAML.parse(fs.readFileSync(path.join(ROOT, "syllabus", "coverage.yaml"), "utf8"));
const allCards = readAllCards();
const activeCards = readActiveCards();
const activeIds = new Set(activeCards.map((card) => card.id));
const errors = [];

if (activeCards.length > Number(policy.hard_max_cards ?? 999)) {
  errors.push(`有効カード${activeCards.length}枚が hard_max_cards=${policy.hard_max_cards} を超えています`);
}
if (allCards.length > Number(policy.active_card_limit) && activeCards.length !== Number(policy.active_card_limit)) {
  errors.push(`有効カードは active_card_limit=${policy.active_card_limit} 枚に揃える必要があります（現在${activeCards.length}枚）`);
}

for (const category of syllabus.categories || []) {
  if (!activeCards.some((card) => card.category === category.id)) errors.push(`有効カードに category ${category.id} がありません`);
  for (const subcategory of category.children || []) {
    if (!activeCards.some((card) => card.subcategory === subcategory)) errors.push(`有効カードに subcategory ${subcategory} がありません`);
  }
}

for (const item of coverage.items || []) {
  for (const term of item.terms || []) {
    if (term.status !== "card") continue;
    const mapped = (term.cards || []).filter((id) => activeIds.has(id));
    if (!mapped.length) errors.push(`公式用語 ${item.id}/${term.name} に有効カードがありません`);
  }
}

const countByPriority = (cards) => Object.fromEntries(
  ["S", "A", "B", "C", "D"].map((priority) => [priority, cards.filter((card) => card.priority === priority).length]),
);
const byCategory = Object.fromEntries((syllabus.categories || []).map((category) => [
  category.id,
  {
    source: allCards.filter((card) => card.category === category.id).length,
    active: activeCards.filter((card) => card.category === category.id).length,
  },
]));

const summary = {
  source_cards: allCards.length,
  active_cards: activeCards.length,
  removed_from_default_deck: allCards.length - activeCards.length,
  active_card_limit: Number(policy.active_card_limit),
  hard_max_cards: Number(policy.hard_max_cards ?? 999),
  priority_counts: {
    source: countByPriority(allCards),
    active: countByPriority(activeCards),
  },
  category_counts: byCategory,
  errors,
};
console.log(YAML.stringify(summary));

if (errors.length) {
  console.error(errors.map((message) => `ERROR: ${message}`).join("\n"));
  process.exitCode = 1;
} else if (checkOnly) {
  console.log("Anki curation check: success");
}
