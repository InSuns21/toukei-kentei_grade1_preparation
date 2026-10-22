import assert from "node:assert/strict";
import { evaluateFamily, checkDerivatives } from "./ml2-03-model.mjs";
const near = (x, y, tol = 1e-8) => assert.ok(Math.abs(x - y) <= tol, `${x} != ${y}`);
const b = evaluateFamily("bernoulli", Math.log(3));
near(b.a, Math.log(4)); near(b.mean, 3 / 4); near(b.covariance, 3 / 16);
const g = evaluateFamily("gaussian", 0.5, 2);
near(g.a, 0.25); near(g.mean, 1); near(g.covariance, 2);
for (const f of ["bernoulli", "gaussian"]) {
  for (const eta of [-5, -1, 0, 0.5, 2, 5]) {
    const q = checkDerivatives(f, eta, 2);
    assert.ok(q.meanError < 1e-6, `${f} first derivative ${eta}`);
    assert.ok(q.varianceError < 1e-6, `${f} second derivative ${eta}`);
    assert.ok(q.covariance >= 0);
  }
}
assert.throws(() => evaluateFamily("gaussian", 0, 0), RangeError);
assert.throws(() => evaluateFamily("other", 0), RangeError);
assert.throws(() => checkDerivatives("bernoulli", 1, 2, 0), RangeError);
console.log("ML2-03: exact moments, central differences, and invalid parameters passed");
