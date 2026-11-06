import test from 'node:test';
import assert from 'node:assert/strict';
import { rad, ellipsoid } from './geod-core.mjs';
import { AUTHALIC_RADIUS, GLOBAL_PROJECTIONS, globalProjection,
  globalDistortion, authalicLatitude, authalicRadius,
  ellipsoidalGlobalProjection, ellipsoidalGlobalDistortion } from './geod-compare.mjs';

const close = (actual, expected, tol, message) =>
  assert.ok(Math.abs(actual - expected) < tol,
    `${message}: actual=${actual}, expected=${expected}`);

test('authalic radius agrees with the WGS84/GRS80 independent reference to millimetres', () => {
  close(AUTHALIC_RADIUS, 6371007.181, .002, 'authalic mean surface radius');
});

test('the same spherical equator is preserved by all three projections', () => {
  for (const id of Object.keys(GLOBAL_PROJECTIONS)) {
    const origin = globalProjection(id, 0, 0);
    close(origin.x, 0, 1e-8, `${id} x(0)`);
    close(origin.y, 0, 1e-8, `${id} y(0)`);
  }
  const m = globalProjection('mollweide', 0, rad(30), 1);
  close(m.x, 2 * Math.sqrt(2) / Math.PI * rad(30), 1e-12, 'Mollweide equator');
});

test('Equal Earth matches PROJ published spherical sample lon122 lat47 R1', () => {
  const { x, y } = globalProjection('equalEarth', rad(47), rad(122), 1);
  close(x, 1.55, .005, 'PROJ x (2 decimal places)');
  close(y, .89, .005, 'PROJ y (2 decimal places)');
});

test('Mercator is conformal but latitude-60 area grows by sec squared', () => {
  const d = globalDistortion('mercator', rad(60), rad(20));
  close(d.area, 4, 2e-7, 'Mercator area ratio');
  close(d.eastScale, 2, 1e-7, 'Mercator east scale');
  close(d.northScale, 2, 1e-7, 'Mercator north scale');
  close(d.maxAngularDistortion, 0, 2e-7, 'Mercator angular distortion');
});

test('Equal Earth and Mollweide preserve sphere area across noncentral points', () => {
  for (const id of ['equalEarth', 'mollweide']) {
    for (const [lat, lon] of [[0, 0], [35, 120], [-68, -90], [72, 45]]) {
      close(globalDistortion(id, rad(lat), rad(lon)).area, 1, 3e-7,
        `${id} area at ${lat}/${lon}`);
    }
    assert.ok(globalDistortion(id, rad(45), rad(115)).maxAngularDistortion > .05,
      `${id} must not be falsely marked conformal`);
  }
});

test('projection inputs reject unsupported domains and poles', () => {
  assert.throws(() => globalProjection('mercator', Math.PI / 2, 0), /極/);
  assert.throws(() => globalProjection('unknown', 0, 0), /未対応/);
  assert.throws(() => globalDistortion('equalEarth', rad(88), 0), /80/);
});

test('authalic latitude maps ellipsoid bands to equal-area sphere bands', () => {
  const e = ellipsoid(), R = authalicRadius(e);
  close(R, AUTHALIC_RADIUS, 1e-8, 'same authalic sphere radius');
  for (const lat of [-75, -45, -5, 0, 5, 45, 75]) {
    const phi = rad(lat), beta = authalicLatitude(phi, e);
    const n = 4096, h = phi / n;
    const density = p => e.a ** 2 * (1 - e.e2) * Math.cos(p) /
      (1 - e.e2 * Math.sin(p) ** 2) ** 2;
    let sum = density(0) + density(phi);
    for (let i = 1; i < n; i++) sum += (i % 2 ? 4 : 2) * density(i * h);
    const areaPerRadian = sum * h / 3;
    close(R ** 2 * Math.sin(beta), areaPerRadian, .5,
      'independent Simpson ellipsoid meridian-band area (m²/radian)');
    assert.ok(Math.sign(beta) === Math.sign(phi), 'authalic sign');
  }
  assert.ok(authalicLatitude(rad(45)) < rad(45), 'geodetic and authalic latitude differ');
  const sphere = ellipsoid(6_000_000, 0);
  for (const phi of [rad(-50), 0, rad(52)]) {
    close(authalicLatitude(phi, sphere), phi, 1e-14, 'spherical limit');
  }
});

test('ellipsoidal Equal Earth and Mollweide preserve physical GRS80 area', () => {
  for (const projection of ['equalEarth', 'mollweide']) {
    for (const [lat, lon] of [[0, 0], [45, 90], [-67, -160], [76, 30]]) {
      const d = ellipsoidalGlobalDistortion(projection, rad(lat), rad(lon));
      close(d.area, 1, 5e-7, `${projection} physical area at ${lat},${lon}`);
    }
  }
});

test('ellipsoidal Mercator is conformal against the ellipsoid tangent metric', () => {
  for (const lat of [-72, -30, 0, 48, 75]) {
    const d = ellipsoidalGlobalDistortion('mercator', rad(lat), rad(39));
    close(d.eastScale, d.northScale, 5e-8, 'equal directional scales');
    close(d.maxAngularDistortion, 0, 5e-7, 'conformal Tissot circle');
  }
  const phi = rad(51);
  const e = ellipsoid(), ecc = Math.sqrt(e.e2);
  const expected = authalicRadius(e) * (Math.asinh(Math.tan(phi)) -
    ecc * Math.atanh(ecc * Math.sin(phi)));
  close(ellipsoidalGlobalProjection('mercator', phi, 0).y, expected, 1e-7,
    'independent Mercator isometric-latitude formula');
  assert.throws(() => ellipsoidalGlobalProjection('mercator', Math.PI / 2, 0), /極/);
  assert.throws(() => authalicLatitude(rad(100)), /90/);
});
