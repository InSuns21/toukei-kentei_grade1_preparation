import test from 'node:test';
import assert from 'node:assert/strict';
import {expectedFCG20Samples,compareFCG20Readback} from './fcg20-lab-core.mjs';
import {readFile} from 'node:fs/promises';
const src=await readFile(new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG20/inundation.js',import.meta.url),'utf8');
const {makeFlood}=new Function(src.split('// GPU DISPLAY')[0]+'\nreturn {makeFlood};')();
test('FCG20 lake at rest and dry cells',()=>{for(const n of [24,48]){const m=makeFlood(n,0,1.5),u=m.U.slice();for(let i=0;i<80;i++)m.advance();const s=m.state();assert.ok(s.velocity<1e-10);assert.ok(Math.abs(s.error)<1e-8);assert.ok(m.U.every((x,i)=>Math.abs(x-u[i])<1e-10));}});
test('FCG20 pulse conservative and positive',()=>{for(const n of [24,48,72]){const m=makeFlood(n,1,1.5),before=m.U.slice();for(let i=0;i<80;i++)m.advance();const s=m.state();assert.ok(s.min>=0);assert.ok(Math.abs(s.error)<1e-7);assert.ok(s.velocity>0);assert.ok(m.U.some((v,i)=>Math.abs(v-before[i])>1e-5));}});
test('FCG20 independently calculated initial pixels',()=>{for(const N of [24,48,72])for(const pulse of [0,1,2])for(const ridge of [0,1.5,3]){const o={N,pulse,ridge},p=expectedFCG20Samples(768,768,o);assert.ok(compareFCG20Readback(p,768,768,o).every(x=>x.pass));const bad=structuredClone(p);bad[0].rgba[0]=255;assert.equal(compareFCG20Readback(bad,768,768,o)[0].pass,false);}});
