// GEOD geodesy lab: metre/radian calculations, independent of all rendering.
// Coordinate order is always (geodetic latitude, longitude); map order (E,Np).
import { GeographicLibGeodesic } from './vendor/geographiclib-geodesic.mjs';
export const GRS80 = Object.freeze({ a: 6378137, f: 1 / 298.257222101 });
export const DEG = Math.PI / 180;
export const rad = degrees => degrees * DEG;
export const deg = radians => radians / DEG;
export const wrapLongitude = angle => Math.atan2(Math.sin(angle), Math.cos(angle));

export function ellipsoid(a = GRS80.a, f = GRS80.f) {
  if (!(Number.isFinite(a) && a > 0 && Number.isFinite(f) && f >= 0 && f < 1)) {
    throw new RangeError('楕円体の a>0, 0<=f<1 を指定してください');
  }
  return { a, f, b: a * (1 - f), e2: f * (2 - f) };
}

export function radii(phi, e = ellipsoid()) {
  const w = 1 - e.e2 * Math.sin(phi) ** 2;
  return {
    M: e.a * (1 - e.e2) / w ** 1.5,
    N: e.a / Math.sqrt(w),
    r: e.a * Math.cos(phi) / Math.sqrt(w),
  };
}

export function ecef(phi, lambda, h = 0, e = ellipsoid()) {
  const { N } = radii(phi, e), cp = Math.cos(phi);
  return [(N + h) * cp * Math.cos(lambda),
    (N + h) * cp * Math.sin(lambda),
    (N * (1 - e.e2) + h) * Math.sin(phi)];
}

export function enuBasis(phi, lambda) {
  const sp = Math.sin(phi), cp = Math.cos(phi), sl = Math.sin(lambda), cl = Math.cos(lambda);
  return {
    east: [-sl, cl, 0],
    north: [-sp * cl, -sp * sl, cp],
    up: [cp * cl, cp * sl, sp],
  };
}

export const dot = (x, y) => x.reduce((sum, v, i) => sum + v * y[i], 0);
export const norm = x => Math.sqrt(dot(x, x));

export function geocentricLatitude(phi, e = ellipsoid()) {
  const [x, y, z] = ecef(phi, 0, 0, e);
  return Math.atan2(z, Math.hypot(x, y));
}

export function inverseECEF(x, y, z, e = ellipsoid()) {
  if (![x, y, z].every(Number.isFinite) || Math.hypot(x, y, z) === 0) {
    throw new RangeError('非零かつ有限な地心座標が必要です');
  }
  const p = Math.hypot(x, y), lambda = Math.atan2(y, x);
  if (p < 1e-9) return { phi: Math.sign(z) * Math.PI / 2, lambda: 0, h: Math.abs(z) - e.b };
  let phi = Math.atan2(z, p * (1 - e.e2)), h = 0;
  for (let i = 0; i < 16; i++) {
    const N = radii(phi, e).N;
    h = p / Math.cos(phi) - N;
    const next = Math.atan2(z + e.e2 * N * Math.sin(phi), p);
    if (Math.abs(next - phi) < 2e-15) { phi = next; break; }
    phi = next;
  }
  h = p / Math.cos(phi) - radii(phi, e).N;
  return { phi, lambda, h };
}

const geodesicEngineCache = new Map();
const geodesicEngine = e => {
  const key = `${e.a}/${e.f}`;
  if (!geodesicEngineCache.has(key)) {
    geodesicEngineCache.set(key, new GeographicLibGeodesic.Geodesic.Geodesic(e.a, e.f));
  }
  return geodesicEngineCache.get(key);
};

const validateGeodesicEndpoints = (phi1, lon1, phi2, lon2) => {
  if ([phi1, phi2, lon1, lon2].some(v => !Number.isFinite(v)) ||
      Math.abs(phi1) >= Math.PI / 2 || Math.abs(phi2) >= Math.PI / 2) {
    throw new RangeError('両端は極を除く有限な測地緯度・経度で指定します');
  }
};

