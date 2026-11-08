"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { sinkhorn, logSumExp } = require("./sinkhorn");

test("symmetric two-by-two matches the exact regularized solution", () => {
  const result = sinkhorn([0.5, 0.5], [0.5, 0.5], [[0, 1], [1, 0]], 1);
  const diagonal = 0.5 / (1 + Math.exp(-1));
  assert.equal(result.converged, true);
  assert.ok(result.residual < 1e-10);
  assert.ok(Math.abs(result.plan[0][0] - diagonal) < 1e-12);
  assert.ok(Math.abs(result.plan[0][1] - (0.5 - diagonal)) < 1e-12);
  assert.ok(Math.abs(result.primalMinusDual) < 1e-10);
});

test("asymmetric marginals and unequal costs preserve row and column mass", () => {
  const a = [0.2, 0.5, 0.3];
  const b = [0.6, 0.4];
  const result = sinkhorn(a, b, [[0, 2], [1, 0], [3, 1]], 0.3);
  assert.equal(result.converged, true);
  for (let i = 0; i < a.length; i++) {
    assert.ok(Math.abs(result.plan[i].reduce((s, x) => s + x, 0) - a[i]) < 1e-10);
  }
  for (let j = 0; j < b.length; j++) {
    assert.ok(Math.abs(result.plan.reduce((s, row) => s + row[j], 0) - b[j]) < 1e-10);
  }
});

test("log domain survives a huge cost-to-epsilon ratio", () => {
  const result = sinkhorn([0.5, 0.5], [0.5, 0.5], [[0, 1e6], [1e6, 0]], 1e-3);
  assert.equal(result.converged, true);
  assert.ok(result.residual < 1e-10);
  assert.ok(result.plan[0][0] > 0.499999999);
  assert.ok(result.plan[0][1] >= 0);
  assert.ok(Number.isFinite(logSumExp([-1e6, -1e6 - 100])));
});

test("rejects zero marginals and invalid settings instead of silently dividing by zero", () => {
  assert.throws(() => sinkhorn([1, 0], [0.5, 0.5], [[0, 1], [1, 0]], 1), RangeError);
  assert.throws(() => sinkhorn([1], [1], [[0]], 0), RangeError);
});
