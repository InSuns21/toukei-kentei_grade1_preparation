// WGL11 independent CPU oracle: intersect receiver-to-light rays with the box.
// This intentionally does NOT reproduce the GPU depth texture or its shader.
export const LIGHT_RAY = Object.freeze([0.5,0.25,1.0]);
export const RECEIVERS = Object.freeze([
  {label:'遮蔽される床',p:[-0.75,-0.25,0.0]},
  {label:'遮蔽されない床',p:[1.25,1.10,0.0]},
  {label:'遮蔽物より上',p:[0.0,0.0,1.1]},
  {label:'遠方の床',p:[-1.5,1.5,0.0]}
]);
export function hitsBox(origin, direction=LIGHT_RAY) {
  if (!Array.isArray(origin) || !Array.isArray(direction) ||
      origin.length!==3 || direction.length!==3 ||
      ![...origin,...direction].every(Number.isFinite)) {
    throw new RangeError('finite 3D vectors required');
  }
  const bounds=[[-0.45,0.45],[-0.45,0.45],[0,1]];
  let t0=1e-7, t1=Infinity;
  for(let k=0;k<3;k++) {
    const [lo,hi]=bounds[k];
    if(Math.abs(direction[k])<1e-12) {
      if(origin[k]<lo || origin[k]>hi) return false;
      continue;
    }
    const a=(lo-origin[k])/direction[k],c=(hi-origin[k])/direction[k];
    t0=Math.max(t0,Math.min(a,c));
    t1=Math.min(t1,Math.max(a,c));
    if(t0>t1) return false;
  }
  return t1>=t0;
}
export function expectedWGL11Samples(width,height) {
  if(!Number.isInteger(width)||!Number.isInteger(height)||
     width<64||height<64||width>1024||height>1024||
     width*height>524288) throw new RangeError('invalid canvas dimensions');
  return RECEIVERS.map(({label,p},i)=>{
    const lit=!hitsBox(p);
    const byte=lit?255:0;
    return {label,x:i,y:0,rgba:[byte,byte,byte,255]};
  });
}
export function compareWGL11Readback(actual,width,height,tolerance=2) {
  return expectedWGL11Samples(width,height).map((ref,i)=>{
    const sample=actual[i];
    const valid=sample&&sample.x===ref.x&&sample.y===ref.y&&
      Array.isArray(sample.rgba)&&sample.rgba.length===4&&
      sample.rgba.every(x=>Number.isInteger(x)&&x>=0&&x<=255);
    const difference=valid?ref.rgba.map((v,j)=>Math.abs(v-sample.rgba[j])):
      [Infinity,Infinity,Infinity,Infinity];
    return {...ref,actual:valid?sample.rgba:null,difference,
      pass:!!valid&&difference.every(x=>x<=tolerance)};
  });
}
