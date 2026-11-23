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
  // All legacy probes remain away from the uncertain pixelized zero contour.
  // except the Lagrangian marker at theta=0 in the analytic/particle panel.
  function point(panel,x,y,label,rgba){
    return {x:Math.floor(width*(panel+x)/3),y:Math.floor(height*y),label,rgba};
  }
  const legacy=[
    point(0,0.5,0.5,'raw interior',rgbInside),
    point(0,0.10,0.10,'raw exterior',rgbOutside),
    point(1,0.5,0.5,'redistanced interior',rgbInside),
    point(1,0.10,0.10,'redistanced exterior',rgbOutside),
    point(2,0.5,0.5,'analytic interior',rgbInside),
    point(2,0.68,0.5,'particle θ=0',rgbMarker),
    point(2,0.10,0.10,'analytic exterior',rgbOutside)
  ];
  // New pixel probes sample the actual grid after R8 encoding and bilinear
  // display interpolation, independently of editable JS and fragment GLSL.
  const {N,shear}=state;
  function numericPixel(panel,x,y){
    const uvx=3*(x+0.5)/width-panel, uvy=(y+0.5)/height;
    if(panel===2){
      const backward=uvx-shear*state.time*(uvy-0.5);
      const phi=Math.hypot(backward-0.5,uvy-0.5)-R;
      return phi< -0.014?rgbInside:phi>0.014?rgbOutside:[250,189,51,255];
    }
    const cx=clip(uvx*N-0.5,0,N-1),cy=clip(uvy*N-0.5,0,N-1),
      i=Math.floor(cx),j=Math.floor(cy),a=cx-i,b=cy-j,
      i1=Math.min(N-1,i+1),j1=Math.min(N-1,j+1);
    const values=panel===0?state.raw:state.reinit;
    const quantized=(ii,jj)=>Math.round(255*clip(0.5+2*values[ii+N*jj],0,1))/255;
    const q=(1-b)*((1-a)*quantized(i,j)+a*quantized(i1,j))+
      b*((1-a)*quantized(i,j1)+a*quantized(i1,j1));
    const phi=(q-0.5)*0.5;
    return phi< -0.014?rgbInside:phi>0.014?rgbOutside:[250,189,51,255];
  }
  const extra=[];
  for(const panel of [0,1]){
    for(const [u,v] of [[0.62,0.50],[0.72,0.58],[0.39,0.59]]){
      const x=Math.floor(width*(panel+u)/3),y=Math.floor(height*v);
      extra.push({x,y,label:(panel===0?'raw':'redistanced')+
        ' numeric grid probe '+u+','+v,rgba:numericPixel(panel,x,y)});
    }
  }
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
