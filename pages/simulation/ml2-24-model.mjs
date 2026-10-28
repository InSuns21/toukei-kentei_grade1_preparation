// ML2-24: a finite-time Gaussian diffusion experiment with a known two-atom law.
// The exact reverse kernel deliberately uses the known data distribution;
// it is a mathematical reference, not a learned generative model.
export const defaultConfig = Object.freeze({
  seed: 2424, count: 600, steps: 8, betaStart: 0.08, betaEnd: 0.4,
  schedule: "linear", probabilityPlus: 0.7, terminal: "true", reverse: "exact",
});

export function validateConfig(config) {
  const c = { ...defaultConfig, ...config };
  if (!Number.isInteger(c.seed) || c.seed < 0 || c.seed > 4294967295)
    throw new RangeError("seedは0〜4294967295の整数にしてください");
  if (!Number.isInteger(c.count) || c.count < 100 || c.count > 1600)
    throw new RangeError("標本数は100〜1600の整数にしてください");
  if (!Number.isInteger(c.steps) || c.steps < 2 || c.steps > 20)
    throw new RangeError("時刻数は2〜20の整数にしてください");
  if (![c.betaStart, c.betaEnd].every(x => Number.isFinite(x) && x > 0 && x < 1))
    throw new RangeError("ノイズ分散率は0と1の間にしてください");
  if (!(c.probabilityPlus > 0 && c.probabilityPlus < 1))
    throw new RangeError("正の原子の確率は0と1の間にしてください");
  if (!["constant", "linear"].includes(c.schedule))
    throw new RangeError("scheduleは一定または線形を指定してください");
  if (!["true", "normal"].includes(c.terminal))
    throw new RangeError("終端は真の分布か標準Gaussianを指定してください");
  if (!["exact", "mean"].includes(c.reverse))
    throw new RangeError("逆向きは厳密混合か単一Gaussian近似を指定してください");
  return c;
}

export function makeSchedule(config) {
  const c = validateConfig(config);
  const beta = [0], alpha = [1], barAlpha = [1];
  for (let t = 1; t <= c.steps; t++) {
    const b = c.schedule === "constant" ? c.betaStart :
      c.betaStart + (c.betaEnd - c.betaStart) * (t - 1) / (c.steps - 1);
    beta.push(b);
    alpha.push(1 - b);
    barAlpha.push(barAlpha[t - 1] * (1 - b));
  }
  return { beta, alpha, barAlpha };
}

export function createRng(seed) {
  let state = seed >>> 0;
  return {
    uniform() {
      state = (state + 0x6D2B79F5) >>> 0;
      let z = state;
      z = Math.imul(z ^ (z >>> 15), z | 1);
      z ^= z + Math.imul(z ^ (z >>> 7), z | 61);
      return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
    },
    normal() {
      // Box--Muller; avoid log(0) without changing the random stream's seed.
      const u = Math.max(this.uniform(), Number.MIN_VALUE);
      const v = this.uniform();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    },
  };
}

export function forwardConditional(t, x0, s) {
  if (!Number.isInteger(t) || t < 0 || t >= s.barAlpha.length)
    throw new RangeError("時刻がscheduleの範囲外です");
  return { mean: Math.sqrt(s.barAlpha[t]) * x0, variance: 1 - s.barAlpha[t] };
}

export function posterior(t, xt, x0, s) {
  if (!Number.isInteger(t) || t < 2 || t >= s.barAlpha.length)
    throw new RangeError("正分散の事後Gaussianはt>=2に限ります");
  const denominator = 1 - s.barAlpha[t];
  const variance = s.beta[t] * (1 - s.barAlpha[t - 1]) / denominator;
  const mean = Math.sqrt(s.barAlpha[t - 1]) * s.beta[t] * x0 / denominator +
    Math.sqrt(s.alpha[t]) * (1 - s.barAlpha[t - 1]) * xt / denominator;
  return { mean, variance };
}

