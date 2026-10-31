// The 2026 category/course bulk relocations are complete. Their historical
// proof scripts depend on a retired JSON manifest; no new PR may bypass
// changed-content audits on the strength of those one-time migrations.
// Preserve the call site API for compatibility with the existing validators.
export function verifiedMassRelocation() {
  return false;
}
