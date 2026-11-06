// Local plane (E east, N north, metres). All observations are synthetic,
// not measurements of an actual control network or a CRS/datum transformation.
export const SURVEY_STATIONS = Object.freeze([
  Object.freeze({ id: 'A', east: 0, north: 0 }),
  Object.freeze({ id: 'B', east: 300, north: 0 }),
  Object.freeze({ id: 'C', east: 100, north: 260 }),
]);
export const SURVEY_REFERENCE = Object.freeze({ east: 130, north: 110 });
// Fixed deterministic perturbations, chosen to make the overdetermined
// adjustment and residuals visible. They are NOT random Gaussian draws.
const FIXED_OFFSETS = [0.08, -0.04, 0.02];

function finite(name, value) {
  if (!Number.isFinite(value)) throw new RangeError(name + 'は有限数で指定してください');
  return value;
}

export function syntheticSurveyObservations({
  sigmaA = 0.05, sigmaB = 0.05, sigmaC = 0.10, biasC = 0.30,
} = {}) {
  const sigmas = [sigmaA, sigmaB, sigmaC];
  sigmas.forEach((sigma, index) => {
    finite('観測' + SURVEY_STATIONS[index].id + 'の標準偏差', sigma);
    if (sigma < 0.01 || sigma > 2) {
      throw new RangeError('観測標準偏差は0.01〜2 mの範囲で指定してください');
    }
  });
  finite('C観測の追加偏り', biasC);
  if (Math.abs(biasC) > 5) throw new RangeError('C観測の偏りは±5 m以内で指定してください');
  return SURVEY_STATIONS.map((station, i) => ({
    ...station,
    sigma: sigmas[i],
    distance: Math.hypot(SURVEY_REFERENCE.east - station.east,
      SURVEY_REFERENCE.north - station.north) + FIXED_OFFSETS[i] + (i === 2 ? biasC : 0),
  }));
}

function normalEquations(observations, east, north) {
  let ee = 0, en = 0, nn = 0, re = 0, rn = 0, chi2 = 0;
  const residuals = observations.map(observation => {
    const dx = east - observation.east, dy = north - observation.north;
    const predicted = Math.hypot(dx, dy);
    if (predicted < 1e-8) throw new RangeError('推定点と既知点が一致し、距離微分が定義できません');
    const ux = dx / predicted, uy = dy / predicted;
    const residual = observation.distance - predicted;
    const weight = 1 / (observation.sigma * observation.sigma);
    ee += weight * ux * ux;
    en += weight * ux * uy;
    nn += weight * uy * uy;
    re += weight * ux * residual;
    rn += weight * uy * residual;
    chi2 += weight * residual * residual;
    return { ...observation, predicted, residual, normalized: residual / observation.sigma };
  });
  const det = ee * nn - en * en;
  if (!(det > 1e-10 * ee * nn)) {
    throw new RangeError('観測方向が不足し、位置を2成分とも推定できません（正規行列が階数不足）');
  }
  return { ee, en, nn, re, rn, det, chi2, residuals };
}

export function adjustSurveyNetwork(observations, start = { east: 120, north: 120 }) {
  if (!Array.isArray(observations) || observations.length < 3) {
    throw new RangeError('2次元の平差には独立した距離観測が3本以上必要です');
  }
  for (const observation of observations) {
    for (const field of ['east', 'north', 'distance', 'sigma']) finite(field, observation[field]);
    if (observation.sigma <= 0 || observation.distance <= 0) {
      throw new RangeError('観測距離と標準偏差は正でなければなりません');
    }
  }
  let east = finite('推定初期値E', start.east);
  let north = finite('推定初期値N', start.north);
  let iterations = 0, converged = false;
  for (let i = 0; i < 30; i++) {
    const n = normalEquations(observations, east, north);
    // (J^T W J) delta = J^T W (observed - calculated).
    const deltaE = (n.nn * n.re - n.en * n.rn) / n.det;
    const deltaN = (n.ee * n.rn - n.en * n.re) / n.det;
    east += deltaE;
    north += deltaN;
    iterations = i + 1;
    if (!Number.isFinite(east) || !Number.isFinite(north)) {
      throw new RangeError('平差計算が発散しました');
    }
    if (Math.hypot(deltaE, deltaN) < 1e-10) { converged = true; break; }
  }
  if (!converged) throw new RangeError('距離観測の重み付き平差が30回以内に収束しません');
  const n = normalEquations(observations, east, north);
  const covariance = {
    ee: n.nn / n.det, en: -n.en / n.det, nn: n.ee / n.det,
  };
  const trace = covariance.ee + covariance.nn;
  const spread = Math.hypot(covariance.ee - covariance.nn, 2 * covariance.en);
  const majorVariance = (trace + spread) / 2, minorVariance = (trace - spread) / 2;
  const ellipse = {
    major: Math.sqrt(Math.max(0, majorVariance)),
    minor: Math.sqrt(Math.max(0, minorVariance)),
    angle: Math.atan2(2 * covariance.en, covariance.ee - covariance.nn) / 2,
  };
  return {
    east, north, iterations,
    degreesOfFreedom: observations.length - 2,
    chi2: n.chi2,
    normalResidual: Math.hypot(n.re, n.rn),
    residuals: n.residuals,
    covariance, ellipse,
  };
}
