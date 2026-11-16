// WGL8: independent analytic CPU oracle (not based on GPU output).
export const BACK = Object.freeze([0.2,0.2,0.2,1]);
export const A = Object.freeze([0.8,0.2,0.1,0.5]);
export const B = Object.freeze([0.1,0.3,0.9,0.4]);
export function decodeSrgb(s) {
  if (!Number.isFinite(s) || s < 0 || s > 1) throw new RangeError('sRGB must be in [0,1]');
  return s <= 0.04045 ? s/12.92 : ((s+0.055)/1.055)**2.4;
}
export function encodeSrgb(l) {
  if (!Number.isFinite(l) || l < 0 || l > 1) throw new RangeError('linear light must be in [0,1]');
  return l <= 0.0031308 ? 12.92*l : 1.055*l**(1/2.4)-0.055;
}
// Straight-alpha source-over in a common arithmetic space.
// If the bottom is opaque, output is opaque.
export function sourceOver(front, back) {
  const a=front[3]+(1-front[3])*back[3];
  const premult=[0,1,2].map(i=>front[3]*front[i]+(1-front[3])*back[3]*back[i]);
  return [...premult.map(p=>a===0?0:p/a),a];
}
export function linearSourceOver(front, back) {
  const decoded=v=>[...v.slice(0,3).map(decodeSrgb),v[3]];
  const output=sourceOver(decoded(front),decoded(back));
  return [...output.slice(0,3).map(encodeSrgb),output[3]];
}
const inA=(u,v)=>u>=.1&&u<.75&&v>=.2&&v<.85;
const inB=(u,v)=>u>=.4&&u<.9&&v>=.4&&v<.75;
export function expectedAt(u,v,linear=false,reverseOrder=false) {
  let color=[...BACK];
  const order=reverseOrder?[[B,inB],[A,inA]]:[[A,inA],[B,inB]];
  for(const [layer,inside] of order) if(inside(u,v)) {
    color=(linear?linearSourceOver:sourceOver)(layer,color);
  }
  return color;
}
export function expectedWGL8Samples(width,height) {
  if (![width,height].every(Number.isInteger) ||
      width<64||height<64||width>1024||height>1024||width*height>524288)
    throw new RangeError('invalid drawing buffer');
  const wLeft=Math.floor(width/2);
  const spots=[
    ['背景',.05,.05], ['Aのみ',.25,.5],
    ['Bのみ',.82,.5], ['AとB重複',.55,.5]
  ];
  const result=[];
  for(const [side,xStart,vpWidth,linear] of [
    ['符号化値で合成（左）',0,wLeft,false],
    ['線形光で合成（右）',wLeft,width-wLeft,true]
  ]) {
    for(const [name,u,v] of spots) {
      const localX=Math.floor(vpWidth*u);
      const y=Math.floor(height*v);
      const pointU=(localX+0.5)/vpWidth;
      const pointV=(y+0.5)/height;
      const rgba=expectedAt(pointU,pointV,linear).map(x=>Math.round(255*x));
      result.push({label:side+' '+name,x:xStart+localX,y,rgba});
    }
  }
  return result;
}
export function compareWGL8Readback(actual,width,height,tolerance=4) {
  return expectedWGL8Samples(width,height).map((expected,i)=>{
    const found=actual[i];
    const valid=found&&found.x===expected.x&&found.y===expected.y&&
      Array.isArray(found.rgba)&&found.rgba.length===4&&
      found.rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255);
    const difference=valid?expected.rgba.map((v,j)=>Math.abs(v-found.rgba[j])):
      [Infinity,Infinity,Infinity,Infinity];
    return {...expected,actual:valid?found.rgba:null,difference,
      pass:!!valid&&difference.every(v=>v<=tolerance)};
  });
}
