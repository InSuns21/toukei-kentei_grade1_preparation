// ML1-01 four-cell risk model: real independent draws, no fictitious time.
export const engineId = "ml-four-cell-js-v1";
export const experimentId = "ml1-01-four-cell-sampling-v1";
export const DEFAULT_PROBABILITIES = Object.freeze([0.4, 0.1, 0.1, 0.4]);
export const rngAlgorithm = "xorshift32-zero-remapped-v1";
const predictors = Object.freeze({
  identity: { name: "h(x)=x", outputs: [0, 1] },
  flip: { name: "h(x)=1-x", outputs: [1, 0] },
  zero: { name: "h(x)=0", outputs: [0, 0] },
  one: { name: "h(x)=1", outputs: [1, 1] },
});

export function normalizeProbabilities(weights) {
  if (!Array.isArray(weights) || weights.length !== 4 ||
      !weights.every((p) => typeof p === "number" && Number.isFinite(p) && p >= 0)) {
    throw new RangeError("Four finite nonnegative weights are required");
  }
  const sum = weights.reduce((s, v) => s + v, 0);
  if (!(sum > 0) || !Number.isFinite(sum)) {
    throw new RangeError("At least one weight must be positive");
  }
  return weights.map((p) => p / sum);
}

export function validateParameters(params) {
  const errors = [];
  const p = params?.probabilities;
  if (!Array.isArray(p) || p.length !== 4 ||
      !p.every((value) => typeof value === "number" && Number.isFinite(value) && value >= 0)) {
    errors.push("probabilities must contain four finite nonnegative numbers");
  } else if (Math.abs(p.reduce((s, value) => s + value, 0) - 1) > 1e-12) {
    errors.push("probabilities must sum to one");
  }
  const n = params?.sampleCount;
  const repetitions = params?.repetitions ?? 1;
  if (!Number.isSafeInteger(n) || n < 1 || n > 100000) {
    errors.push("sampleCount must be an integer in 1..100000");
  }
  if (!Number.isSafeInteger(repetitions) || repetitions < 1 || repetitions > 200) {
    errors.push("repetitions must be an integer in 1..200");
  } else if (Number.isSafeInteger(n) && n * repetitions > 200000) {
    errors.push("sampleCount times repetitions must not exceed 200000");
  }
  if (!Object.hasOwn(predictors, params?.classifierId ?? "identity")) {
    errors.push("classifierId must be identity, flip, zero, or one");
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
  const n = params.sampleCount;
  const repetitions = params.repetitions ?? 1;
  const classifierId = params.classifierId ?? "identity";
  const classifier = predictors[classifierId];
  const mistakes = [classifier.outputs[0] !== 0, classifier.outputs[0] !== 1,
    classifier.outputs[1] !== 0, classifier.outputs[1] !== 1];
  const populationRisk = p.reduce((sum, cell, j) => sum + (mistakes[j] ? cell : 0), 0);
  let rngState = (seed >>> 0) || 0x6d2b79f5;
  function uniform() {
    rngState ^= rngState << 13;
    rngState ^= rngState >>> 17;
    rngState ^= rngState << 5;
    return (rngState >>> 0) / 4294967296;
  }
  const histogram = Array(11).fill(0);
  let firstCounts = null, firstRisk = null, sumRisk = 0, sumRisk2 = 0;
  const firstObservations = [];
  for (let repetition = 0; repetition < repetitions; repetition++) {
    const counts = [0, 0, 0, 0];
    for (let i = 0; i < n; i++) {
      const u = uniform();
      let cell = 3, cdf = 0;
      for (let j = 0; j < 3; j++) {
        cdf += p[j];
        if (u < cdf) { cell = j; break; }
      }
      counts[cell]++;
      if (repetition === 0 && i < 16) {
        firstObservations.push({ x: Math.floor(cell / 2), y: cell % 2,
          loss: mistakes[cell] ? 1 : 0 });
      }
    }
    const errorsInSample = counts.reduce((sum, count, j) =>
      sum + (mistakes[j] ? count : 0), 0);
    const risk = errorsInSample / n;
    if (!firstCounts) { firstCounts = counts; firstRisk = risk; }
    histogram[Math.min(10, Math.floor(11 * risk))]++;
    sumRisk += risk;
    sumRisk2 += risk * risk;
  }
  const meanEmpiricalRisk = sumRisk / repetitions;
  return {
    result: {
      counts: firstCounts, firstObservations, probabilities: [...p], sampleCount: n,
      repetitions, histogram, classifierId, classifier: classifier.name,
      populationRisk, empiricalRisk: firstRisk, meanEmpiricalRisk,
      // Finite empirical distribution of repeated risk values; divisor B.
      varianceAcrossRepetitions: Math.max(0, sumRisk2 / repetitions -
        meanEmpiricalRisk * meanEmpiricalRisk),
      theoreticalVariance: populationRisk * (1 - populationRisk) / n,
      rngAlgorithm, seed,
      axis: { label: "independent draws", unit: "samples" },
    },
    diagnostics: { probabilitySum: p.reduce((s, v) => s + v, 0) },
  };
}
