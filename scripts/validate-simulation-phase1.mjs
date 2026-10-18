import assert from "node:assert/strict";
import { Worker as NodeWorker } from "node:worker_threads";
import { createSimulationHost } from "../pages/simulation/simulation-worker-host.mjs";
import { SimulationClient } from "../pages/simulation/simulation-runtime.mjs";
import { createExperimentRecord, appendObservation, exportExperimentJson,
  importExperimentJson, exportObservationsCsv } from "../pages/simulation/experiment-record.mjs";
import { validatePlot, drawPlot } from "../pages/simulation/plot-adapters.mjs";
import * as celev from "../pages/simulation/engines/celev/two-body.mjs";
import * as burrau from "../pages/simulation/engines/celev/burrau.mjs";
import * as gallery from "../pages/simulation/engines/celev/orbit-gallery.mjs";
import * as ml from "../pages/simulation/engines/ml/four-cell.mjs";
import "../pages/simulation/ml1-04-model.test.mjs";

const base = {
  protocolVersion: 1, sessionId: "session-a", requestId: "request-a",
  generation: 1, engineId: celev.engineId, experimentId: celev.experimentId,
};
const physicsParams = { mass: 1, gravitationalConstant: 1, separation: 1, dt: 0.01 };
const responses = [];
const host = createSimulationHost((message) => responses.push(message));
function send(fields) {
  host.dispatch({ ...base, ...fields });
  return responses.at(-1);
}
assert.equal(send({ type: "initialize", params: physicsParams, seed: 1 }).type, "ready");
assert.equal(host.status(), "ready");
assert.equal(send({ type: "runBatch", steps: 100 }).type, "result");
assert.equal(responses.at(-1).stepIndex, 100);
assert.ok(Math.abs(responses.at(-1).diagnostics.energy + 0.5) < 0.0001);
assert.equal(send({ type: "pause" }).type, "paused");
assert.equal(send({ type: "runBatch", steps: 1 }).type, "error");
assert.equal(send({ type: "resume" }).type, "running");
assert.equal(send({ type: "singleStep", steps: 1 }).stepIndex, 101);
assert.equal(send({ type: "reset", generation: 2,
  params: { ...physicsParams, separation: 2 }, seed: 1 }).type, "ready");
assert.ok(Math.abs(responses.at(-1).diagnostics.energy + 0.25) < 1e-14);
assert.equal(send({ type: "runBatch", generation: 1, steps: 1 }).errorCode, "STALE");
assert.equal(send({ type: "runBatch", generation: 2, steps: 1001 }).errorCode, "INVALID_REQUEST");
assert.equal(send({ type: "dispose", generation: 2 }).type, "disposed");
assert.equal(send({ type: "runBatch", generation: 2, steps: 1 }).errorCode, "DISPOSED");

const fourCell = createSimulationHost((message) => responses.push(message));
fourCell.dispatch({ ...base, type: "computeOnce", engineId: ml.engineId,
  experimentId: ml.experimentId, params: {
    probabilities: [0.4,0.1,0.1,0.4], sampleCount: 10000,
  }, seed: 123 });
assert.equal(responses.at(-1).type, "result");
assert.equal(responses.at(-1).result.populationRisk, 0.2);
assert.ok(Math.abs(responses.at(-1).result.empiricalRisk - 0.2) < 0.04);
assert.equal("physicalTime" in responses.at(-1).result, false);

