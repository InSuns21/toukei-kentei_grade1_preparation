// WGL / FCG 共用ラボの CPU 参照値。GPUから返る値をそのまま真値としない。
export const TRIANGLE = Object.freeze([
  Object.freeze([-0.8, -0.8]),
  Object.freeze([0.8, -0.8]),
  Object.freeze([0.0, 0.8]),
]);
export const TRIANGLE_RGBA = Object.freeze([255, 128, 0, 255]);
export const BACKGROUND_RGBA = Object.freeze([0, 0, 0, 255]);

export function pixelToNdc(x, y, width, height) {
  if (!Number.isInteger(width) || !Number.isInteger(height) ||
      width <= 0 || height <= 0 || x < 0 || y < 0 || x >= width || y >= height) {
    throw new RangeError("描画バッファの寸法または画素座標が不正です");
  }
  return [2 * (x + 0.5) / width - 1, 2 * (y + 0.5) / height - 1];
}

export function ndcToViewport(x, y, width, height) {
  return [(x + 1) * width / 2, (y + 1) * height / 2];
}

export function signedDoubleArea(a, b, p) {
  return (b[0] - a[0]) * (p[1] - a[1]) -
    (b[1] - a[1]) * (p[0] - a[0]);
}

export function insideTriangle(point, vertices = TRIANGLE) {
  const [a, b, c] = vertices;
  const area = signedDoubleArea(a, b, c);
  if (area === 0) throw new RangeError("三角形の面積が0です");
  const signs = [signedDoubleArea(a, b, point),
    signedDoubleArea(b, c, point), signedDoubleArea(c, a, point)];
  return signs.every(value => area > 0 ? value >= 0 : value <= 0);
}

export function expectedSamples(width, height) {
  const samples = [
    {label: "中央", x: Math.floor(width / 2), y: Math.floor(height / 2)},
    {label: "左下", x: 0, y: 0},
  ];
  return samples.map(sample => {
    const ndc = pixelToNdc(sample.x, sample.y, width, height);
    const inside = insideTriangle(ndc);
    return {...sample, ndc, inside, rgba: inside ? [...TRIANGLE_RGBA] : [...BACKGROUND_RGBA]};
  });
}

export function compareReadback(samples, width, height, tolerance = 1) {
  const expected = expectedSamples(width, height);
  return expected.map((reference, i) => {
    const actual = samples[i];
    const valid = actual && actual.x === reference.x && actual.y === reference.y &&
      Array.isArray(actual.rgba) && actual.rgba.length === 4 &&
      actual.rgba.every(value => Number.isInteger(value) && value >= 0 && value <= 255);
    const difference = valid ? reference.rgba.map((value, channel) =>
      Math.abs(value - actual.rgba[channel])) : [Infinity, Infinity, Infinity, Infinity];
    return { ...reference, actual: valid ? actual.rgba : null,
      difference, pass: valid && difference.every(value => value <= tolerance) };
  });
}
