import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {expectedWGL16Samples,compareWGL16Readback,predictWGL16Pixel,wgl16DrawCounts} from './wgl16-lab-core.mjs';

test('WGL16 8x8 grid: draw calls change, vertices and instance bytes do not',()=>{
  assert.deepEqual(wgl16DrawCounts(8),
    {instances:64,loopCalls:64,instancedCalls:1,vertexInvocations:384,instanceBytes:1280,meshBytes:48});
  assert.deepEqual(wgl16DrawCounts(2).instances,4);
  assert.throws(()=>wgl16DrawCounts(17),RangeError);
});
test('WGL16 independent geometry oracle checks disjoint quads and background',()=>{
  const probes=expectedWGL16Samples(320,240);
  assert.equal(probes.length,6);
  assert.deepEqual(probes.map(x=>x.rgba.slice(0,3)),[
    [230,80,40],[40,150,220],[230,80,40],[40,150,220],[12,20,32],[12,20,32]
  ]);
  assert.deepEqual(predictWGL16Pixel(0,0,320,240),[12,20,32,255]);
});
test('WGL16 readback is independent of lab source',()=>{
  const probes=expectedWGL16Samples(320,240);
  const actual=probes.map(p=>({x:p.x,y:p.y,rgba:[...p.rgba]}));
  assert.ok(compareWGL16Readback(actual,320,240).every(r=>r.pass));
  actual[0].rgba[0]=0;
  assert.equal(compareWGL16Readback(actual,320,240)[0].pass,false);
});
test('WGL16 editable sources exercise divisor=1, both draw paths, pixel comparison',async()=>{
  const base=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL16/',import.meta.url);
  const [js,vs,fs,host]=await Promise.all([
    readFile(new URL('instancing.js',base),'utf8'),
    readFile(new URL('instancing.vert',base),'utf8'),
    readFile(new URL('instancing.frag',base),'utf8'),
    readFile(new URL('wgl-lab-host.mjs',import.meta.url),'utf8')]);
  for(const needle of ['gl.vertexAttribDivisor(1,1)','gl.vertexAttribDivisor(2,1)',
    'gl.drawArraysInstanced','gl.drawArrays(gl.TRIANGLES,0,6)',
    'measureAndRead(\'loop\')','measureAndRead(\'instanced\')',
    'mismatchedPixels'])assert.ok(js.includes(needle),needle);
  assert.match(vs,/layout\(location=2\) in vec3 a_color/);
  assert.match(fs,/outColor = vec4\(v_color, 1\.0\)/);
  assert.ok(host.includes('WGL16'));
  assert.ok(host.includes('compareWGL16Readback'));
});
