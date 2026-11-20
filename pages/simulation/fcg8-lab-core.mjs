// FCG8 independent CPU reference. The editable levelset.js is never evaluated here.
const N=48,H=1/N,DT=0.04,SHEAR=0.6,R=0.18;
const at=(i,j)=>i+N*j;
const clip=(x,a,b)=>Math.max(a,Math.min(b,x));
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
  for(let iter=0;iter<6;iter++){
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
export const FCG8_MAX_STEPS=96;
const snapshots=new Map([[0,{raw:initial(),reinit:initial()}]]);
export function fcg8State(steps=8){
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
    analyticArea:Math.PI*R*R,time:steps*DT,steps,dt:DT};
}
const rgbInside=[20,140,201,255],rgbOutside=[15,26,36,255],rgbMarker=[245,128,36,255];
export function expectedFCG8Samples(width,height,steps=8){
  if(!Number.isInteger(width)||!Number.isInteger(height)||width<64||height<64)
    throw RangeError('render size');
  // All probes are intentionally away from the uncertain pixelized zero contour,
  // except the Lagrangian marker at theta=0 in the analytic/particle panel.
  function point(panel,x,y,label,rgba){
    return {x:Math.floor(width*(panel+x)/3),y:Math.floor(height*y),label,rgba};
  }
  return [
    point(0,0.5,0.5,'raw interior',rgbInside),
    point(0,0.10,0.10,'raw exterior',rgbOutside),
    point(1,0.5,0.5,'redistanced interior',rgbInside),
    point(1,0.10,0.10,'redistanced exterior',rgbOutside),
    point(2,0.5,0.5,'analytic interior',rgbInside),
    point(2,0.68,0.5,'particle θ=0',rgbMarker),
    point(2,0.10,0.10,'analytic exterior',rgbOutside)
  ];
}
export function compareFCG8Readback(samples,width,height,steps=8,tolerance=2){
  return expectedFCG8Samples(width,height,steps).map((p,k)=>{
    const s=samples?.[k],valid=s&&s.x===p.x&&s.y===p.y&&Array.isArray(s.rgba)&&
      s.rgba.length===4&&s.rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255);
    const difference=valid?p.rgba.map((v,i)=>Math.abs(v-s.rgba[i])):[Infinity,Infinity,Infinity,Infinity];
    return {...p,actual:valid?s.rgba:null,difference,pass:!!valid&&difference.every(v=>v<=tolerance)};
  });
}
