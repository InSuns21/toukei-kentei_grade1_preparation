import test from "node:test";
import assert from "node:assert/strict";
import {
  relu, targetValue, interpolationNetwork, evaluateInterpolation,
  tent, tentIterate, foldNetwork
} from "./ml2-13-model.mjs";

const near = (actual, expected, eps = 1e-11) =>
  assert.ok(Math.abs(actual - expected) < eps, String(actual) + " != " + String(expected));

test("ReLU threshold and explicit tent model", () => {
  near(relu(-3), 0);
  near(relu(1.25), 1.25);
  near(tent(0), 0);
  near(tent(0.25), 0.5);
  near(tent(0.5), 1);
  near(tent(0.75), 0.5);
  near(tent(1), 0);
});

test("hinge coefficients reproduce each training knot exactly", () => {
  for (const kind of ["quadratic", "absolute", "tent", "double-tent"]) {
    for (const segments of [1, 2, 3, 7, 16, 64]) {
      const model = interpolationNetwork(kind, segments);
      for (let i = 0; i <= segments; i++) {
        near(model.predict(model.knots[i]), model.values[i], 1e-9);
      }
      near(model.outputWeights[0], model.slopes[0]);
      for (let i = 1; i < segments; i++) {
        near(model.outputWeights[i], model.slopes[i] - model.slopes[i - 1]);
      }
    }
  }
});

test("quadratic interpolation maximum equals h squared / 4", () => {
  for (const segments of [1, 2, 4, 5, 10, 20]) {
    const model = evaluateInterpolation("quadratic", segments, 2001);
    near(model.trainMse, 0);
    near(model.quadraticExactMaximum, 1 / (4 * segments ** 2));
    for (let i = 0; i < segments; i++) {
      const middle = (i + 0.5) / segments;
      near(model.predict(middle) - targetValue("quadratic", middle), 1 / (4 * segments ** 2));
    }
    assert.ok(model.sampledMaximumError <= model.quadraticExactMaximum + 1e-9);
    assert.ok(model.evaluationMse > 0);
  }
});

test("a kink exactly on the interpolation knot removes tent interpolation error", () => {
  const coarse = evaluateInterpolation("tent", 1);
  const fine = evaluateInterpolation("tent", 2);
  assert.ok(coarse.sampledMaximumError > 0.9);
  near(fine.sampledMaximumError, 0);
  near(fine.evaluationMse, 0);
});

test("tent composition doubles pieces at constant width", () => {
  for (let depth = 1; depth <= 8; depth++) {
    const model = foldNetwork(depth, 1025);
    assert.equal(model.pieces, 2 ** depth);
    assert.equal(model.breakpoints.length, 2 ** depth - 1);
    near(tentIterate(0, depth), 0);
    near(tentIterate(1, depth), 0);
    for (let k = 0; k < model.pieces; k++) {
      const x = (k + 0.5) / model.pieces;
      near(tentIterate(x, depth), 0.5, 1e-8);
      near(tentIterate(k / model.pieces, depth), k % 2 === 0 ? 0 : 1, 1e-8);
    }
  }
});

test("invalid dimensions, targets and non-finite inputs are rejected", () => {
  for (const segments of [0, 1.5, 65]) {
    assert.throws(() => interpolationNetwork("quadratic", segments), RangeError);
  }
  assert.throws(() => targetValue("no-such-target", 0.5), RangeError);
  assert.throws(() => interpolationNetwork("quadratic", 3).predict(NaN), RangeError);
  assert.throws(() => tentIterate(0.4, 0), RangeError);
  assert.throws(() => foldNetwork(9), RangeError);
  assert.throws(() => evaluateInterpolation("quadratic", 4, 1), RangeError);
});
