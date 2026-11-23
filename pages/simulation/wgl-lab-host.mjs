import { compareReadback, expectedSamples } from './wgl-lab-core.mjs';
import {expectedWGL20Samples,compareWGL20Readback,verifyWGL20Report} from './wgl20-lab-core.mjs';
import {compareWGL19Readback, expectedWGL19Samples, compareWGL19FloatReadback, auditWGL19Clock} from './wgl19-lab-core.mjs';
import { compareFCG2Readback, expectedFCG2Samples, fcg2PixelCell, fcg2Field, fcg2FieldAtTime, fcg2Encode, fcg2Color, FCG2_PERIOD } from './fcg2-lab-core.mjs';
import {compareFCG3Readback,expectedFCG3Samples,fcg3Metrics,fcg3PixelCell,fcg3Grid,fcg3Exact} from './fcg3-lab-core.mjs';
import {expectedFCG4Samples,compareFCG4Readback,fcg4State,fcg4PixelCell} from './fcg4-lab-core.mjs';
import {expectedFCG5Samples,compareFCG5Readback,fcg5State,fcg5PixelCell} from './fcg5-lab-core.mjs';
import {expectedFCG6Samples,compareFCG6Readback,fcg6State,fcg6PixelCell} from './fcg6-lab-core.mjs';
import {expectedFCG7Samples,compareFCG7Readback,fcg7State} from './fcg7-lab-core.mjs';
import {expectedFCG8Samples,compareFCG8Readback,fcg8State} from './fcg8-lab-core.mjs';
import { highlightSource } from './wgl-lab-highlight.mjs';
import {mountReferenceObservation} from './wgl-fcg-reference-visual.mjs';
import {mountVisualGuide} from './wgl-fcg-visual-guide.mjs';
import {mountLabParameters,parametersFor,readLabParameter,writeLabParameter,verifiedFCG5Physics,verifiedFCG3Physics,verifiedFCG8Physics,verifiedFCG2Physics} from './wgl-lab-parameters.mjs';
import {mountSceneInfo} from './wgl-lab-scene-info.mjs';
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
import { compareWGL15Readback, expectedWGL15Samples, cpuPickWGL15Pixel } from './wgl15-lab-core.mjs';
import { compareWGL16Readback, expectedWGL16Samples } from './wgl16-lab-core.mjs';
import { compareWGL17Readback, expectedWGL17Samples } from './wgl17-lab-core.mjs';
import { compareWGL18Readback, expectedWGL18Samples, compareWGL18FloatReadback } from './wgl18-lab-core.mjs';

const VERSION = 'wgl-fcg-lab-v1';
// ホスト/隔離実行は共通。講義のソースとCPU基準だけを切り替える。
const requestedLesson = new URL(location.href).searchParams.get('lesson');
const lesson = ['WGL1', 'WGL2', 'WGL3', 'WGL4', 'WGL5', 'WGL6', 'WGL7', 'WGL8', 'WGL9', 'WGL10', 'WGL11', 'WGL12', 'WGL13', 'WGL14', 'WGL15', 'WGL16', 'WGL17', 'WGL18', 'WGL19', 'WGL20', 'FCG2', 'FCG3', 'FCG4', 'FCG5', 'FCG6', 'FCG7', 'FCG8'].includes(requestedLesson) ? requestedLesson : 'WGL1';
const isFCG2 = lesson === 'FCG2';
const isFCG3 = lesson === 'FCG3';
const isFCG4 = lesson === 'FCG4';
const isFCG5 = lesson === 'FCG5';
const isFCG6 = lesson === 'FCG6';
const isFCG7 = lesson === 'FCG7';
const isFCG8 = lesson === 'FCG8';
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
const isWGL15 = lesson === 'WGL15';
const isWGL16 = lesson === 'WGL16';
const isWGL17 = lesson === 'WGL17';
const isWGL19 = lesson === 'WGL19';
const isWGL20 = lesson === 'WGL20';
const isWGL18 = lesson === 'WGL18';
const requestedCase = new URL(location.href).searchParams.get('case');
const labCase = isWGL20 && ['CS1','CS2','CS3'].includes(requestedCase) ? requestedCase : 'BASE';
// FCG8's old saved JS predates the live playback hooks. Keep the old key
// intact for recovery, but never silently restore it into the new live runner.
const STORAGE_KEY = 'toukei-' + (isFCG8?'fcg8-live-v2':isWGL14?'wgl14-visual-v2':VERSION) + '-' + lesson +
  (isWGL20 ? '-' + labCase : '');

const LESSON_URL = new URL('../textbook/volumes/dream_thater/計算系/' + ((isFCG2 || isFCG3 || isFCG4 || isFCG5 || isFCG6 || isFCG7 || isFCG8) ? 'FCG' : 'WGL') + '/' + lesson + '/', import.meta.url);
const FILES = isWGL20 ? {js:'terrain.js',vertex:'terrain.vert',fragment:'terrain.frag'} : isFCG8 ? {js:'levelset.js',vertex:'levelset.vert',fragment:'levelset.frag'} : isFCG7 ? {js:'particle.js',vertex:'particle.vert',fragment:'particle.frag'} : isFCG6 ? {js:'solid.js',vertex:'solid.vert',fragment:'solid.frag'} : isFCG5 ? {js:'fluid.js',vertex:'fluid.vert',fragment:'fluid.frag'} : isFCG4 ? {js:'projection.js',vertex:'projection.vert',fragment:'projection.frag'} : isFCG3 ? {js:'advection.js',vertex:'advection.vert',fragment:'advection.frag'} : isFCG2 ? {js:'density.js', vertex:'density.vert', fragment:'density.frag'} :
  isWGL19 ? {js: 'audit.js', vertex: 'audit.vert', fragment: 'audit.frag'} :
  isWGL18 ? {js: 'diffusion.js', vertex: 'diffusion.vert', fragment: 'diffusion.frag'} :
  isWGL17 ? {js: 'data-grid.js', vertex: 'data-grid.vert', fragment: 'data-grid.frag'} :
  isWGL16 ? {js: 'instancing.js', vertex: 'instancing.vert', fragment: 'instancing.frag'} :
  isWGL15 ? {js: 'picking.js', vertex: 'picking.vert', fragment: 'picking.frag'} :
  isWGL14 ? {js: 'postprocess.js', vertex: 'postprocess.vert', fragment: 'postprocess.frag'} :
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
const oracle = isWGL20 ? expectedWGL20Samples : isFCG8 ? expectedFCG8Samples : isFCG7 ? expectedFCG7Samples : isFCG6 ? expectedFCG6Samples : isFCG5 ? expectedFCG5Samples : isFCG4 ? expectedFCG4Samples : isFCG3 ? expectedFCG3Samples : isFCG2 ? expectedFCG2Samples : isWGL19 ? expectedWGL19Samples : isWGL18 ? expectedWGL18Samples : isWGL17 ? expectedWGL17Samples : isWGL16 ? expectedWGL16Samples : isWGL15 ? expectedWGL15Samples : isWGL14 ? expectedWGL14Samples : isWGL13 ? expectedWGL13Samples : isWGL12 ? expectedWGL12Samples : isWGL11 ? expectedWGL11Samples : isWGL10 ? expectedWGL10Samples : isWGL9 ? expectedWGL9Samples : isWGL8 ? expectedWGL8Samples : isWGL7 ? expectedWGL7Samples : isWGL6 ? expectedWGL6Samples : isWGL5 ? expectedWGL5Samples : isWGL4 ? expectedWGL4Samples :
  isWGL3 ? expectedWGL3Samples : isWGL2 ? expectedWGL2Samples : expectedSamples;
const SOURCE_LIMIT = 30000;
// Some lessons have deliberately bounded CPU pixel oracles: mirror those limits
// in the host, rather than failing during initial oracle construction.
const legacyViewport = isFCG2 || isFCG3 ||
  (lesson.startsWith('WGL') && Number(lesson.slice(3)) >= 7);
const MAX_PIXELS = legacyViewport ? 524288 : 2097152;
const MAX_SIDE = legacyViewport ? 1024 : 2048;
const TIMEOUT_MS = 6000;
const byId = id => document.getElementById(id);
const inputs = {
  js: byId('js-source'), vertex: byId('vertex-source'), fragment: byId('fragment-source')
};
if (isWGL20) {
  document.querySelector('h1').textContent = 'WGL20 街区3D：建物・太陽光・地形・水位';
  document.querySelector('#panel-conditions h2').textContent = 'このデモで何が分かる？';
  const intro = document.querySelector('#panel-conditions > p');
  intro.textContent = '黄土色の実在PLATEAU建物1棟と、灰白色の合成建物8棟を同じ縮尺の街区に描きます。道路と合成地盤の上へ仮想水位を重ね、太陽の方向で建物の明暗と地面への影が変わる様子を見ます。';
  const instructions = [
    'まず「実行（結果へ）」を押す。街区をドラッグ／矢印キーで回転し、建物の側面・屋上と影を確認する。Homeで初期視点に戻す（CS1ではクリックによるID選択を優先）。',
    '仮想水面32 mを30 mへ下げて水に覆われる場所を比較し、原点の水深が2.29497413 mから0.29497413 mへ変わることを確かめる。',
    '太陽方向とカメラ仰角を変え、影の方向と見え方の違いを観察する。高さの表示倍率だけを変えても水深の数値は変わらない。',
    '「コード編集」で terrain.js／terrain.vert／terrain.frag を書き換えて実行し、シェーダの光と実PLATEAU形状・合成周辺地物の区別を確認する。'
  ];
  const ordered = document.querySelector('#panel-conditions > ol');
  ordered.replaceChildren(...instructions.map(t => {
    const li = document.createElement('li'); li.textContent = t; return li;
  }));
  byId('width').value = '640'; byId('height').value = '420';
  const preset = byId('preset').options[0];
  if (preset) preset.textContent = '初期街区と影';
  const help = document.createElement('p');
  help.textContent = '黄土色＝公式LOD1建物1棟／灰白色＝合成の周辺8棟／暗灰色＝合成道路／青色＝仮想水面。合成水位は洪水予測ではありません。';
  ordered.after(help);
}




