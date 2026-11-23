import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {firstPassByte, secondPassByte, expectedWGL10Samples,
  compareWGL10Readback} from './wgl10-lab-core.mjs';
import {parametersFor, readLabParameter, writeLabParameter} from './wgl-lab-parameters.mjs';

test('WGL10 RGBA8 quantizes before the inverse filter', () => {
  assert.deepEqual(firstPassByte(false, false), [51, 77, 102, 255]);
  assert.deepEqual(firstPassByte(true, true), [204, 179, 102, 255]);
  assert.deepEqual(secondPassByte([51, 77, 102, 255], true), [204, 178, 153, 255]);
});
test('WGL10 three views sample twelve solid swatches at every supported size', () => {
  for (const [width, height] of [[960,480],[320,240],[640,360],[64,64],[511,255],[1024,512]]) {
    const expected = expectedWGL10Samples(width, height);
    assert.equal(expected.length, 12);
    assert.deepEqual(expected[0].rgba, [51,77,102,255]);
    assert.deepEqual(expected[7].rgba, [204,179,102,255]);
    assert.deepEqual(expected[11].rgba, [51,76,153,255]);
    assert.ok(expected.every(({x,y}) => x>=0 && y>=0 && x<width && y<height));
    const copied = expected.map(p => ({x:p.x, y:p.y, rgba:[...p.rgba]}));
    assert.ok(compareWGL10Readback(copied, width, height).every(p => p.pass));
    copied[9].rgba = [0,0,0,255];
    assert.equal(compareWGL10Readback(copied, width, height)[9].pass, false);
    assert.equal(compareWGL10Readback(copied.slice(0, 11), width, height)[11].pass, false);
  }
  assert.throws(() => expectedWGL10Samples(0,240), RangeError);
  assert.throws(() => expectedWGL10Samples(1024,1024), RangeError);
});
test('WGL10 FBO lifecycle, shared shader, pass labels and actual GUI source', async () => {
  const folder = new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL10/', import.meta.url);
  const [js, vs, fs, host, parameters, md] = await Promise.all([
    ...['framebuffer.js', 'framebuffer.vert', 'framebuffer.frag'].map(name =>
      readFile(new URL(name, folder), 'utf8')),
    readFile(new URL('wgl-lab-host.mjs', import.meta.url), 'utf8'),
    readFile(new URL('wgl-lab-parameters.mjs', import.meta.url), 'utf8'),
    readFile(new URL('index.md', folder), 'utf8')
  ]);
  for (const signal of ['gl.texImage2D', 'gl.framebufferTexture2D',
    'gl.checkFramebufferStatus', 'gl.FRAMEBUFFER_COMPLETE', 'gl.readPixels',
    'gl.viewport', 'gl.bindFramebuffer(gl.FRAMEBUFFER, null)',
    'gl.deleteFramebuffer', 'gl.deleteTexture']) {
    assert.ok(js.includes(signal), signal);
  }
  const unbind = js.indexOf('gl.bindFramebuffer(gl.FRAMEBUFFER, null)');
  assert.ok(unbind > 0 && js.indexOf('gl.bindTexture(gl.TEXTURE_2D, colorTexture)', unbind) > unbind);
  assert.match(vs, /v_uv = 0\.5/);
  assert.match(fs, /texture\(u_scene, v_uv\)/);
  assert.match(fs, /u_pass == 0/);
  assert.match(fs, /u_pass == 2/);
  assert.match(js, /const inspectionPass = 'all'/);
  assert.match(parameters, /WGL10: Object\.freeze/);
  assert.match(host, /expectedWGL10Samples/);
  assert.match(host, /compareWGL10Readback/);
  assert.match(host, /'outColor = vec4\(saved, 1\.0\);'/);
  assert.match(fs, /outColor = vec4\(saved, 1\.0\);/);
  assert.match(host, /iframe\.setAttribute\('sandbox', 'allow-scripts'\)/);
  assert.match(md, /lesson=WGL10/);
});

test('WGL10 controls edit the actual learner JS and can read the edit back', async () => {
  const path = new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL10/framebuffer.js',import.meta.url);
  const original = await readFile(path,'utf8');
  const specs = parametersFor('WGL10');
  assert.deepEqual(specs.map(spec => spec.id),['offscreen-scale','filter-mode','inspection-pass']);
  assert.deepEqual(specs.map(spec => readLabParameter(original,spec)),
    specs.map(spec => ({ok:true,value:spec.default})));
  const edits = [0.5,'grayscale','texture'];
  let source = original;
  for (let i = 0; i < specs.length; i++) source = writeLabParameter(source,specs[i],edits[i]);
  assert.deepEqual(specs.map(spec => readLabParameter(source,spec)),
    edits.map(value => ({ok:true,value})));
  assert.match(source,/const offscreenScale = 0\.5;/);
  assert.match(source,/const filterMode = 'grayscale';/);
  assert.match(source,/const inspectionPass = 'texture';/);
  assert.throws(()=>writeLabParameter(original,specs[0],0.4),RangeError);
});
