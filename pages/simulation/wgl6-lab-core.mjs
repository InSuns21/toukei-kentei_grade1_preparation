// WGL6 CPU oracle: independently evaluate barycentrics, reciprocal clip-w and RGBA8.
import {signedDoubleArea} from './wgl-lab-core.mjs';
export const SCREEN_TRIANGLE=Object.freeze([
  Object.freeze([-.75,-.65]),Object.freeze([.75,-.65]),Object.freeze([0,.8])
]);
export const CLIP_W=Object.freeze([1,2,4]);
export const UV=Object.freeze([[0,0],[1,0],[0,1]]);
export const BACKGROUND=Object.freeze([0,0,0,255]);
export function barycentricAt(point,triangle=SCREEN_TRIANGLE){
  const [a,b,c]=triangle;
  const area=signedDoubleArea(a,b,c);
  if(!Number.isFinite(area)||Math.abs(area)<1e-12)throw new RangeError('nondegenerate triangle required');
  return [signedDoubleArea(b,c,point)/area,
    signedDoubleArea(c,a,point)/area,
    signedDoubleArea(a,b,point)/area];
}
export function perspectiveWeights(lambda,weights=CLIP_W){
  if(lambda.length!==3||weights.length!==3||
     lambda.some(v=>!Number.isFinite(v)||v<0)||
     Math.abs(lambda.reduce((a,b)=>a+b,0)-1)>1e-9||
     weights.some(v=>!Number.isFinite(v)||v<=0))
    throw new RangeError('nonnegative barycentric weights summing to 1 and positive clip w required');
  const scaled=lambda.map((v,i)=>v/weights[i]);
  const denominator=scaled.reduce((a,b)=>a+b,0);
  return scaled.map(v=>v/denominator);
}
export function interpolateUv(lambda,mode){
  const weights=mode==='perspective'?perspectiveWeights(lambda):
    mode==='affine'?lambda:null;
  if(!weights)throw new RangeError('unknown interpolation mode');
  return UV[0].map((_,component)=>weights.reduce((sum,v,i)=>
    sum+v*UV[i][component],0));
}
export function ndcInViewport(x,y,viewportX,viewportWidth,height){
  if(viewportWidth<=0||height<=0||x<viewportX||x>=viewportX+viewportWidth||
     y<0||y>=height)throw new RangeError('pixel outside viewport');
  return [2*(x-viewportX+.5)/viewportWidth-1,2*(y+.5)/height-1];
}
export function sampledPixel(x,y,viewportX,viewportWidth,height,mode){
  const ndc=ndcInViewport(x,y,viewportX,viewportWidth,height);
  const lambda=barycentricAt(ndc);
  const inside=lambda.every(v=>v>=1e-10);
  if(!inside)return {ndc,lambda,inside:false,uv:null,rgba:[...BACKGROUND]};
  const uv=interpolateUv(lambda,mode);
  const frequency=3;
  const fraction=v=>((v*frequency)%1+1)%1;
  const grid=Math.min(fraction(uv[0]),fraction(uv[1]));
  const rgb=grid<.03?[.05,.05,.05]:[uv[0],uv[1],.25];
  const rgba=rgb.map(v=>Math.round(255*Math.max(0,Math.min(1,v)))).concat(255);
  return {ndc,lambda,inside:true,uv,rgba};
}
export function expectedWGL6Samples(width,height){
  if(!Number.isInteger(width)||!Number.isInteger(height)||width<64||height<64)
    throw new RangeError('invalid buffer dimensions');
  const leftWidth=Math.floor(width/2);
  const viewports=[
    {name:'透視補正',mode:'perspective',x:0,width:leftWidth},
    {name:'画面単純',mode:'affine',x:leftWidth,width:width-leftWidth}
  ];
  const probes=[
    {label:'A寄り',weights:[.55,.25,.20]},
    {label:'B寄り',weights:[.30,.55,.15]},
    {label:'C寄り',weights:[.25,.20,.55]}
  ];
  const out=[];
  for(const vp of viewports){
    for(const probe of probes){
      const ndc=SCREEN_TRIANGLE[0].map((_,component)=>
        probe.weights.reduce((sum,v,i)=>sum+v*SCREEN_TRIANGLE[i][component],0));
      const x=vp.x+Math.max(0,Math.min(vp.width-1,Math.floor((ndc[0]+1)*vp.width/2)));
      const y=Math.max(0,Math.min(height-1,Math.floor((ndc[1]+1)*height/2)));
      out.push({label:vp.name+' '+probe.label,x,y,
        ...sampledPixel(x,y,vp.x,vp.width,height,vp.mode)});
    }
    const x=vp.x,y=0;
    out.push({label:vp.name+' 背景',x,y,
      ...sampledPixel(x,y,vp.x,vp.width,height,vp.mode)});
  }
  return out;
}
export function compareWGL6Readback(samples,width,height,tolerance=3){
  return expectedWGL6Samples(width,height).map((expected,i)=>{
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
