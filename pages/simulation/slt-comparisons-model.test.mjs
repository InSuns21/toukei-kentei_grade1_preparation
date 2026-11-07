import test from 'node:test';
import assert from 'node:assert/strict';
import {
  randomGenerator, meanAndInterval, wilsonInterval, finiteClassExperiment,
  vcOverfitExperiment, fitRidge, ridgeSweepExperiment, tangentKernel,
  trainFiniteNTK, ntkSweepExperiment
} from './slt-comparisons-model.mjs';

function near(actual, expected, tolerance = 1e-10) {
  assert.ok(Math.abs(actual - expected) <= tolerance,
    `${actual} differs from ${expected} by more than ${tolerance}`);
}

test('seeded uniform and Gaussian streams are exactly reproducible', () => {
  const a = randomGenerator(123), b = randomGenerator(123), c = randomGenerator(124);
  const sequence = r => Array.from({ length: 16 }, (_, i) => i % 2 ? r.uniform() : r.normal());
  assert.deepEqual(sequence(a), sequence(b));
  assert.notDeepEqual(sequence(a), sequence(c));
  assert.throws(() => randomGenerator(-1), /seed/);
});

test('Monte Carlo interval uses sample variance and Wilson endpoints stay in [0,1]', () => {
  const result = meanAndInterval([0, 2]);
  near(result.mean, 1);
  near(result.se, 1);
  near(result.low, -0.96);
  near(wilsonInterval(0, 10).low, 0);
  near(wilsonInterval(10, 10).high, 1);
  assert.throws(() => meanAndInterval([]), /sample/);
});

test('finite class radius is exact Hoeffding-union formula and coverage is reproducible', () => {
  const settings = { n: 80, classSize: 64, delta: 0.1, repeats: 120, seed: 74 };
  const first = finiteClassExperiment(settings);
  const second = finiteClassExperiment(settings);
  assert.deepEqual(first, second);
  near(first.bound.radius, Math.sqrt(Math.log(2 * 64 / 0.1) / 160));
  assert.ok(first.observed.coverage.mean >= 0 && first.observed.coverage.mean <= 1);
  assert.ok(first.observed.ermExcessRisk.mean >= -1e-14);
  assert.equal(first.observed.maxDeviation.count, 120);
  assert.throws(() => finiteClassExperiment({ delta: 0 }), /delta/);
  assert.throws(() => finiteClassExperiment({ classSize: 257 }), /classSize/);
  assert.throws(() => finiteClassExperiment({ n: 3000, classSize: 256, repeats: 1000 }), /budget/);
});

test('one fixed hypothesis has Bernoulli error risk equal to flip rate for target in class', () => {
  // Mask 73 = bits at 0,3,6; it occurs in the first 74 hypotheses.
  // With n large, ERM should approach irreducible noise and excess risk near 0.
  const result = finiteClassExperiment({ n: 400, classSize: 74, noise: 0.1, repeats: 100, seed: 12 });
  assert.ok(result.observed.ermExcessRisk.mean < 0.035);
  assert.ok(result.observed.maxDeviation.mean < 0.12);
});

test('VC memorizing ERM has zero train error and matches (1-1/D)^n expectation', () => {
  const settings = { n: 20, domainSize: 50, repeats: 700, testSize: 150, seed: 123 };
  const result = vcOverfitExperiment(settings);
  near(result.theoreticalExpectedRisk, (49 / 50) ** 20);
  near(result.observed.trainError, 0);
  near(result.observed.alwaysOnePopulationRisk, 0);
  assert.ok(Math.abs(result.observed.populationRisk.mean - result.theoreticalExpectedRisk) < 0.02);
  assert.ok(Math.abs(result.observed.holdoutTestError.mean - result.theoreticalExpectedRisk) < 0.02);
  assert.deepEqual(result, vcOverfitExperiment(settings));
});

test('ridge primal solves hand-derived 2x2 normal equations with penalty n*lambda', () => {
  const X = new Float64Array([1, 0, 0, 1, 1, 1]); // n=3, p=2
  const y = new Float64Array([1, 2, 3]);
  const beta = fitRidge(X, y, 3, 2, 0);
  near(beta[0], 1);
  near(beta[1], 2);
  const shrink = fitRidge(new Float64Array([1, 0, 0, 1]), new Float64Array([2, 4]), 2, 2, 1);
  near(shrink[0], 2 / 3);
  near(shrink[1], 4 / 3);
});

test('ridge dual gives the unique minimum norm interpolation for p>n', () => {
  const beta = fitRidge(new Float64Array([1, 1, 0]), new Float64Array([2]), 1, 3, 0);
  near(beta[0], 1);
  near(beta[1], 1);
  near(beta[2], 0);
  assert.throws(() => fitRidge(new Float64Array([0, 0]), new Float64Array([1]), 1, 2, 0), /NUMERICAL_UNRESOLVED/);
  assert.throws(() => fitRidge(new Float64Array([1]), new Float64Array([1, 2]), 2, 1, 0), /dimension mismatch/);
});

