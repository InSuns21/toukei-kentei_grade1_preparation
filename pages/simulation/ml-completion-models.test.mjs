import test from 'node:test';
import assert from 'node:assert/strict';
import { mlLabSpecs, runMlLab } from './ml-completion-models.mjs';

const close = (a, b, tolerance = 1e-10) => assert.ok(Math.abs(a - b) <= tolerance,
  `expected ${a} ≈ ${b}, tolerance ${tolerance}`);
const metric = (result, prefix) => {
  const item = result.metrics.find(m => m.name.startsWith(prefix));
  assert.ok(item, `metric not found: ${prefix}`);
  return item.value;
};

test('all eight explicit chapter models are reproducible and change their actual outputs', () => {
  assert.deepEqual(Object.keys(mlLabSpecs),
    ['ML1-08', 'ML1-12', 'ML1-13', 'ML1-19', 'ML1-20', 'ML1-21', 'ML2-09', 'ML2-20']);
  const variants = {
    'ML1-08': { separation: 'overlap' }, 'ML1-12': { leakage: 'leaked' },
    'ML1-13': { prevalence: .55 }, 'ML1-19': { rank: 2 },
    'ML1-20': { initial: 'poor' }, 'ML1-21': { missing: 'mnar' },
    'ML2-09': { family: 'full' }, 'ML2-20': { weight1: 0 },
  };
  for (const id of Object.keys(mlLabSpecs)) {
    const a = runMlLab(id), b = runMlLab(id);
    assert.deepEqual(a, b, id + ' fixed-seed should reproduce every observation');
    const alternative = runMlLab(id, variants[id]);
    assert.notDeepEqual(alternative.metrics, a.metrics, id + ' must recalculate its model');
    assert.ok(a.charts.every(ch => ch.series.length && ch.series.every(s => Array.isArray(s.points))));
    assert.ok(a.metrics.every(m => m.value === null || Number.isFinite(m.value)));
  }
});

test('inputs are bounded and unsupported modes rejected', () => {
  assert.throws(() => runMlLab('ML1-08', { rate: NaN }), RangeError);
  assert.throws(() => runMlLab('ML1-20', { k: 4 }), RangeError);
  assert.throws(() => runMlLab('ML2-09', { steps: -1 }), RangeError);
  assert.throws(() => runMlLab('ML1-13', { seed: 3.5 }), RangeError);
  assert.throws(() => runMlLab('ML2-20', { decoderStd: 0 }), RangeError);
  assert.throws(() => runMlLab('ML0-00'), RangeError);
});

test('logistic: initial cross-entropy log2, separable loss shrinks without finite optimum', () => {
  const start = runMlLab('ML1-08', { steps: 0 });
  close(metric(start, '最終負対数'), Math.log(2));
  close(metric(start, '係数ノルム'), 0);
  const short = runMlLab('ML1-08', { steps: 40 });
  const long = runMlLab('ML1-08', { steps: 300 });
  assert.ok(metric(long, '係数ノルム') > metric(short, '係数ノルム'));
  assert.ok(metric(long, '最終負対数') < metric(short, '最終負対数'));
  const ridge = runMlLab('ML1-08', { steps: 300, ridge: 1 });
  assert.ok(metric(ridge, '係数ノルム') < metric(long, '係数ノルム'));
});

test('model selection: CV and independent test are computed on disjoint samples', () => {
  const clean = runMlLab('ML1-12', { seed: 86 });
  const leaked = runMlLab('ML1-12', { seed: 86, leakage: 'leaked' });
  assert.notEqual(metric(clean, '選択した保留MSE'), metric(leaked, '選択した保留MSE'));
  assert.notEqual(metric(clean, '独立テストMSE'), metric(leaked, '独立テストMSE'));
  assert.ok(clean.charts[0].series[2].points.every(([k, v]) => k >= 1 && v >= 0));
  assert.equal(metric(clean, '検証に使った標本数'), 30);
});

test('classification: confusion exhausts observations; threshold changes decisions not proper scores', () => {
  const low = runMlLab('ML1-13', { threshold: .2, count: 500 });
  const high = runMlLab('ML1-13', { threshold: .8, count: 500 });
  for (const r of [low, high]) {
    assert.equal(['TP', 'FP', 'TN', 'FN'].reduce((s, name) => s + metric(r, name), 0), 500);
    assert.ok(metric(r, 'Brier') >= 0 && metric(r, 'Brier') <= 1);
    assert.ok(metric(r, '対数損失') >= 0);
  }
  assert.ok(metric(low, 'TP') >= metric(high, 'TP'));
  assert.ok(metric(low, 'FP') >= metric(high, 'FP'));
  close(metric(low, 'Brier'), metric(high, 'Brier'));
  close(metric(low, '対数損失'), metric(high, '対数損失'));
});

