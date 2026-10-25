import assert from "node:assert/strict";
import { defaultConfig, evaluatePPCA, ellipsePoints } from "./ml2-07-model.mjs";

const near = (actual, expected, eps = 1e-10) =>
  assert.ok(Math.abs(actual - expected) <= eps, `${actual} != ${expected}`);
const closeMatrix = (actual, expected) => {
  assert.equal(actual.length, expected.length);
  for (let i = 0; i < actual.length; i++) for (let j = 0; j < actual[i].length; j++) near(actual[i][j], expected[i][j]);
};

const one = evaluatePPCA({ q: 1, noise: 1, angle: 0, x1: 2, x2: 1 });
closeMatrix(one.latent, [[4, 2], [2, 1]]);
closeMatrix(one.C, [[5, 2], [2, 2]]);
closeMatrix(one.posteriorCov, [[1 / 6]]);
near(one.posteriorMean[0], 5 / 6);
near(one.reconstructed[0], 5 / 3);
near(one.reconstructed[1], 5 / 6);
near(one.eigen.values[0], 6);
near(one.eigen.values[1], 1);
near(one.determinant, 6);
near(one.projected[0], 2);
near(one.projected[1], 1);
near(one.rotationCovarianceError, 0);

for (const q of [1, 2]) for (const noise of [0.1, 0.5, 1, 4]) {
  const base = evaluatePPCA({ ...defaultConfig, q, noise });
  for (const angle of [-180, -90, -37, 0, 45, 180]) {
    const result = evaluatePPCA({ ...defaultConfig, q, noise, angle });
    closeMatrix(result.C, base.C);
    closeMatrix(result.latent, base.latent);
    if (q === 1) closeMatrix(result.posteriorCov, base.posteriorCov);
    else {
      const rad = angle * Math.PI / 180, cos = Math.cos(rad), sin = Math.sin(rad);
      const R = [[cos, -sin], [sin, cos]];
      // The posterior covariance transforms as R^T V R; columns of W rotate by R.
      const expectedRtvR = R[0].map((_, i) => R[0].map((__, j) =>
        R.reduce((acc, row, k) => acc + row[i] * R.reduce((s, r, l) => s + base.posteriorCov[k][l] * r[j], 0), 0)));
      closeMatrix(result.posteriorCov, expectedRtvR);
    }
    for (let j = 0; j < 2; j++) near(result.reconstructed[j], base.reconstructed[j]);
    near(result.rotationCovarianceError, 0);
    near(result.rotationReconstructionError, 0);
    assert.ok(result.eigen.values[1] >= noise - 1e-10);
    assert.ok(ellipsePoints(result.eigen).every(point => point.every(Number.isFinite)));
  }
}

const faExample = evaluatePPCA({ q: 2, angle: 90, noise: 1, x1: -1, x2: 2 });
closeMatrix(faExample.C, [[5, 2], [2, 4.25]]);
assert.ok(faExample.posteriorCov[0][0] > 0);
assert.ok(faExample.posteriorCov[1][1] > 0);
for (const c of [
  {q: 0}, {q: 3}, {noise: 0}, {noise: Infinity}, {angle: 181}, {x1: NaN}, {x2: 5},
]) assert.throws(() => evaluatePPCA(c), RangeError);
assert.throws(() => ellipsePoints(one.eigen, 2, 3), RangeError);
console.log("ML2-07: covariance, Gaussian posterior, eigenvalues, reconstruction, rotation invariance passed");
