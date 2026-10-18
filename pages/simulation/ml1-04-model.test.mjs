import assert from "node:assert/strict";
import { buildDesign, fitLeastSquares, SCENARIOS } from "./ml1-04-model.mjs";

const close = (actual, expected, eps = 1e-8) => {
  assert.ok(Number.isFinite(actual) && Math.abs(actual - expected) <= eps,
    "expected " + expected + ", got " + actual);
};
function scenario(id) {
  const p = SCENARIOS[id];
  return fitLeastSquares(buildDesign(p.x, p.mode), p.y);
}

const straight = scenario("straight");
assert.equal(straight.rank, 2);
close(straight.beta[0], 0); close(straight.beta[1], 1);
close(straight.loss, 0);
straight.orthogonality.forEach(v => close(v, 0));

const outlier = scenario("outlier");
assert.equal(outlier.rank, 2);
close(outlier.beta[0], 1); close(outlier.beta[1], 2.5);
close(outlier.loss, 0.25);
outlier.orthogonality.forEach(v => close(v, 0));

const duplicate = scenario("duplicate");
assert.equal(duplicate.rank, 1);
close(duplicate.beta[0], 19/28);
close(duplicate.beta[1], 19/28);
close(duplicate.loss, 1/28);
duplicate.orthogonality.forEach(v => close(v, 0));

const zero = scenario("zero");
assert.equal(zero.rank, 0);
close(zero.beta[0], 0); close(zero.beta[1], 0);
close(zero.loss, 7/3);
zero.orthogonality.forEach(v => close(v, 0));

// Intercept column at constant x: rank one but the minimum-norm solution is unique.
const constant = fitLeastSquares(buildDesign([2,2,2], "intercept"), [1,2,3]);
assert.equal(constant.rank, 1);
close(constant.beta[0], 2/5);
close(constant.beta[1], 4/5);
constant.fitted.forEach(v => close(v, 2));

// Numeric domain and mode are checked before computation.
assert.throws(() => fitLeastSquares([], []), RangeError);
assert.throws(() => fitLeastSquares([[1, NaN]], [1]), RangeError);
assert.throws(() => buildDesign([0,1], "unknown"), RangeError);
console.log("ML1-04 model: 5 analytic rank/fit scenarios and invalid inputs OK");
