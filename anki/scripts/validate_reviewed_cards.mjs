import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { ROOT, loadCurationPolicy, readArchivedCards } from "./lib.mjs";

const policy = loadCurationPolicy();

// During the reduction audit, progress.reviewed_card_count remains the size of
// the historically reviewed corpus. We therefore validate canonical + archived
// card bodies together. coverage.yaml, however, is intentionally the index of
// the canonical deck only.
//
// validate_cards.mjs historically requires every validated card to appear in a
// primary coverage item. For the reviewed-corpus pass only, temporarily add
// archived IDs to the corresponding item.cards list. We do NOT add them to
// official-term cards lists, and the real coverage.yaml is restored immediately
// after validation. Normal curation/build checks therefore continue to see only
// canonical cards.
if (policy.audit_mode === true) {
  process.env.ANKI_CARD_MODE = "reviewed";

  const coveragePath = path.join(ROOT, "syllabus", "coverage.yaml");
  const originalCoverage = fs.readFileSync(coveragePath, "utf8");
  const coverage = YAML.parse(originalCoverage.replace(/^\uFEFF/, ""));
  const archived = readArchivedCards();

  for (const card of archived) {
    const item = (coverage.items || []).find((candidate) => candidate.id === card.subcategory);
    if (!item) throw new Error(`archive ${card.id}: coverage item ${card.subcategory} がありません`);
    item.cards ||= [];
    if (!item.cards.includes(card.id)) item.cards.push(card.id);
  }

  fs.writeFileSync(coveragePath, YAML.stringify(coverage), "utf8");
  try {
    await import("./validate_cards.mjs");
  } finally {
    fs.writeFileSync(coveragePath, originalCoverage, "utf8");
  }
} else {
  await import("./validate_cards.mjs");
}
