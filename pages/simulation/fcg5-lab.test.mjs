import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parametersFor,readLabParameter,writeLabParameter} from './wgl-lab-parameters.mjs';
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
      assert.ok([12,24,36,48].includes(w));assert.equal(w,h);assert.equal(internal,33321);
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
    assert.ok(s.poissonResidual<1e-6);
    assert.ok(s.pressureIterations>0&&s.pressureIterations<=8*s.N);
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
test('FCG5 R1 refined grids retain independent pressure and GPU R8 state',async()=>{
  const [js,vertex,fragment]=await Promise.all(['fluid.js','fluid.vert','fluid.frag']
    .map(name=>readFile(new URL(name,dir),'utf8')));
  const grid=parametersFor('FCG5')[0];
  for(const N of [12,24,36,48]){
    const source=writeLabParameter(js,grid,N);
    const gpu=mockGL();
    new Function('gl','canvas','vertexSource','fragmentSource','report','settings',source)(
      gpu,{width:320,height:240},vertex,fragment,()=>{},{steps:1});
    const cpu=fcg5State(1,{N});
    assert.ok(cpu.poissonResidual<1e-6, 'N='+N);
    assert.ok(cpu.identityError<1e-10);
    assert.equal(cpu.wall,0);
    const panels=[
      Uint8Array.from(cpu.q,png8),
      Uint8Array.from(cpu.divergence,v=>png8(80*Math.abs(v))),
      Uint8Array.from(cpu.speed,v=>png8(v/0.4))
    ];
    for(let k=0;k<3;k++)assert.deepEqual(gpu._textures[k],panels[k],
      'N='+N+', texture '+k);
    assert.ok(compareFCG5Readback(
      expectedFCG5Samples(320,240,1,{N}),320,240,1,2,{N}).every(row=>row.pass));
  }
  assert.throws(()=>fcg5State(1,{N:48,nu:0.003}),RangeError,
    'grid refinement must not bypass explicit viscosity stability');
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


test('FCG5 R1 GUI edits actual grid, viscosity and force in the same source',async()=>{
  const source=await readFile(new URL('fluid.js',dir),'utf8');
  const specs=parametersFor('FCG5');
  assert.deepEqual(specs.map(spec=>spec.id),['grid','nu','force']);
  assert.deepEqual(specs.map(spec=>spec.unit),['セル/辺','m²/s','m²/s²']);
  const targets=[24,0.0025,0.02];
  let changed=source;
  for(let i=0;i<specs.length;i++){
    const spec=specs[i];
    assert.deepEqual(readLabParameter(source,spec),{ok:true,value:spec.default});
    changed=writeLabParameter(changed,spec,targets[i]);
    assert.deepEqual(readLabParameter(changed,spec),{ok:true,value:targets[i]});
    assert.throws(()=>writeLabParameter(source,spec,spec.max+spec.step),RangeError);
    assert.throws(()=>writeLabParameter(source,spec,spec.min+spec.step/2),RangeError);
  }
  assert.match(changed,/const N=24,h=1\/N,dt=0\.04,rho=1,nu=0\.0025,forceAmplitude=0\.02;/);
  assert.match(changed,/const r=dt\*nu\/\(h\*h\)/);
  assert.match(changed,/psi\(i,j\+1,forceAmplitude\)/);
  assert.equal(changed.replace('N=24','N=48').replace('nu=0.0025','nu=0.002')
    .replace('forceAmplitude=0.02','forceAmplitude=0.08'),source);
  for(let i=specs.length-1;i>=0;i--)
    changed=writeLabParameter(changed,specs[i],specs[i].default);
  assert.equal(changed,source);

  const altered=specs.reduce((code,spec,i)=>writeLabParameter(code,spec,targets[i]),source);
  const [vertex,fragment]=await Promise.all(['fluid.vert','fluid.frag']
    .map(f=>readFile(new URL(f,dir),'utf8')));
  const gl=mockGL();
  new Function('gl','canvas','vertexSource','fragmentSource','report','settings',altered)(
    gl,{width:320,height:240},vertex,fragment,()=>{},{steps:8});
  const expected=fcg5State(8,{N:targets[0],nu:targets[1],force:targets[2]});
  const panels=[
    Uint8Array.from(expected.q,png8),
    Uint8Array.from(expected.divergence,v=>png8(Math.abs(v)*80)),
    Uint8Array.from(expected.speed,v=>png8(v/0.4))
  ];
  assert.equal(gl._textures.length,3);
  for(let i=0;i<3;i++)assert.deepEqual(gl._textures[i],panels[i],
    'edited learner JS and independent CPU still agree for texture '+i);
  const probes=expectedFCG5Samples(320,240,8,{N:targets[0],nu:targets[1],force:targets[2]});
  assert.ok(compareFCG5Readback(probes,320,240,8,2,
    {nu:targets[0],force:targets[1]}).every(row=>row.pass));
  assert.ok(compareFCG5Readback(probes,320,240,8).some(row=>!row.pass),
    'the unchanged reference must not be misreported for edited physics');
});
test('FCG5 G2 gives edited expressions and noncanonical declarations precedence',async()=>{
  const source=await readFile(new URL('fluid.js',dir),'utf8');
  const [grid,nu,force]=parametersFor('FCG5');
  const expression=source.replace('nu=0.002','nu=0.001+0.001');
  assert.equal(readLabParameter(expression,nu).ok,false);
  assert.throws(()=>writeLabParameter(expression,nu,0.0025),/JSソース/);
  const duplicate=source+'\n'+source.split('\n').find(line=>line.startsWith('const N=48'));
  assert.equal(readLabParameter(duplicate,nu).ok,false);
  assert.equal(readLabParameter(duplicate,force).ok,false);
  const customGrid=source.replace('const N=48','const N=16');
  assert.equal(readLabParameter(customGrid,grid).ok,false);
  assert.equal(readLabParameter(customGrid,nu).ok,true);
  assert.equal(readLabParameter(customGrid,force).ok,true);
});

test('FCG5 authenticated live-clock handshake reports actual running solver state',async()=>{
  const [learner,host]=await Promise.all([
    readFile(new URL('fluid.js',dir),'utf8'),
    readFile(new URL('./wgl-lab-host.mjs',import.meta.url),'utf8')
  ]);
  assert.match(learner,/function emitProgress\(\)\{/);
  assert.match(learner,/detail:\{step:stateStep,playing\}/);
  assert.match(learner,/canvas\.addEventListener\('fcg5-request-progress',emitProgress\)/);
  assert.match(learner,/canvas\.removeEventListener\('fcg5-request-progress',emitProgress\)/);
  assert.match(host,/canvas\.dispatchEvent\(new Event\('fcg5-request-progress'\)\)/);
  const relay=host.indexOf("canvas.addEventListener('fcg5-physics-progress'");
  const request=host.indexOf("canvas.dispatchEvent(new Event('fcg5-request-progress'))");
  assert.ok(relay>=0&&request>relay,'host must subscribe before requesting real physics state');
  assert.match(host,/send\(\{\.\.\.scope,type:'fcg5-physics-progress',step:d.step,playing:d.playing\}\)/);
  assert.match(host,/data\.session !== active\.session/);
  assert.match(learner,/canvas\.addEventListener\('fcg5-physics-control',onLiveControl\)/);
  assert.match(learner,/event\.detail\?\.action==='toggle'/);
  assert.match(learner,/toggleLivePlayback\(\)/);
  assert.match(host,/liveToggle\.id='fcg5-live-toggle'/);
  assert.match(host,/liveToggle\.addEventListener\('click'/);
  assert.match(host,/m\.session!==scope\.session\|\|m\.requestId!==scope\.requestId/);
  assert.match(host,/canvas\.dispatchEvent\(new CustomEvent\('fcg5-physics-control'/);
});
