import { compareReadback, expectedSamples } from './wgl-lab-core.mjs';

const VERSION = 'wgl-fcg-lab-v1';
const STORAGE_KEY = 'toukei-' + VERSION + '-WGL1';
const LESSON_URL = new URL('../textbook/volumes/dream_thater/計算系/WGL/WGL1/', import.meta.url);
const FILES = {js: 'triangle.js', vertex: 'triangle.vert', fragment: 'triangle.frag'};
const SOURCE_LIMIT = 30000;
const MAX_PIXELS = 524288;
const TIMEOUT_MS = 6000;
const byId = id => document.getElementById(id);
const inputs = {
  js: byId('js-source'), vertex: byId('vertex-source'), fragment: byId('fragment-source')
};
const tabs = ['conditions', 'code', 'result'];
const defaults = {};
let ready = false;
let active = null;
let sequence = 0;

function selectTab(name, focus = false) {
  for (const tab of tabs) {
    const selected = tab === name;
    const control = byId('tab-' + tab);
    control.setAttribute('aria-selected', String(selected));
    control.tabIndex = selected ? 0 : -1;
    byId('panel-' + tab).hidden = !selected;
    if (selected && focus) control.focus();
  }
}
tabs.forEach((name, index) => {
  const control = byId('tab-' + name);
  control.addEventListener('click', () => selectTab(name));
  control.addEventListener('keydown', event => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 :
      (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    selectTab(tabs[next], true);
  });
});

function setStatus(message, bad = false) {
  const status = byId('status');
  status.textContent = message;
  status.className = bad ? 'error' : '';
}
function sanitizeSize() {
  const width = Number(byId('width').value);
  const height = Number(byId('height').value);
  if (!Number.isInteger(width) || !Number.isInteger(height) ||
      width < 64 || height < 64 || width > 1024 || height > 1024 ||
      width * height > MAX_PIXELS) {
    throw new RangeError('幅・高さは64〜1024の整数、画素総数は524,288以下にしてください');
  }
  return {width, height};
}
function capture() {
  const sources = Object.fromEntries(Object.entries(inputs).map(([name, element]) =>
    [name, element.value]));
  if (Object.values(sources).some(value => value.length > SOURCE_LIMIT)) {
    throw new RangeError('各ソースの上限は30,000文字です');
  }
  return {...sources, ...sanitizeSize()};
}
function setSources(record) {
  for (const name of Object.keys(inputs)) {
    if (typeof record[name] === 'string') inputs[name].value = record[name];
  }
}

async function load() {
  try {
    const entries = await Promise.all(Object.entries(FILES).map(async ([name, file]) => {
      const response = await fetch(new URL(file, LESSON_URL));
      if (!response.ok) throw new Error(file + ': HTTP ' + response.status);
      const code = await response.text();
      if (code.length > SOURCE_LIMIT) throw new Error(file + ': ファイルが大きすぎます');
      return [name, code];
    }));
    Object.assign(defaults, Object.fromEntries(entries));
    setSources(defaults);
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (stored && stored.version === VERSION && stored.code &&
          Object.values(stored.code).every(x => typeof x === 'string' && x.length <= SOURCE_LIMIT)) {
        setSources(stored.code);
        if (stored.width) byId('width').value = stored.width;
        if (stored.height) byId('height').value = stored.height;
        byId('save-status').textContent = '同じ版の保存済み編集を復元しました（未実行）';
      }
    } catch {
      byId('save-status').textContent = '保存状態を利用できません（初期ソースで続行）';
    }
    ready = true;
    setStatus('実行できます');
  } catch (error) {
    setStatus('教材ソースを読み込めません: ' + String(error.message), true);
    byId('diagnostics').textContent = 'Pages配信・オフラインキャッシュ・教材コードの配置を確認してください。';
  }
}
function stop(message = '停止しました。実行 iframe を破棄しました') {
  if (active) {
    clearTimeout(active.timer);
    active.frame.remove();
    active = null;
  }
  byId('canvas-slot').replaceChildren();
  setStatus(message);
}
function token() {
  if (globalThis.crypto?.getRandomValues) {
    const a = new Uint32Array(4);
    globalThis.crypto.getRandomValues(a);
    return Array.from(a).map(x => x.toString(16).padStart(8, '0')).join('');
  }
  throw new Error('安全なセッショントークンを発行できません（HTTPSで開いてください）');
}

