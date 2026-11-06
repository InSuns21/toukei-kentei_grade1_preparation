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

// Condensed reading aid to the legal area of use (GSI notice No.9/2002).
// A lat/lon alone cannot establish municipal/island membership: these strings
// are NOT a polygon test, and they must not drive automatic zone assignment.
const legalAreas = [
  '長崎県、および鹿児島県の告示で指定された島しょ区域（緯度経度境界に例外あり）',
  '福岡・佐賀・熊本・大分・宮崎県、およびI系を除く鹿児島県',
  '山口・島根・広島県',
  '香川・愛媛・徳島・高知県',
  '兵庫・鳥取・岡山県',
  '京都・大阪・福井・滋賀・三重・奈良・和歌山府県',
  '石川・富山・岐阜・愛知県',
  '新潟・長野・山梨・静岡県',
  '福島・栃木・茨城・埼玉・千葉・群馬・神奈川県、およびXIV・XVIII・XIX系指定区域を除く東京都',
  '青森・秋田・山形・岩手・宮城県',
  '北海道の渡島・檜山・後志など、告示指定の市町村・振興局区域',
  '北海道のXI・XIII系指定区域を除く区域',
  '北海道の十勝・釧路・根室など、告示指定の市町村・振興局区域と北方四島',
  '東京都の北緯28°以南・東経140°30′以東・東経143°以西の島しょ区域',
  '沖縄県の東経126°以東・東経130°以西の区域',
  '沖縄県の東経126°以西の区域',
  '沖縄県の東経130°以東の区域',
  '東京都の北緯28°以南・東経140°30′以西の島しょ区域',
  '東京都の北緯28°以南・東経143°以東の島しょ区域',
];

export const JAPAN_ZONES = Object.freeze(declarations.map(([lonDeg, lonMinute, latDeg, area], index) =>
  Object.freeze({ number: index + 1, roman: romans[index],
    lonDeg, lonMinute, lon0: lonDeg + lonMinute / 60, lat0: latDeg,
    epsg2011: 6669 + index, area, legalAreaNote: legalAreas[index] })));

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