// Karney's sixth-order ellipsoidal geodesic solver handles antipodal and
// near-polar routes and selects a shortest geodesic. For exactly antipodal
// pairs multiple shortest azimuths can exist; this returns one of them.
export function inverseGeodesic(phi1, lon1, phi2, lon2, e = ellipsoid()) {
  validateGeodesicEndpoints(phi1, lon1, phi2, lon2);
  if (Math.abs(phi1 - phi2) < 1e-15 &&
      Math.abs(wrapLongitude(lon2 - lon1)) < 1e-15) {
    return { distance: 0, azimuth: null, finalAzimuth: null,
      method: 'Karney', iterations: null };
  }
  const r = geodesicEngine(e).Inverse(deg(phi1), deg(lon1), deg(phi2), deg(lon2));
  if (![r.s12, r.azi1, r.azi2].every(Number.isFinite)) {
    throw new RangeError('ELLIPSOID_INVERSE_UNRESOLVED: geodesic solver produced nonfinite data');
  }
  return { distance: r.s12, azimuth: rad(r.azi1), finalAzimuth: rad(r.azi2),
    method: 'Karney', iterations: null };
}

// Retained as a classroom comparison. Vincenty converges on most pairs but
// may fail near antipodes; its failure is not a failure of the geodesic itself.
export function vincentyInverseGeodesic(phi1, lon1, phi2, lon2, e = ellipsoid()) {
  validateGeodesicEndpoints(phi1, lon1, phi2, lon2);
  const L = wrapLongitude(lon2 - lon1);
  if (Math.abs(phi1 - phi2) < 1e-15 && Math.abs(L) < 1e-15) {
    return { distance: 0, azimuth: null, finalAzimuth: null, iterations: 0 };
  }
  const U1 = Math.atan((1 - e.f) * Math.tan(phi1));
  const U2 = Math.atan((1 - e.f) * Math.tan(phi2));
  const s1 = Math.sin(U1), c1 = Math.cos(U1), s2 = Math.sin(U2), c2 = Math.cos(U2);
  let lambda = L, sinSigma, cosSigma, sigma, sinAlpha, cos2Alpha, cos2SigmaM;
  let iter = 0, converged = false;
  for (; iter < 160; iter++) {
    const sl = Math.sin(lambda), cl = Math.cos(lambda);
    sinSigma = Math.hypot(c2 * sl, c1 * s2 - s1 * c2 * cl);
    cosSigma = s1 * s2 + c1 * c2 * cl;
    if (sinSigma < 1e-16) {
      return cosSigma > 0
        ? { distance: 0, azimuth: null, finalAzimuth: null, iterations: iter }
        : { error: 'ANTIPODAL_NONCONVERGENCE', iterations: iter };
    }
    sigma = Math.atan2(sinSigma, cosSigma);
    sinAlpha = c1 * c2 * sl / sinSigma;
    cos2Alpha = Math.max(0, 1 - sinAlpha ** 2);
    cos2SigmaM = cos2Alpha > 1e-15 ? cosSigma - 2 * s1 * s2 / cos2Alpha : 0;
    const C = e.f / 16 * cos2Alpha * (4 + e.f * (4 - 3 * cos2Alpha));
    const next = L + (1 - C) * e.f * sinAlpha *
      (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM ** 2)));
    if (Math.abs(next - lambda) <= 1e-12) { lambda = next; converged = true; break; }
    lambda = next;
  }
  if (!converged) return { error: 'ANTIPODAL_NONCONVERGENCE', iterations: iter };
  // Re-evaluate final lambda so azimuths and length use the same root.
  const sl = Math.sin(lambda), cl = Math.cos(lambda);
  sinSigma = Math.hypot(c2 * sl, c1 * s2 - s1 * c2 * cl);
  cosSigma = s1 * s2 + c1 * c2 * cl;
  sigma = Math.atan2(sinSigma, cosSigma);
  sinAlpha = c1 * c2 * sl / sinSigma;
  cos2Alpha = Math.max(0, 1 - sinAlpha ** 2);
  cos2SigmaM = cos2Alpha > 1e-15 ? cosSigma - 2 * s1 * s2 / cos2Alpha : 0;
  const u2 = cos2Alpha * (e.a ** 2 - e.b ** 2) / (e.b ** 2);
  const A = 1 + u2 / 16384 * (4096 + u2 * (-768 + u2 * (320 - 175 * u2)));
  const B = u2 / 1024 * (256 + u2 * (-128 + u2 * (74 - 47 * u2)));
  const delta = B * sinSigma * (cos2SigmaM + B / 4 *
    (cosSigma * (-1 + 2 * cos2SigmaM ** 2) -
      B / 6 * cos2SigmaM * (-3 + 4 * sinSigma ** 2) * (-3 + 4 * cos2SigmaM ** 2)));
  return {
    distance: e.b * A * (sigma - delta),
    azimuth: Math.atan2(c2 * sl, c1 * s2 - s1 * c2 * cl),
    finalAzimuth: Math.atan2(c1 * sl, -s1 * c2 + c1 * s2 * cl),
    iterations: iter + 1,
  };
}

