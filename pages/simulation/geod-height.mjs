// Educational local height/gravimetry columns for GEOD6 and GEOD10.
// Each station has its own locally parallel ellipsoid/geoid/plumb-line model.
// The line joining stations is a *drawing*, not a solved 2D gravity field.
export const HEIGHT_REFERENCE = Object.freeze({ distanceKm: 20, gamma0: 9.80665 });

const bounded = (value, min, max, name) => {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new RangeError(name + 'は ' + min + '〜' + max + ' の有限数を指定してください');
  }
  return value;
};

export function syntheticHeightProfile({
  geoidAtA = 35.2, geoidChange = -8,
  ellipsoidalAtA = 123.4, ellipsoidalAtB = 150,
  gravityAtA = 9.8, gravityChange = 0.02, gradientMicro = 3,
} = {}) {
  const na = bounded(geoidAtA, -100, 100, 'ジオイド高N_A');
  const dn = bounded(geoidChange, -80, 80, 'ジオイド高の差ΔN');
  const ha = bounded(ellipsoidalAtA, -30, 1000, '楕円体高h_A');
  const hb = bounded(ellipsoidalAtB, -30, 1000, '楕円体高h_B');
  const ga = bounded(gravityAtA, 9, 10, 'A地点の重力g0');
  const dg = bounded(gravityChange, -0.2, 0.2, '重力差Δg0');
  const gradient = bounded(gradientMicro, 0, 6, '鉛直重力勾配') * 1e-6;

  // W(s) = W0 - g0*s + (gradient/2)*s^2, where s is signed upward
  // distance from this station's local geoid. Hence C = W0 - W(P).
  const station = (id, h, N, g0) => {
    const H = h - N;
    const gTop = g0 - gradient * H;
    if (Math.min(g0, gTop) <= 0) {
      throw new RangeError(id + '地点の鉛直区間で重力が正になりません');
    }
    const meanGravity = g0 - gradient * H / 2;
    const C = g0 * H - gradient * H ** 2 / 2;
    return { id, h, N, H, g0, gTop, meanGravity, C,
      dynamicHeight: C / HEIGHT_REFERENCE.gamma0,
      identityResidual: h - (H + N),
      potentialResidual: C - meanGravity * H };
  };

  const A = station('A', ha, na, ga);
  const B = station('B', hb, na + dn, ga + dg);
  const difference = { h: B.h - A.h, N: B.N - A.N, H: B.H - A.H,
    C: B.C - A.C, dynamicHeight: B.dynamicHeight - A.dynamicHeight };
  return { A, B, difference, gradient, ...HEIGHT_REFERENCE,
    heightDifferenceResidual: difference.H - (difference.h - difference.N) };
}
