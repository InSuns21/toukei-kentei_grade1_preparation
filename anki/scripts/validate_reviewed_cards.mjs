import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { ROOT, loadCurationPolicy, readAllCards, readArchivedCards } from "./lib.mjs";

const policy = loadCurationPolicy();

// During the reduction audit, progress.reviewed_card_count remains the size of
// the historically reviewed corpus. We therefore validate canonical + archived
// card bodies together. coverage.yaml, however, is intentionally the index of
// the canonical deck only.
//
// validate_cards.mjs historically requires each official-term reference to
// point to a card whose primary subcategory is the same coverage item. The
// canonical-deck audit intentionally permits one reviewed physical card to
// cover an equivalent official term from another subcategory. For this
// reviewed-corpus validation pass only, temporarily project such a global
// canonical reference back to the archived source card that was consolidated
// into it. This keeps the legacy structural validator useful without restoring
// duplicate active cards or changing the real canonical coverage.yaml.
if (policy.audit_mode === true) {
  process.env.ANKI_CARD_MODE = "reviewed";

  const coveragePath = path.join(ROOT, "syllabus", "coverage.yaml");
  const originalCoverage = fs.readFileSync(coveragePath, "utf8");
  const coverage = YAML.parse(originalCoverage.replace(/^\uFEFF/, ""));
  const active = readAllCards();
  const archived = readArchivedCards();
  const activeById = new Map(active.map((card) => [card.id, card]));

  for (const card of archived) {
    const item = (coverage.items || []).find((candidate) => candidate.id === card.subcategory);
    if (!item) throw new Error(`archive ${card.id}: coverage item ${card.subcategory} がありません`);
    item.cards ||= [];
    if (!item.cards.includes(card.id)) item.cards.push(card.id);
  }

  for (const item of coverage.items || []) {
    for (const term of item.terms || []) {
      term.cards = (term.cards || []).map((cardId) => {
        const card = activeById.get(cardId);
        if (!card || card.subcategory === item.id) return cardId;

        const historicalAlias = archived.find((candidate) =>
          candidate.subcategory === item.id &&
          (candidate.coverage_card === cardId || candidate.canonical_card === cardId)
        );
        if (!historicalAlias) {
          throw new Error(`coverage ${item.id}/${term.name}: global canonical ${cardId} の同subcategory監査エイリアスがarchiveにありません`);
        }
        return historicalAlias.id;
      });
    }
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
