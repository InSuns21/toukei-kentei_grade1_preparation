// Independent initial-volume oracle: compute optical depth and the closed-form
// color for constant source, not the shader's recursive color accumulation.
export const FCG15_DEFAULTS=Object.freeze({N:48,extinction:6,scattering:.8,samples:64,rise:.13,spin:1,homogeneous:0});
const lobes=[[.55,.44,.24,.50,.24,.20,.24],[.30,.59,.34,.55,.19,.21,.17],[.15,.38,.42,.40,.16,.17,.17]];
export function referenceDensity(x,y,z,t,options={}){
 const o={...FCG15_DEFAULTS,...options};
 if(o.homogeneous)return .5;
 const c=Math.cos(o.spin*t),s=Math.sin(o.spin*t),dx=x-.5,dz=z-.5;
 const p=[.5+c*dx+s*dz,y-o.rise*t,.5-s*dx+c*dz];
 return lobes.reduce((q,[w,a,b,c,rx,ry,rz])=>{
  const distance=[(p[0]-a)/rx,(p[1]-b)/ry,(p[2]-c)/rz].reduce((u,v)=>u+v*v,0);
  return q+w*Math.pow(Math.max(0,1-distance),2);
 },0);
}
export function referenceTexture(x,y,z,t,options={}){
 const o={...FCG15_DEFAULTS,...options},N=o.N;
 const axes=[x,y,z].map(v=>{
  const f=Math.min(N-1,Math.max(0,N*v-.5)),lo=Math.floor(f);
  return [[lo,1-(f-lo)],[Math.min(lo+1,N-1),f-lo]];
 });
 let q=0;
 for(const [i,a]of axes[0])for(const [j,b]of axes[1])for(const [k,c]of axes[2]){
  q+=a*b*c*Math.round(255*referenceDensity((i+.5)/N,(j+.5)/N,(k+.5)/N,t,o))/255;
 }
 return q;
}
export function referenceTransmittance(x,y,t,options={}){
 const o={...FCG15_DEFAULTS,...options};
 let sum=0;
 for(let i=0;i<o.samples;i++)sum+=referenceTexture(x,y,(i+.5)/o.samples,t,o);
 return Math.exp(-o.extinction*sum/o.samples);
}
export function expectedFCG15Samples(w,h,options={}){
 const o={...FCG15_DEFAULTS,...options},aspect=w/h,sx=Math.max(2,aspect),sy=Math.max(1,2/aspect);
 const points=[[0,.44,.24],[0,.59,.34],[0,.38,.42],[0,.81,.81],[1,.44,.24],[1,.59,.34],[1,.38,.42]];
 const out=[];
 for(const [panel,u,v]of points){
  const x=Math.floor(w*((panel+u-1)/sx+.5)),y=Math.floor(h*((v-.5)/sy+.5));
  const X=((x+.5)/w-.5)*sx+1-panel,Y=((y+.5)/h-.5)*sy+.5;
  if(x<0||x>=w||y<0||y>=h||X<=0||X>=1||Y<=0||Y>=1)continue;
  let color;
  if(panel){
   const q=referenceTexture(X,Y,.5,0,o);
   color=[.04,.06,.09].map((a,k)=>a+q*([.98,.85,.42][k]-a));
  }else{
   const bg=(Math.floor(X*8)+Math.floor(Y*8))%2?[.22,.27,.34]:[.055,.08,.12];
   const T=referenceTransmittance(X,Y,0,o);
   color=bg.map((a,k)=>T*a+(1-T)*o.scattering*[.95,.97,1][k]);
  }
  out.push({label:(panel?'断面':'体積')+' '+X.toFixed(2)+','+Y.toFixed(2),x,y,rgba:color.map(v=>Math.round(255*v)).concat(255)});
 }
 return out;
}
export function compareFCG15Readback(samples,w,h,options={}){
 return expectedFCG15Samples(w,h,options).map((p,i)=>{
  const s=samples[i],valid=s&&s.x===p.x&&s.y===p.y&&Array.isArray(s.rgba)&&s.rgba.length===4;
  const difference=valid?p.rgba.map((v,k)=>Math.abs(v-s.rgba[k])):[Infinity,Infinity,Infinity,Infinity];
  return {...p,actual:valid?s.rgba:null,difference,pass:!!valid&&difference.every(v=>v<=3)};
 });
}
