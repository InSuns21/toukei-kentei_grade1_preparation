// R2 regression: compare the *executed learner MAC step* against a separately
// implemented fluid-cell graph CG oracle, including all R8 fields (not just 9 GPU probes).
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {FCG6_N,fcg6State} from './fcg6-lab-core.mjs';
import {parametersFor,writeLabParameter} from './wgl-lab-parameters.mjs';

const sourceURL=new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG6/solid.js',import.meta.url);
const encode=value=>Math.round(255*Math.max(0,Math.min(1,value)));

test('FCG6 48x48 edited solver and independent masked CG match across full CPU R8 fields',async()=>{
  const source=await readFile(sourceURL,'utf8');
  const cutoff=source.indexOf('const enc=(x)=>');
  assert.ok(cutoff>0,'isolate the same CPU state before GPU texture upload');
  // No duplicate physics model: execute the actual learner code up to texture transfer.
  const execute=new Function('settings',source.slice(0,cutoff)+
    ';return {N,mask:geom.s,q:dye,div:divField,speed:speedField,wallError,residual,identity,after,changedMask};');
  for(const steps of [0,1,4,8]){
    const actual=execute({steps}),ref=fcg6State(steps);
    assert.equal(actual.N,FCG6_N);
    assert.equal(actual.N,48);
    assert.equal(actual.mask.length,48*48);
    assert.equal(actual.q.length,48*48);
    assert.ok(actual.wallError<1e-10,'moving wall normal flux');
    assert.ok(actual.residual<1e-6+1e-12,'edited SOR equation residual');
    assert.ok(ref.residual<1e-6+1e-12,'independent graph CG residual');
    assert.ok(actual.identity<1e-8,'Neumann projection identity');
    assert.ok(ref.identity<1e-8,'independent Neumann identity');
    for(let k=0;k<48*48;k++){
      assert.equal(actual.mask[k],ref.solid[k],'same real obstacle mask, cell '+k);
      for(const [name,a,b] of [
        ['dye',actual.q[k],ref.q[k]],
        ['divergence',70*Math.abs(actual.div[k]),70*Math.abs(ref.divergence[k])],
        ['speed',actual.speed[k]/.6,ref.speed[k]/.6]
      ]){
        assert.ok(Math.abs(encode(a)-encode(b))<=1,
          name+' R8 mismatch at '+k+' step='+steps+': '+a+' vs '+b);
      }
    }
    if(steps===8)assert.ok(actual.changedMask>0,'moving mask crossed a cell boundary');
  }
});

test('FCG6 edited rectangle and moving-wall coefficients preserve independent masked-CG fields',async()=>{
  const base=await readFile(sourceURL,'utf8');
  const specs=parametersFor('FCG6');
  const options={shape:'rectangle',centerY:0.55,wallAmplitude:0.12,wallFrequency:2.2};
  let edited=base;
  for(const spec of specs)edited=writeLabParameter(edited,spec,options[spec.id]);
  assert.notEqual(edited,base,'the learner JS itself changes');
  const cutoff=edited.indexOf('const enc=(x)=>');
  const execute=new Function('settings',edited.slice(0,cutoff)+
    ';return {mask:geom.s,q:dye,div:divField,speed:speedField,wallError,residual,identity};');
  for(const steps of [1,2]){
    const actual=execute({steps}),ref=fcg6State(steps,options);
    assert.ok(actual.wallError<1e-10,'real moving rectangle has zero normal mismatch');
    assert.ok(actual.residual<1.1e-6&&ref.residual<1.1e-6,'independent masked Poisson');
    assert.ok(actual.identity<1e-8&&ref.identity<1e-8,'pressure divergence identity');
    for(let k=0;k<FCG6_N*FCG6_N;k++){
      assert.equal(actual.mask[k],ref.solid[k],'same rectangle footprint, cell '+k);
      for(const [name,a,b] of [
        ['dye',actual.q[k],ref.q[k]],
        ['divergence',70*Math.abs(actual.div[k]),70*Math.abs(ref.divergence[k])],
        ['speed',actual.speed[k]/.6,ref.speed[k]/.6]
      ])assert.ok(Math.abs(encode(a)-encode(b))<=1,
        name+' R8 mismatch at cell '+k+' step '+steps);
    }
  }
});
