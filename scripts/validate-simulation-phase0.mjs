import assert from "node:assert/strict";
import {
  PROTOCOL_VERSION, REQUEST_TYPES, validateEnvelope, validateLimits,
  matchesPendingResponse, canTransition, assertJsonSnapshot,
} from "../pages/simulation/protocol.mjs";
import * as celev from "../pages/simulation/engines/celev/two-body.mjs";
import * as ml from "../pages/simulation/engines/ml/four-cell.mjs";

const id = {
  protocolVersion: PROTOCOL_VERSION,
  sessionId: "s1", requestId: "r1", generation: 1,
  engineId: celev.engineId, experimentId: celev.experimentId,
};
const request = { ...id, type: "initialize", params: { mass: 1 }, seed: 42 };
assert.equal(validateEnvelope(request).ok, true);
for (const change of [
  { protocolVersion: 2 }, { type: "__unknown" }, { generation: -1 },
  { sessionId: "" }, { requestId: 0 }, { engineId: "" },
  { params: null }, { seed: -1 }, { seed: 2 ** 32 },
]) {
  assert.equal(validateEnvelope({ ...request, ...change }).ok, false,
    "invalid envelope accepted: " + JSON.stringify(change));
}
assert.equal(validateEnvelope(null).ok, false);
assert.equal(validateEnvelope({ ...id, type: "runBatch", steps: 1001 }).ok, false);
assert.equal(validateEnvelope({ ...id, type: "runBatch", steps: 10 }).ok, true);
assert.equal(validateEnvelope({ ...id, type: "singleStep", steps: 2 }).ok, false);
assert.equal(validateEnvelope({ ...id, type: "singleStep", steps: 1 }).ok, true);
assert.equal(validateEnvelope({ ...id, type: "error" }, "response").ok, false);
assert.equal(validateLimits().ok, true);
assert.equal(validateLimits({ maxBatchSteps: 9999 }).ok, false);
const result = { ...id, type: "result" };
assert.equal(matchesPendingResponse(result, id), true);
for (const field of ["generation", "requestId", "sessionId", "engineId", "experimentId"]) {
  const stale = { ...result, [field]: field === "generation" ? 0 : "other" };
  assert.equal(matchesPendingResponse(stale, id), false, "stale " + field);
}
assert.equal(canTransition("ready", "running"), true);
assert.equal(canTransition("disposed", "ready"), false);
assert.equal(canTransition("running", "initializing"), false);
assert.throws(() => assertJsonSnapshot({ energy: Infinity }), /NaN or Infinity/);
assert.throws(() => assertJsonSnapshot({ energy: NaN }), /NaN or Infinity/);
assert.throws(() => assertJsonSnapshot({ x: 1n }), /JSON-compatible/);
assert.throws(() => assertJsonSnapshot("too-big", 2), /size limit/);
const cycle = {}; cycle.self = cycle;
assert.throws(() => assertJsonSnapshot(cycle), /cycle/);

const cp = { mass: 1, gravitationalConstant: 1, separation: 1, dt: 0.01 };
assert.deepEqual(celev.validateParameters(cp), []);
assert.ok(celev.validateParameters({ ...cp, mass: 0 }).length);
const { state } = celev.initialize(cp);
const exact = celev.diagnostics(state);
assert.ok(Math.abs(exact.energy + 0.5) < 1e-14);
assert.ok(Math.abs(exact.angularMomentum - Math.SQRT1_2) < 1e-14);
assert.deepEqual(exact.centerOfMass, [0, 0]);
assert.throws(() => celev.stepBatch(state, 1001), /steps/);
assert.throws(() => celev.stepBatch(state, 0), /steps/);
const evolved = celev.stepBatch(state, 1000);
assert.equal(state.stepIndex, 0, "stepBatch must not mutate input");
assert.equal(evolved.state.stepIndex, 1000);
assert.equal(evolved.state.physicalTime, 10);
assert.equal(evolved.observations[0].stepIndex, 1000);
assert.ok(Math.abs(evolved.diagnostics.energy + 0.5) < 0.0001);
assert.ok(Math.abs(evolved.diagnostics.angularMomentum - Math.SQRT1_2) < 0.0001);
assert.ok(evolved.diagnostics.minimumDistance > 0.99);
assertJsonSnapshot(celev.snapshot(evolved.state));
const cp2 = { ...cp, separation: 2 };
const init2 = celev.initialize(cp2).state;
assert.ok(Math.abs(celev.diagnostics(init2).energy + 0.25) < 1e-14,
  "changing initial conditions must affect the kernel");

const mp = { probabilities: [...ml.DEFAULT_PROBABILITIES], sampleCount: 10000 };
assert.deepEqual(ml.validateParameters(mp), []);
assert.ok(ml.validateParameters({ ...mp, probabilities: [1, 0, 0, 0.1] }).length);
assert.ok(ml.validateParameters({ ...mp, sampleCount: 100001 }).length);
const a = ml.computeOnce(mp, 123).result;
const b = ml.computeOnce(mp, 123).result;
assert.deepEqual(a, b, "seed and parameters reproduce the sample exactly");
assert.equal(a.populationRisk, 0.2);
assert.equal(a.counts.reduce((x, y) => x + y, 0), mp.sampleCount);
assert.equal(a.empiricalRisk, (a.counts[1] + a.counts[2]) / mp.sampleCount);
assert.ok(Math.abs(a.empiricalRisk - 0.2) < 0.04);
assert.equal("physicalTime" in a, false);
assert.equal("epoch" in a, false);
assert.notDeepEqual(ml.computeOnce(mp, 124).result.counts, a.counts);
assert.deepEqual(ml.computeOnce(mp, 0), ml.computeOnce(mp, 0));
const changed = ml.computeOnce({ ...mp, probabilities: [1, 0, 0, 0] }, 123).result;
assert.equal(changed.populationRisk, 0);
assert.deepEqual(changed.counts, [10000, 0, 0, 0]);
assert.throws(() => ml.computeOnce(mp, -1), /seed/);
assertJsonSnapshot(a);
console.log("Simulation Phase 0 contracts / CELEV / ML fixtures: PASS (" +
  REQUEST_TYPES.length + " request types)");
