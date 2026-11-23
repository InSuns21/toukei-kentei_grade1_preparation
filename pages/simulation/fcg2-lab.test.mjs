import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {
  FCG2_N,FCG2_PERIOD,FCG2_DEFAULTS,fcg2Concentration,
  fcg2Field,fcg2FieldAtTime,fcg2Encode,fcg2Color,fcg2Grid,fcg2PixelCell,
  expectedFCG2Samples,expectedFCG2SamplesAtTime,compareFCG2Readback
} from './fcg2-lab-core.mjs';
import {parametersFor,readLabParameter,writeLabParameter,verifiedFCG2Physics}
  from './wgl-lab-parameters.mjs';

test('FCG2 exact passive scalar concentration and characteristic invariant',()=>{
  assert.equal(FCG2_N,128);
  assert.equal(FCG2_PERIOD,2*Math.PI);
  assert.deepEqual(FCG2_DEFAULTS,{omega:1,shear:3,amplitude:0.9});
  assert.ok(Math.abs(fcg2Concentration(0.76,0.5,0)-0.9)<1e-13);
  for(const t of [0,0.18,Math.PI/2,Math.PI,2*Math.PI]){
    for(const radius of [0.1,0.26,0.42]){
      const initial=0.17,advance=initial+(1+3*radius)*t;
      const x=0.5+radius*Math.cos(advance),y=0.5+radius*Math.sin(advance);
      const start=fcg2Concentration(
        0.5+radius*Math.cos(initial),0.5+radius*Math.sin(initial),0);
      const moved=fcg2Concentration(x,y,t);
      assert.ok(Math.abs(start-moved)<1e-12,'exact transport of a fluid parcel');
    }
  }
  assert.equal(fcg2Concentration(0.5,0.5,2),0);
  assert.equal(fcg2Concentration(0.99,0.5,2),0);
  assert.equal(fcg2Concentration(0.76,0.5,0,{omega:0}),0.9);
  assert.equal(fcg2Concentration(0.76,0.5,0,{amplitude:0}),0);
  assert.throws(()=>fcg2Concentration(0.7,0.5,-0.1),RangeError);
  assert.throws(()=>fcg2FieldAtTime(128,0,0),RangeError);
});
test('FCG2 real grid shape, two snapshots and sampled mass',()=>{
  assert.equal(fcg2Grid(0).length,128*128);
  assert.equal(fcg2Grid(2).length,128*128);
  for(let n=0;n<=4;n++){
    const grid=fcg2Grid(n);
    assert.ok(grid.every(q=>q>=0&&q<=0.9));
    const integral=grid.reduce((sum,q)=>sum+q,0)/(128*128);
    assert.ok(Math.abs(integral-0.0649331)<2e-6,'midpoint integral approximation');
  }
  assert.ok(Math.abs(fcg2Field(97,64,0)-0.89949907)<1e-7);
  assert.ok(Math.abs(fcg2Field(32,75,1)-0.89949862)<1e-7);
  assert.equal(fcg2Encode(fcg2Field(97,64,0)),229);
  for(let n=0;n<=4;n++)
    assert.equal(fcg2Field(32,75,n),fcg2FieldAtTime(32,75,n*Math.PI/2));
});
test('FCG2 R8 quantization, palette and viewport/grid correspondence',()=>{
  for(let n=0;n<=4;n++)for(const q of fcg2Grid(n))
    assert.ok(Math.abs(q-fcg2Encode(q)/255)<=1/510+1e-14);
  assert.deepEqual(fcg2Color(229),[230,176,54,255]);
  assert.deepEqual(fcg2PixelCell(0,0,320,240),[0,0]);
  assert.deepEqual(fcg2PixelCell(319,239,320,240),[127,127]);
  assert.deepEqual(fcg2PixelCell(130,302,512,512),[32,75]);
  for(const [w,h] of [[320,240],[64,64],[512,512],[1024,512]]){
    const probes=expectedFCG2Samples(w,h,1);
    assert.equal(probes.length,6);
    const observed=probes.map(p=>({x:p.x,y:p.y,rgba:[...p.rgba]}));
    assert.ok(compareFCG2Readback(observed,w,h,1).every(r=>r.pass));
    observed[2].rgba[0]+=4;
    assert.equal(compareFCG2Readback(observed,w,h,1)[2].pass,false);
  }
  const p=expectedFCG2SamplesAtTime(512,512,Math.PI/2);
  assert.equal(p[0].byte,229);
  assert.throws(()=>fcg2PixelCell(320,0,320,240),RangeError);
  assert.throws(()=>expectedFCG2SamplesAtTime(512,512,FCG2_PERIOD+1),RangeError);
});
test('FCG2 editable UI values are used by the same source and independent oracle',async()=>{
  const root=new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG2/',import.meta.url);
  const [js,vert,frag,host]=await Promise.all([
    readFile(new URL('density.js',root),'utf8'),
    readFile(new URL('density.vert',root),'utf8'),
    readFile(new URL('density.frag',root),'utf8'),
    readFile(new URL('wgl-lab-host.mjs',import.meta.url),'utf8')]);
  const specs=parametersFor('FCG2');
  assert.deepEqual(specs.map(s=>s.id),['omega','shear','amplitude']);
  for(const spec of specs)
    assert.deepEqual(readLabParameter(js,spec),{ok:true,value:spec.default});
  const defaults={js,vertex:vert,fragment:frag};
  assert.deepEqual(verifiedFCG2Physics(js,vert,frag,defaults),
    {omega:1,shear:3,amplitude:0.9});
  const altered=writeLabParameter(writeLabParameter(js,specs[1],0),specs[0],0);
  assert.deepEqual(verifiedFCG2Physics(altered,vert,frag,defaults),
    {omega:0,shear:0,amplitude:0.9});
  assert.equal(verifiedFCG2Physics(altered,vert,frag+' ',defaults),null);
  assert.equal(verifiedFCG2Physics(altered.replace('const N=128;','const N=16;'),
    vert,frag,defaults),null);
  assert.ok(Math.abs(fcg2FieldAtTime(97,64,Math.PI/2,
    {omega:0,shear:0})-fcg2FieldAtTime(97,64,0))<1e-12);
  const predicted=expectedFCG2Samples(512,512,1,{omega:0,shear:0});
  const observed=predicted.map(x=>({x:x.x,y:x.y,rgba:[...x.rgba]}));
  assert.ok(compareFCG2Readback(observed,512,512,1,2,{omega:0,shear:0})
    .every(x=>x.pass));
  assert.throws(()=>writeLabParameter(js,specs[0],3),RangeError);
  assert.match(js,/gl\.texSubImage2D/);
  assert.match(js,/gl\.R8/);
  assert.match(js,/gl\.drawArrays\(gl\.TRIANGLES,0,3\)/);
  assert.match(js,/function concentration\(x,y,t\)/);
  assert.match(js,/requestAnimationFrame\(frame\)/);
  assert.match(js,/settings\.steps/);
  assert.doesNotThrow(()=>new Function(
    'gl','canvas','vertexSource','fragmentSource','report','settings',js));
  assert.match(js,/COMPILE_STATUS/);
  assert.match(js,/LINK_STATUS/);
  assert.match(vert,/#version 300 es/);
  assert.match(frag,/textureSize\(u_density,0\)/);
  assert.match(frag,/texelFetch\(u_density,cell,0\)/);
  assert.match(host,/verifiedFCG2Physics/);
  assert.match(host,/lesson === 'FCG2'/);
  assert.match(host,/iframe\.setAttribute\('sandbox', 'allow-scripts'\)/);
  assert.ok(!host.includes('allow-same-origin'));
});
