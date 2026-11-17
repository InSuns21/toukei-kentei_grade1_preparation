import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {cssToWGL15Pixel,ndcOfWGL15Pixel,cpuPickWGL15Pixel,
  expectedWGL15Samples,compareWGL15Readback} from './wgl15-lab-core.mjs';

test('WGL15 CSS pixels use actual buffer size and lower-left origin',()=>{
  const rect={left:100,top:50,width:400,height:300};
  assert.deepEqual(cssToWGL15Pixel(200,125,rect,800,600),{x:200,y:449});
  assert.deepEqual(cssToWGL15Pixel(300,200,rect,800,600),{x:400,y:299});
  assert.deepEqual(cssToWGL15Pixel(300,200,rect,400,300),{x:200,y:149});
  assert.equal(cssToWGL15Pixel(500,350,rect,800,600),null);
  assert.equal(cssToWGL15Pixel(99,50,rect,800,600),null);
  assert.deepEqual(ndcOfWGL15Pixel(400,299,800,600),[1/800,-1/600]);
  assert.throws(()=>ndcOfWGL15Pixel(800,0,800,600),RangeError);
});
test('WGL15 CPU ray selects nearest panel and preserves empty background',()=>{
  const p=expectedWGL15Samples(320,240);
  assert.deepEqual(p.map(x=>x.id),[1,2,1,0]);
  assert.deepEqual(p.map(x=>x.rgba),[
    [230,70,35,255],[30,150,220,255],[230,70,35,255],[10,18,29,255]
  ]);
  for(const s of p)assert.equal(cpuPickWGL15Pixel(s.x,s.y,320,240).id,s.id);
  assert.equal(cpuPickWGL15Pixel(160,120,320,240).depth,2);
});
test('WGL15 4 GPU display samples compare against independent CPU oracle',()=>{
  for(const [width,height] of [[64,64],[320,240],[1024,512],[400,300]]) {
    const samples=expectedWGL15Samples(width,height)
      .map(({x,y,rgba})=>({x,y,rgba:[...rgba]}));
    assert.ok(compareWGL15Readback(samples,width,height).every(x=>x.pass));
    samples[0].rgba[1]=Math.min(255,samples[0].rgba[1]+3);
    assert.equal(compareWGL15Readback(samples,width,height)[0].pass,false);
  }
});
test('WGL15 real JS/GLSL ID+depth FBO, keyboard/click hooks and routing',async()=>{
  const dir=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL15/',import.meta.url);
  const [js,vs,fs,md,host]=await Promise.all([
    ...['picking.js','picking.vert','picking.frag','index.md']
      .map(file=>readFile(new URL(file,dir),'utf8')),
    readFile(new URL('wgl-lab-host.mjs',import.meta.url),'utf8')
  ]);
  assert.ok(vs.startsWith('#version 300 es'));
  assert.ok(fs.startsWith('#version 300 es'));
  for(const str of ['gl.RGBA8','gl.DEPTH_COMPONENT16','gl.FRAMEBUFFER_COMPLETE',
    'gl.disable(gl.DITHER)','gl.disable(gl.BLEND)','gl.readPixels(x,y','gl.readBuffer(gl.COLOR_ATTACHMENT0)',
    'gl.enable(gl.DEPTH_TEST)','gl.depthFunc(gl.LESS)','pick(x,y)','paintScene()'])
    assert.ok(js.includes(str),str);
  assert.ok(fs.includes('float(v_id)/255.0'));
  assert.match(host,/const isWGL15 = lesson === 'WGL15'/);
  assert.match(host,/expectedWGL15Samples/);
  assert.match(host,/compareWGL15Readback/);
  assert.match(host,/type: 'picking'/);
  assert.match(host,/canvas.addEventListener\('click'/);
  assert.match(host,/canvas.addEventListener\('keydown'/);
  assert.match(md,/lesson=WGL15/);
  for(const [level,count] of [['A',5],['B',4],['C',1]])
    assert.equal((md.match(new RegExp('- Level: '+level,'g'))||[]).length,count);
  assert.equal((md.match(/<!-- solution-start -->/g)||[]).length,10);
});
