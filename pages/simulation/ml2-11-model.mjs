// ML2-11: small, exactly enumerable MCMC models. No server or external RNG.
export const defaults = Object.freeze({ method: "mh", width: 1, beta: Math.log(4), seed: 2111, initial: 0 });

export function check(config) {
  const c = { ...defaults, ...config };
  if (!(["mh", "gibbs"].includes(c.method)) || !Number.isFinite(c.width) || c.width < 0.4 || c.width > 4 ||
      !Number.isFinite(c.beta) || c.beta < 0 || c.beta > 3 ||
      !Number.isSafeInteger(c.seed) || c.seed < 0 || c.seed > 4294967295 ||
      !Number.isInteger(c.initial) || c.initial < 0 || c.initial >= (c.method === "mh" ? 9 : 4)) {
    throw new RangeError("方式・提案幅・結合係数・seed・初期状態を指定範囲で設定してください");
  }
  return c;
}

function normalize(weights) {
  const sum = weights.reduce((a, b) => a + b, 0);
  return weights.map(x => x / sum);
}

export function stateLabel(method, i) {
  return method === "mh" ? String(i - 4) : `(${i < 2 ? -1 : 1},${i % 2 ? 1 : -1})`;
}

function pair(i) { return [i < 2 ? -1 : 1, i % 2 ? 1 : -1]; }

export function target(config = defaults) {
  const c = check(config);
  if (c.method === "mh") {
    return normalize(Array.from({ length: 9 }, (_, i) => {
      const x = i - 4;
      return Math.exp(-((x + 3) ** 2) / 2) + Math.exp(-((x - 3) ** 2) / 2);
    }));
  }
  return normalize(Array.from({ length: 4 }, (_, i) => {
    const [x, y] = pair(i);
    return Math.exp(c.beta * x * y);
  }));
}

// Finite Gaussian proposal is normalized separately for every starting state.
// Near an endpoint it is NOT symmetric: Hastings correction is essential.
export function proposal(config = defaults) {
  const c = check({ ...config, method: "mh" });
  return Array.from({ length: 9 }, (_, i) => normalize(Array.from({ length: 9 }, (_, j) =>
    Math.exp(-((i - j) ** 2) / (2 * c.width ** 2)))));
}

export function mhAcceptance(pi, q, i, j) {
  if (q[i][j] === 0) return 0;
  return Math.min(1, (pi[j] * q[j][i]) / (pi[i] * q[i][j]));
}

export function transition(config = defaults) {
  const c = check(config);
  const pi = target(c);
  if (c.method === "mh") {
    const q = proposal(c);
    return q.map((row, i) => {
      const out = row.map((v, j) => i === j ? 0 : v * mhAcceptance(pi, q, i, j));
      out[i] = 1 - out.reduce((a, b) => a + b, 0);
      return out;
    });
  }
  return Array.from({ length: 4 }, (_, i) => {
    const [x, y] = pair(i), out = Array(4).fill(0);
    for (let j = 0; j < 4; j++) {
      const [a, b] = pair(j);
      if (b === y) out[j] += 0.5 * Math.exp(c.beta * a * y) / (2 * Math.cosh(c.beta * y));
      if (a === x) out[j] += 0.5 * Math.exp(c.beta * x * b) / (2 * Math.cosh(c.beta * x));
    }
    return out;
  });
}

function rng(seed) {
  let value = (seed ^ 0x9e3779b9) >>> 0;
  return () => {
    value ^= value << 13; value ^= value >>> 17; value ^= value << 5;
    return (value >>> 0) / 4294967296;
  };
}

function pick(weights, uniform) {
  let v = uniform();
  for (let i = 0; i < weights.length; i++) {
    v -= weights[i];
    if (v < 0) return i;
  }
  return weights.length - 1;
}

export function makeChain(config = defaults) {
  const c = check(config), uniform = rng(c.seed), pi = target(c);
  const q = c.method === "mh" ? proposal(c) : null;
  const states = [c.initial];
  const moves = [];
  function advance(n = 1) {
    if (!Number.isInteger(n) || n < 0 || n > 2000 || states.length + n > 5001) throw new RangeError("最大5000遷移まで");
    for (let k = 0; k < n; k++) {
      const i = states.at(-1);
      let next, accepted;
      if (c.method === "mh") {
        const j = pick(q[i], uniform);
        accepted = uniform() < mhAcceptance(pi, q, i, j);
        next = accepted ? j : i;
      } else {
        const [x, y] = pair(i);
        if (uniform() < 0.5) {
          const prob = Math.exp(c.beta * y) / (2 * Math.cosh(c.beta * y));
          next = (uniform() < prob ? 2 : 0) + (y === 1 ? 1 : 0);
        } else {
          const prob = Math.exp(c.beta * x) / (2 * Math.cosh(c.beta * x));
          next = (x === 1 ? 2 : 0) + (uniform() < prob ? 1 : 0);
        }
        accepted = null;
      }
      states.push(next);
      moves.push(accepted);
    }
    return states;
  }
  return { config: c, pi, states, moves, advance };
}

export function observable(method, state) {
  return method === "mh" ? state - 4 : pair(state)[0];
}

export function diagnostics(chain, burn = 0) {
  if (!Number.isInteger(burn) || burn < 0) throw new RangeError("burn-inは0以上の整数");
  const { states, moves, config } = chain;
  const kept = states.slice(Math.min(states.length, burn + 1)).map(i => observable(config.method, i));
  const n = kept.length;
  const mean = n ? kept.reduce((a, b) => a + b, 0) / n : null;
  const variance = n ? kept.reduce((s, x) => s + (x - mean) ** 2, 0) / n : null;
  const acf = [];
  for (let lag = 1; lag <= Math.min(10, n - 1); lag++) {
    if (!(variance > 0)) { acf.push(null); continue; }
    let sum = 0;
    for (let i = 0; i < n - lag; i++) sum += (kept[i] - mean) * (kept[i + lag] - mean);
    acf.push(sum / (n * variance));
  }
  const visits = Array(chain.pi.length).fill(0);
  states.slice(Math.min(states.length, burn + 1)).forEach(i => visits[i]++);
  return {
    n, mean, variance, acf, visits,
    acceptance: config.method === "mh" && moves.length ? moves.filter(Boolean).length / moves.length : null,
  };
}
