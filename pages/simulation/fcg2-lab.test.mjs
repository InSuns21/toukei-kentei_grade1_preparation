import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fcg2Field,fcg2Encode,fcg2Grid,fcg2PixelCell,
  expectedFCG2Samples,compareFCG2Readback} from './fcg2-lab-core.mjs';

test('FCG2 scalar field, time and bottom-row grid semantics',()=>{
  assert.equal(fcg2Grid(0).length,64);
  assert.ok(fcg2Grid(0).every(v=>v===0.5));
  for(let n=0;n<=4;n++){
    assert.ok(fcg2Grid(n).every(v=>v>=0.25&&v<=0.75));
    assert.ok(Math.abs(fcg2Grid(n).reduce((a,b)=>a+b,0)-32)<1e-12);
  }
  assert.ok(Math.abs(fcg2Field(1,1,1)-0.5-0.25*Math.sin(3*Math.PI/8)*
    Math.cos(3*Math.PI/8))<1e-12);
  assert.ok(Math.abs(fcg2Field(1,1,1)+fcg2Field(1,1,3)-1)<1e-12);
});
test('FCG2 8-bit bound and screen to cell map',()=>{
  for(let n=0;n<=4;n++)for(const q of fcg2Grid(n))
    assert.ok(Math.abs(q-fcg2Encode(q)/255)<=1/510+1e-14);
  assert.deepEqual(fcg2PixelCell(0,0,320,240),[0,0]);
  assert.deepEqual(fcg2PixelCell(319,239,320,240),[7,7]);
  for(const [w,h] of [[320,240],[64,64],[640,480],[1024,512]]){
    const probes=expectedFCG2Samples(w,h,1);
    assert.equal(probes.length,5);
    const observed=probes.map(p=>({x:p.x,y:p.y,rgba:[...p.rgba]}));
    assert.ok(compareFCG2Readback(observed,w,h,1).every(r=>r.pass));
    observed[2].rgba[0]+=4;
    assert.equal(compareFCG2Readback(observed,w,h,1)[2].pass,false);
  }
  assert.throws(()=>fcg2PixelCell(320,0,320,240),RangeError);
});
test('FCG2 actual lesson is editable WebGL2 with physical time and shader diagnostics',async()=>{
  const root=new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG2/',import.meta.url);
  const [js,vert,frag,host,html]=await Promise.all([
    readFile(new URL('density.js',root),'utf8'),
    readFile(new URL('density.vert',root),'utf8'),
    readFile(new URL('density.frag',root),'utf8'),
    readFile(new URL('wgl-lab-host.mjs',import.meta.url),'utf8'),
    readFile(new URL('wgl-lab.html',import.meta.url),'utf8')]);
  assert.match(js,/gl\.texSubImage2D/);
  assert.match(js,/gl\.R8/);
  assert.match(js,/gl\.drawArrays\(gl\.TRIANGLES,0,3\)/);
  assert.match(js,/settings\.steps/);
  assert.match(js,/COMPILE_STATUS/);
  assert.match(js,/LINK_STATUS/);
  assert.match(vert,/#version 300 es/);
  assert.match(frag,/texelFetch\(u_density,cell,0\)/);
  assert.match(host,/lesson === 'FCG2'/);
  assert.match(host,/expectedFCG2Samples/);
  assert.match(host,/iframe\.setAttribute\('sandbox', 'allow-scripts'\)/);
  assert.ok(!host.includes('allow-same-origin'));
  assert.match(html,/role="tablist"/);
});
