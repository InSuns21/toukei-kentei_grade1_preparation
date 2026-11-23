import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
import {fcg3Grid,fcg3Exact} from './fcg3-lab-core.mjs';
import {parametersFor,writeLabParameter,verifiedFCG3Physics} from './wgl-lab-parameters.mjs';

const lesson=new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG3/',import.meta.url);
const files=['advection.js','advection.vert','advection.frag'];
const [js,vertex,fragment]=await Promise.all(files.map(name=>readFile(new URL(name,lesson),'utf8')));
const defaults={js,vertex,fragment};
const specs=parametersFor('FCG3');
const byte=q=>Math.round(255*Math.max(0,Math.min(1,q)));

function executeLearner(source,steps){
  const uploads=[],logs=[];
  const concrete={
    NO_ERROR:0,
    getError:()=>0,
    createTexture:()=>({}),
    createShader:()=>({}),
    createProgram:()=>({}),
    createVertexArray:()=>({}),
    getShaderParameter:()=>true,
    getProgramParameter:()=>true,
    getUniformLocation:()=>({}),
    texImage2D(...args){
      uploads.push({width:args[3],height:args[4],data:Array.from(args[8])});
    }
  };
  const gl=new Proxy(concrete,{
    get(target,key){
      if(key in target)return target[key];
      if(typeof key==='string'&&/^[A-Z0-9_]+$/.test(key))return 1;
      return ()=>{};
    }
  });
  const canvas={
    width:1024,height:512,addEventListener(){},setAttribute(){},tabIndex:0,title:''
  };
  runInNewContext(source,{
    gl,canvas,vertexSource:vertex,fragmentSource:fragment,
    settings:{steps},report:(name,message)=>logs.push([name,message]),
    window:{matchMedia:()=>({matches:true})},
    document:{hidden:false},requestAnimationFrame:()=>{}
  },{timeout:15000});
  return {uploads,logs};
}

test('FCG3 actual edited learner JS computes the same R8 cells as independent CPU on 32/64/96 grids',()=>{
  assert.deepEqual(specs.map(s=>s.id),['radius','grid']);
  for(const N of [32,64,96]){
    for(const radius of [0.14,0.24]){
      let source=writeLabParameter(js,specs[0],radius);
      source=writeLabParameter(source,specs[1],N);
      assert.deepEqual(verifiedFCG3Physics(source,vertex,fragment,defaults),{radius,N});
      for(const steps of [0,16,32]){
        const {uploads,logs}=executeLearner(source,steps);
        assert.equal(uploads.length,2);
        for(const {width,height,data} of uploads){
          assert.equal(width,N);
          assert.equal(height,N);
          assert.equal(data.length,N*N);
        }
        const grid=fcg3Grid(steps,N,radius);
        for(let j=0;j<N;j++)for(let i=0;i<N;i++){
          const k=i+N*j;
          assert.equal(uploads[0].data[k],byte(grid[k]),'numeric N='+N+' k='+k+' step='+steps);
          assert.equal(uploads[1].data[k],
            byte(fcg3Exact((i+.5)/N,(j+.5)/N,steps,radius)),
            'analytic N='+N+' k='+k+' step='+steps);
        }
        const info=new Map(logs);
        assert.match(info.get('GRID'),new RegExp('real '+N+'x'+N+' CPU cells'));
        assert.match(info.get('R8'),new RegExp('each texture '+(N*N)+' bytes'));
      }
    }
  }
});

test('FCG3 shader selects cells from the actual uploaded texture, not a hard-coded 32-cell grid',()=>{
  assert.match(fragment,/textureSize\(u_numeric,0\)/);
  assert.match(fragment,/floor\(cellUv\*vec2\(gridSize\)\)/);
  assert.doesNotMatch(fragment,/cellUv\*32\.0/);
  assert.match(fragment,/texelFetch\(u_numeric,cell,0\)/);
  assert.match(fragment,/texelFetch\(u_exact,cell,0\)/);
});
