import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {initialCell,expectedFCG17Samples,compareFCG17Readback} from './fcg17-lab-core.mjs';
const source=await readFile(new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG17/vortex.js',import.meta.url),'utf8');
for(const N of [16,24,32])test('FCG17 editable MAC model N='+N,()=>{
 const factory=new Function(source.split('// GPU DISPLAY')[0].replace('const N=24;','const N='+N+';')+';return {createModel};')();
 const a=factory.createModel(0),b=factory.createModel(12),c=factory.createModel(0),s=a.snapshot();
 for(let j=0;j<N;j++)for(let i=0;i<N;i++){
  const q=initialCell(i,j,N),k=i+N*j;
  assert.ok(Math.abs(q.w-s.W[k])<1e-10);assert.ok(Math.abs(q.dye-s.dye[k])<1e-12);
 }
 for(let t=0;t<80;t++){a.advance();b.advance();c.advance();
  for(const s of [a.snapshot(),b.snapshot()]){assert.ok(s.divAfter<1e-6);assert.equal(s.wall,0);assert.ok(s.workError<1e-10);assert.ok(Number.isFinite(s.energy));}
  assert.deepEqual(a.snapshot().dye,c.snapshot().dye);
 }
 assert.notEqual(a.snapshot().energy,b.snapshot().energy);
 assert.ok(a.snapshot().dye.some((x,i)=>Math.abs(x-b.snapshot().dye[i])>1e-7));
});
test('independent initial pixels and corrupted comparison',()=>{
 for(const grid of [16,24,32])for(const mode of [0,1,2]){
  const p=expectedFCG17Samples(960,600,{grid,mode});
  assert.equal(p.length,6);assert.ok(compareFCG17Readback(p,960,600,{grid,mode}).every(q=>q.pass));
  const bad=structuredClone(p);bad[0].rgba[0]=(bad[0].rgba[0]+128)%256;
  assert.equal(compareFCG17Readback(bad,960,600,{grid,mode})[0].pass,false);
 }
});