const tabs = ['conditions', 'code', 'result'];
const defaults = {};
let refreshParameterControls = () => {};
const updateSceneInfo = mountSceneInfo(lesson, byId('scene-info'));
let plateauSnapshot = null;
let ready = false;
let active = null;
let sequence = 0;
let fcg2Steps = 1;
let fcg2Timer = null; // retained only for common stop/reset teardown
let fcg2Time = Math.PI/2,fcg2Playing=false,fcg2Pending=null,fcg2Mark=null,fcg2Inspector=null;
function fcg2Control(action,time){
  if(!active?.completed)return false;
  active.frame.contentWindow.postMessage({type:'fcg2-control',action,time,
    requestId:active.id,generation:active.generation,session:active.session},'*');
  return true;
}
let fcg3Steps = 1;
let fcg3Timer = null;
let fcg4Steps = 128;
let fcg4Timer = null;
let fcg5Steps = 8;
let fcg5Timer = null;
let refreshFcg5StepMarker = () => {};
let forwardFcg5MotionPreference = () => {};
let fcg6Steps = 8;
let fcg6Timer = null;
let fcg7Steps = 8;
let fcg7Timer = null;
let fcg8Steps = 8;
let fcg8Timer = null; // legacy slot; FCG8 playback now runs inside the sandbox
let fcg8Playing=false,fcg8Pending=null,fcg8Mark=null;
function fcg8Control(action){
  if(!active?.completed)return false;
  active.frame.contentWindow.postMessage({type:'fcg8-control',action,
    requestId:active.id,generation:active.generation,session:active.session},'*');
  return true;
}

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
    // Tab indents code, but Escape then Tab must let keyboard-only learners
    // reach the next editor/control. Shift+Tab keeps native reverse navigation.
    let leaveOnTab = false;
    editor.addEventListener('blur', () => { leaveOnTab = false; });
    editor.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !event.altKey && !event.ctrlKey && !event.metaKey) {
        leaveOnTab = true;
        return;
      }
      if (event.key !== 'Tab') {
        leaveOnTab = false;
        return;
      }
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        leaveOnTab = false;
        return;
      }
      if (leaveOnTab) {
        leaveOnTab = false;
        return; // browser moves focus instead of inserting indentation
      }
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
  // Failures remain visible even when a learner is editing another tab.
  byId('action-feedback').textContent = bad ? message : '';
  if (bad) byId('diagnostics-details').open = true;
}
function sanitizeSize() {
  const width = Number(byId('width').value);
  const height = Number(byId('height').value);
  if (!Number.isInteger(width) || !Number.isInteger(height) ||
      width < 64 || height < 64 || width > MAX_SIDE || height > MAX_SIDE ||
      width * height > MAX_PIXELS) {
    throw new RangeError('幅・高さは64〜'+MAX_SIDE+'の整数、画素総数は'+
      MAX_PIXELS.toLocaleString('en-US')+'以下にしてください');
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
// Only known source literal changes are independently re-evaluated by the FCG6
// CPU reference. Arbitrary learner edits remain runnable but cannot pass this oracle.
function fcg3PhysicsFor(js,vertex,fragment) {
  return isFCG3 ? verifiedFCG3Physics(js,vertex,fragment,defaults) : null;
}
function fcg8PhysicsFor(js,vertex,fragment) {
  return isFCG8 ? verifiedFCG8Physics(js,vertex,fragment,defaults) : null;
}
function fcg6PhysicsFor(js,vertex,fragment) {
  if(!isFCG6||vertex!==defaults.vertex||fragment!==defaults.fragment)return null;
  const specs=parametersFor('FCG6');
  if(specs.length!==5)return null;
  const readings=specs.map(spec=>readLabParameter(js,spec));
  if(!readings.every(state=>state.ok))return null;
  try {
    let canonical=js,baseline=defaults.js;
    // Compare normalized literal values, preserving the harmless 0.10 vs 0.1
    // spelling difference without permitting any other source edit.
    for(const spec of specs){
      canonical=writeLabParameter(canonical,spec,spec.default);
      baseline=writeLabParameter(baseline,spec,spec.default);
    }
    if(canonical!==baseline)return null;
  }catch{return null;}
  const values=Object.fromEntries(specs.map((spec,i)=>[spec.id,readings[i].value]));
  return {...values,N:values.grid};
}
// Accept only known FCG5 literal edits as an independently checkable initial state.
// After pointer-driven dye injection the live texture is no longer this snapshot.
function fcg5PhysicsFor(js,vertex,fragment) {
  return isFCG5 ? verifiedFCG5Physics(js,vertex,fragment,defaults) : null;
}
function setSources(record) {
  for (const name of Object.keys(inputs)) {
    if (typeof record[name] === 'string') inputs[name].value = record[name];
  }
  refreshSourceHighlights();
  refreshParameterControls();
  refreshFcg5StepMarker();
}
refreshParameterControls = mountLabParameters(lesson, byId('lab-parameters'), {
  getSource: () => inputs.js.value,
  setSource: value => {
    inputs.js.value = value;
    refreshSourceHighlights();
    refreshParameterControls();
    refreshFcg5StepMarker();
  },
  rerun: () => run(),
  isReady: () => ready
});
inputs.js.addEventListener('input', refreshParameterControls);
inputs.js.addEventListener('input', () => refreshFcg5StepMarker());

async function load() {
  try {
    const entries = await Promise.all(Object.entries(FILES).map(async ([name, file]) => {
      const response = await fetch(new URL(file, LESSON_URL));
      if (!response.ok) throw new Error(file + ': HTTP ' + response.status);
      const code = await response.text();
      if (code.length > SOURCE_LIMIT) throw new Error(file + ': ファイルが大きすぎます');
      return [name, code];
    }));
    if (isWGL20 && labCase !== 'BASE') {
      const source=entries.find(([name])=>name==='js');
      if(!source||!source[1].includes("const scenario='BASE';"))throw new Error('WGL20 lesson scenario source not found');
      source[1]=source[1].replace("const scenario='BASE';","const scenario='"+labCase+"';");
    }
    if (isWGL20) {
      const snapshotResponse=await fetch(new URL('plateau-lod1.json',LESSON_URL));
      if(!snapshotResponse.ok)throw new Error('PLATEAU snapshot HTTP '+snapshotResponse.status);
      if(Number(snapshotResponse.headers.get('content-length')||0)>200000)
        throw new Error('WGL20 snapshot exceeds static asset size limit');
      plateauSnapshot=await snapshotResponse.json();
      if(plateauSnapshot?.schema!=='wgl20-offline-mesh-v1'||
         plateauSnapshot?.source?.declaredCrs!=='EPSG:6697'||
         !Array.isArray(plateauSnapshot.mesh?.vertices)||
         !Array.isArray(plateauSnapshot.mesh?.triangles))
        throw new Error('WGL20 data schema/CRS mismatch');
    }
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
      if(isFCG8&&!stored&&localStorage.getItem('toukei-'+VERSION+'-FCG8')){
        byId('save-status').textContent='旧版の保存コードは保持しています。新しい再生には初期ソースを使用します。';
      }
    } catch {
      byId('save-status').textContent = '保存状態を利用できません（初期ソースで続行）';
    }
    ready = true;
    refreshParameterControls();
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
  if(isFCG5){
    const live=byId('fcg5-live-state');
    if(live)live.textContent='ライブ物理step：未実行';
    for(const id of ['fcg5-live-toggle','fcg5-live-step','fcg5-live-reset']){
      const button=byId(id);
      if(button)button.disabled=true;
    }
  }
  updateSceneInfo(null);
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
  window.addEventListener('message', async event => {
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
      const run = new Function('gl', 'canvas', 'vertexSource', 'fragmentSource', 'report', 'settings', request.js);
      const hooks = await run(gl, canvas, request.vertex, request.fragment, report,
        {steps: ['FCG2','FCG3','FCG4','FCG5','FCG6','FCG7','FCG8'].includes(request.lesson) ? request.steps : undefined,
         snapshot: request.lesson === 'WGL20' ? request.snapshot : undefined});
      if(request.lesson==='FCG5'){
        canvas.addEventListener('fcg5-physics-progress',event=>{
          const d=event.detail;
          if(!d||!Number.isInteger(d.step)||d.step<0||d.step>32||
             typeof d.playing!=='boolean')return;
          send({...scope,type:'fcg5-physics-progress',step:d.step,playing:d.playing});
        });
        // Get the state that is already running in the editable learner JS.
        // Its first physics tick may predate the relay or be delayed by rAF.
        canvas.dispatchEvent(new Event('fcg5-request-progress'));
        window.addEventListener('message',event=>{
          const m=event.data;
          if(event.source!==parent||!m||m.type!=='fcg5-physics-control'||
            m.session!==scope.session||m.requestId!==scope.requestId||
            m.generation!==scope.generation||
            !['toggle','step','reset'].includes(m.action))return;
          canvas.dispatchEvent(new CustomEvent('fcg5-physics-control',{
            detail:{action:m.action}
          }));
        });
      }
      const fcg8Hooks=request.lesson==='FCG8'&&!!hooks&&
        ['play','pause','step','reset'].every(key=>typeof hooks[key]==='function');
      if(fcg8Hooks){
        canvas.addEventListener('fcg8-progress',event=>{
          const d=event.detail;
          if(!d||!Number.isInteger(d.steps)||d.steps<0||d.steps>96)return;
          send({...scope,type:'fcg8-progress',steps:d.steps,playing:!!d.playing,time:d.time});
        });
        window.addEventListener('message',event=>{
          const m=event.data;
          if(event.source!==parent||!m||m.type!=='fcg8-control'||
            m.session!==scope.session||m.requestId!==scope.requestId||
            m.generation!==scope.generation)return;
          if(!['play','pause','step','reset'].includes(m.action))return;
          try{hooks[m.action]();}
          catch(error){send({...scope,type:'fcg8-control-error',
            message:String(error?.message||error).slice(0,300)});}
        });
      }
      const fcg2Hooks=request.lesson==='FCG2'&&!!hooks&&
        ['play','pause','step','reset','seek','select','getTime']
          .every(key=>typeof hooks[key]==='function');
      if(fcg2Hooks){
        canvas.addEventListener('fcg2-progress',event=>{
          const d=event.detail;
          if(!d||!Number.isFinite(d.time)||d.time<0||d.time>2*Math.PI||
             !Number.isInteger(d.x)||!Number.isInteger(d.y)||
             !Array.isArray(d.rgba)||d.rgba.length!==4)return;
          send({...scope,type:'fcg2-progress',time:d.time,playing:!!d.playing,
            x:d.x,y:d.y,rgba:d.rgba});
        });
        canvas.addEventListener('fcg2-failure',event=>{
          send({...scope,type:'fcg2-control-error',
            message:String(event.detail?.message||'render failure').slice(0,300)});
        });
        window.addEventListener('message',event=>{
          const m=event.data;
          if(event.source!==parent||!m||m.type!=='fcg2-control'||
             m.session!==scope.session||m.requestId!==scope.requestId||
             m.generation!==scope.generation)return;
          if(!['play','pause','step','reset','seek'].includes(m.action))return;
          try{
            if(m.action==='seek')hooks.seek(m.time);
            else hooks[m.action]();
          }catch(error){send({...scope,type:'fcg2-control-error',
            message:String(error?.message||error).slice(0,300)});}
        });
      }
      if (request.lesson === 'WGL15' && hooks && typeof hooks.pick === 'function') {
        let cursorX = Math.floor(canvas.width / 2);
        let cursorY = Math.floor(canvas.height / 2);
        canvas.tabIndex = 0;
        canvas.setAttribute('aria-label',
          'WebGL2 3D物体選択。クリック、または矢印キーで移動しEnterで選択');
        function select(x, y, method) {
          try {
            const answer = hooks.pick(x, y);
            send({...scope, type: 'picking', x, y, method,
              gpuId: Number(answer.gpuId), cpuId: Number(answer.cpuId)});
          } catch (error) {
            send({...scope, type: 'pick-error', message: String(error?.message || error).slice(0, 300)});
          }
        }
        canvas.addEventListener('click', event => {
          const rect = canvas.getBoundingClientRect();
          const u = (event.clientX - rect.left) / rect.width;
          const v = (event.clientY - rect.top) / rect.height;
          if (u < 0 || v < 0 || u >= 1 || v >= 1) return;
          cursorX = Math.floor(u * canvas.width);
          cursorY = canvas.height - 1 - Math.floor(v * canvas.height);
          canvas.focus();
          select(cursorX, cursorY, 'mouse');
        });
        canvas.addEventListener('keydown', event => {
          const delta = {ArrowLeft: [-8, 0], ArrowRight: [8, 0],
            ArrowUp: [0, 8], ArrowDown: [0, -8]}[event.key];
          if (delta) {
            event.preventDefault();
            cursorX = Math.max(0, Math.min(canvas.width - 1, cursorX + delta[0]));
            cursorY = Math.max(0, Math.min(canvas.height - 1, cursorY + delta[1]));
            send({...scope, type: 'cursor', x: cursorX, y: cursorY});
          } else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            select(cursorX, cursorY, 'keyboard');
          }
        });
      }
      if (request.lesson==='WGL20' && hooks && typeof hooks.pick==='function') {
        canvas.tabIndex=0;
        canvas.setAttribute('aria-label','WGL20 CS1 建物ID選択。クリックまたは矢印キーとEnter');
        let px=Math.floor(canvas.width/2),py=Math.floor(canvas.height/2);
        function choose(x,y,method){
          try{
            const ids=hooks.pick(x,y);
            send({...scope,type:'wgl20-pick',x,y,method,
              gpuId:Number(ids.gpuId),cpuId:Number(ids.cpuId)});
          }catch(error){
            send({...scope,type:'wgl20-pick-error',message:String(error).slice(0,300)});
          }
        }
        canvas.addEventListener('click',event=>{
          const box=canvas.getBoundingClientRect();
          const u=(event.clientX-box.left)/box.width,v=(event.clientY-box.top)/box.height;
          if(u<0||u>=1||v<0||v>=1)return;
          px=Math.floor(u*canvas.width);py=canvas.height-1-Math.floor(v*canvas.height);
          canvas.focus();choose(px,py,'pointer');
        });
        canvas.addEventListener('keydown',event=>{
          const d={ArrowLeft:[-8,0],ArrowRight:[8,0],ArrowUp:[0,8],ArrowDown:[0,-8]}[event.key];
          if(d){
            event.preventDefault();px=Math.min(canvas.width-1,Math.max(0,px+d[0]));
            py=Math.min(canvas.height-1,Math.max(0,py+d[1]));
          }else if(event.key==='Enter'||event.key===' '){
            event.preventDefault();choose(px,py,'keyboard');
          }
        });
      }
      const positions = (['WGL4', 'WGL5', 'WGL6', 'WGL7', 'WGL8', 'WGL9', 'WGL10', 'WGL11', 'WGL12', 'WGL13', 'WGL14', 'WGL15', 'WGL16', 'WGL17', 'WGL18', 'WGL19', 'WGL20', 'FCG2', 'FCG3', 'FCG4', 'FCG5', 'FCG6', 'FCG7', 'FCG8'].includes(request.lesson)) &&
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
      
      if(request.lesson === 'FCG2' || request.lesson === 'FCG3' || request.lesson === 'FCG4' || request.lesson === 'FCG5' || request.lesson === 'FCG6' || request.lesson === 'FCG7' || request.lesson === 'FCG8'){
        let cursorX=Math.floor(canvas.width/2),cursorY=Math.floor(canvas.height/2);
        canvas.tabIndex=0;
        canvas.setAttribute('aria-label','物理格子の画素検査。クリックか矢印キー＋Enter');
        function pick(x,y,method){
          if(fcg2Hooks)hooks.select(x,y);
          const pixel=new Uint8Array(4);
          gl.readPixels(x,y,1,1,gl.RGBA,gl.UNSIGNED_BYTE,pixel);
          send({...scope,type:request.lesson.toLowerCase()+'-pick',x,y,method,
            time:fcg2Hooks?hooks.getTime():undefined,rgba:Array.from(pixel)});
        }
        canvas.addEventListener('click',event=>{
          const box=canvas.getBoundingClientRect();
          const u=(event.clientX-box.left)/box.width;
          const v=(event.clientY-box.top)/box.height;
          if(u<0||v<0||u>=1||v>=1)return;
          cursorX=Math.min(canvas.width-1,Math.floor(u*canvas.width));
          cursorY=Math.min(canvas.height-1,canvas.height-1-Math.floor(v*canvas.height));
          canvas.focus();pick(cursorX,cursorY,'click');
        });
        canvas.addEventListener('keydown',event=>{
          const delta={ArrowLeft:[-8,0],ArrowRight:[8,0],
            ArrowUp:[0,8],ArrowDown:[0,-8]}[event.key];
          if(delta){
            event.preventDefault();
            cursorX=Math.max(0,Math.min(canvas.width-1,cursorX+delta[0]));
            cursorY=Math.max(0,Math.min(canvas.height-1,cursorY+delta[1]));
            send({...scope,type:request.lesson.toLowerCase()+'-cursor',x:cursorX,y:cursorY});
          }else if(event.key==='Enter'||event.key===' '){
            event.preventDefault();pick(cursorX,cursorY,'keyboard');
          }
        });
      }
      const glError = gl.getError();
      if (glError !== gl.NO_ERROR) report('GL_ERROR', '0x' + glError.toString(16));
      const floatReadback=(request.lesson === 'WGL18' || request.lesson === 'WGL19') && hooks &&
        Array.isArray(hooks.floatReadback) && hooks.floatReadback.length === 16 ?
        hooks.floatReadback.map(v=>Number(v)) : null;
      const floatParameters=(request.lesson === 'WGL18' || request.lesson === 'WGL19') && hooks && hooks.floatParameters ?
        {rate:Number(hooks.floatParameters.rate),steps:Number(hooks.floatParameters.steps)} : null;
      const frameAudit = request.lesson === 'WGL19' && hooks ? hooks.frameAudit : null;
      send({...scope, type: 'result', ok: glError === gl.NO_ERROR, samples, floatReadback, floatParameters, frameAudit,
        liveHooks:request.lesson==='FCG8'?!!fcg8Hooks:request.lesson==='FCG2'?!!fcg2Hooks:undefined,
        checkpoints: request.lesson === 'WGL20' && hooks ? hooks.checkpoints : null,
        width: canvas.width, height: canvas.height,
        logs, glError: '0x' + glError.toString(16)});
      // WGL18 rAF may now use the very same GPU state; do not race the 16 probes.
      if(request.lesson==='WGL18')
        window.dispatchEvent(new Event('wgl18-initial-oracle-captured'));
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
    '<style>' + (isWGL13 ?
      'body{margin:0;padding:0 6px;background:#0c1829;color:#e5eefb;font:14px/1.5 system-ui}' +
      'canvas{display:block;width:100%;height:auto;touch-action:none}' :
      'body{margin:0;display:' + (isWGL10?'block':'grid;place-items:center') +
      ';background:#e2e8f0}canvas{display:block;width:100%;max-width:100%;height:auto}') +
    '</style></head><body>' +
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
  if(isFCG5 && data.type==='fcg5-physics-progress'){
    if(active.contextLost||!Number.isInteger(data.step)||data.step<0||data.step>32||
       typeof data.playing!=='boolean')return;
    for(const id of ['fcg5-live-toggle','fcg5-live-step','fcg5-live-reset']){
      const button=byId(id);
      if(button)button.disabled=false;
    }
    const toggle=byId('fcg5-live-toggle');
    if(toggle){
      toggle.textContent=data.playing?'GPU一時停止':'GPU再生';
      toggle.setAttribute('aria-pressed',String(data.playing));
    }
    const view=byId('fcg5-live-state');
    if(view){
      const timestep=readLabParameter(active.payload.js,parametersFor('FCG5')[3]);
      view.textContent='実行中の物理step '+data.step+'/32、時刻 '+
        (timestep.ok ? (data.step*timestep.value).toFixed(3)+' s' : '編集JSを確認')+
        '（'+(data.playing?'再生中':'一時停止中')+'）';
    }
    return;
  }
  if(isFCG2 && data.type==='fcg2-progress'){
    if(!Number.isFinite(data.time)||data.time<0||data.time>FCG2_PERIOD||
       !Number.isInteger(data.x)||!Number.isInteger(data.y)||
       data.x<0||data.y<0||data.x>=active.payload.width||
       data.y>=active.payload.height||!Array.isArray(data.rgba)||
       data.rgba.length!==4||!data.rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255))
      return;
    fcg2Time=data.time;fcg2Playing=!!data.playing;fcg2Mark?.();
    fcg2Inspector?.(data.time,data.x,data.y,data.rgba);
    return;
  }
  if(isFCG2 && data.type==='fcg2-control-error'){
    fcg2Playing=false;fcg2Mark?.();
    setStatus('FCG2 ライブ操作エラー: '+String(data.message).slice(0,300),true);
    return;
  }
  if(isFCG8 && data.type==='fcg8-progress'){
    if(!Number.isInteger(data.steps)||data.steps<0||data.steps>96)return;
    fcg8Steps=data.steps;fcg8Playing=!!data.playing;
    fcg8Mark?.();
    return;
  }
  if(isFCG8 && data.type==='fcg8-control-error'){
    setStatus('FCG8 ライブ操作エラー: '+String(data.message).slice(0,300),true);
    fcg8Playing=false;fcg8Mark?.();return;
  }
  if (data.type === 'context-lost') {
    // A lost drawing context invalidates even a previously successful GPU readback.
    // Keep WGL19 alive only for its deliberate lose/restore/rebuild exercise.
    byId('diagnostics').textContent += '\nWebGL2 context lost; previous readback invalid';
    byId('results-table').replaceChildren();
    byId('numeric-summary').textContent = '（context lost・旧検算は無効）';
    byId('result-note').textContent =
      'GPUコンテキストが失われました。実行中の描画は無効です。新しく実行してください。';
    active.contextLost = true;
    if (!isWGL19) byId('stop').click(); // also stops host-driven step timers
    setStatus('WebGL2コンテキストが失われました。実行し直してください', true);
    return;
  }
  if (data.type === 'context-restored') {
    byId('diagnostics').textContent += '\nWebGL2 context restored; revalidation required';
    if (isWGL19) {
      // WGL19 explicitly rebuilds GPU resources and independently checks its
      // output after restoration. Other lessons require a fresh sandbox run.
      active.contextLost = false;
      setStatus('WGL19 GPU復旧後の数値再検査中', true);
    } else {
      setStatus('WebGL2が復旧しました。実行し直してください', true);
    }
    return;
  }
  if (isWGL20 && data.type === 'wgl20-pick-error') {
    setStatus('CS1ピッキングエラー: '+String(data.message).slice(0,300),true);
    return;
  }
  if (isWGL20 && data.type === 'wgl20-pick') {
    const {x,y,gpuId,cpuId}=data;
    if(![x,y,gpuId,cpuId].every(Number.isInteger)||x<0||y<0||
       x>=active.payload.width||y>=active.payload.height||
       gpuId<0||gpuId>255||cpuId<0||cpuId>2)return;
    const equal=gpuId===cpuId;
    byId('result-note').textContent=
      'CS1 下原点画素('+x+','+y+'): GPU ID='+gpuId+
      ' / CPU三角形投影によるID='+cpuId+' / '+(equal?'一致':'不一致')+
      '。ID0=地盤・道路・背景、ID1=公式PLATEAU建物、ID2=合成の周辺建物。輪郭上はラスタ化規則との差を調べてください。';
    setStatus(equal?'CS1 ID FBO とCPU射影の選択結果が一致':
      'CS1 GPU/CPU選択が不一致（深度・投影・輪郭を確認）',!equal);
    return;
  }
  if (isWGL15 && data.type === 'cursor') {
    if (Number.isInteger(data.x) && Number.isInteger(data.y) &&
        data.x >= 0 && data.x < active.payload.width &&
        data.y >= 0 && data.y < active.payload.height)
      byId('result-note').textContent = 'キーボード位置 (' + data.x + ',' + data.y +
        ')。Enter/Spaceでこの画素を選択します。';
    return;
  }
  if (isWGL15 && data.type === 'pick-error') {
    setStatus('IDピッキングでエラー: ' + String(data.message).slice(0, 300), true);
    return;
  }
  if (isWGL15 && data.type === 'picking') {
    const {x,y,gpuId,cpuId} = data, {width,height} = active.payload;
    if (!Number.isInteger(x) || !Number.isInteger(y) || x < 0 || x >= width ||
        y < 0 || y >= height || !Number.isInteger(gpuId) ||
        !Number.isInteger(cpuId) || gpuId < 0 || gpuId > 255) return;
    const independent = cpuPickWGL15Pixel(x,y,width,height).id;
    const consistent = independent === cpuId && independent === gpuId;
    byId('result-note').textContent = '選択座標（左下原点）(' + x + ',' + y +
      ') ／独立CPU=' + independent + '、ラボCPU=' + cpuId +
      '、GPU=' + gpuId + ' ／' + (consistent ? '一致' : '不一致') +
      '（ID 0=背景、1=手前、2=奥）';
    setStatus(consistent ? 'CPU射線とGPU ID選択が一致' :
      'CPU射線とGPU IDが不一致（深度・座標・符号化を確認）', !consistent);
    return;
  }
  if (isFCG8 && data.type === 'fcg8-cursor') {
    if(Number.isInteger(data.x)&&Number.isInteger(data.y)&&data.x>=0&&data.y>=0&&
      data.x<active.payload.width&&data.y<active.payload.height)
      byId('result-note').textContent='pixel ('+data.x+','+data.y+')／EnterでGPU画素を確認';
    return;
  }
  if (isFCG8 && data.type === 'fcg8-pick') {
    const {x,y,rgba}=data,{width,height,steps}=active.payload;
    if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||x>=width||y>=height||
      !Array.isArray(rgba)||rgba.length!==4||!rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255))return;
    const panel=Math.min(2,Math.floor(3*(x+0.5)/width));
    const px=3*(x+0.5)/width-panel,py=(y+0.5)/height;
    const physics=fcg8PhysicsFor(active.payload.js,active.payload.vertex,active.payload.fragment);
    const field=fcg8State(steps,physics||{});
    const n=field.N,i=Math.max(0,Math.min(n-1,Math.floor(px*n)));
    const j=Math.max(0,Math.min(n-1,Math.floor(py*n)));
    const phi=panel===0?field.raw[i+n*j]:panel===1?field.reinit[i+n*j]:
      Math.hypot(px-0.5-field.shear*field.time*(py-0.5),py-0.5)-0.18;
    byId('result-note').textContent='panel '+panel+', cell('+i+','+j+
      '), '+(physics?'独立CPU':'初期条件参考CPU')+' phi='+phi.toPrecision(7)+'m / GPU '+rgba.join('/')+
      '（CPUは開始時step '+active.payload.steps+'の初期基準。再生中の画素を保証しません）';
    return;
  }
  if (isFCG7 && data.type === 'fcg7-cursor') {
    if(Number.isInteger(data.x)&&Number.isInteger(data.y)&&data.x>=0&&data.y>=0&&
      data.x<active.payload.width&&data.y<active.payload.height)
      byId('result-note').textContent='pixel ('+data.x+','+data.y+')／EnterでGPU画素を確認';
    return;
  }
  if (isFCG7 && data.type === 'fcg7-pick') {
    const {x,y,rgba}=data,{width,height,steps}=active.payload;
    if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||x>=width||y>=height||
      !Array.isArray(rgba)||rgba.length!==4||!rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255))return;
    const panel=Math.min(2,Math.floor(3*(x+0.5)/width)),
      X=3*(x+0.5)/width-panel,Y=(y+0.5)/height,s=fcg7State(steps);
    const cohort=panel===0?s.pic:s.flip;
    let nearest=null;
    if(panel!==2){
      nearest=cohort.reduce((a,p,k)=>{
        const d=Math.hypot(p[0]-X,p[1]-Y);
        return d<a.distance?{distance:d,k,p}:a;
      },{distance:Infinity});
    }
    const changed=Object.keys(defaults).some(key=>active.payload[key]!==defaults[key]);
    byId('result-note').textContent='panel '+panel+' CPU基準 '+
      (panel===2?'node speed view':('nearest particle '+nearest.k+
      ' distance='+nearest.distance.toFixed(4)+' velocity=('+
      nearest.p[2].toFixed(4)+','+nearest.p[3].toFixed(4)+')'))+
      ' / GPU '+rgba.join('/')+(changed?' / 編集コードではCPU値は初期基準':'');
    return;
  }
  if (isFCG6 && data.type === 'fcg6-cursor') {
    if(Number.isInteger(data.x)&&Number.isInteger(data.y)&&data.x>=0&&
       data.y>=0&&data.x<active.payload.width&&data.y<active.payload.height){
      const options=fcg6PhysicsFor(active.payload.js,active.payload.vertex,active.payload.fragment);
      const c=fcg6PixelCell(data.x,data.y,active.payload.width,active.payload.height,options?.N??48);
      byId('result-note').textContent='panel '+c.panel+' cell('+c.i+','+c.j+') Enter/Space to inspect';
    }
    return;
  }
  if (isFCG6 && data.type === 'fcg6-pick') {
    const {x,y,rgba}=data,{width,height,steps}=active.payload;
    if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||
       x>=width||y>=height||!Array.isArray(rgba)||rgba.length!==4||
       !rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255))return;
    const options=fcg6PhysicsFor(active.payload.js,active.payload.vertex,active.payload.fragment);
    const c=fcg6PixelCell(x,y,width,height,options?.N??48);
    const s=fcg6State(steps,options||{}),k=c.i+s.N*c.j;
    const value=s.solid[k]?'solid':c.panel===0?s.q[k]:c.panel===1?
      s.divergence[k]:s.speed[k];
    const edited=Object.keys(defaults).some(key=>active.payload[key]!==defaults[key]);
    byId('result-note').textContent='cell('+c.i+','+c.j+') CPU='+value+
      ' / GPU RGBA='+rgba.join('/')+(edited&&!options?' (edited source: baseline for comparison only)':'');
    return;
  }
  if (isFCG5 && data.type === 'fcg5-cursor') {
    if(Number.isInteger(data.x)&&Number.isInteger(data.y)&&data.x>=0&&
       data.y>=0&&data.x<active.payload.width&&data.y<active.payload.height){
      const gridSetting=readLabParameter(active.payload.js,parametersFor('FCG5')[0]);
      const c=fcg5PixelCell(data.x,data.y,active.payload.width,active.payload.height,
        gridSetting.ok?gridSetting.value:48);
      byId('result-note').textContent=c.panel+' セル('+c.i+','+c.j+') Enter/Spaceで画素検査';
    }
    return;
  }
  if (isFCG5 && data.type === 'fcg5-pick') {
    const {x,y,rgba}=data,{width,height,steps}=active.payload;
    if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||
       x>=width||y>=height||!Array.isArray(rgba)||rgba.length!==4||
       !rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255))return;
    const fcg5Physics=fcg5PhysicsFor(active.payload.js,active.payload.vertex,active.payload.fragment);
    const N=fcg5Physics?.N??48;
    const c=fcg5PixelCell(x,y,width,height,N),k=c.i+N*c.j;
    if(!fcg5Physics){
      byId('result-note').textContent='GPU RGBA='+rgba.join('/')+
        '（任意編集JS/GLSLのため、独立CPUセル値は未検証）';
      return;
    }
    const s=fcg5State(steps,fcg5Physics);
    const val=c.panel==='dye'?s.q[k]:c.panel==='divergence'?s.divergence[k]:s.speed[k];
    byId('result-note').textContent=c.panel+' セル('+c.i+','+c.j+
      ') 初期スナップショット独立CPU='+val.toPrecision(8)+' GPU RGBA='+rgba.join('/')+
      '（ライブ再生・染料注入後の画素とは時刻が異なります）';
    return;
  }
  if (isFCG4 && data.type === 'fcg4-cursor') {
    if(Number.isInteger(data.x)&&Number.isInteger(data.y)&&data.x>=0&&
       data.y>=0&&data.x<active.payload.width&&data.y<active.payload.height){
      const c=fcg4PixelCell(data.x,data.y,active.payload.width,active.payload.height);
      byId('result-note').textContent=c.panel+' 格子('+c.i+','+c.j+') Enter/SpaceでGPU画素検査';
    }
    return;
  }
  if (isFCG4 && data.type === 'fcg4-pick') {
    const {x,y,rgba}=data,{width,height,steps}=active.payload;
    if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||
       x>=width||y>=height||!Array.isArray(rgba)||rgba.length!==4||
       !rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255))return;
    const c=fcg4PixelCell(x,y,width,height),k=c.i+8*c.j;
    const s=fcg4State(steps);
    const value=c.panel==='pressure'?s.pressure[k]:c.panel==='divergence'?s.div[k]:s.speed[k];
    const changed=Object.keys(defaults).some(key=>active.payload[key]!==defaults[key]);
    byId('result-note').textContent=c.panel+' 格子('+c.i+','+c.j+
      ')、独立CPU物理値='+value.toPrecision(7)+
      '、GPU RGBA8='+rgba.join('/')+(changed?'（編集後の初期CPU基準は参考値）':'');
    return;
  }
  if (isFCG3 && data.type === 'fcg3-cursor') {
    if(Number.isInteger(data.x)&&Number.isInteger(data.y)&&data.x>=0&&
       data.y>=0&&data.x<active.payload.width&&data.y<active.payload.height){
      const grid=readLabParameter(active.payload.js,parametersFor('FCG3')[1]);
       const c=fcg3PixelCell(data.x,data.y,active.payload.width,active.payload.height,grid.ok?grid.value:32);
      byId('result-note').textContent=c.panel+' 格子('+c.i+','+c.j+') Enter/Spaceで画素検査';
    }
    return;
  }
  if (isFCG3 && data.type === 'fcg3-pick') {
    const {x,y,rgba}=data,{width,height,steps}=active.payload;
    if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||
       x>=width||y>=height||!Array.isArray(rgba)||rgba.length!==4||
       !rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255))return;
    const physics=fcg3PhysicsFor(active.payload.js,active.payload.vertex,active.payload.fragment);
     const n=physics?.N??32,radius=physics?.radius??0.14;
     const c=fcg3PixelCell(x,y,width,height,n),k=c.i+n*c.j;
    const q=fcg3Grid(steps,n,radius)[k],e=fcg3Exact((c.i+0.5)/n,(c.j+0.5)/n,steps,radius);
    const q8=Math.round(255*q),e8=Math.round(255*e);
    const ref=c.panel==='density'?[q8,38,255-q8,255]:
      [Math.round(255*Math.min(1,5*Math.abs(q8-e8)/255)),20,26,255];
    const d=Math.max(...rgba.map((v,i)=>Math.abs(v-ref[i])));
    const unchanged=Object.keys(defaults).every(key=>active.payload[key]===defaults[key]);
    byId('result-note').textContent=c.panel+' 格子('+c.i+','+c.j+')、数値q='+
      q.toFixed(6)+'、解析='+e.toFixed(6)+'、GPU='+rgba.join('/')+
      '、起動時CPU画素との差='+d+'階調（再生後は物理stepが異なるため参考値。初期の一致判定は上の6画素表で確認）';
    return;
  }
  if (isFCG2 && data.type === 'fcg2-cursor') {
    if (Number.isInteger(data.x) && Number.isInteger(data.y) &&
      data.x>=0 && data.x<active.payload.width && data.y>=0 &&
      data.y<active.payload.height) {
      const [i,j]=fcg2PixelCell(data.x,data.y,active.payload.width,active.payload.height);
      byId('result-note').textContent='格子('+i+','+j+') を選択。Enter/SpaceでGPU画素を検査します。';
    }
    return;
  }
  if (isFCG2 && data.type === 'fcg2-pick') {
    const {x,y,rgba}=data,{width,height,steps}=active.payload;
    if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||
      x>=width||y>=height||!Array.isArray(rgba)||rgba.length!==4||
      !rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255))return;
    const [i,j]=fcg2PixelCell(x,y,width,height);
    const time=Number.isFinite(data.time)&&data.time>=0&&data.time<=FCG2_PERIOD?
      data.time:steps*Math.PI/2;
    const options=verifiedFCG2Physics(active.payload.js,active.payload.vertex,
      active.payload.fragment,defaults);
    const value=fcg2FieldAtTime(i,j,time,options||{}),byte=fcg2Encode(value);
    const expected=fcg2Color(byte);
    const difference=Math.max(...expected.map((v,k)=>Math.abs(v-rgba[k])));
    fcg2Inspector?.(time,x,y,rgba);
    byId('result-note').textContent='t='+time.toFixed(2)+' s, 染料格子('+i+','+j+
      ') 濃度='+value.toFixed(5)+' → R8='+byte+' → GPU RGBA='+rgba.join('/')+
      (options?'、独立計算との差='+difference+'階調':'（自由編集コードのため比較値は初期モデル）');
    return;
  }
  if (data.type !== 'result' || active.contextLost) return;
  updateSceneInfo(data.ok ? {
    width: active.payload.width, height: active.payload.height,
    steps: (isWGL18 || isWGL19) ? data.floatParameters?.steps : active.payload.steps,
    frameAudit: isWGL19 ? data.frameAudit : undefined,
    gridN: isFCG3 ? readLabParameter(active.payload.js,parametersFor('FCG3')[1]).value :
       isFCG8 ? (fcg8PhysicsFor(active.payload.js,active.payload.vertex,active.payload.fragment)?.N??null) :
        isFCG5 ? readLabParameter(active.payload.js,parametersFor('FCG5')[0]).value :
      isFCG6 ? fcg6PhysicsFor(active.payload.js,active.payload.vertex,active.payload.fragment)?.N : undefined,
    dt: isFCG5 ? readLabParameter(active.payload.js,parametersFor('FCG5')[3]).value : undefined
  } : null);
  clearTimeout(active.timer);
  active.timer = null;
  const unchanged = Object.keys(defaults).every(key => active.payload[key] === defaults[key]);
  byId('diagnostics').textContent = ((data.logs || []).slice(0, 24).join('\n') +
    (data.error ? '\n' + String(data.error).slice(0, 5000) : '') +
    '\nGL error: ' + (data.glError || '取得不可')).trim();
  if (!data.ok) {
    setStatus('WebGL2実行エラー（shaderのstageと行番号を確認）', true);
    byId('result-note').textContent = '描画できませんでした。表示中のエラーを確認し、コードを修正してください。';
    byId('numeric-summary').textContent = '（画素比較なし）';
  } else {
    const samples = Array.isArray(data.samples) ? data.samples : [];
    // For WGL19 only, compare the editable GPU clock/rate against an independently
    // recomputed CPU grid. An inconsistent clock must never be treated as verified.
    const wgl19Clock = isWGL19 ? auditWGL19Clock(data.frameAudit) : null;
    const wgl19Params = data.floatParameters;
    const wgl19Valid = isWGL19 && wgl19Clock.pass && wgl19Params &&
      Number.isFinite(wgl19Params.rate) && wgl19Params.rate >= 0 && wgl19Params.rate <= 0.25 &&
      Number.isInteger(wgl19Params.steps) && wgl19Params.steps >= 0 && wgl19Params.steps <= 12 &&
      wgl19Params.steps === data.frameAudit.steps;
    const fcg3Physics=isFCG3 ?
       fcg3PhysicsFor(active.payload.js,active.payload.vertex,active.payload.fragment) : null;
     const fcg5Physics=isFCG5 ?
      fcg5PhysicsFor(active.payload.js,active.payload.vertex,active.payload.fragment) : null;
    const fcg6Physics=isFCG6 ?
      fcg6PhysicsFor(active.payload.js,active.payload.vertex,active.payload.fragment) : null;
    const fcg8Physics=isFCG8 ?
       fcg8PhysicsFor(active.payload.js,active.payload.vertex,active.payload.fragment) : null;
    const fcg2Physics=isFCG2 ? verifiedFCG2Physics(active.payload.js,active.payload.vertex,active.payload.fragment,defaults) : null;
     const verifiedComparison=unchanged||!!fcg2Physics||!!fcg3Physics||!!fcg5Physics||!!fcg6Physics||!!fcg8Physics;
    const rows = (isWGL20 ? compareWGL20Readback : isFCG8 ? (got,w,h)=>compareFCG8Readback(got,w,h,active.payload.steps,2,fcg8Physics||{}) : isFCG7 ? (got,w,h)=>compareFCG7Readback(got,w,h,active.payload.steps) : isFCG6 ? (got,w,h)=>compareFCG6Readback(got,w,h,active.payload.steps,2,fcg6Physics||{}) : isFCG5 ? (got,w,h)=>compareFCG5Readback(got,w,h,active.payload.steps,2,fcg5Physics||{}) : isFCG4 ? (got,w,h)=>compareFCG4Readback(got,w,h,active.payload.steps) : isFCG3 ? (got,w,h)=>compareFCG3Readback(got,w,h,active.payload.steps,2,fcg3Physics?.N??32,fcg3Physics?.radius??0.14) : isFCG2 ? (got,w,h)=>compareFCG2Readback(got,w,h,active.payload.steps) : isWGL19 ? (got,w,h)=>wgl19Valid ? compareWGL19Readback(got,w,h,2,wgl19Params.rate,wgl19Params.steps) : compareWGL19Readback(got,w,h) : isWGL18 ? compareWGL18Readback : isWGL17 ? compareWGL17Readback : isWGL16 ? compareWGL16Readback : isWGL15 ? compareWGL15Readback : isWGL14 ? compareWGL14Readback : isWGL13 ? compareWGL13Readback : isWGL12 ? compareWGL12Readback : isWGL11 ? compareWGL11Readback : isWGL10 ? compareWGL10Readback : isWGL9 ? compareWGL9Readback : isWGL8 ? compareWGL8Readback : isWGL7 ? compareWGL7Readback : isWGL6 ? compareWGL6Readback : isWGL5 ? compareWGL5Readback : isWGL4 ? compareWGL4Readback : isWGL3 ? compareWGL3Readback : isWGL2 ? compareWGL2Readback : compareReadback)(
      samples, active.payload.width, active.payload.height);
    showTable(rows, verifiedComparison);
    byId('result-note').textContent = 'GPUへ描画しました。コードや条件を変えて再実行できます。';
    if (isWGL10) {
      const choices = Object.fromEntries(parametersFor('WGL10').map(spec => {
        const state = readLabParameter(active.payload.js, spec);
        return [spec.id, state.ok ? state.value : null];
      }));
      const third = Math.floor(active.payload.width / 3);
      const scale = choices['offscreen-scale'];
      const textureSize = Number.isFinite(scale) ?
        Math.max(1, Math.floor(third * scale)) + '×' +
        Math.max(1, Math.floor(active.payload.height * scale)) : '編集JS参照';
      const stages = {'all':'3列比較','scene':'直接描画だけ',
        'texture':'FBOコピーだけ','processed':'後処理だけ'};
      const stage = stages[choices['inspection-pass']] || '編集JS参照';
      const guide = byId('wgl10-stage-guide');
      const allStages = choices['inspection-pass'] === 'all';
      guide.classList.toggle('wgl10-three-columns',allStages);
      if (allStages) {
        const labels = [
          '① 直接描画（比較用）','② FBO保存画像',
          '③ 保存画像の後処理：' + (choices['filter-mode'] || '編集JS参照')
        ];
        guide.replaceChildren(...labels.map(label => {
          const span=document.createElement('span');
          span.textContent=label;
          return span;
        }));
      } else {
        guide.textContent='全幅表示：' + stage;
      }
      byId('result-note').textContent = '実行したFBO：RGBA8 ' + textureSize +
        ' texel ／ 比較列：' + third + '×' + active.payload.height +
        ' px ／ NEAREST ／ ' + stage + '。数値検算は下の詳細にあります。';
    }

    byId('numeric-summary').textContent = verifiedComparison ?
      '（' + (isFCG2&&!unchanged&&fcg2Physics ? '変更した回転速度・染料の独立CPU画素 ' :
       isFCG8&&!unchanged ? '変更Level Set条件の独立CPU初期画素 ' :
         isFCG3&&!unchanged ? '変更格子の独立CPU初期画素 ' :
        isFCG5&&!unchanged ? '変更条件の独立CPU初期画素 ' :
       isFCG6&&!unchanged ? '変更条件の独立CPU画素 ' : '基準画素 ') +
      rows.filter(row => row.pass).length + '/' + rows.length + '）' :
      '（編集版・参考比較）';
    const pass = rows.every(row => row.pass);
    setStatus(isFCG2&&!unchanged&&fcg2Physics ?
        (pass?'FCG2 編集した渦と染料の独立画素検算に合格':'FCG2 編集条件のGPU画素と独立CPUが不一致') :
       isFCG8&&!unchanged&&fcg8Physics ?
        (pass ? 'FCG8 編集した格子・せん断・再初期化の独立CPU初期画素検算に合格' :
          'FCG8 編集した条件の独立CPU初期画素検算が不一致') :
       isFCG3&&!unchanged&&fcg3Physics ?
       (pass ? 'FCG3 編集格子・染料半径の独立CPU初期画素検算に合格' :
         'FCG3 編集格子・染料半径の独立CPU初期画素検算が不一致') :
       isFCG6&&!unchanged&&fcg6Physics ?
       (pass ? 'FCG6 編集した形状・壁運動の独立CPU画素検算に合格' :
         'FCG6 編集した形状・壁運動の独立CPU画素検算が不一致') :
      isFCG5&&!unchanged&&fcg5Physics ?
      (pass ? 'FCG5 編集した条件の独立CPU初期画素検算に合格' :
        'FCG5 編集した条件の独立CPU初期画素検算が不一致') :
      unchanged && pass ? '初期ソースの独立画素検算に合格' :
      unchanged ? '基準画素と不一致（viewport/色/GL状態を再確認）' :
        '編集コードを実行しました（基準との差を比較）',
      verifiedComparison && !pass);
    if (isWGL20) {
      const verified=verifyWGL20Report(data.checkpoints,plateauSnapshot);
      byId('diagnostics').textContent += '\nWGL20 independent CPU geodetic→local, mesh count, ground/water/depth: '+
        (verified.pass?'一致':'不一致') + ' '+JSON.stringify(verified.checks||{});
      if(!verified.pass)setStatus('WGL20 CRS・位置・地盤高と水深の独立数値検査が未達',true);
    }
    if (isWGL18) {
      const fp=data.floatParameters;
      const validParameters=fp&&typeof fp.rate==='number'&&Number.isFinite(fp.rate)&&
        fp.rate>=0&&fp.rate<=0.25&&Number.isInteger(fp.steps)&&fp.steps>=0&&fp.steps<=12;
      const floats=validParameters ? compareWGL18FloatReadback(data.floatReadback,fp.rate,fp.steps) :
        {valid:false,pass:false,maxError:Infinity,mass:NaN};
      byId('diagnostics').textContent += '\nCPU独立基準 vs GPU RGBA32F: ' +
        (floats.valid ? 'max absolute error='+floats.maxError.toPrecision(6)+
          ', mass='+floats.mass.toPrecision(9)+', '+(floats.pass?'一致':'不一致') :
          'float読戻し未取得（数値検証は未達）');
      if (unchanged && !floats.pass)
        setStatus('GPU float読戻しと独立CPU計算が不一致（未達）',true);
    }
    if (isWGL19) {
      const floats=wgl19Valid ? compareWGL19FloatReadback(data.floatReadback,wgl19Params.rate,wgl19Params.steps) :
        {valid:false,pass:false,maxError:Infinity,mass:NaN};
      byId('diagnostics').textContent += '\nWGL19 clock: '+(wgl19Clock.pass?'一致':'不一致')+
        ' / independent CPU-FLOAT: '+(floats.valid ?
        'maxError='+floats.maxError.toPrecision(6)+', mass='+floats.mass.toPrecision(9)+
        ', '+(floats.pass?'一致':'不一致') : '読戻し未取得');
      if(!wgl19Valid||!floats.pass||!rows.every(row=>row.pass))
        setStatus('WGL19 計算時計・画素・float独立検算が未達（入力値・readback・GL状態を確認）',true);
    }
    byId('numeric-note').textContent = unchanged ?
      'CPUは座標と色の定数から独立に予測し、GPUはreadPixelsで実測。RGBA各成分' +
      ((isFCG2 || isFCG3 || isFCG4 || isFCG5 || isFCG6 || isFCG7 || isFCG8) ? '±2' : isWGL20 ? '±1' : isWGL19 ? '±2' : isWGL18 ? '±2' : isWGL17 ? '±2' : isWGL16 ? '±2' : isWGL15 ? '±2' : isWGL14 ? '±2' : isWGL13 ? '±1' : isWGL12 ? '±2' : isWGL11 ? '±2' : isWGL10 ? '±2' : isWGL9 ? '±10' : isWGL8 ? '±4' : (isWGL7 || isWGL6) ? '±3' : (isWGL2 ? '±2' : '±1')) + 'を許容します。' :
      'ソース変更時は初期色のCPU基準と一致しないことがあります。正誤の自動判定ではありません。';
    if(isFCG8&&fcg8Physics&&!unchanged){
      byId('numeric-note').textContent='FCG8：実計算N='+fcg8Physics.N+
        '、せん断率='+fcg8Physics.shear+' s⁻¹、擬似時間反復='+
        fcg8Physics.redistanceIterations+'の独立CPUを再計算し、GPUの13画素を各成分±2で比較。'+
        'その他のJS/GLSLは初期ソースと同一。';
    }
    if(isFCG3&&fcg3Physics&&!unchanged){
       byId('numeric-note').textContent=
         'FCG3：実計算'+fcg3Physics.N+'×'+fcg3Physics.N+
         '・初期染料半径'+fcg3Physics.radius+
         'の独立CPU格子を再計算し、GPU6画素と各成分±2で比較。'+
         'それ以外のJS/GLSLは初期ソースと同一。';
     }
     if (isFCG6 && fcg6Physics && !unchanged) {
      byId('numeric-note').textContent =
        'FCG6：実計算N='+fcg6Physics.N+'×'+fcg6Physics.N+'、形状='+fcg6Physics.shape+'、中心y='+fcg6Physics.centerY+
        ' m、移動振幅='+fcg6Physics.wallAmplitude+' m、角周波数='+
        fcg6Physics.wallFrequency+' rad/sの独立CPU格子を再計算し、'+
        'GPUの9画素と各成分±2で比較（その他のJS/GLSLは初期ソースと同一）。';
    }
    if (isFCG5 && fcg5Physics && !unchanged) {
      byId('numeric-note').textContent =
        'FCG5：実行したN='+fcg5Physics.N+'×'+fcg5Physics.N+'、dt='+fcg5Physics.dt+
        ' s、nu='+fcg5Physics.nu+
        ' m²/s、外力振幅='+fcg5Physics.force+' m²/s²で独立CPUの'+
        fcg5Physics.N+'×'+fcg5Physics.N+'格子を再計算し、'+
        'GPUの初期9画素と各成分±2で比較。染料ブラシ半径='+
        fcg5Physics.brushRadius+' m、入力強度='+fcg5Physics.brushStrength+
        'はドラッグ後の同じ実染料配列へ適用（初期画素検算の対象外）。';
    }
    if (isWGL19 && wgl19Valid && !unchanged) {
      byId('numeric-note').textContent =
        'WGL19：実行時の数値step・拡散係数を独立CPUで再計算し、RGBA各成分±2で比較。GLSL自体を変更した場合は不一致になり得ます。';
    }
  }
  if(isFCG2){
    active.completed=!!data.ok&&!!data.liveHooks;
    fcg2Time=active.payload.steps*Math.PI/2;
    fcg2Playing=false;fcg2Mark?.();
    if(data.ok&&!data.liveHooks){
      setStatus('FCG2 の再生フックがありません。初期ソースに戻して実行してください',true);
      fcg2Pending=null;
    }else if(active.completed){
      const options=verifiedFCG2Physics(active.payload.js,active.payload.vertex,active.payload.fragment,defaults);
       const p=expectedFCG2Samples(active.payload.width,active.payload.height,active.payload.steps,options||{})[0];
      const actual=data.samples?.[0]?.rgba;
      fcg2Inspector?.(fcg2Time,p.x,p.y,Array.isArray(actual)?actual:null);
      if(fcg2Pending){
        const action=fcg2Pending;fcg2Pending=null;
        if(action==='play')fcg2Control('play');
      }
    }else fcg2Pending=null;
  }
  if(isFCG5 && data.ok)forwardFcg5MotionPreference();
  if(isFCG8){
    active.completed=!!data.ok&&!!data.liveHooks;
    if(data.ok&&!data.liveHooks){
      setStatus('このJSには連続再生フックがありません。初期ソースへ戻して実行してください',true);
      fcg8Pending=null;fcg8Playing=false;fcg8Mark?.();
    }
    if(active.completed&&fcg8Pending){
      const action=fcg8Pending;fcg8Pending=null;
      fcg8Control(action);
    }else if(!data.ok){fcg8Pending=null;fcg8Playing=false;fcg8Mark?.();}
  }
});

