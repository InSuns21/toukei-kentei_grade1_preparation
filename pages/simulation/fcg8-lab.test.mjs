import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {readFile} from 'node:fs/promises';
import {FCG8_MAX_STEPS,fcg8State,expectedFCG8Samples,compareFCG8Readback} from './fcg8-lab-core.mjs';
test('FCG8 divergence-free shear has invariant analytical area and exact marker mapping',()=>{
  for(const k of [0,1,8,24]){
    const a=fcg8State(k);
    assert.ok(Math.abs(a.analyticArea-Math.PI*0.18**2)<1e-13);
    assert.ok(Math.abs(a.time-k*0.04)<1e-12);
    assert.equal(a.particles.length,64);
    for(const p of a.particles)assert.ok(p.every(x=>x>0&&x<1));
    assert.ok(Math.abs(a.particles[0][0]-0.68)<1e-12);
    assert.ok(Math.abs(a.particles[0][1]-0.5)<1e-12);
    assert.ok([a.rawMetric,a.reinitMetric].every(m=>
      Number.isFinite(m.area)&&m.area>0&&Number.isFinite(m.gradientError)&&m.bandCells>0));
  }
});
test('FCG8 sampled level set is advected and redistanced, with finite bounded area drift',()=>{
  const s0=fcg8State(0),s8=fcg8State(8),s24=fcg8State(24);
  assert.ok(s0.raw.every((x,k)=>x===s0.reinit[k]));
  assert.ok(s8.raw.some((x,k)=>Math.abs(x-s0.raw[k])>1e-5));
  assert.ok(s8.reinit.some((x,k)=>Math.abs(x-s8.raw[k])>1e-7));
  for(const state of [s0,s8,s24]){
    for(const a of [state.raw,state.reinit])assert.ok(a.every(Number.isFinite));
    assert.ok(Math.abs(state.rawMetric.area-state.analyticArea)<0.035);
    assert.ok(Math.abs(state.reinitMetric.area-state.analyticArea)<0.035);
  }
});
test('FCG8 pixel oracle rejects synthetic mismatch',()=>{
  const a=expectedFCG8Samples(384,256,8);
  assert.ok(compareFCG8Readback(a,384,256,8).every(row=>row.pass));
  const b=a.map(p=>({...p,rgba:[0,0,0,255]}));
  assert.ok(compareFCG8Readback(b,384,256,8).some(row=>!row.pass));
});

test('FCG8 reference supports 96 bounded physical steps with stable seek cache',()=>{
  assert.equal(FCG8_MAX_STEPS,96);
  const a=fcg8State(24),b=fcg8State(96),again=fcg8State(24);
  assert.ok(Math.abs(b.time-3.84)<1e-10);
  assert.ok(b.raw.every(Number.isFinite));
  assert.ok(b.reinit.every(Number.isFinite));
  assert.ok(b.rawMetric.area>=0&&Number.isFinite(b.rawMetric.gradientError));
  assert.equal(a.rawMetric.area,again.rawMetric.area);
  assert.throws(()=>fcg8State(97),/0\.\.96/);
});
test('FCG8 editable solver is updated in place rather than rerunning an iframe per step',async()=>{
  const js=await readFile(new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG8/levelset.js',import.meta.url),'utf8');
  const frag=await readFile(new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG8/levelset.frag',import.meta.url),'utf8');
  const host=await readFile(new URL('./wgl-lab-host.mjs',import.meta.url),'utf8');
  const observer=await readFile(new URL('./wgl-fcg-reference-visual.mjs',import.meta.url),'utf8');
  assert.doesNotThrow(()=>new Function('gl','canvas','vertexSource','fragmentSource','report','settings',js));
  assert.match(js,/function advanceOne\(\)/);
  assert.match(js,/function liveDraw\(\)/);
  assert.match(js,/gl\.texSubImage2D\(gl\.TEXTURE_2D/);
  assert.match(js,/return \{play:playLive,pause:pauseLive,step:stepLive,reset:resetLive\}/);
  assert.match(js,/requestAnimationFrame\(liveFrame\)/);
  assert.ok(js.indexOf("report('LIMIT'")<js.indexOf('requestAnimationFrame(liveFrame)'));
  assert.match(frag,/Bilinear DISPLAY reconstruction/);
  assert.match(host,/type:'fcg8-control'/);
  assert.match(host,/active\.completed=!!data\.ok/);
  assert.match(host,/control\('play'\)/);
  assert.match(host,/\[1536,512\]/);
  assert.match(observer,/if\(!playing&&position>=duration\)position=0/);
  assert.match(observer,/devicePixelRatio/);
});
