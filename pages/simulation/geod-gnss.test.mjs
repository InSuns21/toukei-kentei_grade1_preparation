// The GNSS lab is synthetic; check the 4-column pseudorange geometry without a browser.
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GNSS_C, GNSS_REFERENCE, GNSS_LAYOUTS, gnssUnitVector,
  syntheticGnssObservations, correctGnssObservations,
  invertGnssNormal, solveGnssPseudoranges,
} from './geod-gnss.mjs';

const close = (a, b, tolerance = 1e-7) =>
  assert.ok(Math.abs(a - b) < tolerance, `expected ${a} ≈ ${b}, tol ${tolerance}`);

test('azimuth is clockwise from north, elevation above horizon', () => {
  const east = gnssUnitVector(90, 0);
  close(east[0], 1); close(east[1], 0); close(east[2], 0);
  const zenith = gnssUnitVector(24, 90);
  close(zenith[0], 0); close(zenith[1], 0); close(zenith[2], 1);
  assert.throws(() => gnssUnitVector(361, 12), /方位角/);
});

test('noiseless six pseudoranges independently recover position and clock in metres', () => {
  const bias = -123.5;
  const observations = syntheticGnssObservations({ clockBiasMeters: bias, noiseScale: 0 });
  for (const observation of observations) {
    const distance = Math.hypot(observation.east - GNSS_REFERENCE.east,
      observation.north - GNSS_REFERENCE.north, observation.up - GNSS_REFERENCE.up);
    close(observation.pseudorange, distance + bias, 1e-7);
  }
  const solved = solveGnssPseudoranges(observations);
  close(solved.east, GNSS_REFERENCE.east, 1e-5);
  close(solved.north, GNSS_REFERENCE.north, 1e-5);
  close(solved.up, GNSS_REFERENCE.up, 1e-5);
  close(solved.clockBiasMeters, bias, 1e-5);
  close(solved.clockBiasNanoseconds, bias / GNSS_C * 1e9, 1e-5);
  close(solved.chi2, 0, 1e-9);
  assert.equal(solved.degreesOfFreedom, 2);
});

test('normal equation, Q inverse and DOP identities hold under nonzero residuals', () => {
  const observations = syntheticGnssObservations({ sigma: 1.5 });
  const result = solveGnssPseudoranges(observations);
  const rhs = Array(4).fill(0), normal = Array.from({ length: 4 }, () => Array(4).fill(0));
  for (const row of result.residuals) {
    const range = Math.hypot(result.east - row.east, result.north - row.north,
      result.up - row.up);
    const h = [(result.east - row.east) / range, (result.north - row.north) / range,
      (result.up - row.up) / range, 1];
    close(row.predicted, range + result.clockBiasMeters, 1e-6);
    close(row.residual, row.pseudorange - row.predicted, 1e-8);
    for (let i = 0; i < 4; i++) {
      rhs[i] += h[i] * row.residual / row.sigma ** 2;
      for (let j = 0; j < 4; j++) normal[i][j] += h[i] * h[j];
    }
  }
  assert.ok(Math.hypot(...rhs) < 1e-5);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
    const identity = normal[i].reduce((acc, value, k) => acc + value * result.Q[k][j], 0);
    close(identity, i === j ? 1 : 0, 1e-8);
    close(result.covariance[i][j], result.Q[i][j] * 1.5 ** 2, 1e-6);
  }
  const { hdop, vdop, pdop, tdop, gdop } = result.dop;
  close(pdop ** 2, hdop ** 2 + vdop ** 2, 1e-8);
  close(gdop ** 2, pdop ** 2 + tdop ** 2, 1e-8);
  assert.ok(result.chi2 > 0);
});

test('receiver clock offset shifts B, without distorting position or DOP', () => {
  const first = solveGnssPseudoranges(syntheticGnssObservations({ clockBiasMeters: 75 }));
  const second = solveGnssPseudoranges(syntheticGnssObservations({ clockBiasMeters: -120 }));
  close(second.clockBiasMeters - first.clockBiasMeters, -195, 1e-5);
  for (const key of ['east', 'north', 'up']) close(first[key], second[key], 1e-5);
  for (const key of Object.keys(first.dop)) close(first.dop[key], second.dop[key], 1e-9);
});

test('clustered and low-elevation satellites visibly degrade geometry', () => {
  const spread = solveGnssPseudoranges(syntheticGnssObservations({ layout: 'spread' }));
  const cluster = solveGnssPseudoranges(syntheticGnssObservations({ layout: 'cluster' }));
  const low = solveGnssPseudoranges(syntheticGnssObservations({ layout: 'low' }));
  assert.ok(cluster.dop.gdop > spread.dop.gdop * 3);
  assert.ok(low.dop.vdop > spread.dop.vdop * 3);
});