function run() {
  selectTab('result');
  stop('実行準備中');
  if (!ready) { setStatus('教材ソースがまだ読み込まれていません', true); return; }
  let payload;
  try { payload = {...capture(), lesson};
    if (isWGL20) {
      payload.snapshot=plateauSnapshot;
      payload.probes=expectedWGL20Samples(payload.width,payload.height).map(p=>[p.x,p.y]);
    }
    if (isFCG8) {
      payload.steps=fcg8Steps;
      const physics=fcg8PhysicsFor(payload.js,payload.vertex,payload.fragment);
      const predicted=expectedFCG8Samples(payload.width,payload.height,fcg8Steps,physics||{});
      payload.probes=predicted.map(p=>[p.x,p.y]);
      const z=fcg8State(fcg8Steps,physics||{});
      byId('fcg8-cpu-prediction').textContent=
        (physics?'独立CPU':'初期ソース参考CPU（編集条件は未検証）')+
        ': N='+z.N+'、せん断率 '+z.shear+' s⁻¹、再初期化 '+z.redistanceIterations+
        '反復/step、step='+fcg8Steps+', t='+z.time.toFixed(2)+'s, 厳密面積='+
        z.analyticArea.toPrecision(8)+' m2, 移流面積='+z.rawMetric.area.toPrecision(8)+
        ' m2, 再初期化面積='+z.reinitMetric.area.toPrecision(8)+
        ' m2, 移流勾配誤差='+z.rawMetric.gradientError.toPrecision(6)+
        ', 再初期化勾配誤差='+z.reinitMetric.gradientError.toPrecision(6);
    }
    if (isFCG7) {
      payload.steps=fcg7Steps;
      const predicted=expectedFCG7Samples(payload.width,payload.height,fcg7Steps);
      payload.probes=predicted.map(p=>[p.x,p.y]);
      const s=fcg7State(fcg7Steps);
      byId('fcg7-cpu-prediction').textContent=
        '独立CPU: step='+fcg7Steps+', t='+(fcg7Steps*s.dt).toFixed(2)+'s, mass='+
        s.mass.toPrecision(10)+'kg, PIC E='+s.energyPic.toPrecision(8)+
        'J, FLIP E='+s.energyFlip.toPrecision(8)+
        'J, wraps PIC='+s.picWrap+', FLIP='+s.flipWrap+
        ', PIC momentum=('+s.momentumPic.map(v=>v.toPrecision(5)).join(',')+
        '), FLIP momentum=('+s.momentumFlip.map(v=>v.toPrecision(5)).join(',')+')';
    }
    if (isFCG6) {
      payload.steps=fcg6Steps;
      const options=fcg6PhysicsFor(payload.js,payload.vertex,payload.fragment);
      const predicted=expectedFCG6Samples(payload.width,payload.height,fcg6Steps,options||{});
      payload.probes=predicted.map(p=>[p.x,p.y]);
      const s=fcg6State(fcg6Steps,options||{});
      byId('fcg6-cpu-prediction').textContent=
        (options?'独立CPU':'初期ソース参考CPU（編集条件は未検証）')+
        ' N='+s.N+'×'+s.N+', t='+(fcg6Steps*s.dt).toFixed(3)+
        's, steps='+fcg6Steps+', pre-div='+s.divBefore.toExponential(3)+
        ', post-div='+s.divAfter.toExponential(3)+
        ', residual='+s.residual.toExponential(3)+
        ', RHS mean='+s.mean.toExponential(3)+
        ', identity='+s.identity.toExponential(3)+
        ', wall mismatch='+s.wall.toExponential(3);
    }
    if (isFCG5) {
      payload.steps=fcg5Steps;
      const fcg5Physics=fcg5PhysicsFor(payload.js,payload.vertex,payload.fragment);
      const predicted=expectedFCG5Samples(payload.width,payload.height,fcg5Steps,fcg5Physics||{});
      payload.probes=predicted.map(p=>[p.x,p.y]);
      const s=fcg5State(fcg5Steps,fcg5Physics||{});
      byId('fcg5-cpu-prediction').textContent=
        (fcg5Physics?'独立CPU':'初期ソース参考CPU（編集ソースの計算条件は未検証）')+' N='+s.N+'×'+s.N+', CG反復='+s.pressureIterations+', time='+(fcg5Steps*s.dt).toFixed(3)+
        's, steps='+fcg5Steps+', dye integral='+s.mass.toPrecision(7)+
        ', peak='+s.peak.toPrecision(6)+', div before='+s.divergenceBefore.toExponential(2)+
        ', div after='+s.divergenceAfter.toExponential(2)+
        ', Poisson residual='+s.poissonResidual.toExponential(2)+
        ', identity='+s.identityError.toExponential(2)+
        ', wall='+s.wall.toExponential(2)+
        (s.poissonResidual>0.02?' / 未収束の可能性あり':'')+
        ' / 初期R8予測 '+predicted.map(p=>p.label+'='+p.rgba.join('/')).join('、');
    }
    if (isFCG4) {
      payload.steps=fcg4Steps;
      const predicted=expectedFCG4Samples(payload.width,payload.height,fcg4Steps);
      payload.probes=predicted.map(p=>[p.x,p.y]);
      const s=fcg4State(fcg4Steps);
      byId('fcg4-cpu-prediction').textContent='独立CPU 反復'+fcg4Steps+
        ': Poisson max='+s.poissonMax.toPrecision(7)+
        ', div before='+s.divBefore.toPrecision(7)+', div after='+s.divAfter.toPrecision(7)+
        ', identity error='+s.identityError.toExponential(2)+
        ', wall='+s.wallMax.toExponential(2)+', |p-phi|='+s.pressureError.toPrecision(7)+
        (s.poissonMax>0.02?' / 未収束の可能性あり':' / 設定した残差閾値以下')+
        ' / 初期R8予測 '+predicted.map(p=>p.label+'='+p.rgba.join('/')).join('、');
    }
    if (isFCG3) {
      payload.steps=fcg3Steps;
      const physics=fcg3PhysicsFor(payload.js,payload.vertex,payload.fragment);
       const n=physics?.N??32,radius=physics?.radius??0.14;
       const predicted=expectedFCG3Samples(payload.width,payload.height,fcg3Steps,n,radius);
      payload.probes=predicted.map(p=>[p.x,p.y]);
      const m=fcg3Metrics(fcg3Steps,n,radius);
      byId('fcg3-cpu-prediction').textContent=(physics?'独立CPU '+n+'×'+n+' ':'編集ソースは独立検算対象外／初期32×32参考値 ')+
         'step '+fcg3Steps+
        ': mass='+m.mass.toPrecision(7)+', analytic sampled mass='+m.exactMass.toPrecision(7)+
        ', L1='+m.l1.toPrecision(7)+', max='+m.max.toPrecision(7)+', peak='+m.peak.toPrecision(7)+
        ' / R8 CPU基準: '+predicted.map(p=>p.label+'='+p.rgba.join('/')).join('、');
    }
    if (isFCG2) {
      payload.steps=fcg2Steps;
      const options=verifiedFCG2Physics(payload.js,payload.vertex,payload.fragment,defaults);
       const predicted=expectedFCG2Samples(payload.width,payload.height,fcg2Steps,options||{});
      payload.probes=predicted.map(p=>[p.x,p.y]);
      byId('fcg2-cpu-prediction').textContent=(options?'独立CPU予測':'初期モデル参考予測')+'（GPU非対応でも利用可） step '+
        fcg2Steps+': '+predicted.map(p=>p.label+' q='+p.value.toFixed(6)+
        ', R8='+p.byte+', 予測RGBA='+p.rgba.join('/')).join(' ／ ');
    }
    if (isWGL4) payload.probes = expectedWGL4Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL5) payload.probes = expectedWGL5Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL6) payload.probes = expectedWGL6Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL7) payload.probes = expectedWGL7Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL8) payload.probes = expectedWGL8Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL9) payload.probes = expectedWGL9Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL11) payload.probes = expectedWGL11Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL12) payload.probes = expectedWGL12Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL13) payload.probes = expectedWGL13Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL15) payload.probes = expectedWGL15Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL17) payload.probes = expectedWGL17Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL19) payload.probes = expectedWGL19Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL18) payload.probes = expectedWGL18Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL16) payload.probes = expectedWGL16Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL14) payload.probes = expectedWGL14Samples(payload.width,payload.height).map(p => [p.x,p.y]);
    if (isWGL10) payload.probes = expectedWGL10Samples(payload.width,payload.height).map(p => [p.x,p.y]);
  }
  catch (error) { setStatus(error.message, true); return; }
  byId('numeric-summary').textContent = '（計算中）';
  byId('result-note').textContent = '実行中です。描画結果をここに表示します。';
  byId('diagnostics-details').open = false;
  const iframe = document.createElement('iframe');
  iframe.className = 'result-frame';
  // Responsive preview without changing the actual drawing-buffer resolution.
  iframe.style.aspectRatio = payload.width + ' / ' +
    (payload.height + (isWGL3 ? 200 : isWGL18 ? 160 : isWGL13 ? 235 : 12));
  iframe.style.height = 'auto';
  if (isWGL3) iframe.style.minHeight = '500px'; // two GPU mesh views and controls
  if (isWGL13) iframe.style.minHeight = '540px';
  if (isWGL17) {
    // The texel inspector belongs below the GPU canvas, never over its pixels.
    iframe.style.aspectRatio = 'auto';
    iframe.style.height = '820px';
  }
  iframe.title = 'WebGL2 実行結果（隔離 origin）';
  iframe.setAttribute('sandbox', 'allow-scripts');
  iframe.setAttribute('referrerpolicy', 'no-referrer');
  iframe.srcdoc = runnerHtml();
  const generation = ++sequence;
  active = {frame: iframe, payload, id: generation, generation,
    session: token(), started: false, completed:false, contextLost:false, timer: null};
  if(isFCG8){fcg8Playing=false;fcg8Mark?.();}
  active.timer = setTimeout(() => {
    if (active?.generation !== generation) return;
    stop('タイムアウト（iframeを破棄）。ブラウザ/GPUの停止を完全には防げません。');
  }, TIMEOUT_MS);
  byId('diagnostics').textContent = 'WebGL2 context / shader compile / link を検査中';
  byId('results-table').replaceChildren();
  byId('canvas-slot').append(iframe);
}