// この関数だけを sandbox iframe 内へ直列化する。
// 任意の JS コードの実行は、この不透明 origin の子フレームだけに限定する。
function isolatedRunner() {
  'use strict';
  const canvas = document.getElementById('gpu-canvas');
  let started = false;
  function send(data) { parent.postMessage(data, '*'); }
  window.addEventListener('message', event => {
    if (event.source !== parent || started) return;
    const request = event.data;
    if (!request || request.type !== 'run') return;
    started = true;
    const scope = {requestId: request.requestId, session: request.session, generation: request.generation};
    const logs = [];
    function report(stage, text) {
      if (logs.length < 24) logs.push(String(stage).slice(0, 32) + ': ' + String(text).slice(0, 1500));
    }
    try {
      canvas.width = request.width;
      canvas.height = request.height;
      const gl = canvas.getContext('webgl2', {
        antialias: false, alpha: false, depth: true, preserveDrawingBuffer: true
      });
      if (!gl) throw new Error('この環境で WebGL2 context を取得できません');
      canvas.addEventListener('webglcontextlost', event => {
        event.preventDefault();
        send({...scope, type: 'context-lost', message: 'WebGL context lost'});
      });
      canvas.addEventListener('webglcontextrestored', () =>
        send({...scope, type: 'context-restored', message: 'WebGL context restored（再実行してください）'}));
      // 受講者による自由編集コード。parent は Function/eval しない。
      const run = new Function('gl', 'canvas', 'vertexSource', 'fragmentSource', 'report', request.js);
      run(gl, canvas, request.vertex, request.fragment, report);
      const positions = [
        [Math.floor(canvas.width / 2), Math.floor(canvas.height / 2)],
        [0, 0]
      ];
      const samples = positions.map(([x, y]) => {
        const value = new Uint8Array(4);
        gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, value);
        return {x, y, rgba: Array.from(value)};
      });
      const glError = gl.getError();
      if (glError !== gl.NO_ERROR) report('GL_ERROR', '0x' + glError.toString(16));
      send({...scope, type: 'result', ok: glError === gl.NO_ERROR, samples,
        width: canvas.width, height: canvas.height,
        logs, glError: '0x' + glError.toString(16)});
    } catch (error) {
      send({...scope, type: 'result', ok: false, logs,
        error: String(error?.stack || error).slice(0, 5000)});
    }
  });
  send({type: 'ready'});
}

function runnerHtml() {
  // 外部通信、top navigation、同一 origin 化は許可しない。
  // unsafe-eval は子フレーム内の学習者 JS 用。親ページは実行しない。
  const policy = "default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'unsafe-inline'; img-src 'none'; connect-src 'none'; " +
    "worker-src 'none'; frame-src 'none'; object-src 'none'; " +
    "form-action 'none'; base-uri 'none'";
  return '<!doctype html><html lang="ja"><head><meta charset="utf-8">' +
    '<meta http-equiv="Content-Security-Policy" content="' + policy + '">' +
    '<meta name="referrer" content="no-referrer">' +
    '<style>body{margin:0;display:grid;place-items:center;background:#e2e8f0}' +
    'canvas{display:block;max-width:100%;height:auto}</style></head><body>' +
    '<canvas id="gpu-canvas" aria-label="GPUが描画した画素"></canvas>' +
    '<script>(' + isolatedRunner.toString() + ')()</scr' + 'ipt></body></html>';
}

function showTable(rows, unchanged) {
  const table = document.createElement('table');
  const header = document.createElement('tr');
  for (const title of ['位置（下原点）', 'CPU予測', 'GPU readPixels', '差の最大値', '基準一致']) {
    const th = document.createElement('th');
    th.textContent = title;
    header.append(th);
  }
  const thead = document.createElement('thead');
  thead.append(header);
  table.append(thead);
  const tbody = document.createElement('tbody');
  for (const row of rows) {
    const tr = document.createElement('tr');
    const maxDifference = Math.max(...row.difference);
    const texts = [
      row.label + ' (' + row.x + ', ' + row.y + ')',
      row.rgba.join(', '), row.actual ? row.actual.join(', ') : '取得不可',
      Number.isFinite(maxDifference) ? String(maxDifference) : '取得不可',
      unchanged ? (row.pass ? 'OK' : '不一致') : '変更版: 参考'
    ];
    for (const item of texts) {
      const td = document.createElement('td');
      td.textContent = item;
      tr.append(td);
    }
    tbody.append(tr);
  }
  table.append(tbody);
  byId('results-table').replaceChildren(table);
}

