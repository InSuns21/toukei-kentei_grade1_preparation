import { compareReadback, expectedSamples } from './wgl-lab-core.mjs';
import { highlightSource } from './wgl-lab-highlight.mjs';
import { compareWGL2Readback, expectedWGL2Samples } from './wgl2-lab-core.mjs';
import { compareWGL3Readback, expectedWGL3Samples } from './wgl3-lab-core.mjs';
import { compareWGL4Readback, expectedWGL4Samples } from './wgl4-lab-core.mjs';
import { compareWGL5Readback, expectedWGL5Samples } from './wgl5-lab-core.mjs';
import { compareWGL6Readback, expectedWGL6Samples } from './wgl6-lab-core.mjs';
import { compareWGL7Readback, expectedWGL7Samples } from './wgl7-lab-core.mjs';
import { compareWGL8Readback, expectedWGL8Samples } from './wgl8-lab-core.mjs';
import { compareWGL9Readback, expectedWGL9Samples } from './wgl9-lab-core.mjs';
import { compareWGL10Readback, expectedWGL10Samples } from './wgl10-lab-core.mjs';
import { compareWGL11Readback, expectedWGL11Samples } from './wgl11-lab-core.mjs';
import { compareWGL12Readback, expectedWGL12Samples } from './wgl12-lab-core.mjs';
import { compareWGL13Readback, expectedWGL13Samples } from './wgl13-lab-core.mjs';
import { compareWGL14Readback, expectedWGL14Samples } from './wgl14-lab-core.mjs';

const VERSION = 'wgl-fcg-lab-v1';
// ホスト/隔離実行は共通。講義のソースとCPU基準だけを切り替える。
const requestedLesson = new URL(location.href).searchParams.get('lesson');
const lesson = ['WGL1', 'WGL2', 'WGL3', 'WGL4', 'WGL5', 'WGL6', 'WGL7', 'WGL8', 'WGL9', 'WGL10', 'WGL11', 'WGL12', 'WGL13', 'WGL14'].includes(requestedLesson) ? requestedLesson : 'WGL1';
const isWGL2 = lesson === 'WGL2';
const isWGL3 = lesson === 'WGL3';
const isWGL4 = lesson === 'WGL4';
const isWGL5 = lesson === 'WGL5';
const isWGL6 = lesson === 'WGL6';
const isWGL7 = lesson === 'WGL7';
const isWGL8 = lesson === 'WGL8';
const isWGL9 = lesson === 'WGL9';
const isWGL10 = lesson === 'WGL10';
const isWGL11 = lesson === 'WGL11';
const isWGL12 = lesson === 'WGL12';
const isWGL13 = lesson === 'WGL13';
const isWGL14 = lesson === 'WGL14';
const STORAGE_KEY = 'toukei-' + VERSION + '-' + lesson;
const LESSON_URL = new URL('../textbook/volumes/dream_thater/計算系/WGL/' + lesson + '/', import.meta.url);
const FILES = isWGL14 ? {js: 'postprocess.js', vertex: 'postprocess.vert', fragment: 'postprocess.frag'} :
  isWGL13 ? {js: 'environment.js', vertex: 'environment.vert', fragment: 'environment.frag'} :
  isWGL12 ? {js: 'pbr.js', vertex: 'pbr.vert', fragment: 'pbr.frag'} :
  isWGL11 ? {js: 'shadow.js', vertex: 'shadow.vert', fragment: 'shadow.frag'} :
  isWGL10 ? {js: 'framebuffer.js', vertex: 'framebuffer.vert', fragment: 'framebuffer.frag'} :
  isWGL9 ? {js: 'lighting.js', vertex: 'lighting.vert', fragment: 'lighting.frag'} :
  isWGL8 ? {js: 'blending.js', vertex: 'blending.vert', fragment: 'blending.frag'} :
  isWGL7 ? {js: 'sampling.js', vertex: 'sampling.vert', fragment: 'sampling.frag'} :
  isWGL6 ? {js: 'interpolation.js', vertex: 'interpolation.vert', fragment: 'interpolation.frag'} :
  isWGL5 ? {js: 'camera.js', vertex: 'camera.vert', fragment: 'camera.frag'} :
  isWGL4 ? {js: 'model.js', vertex: 'model.vert', fragment: 'model.frag'} :
  isWGL3 ? {js: 'mesh.js', vertex: 'mesh.vert', fragment: 'mesh.frag'} :
  isWGL2 ? {js: 'colors.js', vertex: 'colors.vert', fragment: 'colors.frag'} :
  {js: 'triangle.js', vertex: 'triangle.vert', fragment: 'triangle.frag'};
