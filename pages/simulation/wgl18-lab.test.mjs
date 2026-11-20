import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {stepWGL18,expectedWGL18Grid,expectedWGL18Samples,
  compareWGL18Readback,compareWGL18FloatReadback} from './wgl18-lab-core.mjs';

test('one-step five-point stencil and no-flux boundary mass',()=>{
  const z=expectedWGL18Grid(0.2,1);
  assert.ok(Math.abs(z[5]-0.2)<1e-12);
  for(const k of [1,4,6,9])assert.equal(z[k],0.2);
  assert.ok(Math.abs(z.reduce((a,b)=>a+b,0)-1)<1e-12);
  const two=expectedWGL18Grid();
  const expected=[0.08,0.12,0.08,0,0.12,0.2,0.08,0.04,
    0.08,0.08,0.08,0,0,0.04,0,0];
  for(let k=0;k<16;k++)assert.ok(Math.abs(two[k]-expected[k])<1e-12,k+' mismatch');
  assert.ok(Math.abs(two.reduce((a,b)=>a+b,0)-1)<1e-12);
});
test('mass constant for arbitrary initial field, positivity requires r<=1/4',()=>{
  let values=Array.from({length:16},(_,i)=>i/16);
  const initial=values.reduce((s,v)=>s+v,0);
  for(let n=0;n<20;n++)values=stepWGL18(values,0.2);
  assert.ok(Math.abs(values.reduce((s,v)=>s+v,0)-initial)<1e-12);
  assert.ok(values.every(v=>v>=0&&v<=15/16));
  const impulse=Array(16).fill(0);impulse[5]=1;
  const unstable=stepWGL18(impulse,0.3);
  assert.ok(Math.abs(unstable[5]+0.2)<1e-12);
  assert.ok(Math.abs(unstable.reduce((s,v)=>s+v,0)-1)<1e-12);
  assert.throws(()=>expectedWGL18Grid(0.3,1),RangeError);
});
test('CPU oracle checks 16 independent display probes and float array',()=>{
  for(const [width,height] of [[320,240],[64,64],[640,480]]){
    const expected=expectedWGL18Samples(width,height);
    assert.equal(expected.length,16);
    assert.equal(expected[5].value,expectedWGL18Grid()[5]);
    const samples=expected.map(p=>({x:p.x,y:p.y,rgba:[...p.rgba]}));
    assert.ok(compareWGL18Readback(samples,width,height).every(x=>x.pass));
    samples[4].rgba[0]=255;
    assert.equal(compareWGL18Readback(samples,width,height)[4].pass,false);
  }
  const expected=expectedWGL18Grid();
  assert.equal(compareWGL18FloatReadback(expected).pass,true);
  assert.equal(compareWGL18FloatReadback(expected.map((v,i)=>i===5?v+0.01:v)).pass,false);
  assert.equal(compareWGL18FloatReadback(null).valid,false);
  assert.equal(compareWGL18FloatReadback(expectedWGL18Grid(0.1,3),0.1,3).pass,true);
  assert.equal(compareWGL18FloatReadback(expectedWGL18Grid(0.1,3),0.2,2).pass,false);
});
test('real editable GPU sources isolate float state and display',async()=>{
  const base=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL18/',import.meta.url);
  const [js,frag,vert,host]=await Promise.all([
    ...['diffusion.js','diffusion.frag','diffusion.vert'].map(p=>readFile(new URL(p,base),'utf8')),
    readFile(new URL('wgl-lab-host.mjs',import.meta.url),'utf8')]);
  for(const key of ['EXT_color_buffer_float','gl.RGBA32F','gl.framebufferTexture2D',
      'gl.readPixels(0,0,N,N,gl.RGBA,gl.FLOAT,raw)','const destination=1-active',
      'gl.bindTexture(gl.TEXTURE_2D,textures[active])'])
    assert.ok(js.includes(key),key);
  assert.match(frag,/texelFetch\(u_state, q, 0\)/);
  assert.match(frag,/u_stage == 0/);
  assert.ok(vert.startsWith('#version 300 es'));
  for(const key of ['compareWGL18FloatReadback','expectedWGL18Samples',
      "request.lesson === 'WGL18'",'isWGL18'])
    assert.ok(host.includes(key),key);
});


test('live WebGL18 draws the SAME edited GPU state after initial independent probes',async()=>{
  const base=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL18/',import.meta.url);
  const [js,frag,md]=await Promise.all(['diffusion.js','diffusion.frag','index.md']
    .map(file=>readFile(new URL(file,base),'utf8')));
  assert.doesNotThrow(()=>new Function('gl','canvas','vertexSource','fragmentSource','report','settings',js));
  assert.match(js,/function advanceDiffusionStep\(n\)\{/);
  assert.match(js,/for\(let n=0;n<steps;n\+\+\)advanceDiffusionStep\(n\)/);
  assert.match(js,/advanceDiffusionStep\(stepNumber\)/);
  assert.match(js,/const destination=1-active/);
  assert.match(js,/gl\.bindFramebuffer\(gl\.FRAMEBUFFER,fbos\[destination\]\)/);
  assert.match(js,/gl\.bindTexture\(gl\.TEXTURE_2D,textures\[active\]\)/);
  const oracle=js.indexOf('const floatValues='),live=js.indexOf('function advanceLive(){');
  assert.ok(oracle>0 && live>oracle,'live frames must follow original float oracle');
  assert.match(js,/gl\.uniform1i\(uStage,2\)/);
  assert.match(js,/gl\.texSubImage2D\(gl\.TEXTURE_2D,0,0,0,N,N,gl\.RGBA,gl\.FLOAT,input\)/);
  assert.match(js,/MAX_STEP=24/);
  assert.match(js,/prefers-reduced-motion: reduce/);
  assert.match(js,/document\.hidden/);
  assert.match(js,/requestAnimationFrame\(frame\)/);
  assert.match(js,/pagehide.*cancelAnimationFrame\(raf\)/);
  assert.match(js,/event\.key==='ArrowRight'/);
  assert.match(js,/event\.key==='r'/);
  assert.match(frag,/u_stage == 0/);
  assert.match(frag,/u_stage == 2/);
  assert.match(frag,/float side = min\(u_targetSize\.x,u_targetSize\.y\)/);
  assert.match(frag,/outColor=vec4\(0\.035,0\.05,0\.085,1\.0\)/);
  assert.match(md,/初期独立検算は/);
  assert.equal(expectedWGL18Grid(0.2,2).reduce((a,c)=>a+c,0).toFixed(10),'1.0000000000');
});
