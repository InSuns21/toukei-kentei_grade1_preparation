// Closed-form solution along a column, independent of the iterative lab state.
export const FCG16_DEFAULTS=Object.freeze({reaction:.18,cooling:.28,decay:.04,emission:3,extinction:5});
export function referenceState(i,j,frame=0,options={}){
 const {reaction:r,cooling:c,decay:d}={...FCG16_DEFAULTS,...options};
 const x=(i+.5)/48,t=(frame-j)*.05;
 const f=Math.exp(-Math.pow((x-.5-.08*Math.sin(3*t))/.1,2)),a=1-r;
 function sum(b){return Math.abs(a-b)<1e-10?(j===0?0:j*Math.pow(a,j-1)):(Math.pow(a,j)-Math.pow(b,j))/(a-b);}
 return [f*Math.pow(a,j),r*f*sum(1-c),r*f*sum(1-d)];
}
export function expectedFCG16Samples(w,h,options={}){
 const o={...FCG16_DEFAULTS,...options},sx=Math.max(3,w/h),sy=Math.max(1,3*h/w),out=[];
 for(let panel=0;panel<3;panel++)for(const [u,v] of [[.5,.12],[.5,.4],[.12,.75]]){
  const x=Math.floor(w*((panel+u-1.5)/sx+.5)),y=Math.floor(h*((v-.5)/sy+.5));
  const X=((x+.5)/w-.5)*sx+1.5-panel,Y=((y+.5)/h-.5)*sy+.5;
  if(x<0||x>=w||y<0||y>=h||X<=0||X>=1||Y<=0||Y>=1)continue;
  const [,H,S]=referenceState(Math.floor(48*X),Math.floor(48*Y),0,o).map(q=>Math.round(255*q)/255);
  const bg=(Math.floor(8*X)+Math.floor(8*Y))%2?[.57,.62,.69]:[.22,.27,.34];
  const m=Math.min(1,3*H),J=[1,.12+.83*m,.015+.535*m].map(a=>a*o.emission*H);
  const sigma=o.extinction*S,tr=Math.exp(-sigma),A=sigma===0?1:-Math.expm1(-sigma)/sigma;
  const col=bg.map((b,k)=>panel===1?J[k]:tr*b+(panel===0?A*J[k]:0));
  out.push({label:['合成','発光','煙'][panel]+' '+X.toFixed(2)+','+Y.toFixed(2),x,y,rgba:col.map(a=>Math.round(255*Math.max(0,Math.min(1,a)))).concat(255)});
 }
 return out;
}
export function compareFCG16Readback(samples,w,h,options={}){
 return expectedFCG16Samples(w,h,options).map((p,i)=>{
  const s=samples[i],valid=s&&s.x===p.x&&s.y===p.y&&Array.isArray(s.rgba)&&s.rgba.length===4;
  const difference=valid?p.rgba.map((v,k)=>Math.abs(v-s.rgba[k])):[Infinity,Infinity,Infinity,Infinity];
  return {...p,actual:valid?s.rgba:null,difference,pass:!!valid&&difference.every(v=>v<=3)};
 });
}
