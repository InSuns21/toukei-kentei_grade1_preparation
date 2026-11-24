import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {expectedFCG18Samples,compareFCG18Readback} from './fcg18-lab-core.mjs';
const src=await readFile(new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG18/coupling.js',import.meta.url),'utf8');
for(const mass of [.2,.4,.6,.8,1])for(const restitution of [0,.25,.5,.75,1])test('FCG18 contact model '+mass+'/'+restitution,()=>{
 const factory=new Function(src.split('// GPU DISPLAY')[0].replace('const mass=0.4;','const mass='+mass+';').replace('const restitution=1;','const restitution='+restitution+';')+';return {createModel};')();
 const a=factory.createModel(false),b=factory.createModel(true),c=factory.createModel(true);
 for(let i=0;i<80;i++){a.advance(.05);b.advance(.05);for(const model of [a,b]){const s=model.snapshot();assert.ok(s.error<1e-9);assert.ok(s.penetration<1e-8);}}
 for(let i=0;i<40;i++)c.advance(.1);
 assert.ok(a.snapshot().contacts>0);assert.equal(a.snapshot().body.x,.6);
 assert.ok(b.snapshot().contacts>0);assert.ok(Math.hypot(b.snapshot().body.x-.6,b.snapshot().body.y-.5)>1e-4);
 assert.ok(Math.hypot(b.snapshot().body.x-c.snapshot().body.x,b.snapshot().body.y-c.snapshot().body.y)<1e-7);
});
test('FCG18 independent initial pixel oracle detects corruption',()=>{
 const p=expectedFCG18Samples(896,448);
 assert.equal(p.length,6);assert.ok(compareFCG18Readback(p,896,448).every(x=>x.pass));
 const q=structuredClone(p);q[0].rgba[0]=200;assert.equal(compareFCG18Readback(q,896,448)[0].pass,false);
});
