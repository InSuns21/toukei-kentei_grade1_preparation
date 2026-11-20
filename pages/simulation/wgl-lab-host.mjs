import { compareReadback, expectedSamples } from './wgl-lab-core.mjs';
import {expectedWGL20Samples,compareWGL20Readback,verifyWGL20Report} from './wgl20-lab-core.mjs';
import {compareWGL19Readback, expectedWGL19Samples, compareWGL19FloatReadback, auditWGL19Clock} from './wgl19-lab-core.mjs';
import { compareFCG2Readback, expectedFCG2Samples, fcg2PixelCell, fcg2Field, fcg2Encode } from './fcg2-lab-core.mjs';
import {compareFCG3Readback,expectedFCG3Samples,fcg3Metrics,fcg3PixelCell,fcg3Grid,fcg3Exact} from './fcg3-lab-core.mjs';
import {expectedFCG4Samples,compareFCG4Readback,fcg4State,fcg4PixelCell} from './fcg4-lab-core.mjs';
import {expectedFCG5Samples,compareFCG5Readback,fcg5State,fcg5PixelCell} from './fcg5-lab-core.mjs';
import {expectedFCG6Samples,compareFCG6Readback,fcg6State,fcg6PixelCell} from './fcg6-lab-core.mjs';
import {expectedFCG7Samples,compareFCG7Readback,fcg7State} from './fcg7-lab-core.mjs';
import {expectedFCG8Samples,compareFCG8Readback,fcg8State} from './fcg8-lab-core.mjs';
import { highlightSource } from './wgl-lab-highlight.mjs';
import {mountSmokeObservation} from './wgl-fcg-fluid-visual.mjs';
import {mountReferenceObservation} from './wgl-fcg-reference-visual.mjs';
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
const STORAGE_KEY = 'toukei-' + VERSION + '-' + lesson + (isWGL20 ? '-' + labCase : '');

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
const MAX_PIXELS = 524288;
const TIMEOUT_MS = 6000;
const byId = id => document.getElementById(id);
const inputs = {
  js: byId('js-source'), vertex: byId('vertex-source'), fragment: byId('fragment-source')
};
const tabs = ['conditions', 'code', 'result'];
const defaults = {};
let plateauSnapshot = null;
let ready = false;
let active = null;
let sequence = 0;
let fcg2Steps = 1;
let fcg2Timer = null;
let fcg3Steps = 1;
let fcg3Timer = null;
let fcg4Steps = 128;
let fcg4Timer = null;
let fcg5Steps = 8;
let fcg5Timer = null;
let fcg6Steps = 8;
let fcg6Timer = null;
let fcg7Steps = 8;
let fcg7Timer = null;
let fcg8Steps = 8;
let fcg8Timer = null;

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
      const positions = (['WGL5', 'WGL6', 'WGL7', 'WGL8', 'WGL9', 'WGL10', 'WGL11', 'WGL12', 'WGL13', 'WGL14', 'WGL15', 'WGL16', 'WGL17', 'WGL18', 'WGL19', 'WGL20', 'FCG2', 'FCG3', 'FCG4', 'FCG5', 'FCG6', 'FCG7', 'FCG8'].includes(request.lesson)) &&
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
          const pixel=new Uint8Array(4);
          gl.readPixels(x,y,1,1,gl.RGBA,gl.UNSIGNED_BYTE,pixel);
          send({...scope,type:request.lesson.toLowerCase()+'-pick',x,y,method,rgba:Array.from(pixel)});
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
        checkpoints: request.lesson === 'WGL20' && hooks ? hooks.checkpoints : null,
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
  if (isWGL20 && data.type === 'wgl20-pick-error') {
    setStatus('CS1ピッキングエラー: '+String(data.message).slice(0,300),true);
    return;
  }
  if (isWGL20 && data.type === 'wgl20-pick') {
    const {x,y,gpuId,cpuId}=data;
    if(![x,y,gpuId,cpuId].every(Number.isInteger)||x<0||y<0||
       x>=active.payload.width||y>=active.payload.height||
       gpuId<0||gpuId>255||cpuId<0||cpuId>1)return;
    const equal=gpuId===cpuId;
    byId('result-note').textContent=
      'CS1 下原点画素('+x+','+y+'): GPU ID='+gpuId+
      ' / CPU三角形投影によるID='+cpuId+' / '+(equal?'一致':'不一致')+
      '。ID0=地盤・背景、ID1=建物。輪郭上はラスタ化規則との差を調べてください。';
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
    const i=Math.max(0,Math.min(47,Math.floor(px*48)));
    const j=Math.max(0,Math.min(47,Math.floor(py*48)));
    const field=fcg8State(steps);
    const phi=panel===0?field.raw[i+48*j]:panel===1?field.reinit[i+48*j]:
      Math.hypot(px-0.5-0.6*field.time*(py-0.5),py-0.5)-0.18;
    byId('result-note').textContent='panel '+panel+', cell('+i+','+j+
      '), CPU phi='+phi.toPrecision(7)+'m / GPU '+rgba.join('/')+
      '（編集コードの場合CPUは初期基準）';
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
      const c=fcg6PixelCell(data.x,data.y,active.payload.width,active.payload.height);
      byId('result-note').textContent='panel '+c.panel+' cell('+c.i+','+c.j+') Enter/Space to inspect';
    }
    return;
  }
  if (isFCG6 && data.type === 'fcg6-pick') {
    const {x,y,rgba}=data,{width,height,steps}=active.payload;
    if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||
       x>=width||y>=height||!Array.isArray(rgba)||rgba.length!==4||
       !rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255))return;
    const c=fcg6PixelCell(x,y,width,height),k=c.i+16*c.j,s=fcg6State(steps);
    const value=s.solid[k]?'solid':c.panel===0?s.q[k]:c.panel===1?
      s.divergence[k]:s.speed[k];
    const edited=Object.keys(defaults).some(key=>active.payload[key]!==defaults[key]);
    byId('result-note').textContent='cell('+c.i+','+c.j+') CPU='+value+
      ' / GPU RGBA='+rgba.join('/')+(edited?' (edited source: baseline for comparison only)':'');
    return;
  }
  if (isFCG5 && data.type === 'fcg5-cursor') {
    if(Number.isInteger(data.x)&&Number.isInteger(data.y)&&data.x>=0&&
       data.y>=0&&data.x<active.payload.width&&data.y<active.payload.height){
      const c=fcg5PixelCell(data.x,data.y,active.payload.width,active.payload.height);
      byId('result-note').textContent=c.panel+' セル('+c.i+','+c.j+') Enter/Spaceで画素検査';
    }
    return;
  }
  if (isFCG5 && data.type === 'fcg5-pick') {
    const {x,y,rgba}=data,{width,height,steps}=active.payload;
    if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||
       x>=width||y>=height||!Array.isArray(rgba)||rgba.length!==4||
       !rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255))return;
    const c=fcg5PixelCell(x,y,width,height),k=c.i+12*c.j,s=fcg5State(steps);
    const val=c.panel==='dye'?s.q[k]:c.panel==='divergence'?s.divergence[k]:s.speed[k];
    const edited=Object.keys(defaults).some(key=>active.payload[key]!==defaults[key]);
    byId('result-note').textContent=c.panel+' セル('+c.i+','+c.j+
      ') 独立CPU='+val.toPrecision(8)+' GPU RGBA='+rgba.join('/')+
      (edited?'（ソース変更後は初期基準と一致しなくてもよい）':'');
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
      const c=fcg3PixelCell(data.x,data.y,active.payload.width,active.payload.height);
      byId('result-note').textContent=c.panel+' 格子('+c.i+','+c.j+') Enter/Spaceで画素検査';
    }
    return;
  }
  if (isFCG3 && data.type === 'fcg3-pick') {
    const {x,y,rgba}=data,{width,height,steps}=active.payload;
    if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||
       x>=width||y>=height||!Array.isArray(rgba)||rgba.length!==4||
       !rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255))return;
    const c=fcg3PixelCell(x,y,width,height),k=c.i+32*c.j;
    const q=fcg3Grid(steps)[k],e=fcg3Exact((c.i+0.5)/32,(c.j+0.5)/32,steps);
    const q8=Math.round(255*q),e8=Math.round(255*e);
    const ref=c.panel==='density'?[q8,38,255-q8,255]:
      [Math.round(255*Math.min(1,5*Math.abs(q8-e8)/255)),20,26,255];
    const d=Math.max(...rgba.map((v,i)=>Math.abs(v-ref[i])));
    const unchanged=Object.keys(defaults).every(key=>active.payload[key]===defaults[key]);
    byId('result-note').textContent=c.panel+' 格子('+c.i+','+c.j+')、数値q='+
      q.toFixed(6)+'、解析='+e.toFixed(6)+'、GPU='+rgba.join('/')+
      '、初期CPU画素との差='+d+'階調：'+(unchanged?(d<=2?'一致':'不一致'):'編集後は参考比較');
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
    const {x,y,rgba}=data, {width,height,steps}=active.payload;
    if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||
      x>=width||y>=height||!Array.isArray(rgba)||rgba.length!==4||
      !rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255))return;
    const [i,j]=fcg2PixelCell(x,y,width,height);
    const q=fcg2Field(i,j,steps),byte=fcg2Encode(q);
    const expected=[byte,38,255-byte,255];
    const difference=Math.max(...expected.map((v,k)=>Math.abs(v-rgba[k])));
    byId('result-note').textContent='画素('+x+','+y+') → 格子('+i+','+j+')、解析q='+
      q.toFixed(6)+'、R8復元='+ (byte/255).toFixed(6)+
      '、GPU RGBA='+rgba.join('/')+'、初期shader基準との差='+difference+'階調。'+
      (active.payload.js===defaults.js&&active.payload.vertex===defaults.vertex&&
       active.payload.fragment===defaults.fragment?(difference<=2?'一致':'不一致'):
       '編集後は参考比較');
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
    const rows = (isWGL20 ? compareWGL20Readback : isFCG8 ? (got,w,h)=>compareFCG8Readback(got,w,h,active.payload.steps) : isFCG7 ? (got,w,h)=>compareFCG7Readback(got,w,h,active.payload.steps) : isFCG6 ? (got,w,h)=>compareFCG6Readback(got,w,h,active.payload.steps) : isFCG5 ? (got,w,h)=>compareFCG5Readback(got,w,h,active.payload.steps) : isFCG4 ? (got,w,h)=>compareFCG4Readback(got,w,h,active.payload.steps) : isFCG3 ? (got,w,h)=>compareFCG3Readback(got,w,h,active.payload.steps) : isFCG2 ? (got,w,h)=>compareFCG2Readback(got,w,h,active.payload.steps) : isWGL19 ? compareWGL19Readback : isWGL18 ? compareWGL18Readback : isWGL17 ? compareWGL17Readback : isWGL16 ? compareWGL16Readback : isWGL15 ? compareWGL15Readback : isWGL14 ? compareWGL14Readback : isWGL13 ? compareWGL13Readback : isWGL12 ? compareWGL12Readback : isWGL11 ? compareWGL11Readback : isWGL10 ? compareWGL10Readback : isWGL9 ? compareWGL9Readback : isWGL8 ? compareWGL8Readback : isWGL7 ? compareWGL7Readback : isWGL6 ? compareWGL6Readback : isWGL5 ? compareWGL5Readback : isWGL4 ? compareWGL4Readback : isWGL3 ? compareWGL3Readback : isWGL2 ? compareWGL2Readback : compareReadback)(
      samples, active.payload.width, active.payload.height);
    showTable(rows, unchanged);
    const pass = rows.every(row => row.pass);
    setStatus(unchanged && pass ? '初期ソースの独立画素検算に合格' :
      unchanged ? '基準画素と不一致（viewport/色/GL状態を再確認）' : '編集コードを実行しました（基準との差を比較）',
      unchanged && !pass);
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
      const fp=data.floatParameters;
      const validParameters=fp&&Number.isFinite(fp.rate)&&fp.rate>=0&&fp.rate<=0.25&&
        Number.isInteger(fp.steps)&&fp.steps>=0&&fp.steps<=12;
      const clock=auditWGL19Clock(data.frameAudit);
      const consistent=clock.pass&&validParameters&&fp.steps===data.frameAudit.steps;
      const floats=validParameters ? compareWGL19FloatReadback(data.floatReadback,fp.rate,fp.steps) :
        {valid:false,pass:false,maxError:Infinity,mass:NaN};
      byId('diagnostics').textContent += '\nWGL19 clock: '+(clock.pass?'一致':'不一致')+
        ' / independent CPU-FLOAT: '+(floats.valid ?
        'maxError='+floats.maxError.toPrecision(6)+', mass='+floats.mass.toPrecision(9)+
        ', '+(floats.pass?'一致':'不一致') : '読戻し未取得');
      if(!consistent||!floats.pass)
        setStatus('WGL19 計算時計・float独立検算が未達（入力値・readback・GL状態を確認）',true);
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
    byId('result-note').textContent = unchanged ?
      'CPUは座標と色の定数から独立に予測し、GPUはreadPixelsで実測。RGBA各成分' +
      ((isFCG2 || isFCG3 || isFCG4 || isFCG5 || isFCG6 || isFCG7 || isFCG8) ? '±2' : isWGL20 ? '±1' : isWGL19 ? '±2' : isWGL18 ? '±2' : isWGL17 ? '±2' : isWGL16 ? '±2' : isWGL15 ? '±2' : isWGL14 ? '±2' : isWGL13 ? '±1' : isWGL12 ? '±2' : isWGL11 ? '±2' : isWGL10 ? '±2' : isWGL9 ? '±10' : isWGL8 ? '±4' : (isWGL7 || isWGL6) ? '±3' : (isWGL2 ? '±2' : '±1')) + 'を許容します。' :
      'ソース変更時は初期色のCPU基準と一致しないことがあります。正誤の自動判定ではありません。';
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
      const predicted=expectedFCG8Samples(payload.width,payload.height,fcg8Steps);
      payload.probes=predicted.map(p=>[p.x,p.y]);
      const z=fcg8State(fcg8Steps);
      byId('fcg8-cpu-prediction').textContent=
        '独立CPU: step='+fcg8Steps+', t='+z.time.toFixed(2)+'s, 厳密面積='+
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
      const predicted=expectedFCG6Samples(payload.width,payload.height,fcg6Steps);
      payload.probes=predicted.map(p=>[p.x,p.y]);
      const s=fcg6State(fcg6Steps);
      byId('fcg6-cpu-prediction').textContent='independent CPU: t='+(fcg6Steps*s.dt).toFixed(3)+
        's, steps='+fcg6Steps+', pre-div='+s.divBefore.toExponential(3)+
        ', post-div='+s.divAfter.toExponential(3)+
        ', residual='+s.residual.toExponential(3)+
        ', RHS mean='+s.mean.toExponential(3)+
        ', identity='+s.identity.toExponential(3)+
        ', wall mismatch='+s.wall.toExponential(3);
    }
    if (isFCG5) {
      payload.steps=fcg5Steps;
      const predicted=expectedFCG5Samples(payload.width,payload.height,fcg5Steps);
      payload.probes=predicted.map(p=>[p.x,p.y]);
      const s=fcg5State(fcg5Steps);
      byId('fcg5-cpu-prediction').textContent='独立CPU time='+(fcg5Steps*s.dt).toFixed(3)+
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
      const predicted=expectedFCG3Samples(payload.width,payload.height,fcg3Steps);
      payload.probes=predicted.map(p=>[p.x,p.y]);
      const m=fcg3Metrics(fcg3Steps);
      byId('fcg3-cpu-prediction').textContent='独立CPU step '+fcg3Steps+
        ': mass='+m.mass.toPrecision(7)+', analytic sampled mass='+m.exactMass.toPrecision(7)+
        ', L1='+m.l1.toPrecision(7)+', max='+m.max.toPrecision(7)+', peak='+m.peak.toPrecision(7)+
        ' / R8 CPU基準: '+predicted.map(p=>p.label+'='+p.rgba.join('/')).join('、');
    }
    if (isFCG2) {
      payload.steps=fcg2Steps;
      const predicted=expectedFCG2Samples(payload.width,payload.height,fcg2Steps);
      payload.probes=predicted.map(p=>[p.x,p.y]);
      byId('fcg2-cpu-prediction').textContent='独立CPU予測（GPU非対応でも利用可） step '+
        fcg2Steps+': '+predicted.map(p=>p.label+' q='+p.value.toFixed(6)+
        ', R8='+p.byte+', 予測RGBA='+p.rgba.join('/')).join(' ／ ');
    }
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
  if(isFCG2)fcg2Steps=0;
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
        'outColor=vec4(q,0.15,1.0-q,1.0);',
        'outColor=vec4(q,0.15,1.0-q,1.0)');
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
if (isFCG8) {
  document.title='FCG8 自由表面：Level Set編集・検算ラボ';
  document.querySelector('h1').textContent='FCG8 界面の移流・再初期化・厳密粒子比較';
  document.querySelector('#panel-conditions > p').textContent=
    '48×48セル中心Level Setを既知の非圧縮せん断で移流。左=生の移流、中央=Godunov再初期化、右=厳密な変形円周と64粒子。面積・距離勾配のCPU診断とGPU画素を比較する。圧力・表面張力は解かない。';
  document.querySelector('#panel-conditions ol').innerHTML=
    '<li>step0/1/8/24で面積・距離勾配誤差と64粒子の軌道を比較する。</li>'+
    '<li>1ステップ、再生、一時停止、step0へ戻す操作で物理時刻とfpsを分ける。</li>'+
    '<li>levelset.jsのredistanceIterationsを0に、shearを0に変更しCPU基準と比較する。</li>'+
    '<li>levelset.fragの輪郭幅0.014を変更して画素と物理量を分離する。</li>'+
    '<li>fragment構文エラー、クリック/キーボード画素検査、GPU非対応時のCPU値を確認する。</li>';
  byId('preset').options[0].textContent='移流／再初期化／厳密界面・粒子の3表示';
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
  preview.textContent='GPU非対応でも独立CPUの面積・勾配誤差を表示します。';
  byId('panel-result').append(preview);
  function mark(){
    marker.textContent='物理step '+fcg8Steps+'/24、時刻 '+(fcg8Steps*0.04).toFixed(2)+'s（描画fpsとは独立）';
    pause.disabled=fcg8Timer===null;play.disabled=fcg8Timer!==null;
  }
  function pausePlay(){if(fcg8Timer!==null){clearInterval(fcg8Timer);fcg8Timer=null;}mark();}
  step.addEventListener('click',()=>{
    pausePlay();if(fcg8Steps>=24){setStatus('24 stepで上限。step0へ戻してください');return;}
    fcg8Steps++;mark();run();
  });
  play.addEventListener('click',()=>{
    if(fcg8Timer!==null)return;
    fcg8Timer=setInterval(()=>{
      if(fcg8Steps>=24){pausePlay();return;}
      fcg8Steps++;mark();run();if(fcg8Steps>=24)pausePlay();
    },1000);mark();
  });
  pause.addEventListener('click',pausePlay);
  back.addEventListener('click',()=>{pausePlay();fcg8Steps=0;mark();run();});
  byId('reset').addEventListener('click',mark);
  byId('stop').addEventListener('click',mark);
  mark();
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
    '16×16 MAC格子。円形の移動固体を毎step再標本化し、固体面速度を課したmasked Poisson射影と染料輸送を計算します。左=染料、中央=絶対発散、右=速さ＋黄色の格子境界法線。灰色は固体セル。';
  document.querySelector('#panel-conditions ol').innerHTML=
    '<li>初期のstep0/1/8/24で固体セル遷移・壁面速度差・Poisson残差・補正された発散を区別する。</li>'+
    '<li>1step、再生、停止、step0復帰を試し、t=step×0.05秒と描画時計を区別する。</li>'+
    '<li>solid.js のshapeをrectangleへ変え、マスク面数と圧力反力の違いを確認する。</li>'+
    '<li>wallAmplitudeとwallFrequencyを変更し、セル再分類時の染料面積積分の限界を調べる。</li>'+
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
    '12×12 MAC格子で半Lagrange速度移流、陽的粘性、外力、Poisson射影120反復、染料移流を実行します。左=染料、中央=絶対発散、右=速度。物理値・残差とGPU画素を分けて検算します。';
  document.querySelector('#panel-conditions ol').innerHTML=
    '<li>静止初期場の性質、step0/1/8/24の染料積分・最大発散・Poisson残差を比較する。</li>'+
    '<li>1step・再生・一時停止・step0へ復帰を行い、物理時刻と画面更新間隔を区別する。</li>'+
    '<li>結果canvasで画素をクリック、または矢印キーとEnterで物理格子値を検査する。</li>'+
    '<li>fluid.jsのnuまたはforceAmplitudeを変更し、物理値と初期CPU予測の差を説明する。</li>'+
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
  function mark(){
    marker.textContent='物理step '+fcg5Steps+'/32、時刻 '+(fcg5Steps*0.04).toFixed(2)+'s（描画fpsとは独立）';
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
    'CPU半Lagrange法で32×32染料を更新します。左=数値染料、右=5倍R8誤差map。格子質量・Float64誤差・GPU画素を分けて照合します。';
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
  document.title='FCG2 物理格子からWebGL2へ：編集・検算ラボ';
  document.querySelector('h1').textContent='FCG2 時間発展する8×8スカラー場とGPU表示';
  document.querySelector('#panel-conditions > p').textContent=
    '解析式で毎step更新する8×8のスカラー場をR8 textureにしてGPU表示します。流体PDEは解きません。画素から格子へ戻す式、R8丸め、GPU表示を独立CPU基準と照合してください。';
  document.querySelector('#panel-conditions ol').innerHTML=
    '<li>初期のstep1で5画素のCPU予測・GPU照合を確認する。</li>'+
    '<li>1step・再生・一時停止・時刻0への復帰を実行する。</li>'+
    '<li>描画canvasをクリック（または矢印キー＋Enter）して格子・q・色を検査する。</li>'+
    '<li>density.jsの解析場・density.fragの色変換を編集し、変化を比較する。</li>'+
    '<li>構文エラープリセットとGPU非対応時の診断を確認する。</li>';
  byId('preset').options[0].textContent='8×8解析スカラー場・R8量子化';
  byId('preset').options[1].textContent='fragmentの構文エラー';
  byId('result-note').textContent='GPU非対応でもCPUの独立予測値は下に表示します。';
  const controls=document.createElement('div');
  controls.className='controls';
  const step=document.createElement('button');
  const play=document.createElement('button');
  const pause=document.createElement('button');
  const back=document.createElement('button');
  const marker=document.createElement('output');
  for(const [button,label] of [[step,'1step'],[play,'再生'],[pause,'一時停止'],[back,'時刻0へ戻す']]){
    button.type='button';button.textContent=label;button.className='action';controls.append(button);
  }
  controls.append(marker);
  // Put physical-step controls outside all tabpanels; they must remain visible with GPU canvas.
  byId('run').parentElement.before(controls);
  const cpuPreview=document.createElement('p');
  cpuPreview.id='fcg2-cpu-prediction';
  cpuPreview.setAttribute('aria-live','polite');
  byId('panel-result').append(cpuPreview);
  function mark(){marker.textContent='物理step '+fcg2Steps+' / 4、t='+
    (fcg2Steps*Math.PI/2).toFixed(3)+' s（再描画だけでは物理時刻は進みません）';
    pause.disabled=fcg2Timer===null;play.disabled=fcg2Timer!==null;}
  function pausePlay(){if(fcg2Timer!==null){clearInterval(fcg2Timer);fcg2Timer=null;}mark();}
  step.addEventListener('click',()=>{
    pausePlay();if(fcg2Steps>=4){setStatus('step4で終了。時刻0へ戻してください');return;}
    fcg2Steps++;mark();run();
  });
  play.addEventListener('click',()=>{
    if(fcg2Timer!==null)return;
    fcg2Timer=setInterval(()=>{
      if(fcg2Steps>=4){pausePlay();return;}
      fcg2Steps++;mark();run();
      if(fcg2Steps>=4)pausePlay();
    },1500);
    mark();
  });
  pause.addEventListener('click',pausePlay);
  back.addEventListener('click',()=>{pausePlay();fcg2Steps=0;mark();run();});
  byId('reset').addEventListener('click',mark);
  byId('stop').addEventListener('click',mark);
  mark();
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
  document.title = 'WGL17 データテクスチャの型・量子化と読戻しラボ';
  document.querySelector('h1').textContent = 'WGL17 物理値4×2格子をGPU textureへ送る';
  document.querySelector('#panel-conditions > p').textContent =
    'R8正規化値・R8UI整数・R32F単精度を編集して比較。8点の独立CPU画素予測とGPU readPixels、対応環境では別のRGBA32F FLOAT読戻しを確認します。';
  document.querySelector('#panel-conditions ol').innerHTML =
    '<li>初期R8で実行し4×2の値と8点のCPU/GPU画素を比較する。</li>' +
    '<li>data-grid.jsのmodeをr8uiへ変え、usampler2Dの戻り値を確認する。</li>' +
    '<li>modeをr32fに変えてCPU復元誤差とRGBA8表示の量子化を区別する。</li>' +
    '<li>EXT_color_buffer_float・FBO完成状態とFLOAT読戻しの診断を確認する。</li>' +
    '<li>GLSLの復元式を変更し、不一致を観察した後に初期化する。</li>';
  byId('preset').options[0].textContent = '4×2物理格子・R8/R8UI/R32F比較';
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
// A separate reference animation runs on requestAnimationFrame. Edited lesson code
// remains in the existing sandboxed runner and is never executed by this view.
if (isFCG5) mountSmokeObservation(byId('panel-conditions'));
if (isFCG8 || isWGL4) mountReferenceObservation({lesson,parent:byId('panel-conditions')});
// Three physical panels must have square pixel footprints: avoid stretching a
// 1x1 metre domain into ~100x240 strips at the original 320x240 default.
const sizeHint=(isFCG4||isFCG5||isFCG6||isFCG7||isFCG8)?[900,300]:
  isFCG3?[640,320]:isFCG2?[480,480]:
  (lesson==='WGL1'||isWGL2||isWGL3||isWGL4)?[480,480]:[640,480];
byId('width').value=String(sizeHint[0]);
byId('height').value=String(sizeHint[1]);
load();
// 画素の期待値は、GPUに触れる前に CPU 側で示せる。
byId('result-note').textContent = '初期サイズでのCPU予測: ' +
  oracle(sizeHint[0],sizeHint[1])
  .map(item => item.label + '=' + item.rgba.join('/')).join('、');