// Real host logic over an asynchronous message boundary (not a fake kernel).
class TestWorker {
  constructor() {
    this.handlers = {};
    this.terminated = false;
    this.host = createSimulationHost((message) => {
      queueMicrotask(() => {
        if (!this.terminated) this.handlers.message?.({ data: message });
      });
    });
  }
  addEventListener(type, fn) { this.handlers[type] = fn; }
  postMessage(message) {
    queueMicrotask(() => { if (!this.terminated) this.host.dispatch(message); });
  }
  terminate() { this.terminated = true; }
}
const client = new SimulationClient(celev.engineId, celev.experimentId, {
  workerFactory: () => new TestWorker(), timeoutMs: 1000,
});
assert.equal((await client.initialize(physicsParams, 1)).type, "ready");
assert.equal((await client.runBatch(10)).stepIndex, 10);
assert.equal((await client.pause()).type, "paused");
await assert.rejects(() => client.runBatch(1), /not ready/);
await client.resume();
assert.equal((await client.runBatch(11)).stepIndex, 21);
const pending = client.runBatch(10);
client.cancel();
await assert.rejects(pending, /cancelled/);
assert.equal((await client.reset(physicsParams, 1)).snapshot.stepIndex, 0);
client.dispose();
await assert.rejects(() => client.runBatch(1), /not ready/);

let record = createExperimentRecord({
  engineId: ml.engineId, experimentId: ml.experimentId,
  seed: 123, params: { sampleCount: 10, probabilities: [0.4,0.1,0.1,0.4] },
});
record = appendObservation(record, { stepIndex: 1, note: "=malicious" });
assert.equal(importExperimentJson(exportExperimentJson(record)).observations.length, 1);
assert.ok(exportObservationsCsv(record).includes("'=malicious"),
  "CSV should neutralize spreadsheet formula cells");
assert.throws(() => importExperimentJson(JSON.stringify({schemaVersion: 99})), /Invalid/);
assert.throws(() => appendObservation(record, { energy: NaN }), /NaN or Infinity/);
assert.equal(validatePlot({
  type: "line", xAxis: {label:"x",unit:"s"}, yAxis:{label:"y",unit:"m"}, series:[],
}).type, "line");
assert.throws(() => validatePlot({ type: "line" }), /axes/);

const draws = [];
const ctx = new Proxy({}, { get(target, key) {
  if (!(key in target)) target[key] = (...args) => draws.push([key, args]);
  return target[key];
}, set(target,key,value){target[key]=value;return true;} });
drawPlot({width:720,height:440,getContext:()=>ctx},{
  type:"scatter",xAxis:{label:"x",unit:"m"},yAxis:{label:"y",unit:"m"},
  series:[{points:[[0,0],[1,1]]}],
});
assert.ok(draws.length > 5);
const threaded = new NodeWorker(
  new URL("./simulation-worker-node-wrapper.mjs", import.meta.url), { type: "module" },
);
const threadedRequest = (request) => new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error("Node Worker message timeout")), 5000);
  threaded.once("message", (response) => {
    clearTimeout(timer); resolve(response);
  });
  threaded.postMessage(request);
});
try {
  const initialized = await threadedRequest({
    ...base, type: "initialize", params: physicsParams, seed: 1,
  });
  assert.equal(initialized.type, "ready");
  const batch = await threadedRequest({ ...base, type: "runBatch", steps: 20 });
  assert.equal(batch.type, "result");
  assert.equal(batch.stepIndex, 20);
  assert.ok(Math.abs(batch.diagnostics.energy + 0.5) < 1e-4);
} finally {
  await threaded.terminate();
}

// Independent Burrau reference invariants: mass=opposite side (3,4,5),
// zero centre of mass/momentum/angular momentum, E0=-769/60.
const b0 = burrau.initialize({ dt: 0.25, rtol: 1e-12 }).state;
const d0 = burrau.diagnostics(b0);
assert.equal(b0.positions.length, 3);
assert.deepEqual(b0.masses, [3, 4, 5]);
assert.ok(d0.centerOfMass.every(x => Math.abs(x) < 1e-14));
assert.ok(d0.momentum.every(x => Math.abs(x) < 1e-14));
assert.equal(d0.angularMomentum, 0);
assert.ok(Math.abs(d0.energy + 769 / 60) < 1e-12);
assert.equal(d0.minimumDistance, 3);
const b1 = burrau.stepBatch(b0, 50);
assert.equal(b1.state.stepIndex, 50);
assert.ok(Math.abs(b1.diagnostics.energyDrift) < 1e-3);
const bHalf = burrau.stepBatch(burrau.initialize({ dt: 0.125, rtol: 1e-12 }).state, 100);
for (let i = 0; i < 3; i++) for (let k = 0; k < 2; k++) {
  assert.ok(Math.abs(b1.state.positions[i][k] - bHalf.state.positions[i][k]) < 1e-3);
}
const nearState = burrau.initialize({ dt: 0.25, rtol: 1e-12 }).state;
nearState.positions[1] = [nearState.positions[0][0],
  nearState.positions[0][1]];
