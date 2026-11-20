import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createSmokeState,splatSmoke,advanceSmoke,smokeMetrics}
  from './wgl-fcg-fluid-visual.mjs';

test('FCG5 observation solver steps deterministically with finite velocity and colored dye',()=>{
  const a=createSmokeState(40),b=createSmokeState(40);
  for(let k=0;k<8;k++){
    advanceSmoke(a,1/50,{swirl:.15});
    advanceSmoke(b,1/50,{swirl:.15});
  }
  assert.equal(a.step,8);
  assert.ok(Math.abs(a.time-8/50)<1e-12);
  for(const key of ['u','v','r','g','b']){
    assert.equal(a[key].length,1600);
    assert.ok(a[key].every(Number.isFinite),key);
    assert.deepEqual(a[key],b[key],key);
    if('rgb'.includes(key))assert.ok(a[key].every(x=>x>=0),key);
  }
  const m=smokeMetrics(a);
  assert.ok(m.meanDye>0 && m.maxSpeed>0 && m.maxSpeed<=3);
});
test('FCG5 pointer splat changes dye and flow in the local area and validates settings',()=>{
  const a=createSmokeState(48);
  const m0=smokeMetrics(a),k=24+24*a.n,original=a.u[k];
  splatSmoke(a,.5,.5,.2,-.3,[1,0,.2],.04);
  assert.ok(a.u[k]>original);
  assert.ok(smokeMetrics(a).meanDye>m0.meanDye);
  advanceSmoke(a,.02,{swirl:0,fade:.995});
  assert.throws(()=>createSmokeState(8),RangeError);
  assert.throws(()=>advanceSmoke(a,0),RangeError);
  assert.throws(()=>splatSmoke(a,.5,.5,Infinity,0),RangeError);
});
test('WGL/FCG reference studio shares readable, aspect-correct independent displays',async()=>{
  const [host,css,mod,smoke]=await Promise.all([
    readFile(new URL('./wgl-lab-host.mjs',import.meta.url),'utf8'),
    readFile(new URL('./wgl-lab.css',import.meta.url),'utf8'),
    readFile(new URL('./wgl-fcg-reference-visual.mjs',import.meta.url),'utf8'),
    readFile(new URL('./wgl-fcg-fluid-visual.mjs',import.meta.url),'utf8')
  ]);
  assert.ok(host.includes("mountSmokeObservation(byId('panel-conditions'))"));
  assert.ok(host.includes("mountReferenceObservation({lesson,parent:byId('panel-conditions')})"));
  assert.ok(host.includes("[900,300]"));
  assert.ok(host.includes("iframe.style.aspectRatio = payload.width"));
  assert.ok(host.includes("if (isWGL4) payload.probes = expectedWGL4Samples"));
  assert.ok(host.includes("const positions = (['WGL4', 'WGL5'"));
  assert.match(css,/\.visual-observation-grid\{display:grid/);
  assert.match(css,/\.visual-smoke-stage canvas/);
  assert.ok(mod.includes('requestAnimationFrame(tick)'));
  assert.ok(mod.includes("getContext('webgl2'"));
  assert.ok(mod.includes('levelMap(canvas,field)'));
  assert.ok(mod.includes('contour(ctx,size,t)'));
  assert.ok(mod.includes('renderer?.draw(deg*Math.PI/180)'));
  assert.ok(mod.includes("canvases[i]"));
  assert.ok(smoke.includes("canvas.addEventListener('pointermove'"));
  assert.ok(smoke.includes('advanceSmoke(state,Math.min(.05'));
  assert.ok(smoke.includes('半Lagrange')===false); // reference implementation is code, not fabricated lesson prose
  assert.ok(!mod.includes('allow-same-origin'));
});