byId('run').addEventListener('click', run);
byId('edit-after-run').addEventListener('click', () => {
  selectTab('code');
  inputs.js.focus();
});
byId('stop').addEventListener('click', () => {if(fcg2Timer!==null){clearInterval(fcg2Timer);fcg2Timer=null;} if(fcg3Timer!==null){clearInterval(fcg3Timer);fcg3Timer=null;} if(fcg4Timer!==null){clearInterval(fcg4Timer);fcg4Timer=null;} if(fcg5Timer!==null){clearInterval(fcg5Timer);fcg5Timer=null;} if(fcg6Timer!==null){clearInterval(fcg6Timer);fcg6Timer=null;} if(fcg7Timer!==null){clearInterval(fcg7Timer);fcg7Timer=null;} if(fcg8Timer!==null){clearInterval(fcg8Timer);fcg8Timer=null;} stop();});
byId('reset').addEventListener('click', () => {
  if(fcg2Timer!==null){clearInterval(fcg2Timer);fcg2Timer=null;}
  if(fcg3Timer!==null){clearInterval(fcg3Timer);fcg3Timer=null;}
  if(fcg4Timer!==null){clearInterval(fcg4Timer);fcg4Timer=null;}
  if(fcg5Timer!==null){clearInterval(fcg5Timer);fcg5Timer=null;}
  if(fcg6Timer!==null){clearInterval(fcg6Timer);fcg6Timer=null;}
  if(fcg7Timer!==null){clearInterval(fcg7Timer);fcg7Timer=null;}
  if(fcg8Timer!==null){clearInterval(fcg8Timer);fcg8Timer=null;}
  if(isFCG8)fcg8Steps=8;
  if(isFCG7)fcg7Steps=8;
  if(isFCG6)fcg6Steps=8;
  if(isFCG5)fcg5Steps=8;
  if(isFCG4)fcg4Steps=128;
  if(isFCG2){fcg2Steps=0;fcg2Time=0;fcg2Playing=false;fcg2Pending=null;fcg2Mark?.();}
  if(isFCG3)fcg3Steps=0;
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
     } else if (isFCG8) {
       inputs.fragment.value=defaults.fragment.replace('outColor=vec4(rgb,1.0);','outColor=vec4(rgb,1.0)');
     } else if (isFCG7) {
       inputs.fragment.value=defaults.fragment.replace('outColor=vec4(rgb,1.0);','outColor=vec4(rgb,1.0)');
    } else if (isFCG6) {
       inputs.fragment.value=defaults.fragment.replace('outColor=vec4(rgb,1.0);', 'outColor=vec4(rgb,1.0)');
     } else if (isFCG5) {
       inputs.fragment.value=defaults.fragment.replace(
         'outColor=vec4(q,0.08,0.08,1.0);',
         'outColor=vec4(q,0.08,0.08,1.0)');
     } else if (isFCG4) {
       inputs.fragment.value=defaults.fragment.replace(
         'outColor=vec4(q,0.08,0.08,1.0);',
         'outColor=vec4(q,0.08,0.08,1.0)');
     } else if (isFCG3) {
       inputs.fragment.value=defaults.fragment.replace(
         'else outColor=vec4(min(1.0,5.0*abs(q-exact)),0.08,0.1,1.0);',
         'else outColor=vec4(min(1.0,5.0*abs(q-exact)),0.08,0.1,1.0)');
     } else if (isFCG2) {
       inputs.fragment.value=defaults.fragment.replace(
        'outColor=vec4(mix(water,dye,q),1.0);',
        'outColor=vec4(mix(water,dye,q),1.0)');
    } else if (isWGL19) {
      inputs.fragment.value=defaults.fragment.replace(
        'outColor=vec4(v,0.2,1.0-v,1.0);',
        'outColor=vec4(v,0.2,1.0-v,1.0)');
    } else if (isWGL18) {
      inputs.fragment.value=defaults.fragment.replace(
        'outColor = vec4(value, 0.2, 1.0-value, 1.0);',
        'outColor = vec4(value, 0.2, 1.0-value, 1.0)');
    } else if (isWGL17) {
      inputs.fragment.value = defaults.fragment.replace(
        'outColor = vec4(normalized, 0.2, 1.0 - normalized, 1.0);',
        'outColor = vec4(normalized, 0.2, 1.0 - normalized, 1.0)');
    } else if (isWGL16) {
      inputs.fragment.value = defaults.fragment.replace('outColor = vec4(v_color, 1.0);','outColor = vec4(v_color, 1.0)');
    } else if (isWGL15) {
      inputs.fragment.value = defaults.fragment.replace(
        'outColor = vec4(rgb, 1.0);', 'outColor = vec4(rgb, 1.0)');
    } else if (isWGL14) {
      inputs.fragment.value = defaults.fragment.replace(
        'vec3 result = v_uv.x < u_compare ? original : processed;',
        'vec3 result = v_uv.x < u_compare ? original : ;');
    } else if (isWGL13) {
      inputs.fragment.value = defaults.fragment.replace(
        'uniform samplerCube u_env;', 'uniform samplerCube u_env');
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
        'outColor = vec4(saved, 1.0);',
        'outColor = vec4(saved, 1.0)');
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
  refreshParameterControls();
  selectTab('code');
});
if (isFCG8) {
  document.title='FCG8 自由表面：Level Set編集・連続再生ラボ';
  document.querySelector('h1').textContent='FCG8 界面を実際に動かす：移流・再初期化・厳密粒子';
  document.querySelector('#panel-conditions > p').textContent=
    '実計算48/64/80/96セルのFloat64 Level Setをせん断流で移流。3画面の再生には編集した同一JS/GLSLを使います。'+
    '描画画素の増加と表示補間は数値格子の高精度化とは異なります。';
  document.querySelector('#panel-conditions ol').innerHTML=
    '<li>step0/8/24/96で界面の伸びと格子境界の影響を観察する。</li>'+
    '<li>再生・一時停止・1ステップ・step0を操作し、物理時間と画面フレームを区別する。</li>'+
    '<li>格子N・せん断率・再初期化反復数をGUIで変え、同じ物理時刻で輪郭・離散面積・勾配を比較する。</li>'+
    '<li>GLSLの色帯閾値0.014を変え、計算値と表示の差を確認する。</li>'+
    '<li>初回GPU画素検算とライブ中の画素を混同しない。96stepは安全上限で、長時間では境界に達する。</li>';
  byId('preset').options[0].textContent='移流／再初期化／解析界面の3表示';
  byId('preset').options[1].textContent='fragment構文エラー';
  const controls=document.createElement('div');controls.className='controls';
  const step=document.createElement('button'),play=document.createElement('button'),
    pause=document.createElement('button'),back=document.createElement('button'),
    marker=document.createElement('output');
  for(const [button,label] of [[step,'1ステップ'],[play,'再生'],[pause,'一時停止'],[back,'step 0へ戻す']]){
    button.type='button';button.className='action';button.textContent=label;controls.append(button);
  }
  controls.append(marker);byId('run').parentElement.before(controls);
  const preview=document.createElement('p');preview.id='fcg8-cpu-prediction';
  preview.setAttribute('aria-live','polite');
  preview.textContent='GPU非対応でも独立CPUの初期面積・勾配誤差を確認できます。';
  byId('panel-result').append(preview);
  const note=document.createElement('p');note.className='visual-snapshot-note';
  note.textContent='初期画素を独立CPUで検算した後、同じ編集コードが96stepまで連続更新します。'+
    '表とCPU数値は開始時刻の静止基準であり、再生中の毎フレームを検算したものではありません。'+
    '48×48格子の表示補間は数値解像度の向上ではありません。';
  byId('canvas-slot').before(note);
  fcg8Mark=function(){
    marker.textContent='物理step '+fcg8Steps+'/96、時刻 '+(fcg8Steps*.04).toFixed(2)+
      's ／ '+(fcg8Playing?'再生中':'停止中');
    pause.disabled=!fcg8Playing;
    play.disabled=fcg8Playing;
    step.disabled=fcg8Steps>=96;
  };
  function control(action){
    if(!ready){setStatus('教材ソースの読み込みを確認してください',true);return;}
    if(!fcg8Control(action)){fcg8Pending=action;run();}
  }
  step.addEventListener('click',()=>control('step'));
  play.addEventListener('click',()=>control('play'));
  pause.addEventListener('click',()=>control('pause'));
  back.addEventListener('click',()=>control('reset'));
  byId('reset').addEventListener('click',()=>{fcg8Steps=8;fcg8Playing=false;fcg8Pending=null;fcg8Mark();});
  byId('stop').addEventListener('click',()=>{fcg8Playing=false;fcg8Pending=null;fcg8Mark();});
  fcg8Mark();
}
if (isFCG7) {
  document.title='FCG7 PIC/FLIP：編集・検算ラボ';
  document.querySelector('h1').textContent='FCG7 粒子と格子のPIC/FLIP転送';
  document.querySelector('#panel-conditions > p').textContent=
    '16粒子、8×8周期節点格子。P2G→格子加速度と減衰→PIC/FLIP G2P→位置更新を各群で実行。左PIC粒子（水色）、中央FLIP粒子（橙色）、右PIC群節点速度R8。圧力射影や自由表面は含まない。';
  document.querySelector('#panel-conditions ol').innerHTML=
    '<li>step0/1/8/24で粒子位置、境界折返し回数、PICとFLIPの運動エネルギーを比較する。</li>'+
    '<li>1ステップ、再生、一時停止、step0復帰を試し、描画間隔と物理時刻を区別する。</li>'+
    '<li>particle.jsのpicMix/flipMix、damp、forceを変更し、独立CPU基準との差を説明する。</li>'+
    '<li>particle.fragの円の半径・色を編集し、物理速度とGPU画素の差を切り分ける。</li>'+
    '<li>shader構文エラーと非対応GPU時の独立CPU診断を確認する。</li>';
  byId('preset').options[0].textContent='PIC群・FLIP群・格子速度の3表示';
  byId('preset').options[1].textContent='fragment構文エラー';
  const controls=document.createElement('div');controls.className='controls';
  const step=document.createElement('button'),play=document.createElement('button'),
    pause=document.createElement('button'),back=document.createElement('button'),
    marker=document.createElement('output');
  for(const [button,label] of [[step,'1ステップ'],[play,'再生'],[pause,'一時停止'],[back,'step 0へ戻す']]){
    button.type='button';button.className='action';button.textContent=label;controls.append(button);
  }
  controls.append(marker);byId('run').parentElement.before(controls);
  const preview=document.createElement('p');preview.id='fcg7-cpu-prediction';
  preview.setAttribute('aria-live','polite');
  preview.textContent='WebGL2非対応の場合も独立CPUの粒子エネルギーと境界折返しを表示します。';
  byId('panel-result').append(preview);
  function mark(){
    marker.textContent='物理step '+fcg7Steps+'/24、時刻 '+(fcg7Steps*0.08).toFixed(2)+'s（描画fpsとは独立）';
    pause.disabled=fcg7Timer===null;play.disabled=fcg7Timer!==null;
  }
  function pausePlay(){if(fcg7Timer!==null){clearInterval(fcg7Timer);fcg7Timer=null;}mark();}
  step.addEventListener('click',()=>{
    pausePlay();if(fcg7Steps>=24){setStatus('24 stepで上限。step0へ戻してください');return;}
    fcg7Steps++;mark();run();
  });
  play.addEventListener('click',()=>{
    if(fcg7Timer!==null)return;
    fcg7Timer=setInterval(()=>{
      if(fcg7Steps>=24){pausePlay();return;}
      fcg7Steps++;mark();run();if(fcg7Steps>=24)pausePlay();
    },1000);mark();
  });
  pause.addEventListener('click',pausePlay);
  back.addEventListener('click',()=>{pausePlay();fcg7Steps=0;mark();run();});
  byId('reset').addEventListener('click',mark);
  byId('stop').addEventListener('click',mark);
  mark();
}
if (isFCG6) {
  document.title='FCG6 固体マスク付き流体：編集・検算ラボ';
  document.querySelector('h1').textContent='FCG6 動く固体と離散流体境界';
  document.querySelector('#panel-conditions > p').textContent=
    '48×48実計算MAC格子。円・矩形の移動固体を毎step再標本化し、壁面速度を課したmasked Poisson射影と染料輸送を計算します。左=染料、中央=絶対発散、右=速さ＋黄色の境界法線。灰色は固体セル。表示バッファとは別の計算解像度です。';
  document.querySelector('#panel-conditions ol').innerHTML=
    '<li>初期のstep0/1/8/24で固体セル遷移・壁面速度差・Poisson残差・補正された発散を区別する。</li>'+
    '<li>1step、再生、停止、step0復帰を試し、t=step×0.05秒と描画時計を区別する。</li>'+
    '<li>形状をrectangleに切り替え、同じ実格子のマスク・圧力反力を比較する。</li>'+
    '<li>壁の移動振幅・角周波数と高さをGUIで変更し、実ソルバーの染料と壁法線条件を比較する。</li>'+
    '<li>solid.frag の矢印色を改めるかshaderを壊し、物理値とGPU画素の独立性を確認する。</li>';
  byId('preset').options[0].textContent='流体・移動固体・境界法線の3表示';
  byId('preset').options[1].textContent='fragment構文エラー';
  const controls=document.createElement('div');controls.className='controls';
  const step=document.createElement('button'),play=document.createElement('button'),
    pause=document.createElement('button'),back=document.createElement('button'),
    marker=document.createElement('output');
  for(const [button,label] of [[step,'1ステップ'],[play,'再生'],[pause,'一時停止'],[back,'step 0へ戻す']]){
    button.type='button';button.className='action';button.textContent=label;controls.append(button);
  }
  controls.append(marker);byId('run').parentElement.before(controls);
  const preview=document.createElement('p');preview.id='fcg6-cpu-prediction';
  preview.setAttribute('aria-live','polite');
  preview.textContent='GPUが使えない場合も独立CPUの診断値を表示します。';
  byId('panel-result').append(preview);
  function mark(){
    marker.textContent='物理step '+fcg6Steps+'/24、時刻 '+(fcg6Steps*0.05).toFixed(2)+'s（描画fpsとは別）';
    pause.disabled=fcg6Timer===null;play.disabled=fcg6Timer!==null;
  }
  function pausePlay(){if(fcg6Timer!==null){clearInterval(fcg6Timer);fcg6Timer=null;}mark();}
  step.addEventListener('click',()=>{
    pausePlay();if(fcg6Steps>=24){setStatus('24 stepで上限。step0へ戻してください');return;}
    fcg6Steps++;mark();run();
  });
  play.addEventListener('click',()=>{
    if(fcg6Timer!==null)return;
    fcg6Timer=setInterval(()=>{
      if(fcg6Steps>=24){pausePlay();return;}
      fcg6Steps++;mark();run();if(fcg6Steps>=24)pausePlay();
    },1000);mark();
  });
  pause.addEventListener('click',pausePlay);
  back.addEventListener('click',()=>{pausePlay();fcg6Steps=0;mark();run();});
  byId('reset').addEventListener('click',mark);
  byId('stop').addEventListener('click',mark);
  mark();
}
if (isFCG5) {
  document.title='FCG5 流体・染料更新：編集・検算ラボ';
  document.querySelector('h1').textContent='FCG5 2D染料流体の時間分割ソルバー';
  document.querySelector('#panel-conditions > p').textContent=
    '48×48（12/24/36/48へ変更可）のMAC格子で半Lagrange速度移流、陽的粘性、外力、残差収束付きPoisson射影、染料移流を実行。左=染料、中央=絶対発散、右=速度。';
  document.querySelector('#panel-conditions ol').innerHTML=
    '<li>静止初期場の性質、step0/1/8/24の染料積分・最大発散・Poisson残差を比較する。</li>'+
    '<li>結果画面で実GPUソルバーを停止・1物理step・時刻0へ戻し、物理時刻と再生間隔を比べる。</li>'+
    '<li>染料ブラシの半径・強さを実fluid.jsで調整し、Shift+ドラッグで染料を追加する。Spaceで再生／停止する。</li>'+
    '<li>結果canvasで画素をクリック、または矢印キーとEnterで物理格子値を検査する。</li>'+
    '<li>fluid.jsのdt・nuまたはforceAmplitudeを変更し、物理時刻と初期CPU予測・ライブ画面の差を観察する。</li>'+
    '<li>fluid.fragの中央色の倍率・構文エラーを試してCPU残差とGPU表示を区別する。</li>';
  byId('preset').options[0].textContent='2D流体・染料／発散／速度の3表示';
  byId('preset').options[1].textContent='fragment構文エラー';
  const controls=document.createElement('div');controls.className='controls';
  const step=document.createElement('button'),play=document.createElement('button'),
    pause=document.createElement('button'),back=document.createElement('button'),
    marker=document.createElement('output');
  for(const [button,label] of [[step,'1ステップ'],[play,'再生'],[pause,'一時停止'],[back,'step 0へ戻す']]){
    button.type='button';button.className='action';button.textContent=label;controls.append(button);
  }
  controls.append(marker);byId('run').parentElement.before(controls);
  const preview=document.createElement('p');preview.id='fcg5-cpu-prediction';
  preview.setAttribute('aria-live','polite');
  preview.textContent='WebGL2非対応でも独立CPUによる物理診断を利用できます。';
  byId('panel-result').append(preview);
  const live=document.createElement('output');
  live.id='fcg5-live-state';
  live.setAttribute('aria-live','off');
  live.textContent='ライブ物理step：未実行';
  byId('canvas-slot').after(live);
  const liveControls=document.createElement('div');
  liveControls.className='controls';
  liveControls.setAttribute('role','group');
  liveControls.setAttribute('aria-label','FCG5 実GPUソルバーのライブ操作');
  live.after(liveControls);
  const liveToggle=document.createElement('button');
  liveToggle.id='fcg5-live-toggle';liveToggle.type='button';liveToggle.className='action';
  liveToggle.textContent='GPU再生';liveToggle.disabled=true;
  liveToggle.setAttribute('aria-label','FCG5 実GPUソルバーの再生・停止を切り替える');
  liveToggle.setAttribute('aria-pressed','false');
  const liveStep=document.createElement('button');
  liveStep.id='fcg5-live-step';liveStep.type='button';liveStep.className='action';
  liveStep.textContent='GPUを1物理step';liveStep.disabled=true;
  const liveReset=document.createElement('button');
  liveReset.id='fcg5-live-reset';liveReset.type='button';liveReset.className='action';
  liveReset.textContent='GPUの時刻0へ戻す';liveReset.disabled=true;
  liveControls.append(liveToggle,liveStep,liveReset);
  function sendFcg5Live(action){
    if(!active?.started||active.contextLost)return;
    active.frame.contentWindow.postMessage({
      type:'fcg5-physics-control',action,
      requestId:active.id,generation:active.generation,session:active.session
    },'*');
  }
  liveToggle.addEventListener('click',()=>sendFcg5Live('toggle'));
  liveStep.addEventListener('click',()=>sendFcg5Live('step'));
  liveReset.addEventListener('click',()=>sendFcg5Live('reset'));
  const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
  forwardFcg5MotionPreference=()=>{
    if(active?.started&&!active.contextLost)
      active.frame.contentWindow.postMessage({
        type:'fcg5-motion-policy',reduced:motionPreference.matches
      },'*');
  };
  motionPreference.addEventListener('change',forwardFcg5MotionPreference);
  function mark(){
    const timestep=readLabParameter(inputs.js.value,parametersFor('FCG5')[3]);
    marker.textContent='物理step '+fcg5Steps+'/32、時刻 '+
      (timestep.ok ? (fcg5Steps*timestep.value).toFixed(3)+'s' : '編集JSを確認')+
      '（描画fpsとは独立）';
    pause.disabled=fcg5Timer===null;play.disabled=fcg5Timer!==null;
  }
  function pausePlay(){if(fcg5Timer!==null){clearInterval(fcg5Timer);fcg5Timer=null;}mark();}
  step.addEventListener('click',()=>{
    pausePlay();if(fcg5Steps>=32){setStatus('32 stepで上限。step0へ戻してください');return;}
    fcg5Steps++;mark();run();
  });
  play.addEventListener('click',()=>{
    if(fcg5Timer!==null)return;
    fcg5Timer=setInterval(()=>{
      if(fcg5Steps>=32){pausePlay();return;}
      fcg5Steps++;mark();run();if(fcg5Steps>=32)pausePlay();
    },1000);mark();
  });
  pause.addEventListener('click',pausePlay);
  back.addEventListener('click',()=>{pausePlay();fcg5Steps=0;mark();run();});
  byId('reset').addEventListener('click',mark);
  byId('stop').addEventListener('click',mark);
  refreshFcg5StepMarker=mark;
  mark();
}
if (isFCG4) {
  document.title='FCG4 MAC圧力射影：編集・検算ラボ';
  document.querySelector('h1').textContent='FCG4 Poisson反復と射影後の発散';
  document.querySelector('#panel-conditions > p').textContent=
    '8×8 MAC格子で製造した予測速度から圧力Poisson問題を緩和Jacobi反復で解き、左=圧力、中央=絶対発散、右=速度の大きさをR8/WebGL2で描画。圧力・発散・壁流束・残差を独立CPUと比較します。';
  document.querySelector('#panel-conditions ol').innerHTML=
    '<li>反復0・128・160でPoisson残差と射影後発散の関係を検算する。</li>'+
    '<li>1反復・再生・停止・反復0への復帰を行う。</li>'+
    '<li>canvasの画素をクリックまたは矢印キー＋Enterで検査する。</li>'+
    '<li>projection.jsの緩和係数2/3、projection.fragの中央パネルの描画倍率を編集する。</li>'+
    '<li>構文エラーとGPU非対応時の独立CPU値を確認する。</li>';
  byId('preset').options[0].textContent='MAC圧力・発散・速度';
  byId('preset').options[1].textContent='fragment構文エラー';
  const controls=document.createElement('div');controls.className='controls';
  const step=document.createElement('button'),play=document.createElement('button'),
    pause=document.createElement('button'),back=document.createElement('button'),
    marker=document.createElement('output');
  for(const [button,label] of [[step,'1反復'],[play,'再生'],[pause,'一時停止'],[back,'反復0へ戻す']]){
    button.type='button';button.className='action';button.textContent=label;controls.append(button);
  }
  controls.append(marker);byId('run').parentElement.before(controls);
  const preview=document.createElement('p');preview.id='fcg4-cpu-prediction';
  preview.setAttribute('aria-live','polite');
  preview.textContent='WebGL2非対応でも独立CPU残差を利用できます。';
  byId('panel-result').append(preview);
  function mark(){
    marker.textContent='Poisson反復 '+fcg4Steps+'/160（物理時刻は固定、描画fpsとは独立）';
    pause.disabled=fcg4Timer===null;play.disabled=fcg4Timer!==null;
  }
  function pausePlay(){if(fcg4Timer!==null){clearInterval(fcg4Timer);fcg4Timer=null;}mark();}
  step.addEventListener('click',()=>{
    pausePlay();if(fcg4Steps>=160){setStatus('反復160で上限。反復0へ戻してください');return;}
    fcg4Steps++;mark();run();
  });
  play.addEventListener('click',()=>{
    if(fcg4Timer!==null)return;
    fcg4Timer=setInterval(()=>{
      if(fcg4Steps>=160){pausePlay();return;}
      fcg4Steps++;mark();run();if(fcg4Steps>=160)pausePlay();
    },900);mark();
  });
  pause.addEventListener('click',pausePlay);
  back.addEventListener('click',()=>{pausePlay();fcg4Steps=0;mark();run();});
  byId('reset').addEventListener('click',mark);
  byId('stop').addEventListener('click',mark);
  mark();
}
if (isFCG3) {
  document.title='FCG3 染料移流：編集・検算ラボ';
  document.querySelector('h1').textContent='FCG3 回転染料の移流と数値拡散';
  document.querySelector('#panel-conditions > p').textContent=
    '実編集JSの32・64・96格子で回転染料を移流します。左=数値染料、右=5倍R8誤差map。格子を変えても物理時刻を揃え、濃度・誤差・GPU画素を比較します。';
  document.querySelector('#panel-conditions ol').innerHTML=
    '<li>step1で6画素の独立CPU予測とGPUを比較する。</li>'+
    '<li>1step・再生・一時停止・時刻0へ復帰、step32で一回転を確認する。</li>'+
    '<li>canvasをクリックか矢印キー＋Enterでセル・誤差を検査する。</li>'+
    '<li>advection.jsの足点をEulerに、advection.fragの倍率5を10に改造する。</li>'+
    '<li>GLSL構文エラーとGPU非対応時の診断を確認する。</li>';
  byId('preset').options[0].textContent='回転染料と誤差map';
  byId('preset').options[1].textContent='fragment構文エラー';
  const controls=document.createElement('div');controls.className='controls';
  const step=document.createElement('button'),play=document.createElement('button'),
    pause=document.createElement('button'),back=document.createElement('button'),
    marker=document.createElement('output');
  for(const [button,label] of [[step,'1step'],[play,'再生'],[pause,'一時停止'],[back,'時刻0へ戻す']]){
    button.type='button';button.className='action';button.textContent=label;controls.append(button);
  }
  controls.append(marker);byId('run').parentElement.before(controls);
  const preview=document.createElement('p');preview.id='fcg3-cpu-prediction';
  preview.setAttribute('aria-live','polite');
  preview.textContent='GPU非対応でも独立CPU予測を表示します。';
  byId('panel-result').append(preview);
  function mark(){
    marker.textContent='物理step '+fcg3Steps+'/32, t='+(fcg3Steps/32).toFixed(5)+
      ' s（描画フレームとは独立）';
    pause.disabled=fcg3Timer===null;play.disabled=fcg3Timer!==null;
  }
  function pausePlay(){if(fcg3Timer!==null){clearInterval(fcg3Timer);fcg3Timer=null;}mark();}
  step.addEventListener('click',()=>{
    pausePlay();if(fcg3Steps>=32){setStatus('step32で終了。時刻0へ戻してください');return;}
    fcg3Steps++;mark();run();
  });
  play.addEventListener('click',()=>{
    if(fcg3Timer!==null)return;
    fcg3Timer=setInterval(()=>{
      if(fcg3Steps>=32){pausePlay();return;}
      fcg3Steps++;mark();run();
      if(fcg3Steps>=32)pausePlay();
    },900);mark();
  });
  pause.addEventListener('click',pausePlay);
  back.addEventListener('click',()=>{pausePlay();fcg3Steps=0;mark();run();});
  byId('reset').addEventListener('click',mark);
  byId('stop').addEventListener('click',mark);
  mark();
}
if (isFCG2) {
  document.title='FCG2 水中の染料が渦に巻き込まれる：WebGL2';
  document.querySelector('h1').textContent='FCG2 渦で染料はどう変形する？';
  document.querySelector('#panel-conditions > p').textContent=
    '水中の黄色い染料の帯が、反時計回りの流れに運ばれます。外側ほど速く回るので帯が伸び、渦巻きになります。'+
    '流れは解析式で与え、128×128の実データをWebGL2に送って描きます。';
  document.querySelector('#panel-conditions ol').innerHTML=
    '<li>「描画して観察」または「実行」で開始。再生を押して染料の帯が巻かれる様子を見る。</li>'+
    '<li>「外側ほど速く回る割合 shear」を0にして再実行し、帯が伸びずに一体回転することを見る。</li>'+
    '<li>omegaを0にすると動きが止まり、amplitudeを下げると染料の色だけ薄くなる。</li>'+
    '<li>セルをクリックして濃度・R8整数・GPU色を確認。density.jsとdensity.fragも編集できる。</li>';
  byId('preset').options[0].textContent='差動回転に運ばれる受動染料（128×128）';
  byId('preset').options[1].textContent='fragment構文エラー';
  const controls=document.createElement('div');controls.className='controls fcg2-time-controls';
  const step=document.createElement('button'),play=document.createElement('button'),
    pause=document.createElement('button'),back=document.createElement('button'),
    marker=document.createElement('output');
  for(const [button,label] of [[step,'次の節目へ'],[play,'再生'],[pause,'一時停止'],[back,'時刻0へ戻す']]){
    button.type='button';button.className='action';button.textContent=label;controls.append(button);
  }
  const seekLabel=document.createElement('label');seekLabel.textContent='観察時刻';
  const seek=document.createElement('input');seek.type='range';seek.id='fcg2-time-slider';
  seek.min='0';seek.max=String(FCG2_PERIOD);seek.step='0.01';
  seek.setAttribute('aria-label','染料を観察する物理時刻 0～2π秒');
  seekLabel.append(seek);controls.append(seekLabel);
  marker.id='fcg2-time-display';controls.append(marker);
  byId('run').parentElement.before(controls);
  const panel=byId('panel-result'),canvasSlot=byId('canvas-slot');
  panel.classList.add('fcg2-result');
  const stage=document.createElement('div');stage.className='fcg2-stage';
  const inspector=document.createElement('aside');inspector.id='fcg2-inspector';
  inspector.setAttribute('aria-label','染料濃度と画素の凡例');
  inspector.innerHTML=
    '<h2>染料が渦巻きになる</h2>'+
    '<p class="fcg2-explain">反時計回り。外側の水ほど角速度が大きい。紺＝水（染料0）、琥珀＝染料（濃度1）。領域は1×1 m。</p>'+
    '<div class="fcg2-legend-label"><span>0：染料なし</span><span>0.5</span><span>1：高濃度</span></div>'+
    '<div class="fcg2-gradient" role="img" aria-label="紺色は濃度0、琥珀色は濃度1"></div>'+
    '<p class="fcg2-selected" id="fcg2-selected">画面をクリックして濃度を調べる</p>'+
    '<details class="fcg2-microscope"><summary>選択セルの値・GPU画素</summary>'+
    '<div class="fcg2-metrics">'+
    '<div><small>独立CPU濃度 q</small><strong id="fcg2-q">—</strong></div>'+
    '<div><small>R8整数 → 復元濃度</small><strong id="fcg2-byte">—</strong></div>'+
    '<div><small>GPU実測RGBA</small><strong id="fcg2-gpu">—</strong></div>'+
    '<div><small>予測色との差（階調）</small><strong id="fcg2-difference">—</strong></div>'+
    '</div>'+
    '<p id="fcg2-inspection-note" class="fcg2-explain">初期コードの画素を照合します。</p></details>'+
    '<p class="fcg2-explain">濃度の計算格子：128×128セル。表示画素数とは別。'+
    'shear=0で帯は伸びず、omega=0で静止。</p>';
  canvasSlot.before(stage);stage.append(canvasSlot,inspector);
  const cpuPreview=document.createElement('p');cpuPreview.id='fcg2-cpu-prediction';
  cpuPreview.setAttribute('aria-live','polite');panel.append(cpuPreview);
  fcg2Inspector=(time,x,y,actual)=>{
    const [i,j]=fcg2PixelCell(x,y,active?.payload.width||512,active?.payload.height||512);
    const options=active?.payload ? verifiedFCG2Physics(
      active.payload.js,active.payload.vertex,active.payload.fragment,defaults) : null;
    const q=fcg2FieldAtTime(i,j,time,options||{}),byte=fcg2Encode(q);
    const expected=fcg2Color(byte);
    const valid=Array.isArray(actual)&&actual.length===4&&
      actual.every(v=>Number.isInteger(v)&&v>=0&&v<=255);
    const difference=valid?Math.max(...expected.map((v,k)=>Math.abs(v-actual[k]))):null;
    byId('fcg2-selected').textContent='セル('+i+','+j+')／時刻 '+time.toFixed(2)+' s';
    byId('fcg2-q').textContent=q.toFixed(6);
    byId('fcg2-byte').textContent=byte+' → '+(byte/255).toFixed(6);
    byId('fcg2-gpu').textContent=valid?actual.join(', '):'未取得';
    byId('fcg2-difference').textContent=difference===null?'—':difference+' / 255';
    byId('fcg2-inspection-note').textContent=!valid?'GPU未取得。CPU予測を表示。':
      options?(difference<=2?'変更済みパラメータを含めCPU/GPUは一致。':
      'CPU/GPUが異なります。座標・shader・GPU転送を確認。'):
      '自由編集コードです。基準濃度の比較は参考値です。';
  };
  fcg2Mark=()=>{
    marker.textContent='t='+fcg2Time.toFixed(2)+' / 6.28 s　'+
      (fcg2Playing?'再生中':'静止中')+'　計算格子128×128';
    seek.value=String(Math.max(0,Math.min(FCG2_PERIOD,fcg2Time)));
    seek.disabled=!active?.completed;
    play.disabled=fcg2Playing;pause.disabled=!fcg2Playing;
  };
  step.addEventListener('click',()=>{
    fcg2Control('pause');fcg2Playing=false;fcg2Pending=null;
    const n=Math.floor((fcg2Time+1e-8)/(Math.PI/2))+1;
    fcg2Steps=n>4?0:n;fcg2Time=fcg2Steps*Math.PI/2;
    if(active?.completed)fcg2Control('seek',fcg2Time);else run();
    fcg2Mark();
  });
  play.addEventListener('click',()=>{
    if(fcg2Playing)return;
    if(!fcg2Control('play')){
      fcg2Pending='play';if(!active?.started)run();
    }
  });
  pause.addEventListener('click',()=>{
    fcg2Pending=null;fcg2Control('pause');fcg2Playing=false;fcg2Mark();
  });
  back.addEventListener('click',()=>{
    fcg2Pending=null;fcg2Playing=false;fcg2Steps=0;fcg2Time=0;
    if(active?.completed)fcg2Control('reset');else run();
    fcg2Mark();
  });
  seek.addEventListener('input',()=>{
    if(!active?.completed)return;
    fcg2Playing=false;fcg2Time=Number(seek.value);
    fcg2Control('pause');fcg2Control('seek',fcg2Time);fcg2Mark();
  });
  byId('stop').addEventListener('click',()=>{
    fcg2Playing=false;fcg2Pending=null;fcg2Mark();
  });
  byId('reset').addEventListener('click',fcg2Mark);
  fcg2Mark();
}

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
if (isWGL20) {
  document.title='WGL20 GIS 地形・格子・PLATEAU ラボ';
  document.querySelector('h1').textContent='WGL20 合成DEMと実在PLATEAU建物を同じ局所座標で表示';
  document.querySelector('#panel-conditions > p').textContent=
    '公式サンプルCityGML(EPSG:6697)を固定スナップショットとして読み込み、独立した合成地盤高・仮想水位を重ねます。建物座標・高さ基準・CPU数値・RGBA8凡例画素を別々に検証します。';
  document.querySelector('#panel-conditions ol').innerHTML=
    '<li>初期実行で建物138頂点・88三角形、基準点、仮想水深2.29497413mを確認する。</li>'+
    '<li>terrain.js の usePlateau=false で合成地形だけの実験が成立することを試す。</li>'+
    '<li>waterLevelM と zExaggeration を変更し、描画のZ誇張が水深値を変えないことを確かめる。</li>'+
    '<li>scenarioをCS1/CS2/CS3に変更して、投影と描画負荷・重ね合わせ診断を比較する。</li>'+
    '<li>terrain.vert/terrain.fragを編集し、GPUの見た目と独立CPU高さ検算を分ける。</li>';
  byId('preset').options[0].textContent='合成地形＋公式PLATEAU LOD1建物・水位とZ誇張'+(labCase==='BASE'?'':' / '+labCase);
  byId('preset').options[1].textContent='fragmentの構文エラー';
  if (labCase==='CS1') {
    document.querySelector('#panel-conditions > p').textContent=
      'CS1: 実在PLATEAU LOD1建物をクリック/矢印+Enterで選択。GPU ID FBOとCPU射影三角形の最前面判定を比較します。地面と背景はID0、建物はID1です。';
  } else if (labCase==='CS2') {
    document.querySelector('#panel-conditions > p').textContent=
      'CS2: 実在の建物高さ属性14.5mと欠測を区別。単一batchと8分割描画でdraw callを比較します。速度向上は保証されません。';
  } else if (labCase==='CS3') {
    document.querySelector('#panel-conditions > p').textContent=
      'CS3: 実在PLATEAU建物の周囲に教材生成のDEMと仮想水面を重ねます。高さ基準・水深・透明合成・Z誇張を分けて検算してください。';
  }
}
if (isWGL19) {
  document.title='WGL19 固定時間刻み・GPU診断・context lossラボ';
  document.querySelector('h1').textContent='WGL19 描画FPSとGPU拡散の計算時計を分けて監査する';
  document.querySelector('#panel-conditions > p').textContent=
    '初期値は(1,1)だけ1の4×4拡散。16/16/72/16msの合成遅延を4描画・6段へ変換し、FLOAT16値とGPU画素を別々のCPU基準で比較します。';
  document.querySelector('#panel-conditions ol').innerHTML=
    '<li>初期値で4描画・6段・破棄0msとFLOAT16値を確かめる。</li>'+
    '<li>audit.jsのframeDeltasMsを[20,20]へ変え、計算段数2を確認する。</li>'+
    '<li>[200]と上限4へ変え、120msの破棄を確認する。</li>'+
    '<li>simulateLoss=trueにしてcontext lossと全資源の再構築を試す。非対応・未復旧を合格としない。</li>'+
    '<li>fragment GLSLの更新項や構文エラーを編集し、CPU差とstageログを調べる。</li>';
  byId('preset').options[0].textContent='4描画・6段拡散、GPU floatと時計の独立検算';
  byId('preset').options[1].textContent='fragmentの構文エラー';
}
if (isWGL18) {
  document.title='WGL18 GPU拡散とping-pongテクスチャ更新';
  document.querySelector('h1').textContent='WGL18 4×4拡散をfragment shaderで時間発展させる';
  document.querySelector('#panel-conditions > p').textContent=
    '初期値は(1,1)の1点のみ1。零流束境界でr=0.2の2段をGPU更新し、16画素とRGBA32Fの16値を独立CPU基準と照合します。';
  document.querySelector('#panel-conditions ol').innerHTML=
    '<li>初期値で実行し、2段後の16値と総量1をCPU/GPUで検算する。</li>'+
    '<li>diffusion.jsのstepsを1と0へ変更して状態を比較する。</li>'+
    '<li>rateを0.1へ変更し、非負性のための上限0.25を確認する。</li>'+
    '<li>fragment GLSLの境界のclampや隣セル参照を編集し、誤差を調べる。</li>'+
    '<li>構文エラープリセットでコンパイラ診断し、修正して再実行する。</li>';
  byId('preset').options[0].textContent='4×4零流束拡散・r=0.2・2段更新';
  byId('preset').options[1].textContent='fragmentの構文エラー';
}
if (isWGL17) {
  document.title = 'WGL17 GPUデータテクスチャ・保存精度の比較';
  document.querySelector('h1').textContent = 'WGL17 同じ数値をR8・R8UI・R32Fに保存する';
  document.querySelector('#panel-conditions > p').textContent =
    '水位の例（−2〜2）を4×2格子へ格納します。形式と下段2列目の入力値を変えると、同じ編集JSからGPU画像・格納値・復元誤差を再計算します。結果の8セルをクリックして比較できます。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>「実行」でGPU画像を表示。下段(1,0)を選ぶと元値−1.3と復元値の差が見える。</li>'+
    '<li>保存形式をR8UIに変更して再実行。R8と誤差は同じでもsampler型は異なる。</li>'+
    '<li>R32Fへ変更し、同じセルの誤差バーが小さくなるのを確認する。</li>'+
    '<li>入力値を0に変え、R8ではゼロを正確に表せないことを確かめる。</li>'+
    '<li>コード編集タブで復元式や色変換を変更しGPU画像・検算結果を比較する。</li>';
  // Put the actual controls immediately after the experiment objective.
  document.querySelector('#panel-conditions ol').before(byId('lab-parameters'));
  byId('preset').options[0].textContent = '8セルの数値・色・保存誤差を比較';
  byId('preset').options[1].textContent = 'fragmentの構文エラー';
}
if (isWGL16) {
  document.title = 'WGL16 インスタンス描画・draw call比較ラボ';
  document.querySelector('h1').textContent = 'WGL16 64個の四角形を1回のdraw callで描く';
  document.querySelector('#panel-conditions > p').textContent =
    '同じ四角形メッシュを64回の通常描画と1回のインスタンス描画で比較。全画素の差、6点の独立CPU基準、呼び出し回数と同期込み時間を表示します。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>初期状態を実行し64対1の呼び出し回数、384頂点、全画素差0とCPU/GPUの6点を確認する。</li>' +
    '<li>instancing.jsのdrawModeをloopへ変更し、同一画像になるか比較する。</li>' +
    '<li>gridSizeを4または16へ変更し、描画呼び出し数と転送データ量を予測する。</li>' +
    '<li>頂点シェーダのa_colorを改変して表示とCPU期待値の差を確認する。</li>' +
    '<li>構文エラープリセットでコンパイル診断し、修正して再実行する。</li>';
  byId('preset').options[0].textContent = '8×8正方形・描画回数/全画素差/同期時間の比較';
  byId('preset').options[1].textContent = 'fragmentの構文エラー';
}
if (isWGL15) {
  document.title = 'WGL15 3Dピッキング・CPU射線とGPU ID選択ラボ';
  document.querySelector('h1').textContent = 'WGL15 画素から射線を出して3Dの面を選ぶ';
  document.querySelector('#panel-conditions > p').textContent =
    '3D空間に深度2の橙面と深度3の青面。RGBA8 IDバッファと深度を使って選択し、CPU射線とGPU readPixelsを別々に検算します。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>初期実行で4つの表示画素についてCPUとGPUを照合する。</li>' +
    '<li>結果canvasをクリックし、ID0/1/2とCPU射線・GPU IDの一致を検証する。</li>' +
    '<li>canvasへフォーカスして矢印キーで8画素ずつ移動、Enter/Spaceで選択する。</li>' +
    '<li>幅/高さを変えて再実行しCSS座標と描画バッファの違いを確認する。</li>' +
    '<li>picking.jsのenableDepthTestとreverseDrawOrder、GLSLのID符号化を編集して不一致を作る。</li>' +
    '<li>構文エラープリセットのコンパイル診断を見て、ソースを戻して再実行する。</li>';
  byId('preset').options[0].textContent = '2平面のクリック・キーボード選択と独立CPU/GPU検算';
  byId('preset').options[1].textContent = 'fragmentの構文エラー';
}
if (isWGL14) {
  document.title = 'WGL14 画像のぼかし・輪郭・露出を比較するWebGL2ラボ';
  document.querySelector('h1').textContent = 'WGL14 画像のどこが変わる？ ぼかし・輪郭・露出を比較';
  document.querySelector('#panel-conditions > p').textContent =
    '家・太陽・木を描いた128×128の原画像をFBO Aに描き、別のFBO Bでぼかし・輪郭抽出します。' +
    '同じ画像座標を、境界線の左は原画、右は加工済みで表示します。最初に「実行（結果へ）」を押してください。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>初期実行：家の屋根・窓・木の輪郭が境界の前後でどう変わるか観察する。</li>' +
    '<li>フィルタをedgeへ切り替え、家の輪郭が残ることを確かめる。blurへ戻して半径を1→4にする。</li>' +
    '<li>「原画を表示する割合」を0→0.5→1へ動かし、同じ画像位置を比較する。</li>' +
    '<li>露出0→1→2、処理順filter-first→tone-firstを比較し、Bの計算と表示の役割を考える。</li>' +
    '<li>8×8 impulseへ切り替え、灰点の境界条件と3×3の計算を確かめる。JS/GLSLを編集して再実行する。</li>';
  byId('preset').options[0].textContent = '風景画像の前後比較（8×8手計算モードも切替可）';
  byId('preset').options[1].textContent = 'fragmentの構文エラー';
}

