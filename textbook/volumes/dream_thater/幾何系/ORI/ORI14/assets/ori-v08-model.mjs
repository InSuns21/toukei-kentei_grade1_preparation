// 扇形の等長な平坦配置の「構成図」。時刻は幾何学的に連続する折り運動を意味しない。
export const EXAMPLES = Object.freeze({
  valid: Object.freeze([60, 120, 120, 60]),
  invalid: Object.freeze([60, 120, 60, 120])
});
export function angularWalk(angles) {
  if (angles.length < 2 || angles.length % 2 !== 0 || angles.some(a => !Number.isFinite(a) || a <= 0)) {
    throw new RangeError('偶数個の正の扇形角が必要です');
  }
  const original = [0];
  const alternating = [0];
  for (let j = 0; j < angles.length; j++) {
    original.push(original[j] + angles[j]);
    alternating.push(alternating[j] + (j % 2 === 0 ? 1 : -1) * angles[j]);
  }
  const odd = angles.filter((_, i) => i % 2 === 0).reduce((sum, a) => sum + a, 0);
  const even = angles.filter((_, i) => i % 2 === 1).reduce((sum, a) => sum + a, 0);
  return { angles, original, alternating, odd, even, closed: odd === 180 && even === 180 && original.at(-1) === 360 };
}
export function construction(example = 'valid') {
  const angles = EXAMPLES[example];
  if (!angles) throw new RangeError('未定義の例');
  const source = angularWalk(angles);
  // 閉じる場合は偶数番目の交互途中和が最小の位置から巡回開始（ORI14補題）。
  const evenPrefixes = source.alternating.slice(0, -1).map((angle, index) => ({ angle, index })).filter(item => item.index % 2 === 0);
  const start = source.closed ? evenPrefixes.reduce((best, item) => item.angle < best.angle ? item : best).index : 0;
  const rotated = angles.map((_, i) => angles[(i + start) % angles.length]);
  const placed = angularWalk(rotated);
  return { source, placed, start, rotated, example };
}
export function sectorPath(cx, cy, radius, fromDeg, toDeg) {
  const point = angle => {
    const rad = angle * Math.PI / 180;
    return [cx + radius * Math.cos(rad), cy - radius * Math.sin(rad)];
  };
  const [x1, y1] = point(fromDeg);
  const [x2, y2] = point(toDeg);
  const sweep = toDeg >= fromDeg ? 0 : 1;
  const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${radius} ${radius} 0 ${large} ${sweep} ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
}
export function stageAt(t, example = 'valid') {
  if (!Number.isFinite(t) || t < 0 || t > 1) throw new RangeError('t は 0 以上 1 以下');
  const geometry = construction(example);
  return {
    ...geometry, t,
    // 段階ごとの可視率のみが変わる。扇形像の位置・角度は常に正確な完成配置。
    visibility: geometry.rotated.map((_, i) => Math.max(0, Math.min(1, 4 * t - i)))
  };
}
