// FCG6 deterministic CPU reference for unchanged editable source.
// Recomputes masked pressure and transport without running learner JS/GLSL.
export const FCG6_N=48;
const N=FCG6_N,H=1/N,DT=0.05,RHO=1;
const id=(x,y)=>x+N*y,ix=(x,y)=>x+(N+1)*y,iy=(x,y)=>x+N*y;
const inside=(x,y)=>x>=0&&x<N&&y>=0&&y<N;
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function body(t,options){
  const {shape='circle',centerY=0.5,wallAmplitude=0.1,wallFrequency=1.8}=options;
  if(!['circle','rectangle'].includes(shape)||![centerY,wallAmplitude,wallFrequency].every(Number.isFinite)||
     centerY<0.35||centerY>0.65||wallAmplitude<0||wallAmplitude>0.15||
     wallFrequency<0.6||wallFrequency>3)throw new RangeError('FCG6 body controls');
  const cx=0.5+wallAmplitude*Math.sin(wallFrequency*t),
        vx=wallAmplitude*wallFrequency*Math.cos(wallFrequency*t);
  const solid=new Uint8Array(N*N);
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){
    const a=(x+0.5)*H-cx,b=(y+0.5)*H-centerY;
    solid[id(x,y)]=Number(shape==='rectangle'?
      (Math.abs(a)<0.17&&Math.abs(b)<0.12):(a*a+b*b<0.19*0.19));
  }
  return {cx,vx,solid};
}
const isSolid=(m,x,y)=>inside(x,y)&&m[id(x,y)]!==0;
const isFluid=(m,x,y)=>inside(x,y)&&m[id(x,y)]===0;
const horizontal=(m,x,y)=>x>0&&x<N&&isFluid(m,x-1,y)&&isFluid(m,x,y);
const vertical=(m,x,y)=>y>0&&y<N&&isFluid(m,x,y-1)&&isFluid(m,x,y);
function impose(a,b,m,w){
  for(let y=0;y<N;y++)for(let x=0;x<=N;x++)
    if(!horizontal(m,x,y))
      a[ix(x,y)]=x>0&&x<N&&isSolid(m,x-1,y)!==isSolid(m,x,y)?w:0;
  for(let y=0;y<=N;y++)for(let x=0;x<N;x++)
    if(!vertical(m,x,y))b[iy(x,y)]=0;
}
function div(a,b,x,y){
  return (a[ix(x+1,y)]-a[ix(x,y)]+b[iy(x,y+1)]-b[iy(x,y)])/H;
}
function interp(q,m,x,y,defaultValue){
  const a=clamp(x/H-0.5,0,N-1),b=clamp(y/H-0.5,0,N-1),
        loX=Math.floor(a),loY=Math.floor(b),hiX=Math.min(N-1,loX+1),hiY=Math.min(N-1,loY+1);
  const sx=a-loX,sy=b-loY;
  const pts=[[loX,loY,(1-sx)*(1-sy)],[hiX,loY,sx*(1-sy)],
    [loX,hiY,(1-sx)*sy],[hiX,hiY,sx*sy]];
  let wsum=0,qsum=0;
  for(const [i,j,w] of pts)if(isFluid(m,i,j)){wsum+=w;qsum+=w*q[id(i,j)];}
  return wsum>1e-12?qsum/wsum:defaultValue;
}
function adjacency(m,x,y){
  const items=[];
  if(isFluid(m,x-1,y))items.push(id(x-1,y));
  if(isFluid(m,x+1,y))items.push(id(x+1,y));
  if(isFluid(m,x,y-1))items.push(id(x,y-1));
  if(isFluid(m,x,y+1))items.push(id(x,y+1));
  return items;
}
export function fcg6State(steps=8,options={}){
  if(!Number.isInteger(steps)||steps<0||steps>24)throw new RangeError('FCG6 step');
  let u=new Float64Array((N+1)*N),v=new Float64Array(N*(N+1)),q=new Float64Array(N*N);
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){
    const px=(x+0.5)*H,py=(y+0.5)*H;
    q[id(x,y)]=Math.exp(-((px-0.26)**2+(py-0.46)**2)/(0.105**2));
  }
  let g=body(0,options),p=new Float64Array(N*N),divBefore=0,divAfter=0,identity=0,residual=0,mean=0;
  for(let i=0;i<N*N;i++)if(g.solid[i])q[i]=0;
  impose(u,v,g.solid,g.vx);
  for(let s=0;s<steps;s++){
    g=body((s+1)*DT,options);
    const m=g.solid;
    for(let z=0;z<N*N;z++)if(m[z])q[z]=0;
    const a=u.slice(),b=v.slice();
    const spin=(x,y)=>Math.sin(Math.PI*x/N)*Math.sin(Math.PI*y/N);
    for(let y=0;y<N;y++)for(let x=1;x<N;x++)
      if(horizontal(m,x,y))a[ix(x,y)]+=DT*0.07*(spin(x,y+1)-spin(x,y))/H;
    for(let y=1;y<N;y++)for(let x=0;x<N;x++)
      if(vertical(m,x,y))b[iy(x,y)]-=DT*0.07*(spin(x+1,y)-spin(x,y))/H;
    impose(a,b,m,g.vx);
    const rhs=new Float64Array(N*N),adj=new Array(N*N);
    let n=0,total=0;divBefore=0;
    for(let y=0;y<N;y++)for(let x=0;x<N;x++){
      const k=id(x,y);
      if(!isFluid(m,x,y))continue;
      adj[k]=adjacency(m,x,y);
      if(!adj[k].length)throw new Error('isolated fluid cell');
      const d=div(a,b,x,y);
      rhs[k]=RHO/DT*d;total+=rhs[k];n++;
      divBefore=Math.max(divBefore,Math.abs(d));
    }
    mean=total/n;
    for(let k=0;k<N*N;k++)if(!m[k])rhs[k]-=mean;
    // Independent reference: graph conjugate gradient for -H² L,
    // not the learner's red-black SOR. Only fluid cells participate.
    p=new Float64Array(N*N);
    const bCG=new Float64Array(N*N),rCG=new Float64Array(N*N),
      dir=new Float64Array(N*N);
    let rhsMean=0;
    for(let z=0;z<N*N;z++)if(!m[z]){
      bCG[z]=-H*H*rhs[z];rhsMean+=bCG[z];
    }
    rhsMean/=n;
    let rr=0;
    for(let z=0;z<N*N;z++)if(!m[z]){
      bCG[z]-=rhsMean;rCG[z]=dir[z]=bCG[z];rr+=rCG[z]*rCG[z];
    }
    let converged=Math.max(...rCG.map(v=>Math.abs(v)))/(H*H)<1e-6;
    for(let it=0;it<16*N&&!converged;it++){
      const Ap=new Float64Array(N*N);let denominator=0;
      for(let z=0;z<N*N;z++)if(!m[z]){
        const ns=adj[z];Ap[z]=ns.length*dir[z]-ns.reduce((a,k)=>a+dir[k],0);
        denominator+=dir[z]*Ap[z];
      }
      if(!(denominator>0))throw new Error('FCG6 independent CG breakdown');
      const alpha=rr/denominator;
      let nextRR=0,maxError=0;
      for(let z=0;z<N*N;z++)if(!m[z]){
        p[z]+=alpha*dir[z];rCG[z]-=alpha*Ap[z];
        maxError=Math.max(maxError,Math.abs(rCG[z])/(H*H));
        nextRR+=rCG[z]*rCG[z];
      }
      if(maxError<1e-6){converged=true;break;}
      const beta=nextRR/rr;
      for(let z=0;z<N*N;z++)if(!m[z])dir[z]=rCG[z]+beta*dir[z];
      rr=nextRR;
    }
    if(!converged)throw new Error('FCG6 independent CG residual failed');
    let pMean=0;for(let z=0;z<N*N;z++)if(!m[z])pMean+=p[z];
    pMean/=n;for(let z=0;z<N*N;z++)if(!m[z])p[z]-=pMean;
    u=a;v=b;
    for(let y=0;y<N;y++)for(let x=1;x<N;x++)if(horizontal(m,x,y))
      u[ix(x,y)]-=DT/RHO*(p[id(x,y)]-p[id(x-1,y)])/H;
    for(let y=1;y<N;y++)for(let x=0;x<N;x++)if(vertical(m,x,y))
      v[iy(x,y)]-=DT/RHO*(p[id(x,y)]-p[id(x,y-1)])/H;
    divAfter=identity=residual=0;
    for(let y=0;y<N;y++)for(let x=0;x<N;x++){
      if(!isFluid(m,x,y))continue;
      const z=id(x,y),dd=div(u,v,x,y);
      const ns=adj[z],L=(ns.reduce((sum,j)=>sum+p[j],0)-ns.length*p[z])/(H*H);
      const R=L-rhs[z];
      residual=Math.max(residual,Math.abs(R));
      divAfter=Math.max(divAfter,Math.abs(dd));
      identity=Math.max(identity,Math.abs(dd+DT/RHO*R-DT/RHO*mean));
    }
    const nextQ=new Float64Array(N*N);
    for(let y=0;y<N;y++)for(let x=0;x<N;x++){
      if(!isFluid(m,x,y))continue;
      const z=id(x,y),px=(x+0.5)*H,py=(y+0.5)*H,
        vx=(u[ix(x,y)]+u[ix(x+1,y)])/2,vy=(v[iy(x,y)]+v[iy(x,y+1)])/2;
      const fx=px-DT*vx,fy=py-DT*vy;
      nextQ[z]=isSolid(m,Math.floor(fx/H),Math.floor(fy/H))?
        q[z]:interp(q,m,fx,fy,q[z]);
    }
    q=nextQ;
  }
  const divField=new Float64Array(N*N),speed=new Float64Array(N*N);
  let wall=0;
  for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(isFluid(g.solid,x,y)){
    const z=id(x,y);
    divField[z]=div(u,v,x,y);
    speed[z]=Math.hypot((u[ix(x,y)]+u[ix(x+1,y)])/2,
      (v[iy(x,y)]+v[iy(x,y+1)])/2);
  }
  for(let y=0;y<N;y++)for(let x=1;x<N;x++)
    if(isSolid(g.solid,x-1,y)!==isSolid(g.solid,x,y))
      wall=Math.max(wall,Math.abs(u[ix(x,y)]-g.vx));
  for(let y=1;y<N;y++)for(let x=0;x<N;x++)
    if(isSolid(g.solid,x,y-1)!==isSolid(g.solid,x,y))
      wall=Math.max(wall,Math.abs(v[iy(x,y)]));
  return {N,dt:DT,steps,solid:g.solid,q,divergence:divField,speed,
    wall,divBefore,divAfter,identity,residual,mean};
}
export function fcg6PixelCell(x,y,width,height){
  if(![x,y,width,height].every(Number.isInteger)||width<64||height<64||
    x<0||y<0||x>=width||y>=height)throw new RangeError('FCG6 pixel');
  const X=3*(x+0.5)/width,panel=Math.min(2,Math.floor(X)),u=X-panel;
  return {panel,i:Math.min(N-1,Math.floor(N*u)),j:Math.min(N-1,Math.floor(N*(y+0.5)/height)),
    uvX:u,uvY:(y+0.5)/height};
}
const enc=x=>Math.round(255*clamp(x,0,1));
function predicted(pixel,s){
  const c=fcg6PixelCell(pixel.x,pixel.y,pixel.width,pixel.height);
  const z=id(c.i,c.j),mask=s.solid;
  if(mask[z])return [51,59,69,255];
  const dye=enc(s.q[z]),dv=enc(70*Math.abs(s.divergence[z])),speed=enc(s.speed[z]/0.6);
  let rgba=c.panel===0?[dye,38,255-dye,255]:c.panel===1?[dv,20,20,255]:
    [31,speed,enc(0.8-0.5*speed/255),255];
  if(c.panel===2){
    const near=(i,j)=>isSolid(mask,clamp(i,0,N-1),clamp(j,0,N-1))?1:0;
    const nx=near(c.i+1,c.j)-near(c.i-1,c.j),
      ny=near(c.i,c.j+1)-near(c.i,c.j-1),length=Math.hypot(nx,ny);
    if(length>0.5){
      const fx=(c.uvX*N)%1-0.5,fy=(c.uvY*N)%1-0.5;
      const along=(fx*nx+fy*ny)/length,
        across=Math.abs((nx*fy-ny*fx)/length);
      if((along>-0.28&&along<0.22&&across<0.055)||
        (along>=0.12&&along<0.38&&across<0.75*(0.38-along)))
        rgba=[255,230,26,255];
    }
  }
  return rgba;
}
export function expectedFCG6Samples(width,height,steps=8,options={}){
  const s=fcg6State(steps,options),cells=[[8,8],[3,7],[11,11]];
  return [0,1,2].flatMap(panel=>cells.map(([i,j])=>{
    const x=Math.floor(width*(panel+(i+0.5)/N)/3),
      y=Math.floor(height*(j+0.5)/N);
    const rgba=predicted({x,y,width,height},s);
    return {x,y,label:'panel '+panel+' ('+i+','+j+')',rgba};
  }));
}
export function compareFCG6Readback(got,width,height,steps=8,tolerance=2,options={}){
  return expectedFCG6Samples(width,height,steps,options).map((ref,k)=>{
    const actual=got?.[k],valid=actual&&actual.x===ref.x&&actual.y===ref.y&&
      Array.isArray(actual.rgba)&&actual.rgba.length===4&&
      actual.rgba.every(z=>Number.isInteger(z)&&z>=0&&z<=255);
    const difference=valid?ref.rgba.map((z,i)=>Math.abs(z-actual.rgba[i])):
      [Infinity,Infinity,Infinity,Infinity];
    return {...ref,actual:valid?actual.rgba:null,difference,
      pass:!!valid&&difference.every(z=>z<=tolerance)};
  });
}