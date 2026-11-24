import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {FCG14_DEFAULTS,fcg14Reference,expectedFCG14Samples,compareFCG14Readback} from './fcg14-lab-core.mjs';
import {parametersFor,writeLabParameter} from './wgl-lab-parameters.mjs';
const root=new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG14/',import.meta.url);
test('learner SOR/scatter vs independent CG/gather, all arrays and scalar conservation',async()=>{
 const raw=(await readFile(new URL('smoke.js',root),'utf8')).split('function compile')[0];
 for(const options of [{},{N:32,buoyancy:0},{N:32,heatSource:0},{N:32,smokeSource:0},{N:64,kappa:.002,buoyancy:.06,heatSource:4}]){
  const o={...FCG14_DEFAULTS,...options};let source=raw;
  for(const spec of parametersFor('FCG14'))source=writeLabParameter(source,spec,o[spec.id]);
  const got=vm.runInNewContext(source+'\n;sim.state()'),ref=fcg14Reference(o);
  for(const name of ['q','T','u','v']){
   assert.equal(got[name].length,ref[name].length);
   let max=0;for(let k=0;k<ref[name].length;k++)max=Math.max(max,Math.abs(got[name][k]-ref[name][k]));
   assert.ok(max<2e-6,name+' difference '+max);
  }
  assert.ok(Math.abs(got.M-o.smokeSource*got.sourceIntegral)<1e-12);
  assert.ok(Math.abs(got.heat-o.heatSource*got.sourceIntegral)<1e-12);
  assert.ok(got.div<2.6e-8&&got.q.every(x=>x>=-1e-12)&&got.T.every(x=>x>=-1e-12));
  if(o.buoyancy===0||o.heatSource===0)assert.equal(got.maxSpeed,0);
  if(o.smokeSource===0)assert.equal(got.M,0);
 }
});
test('buoyancy raises smoke, but has no source-mass effect; nonzero sources',()=>{
 const a=fcg14Reference({N:32},80),b=fcg14Reference({N:32,buoyancy:0},80),c=fcg14Reference({N:32,heatSource:0},80);
 assert.ok(a.Y>b.Y&&Math.abs(b.Y-c.Y)<1e-12);
 assert.ok(Math.abs(a.M-b.M)<1e-12&&Math.abs(a.M-c.M)<1e-12&&c.heat===0);
 const pixels=expectedFCG14Samples(960,480);
 assert.ok(pixels.length>=5&&compareFCG14Readback(pixels,960,480).every(s=>s.pass));
 assert.ok(compareFCG14Readback([],960,480).every(s=>!s.pass));
});