const oracle = isWGL14 ? expectedWGL14Samples : isWGL13 ? expectedWGL13Samples : isWGL12 ? expectedWGL12Samples : isWGL11 ? expectedWGL11Samples : isWGL10 ? expectedWGL10Samples : isWGL9 ? expectedWGL9Samples : isWGL8 ? expectedWGL8Samples : isWGL7 ? expectedWGL7Samples : isWGL6 ? expectedWGL6Samples : isWGL5 ? expectedWGL5Samples : isWGL4 ? expectedWGL4Samples :
  isWGL3 ? expectedWGL3Samples : isWGL2 ? expectedWGL2Samples : expectedSamples;
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

function initializeHighlightedEditors() {
  const refreshers = {};
  for (const [name, editor] of Object.entries(inputs)) {
    const wrapper = document.createElement('div');
    wrapper.className = 'wgl-code-editor';
    const highlight = document.createElement('pre');
    highlight.className = 'wgl-code-highlight';
    highlight.setAttribute('aria-hidden', 'true');
    const code = document.createElement('code');
    highlight.append(code);
    editor.parentNode.insertBefore(wrapper, editor);
    wrapper.append(highlight, editor);
    editor.wrap = 'soft';

    const refresh = () => {
      code.innerHTML = highlightSource(editor.value, name === 'js' ? 'javascript' : 'glsl') + '\n';
      highlight.scrollTop = editor.scrollTop;
    };
    editor.addEventListener('input', refresh);
    editor.addEventListener('scroll', () => {
      highlight.scrollTop = editor.scrollTop;
    });
    editor.addEventListener('keydown', event => {
      if (event.key !== 'Tab' || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      event.preventDefault();
      editor.setRangeText('  ', editor.selectionStart, editor.selectionEnd, 'end');
      refresh();
    });
    refreshers[name] = refresh;
    refresh();
  }
  return () => Object.values(refreshers).forEach(refresh => refresh());
}
const refreshSourceHighlights = initializeHighlightedEditors();


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
  refreshSourceHighlights();
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
      const positions = (['WGL5', 'WGL6', 'WGL7', 'WGL8', 'WGL9', 'WGL10', 'WGL11', 'WGL12', 'WGL13', 'WGL14'].includes(request.lesson)) &&
        Array.isArray(request.probes) ? request.probes :
        request.lesson === 'WGL4' ? [
        [Math.floor(canvas.width * 0.665), Math.floor(canvas.height * 0.56)],
        [Math.floor(canvas.width * 0.57), Math.floor(canvas.height * 0.37)],
        [Math.floor(canvas.width * 0.375), Math.floor(canvas.height * 0.625)],
        [Math.floor(canvas.width * 0.05), Math.floor(canvas.height * 0.05)]
      ] : request.lesson === 'WGL3' ? [
        [Math.floor(canvas.width / 2), Math.floor(canvas.height / 2)],
        [Math.floor(canvas.width * 0.67), Math.floor(canvas.height * 0.33)],
        [0, 0]
      ] : request.lesson === 'WGL2' ? [
        [Math.floor(canvas.width / 2), Math.floor(canvas.height / 2)],
        [Math.floor(canvas.width * 0.31), Math.floor(canvas.height * 0.40)],
        [Math.floor(canvas.width * 0.69), Math.floor(canvas.height * 0.40)],
        [0, 0]
      ] : [
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
    const rows = (isWGL14 ? compareWGL14Readback : isWGL13 ? compareWGL13Readback : isWGL12 ? compareWGL12Readback : isWGL11 ? compareWGL11Readback : isWGL10 ? compareWGL10Readback : isWGL9 ? compareWGL9Readback : isWGL8 ? compareWGL8Readback : isWGL7 ? compareWGL7Readback : isWGL6 ? compareWGL6Readback : isWGL5 ? compareWGL5Readback : isWGL4 ? compareWGL4Readback : isWGL3 ? compareWGL3Readback : isWGL2 ? compareWGL2Readback : compareReadback)(
      samples, active.payload.width, active.payload.height);
    showTable(rows, unchanged);
    const pass = rows.every(row => row.pass);
    setStatus(unchanged && pass ? '初期ソースの独立画素検算に合格' :
      unchanged ? '基準画素と不一致（viewport/色/GL状態を再確認）' : '編集コードを実行しました（基準との差を比較）',
      unchanged && !pass);
    byId('result-note').textContent = unchanged ?
      'CPUは座標と色の定数から独立に予測し、GPUはreadPixelsで実測。RGBA各成分' +
      (isWGL14 ? '±2' : isWGL13 ? '±1' : isWGL12 ? '±2' : isWGL11 ? '±2' : isWGL10 ? '±2' : isWGL9 ? '±10' : isWGL8 ? '±4' : (isWGL7 || isWGL6) ? '±3' : (isWGL2 ? '±2' : '±1')) + 'を許容します。' :
      'ソース変更時は初期色のCPU基準と一致しないことがあります。正誤の自動判定ではありません。';
  }
});

