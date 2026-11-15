// WGL3: GPUと頂点配列の双方から独立したCPUの正方形・画素参照値。
import {pixelToNdc} from './wgl-lab-core.mjs';

export function gridCounts(n) {
  if (!Number.isInteger(n) || n < 1 || n > 255) throw new RangeError('1 <= n <= 255');
  const vertices = (n + 1) ** 2;
  const triangles = 2 * n * n;
  const references = 3 * triangles;
  return {vertices, triangles, references, indexedBytes: 8 * vertices + 2 * references,
    expandedBytes: 8 * references, area: triangles * (1.2 / n) ** 2 / 2};
}
export function expectedWGL3Samples(width, height) {
  const probes = [
    {label: '中央', x: Math.floor(width / 2), y: Math.floor(height / 2)},
    {label: '右下内側', x: Math.floor(width * 0.67), y: Math.floor(height * 0.33)},
    {label: '背景', x: 0, y: 0}
  ];
  return probes.map(probe => {
    const ndc = pixelToNdc(probe.x, probe.y, width, height);
    const inside = ndc[0] > -0.6 && ndc[0] < 0.6 && ndc[1] > -0.6 && ndc[1] < 0.6;
    return {...probe, ndc, inside, rgba: inside ? [51, 153, 204, 255] : [0, 0, 0, 255]};
  });
}
export function compareWGL3Readback(samples, width, height, tolerance = 1) {
  return expectedWGL3Samples(width, height).map((expected, index) => {
    const actual = samples[index];
    const valid = actual && actual.x === expected.x && actual.y === expected.y &&
      Array.isArray(actual.rgba) && actual.rgba.length === 4 &&
      actual.rgba.every(value => Number.isInteger(value) && value >= 0 && value <= 255);
    const difference = valid ? expected.rgba.map((value, k) =>
      Math.abs(value - actual.rgba[k])) : [Infinity, Infinity, Infinity, Infinity];
    return {...expected, actual: valid ? actual.rgba : null, difference,
      pass: !!valid && difference.every(value => value <= tolerance)};
  });
}
