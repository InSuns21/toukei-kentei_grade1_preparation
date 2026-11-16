// WGL5: GPU codeと独立なray-box交差でCPUの可視画素を計算する。
import {pixelToNdc} from './wgl-lab-core.mjs';

export const WGL5_COLORS=Object.freeze({
  near:Object.freeze([230,77,51,255]),
  far:Object.freeze([51,153,230,255]),
  background:Object.freeze([0,0,0,255])
});
const CUBES=Object.freeze([
  Object.freeze({name:'near',center:[-.15,0,-2]}),
  Object.freeze({name:'far',center:[.4,0,-3]})
]);
export function depthAtDistance(d,near=1,far=9){
  if(!(near>0&&far>near&&d>=near&&d<=far))throw new RangeError('距離またはnear/farが不正');
  return far/(far-near)-far*near/((far-near)*d);
}
export function perspectiveNdc([x,y,z],aspect,near=1,far=9){
  if(!(z<0&&aspect>0&&near>0&&far>near))throw new RangeError('透視座標が不正');
  const d=-z;
  return [x/(aspect*d),y/d,2*depthAtDistance(d,near,far)-1];
}
function hitBox(ray,cube){
  // eye=(0,0,1)、ray=(nx*aspect,ny,-1)、tは視線方向距離。
  const eye=[0,0,1];let entry=-Infinity,exit=Infinity;
  for(let axis=0;axis<3;axis++){
    const low=cube.center[axis]-.5,high=cube.center[axis]+.5,v=ray[axis];
    if(Math.abs(v)<1e-12){
      if(eye[axis]<low||eye[axis]>high)return null;
      continue;
    }
    let a=(low-eye[axis])/v,b=(high-eye[axis])/v;
    if(a>b)[a,b]=[b,a];
    entry=Math.max(entry,a);exit=Math.min(exit,b);
    if(entry>exit)return null;
  }
  if(exit<1||entry>9)return null;
  return Math.max(1,entry);
}
export function visibleObjectAtNdc(ndc,aspect){
  const ray=[ndc[0]*aspect,ndc[1],-1]; // 90°垂直視野
  return CUBES.map(c=>({name:c.name,t:hitBox(ray,c)}))
    .filter(h=>h.t!==null).sort((a,b)=>a.t-b.t)[0]??null;
}
export function expectedWGL5Samples(width,height){
  if(!Number.isInteger(width)||!Number.isInteger(height)||width<1||height<1)
    throw new RangeError('描画バッファ寸法が不正');
  const aspect=width/height;
  const probes=[
    {label:'重なり・手前',ndc:[0,0]},
    {label:'奥だけ',ndc:[.75/(3.5*aspect),0]},
    {label:'上の背景',ndc:[0,.7]},
    {label:'左下の背景',ndc:[-.85,-.85]}
  ];
  return probes.map(p=>{
    const x=Math.max(0,Math.min(width-1,Math.floor((p.ndc[0]+1)*width/2)));
    const y=Math.max(0,Math.min(height-1,Math.floor((p.ndc[1]+1)*height/2)));
    const ndc=pixelToNdc(x,y,width,height);
    const hit=visibleObjectAtNdc(ndc,aspect);
    return {...p,x,y,ndc,visible:hit?.name??'background',
      distance:hit?.t??null,depth:hit?depthAtDistance(hit.t):null,
      rgba:[...WGL5_COLORS[hit?.name??'background']]};
  });
}
export function compareWGL5Readback(samples,width,height,tolerance=1){
  return expectedWGL5Samples(width,height).map((expected,i)=>{
    const actual=samples[i];
    const valid=actual&&actual.x===expected.x&&actual.y===expected.y&&
      Array.isArray(actual.rgba)&&actual.rgba.length===4&&
      actual.rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255);
    const difference=valid?expected.rgba.map((v,j)=>Math.abs(v-actual.rgba[j])):
      [Infinity,Infinity,Infinity,Infinity];
    return {...expected,actual:valid?actual.rgba:null,difference,
      pass:!!valid&&difference.every(v=>v<=tolerance)};
  });
}
