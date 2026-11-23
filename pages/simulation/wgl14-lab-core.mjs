// WGL14 independent CPU oracle. Never execute the learner's JS or GLSL here.
// The original 8x8 impulse calculations stay available for the numerical exercises.
const GRID = 8;
const POSTER = 128;
const clamp = (value, max) => Math.max(0, Math.min(max, value));
function finiteCanvas(width, height) {
  if (!Number.isInteger(width) || !Number.isInteger(height) ||
      width < 64 || height < 64 || width > 1024 || height > 1024 ||
      width * height > 524288) throw new RangeError('invalid canvas');
}
export function sceneByte(x, y) {
  if (!Number.isInteger(x) || !Number.isInteger(y) ||
      x < 0 || x >= GRID || y < 0 || y >= GRID)
    throw new RangeError('invalid texel');
  return x === 0 && y === 0 ? 90 : x === 3 && y === 3 ? 255 : 0;
}
export function filterByte(x, y, mode = 'blur') {
  if (!['blur', 'edge'].includes(mode)) throw new RangeError('invalid filter');
  const at = (i, j) => sceneByte(clamp(i, GRID - 1), clamp(j, GRID - 1));
  if (mode === 'blur') {
    let total = 0;
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) total += at(x + dx, y + dy);
    return Math.round(total / 9);
  }
  return clamp(4 * at(x, y) - at(x - 1, y) - at(x + 1, y) -
    at(x, y - 1) - at(x, y + 1), 255);
}
export function reinhardByte(byte, exposure = 1) {
  if (!Number.isFinite(exposure) || exposure < 0 ||
      !Number.isFinite(byte) || byte < 0 || byte > 255)
    throw new RangeError('invalid tone-map input');
  const light = exposure * byte / 255;
  return Math.round(255 * light / (1 + light));
}

// Separate implementation of the illustration's geometry, in integer RGB.
// Evaluating the same geometric predicates from CPU is not reading GPU output.
export function illustratedRGB(x, y) {
  if (!Number.isInteger(x) || !Number.isInteger(y) ||
      x < 0 || x >= POSTER || y < 0 || y >= POSTER)
    throw new RangeError('invalid illustrated texel');
  const u = (x + 0.5) / POSTER;
  const v = (y + 0.5) / POSTER;
  let rgb = v > 0.42 ? [30, 91, 148] : [52, 124, 74];
  if (v < 0.52 - 0.72 * Math.abs(u - 0.22)) rgb = [87, 110, 125];
  if (Math.hypot(u - 0.81, v - 0.78) < 0.105) rgb = [255, 211, 77];
  if (v < 0.26 && Math.abs(u - 0.48) < 0.045 + (0.26 - v) * 0.45)
    rgb = [204, 178, 126];
  if (u > 0.30 && u < 0.64 && v > 0.26 && v < 0.65)
    rgb = [235, 184, 112];
  if (u > 0.26 && u < 0.68 && v >= 0.65 &&
      v < 0.83 - 0.85 * Math.abs(u - 0.47))
    rgb = [161, 65, 54];
  if (v > 0.45 && v < 0.57 &&
      ((u > 0.35 && u < 0.42) || (u > 0.53 && u < 0.60)))
    rgb = [33, 75, 107];
  if (u > 0.45 && u < 0.53 && v > 0.26 && v < 0.42)
    rgb = [92, 64, 55];
  if (u > 0.77 && u < 0.805 && v > 0.17 && v < 0.49)
    rgb = [101, 63, 42];
  if (Math.hypot(u - 0.79, v - 0.54) < 0.125)
    rgb = [27, 95, 59];
  return rgb;
}
export function illustratedBlurRGB(x, y, radius = 1) {
  if (!Number.isInteger(radius) || radius < 1 || radius > 4)
    throw new RangeError('invalid blur radius');
  const sum = [0, 0, 0];
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const rgb = illustratedRGB(clamp(x + dx, POSTER - 1),
        clamp(y + dy, POSTER - 1));
      for (let k = 0; k < 3; k++) sum[k] += rgb[k];
    }
  }
  const count = (2 * radius + 1) ** 2;
  return sum.map(value => Math.round(value / count));
}
export function expectedWGL14Samples(width, height) {
  finiteCanvas(width, height);
  // Same UV location in A and B. The initial wipe is at x=0.5.
  const checks = [
    ['原画 左下の草地', 0.08, 0.10],
    ['原画 山と空の境界付近', 0.22, 0.55],
    ['原画 家の窓', 0.39, 0.51],
    ['加工 屋根の右端', 0.65, 0.72],
    ['加工 太陽', 0.88, 0.80],
    ['加工 木の幹', 0.79, 0.32],
    ['加工 右端の空', 0.94, 0.65],
  ];
  return checks.map(([label, u, v]) => {
    const x = Math.floor(width * u), y = Math.floor(height * v);
    const ix = clamp(Math.floor((x + 0.5) * POSTER / width), POSTER - 1);
    const iy = clamp(Math.floor((y + 0.5) * POSTER / height), POSTER - 1);
    const rgb = u < 0.5 ? illustratedRGB(ix, iy) :
      illustratedBlurRGB(ix, iy).map(byte => reinhardByte(byte));
    return {label, x, y, rgba: [...rgb, 255]};
  });
}
export function compareWGL14Readback(actual, width, height, tolerance = 2) {
  if (!Number.isFinite(tolerance) || tolerance < 0)
    throw new RangeError('invalid tolerance');
  return expectedWGL14Samples(width, height).map((expected, index) => {
    const candidate = actual[index];
    const valid = !!candidate && candidate.x === expected.x &&
      candidate.y === expected.y && Array.isArray(candidate.rgba) &&
      candidate.rgba.length === 4 &&
      candidate.rgba.every(value => Number.isInteger(value) && value >= 0 && value <= 255);
    const difference = valid ?
      expected.rgba.map((v, k) => Math.abs(v - candidate.rgba[k])) :
      [Infinity, Infinity, Infinity, Infinity];
    return {...expected, actual: valid ? candidate.rgba : null, difference,
      pass: valid && difference.every(value => value <= tolerance)};
  });
}
