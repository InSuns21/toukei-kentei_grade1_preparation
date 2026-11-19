// FCG5 independent CPU reference. Does not execute learner-edited JS/GLSL.
// MAC no-penetration box, explicit viscous predictor, semi-Lagrangian transport,
// mean-zero damped Jacobi projection; not a conservative dye scheme.
export const FCG5_N=12, FCG5_DT=0.04, FCG5_RHO=1, FCG5_NU=0.002, FCG5_OMEGA=2/3;
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const cell=(i,j,n)=>i+n*j;
const faceU=(i,j,n)=>i+(n+1)*j;
const faceV=(i,j,n)=>i+n*j;
const initialDye=(x,y)=>Math.exp(-((x-0.73)**2+(y-0.48)**2)/(0.11**2));

function interp(a,w,h,ox,oy,x,y,dx){
  const sx=clamp(x/dx-ox,0,w-1),sy=clamp(y/dx-oy,0,h-1);
  const i=Math.floor(sx),j=Math.floor(sy),I=Math.min(i+1,w-1),J=Math.min(j+1,h-1);
  const tx=sx-i,ty=sy-j;
  return (1-ty)*((1-tx)*a[i+w*j]+tx*a[I+w*j])+
    ty*((1-tx)*a[i+w*J]+tx*a[I+w*J]);
}
const neighbors=(p,i,j,n)=>{
  const k=cell(i,j,n),a=[];
  if(i>0)a.push(k-1);
  if(i<n-1)a.push(k+1);
  if(j>0)a.push(k-n);
  if(j<n-1)a.push(k+n);
  return a;
};
function div(u,v,i,j,n,h){
  return (u[faceU(i+1,j,n)]-u[faceU(i,j,n)]+
    v[faceV(i,j+1,n)]-v[faceV(i,j,n)])/h;
}
export function fcg5State(steps=8,{N=FCG5_N,dt=FCG5_DT,nu=FCG5_NU,force=0.08,stationary=false}={}){
  if(!Number.isInteger(steps)||steps<0||steps>32||
    !Number.isInteger(N)||N<4||N>32||
    ![dt,nu,force].every(Number.isFinite)||dt<=0||dt>0.1||nu<0||force<0||
    dt*nu*N*N>0.25)throw new RangeError('invalid FCG5 timestep/grid/viscosity');
  const h=1/N,r=dt*nu/(h*h),nc=N*N;
  let q=new Float64Array(nc),u=new Float64Array((N+1)*N),v=new Float64Array(N*(N+1));
  const stream=(i,j,amplitude)=>amplitude*Math.sin(Math.PI*i/N)*Math.sin(Math.PI*j/N);
  for(let j=0;j<N;j++)for(let i=0;i<N;i++)
    q[cell(i,j,N)]=stationary?0.37:initialDye((i+0.5)*h,(j+0.5)*h);
  if(!stationary){
    for(let j=0;j<N;j++)for(let i=1;i<N;i++)
      u[faceU(i,j,N)]=(stream(i,j+1,0.075)-stream(i,j,0.075))/h;
    for(let j=1;j<N;j++)for(let i=0;i<N;i++)
      v[faceV(i,j,N)]=-(stream(i+1,j,0.075)-stream(i,j,0.075))/h;
  }
  let pressure=new Float64Array(nc),source=new Float64Array(nc);
  let divergenceBefore=0,divergenceAfter=0,poissonResidual=0,identityError=0;
  for(let t=0;t<steps;t++){
    const advU=new Float64Array(u.length),advV=new Float64Array(v.length);
    // At the face, sample the full MAC velocity to determine a backtraced foot.
    for(let j=0;j<N;j++)for(let i=1;i<N;i++){
      const x=i*h,y=(j+0.5)*h;
      const vx=interp(u,N+1,N,0,0.5,x,y,h);
      const vy=interp(v,N,N+1,0.5,0,x,y,h);
      const k=faceU(i,j,N),old=u[k];
      const lap=(u[faceU(i-1,j,N)]+u[faceU(i+1,j,N)]-2*old+
        u[faceU(i,Math.max(0,j-1),N)]+u[faceU(i,Math.min(N-1,j+1),N)]-2*old);
      const f=stationary?0:(stream(i,j+1,force)-stream(i,j,force))/h;
      advU[k]=interp(u,N+1,N,0,0.5,x-dt*vx,y-dt*vy,h)+r*lap+dt*f;
    }
    for(let j=1;j<N;j++)for(let i=0;i<N;i++){
      const x=(i+0.5)*h,y=j*h;
      const vx=interp(u,N+1,N,0,0.5,x,y,h);
      const vy=interp(v,N,N+1,0.5,0,x,y,h);
      const k=faceV(i,j,N),old=v[k];
      const lap=(v[faceV(Math.max(0,i-1),j,N)]+v[faceV(Math.min(N-1,i+1),j,N)]-2*old+
        v[faceV(i,j-1,N)]+v[faceV(i,j+1,N)]-2*old);
      const f=stationary?0:-(stream(i+1,j,force)-stream(i,j,force))/h;
      advV[k]=interp(v,N,N+1,0.5,0,x-dt*vx,y-dt*vy,h)+r*lap+dt*f;
    }
    source=new Float64Array(nc);
    divergenceBefore=0;
    for(let j=0;j<N;j++)for(let i=0;i<N;i++){
      const d=div(advU,advV,i,j,N,h);
      source[cell(i,j,N)]=FCG5_RHO/dt*d;
      divergenceBefore=Math.max(divergenceBefore,Math.abs(d));
    }
    pressure=new Float64Array(nc);
    const adj=Array.from({length:nc},(_,k)=>neighbors(pressure,k%N,Math.floor(k/N),N));
    for(let k=0;k<120;k++){
      const pnext=new Float64Array(nc);let sum=0;
      for(let m=0;m<nc;m++){
        const ns=adj[m],target=(ns.reduce((s,id)=>s+pressure[id],0)-h*h*source[m])/ns.length;
        pnext[m]=pressure[m]+FCG5_OMEGA*(target-pressure[m]);
        sum+=pnext[m];
      }
      const mean=sum/nc;
      for(let m=0;m<nc;m++)pnext[m]-=mean;
      pressure=pnext;
    }
    u=advU;v=advV;
    for(let j=0;j<N;j++)for(let i=1;i<N;i++)
      u[faceU(i,j,N)]-=dt/FCG5_RHO*(pressure[cell(i,j,N)]-pressure[cell(i-1,j,N)])/h;
    for(let j=1;j<N;j++)for(let i=0;i<N;i++)
      v[faceV(i,j,N)]-=dt/FCG5_RHO*(pressure[cell(i,j,N)]-pressure[cell(i,j-1,N)])/h;
    divergenceAfter=poissonResidual=identityError=0;
    for(let j=0;j<N;j++)for(let i=0;i<N;i++){
      const id=cell(i,j,N),ns=adj[id];
      const residual=(ns.reduce((s,m)=>s+pressure[m],0)-ns.length*pressure[id])/(h*h)-source[id];
      const d=div(u,v,i,j,N,h);
      poissonResidual=Math.max(poissonResidual,Math.abs(residual));
      divergenceAfter=Math.max(divergenceAfter,Math.abs(d));
      identityError=Math.max(identityError,Math.abs(d+dt/FCG5_RHO*residual));
    }
    const nextQ=new Float64Array(nc);
    for(let j=0;j<N;j++)for(let i=0;i<N;i++){
      const x=(i+0.5)*h,y=(j+0.5)*h;
      const vx=(u[faceU(i,j,N)]+u[faceU(i+1,j,N)])/2;
      const vy=(v[faceV(i,j,N)]+v[faceV(i,j+1,N)])/2;
      nextQ[cell(i,j,N)]=interp(q,N,N,0.5,0.5,x-dt*vx,y-dt*vy,h);
    }
    q=nextQ;
  }
  let mass=0,peak=0,kinetic=0,wall=0;
  const divergence=new Float64Array(nc),speed=new Float64Array(nc);
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const k=cell(i,j,N),ux=(u[faceU(i,j,N)]+u[faceU(i+1,j,N)])/2,
      vy=(v[faceV(i,j,N)]+v[faceV(i,j+1,N)])/2;
    divergence[k]=div(u,v,i,j,N,h);
    speed[k]=Math.hypot(ux,vy);
    mass+=h*h*q[k];peak=Math.max(peak,q[k]);kinetic+=0.5*h*h*(ux*ux+vy*vy);
  }
  for(let j=0;j<N;j++)wall=Math.max(wall,Math.abs(u[faceU(0,j,N)]),Math.abs(u[faceU(N,j,N)]));
  for(let i=0;i<N;i++)wall=Math.max(wall,Math.abs(v[faceV(i,0,N)]),Math.abs(v[faceV(i,N,N)]));
  if([...q,...u,...v,...pressure].some(x=>!Number.isFinite(x)))throw new Error('nonfinite FCG5 state');
  return {N,dt,nu,steps,q,u,v,pressure,source,divergence,speed,mass,peak,kinetic,wall,
    divergenceBefore,divergenceAfter,poissonResidual,identityError};
}
export function fcg5PixelCell(x,y,width,height){
  if(!Number.isInteger(width)||!Number.isInteger(height)||width<64||height<64||
    width>1024||height>1024||width*height>524288||
    !Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||x>=width||y>=height)
    throw new RangeError('invalid FCG5 pixel');
  const panel=Math.min(2,Math.floor(3*(x+0.5)/width));
  const local=3*(x+0.5)/width-panel;
  return {panel:['dye','divergence','speed'][panel],
    i:Math.min(FCG5_N-1,Math.floor(FCG5_N*local)),
    j:Math.min(FCG5_N-1,Math.floor(FCG5_N*(y+0.5)/height))};
}
const enc=x=>Math.round(255*clamp(x,0,1));
export function expectedFCG5Samples(width,height,steps=8){
  const state=fcg5State(steps),N=FCG5_N,coords=[[6,6],[8,5],[9,6]];
  return ['dye','divergence','speed'].flatMap((panel,p)=>
    coords.map(([i,j])=>{
      const x=Math.floor((p+(i+0.5)/N)*width/3);
      const y=Math.floor((j+0.5)*height/N);
      const selected=fcg5PixelCell(x,y,width,height),k=selected.i+N*selected.j;
      const value=panel==='dye'?state.q[k]:panel==='divergence'?state.divergence[k]:state.speed[k];
      const q=panel==='dye'?enc(value):panel==='divergence'?enc(80*Math.abs(value)):enc(value/0.4);
      return {label:panel+'('+selected.i+','+selected.j+')',x,y,value,
        rgba:panel==='dye'?[q,38,255-q,255]:panel==='divergence'?[q,20,20,255]:
          [31,q,enc(0.8-0.5*q/255),255]};
    }));
}
export function compareFCG5Readback(actual,width,height,steps=8,tolerance=2){
  if(!Number.isFinite(tolerance)||tolerance<0)throw new RangeError('tolerance');
  return expectedFCG5Samples(width,height,steps).map((p,k)=>{
    const a=actual?.[k],ok=!!a&&a.x===p.x&&a.y===p.y&&
      Array.isArray(a.rgba)&&a.rgba.length===4&&
      a.rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255);
    const difference=ok?p.rgba.map((v,i)=>Math.abs(v-a.rgba[i])):[Infinity,Infinity,Infinity,Infinity];
    return {...p,actual:ok?a.rgba:null,difference,pass:ok&&difference.every(v=>v<=tolerance)};
  });
}
