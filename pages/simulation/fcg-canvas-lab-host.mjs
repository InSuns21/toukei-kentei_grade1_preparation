// FCG Canvas2D editor host. Same three-tab/page style and opaque-origin run boundary
// as pages/simulation/wgl-lab-host.mjs; the CPU-only FCG1 lesson needs no GLSL.
import {compareTracerSnapshot} from './fcg1-model.mjs';
import {highlightSource} from './wgl-lab-highlight.mjs';

const FILE_URL = new URL('../textbook/volumes/dream_thater/計算系/FCG/FCG1/tracer.js',
  import.meta.url);
const SOURCE_LIMIT = 30000;
const STEP_LIMIT = 110;
const MAX_MESSAGES = 240;
const SESSION_KEY = 'toukei-fcg1-lab-v1';
const el = id => document.getElementById(id);
const editor = el('js-source');
const tabs = ['conditions', 'code', 'result'];
let baseSource = '';
let ready = false;
let active = null;
let generation = 0;
let interval = null;
let sourceRefresh = () => {};

function selectTab(name, focus = false) {
  for (const tab of tabs) {
    const selected = tab === name;
    const button = el('tab-' + tab);
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
    el('panel-' + tab).hidden = !selected;
    if (selected && focus) button.focus();
  }
}
tabs.forEach((name, i) => {
  const button = el('tab-' + name);
  button.addEventListener('click', () => selectTab(name));
  button.addEventListener('keydown', event => {
    const key = event.key;
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(key)) return;
    event.preventDefault();
    const next = key === 'Home' ? 0 : key === 'End' ? tabs.length - 1 :
      (i + (key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    selectTab(tabs[next], true);
  });
});
function setStatus(message, bad = false) {
  el('status').textContent = message;
  el('status').className = bad ? 'error' : '';
}
function installHighlight() {
  const wrapper = document.createElement('div');
  wrapper.className = 'wgl-code-editor';
  const backdrop = document.createElement('pre');
  backdrop.className = 'wgl-code-highlight';
  backdrop.setAttribute('aria-hidden', 'true');
  const code = document.createElement('code');
  backdrop.append(code);
  editor.parentNode.insertBefore(wrapper, editor);
  wrapper.append(backdrop, editor);
  editor.wrap = 'soft';
  sourceRefresh = () => {
    code.innerHTML = highlightSource(editor.value, 'javascript') + '\n';
    backdrop.scrollTop = editor.scrollTop;
  };
  editor.addEventListener('input', sourceRefresh);
  editor.addEventListener('scroll', () => {backdrop.scrollTop = editor.scrollTop;});
  editor.addEventListener('keydown', event => {
    if (event.key !== 'Tab' || event.altKey || event.ctrlKey ||
      event.metaKey || event.shiftKey) return;
    event.preventDefault();
    editor.setRangeText('  ', editor.selectionStart, editor.selectionEnd, 'end');
    sourceRefresh();
  });
  sourceRefresh();
}
installHighlight();

async function loadSource() {
  try {
    const response = await fetch(FILE_URL);
    if (!response.ok) throw new Error('教材ソースHTTP ' + response.status);
    baseSource = await response.text();
    if (!baseSource || baseSource.length > SOURCE_LIMIT)
      throw new Error('教材ソースの文字数上限違反');
    editor.value = baseSource;
    try {
      const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
      if (saved && saved.version === 1 &&
          typeof saved.source === 'string' && saved.source.length <= SOURCE_LIMIT) {
        editor.value = saved.source;
        el('save-status').textContent = '保存済みの編集を復元しました（未実行）';
      }
    } catch {
      el('save-status').textContent = '保存領域を使えません。初期教材を利用します。';
    }
    sourceRefresh();
    ready = true;
    setStatus('初期ソースを読み込みました。「実行・リセット」を押してください');
  } catch (error) {
    setStatus('読み込み失敗: ' + String(error.message), true);
    el('diagnostics').textContent = 'Pages配信・キャッシュ・オフライン状態を確認してください。';
  }
}
function capture() {
  const source = editor.value;
  if (source.length === 0 || source.length > SOURCE_LIMIT)
    throw new RangeError('JavaScriptは1〜30,000文字にしてください');
  const mode = el('field').value;
  const dt = Number(el('dt').value);
  if (!['rotation', 'steady', 'unsteady'].includes(mode) ||
    !Number.isFinite(dt) || dt < 0.025 || dt > 0.25)
    throw new RangeError('物理刻み幅・速度場の指定が不正です');
  return {source, mode, dt};
}
function pause() {
  if (interval !== null) clearInterval(interval);
  interval = null;
}
function stop(message = '停止しました。隔離実行環境を破棄しました') {
  pause();
  if (active) {
    clearTimeout(active.timeout);
    active.frame.remove();
    active = null;
  }
  el('canvas-slot').replaceChildren();
  setStatus(message);
}
function randomToken() {
  if (!crypto?.getRandomValues) throw new Error('HTTPSの暗号学的乱数を利用できません');
  const bytes = new Uint32Array(4);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(v => v.toString(16).padStart(8, '0')).join('');
}

// Serialised into the opaque-origin sandbox. Untrusted code never runs in host.
function isolatedRunner() {
  'use strict';
  const canvas = document.getElementById('lab-canvas');
  let api = null;
  let identity = null;
  let count = 0;
  let started = false;
  function send(message) {parent.postMessage(message, '*');}
  function scoped(type, payload = {}) {
    if (++count > 250) return;
    send({...identity, type, ...payload});
  }
  window.addEventListener('message', event => {
    if (event.source !== parent) return;
    const request = event.data;
    if (!request || typeof request !== 'object') return;
    if (request.type === 'run' && !started) {
      started = true;
      identity = {requestId: request.requestId, generation: request.generation,
        session: request.session};
      try {
        if (!['rotation', 'steady', 'unsteady'].includes(request.mode) ||
          !Number.isFinite(request.dt) || request.dt < 0.025 ||
          request.dt > 0.25 || typeof request.source !== 'string' ||
          request.source.length > 30000) throw new Error('invalid run parameters');
        canvas.width = 660; canvas.height = 410;
        // The learner's source is evaluated only inside a sandboxed iframe.
        const initialize = new Function('canvas', 'settings', 'emit',
          request.source + '\nreturn createLab(canvas,settings,emit);');
        api = initialize(canvas, {mode: request.mode, dt: request.dt},
          value => scoped('snapshot', {snapshot: value}));
        if (!api || typeof api.step !== 'function' ||
          typeof api.reset !== 'function')
          throw new Error('createLab must return step and reset');
        scoped('initialized');
      } catch (error) {
        scoped('error', {message: String(error?.stack || error).slice(0, 3000)});
      }
      return;
    }
    if (!identity || request.session !== identity.session ||
      request.requestId !== identity.requestId ||
      request.generation !== identity.generation || !api) return;
    if (request.type === 'step') {
      try {
        const success = api.step();
        if (success === false) scoped('complete');
      } catch (error) {
        scoped('error', {message: String(error?.stack || error).slice(0, 3000)});
      }
    } else if (request.type === 'reset') {
      try {api.reset();}
      catch (error) {scoped('error', {message: String(error?.stack || error).slice(0, 3000)});}
    }
  });
  send({type: 'ready'});
}
function htmlRunner() {
  const csp = "default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'unsafe-inline'; img-src 'none'; connect-src 'none'; " +
    "worker-src 'none'; frame-src 'none'; object-src 'none'; " +
    "form-action 'none'; base-uri 'none'";
  return '<!doctype html><html lang="ja"><head><meta charset="utf-8">' +
    '<meta http-equiv="Content-Security-Policy" content="' + csp + '">' +
    '<meta name="referrer" content="no-referrer">' +
    '<style>body{margin:0;background:white}canvas{display:block;width:100%;height:auto;max-width:660px;margin:auto}</style>' +
    '</head><body><canvas id="lab-canvas" aria-label="流れの速度矢印と粒子・瞬時流線"></canvas>' +
    '<script>(' + isolatedRunner.toString() + ')()</scr' + 'ipt></body></html>';
}
function displayRows(rows, changed, time) {
  const table = document.createElement('table');
  const titles = ['粒子ID', '数値位置 [m]', '厳密位置 [m]', '解析との差 [m]',
    '既定Eulerとの差 [m]', '既定コード検算'];
  const head = document.createElement('tr');
  for (const label of titles) {
    const th = document.createElement('th');
    th.textContent = label; head.append(th);
  }
  const thead = document.createElement('thead');
  thead.append(head);
  table.append(thead);
  const tbody = document.createElement('tbody');
  const pair = p => p.map(v => Number(v).toFixed(5)).join(', ');
  for (const row of rows) {
    const tr = document.createElement('tr');
    for (const val of [String(row.id), pair(row.point), pair(row.exact),
      row.physicalError.toFixed(7), row.strictError.toExponential(2),
      changed ? '編集版・参考' : row.pass ? '一致' : '不一致']) {
      const td = document.createElement('td');
      td.textContent = val;
      tr.append(td);
    }
    tbody.append(tr);
  }
  table.append(tbody);
  el('particle-diagnostics').replaceChildren(table);
  el('result-note').textContent = '物理時刻 ' + time.toFixed(3) +
    '秒。解析軌道と数値Euler基準は、編集可能な教材コードとは独立して計算しました。' +
    (changed ? '編集コードは基準値と違っても自動的には誤答・正答と判定しません。' :
      '初期コードは各IDの既定Euler更新値と比較しています。');
}
function sendStep() {
  if (!active || !active.initialized || active.busy) return;
  if (active.steps >= STEP_LIMIT) {
    pause(); setStatus('step上限で停止しました'); return;
  }
  active.busy = true;
  active.frame.contentWindow.postMessage({
    type: 'step', requestId: active.id, generation: active.generation,
    session: active.session
  }, '*');
  clearTimeout(active.timeout);
  const current = active.generation;
  active.timeout = setTimeout(() => {
    if (!active || active.generation !== current || !active.busy) return;
    stop('step応答が6秒を超えたため隔離実行環境を破棄しました');
  }, 6000);
}
window.addEventListener('message', event => {
  if (!active || event.source !== active.frame.contentWindow) return;
  const msg = event.data;
  if (!msg || typeof msg !== 'object') return;
  if (msg.type === 'ready' && !active.sent) {
    active.sent = true;
    active.frame.contentWindow.postMessage({
      type: 'run', requestId: active.id, generation: active.generation,
      session: active.session, ...active.payload
    }, '*');
    return;
  }
  if (msg.requestId !== active.id || msg.generation !== active.generation ||
    msg.session !== active.session) return;
  if (msg.type === 'initialized') {
    active.initialized = true;
    clearTimeout(active.timeout); active.timeout = null;
    setStatus('Canvas2D実行準備完了。1stepまたは再生を押してください。');
    return;
  }
  if (msg.type === 'complete') {
    active.busy = false; clearTimeout(active.timeout); active.timeout = null;
    pause(); setStatus('観測上限2.5秒に達しました（粒子と数値表は保持）');
    return;
  }
  if (msg.type === 'error') {
    pause();
    el('diagnostics').textContent = String(msg.message).slice(0, 3000);
    setStatus('JavaScriptの実行エラー。コードと診断ログを確認してください', true);
    active.busy = false;
    clearTimeout(active.timeout); active.timeout = null;
    return;
  }
  if (msg.type !== 'snapshot') return;
  active.busy = false;
  clearTimeout(active.timeout); active.timeout = null;
  if (++active.messages > MAX_MESSAGES) {
    pause(); setStatus('通信件数の上限で停止しました', true);
    return;
  }
  try {
    const data = msg.snapshot;
    if (typeof data !== 'object' || data.mode !== active.payload.mode ||
      Math.abs(data.dt - active.payload.dt) > 1e-12)
      throw new Error('速度場または刻み幅の数値診断が不正です');
    const rows = compareTracerSnapshot(active.payload.mode, active.payload.dt, data);
    active.steps = data.steps;
    displayRows(rows, active.payload.source !== baseSource, data.time);
    const unchanged = active.payload.source === baseSource;
    const valid = rows.every(r => r.pass);
    setStatus(unchanged && !valid ? '初期コードの更新が独立CPU基準と不一致' :
      '物理時刻 ' + data.time.toFixed(3) + ' 秒・' + data.steps + ' stepを表示',
      unchanged && !valid);
    el('diagnostics').textContent = unchanged
      ? '初期コードの粒子ID・時刻・解析値・Euler値を独立検算中。'
      : '編集版の数値を表示中。初期コードを基準として比較し、物理解の保証はしません。';
  } catch (error) {
    pause();
    setStatus('診断値の不整合: ' + error.message, true);
    el('diagnostics').textContent = String(error.message);
  }
});

function run() {
  selectTab('result');
  stop('隔離実行環境を準備中');
  // A new execution must not display the prior run's numeric rows.
  el('particle-diagnostics').replaceChildren();
  el('diagnostics').textContent = '未実行';
  el('result-note').textContent = '新しい解析・数値計算を準備中';
  if (!ready) {setStatus('ソースが未取得です', true); return;}
  let payload;
  try { payload = capture(); }
  catch (error) { setStatus(String(error.message), true); return; }
  let session;
  try {session = randomToken();}
  catch (error) {setStatus(String(error.message), true);return;}
  const frame = document.createElement('iframe');
  frame.title = 'FCG1 隔離されたCanvas2D流れの表示';
  frame.className = 'result-frame';
  frame.setAttribute('sandbox', 'allow-scripts');
  frame.setAttribute('referrerpolicy', 'no-referrer');
  frame.srcdoc = htmlRunner();
  const id = ++generation;
  active = {id, generation: id, frame, payload, sent: false,
    initialized: false, busy: false, steps: 0, messages: 0, session,
    timeout: setTimeout(() => {
      if (active?.generation !== id) return;
      stop('実行開始が6秒を超えたため隔離環境を破棄しました');
    }, 6000)};
  el('canvas-slot').append(frame);
}
el('run').addEventListener('click', run);
el('fcg1-observe')?.addEventListener('click',()=>el('run').click());
el('step').addEventListener('click', sendStep);
el('play').addEventListener('click', () => {
  if (!active?.initialized) {setStatus('先に「実行・リセット」を押してください', true); return;}
  pause();
  interval = setInterval(sendStep, 150);
  setStatus('物理stepを一定間隔で実行中。停止してもCanvasの描画フレーム数は物理時刻に含みません。');
});
el('pause').addEventListener('click', () => {
  pause(); setStatus('一時停止しました（物理状態は保持）');
});
el('stop').addEventListener('click', () => stop());
el('reset').addEventListener('click', () => {
  stop('初期ソースに戻しました。コードは未実行');
  editor.value = baseSource;
  sourceRefresh();
  selectTab('code');
});
el('save').addEventListener('click', () => {
  try {
    const record = capture();
    localStorage.setItem(SESSION_KEY, JSON.stringify({version: 1, source: record.source}));
    el('save-status').textContent = 'この端末にコードを保存しました（自動実行しません）';
  } catch (error) {el('save-status').textContent = '保存できません: ' + error.message;}
});
loadSource();
