// Two-component univariate Gaussian mixture; bounded inputs for a stable browser lab.
export const defaultMixture = Object.freeze({ pi1: 0.3, mu1: -1, mu2: 1, v1: 1, v2: 1, x: 0 });

export function evaluateMixture(p = defaultMixture) {
  if (!p || typeof p !== "object") throw new TypeError("parameter object required");
  for (const key of ["pi1", "mu1", "mu2", "v1", "v2", "x"]) {
    if (typeof p[key] !== "number" || !Number.isFinite(p[key])) throw new RangeError(`${key} must be finite`);
  }
  if (!(p.pi1 >= 0.01 && p.pi1 <= 0.99)) throw new RangeError("pi1 outside [0.01,0.99]");
  if (!(p.v1 >= 0.1 && p.v1 <= 10 && p.v2 >= 0.1 && p.v2 <= 10)) throw new RangeError("variances outside [0.1,10]");
  if (Math.max(Math.abs(p.mu1), Math.abs(p.mu2), Math.abs(p.x)) > 5) throw new RangeError("means and observation must be within [-5,5]");

  const gaussian = (x, mu, v) => Math.exp(-((x - mu) ** 2) / (2 * v)) / Math.sqrt(2 * Math.PI * v);
  const densities = [gaussian(p.x, p.mu1, p.v1), gaussian(p.x, p.mu2, p.v2)];
  const weights = [p.pi1, 1 - p.pi1];
  const jointAtX = weights.map((w, k) => w * densities[k]);
  const density = jointAtX[0] + jointAtX[1];
  const responsibilities = jointAtX.map(value => value / density);
  const mean = weights[0] * p.mu1 + weights[1] * p.mu2;
  const withinVariance = weights[0] * p.v1 + weights[1] * p.v2;
  const betweenVariance = weights[0] * (p.mu1 - mean) ** 2 + weights[1] * (p.mu2 - mean) ** 2;
  return { densities, jointAtX, density, responsibilities, mean, withinVariance, betweenVariance, variance: withinVariance + betweenVariance };
}

export function swapMixture(p) {
  evaluateMixture(p);
  return { pi1: 1 - p.pi1, mu1: p.mu2, mu2: p.mu1, v1: p.v2, v2: p.v1, x: p.x };
}
