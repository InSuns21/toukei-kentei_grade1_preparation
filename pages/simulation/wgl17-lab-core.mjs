// WGL17: CPU oracle intentionally independent of learner-edited JS/GLSL.
export const WGL17_VALUES=Object.freeze([-2,-1.3,-0.2,0.6,1.2,1.75,0,2]);
export function wgl17EncodeR8(value,lower=-2,upper=2) {
  if(!Number.isFinite(value)||!Number.isFinite(lower)||!Number.isFinite(upper)||
     lower>=upper||value<lower||value>upper)throw new RangeError('bad input/range');
  return Math.round(255*(value-lower)/(upper-lower));
}
export function wgl17DecodeR8(code,lower=-2,upper=2) {
  if(!Number.isInteger(code)||code<0||code>255||
     !Number.isFinite(lower)||!Number.isFinite(upper)||lower>=upper)
    throw new RangeError('bad code/range');
  return lower+(upper-lower)*code/255;
}
export function expectedWGL17Samples(width,height) {
  if(!Number.isInteger(width)||!Number.isInteger(height)||
     width<64||height<64||width>1024||height>1024||width*height>524288)
    throw new RangeError('invalid drawing buffer');
  const out=[];
  for(let j=0;j<2;j++)for(let i=0;i<4;i++){
    const value=WGL17_VALUES[4*j+i],byte=wgl17EncodeR8(value);
    out.push({label:'格子('+i+','+j+')',x:Math.floor((i+0.5)*width/4),
      y:Math.floor((j+0.5)*height/2),value,byte,
      recovered:wgl17DecodeR8(byte),rgba:[byte,51,255-byte,255]});
  }
  return out;
}
export function compareWGL17Readback(actual,width,height,tolerance=2){
  if(!Number.isFinite(tolerance)||tolerance<0)throw new RangeError('bad tolerance');
  return expectedWGL17Samples(width,height).map((p,k)=>{
    const a=actual[k],valid=!!a&&a.x===p.x&&a.y===p.y&&Array.isArray(a.rgba)&&
      a.rgba.length===4&&a.rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255);
    const difference=valid?p.rgba.map((v,i)=>Math.abs(v-a.rgba[i])):
      [Infinity,Infinity,Infinity,Infinity];
    return {...p,actual:valid?a.rgba:null,difference,
      pass:valid&&difference.every(v=>v<=tolerance)};
  });
}