assert.throws(() => burrau.stepBatch(nearState, 1), /NEAR_ENCOUNTER/);
const bReplies = [];
createSimulationHost((m) => bReplies.push(m)).dispatch({
  ...base, type: "initialize", generation: 1,
  engineId: burrau.engineId, experimentId: burrau.experimentId,
  params: { dt: 0.25, rtol: 1e-12 }, seed: 0,
});
assert.equal(bReplies.at(-1).type, "ready");
assert.ok(Math.abs(bReplies.at(-1).diagnostics.energy + 769 / 60) < 1e-12);
// Full Burrau close encounters and late escape: the 1967 qualitative
// reference is mass 3 escaping while masses 4 and 5 remain bound.
// This checks observable structure, not pointwise chaotic-trajectory accuracy.
let far = burrau.initialize({ dt: 0.25, rtol: 1e-12 }).state;
for (let i = 0; i < 16; i++) {
  const batch = burrau.stepBatch(far, 20);
  assert.equal(batch.observations.length, 20);
  assert.equal(batch.state.stepIndex, (i + 1) * 20);
  far = batch.state;
  assert.ok(Math.abs(batch.diagnostics.energyDrift) < 5e-5,
    "adaptive solver energy drift should remain bounded at t=" + far.physicalTime);
}
const ending = burrau.diagnostics(far);
assert.ok(Math.abs(far.physicalTime - 80) < 1e-9);
assert.ok(ending.escapeDistance3 > 30, "body of mass 3 did not escape");
assert.ok(ending.binarySpecificEnergy45 < 0, "masses 4 and 5 are not bound");
assert.ok(ending.acceptedSubsteps > far.stepIndex * 10,
  "near encounters must use many adaptive solver substeps");
assert.ok(Math.abs(ending.momentum[0]) < 1e-7 &&
  Math.abs(ending.momentum[1]) < 1e-7);
assert.ok(Math.abs(ending.angularMomentum) < 1e-7);
// At late time, two tolerances need not agree pointwise in a chaotic orbit,
// but must agree on the breakup into an escaper and a bound pair.
let comparison = burrau.initialize({ dt: 0.25, rtol: 1e-11 }).state;
for (let i = 0; i < 16; i++) comparison = burrau.stepBatch(comparison, 20).state;
const cd = burrau.diagnostics(comparison);
assert.ok(cd.escapeDistance3 > 30 && cd.binarySpecificEnergy45 < 0);
assert.ok(Math.abs(cd.energyDrift) < 5e-5);
console.log("Burrau adaptive full escape: t=80; escaped mass=3, bound masses=4/5; drift=" +
  ending.energyDrift + "; steps=" + ending.acceptedSubsteps);

