import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {BACK,A,B,decodeSrgb,encodeSrgb,sourceOver,linearSourceOver,
  expectedAt,expectedWGL8Samples,compareWGL8Readback} from './wgl8-lab-core.mjs';
const near=(a,b,tol=1e-9)=>assert.ok(Math.abs(a-b)<=tol,a+' vs '+b);
test('WGL8 sRGB decoding and re-encoding, including piecewise thresholds',()=>{
  for(const x of [0,.02,.04045,.1,.2,.5,.9,1])near(encodeSrgb(decodeSrgb(x)),x,1e-7);
  near(encodeSrgb(.5),.7353569830524495,1e-9);
  assert.throws(()=>decodeSrgb(-.1),RangeError);
});
test('WGL8 straight alpha, premultiplied calculation and order',()=>{
  const c=sourceOver(A,B);
  near(c[3],.7); // .5 + .5*.4
  near(c[0],(.5*.8+.5*.4*.1)/.7);
  const p=expectedAt(.55,.5,false);
  near(p[0],.34);near(p[1],.24);near(p[2],.45);
  assert.notDeepEqual(expectedAt(.55,.5,false,true),p);
  assert.ok(linearSourceOver(A,B)[0]>sourceOver(A,B)[0]);
  near(expectedAt(.05,.05,false)[0],BACK[0]);
});
test('WGL8 expected color probes and mismatch detection',()=>{
  for(const [w,h] of [[320,240],[640,480],[64,64],[1024,512],[512,1024]]) {
    const expected=expectedWGL8Samples(w,h);
    assert.equal(expected.length,8);
    assert.deepEqual(expected[0].rgba,[51,51,51,255]);
    assert.deepEqual(expected[4].rgba,[51,51,51,255]);
    assert.deepEqual(expected[3].rgba,[87,61,115,255]);
    assert.deepEqual(expected[7].rgba,[122,63,155,255]);
    const actual=expected.map(v=>({x:v.x,y:v.y,rgba:[...v.rgba]}));
    assert.ok(compareWGL8Readback(actual,w,h).every(v=>v.pass));
    actual[3].rgba[0]=0;
    assert.equal(compareWGL8Readback(actual,w,h)[3].pass,false);
  }
});
test('WGL8 real source files, sandbox and editing bridge',async()=>{
  const dir=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL8/',import.meta.url);
  const [js,vs,fs,host,md]=await Promise.all([
    ...['blending.js','blending.vert','blending.frag'].map(p=>readFile(new URL(p,dir),'utf8')),
    readFile(new URL('wgl-lab-host.mjs',import.meta.url),'utf8'),
    readFile(new URL('index.md',dir),'utf8')
  ]);
  assert.match(js,/blendFuncSeparate/);
  assert.match(js,/gl\.disable\(gl\.BLEND\)/);
  assert.match(js,/reverseOrder/);
  assert.match(fs,/toLinear/);
  assert.match(fs,/u_reverse/);
  assert.match(vs,/out vec2 v_uv/);
  for(const s of ['expectedWGL8Samples','compareWGL8Readback',"'WGL8'"])
    assert.ok(host.includes(s),s);
  assert.match(host,/iframe\.setAttribute\('sandbox', 'allow-scripts'\)/);
  assert.match(md,/lesson=WGL8/);
});
