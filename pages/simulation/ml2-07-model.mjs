// Two-observation-coordinate PPCA reference model. No random numbers or external data.
export const defaultConfig = Object.freeze({ q: 2, noise: 1, angle: 0, x1: 2, x2: 1 });

function valid(c) {
  if (![1, 2].includes(c.q)) throw new RangeError("潜在次元 q は1または2です");
  for (const [key, lo, hi] of [["noise", 0.1, 4], ["angle", -180, 180], ["x1", -4, 4], ["x2", -4, 4]]) {
    if (!Number.isFinite(c[key]) || c[key] < lo || c[key] > hi) {
      throw new RangeError(`${key} は ${lo}〜${hi} の有限数としてください`);
    }
  }
}

const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const add = (A, B) => A.map((row, i) => row.map((v, j) => v + B[i][j]));
const identity = n => Array.from({length:n}, (_, i) => Array.from({length:n}, (_, j) => Number(i === j)));
const maxDiff = (A, B) => Math.max(...A.flatMap((row, i) => row.map((v, j) => Math.abs(v - B[i][j]))));

function inversePositive(A) {
  if (A.length === 1) {
    if (!(A[0][0] > 0)) throw new RangeError("事後精度が正でありません");
    return [[1 / A[0][0]]];
  }
  const [[a, b], [c, d]] = A;
  const det = a * d - b * c;
  if (!(a > 0 && det > 0)) throw new RangeError("事後精度が正定値ではありません");
  return [[d / det, -b / det], [-c / det, a / det]];
}

function factorLoading(q, angle) {
  const initial = q === 1 ? [[2], [1]] : [[2, 0], [1, 1.5]];
  if (q === 1) return initial;
  const a = angle * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
  return multiply(initial, [[c, -s], [s, c]]);
}

function eigen2(C) {
  const a = C[0][0], b = C[0][1], d = C[1][1];
  const gap = Math.hypot(a - d, 2 * b);
  const lambda = [(a + d + gap) / 2, (a + d - gap) / 2];
  const theta = .5 * Math.atan2(2 * b, a - d);
  return { values: lambda, major: [Math.cos(theta), Math.sin(theta)], minor: [-Math.sin(theta), Math.cos(theta)] };
}

export function evaluatePPCA(config = defaultConfig) {
  const c = {...defaultConfig, ...config};
  valid(c);
  const W = factorLoading(c.q, c.angle);
  const W0 = factorLoading(c.q, 0);
  const latent = multiply(W, transpose(W));
  const C = add(latent, [[c.noise, 0], [0, c.noise]]);
  const precision = add(identity(c.q), multiply(transpose(W), W).map(row => row.map(v => v / c.noise)));
  const posteriorCov = inversePositive(precision);
  const x = [[c.x1], [c.x2]];
  const posteriorMean = multiply(multiply(posteriorCov, transpose(W)), x).map(row => row[0] / c.noise);
  const reconstructed = multiply(W, posteriorMean.map(v => [v])).map(row => row[0]);
  const unrotatedC = add(multiply(W0, transpose(W0)), [[c.noise, 0], [0, c.noise]]);
  const unrotatedV = inversePositive(add(identity(c.q), multiply(transpose(W0), W0).map(row => row.map(v => v / c.noise))));
  const unrotatedM = multiply(multiply(unrotatedV, transpose(W0)), x).map(row => row[0] / c.noise);
  const unrotatedReconstruction = multiply(W0, unrotatedM.map(v => [v])).map(row => row[0]);
  const eigen = eigen2(C);
  const determinant = C[0][0] * C[1][1] - C[0][1] ** 2;
  if (!(determinant > 0)) throw new RangeError("観測共分散が正定値ではありません");
  const pc = eigen.major;
  const projected = c.q === 1 ? pc.map(v => v * (pc[0] * c.x1 + pc[1] * c.x2)) : [c.x1, c.x2];
  return {
    W, latent, C, posteriorMean, posteriorCov, reconstructed, projected,
    eigen, determinant,
    rotationCovarianceError: maxDiff(C, unrotatedC),
    rotationReconstructionError: Math.max(...reconstructed.map((v, i) => Math.abs(v - unrotatedReconstruction[i]))),
  };
}

export function ellipsePoints(eigen, radius = 2, samples = 120) {
  if (!(radius > 0 && Number.isInteger(samples) && samples >= 8 && samples <= 1000)) throw new RangeError("楕円設定が不正です");
  return Array.from({length:samples + 1}, (_, i) => {
    const angle = 2 * Math.PI * i / samples;
    const along = radius * Math.sqrt(eigen.values[0]) * Math.cos(angle);
    const across = radius * Math.sqrt(eigen.values[1]) * Math.sin(angle);
    return [eigen.major[0] * along + eigen.minor[0] * across,
      eigen.major[1] * along + eigen.minor[1] * across];
  });
}