if (isWGL13) {
  document.title = 'WGL13 環境マッピング：反射球と6面展開図';
  document.querySelector('h1').textContent = 'WGL13 反射球から6面の風景を読み取る';
  document.querySelector('#panel-conditions > p').textContent =
    '左の球をクリックすると反射方向と面内UVが分かり、右の6面展開図で参照先が強調されます。' +
    '同じGLSLで風景128×128と2×2の診断色を切り替え、境界と環境回転を観察します。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>実行を押して球と6面展開図を表示し、球面上の3箇所をクリックして参照面を調べる。</li>' +
    '<li>環境回転（−180°〜180°）を動かし、球の反射と右の強調面が連動するか確かめる。</li>' +
    '<li>「境界線」を表示してキューブマップの主軸が切り替わる場所を見る。</li>' +
    '<li>「表示」を2×2面診断へ変更し、12方向の生画素照合を詳細欄で確認する。</li>' +
    '<li>environment.jsのsceneColor / yawDegrees / faceColorsやenvironment.fragの反射式を編集し再実行する。</li>';
  byId('preset').options[0].textContent = '反射球＋6面の風景・2×2診断と12方向GPU検算';
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
  document.title = 'WGL10 FBOを経由する描画パイプライン';
  document.querySelector('h1').textContent = 'WGL10 シーン → FBOテクスチャ → 後処理';
  document.querySelector('#panel-conditions > p').textContent =
    '1枚のGPUシーンをRGBA8テクスチャへ保存して次の描画へ渡します。左=直接描画、中=保存画像、右=後処理。同じGLSLで違いを比較します。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>「実行」で3列を見て、中央と右が保存したFBO画像を読んでいることを確かめる。</li>' +
    '<li>解像度倍率を1→0.5にし、中央と右の細格子が画素化する部分を探す。</li>' +
    '<li>後処理をinvert→grayscale→copyに切替え、右列だけの違いを見る。</li>' +
    '<li>表示段階をscene / texture / processedにし、同じGPU画像を拡大して観察する。</li>' +
    '<li>コード編集でframebuffer.fragのdrawSceneやu_passを変えて再実行する。</li>';
  byId('preset').options[0].textContent = 'シーン→FBO RGBA8→フィルタ（3列比較）';
  byId('preset').options[1].textContent = 'fragmentの構文エラー';
  const stageGuide = document.createElement('div');
  stageGuide.id = 'wgl10-stage-guide';
  stageGuide.className = 'wgl10-stage-guide';
  stageGuide.setAttribute('role', 'note');
  stageGuide.classList.add('wgl10-three-columns');
  for (const label of ['① 直接描画（比較用）','② FBO保存画像','③ 後処理：invert']) {
    const span=document.createElement('span');
    span.textContent=label;
    stageGuide.append(span);
  }
  byId('canvas-slot').before(stageGuide);
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
  document.querySelector('h1').textContent = 'WGL3 共有点を動かし、複製点を切り離す';
  document.querySelector('#panel-conditions > p').textContent =
    '初期のCPU/GPU画素検算後、左の共有メッシュと右の展開メッシュを同じWebGL2コードで比較します。中央の頂点を動かし、右の1頂点だけ切り離してみましょう。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>初期ソースを実行し、左右の実GPUメッシュで頂点番号を確認する。</li>' +
    '<li>共有点のΔx/h・Δy/hを動かし、両方の全隣接三角形が変形することを確かめる。</li>' +
    '<li>「右の1参照だけ切り離す」をオンにし、複製配列だけに継ぎ目ができる理由を説明する。</li>' +
    '<li>位置を戻し、三角形の前/次で参照番号と120/192 byteを確認する。</li>' +
    '<li>mesh.js の gridSteps・drawMode とGLSLを編集し、再実行して反映を確かめる。</li>';
  byId('preset').options[0].textContent = '頂点共有 vs 複製の左右GPU比較';
  byId('preset').options[1].textContent = 'fragment の構文エラー';
}
// FCG5 observes only its editable sandboxed N×N MAC solver; do not mount
// a second independent fluid simulation in the conditions tab.
// FCG8/WGL4 retain their separate reference observations.
if (isFCG8 || isWGL4) mountReferenceObservation({lesson,parent:byId('panel-conditions')});
// Three physical panels must have square pixel footprints: avoid stretching a
// 1x1 metre domain into ~100x240 strips at the original 320x240 default.
const sizeHint=(isFCG4||isFCG5||isFCG6||isFCG7||isFCG8)?[1536,512]:
  isFCG3?[1024,512]:isFCG2?[512,512]:isWGL14?[704,704]:
  (lesson==='WGL1'||isWGL2)?[960,960]:isWGL3?[960,480]:
  isWGL10?[960,480]:legacyViewport?[800,600]:[960,720];
