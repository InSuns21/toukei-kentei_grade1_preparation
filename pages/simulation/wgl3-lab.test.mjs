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

test('WGL3 live comparison uses the original GPU VAOs and the same editable buffers', async()=>{
  const js=await readFile(new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL3/mesh.js',import.meta.url),'utf8');
  const base=js.indexOf('gl.flush()');
  const live=js.indexOf('setTimeout(() => {');
  assert.ok(base>=0&&live>base,'initial CPU/GPU sample must be rendered before live comparison');
  for(const signal of [
    'const indexedLive = new Float32Array(vertices)',
    'const arraysLive = new Float32Array(expanded)',
    'const focus = n > 1',
    'const firstCopy = indices.indexOf(focus)',
    'const connectedFaces = indices.reduce',
    'arraysLive[2 * firstCopy] -= 0.12 * h',
    'arraysLive[2 * firstCopy + 1] -= 0.50 * h',
    'gl.bufferSubData(gl.ARRAY_BUFFER, 0, indexedLive)',
    'gl.bufferSubData(gl.ARRAY_BUFFER, 0, arraysLive)',
    'gl.drawElements(gl.TRIANGLES, elements.length, gl.UNSIGNED_SHORT, 0)',
    'gl.drawArrays(gl.TRIANGLES, 0, elements.length)',
    'stage.insertAdjacentElement(\'afterend\', controls)',
    'const p = panelPoint(panel, position)',
    'gl.viewport(leftWidth, 0, canvas.width - leftWidth, canvas.height)'
  ]) assert.ok(js.includes(signal),signal);
  assert.ok(!js.includes("canvas.getContext('2d')"),'overlay must follow the true GPU mesh rather than a second model');
  assert.ok(js.length<30000,'editable learner JS must respect sandbox source limit');
  assert.doesNotThrow(()=>new Function('gl','canvas','vertexSource','fragmentSource','report','settings',js));
});

test('WGL3 shared index topology really differs from individual triangle copies',()=>{
  const n=2,indices=[];
  for(let j=0;j<n;j++)for(let i=0;i<n;i++){
    const a=j*(n+1)+i;
    indices.push(a,a+1,a+n+2,a,a+n+2,a+n+1);
  }
  const shared=4;
  const refs=indices.reduce((out,id,k)=>id===shared?out.concat(k):out,[]);
  assert.equal(refs.length,6,'center vertex must belong to six triangles');
  const positions=Array.from({length:(n+1)*(n+1)*2},(_,k)=>k/2);
  const expanded=indices.flatMap(id=>[positions[2*id],positions[2*id+1]]);
  const before=expanded.slice();
  const dx=.3,dy=.2;
  positions[2*shared]+=dx;
  positions[2*shared+1]+=dy;
  for(const k of refs){
    expanded[2*k]=positions[2*shared];
    expanded[2*k+1]=positions[2*shared+1];
  }
  assert.equal(expanded.length,48);
  assert.equal(refs.every(k=>expanded[2*k]===before[2*k]+dx),true);
  expanded[2*refs[0]+1]-=.5;
  assert.equal(expanded[2*refs[0]+1],expanded[2*refs[1]+1]-.5,
    'only one expanded copy moves after detachment; all shared references agree');
});
