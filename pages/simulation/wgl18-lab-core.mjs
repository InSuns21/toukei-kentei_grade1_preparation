// WGL18: pure CPU oracle, independent of the learner-edited JS and fragment shader.
export const WGL18_SIZE=4;
export function stepWGL18(values,rate){
  if((!Array.isArray(values)&&!(values instanceof Float32Array))||
     values.length!==16||values.some(v=>!Number.isFinite(v))||
     !Number.isFinite(rate))throw new RangeError('bad diffusion inputs');
  const next=new Array(16);
  for(let j=0;j<4;j++)for(let i=0;i<4;i++){
    const k=i+4*j,v=values[k];
    const west=values[Math.max(0,i-1)+4*j],east=values[Math.min(3,i+1)+4*j];
    const south=values[i+4*Math.max(0,j-1)],north=values[i+4*Math.min(3,j+1)];
    next[k]=v+rate*(west+east+south+north-4*v);
  }
  return next;
}
export function expectedWGL18Grid(rate=0.2,steps=2){
  if(!Number.isFinite(rate)||rate<0||rate>0.25||
     !Number.isInteger(steps)||steps<0||steps>12)
    throw new RangeError('invalid safe rate or step count');
  let grid=new Array(16).fill(0);grid[5]=1;
  for(let n=0;n<steps;n++)grid=stepWGL18(grid,rate);
  return grid;
}
export function expectedWGL18Samples(width,height){
  if(!Number.isInteger(width)||!Number.isInteger(height)||
    width<64||height<64||width>1024||height>1024||width*height>524288)
    throw new RangeError('invalid drawing buffer');
  const values=expectedWGL18Grid();
  const samples=[];
  for(let j=0;j<4;j++)for(let i=0;i<4;i++){
    const v=values[i+4*j];
    samples.push({label:'格子('+i+','+j+')',
      x:Math.floor((i+0.5)*width/4),y:Math.floor((j+0.5)*height/4),
      value:v,rgba:[Math.round(255*v),51,Math.round(255*(1-v)),255]});
  }
  return samples;
}
export function compareWGL18Readback(actual,width,height,tolerance=2){
  if(!Number.isFinite(tolerance)||tolerance<0)throw new RangeError('invalid tolerance');
  return expectedWGL18Samples(width,height).map((p,k)=>{
    const a=actual?.[k],valid=!!a&&a.x===p.x&&a.y===p.y&&
      Array.isArray(a.rgba)&&a.rgba.length===4&&
      a.rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255);
    const difference=valid?p.rgba.map((v,i)=>Math.abs(v-a.rgba[i])):
      [Infinity,Infinity,Infinity,Infinity];
    return {...p,actual:valid?a.rgba:null,difference,
      pass:valid&&difference.every(v=>v<=tolerance)};
  });
}
export function compareWGL18FloatReadback(actual,tolerance=0.00001){
  if(!Number.isFinite(tolerance)||tolerance<=0)throw new RangeError('invalid tolerance');
  const expected=expectedWGL18Grid();
  const valid=Array.isArray(actual)&&actual.length===16&&
    actual.every(v=>typeof v==='number'&&Number.isFinite(v));
  const differences=valid?expected.map((v,i)=>Math.abs(v-actual[i])):[Infinity];
  const maxError=Math.max(...differences);
  const mass=valid?actual.reduce((sum,v)=>sum+v,0):NaN;
  return {valid,pass:valid&&maxError<=tolerance&&Math.abs(mass-1)<=tolerance,
    maxError,mass,expected};
}
