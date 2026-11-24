// Independent CPU reference using vector decomposition and analytic rays.
export const FCG10_DEFAULTS=Object.freeze({angle:30,indexWater:1.33,amplitude:0.03,phase:0,absorption:0.8,side:'air',mode:'mixed'});
const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
export function optics(I,N,n1,n2){
 const c=Math.min(1,Math.max(0,-dot(I,N))),ratio=n1/n2;
 const U=I.map((v,j)=>v+c*N[j]),s2=dot(U,U)*ratio*ratio;
 const k=1-s2,R=I.map((v,j)=>v+2*c*N[j]);
 if(k<0)return {R,T:null,F:1,k};
 const d=Math.sqrt(k),T=U.map((v,j)=>ratio*v-d*N[j]);
 if(n1===n2)return {R,T,F:0,k};
 if(c===0||d===0)return {R,T,F:1,k};
 const a=n1*c,b=n2*d,e=n2*c,f=n1*d;
 const F=((a-b)**2/(a+b)**2+(e-f)**2/(e+f)**2)/2;
 return {R,T,F,k};
}
function rgb(x,y,o){
 const {angle,indexWater,amplitude,phase,absorption,side,mode}=o;
 const sign=side==='air'?1:-1,w=2*Math.PI,A=w*x-phase,B=w*y;
 const h=amplitude*Math.sin(A)*Math.cos(B);
 const raw=[-w*amplitude*Math.cos(A)*Math.cos(B),w*amplitude*Math.sin(A)*Math.sin(B),1];
 const len=Math.hypot(...raw),N=raw.map(v=>sign*v/len),theta=angle*Math.PI/180,I=[Math.sin(theta),0,-sign*Math.cos(theta)];
 const dark=[0.025,0.035,0.05];
 if(dot(I,N)>=0)return dark;
 const {R,T,F}=optics(I,N,side==='air'?1:indexWater,side==='air'?indexWater:1);
 function sky(D){if(D[2]<=0)return dark;
  const q=(1+Math.cos(12*D[0]+5*D[1]))/2;
  return [0.18,0.42,0.78].map((v,i)=>v+([0.90,0.93,0.98][i]-v)*q*q);
 }
 function floor(D){if(D[2]>=-0.0001)return dark;
  const l=(0.5+h)/(-D[2]),X=x+l*D[0],Y=y+l*D[1];
  const q=(1+Math.cos(5*w*X)*Math.cos(5*w*Y))/2;
  return [0.12,0.27,0.36].map((v,i)=>(v+([0.85,0.82,0.62][i]-v)*q)*Math.exp(-absorption*l*[1.6,0.65,0.18][i]));
 }
 const Rgb=sign>0?sky(R):floor(R),Tr=T?(sign>0?floor(T):sky(T)):[0,0,0];
 return mode==='reflection'?Rgb:mode==='transmission'?Tr:Rgb.map((v,i)=>F*v+(1-F)*Tr[i]);
}
export function expectedFCG10Samples(width,height,options={}){
 const o={...FCG10_DEFAULTS,...options};
 return [[0.22,0.31],[0.51,0.53],[0.78,0.72]].map(([u,v],i)=>{
  const x=Math.floor(u*width),y=Math.floor(v*height);
  return {label:'水面標本 '+(i+1),x,y,rgba:rgb((x+0.5)/width,(y+0.5)/height,o).map(v=>Math.round(255*Math.min(1,Math.max(0,v)))).concat(255)};
 });
}
export function compareFCG10Readback(samples,width,height,options={}){
 return expectedFCG10Samples(width,height,options).map((p,i)=>{
  const a=samples[i],valid=a&&a.x===p.x&&a.y===p.y&&Array.isArray(a.rgba)&&a.rgba.length===4;
  const difference=valid?p.rgba.map((v,k)=>Math.abs(v-a.rgba[k])):[Infinity,Infinity,Infinity,Infinity];
  return {...p,actual:valid?a.rgba:null,difference,pass:valid&&difference.every(v=>v<=3)};
 });
}
