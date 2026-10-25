import assert from "node:assert/strict";
import { defaultConfig, makeDataset, initialParameters, expectation, stepEM } from "./ml2-06-model.mjs";
const near = (x, y, eps = 1e-9) => assert.ok(Math.abs(x - y) <= eps, String(x) + " != " + String(y));
const data = makeDataset();
assert.deepEqual(data, makeDataset(defaultConfig));
assert.notDeepEqual(data, makeDataset({ ...defaultConfig, seed: defaultConfig.seed + 1 }));
for (const components of [2, 3]) for (const separation of [0, 0.5, 2, 4]) {
  let p = initialParameters({ ...defaultConfig, components, separation });
  for (let step = 0; step < 30; step++) {
    const r = stepEM(data, p);
    for (const row of r.old.responsibilities) near(row.reduce((a, b) => a + b, 0), 1);
    near(r.old.counts.reduce((a, b) => a + b, 0), data.length);
    near(r.updated.weights.reduce((a, b) => a + b, 0), 1);
    assert.ok(r.qDifference >= -1e-8);
    assert.ok(r.klDifference >= -1e-8);
    assert.ok(r.likelihoodDifference >= -1e-8);
    near(r.likelihoodDifference, r.qDifference + r.klDifference);
    p = r.updated;
  }
}
const fixed = stepEM([-2, 2], { means: [0, 0], weights: [0.5, 0.5] });
near(fixed.updated.means[0], 0);
near(fixed.updated.means[1], 0);
near(fixed.likelihoodDifference, 0);
assert.ok(expectation([-2, 2], { means: [-0.1, 0.1], weights: [0.5, 0.5] }).logLikelihood > fixed.old.logLikelihood);
for (const c of [{ ...defaultConfig, seed: -1 }, { ...defaultConfig, components: 4 }, { ...defaultConfig, count: 0 }])
  assert.throws(() => makeDataset(c), RangeError);
console.log("ML2-06: deterministic sample, responsibility, Q/KL identity, monotonicity, fixed-point counterexample passed");
