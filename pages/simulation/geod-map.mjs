// Geographic coordinates are representative city centres, not survey control points.
export const CITIES = Object.freeze([
  { id: 'london', label: 'ロンドン', lat: 51.5074, lon: -0.1278 },
  { id: 'paris', label: 'パリ', lat: 48.8566, lon: 2.3522 },
  { id: 'new-york', label: 'ニューヨーク', lat: 40.7128, lon: -74.0060 },
  { id: 'tokyo', label: '東京', lat: 35.6812, lon: 139.7671 },
  { id: 'osaka', label: '大阪', lat: 34.6937, lon: 135.5023 },
  { id: 'sapporo', label: '札幌', lat: 43.0618, lon: 141.3545 },
  { id: 'moscow', label: 'モスクワ', lat: 55.7558, lon: 37.6173 },
  { id: 'sao-paulo', label: 'サンパウロ', lat: -23.5505, lon: -46.6333 },
]);

export const TILE_ZOOM = 2;
// Detailed tiles are never assembled into a whole-world atlas. The F lab
// requests at most sixteen tiles surrounding the current Japanese viewpoint.
export const JAPAN_DETAIL_TILE_LIMIT = 16;
export const MERCATOR_MAX_LAT = Math.atan(Math.sinh(Math.PI));

// Web Mercator XYZ y increases towards the south; the texture v axis is up.
export function mercatorY(phi) {
  const clamped = Math.max(-MERCATOR_MAX_LAT, Math.min(MERCATOR_MAX_LAT, phi));
  return (1 - Math.asinh(Math.tan(clamped)) / Math.PI) / 2;
}

export function latitudeAtTileY(yFraction) {
  return Math.atan(Math.sinh(Math.PI * (1 - 2 * yFraction)));
}

export function japanDetailZoom(displayZoom) {
  if (!Number.isFinite(displayZoom) || displayZoom < 2.5) return null;
  return displayZoom < 5.5 ? 6 : displayZoom < 9 ? 7 : 8;
}

export function japanDetailTiles(phi, lambda, displayZoom) {
  const z = japanDetailZoom(displayZoom);
  if (z === null || !Number.isFinite(phi) || !Number.isFinite(lambda)) return [];
  const latitude = phi * 180 / Math.PI, longitude = lambda * 180 / Math.PI;
  // This is an intentionally broad coverage guard, not a claim about Japan's
  // official jurisdiction or the legal extent of any planar coordinate zone.
  if (latitude < 18 || latitude > 48 || longitude < 120 || longitude > 156) return [];
  const n = 2 ** z;
  const cx = Math.floor((longitude + 180) / 360 * n);
  const cy = Math.floor(mercatorY(phi) * n);
  const tiles = [];
  for (let y = cy - 1; y <= cy + 2; y++) {
    if (y < 0 || y >= n) continue;
    for (let x = cx - 1; x <= cx + 2; x++) {
      tiles.push({ z, x: (x + n) % n, y });
    }
  }
  return tiles;
}

export function visibleXYZTiles(yaw, tilt, zoom = TILE_ZOOM) {
  if (!Number.isInteger(zoom) || zoom < 0 || zoom > 5) {
    throw new RangeError('0〜5のXYZズームを指定してください');
  }
  const n = 2 ** zoom, result = [];
  // Samples include all four tile edges. Only the actively visible hemisphere
  // is requested: no full-world download, adjacent-view prefetch or offline seed.
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    let visible = false;
    for (let v = 0; v <= 6 && !visible; v++) {
      const phi = latitudeAtTileY((y + v / 6) / n);
      for (let u = 0; u <= 6; u++) {
        const lambda = (2 * (x + u / 6) / n - 1) * Math.PI;
        const forward = Math.cos(tilt) * Math.cos(phi) * Math.cos(lambda + yaw) +
          Math.sin(tilt) * Math.sin(phi);
        if (forward > 0.015) { visible = true; break; }
      }
    }
    if (visible) result.push({ z: zoom, x, y });
  }
  return result;
}