// Make the actual limits legible when a lesson's independent CPU oracle
// intentionally supports fewer pixels than the shared WebGL2 host.
byId('width').max=String(MAX_SIDE);byId('height').max=String(MAX_SIDE);
const limits=byId('height').closest('.controls')?.nextElementSibling?.querySelector('small');
if(limits)limits.textContent='幅・高さはCSSサイズではなく描画バッファ。最大'+
  MAX_PIXELS.toLocaleString('en-US')+'画素、各辺'+MAX_SIDE+
  'pxまで（負荷が重い場合は縮小）。保存したソースは端末に保持します。';
byId('width').value=String(sizeHint[0]);
byId('height').value=String(sizeHint[1]);
// An animated scene is only validated at its first static snapshot.
// Keep that boundary visible next to the real GPU canvas, not just in theory.
if (['FCG3','FCG5','WGL5','WGL9','WGL12'].includes(lesson) || ['FCG4','FCG6','WGL7','WGL11','WGL13'].includes(lesson)) {
  const note=document.createElement('p');
  note.className='visual-snapshot-note';
  note.setAttribute('role','note');
  note.textContent='最初の静止フレームをCPU/GPUで照合した後、同じ編集コードが連続描画します。' +
    '以下の数値表は実行開始時の固定条件（FCG4はPoisson反復数、FCG6は物理step数、WGL7はUV、WGL11は光源方向、WGL13は6面）での基準値です。再生中の全フレームの検算ではありません。' +
    'GPU画面にフォーカスしてSpace/Enterで再生・停止できます。FCG4・FCG6・WGL11・WGL13は矢印とRなどでも操作できます。';
  byId('canvas-slot').before(note);
}
mountVisualGuide(lesson,byId('panel-conditions'),{run,focusResult:selectTab});
load();
// 画素の期待値は、GPUに触れる前に CPU 側で示せる.
byId('numeric-note').textContent = '初期サイズでのCPU予測: ' +
  oracle(sizeHint[0],sizeHint[1])
  .map(item => item.label + '=' + item.rgba.join('/')).join('、');
