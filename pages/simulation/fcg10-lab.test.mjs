import test from 'node:test';
import assert from 'node:assert/strict';
import {optics,expectedFCG10Samples,compareFCG10Readback} from './fcg10-lab-core.mjs';
test('normal incidence, equal index, and total internal reflection',()=>{
 const N=[0,0,1];
 assert.ok(Math.abs(optics([0,0,-1],N,1,1.5).F-0.04)<1e-12);
 const I=[Math.sqrt(3)/2,0,-0.5];
 const equal=optics(I,N,1,1);
 assert.equal(equal.F,0);assert.ok(equal.T.every((v,i)=>Math.abs(v-I[i])<1e-12));
 const tir=optics(I,N,1.5,1);assert.equal(tir.F,1);assert.equal(tir.T,null);
 const trans=optics(I,N,1,Math.sqrt(3));
 assert.ok(Math.abs(trans.T[0]-0.5)<1e-12);assert.ok(Math.abs(Math.hypot(...trans.T)-1)<1e-12);
 assert.ok(Math.abs(trans.F-0.125)<1e-12);
});
test('analytic probes change with wave phase and absorption, missing sample fails',()=>{
 const a=expectedFCG10Samples(640,640);
 assert.notDeepEqual(a,expectedFCG10Samples(640,640,{phase:2}));
 assert.notDeepEqual(a,expectedFCG10Samples(640,640,{absorption:0}));
 assert.ok(compareFCG10Readback(a,640,640).every(x=>x.pass));
 assert.ok(compareFCG10Readback([],640,640).every(x=>!x.pass));
});
