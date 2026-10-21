import assert from "node:assert/strict";
import {computePosterior,predict,sequential} from "./ml2-02-model.mjs";
const near=(a,b,tol=1e-11)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<tol,a+" != "+b);
// Single observation: posterior N(1,1/2), latent var 2, new observation var 3.
const p=computePosterior([[1,2]],1,1,1);
near(p.m,1);near(p.S,0.5);
const next=predict(p,1,2);
near(next.mean,2);near(next.latentVariance,2);near(next.observationVariance,3);
// Two independent observations. Sequential and batch must agree.
const q=sequential(p,1,2,1);
const batch=computePosterior([[1,2],[2,1]],1,1,2);
near(q.m,2/3);near(q.S,1/6);
near(batch.m,q.m);near(batch.S,q.S);
// No information at x=0: posterior unchanged, future observation still has noise.
const z=computePosterior([[0,500]],2,3,1);
near(z.m,0);near(z.S,2);
near(predict(z,3,0).observationVariance,3);
// More observations cannot increase variance for the same prior and noise.
const points=[[1,2],[2,1],[3,4]];
const v1=computePosterior(points,2,1,1).S;
const v2=computePosterior(points,2,1,2).S;
const v3=computePosterior(points,2,1,3).S;
assert.ok(v1>v2&&v2>v3);
assert.throws(()=>computePosterior([[1,2]],0,1,1),RangeError);
assert.throws(()=>computePosterior([[1,2]],1,-1,1),RangeError);
assert.throws(()=>computePosterior([[1,2]],1,1,2),RangeError);
console.log("ML2-02: posterior, predictive, sequential and validation checks passed");
