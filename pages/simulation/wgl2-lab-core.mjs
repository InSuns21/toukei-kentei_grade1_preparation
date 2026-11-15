// WGL2 の CPU 独立基準。GPUの入力バッファ・shader/readPixelsは参照しない。
import {TRIANGLE, pixelToNdc, signedDoubleArea} from './wgl-lab-core.mjs';

export const VERTEX_RGB = Object.freeze([
  Object.freeze([1, 0, 0]), Object.freeze([0, 1, 0]), Object.freeze([0, 0, 1])
]);
const BACKGROUND = Object.freeze([0, 0, 0, 255]);

export function barycentric(point) {
  const [a, b, c] = TRIANGLE;
  const area = signedDoubleArea(a, b, c);
  if (!(area > 0)) throw new RangeError('三角形が退化・反転しています');
  const weights = [
    signedDoubleArea(b, c, point) / area,
    signedDoubleArea(c, a, point) / area,
    signedDoubleArea(a, b, point) / area
  ];
  // 各符号付き二倍面積の和は元の二倍面積に等しい。
  return weights;
}

export function expectedWGL2Samples(width, height) {
  const probes = [
    {label: '中央', x: Math.floor(width / 2), y: Math.floor(height / 2)},
    {label: '赤側', x: Math.floor(width * 0.31), y: Math.floor(height * 0.40)},
    {label: '緑側', x: Math.floor(width * 0.69), y: Math.floor(height * 0.40)},
    {label: '背景', x: 0, y: 0}
  ];
  return probes.map(probe => {
    const ndc = pixelToNdc(probe.x, probe.y, width, height);
    const weights = barycentric(ndc);
    const inside = weights.every(weight => weight >= 0);
    const rgb = VERTEX_RGB[0].map((_, channel) =>
      weights.reduce((sum, weight, index) => sum + weight * VERTEX_RGB[index][channel], 0));
    const rgba = inside ? rgb.map(value => Math.round(255 * value)).concat(255) : [...BACKGROUND];
    return {...probe, ndc, weights, inside, rgba};
  });
}

export function compareWGL2Readback(samples, width, height, tolerance = 2) {
  return expectedWGL2Samples(width, height).map((expected, index) => {
    const sample = samples[index];
    const valid = sample && sample.x === expected.x && sample.y === expected.y &&
      Array.isArray(sample.rgba) && sample.rgba.length === 4 &&
      sample.rgba.every(value => Number.isInteger(value) && value >= 0 && value <= 255);
    const difference = valid ? expected.rgba.map((v, channel) => Math.abs(v - sample.rgba[channel])) :
      [Infinity, Infinity, Infinity, Infinity];
    return {...expected, actual: valid ? sample.rgba : null, difference,
      pass: valid && difference.every(value => value <= tolerance)};
  });
}
