import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {referenceDensity,referenceTexture,referenceTransmittance,expectedFCG15Samples,compareFCG15Readback} from './fcg15-lab-core.mjs';
const close=(a,b,tol=1e-12)=>assert.ok(Math.abs(a-b)<=tol,`${a} != ${b}`);
test('actual density code: bounded and agrees with independent inverse transport',async()=>{
 const src=await readFile(new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG15/volume.js',import.meta.url),'utf8');
 const actual=new Function('const homogeneous=0,spin=1,rise=.13;'+src.slice(src.indexOf('function bump'),src.indexOf('function compile'))+'return density;')();
 for(const t of [0,1,4])for(let k=0;k<32;k++)for(let j=0;j<32;j++)for(let i=0;i<32;i++){
  const xyz=[i,j,k].map(n=>(n+.5)/32),q=actual(...xyz,t);
  assert.ok(q>=0&&q<=1);close(q,referenceDensity(...xyz,t));
 }
 const t=1.3,x=.44,y=.24,z=.5;
 close(actual(.5+Math.cos(t)*(x-.5)-Math.sin(t)*(z-.5),y+.13*t,.5+Math.sin(t)*(x-.5)+Math.cos(t)*(z-.5),t),actual(x,y,z,0));
});
test('constant volume: analytic extinction and spacing-independent opacity',()=>{
 for(const samples of [16,32,48,64,80,96])for(const extinction of [0,2,6,12]){
  close(referenceTransmittance(.44,.24,0,{samples,extinction,homogeneous:1}),Math.exp(-extinction*128/255));
 }
 close(referenceTransmittance(.44,.24,0,{extinction:0}),1);
});
test('midpoint integration of actual line approaches exact piecewise-linear integral',()=>{
 const N=48,x=.44,y=.24,knots=[0,...Array.from({length:N},(_,i)=>(i+.5)/N),1];
 let integral=0;
 for(let i=1;i<knots.length;i++)integral+=(knots[i]-knots[i-1])*(referenceTexture(x,y,knots[i],0)+referenceTexture(x,y,knots[i-1],0))/2;
 const exact=Math.exp(-6*integral);
 const errors=[16,32,64,96].map(samples=>Math.abs(referenceTransmittance(x,y,0,{samples})-exact));
 assert.ok(errors[3]<errors[0],JSON.stringify(errors));
 assert.ok(errors[3]<.001);
 console.log('T exact:',exact,'errors:',errors);
});
test('pixel oracle rejects corrupted readback and verifies both panels',()=>{
 const good=expectedFCG15Samples(768,384);assert.equal(good.length,7);
 assert.ok(compareFCG15Readback(good,768,384).every(r=>r.pass));
 const bad=structuredClone(good);bad[0].rgba[0]=(bad[0].rgba[0]+128)%256;
 assert.equal(compareFCG15Readback(bad,768,384)[0].pass,false);
});