test('four satellites can perfectly fit four unknowns but do not provide redundancy', () => {
  const four = solveGnssPseudoranges(syntheticGnssObservations({ count: 4 }));
  const six = solveGnssPseudoranges(syntheticGnssObservations({ count: 6 }));
  assert.equal(four.degreesOfFreedom, 0);
  assert.equal(six.degreesOfFreedom, 2);
  assert.ok(four.chi2 < 1e-8);
  assert.ok(six.dop.gdop < four.dop.gdop);
});

test('rank loss and invalid measurements fail explicitly instead of producing DOP', () => {
  const observations = syntheticGnssObservations({ count: 4 });
  assert.throws(() => solveGnssPseudoranges(Array(4).fill(observations[0])), /階数/);
  assert.throws(() => invertGnssNormal([[1]]), /4×4/);
  assert.throws(() => syntheticGnssObservations({ count: 3 }), /4〜6/);
  assert.throws(() => syntheticGnssObservations({ count: 7 }), /4〜6/);
  assert.throws(() => syntheticGnssObservations({ sigma: 0 }), /標準偏差/);
  assert.throws(() => syntheticGnssObservations({ firstElevation: 91 }), /仰角/);
  assert.throws(() => syntheticGnssObservations({ layout: 'invalid' }), /衛星配置/);
  assert.equal(GNSS_LAYOUTS.spread.length, 6);
});

test('GNSS staged satellite clock, ionosphere and troposphere terms compose per satellite', () => {
  const base = syntheticGnssObservations({ noiseScale: 0 });
  const clock = syntheticGnssObservations({ noiseScale: 0, errorStage: 'clock',
    satelliteClockNs: 20 });
  const iono = syntheticGnssObservations({ noiseScale: 0, errorStage: 'clock-iono',
    satelliteClockNs: 20, ionosphereZenithMeters: 5 });
  const all = syntheticGnssObservations({ noiseScale: 0, errorStage: 'all',
    satelliteClockNs: 20, ionosphereZenithMeters: 5, troposphereZenithMeters: 2.3 });
  for (let i = 0; i < base.length; i++) {
    close(base[i].systematicMeters, 0);
    close(clock[i].pseudorange - base[i].pseudorange,
      clock[i].satelliteClockMeters, 1e-7);
    close(iono[i].pseudorange - clock[i].pseudorange,
      iono[i].ionosphereMeters, 1e-7);
    close(all[i].pseudorange - iono[i].pseudorange,
      all[i].troposphereMeters, 1e-7);
    close(all[i].systematicMeters, all[i].satelliteClockMeters +
      all[i].ionosphereMeters + all[i].troposphereMeters, 1e-8);
    assert.ok(all[i].ionosphereMeters >= 5);
    assert.ok(all[i].troposphereMeters >= 2.3);
  }
  close(clock[0].satelliteClockMeters, -20 * GNSS_C * 1e-9, 1e-10);
  assert.ok(clock[0].satelliteClockMeters < 0 && clock[1].satelliteClockMeters > 0,
    'receiver clock and satellite-specific clock signs must differ');
});

test('ideal known-error correction recovers noiseless truth; raw solution is biased', () => {
  const observations = syntheticGnssObservations({ errorStage: 'all', noiseScale: 0 });
  const raw = solveGnssPseudoranges(observations);
  const corrected = solveGnssPseudoranges(correctGnssObservations(observations));
  assert.ok(Math.hypot(raw.east - GNSS_REFERENCE.east,
    raw.north - GNSS_REFERENCE.north, raw.up - GNSS_REFERENCE.up) > 1,
    'unmodelled satellite-specific biases must shift the position');
  close(corrected.east, GNSS_REFERENCE.east, 1e-5);
  close(corrected.north, GNSS_REFERENCE.north, 1e-5);
  close(corrected.up, GNSS_REFERENCE.up, 1e-5);
  close(corrected.clockBiasMeters, 75, 1e-5);
  close(corrected.chi2, 0, 1e-9);
  assert.ok(Math.abs(raw.clockBiasMeters - 75) > 1);
  assert.ok(Math.abs(raw.dop.gdop - corrected.dop.gdop) < 1e-4,
    'unmodelled errors primarily affect bias, not the geometry DOP');
});

test('same elevation has larger simple atmospheric delay when lower in the sky', () => {
  const low = syntheticGnssObservations({ layout: 'low', errorStage: 'all' });
  const high = syntheticGnssObservations({ layout: 'spread', errorStage: 'all' });
  assert.ok(low[0].troposphereMeters > high[0].troposphereMeters);
  assert.ok(low[0].ionosphereMeters > high[0].ionosphereMeters);
});

test('invalid staged error parameters and missing correction fields fail', () => {
  assert.throws(() => syntheticGnssObservations({ errorStage: 'other' }), /誤差段階/);
  assert.throws(() => syntheticGnssObservations({ satelliteClockNs: -1 }), /衛星時計/);
  assert.throws(() => syntheticGnssObservations({ ionosphereZenithMeters: 25 }), /電離圏/);
  assert.throws(() => syntheticGnssObservations({ troposphereZenithMeters: NaN }), /対流圏/);
  assert.throws(() => correctGnssObservations([{ pseudorange: 2 }]), /補正対象/);
});
