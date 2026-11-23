import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {WGL17_VALUES,wgl17EncodeR8,wgl17DecodeR8,
  expectedWGL17Samples,compareWGL17Readback} from './wgl17-lab-core.mjs';
test('8-bit quantization is bounded by half a step',()=>{
  assert.deepEqual(WGL17_VALUES.map(x=>wgl17EncodeR8(x)),[0,45,115,166,204,239,128,255]);
  for(const x of WGL17_VALUES)
    assert.ok(Math.abs(wgl17DecodeR8(wgl17EncodeR8(x))-x)<=2/255+1e-14);
  assert.throws(()=>wgl17EncodeR8(3),RangeError);
});
test('CPU 8 independent texel-centered probes and mismatch',()=>{
  const p=expectedWGL17Samples(320,240);
  assert.equal(p.length,8);
  assert.deepEqual([p[1].x,p[1].y,p[1].rgba],[120,60,[45,51,210,255]]);
  const gpu=p.map(s=>({x:s.x,y:s.y,rgba:[...s.rgba]}));
  assert.ok(compareWGL17Readback(gpu,320,240).every(s=>s.pass));
  gpu[1].rgba[0]=100;
  assert.equal(compareWGL17Readback(gpu,320,240)[1].pass,false);
});
test('GPU source keeps integer sampler, float readback separate from display',async()=>{
  const base=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL17/',import.meta.url);
  const [js,frag]=await Promise.all([readFile(new URL('data-grid.js',base),'utf8'),
    readFile(new URL('data-grid.frag',base),'utf8')]);
  for(const marker of ['gl.R8UI','gl.RED_INTEGER','gl.R32F','gl.RGBA32F',
    'EXT_color_buffer_float','gl.RGBA,gl.FLOAT,actual'])assert.ok(js.includes(marker),marker);
  assert.match(frag,/uniform usampler2D u_integerData/);
  assert.match(frag,/texelFetch\(u_integerData, cell, 0\)/);
  assert.ok(Math.abs(Math.fround(-1.3)+1.3)<1e-6);
  assert.ok(Math.abs(wgl17DecodeR8(wgl17EncodeR8(-1.3))+1.3)>0.005);
});

test('WGL17 always-visible numeric microscope follows the actual uploaded GPU texture',async()=>{
  const js=await readFile(new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL17/data-grid.js',import.meta.url),'utf8');
  for(const marker of ['const probeValue = -1.3;', 'physicalValues[k]', 'bytes[k]', 'floatData[k]',
    'lower+(upper-lower)*bytes[k]/255', 'maxInputError', 'gl.readPixels(p,q,1,1',
    'canvas.after(root)', 'choose(1)', 'gpuFloatValues=actual']) {
    assert.ok(js.includes(marker),marker);
  }
  assert.ok(js.indexOf('canvas.after(root)')>js.indexOf("report('DISPLAY'"),
    'visible microscope must follow the real GPU canvas');
  assert.doesNotMatch(js,/document\.createElement\('details'\)/,
    'the important precision comparison must be visible without expansion');
  assert.ok(js.includes("mode===kind?'#165a96'"),'active texture format highlights its actual error bar');
});
