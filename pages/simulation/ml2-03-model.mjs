// Fixed-support, canonical natural exponential families, one natural parameter.
export function evaluateFamily(family, eta, variance = 2) {
  if (!Number.isFinite(eta) || Math.abs(eta) > 30) throw new RangeError("eta must be finite and bounded");
  if (family === "bernoulli") {
    const a = Math.max(0, eta) + Math.log1p(Math.exp(-Math.abs(eta)));
    const p = eta >= 0 ? 1 / (1 + Math.exp(-eta)) : Math.exp(eta) / (1 + Math.exp(eta));
    return { a, mean: p, covariance: p * (1 - p), support: "{0, 1}" };
  }
  if (family === "gaussian") {
    if (!Number.isFinite(variance) || variance <= 0) throw new RangeError("variance must be positive");
    return { a: variance * eta * eta / 2, mean: variance * eta, covariance: variance, support: "R" };
  }
  throw new RangeError("unknown family");
}

export function checkDerivatives(family, eta, variance = 2, step = 0.001) {
  if (!Number.isFinite(step) || step <= 0 || step >= 0.1) throw new RangeError("invalid step");
  const center = evaluateFamily(family, eta, variance);
  const left = evaluateFamily(family, eta - step, variance).a;
  const right = evaluateFamily(family, eta + step, variance).a;
  const numericMean = (right - left) / (2 * step);
  const numericVariance = (right - 2 * center.a + left) / (step * step);
  return { ...center, numericMean, numericVariance, meanError: Math.abs(numericMean - center.mean), varianceError: Math.abs(numericVariance - center.covariance) };
}
