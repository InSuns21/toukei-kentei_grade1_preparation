import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {referenceState,expectedFCG16Samples,compareFCG16Readback} from './fcg16-lab-core.mjs';
test('actual transport and reaction agree with closed form and preserve bounds',async()=>{
 const src=await readFile(new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG16/fire.js',import.meta.url),'utf8');
 for(const reaction of [0,.18,.28,.4]){
  const code=src.slice(0,src.indexOf('function compile')).replace('const reaction=0.18;',()=> 'const reaction='+reaction+';');
  const model=new Function(code+'return {cells,advance};')();
  for(let frame=0;frame<=10;frame++){
   for(let j=0;j<48;j++)for(let i=0;i<48;i++){
    const q=Array.from(model.cells.slice(3*(i+48*j),3*(i+48*j)+3)),ref=referenceState(i,j,frame,{reaction});
    assert.ok(q.every((x,k)=>Math.abs(x-ref[k])<1e-11));
    assert.ok(q[0]+q[1]<=1+1e-12&&q[0]+q[2]<=1+1e-12&&q.every(x=>x>=0));
   }model.advance();
  }
 }
});
test('readback reference: emission and smoke vary independently',()=>{
 const a=expectedFCG16Samples(960,320),b=expectedFCG16Samples(960,320,{emission:0}),c=expectedFCG16Samples(960,320,{extinction:0});
 assert.equal(a.length,9);
 assert.deepEqual(a.slice(6),b.slice(6));assert.deepEqual(a.slice(3,6),c.slice(3,6));
 assert.ok(b.slice(3,6).every(q=>q.rgba.slice(0,3).every(x=>x===0)));
 assert.ok(compareFCG16Readback(a,960,320).every(q=>q.pass));
 const bad=structuredClone(a);bad[0].rgba[0]=(bad[0].rgba[0]+128)%256;assert.equal(compareFCG16Readback(bad,960,320)[0].pass,false);
});
