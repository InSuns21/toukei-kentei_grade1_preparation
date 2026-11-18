// WGL19 host-side oracle: independent from the learner-controlled JavaScript/GLSL.
import {expectedWGL18Grid} from './wgl18-lab-core.mjs';
export const WGL19_DELTAS=Object.freeze([16,16,72,16]);
export const WGL19_DT=20;
export const WGL19_CAP=4;
export function scheduleWGL19(deltas=WGL19_DELTAS,fixedMs=WGL19_DT,maxStepsPerFrame=WGL19_CAP){
  if(!Array.isArray(deltas))throw new RangeError('deltas must be an array');
  if(deltas.length<1||deltas.length>12||deltas.some(d=>!Number.isFinite(d)||d<0||d>1000)||
     !Number.isFinite(fixedMs)||fixedMs<=0||fixedMs>1000||
     !Number.isInteger(maxStepsPerFrame)||maxStepsPerFrame<1||maxStepsPerFrame>12)
    throw new RangeError('bad clock parameters');
  let remainderMs=0,steps=0,droppedMs=0;
  const frames=[];
  for(const deltaMs of deltas){
    remainderMs+=deltaMs;
    let performed=0;
    while(remainderMs+1e-9>=fixedMs&&performed<maxStepsPerFrame){
      steps++;performed++;remainderMs-=fixedMs;
    }
    if(remainderMs+1e-9>=fixedMs){
      const ignored=Math.floor((remainderMs+1e-9)/fixedMs);
      droppedMs+=ignored*fixedMs;
      remainderMs-=ignored*fixedMs;
    }
    frames.push({deltaMs,performed,totalSteps:steps,remainderMs,droppedMs});
  }
  return {frames,steps,droppedMs,remainderMs,totalMs:deltas.reduce((a,b)=>a+b,0)};
}
export function expectedWGL19Grid(rate=0.2,deltas=WGL19_DELTAS,fixedMs=20,cap=4){
  return expectedWGL18Grid(rate,scheduleWGL19(deltas,fixedMs,cap).steps);
}
export function expectedWGL19Samples(width,height){
  if(!Number.isInteger(width)||!Number.isInteger(height)||width<64||height<64||
     width>1024||height>1024||width*height>524288)throw new RangeError('invalid viewport');
  const grid=expectedWGL19Grid();
  const samples=[];
  for(let j=0;j<4;j++)for(let i=0;i<4;i++){
    const v=grid[i+4*j];
    samples.push({label:'計算格子('+i+','+j+')',
      x:Math.floor((i+0.5)*width/4),y:Math.floor((j+0.5)*height/4),
      rgba:[Math.round(255*v),51,Math.round(255*(1-v)),255],value:v});
  }
  return samples;
}
export function compareWGL19Readback(actual,width,height,tolerance=2){
  if(!Number.isFinite(tolerance)||tolerance<0)throw new RangeError('bad tolerance');
  return expectedWGL19Samples(width,height).map((p,i)=>{
    const a=actual?.[i];
    const valid=!!a&&a.x===p.x&&a.y===p.y&&Array.isArray(a.rgba)&&
      a.rgba.length===4&&a.rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255);
    const difference=valid?p.rgba.map((v,k)=>Math.abs(v-a.rgba[k])):[Infinity,Infinity,Infinity,Infinity];
    return {...p,actual:valid?a.rgba:null,difference,
      pass:valid&&difference.every(d=>d<=tolerance)};
  });
}
export function compareWGL19FloatReadback(actual,rate=0.2,steps=6,tolerance=1e-5){
  if(!Number.isFinite(tolerance)||tolerance<=0)throw new RangeError('bad tolerance');
  const valid=Array.isArray(actual)&&actual.length===16&&
    actual.every(v=>typeof v==='number'&&Number.isFinite(v));
  const expected=expectedWGL18Grid(rate,steps);
  const maxError=valid?Math.max(...expected.map((v,i)=>Math.abs(v-actual[i]))):Infinity;
  const mass=valid?actual.reduce((s,v)=>s+v,0):NaN;
  return {valid,pass:valid&&maxError<=tolerance&&Math.abs(mass-1)<=tolerance,
    expected,maxError,mass};
}
export function auditWGL19Clock(data){
  if(!data||!Array.isArray(data.deltas)||!Number.isInteger(data.steps))return {valid:false,pass:false};
  try{
    const expected=scheduleWGL19(data.deltas,data.fixedMs,data.maxStepsPerFrame);
    const valid=Number.isFinite(data.droppedMs)&&Number.isInteger(data.frames)&&
      data.frames===data.deltas.length;
    return {valid,pass:valid&&data.steps===expected.steps&&
      Math.abs(data.droppedMs-expected.droppedMs)<1e-8,
      expected};
  }catch{return {valid:false,pass:false};}
}
