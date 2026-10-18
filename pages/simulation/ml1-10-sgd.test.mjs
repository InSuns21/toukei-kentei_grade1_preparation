import test from "node:test";
import assert from "node:assert/strict";
import {check,rng,step,theory,trace,average} from "./ml1-10-sgd-core.mjs";
const c={alpha:0.5,w0:2,b:1,seed:21,trials:200};
test("exact mean-square recurrence and floor",()=>{
  assert.equal(theory(c,0).ew2,4);
  assert.equal(theory(c,1).ew2,1.25);
  assert.equal(theory(c,2).ew2,0.5625);
  assert.equal(theory(c,2).ew,0.5);
  assert.equal(theory(c,0).floor,1/6);
  assert.equal(theory({...c,b:4},0).floor,1/24);
});
test("independent fresh batch and deterministic seed",()=>{
  assert.deepEqual(trace(c,30),trace(c,30));
  assert.notDeepEqual(trace(c,30),trace({...c,seed:22},30));
  assert.equal(trace(c,7)[0].w,2);
  assert.equal(trace(c,7).length,8);
  assert.notDeepEqual(trace(c,5),trace({...c,b:4},5));
});
test("one-step unbiasedness holds by complete enumeration",()=>{
  const low=step(2,0.5,1,()=>0);
  const high=step(2,0.5,1,()=>0.9);
  assert.equal(low.w,0.5);assert.equal(high.w,1.5);
  assert.equal((low.w+high.w)/2,1);
  assert.equal((low.lossGap+high.lossGap)/2,0.625);
  assert.equal(theory(c,1).lossGap,0.625);
});
test("simulation Monte Carlo matches expectation approximately",()=>{
  const obs=average({...c,trials:500},20);
  assert.ok(Math.abs(obs[20].observed-obs[20].expected)<0.06);
  assert.ok(Math.abs(obs[20].expected-c.alpha/(2*(2-c.alpha)))<1e-8);
});
test("invalid inputs rejected",()=>{
  for(const changes of [{alpha:0},{alpha:2},{b:0},{b:1.5},{seed:-1},{trials:501},{w0:Infinity}])
    assert.throws(()=>check({...c,...changes}),RangeError);
  assert.throws(()=>trace(c,201),RangeError);
  assert.equal(typeof rng(3)(),"number");
});
