// Global-projection lab kernel. The legacy spherical functions remain available
// for independent comparison. Ellipsoidal functions use authalic latitude and
// the GRS80 physical area element; all angles are radians and positions metres.
// Equal Earth formula: Savric, Patterson & Jenny (2018), authors' technical
// note https://shadedrelief.com/ee_proj/EEp_Math_and_Implementation_details_%202019-04-16.pdf
import { GRS80, ellipsoid, radii } from './geod-core.mjs';

const eccentricity = Math.sqrt(GRS80.f * (2 - GRS80.f));
export const AUTHALIC_RADIUS = GRS80.a * Math.sqrt((1 +
  (1 - eccentricity ** 2) * Math.atanh(eccentricity) / eccentricity) / 2);
export const GLOBAL_PROJECTIONS = Object.freeze({
  mercator: '楕円体Mercator（等角・非等積）',
  equalEarth: 'Equal Earth（等積）',
  mollweide: 'Mollweide（等積）',
});

const A1 = 1.340264, A2 = -.081106, A3 = .000893, A4 = .003796;
const s3 = Math.sqrt(3), s2 = Math.sqrt(2);

function authalicQ(phi, e) {
  const sine = Math.sin(phi);
  if (e.e2 === 0) return 2 * sine;
  const ecc = Math.sqrt(e.e2);
  return (1 - e.e2) * (sine / (1 - e.e2 * sine ** 2) +
    Math.atanh(ecc * sine) / ecc);
}

export function authalicLatitude(phi, e = ellipsoid()) {
  if (!Number.isFinite(phi) || Math.abs(phi) > Math.PI / 2)
    throw new RangeError('正積緯度の測地緯度は±90°以内です');
  return Math.asin(Math.max(-1, Math.min(1,
    authalicQ(phi, e) / authalicQ(Math.PI / 2, e))));
}

export function authalicRadius(e = ellipsoid()) {
  return e.a * Math.sqrt(authalicQ(Math.PI / 2, e) / 2);
}

export function ellipsoidalGlobalProjection(id, phi, lambda, e = ellipsoid()) {
  const R = authalicRadius(e);
  if (id === 'mercator') {
    if (!(Number.isFinite(phi) && Math.abs(phi) < Math.PI / 2 &&
      Number.isFinite(lambda))) throw new RangeError('楕円体Mercatorは極で発散します');
    const ecc = Math.sqrt(e.e2);
    return { x: R * lambda, y: R * (Math.asinh(Math.tan(phi)) -
      (ecc ? ecc * Math.atanh(ecc * Math.sin(phi)) : 0)) };
  }
  return globalProjection(id, authalicLatitude(phi, e), lambda, R);
}

function mollweideTheta(phi) {
  if (Math.abs(phi) === Math.PI / 2) return Math.sign(phi) * Math.PI / 2;
  const target = Math.PI * Math.sin(phi);
  let lo = -Math.PI / 2, hi = Math.PI / 2;
  for (let i = 0; i < 58; i++) {
    const mid = (lo + hi) / 2;
    if (2 * mid + Math.sin(2 * mid) < target) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

export function globalProjection(id, phi, lambda, R = AUTHALIC_RADIUS) {
  if (!(Number.isFinite(phi) && Math.abs(phi) <= Math.PI / 2 &&
    Number.isFinite(lambda) && Number.isFinite(R) && R > 0)) {
    throw new RangeError('有限な緯度・経度と正の球半径が必要です');
  }
  if (id === 'mercator') {
    if (Math.abs(phi) >= Math.PI / 2) throw new RangeError('Mercatorは極で発散します');
    return { x: R * lambda, y: R * Math.asinh(Math.tan(phi)) };
  }
  if (id === 'equalEarth') {
    const theta = Math.asin(s3 / 2 * Math.sin(phi)), t2 = theta * theta;
    const t6 = t2 ** 3;
    const derivative = A1 + 3 * A2 * t2 + t6 * (7 * A3 + 9 * A4 * t2);
    return {
      x: R * 2 * s3 * lambda * Math.cos(theta) / (3 * derivative),
      y: R * theta * (A1 + A2 * t2 + t6 * (A3 + A4 * t2)),
    };
  }
  if (id === 'mollweide') {
    const theta = mollweideTheta(phi);
    return { x: R * 2 * s2 / Math.PI * lambda * Math.cos(theta),
      y: R * s2 * Math.sin(theta) };
  }
  throw new RangeError('未対応の全球投影です: ' + id);
}

function distortionFromJacobian(project, phi, lambda, eastRadius, northRadius) {
  if (!(Number.isFinite(phi) && Math.abs(phi) <= 80 * Math.PI / 180)) {
    throw new RangeError('点ひずみの数値検算は緯度±80°以内です');
  }
  const h = 1e-6;
  const plusPhi = project(phi + h, lambda);
  const minusPhi = project(phi - h, lambda);
  const plusLon = project(phi, lambda + h);
  const minusLon = project(phi, lambda - h);
  const east = [(plusLon.x - minusLon.x) / (2 * h * eastRadius),
    (plusLon.y - minusLon.y) / (2 * h * eastRadius)];
  const north = [(plusPhi.x - minusPhi.x) / (2 * h * northRadius),
    (plusPhi.y - minusPhi.y) / (2 * h * northRadius)];
  const A = east[0] ** 2 + east[1] ** 2;
  const B = north[0] ** 2 + north[1] ** 2;
  const C = east[0] * north[0] + east[1] * north[1];
  const discriminant = Math.hypot(A - B, 2 * C);
  const major = Math.sqrt(Math.max(0, (A + B + discriminant) / 2));
  const minor = Math.sqrt(Math.max(0, (A + B - discriminant) / 2));
  const area = Math.abs(east[0] * north[1] - east[1] * north[0]);
  const maxAngularDistortion = 2 * Math.asin(Math.min(1, Math.max(0,
    (major - minor) / (major + minor))));
  return { east, north, major, minor, area, maxAngularDistortion,
    eastScale: Math.sqrt(A), northScale: Math.sqrt(B) };
}

export function globalDistortion(id, phi, lambda, R = AUTHALIC_RADIUS) {
  return distortionFromJacobian((p, l) => globalProjection(id, p, l, R),
    phi, lambda, R * Math.cos(phi), R);
}

export function ellipsoidalGlobalDistortion(id, phi, lambda, e = ellipsoid()) {
  const physical = radii(phi, e);
  return distortionFromJacobian((p, l) => ellipsoidalGlobalProjection(id, p, l, e),
    phi, lambda, physical.r, physical.M);
}
