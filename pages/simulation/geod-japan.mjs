// Japanese plane rectangular coordinate systems: GSI notice No. 9 (2002,
// as amended 2010). Geographic input order (latitude, longitude), radians.
// Japanese projected axes: X=north, Y=east, metres; no datum transformation.
import { ellipsoid, rad, transverseMercator, projectionDistortion } from './geod-core.mjs';

const declarations = [
  [129, 30, 33, '長崎・鹿児島の一部'],
  [131, 0, 33, '九州（I系の区域を除く）'],
  [132, 10, 36, '山口・島根・広島'],
  [133, 30, 33, '四国'],
  [134, 20, 36, '兵庫・鳥取・岡山'],
  [136, 0, 36, '近畿・北陸の一部'],
  [137, 10, 36, '東海・北陸の一部'],
  [138, 30, 36, '新潟・長野・山梨・静岡'],
  [139, 50, 36, '関東・福島'],
  [140, 50, 40, '東北北部など'],
  [140, 15, 44, '北海道南西部の一部'],
  [142, 15, 44, '北海道中部など'],
  [144, 15, 44, '北海道東部の一部'],
  [142, 0, 26, '小笠原諸島など'],
  [127, 30, 26, '沖縄本島など'],
  [124, 0, 26, '先島諸島など'],
  [131, 0, 26, '大東諸島など'],
  [136, 0, 20, '沖ノ鳥島など'],
  [154, 0, 26, '南鳥島など'],
];
const romans = ['I','II','III','IV','V','VI','VII','VIII','IX','X',
  'XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX'];

export const JAPAN_ZONES = Object.freeze(declarations.map(([lonDeg, lonMinute, latDeg, area], index) =>
  Object.freeze({ number: index + 1, roman: romans[index],
    lonDeg, lonMinute, lon0: lonDeg + lonMinute / 60, lat0: latDeg,
    epsg2011: 6669 + index, area })));

export const JAPAN_K0 = .9999;

export function japanZone(number) {
  if (!Number.isInteger(number) || number < 1 || number > 19) {
    throw new RangeError('系番号は1〜19の整数で指定してください');
  }
  return JAPAN_ZONES[number - 1];
}

export function japanProjectionOptions(number) {
  const zone = japanZone(number);
  return { e: ellipsoid(), lon0: rad(zone.lon0), lat0: rad(zone.lat0), k0: JAPAN_K0 };
}

export function japanPlanarCoordinates(phi, lambda, number, datum = 'jgd2011') {
  if (datum !== 'jgd2011' && datum !== 'grs80-only') {
    throw new RangeError('基準系の指定が不正です');
  }
  const zone = japanZone(number), options = japanProjectionOptions(number);
  const projected = transverseMercator(phi, lambda, options);
  const distortion = projectionDistortion(phi, lambda, options);
  return {
    zone, options, datum,
    // X north-positive; Y east-positive (GSI), NOT conventional GIS easting-first order.
    X: projected.Np, Y: projected.E,
    mapDistance: Math.hypot(projected.Np, projected.E),
    distortion,
    // A warning threshold for *teaching*, NOT a test of legal applicability.
    farFromMeridian: Math.abs(Math.atan2(Math.sin(lambda - options.lon0),
      Math.cos(lambda - options.lon0))) > rad(3),
  };
}