window.addEventListener('message', event => {
  if (!active || event.source !== active.frame.contentWindow) return;
  const data = event.data;
  if (!data || typeof data !== 'object') return;
  if (data.type === 'ready' && !active.started) {
    active.started = true;
    active.frame.contentWindow.postMessage({
      type: 'run', requestId: active.id, generation: active.generation, session: active.session,
      ...active.payload
    }, '*'); // opaque origin に送るため targetOrigin は '*'。source と token を照合する。
    return;
  }
  if (data.session !== active.session ||
      data.requestId !== active.id || data.generation !== active.generation) return;
  if (data.type === 'context-lost' || data.type === 'context-restored') {
    byId('diagnostics').textContent += '\n' + String(data.message).slice(0, 300);
    return;
  }
  if (data.type !== 'result') return;
  clearTimeout(active.timer);
  active.timer = null;
  const unchanged = Object.keys(defaults).every(key => active.payload[key] === defaults[key]);
  byId('diagnostics').textContent = ((data.logs || []).slice(0, 24).join('\n') +
    (data.error ? '\n' + String(data.error).slice(0, 5000) : '') +
    '\nGL error: ' + (data.glError || '取得不可')).trim();
  if (!data.ok) {
    setStatus('WebGL2実行エラー（shaderのstageと行番号を確認）', true);
    byId('result-note').textContent = 'GPU描画・検算は未達成です。JS・GLSLソースを修正してください。';
  } else {
    const samples = Array.isArray(data.samples) ? data.samples : [];
    const rows = compareReadback(samples, active.payload.width, active.payload.height);
    showTable(rows, unchanged);
    const pass = rows.every(row => row.pass);
    setStatus(unchanged && pass ? '初期ソースの独立画素検算に合格' :
      unchanged ? '基準画素と不一致（viewport/色/GL状態を再確認）' : '編集コードを実行しました（基準との差を比較）',
      unchanged && !pass);
    byId('result-note').textContent = unchanged ?
      'CPUは座標と色の定数から独立に予測し、GPUはreadPixelsで実測。RGBA各成分±1を許容します。' :
      'ソース変更時は初期色のCPU基準と一致しないことがあります。正誤の自動判定ではありません。';
  }
});

function run() {
  selectTab('result');
  stop('実行準備中');
  if (!ready) { setStatus('教材ソースがまだ読み込まれていません', true); return; }
  let payload;
  try { payload = capture(); }
  catch (error) { setStatus(error.message, true); return; }
  const iframe = document.createElement('iframe');
  iframe.className = 'result-frame';
  iframe.title = 'WebGL2 実行結果（隔離 origin）';
  iframe.setAttribute('sandbox', 'allow-scripts');
  iframe.setAttribute('referrerpolicy', 'no-referrer');
  iframe.srcdoc = runnerHtml();
  const generation = ++sequence;
  active = {frame: iframe, payload, id: generation, generation,
    session: token(), started: false, timer: null};
  active.timer = setTimeout(() => {
    if (active?.generation !== generation) return;
    stop('タイムアウト（iframeを破棄）。ブラウザ/GPUの停止を完全には防げません。');
  }, TIMEOUT_MS);
  byId('diagnostics').textContent = 'WebGL2 context / shader compile / link を検査中';
  byId('results-table').replaceChildren();
  byId('canvas-slot').append(iframe);
}

byId('run').addEventListener('click', run);
byId('stop').addEventListener('click', () => stop());
byId('reset').addEventListener('click', () => {
  stop('初期ソースに戻しました（未実行）');
  setSources(defaults);
  byId('preset').value = 'default';
  byId('save-status').textContent = '初期ソースへ戻しました。保存分は変更していません。';
  selectTab('code');
});
byId('save').addEventListener('click', () => {
  try {
    const value = capture();
    const {width, height, ...code} = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({version: VERSION, code, width, height}));
    byId('save-status').textContent = 'この端末へ保存しました';
  } catch (error) { byId('save-status').textContent = '保存失敗: ' + error.message; }
});
byId('preset').addEventListener('change', event => {
  if (!ready) return;
  if (event.target.value === 'default') setSources(defaults);
  else {
    setSources(defaults);
    inputs.fragment.value = defaults.fragment.replace('outColor = vec4(1.0, 0.5, 0.0, 1.0);',
      'outColor = vec4(1.0, 0.5, 0.0, 1.0)');
  }
  selectTab('code');
});
load();
// 画素の期待値は、GPUに触れる前に CPU 側で示せる。
byId('result-note').textContent = 'CPU予測: ' + expectedSamples(320, 240)
  .map(item => item.label + '=' + item.rgba.join('/')).join('、');
