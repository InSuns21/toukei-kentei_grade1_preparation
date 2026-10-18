import assert from "node:assert/strict";
import {buildCorrelatedDesign,fitRidge,experiment,theory,TRUE_BETA} from "./ml1-05-model.mjs";
const near=(a,b,tol=1e-8)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<tol,a+" != "+b);

const X=[[1,0],[0,2]],y=[2,2];
const out=fitRidge(X,y,1);
near(out.beta[0],2/3);near(out.beta[1],2/3);
const duplicate=fitRidge([[1,1]], [2],1);
near(duplicate.beta[0],2/3);near(duplicate.beta[1],2/3);
assert.throws(()=>fitRidge([[1,1]],[2],0),RangeError);

const m=theory(X,[2,1],0.5,1);
near(m.bias[0],-1);near(m.bias[1],-0.2);
near(m.covariance[0][0],0.25);near(m.covariance[1][1],0.16);
near(m.risk,1.45);

const rows=buildCorrelatedDesign(0.7,24);
let a=0,b=0,c=0;
for(const r of rows){a+=r[0]*r[0];b+=r[0]*r[1];c+=r[1]*r[1];}
near(a/24,1);near(b/24,0.7);near(c/24,1);

const p={rho:0.8,lambda:0.5,sigma:1,repetitions:250,seed:42};
const ex=experiment(p),same=experiment(p);
assert.deepEqual(ex.empirical,same.empirical);
assert.deepEqual(ex.path,same.path);
const emp=ex.empirical;
near(emp.risk,emp.bias[0]**2+emp.bias[1]**2+emp.variance[0]+emp.variance[1],1e-9);
const noiseless=experiment({...p,sigma:0});
noiseless.empirical.variance.forEach(x=>near(x,0,1e-12));
noiseless.sampleFit.beta.forEach((x,j)=>near(x,noiseless.theoretical.mean[j]));
const independent=theory(buildCorrelatedDesign(0,24),TRUE_BETA,0,0);
near(independent.risk,0);
assert.throws(()=>buildCorrelatedDesign(1),RangeError);
assert.throws(()=>experiment({...p,seed:-1}),RangeError);
assert.throws(()=>experiment({...p,repetitions:1}),RangeError);
console.log("ML1-05: ridge, rank loss, Gram, theory and seeded MC checks passed");
