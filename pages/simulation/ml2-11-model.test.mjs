import assert from "node:assert/strict";
import { defaults, check, target, proposal, mhAcceptance, transition, makeChain, diagnostics } from "./ml2-11-model.mjs";
const close = (x, y, eps = 1e-11) => assert.ok(Math.abs(x - y) < eps, `${x} vs ${y}`);
for (const c of [
  { ...defaults, method: "mh", width: 0.4 },
  { ...defaults, method: "mh", width: 1 },
  { ...defaults, method: "mh", width: 4 },
  { ...defaults, method: "gibbs", beta: 0, initial: 0 },
  { ...defaults, method: "gibbs", beta: Math.log(4), initial: 0 },
  { ...defaults, method: "gibbs", beta: 3, initial: 3 },
]) {
  const pi = target(c), P = transition(c);
  close(pi.reduce((a, b) => a + b, 0), 1);
  for (let i = 0; i < pi.length; i++) {
    close(P[i].reduce((a, b) => a + b, 0), 1);
    assert.ok(P[i].every(p => p >= 0 && p <= 1));
    for (let j = 0; j < pi.length; j++) close(pi[i] * P[i][j], pi[j] * P[j][i]);
  }
  for (let j = 0; j < pi.length; j++) close(pi.reduce((sum, p, i) => sum + p * P[i][j], 0), pi[j]);
  const a = makeChain(c), b = makeChain(c);
  a.advance(100); b.advance(40); b.advance(60);
  assert.deepEqual(a.states, b.states, "batching must preserve seeded Markov path");
  assert.deepEqual(a.moves, b.moves);
  assert.equal(diagnostics(a, 100).n, 0);
  assert.equal(diagnostics(a, 0).n, 100);
}
const mh = { ...defaults, method: "mh", width: 1 };
const q = proposal(mh), pi = target(mh);
assert.notEqual(q[0][1], q[1][0], "boundary proposal is asymmetric");
close(pi[0] * q[0][1] * mhAcceptance(pi, q, 0, 1), pi[1] * q[1][0] * mhAcceptance(pi, q, 1, 0));
// Reproduce three hand calculations in the chapter independently of the sampler.
const twoTarget = [3 / 4, 1 / 4], twoProposal = [[1 / 2, 1 / 2], [1 / 2, 1 / 2]];
close(twoProposal[0][1] * mhAcceptance(twoTarget, twoProposal, 0, 1), 1 / 6);
close(twoProposal[1][0] * mhAcceptance(twoTarget, twoProposal, 1, 0), 1 / 2);
const skewPi = [1 / 2, 1 / 3, 1 / 6];
const skewQ = [[1 / 2, 1 / 2, 0], [1 / 4, 1 / 2, 1 / 4], [0, 1 / 2, 1 / 2]];
close(skewQ[0][1] * mhAcceptance(skewPi, skewQ, 0, 1), 1 / 6);
close(skewQ[1][0] * mhAcceptance(skewPi, skewQ, 1, 0), 1 / 4);
const correlated = { ...defaults, method: "gibbs", beta: Math.log(4), initial: 3 };
close(target(correlated)[3], 8 / 17);
close(transition(correlated)[3][3], 16 / 17);
close(transition(correlated)[3][1], 1 / 34);
close(transition(correlated)[3][2], 1 / 34);
const independent = transition({ ...defaults, method: "gibbs", beta: 0 });
const squared = independent.map(row => independent[0].map((_, j) =>
  row.reduce((sum, p, k) => sum + p * independent[k][j], 0)));
close(squared[0][0], 3 / 8);
close(squared[0][1], 1 / 4);
close(squared[0][3], 1 / 8);
close(independent[0][2] + independent[0][3] - (independent[0][0] + independent[0][1]), -1 / 2);
for (const bad of [{ width: 0 }, { method: "unknown" }, { initial: 20 }, { seed: -1 }, { beta: 4 }])
  assert.throws(() => check({ ...defaults, ...bad }), RangeError);
assert.throws(() => makeChain().advance(5001), RangeError);
assert.throws(() => diagnostics(makeChain(), -1), RangeError);
console.log("ML2-11: normalized kernels, detailed balance, stationary law, boundary correction, deterministic chains, burn-in and invalid inputs OK");