// GeographicLib's direct geodesic line avoids the (phi,lambda,azimuth)
// coordinate singularity of the independent Clairaut RK4 tracer at a pole.
// Only sample points are used in the 3D illustration; distance and azimuth
// are returned independently by inverseGeodesic.
export function traceGeodesicRobust(phi, lambda, azimuth, distance, e = ellipsoid(), steps) {
  if (![phi, lambda, azimuth, distance].every(Number.isFinite) ||
      distance < 0 || Math.abs(phi) >= Math.PI / 2) {
    throw new RangeError('有限で非負の距離と非極点の始点・方位角が必要です');
  }
  const count = steps ?? Math.max(80, Math.min(1800, Math.ceil(distance / 20000)));
  if (!Number.isSafeInteger(count) || count < 1 || count > 10000) {
    throw new RangeError('経路点数は1〜10000を指定します');
  }
  const line = geodesicEngine(e).Line(deg(phi), deg(lambda), deg(azimuth));
  const startC = radii(phi, e).r * Math.sin(azimuth);
  const points = [[phi, wrapLongitude(lambda)]];
  let maxDrift = 0, last;
  for (let i = 1; i <= count; i++) {
    const p = line.Position(distance * i / count);
    if (![p.lat2, p.lon2, p.azi2].every(Number.isFinite)) {
      throw new RangeError('ELLIPSOID_LINE_UNRESOLVED: nonfinite point');
    }
    const latitude = rad(p.lat2), longitude = wrapLongitude(rad(p.lon2));
    points.push([latitude, longitude]);
    maxDrift = Math.max(maxDrift,
      Math.abs(radii(latitude, e).r * Math.sin(rad(p.azi2)) - startC) / e.a);
    last = { phi: latitude, lambda: longitude, azimuth: rad(p.azi2) };
  }
  return { points, ...last, maxDrift, method: 'Karney line' };
}

// RK4 integrates the GEOD12 Clairaut system independently of Vincenty's
// inverse. The returned maxDrift is a dimensionless conservation diagnostic.
export function traceGeodesic(phi, lambda, azimuth, distance, e = ellipsoid(), steps) {
  if (!(Number.isFinite(distance) && distance >= 0 && Math.abs(phi) < Math.PI / 2)) {
    throw new RangeError('有限で非負の距離と非極点の始点が必要です');
  }
  const count = steps ?? Math.max(80, Math.min(1800, Math.ceil(distance / 20000)));
  const h = distance / count, startC = radii(phi, e).r * Math.sin(azimuth);
  const slope = ([p, , a]) => {
    const { M, r } = radii(p, e);
    if (Math.abs(Math.cos(p)) < 1e-4) throw new RangeError('POLE_CHART_SINGULARITY');
    return [Math.cos(a) / M, Math.sin(a) / r, Math.sin(p) * Math.sin(a) / r];
  };
  const add = (p, v, factor) => p.map((x, i) => x + factor * v[i]);
  let y = [phi, lambda, azimuth], maxDrift = 0;
  const points = [[phi, lambda]];
  for (let i = 0; i < count; i++) {
    const k1 = slope(y), k2 = slope(add(y, k1, h / 2));
    const k3 = slope(add(y, k2, h / 2)), k4 = slope(add(y, k3, h));
    y = y.map((x, j) => x + h / 6 * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]));
    points.push([y[0], y[1]]);
    const C = radii(y[0], e).r * Math.sin(y[2]);
    maxDrift = Math.max(maxDrift, Math.abs(C - startC) / e.a);
  }
  return { points, phi: y[0], lambda: wrapLongitude(y[1]), azimuth: y[2], maxDrift };
}

