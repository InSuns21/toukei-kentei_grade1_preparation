import assert from "node:assert/strict";
import { defaultCpt, evaluateNetwork } from "./ml2-04-model.mjs";

const near = (x, y, tolerance = 1e-12) => assert.ok(Math.abs(x - y) < tolerance, `${x} != ${y}`);
const q = evaluateNetwork();
near(q.total, 1);
near(q.evidenceBrute, 101 / 250);
near(q.evidenceSumProduct, 101 / 250);
near(q.posteriorBrute, 111 / 202);
near(q.posteriorSumProduct, 111 / 202);
near(q.messageB[0], 13 / 50);
near(q.messageB[1], 37 / 50);
near(q.rows.find(r => r.a === 1 && r.b === 1 && r.c === 1).p, 216 / 1000);

for (const evidence of ["none", "one", "zero"]) {
  for (let seed = 0; seed < 20; seed++) {
    const cpt = Object.fromEntries(Object.keys(defaultCpt).map((k, i) => [k, (seed * 13 + i * 7 + 3) % 21 / 20]));
    const result = evaluateNetwork(cpt, evidence);
    near(result.total, 1);
    near(result.evidenceBrute, result.evidenceSumProduct);
    if (result.possible) {
      near(result.posteriorBrute, result.posteriorSumProduct);
      assert.ok(result.posteriorBrute >= 0 && result.posteriorBrute <= 1);
    }
  }
}
const impossible = evaluateNetwork({ pA: 0.3, pB0: 0, pB1: 0, pC0: 0, pC1: 0 }, "one");
near(impossible.total, 1);
assert.equal(impossible.possible, false);
assert.equal(impossible.posteriorBrute, null);
assert.equal(impossible.posteriorSumProduct, null);
near(evaluateNetwork(defaultCpt, "none").posteriorSumProduct, 0.3);
for (const bad of [-0.01, 1.01, NaN, Infinity, "0.4"]) {
  assert.throws(() => evaluateNetwork({ ...defaultCpt, pC0: bad }), RangeError);
}
assert.throws(() => evaluateNetwork(defaultCpt, "unknown"), RangeError);
console.log("ML2-04: normalization, finite enumeration, sum-product, zero evidence, boundary CPT passed");
