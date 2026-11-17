import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {LIGHT_RAY, RECEIVERS, hitsBox, expectedWGL11Samples,
  compareWGL11Readback} from './wgl11-lab-core.mjs';

test('WGL11 independent CPU ray-box oracle distinguishes shadow and light', () => {
  assert.deepEqual(LIGHT_RAY,[.5,.25,1]);
  assert.deepEqual(RECEIVERS.map(({p})=>hitsBox(p)),[true,false,false,false]);
  assert.equal(hitsBox([-.75,-.25,0]),true);
  assert.equal(hitsBox([1.25,1.10,0]),false);
  assert.equal(hitsBox([0,0,1.1]),false);
  assert.equal(hitsBox([-1.5,1.5,0]),false);
  assert.equal(hitsBox([2,0,0],[0,0,1]),false);
  assert.equal(hitsBox([0,0,2],[0,0,-1]),true);
  assert.throws(()=>hitsBox([Infinity,0,0]),RangeError);
});

test('WGL11 samples cover four fixed pixels across size changes', () => {
  for(const [width,height] of [[320,240],[640,360],[64,64],[511,255],[1024,512]]){
    const expected=expectedWGL11Samples(width,height);
    assert.deepEqual(expected.map(p=>[p.x,p.y]),[[0,0],[1,0],[2,0],[3,0]]);
    assert.deepEqual(expected[0].rgba,[0,0,0,255]);
    assert.deepEqual(expected.slice(1).map(p=>p.rgba),
      Array.from({length:3},()=>[255,255,255,255]));
    const gpu=expected.map(p=>({x:p.x,y:p.y,rgba:[...p.rgba]}));
    assert.ok(compareWGL11Readback(gpu,width,height).every(p=>p.pass));
    gpu[0].rgba=[255,255,255,255];
    assert.equal(compareWGL11Readback(gpu,width,height)[0].pass,false);
    assert.equal(compareWGL11Readback(gpu.slice(1),width,height)[0].pass,false);
  }
  assert.throws(()=>expectedWGL11Samples(0,240),RangeError);
  assert.throws(()=>expectedWGL11Samples(1024,1024),RangeError);
});

test('WGL11 depth pass, framebuffer separation, source editor and chapter agree', async () => {
  const folder=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL11/',import.meta.url);
  const [js,vert,frag,host,md]=await Promise.all([
    ...['shadow.js','shadow.vert','shadow.frag'].map(name=>readFile(new URL(name,folder),'utf8')),
    readFile(new URL('wgl-lab-host.mjs',import.meta.url),'utf8'),
    readFile(new URL('index.md',folder),'utf8')
  ]);
  for(const marker of ['gl.DEPTH_COMPONENT24','gl.DEPTH_ATTACHMENT','gl.drawBuffers([gl.NONE])',
    'gl.readBuffer(gl.NONE)','gl.FRAMEBUFFER_COMPLETE','gl.readPixels',
    'gl.bindFramebuffer(gl.FRAMEBUFFER,null)','gl.viewport(0,0,4,1)',
    'gl.deleteFramebuffer(fbo)','gl.deleteTexture(depthTexture)']){
    assert.ok(js.includes(marker),'missing '+marker);
  }
  assert.ok(js.indexOf('gl.bindFramebuffer(gl.FRAMEBUFFER,null)') <
    js.indexOf('gl.bindTexture(gl.TEXTURE_2D,depthTexture);\ngl.viewport(0,0,canvas.width'));
  assert.match(vert,/u_mvp \* vec4\(a_position, 1\.0\)/);
  assert.match(frag,/q\.z - u_bias <= nearestDepth/);
  assert.match(frag,/u_pass == 2/);
  assert.match(host,/expectedWGL11Samples/);
  assert.match(host,/compareWGL11Readback/);
  assert.match(host,/iframe\.setAttribute\('sandbox', 'allow-scripts'\)/);
  assert.match(md,/lesson=WGL11/);
  for(const level of ['A','B','C']){
    assert.ok(md.includes('- Level: '+level));
  }
});
