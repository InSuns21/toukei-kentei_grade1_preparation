// Fixed unit-variance Gaussian mixture: exact E and M steps for weights and means.
export const defaultConfig = Object.freeze({ seed: 2606, count: 120, components: 2, separation: 1.5 });
const logNormal = -0.5 * Math.log(2 * Math.PI);
function validate(c) {
  if (!c || !Number.isInteger(c.seed) || c.seed < 0 || c.seed > 999999999) throw new RangeError("invalid seed");
  if (!Number.isInteger(c.count) || c.count < 40 || c.count > 400) throw new RangeError("invalid count");
  if (![2, 3].includes(c.components)) throw new RangeError("invalid component count");
  if (!Number.isFinite(c.separation) || c.separation < 0 || c.separation > 4) throw new RangeError("invalid initial separation");
}
function rng(initial) {
  let s = initial >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let x = s;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}
export function makeDataset(c = defaultConfig) {
  validate(c);
  const random = rng(c.seed), data = [];
  for (let i = 0; i < c.count; i++) {
    const source = random() < 0.5 ? -2 : 2;
    const u = Math.max(random(), Number.MIN_VALUE), v = random();
    data.push(source + Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v));
  }
  return data;
}
export function initialParameters(c = defaultConfig) {
  validate(c);
  const means = c.components === 2 ? [-c.separation, c.separation] : [-c.separation, 0, c.separation];
  return { means, weights: means.map(() => 1 / means.length) };
}
export function expectation(data, p) {
  if (!Array.isArray(data) || !data.length || data.some(x => !Number.isFinite(x))) throw new RangeError("invalid observations");
  if (!p || !Array.isArray(p.means) || !Array.isArray(p.weights) || p.means.length !== p.weights.length || p.means.length < 2 ||
    p.means.some(x => !Number.isFinite(x)) || p.weights.some(x => !(x > 0 && Number.isFinite(x)))) throw new RangeError("invalid components");
  if (Math.abs(p.weights.reduce((a, b) => a + b, 0) - 1) > 1e-10) throw new RangeError("weights must sum to 1");
  const counts = p.means.map(() => 0), sums = counts.slice(), responsibilities = [];
  let logLikelihood = 0;
  for (const x of data) {
    const logits = p.means.map((mu, k) => Math.log(p.weights[k]) + logNormal - (x - mu) ** 2 / 2);
    const max = Math.max(...logits), exps = logits.map(v => Math.exp(v - max));
    const denom = exps.reduce((a, b) => a + b, 0), r = exps.map(v => v / denom);
    logLikelihood += max + Math.log(denom);
    responsibilities.push(r);
    r.forEach((value, k) => { counts[k] += value; sums[k] += x * value; });
  }
  return { counts, sums, responsibilities, logLikelihood };
}
export function stepEM(data, p) {
  const old = expectation(data, p);
  if (old.counts.some(x => x <= 1e-12)) throw new RangeError("near-empty component");
  const updated = {
    weights: old.counts.map(n => n / data.length),
    means: old.counts.map((n, k) => old.sums[k] / n),
  };
  const next = expectation(data, updated);
  const qDifference = old.counts.reduce((s, n, k) =>
    s + n * Math.log(updated.weights[k] / p.weights[k])
      + n * (updated.means[k] - p.means[k]) ** 2 / 2, 0);
  const likelihoodDifference = next.logLikelihood - old.logLikelihood;
  if (likelihoodDifference < -1e-8) throw new Error("unexpected likelihood decrease");
  return { updated, old, next, qDifference, likelihoodDifference,
    klDifference: likelihoodDifference - qDifference };
}
