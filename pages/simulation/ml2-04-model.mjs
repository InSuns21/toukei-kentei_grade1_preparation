// Exact finite enumeration and independent sum-product elimination for A -> B -> C.
export const defaultCpt = Object.freeze({ pA: 0.3, pB0: 0.2, pB1: 0.8, pC0: 0.1, pC1: 0.9 });

function checkCpt(cpt) {
  if (!cpt || typeof cpt !== "object") throw new TypeError("CPT required");
  for (const k of ["pA", "pB0", "pB1", "pC0", "pC1"]) {
    if (typeof cpt[k] !== "number" || !Number.isFinite(cpt[k]) || cpt[k] < 0 || cpt[k] > 1) {
      throw new RangeError(`${k} must be a probability in [0,1]`);
    }
  }
}

export function evaluateNetwork(cpt = defaultCpt, evidence = "one") {
  checkCpt(cpt);
  if (!["one", "zero", "none"].includes(evidence)) throw new RangeError("invalid evidence");
  const qa = a => a === 1 ? cpt.pA : 1 - cpt.pA;
  const qb = (b, a) => {
    const p = a === 1 ? cpt.pB1 : cpt.pB0;
    return b === 1 ? p : 1 - p;
  };
  const qc = (c, b) => {
    const p = b === 1 ? cpt.pC1 : cpt.pC0;
    return c === 1 ? p : 1 - p;
  };
  const rows = [];
  for (const a of [0, 1]) for (const b of [0, 1]) for (const c of [0, 1]) {
    rows.push({ a, b, c, p: qa(a) * qb(b, a) * qc(c, b) });
  }
  const total = rows.reduce((s, r) => s + r.p, 0);

  // Brute force: select matching cells of the full joint distribution.
  const matches = row => evidence === "none" || row.c === (evidence === "one" ? 1 : 0);
  const evidenceBrute = rows.filter(matches).reduce((s, r) => s + r.p, 0);
  const numeratorBrute = rows.filter(r => r.a === 1 && matches(r)).reduce((s, r) => s + r.p, 0);

  // Independent algorithm: no use of the joint table above.
  const messageC = [0, 1].map(b => evidence === "none" ? qc(0, b) + qc(1, b) : qc(evidence === "one" ? 1 : 0, b));
  const messageB = [0, 1].map(a => qb(0, a) * messageC[0] + qb(1, a) * messageC[1]);
  const weights = [qa(0) * messageB[0], qa(1) * messageB[1]];
  const evidenceSumProduct = weights[0] + weights[1];

  const posteriorBrute = evidenceBrute > 0 ? numeratorBrute / evidenceBrute : null;
  const posteriorSumProduct = evidenceSumProduct > 0 ? weights[1] / evidenceSumProduct : null;
  return {
    rows, total, messageC, messageB, weights, evidenceBrute, evidenceSumProduct,
    posteriorBrute, posteriorSumProduct, possible: evidenceBrute > 0 && evidenceSumProduct > 0,
  };
}
