import assert from "node:assert/strict";
import { defaultMixture, evaluateMixture, swapMixture } from "./ml2-05-model.mjs";

const near = (a, b, eps = 1e-12) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);
const r = evaluateMixture();
near(r.densities[0], Math.exp(-0.5) / Math.sqrt(2 * Math.PI));
near(r.densities[1], r.densities[0]);
near(r.responsibilities[0], 0.3);
near(r.responsibilities[1], 0.7);
near(r.mean, 0.4);
near(r.withinVariance, 1);
near(r.betweenVariance, 0.84);
near(r.variance, 1.84);

for (let t = 0; t < 40; t++) {
  const p = {
    pi1: 0.01 + (0.98 * t / 39),
    mu1: -5 + t / 4,
    mu2: 5 - t / 4,
    v1: 0.1 + t / 5,
    v2: 10 - t / 5,
    x: -5 + t / 4,
  };
  const a = evaluateMixture(p);
  const b = evaluateMixture(swapMixture(p));
  near(a.density, b.density);
  near(a.responsibilities[0], b.responsibilities[1]);
  near(a.responsibilities[1], b.responsibilities[0]);
  near(a.mean, b.mean);
  near(a.variance, b.variance);
  near(a.responsibilities[0] + a.responsibilities[1], 1);
  near(a.density, a.jointAtX.reduce((sum, v) => sum + v, 0));
  assert.ok(a.variance >= a.withinVariance);
}

for (const p of [
  { ...defaultMixture, pi1: 0 },
  { ...defaultMixture, v1: 0 },
  { ...defaultMixture, v2: -2 },
  { ...defaultMixture, x: 6 },
  { ...defaultMixture, mu1: Infinity },
  { ...defaultMixture, v1: "1" },
]) assert.throws(() => evaluateMixture(p), RangeError);

console.log("ML2-05: Gaussian density, responsibility, moments, permutation, domain validation passed");
