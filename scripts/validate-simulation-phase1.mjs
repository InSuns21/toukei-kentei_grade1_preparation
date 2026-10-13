import assert from "node:assert/strict";
import { createSimulationHost } from "../pages/simulation/simulation-worker-host.mjs";
import { SimulationClient } from "../pages/simulation/simulation-runtime.mjs";
import { createExperimentRecord, appendObservation, exportExperimentJson,
  importExperimentJson, exportObservationsCsv } from "../pages/simulation/experiment-record.mjs";
import { validatePlot, drawPlot } from "../pages/simulation/plot-adapters.mjs";
import * as celev from "../pages/simulation/engines/celev/two-body.mjs";
import * as ml from "../pages/simulation/engines/ml/four-cell.mjs";

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
console.log("Simulation Phase 1 host / lifecycle / records / plotting: PASS");
