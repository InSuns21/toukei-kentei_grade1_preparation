import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {
  FCG5_N,FCG5_DT,FCG5_RHO,FCG5_NU,fcg5State,fcg5PixelCell,
  expectedFCG5Samples,compareFCG5Readback
} from './fcg5-lab-core.mjs';

const dir=new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG5/',import.meta.url);
const png8=(x)=>Math.round(255*Math.max(0,Math.min(1,x)));
function mockGL(){
  const textures=[];
  let active=0;
  const gl={
    TEXTURE0:33984,TEXTURE_2D:3553,R8:33321,RED:6403,UNSIGNED_BYTE:5121,
    TEXTURE_MIN_FILTER:10241,TEXTURE_MAG_FILTER:10240,NEAREST:9728,
    TEXTURE_WRAP_S:10242,TEXTURE_WRAP_T:10243,CLAMP_TO_EDGE:33071,
    UNPACK_ALIGNMENT:3317,NO_ERROR:0,VERTEX_SHADER:35633,FRAGMENT_SHADER:35632,
    COMPILE_STATUS:35713,LINK_STATUS:35714,COLOR_BUFFER_BIT:16384,TRIANGLES:4,
    DITHER:3024,BLEND:3042,DEPTH_TEST:2929,CULL_FACE:2884,SCISSOR_TEST:3089,
    _textures:textures,
    createTexture(){return {};},activeTexture(x){active=x-33984;},
    bindTexture(){},pixelStorei(){},texParameteri(){},getError(){return 0;},
    texImage2D(target,level,internal,w,h,border,format,type,bytes){
      assert.equal(w,12);assert.equal(h,12);assert.equal(internal,33321);
      textures[active]=Uint8Array.from(bytes);
    },
    createShader(){return {};},shaderSource(){},compileShader(){},
    getShaderParameter(){return true;},getShaderInfoLog(){return '';},
    createProgram(){return {};},attachShader(){},linkProgram(){},
    getProgramParameter(){return true;},getProgramInfoLog(){return '';},
    deleteShader(){},useProgram(){},getUniformLocation(_p,name){return {name};},
    uniform1i(){},createVertexArray(){return {};},bindVertexArray(){},
    disable(){},viewport(){},clearColor(){},clear(){},drawArrays(){}
  };
  return gl;
}
test('FCG5 stationary field and fixed wall flux are exact invariants',()=>{
  const state=fcg5State(8,{stationary:true});
  assert.equal(state.u.length,(FCG5_N+1)*FCG5_N);
  assert.equal(state.v.length,FCG5_N*(FCG5_N+1));
  assert.equal(state.q.length,FCG5_N*FCG5_N);
  assert.equal(state.wall,0);
  assert.equal(state.divergenceAfter,0);
  assert.equal(state.divergenceBefore,0);
  assert.equal(state.poissonResidual,0);
  assert.equal(state.identityError,0);
  assert.ok(Math.abs(state.mass-0.37)<1e-12);
  assert.ok(state.q.every(v=>Math.abs(v-0.37)<1e-14));
  assert.equal(FCG5_DT,0.04);assert.equal(FCG5_NU,0.002);
  assert.equal(FCG5_RHO,1);
  assert.ok(FCG5_DT*FCG5_NU*FCG5_N**2<0.25);
});
test('FCG5 full split update: nonzero motion, projection identity, extrema, diagnostics',()=>{
  const init=fcg5State(0),s1=fcg5State(1),s8=fcg5State(8),s24=fcg5State(24);
  assert.equal(init.wall,0);
  assert.ok(init.q.some((x,k)=>Math.abs(x-s8.q[k])>1e-5));
  for(const s of [s1,s8,s24]){
    assert.equal(s.wall,0);
    assert.ok(s.divergenceBefore>0);
    assert.ok(s.divergenceAfter<s.divergenceBefore);
    assert.ok(s.divergenceAfter<0.03);
    assert.ok(s.poissonResidual>=0);
    assert.ok(s.identityError<1e-10);
    assert.ok(Math.abs(s.divergenceAfter-s.dt/FCG5_RHO*s.poissonResidual)<1e-10);
    assert.ok(s.mass>0&&s.mass<1);
    assert.ok(s.peak>0&&s.peak<=1);
    assert.ok(s.kinetic>0);
    assert.ok(s.q.every(x=>Number.isFinite(x)&&x>=0&&x<=1));
  }
  assert.ok(Math.abs(s8.mass-init.mass)>1e-8,
    'semi-Lagrangian interpolation must not be advertised as conservative');
  assert.throws(()=>fcg5State(-1),RangeError);
  assert.throws(()=>fcg5State(33),RangeError);
  assert.throws(()=>fcg5State(8,{N:64}),RangeError);
  assert.throws(()=>fcg5State(8,{nu:10}),RangeError);
  assert.throws(()=>fcg5State(8,{dt:0}),RangeError);
});
test('FCG5 physical refinement comparison stays finite, no artificial conservation assertion',()=>{
  const base=fcg5State(4,{dt:0.04}),half=fcg5State(8,{dt:0.02}),
    quarter=fcg5State(16,{dt:0.01});
  const diff=(a,b)=>a.q.reduce((sum,x,i)=>sum+Math.abs(x-b.q[i]),0)/a.q.length;
  assert.ok([base,half,quarter].every(s=>s.wall===0&&s.identityError<1e-10));
  assert.ok(diff(base,half)<0.1);
  assert.ok(diff(half,quarter)<0.1);
});
test('FCG5 real learner JS numerical state equals separately coded CPU oracle before R8 conversion',async()=>{
  const [js,vertex,fragment]=await Promise.all(['fluid.js','fluid.vert','fluid.frag'].map(f=>
    readFile(new URL(f,dir),'utf8')));
  assert.match(vertex,/#version 300 es/);
  assert.match(fragment,/texelFetch\(u_dye/);
  assert.match(fragment,/texelFetch\(u_div/);
  assert.match(fragment,/texelFetch\(u_speed/);
  const execute=new Function('gl','canvas','vertexSource','fragmentSource','report','settings',js);
  for(const steps of [0,1,8,24,32]){
    const gl=mockGL(),logs=[];
    execute(gl,{width:320,height:240},vertex,fragment,(stage,msg)=>logs.push([stage,msg]),{steps});
    const s=fcg5State(steps);
    const sources=[
      Uint8Array.from(s.q,png8),
      Uint8Array.from(s.divergence,v=>png8(Math.abs(v)*80)),
      Uint8Array.from(s.speed,v=>png8(v/0.4))
    ];
    assert.equal(gl._textures.length,3);
    for(let k=0;k<3;k++)assert.deepEqual(gl._textures[k],sources[k],
      'R8 GPU upload matches independent CPU oracle, step '+steps+', texture '+k);
    for(const name of ['TIME','SPLIT','DIVERGENCE','POISSON','IDENTITY','BOUNDARY','DYE','ENERGY','DISPLAY'])
      assert.ok(logs.some(([k])=>k===name));
  }
  assert.throws(()=>execute(mockGL(),{width:320,height:240},vertex,fragment,()=>{},{steps:40}),
    RangeError);
});
test('FCG5 CPU pixel probes, panel mapping and deliberate mismatch',()=>{
  for(const [w,h] of [[320,240],[384,256],[64,64],[1024,512],[1536,512]]){
    for(const steps of [0,1,8,16,32]){
      const expected=expectedFCG5Samples(w,h,steps);
      assert.equal(expected.length,9);
      const measured=expected.map(p=>({x:p.x,y:p.y,rgba:[...p.rgba]}));
      assert.ok(compareFCG5Readback(measured,w,h,steps).every(v=>v.pass));
      measured[0].rgba[0]=(measured[0].rgba[0]+10)%256;
      assert.equal(compareFCG5Readback(measured,w,h,steps)[0].pass,false);
    }
  }
  assert.equal(fcg5PixelCell(0,0,320,240).panel,'dye');
  assert.equal(fcg5PixelCell(319,239,320,240).panel,'speed');
  assert.throws(()=>fcg5PixelCell(320,0,320,240),RangeError);
});
test('FCG5 shared three-tab sandbox, lesson/manifest/TOC and detailed exercises',async()=>{
  const root=new URL('../../',import.meta.url);
  const paths=[
    new URL('wgl-lab-host.mjs',import.meta.url),
    new URL('wgl-lab.html',import.meta.url),
    new URL('index.md',dir),
    new URL('chapter.yaml',dir),
    new URL('knowledge.yaml',dir),
    new URL('textbook/dream-theater-series/FCG.yaml',root),
    new URL('textbook/dream-theater-toc/040_計算系/150_fluid-computer-graphics.md',root)
  ];
  const [host,html,md,chapter,knowledge,manifest,toc]=await Promise.all(paths.map(p=>readFile(p,'utf8')));
  assert.match(host,/lesson === 'FCG5'/);
  assert.match(host,/expectedFCG5Samples/);
  assert.match(host,/fcg5-cpu-prediction/);
  assert.match(host,/fcg5-pick/);
  assert.match(host,/iframe\.setAttribute\('sandbox', 'allow-scripts'\)/);
  assert.ok(!host.includes('allow-same-origin'));
  assert.match(html,/role="tablist"/);
  assert.match(md,/lesson=FCG5/);
  assert.match(md,/prop-fcg5-residual-step/);
  assert.match(chapter,/prerequisites: \[FCG4\]/);
  assert.match(knowledge,/graphics\.fcg4-residual-identity/);
  assert.match(manifest,/id: FCG5,[^\n]*status: completed/);
  assert.match(toc,/FCG5\/index.md/);
  assert.equal((md.match(/- Level: A/g)||[]).length,4);
  assert.equal((md.match(/- Level: B/g)||[]).length,3);
  assert.equal((md.match(/- Level: C/g)||[]).length,1);
  assert.equal((md.match(/<!-- solution-start -->/g)||[]).length,8);
});
