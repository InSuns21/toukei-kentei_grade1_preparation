import { SimulationClient } from "./simulation-runtime.mjs";
import { drawPlot, renderTable } from "./plot-adapters.mjs";
import {
  createExperimentRecord, appendObservation, exportExperimentJson,
  exportObservationsCsv, importExperimentJson,
} from "./experiment-record.mjs";
import * as celev from "./engines/celev/two-body.mjs";
import * as burrau from "./engines/celev/burrau.mjs";
import * as gallery from "./engines/celev/orbit-gallery.mjs";
import * as ml from "./engines/ml/four-cell.mjs";

const $ = (name) => document.getElementById(name);
const canvas = $("plot");
let client = null, record = null, running = false, currentModel = "celev";
let tracks = [[], []], latest = null;
let viewRadius = 1;
const isPhysics = () => currentModel !== "ml";
let playEpoch = 0;

function show(message, error = false) {
  $("status").textContent = message;
  $("status").dataset.error = String(error);
}
function number(name) { return Number($(name).value); }
function configuration() {
  const seed = number("seed");
  const params = currentModel === "celev" ? {
    mass: number("mass"), separation: number("separation"),
    gravitationalConstant: number("gravity"), dt: number("dt"),
  } : currentModel === "burrau" ? {
    dt: number("burrau-dt"), rtol: number("burrau-rtol"),
  } : currentModel === "gallery" ? {
    preset: $("orbit-preset").value, dt: number("orbit-dt"), rtol: number("orbit-rtol"),
  } : {
    probabilities: ["p00", "p01", "p10", "p11"].map(number),
    sampleCount: number("sample-count"),
    repetitions: number("repetitions"),
    classifierId: $("classifier-id").value,
  };
  if (!Number.isSafeInteger(seed) || seed < 0 || seed > 0xffffffff) {
    throw new RangeError("seedは0以上、2^32未満の整数を指定してください");
  }
  const adapter = currentModel === "celev" ? celev : currentModel === "burrau" ? burrau :
    currentModel === "gallery" ? gallery : ml;
  const errors = adapter.validateParameters(params);
  if (errors.length) throw new RangeError(errors.join("; "));
  return { params, seed, adapter };
}
function setMode() {
  currentModel = $("experiment").value;
  const physics = isPhysics();
  $("celev-params").hidden = currentModel !== "celev";
  $("burrau-params").hidden = currentModel !== "burrau";
  $("gallery-params").hidden = currentModel !== "gallery";
  $("ml-params").hidden = physics;
  $("ml-cell-table").hidden = physics;
  $("ml-sample-preview").hidden = physics;
  $("ml-histogram-container").hidden = physics;
  for (const id of ["step", "run", "play", "pause", "resume", "cancel"]) {
    $(id).hidden = !physics;
  }
  $("sample").hidden = physics;
  const labels = currentModel === "burrau"
    ? [[1, 3], [2, 4], [3, 5]]
    : currentModel === "gallery" ? [[1, 1], [2, 1], [3, 1]]
    : [[1, null], [2, null]];
  $("particle-legend").hidden = !physics;
  $("particle-legend").replaceChildren();
  if (physics) {
    labels.forEach(([id, mass], index) => {
      const span = document.createElement("span");
      const icon = document.createElement("b");
      icon.className = "particle-icon icon-" + (index + 1);
      icon.textContent = String(id);
      span.append(icon, document.createTextNode(
        " 質点" + id + (mass ? "（質量 " + mass + "）" : "") +
        "・" + ["実線", "破線", "点線"][index]));
      $("particle-legend").append(span);
    });
  }
  $("legend").textContent = physics
    ? "線＝過去の軌跡、番号付きの大きな記号＝質点の現在位置。記号形状と線種でも識別します。質量に応じた実寸表示ではありません。"
    : "四セル分布の標本度数。下の表は母集団確率と実抽出度数を区別して示します。";
  $("plot-description").textContent = physics
    ? "軌跡の横軸と縦軸は距離座標。番号記号が物体の現在位置です。"
    : "四セルから独立に抽出した最初の標本の度数。4セルの母集団確率は数値表も参照。";
  if (currentModel === "gallery") {
    const r = gallery.PRESETS[$("orbit-preset").value];
    $("orbit-details").textContent = r.label + "：参考周期 T≈" +
      r.period.toFixed(4) + "。 " + r.info +
      " G=1、質量すべて1。近似初期値・有限精度のため厳密な周期閉合を保証しません。";
  }
}
function resultRows(values) {
  return Object.entries(values).map(([name, value]) => [
    name, typeof value === "object" ? JSON.stringify(value) : value,
  ]);
}
function plotResult() {
  if (!latest) return;
  if (isPhysics()) {
    // A fixed world scale is crucial: otherwise a moving body appears to
    // stand still while the graph continually rescales the newest trail.
    viewRadius = Math.max(viewRadius,
      ...latest.positions.flatMap(p => p.map(Math.abs)).map(v => v * 1.15));
    drawPlot(canvas, {
      type: "line", xAxis: { label: "x", unit: "距離単位" },
      yAxis: { label: "y", unit: "距離単位" },
      bounds: { x: [-viewRadius, viewRadius], y: [-viewRadius, viewRadius],
        equalAspect: true },
      series: tracks.map((points) => ({ points })),
      markers: latest.positions.map(([x, y], i) => ({
        x, y, id: i + 1,
      })),
    }, number("zoom"));
    renderTable($("diagnostics"), ["数値診断", "値"], resultRows({
      stepIndex: latest.stepIndex, physicalTime: latest.physicalTime,
      currentPositions: latest.positions.map((p, i) => ({
        particle: i + 1, x: p[0], y: p[1] })),
      ...latest.diagnostics,
    }));
  } else {
    const counts = latest.counts;
    drawPlot(canvas, {
      type: "heatmap", xAxis: { label: "Y", unit: "0/1" },
      yAxis: { label: "X", unit: "0/1" },
      grid: [[counts[0], counts[1]], [counts[2], counts[3]]],
    }, 1);
    renderTable($("ml-cell-table"), ["(X,Y)", "母集団確率 P", "標本度数（第1回）"], 
      ["00","01","10","11"].map((cell, j) =>
        [cell, latest.probabilities[j], counts[j]]));
    renderTable($("ml-sample-preview"), ["第1回標本の抽出順", "X", "Y", "0–1損失"],
      latest.firstObservations.map((z, i) => [i + 1, z.x, z.y, z.loss]));
    renderTable($("diagnostics"), ["数値診断", "値"], resultRows({
      classifier: latest.classifier, sampleCount: latest.sampleCount,
      repetitions: latest.repetitions,
      populationRisk: latest.populationRisk,
      empiricalRisk: latest.empiricalRisk,
      meanEmpiricalRisk: latest.meanEmpiricalRisk,
      varianceAcrossRepetitions: latest.varianceAcrossRepetitions,
      theoreticalVariance: latest.theoreticalVariance,
      rngAlgorithm: latest.rngAlgorithm, seed: latest.seed,
    }));
    const histogramCanvas = $("ml-risk-plot");
    const points = latest.histogram.map((frequency, i) => [(i + 0.5) / 11, frequency]);
    const maxFrequency = Math.max(1, ...latest.histogram);
    drawPlot(histogramCanvas, {
      type: "histogram",
      xAxis: { label: "経験リスク", unit: "0〜1" },
      yAxis: { label: "反復度数", unit: "回" },
      bounds: { x: [-0.05, 1.05], y: [0, maxFrequency * 1.12] },
      series: [{ points }],
    }, 1);
    // Dashed vertical line = exact R_P(h), not a sample estimate.
    const g = histogramCanvas.getContext("2d");
    const x = 55 + (latest.populationRisk + 0.05) / 1.10 * (histogramCanvas.width - 110);
    g.save();
    g.setLineDash([7, 4]); g.strokeStyle = "#be3429"; g.lineWidth = 2;
    g.beginPath(); g.moveTo(x, 55); g.lineTo(x, histogramCanvas.height - 55); g.stroke();
    g.restore();
    renderTable($("ml-risk-table"), ["経験リスクの区間", "反復度数"],
      latest.histogram.map((frequency, j) =>
        [j === 10 ? "[10/11, 1]" : "[" + j + "/11, " + (j + 1) + "/11)",
          frequency]));
  }
}
function updatePhysics(response) {
  latest = response.snapshot;
  const snapshots = response.observations?.length ? response.observations : [latest];
  for (const snapshot of snapshots) snapshot.positions.forEach((point, index) => {
    tracks[index] ??= [];
    tracks[index].push([...point]);
    if (tracks[index].length > 800) tracks[index].shift();
  });
  record = appendObservation(record, {
    stepIndex: latest.stepIndex, physicalTime: latest.physicalTime,
    positions: latest.positions, energy: latest.diagnostics.energy,
    angularMomentum: latest.diagnostics.angularMomentum,
  }, latest.diagnostics);
  plotResult();
  const separating = currentModel === "burrau" &&
    latest.diagnostics.escapeDistance3 > 20 &&
    latest.diagnostics.binarySpecificEnergy45 < 0;
  show("計算完了：物理時間 " + latest.physicalTime.toFixed(4) +
    "、表示フレーム " + latest.stepIndex +
    (separating ? "。質量3の遠方移動・質量4と5の束縛状態を観察中（数値的な判定）" : ""));
}
async function start() {
  running = false;
  playEpoch++;
  if (client) client.dispose();
  const { params, seed, adapter } = configuration();
  client = new SimulationClient(adapter.engineId, adapter.experimentId, {
    onUpdate: (event) => { if (event.error && event.state === "error") show(event.error, true); },
  });
  record = createExperimentRecord({
    engineId: adapter.engineId, experimentId: adapter.experimentId,
    params, seed, rngAlgorithm: currentModel === "ml" ? ml.rngAlgorithm : "none",
  });
  latest = null; tracks = [[], []];
  viewRadius = currentModel === "burrau" ? 6 :
    currentModel === "gallery" ? 1.8 :
    currentModel === "celev" ? params.separation * 1.25 : 1;
  if (isPhysics()) {
    const response = await client.initialize(params, seed);
    updatePhysics(response);
  } else {
    const response = await client.computeOnce(params, seed);
    latest = response.result;
    record = appendObservation(record, latest, response.diagnostics);
    plotResult();
    show("抽出完了：標本数 " + latest.sampleCount);
  }
}
async function runSteps(steps) {
  if (!isPhysics()) return;
  if (!client || client.state !== "ready") throw new Error("初期化してください");
  const active = client;
  const response = await active.runBatch(steps);
  if (client !== active) return;
  updatePhysics(response);
}
async function play() {
  if (!client || !isPhysics() || running) return;
  const active = client;
  if (active.state === "paused") await active.resume();
  const epoch = ++playEpoch;
  running = true;
  try {
    while (running && epoch === playEpoch && client === active &&
        active.state === "ready") {
      if (record.observations.length >= 999) {
        record.stopReason = "observation-limit";
        show("記録上限に達したため、連続実行を停止しました");
        return;
      }
      await runSteps(["burrau", "gallery"].includes(currentModel) ? 2 : 25);
      if (epoch !== playEpoch || client !== active) return;
      await new Promise((resolve) => setTimeout(resolve,
        ["burrau", "gallery"].includes(currentModel) ? 40 : 30));
    }
    if (epoch === playEpoch && client === active &&
        active.state === "ready" && !running) {
      await active.pause();
      record.stopReason = "paused";
      show("バッチ境界で一時停止しました");
    }
  } catch (error) {
    // Reset/cancel can terminate an in-flight Worker. Its rejection belongs
    // to the old run, not to the freshly selected experiment.
    if (epoch === playEpoch && client === active) throw error;
  } finally {
    if (epoch === playEpoch) running = false;
  }
}
function download(name, contents, mime) {
  const url = URL.createObjectURL(new Blob([contents], { type: mime }));
  const a = document.createElement("a");
  a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function replay(text) {
  const saved = importExperimentJson(text);
  if (![celev.engineId, burrau.engineId, gallery.engineId, ml.engineId].includes(saved.engineId)) {
    throw new Error("未対応の実験エンジンです");
  }
  $("experiment").value = saved.engineId === celev.engineId ? "celev" :
    saved.engineId === burrau.engineId ? "burrau" :
    saved.engineId === gallery.engineId ? "gallery" : "ml";
  setMode();
  $("seed").value = saved.seed;
  if (currentModel === "celev") {
    $("mass").value = saved.params.mass;
    $("separation").value = saved.params.separation;
    $("gravity").value = saved.params.gravitationalConstant;
    $("dt").value = saved.params.dt;
  } else if (currentModel === "burrau") {
    $("burrau-dt").value = saved.params.dt;
    $("burrau-rtol").value = saved.params.rtol ?? 1e-12;
  } else if (currentModel === "gallery") {
    $("orbit-preset").value = saved.params.preset;
    $("orbit-dt").value = saved.params.dt;
    $("orbit-rtol").value = saved.params.rtol ?? 1e-12;
    setMode();
  } else {
    ["p00","p01","p10","p11"].forEach((name, i) => {
      $(name).value = saved.params.probabilities[i];
    });
    $("sample-count").value = saved.params.sampleCount;
    $("repetitions").value = saved.params.repetitions ?? 1;
    $("classifier-id").value = saved.params.classifierId ?? "identity";
  }
  await start();
  if (isPhysics()) {
    const last = saved.observations.at(-1);
    let remaining = Math.max(0, last?.stepIndex ?? 0);
    if (remaining > 100000) throw new RangeError("再計算上限を超えました");
    while (remaining > 0) {
      const n = Math.min(["burrau", "gallery"].includes(currentModel) ? 20 : 1000, remaining);
      await runSteps(n); remaining -= n;
    }
  } else {
    const expected = saved.observations.at(-1);
    if (expected && JSON.stringify(expected.counts) !== JSON.stringify(latest.counts)) {
      throw new Error("再計算結果が記録と一致しません。実装版を確認してください");
    }
  }
  show("保存JSONからパラメータとseedを復元し、再計算しました");
}
function guard(callback) {
  return async () => {
    try { await callback(); }
    catch (error) { running = false; show(error.message, true); }
  };
}
$("experiment").addEventListener("change", guard(async () => {
  setMode(); await start();
}));
$("reset").addEventListener("click", guard(start));
$("orbit-preset").addEventListener("change", guard(async () => {
  setMode(); await start();
}));
$("sample").addEventListener("click", guard(start));
$("normalize-probabilities").addEventListener("click", guard(async () => {
  const weights = ["p00", "p01", "p10", "p11"].map(number);
  const normalized = ml.normalizeProbabilities(weights);
  ["p00", "p01", "p10", "p11"].forEach((id, j) => { $(id).value = normalized[j]; });
  await start();
}));
$("step").addEventListener("click", guard(() => runSteps(1)));
$("run").addEventListener("click", guard(() => runSteps(100)));
$("play").addEventListener("click", guard(play));
$("pause").addEventListener("click", guard(async () => {
  running = false;
  show("実行中のバッチが終了した時点で停止します");
  if (client?.state === "ready") {
    await client.pause();
    record.stopReason = "paused"; show("停止しました");
  }
}));
$("resume").addEventListener("click", guard(async () => {
  if (client?.state === "paused") await client.resume();
  await play();
}));
$("cancel").addEventListener("click", () => {
  running = false; playEpoch++; client?.cancel();
  if (record) record.stopReason = "cancelled";
  show("Workerを終了しました。初期化で復旧できます");
});
$("zoom").addEventListener("input", guard(() => plotResult()));
$("save-json").addEventListener("click", guard(() => {
  if (!record) throw new Error("実験記録がありません");
  download("dream-theater-experiment.json", exportExperimentJson(record), "application/json");
}));
$("save-csv").addEventListener("click", guard(() => {
  if (!record) throw new Error("実験記録がありません");
  download("dream-theater-observations.csv", exportObservationsCsv(record), "text/csv");
}));
$("load-json").addEventListener("change", guard(async () => {
  const file = $("load-json").files[0];
  if (file) await replay(await file.text());
  $("load-json").value = "";
}));
window.addEventListener("pagehide", () => { running = false; playEpoch++; client?.dispose(); });
if (new URLSearchParams(window.location.search).get("model") === "ml") {
  $("experiment").value = "ml";
}
setMode();
if (typeof Worker === "undefined") show("このブラウザではWorkerを使用できません", true);
else guard(start)();
