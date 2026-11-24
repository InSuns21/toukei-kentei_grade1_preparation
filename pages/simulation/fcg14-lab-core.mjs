// Independent reference: graph conjugate gradient (not learner red/black SOR),
// gather face fluxes (not learner scatter), Float64 states, separate R8 interpolation.
export const FCG14_DEFAULTS=Object.freeze({N:48,buoyancy:.03,heatSource:3,smokeSource:1,kappa:.0005});
export function fcg14Reference(options={},steps=40){
 const {N,buoyancy,heatSource,smokeSource,kappa}={...FCG14_DEFAULTS,...options},dt=.025,h=1/N,vis=.001*dt*N*N;
 if(![32,48,64].includes(N)||!Number.isInteger(steps)||steps<0||steps>160||
   ![buoyancy,heatSource,smokeSource,kappa].every(Number.isFinite)||buoyancy<0||buoyancy>.06||heatSource<0||heatSource>4||smokeSource<0||smokeSource>1||kappa<0||kappa>.002)throw RangeError('reference bounds');
 const cells=N*N,idx=(i,j)=>i+N*j,U=(i,j)=>i+(N+1)*j,V=idx;
 const make=n=>new Float64Array(n);
 let u=make(N*(N+1)),v=make(u.length),q=make(cells),T=make(cells);
 const source=Float64Array.from(q,(_,k)=>Math.exp(-(((k%N+.5)/N-.44)**2+((Math.floor(k/N)+.5)/N-.12)**2)/.085**2));
 const neighbors=Array.from({length:cells},(_,k)=>{const i=k%N,j=Math.floor(k/N);return [i? k-1:-1,i<N-1?k+1:-1,j?k-N:-1,j<N-1?k+N:-1].filter(x=>x>=0);});
 const dot=(a,b)=>a.reduce((s,z,i)=>s+z*b[i],0);
 const mat=a=>Float64Array.from(a,(z,k)=>neighbors[k].reduce((s,l)=>s+z-a[l],0));
 function pressure(rhs){
  const p=make(cells);let residual=rhs.slice(),d=rhs.slice(),rr=dot(residual,residual);
  for(let i=0;i<16*N&&rr>1e-24;i++){
   const Ad=mat(d),den=dot(d,Ad);if(!(den>0))throw Error('reference CG breakdown');
   const alpha=rr/den;
   for(let k=0;k<cells;k++){p[k]+=alpha*d[k];residual[k]-=alpha*Ad[k];}
   const next=dot(residual,residual),beta=next/rr;
   for(let k=0;k<cells;k++)d[k]=residual[k]+beta*d[k];
   rr=next;
  }
  if(rr>1e-20)throw Error('reference CG residual');return p;
 }
 // Interpolate in index coordinates; coordinates are clamped at the nearest face.
 function interp(a,w,H,X,Y){
  const x=Math.max(0,Math.min(w-1,X)),y=Math.max(0,Math.min(H-1,Y)),i=Math.floor(x),j=Math.floor(y);
  const sx=x-i,sy=y-j,I=Math.min(i+1,w-1),J=Math.min(j+1,H-1);
  return (1-sx)*(1-sy)*a[i+w*j]+sx*(1-sy)*a[I+w*j]+(1-sx)*sy*a[i+w*J]+sx*sy*a[I+w*J];
 }
 function divergence(i,j,a,b){return N*(a[U(i+1,j)]-a[U(i,j)]+b[V(i,j+1)]-b[V(i,j)]);}
 let maxDiv=0;
 for(let n=0;n<steps;n++){
  const a=make(u.length),b=make(v.length);
  for(let j=0;j<N;j++)for(let i=1;i<N;i++){
   const k=U(i,j),ux=u[k],vy=interp(v,N,N+1,i-.5,j+.5);
   a[k]=interp(u,N+1,N,i-dt*N*ux,j-dt*N*vy)+vis*(u[k-1]+u[k+1]+u[U(i,Math.max(0,j-1))]+u[U(i,Math.min(N-1,j+1))]-4*ux);
  }
  for(let j=1;j<N;j++)for(let i=0;i<N;i++){
   const k=V(i,j),vy=v[k],ux=interp(u,N+1,N,i+.5,j-.5);
   b[k]=interp(v,N,N+1,i-dt*N*ux,j-dt*N*vy)+vis*(v[V(Math.max(0,i-1),j)]+v[V(Math.min(N-1,i+1),j)]+v[k-N]+v[k+N]-4*vy)+dt*buoyancy*(T[k-N]+T[k])/2;
  }
  const p=pressure(Float64Array.from(q,(_,k)=>-h*h/dt*divergence(k%N,Math.floor(k/N),a,b)));
  for(let j=0;j<N;j++)for(let i=1;i<N;i++)a[U(i,j)]-=dt*N*(p[idx(i,j)]-p[idx(i-1,j)]);
  for(let j=1;j<N;j++)for(let i=0;i<N;i++)b[V(i,j)]-=dt*N*(p[idx(i,j)]-p[idx(i,j-1)]);
  u=a;v=b;let out=0;maxDiv=0;
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
   out=Math.max(out,N*(Math.max(0,-u[U(i,j)])+Math.max(0,u[U(i+1,j)])+Math.max(0,-v[V(i,j)])+Math.max(0,v[V(i,j+1)])));
   maxDiv=Math.max(maxDiv,Math.abs(divergence(i,j,u,v)));
  }
  const sub=Math.max(1,Math.ceil(dt*(out+4*kappa*N*N)/.9)),ds=dt/sub;
  function gather(z,rate){
   for(let n=0;n<sub;n++){
    const fx=make(u.length),fy=make(v.length);
    const flux=(left,right,w)=>w*(w>=0?left:right)-kappa*N*(right-left);
    for(let j=0;j<N;j++)for(let i=1;i<N;i++)fx[U(i,j)]=flux(z[idx(i-1,j)],z[idx(i,j)],u[U(i,j)]);
    for(let j=1;j<N;j++)for(let i=0;i<N;i++)fy[V(i,j)]=flux(z[idx(i,j-1)],z[idx(i,j)],v[V(i,j)]);
    z=Float64Array.from(z,(x,k)=>{const i=k%N,j=Math.floor(k/N);return x-ds*N*(fx[U(i+1,j)]-fx[U(i,j)]+fy[V(i,j+1)]-fy[V(i,j)])+ds*rate*source[k];});
   }
   return z;
  }
  q=gather(q,smokeSource);T=gather(T,heatSource);
 }
 const integral=a=>a.reduce((s,z)=>s+z,0)*h*h;
 const M=integral(q),Y=M?integral(Float64Array.from(q,(z,k)=>z*(Math.floor(k/N)+.5)*h))/M:0;
 return {u,v,q,T,M,Y,heat:integral(T),sourceIntegral:integral(source),maxDiv};
}
let cachedKey='',cachedState;
function cached(options){
 const key=JSON.stringify({...FCG14_DEFAULTS,...options});if(key!==cachedKey){cachedState=fcg14Reference(options);cachedKey=key;}return cachedState;
}
const enc=z=>Math.round(255*Math.min(1,Math.max(0,z)))/255;
function textureSample(a,N,x,y,scale){
 const X=Math.max(0,Math.min(N-1,N*x-.5)),Y=Math.max(0,Math.min(N-1,N*y-.5));
 const i=Math.floor(X),j=Math.floor(Y),I=Math.min(N-1,i+1),J=Math.min(N-1,j+1),s=X-i,t=Y-j;
 const f=(i,j)=>enc(a[i+N*j]/scale);
 return (1-s)*(1-t)*f(i,j)+s*(1-t)*f(I,j)+(1-s)*t*f(i,J)+s*t*f(I,J);
}
export function expectedFCG14Samples(w,h,options={}){
 const N=options.N??48,z=cached(options),aspect=w/h,sx=Math.max(2,aspect),sy=Math.max(1,2/aspect),out=[];
 // Interior probes avoid the source-ring overlay and sparse velocity arrows.
 const points=[[0,.44,.14],[0,.42,.21],[0,.35,.15],[0,.6,.32],[1,5/12+.004,2/12+.004],[1,6/12+.004,3/12+.004],[1,4/12+.004,2/12+.004]];
 for(const [panel,u,v]of points){
  const x=Math.floor(w*((panel+u-1)/sx+.5)),y=Math.floor(h*((v-.5)/sy+.5));
  const p=((x+.5)/w-.5)*sx+1,Y=((y+.5)/h-.5)*sy+.5,X=p-panel;
  if(x<0||x>=w||y<0||y>=h||X<.005||X>.995||Y<.005||Y>.995||Math.abs(Math.hypot(X-.44,Y-.12)-.085)<.007)continue;
  if(panel&&Math.hypot((X*12)%1-.5,(Y*12)%1-.5)<.55)continue;
  const f=Math.sqrt(textureSample(panel?z.T:z.q,N,X,Y,panel?8:2)),bg=[.035,.045,.065],fg=panel?[1,.72,.24]:[.91,.94,.98];
  out.push({label:(panel?'温度':'煙')+' '+X.toFixed(2)+','+Y.toFixed(2),x,y,rgba:bg.map((a,k)=>Math.round(255*(a+(fg[k]-a)*f))).concat(255)});
 }
 return out;
}
export function compareFCG14Readback(samples,w,h,options={}){
 return expectedFCG14Samples(w,h,options).map((p,i)=>{
  const s=samples[i],valid=s&&s.x===p.x&&s.y===p.y&&Array.isArray(s.rgba)&&s.rgba.length===4;
  const difference=valid?p.rgba.map((v,k)=>Math.abs(v-s.rgba[k])):[Infinity,Infinity,Infinity,Infinity];
  return {...p,actual:valid?s.rgba:null,difference,pass:valid&&difference.every(v=>v<=3)};
 });
}
