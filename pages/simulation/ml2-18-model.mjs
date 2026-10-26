// Three-token, two-feature, two-head attention. No external packages or randomness.
export const defaultTokens = [[1, 0], [0, 1], [1, 1]];
export const defaultHeads = [
  { q: [1, 0], k: [1, 0], v: [1, 0] },
  { q: [0, 1], k: [0, 1], v: [0, 1] }
];
export const swapFirstLast = rows => [rows[2].slice(), rows[1].slice(), rows[0].slice()];

function finiteVector(values, size, name) {
  if (!Array.isArray(values) || values.length !== size ||
      !values.every(v => typeof v === "number" && Number.isFinite(v) && Math.abs(v) <= 100)) {
    throw new RangeError(name + " は " + size + " 個の有限数（絶対値100以下）としてください");
  }
}
function dot(a, b) { return a.reduce((sum, value, index) => sum + value * b[index], 0); }
function allowedIndices(mode, i) {
  if (mode === "all") return [0, 1, 2];
  if (mode === "causal") return Array.from({ length: i + 1 }, (_, j) => j);
  if (mode === "padding") return [0, 1];
  throw new RangeError("不正なマスク指定です");
}

export function attentionHead(rows, head, mode = "all") {
  if (!Array.isArray(rows) || rows.length !== 3) throw new RangeError("トークンは3行必要です");
  rows.forEach((row, i) => finiteVector(row, 2, "トークン" + (i + 1)));
  for (const name of ["q", "k", "v"]) finiteVector(head?.[name], 2, name);
  const q = rows.map(row => dot(row, head.q));
  const k = rows.map(row => dot(row, head.k));
  const v = rows.map(row => dot(row, head.v));
  const scores = q.map(value => k.map(key => value * key)); // sqrt(k_dim) = sqrt(1)
  const weights = scores.map((row, i) => {
    const indices = allowedIndices(mode, i);
    if (!indices.length) throw new RangeError("許可された参照列がない行は定義できません");
    const maxScore = Math.max(...indices.map(j => row[j]));
    const unnormalized = indices.map(j => Math.exp(row[j] - maxScore));
    const denom = unnormalized.reduce((a, b) => a + b, 0);
    if (!(denom > 0)) throw new RangeError("softmax の分母が正になりません");
    const weightRow = [0, 0, 0];
    indices.forEach((j, l) => { weightRow[j] = unnormalized[l] / denom; });
    return weightRow;
  });
  const output = weights.map(row => dot(row, v));
  return { q, k, v, scores, weights, output };
}

export function attentionExperiment({ tokens = defaultTokens, heads = defaultHeads,
  mask = "all", positionStrength = 0, swapped = false } = {}) {
  if (!Array.isArray(tokens) || tokens.length !== 3) throw new RangeError("トークンは3行必要です");
  tokens.forEach((row, i) => finiteVector(row, 2, "トークン" + (i + 1)));
  if (!Array.isArray(heads) || heads.length !== 2) throw new RangeError("headは2個必要です");
  if (typeof positionStrength !== "number" || !Number.isFinite(positionStrength) ||
      Math.abs(positionStrength) > 100) throw new RangeError("位置強度は有限数（絶対値100以下）です");
  const input = swapped ? swapFirstLast(tokens) : tokens.map(row => row.slice());
  const positions = [[0, 0], [0, positionStrength], [positionStrength, 0]];
  const rows = input.map((row, i) => row.map((val, j) => val + positions[i][j]));
  const results = heads.map(head => attentionHead(rows, head, mask));
  const concatenated = rows.map((_, i) => results.map(r => r.output[i]));
  // Output projection W_O = I_2; residual uses the actual position-augmented input.
  const residual = rows.map((row, i) => row.map((val, j) => val + concatenated[i][j]));
  if (!residual.flat().every(Number.isFinite)) throw new RangeError("演算が桁あふれしました");
  return { input, positions, rows, results, concatenated, residual,
    validQueries: mask === "padding" ? [true, true, false] : [true, true, true] };
}

export function permutationComparison(params = {}) {
  const base = attentionExperiment({ ...params, swapped: false });
  const swapped = attentionExperiment({ ...params, swapped: true });
  const expected = swapFirstLast(base.residual);
  const errors = swapped.residual.map((row, i) => row.map((val, j) => val - expected[i][j]));
  return { base, swapped, expected, errors,
    maxDifference: Math.max(...errors.flat().map(Math.abs)) };
}

// Scalar L = sum_i upstream_i * output_i for one head.
// Gradients w.r.t. the three two-component projection vectors.
export function headGradient(rows, head, upstream, mode = "all") {
  finiteVector(upstream, 3, "上流勾配");
  const result = attentionHead(rows, head, mode);
  const dq = [0, 0], dk = [0, 0], dv = [0, 0];
  for (let i = 0; i < 3; i++) {
    const mean = result.output[i];
    for (let j = 0; j < 3; j++) {
      const a = result.weights[i][j];
      // dL/dscore_ij = upstream_i * a_ij * (v_j - output_i)
      const ds = upstream[i] * a * (result.v[j] - mean);
      for (let c = 0; c < 2; c++) {
        dq[c] += ds * result.k[j] * rows[i][c];
        dk[c] += ds * result.q[i] * rows[j][c];
        dv[c] += upstream[i] * a * rows[j][c];
      }
    }
  }
  return { dq, dk, dv };
}
