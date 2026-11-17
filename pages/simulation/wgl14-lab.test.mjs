import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {sceneByte,filterByte,reinhardByte,expectedWGL14Samples,
  compareWGL14Readback} from './wgl14-lab-core.mjs';

test('WGL14 3x3 impulse and replicated edge: CPU oracle',()=>{
  assert.equal(sceneByte(3,3),255);
  assert.equal(sceneByte(0,0),90);
  assert.equal(sceneByte(4,3),0);
  for(const [x,y] of [[2,2],[3,3],[4,4],[4,3]])
    assert.equal(filterByte(x,y),28);
  assert.equal(filterByte(5,5),0);
  assert.equal(filterByte(0,0),40); // corner occurs four times in the 3x3 stencil
  assert.equal(filterByte(1,0),20);
  assert.equal(filterByte(1,1),10);
  assert.equal(filterByte(3,3,'edge'),255);
  assert.equal(filterByte(4,3,'edge'),0);
  assert.equal(filterByte(0,0,'edge'),180);
  assert.equal(reinhardByte(255),128);
  assert.equal(reinhardByte(28),25);
  assert.equal(reinhardByte(40),35);
  assert.throws(()=>filterByte(0,0,'unknown'),RangeError);
});
test('WGL14 CPU oracle fixes 7 display probes and tolerances',()=>{
  for(const [width,height] of [[64,64],[320,240],[1024,512]]) {
    const reference=expectedWGL14Samples(width,height);
    assert.deepEqual(reference.map(r=>r.rgba[0]),[255,0,90,25,25,35,0]);
    const sample=reference.map(({x,y,rgba})=>({x,y,rgba:[...rgba]}));
    assert.ok(compareWGL14Readback(sample,width,height).every(p=>p.pass));
    sample[3].rgba[1]+=3;
    assert.equal(compareWGL14Readback(sample,width,height)[3].pass,false);
  }
  assert.throws(()=>expectedWGL14Samples(30,20),RangeError);
});
test('WGL14 lab is wired into routing and uses two FBOs and a real readback',async()=>{
  const dir=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL14/',import.meta.url);
  const [js,vs,fs,md,host]=await Promise.all([
    ...['postprocess.js','postprocess.vert','postprocess.frag','index.md']
      .map(name=>readFile(new URL(name,dir),'utf8')),
    readFile(new URL('wgl-lab-host.mjs',import.meta.url),'utf8')
  ]);
  assert.ok(vs.startsWith('#version 300 es'));
  assert.ok(fs.startsWith('#version 300 es'));
  for(const k of ['gl.RGBA8','gl.FRAMEBUFFER_COMPLETE','gl.NEAREST','gl.CLAMP_TO_EDGE',
    'gl.bindFramebuffer(gl.FRAMEBUFFER,null)','gl.readPixels(3,3','gl.disable(gl.DITHER)'])
    assert.ok(js.includes(k),k);
  assert.match(fs,/texelFetch\(u_source,q,0\)/);
  assert.ok(fs.includes('light/(vec3(1.0)+light)'));
  assert.match(host,/const isWGL14 = lesson === 'WGL14'/);
  assert.match(host,/compareWGL14Readback/);
  assert.match(host,/expectedWGL14Samples/);
  assert.match(md,/lesson=WGL14/);
  for(const [level,count] of [['A',5],['B',4],['C',1]])
    assert.equal((md.match(new RegExp('- Level: '+level,'g'))||[]).length,count);
  assert.equal((md.match(/<!-- solution-start -->/g)||[]).length,10);
});
