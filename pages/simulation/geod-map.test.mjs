import test from 'node:test';
import assert from 'node:assert/strict';
import { CITIES, TILE_ZOOM, JAPAN_DETAIL_TILE_LIMIT, MERCATOR_MAX_LAT, mercatorY,
  latitudeAtTileY, visibleXYZTiles, japanDetailZoom, japanDetailTiles } from './geod-map.mjs';

test('city shortcuts have eight distinct valid representative coordinates', () => {
  assert.equal(CITIES.length, 8);
  assert.equal(new Set(CITIES.map(city => city.id)).size, 8);
  for (const city of CITIES) {
    assert.ok(city.lat > -70 && city.lat < 70 && city.lon >= -180 && city.lon <= 180);
  }
  assert.equal(CITIES.find(city => city.id === 'sao-paulo').lat < 0, true);
});

test('XYZ Web Mercator texture mapping is monotone and clamps poles', () => {
  assert.ok(Math.abs(mercatorY(0) - 0.5) < 1e-12);
  assert.ok(Math.abs(mercatorY(MERCATOR_MAX_LAT)) < 1e-12);
  assert.ok(Math.abs(mercatorY(-MERCATOR_MAX_LAT) - 1) < 1e-12);
  assert.equal(mercatorY(Math.PI / 2), mercatorY(MERCATOR_MAX_LAT));
  assert.ok(Math.abs(latitudeAtTileY(.25) - Math.atan(Math.sinh(Math.PI / 2))) < 1e-12);
  for (const y of [.03, .2, .65, .98]) {
    assert.ok(Math.abs(mercatorY(latitudeAtTileY(y)) - y) < 1e-12);
  }
});

test('only currently facing XYZ tiles are selected as the globe rotates', () => {
  const tokyo = CITIES.find(city => city.id === 'tokyo');
  const asia = visibleXYZTiles(-tokyo.lon * Math.PI / 180, tokyo.lat * Math.PI / 180);
  const ny = CITIES.find(city => city.id === 'new-york');
  const america = visibleXYZTiles(-ny.lon * Math.PI / 180, ny.lat * Math.PI / 180);
  assert.ok(asia.some(t => t.x === 3 && t.y === 1), 'Tokyo tile faces camera');
  assert.ok(america.some(t => t.x === 1 && t.y === 1), 'New York tile faces camera');
  assert.ok(asia.length < 2 ** (2 * TILE_ZOOM), 'not the entire world');
  assert.notDeepEqual(asia, america, 'rotating globe changes requested tile set');
  assert.throws(() => visibleXYZTiles(0, 0, 6), /0〜5/);
});

test('Japan focus requests a bounded local window at adaptive XYZ resolution', () => {
  const tokyo = CITIES.find(city => city.id === 'tokyo');
  const phi = tokyo.lat * Math.PI / 180, lambda = tokyo.lon * Math.PI / 180;
  for (const [displayZoom, expectedZ] of [[2.4, null], [4, 6], [6, 7], [12, 8]]) {
    assert.equal(japanDetailZoom(displayZoom), expectedZ);
    const tiles = japanDetailTiles(phi, lambda, displayZoom);
    if (expectedZ === null) { assert.deepEqual(tiles, []); continue; }
    assert.equal(tiles.length, JAPAN_DETAIL_TILE_LIMIT);
    assert.equal(new Set(tiles.map(t => t.z + '/' + t.x + '/' + t.y)).size, tiles.length);
    const n = 2 ** expectedZ;
    const centerX = Math.floor((tokyo.lon + 180) / 360 * n);
    const centerY = Math.floor(mercatorY(phi) * n);
    assert.ok(tiles.some(t => t.x === centerX && t.y === centerY));
    for (const tile of tiles) {
      assert.equal(tile.z, expectedZ);
      assert.ok(tile.x >= 0 && tile.x < n && tile.y >= 0 && tile.y < n);
      const north = latitudeAtTileY(tile.y / n);
      const south = latitudeAtTileY((tile.y + 1) / n);
      assert.ok(north > south);
    }
  }
  assert.deepEqual(japanDetailTiles(0.8, 0, 10), [], 'no detail tiles outside Japan');
  assert.deepEqual(japanDetailTiles(NaN, lambda, 10), [], 'invalid viewpoint');
  const osaka = japanDetailTiles(34.6937 * Math.PI / 180, 135.5023 * Math.PI / 180, 12);
  assert.notDeepEqual(osaka, japanDetailTiles(phi, lambda, 12), 'new Japanese area selects new tiles');
});
