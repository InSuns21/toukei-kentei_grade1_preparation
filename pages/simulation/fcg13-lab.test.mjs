import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {fcg13Direct,FCG13_DEFAULTS,expectedFCG13Samples,compareFCG13Readback} from './fcg13-lab-core.mjs';
import {parametersFor,writeLabParameter} from './wgl-lab-parameters.mjs';
const root=new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG13/',import.meta.url);
test('actual editable inverse FFT and independent direct cosine sum agree in all grid samples',async()=>{
 const code=(await readFile(new URL('ocean.js',root),'utf8')).split('function compile')[0];
 for(const opts of [{},{time:0,modeCount:1},{amplitude:0},{time:20,modeCount:8,wavelengthScale:3,direction:3},{direction:1},{time:4,wavelengthScale:2}]){
  const o={...FCG13_DEFAULTS,...opts};let js=code;
  for(const spec of parametersFor('FCG13'))js=writeLabParameter(js,spec,o[spec.id]);
  const z=vm.runInNewContext(js+'\n;({eta,sx,sy,mean,maxError})',{report:()=>{}});
  assert.ok(Math.abs(z.mean)<1e-12&&z.maxError<1e-9);
  for(let y=0;y<64;y++)for(let x=0;x<64;x++){
   const k=y*64+x,expected=fcg13Direct(o,x,y);
   [z.eta[k],z.sx[k],z.sy[k]].forEach((v,i)=>assert.ok(Math.abs(v-expected[i])<1e-9));
  }
 }
});
test('single wave, zero wave, periodicity, and pixel comparison',()=>{
 const opts={time:0,modeCount:1,amplitude:0.35};
 assert.ok(Math.abs(fcg13Direct(opts,16,0)[0])<1e-12);
 assert.ok(Math.abs(fcg13Direct(opts,16,0)[1]+0.35*Math.PI/32)<1e-12);
 assert.deepEqual(fcg13Direct({amplitude:0},3,4),[0,0,0]);
 for(let i=0;i<3;i++)assert.ok(Math.abs(fcg13Direct({},7,3)[i]-fcg13Direct({},71,67)[i])<1e-12);
 const p=expectedFCG13Samples(960,600);
 assert.ok(p.length>=4&&compareFCG13Readback(p,960,600).every(s=>s.pass));
 assert.ok(compareFCG13Readback([],960,600).every(s=>!s.pass));
});
