import test from 'node:test';
import assert from 'node:assert/strict';
import { HEIGHT_REFERENCE, syntheticHeightProfile } from './geod-height.mjs';

const near = (actual, expected, tolerance = 1e-10) =>
  assert.ok(Math.abs(actual - expected) <= tolerance,
    actual + ' differs from ' + expected);

test('GEOD6 published chapter example h=123.4 N=35.2 gives H=88.2', () => {
  const { A } = syntheticHeightProfile();
  near(A.H, 88.2);
  near(A.h, A.H + A.N);
});

test('negative geoid undulation raises orthometric height above h', () => {
  const { A, B, difference: d, heightDifferenceResidual } = syntheticHeightProfile({
    geoidAtA: -12, geoidChange: 20,
    ellipsoidalAtA: 42, ellipsoidalAtB: 39,
  });
  near(A.H, 54);
  near(B.H, 31);
  near(d.H, -23);
  near(d.h - d.N, d.H);
  near(heightDifferenceResidual, 0);
});

test('changing geoid N alone leaves h fixed and changes H by opposite sign', () => {
  const original = syntheticHeightProfile();
  const changed = syntheticHeightProfile({ geoidAtA: 41.2 });
  near(changed.A.h, original.A.h);
  near(changed.A.H - original.A.H, -6);
  near(changed.B.H - original.B.H, -6);
  near(changed.difference.H, original.difference.H);
});

test('height differences use ΔH=Δh−ΔN, including zero slope', () => {
  const r = syntheticHeightProfile({ geoidAtA: 20, geoidChange: 0,
    ellipsoidalAtA: 100, ellipsoidalAtB: 104 });
  near(r.difference.H, 4);
  near(r.difference.h, 4);
  near(r.difference.N, 0);
});

test('geopotential integral agrees independently with composite trapezoids', () => {
  const result = syntheticHeightProfile({ gravityAtA: 9.78,
    gravityChange: 0.04, gradientMicro: 4.5 });
  for (const station of [result.A, result.B]) {
    // Affine acceleration: trapezoidal integration is exact on each subinterval.
    const intervals = 101;
    const ds = station.H / intervals;
    let numerical = 0;
    for (let i = 0; i < intervals; i++) {
      const g1 = station.g0 - result.gradient * (i * ds);
      const g2 = station.g0 - result.gradient * ((i + 1) * ds);
      numerical += (g1 + g2) * ds / 2;
    }
    near(station.C, numerical, 1e-9);
    near(station.C, station.H * station.meanGravity);
    near(station.dynamicHeight, station.C / HEIGHT_REFERENCE.gamma0);
  }
});

test('constant gravity and below-geoid signed potential difference', () => {
  const { A } = syntheticHeightProfile({ geoidAtA: 35, ellipsoidalAtA: 25,
    gradientMicro: 0, gravityAtA: 9.81 });
  near(A.H, -10);
  near(A.C, -98.1);
  near(A.gTop, 9.81);
  near(A.meanGravity, 9.81);
});

test('changing g0 changes geopotential number but not height', () => {
  const a = syntheticHeightProfile({ gravityChange: 0 });
  const b = syntheticHeightProfile({ gravityChange: 0.1 });
  near(a.B.H, b.B.H);
  near(b.B.C - a.B.C, 0.1 * a.B.H);
  near(a.A.C, b.A.C);
});

test('rejects NaN, infinite, out-of-range and blanked/invalid gravity', () => {
  assert.throws(() => syntheticHeightProfile({ geoidAtA: NaN }), RangeError);
  assert.throws(() => syntheticHeightProfile({ geoidChange: Infinity }), RangeError);
  assert.throws(() => syntheticHeightProfile({ ellipsoidalAtB: -40 }), RangeError);
  assert.throws(() => syntheticHeightProfile({ gravityAtA: 0 }), RangeError);
  assert.throws(() => syntheticHeightProfile({ gravityChange: 0.5 }), RangeError);
  assert.throws(() => syntheticHeightProfile({ gradientMicro: -1 }), RangeError);
});
