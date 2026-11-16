import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {SCREEN_TRIANGLE,barycentricAt,perspectiveWeights,interpolateUv,
  ndcInViewport,expectedWGL6Samples,compareWGL6Readback} from './wgl6-lab-core.mjs';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,a+' != '+b);

test('WGL6 barycentric reconstruction, edges, and winding reversal',()=>{
  const [a,b,c]=SCREEN_TRIANGLE;
  const point=[-.1875,-.2875];
  const lambda=barycentricAt(point);
  lambda.forEach((value,i)=>near(value,[.5,.25,.25][i]));
  near(lambda.reduce((sum,v)=>sum+v,0),1);
  const reverse=barycentricAt(point,[a,c,b]);
  near(reverse[0],.5);near(reverse[1],.25);near(reverse[2],.25);
  const edge=barycentricAt(a.map((x,i)=>(x+b[i])/2));
  near(edge[2],0);
  assert.ok(barycentricAt([0,-.9]).some(x=>x<0));
  assert.throws(()=>barycentricAt([0,0],[[0,0],[1,1],[2,2]]),RangeError);
});
test('WGL6 exact perspective-correct weights and equal-w limit',()=>{
  const lam=[.5,.25,.25];
  const alpha=perspectiveWeights(lam);
  [8/11,2/11,1/11].forEach((v,i)=>near(alpha[i],v));
  const uv=interpolateUv(lam,'perspective');
  near(uv[0],2/11);near(uv[1],1/11);
  near(interpolateUv(lam,'affine')[0],.25);
  near(interpolateUv(lam,'affine')[1],.25);
  perspectiveWeights(lam,[3,3,3]).forEach((v,i)=>near(v,lam[i]));
  assert.throws(()=>perspectiveWeights(lam,[1,0,4]),RangeError);
  assert.throws(()=>perspectiveWeights([.5,-.2,.7]),RangeError);
});
test('WGL6 eight CPU pixel predictions for two viewports, any supported size',()=>{
  for(const [w,h] of [[320,240],[640,480],[64,64],[1024,512],[512,1024]]){
    const samples=expectedWGL6Samples(w,h);
    assert.equal(samples.length,8);
    assert.deepEqual(samples.filter(r=>r.label.endsWith('背景')).map(r=>r.rgba),
      [[0,0,0,255],[0,0,0,255]]);
    assert.ok(samples.filter(r=>!r.label.endsWith('背景')).every(r=>r.inside));
    assert.notDeepEqual(samples[0].rgba,samples[4].rgba);
    const gpu=samples.map(({x,y,rgba})=>({x,y,rgba:[...rgba]}));
    assert.ok(compareWGL6Readback(gpu,w,h).every(r=>r.pass));
    gpu[0].rgba=[255,255,255,255];
    assert.equal(compareWGL6Readback(gpu,w,h)[0].pass,false);
  }
  near(ndcInViewport(0,0,0,160,240)[0],-1+1/160);
});
test('WGL6 actual editable sources and isolated three-tab integration exist',async()=>{
  const base=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL6/',import.meta.url);
  const [js,vert,frag]=await Promise.all(
    ['interpolation.js','interpolation.vert','interpolation.frag']
      .map(f=>readFile(new URL(f,base),'utf8')));
  const host=await readFile(new URL('./wgl-lab-host.mjs',import.meta.url),'utf8');
  assert.match(js,/gl\.viewport\(x,0,width,canvas\.height\)/);
  assert.match(js,/gl\.drawArrays\(gl\.TRIANGLES,0,3\)/);
  assert.match(js,/gl\.frontFace\(gl\.CCW\)/);
  assert.match(js,/gl\.uniform4f\(uViewport,x,0,width,canvas\.height\)/);
  assert.match(vert,/gl_Position = a_clip/);
  assert.match(vert,/out vec2 v_uv/);
  assert.match(frag,/in vec2 v_uv/);
  assert.match(frag,/gl_FragCoord\.xy/);
  assert.match(frag,/u_mode == 0 \? v_uv : vec2\(lambda\.y, lambda\.z\)/);
  for(const symbol of ['expectedWGL6Samples','compareWGL6Readback',"lesson === 'WGL6'"])
    assert.ok(host.includes(symbol),symbol);
  assert.ok(host.includes("iframe.setAttribute('sandbox', 'allow-scripts')"));
});
