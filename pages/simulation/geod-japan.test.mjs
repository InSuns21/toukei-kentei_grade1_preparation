import test from 'node:test';
import assert from 'node:assert/strict';
import { rad } from './geod-core.mjs';
import { JAPAN_K0, JAPAN_ZONES, japanZone, japanProjectionOptions,
  japanPlanarCoordinates } from './geod-japan.mjs';

// The 19 origin longitude/latitude entries below are independently copied
// from GSI notice 9/2002 (amended 2010), not from the implementation array.
// https://www.gsi.go.jp/LAW/heimencho.html
const officialOrigins = [
  [129.5, 33], [131, 33], [132 + 10 / 60, 36], [133.5, 33],
  [134 + 20 / 60, 36], [136, 36], [137 + 10 / 60, 36], [138.5, 36],
  [139 + 50 / 60, 36], [140 + 50 / 60, 40], [140.25, 44],
  [142.25, 44], [144.25, 44], [142, 26], [127.5, 26], [124, 26],
  [131, 26], [136, 20], [154, 26],
];

test('all 19 GSI origin pairs, zone indexes and JGD2011 identifiers are stable', () => {
  assert.equal(JAPAN_ZONES.length, 19);
  assert.equal(JAPAN_K0, .9999);
  for (const [i, [lon0, lat0]] of officialOrigins.entries()) {
    const zone = japanZone(i + 1);
    assert.ok(Math.abs(zone.lon0 - lon0) < 1e-12, zone.roman + ' lon');
    assert.equal(zone.lat0, lat0, zone.roman + ' lat');
    assert.equal(zone.epsg2011, 6669 + i);
    assert.equal(japanProjectionOptions(i + 1).k0, .9999);
    assert.equal(japanZone(i + 1), zone);
  }
});

test('every GSI origin is (X=0,Y=0), avoiding easting/northing axis swaps', () => {
  for (const zone of JAPAN_ZONES) {
    const p = japanPlanarCoordinates(rad(zone.lat0), rad(zone.lon0), zone.number);
    assert.ok(Math.abs(p.X) < 1e-7, zone.roman + ': X=' + p.X);
    assert.ok(Math.abs(p.Y) < 1e-7, zone.roman + ': Y=' + p.Y);
    assert.ok(Math.abs(p.distortion.meridianScale - .9999) < 3e-7);
    assert.ok(Math.abs(p.distortion.parallelScale - .9999) < 3e-7);
    assert.ok(Math.abs(p.distortion.northBearingFromGrid) < 1e-6);
  }
});

test('north/south signs map to Japanese X; east/west signs map to Y', () => {
  const zone = japanZone(9);
  const originPhi = rad(zone.lat0), originLon = rad(zone.lon0);
  const north = japanPlanarCoordinates(originPhi + rad(.15), originLon, 9);
  const south = japanPlanarCoordinates(originPhi - rad(.15), originLon, 9);
  const east = japanPlanarCoordinates(originPhi, originLon + rad(.15), 9);
  const west = japanPlanarCoordinates(originPhi, originLon - rad(.15), 9);
  assert.ok(north.X > 0 && south.X < 0);
  assert.ok(east.Y > 0 && west.Y < 0);
  assert.ok(Math.abs(east.X) < 200, 'eastward curvature is small near central meridian');
  assert.ok(Math.abs(east.Y + west.Y) < .1);
  assert.ok(Math.abs(north.Y) < 1e-7);
  assert.ok(Math.abs(north.distortion.meridianScale - .9999) < 1e-7);
});

test('Tokyo in IX vs VIII demonstrates changed coordinates; distance is planar', () => {
  const phi = rad(35.681236), lon = rad(139.767125);
  const ninth = japanPlanarCoordinates(phi, lon, 9);
  const eighth = japanPlanarCoordinates(phi, lon, 8);
  assert.ok(ninth.X < 0 && ninth.Y < 0, 'Tokyo south and west of IX origin');
  assert.ok(eighth.Y > 0, 'Tokyo east of VIII origin');
  assert.ok(Math.abs(ninth.Y - eighth.Y) > 100000);
  assert.ok(Math.abs(ninth.mapDistance - Math.hypot(ninth.X, ninth.Y)) < 1e-7);
  assert.equal(ninth.farFromMeridian, false);
});

test('datum selection changes only metadata, not silently projected coordinates', () => {
  const p = [rad(35.7), rad(139.8)];
  const a = japanPlanarCoordinates(...p, 9, 'jgd2011');
  const b = japanPlanarCoordinates(...p, 9, 'grs80-only');
  assert.equal(a.X, b.X);
  assert.equal(a.Y, b.Y);
  assert.equal(a.zone.epsg2011, 6677);
  assert.equal(b.datum, 'grs80-only');
});

test('bad zone, datum and far-away/branched projection inputs fail honestly', () => {
  for (const value of [0, 20, 3.4, NaN, '9']) {
    assert.throws(() => japanZone(value), RangeError);
  }
  assert.throws(() => japanPlanarCoordinates(rad(35), rad(139), 9, 'jgd2024'),
    /基準系/);
  const remote = japanPlanarCoordinates(rad(36), rad(144), 9);
  assert.equal(remote.farFromMeridian, true);
  assert.throws(() => japanPlanarCoordinates(rad(36), rad(30), 9), /TM_LOCAL_DOMAIN/);
});
