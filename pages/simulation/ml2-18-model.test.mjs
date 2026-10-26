import assert from "node:assert/strict";
import { test } from "node:test";
import { defaultTokens, defaultHeads, attentionHead, attentionExperiment,
  permutationComparison, headGradient } from "./ml2-18-model.mjs";

function near(actual, expected, tolerance = 1e-10) {
  assert.ok(Math.abs(actual - expected) < tolerance, actual + " != " + expected);
}
test("masked softmax sums to 1 on permitted columns, with exact forbidden zeros", () => {
  for (const mode of ["all", "causal", "padding"]) {
    const run = attentionExperiment({ mask: mode });
    for (const result of run.results) {
      result.weights.forEach((row, i) => {
        near(row.reduce((a, b) => a + b, 0), 1);
        row.forEach((a, j) => {
          if (mode === "causal" && j > i || mode === "padding" && j === 2) assert.equal(a, 0);
        });
      });
    }
  }
});
test("permutation equivariance holds without position or anchored mask", () => {
  near(permutationComparison().maxDifference, 0);
  assert.ok(permutationComparison({ positionStrength: 2 }).maxDifference > 0.01);
  assert.ok(permutationComparison({ mask: "causal" }).maxDifference > 0.01);
});
test("two-token worked example and numerical stabilization", () => {
  const rows = [[0, 0], [1, 0], [0, 0]];
  const head = { q: [1, 0], k: [1, 0], v: [1, 0] };
  const result = attentionHead(rows, head);
  near(result.weights[0][0], 1 / 3);
  near(result.weights[1][1], Math.E / (Math.E + 2));
  const extreme = attentionHead([[100, 0], [-100, 0], [0, 0]], head);
  extreme.weights.flat().forEach(w => assert.ok(Number.isFinite(w) && w >= 0 && w <= 1));
});
test("head gradients match independent central finite differences", () => {
  const rows = defaultTokens, head = defaultHeads[0], upstream = [1, -2, 0.7], h = 1e-5;
  const analytic = headGradient(rows, head, upstream);
  function objective(p) {
    const r = attentionHead(rows, p);
    return r.output.reduce((s, y, i) => s + upstream[i] * y, 0);
  }
  for (const [key, gradient] of [["q", analytic.dq], ["k", analytic.dk], ["v", analytic.dv]]) {
    for (let c = 0; c < 2; c++) {
      const positive = structuredClone(head), negative = structuredClone(head);
      positive[key][c] += h; negative[key][c] -= h;
      near((objective(positive) - objective(negative)) / (2 * h), gradient[c], 1e-8);
    }
  }
});
test("invalid shapes and non-finite inputs fail safely", () => {
  assert.throws(() => attentionExperiment({ tokens: [[1, 2]] }), RangeError);
  assert.throws(() => attentionExperiment({ mask: "invalid" }), RangeError);
  assert.throws(() => attentionExperiment({ positionStrength: Infinity }), RangeError);
  assert.throws(() => attentionExperiment({ tokens: [[1, NaN], [0, 1], [1, 1]] }), RangeError);
});
