import { SimulationClient } from "./simulation-runtime.mjs";
import { drawPlot, renderTable } from "./plot-adapters.mjs";
import { createExperimentRecord, appendObservation, exportExperimentJson,
  exportObservationsCsv } from "./experiment-record.mjs";

const ENGINE = "celev-python-nbody-v1";
const EXPERIMENT = "celev-variational-orbits-v1";
const $ = (id) => document.getElementById(id);
let client = null, record = null, latest = null, mode = "physics", playing = false;
let epoch = 0, tracks = [], executed = 0;
let candidateCurve = null, candidatePeriod = null;

function show(message, failure = false) {
  $("status").textContent = message;
  $("status").dataset.error = String(failure);
}
function num(id) { return Number($(id).value); }
function settings() {
  mode = $("mode").value;
  const params = mode === "physics" ? {
    mode, orbit: $("orbit").value, dt: num("dt"), G: num("G"),
    massScale: num("mass"), velocityScale: num("velocity"),
  } : { mode, N: num("N"), period: num("T"),
    ampX: num("ax"), ampY: num("ay"), phase: num("phase") };
  if (mode === "physics") {
    if (!["two-body","triangle","figure-eight","candidate"].includes(params.orbit) ||
        ![params.dt, params.G, params.massScale, params.velocityScale].every(
          (v) => Number.isFinite(v) && v > 0) ||
        params.dt > 0.05 || params.G > 10 || params.massScale > 10 ||
        params.velocityScale > 4) throw new RangeError("物理パラメータの範囲を確認してください");
  } else {
    if (!Number.isInteger(params.N) || params.N < 12 || params.N > 120 ||
        params.N % 6 || ![params.period,params.ampX,params.ampY,params.phase].every(
          Number.isFinite) || params.period < 1 || params.period > 20 ||
        Math.abs(params.ampX) < 0.1 || Math.abs(params.ampX) > 3 ||
        Math.abs(params.ampY) < 0.1 || Math.abs(params.ampY) > 3 ||
        Math.abs(params.phase) > Math.PI) throw new RangeError("変分パラメータの範囲を確認してください");
  }
  if (mode === "physics" && params.orbit === "candidate") {
    if (!candidateCurve || !candidatePeriod) throw new Error("先にBモードで候補を探索してください");
    if (params.G !== 1 || params.massScale !== 1 || params.velocityScale !== 1) {
      throw new Error("候補検算ではG、質量倍率、速度倍率をすべて1にしてください");
    }
    const N = candidateCurve.length, shift = N / 3;
    params.period = candidatePeriod;
    params.candidatePath = Array.from({ length: N }, (_, k) =>
      Array.from({ length: 3 }, (_, i) => candidateCurve[(k+i*shift)%N]));
  }
  return params;
}
function chooseMode() {
  const physics = $("mode").value === "physics";
  $("physics-controls").hidden = !physics;
  $("variational-controls").hidden = physics;
}
function diagnosticsRows(snapshot, diagnostics) {
  return [
    ["物理時刻", snapshot.physicalTime ?? "変分モードでは未定義"],
    ["累積計算ステップ/反復", executed],
    ...Object.entries(diagnostics ?? {}),
  ];
}
function plot() {
  if (!latest) return;
  const series = mode === "physics"
    ? [...tracks.map((points) => ({ points })), ...(candidateCurve && $("orbit").value === "candidate" ? [{ points: candidateCurve }] : [])]
    : [{ points: latest.snapshot.curve }];
  drawPlot($("plot"), { type: "line",
    xAxis: { label: "x", unit: "距離単位" },
    yAxis: { label: "y", unit: "距離単位" }, series }, num("zoom"));
  renderTable($("diagnostics"), ["診断値", "値"],
    diagnosticsRows(latest.snapshot, latest.diagnostics).map(([k, v]) =>
      [k, typeof v === "object" ? JSON.stringify(v) : v]));
}
function receive(result, increase = 0) {
  executed += increase;
  latest = result;
  if (mode === "variational") {
    candidateCurve = result.snapshot.curve.map((p) => [...p]);
    candidatePeriod = num("T");
  }
  if (mode === "physics") {
    // Observations are calculated inside Python; interpolated canvas points
    // never enter the integrator or the saved diagnostics.
    const observations = result.observations?.length
      ? result.observations : [{ positions: result.snapshot.positions }];
    for (const observation of observations) {
      observation.positions.forEach((p, i) => {
        if (!tracks[i]) tracks[i] = [];
        tracks[i].push(p);
        if (tracks[i].length > 800) tracks[i].shift();
      });
    }
  }
  if (record && record.observations.length < 990) {
    const observation = mode === "physics" ?
      { stepIndex: result.snapshot.stepIndex, physicalTime: result.snapshot.physicalTime,
        positions: result.snapshot.positions, energy: result.diagnostics.energy } :
      { iteration: executed, action: result.diagnostics.action,
        projectedGradientNorm: result.diagnostics.projectedGradientNorm ?? null,
        minimumDistance: result.diagnostics.minimumDistance,
        newtonResidual: result.diagnostics.newtonResidual };
    record = appendObservation(record, observation, result.diagnostics);
  }
  plot();
  show(mode === "physics" ?
    "Python積分完了：物理時刻 " + result.snapshot.physicalTime.toFixed(4) :
    "Python変分探索完了：反復 " + executed + " 回。勾配・Newton残差は表で比較できます");
}
async function start() {
  ++epoch; playing = false;
  if (client) client.dispose();
  const params = settings();
  tracks = []; latest = null; executed = 0;
  client = new SimulationClient(ENGINE, EXPERIMENT, {
    timeoutMs: 120000,
    workerFactory: () => new Worker(new URL("./celev8-python-worker.mjs", import.meta.url),
      { type: "module" }),
    onUpdate: (event) => { if (event.error) show(event.error, true); },
  });
  record = createExperimentRecord({ engineId: ENGINE, experimentId: EXPERIMENT,
    engineVersion: "python-v1", params, seed: 0, rngAlgorithm: "none" });
  show("Pythonカーネルを起動しています。初回はネットワーク接続が必要です");
  const active = client;
  const result = await active.initialize(params, 0);
  if (active === client) receive(result);
}
async function run(steps) {
  if (!client || client.state !== "ready") throw new Error("初期化または再開してください");
  if (executed + steps > 100000) throw new RangeError("累積上限100,000を超えます");
  const active = client;
  const result = await active.runBatch(steps);
  if (active === client) receive(result, steps);
}
async function play() {
  if (!client || playing) return;
  if (client.state === "paused") await client.resume();
  const active = client, mark = ++epoch;
  playing = true;
  try {
    while (playing && mark === epoch && active === client &&
           active.state === "ready" && record.observations.length < 980) {
      await run(mode === "physics" ? 50 : 5);
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
    if (mark === epoch && active === client && active.state === "ready") {
      await active.pause();
      if (record) record.stopReason = "paused";
      show("バッチ境界で一時停止しました");
    }
  } catch (error) {
    if (mark === epoch && client === active) throw error;
  } finally { if (mark === epoch) playing = false; }
}
function download(filename, data, type) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const guard = (fn) => async () => {
  try { await fn(); }
  catch (error) { playing = false; show(error.message, true); }
};
$("mode").addEventListener("change", chooseMode);
$("verify").addEventListener("click", guard(async () => {
  if (!candidateCurve || !candidatePeriod) throw new Error("先にBモードで候補を探索してください");
  $("mode").value = "physics";
  $("orbit").value = "candidate";
  $("G").value = "1";
  $("mass").value = "1";
  $("velocity").value = "1";
  $("dt").value = String(Math.min(0.01, candidatePeriod/candidateCurve.length/16));
  chooseMode();
  await start();
  show("変分候補の初期位置・中央差分速度から独立Newton積分を開始できます。比較する基準周期は " + candidatePeriod);
}));
$("init").addEventListener("click", guard(start));
$("step").addEventListener("click", guard(() => run(1)));
$("batch").addEventListener("click", guard(() => run(mode === "physics" ? 100 : 10)));
$("play").addEventListener("click", guard(play));
$("pause").addEventListener("click", guard(async () => {
  playing = false;
  if (client?.state === "ready") {
    await client.pause();
    if (record) record.stopReason = "paused";
    show("停止しました");
  } else show("現在の計算バッチが終わると停止します");
}));
$("resume").addEventListener("click", guard(async () => {
  if (client?.state === "paused") await client.resume();
  await play();
}));
$("cancel").addEventListener("click", () => {
  playing = false; ++epoch; client?.cancel();
  if (record) record.stopReason = "cancelled";
  show("Workerを破棄しました。再開には初期化してください");
});
$("zoom").addEventListener("input", guard(plot));
$("save-json").addEventListener("click", guard(() => {
  if (!record) throw new Error("ログがありません");
  download("celev8-experiment.json", exportExperimentJson(record), "application/json");
}));
$("save-csv").addEventListener("click", guard(() => {
  if (!record) throw new Error("ログがありません");
  download("celev8-experiment.csv", exportObservationsCsv(record), "text/csv;charset=utf-8");
}));
window.addEventListener("beforeunload", () => { playing = false; client?.dispose(); });
chooseMode();
