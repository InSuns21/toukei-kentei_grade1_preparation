import test from 'node:test';
import assert from 'node:assert/strict';
import { rad } from './geod-core.mjs';
import { AUTHALIC_RADIUS, GLOBAL_PROJECTIONS, globalProjection,
  globalDistortion } from './geod-compare.mjs';

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
