// R2 regression: compare the *executed learner MAC step* against a separately
// implemented fluid-cell graph CG oracle, including all R8 fields (not just 9 GPU probes).
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {performance} from 'node:perf_hooks';
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


test('FCG6 R2 32/48/64 candidate grids: executed MAC solver versus independent CG',async t=>{
  const learner=await readFile(sourceURL,'utf8');
  const learnerCut=learner.indexOf('const enc=(x)=>');
  assert.ok(learnerCut>0,'test-only learner CPU portion; reference is the exported graph-CG solver');

  // The GUI now edits this real grid literal; compare every supported N against
  // the independently implemented graph-CG reference with the same N.
  for(const n of [32,48,64])await t.test('grid '+n+'x'+n,()=>{
    const gridLearner=learner.slice(0,learnerCut).replace(
      'const N=48,h=1/N', 'const N='+n+',h=1/N');
    assert.match(gridLearner,new RegExp('const N='+n+',h=1/N'));
    const independent=(steps,options)=>fcg6State(steps,{...options,N:n});

    const cases=[
      {label:'moving circle',options:{},edit:source=>source},
      {label:'moving rectangle',options:{
        shape:'rectangle',centerY:0.55,wallAmplitude:0.12,wallFrequency:2.2
      },edit:source=>source.replace("shape='circle',centerY=0.5",
        "shape='rectangle',centerY=0.55").replace(
        'wallAmplitude=0.10,wallFrequency=1.8',
        'wallAmplitude=0.12,wallFrequency=2.2')}
    ];
    for(const c of cases){
      const edited=c.edit(gridLearner);
      assert.ok(c.options.shape===undefined||edited!==gridLearner,
        'rectangle test must run edited learner coefficients');
      const execute=new Function('settings',edited+
        ';return {N,mask:geom.s,q:dye,div:divField,speed:speedField,'+
        'wallError,residual,identity,sweeps,changedMask};');
      const actual=execute({steps:2}),expected=independent(2,c.options);
      assert.equal(actual.N,n);
      assert.equal(actual.mask.length,n*n);
      assert.equal(expected.solid.length,n*n);
      assert.ok(actual.wallError<1e-10&&expected.wall<1e-10,c.label+' wall velocity');
      assert.ok(actual.residual<1e-6+1e-11&&expected.residual<1e-6+1e-11,
        c.label+' Poisson residual');
      assert.ok(actual.identity<1e-8&&expected.identity<1e-8,
        c.label+' Neumann projection identity');
      assert.ok(actual.changedMask>0,c.label+' obstacle must move across cells');
      let maxR8Difference=0;
      for(let k=0;k<n*n;k++){
        assert.equal(actual.mask[k],expected.solid[k],
          c.label+' actual obstacle cell '+k);
        for(const [name,a,b] of [
          ['dye',actual.q[k],expected.q[k]],
          ['divergence',70*Math.abs(actual.div[k]),
            70*Math.abs(expected.divergence[k])],
          ['speed',actual.speed[k]/0.6,expected.speed[k]/0.6]
        ]){
          const difference=Math.abs(encode(a)-encode(b));
          maxR8Difference=Math.max(maxR8Difference,difference);
          assert.ok(difference<=1,c.label+' '+name+' R8 mismatch at '+k+
            ': '+a+' versus '+b);
        }
      }
      console.log('FCG6 R2 numeric N='+n+' '+c.label+
        ': maxR8Difference='+maxR8Difference+
        ', SOR sweeps='+actual.sweeps+
        ', Poisson residual='+actual.residual.toExponential(3));
    }

    // CPU-only sampling, not a guaranteed FPS or device/GPU performance gate.
    // Include compilation/warmup separately and report min/median/max in CI logs.
    const run=new Function('settings',gridLearner+
      ';return {N,residual,identity,wallError};');
    run({steps:1});
    const elapsed=[];
    for(let repeat=0;repeat<3;repeat++){
      const begin=performance.now();
      const actual=run({steps:1});
      elapsed.push(performance.now()-begin);
      assert.ok(actual.residual<1e-6+1e-11);
    }
    elapsed.sort((a,b)=>a-b);
    console.log('FCG6 R2 CPU only N='+n+' single step after warmup: '+
      'min='+elapsed[0].toFixed(1)+'ms, median='+elapsed[1].toFixed(1)+
      'ms, max='+elapsed[2].toFixed(1)+'ms (3 runs; no GPU/FPS claim)');
  });
});
