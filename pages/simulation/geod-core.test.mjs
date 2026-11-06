import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEG, rad, ellipsoid, radii, ecef, enuBasis, norm, dot,
  inverseECEF, geocentricLatitude, inverseGeodesic, vincentyInverseGeodesic,
  traceGeodesic, traceGeodesicRobust,
  transverseMercator, projectionDistortion,
} from './geod-core.mjs';

const close = (actual, expected, tolerance, description) =>
  assert.ok(Math.abs(actual - expected) <= tolerance,
    description + ': ' + actual + ' ≠ ' + expected + ' (tol=' + tolerance + ')');
const grs = ellipsoid();

test('GRS80 constants and exact equator/pole curvature limits', () => {
  close(grs.a, 6378137, 0, 'a');
  close(1 / grs.f, 298.257222101, 1e-9, 'inverse flattening');
  close(radii(0, grs).N, grs.a, 1e-9, 'N(0)');
  close(radii(0, grs).M, grs.a * (1 - grs.e2), 1e-9, 'M(0)');
  close(radii(Math.PI / 2, grs).r, 0, 1e-8, 'r(pole)');
  assert.throws(() => ellipsoid(0), RangeError);
  assert.throws(() => ellipsoid(1, 1), RangeError);
});

test('ECEF and unit ENU are orthogonal, inverse is metre/angle accurate', () => {
  for (const p of [rad(-75), 0, rad(35), rad(70)]) {
    const lon = rad(139.7), h = 125.5, xyz = ecef(p, lon, h, grs);
    const rec = inverseECEF(...xyz, grs);
    close(rec.phi, p, 2e-14, 'latitude inverse');
    close(rec.lambda, lon, 2e-14, 'longitude inverse');
    close(rec.h, h, 2e-7, 'height inverse');
    const { east, north, up } = enuBasis(p, lon);
    for (const v of [east, north, up]) close(norm(v), 1, 1e-14, 'unit basis');
    close(dot(east, north), 0, 1e-14, 'E·N');
    close(dot(east, up), 0, 1e-14, 'E·U');
    close(dot(north, up), 0, 1e-14, 'N·U');
  }
});

test('sphere limit has coincident geocentric/geodetic latitudes', () => {
  const sphere = ellipsoid(grs.a, 0);
  for (const p of [-45, -20, 0, 20, 45]) close(geocentricLatitude(rad(p), sphere), rad(p), 2e-15, 'φ=ψ');
  assert.ok(geocentricLatitude(rad(45), grs) < rad(45));
});

test('ellipsoidal inverse equals analytical equatorial quarter circumference', () => {
  const inv = inverseGeodesic(0, 0, 0, Math.PI / 2, grs);
  close(inv.distance, Math.PI * grs.a / 2, .00001, 'equator arc');
  close(inv.azimuth, Math.PI / 2, 1e-13, 'eastward azimuth');
  assert.equal(inverseGeodesic(rad(15), rad(20), rad(15), rad(20)).distance, 0);
});

test('independent RK4 Clairaut geodesic reaches Karney inverse endpoint', () => {
  const p1 = rad(35.681236), l1 = rad(139.767125);
  const p2 = rad(43.06417), l2 = rad(141.34694);
  const inv = inverseGeodesic(p1, l1, p2, l2, grs);
  assert.ok(inv.distance > 800000 && inv.distance < 900000);
  const trace = traceGeodesic(p1, l1, inv.azimuth, inv.distance, grs);
  close(trace.phi, p2, 3e-9, 'endpoint latitude');
  close(trace.lambda, l2, 3e-9, 'endpoint longitude');
  assert.ok(trace.maxDrift < 1e-10, 'Clairaut integral drift');
  close(trace.points.length, Math.max(80, Math.ceil(inv.distance / 20000)) + 1, 0, 'sample count');
});

test('sphere forward ODE agrees with exact great-circle equatorial solution', () => {
  const sphere = ellipsoid(5000, 0);
  const path = traceGeodesic(0, 0, Math.PI / 2, 5000 * Math.PI / 3, sphere);
  close(path.phi, 0, 1e-13, 'latitude');
  close(path.lambda, Math.PI / 3, 1e-12, 'longitude');
  close(path.maxDrift, 0, 1e-13, 'Clairaut');
});

