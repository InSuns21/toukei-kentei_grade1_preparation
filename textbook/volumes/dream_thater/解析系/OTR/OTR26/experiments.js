"use strict";

// OTR26 reproducible computations. Node.js only; no random sampling or packages.
const { sinkhorn } = require("../OTR25/sinkhorn");

function quantileCoupling(x, a, y, b) {
  if (x.length !== a.length || y.length !== b.length ||
      !x.every(Number.isFinite) || !y.every(Number.isFinite) ||
      !a.every(v => Number.isFinite(v) && v > 0) ||
      !b.every(v => Number.isFinite(v) && v > 0) ||
      x.some((v, i) => i > 0 && v <= x[i - 1]) ||
      y.some((v, i) => i > 0 && v <= y[i - 1]) ||
      Math.abs(a.reduce((s, v) => s + v, 0) - 1) > 1e-12 ||
      Math.abs(b.reduce((s, v) => s + v, 0) - 1) > 1e-12) {
    throw new RangeError("strictly ordered supports and positive unit masses required");
  }
  const p = x.map(() => y.map(() => 0));
  let i = 0, j = 0, left = a[0], right = b[0];
  while (i < x.length && j < y.length) {
    const amount = Math.min(left, right);
    p[i][j] += amount;
    left -= amount;
    right -= amount;
    if (left < 1e-13) { i++; if (i < x.length) left = a[i]; }
    if (right < 1e-13) { j++; if (j < y.length) right = b[j]; }
  }
  const cost = p.reduce((s, row, k) => s + row.reduce((v, mass, l) =>
    v + mass * (x[k] - y[l]) ** 2, 0), 0);
  return { plan: p, w2Squared: cost };
}

// Positive definite 2x2 matrices, represented by [[a,b],[b,d]].
function mul(A, B) {
  return A.map(row => B[0].map((_, j) => row.reduce((s, v, k) => s + v * B[k][j], 0)));
}
function trace(A) { return A[0][0] + A[1][1]; }
function det(A) { return A[0][0] * A[1][1] - A[0][1] * A[1][0]; }
function sqrtSPD(A) {
  const d = det(A);
  if (!(d > 0) || !(A[0][0] > 0) || !Number.isFinite(d)) throw new RangeError("SPD required");
  const q = Math.sqrt(d), scale = Math.sqrt(trace(A) + 2 * q);
  return [[(A[0][0] + q) / scale, A[0][1] / scale],
          [A[1][0] / scale, (A[1][1] + q) / scale]];
}
function gaussianW2Example() {
  const A = [[1, 0], [0, 4]], B = [[2, 1], [1, 2]];
  const rootA = sqrtSPD(A);
  const inverseRootA = [[1, 0], [0, 0.5]];
  const cross = mul(mul(rootA, B), rootA);
  const M = mul(mul(inverseRootA, sqrtSPD(cross)), inverseRootA);
  const transformed = mul(mul(M, A), M);
  const meanSquared = (2 - 0) ** 2 + (-1 - 1) ** 2;
  const w2Squared = meanSquared + trace(A) + trace(B) - 2 * trace(sqrtSPD(cross));
  // E|X-T(X)|^2 for T(x)=m1+M(x-m0), X~N(m0,A).
  const IminusM = [[1 - M[0][0], -M[0][1]], [-M[1][0], 1 - M[1][1]]];
  const mapCost = meanSquared + trace(mul(mul(IminusM, A), IminusM));
  return { w2Squared, mapCost, transportMatrix: M, transformedCovariance: transformed, targetCovariance: B };
}