test('PCA: rank-0/1/2 reconstruction errors equal discarded covariance eigenvalues', () => {
  const r0 = runMlLab('ML1-19', { rank: 0 });
  const r1 = runMlLab('ML1-19', { rank: 1 });
  const r2 = runMlLab('ML1-19', { rank: 2 });
  for (const r of [r0, r1, r2]) close(metric(r, '再構成誤差'), metric(r, '理論の捨てた固有値和'));
  close(metric(r2, '再構成誤差'), 0);
  close(metric(r0, '再構成誤差'), metric(r0, '第一固有値') + metric(r0, '第二固有値'));
  close(metric(r1, '再構成誤差'), metric(r1, '第二固有値'));
  close(metric(r1, '第一特異値') ** 2, 180 * metric(r1, '第一固有値'));
});

test('Lloyd: every assignment/mean step is non-increasing, including poor initializations', () => {
  for (const initial of ['good', 'poor']) for (const k of [2, 3]) {
    const r = runMlLab('ML1-20', { initial, k, steps: 40, seed: 312 });
    r.history.slice(1).forEach((v, i) => assert.ok(v <= r.history[i] + 1e-10,
      `k=${k} ${initial} step=${i + 1}: ${r.history[i]}→${v}`));
    assert.ok(metric(r, '真の群0/1のWard増分') >= 0);
  }
  const baseline = runMlLab('ML1-20', { noise: .05, steps: 0 });
  assert.ok(Math.abs(metric(baseline, '真の群0/1のWard増分') - 255) < 25);
});

test('covariate shift: target prevalence exact; missingness and test leakage change fit', () => {
  const low = runMlLab('ML1-21', { shift: .3, missing: 'mcar' });
  const high = runMlLab('ML1-21', { shift: .8, missing: 'mcar' });
  close(metric(low, '運用母集団陽性率'), .31);
  close(metric(high, '運用母集団陽性率'), .66);
  const leaked = runMlLab('ML1-21', { leak: 'on' });
  const clean = runMlLab('ML1-21', { leak: 'off' });
  assert.notEqual(metric(leaked, '推定 P(Y=1|X=0)'), metric(clean, '推定 P(Y=1|X=0)'));
  const mnar = runMlLab('ML1-21', { missing: 'mnar' });
  assert.match(mnar.note, /識別不能/);
});

test('mean-field: each coordinate ascent increases ELBO and respects log evidence', () => {
  for (const order of ['12', '21']) for (const coupling of [-2, 0, Math.log(4), 3]) {
    const r = runMlLab('ML2-09', { order, coupling, steps: 50, q1: .11, q2: .91 });
    r.history.slice(1).forEach((v, i) => assert.ok(v >= r.history[i] - 1e-12));
    assert.ok(metric(r, 'KL(q||posterior)') >= -1e-12);
    close(metric(r, 'log evidence') - metric(r, 'ELBO'), metric(r, 'KL(q||posterior)'));
  }
  const independent = runMlLab('ML2-09', { coupling: 0, steps: 1 });
  close(metric(independent, '最終 q₁'), .5); close(metric(independent, '最終 q₂'), .5);
  close(metric(independent, 'ELBO'), Math.log(4));
  const full = runMlLab('ML2-09', { coupling: Math.log(4), family: 'full', steps: 10 });
  close(metric(full, 'KL(q||posterior)'), 0);
  close(metric(full, '最終 q₁'), 5 / 7);
  close(metric(full, 'ELBO'), Math.log(7));
});

test('two-dimensional Gaussian VAE: ELBO identity, KL, beta and latent collapse are exact', () => {
  const posterior = runMlLab('ML2-20', {
    x: 1, weight1: 1, weight2: 0, priorMean: 0, priorStd: 1, decoderStd: 1,
    encoderMean1: .5, encoderMean2: 0,
    encoderStd1: 1 / Math.sqrt(2), encoderStd2: 1, beta: 1,
  });
  close(metric(posterior, 'KL(q||真の事後)'), 0);
  close(metric(posterior, '通常の ELBO'), -.5 * Math.log(4 * Math.PI) - .25);
  close(metric(posterior, '真の log p(x)'), metric(posterior, '通常の ELBO'));
  const beta = runMlLab('ML2-20', { beta: 4 });
  assert.ok(metric(beta, 'β目的') < metric(beta, '通常の ELBO'));
  const collapse = runMlLab('ML2-20', { weight1: 0, weight2: 0, priorMean: 0, priorStd: 1,
    encoderMean1: 0, encoderMean2: 0, encoderStd1: 1, encoderStd2: 1 });
  close(metric(collapse, 'KL(q||prior)'), 0);
  close(metric(collapse, 'KL(q||真の事後)'), 0);
  close(metric(collapse, '通常の ELBO'), metric(collapse, '真の log p(x)'));
  const changedPrior = runMlLab('ML2-20', { priorMean: .5, priorStd: 2 });
  assert.notEqual(metric(changedPrior, '真の log p(x)'), metric(beta, '真の log p(x)'));
});
