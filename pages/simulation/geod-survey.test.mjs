import test from 'node:test';
import assert from 'node:assert/strict';
import { SURVEY_STATIONS, SURVEY_REFERENCE, syntheticSurveyObservations,
  adjustSurveyNetwork } from './geod-survey.mjs';

const approx = (actual, expected, tolerance, label = 'numeric value') =>
  assert.ok(Math.abs(actual - expected) <= tolerance,
    label + ': expected ' + expected + ', got ' + actual);

test('exact synthetic trilateration returns the known 2D point with zero residuals', () => {
  const observations = SURVEY_STATIONS.map(station => ({
    ...station, distance: Math.hypot(SURVEY_REFERENCE.east - station.east,
      SURVEY_REFERENCE.north - station.north), sigma: 0.1,
  }));
  const result = adjustSurveyNetwork(observations);
  approx(result.east, SURVEY_REFERENCE.east, 1e-10, 'E');
  approx(result.north, SURVEY_REFERENCE.north, 1e-10, 'N');
  approx(result.chi2, 0, 1e-16, 'weighted residual');
  approx(result.normalResidual, 0, 1e-10, 'normal equation');
  assert.equal(result.degreesOfFreedom, 1);
  for (const observation of result.residuals) {
    approx(observation.predicted, observation.distance, 1e-11);
  }
});

test('overdetermined weighted adjustment reports normal equations and positive covariance', () => {
  const observations = syntheticSurveyObservations();
  const result = adjustSurveyNetwork(observations);
  assert.ok(result.iterations >= 2 && result.iterations < 30);
  assert.ok(result.chi2 > 0.01);
  assert.ok(result.normalResidual < 1e-7);
  assert.equal(result.residuals.length, 3);
  assert.ok(result.covariance.ee > 0 && result.covariance.nn > 0);
  assert.ok(result.covariance.ee * result.covariance.nn -
    result.covariance.en ** 2 > 0);
  assert.ok(result.ellipse.major >= result.ellipse.minor && result.ellipse.minor > 0);
  // Independent J^T W v evaluation, not sourced from the solver output.
  const gradient = [0, 0];
  const normal = [[0, 0], [0, 0]];
  for (const observation of observations) {
    const dx = result.east - observation.east, dy = result.north - observation.north;
    const distance = Math.hypot(dx, dy);
    const jacobian = [dx / distance, dy / distance], weight = 1 / observation.sigma ** 2;
    const residual = observation.distance - distance;
    for (let i = 0; i < 2; i++) {
      gradient[i] += jacobian[i] * weight * residual;
      for (let j = 0; j < 2; j++) {
        normal[i][j] += jacobian[i] * weight * jacobian[j];
      }
    }
  }
  assert.ok(Math.hypot(...gradient) < 1e-7);
  const determinant = normal[0][0] * normal[1][1] - normal[0][1] * normal[1][0];
  approx(result.covariance.ee, normal[1][1] / determinant, 1e-12);
  approx(result.covariance.en, -normal[0][1] / determinant, 1e-12);
  approx(result.covariance.nn, normal[0][0] / determinant, 1e-12);
});

test('down-weighting biased observation C reduces displacement from the true point', () => {
  const highWeight = adjustSurveyNetwork(syntheticSurveyObservations({
    sigmaA: 0.05, sigmaB: 0.05, sigmaC: 0.1, biasC: 2,
  }));
  const lowWeight = adjustSurveyNetwork(syntheticSurveyObservations({
    sigmaA: 0.05, sigmaB: 0.05, sigmaC: 1, biasC: 2,
  }));
  const error = point => Math.hypot(point.east - SURVEY_REFERENCE.east,
    point.north - SURVEY_REFERENCE.north);
  assert.ok(error(lowWeight) < error(highWeight));
  assert.ok(lowWeight.ellipse.major > highWeight.ellipse.major,
    'weakening one observation should not improve formal precision');
});

test('rejects invalid observations, unobservable networks and undefined distance derivative', () => {
  assert.throws(() => syntheticSurveyObservations({ sigmaA: 0 }), /標準偏差/);
  assert.throws(() => syntheticSurveyObservations({ sigmaC: Number.NaN }), /有限数/);
  assert.throws(() => syntheticSurveyObservations({ biasC: 5.1 }), /±5/);
  assert.throws(() => adjustSurveyNetwork([]), /3本/);
  const inputs = syntheticSurveyObservations();
  assert.throws(() => adjustSurveyNetwork([{ ...inputs[0], sigma: 0 }, ...inputs.slice(1)]),
    /正でなければ/);
  const collinear = [0, 100, 200].map((east, i) =>
    ({ id: String(i), east, north: 0, distance: 100, sigma: 1 }));
  assert.throws(() => adjustSurveyNetwork(collinear, { east: 300, north: 0 }),
    /階数不足/);
  assert.throws(() => adjustSurveyNetwork(inputs, { east: 0, north: 0 }),
    /距離微分/);
});
