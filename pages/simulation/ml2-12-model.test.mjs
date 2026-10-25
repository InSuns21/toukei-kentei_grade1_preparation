import test from "node:test";
import assert from "node:assert/strict";
import { covariance, fitGaussianProcess, cholesky, solveCholesky } from "./ml2-12-model.mjs";

const close = (a, b, tolerance = 1e-10) =>
  assert.ok(Math.abs(a - b) < tolerance, String(a) + " must be close to " + String(b));

test("a single noisy observation yields distinct latent and future variances", () => {
  const model = fitGaussianProcess([[0, 2]], { kind: "se", amplitude: 1, length: 1 }, 1);
  const atObserved = model.predict(0);
  close(atObserved.mean, 1);
  close(atObserved.latentVariance, 0.5);
  close(atObserved.observationVariance, 1.5);
  const atDistance = model.predict(1);
  const r = Math.exp(-0.5);
  close(atDistance.mean, r);
  close(atDistance.latentVariance, 1 - r * r / 2);
});

test("repeated inputs are accepted when observation noise is positive", () => {
  const first = fitGaussianProcess([[0, 2]], { kind: "constant" }, 1).predict(0);
  const repeated = fitGaussianProcess([[0, 2], [0, 0]], { kind: "constant" }, 1).predict(0);
  close(first.latentVariance, 1 / 2);
  close(repeated.mean, 2 / 3);
  close(repeated.latentVariance, 1 / 3);
  assert.ok(repeated.latentVariance < first.latentVariance);
});

test("adding information does not increase fixed-model latent variance", () => {
  const opts = { kind: "se", amplitude: 1.5, length: 0.7 };
  const before = fitGaussianProcess([[-1, 1], [0, -0.2]], opts, 0.4);
  const after = fitGaussianProcess([[-1, 1], [0, -0.2], [1.3, 0.5]], opts, 0.4);
  for (let x = -3; x <= 3; x += 0.25) {
    assert.ok(after.predict(x).latentVariance <= before.predict(x).latentVariance + 1e-10);
  }
});

test("prior is recovered with no observations", () => {
  const model = fitGaussianProcess([], { kind: "linear", amplitude: 2 }, 0.25);
  const pred = model.predict(3);
  close(pred.mean, 0);
  close(pred.latentVariance, 4 * (1 + 9 / 4));
  close(pred.observationVariance, pred.latentVariance + 0.25);
});

test("constant kernel covariance has rank one, but noisy fit remains solvable", () => {
  const options = { kind: "constant", amplitude: 2 };
  close(covariance(-20, 20, options), 4);
  const pred = fitGaussianProcess([[-2, 1], [2, 3]], options, 0.5).predict(10);
  assert.ok(pred.latentVariance > 0 && pred.latentVariance < 4);
  close(pred.latentVariance, 1 / (1 / 4 + 2 / 0.5));
});

test("Cholesky solution matches a two-dimensional analytic inverse", () => {
  const matrix = [[2, 1], [1, 2]];
  const answer = solveCholesky(cholesky(matrix), [2, 0]);
  close(answer[0], 4 / 3);
  close(answer[1], -2 / 3);
});

test("invalid covariance or zero noise is rejected rather than hidden", () => {
  assert.throws(() => cholesky([[1, 2], [2, 1]]), RangeError);
  assert.throws(() => fitGaussianProcess([[0, 1]], { kind: "se" }, 0), RangeError);
});