test('local transverse Mercator has correct centre, scale and sphere limit', () => {
  const lon0 = rad(139 + 50 / 60), lat0 = rad(36), k0 = .9999;
  const opts = { e: grs, lon0, lat0, k0 };
  let xy = transverseMercator(lat0, lon0, opts);
  close(xy.E, 0, 1e-9, 'origin Easting');
  close(xy.Np, 0, 1e-9, 'origin Northing');
  let d = projectionDistortion(lat0, lon0, opts);
  close(d.meridianScale, k0, 1e-8, 'central meridian scale');
  close(d.parallelScale, k0, 1e-8, 'central parallel scale');
  close(d.areaScale, k0 ** 2, 1e-8, 'central area scale');
  close(d.northBearingFromGrid, 0, 1e-9, 'central convergence');
  assert.ok(Math.abs(d.major - d.minor) < 1e-8);

  const R = 6378137, sphere = ellipsoid(R, 0);
  const phi = rad(32), dl = rad(8), base = rad(10), scale = .9996;
  xy = transverseMercator(phi, dl, { e: sphere, lat0: base, k0: scale });
  const ex = scale * R * Math.atanh(Math.cos(phi) * Math.sin(dl));
  const ny = scale * R * (Math.atan2(Math.tan(phi), Math.cos(dl)) - base);
  close(xy.E, ex, 2e-8, 'sphere transverse Mercator E');
  close(xy.Np, ny, 2e-8, 'sphere transverse Mercator N');
});

test('Krueger meridian northing agrees with independent Simpson integral', () => {
  const phi = rad(54), phi0 = rad(28), n = 2048, h = (phi - phi0) / n;
  let sum = radii(phi0).M + radii(phi).M;
  for (let i = 1; i < n; i++) sum += (i % 2 === 0 ? 2 : 4) * radii(phi0 + i * h).M;
  const arc = sum * h / 3;
  const { E, Np } = transverseMercator(phi, rad(137), {
    e: grs, lon0: rad(137), lat0: phi0, k0: .9999,
  });
  close(E, 0, 1e-8, 'meridian E');
  close(Np, arc * .9999, .001, 'meridian arc Simpson independent');
});

test('PROJ published Gauss-Boaga sample checks an external projection value', () => {
  // PROJ documentation, +proj=tmerc +lon_0=15 +k_0=0.9996
  // +x_0=2520000 +ellps=intl, input longitude=15 latitude=42.
  // Published output: (2520000.00, 4649858.60) m.
  // https://proj.org/en/stable/operations/projections/tmerc.html
  const intl = ellipsoid(6378388, 1 / 297);
  const projected = transverseMercator(rad(42), rad(15), {
    e: intl, lon0: rad(15), k0: .9996,
  });
  close(projected.E + 2520000, 2520000, .005, 'PROJ reference easting');
  close(projected.Np, 4649858.60, .01, 'PROJ reference northing');
});

test('local conformality and area near off-meridian point', () => {
  const opts = { e: grs, lon0: rad(139 + 50 / 60), lat0: rad(36), k0: .9999 };
  const d = projectionDistortion(rad(36.5), rad(143), opts);
  close(d.meridianScale, d.parallelScale, 2e-8, 'isotropy');
  assert.ok(Math.abs(d.orthogonality) < 3e-8, 'physical N/E remain orthogonal');
  close(d.areaScale, d.major * d.minor, 2e-8, 'Tissot singular-value determinant');
  assert.ok(d.major > 1, 'scale rises off central meridian');
  assert.ok(Math.abs(d.northBearingFromGrid) > rad(1), 'nonzero grid convergence');
});

