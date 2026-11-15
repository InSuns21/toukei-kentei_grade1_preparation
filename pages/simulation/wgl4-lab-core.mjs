// WGL4: WebGL・GLSL・matrix bufferを読まず、モデル点の平面幾何から計算するCPU oracle。
import {pixelToNdc} from './wgl-lab-core.mjs';

export const DEFAULT_MODEL = Object.freeze({
  tx: 0.25, ty: -0.1, degrees: 90, sx: 1, sy: 0.5
});
export const LOCAL_CORNERS = Object.freeze([
  Object.freeze([-0.4,-0.3]),Object.freeze([0.4,-0.3]),
  Object.freeze([0.4,0.3]),Object.freeze([-0.4,0.3])
]);

export function worldPoint([x,y], p = DEFAULT_MODEL) {
  const a = p.degrees * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
  return [p.tx + c*p.sx*x - s*p.sy*y, p.ty + s*p.sx*x + c*p.sy*y];
}
export function localPoint([x,y], p = DEFAULT_MODEL) {
  if (!Number.isFinite(p.sx) || !Number.isFinite(p.sy) || p.sx === 0 || p.sy === 0) {
    throw new RangeError('逆変換には非零で有限な拡大率が必要です');
  }
  const a = p.degrees * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
  const dx = x - p.tx, dy = y - p.ty;
  return [(c*dx+s*dy)/p.sx, (-s*dx+c*dy)/p.sy];
}
export function referenceCorners() {
  return LOCAL_CORNERS.map(point => worldPoint(point));
}
const PROBES = Object.freeze([
  {label:'右上内側', ndc:[0.33,0.12]},
  {label:'左下内側', ndc:[0.14,-0.26]},
  {label:'原点付近の背景', ndc:[-0.25,0.25]},
  {label:'左下背景', ndc:[-0.9,-0.9]}
]);
export function expectedWGL4Samples(width,height) {
  return PROBES.map(probe=>{
    // 画素中心へ丸めた位置に対し、CPU側で逆変換して矩形の内外を判定。
    const x=Math.min(width-1,Math.max(0,Math.floor((probe.ndc[0]+1)*width/2)));
    const y=Math.min(height-1,Math.max(0,Math.floor((probe.ndc[1]+1)*height/2)));
    const ndc=pixelToNdc(x,y,width,height), local=localPoint(ndc);
    const inside=Math.abs(local[0])<0.4 && Math.abs(local[1])<0.3;
    return {label:probe.label,x,y,ndc,local,inside,
      rgba:inside?[51,153,204,255]:[0,0,0,255]};
  });
}
export function compareWGL4Readback(samples,width,height,tolerance=1) {
  return expectedWGL4Samples(width,height).map((expected,index)=>{
    const actual=samples[index];
    const valid=actual && actual.x===expected.x && actual.y===expected.y &&
      Array.isArray(actual.rgba) && actual.rgba.length===4 &&
      actual.rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255);
    const difference=valid? expected.rgba.map((v,k)=>Math.abs(v-actual.rgba[k])) :
      [Infinity,Infinity,Infinity,Infinity];
    return {...expected,actual:valid?actual.rgba:null,difference,
      pass:!!valid&&difference.every(v=>v<=tolerance)};
  });
}