function run() {
  selectTab('result');
  stop('実行準備中');
  if (!ready) { setStatus('教材ソースがまだ読み込まれていません', true); return; }
  let payload;
  try { payload = {...capture(), lesson};
    if (isWGL5) payload.probes = expectedWGL5Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL6) payload.probes = expectedWGL6Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL7) payload.probes = expectedWGL7Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL8) payload.probes = expectedWGL8Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL9) payload.probes = expectedWGL9Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL11) payload.probes = expectedWGL11Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL12) payload.probes = expectedWGL12Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL13) payload.probes = expectedWGL13Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL14) payload.probes = expectedWGL14Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL10) payload.probes = expectedWGL10Samples(payload.width,payload.height).map(p => [p.x,p.y]);
  }
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
    if (isWGL2 && event.target.value === 'type-error') {
      inputs.fragment.value = defaults.fragment.replace('in vec3 v_color;', 'in vec2 v_color;')
        .replace('outColor = vec4(v_color * u_gain, 1.0);',
          'outColor = vec4(v_color * u_gain.xy, 0.0, 1.0);');
    } else if (isWGL14) {
      inputs.fragment.value = defaults.fragment.replace(
        'outColor=vec4(rgb,1.0);', 'outColor=vec4(rgb,1.0)');
    } else if (isWGL13) {
      inputs.fragment.value = defaults.fragment.replace(
        'outColor=vec4(mix(vec3(0.08,0.10,0.12),reflected,f),1.0);',
        'outColor=vec4(mix(vec3(0.08,0.10,0.12),reflected,f),1.0)');
    } else if (isWGL12) {
      inputs.fragment.value = defaults.fragment.replace(
        'outColor = vec4(fresnelSchlick(voh, f0), 1.0);',
        'outColor = vec4(fresnelSchlick(voh, f0), 1.0)');
    } else if (isWGL11) {
      inputs.fragment.value = defaults.fragment.replace(
        'outColor = vec4(vec3(v), 1.0);',
        'outColor = vec4(vec3(v), 1.0)');
    } else if (isWGL10) {
      inputs.fragment.value = defaults.fragment.replace(
        'outColor = vec4(sampleColor, 1.0);',
        'outColor = vec4(sampleColor, 1.0)');
    } else if (isWGL9) {
      inputs.fragment.value = defaults.fragment.replace(
        'outColor = vec4(encodeColor(clamp(linearRgb, 0.0, 1.0)), 1.0);',
        'outColor = vec4(encodeColor(clamp(linearRgb, 0.0, 1.0)), 1.0)');
    } else if (isWGL8) {
      inputs.fragment.value = defaults.fragment.replace(
        'outColor = vec4(encode(light), 1.0);',
        'outColor = vec4(encode(light), 1.0)');
    } else if (isWGL7) {
      inputs.fragment.value = defaults.fragment.replace(
        'outColor = texture(u_texture, v_uv * u_repeats + u_offset);',
        'outColor = texture(u_texture, v_uv * u_repeats + u_offset)');
    } else if (isWGL6) {
      inputs.fragment.value = defaults.fragment.replace('outColor = vec4(rgb, 1.0);',
        'outColor = vec4(rgb, 1.0)');
    } else if (isWGL5 || isWGL4) {
      inputs.fragment.value = defaults.fragment.replace('outColor = u_color;', 'outColor = u_color');
    } else if (isWGL3) {
      inputs.fragment.value = defaults.fragment.replace('outColor = vec4(0.2, 0.6, 0.8, 1.0);',
        'outColor = vec4(0.2, 0.6, 0.8, 1.0)');
    } else if (isWGL2) {
      inputs.fragment.value = defaults.fragment.replace('outColor = vec4(v_color * u_gain, 1.0);',
        'outColor = vec4(v_color * u_gain, 1.0)');
    } else {
      inputs.fragment.value = defaults.fragment.replace('outColor = vec4(1.0, 0.5, 0.0, 1.0);',
        'outColor = vec4(1.0, 0.5, 0.0, 1.0)');
    }
  }
  refreshSourceHighlights();
  selectTab('code');
});
if (isWGL2) {
  document.title = 'WGL2 頂点属性・uniform・varying 共通ラボ';
  document.querySelector('h1').textContent = 'WGL2 頂点ごとのRGB色を画素へ補間する';
  const intro = document.querySelector('#panel-conditions > p');
  intro.textContent = '頂点 A=赤・B=緑・C=青。中央・赤側・緑側・背景の4画素をCPU重み付き和とGPUで照合します。uniform u_gain は全フラグメントに共通です。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>初期値で実行し4画素のRGBAとCPU基準を照合する。</li>' +
    '<li>colors.js の uniform3f を変更し全体の色の変化を観察する。</li>' +
    '<li>colors.vert の v_color を変更して頂点ごとの差を見る。</li>' +
    '<li>型不一致プリセットでリンクエラー、構文エラーでコンパイルエラーを検査する。</li>';
  const preset = byId('preset');
  preset.options[0].textContent = '初期の頂点色三角形';
  preset.add(new Option('varyingの型不一致（リンクエラー）', 'type-error'));
  preset.options[1].textContent = 'fragment の構文エラー';
}
if (isWGL14) {
  document.title = 'WGL14 3x3フィルタ・FBO・トーンマッピング編集ラボ';
  document.querySelector('h1').textContent = 'WGL14 原画とぼかし・エッジ・トーンマッピングを比べる';
  document.querySelector('#panel-conditions > p').textContent =
    '8×8の原画像をFBO Aへ、3×3フィルタをFBO Bへ書きます。左の原画像と右のぼかし＋トーンマッピングを比較し、7点をCPUとGPUで検算します。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>初期ソースを実行し、原画と加工済の7点を独立CPU基準と照合する。</li>' +
    '<li>postprocess.jsのfilterModeをblurからedgeへ変更し、輪郭の違いを観察する。</li>' +
    '<li>exposureを0、1、2へ変更し右側だけに適用されるか確かめる。</li>' +
    '<li>端画素複製の効果と2枚のFBOのread/write切替をコードで確認する。</li>' +
    '<li>構文エラーのshader診断を確認し、修正して再実行する。</li>';
  byId('preset').options[0].textContent = '3×3ぼかし・2段FBO・CPU/GPU7画素照合';
  byId('preset').options[1].textContent = 'fragmentの構文エラー';
}
if (isWGL13) {
  document.title = 'WGL13 cubemap・反射方向・継ぎ目の編集ラボ';
  document.querySelector('h1').textContent = 'WGL13 6面の色と方向を読み、鏡面反射へ対応させる';
  document.querySelector('#panel-conditions > p').textContent =
    '自作2×2の6面RGBA8 cubemapから反射した球面を表示します。' +
    '最下行の12画素は6軸方向と6斜め方向の生テクセル値です。CPU基準との各成分±1階調を検査します。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>初期ソースを実行し12方向の面・UV・RGBA8の独立検算を確認する。</li>' +
    '<li>environment.jsのyawDegreesを90や-90に変え、球中心の参照面を予測する。</li>' +
    '<li>fresnelF0を0、0.75、1へ変え、混合係数と方向の違いを観察する。</li>' +
    '<li>faceColorsの並び、またはfragment GLSLのrotateY符号を変更し、向きと継ぎ目を調べる。</li>' +
    '<li>構文エラープリセットのログを読み、修正後に12方向検算へ戻る。</li>';
  byId('preset').options[0].textContent = '6面自作cubemap・12方向CPU/GPU照合';
  byId('preset').options[1].textContent = 'fragmentの構文エラー';
}
if (isWGL12) {
  document.title = 'WGL12 Fresnel・GGX・金属度・粗さの編集ラボ';
  document.querySelector('h1').textContent = 'WGL12 粗面と金属の微小面反射を数式・画素で比べる';
  document.querySelector('#panel-conditions > p').textContent =
    '3球は左から非金属・滑らか、非金属・粗い、金属。JSのroughness/metallicとGLSLのSchlick・GGX・Smith Gを編集できます。' +
    '画面左下4画素は線形FresnelのCPU/GPU検算専用で、GGXのエネルギー保存まで証明するものではありません。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>初期ソースを実行し、4画素の線形Fresnel値のCPU/GPU照合を確認する。</li>' +
    '<li>pbr.jsのroughnessとmetallicを変更し、3球の反射の広がり・拡散反射量の変化を比べる。</li>' +
    '<li>pbr.fragでalpha=rough*roughとGGXの分母を読み、粗さを変えた正面密度を計算する。</li>' +
    '<li>構文エラープリセットでfragment shaderのstage別エラーを確認し、修正して再実行する。</li>' +
    '<li>表示のclamp・sRGBと方向積分のエネルギー制約の違いを説明する。</li>';
  byId('preset').options[0].textContent = '初期の3球・Fresnel 4画素比較';
  byId('preset').options[1].textContent = 'fragmentの構文エラー';
}
if (isWGL11) {
  document.title = 'WGL11 光視点の深度テクスチャと影の判定ラボ';
  document.querySelector('h1').textContent = 'WGL11 depth pass → shadow compare → 実測';
  document.querySelector('#panel-conditions > p').textContent =
    '深度だけのFBOへ光から見た前面を記録し、別パスで床・遮蔽物を描きます。' +
    '画面左下の4画素は遮蔽／非遮蔽の診断用。別系統CPUのray-box交差とGPU比較が一致するか調べます。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>初期値で深度FBOの完成状態と4受光点のCPU/GPU一致を確認する。</li>' +
    '<li>shadow.jsの depthBias を0、-0.05、0.30に変え、acneとpeter panningの仕組みを検討する。</li>' +
    '<li>shadowResolution を64・256・512に変え、影境界の段差を観察する。</li>' +
    '<li>useShadow をfalseへ変え、影なしの光量を比べる（検算点は初期基準を比較）。</li>' +
    '<li>shadow.frag の比較式を編集、構文エラープリセットのログを確認する。</li>';
  byId('preset').options[0].textContent = '深度FBO→影付きシーン・4点検算';
  byId('preset').options[1].textContent = 'fragmentの構文エラー';
}
if (isWGL10) {
  document.title = 'WGL10 framebuffer と render-to-texture ラボ';
  document.querySelector('h1').textContent = 'WGL10 第1パスをテクスチャへ、第2パスを画面へ';
  document.querySelector('#panel-conditions > p').textContent =
    '最初の描画先はRGBA8 textureを付けたFBO。第2パスでdefault framebufferの左半分へ原画、右半分へRGB反転を描きます。各半分の4画素をCPUで検算します。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>初期ソースを実行しFBO completeness・中間画素・最終8画素を確認する。</li>' +
    '<li>framebuffer.js の invertRight を false にして右半分が原画と一致するか調べる。</li>' +
    '<li>offscreenScale を 0.5 に変え、textureとviewportが別寸法でも描けることを確かめる。</li>' +
    '<li>canvasの横幅・高さを変更してFBO再確保とviewport再指定を調べる。</li>' +
    '<li>fragment GLSLの色やフィルタ、構文エラープリセットを編集して結果・stage診断を比較する。</li>';
  byId('preset').options[0].textContent = '初期のFBO→原画／RGB反転';
  byId('preset').options[1].textContent = 'fragmentの構文エラー';
}
if (isWGL9) {
  document.title = 'WGL9 法線行列・Lambert・Blinn–Phong ラボ';
  document.querySelector('h1').textContent = 'WGL9 立方体の面法線と球の補間法線';
  document.querySelector('#panel-conditions > p').textContent =
    '左は面ごとの法線を持つ立方体、右は頂点法線を補間する球です。非一様縮尺・逆転置法線・光源方向を編集し、独立CPU射線で予測した各4画素とGPUを比較します。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>初期値で左立方体と右球の各4画素をCPU画素と比較する。</li>' +
    '<li>lighting.js の useCorrectNormals を false にし球面の照明変化を見る。</li>' +
    '<li>lightPower を0にする。shininess を変更し鏡面反射を比較する。</li>' +
    '<li>showNormals を true にし、fragment GLSL の normalize を確認する。</li>' +
    '<li>構文エラープリセットを修正しGPU診断と再実行を確認する。</li>';
  byId('preset').options[0].textContent = '初期の立方体・球と逆転置法線';
  byId('preset').options[1].textContent = 'fragmentの構文エラー';
}
if (isWGL8) {
  document.title = 'WGL8 透明度・前後順・sRGBと線形光の比較ラボ';
  document.querySelector('h1').textContent =
    'WGL8 半透明レイヤー：左は符号化値合成、右は線形光合成';
  document.querySelector('#panel-conditions > p').textContent =
    '同じ灰色背景と赤・青の半透明矩形を左右に描きます。左はGL_BLENDで符号化されたRGBを合成、右はGLSL内でsRGBを復号・線形光で合成し再符号化。8画素のCPU計算と比較します。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>初期ソースで背景・A・B・重なりの各4点を左右比較する。</li>' +
    '<li>blending.jsのreverseOrderをtrueへ変更し前後を交換する。</li>' +
    '<li>layerAとlayerBのalphaを変え、0と1の極限を試す。</li>' +
    '<li>blending.fragのsRGB復号を変え、左右差を観察する。</li>' +
    '<li>構文エラープリセットでfragmentの診断を読み修正する。</li>';
  byId('preset').options[0].textContent = '初期の半透明2層・色空間比較';
  byId('preset').options[1].textContent = 'fragmentの構文エラー';
}
if (isWGL7) {
  document.title = 'WGL7 テクスチャ・縮小フィルタ・ミップマップラボ';
  document.querySelector('h1').textContent =
    'WGL7 テクスチャ縮小：左は最近傍、右はミップマップ';
  document.querySelector('#panel-conditions > p').textContent =
    '同じ8×8チェッカーボードを128回繰り返します。左はmipmapなしの最近傍参照、右はLINEAR_MIPMAP_LINEAR。左の明暗の折返しと右の平均灰色を8画素のCPU計算で照合します。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>初期ソースで左右それぞれ4画素のRGBAとCPU基準を比較する。</li>' +
    '<li>sampling.jsのrepeatsを1、8、128と変え、拡大と縮小の違いを見る。</li>' +
    '<li>wrapModeをclampやmirrorに変え、UV境界の色を観察する。</li>' +
    '<li>textureKindをdataへ変え4×4の数値テクスチャを調べ、GLSLも編集する。</li>' +
    '<li>構文エラープリセットでGLSL診断を確認し、修正して再実行する。</li>';
  byId('preset').options[0].textContent = '初期の最近傍とmipmapの比較';
  byId('preset').options[1].textContent = 'fragmentの構文エラー';
}
if (isWGL6) {
  document.title = 'WGL6 透視補正補間・ラスタ化・背面判定ラボ';
  document.querySelector('h1').textContent = 'WGL6 同じ三角形：左は透視補正、右は画面単純補間';
  document.querySelector('#panel-conditions > p').textContent =
    '左：smooth varyingの透視補正UV。右：gl_FragCoordから再計算した画面の重みでUVを補間。両方に同じ3頂点とUV格子を描き、CPUが予測する8画素と照合します。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>初期値で左右それぞれ4画素のRGBAをCPU予測と照合する。</li>' +
    '<li>interpolation.jsのgridFrequencyを3から18に変え、標本化による格子の変化を見る。</li>' +
    '<li>reverseWinding=trueとcullBackFaces=trueで背面が消えることを確かめる。</li>' +
    '<li>fragment GLSLのu_modeを変更するか、構文エラープリセットで診断する。</li>';
  byId('preset').options[0].textContent = '初期の透視補正と画面単純補間';
  byId('preset').options[1].textContent = 'fragmentの構文エラー';
}
if (isWGL5) {
  document.title = 'WGL5 視点・投影・深度テストラボ';
  document.querySelector('h1').textContent = 'WGL5 立方体2個の投影と深度';
  document.querySelector('#panel-conditions > p').textContent =
    'オレンジの手前立方体と青い奥立方体を共有頂点で描きます。透視・直交投影、near/far、描画順・深度テストをJSから切り替えます。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>初期の透視投影で重なり・奥のみ・背景の4画素とCPU予測を照合する。</li>' +
    '<li>camera.js の projectionMode を orthographic に変え、見える大きさを比較する。</li>' +
    '<li>depthEnabled=false にして、奥の立方体による上書きを観察する。</li>' +
    '<li>nearPlane/farPlane、視点 eye、GLSLを編集しclipとshader診断を確認する。</li>';
  byId('preset').options[0].textContent = '初期の透視投影と深度テスト';
  byId('preset').options[1].textContent = 'fragment の構文エラー';
}
if (isWGL4) {
  document.title = 'WGL4 モデル行列と世界座標の変換ラボ';
  document.querySelector('h1').textContent = 'WGL4 モデル座標から世界へ：T × R × S';
  document.querySelector('#panel-conditions > p').textContent =
    '4頂点を斉次行列で世界座標へ移し、赤いローカルx軸・緑のローカルy軸も同時に描きます。四隅・逆変換・4画素を別々のCPU計算で検査します。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>初期値の4点の世界座標と4画素を予測してから実行する。</li>' +
    '<li>model.js の angleDegrees と scaleY を変更し、図形と軸を比較する。</li>' +
    '<li>multiply4の積順をT*R*SからR*T*Sへ変えて差を調べる。</li>' +
    '<li>model.vert のu_modelまたは構文エラープリセットを変えて診断を見る。</li>';
  byId('preset').options[0].textContent = '初期のT*R*Sとローカル軸';
  byId('preset').options[1].textContent = 'fragment の構文エラー';
}
if (isWGL3) {
  document.title = 'WGL3 共有頂点と添字描画ラボ';
  document.querySelector('h1').textContent = 'WGL3 四角形と格子：drawArrays / drawElements';
  document.querySelector('#panel-conditions > p').textContent =
    '正方形を2つ以上の三角形へ分割。頂点表・添字数・転送byte数とCPUの内外画素を照合します。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>初期の gridSteps=2 と elements で実行し個数と3画素のRGBAを確認する。</li>' +
    '<li>mesh.js の drawMode を arrays に変え、同じ3画素になるか確認する。</li>' +
    '<li>gridSteps=4 にして頂点数・参照数・転送byte数を予測して比較する。</li>' +
    '<li>GLSLを変更するか構文エラープリセットでshader診断を確認する。</li>';
  byId('preset').options[0].textContent = '初期の格子（添字描画）';
  byId('preset').options[1].textContent = 'fragment の構文エラー';
}
load();
// 画素の期待値は、GPUに触れる前に CPU 側で示せる。
byId('result-note').textContent = 'CPU予測: ' + oracle(320, 240)
  .map(item => item.label + '=' + item.rgba.join('/')).join('、');