test('domain and convergence failures are explicit', () => {
  assert.throws(() => transverseMercator(rad(85), 0), /TM_LOCAL_DOMAIN/);
  assert.throws(() => transverseMercator(0, rad(40)), /TM_LOCAL_DOMAIN/);
  assert.throws(() => traceGeodesic(Math.PI / 2, 0, 0, 1000), RangeError);
  const inverse = inverseGeodesic(rad(.5), 0, rad(-.5), rad(179.9));
  assert.ok(inverse.distance > 19_900_000 && inverse.distance < 20_100_000,
    'near-antipodal result must not be a spurious short arc');
  assert.throws(() => inverseGeodesic(NaN, 0, 0, 0), RangeError);
  assert.throws(() => traceGeodesicRobust(0, 0, Infinity, 1000), RangeError);
});

test('Karney 2013 table 4–6 nearly antipodal inverse agrees with independent published fixture', () => {
  // Karney (2013) tables 4–6, independently reproduced by Apache SIS
  // GeodesicsOnEllipsoidTest.testComputeNearlyAntipodal(). Uses WGS84, not GRS80.
  // https://apache.googlesource.com/sis/+/c912771e82dd54f05e594bc69c6e5d1a581346c0/endorsed/src/org.apache.sis.referencing/test/org/apache/sis/referencing/GeodesicsOnEllipsoidTest.java
  const wgs84 = ellipsoid(6378137, 1 / 298.257223563);
  const a = inverseGeodesic(rad(-30), 0, rad(29.9), rad(179.8), wgs84);
  close(a.distance, 19989832.827610, .002, 'distance published by Karney');
  close((a.azimuth / DEG + 360) % 360, 161.89052473633, 3e-9, 'initial azimuth');
  close((a.finalAzimuth / DEG + 360) % 360, 18.09073724574, 3e-9, 'final azimuth');
  assert.equal(a.method, 'Karney');
  const vincenty = vincentyInverseGeodesic(rad(-30), 0, rad(29.9), rad(179.8), wgs84);
  assert.equal(vincenty.error, 'ANTIPODAL_NONCONVERGENCE');
});

test('exact antipodes have a shortest meridian route, not Vincenty nonconvergence', () => {
  const wgs84 = ellipsoid(6378137, 1 / 298.257223563);
  const r = inverseGeodesic(0, 0, 0, Math.PI, wgs84);
  // GeographicLib's documented exact antipodal limit, half meridian.
  close(r.distance, 20003931.458625447, .002, 'half WGS84 meridian');
  assert.ok(Math.abs(Math.sin(r.azimuth)) < 1e-13, 'a shortest route passes over a pole');
  assert.ok(r.distance < Math.PI * wgs84.a, 'equatorial semicircle is longer');
  const path = traceGeodesicRobust(0, 0, r.azimuth, r.distance, wgs84, 160);
  close(path.points.at(-1)[0], 0, 1e-12, 'antipodal latitude');
  close(Math.abs(path.points.at(-1)[1]), Math.PI, 1e-12, 'antipodal longitude');
  assert.ok(path.maxDrift < 2e-12, 'Clairaut invariant');
  assert.ok(path.points.some(p => Math.abs(Math.abs(p[0]) - Math.PI / 2) < .02),
    'sampled shortest route crosses a pole');
});

test('polar and anti-meridian numerical traces close with inverse endpoint', () => {
  const routes = [
    [-30, 0, 29.9, 179.8],
    [40, 0, -40, 179.999],
    [84.7, 170, 84.6, -170],
    [-45, -179.999, 44.8, .002],
  ];
  for (const coords of routes) {
    const [p1, l1, p2, l2] = coords.map(rad);
    const inverse = inverseGeodesic(p1, l1, p2, l2);
    assert.ok(inverse.distance > 0 && inverse.distance <= Math.PI * grs.a);
    const sampled = traceGeodesicRobust(p1, l1, inverse.azimuth, inverse.distance);
    const actual = ecef(sampled.phi, sampled.lambda);
    const target = ecef(p2, l2);
    assert.ok(norm(actual.map((x, i) => x - target[i])) < .002,
      `direct-inverse closure for ${coords}: ${sampled.phi},${sampled.lambda}`);
    assert.ok(sampled.maxDrift < 1e-11);
    const reverse = inverseGeodesic(p2, l2, p1, l1);
    close(reverse.distance, inverse.distance, .002, 'distance reversibility');
  }
});
