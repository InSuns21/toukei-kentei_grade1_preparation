import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {firstPassByte, secondPassByte, expectedWGL10Samples,
  compareWGL10Readback} from './wgl10-lab-core.mjs';

test('WGL10 RGBA8 first-pass rounding precedes inverse filter', () => {
  assert.deepEqual(firstPassByte(false,false),[51,77,102,255]);
  assert.deepEqual(firstPassByte(true,true),[204,179,102,255]);
  assert.deepEqual(secondPassByte([51,77,102,255],true),[204,178,153,255]);
  assert.deepEqual(secondPassByte([204,179,102,255],false),[204,179,102,255]);
});
test('WGL10 CPU oracle covers 8 viewport pixels and resizing', () => {
  for(const [width,height] of [[320,240],[640,360],[64,64],[511,255],[1024,512]]){
    const expected=expectedWGL10Samples(width,height);
    assert.equal(expected.length,8);
    assert.deepEqual(expected[0].rgba,[51,77,102,255]);
    assert.deepEqual(expected[7].rgba,[51,76,153,255]);
    const copied=expected.map(p=>({x:p.x,y:p.y,rgba:[...p.rgba]}));
    assert.ok(compareWGL10Readback(copied,width,height).every(p=>p.pass));
    copied[5].rgba=[0,0,0,255];
    assert.equal(compareWGL10Readback(copied,width,height)[5].pass,false);
    assert.equal(compareWGL10Readback(copied.slice(0,7),width,height)[7].pass,false);
  }
  assert.throws(()=>expectedWGL10Samples(0,240),RangeError);
  assert.throws(()=>expectedWGL10Samples(1024,1024),RangeError);
});
test('WGL10 lesson sources bind/unbind FBO before sampling and check completeness', async () => {
  const folder=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL10/',import.meta.url);
  const [js,vs,fs,host,md]=await Promise.all([
    ...['framebuffer.js','framebuffer.vert','framebuffer.frag'].map(name=>
      readFile(new URL(name,folder),'utf8')),
    readFile(new URL('wgl-lab-host.mjs',import.meta.url),'utf8'),
    readFile(new URL('index.md',folder),'utf8')
  ]);
  for(const signal of ['gl.texImage2D','gl.framebufferTexture2D',
    'gl.checkFramebufferStatus','gl.FRAMEBUFFER_COMPLETE',
    'gl.readPixels','gl.viewport','gl.bindFramebuffer(gl.FRAMEBUFFER, null)',
    'gl.deleteFramebuffer','gl.deleteTexture']){
    assert.ok(js.includes(signal),signal);
  }
  assert.ok(js.indexOf('gl.bindFramebuffer(gl.FRAMEBUFFER, null)') <
    js.indexOf('gl.bindTexture(gl.TEXTURE_2D, colorTexture);\ngl.clearColor'));
  assert.match(vs,/v_uv = 0\.5/);
  assert.match(fs,/texture\(u_scene, v_uv\)/);
  assert.match(fs,/u_pass == 2/);
  assert.match(host,/expectedWGL10Samples/);
  assert.match(host,/compareWGL10Readback/);
  assert.match(host,/iframe\.setAttribute\('sandbox', 'allow-scripts'\)/);
  assert.match(md,/lesson=WGL10/);
});
