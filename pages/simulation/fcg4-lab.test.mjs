import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {FCG4_N,FCG4_DT,FCG4_RHO,fcg4ExactPressure,fcg4State,fcg4PixelCell,
  expectedFCG4Samples,compareFCG4Readback} from './fcg4-lab-core.mjs';

test('FCG4 MAC matrix, Neumann compatibility and zero normal boundaries',()=>{
  const zero=fcg4State(0),end=fcg4State(160);
  assert.equal(FCG4_N,8);assert.equal(FCG4_DT,0.1);assert.equal(FCG4_RHO,1);
  assert.equal(end.pressure.length,64);
  assert.equal(end.u.length,72);assert.equal(end.v.length,72);
  assert.equal(end.source.length,64);
  assert.ok(Math.abs(end.sourceSum)<1e-10);
  assert.ok(Math.abs(end.pressureMean)<1e-12);
  assert.equal(end.wallMax,0);
  assert.ok(zero.divBefore>0);
  assert.ok(end.divAfter<zero.divBefore);
  assert.ok(end.pressureError<0.01);
  assert.ok(end.divAfter<0.002);
  assert.ok(end.poissonMax<0.02);
  assert.ok(end.identityError<1e-11);
  assert.ok(Math.abs(end.divAfter-FCG4_DT/FCG4_RHO*end.poissonMax)<1e-11);
  assert.ok(Math.abs(fcg4ExactPressure(0,0)+fcg4ExactPressure(7,0))<1e-12);
});

test('FCG4 residual declines and exact pure curl target is reached',()=>{
  const early=fcg4State(2),middle=fcg4State(80),end=fcg4State(160);
  assert.ok(early.poissonMax>middle.poissonMax);
  assert.ok(middle.poissonMax>end.poissonMax);
  assert.ok(end.pressureError<middle.pressureError);
  assert.ok(end.divAfter<early.divAfter);
  assert.throws(()=>fcg4State(-1),RangeError);
  assert.throws(()=>fcg4State(161),RangeError);
});

test('FCG4 9 GPU probes and textural pixel mapping',()=>{
  for(const [w,h] of [[320,240],[384,256],[64,64],[1024,512],[1536,512]]){
    for(const k of [0,1,16,80,128,160]){
      const expected=expectedFCG4Samples(w,h,k);
      assert.equal(expected.length,9);
      const measured=expected.map(p=>({x:p.x,y:p.y,rgba:[...p.rgba]}));
      assert.ok(compareFCG4Readback(measured,w,h,k).every(v=>v.pass));
      measured[0].rgba[0]=measured[0].rgba[0]>8?measured[0].rgba[0]-5:measured[0].rgba[0]+5;
      assert.equal(compareFCG4Readback(measured,w,h,k)[0].pass,false);
    }
  }
  assert.equal(fcg4PixelCell(0,0,320,240).panel,'pressure');
  assert.equal(fcg4PixelCell(319,239,320,240).panel,'speed');
  assert.throws(()=>fcg4PixelCell(320,0,320,240),RangeError);
});

test('FCG4 code, shader and shared three-tab isolated lab contract',async()=>{
  const dir=new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG4/',import.meta.url);
  const [js,vert,frag,host,html,md]=await Promise.all([
    readFile(new URL('projection.js',dir),'utf8'),
    readFile(new URL('projection.vert',dir),'utf8'),
    readFile(new URL('projection.frag',dir),'utf8'),
    readFile(new URL('wgl-lab-host.mjs',import.meta.url),'utf8'),
    readFile(new URL('wgl-lab.html',import.meta.url),'utf8'),
    readFile(new URL('index.md',dir),'utf8')]);
  assert.match(js,/settings\.steps/);
  assert.match(js,/relax=2\/3/);
  assert.match(js,/new Float64Array/);
  assert.match(js,/report\('POISSON'/);
  assert.match(js,/report\('DIV'/);
  assert.match(js,/report\('BOUNDARY'/);
  assert.match(js,/gl\.R8,N,N/);
  assert.match(js,/COMPILE_STATUS/);
  assert.match(vert,/#version 300 es/);
  assert.match(frag,/texelFetch\(u_pressure/);
  assert.match(frag,/texelFetch\(u_div/);
  assert.match(frag,/texelFetch\(u_speed/);
  assert.match(host,/lesson === 'FCG4'/);
  assert.match(host,/expectedFCG4Samples/);
  assert.match(host,/fcg4-cpu-prediction/);
  assert.match(host,/fcg4-pick/);
  assert.match(host,/iframe\.setAttribute\('sandbox', 'allow-scripts'\)/);
  assert.ok(!host.includes('allow-same-origin'));
  assert.match(html,/role="tablist"/);
  assert.match(md,/lesson=FCG4/);
  assert.equal((md.match(/- Level: A/g)||[]).length,4);
  assert.equal((md.match(/- Level: B/g)||[]).length,3);
  assert.equal((md.match(/- Level: C/g)||[]).length,1);
  assert.equal((md.match(/<!-- solution-start -->/g)||[]).length,8);
});
