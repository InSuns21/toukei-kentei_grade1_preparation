// FCG8 independent CPU reference. The editable levelset.js is never evaluated here.
export const FCG8_MAX_STEPS=96;
const DT=0.04,R=0.18;
const clip=(x,a,b)=>Math.max(a,Math.min(b,x));
function buildReference({N=48,shear=0.6,redistanceIterations=6}={}){
  if(![48,64,80,96].includes(N)||!Number.isFinite(shear)||
     shear<0||shear>1||!Number.isInteger(redistanceIterations)||
     redistanceIterations<0||redistanceIterations>8||redistanceIterations%2)
    throw new RangeError('FCG8 grid/shear/redistance out of supported range');
  const H=1/N,SHEAR=shear;
const at=(i,j)=>i+N*j;
function initial(){
  const a=new Float64Array(N*N);
  for(let j=0;j<N;j++)for(let i=0;i<N;i++)
    a[at(i,j)]=Math.sqrt(((i+0.5)*H-0.5)**2+((j+0.5)*H-0.5)**2)-R;
  return a;
}
function backsample(a,x,y){
  const u=clip(N*x-0.5,0,N-1),v=clip(N*y-0.5,0,N-1);
  const i=Math.floor(u),j=Math.floor(v),f=u-i,g=v-j;
  const ii=Math.min(i+1,N-1),jj=Math.min(j+1,N-1);
  return (1-g)*((1-f)*a[at(i,j)]+f*a[at(ii,j)])+
    g*((1-f)*a[at(i,jj)]+f*a[at(ii,jj)]);
}
function advect(a){
  const b=new Float64Array(a.length);
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const y=(j+0.5)*H;
    b[at(i,j)]=backsample(a,(i+0.5)*H-DT*SHEAR*(y-0.5),y);
  }
  return b;
}
function redistance(a){
  const frozen=a.slice();
  let u=a.slice();
  for(let iter=0;iter<redistanceIterations;iter++){
    const v=u.slice();
    for(let j=1;j<N-1;j++)for(let i=1;i<N-1;i++){
      const k=at(i,j),sign=frozen[k]/Math.sqrt(frozen[k]*frozen[k]+H*H);
      const l=(u[k]-u[at(i-1,j)])/H,r=(u[at(i+1,j)]-u[k])/H;
      const d=(u[k]-u[at(i,j-1)])/H,t=(u[at(i,j+1)]-u[k])/H;
      const dx=sign>=0?Math.max(Math.max(l,0)**2,Math.min(r,0)**2):
        Math.max(Math.min(l,0)**2,Math.max(r,0)**2);
      const dy=sign>=0?Math.max(Math.max(d,0)**2,Math.min(t,0)**2):
        Math.max(Math.min(d,0)**2,Math.max(t,0)**2);
      v[k]=u[k]-0.30*H*sign*(Math.sqrt(dx+dy)-1);
    }
    u=v;
  }
  return u;
}
function metric(a){
  let area=0,grad=0,count=0;
  for(let j=1;j<N-1;j++)for(let i=1;i<N-1;i++){
    const k=at(i,j),p=a[k]; if(p<0)area+=H*H;
    if(Math.abs(p)<3*H){
      const gx=(a[at(i+1,j)]-a[at(i-1,j)])/(2*H);
      const gy=(a[at(i,j+1)]-a[at(i,j-1)])/(2*H);
      grad+=Math.abs(Math.hypot(gx,gy)-1);count++;
    }
  }
  return {area,gradientError:grad/count,bandCells:count};
}
// Cache consecutive independent CPU reference states, so seeking and 96-step
// observation never recompute the entire trajectory from the first frame.
const snapshots=new Map([[0,{raw:initial(),reinit:initial()}]]);
return function state(steps=8){
  if(!Number.isInteger(steps)||steps<0||steps>FCG8_MAX_STEPS)
    throw RangeError('step 0..96');
  if(!snapshots.has(steps)){
    let previous=steps-1;
    while(!snapshots.has(previous))previous--;
    let state=snapshots.get(previous);
    for(let n=previous+1;n<=steps;n++){
      state={raw:advect(state.raw),reinit:redistance(advect(state.reinit))};
      snapshots.set(n,state);
    }
  }
  const {raw,reinit}=snapshots.get(steps);
  const particles=Array.from({length:64},(_,k)=>{
    const a=2*Math.PI*k/64,y=0.5+R*Math.sin(a);
    return [0.5+R*Math.cos(a)+SHEAR*(steps*DT)*(y-0.5),y];
  });
  return {raw,reinit,particles,rawMetric:metric(raw),reinitMetric:metric(reinit),
    analyticArea:Math.PI*R*R,time:steps*DT,steps,dt:DT,N,
    shear:SHEAR,redistanceIterations};
}
}
const referenceCache=new Map();
export function fcg8State(steps=8,options={}){
  const N=options.N??48,shear=options.shear??0.6,
    redistanceIterations=options.redistanceIterations??6;
  const key=N+':'+shear+':'+redistanceIterations;
  if(!referenceCache.has(key)){
    if(referenceCache.size>=3)referenceCache.delete(referenceCache.keys().next().value);
    referenceCache.set(key,buildReference({N,shear,redistanceIterations}));
  }
  return referenceCache.get(key)(steps);
}
const rgbInside=[20,140,201,255],rgbOutside=[15,26,36,255],rgbMarker=[245,128,36,255];
export function expectedFCG8Samples(width,height,steps=8,options={}){
  if(!Number.isInteger(width)||!Number.isInteger(height)||width<64||height<64)
    throw RangeError('render size');
  const state=fcg8State(steps,options);
  // Sample at pixel centers, including the same overlays as the GPU.
  const {N,shear}=state;
  const fract=x=>x-Math.floor(x);
  const rgba=(r,g,b)=>[r,g,b,1].map(v=>Math.round(v*255));
  function pixel(panel,x,y){
    const u=3*(x+0.5)/width-panel,v=(y+0.5)/height;
    const bx=u-0.5-shear*state.time*(v-0.5),by=v-0.5;
    const exact=Math.hypot(bx,by)-R;
    let phi=exact;
    if(panel<2){
      const cx=clip(u*N-0.5,0,N-1),cy=clip(v*N-0.5,0,N-1);
      const i=Math.floor(cx),j=Math.floor(cy),a=cx-i,b=cy-j;
      const i1=Math.min(N-1,i+1),j1=Math.min(N-1,j+1);
      const values=panel===0?state.raw:state.reinit;
      const q=(ii,jj)=>Math.round(255*clip(0.5+2*values[ii+N*jj],0,1))/255;
      phi=((1-b)*((1-a)*q(i,j)+a*q(i1,j))+b*((1-a)*q(i,j1)+a*q(i1,j1))-0.5)*0.5;
    }
    let color=phi<0?rgbInside:rgbOutside;
    const band=Math.abs(fract(Math.abs(phi)/0.04+0.5)-0.5)*0.04;
    if(panel<2&&Math.abs(phi)>0.014&&Math.abs(phi)<0.115&&band<0.0025)
      color=phi<0?rgba(.50,.80,.90):rgba(.32,.43,.50);
    if(Math.abs(phi)<=0.014)color=phi<0?rgba(.16,.42,.49):rgba(.20,.24,.23);
    if(panel<2&&(phi<0)!==(exact<0))color=rgba(.83,.24,.49);
    if(Math.abs(phi)<0.0035)color=rgba(.98,.74,.20);
    if(panel<2&&Math.abs(exact)<0.0025&&fract((Math.atan2(by,bx)+Math.PI)*3.81971863)<.55)
      color=rgba(.96,.96,.96);
    if(panel===2&&state.particles.some(([px,py])=>Math.hypot(u-px,v-py)<.010))color=rgbMarker;
    return color;
  }
  function point(panel,u,v,label){
    const x=Math.floor(width*(panel+u)/3),y=Math.floor(height*v);
    return {x,y,label,rgba:pixel(panel,x,y)};
  }
  const legacy=[
    point(0,.5,.5,'raw interior'),point(0,.10,.10,'raw exterior'),
    point(1,.5,.5,'redistanced interior'),point(1,.10,.10,'redistanced exterior'),
    point(2,.5,.5,'analytic interior'),point(2,.68,.5,'particle θ=0'),
    point(2,.10,.10,'analytic exterior')
  ];
  const extra=[];
  for(const panel of [0,1])for(const [u,v] of [[.62,.50],[.72,.58],[.39,.59]])
    extra.push(point(panel,u,v,(panel===0?'raw':'redistanced')+' numeric grid probe '+u+','+v));
  return [...legacy,...extra];
}
export function compareFCG8Readback(samples,width,height,steps=8,tolerance=2,options={}){
  return expectedFCG8Samples(width,height,steps,options).map((p,k)=>{
    const s=samples?.[k],valid=s&&s.x===p.x&&s.y===p.y&&Array.isArray(s.rgba)&&
      s.rgba.length===4&&s.rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255);
    const difference=valid?p.rgba.map((v,i)=>Math.abs(v-s.rgba[i])):[Infinity,Infinity,Infinity,Infinity];
    return {...p,actual:valid?s.rgba:null,difference,pass:!!valid&&difference.every(v=>v<=tolerance)};
  });
}
