// ML1-01 acceptance model: four cells (x,y)=(0,0),(0,1),(1,0),(1,1).
// The fixed classifier h(x)=x has population 0-1 risk P(X != Y).
// Independent draws have no physical time, epoch, or fictitious step index.
export const engineId = "ml-four-cell-js-v1";
export const experimentId = "ml1-01-four-cell-sampling-v1";
export const DEFAULT_PROBABILITIES = Object.freeze([0.4, 0.1, 0.1, 0.4]);
export const rngAlgorithm = "xorshift32-zero-remapped-v1";

export function validateParameters(params) {
  const errors = [];
  const p = params?.probabilities;
  if (!Array.isArray(p) || p.length !== 4 ||
      !p.every((value) => typeof value === "number" && Number.isFinite(value) && value >= 0)) {
    errors.push("probabilities must contain four finite nonnegative numbers");
  } else if (Math.abs(p.reduce((s, value) => s + value, 0) - 1) > 1e-12) {
    errors.push("probabilities must sum to one");
  }
  if (!Number.isSafeInteger(params?.sampleCount) ||
      params.sampleCount < 1 || params.sampleCount > 100000) {
    errors.push("sampleCount must be an integer in 1..100000");
  }
  return errors;
}

export function computeOnce(params, seed) {
  const errors = validateParameters(params);
  if (!Number.isSafeInteger(seed) || seed < 0 || seed > 0xffffffff) {
    errors.push("seed must be unsigned 32-bit integer");
  }
  if (errors.length) throw new RangeError(errors.join("; "));
  const p = params.probabilities;
  let rngState = (seed >>> 0) || 0x6d2b79f5;
  function uniform() {
    rngState ^= rngState << 13;
    rngState ^= rngState >>> 17;
    rngState ^= rngState << 5;
    return (rngState >>> 0) / 4294967296;
  }
  const counts = [0, 0, 0, 0];
  for (let i = 0; i < params.sampleCount; i++) {
    const u = uniform();
    let cell = 3;
    let cdf = 0;
    for (let j = 0; j < 3; j++) {
      cdf += p[j];
      if (u < cdf) { cell = j; break; }
    }
    counts[cell] += 1;
  }
  const populationRisk = p[1] + p[2];
  const empiricalRisk = (counts[1] + counts[2]) / params.sampleCount;
  return {
    result: {
      counts, sampleCount: params.sampleCount,
      populationRisk, empiricalRisk,
      classifier: "h(x)=x", rngAlgorithm, seed,
      axis: { label: "independent draws", unit: "samples" },
    },
    diagnostics: { probabilitySum: p.reduce((s, v) => s + v, 0) },
  };
}
