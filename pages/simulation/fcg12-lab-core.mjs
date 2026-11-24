// Independent gather-form finite-volume oracle (learner uses scatter of shared faces).
export const FCG12_DEFAULTS=Object.freeze({N:40,time:1,baseDepth:0.25,bump:0.5,maxDt:0.05,cfl:0.4});
export function fcg12State(options={}){
 const o={...FCG12_DEFAULTS,...options},N=o.N,d=20/N,g=9.81;
 if(![20,40,60].includes(N)||![o.time,o.baseDepth,o.bump,o.maxDt,o.cfl].every(Number.isFinite)||
 o.time<0||o.time>3||o.baseDepth<0.1||o.baseDepth>0.5||o.bump<0||o.bump>0.5||o.maxDt<0.01||o.maxDt>0.1||o.cfl<0.1||o.cfl>0.45)throw RangeError('FCG12 parameter range');
 let A=Array.from({length:N*N},(_,k)=>{
  const i=k%N,j=Math.floor(k/N);
  return [o.baseDepth+((i+0.5)*d>7&&(i+0.5)*d<13&&(j+0.5)*d>7&&(j+0.5)*d<13?o.bump:0),0,0];
 });
 const initialVolume=A.reduce((s,q)=>s+q[0]*d*d,0);
 let t=0,steps=0,maxCourant=0;
 function flux(L,R,axis,a){
  const physical=q=>{
   const w=q[axis+1]/q[0];
   return [q[axis+1],q[1]*w+(axis===0?g*q[0]**2/2:0),q[2]*w+(axis===1?g*q[0]**2/2:0)];
  };
  const f=physical(L),g0=physical(R);
  return L.map((x,k)=>(f[k]+g0[k]+a*(x-R[k]))/2);
 }
 function neighbor(i,j){
  const ii=Math.max(0,Math.min(N-1,i)),jj=Math.max(0,Math.min(N-1,j));
  const q=A[jj*N+ii];
  return [q[0],i!==ii?-q[1]:q[1],j!==jj?-q[2]:q[2]];
 }
 while(t<o.time-1e-12){
  let a=0;
  for(const q of A){
   if(!(q[0]>0))throw Error('nonpositive depth');
   a=Math.max(a,Math.abs(q[1]/q[0])+Math.sqrt(g*q[0]),Math.abs(q[2]/q[0])+Math.sqrt(g*q[0]));
  }
  const dt=Math.min(o.maxDt,o.cfl*d/a,o.time-t);
  if(!(dt>0)||++steps>10000)throw Error('invalid step');
  maxCourant=Math.max(maxCourant,a*dt/d);
  A=A.map((q,k)=>{
   const i=k%N,j=Math.floor(k/N);
   const E=flux(q,neighbor(i+1,j),0,a),W=flux(neighbor(i-1,j),q,0,a);
   const B=flux(q,neighbor(i,j+1),1,a),S=flux(neighbor(i,j-1),q,1,a);
   return q.map((z,c)=>z-dt/d*(E[c]-W[c]+B[c]-S[c]));
  });
  t+=dt;
 }
 return {A,N,d,t,steps,initialVolume,volume:A.reduce((s,q)=>s+q[0]*d*d,0),
  minDepth:Math.min(...A.map(q=>q[0])),maxDepth:Math.max(...A.map(q=>q[0])),
  maxSpeed:Math.max(...A.map(q=>Math.hypot(q[1],q[2])/q[0])),maxCourant};
}
const map=(x,y,w,h)=>[(0.45+0.39*x)*w/2,(1.37+0.51*y)*h/2];
function distance(x,y,a,b){
 const dx=b[0]-a[0],dy=b[1]-a[1],q=dx*dx+dy*dy;
 const t=q?Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/q)):0;
 return Math.hypot(x-a[0]-t*dx,y-a[1]-t*dy);
}
export function expectedFCG12Samples(w,h,options={}){
 const {A,N}=fcg12State(options),segments=[];
 const row=Math.floor(N/2),rowY=-1+2*(row+0.5)/N;
 segments.push([map(-1,rowY,w,h),map(1,rowY,w,h)]);
 for(let j=2;j<N;j+=5)for(let i=2;i<N;i+=5){
  const q=A[j*N+i],x=-1+2*(i+0.5)/N,y=-1+2*(j+0.5)/N;
  const du=0.08*q[1]/q[0],dv=0.08*q[2]/q[0];
  if(Math.hypot(du,dv)<1e-6)continue;
  const end=map(x+du,y+dv,w,h);
  segments.push([map(x,y,w,h),end],[end,map(x+0.72*du-0.2*dv,y+0.72*dv+0.2*du,w,h)],
   [end,map(x+0.72*du+0.2*dv,y+0.72*dv-0.2*du,w,h)]);
 }
 const result=[];
 for(const [u,v] of [[0.1,0.1],[0.9,0.9],[0.5,0.4],[0.3,0.6],[0.7,0.4]]){
  const target=map(2*u-1,2*v-1,w,h);
  // Find nearby pixel centers away from cell edges, arrows and section line.
  let best;
  for(let dy=-8;dy<=8;dy++)for(let dx=-8;dx<=8;dx++){
   const x=Math.floor(target[0])+dx,y=Math.floor(target[1])+dy;
   const X=((2*(x+0.5)/w-0.45)/0.39+1)*N/2;
   const Y=((2*(y+0.5)/h-1.37)/0.51+1)*N/2;
   const i=Math.floor(X),j=Math.floor(Y);
   if(i<0||i>=N||j<0||j>=N)continue;
   if(Math.min(X-i,i+1-X,Y-j,j+1-Y)<0.01)continue;
   if(segments.some(([a,b])=>distance(x+0.5,y+0.5,a,b)<1.5))continue;
   const score=dx*dx+dy*dy;
   if(!best||score<best.score)best={x,y,i,j,score};
  }
  if(!best)continue;
  const d=Math.max(0,Math.min(1,A[best.j*N+best.i][0]));
  result.push({label:'水深セル '+best.i+','+best.j,x:best.x,y:best.y,
   rgba:[0.08+0.25*d,0.28+0.54*d,0.49+0.46*d].map(c=>Math.round(255*c)).concat(255)});
 }
 // Background is independent of the solution, and always available even at tiny buffers.
 result.push({label:'背景',x:0,y:0,rgba:[11,19,31,255]});
 return result;
}
export function compareFCG12Readback(samples,w,h,options={}){
 return expectedFCG12Samples(w,h,options).map((p,i)=>{
  const s=samples[i],valid=s&&s.x===p.x&&s.y===p.y&&Array.isArray(s.rgba)&&s.rgba.length===4;
  const difference=valid?p.rgba.map((v,k)=>Math.abs(v-s.rgba[k])):[Infinity,Infinity,Infinity,Infinity];
  return {...p,actual:valid?s.rgba:null,difference,pass:valid&&difference.every(v=>v<=3)};
 });
}
