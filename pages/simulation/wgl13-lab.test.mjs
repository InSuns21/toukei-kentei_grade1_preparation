import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {cubeFaceCoordinates,cubeTexelColor,reflectIncoming,
  expectedWGL13Samples,compareWGL13Readback} from './wgl13-lab-core.mjs';

test('WGL13 six axis directions and face-local orientation',()=>{
  const axis=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
  for(let i=0;i<6;i++) assert.deepEqual(cubeFaceCoordinates(axis[i]),{face:i,s:0.5,t:0.5});
  const tilted=[[1,0.5,0.5],[-1,0.5,-0.5],[-0.5,1,-0.5],
    [-0.5,-1,0.5],[-0.5,0.5,1],[0.5,0.5,-1]];
  for(let i=0;i<6;i++) {
    const c=cubeFaceCoordinates(tilted[i]);
    assert.equal(c.face,i); assert.equal(c.s,0.25); assert.equal(c.t,0.25);
  }
  assert.throws(()=>cubeFaceCoordinates([0,0,0]),RangeError);
  assert.throws(()=>cubeFaceCoordinates([NaN,0,1]),RangeError);
});

test('WGL13 reflect incoming vector, seam contrast and no seam guarantee',()=>{
  assert.deepEqual(reflectIncoming([0,0,-1],[0,0,1]),[0,0,1]);
  assert.deepEqual(reflectIncoming([0,0,-1],[1,0,0]),[0,0,-1]);
  const n=[Math.sqrt(3)/2,0,0.5],r=reflectIncoming([0,0,-1],n);
  assert.ok(Math.abs(r[0]-Math.sqrt(3)/2)<1e-12);
  assert.ok(Math.abs(r[2]+0.5)<1e-12);
  const a=cubeFaceCoordinates([1.001,0,1]),b=cubeFaceCoordinates([1,0,1.001]);
  assert.equal(a.face,0);assert.equal(b.face,4);
  assert.notDeepEqual(cubeTexelColor([1.001,0,1]),cubeTexelColor([1,0,1.001]));
});

test('WGL13 12 independent expected RGBA8 texels and readPixels validation',()=>{
  for(const [width,height] of [[64,64],[320,240],[1024,512]]) {
    const reference=expectedWGL13Samples(width,height);
    assert.equal(reference.length,12);
    assert.deepEqual(reference.map(x=>[x.x,x.y]),Array.from({length:12},(_,i)=>[i,0]));
    assert.deepEqual(reference[0].rgba,[224,48,48,255]);
    assert.deepEqual(reference[4].rgba,[224,48,224,255]);
    assert.deepEqual(reference[6].rgba,[123,26,26,255]);
    const gpu=reference.map(x=>({x:x.x,y:x.y,rgba:[...x.rgba]}));
    assert.ok(compareWGL13Readback(gpu,width,height).every(x=>x.pass));
    gpu[0].rgba[0]--;
    assert.equal(compareWGL13Readback(gpu,width,height)[0].pass,true);
    gpu[0].rgba[0]-=2;
    assert.equal(compareWGL13Readback(gpu,width,height)[0].pass,false);
    assert.equal(compareWGL13Readback(gpu.slice(1),width,height)[0].pass,false);
  }
  assert.throws(()=>expectedWGL13Samples(0,240),RangeError);
});

test('WGL13 lab source, GLSL and lesson router are registered',async()=>{
  const dir=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL13/',import.meta.url);
  const [js,vert,frag,md,host]=await Promise.all([
    ...['environment.js','environment.vert','environment.frag','index.md']
      .map(name=>readFile(new URL(name,dir),'utf8')),
    readFile(new URL('wgl-lab-host.mjs',import.meta.url),'utf8')
  ]);
  assert.ok(vert.startsWith('#version 300 es'));
  assert.ok(frag.startsWith('#version 300 es'));
  for(const key of ['TEXTURE_CUBE_MAP_POSITIVE_X + face','gl.RGBA8','gl.NEAREST',
    'gl.uniform3fv','gl.readPixels(0,0,12,1','gl.disable(gl.DITHER)']) assert.ok(js.includes(key),key);
  assert.match(frag,/textureLod\(u_env,normalize\(u_probeDirections\[k\]\),0\.0\)/);
  assert.match(frag,/incoming-2\.0\*dot\(n,incoming\)\*n/);
  assert.match(host,/const isWGL13 = lesson === 'WGL13'/);
  assert.match(host,/compareWGL13Readback/);
  assert.match(host,/expectedWGL13Samples/);
  assert.match(md,/lesson=WGL13/);
  for(const [level,count] of [['A',5],['B',4],['C',1]])
    assert.equal((md.match(new RegExp('- Level: '+level,'g'))||[]).length,count);
  assert.equal((md.match(/<!-- solution-start -->/g)||[]).length,10);
  assert.equal((md.match(/<!-- solution-end -->/g)||[]).length,10);
});
