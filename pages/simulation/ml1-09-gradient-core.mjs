// Deterministic two-dimensional quadratic optimization kernel for ML1-09.
// f(x,y) = (m*x*x + L*y*y)/2, with 0 < m <= L.
// No DOM, timing, random data, or network dependencies.
export function validateConfig(value) {
  const { m, L, alpha, x0, y0 } = value;
  if (![m, L, alpha, x0, y0].every(Number.isFinite)) {
    throw new RangeError("入力は有限の実数にしてください。");
  }
  if (!(m > 0 && L >= m && L <= 100 && alpha > 0 && alpha <= 20 &&
        Math.abs(x0) <= 5 && Math.abs(y0) <= 5)) {
    throw new RangeError("0 < m ≤ L ≤ 100、0 < 歩幅 ≤ 20、初期座標は±5にしてください。");
  }
  return { m, L, alpha, x0, y0 };
}
export function objective(x, y, m, L) {
  return (m * x * x + L * y * y) / 2;
}
export function initial(config) {
  const p = validateConfig(config);
  return { k: 0, x: p.x0, y: p.y0, f: objective(p.x0, p.y0, p.m, p.L) };
}
export function next(config, state) {
  const { m, L, alpha } = validateConfig(config);
  if (state.k >= 200) throw new RangeError("200反復の上限に達しました。");
  const x = state.x * (1 - alpha * m);
  const y = state.y * (1 - alpha * L);
  const f = objective(x, y, m, L);
  if (![x, y, f].every(Number.isFinite) || f > 1e12 || Math.abs(x) > 1e6 || Math.abs(y) > 1e6) {
    throw new RangeError("数値発散のため停止しました。歩幅を小さくしてください。");
  }
  return { k: state.k + 1, x, y, f };
}
export function run(config, iterations = 20) {
  if (!Number.isInteger(iterations) || iterations < 0 || iterations > 200)
    throw new RangeError("反復回数は0〜200の整数にしてください。");
  const points = [initial(config)];
  for (let k = 0; k < iterations; k++) points.push(next(config, points.at(-1)));
  return points;
}
export function safety(config) {
  const { L, alpha } = validateConfig(config);
  if (alpha < 2 / L) return "単調非増加が保証される歩幅";
  if (alpha === 2 / L) return "境界：減少の保証はない";
  return "安全域外：損失増加・発散の可能性";
}
