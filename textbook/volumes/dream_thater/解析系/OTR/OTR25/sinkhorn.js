"use strict";

// Finite balanced OT, positive marginals, finite costs, epsilon > 0.
// The log-domain updates do not construct exp(-C/epsilon).
function logSumExp(values) {
  const largest = Math.max(...values);
  if (!Number.isFinite(largest)) throw new RangeError("finite log-sum-exp inputs required");
  return largest + Math.log(values.reduce((sum, value) => sum + Math.exp(value - largest), 0));
}

function sinkhorn(a, b, cost, epsilon, options = {}) {
  const tolerance = options.tolerance ?? 1e-10;
  const maxIterations = options.maxIterations ?? 20000;
  const n = a.length;
  const m = b.length;
  if (!Number.isFinite(epsilon) || epsilon <= 0 || !Number.isFinite(tolerance) || tolerance <= 0 ||
      !Number.isSafeInteger(maxIterations) || maxIterations < 1 || n < 1 || m < 1 ||
      !Array.isArray(cost) || cost.length !== n ||
      !a.every(x => Number.isFinite(x) && x > 0) ||
      !b.every(x => Number.isFinite(x) && x > 0) ||
      !cost.every(row => Array.isArray(row) && row.length === m && row.every(Number.isFinite))) {
    throw new RangeError("positive finite masses, rectangular finite cost, epsilon and settings required");
  }
  const massA = a.reduce((s, v) => s + v, 0);
  const massB = b.reduce((s, v) => s + v, 0);
  if (Math.abs(massA - 1) > 1e-12 || Math.abs(massB - 1) > 1e-12) {
    throw new RangeError("both marginals must sum to one");
  }

  const f = Array(n).fill(0);
  const g = Array(m).fill(0);
  let plan;
  let residual = Infinity;
  let iterations = 0;
  for (let t = 1; t <= maxIterations; t++) {
    for (let i = 0; i < n; i++) {
      f[i] = epsilon * (Math.log(a[i]) - logSumExp(
        b.map((_, j) => (g[j] - cost[i][j]) / epsilon)));
    }
    for (let j = 0; j < m; j++) {
      g[j] = epsilon * (Math.log(b[j]) - logSumExp(
        a.map((_, i) => (f[i] - cost[i][j]) / epsilon)));
    }
    // Gauge fixing: f_i + g_j is invariant under (f,g) -> (f-c,g+c).
    const shift = f[0];
    for (let i = 0; i < n; i++) f[i] -= shift;
    for (let j = 0; j < m; j++) g[j] += shift;
    plan = a.map((_, i) => b.map((_, j) => Math.exp((f[i] + g[j] - cost[i][j]) / epsilon)));
    const row = plan.map(values => values.reduce((s, v) => s + v, 0));
    const col = b.map((_, j) => plan.reduce((s, values) => s + values[j], 0));
    residual = Math.max(...row.map((v, i) => Math.abs(v - a[i])),
                        ...col.map((v, j) => Math.abs(v - b[j])));
    iterations = t;
    if (residual <= tolerance) break;
  }
  const transportCost = plan.reduce((s, row, i) =>
    s + row.reduce((t, p, j) => t + p * cost[i][j], 0), 0);
  const entropyTerm = plan.flat().reduce((s, p) => s + (p > 0 ? p * (Math.log(p) - 1) : 0), 0);
  const objective = transportCost + epsilon * entropyTerm;
  const dual = a.reduce((s, p, i) => s + p * f[i], 0) +
    b.reduce((s, p, j) => s + p * g[j], 0) - epsilon * plan.flat().reduce((s, p) => s + p, 0);
  return {
    plan, f, g, iterations, converged: residual <= tolerance, residual,
    transportCost, objective, dual,
    // Only meaningful as a certificate when the marginal residual is small.
    primalMinusDual: objective - dual
  };
}

module.exports = { logSumExp, sinkhorn };

if (require.main === module) {
  const result = sinkhorn([0.5, 0.5], [0.5, 0.5], [[0, 1], [1, 0]], 1);
  console.log(JSON.stringify(result, null, 2));
  if (!result.converged) process.exitCode = 1;
}