export function probabilityPositive(t, xt, s, probabilityPlus = 0.5, atom = 2) {
  if (!(probabilityPlus > 0 && probabilityPlus < 1))
    throw new RangeError("事前確率が不正です");
  const logOdds = Math.log(probabilityPlus / (1 - probabilityPlus)) +
    2 * Math.sqrt(s.barAlpha[t]) * atom * xt / (1 - s.barAlpha[t]);
  // Stable logistic formula for very separated conditional densities.
  if (logOdds >= 0) return 1 / (1 + Math.exp(-logOdds));
  const e = Math.exp(logOdds);
  return e / (1 + e);
}

export function reverseSample(t, xt, s, rng, config) {
  const weight = probabilityPositive(t, xt, s, config.probabilityPlus);
  const conditionalMeanX0 = 2 * (2 * weight - 1);
  if (config.reverse === "exact") {
    const x0 = rng.uniform() < weight ? 2 : -2;
    if (t === 1) return x0;
    const p = posterior(t, xt, x0, s);
    return p.mean + Math.sqrt(p.variance) * rng.normal();
  }
  // Gaussian with the true conditional mean, but only the within-component
  // posterior variance; between-component variance is omitted.
  if (t === 1) return conditionalMeanX0;
  const p = posterior(t, xt, conditionalMeanX0, s);
  return p.mean + Math.sqrt(p.variance) * rng.normal();
}

export function theoreticalMoments(t, s, probabilityPlus) {
  const mean0 = 2 * (2 * probabilityPlus - 1);
  const variance0 = 4 - mean0 * mean0;
  return {
    mean: Math.sqrt(s.barAlpha[t]) * mean0,
    variance: s.barAlpha[t] * variance0 + 1 - s.barAlpha[t],
    conditionalVariance: 1 - s.barAlpha[t],
  };
}

export function summarize(values) {
  if (!values?.length) return null;
  let sum = 0, squares = 0, positive = 0, distance = 0;
  for (const value of values) {
    sum += value; squares += value * value;
    if (value > 0) positive++;
    distance += (Math.abs(value) - 2) ** 2;
  }
  const mean = sum / values.length;
  return { mean, variance: Math.max(0, squares / values.length - mean * mean),
    proportionPositive: positive / values.length, nearestAtomMse: distance / values.length };
}

export function createExperiment(config = defaultConfig) {
  const c = validateConfig(config);
  const s = makeSchedule(c);
  const forward = Array(c.steps + 1).fill(null);
  const reverse = Array(c.steps + 1).fill(null);
  const forwardRng = createRng(c.seed);
  const reverseRng = createRng(c.seed ^ 0x9E3779B9);
  forward[0] = Array.from({ length: c.count }, () =>
    forwardRng.uniform() < c.probabilityPlus ? 2 : -2);
  let phase = "forward", time = 0;

  function step() {
    if (phase === "done") return false;
    if (phase === "forward") {
      const t = ++time;
      forward[t] = forward[t - 1].map(x =>
        Math.sqrt(s.alpha[t]) * x + Math.sqrt(s.beta[t]) * forwardRng.normal());
      if (t === c.steps) phase = "terminal";
    } else if (phase === "terminal") {
      reverse[c.steps] = Array.from({ length: c.count }, () => {
        if (c.terminal === "normal") return reverseRng.normal();
        const x0 = reverseRng.uniform() < c.probabilityPlus ? 2 : -2;
        return Math.sqrt(s.barAlpha[c.steps]) * x0 +
          Math.sqrt(1 - s.barAlpha[c.steps]) * reverseRng.normal();
      });
      phase = "reverse";
      time = c.steps;
    } else {
      const t = time;
      reverse[t - 1] = reverse[t].map(x => reverseSample(t, x, s, reverseRng, c));
      time--;
      if (time === 0) phase = "done";
    }
    return true;
  }

  return { config: c, schedule: s, forward, reverse, step,
    get phase() { return phase; }, get time() { return time; } };
}
