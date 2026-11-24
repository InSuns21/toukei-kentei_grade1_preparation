import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {assembleFCG19,expectedFCG19Samples,compareFCG19Readback} from './fcg19-lab-core.mjs';
const dir=new URL('../../textbook/volumes/dream_thater/計算系/FCG/',import.meta.url);
const sources=await Promise.all(['FCG5/fluid.js','FCG12/shallow.js','FCG14/smoke.js','FCG19/performance.js'].map(p=>readFile(new URL(p,dir),'utf8')));
const source=assembleFCG19(...sources);
const {createModel,encodeField}=new Function(source.split('// GPU DISPLAY')[0]+'\nreturn {createModel,encodeField};')();
for(const index of [0,1,2])test('FCG19 physical invariance under display encoding '+index,()=>{
 const a=createModel(index),b=createModel(index);
 for(let n=0;n<4;n++){
  a.advance();b.advance();
  const x=a.state(),y=b.state(),before=x.field.slice();
  const f=encodeField(x.field,x.scale,0),r=encodeField(y.field,y.scale,1);
  assert.deepEqual(x.field,before);
  assert.deepEqual(x.arrays,y.arrays);
  assert.deepEqual(x.diagnostic,y.diagnostic);
  assert.equal(x.time,y.time);
  assert.ok(f.maxError<=2**-25+1e-15);
  assert.ok(r.maxError<=1/510+1e-15);
  assert.equal(f.clipped,r.clipped);
  assert.ok(x.diagnostic.every(([,v])=>Number.isFinite(v)));
  if(index===0)assert.ok(x.diagnostic[0][1]<4.1e-8);
  if(index===1){assert.ok(Math.abs(x.diagnostic[0][1])<1e-8);assert.ok(x.diagnostic[1][1]>0);}
  if(index===2){assert.ok(x.diagnostic[0][1]<2.6e-8);assert.ok(Math.abs(x.diagnostic[1][1])<1e-10);assert.ok(Math.abs(x.diagnostic[2][1])<1e-10);}
 }
});
test('FCG19 independent initial pixels and rejection',()=>{
 for(const modelIndex of [0,1,2])for(const renderScale of [.125,.5,1])for(const formatIndex of [0,1]){
  const options={modelIndex,renderScale,formatIndex};
  const p=expectedFCG19Samples(640,640,options);
  assert.ok(compareFCG19Readback(p,640,640,options).every(x=>x.pass));
  const corrupted=structuredClone(p);corrupted[0].rgba[0]=255;
  assert.equal(compareFCG19Readback(corrupted,640,640,options)[0].pass,false);
 }
});
