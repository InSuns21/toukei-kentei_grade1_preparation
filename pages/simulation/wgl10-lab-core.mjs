// Independent RGBA8 reference for the four solid calibration swatches.
// The direct scene, FBO copy and RGB inverse are sampled separately.
// The patterned scene outside the swatches is for visual inspection.
export function firstPassByte(xRight, yTop) {
  return [xRight ? 204 : 51, yTop ? 179 : 77, 102, 255];
}
export function secondPassByte(first, invert) {
  if (!Array.isArray(first) || first.length !== 4) throw new RangeError('RGBA required');
  return invert ? [255-first[0], 255-first[1], 255-first[2], 255] : [...first];
}
export function expectedWGL10Samples(width, height) {
  if (!Number.isInteger(width) || !Number.isInteger(height) ||
      width < 64 || height < 64 || width > 1024 || height > 1024 ||
      width * height > 524288) throw new RangeError('invalid buffer size');
  const third = Math.floor(width / 3);
  const positions = [
    {name: '左下', u: .25, v: .25},
    {name: '右下', u: .75, v: .25},
    {name: '左上', u: .25, v: .75},
    {name: '右上', u: .75, v: .75}
  ];
  return ['直接描画', 'FBOコピー', 'FBO反転'].flatMap((label, panel) => {
    const panelWidth = panel === 2 ? width - 2 * third : third;
    const origin = panel * third;
    return positions.map(({name, u, v}) => {
      const localX = Math.floor(panelWidth * u);
      const y = Math.floor(height * v);
      const localU = (localX + .5) / panelWidth;
      const localV = (y + .5) / height;
      return {
        label: label + ' ' + name,
        x: origin + localX, y,
        rgba: secondPassByte(firstPassByte(localU >= .5, localV >= .5), panel === 2)
      };
    });
  });
}
export function compareWGL10Readback(actual, width, height, tolerance = 2) {
  return expectedWGL10Samples(width, height).map((expected, i) => {
    const sample = actual[i];
    const valid = sample && sample.x === expected.x && sample.y === expected.y &&
      Array.isArray(sample.rgba) && sample.rgba.length === 4 &&
      sample.rgba.every(v => Number.isInteger(v) && v >= 0 && v <= 255);
    const difference = valid ? expected.rgba.map((v, j) => Math.abs(v - sample.rgba[j])) :
      [Infinity, Infinity, Infinity, Infinity];
    return {...expected, actual: valid ? sample.rgba : null, difference,
      pass: !!valid && difference.every(v => v <= tolerance)};
  });
}
