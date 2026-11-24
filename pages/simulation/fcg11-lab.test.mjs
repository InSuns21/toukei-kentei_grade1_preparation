import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {fcg11State,expectedFCG11Samples,compareFCG11Readback,FCG11_DEFAULTS} from './fcg11-lab-core.mjs';
import {parametersFor,writeLabParameter} from './wgl-lab-parameters.mjs';
const root=new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG11/',import.meta.url);
test('thresholds, time, radius and finite lifetime',()=>{
 const a=fcg11State();
 assert.ok(a.particles.some(p=>p.kind===1));
 assert.ok(a.particles.some(p=>p.kind===2));
 assert.ok(a.particles.some(p=>p.kind===3));
 for(const o of [{curvatureThreshold:3},{speedThreshold:2.5},{time:1.8}])assert.equal(fcg11State(o).particles.length,0);
 assert.deepEqual(a.particles.map(({x,z,kind})=>({x,z,kind})),fcg11State({radius:0.1}).particles.map(({x,z,kind})=>({x,z,kind})));
 const p=expectedFCG11Samples(960,720);
 assert.ok(compareFCG11Readback(p,960,720).every(s=>s.pass));
 assert.ok(compareFCG11Readback([],960,720).every(s=>!s.pass));
});
test('actual learner JS uploads independent analytic positions for edited parameters',async()=>{
 const src=await readFile(new URL('foam.js',root),'utf8');
 for(const options of [{},{time:0.1},{time:0.6},{time:1.1},{curvatureThreshold:3},{speedThreshold:2.5},{lifetime:0.1},{radius:0.1},{amount:7}]){
  const o={...FCG11_DEFAULTS,...options};let js=src;
  for(const spec of parametersFor('FCG11'))js=writeLabParameter(js,spec,o[spec.id]);
  let buffer,count;
  const gl=new Proxy({uniform4fv:(_,a)=>{buffer=Array.from(a);},uniform1i:(_,n)=>{count=n;},
    getShaderParameter:()=>true,getProgramParameter:()=>true,getUniformLocation:(_,n)=>n},
    {get:(target,key)=>target[key]??(()=>({}))});
  vm.runInNewContext(js,{gl,canvas:{width:960,height:720},vertexSource:'',fragmentSource:'',report:()=>{}});
  const state=fcg11State(o);
  assert.equal(count,state.particles.length);
  state.particles.forEach((p,i)=>[p.x,p.z,p.r,p.kind].forEach((v,k)=>assert.ok(Math.abs(v-buffer[4*i+k])<1e-6)));
 }
});
