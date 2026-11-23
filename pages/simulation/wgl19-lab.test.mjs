import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {scheduleWGL19,expectedWGL19Grid,expectedWGL19Samples,
  compareWGL19Readback,compareWGL19FloatReadback,auditWGL19Clock}
  from './wgl19-lab-core.mjs';
test('four render frames are six fixed simulation ticks',()=>{
  const s=scheduleWGL19();
  assert.deepEqual(s.frames.map(f=>f.performed),[0,1,4,1]);
  assert.equal(s.steps,6);assert.equal(s.totalMs,120);
  assert.equal(s.remainderMs,0);assert.equal(s.droppedMs,0);
  assert.equal(s.totalMs,s.steps*20+s.remainderMs+s.droppedMs);
  assert.equal(scheduleWGL19([20,20],20,4).steps,2);
  assert.equal(scheduleWGL19([10,10,10,10],20,4).steps,2);
  assert.equal(scheduleWGL19([20,20,20,20],20,4).steps,4);
  const lag=scheduleWGL19([200],20,4);
  assert.equal(lag.steps,4);assert.equal(lag.droppedMs,120);
  assert.equal(lag.remainderMs,0);
  assert.equal(lag.totalMs,lag.steps*20+lag.droppedMs+lag.remainderMs);
  assert.throws(()=>scheduleWGL19([-1]),RangeError);
  assert.throws(()=>scheduleWGL19([1],0),RangeError);
  assert.throws(()=>scheduleWGL19([1],20,0),RangeError);
});
test('six-step independent grid and 16 RGBA/FLOAT probes',()=>{
  const grid=expectedWGL19Grid();
  assert.equal(grid.length,16);
  assert.ok(Math.abs(grid.reduce((a,b)=>a+b,0)-1)<1e-12);
  const j0=[0.10368,0.094912,0.07296,0.050304];
  for(let i=0;i<4;i++)assert.ok(Math.abs(grid[i]-j0[i])<1e-12);
  assert.ok(Math.abs(grid[5]-0.087872)<1e-12);
  const s=expectedWGL19Samples(320,240);
  assert.equal(s.length,16);
  const actual=s.map(p=>({x:p.x,y:p.y,rgba:[...p.rgba]}));
  assert.ok(compareWGL19Readback(actual,320,240).every(p=>p.pass));
  actual[5].rgba[0]+=7;
  assert.equal(compareWGL19Readback(actual,320,240)[5].pass,false);
  assert.equal(compareWGL19FloatReadback(grid).pass,true);
  assert.equal(compareWGL19FloatReadback(grid.map((v,i)=>i===5?v+0.01:v)).pass,false);
  assert.equal(compareWGL19FloatReadback(null).valid,false);
});
test('edited WGL19 diffusion pixels use source-backed rate and audited clock',()=>{
  const schedule=scheduleWGL19([16,16,72,16],40,1);
  assert.equal(schedule.steps,2);
  assert.equal(schedule.droppedMs,40);
  const custom=expectedWGL19Samples(320,240,0.1,schedule.steps);
  assert.equal(custom.length,16);
  assert.ok(compareWGL19Readback(custom,320,240,2,0.1,schedule.steps).every(p=>p.pass));
  assert.ok(compareWGL19FloatReadback(expectedWGL19Grid(0.1,[16,16,72,16],40,1),0.1,2).pass);
  assert.ok(compareWGL19Readback(custom,320,240).some(p=>!p.pass),
    'default 6-step pixels must not pass an edited 2-step run');
  assert.throws(()=>expectedWGL19Samples(320,240,0.5,2),RangeError);
  assert.throws(()=>expectedWGL19Samples(320,240,0.1,13),RangeError);
});

test('independent clock audit rejects fabricated step and drop counters',()=>{
  const valid={deltas:[16,16,72,16],fixedMs:20,maxStepsPerFrame:4,
    steps:6,droppedMs:0,frames:4};
  assert.equal(auditWGL19Clock(valid).pass,true);
  assert.equal(auditWGL19Clock({...valid,steps:4}).pass,false);
  assert.equal(auditWGL19Clock({...valid,droppedMs:20}).pass,false);
  assert.equal(auditWGL19Clock({...valid,deltas:[-1]}).valid,false);
});
test('editable sources include real RAF, loss/rebuild, GPU disposal and host oracle',async()=>{
  const base=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL19/',import.meta.url);
  const [js,vert,frag,host]=await Promise.all([
    ...['audit.js','audit.vert','audit.frag'].map(f=>readFile(new URL(f,base),'utf8')),
    readFile(new URL('wgl-lab-host.mjs',import.meta.url),'utf8')
  ]);
  for(const bit of ['requestAnimationFrame','EXT_color_buffer_float','RGBA32F',
    'WEBGL_lose_context','webglcontextrestored','initialize()','dispose()',
    'gl.deleteFramebuffer','gl.deleteTexture','gl.isTexture','gl.readPixels'])
    assert.ok(js.includes(bit),bit);
  assert.match(frag,/texelFetch/);
  assert.ok(vert.startsWith('#version 300 es'));
  for(const bit of ['WGL19','compareWGL19FloatReadback','auditWGL19Clock',
    'expectedWGL19Samples'])
    assert.ok(host.includes(bit),bit);
});

test('WGL19 replays the audited GPU shader in the same sandbox, not a disconnected picture',async()=>{
  const js=await readFile(new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL19/audit.js',import.meta.url),'utf8');
  assert.doesNotThrow(()=>new Function('gl','canvas','vertexSource','fragmentSource','report','settings',js));
  for(const part of ['const live={frame:0','function resetPlayback()','initialize();',
    'function nextFrame()','tick();live.remainderMs-=fixedMs',
    'drawScreen();','const values=readState();',
    "new CustomEvent('wgl19-progress'",'labels[k].textContent=values[k].toFixed(3)',
    "canvas.addEventListener('wgl19-control'",'setInterval(()=>safely(nextFrame),850)',
    'prefers-reduced-motion','return {floatReadback,floatParameters:']){
    assert.ok(js.includes(part),part);
  }
  assert.ok(js.indexOf('const floatReadback=readState();')<
    js.indexOf("window.addEventListener('wgl19-initial-oracle-captured'"),
    'initial float snapshot is read before replay callback is registered');
  assert.ok(js.indexOf('dispose();')<js.indexOf('function resetPlayback()'));
});

test('WGL19 result view offers source-linked clock presets and verifies every replayed prefix',async()=>{
  const [host,css,lesson]=await Promise.all([
    readFile(new URL('wgl-lab-host.mjs',import.meta.url),'utf8'),
    readFile(new URL('wgl-lab.css',import.meta.url),'utf8'),
    readFile(new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL19/index.md',import.meta.url),'utf8')
  ]);
  for(const part of ["request.lesson==='WGL19'","type:'wgl19-control'",
    "type:'wgl19-progress'",'wgl19-initial-oracle-captured','scheduleWGL19(audit.deltas',
    "data.steps===expected.totalSteps","id='wgl19-live-play'",
    "id='wgl19-live-step'","id='wgl19-live-reset'",
    "id='wgl19-timeline'","const frameDeltasMs=",
    "const maxStepsPerFrame="]){
    assert.ok(host.includes(part),part);
  }
  assert.match(css,/#wgl19-timeline tr\.current/);
  assert.match(lesson,/実行（結果へ）/);
  assert.match(lesson,/同じ編集JS・同じGLSL・同じ更新式/);
  assert.match(lesson,/同じGPUテクスチャ/);
});
