"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { quantileCoupling, gaussianW2Example, heatRing, modelContrast, runAll } = require("./experiments");

test("finite primal/dual certificate and Sinkhorn costs agree within separately stated errors", () => {
  const r = runAll();
  assert.equal(r.finiteLP.gap, 0);
  assert.equal(r.finiteLP.primalCost, 0);
  let previous = Infinity;
  for (const x of r.regularized) {
    assert.equal(x.converged, true);
    assert.ok(x.marginalResidual <= 1e-10);
    assert.ok(Math.abs(x.cost - x.closedFormCost) < 1e-10);
    assert.ok(x.cost >= 0 && x.cost <= x.errorBound);
    assert.ok(Math.abs(x.primalMinusDual) < 1e-10);
    assert.ok(x.cost < previous);
    previous = x.cost;
  }
});

test("quantile coupling has correct marginals and exactly W2^2=1", () => {
  const { plan, w2Squared } = quantileCoupling([0, 2], [0.25, 0.75], [1, 3], [0.5, 0.5]);
  assert.deepEqual(plan, [[0.25, 0], [0.25, 0.5]]);
  assert.equal(w2Squared, 1);
  const numerics = runAll().quantile.numericRegularized;
  assert.equal(numerics.converged, true);
  assert.ok(numerics.residual < 1e-10);
  assert.ok(numerics.cost >= 1 - 1e-9);
  assert.ok(numerics.cost - 1 <= numerics.biasBound + 1e-9);
  assert.ok(Math.abs(numerics.cost - 1) < 1e-5);
  assert.throws(() => quantileCoupling([2, 0], [0.5, 0.5], [1], [1]), RangeError);
});

test("noncommuting Gaussian covariances: optimal map cost equals matrix-root formula", () => {
  const r = gaussianW2Example();
  assert.ok(Math.abs(r.mapCost - r.w2Squared) < 1e-12);
  assert.ok(Math.abs(r.w2Squared - (17 - 2 * Math.sqrt(10 + 4 * Math.sqrt(3)))) < 1e-12);
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++)
    assert.ok(Math.abs(r.transformedCovariance[i][j] - r.targetCovariance[i][j]) < 1e-12);
});

test("periodic heat flux preserves mass, positivity, entropy and discrete eigenmode", () => {
  const r = heatRing();
  for (let k = 0; k < r.history.length; k++) {
    assert.ok(Math.abs(r.history[k].mass - 1) < 1e-12);
    assert.ok(r.history[k].minimum > 0);
    if (k) assert.ok(r.history[k].energy <= r.history[k - 1].energy + 1e-14);
  }
  assert.ok(Math.abs(r.amplitude - r.expectedAmplitude) < 1e-12);
  assert.ok(Math.abs(r.amplitude - r.continuumAmplitude) < 1e-4);
  assert.throws(() => heatRing({ ratio: 0.51 }), RangeError);
});

test("heat path and independent flow are not the optimal displacement path", () => {
  const r = modelContrast();
  assert.ok(Math.abs(r.heatVariance - r.otVariance) > 0.1);
  assert.equal(r.independentFlowVariance, 0.5);
  assert.equal(r.optimalSameLawVariance, 1);
});
