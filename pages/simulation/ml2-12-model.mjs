// ML2-12: GP posterior computation. Pure functions shared by the page and tests.
export function covariance(x, z, { kind = "se", amplitude = 1, length = 1 } = {}) {
  if (!Number.isFinite(x) || !Number.isFinite(z) || !(amplitude > 0)) {
    throw new RangeError("finite inputs and positive amplitude are required");
  }
  const scale = amplitude * amplitude;
  if (kind === "constant") return scale;
  if (kind === "linear") return scale * (1 + x * z / 4);
  if (kind !== "se" || !(length > 0)) throw new RangeError("invalid kernel parameters");
  return scale * Math.exp(-0.5 * ((x - z) / length) ** 2);
}

export function cholesky(matrix) {
  const n = matrix.length;
  if (!matrix.every(row => row.length === n)) throw new RangeError("square matrix required");
  const lower = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let value = matrix[i][j];
      for (let k = 0; k < j; k++) value -= lower[i][k] * lower[j][k];
      if (i === j) {
        if (!(value > 0)) throw new RangeError("matrix must be strictly positive definite");
        lower[i][i] = Math.sqrt(value);
      } else {
        lower[i][j] = value / lower[j][j];
      }
    }
  }
  return lower;
}

export function solveCholesky(lower, vector) {
  const n = lower.length;
  if (vector.length !== n) throw new RangeError("dimension mismatch");
  const y = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let total = vector[i];
    for (let j = 0; j < i; j++) total -= lower[i][j] * y[j];
    y[i] = total / lower[i][i];
  }
  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let total = y[i];
    for (let j = i + 1; j < n; j++) total -= lower[j][i] * x[j];
    x[i] = total / lower[i][i];
  }
  return x;
}

const dot = (x, y) => x.reduce((sum, value, i) => sum + value * y[i], 0);

export function fitGaussianProcess(observations, kernelOptions, noiseVariance) {
  if (!(noiseVariance > 0) || !Number.isFinite(noiseVariance)) {
    throw new RangeError("observation noise variance must be positive");
  }
  if (!observations.every(([x, y]) => Number.isFinite(x) && Number.isFinite(y))) {
    throw new RangeError("observations must be finite");
  }
  const n = observations.length;
  const train = observations.map(([x]) => x);
  const matrix = train.map((x, i) => train.map((z, j) =>
    covariance(x, z, kernelOptions) + (i === j ? noiseVariance : 0)));
  const lower = cholesky(matrix);
  const alpha = solveCholesky(lower, observations.map(([, y]) => y));
  return {
    matrix,
    alpha,
    predict(x) {
      const cross = train.map(z => covariance(z, x, kernelOptions));
      const mean = dot(cross, alpha);
      const v = solveCholesky(lower, cross);
      const rawVariance = covariance(x, x, kernelOptions) - dot(cross, v);
      if (rawVariance < -1e-8) throw new RangeError("posterior variance unexpectedly negative");
      const latentVariance = Math.max(0, rawVariance);
      return {
        mean,
        latentVariance,
        observationVariance: latentVariance + noiseVariance,
        priorVariance: covariance(x, x, kernelOptions)
      };
    }
  };
}
