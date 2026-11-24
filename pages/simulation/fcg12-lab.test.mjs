import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {fcg12State,expectedFCG12Samples,compareFCG12Readback,FCG12_DEFAULTS} from './fcg12-lab-core.mjs';
import {parametersFor,writeLabParameter} from './wgl-lab-parameters.mjs';
const root=new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG12/',import.meta.url);
test('learner scatter and independent gather agree over all cells; closed tank, positive depth, rest',async()=>{
 const src=await readFile(new URL('shallow.js',root),'utf8');
 const code=src.split('// RENDER:')[0];
 for(const options of [{},{N:20},{N:60},{bump:0},{time:0},{time:3,N:60,baseDepth:0.1,maxDt:0.1,cfl:0.45},{time:0.5,maxDt:0.01},{baseDepth:0.5,bump:0.5}]){
  const o={...FCG12_DEFAULTS,...options};let js=code;
  for(const spec of parametersFor('FCG12'))js=writeLabParameter(js,spec,o[spec.id]);
  const result=vm.runInNewContext(js+'\n;({U:Array.from(U),t,steps,initialVolume,volume:volume(U),minDepth,maxDepth,maxSpeed,largestCourant})',{report:()=>{}});
  const z=fcg12State(o);
  assert.equal(result.steps,z.steps);
  assert.ok(Math.abs(result.t-o.time)<1e-10);
  assert.ok(Math.abs(result.volume-result.initialVolume)<1e-8);
  assert.ok(Math.abs(result.initialVolume-(400*o.baseDepth+36*o.bump))<1e-8);
  assert.ok(result.minDepth>0&&result.largestCourant<=o.cfl+1e-12);
  z.A.forEach((q,i)=>q.forEach((v,k)=>assert.ok(Math.abs(result.U[3*i+k]-v)<1e-10)));
  if(o.bump===0){assert.ok(Math.abs(result.maxDepth-o.baseDepth)<1e-12);assert.ok(result.maxSpeed<1e-12);}
 }
});
test('refinement comparison at a fixed time, not a claim of exact solution',()=>{
 const coarse=fcg12State({N:20,time:0.5}),fine=fcg12State({N:40,time:0.5}),finer=fcg12State({N:60,time:0.5});
 function error(s){
  const k=s.N/20;let err=0;
  for(let j=0;j<20;j++)for(let i=0;i<20;i++){
   let avg=0;
   for(let y=0;y<k;y++)for(let x=0;x<k;x++)avg+=s.A[(j*k+y)*s.N+i*k+x][0]/(k*k);
   err+=Math.abs(avg-coarse.A[j*20+i][0])/400;
  }
  return err;
 }
 assert.ok(Number.isFinite(error(fine))&&error(fine)>0);
 assert.ok(Number.isFinite(error(finer))&&error(finer)>0);
 assert.ok([coarse,fine,finer].every(s=>Math.abs(s.volume-118)<1e-8));
 const a=fcg12State({N:40,time:0.5,maxDt:0.02}),b=fcg12State({N:40,time:0.5,maxDt:0.01});
 assert.ok(b.steps>a.steps);
 assert.ok(a.A.some((q,i)=>Math.abs(q[0]-b.A[i][0])>1e-7));
});
test('readback detects missing or incorrect samples',()=>{
 const p=expectedFCG12Samples(960,600);
 assert.ok(p.length>=4);
 assert.ok(compareFCG12Readback(p,960,600).every(s=>s.pass));
 assert.ok(compareFCG12Readback([],960,600).every(s=>!s.pass));
});
