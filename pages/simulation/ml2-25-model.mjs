// ML2-25: reproducible finite-category evaluation; sampler-only has no probability query.
export const defaultConfig = Object.freeze({
  mode: "explicit", modelSeed: 2525, evaluationSeed: 5252,
  trainCount: 300, evaluationCount: 400, generatedCount: 400, shift: 0,
});
export const trainingDistribution = Object.freeze([0.5, 0.3, 0.2]);
export const shiftedDistribution = Object.freeze([0.2, 0.3, 0.5]);
export const categories = Object.freeze(["a", "b", "c"]);

function checkInteger(value, name, low, high) {
  if (!Number.isSafeInteger(value) || value < low || value > high) {
    throw new RangeError(name + "は" + low + "〜" + high + "の整数で指定してください");
  }
}
export function validateConfig(config) {
  if (!config || !["explicit", "sampleOnly"].includes(config.mode)) {
    throw new RangeError("生成方式が不正です");
  }
  checkInteger(config.modelSeed, "modelSeed", 0, 4294967295);
  checkInteger(config.evaluationSeed, "evaluationSeed", 0, 4294967295);
  checkInteger(config.trainCount, "trainCount", 20, 5000);
  checkInteger(config.evaluationCount, "evaluationCount", 20, 5000);
  checkInteger(config.generatedCount, "generatedCount", 20, 5000);
  if (!Number.isFinite(config.shift) || config.shift < 0 || config.shift > 1) {
    throw new RangeError("shiftは0〜1で指定してください");
  }
  return config;
}
function rng32(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6D2B79F5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function sampleIndex(probabilities, random) {
  const u = random();
  let accum = 0;
  for (let i = 0; i < probabilities.length - 1; i++) {
    accum += probabilities[i];
    if (u < accum) return i;
  }
  return probabilities.length - 1;
}
function drawCounts(probabilities, count, seed) {
  const random = rng32(seed);
  const counts = Array(probabilities.length).fill(0);
  for (let j = 0; j < count; j++) counts[sampleIndex(probabilities, random)]++;
  return counts;
}
export function frequencies(counts) {
  const n = counts.reduce((a, b) => a + b, 0);
  if (!(n > 0)) throw new RangeError("標本が空です");
  return counts.map(value => value / n);
}
export function totalVariation(p, q) {
  if (p.length !== q.length) throw new RangeError("カテゴリ数の不一致");
  return p.reduce((sum, value, i) => sum + Math.abs(value - q[i]), 0) / 2;
}
export function entropy(p) {
  return -p.reduce((sum, value) => sum + (value > 0 ? value * Math.log(value) : 0), 0);
}
export function logLossFromCounts(q, counts) {
  const n = counts.reduce((a, b) => a + b, 0);
  if (!n) throw new RangeError("標本が空です");
  let sum = 0;
  for (let i = 0; i < q.length; i++) {
    if (counts[i] > 0 && q[i] <= 0) return Infinity;
    if (counts[i] > 0) sum -= counts[i] * Math.log(q[i]);
  }
  return sum / n;
}
export function brierFromCounts(q, counts) {
  const p = frequencies(counts);
  return q.reduce((sum, value, i) => sum + value * value - 2 * value * p[i] + p[i], 0);
}
function makeGenerator(mode, learnedProbabilities) {
  if (mode === "explicit") {
    return {
      sample: random => sampleIndex(learnedProbabilities, random),
      probability: index => learnedProbabilities[index],
    };
  }
  // For this toy the author knows the weights, but the sampler API hides them.
  const weights = learnedProbabilities.map(value => value ** 3);
  const total = weights.reduce((a, b) => a + b, 0);
  const samplingProbabilities = weights.map(value => value / total);
  return { sample: random => sampleIndex(samplingProbabilities, random) };
}
export function runExperiment(input = defaultConfig) {
  const config = validateConfig({ ...defaultConfig, ...input });
  const trainCounts = drawCounts(trainingDistribution, config.trainCount, config.modelSeed ^ 0x6d12a7f1);
  const learnedProbabilities = trainCounts.map(n => (n + 1) / (config.trainCount + 3));
  const evaluationDistribution = trainingDistribution.map((p, i) =>
    (1 - config.shift) * p + config.shift * shiftedDistribution[i]);
  const evaluationCounts = drawCounts(
    evaluationDistribution, config.evaluationCount, config.evaluationSeed ^ 0x481f2323);
  const generator = makeGenerator(config.mode, learnedProbabilities);
  const random = rng32(config.modelSeed ^ 0xa4d62b19);
  const generatedCounts = Array(categories.length).fill(0);
  for (let i = 0; i < config.generatedCount; i++) generatedCounts[generator.sample(random)]++;
  const evaluationFrequencies = frequencies(evaluationCounts);
  const generatedFrequencies = frequencies(generatedCounts);
  const hasProbability = typeof generator.probability === "function";
  const reportedProbability = hasProbability
    ? categories.map((_, i) => generator.probability(i)) : null;
  return {
    config: { ...config }, trainCounts, learnedProbabilities, reportedProbability, evaluationDistribution,
    evaluationCounts, generatedCounts, evaluationFrequencies, generatedFrequencies,
    metrics: {
      empiricalTv: totalVariation(evaluationFrequencies, generatedFrequencies),
      referenceTv: totalVariation(evaluationDistribution, generatedFrequencies),
      entropy: entropy(generatedFrequencies),
      coveredCategories: generatedCounts.filter(n => n > 0).length,
      logLoss: hasProbability ? logLossFromCounts(reportedProbability, evaluationCounts) : null,
      brier: hasProbability ? brierFromCounts(reportedProbability, evaluationCounts) : null,
      maxCategoryGap: hasProbability
        ? Math.max(...reportedProbability.map((q, i) => Math.abs(q - evaluationFrequencies[i])))
        : null,
    },
    operationCount: config.trainCount + config.evaluationCount + config.generatedCount,
  };
}
