// GNSS teaching model: synthetic satellites in a local east/north/up frame.
// The satellite locations, pseudoranges and noise are invented. No orbit,
// Earth rotation, satellite clock, atmosphere, datum or epoch correction.
export const GNSS_C = 299792458; // m/s, exact by SI definition
export const GNSS_REFERENCE = Object.freeze({ east: 12, north: -8, up: 5 });
export const GNSS_RADIUS = 20200000; // synthetic slant distance scale, m
const DEG = Math.PI / 180;
const NOISE = [0.50, -0.70, 0.15, 0.25, -0.30, 0.40];
export const GNSS_LAYOUTS = Object.freeze({
  spread: Object.freeze([[0, 75], [90, 18], [180, 36], [270, 24], [310, 52], [145, 57]]),
  cluster: Object.freeze([[15, 35], [35, 38], [60, 43], [85, 30], [110, 40], [130, 48]]),
  low: Object.freeze([[0, 10], [80, 15], [160, 12], [240, 18], [310, 11], [45, 16]]),
});

function finite(label, value) {
  if (!Number.isFinite(value)) throw new RangeError(label + 'は有限数で指定してください');
  return value;
}
function inRange(label, value, min, max) {
  finite(label, value);
  if (value < min || value > max) {
    throw new RangeError(label + 'は' + min + '〜' + max + 'の範囲で指定してください');
  }
}
export function gnssUnitVector(azimuth, elevation) {
  inRange('方位角', azimuth, 0, 360);
  inRange('仰角', elevation, 0, 90);
  const a = azimuth * DEG, e = elevation * DEG;
  return [Math.cos(e) * Math.sin(a), Math.cos(e) * Math.cos(a), Math.sin(e)];
}
export function syntheticGnssObservations({
  layout = 'spread', count = 6, firstAzimuth = null, firstElevation = null,
  clockBiasMeters = 75, sigma = 1, noiseScale = 1,
} = {}) {
  if (!Object.hasOwn(GNSS_LAYOUTS, layout)) throw new RangeError('衛星配置を選択してください');
  if (!Number.isInteger(count) || count < 4 || count > 6) {
    throw new RangeError('GNSS測位には4〜6機の衛星数を指定してください');
  }
  inRange('時計差の距離換算', clockBiasMeters, -300, 300);
  inRange('擬似距離の標準偏差', sigma, 0.1, 5);
  inRange('合成誤差倍率', noiseScale, 0, 2);
  if (firstAzimuth !== null) inRange('S1方位角', firstAzimuth, 0, 360);
  if (firstElevation !== null) inRange('S1仰角', firstElevation, 5, 85);
  return GNSS_LAYOUTS[layout].slice(0, count).map(([defaultAz, defaultEl], index) => {
    const azimuth = index === 0 && firstAzimuth !== null ? firstAzimuth : defaultAz;
    const elevation = index === 0 && firstElevation !== null ? firstElevation : defaultEl;
    const direction = gnssUnitVector(azimuth, elevation);
    const [east, north, up] = direction.map(v => GNSS_RADIUS * v);
    const geometricRange = Math.hypot(east - GNSS_REFERENCE.east,
      north - GNSS_REFERENCE.north, up - GNSS_REFERENCE.up);
    return {
      id: 'S' + (index + 1), azimuth, elevation, east, north, up,
      sigma, pseudorange: geometricRange + clockBiasMeters + NOISE[index] * noiseScale,
    };
  });
}

// Gauss-Jordan with partial row pivoting. Reject a near-zero normal-matrix
// pivot instead of displaying a physically meaningless finite DOP.
export function invertGnssNormal(matrix) {
  if (!Array.isArray(matrix) || matrix.length !== 4 ||
      matrix.some(row => !Array.isArray(row) || row.length !== 4 ||
        row.some(value => !Number.isFinite(value)))) {
    throw new RangeError('正規行列は有限な4×4行列である必要があります');
  }
  const augmented = matrix.map((row, i) =>
    [...row, ...Array.from({ length: 4 }, (_, j) => Number(i === j))]);
  const max = Math.max(...matrix.map((row, i) => Math.abs(row[i])));
  for (let col = 0; col < 4; col++) {
    let pivot = col;
    for (let row = col + 1; row < 4; row++) {
      if (Math.abs(augmented[row][col]) > Math.abs(augmented[pivot][col])) pivot = row;
    }
    if (!(Math.abs(augmented[pivot][col]) > max * 1e-12)) {
      throw new RangeError('衛星方向の階数が不足し、位置3成分と時計差を分離できません');
    }
    [augmented[pivot], augmented[col]] = [augmented[col], augmented[pivot]];
    const factor = augmented[col][col];
    for (let j = 0; j < 8; j++) augmented[col][j] /= factor;
    for (let row = 0; row < 4; row++) {
      if (row === col) continue;
      const multiplier = augmented[row][col];
      for (let j = 0; j < 8; j++) augmented[row][j] -= multiplier * augmented[col][j];
    }
  }
  return augmented.map(row => row.slice(4));
}

