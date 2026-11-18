import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {referencePoint, eulerReference, compareTracerSnapshot} from './fcg1-model.mjs';

const lessonPath = new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG1/tracer.js', import.meta.url);
const lessonSource = readFileSync(lessonPath, 'utf8');
const createLab = vm.runInNewContext(lessonSource + '\ncreateLab', {});
function fakeCanvas() {
  const ctx = Object.fromEntries(['beginPath', 'moveTo', 'lineTo', 'stroke',
    'fillRect', 'fillText', 'setLineDash', 'arc', 'fill'].map(k => [k, () => {}]));
  return {width: 660, height: 410, getContext: type => type === '2d' ? ctx : null};
}
function integrate(mode, h, n) {
  const messages = [];
  const lab = createLab(fakeCanvas(), {mode, dt: h}, value => messages.push(value));
  assert.equal(messages.length, 1);
  for (let i = 0; i < n; i++) assert.equal(lab.step(), true);
  return {lab, messages, snapshot: lab.snapshot()};
}
function close(actual, expected, tolerance = 1e-10) {
  assert.ok(Math.abs(actual - expected) < tolerance,
    'actual=' + actual + ' expected=' + expected);
}
for (const mode of ['rotation', 'steady', 'unsteady']) {
  test(mode + ': two IDs retain identity and match independent Euler values', () => {
    const {snapshot, messages, lab} = integrate(mode, 0.1, 20);
    assert.equal(messages.length, 21);
    assert.equal(snapshot.time, 2);
    assert.deepEqual(Array.from(snapshot.particles.map(p => p.id)), [1, 2]);
    const rows = compareTracerSnapshot(mode, 0.1, snapshot);
    assert.ok(rows.every(row => row.pass));
    close(snapshot.particles[0].error, rows[0].physicalError, 1e-10);
    lab.reset();
    close(lab.snapshot().time, 0);
    assert.deepEqual(Array.from(lab.snapshot().particles.map(p => p.id)), [1, 2]);
  });
}
test('rotation: exact orbit is a circle; Euler radius is (1+h²)^(n/2)', () => {
  const initial = [1, 0];
  const exact = referencePoint('rotation', initial, Math.PI / 2);
  close(exact[0], 0); close(exact[1], 1);
  const point = eulerReference('rotation', initial, 0.25, 4);
  close(Math.hypot(...point), 289 / 256);
  const fine = eulerReference('rotation', initial, 0.125, 8);
  assert.ok(Math.hypot(...fine) < Math.hypot(...point));
  assert.ok(Math.hypot(...fine) > 1);
});
test('steady shear: Euler and exact are different approximations to same streamline', () => {
  const exact = referencePoint('steady', [0, 0], 2);
  close(exact[0], 2); close(exact[1], 2);
  const coarse = eulerReference('steady', [0, 0], 0.25, 8);
  close(coarse[1], 1.75);
  close(exact[1] - coarse[1], 0.25);
});
test('unsteady shear: path and frozen streamline differ at x=T/2', () => {
  const T = 2;
  const P = referencePoint('unsteady', [0, 0], T);
  close(P[0], 2); close(P[1], 8 / 3);
  const pathMid = referencePoint('unsteady', [0, 0], T / 2)[1];
  const frozenMid = P[1] + T / 2 * (1 - T * T);
  close(pathMid, 1 / 3);
  close(frozenMid, -1 / 3);
  close(pathMid - frozenMid, 2 / 3);
});
test('unsteady shear: Euler global error at h=1 and h=1/2', () => {
  const initial = [0, 0];
  close(eulerReference('unsteady', initial, 0.25, 8)[1], 0.25 ** 3 * (8 * 7 * 15 / 6));
  // h=1 is outside the interactive lab limit, but the pen-and-paper result
  // follows the same sum-of-squares formula: 1*(0²+1²)=1.
  const coarse = (0 ** 2 + 1 ** 2) * 1 ** 3;
  const fine = eulerReference('unsteady', initial, 0.5 / 2, 8); // h=0.25
  close(coarse - 8 / 3, -5 / 3);
  assert.ok(fine[1] > coarse);
  close((14 / 8) - 8 / 3, -11 / 12);
});
test('invalid snapshots are rejected instead of certified', () => {
  const {snapshot} = integrate('rotation', 0.1, 2);
  snapshot.particles[1].id = 1;
  assert.throws(() => compareTracerSnapshot('rotation', 0.1, snapshot), /粒子ID/);
});
test('independent oracle detects a wrong velocity update', () => {
  const {snapshot} = integrate('steady', 0.1, 4);
  snapshot.particles[0].position[1] += 0.1;
  const rows = compareTracerSnapshot('steady', 0.1, snapshot);
  assert.equal(rows[0].pass, false);
});
test('lesson includes frozen time, physical time, step/pause/reset, and canvas', () => {
  for (const marker of ['physicalTime', 'observationTime', 'function step()',
    'function reset()', 'function draw()', 'function frozenSamples', 'p.id']) {
    assert.ok(lessonSource.includes(marker), 'missing: ' + marker);
  }
});
