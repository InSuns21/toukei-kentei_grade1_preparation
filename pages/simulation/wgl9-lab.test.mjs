import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {normalize3,dot3,correctNormal,wrongNormal,shadeNormal,
  cubeFrontNormal,sphereFrontNormal,expectedWGL9Samples,compareWGL9Readback,
  encodeSrgb, LIGHT} from './wgl9-lab-core.mjs';
const close=(a,b,tol=1e-10)=>assert.ok(Math.abs(a-b)<=tol,a+' != '+b);
test('WGL9 inverse transpose keeps transformed tangents orthogonal',()=>{
  const n=[1/Math.sqrt(2),1/Math.sqrt(2),0];
  const t=[1/Math.sqrt(2),-1/Math.sqrt(2),0];
  const N=correctNormal(n,[2,1,1],0);
  const transformedT=normalize3([2*t[0],t[1],t[2]]);
  close(dot3(N,transformedT),0);
  close(N[0],1/Math.sqrt(5));
  close(N[1],2/Math.sqrt(5));
  assert.ok(Math.abs(dot3(wrongNormal(n,[2,1,1],0),transformedT))>.5);
  assert.throws(()=>correctNormal(n,[1,0,1]),RangeError);
});
test('WGL9 Lambert, Blinn-Phong and zero-light bounds',()=>{
  close(Math.hypot(...LIGHT),1);
  close(dot3([0,0,1],[0,0,1]),1);
  const rgb=shadeNormal([0,0,1],[.1,.45,.75]);
  assert.ok(rgb.slice(0,3).every(x=>x>=0&&x<=1));
  close(encodeSrgb(0),0);
  close(encodeSrgb(1),1);
  assert.deepEqual(shadeNormal([0,0,1],[.1,.45,.75],{power:0}),[0,0,0,1]);
  assert.throws(()=>normalize3([0,0,0]),RangeError);
  assert.throws(()=>shadeNormal([0,0,0],[.1,.45,.75]),RangeError,
    'zero local normal cannot be normalized for lighting');
  const saturated=shadeNormal([0,0,1],[1,1,1],{power:2});
  assert.ok(saturated.every(x=>Math.abs(x-1)<1e-12),
    'linear-light saturation reaches white within floating-point roundoff');
  const a=shadeNormal([1,1,0],[.4,.3,.2]);
  const b=shadeNormal([1,1,0],[.4,.3,.2],{incorrect:true});
  assert.notDeepEqual(a,b);
});
test('WGL9 analytic cube and ellipsoid intersections and 8 pixel oracle',()=>{
  assert.equal(cubeFrontNormal(9,9),null);
  assert.equal(sphereFrontNormal(9,9),null);
  assert.ok(cubeFrontNormal(0,0));
  assert.ok(sphereFrontNormal(0,0));
  for(const [width,height] of [[320,240],[640,480],[64,64],[1024,512],[512,1024]]){
    const expected=expectedWGL9Samples(width,height);
    assert.equal(expected.length,8);
    assert.deepEqual(expected[3].rgba,[5,6,10,255]);
    assert.deepEqual(expected[7].rgba,[5,6,10,255]);
    const readback=expected.map(s=>({x:s.x,y:s.y,rgba:[...s.rgba]}));
    assert.ok(compareWGL9Readback(readback,width,height).every(s=>s.pass));
    readback[4].rgba=[0,0,0,255];
    assert.equal(compareWGL9Readback(readback,width,height)[4].pass,false);
  }
});
test('WGL9 lesson sources / host bridge / edit and readback',async()=>{
  const dir=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL9/',import.meta.url);
  const [js,vert,frag,host,md]=await Promise.all([
    ...['lighting.js','lighting.vert','lighting.frag'].map(p=>readFile(new URL(p,dir),'utf8')),
    readFile(new URL('wgl-lab-host.mjs',import.meta.url),'utf8'),
    readFile(new URL('index.md',dir),'utf8')
  ]);
  for(const s of ['scale.map(x => 1/x)','useCorrectNormals','lightPower','sphereVertices','cubeVertices','gl.readPixels']) {
    assert.ok((js+host).includes(s),s);
  }
  assert.match(vert,/u_normalMatrix \* a_normal/);
  assert.match(frag,/normalize\(v_normal\)/);
  assert.match(frag,/pow\(max\(dot\(N, H\)/);
  assert.match(host,/expectedWGL9Samples/);
  assert.match(host,/compareWGL9Readback/);
  assert.match(host,/iframe\.setAttribute\('sandbox', 'allow-scripts'\)/);
  assert.match(md,/lesson=WGL9/);
});

test('WGL9 moving 3D model rotates positions and inverse-transpose normals together',async()=>{
  const js=await readFile(new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL9/lighting.js',import.meta.url),'utf8');
  const source=js.match(/function rotationPitchScale\(yaw,pitch,\[sx,sy,sz\]\)\{[\s\S]*?\n\}/)?.[0];
  assert.ok(source,"learner's source must contain the actual model rotation");
  const rotation=new Function(source+';return rotationPitchScale;')();
  for(const yaw of [0,.6,-1])for(const pitch of [0,.25,-.5]){
    const m=rotation(yaw,pitch,[2,3,4]);
    const n=rotation(yaw,pitch,[.5,1/3,.25]);
    for(let i=0;i<3;i++)for(let j=0;j<3;j++){
      const dot=m[3*i]*n[3*j]+m[3*i+1]*n[3*j+1]+m[3*i+2]*n[3*j+2];
      assert.ok(Math.abs(dot-(i===j?1:0))<2e-7,[yaw,pitch,i,j,dot].join('/'));
    }
  }
  assert.match(js,/gl\.uniformMatrix3fv\(loc\('u_normalMatrix'\),false,/);
  assert.match(js,/wgl9Draw\(wgl9Phase\)/);
});
