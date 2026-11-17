// WGL14 pure CPU oracle: do NOT import GLSL or execute the learner's JavaScript.
const GRID=8;
function finiteCanvas(w,h) {
  if(!Number.isInteger(w)||!Number.isInteger(h)||w<64||h<64||
    w>1024||h>1024||w*h>524288) throw new RangeError('invalid canvas');
}
const clamp=(x)=>Math.max(0,Math.min(GRID-1,x));
export function sceneByte(x,y) {
  if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||x>=GRID||y<0||y>=GRID)
    throw new RangeError('invalid texel');
  return x===0&&y===0?90:x===3&&y===3?255:0;
}
export function filterByte(x,y,mode='blur') {
  if(!['blur','edge'].includes(mode)) throw new RangeError('invalid filter');
  const at=(i,j)=>sceneByte(clamp(i),clamp(j));
  if(mode==='blur') {
    let total=0;
    for(let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++) total+=at(x+dx,y+dy);
    return Math.round(total/9);
  }
  return Math.max(0,Math.min(255,4*at(x,y)-at(x-1,y)-at(x+1,y)-at(x,y-1)-at(x,y+1)));
}
export function reinhardByte(byte,exposure=1) {
  if(!Number.isFinite(exposure)||exposure<0||!Number.isFinite(byte)||byte<0||byte>255)
    throw new RangeError('invalid tone-map input');
  const light=exposure*byte/255;
  return Math.round(255*light/(1+light));
}
export function expectedWGL14Samples(width,height) {
  finiteCanvas(width,height);
  const left=Math.floor(width/2);
  const checks=[
    ['原画 中央の白点',false,3,3],
    ['原画 白点の右隣',false,4,3],
    ['原画 左下の灰点',false,0,0],
    ['ぼかし 白点中心',true,3,3],
    ['ぼかし 白点の右隣',true,4,3],
    ['ぼかし 左下境界',true,0,0],
    ['ぼかし 右上の黒',true,7,7],
  ];
  return checks.map(([label,right,i,j])=>{
    const panelWidth=right?width-left:left;
    const x=(right?left:0)+Math.floor(panelWidth*(i+0.5)/GRID);
    const y=Math.floor(height*(j+0.5)/GRID);
    const byte=right?reinhardByte(filterByte(i,j)):sceneByte(i,j);
    return {label,x,y,rgba:[byte,byte,byte,255]};
  });
}
export function compareWGL14Readback(actual,width,height,tolerance=2) {
  if(!Number.isFinite(tolerance)||tolerance<0) throw new RangeError('invalid tolerance');
  return expectedWGL14Samples(width,height).map((expected,i)=>{
    const a=actual[i];
    const valid=!!a&&a.x===expected.x&&a.y===expected.y&&
      Array.isArray(a.rgba)&&a.rgba.length===4&&
      a.rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255);
    const difference=valid?expected.rgba.map((v,k)=>Math.abs(v-a.rgba[k])):[Infinity,Infinity,Infinity,Infinity];
    return {...expected,actual:valid?a.rgba:null,difference,
      pass:valid&&difference.every(v=>v<=tolerance)};
  });
}
