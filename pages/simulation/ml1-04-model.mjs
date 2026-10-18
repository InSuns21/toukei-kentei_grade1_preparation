// ML1-04: finite-design least squares in two parameters.
// All computations are deterministic and run entirely in the browser.
// Eigenvalue threshold is a numerical rank policy, not an exact algebraic certificate.
export function fitLeastSquares(rows, responses, tolerance = 1e-10) {
  if (!Array.isArray(rows) || !Array.isArray(responses) ||
      rows.length === 0 || rows.length !== responses.length) {
    throw new RangeError("観測行と応答の個数を一致させ、少なくとも1行入力してください");
  }
  for (let i = 0; i < rows.length; i++) {
    if (!Array.isArray(rows[i]) || rows[i].length !== 2 ||
        !rows[i].every(Number.isFinite) || !Number.isFinite(responses[i])) {
      throw new RangeError("全ての特徴値・応答を有限の実数で入力してください");
    }
  }
  if (!(Number.isFinite(tolerance) && tolerance > 0 && tolerance < 1)) {
    throw new RangeError("階数判定の相対閾値は0と1の間にしてください");
  }

  let a = 0, b = 0, d = 0, g0 = 0, g1 = 0;
  for (let i = 0; i < rows.length; i++) {
    const [x0, x1] = rows[i], y = responses[i];
    a += x0 * x0; b += x0 * x1; d += x1 * x1;
    g0 += x0 * y; g1 += x1 * y;
  }
  const trace = a + d;
  const delta = Math.hypot(a - d, 2 * b);
  const big = (trace + delta) / 2;
  const small = big > 0 ? Math.max(0, (a * d - b * b) / big) : 0;
  const angle = 0.5 * Math.atan2(2 * b, a - d);
  const v0 = [Math.cos(angle), Math.sin(angle)];
  const v1 = [-Math.sin(angle), Math.cos(angle)];
  const eigenvalues = [big, small], vectors = [v0, v1];
  const cutoff = tolerance * trace;
  const beta = [0, 0];
  let rank = 0;
  for (let k = 0; k < 2; k++) {
    if (eigenvalues[k] <= cutoff || eigenvalues[k] <= 0) continue;
    rank++;
    const vector = vectors[k];
    const coeff = (vector[0] * g0 + vector[1] * g1) / eigenvalues[k];
    beta[0] += coeff * vector[0];
    beta[1] += coeff * vector[1];
  }
  const fitted = rows.map(row => row[0] * beta[0] + row[1] * beta[1]);
  const residuals = responses.map((y, i) => y - fitted[i]);
  const orthogonality = rows[0].map((_, j) =>
    rows.reduce((sum, row, i) => sum + row[j] * residuals[i], 0));
  const squaredResidual = residuals.reduce((sum, r) => sum + r * r, 0);
  return {
    rank, beta, fitted, residuals, orthogonality,
    gram: [[a, b], [b, d]], cross: [g0, g1],
    eigenvalues, cutoff, loss: squaredResidual / (2 * rows.length),
    coefficientNorm: Math.hypot(...beta)
  };
}

export function buildDesign(xValues, mode) {
  if (mode !== "intercept" && mode !== "duplicate") {
    throw new RangeError("特徴量モードが不正です");
  }
  if (!Array.isArray(xValues) || !xValues.every(Number.isFinite)) {
    throw new RangeError("x座標が不正です");
  }
  return xValues.map(x => mode === "intercept" ? [1, x] : [x, x]);
}

export const SCENARIOS = Object.freeze({
  straight: { x: [-1, 0, 1], y: [-1, 0, 1], mode: "intercept" },
  outlier: { x: [-1, 0, 1], y: [-1, 0, 4], mode: "intercept" },
  duplicate: { x: [1, 2, 3], y: [1, 3, 4], mode: "duplicate" },
  zero: { x: [0, 0, 0], y: [1, 2, 3], mode: "duplicate" }
});
