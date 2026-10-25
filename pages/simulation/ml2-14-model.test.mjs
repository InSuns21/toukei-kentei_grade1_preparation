import test from "node:test";
import assert from "node:assert/strict";
import {
  defaultInputs, defaultParameters, forward, reverseGradient, gradientCheck, parameterNames
} from "./ml2-14-model.mjs";

const near = (actual, expected, tolerance = 1e-9) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, String(actual) + " != " + String(expected));

test("two active units reproduce hand-calculated forward and reverse passes", () => {
  const p = defaultParameters;
  const g = reverseGradient(p, defaultInputs.x, defaultInputs.target);
  near(g.z[0], 1.2);
  near(g.z[1], 0.2);
  near(g.y, 2.3);
  near(g.loss, 0.5);
  assert.deepEqual(g.derivative, [1, 1]);
  near(g.gradient.w11, 2);
  near(g.gradient.w12, -1);
  near(g.gradient.b11, 2);
  near(g.gradient.b12, -1);
  near(g.gradient.v1, 1.2);
  near(g.gradient.v2, 0.2);
  near(g.gradient.b2, 1);
  near(g.inputGradient, 2.5);
  assert.equal(g.kink, false);
});

test("centered finite differences agree on the smooth active region", () => {
  const r = gradientCheck(defaultParameters, 1, 1.3, 1e-4);
  assert.deepEqual(r.rows.map(item => item.name), parameterNames);
  assert.ok(r.maxAbsoluteDifference < 1e-7, String(r.maxAbsoluteDifference));
  assert.ok(r.rows.every(row => !row.crossedKink));
});

test("99 smooth parameter configurations agree while one kink is excluded", () => {
  let checked = 0;
  let kinkCases = 0;
  for (let j = 0; j < 100; j++) {
    const parameters = {
      ...defaultParameters,
      w11: 1 + j / 100, w12: -0.5 - j / 200, v1: 2 + j / 200
    };
    const result = gradientCheck(parameters, 1, 1.3, 1e-5);
    if (result.kink || result.rows.some(row => row.crossedKink)) {
      kinkCases++;
      continue;
    }
    assert.ok(result.maxAbsoluteDifference < 1e-7,
      String(result.maxAbsoluteDifference));
    checked++;
  }
  assert.equal(checked, 99);
  assert.equal(kinkCases, 1);
});

test("inactive ReLU unit has zero hidden gradient", () => {
  const p = { ...defaultParameters, b12: -1 };
  const r = reverseGradient(p, 1, 1.3);
  near(r.z[1], -1.5);
  near(r.gradient.w12, 0);
  near(r.gradient.b12, 0);
  near(r.gradient.v2, 0);
});

test("at a kink an implementation derivative and central difference can disagree", () => {
  const p = { ...defaultParameters, b11: -1, b12: -1 };
  const result = gradientCheck(p, 1, 1.3, 1e-4);
  assert.equal(result.kink, true);
  near(result.gradient.b11, 0);
  const row = result.rows.find(item => item.name === "b11");
  assert.equal(row.crossedKink, true);
  assert.ok(row.absoluteDifference > 0.1);
});

test("finite-value and step-size validation", () => {
  assert.throws(() => forward(defaultParameters, Infinity, 1), RangeError);
  assert.throws(() => forward({ ...defaultParameters, w11: 1e308 }, 1e308, 1),
    /overflow/);
  assert.throws(() => gradientCheck(defaultParameters, 1, 1.3, 0), RangeError);
  assert.throws(() => gradientCheck(defaultParameters, 1, 1.3, 1.1), RangeError);
});