// Three-body orbit-gallery reference tests. Initial conditions are finite
// decimals from published numerical orbits, not mathematically exact periods.
const expectedPresets = [
  "figure-eight", "lagrange", "euler", "butterfly-i", "butterfly-ii",
  "moth-i", "yin-yang-i", "dragonfly",
];
assert.deepEqual(Object.keys(gallery.PRESETS), expectedPresets);
for (const preset of expectedPresets) {
  const { state: initial } = gallery.initialize({
    preset, dt: 0.05, rtol: 1e-12,
  });
  const d = gallery.diagnostics(initial);
  assert.ok(Math.abs(d.energyDrift) < 1e-12);
  assert.ok(Math.abs(d.momentum[0]) < 1e-12 &&
    Math.abs(d.momentum[1]) < 1e-12);
  assert.ok(d.centerOfMass.every(x => Math.abs(x) < 1e-12));
  const batch = gallery.stepBatch(initial, 20);
  assert.equal(batch.state.stepIndex, 20);
  assert.ok(Math.abs(batch.state.physicalTime - 1) < 1e-12);
  assert.equal(batch.observations.length, 20);
  assert.ok(Math.abs(batch.diagnostics.energyDrift) < 5e-5,
    preset + " energy drift after t=1");
}
// The two analytically exact circular relative equilibria should close.
for (const preset of ["lagrange", "euler"]) {
  const period = gallery.PRESETS[preset].period;
  const initial = gallery.initialize({
    preset, dt: period / 128, rtol: 1e-12,
  }).state;
  let state = initial;
  for (let i = 0; i < 8; i++) state = gallery.stepBatch(state, 16).state;
  const d = gallery.diagnostics(state);
  assert.ok(d.closureDistance < 5e-6, preset + " geometric closure");
  assert.ok(d.closureVelocity < 5e-6, preset + " velocity closure");
  assert.ok(Math.abs(d.energyDrift) < 1e-7);
}
const eight0 = gallery.initialize({preset:"figure-eight",
  dt:gallery.PRESETS["figure-eight"].period/128,rtol:1e-12}).state;
assert.ok(Math.abs(gallery.diagnostics(eight0).energy + 1.28714) < 1e-4);
let eight = eight0;
for(let i = 0; i < 8; i++) eight=gallery.stepBatch(eight,16).state;
assert.ok(gallery.diagnostics(eight).closureDistance < 0.01,
  "published truncated figure-eight initial condition should close approximately");
assert.ok(Math.abs(gallery.diagnostics(eight).energyDrift) < 1e-7);
const galleryResponses = [];
const galleryHost = createSimulationHost((response) => galleryResponses.push(response));
galleryHost.dispatch({...base,type:"initialize",generation:1,
  engineId:gallery.engineId,experimentId:gallery.experimentId,
  params:{preset:"figure-eight",dt:0.05,rtol:1e-12},seed:0});
assert.equal(galleryResponses.at(-1).type,"ready");
galleryHost.dispatch({...base,type:"runBatch",generation:1,
  engineId:gallery.engineId,experimentId:gallery.experimentId,steps:2});
assert.equal(galleryResponses.at(-1).type,"result");
assert.equal(galleryResponses.at(-1).snapshot.positions.length,3);
assert.equal(galleryResponses.at(-1).observations.length,2);
assert.deepEqual(gallery.validateParameters({
  preset:"not-a-preset",dt:0.05,rtol:1e-12,
}).length,1);
console.log("CELEV gallery: 8 presets, Newton energy/momentum, circular closure, " +
  "figure-eight choreography and real Worker host: PASS");

const markerDraw = [];
const mockCtx = new Proxy({}, {
  get(obj, key) {
    if (!(key in obj)) obj[key] = (...args) => markerDraw.push([key, args]);
    return obj[key];
  },
  set(obj, key, value) { obj[key] = value; return true; },
});
drawPlot({width:720,height:440,getContext:()=>mockCtx}, {
  type:"line", xAxis:{label:"x",unit:"distance"},
  yAxis:{label:"y",unit:"distance"},
  bounds:{x:[-2,2],y:[-2,2],equalAspect:true},
  series:[{points:[[-0.5,0]]},{points:[[0.5,0]]}],
  markers:[{id:1,x:-0.5,y:0},{id:2,x:0.5,y:0}],
}, 1);
assert.ok(markerDraw.some(([method]) => method === "arc"), "body 1 circular marker missing");
assert.ok(markerDraw.some(([method]) => method === "rect"), "body 2 square marker missing");
assert.ok(markerDraw.some(([method,args]) => method === "fillText" && args[0] === "1"));
assert.ok(markerDraw.some(([method,args]) => method === "fillText" && args[0] === "2"));
console.log("Burrau energy/step-halving, collision guard and numbered particle markers: PASS");

console.log("Simulation Phase 1 host / lifecycle / real Worker / records / plotting: PASS");
