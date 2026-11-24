import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const src=await readFile(new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG20/inundation.js',import.meta.url),'utf8');
const {makeFlood}=new Function(src.split('// GPU DISPLAY')[0]+'\nreturn {makeFlood};')();
test('FCG20 lake at rest and dry cells',()=>{for(const n of [24,48]){const m=makeFlood(n,0,1.5),u=m.U.slice();for(let i=0;i<20;i++)m.advance();const s=m.state();assert.ok(s.velocity<1e-10);assert.ok(Math.abs(s.error)<1e-8);assert.ok(m.U.every((x,i)=>Math.abs(x-u[i])<1e-10));}});
test('FCG20 pulse conservative and positive',()=>{for(const n of [24,48,72]){const m=makeFlood(n,1,1.5),before=m.U.slice();for(let i=0;i<20;i++)m.advance();const s=m.state();assert.ok(s.min>=0);assert.ok(Math.abs(s.error)<1e-7);assert.ok(s.velocity>0);assert.ok(m.U.some((v,i)=>Math.abs(v-before[i])>1e-5));}});
