// Independent direct cosine sum: no FFT, no learner source evaluation.
export const FCG13_DEFAULTS=Object.freeze({time:2,amplitude:0.35,modeCount:6,wavelengthScale:1,direction:0});
export function fcg13Direct(options={},x=0,y=0){
 const o={...FCG13_DEFAULTS,...options};
 if(![o.time,o.amplitude,o.modeCount,o.wavelengthScale,o.direction].every(Number.isFinite)||o.time<0||o.time>20||o.amplitude<0||o.amplitude>0.5||
 !Number.isInteger(o.modeCount)||o.modeCount<1||o.modeCount>8||![1,2,3].includes(o.wavelengthScale)||![0,1,2,3].includes(o.direction))throw RangeError('FCG13 parameter range');
 const waves=[[1,0],[1,1],[2,-1],[3,1],[4,-2],[2,3],[5,2],[3,-4]];
 let h=0,dx=0,dy=0;
 for(let j=0;j<o.modeCount;j++){
  const [a,b]=waves[j],rot=[[a,b],[-b,a],[-a,-b],[b,-a]][o.direction];
  const kx=rot[0]*o.wavelengthScale*Math.PI/32,ky=rot[1]*o.wavelengthScale*Math.PI/32;
  const p=kx*x+ky*y-Math.sqrt(9.81*Math.hypot(kx,ky))*o.time+0.83*j;
  const A=o.amplitude/(j+1);
  h+=A*Math.cos(p);dx-=A*kx*Math.sin(p);dy-=A*ky*Math.sin(p);
 }
 return [h,dx,dy];
}
export function expectedFCG13Samples(w,h,options={}){
 const points=[];
 for(const [i,j] of [[5,7],[13,42],[27,16],[40,34],[56,53]]){
  const x=Math.floor((0.47+0.40*(2*(i+0.5)/64-1))*w/2);
  const y=Math.floor((1+0.65*(2*(j+0.5)/64-1))*h/2);
  const X=64*(1+(2*(x+0.5)/w-0.47)/0.40)/2;
  const Y=64*(1+(2*(y+0.5)/h-1)/0.65)/2;
  if(X<0||X>=64||Y<0||Y>=64||Math.min(X%1,1-X%1,Y%1,1-Y%1)<0.01)continue;
  const z=fcg13Direct(options,Math.floor(X),Math.floor(Y))[0],a=Math.max(0,Math.min(1,0.5+0.5*z));
  const rgba=[0.06+0.60*a,0.20+0.67*a,0.38+0.55*a].map(c=>Math.round(255*c)).concat(255);
  points.push({label:'高さ標本 '+Math.floor(X)+','+Math.floor(Y),x,y,rgba});
 }
 points.push({label:'背景',x:0,y:0,rgba:[10,18,28,255]});
 return points;
}
export function compareFCG13Readback(samples,w,h,options={}){
 return expectedFCG13Samples(w,h,options).map((p,i)=>{
  const s=samples[i],valid=s&&s.x===p.x&&s.y===p.y&&Array.isArray(s.rgba)&&s.rgba.length===4;
  const difference=valid?p.rgba.map((v,k)=>Math.abs(v-s.rgba[k])):[Infinity,Infinity,Infinity,Infinity];
  return {...p,actual:valid?s.rgba:null,difference,pass:valid&&difference.every(v=>v<=3)};
 });
}