function heatRing({ cells = 64, steps = 100, ratio = 0.2 } = {}) {
  if (!Number.isSafeInteger(cells) || cells < 4 || !Number.isSafeInteger(steps) || steps < 1 ||
      !(ratio > 0 && ratio <= 0.5)) throw new RangeError("cells>=4, steps>=1, 0<ratio<=1/2 required");
  const dx = 1 / cells, dt = ratio * dx * dx;
  let rho = Array.from({ length: cells }, (_, i) => 1 + 0.25 * Math.cos(2 * Math.PI * i / cells));
  const mass = r => dx * r.reduce((s, v) => s + v, 0);
  const energy = r => dx * r.reduce((s, v) => s + v * Math.log(v), 0);
  const history = [{ mass: mass(rho), energy: energy(rho), minimum: Math.min(...rho) }];
  for (let n = 0; n < steps; n++) {
    rho = rho.map((v, i, old) => v + ratio * (
      old[(i + cells - 1) % cells] - 2 * v + old[(i + 1) % cells]));
    history.push({ mass: mass(rho), energy: energy(rho), minimum: Math.min(...rho) });
  }
  const amplitude = rho.reduce((s, v, i) => s + 2 * (v - 1) * Math.cos(2 * Math.PI * i / cells) / cells, 0);
  const expectedAmplitude = 0.25 * (1 - 4 * ratio * Math.sin(Math.PI / cells) ** 2) ** steps;
  const continuumAmplitude = 0.25 * Math.exp(-4 * Math.PI ** 2 * steps * dt);
  return { dx, dt, time: steps * dt, history, amplitude, expectedAmplitude, continuumAmplitude };
}

function modelContrast() {
  const t = 0.5;
  // Brownian heat evolution N(0,1+2t) versus OT geodesic N(0,((1-t)+t*sqrt(3))^2).
  const heatVariance = 1 + 2 * t;
  const otVariance = ((1 - t) + t * Math.sqrt(3)) ** 2;
  // Independent endpoint coupling of identical N(0,1) laws: Var((1-t)X+tY).
  const independentFlowVariance = (1 - t) ** 2 + t ** 2;
  return { t, heatVariance, otVariance, independentFlowVariance, optimalSameLawVariance: 1 };
}

function runAll() {
  const a = [0.5, 0.5], b = [0.5, 0.5], C = [[0, 1], [1, 0]];
  const primal = [[0.5, 0], [0, 0.5]];
  const dualF = [0, 0], dualG = [0, 0];
  const primalCost = primal.flat().reduce((s, p, k) => s + p * C[Math.floor(k / 2)][k % 2], 0);
  const dualValue = a.reduce((s, v, i) => s + v * dualF[i], 0) +
    b.reduce((s, v, j) => s + v * dualG[j], 0);
  const quantile = quantileCoupling([0, 2], [0.25, 0.75], [1, 3], [0.5, 0.5]);
  const numericQuantile = sinkhorn([0.25, 0.75], [0.5, 0.5], [[1, 9], [1, 1]], 0.5);
  const regularized = [0.2, 0.1, 0.05].map(epsilon => {
    const result = sinkhorn(a, b, C, epsilon);
    return { epsilon, iterations: result.iterations, converged: result.converged,
      marginalResidual: result.residual, cost: result.transportCost,
      closedFormCost: 1 / (1 + Math.exp(1 / epsilon)),
      errorBound: epsilon * Math.log(4), primalMinusDual: result.primalMinusDual };
  });
  return { finiteLP: { primalCost, dualValue, gap: primalCost - dualValue },
    quantile: { ...quantile, numericRegularized: {
      epsilon: 0.5, converged: numericQuantile.converged,
      iterations: numericQuantile.iterations, residual: numericQuantile.residual,
      cost: numericQuantile.transportCost,
      biasBound: 0.5 * Math.log(4),
    } },
    gaussian: gaussianW2Example(), heat: heatRing(), regularized, models: modelContrast() };
}

module.exports = { quantileCoupling, gaussianW2Example, heatRing, modelContrast, runAll };
if (require.main === module) {
  const result = runAll();
  console.log(JSON.stringify({ ...result, heat: { ...result.heat,
    initial: result.heat.history[0], final: result.heat.history.at(-1), history: undefined } }, null, 2));
  if (result.regularized.some(r => !r.converged)) process.exitCode = 1;
}
