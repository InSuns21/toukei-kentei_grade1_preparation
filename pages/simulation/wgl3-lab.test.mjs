import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {gridCounts, expectedWGL3Samples, compareWGL3Readback} from './wgl3-lab-core.mjs';

test('WGL3 square grid: vertices, triangles, indices, bytes and area', () => {
  assert.deepEqual(gridCounts(1), {
    vertices: 4, triangles: 2, references: 6,
    indexedBytes: 44, expandedBytes: 48, area: 1.44
  });
  for (const n of [2,3,4,64,255]) {
    const x = gridCounts(n);
    assert.equal(x.vertices, (n+1)**2);
    assert.equal(x.references, 6*n*n);
    assert.ok(Math.abs(x.area-1.44)<1e-12);
  }
  assert.equal(gridCounts(2).indexedBytes,120);
  assert.equal(gridCounts(2).expandedBytes,192);
  assert.equal(gridCounts(3).indexedBytes,236);
  assert.equal(gridCounts(3).expandedBytes,432);
  assert.throws(()=>gridCounts(256), RangeError);
});
test('WGL3 CPU readback distinguishes inside/outside, resize and wrong colors',()=>{
  for (const [w,h] of [[320,240],[640,480],[64,64],[1024,512]]) {
    const expected = expectedWGL3Samples(w,h);
    assert.deepEqual(expected.map(x=>x.inside),[true,true,false]);
    assert.deepEqual(expected.map(x=>x.rgba), [
      [51,153,204,255],[51,153,204,255],[0,0,0,255]
    ]);
    const values=expected.map(x=>({x:x.x,y:x.y,rgba:[...x.rgba]}));
    assert.ok(compareWGL3Readback(values,w,h).every(x=>x.pass));
    values[1].rgba=[255,0,0,255];
    assert.equal(compareWGL3Readback(values,w,h)[1].pass,false);
  }
});
test('WGL3 actual source implements both VAOs and indexed / expanded drawing', async()=>{
  const root=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL3/',import.meta.url);
  const [js,vert,frag]=await Promise.all(['mesh.js','mesh.vert','mesh.frag']
    .map(name=>readFile(new URL(name,root),'utf8')));
  assert.match(js,/gl\.bindBuffer\(gl\.ELEMENT_ARRAY_BUFFER, ebo\)/);
  assert.match(js,/gl\.drawElements\(gl\.TRIANGLES, indices\.length, gl\.UNSIGNED_SHORT, 0\)/);
  assert.match(js,/gl\.drawArrays\(gl\.TRIANGLES, 0, indices\.length\)/);
  assert.match(js,/indices\.every\(index => index >= 0 && index < vertices\.length \/ 2\)/);
  assert.match(js,/gl\.disable\(gl\.DITHER\)/);
  assert.match(vert,/layout\(location = 0\) in vec2 a_position/);
  assert.match(frag,/vec4\(0\.2, 0\.6, 0\.8, 1\.0\)/);
});

test('WGL3 visual mesh overlay derives faces and counts from uploaded buffers',async()=>{
  const js=await readFile(new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL3/mesh.js',import.meta.url),'utf8');
  for(const marker of ["indices.slice(face*3,face*3+3)","vertices.byteLength+elements.byteLength",
    "expanded.byteLength","point(id)","canvas.insertAdjacentElement('afterend',svg)"]){
    assert.ok(js.includes(marker),marker);
  }
  assert.match(js,/const selected=add\('polygon'/);
  assert.ok(js.includes("n<=12"),'dense mesh grids must not flood the overlay');
});
