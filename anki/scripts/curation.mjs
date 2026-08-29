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
const warnings = [];

const selectionMode = policy.selection_mode || "canonical_only";
const auditMode = policy.audit_mode === true;
const targetMin = Number(policy.target_min_cards ?? 580);
const targetMax = Number(policy.target_max_cards ?? 620);
const hardMax = Number(policy.hard_max_cards ?? targetMax);

if (![targetMin, targetMax, hardMax].every(Number.isInteger) || targetMin < 1 || targetMin > targetMax || targetMax > hardMax) {
  errors.push(`curation.yaml のカード数設定が不正です: target_min=${targetMin}, target_max=${targetMax}, hard_max=${hardMax}`);
}

if (selectionMode === "canonical_only") {
  if (activeCards.length !== allCards.length) {
    errors.push(`canonical_only では active=${activeCards.length} と source=${allCards.length} が一致する必要があります`);
  }

  if (auditMode) {
    if (allCards.length > targetMax) {
      warnings.push(`編集監査中: canonical候補${allCards.length}枚。target_max=${targetMax} まで少なくとも${allCards.length - targetMax}枚分の統合・archiveが必要です`);
    } else if (allCards.length < targetMin) {
      warnings.push(`編集監査中: canonical候補${allCards.length}枚で target_min=${targetMin} を下回っています。coverageを再確認してください`);
    } else {
      warnings.push(`編集監査中: カード数は目標範囲${targetMin}〜${targetMax}枚に入りました。coverage再監査後に audit_mode=false としてください`);
    }
  } else {
    if (allCards.length < targetMin) errors.push(`canonical card ${allCards.length}枚が target_min=${targetMin} を下回っています`);
    if (allCards.length > targetMax) errors.push(`canonical card ${allCards.length}枚が target_max=${targetMax} を超えています`);
    if (allCards.length > hardMax) errors.push(`canonical card ${allCards.length}枚が hard_max=${hardMax} を超えています`);
  }
} else if (selectionMode === "legacy_ranked") {
  warnings.push("legacy_ranked は移行互換用です。通常運用では canonical_only を使用してください");
  if (activeCards.length > hardMax) errors.push(`有効カード${activeCards.length}枚が hard_max=${hardMax} を超えています`);
} else {
  errors.push(`未知の selection_mode=${selectionMode}`);
}

if (policy.preserve_subcategory_coverage !== false) {
  for (const category of syllabus.categories || []) {
    if (!activeCards.some((card) => card.category === category.id)) errors.push(`有効カードに category ${category.id} がありません`);
    for (const subcategory of category.children || []) {
      if (!activeCards.some((card) => card.subcategory === subcategory)) errors.push(`有効カードに subcategory ${subcategory} がありません`);
    }
  }
}

if (policy.preserve_official_term_coverage !== false) {
  for (const item of coverage.items || []) {
    for (const term of item.terms || []) {
      if (term.status !== "card") continue;
      const mapped = (term.cards || []).filter((id) => activeIds.has(id));
      if (!mapped.length) errors.push(`公式用語 ${item.id}/${term.name} にcanonical cardがありません`);
    }
  }
}

const countByPriority = (cards) => Object.fromEntries(
  ["S", "A", "B", "C", "D"].map((priority) => [priority, cards.filter((card) => card.priority === priority).length]),
);

const categoryTargets = policy.category_targets || {};
const byCategory = Object.fromEntries((syllabus.categories || []).map((category) => {
  const count = activeCards.filter((card) => card.category === category.id).length;
  const target = Number(categoryTargets[category.id] ?? 0) || null;
  return [
    category.id,
    {
      source: allCards.filter((card) => card.category === category.id).length,
      canonical: count,
      target,
      delta_from_target: target == null ? null : count - target,
    },
  ];
}));

const summary = {
  selection_mode: selectionMode,
  audit_mode: auditMode,
  source_cards: allCards.length,
  canonical_cards: activeCards.length,
  target_range: [targetMin, targetMax],
  hard_max_cards: hardMax,
  reduction_needed_to_target_max: Math.max(0, activeCards.length - targetMax),
  room_to_target_min: Math.max(0, targetMin - activeCards.length),
  priority_counts: countByPriority(activeCards),
  category_counts: byCategory,
  warnings,
  errors,
};
console.log(YAML.stringify(summary));

if (warnings.length) console.warn(warnings.map((message) => `WARN: ${message}`).join("\n"));

if (errors.length) {
  console.error(errors.map((message) => `ERROR: ${message}`).join("\n"));
  process.exitCode = 1;
} else if (checkOnly) {
  console.log(auditMode
    ? "Anki curation audit check: success (audit mode)"
    : "Anki canonical curation check: success");
}