function equations(observations, state) {
  const normal = Array.from({ length: 4 }, () => Array(4).fill(0));
  const rhs = Array(4).fill(0);
  let chi2 = 0;
  const residuals = observations.map(obs => {
    const dx = state[0] - obs.east, dy = state[1] - obs.north, dz = state[2] - obs.up;
    const predictedRange = Math.hypot(dx, dy, dz);
    if (!(predictedRange > 1)) throw new RangeError('受信機と衛星が一致して距離微分が未定義です');
    const jacobian = [dx / predictedRange, dy / predictedRange, dz / predictedRange, 1];
    const predicted = predictedRange + state[3];
    const residual = obs.pseudorange - predicted;
    const weight = 1 / (obs.sigma * obs.sigma);
    chi2 += weight * residual * residual;
    for (let i = 0; i < 4; i++) {
      rhs[i] += jacobian[i] * weight * residual;
      for (let j = 0; j < 4; j++) normal[i][j] += jacobian[i] * weight * jacobian[j];
    }
    return { ...obs, predicted, residual, normalized: residual / obs.sigma, jacobian };
  });
  return { normal, rhs, residuals, chi2 };
}

export function solveGnssPseudoranges(observations, start = [0, 0, 0, 0]) {
  if (!Array.isArray(observations) || observations.length < 4) {
    throw new RangeError('位置3成分と時計差の推定には4本以上の擬似距離が必要です');
  }
  if (!Array.isArray(start) || start.length !== 4) throw new RangeError('初期値は4成分です');
  let state = start.map((x, i) => finite('初期値' + i, x));
  for (const o of observations) {
    for (const field of ['east', 'north', 'up', 'pseudorange', 'sigma']) finite(field, o[field]);
    if (!(o.pseudorange > 0 && o.sigma > 0)) {
      throw new RangeError('擬似距離と標準偏差は正である必要があります');
    }
  }
  let converged = false, iterations = 0;
  for (let k = 0; k < 20; k++) {
    const { normal, rhs } = equations(observations, state);
    const inverse = invertGnssNormal(normal);
    const delta = inverse.map(row => row.reduce((sum, value, i) => sum + value * rhs[i], 0));
    state = state.map((value, i) => value + delta[i]);
    if (state.some(x => !Number.isFinite(x))) throw new RangeError('GNSS反復計算が発散しました');
    iterations = k + 1;
    if (Math.hypot(...delta) < 1e-7) { converged = true; break; }
  }
  if (!converged) throw new RangeError('GNSS平差が20回以内に収束しません');
  const final = equations(observations, state);
  const covariance = invertGnssNormal(final.normal);
  // Geometry-only normal H^T H; do not mix clock seconds into its last column.
  const geometryNormal = Array.from({ length: 4 }, () => Array(4).fill(0));
  for (const obs of final.residuals) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) geometryNormal[i][j] += obs.jacobian[i] * obs.jacobian[j];
    }
  }
  const Q = invertGnssNormal(geometryNormal);
  const nonnegative = value => Math.sqrt(Math.max(0, value));
  const hdop = nonnegative(Q[0][0] + Q[1][1]);
  const vdop = nonnegative(Q[2][2]);
  const tdop = nonnegative(Q[3][3]);
  const pdop = nonnegative(Q[0][0] + Q[1][1] + Q[2][2]);
  const gdop = nonnegative(Q[0][0] + Q[1][1] + Q[2][2] + Q[3][3]);
  return {
    east: state[0], north: state[1], up: state[2], clockBiasMeters: state[3],
    clockBiasNanoseconds: state[3] / GNSS_C * 1e9,
    iterations, degreesOfFreedom: observations.length - 4,
    residuals: final.residuals, chi2: final.chi2,
    normalResidual: Math.hypot(...final.rhs),
    covariance, Q, dop: { hdop, vdop, tdop, pdop, gdop },
  };
}
