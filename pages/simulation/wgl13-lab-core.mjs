// WGL13 CPU reference for cube-face orientation and nearest 2x2 texture sampling.
// Independent of WebGL implementation and the learner's shader.
export const CUBE_FACE_COLORS = Object.freeze([
  [224,48,48], [48,224,48], [48,48,224],
  [224,224,48], [224,48,224], [48,224,224]
]);
export const CUBE_FACE_NAMES = Object.freeze(['+X','-X','+Y','-Y','+Z','-Z']);
export const CUBE_PROBE_DIRECTIONS = Object.freeze([
  [1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1],
  [1,0.5,0.5],[-1,0.5,-0.5],[-0.5,1,-0.5],
  [-0.5,-1,0.5],[-0.5,0.5,1],[0.5,0.5,-1]
]);
const BRIGHTNESS=[0.55,0.70,0.85,1.0];
export function cubeFaceCoordinates(direction) {
  if(!Array.isArray(direction)||direction.length!==3||
     direction.some(v=>!Number.isFinite(v))||
     direction.every(v=>v===0)) throw new RangeError('finite nonzero 3D direction required');
  const [x,y,z]=direction, ax=Math.abs(x),ay=Math.abs(y),az=Math.abs(z);
  let face,sc,tc,ma;
  // Tie-break X, then Y, then Z; never test exact edge ties in GPU probes.
  if(ax>=ay && ax>=az) {
    face=x>0?0:1; ma=ax; sc=x>0?-z:z; tc=-y;
  } else if(ay>=ax && ay>=az) {
    face=y>0?2:3; ma=ay; sc=x; tc=y>0?z:-z;
  } else {
    face=z>0?4:5; ma=az; sc=z>0?x:-x; tc=-y;
  }
  return {face,s:(sc/ma+1)/2,t:(tc/ma+1)/2};
}
export function cubeTexelColor(direction) {
  const {face,s,t}=cubeFaceCoordinates(direction);
  const column=Math.min(1,Math.max(0,Math.floor(2*s)));
  const row=Math.min(1,Math.max(0,Math.floor(2*t)));
  return [...CUBE_FACE_COLORS[face].map(c=>Math.round(c*BRIGHTNESS[2*row+column])),255];
}
export function reflectIncoming(incoming,normal) {
  const norm=Math.hypot(...normal);
  if(!Number.isFinite(norm)||norm===0) throw new RangeError('nonzero normal required');
  const n=normal.map(x=>x/norm);
  const dot=incoming.reduce((sum,x,i)=>sum+x*n[i],0);
  return incoming.map((x,i)=>x-2*dot*n[i]);
}
export function expectedWGL13Samples(width,height) {
  if(!Number.isInteger(width)||!Number.isInteger(height)||
      width<64||height<64||width>1024||height>1024||
      width*height>524288) throw new RangeError('invalid canvas dimensions');
  return CUBE_PROBE_DIRECTIONS.map((direction,x)=>({
    label:(x<6?'面中心 ':'面UV左下 ')+CUBE_FACE_NAMES[x%6],
    x,y:0,rgba:cubeTexelColor(direction),
  }));
}
export function compareWGL13Readback(actual,width,height,tolerance=1) {
  if(!Number.isFinite(tolerance)||tolerance<0) throw new RangeError('invalid tolerance');
  return expectedWGL13Samples(width,height).map((reference,i)=>{
    const item=actual[i];
    const valid=!!item&&item.x===reference.x&&item.y===reference.y&&
      Array.isArray(item.rgba)&&item.rgba.length===4&&
      item.rgba.every(x=>Number.isInteger(x)&&x>=0&&x<=255);
    const difference=valid?reference.rgba.map((v,k)=>Math.abs(v-item.rgba[k])):[Infinity,Infinity,Infinity,Infinity];
    return {...reference,actual:valid?item.rgba:null,difference,pass:valid&&difference.every(x=>x<=tolerance)};
  });
}