// Karney/Krueger n-series to n^6; local ellipsoidal transverse Mercator.
// This is a local projection, deliberately rejects distant/branched inputs.
export function transverseMercator(phi, lambda, options = {}) {
  const { e = ellipsoid(), lon0 = 0, lat0 = 0, k0 = 0.9999 } = options;
  const dl = wrapLongitude(lambda - lon0);
  if (![phi, lambda, lon0, lat0, k0].every(Number.isFinite) ||
      !(k0 > 0) || Math.abs(phi) > rad(80) || Math.abs(lat0) > rad(80) ||
      Math.abs(dl) > rad(25)) {
    throw new RangeError('TM_LOCAL_DOMAIN: |緯度|≤80°, |中央子午線との差|≤25°, k0>0');
  }
  const n = e.f / (2 - e.f), n2 = n * n, n3 = n2 * n;
  const n4 = n2 * n2, n5 = n4 * n, n6 = n3 * n3;
  const A = e.a / (1 + n) * (1 + n2 / 4 + n4 / 64 + n6 / 256);
  const alphas = [
    n / 2 - 2 * n2 / 3 + 5 * n3 / 16 + 41 * n4 / 180 - 127 * n5 / 288 + 7891 * n6 / 37800,
    13 * n2 / 48 - 3 * n3 / 5 + 557 * n4 / 1440 + 281 * n5 / 630 - 1983433 * n6 / 1935360,
    61 * n3 / 240 - 103 * n4 / 140 + 15061 * n5 / 26880 + 167603 * n6 / 181440,
    49561 * n4 / 161280 - 179 * n5 / 168 + 6601661 * n6 / 7257600,
    34729 * n5 / 80640 - 3418889 * n6 / 1995840,
    212378941 * n6 / 319334400,
  ];
  const raw = (latitude, longitudeDifference) => {
    const tau = Math.tan(latitude), ecc = Math.sqrt(e.e2);
    const sigma = Math.sinh(ecc * Math.atanh(ecc * tau / Math.hypot(1, tau)));
    const tauPrime = tau * Math.hypot(1, sigma) - sigma * Math.hypot(1, tau);
    const xi0 = Math.atan2(tauPrime, Math.cos(longitudeDifference));
    const eta0 = Math.asinh(Math.sin(longitudeDifference) /
      Math.hypot(tauPrime, Math.cos(longitudeDifference)));
    let xi = xi0, eta = eta0;
    alphas.forEach((alpha, i) => {
      const p = 2 * (i + 1);
      xi += alpha * Math.sin(p * xi0) * Math.cosh(p * eta0);
      eta += alpha * Math.cos(p * xi0) * Math.sinh(p * eta0);
    });
    return [xi, eta];
  };
  const [xi, eta] = raw(phi, dl), [xiOrigin] = raw(lat0, 0);
  return { E: k0 * A * eta, Np: k0 * A * (xi - xiOrigin) };
}

// Differentiate the actual numerical forward map. M and r (metres/radian)
// convert its Jacobian into the physical N/E unit tangent frame.
export function projectionDistortion(phi, lambda, options = {}) {
  const e = options.e ?? ellipsoid(), d = 2e-6;
  const f = (p, l) => transverseMercator(p, l, options);
  const pp = f(phi + d, lambda), pm = f(phi - d, lambda);
  const lp = f(phi, lambda + d), lm = f(phi, lambda - d);
  const ep = [(pp.E - pm.E) / (2 * d), (pp.Np - pm.Np) / (2 * d)];
  const el = [(lp.E - lm.E) / (2 * d), (lp.Np - lm.Np) / (2 * d)];
  const { M, r } = radii(phi, e);
  const u = ep.map(x => x / M), v = el.map(x => x / r);
  const g11 = dot(u, u), g22 = dot(v, v), g12 = dot(u, v);
  const discr = Math.hypot(g11 - g22, 2 * g12);
  const major = Math.sqrt(Math.max(0, (g11 + g22 + discr) / 2));
  const minor = Math.sqrt(Math.max(0, (g11 + g22 - discr) / 2));
  return {
    northVector: u, eastVector: v, major, minor,
    meridianScale: Math.sqrt(g11), parallelScale: Math.sqrt(g22),
    orthogonality: g12, areaScale: Math.abs(u[0] * v[1] - u[1] * v[0]),
    northBearingFromGrid: Math.atan2(u[0], u[1]),
  };
}
