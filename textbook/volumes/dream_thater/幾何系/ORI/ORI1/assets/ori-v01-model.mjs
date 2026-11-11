// 単位は長さ任意、角度 rad。鉛直な折り線 x=0 の周囲の3D回転。
export const POINTS = Object.freeze({
  P: Object.freeze({ x: 1.8, y: 0.5, z: 0 }),
  B: Object.freeze({ x: 1.8, y: 2, z: 0 }),
  Q: Object.freeze({ x: 0, y: 0.5, z: 0 })
});
export function foldPoint(point, t) {
  if (!Number.isFinite(t) || t < 0 || t > 1) throw new RangeError('t は 0 以上 1 以下');
  const theta = Math.PI * t;
  return { x: point.x * Math.cos(theta), y: point.y, z: point.x * Math.sin(theta) };
}
export function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
}
export function stateAt(t) {
  const P = foldPoint(POINTS.P, t);
  const B = foldPoint(POINTS.B, t);
  const Q = foldPoint(POINTS.Q, t);
  return {
    t, theta: Math.PI * t, P, B, Q,
    creaseDistance: distance(P, Q),
    panelDistance: distance(P, B),
    stationaryCrease: Q.x === 0 && Q.z === 0
  };
}
export function project({ x, y, z }) {
  // x-y 平面を斜め上から見る平行投影。長さ検算は投影前の3D座標で行う。
  return [335 + 83 * x + 18 * y, 272 - 75 * z - 19 * y];
}
export function polygon(points) {
  return points.map(point => project(point).map(n => n.toFixed(2)).join(',')).join(' ');
}
