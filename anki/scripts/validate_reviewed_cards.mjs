import { loadCurationPolicy } from "./lib.mjs";

const policy = loadCurationPolicy();

// During the reduction audit, progress.reviewed_card_count remains the count of
// the historically reviewed corpus. Validate both canonical cards and archived
// cards so moving a card out of cards/ does not make mathematical validation
// fail merely because the canonical deck became smaller.
//
// The normal build and curation checks still use only cards/**/*.md.
if (policy.audit_mode === true) process.env.ANKI_CARD_MODE = "reviewed";

await import("./validate_cards.mjs");
