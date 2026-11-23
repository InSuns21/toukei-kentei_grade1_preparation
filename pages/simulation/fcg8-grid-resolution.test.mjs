import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fcg8State,expectedFCG8Samples,compareFCG8Readback} from './fcg8-lab-core.mjs';
import {parametersFor,readLabParameter,writeLabParameter,verifiedFCG8Physics} from './wgl-lab-parameters.mjs';

const directory=new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG8/',import.meta.url);
const [js,vertex,fragment]=await Promise.all(
  ['levelset.js','levelset.vert','levelset.frag'].map(name=>readFile(new URL(name,directory),'utf8')));
const defaults={js,vertex,fragment};
const specs=parametersFor('FCG8');
const encode=value=>Math.round(255*Math.max(0,Math.min(1,0.5+2*value)));

function execute(source,steps){
  const uploads=[],logs=[];
  const concrete={
    NO_ERROR:0,
    createTexture:()=>({}),
    createShader:()=>({}),
    createProgram:()=>({}),
    createVertexArray:()=>({}),
    getError:()=>0,
    getShaderParameter:()=>true,
    getProgramParameter:()=>true,
    getUniformLocation:()=>({}),
    texImage2D(...args){uploads.push({N:args[3],height:args[4],data:Array.from(args[8])});}
  };
  const gl=new Proxy(concrete,{get(obj,key){
    if(key in obj)return obj[key];
    if(typeof key==='string'&&/^[A-Z0-9_]+$/.test(key))return 1;
    return ()=>{};
  }});
  const canvas={width:1536,height:512,dispatchEvent(){},addEventListener(){}};
  const run=new Function('gl','canvas','vertexSource','fragmentSource','report','settings',source);
  const hooks=run(gl,canvas,vertex,fragment,(name,value)=>logs.push([name,value]),{steps});
  return {uploads,logs,hooks};
}

test('FCG8 G2 parameters edit the one actual learner solver, with strict source verification',()=>{
  assert.deepEqual(specs.map(item=>item.id),['grid','shear','redistance']);
  assert.deepEqual(verifiedFCG8Physics(js,vertex,fragment,defaults),
    {N:48,shear:0.6,redistanceIterations:6});
  let edited=js;
  for(const [id,value] of [['grid',96],['shear',1],['redistance',0]]){
    edited=writeLabParameter(edited,specs.find(item=>item.id===id),value);
  }
  assert.deepEqual(verifiedFCG8Physics(edited,vertex,fragment,defaults),
    {N:96,shear:1,redistanceIterations:0});
  assert.equal(readLabParameter(edited,specs[0]).value,96);
  assert.equal(verifiedFCG8Physics(edited.replace('const maxSteps=96','const maxSteps=95'),
    vertex,fragment,defaults),null);
  assert.equal(verifiedFCG8Physics(edited,vertex,fragment+'\n',defaults),null);
  assert.equal(verifiedFCG8Physics(edited.replace('N=96','N=48+48'),
    vertex,fragment,defaults),null);
  assert.throws(()=>writeLabParameter(js,specs[0],72),/範囲と刻み/);
  assert.throws(()=>writeLabParameter(js,specs[1],1.3),/範囲と刻み/);
  assert.throws(()=>writeLabParameter(js,specs[2],7),/範囲と刻み/);
  assert.match(fragment,/textureSize\(u_raw,0\)/);
  assert.doesNotMatch(fragment,/xy\*48\.0|vec2\(47\.0\)/);
});

test('FCG8 editable 48/64/80/96 grids agree with independently calculated full R8 level-set fields',()=>{
  for(const {N,shear,redistanceIterations,steps} of [
    {N:48,shear:0.6,redistanceIterations:6,steps:8},
    {N:64,shear:0,redistanceIterations:0,steps:8},
    {N:80,shear:0.8,redistanceIterations:8,steps:4},
    {N:96,shear:1,redistanceIterations:2,steps:8}
  ]){
    let source=js;
    for(const [id,value] of Object.entries({grid:N,shear,redistance:redistanceIterations})){
      source=writeLabParameter(source,specs.find(spec=>spec.id===id),value);
    }
    assert.deepEqual(verifiedFCG8Physics(source,vertex,fragment,defaults),
      {N,shear,redistanceIterations});
    const {uploads,logs,hooks}=execute(source,steps);
    assert.equal(uploads.length,2);
    const state=fcg8State(steps,{N,shear,redistanceIterations});
    for(const [i,expected] of [state.raw,state.reinit].entries()){
      assert.equal(uploads[i].N,N);assert.equal(uploads[i].height,N);
      assert.equal(uploads[i].data.length,N*N);
      for(let k=0;k<N*N;k++){
        assert.ok(Math.abs(uploads[i].data[k]-encode(expected[k]))<=1,
          'N='+N+' shear='+shear+' reinit='+redistanceIterations+' field='+i+' index='+k);
      }
    }
    const log=new Map(logs);
    assert.match(log.get('TIME'),new RegExp(N+'x'+N+' cell centers'));
    assert.match(log.get('DISPLAY'),new RegExp(redistanceIterations+' redistance iterations'));
    assert.equal(typeof hooks.step,'function');
    assert.ok(state.rawMetric.area>0&&state.reinitMetric.area>0);
    const samples=expectedFCG8Samples(1536,512,steps,{N,shear,redistanceIterations});
    assert.equal(samples.length,13);
    assert.ok(compareFCG8Readback(samples,1536,512,steps,2,{N,shear,redistanceIterations})
      .every(item=>item.pass));
  }
  assert.throws(()=>fcg8State(1,{N:128}),/supported range/);
  assert.throws(()=>fcg8State(1,{N:48,shear:2}),/supported range/);
});
