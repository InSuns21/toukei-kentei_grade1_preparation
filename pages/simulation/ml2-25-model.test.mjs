import assert from "node:assert/strict";
import {
  defaultConfig, runExperiment, totalVariation, entropy,
  logLossFromCounts, brierFromCounts, trainingDistribution,
} from "./ml2-25-model.mjs";

const a = runExperiment(defaultConfig);
const b = runExperiment({ ...defaultConfig });
assert.deepEqual(a, b, "固定seedと設定で完全再現");
assert.equal(a.trainCounts.reduce((x, y) => x + y), defaultConfig.trainCount);
assert.equal(a.evaluationCounts.reduce((x, y) => x + y), defaultConfig.evaluationCount);
assert.equal(a.generatedCounts.reduce((x, y) => x + y), defaultConfig.generatedCount);
assert.ok(Math.abs(a.learnedProbabilities.reduce((x, y) => x + y) - 1) < 1e-12);
assert.equal(a.reportedProbability?.length, 3);
assert.equal(a.operationCount, 1100);

const shifted = runExperiment({ ...defaultConfig, shift: 1 });
assert.deepEqual(shifted.trainCounts, a.trainCounts, "評価shiftは訓練標本を変えない");
assert.deepEqual(shifted.generatedCounts, a.generatedCounts, "評価shiftは生成標本を変えない");
assert.deepEqual(shifted.evaluationDistribution, [0.2, 0.3, 0.5]);
assert.notDeepEqual(shifted.evaluationCounts, a.evaluationCounts);

const newEvaluationSeed = runExperiment({ ...defaultConfig, evaluationSeed: 123 });
assert.deepEqual(newEvaluationSeed.trainCounts, a.trainCounts);
assert.deepEqual(newEvaluationSeed.generatedCounts, a.generatedCounts);
assert.notDeepEqual(newEvaluationSeed.evaluationCounts, a.evaluationCounts);
const newModelSeed = runExperiment({ ...defaultConfig, modelSeed: 9012 });
assert.deepEqual(newModelSeed.evaluationCounts, a.evaluationCounts);
assert.notDeepEqual(newModelSeed.trainCounts, a.trainCounts);

const sampleOnly = runExperiment({ ...defaultConfig, mode: "sampleOnly" });
assert.deepEqual(sampleOnly.trainCounts, a.trainCounts);
assert.deepEqual(sampleOnly.evaluationCounts, a.evaluationCounts);
assert.equal(sampleOnly.reportedProbability, null, "標本専用APIは確率を返さない");
assert.equal(sampleOnly.metrics.logLoss, null);
assert.equal(sampleOnly.metrics.brier, null);
assert.equal(sampleOnly.metrics.maxCategoryGap, null);
assert.notDeepEqual(sampleOnly.generatedCounts, a.generatedCounts);

assert.ok(Math.abs(totalVariation([0.5, 0.3, 0.2], [0.8, 0.2, 0]) - 0.3) < 1e-12);
assert.ok(Math.abs(entropy([0.5, 0.5, 0]) - Math.log(2)) < 1e-12);
assert.ok(Math.abs(logLossFromCounts([0.75, 0.25], [1, 1])
  - Math.log(16 / 3) / 2) < 1e-12);
assert.ok(Math.abs(brierFromCounts([0.6, 0.4], [7, 3]) - 0.44) < 1e-12);
assert.equal(logLossFromCounts([1, 0], [1, 1]), Infinity);
assert.throws(() => runExperiment({ modelSeed: -1 }), RangeError);
assert.throws(() => runExperiment({ shift: 1.01 }), RangeError);
assert.throws(() => runExperiment({ trainCount: 0 }), RangeError);
assert.throws(() => runExperiment({ mode: "unknown" }), RangeError);

for (const result of [a, shifted, sampleOnly]) {
  for (const vector of [
    trainingDistribution, result.learnedProbabilities, result.evaluationDistribution,
    result.evaluationFrequencies, result.generatedFrequencies,
  ]) {
    assert.ok(Math.abs(vector.reduce((x, y) => x + y, 0) - 1) < 1e-12);
  }
  assert.ok(result.metrics.empiricalTv >= 0 && result.metrics.empiricalTv <= 1);
  assert.ok(result.metrics.referenceTv >= 0 && result.metrics.referenceTv <= 1);
  assert.ok(result.metrics.coveredCategories >= 1 && result.metrics.coveredCategories <= 3);
}
console.log("ML2-25 finite generation/evaluation model: all numerical checks passed");
