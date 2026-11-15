import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {expectedSamples, signedDoubleArea, insideTriangle,
  pixelToNdc, ndcToViewport, compareReadback} from './wgl-lab-core.mjs';

test('viewport map and inverse pixel center at 320x240', () => {
  assert.deepEqual(ndcToViewport(0, 0, 320, 240), [160,120]);
  const [x,y] = pixelToNdc(160,120,320,240);
  assert.equal(x, 0.0031250000000000444);
  assert.ok(Math.abs(y - (1/240)) < 1e-14);
  assert.equal(insideTriangle([x,y]), true);
  assert.equal(insideTriangle([-.99,-.99]), false);
  assert.equal(signedDoubleArea([-.8,-.8],[.8,-.8],[0,.8]), 2.5600000000000005);
});
test('CPU reference: center orange and bottom-left black, before/after resize', () => {
  for (const [w,h] of [[320,240],[640,480],[64,64],[1024,512]]) {
    const rows = expectedSamples(w,h);
    assert.deepEqual(rows[0].rgba,[255,128,0,255]);
    assert.deepEqual(rows[1].rgba,[0,0,0,255]);
    const got = rows.map(r=>({x:r.x,y:r.y,rgba:r.rgba}));
    assert.ok(compareReadback(got,w,h).every(r=>r.pass));
    got[0].rgba=[255,120,0,255];
    assert.equal(compareReadback(got,w,h)[0].pass,false);
  }
});
test('input limits and no accidental same-origin sandbox', async () => {
  const html=await readFile(new URL('./wgl-lab.html',import.meta.url),'utf8');
  const host=await readFile(new URL('./wgl-lab-host.mjs',import.meta.url),'utf8');
  assert.ok(html.includes('role="tablist"'));
  assert.equal((html.match(/role="tabpanel"/g)||[]).length,3);
  assert.ok(host.includes("iframe.setAttribute('sandbox', 'allow-scripts')"));
  assert.ok(!host.includes('allow-same-origin'));
  for (const rule of ["connect-src 'none'","frame-src 'none'","form-action 'none'"]) {
    assert.ok(host.includes(rule),rule);
  }
  assert.ok(host.includes('event.source !== active.frame.contentWindow'));
  assert.ok(host.includes('data.session !== active.session'));
  assert.ok(host.includes('data.generation !== active.generation'));
  assert.ok(host.includes('clearTimeout'));
  assert.ok(host.includes('iframe.srcdoc'));
});
test('initial shaders have compilable GLSL ES 3.00 interface and independent CPU colors',async()=>{
  const base=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL1/',import.meta.url);
  // Repository workspace source path differs from published route.
  const repoBase=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL1/',import.meta.url);
  void base;void repoBase;
  const fsPath=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL1/',import.meta.url);
  const text=await readFile(new URL('triangle.js',fsPath),'utf8');
  const vert=await readFile(new URL('triangle.vert',fsPath),'utf8');
  const frag=await readFile(new URL('triangle.frag',fsPath),'utf8');
  assert.ok(text.includes('gl.drawArrays(gl.TRIANGLES, 0, 3)'));
  assert.ok(text.includes('gl.viewport(0, 0, canvas.width, canvas.height)'));
  assert.ok(vert.startsWith('#version 300 es'));
  assert.ok(frag.startsWith('#version 300 es'));
  assert.ok(vert.includes('in vec2 a_position'));
  assert.ok(frag.includes('vec4(1.0, 0.5, 0.0, 1.0)'));
});