test('ridge spectrum/noise/penalty and p/n are active inputs, with finite nonnegative risk', () => {
  const base = { n: 24, repeats: 8, seed: 17 };
  const a = ridgeSweepExperiment(base);
  assert.deepEqual(a, ridgeSweepExperiment(base));
  assert.equal(a.rows.length, 8);
  assert.ok(a.rows.some(row => row.ratio < 1));
  assert.ok(a.rows.some(row => row.ratio > 1));
  assert.ok(a.rows.every(row => row.status === 'ok'));
  for (const row of a.rows) {
    assert.ok(row.trainingMSE.mean >= 0);
    assert.ok(row.populationTestMSE.mean >= 0);
  }
  const b = ridgeSweepExperiment({ ...base, lambda: 0.3, noise: 1.2, spectrumDecay: 3 });
  assert.notDeepEqual(a.rows, b.rows);
  assert.throws(() => ridgeSweepExperiment({ n: 5 }), /n/);
  assert.throws(() => ridgeSweepExperiment({ n: 70, repeats: 100 }), /budget/);
});

test('ridge exact independent-test MSE identity is consistent with a fresh Gaussian Monte Carlo sample', () => {
  const beta = new Float64Array([0.7, -0.2]);
  const truth = new Float64Array([1, 0.4]);
  const eigenvalues = [1, 0.4];
  const sigma = 0.3;
  const exact = sigma ** 2 + eigenvalues.reduce((sum, s, j) => sum + s * (beta[j] - truth[j]) ** 2, 0);
  const rng = randomGenerator(789);
  let sampled = 0;
  for (let i = 0; i < 100000; i++) {
    const x = eigenvalues.map(s => rng.normal() * Math.sqrt(s));
    const residual = x.reduce((sum, value, j) => sum + value * (beta[j] - truth[j]), 0) - sigma * rng.normal();
    sampled += residual * residual;
  }
  assert.ok(Math.abs(sampled / 100000 - exact) < 0.01);
});

test('tanh network empirical NTK matches explicit Jacobian dot product', () => {
  const params = new Float64Array([1, 0, 0, 2, 1, -0.3]);
  const left = [-1, 0.5], right = [-0.5, 1];
  const result = tangentKernel(params, 2, left, right);
  function Jacobian(x) {
    return [0, 1].flatMap(j => {
      const [a,w,b] = [params[3*j],params[3*j+1],params[3*j+2]];
      const phi = Math.tanh(w*x+b), slope = 1-phi*phi;
      return [phi,a*slope*x,a*slope].map(value => value/Math.sqrt(2));
    });
  }
  for (let i = 0; i < left.length; i++) {
    for (let j = 0; j < right.length; j++) {
      const a = Jacobian(left[i]), b = Jacobian(right[j]);
      near(result[i*right.length+j], a.reduce((sum,value,k)=>sum+value*b[k],0));
    }
  }
  const simple = tangentKernel(new Float64Array([1,0,0]),1,[2],[3]);
  near(simple[0], 7); // d/dw = x, d/db=1 at w=b=0
});

test('NTK linearization and kernel drift are exactly zero at time 0 and step 0', () => {
  const atZero = trainFiniteNTK({ width: 8, step: 0.2, iterations: 0, seed: 42 });
  near(atZero.drift, 0);
  near(atZero.linearizationRMSE, 0);
  const stopped = trainFiniteNTK({ width: 8, step: 0, iterations: 40, seed: 42 });
  near(stopped.drift, 0);
  near(stopped.linearizationRMSE, 0);
  near(atZero.trainMSE, stopped.trainMSE);
});

test('finite NTK training and frozen linearization agree to first order in small step', () => {
  const small = trainFiniteNTK({ width: 12, step: 0.0005, iterations: 1, seed: 73 });
  const double = trainFiniteNTK({ width: 12, step: 0.001, iterations: 1, seed: 73 });
  assert.ok(small.linearizationRMSE > 0);
  assert.ok(double.linearizationRMSE > small.linearizationRMSE * 3.5);
  assert.ok(double.linearizationRMSE < small.linearizationRMSE * 4.5);
});

test('NTK width, step, iteration and seed influence the sweep and all intervals are computed', () => {
  const settings = { width: 8, step: 0.05, iterations: 15, repeats: 4, seed: 43 };
  const a = ntkSweepExperiment(settings);
  assert.deepEqual(a, ntkSweepExperiment(settings));
  assert.deepEqual(a.rows.map(row => row.width), [8, 16, 32]);
  assert.ok(a.rows.every(row => row.status === 'ok' && row.drift.count === 4));
  assert.notDeepEqual(a.rows, ntkSweepExperiment({ ...settings, step: 0.2 }).rows);
  assert.notDeepEqual(a.rows, ntkSweepExperiment({ ...settings, seed: 44 }).rows);
  assert.notDeepEqual(a.rows, ntkSweepExperiment({ ...settings, iterations: 8 }).rows);
  assert.throws(() => ntkSweepExperiment({ width: 129 }), /width/);
  assert.throws(() => ntkSweepExperiment({ width: 128, iterations: 200, repeats: 20 }), /budget/);
});
