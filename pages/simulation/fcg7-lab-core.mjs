// Independent CPU oracle for the FCG7 default sources. Does not run editable student JS.
const Q=8,H=1/Q,DT=0.08,M=16;
const rem=x=>((x%1)+1)%1;
const node=(i,j)=>((i%Q)+Q)%Q+Q*(((j%Q)+Q)%Q);
function corners(x,y){
  const u=Q*rem(x),v=Q*rem(y),a=Math.floor(u),b=Math.floor(v),s=u-a,t=v-b;
  return [[node(a,b),(1-s)*(1-t)],[node(a+1,b),s*(1-t)],
    [node(a,b+1),(1-s)*t],[node(a+1,b+1),s*t]];
}
function start(){
  return Array.from({length:M},(_,k)=>{
    const i=k%4,j=Math.floor(k/4),x=0.24+i*0.24,y=0.16+j*0.24,
      sign=(i+j)%2?1:-1;
    return [x,y,0.35+0.06*Math.sin(2*Math.PI*y)+0.13*sign,
      0.06*Math.cos(2*Math.PI*x)+0.09*sign];
  });
}
function deposit(pts){
  const w=Array(Q*Q).fill(0),v=Array.from({length:Q*Q},()=>[0,0]);
  for(const p of pts)for(const [i,f] of corners(p[0],p[1])){
    w[i]+=f;v[i][0]+=f*p[2];v[i][1]+=f*p[3];
  }
  for(let i=0;i<Q*Q;i++)if(w[i]>0){v[i][0]/=w[i];v[i][1]/=w[i];}
  return {w,v};
}
function evolve(pts,blend){
  const base=deposit(pts),modified=base.v.map((v,k)=>{
    if(base.w[k]===0)return [0,0];
    const i=k%Q,j=Math.floor(k/Q);
    return [0.995*v[0]+DT*0.08*Math.sin(2*Math.PI*(j+0.5)/Q),
      0.995*v[1]-DT*0.08*Math.cos(2*Math.PI*(i+0.5)/Q)];
  });
  let wrapped=0;
  const moved=pts.map(p=>{
    let px=0,py=0,fx=p[2],fy=p[3];
    for(const [id,w] of corners(p[0],p[1])){
      px+=w*modified[id][0];py+=w*modified[id][1];
      fx+=w*(modified[id][0]-base.v[id][0]);
      fy+=w*(modified[id][1]-base.v[id][1]);
    }
    const vx=(1-blend)*px+blend*fx,vy=(1-blend)*py+blend*fy;
    const x=p[0]+DT*vx,y=p[1]+DT*vy;
    if(x<0||x>=1||y<0||y>=1)wrapped++;
    return [rem(x),rem(y),vx,vy];
  });
  return {moved,wrapped};
}
export function fcg7State(steps=8){
  if(!Number.isInteger(steps)||steps<0||steps>24)throw RangeError('steps 0..24');
  let pic=start(),flip=start(),picWrap=0,flipWrap=0;
  for(let t=0;t<steps;t++){
    const a=evolve(pic,0),b=evolve(flip,1);
    pic=a.moved;flip=b.moved;picWrap+=a.wrapped;flipWrap+=b.wrapped;
  }
  const grid=deposit(pic),speed=grid.v.map(v=>Math.hypot(...v));
  const energy=p=>p.reduce((sum,q)=>sum+0.5*(q[2]**2+q[3]**2),0);
  const momentum=p=>p.reduce((sum,q)=>[sum[0]+q[2],sum[1]+q[3]],[0,0]);
  const mass=grid.w.reduce((a,b)=>a+b,0);
  return {pic,flip,grid,speed,picWrap,flipWrap,energyPic:energy(pic),
    energyFlip:energy(flip),momentumPic:momentum(pic),
    momentumFlip:momentum(flip),mass,steps,dt:DT};
}
const byte=x=>Math.round(255*Math.min(1,Math.max(0,x)));
export function expectedFCG7Samples(width,height,steps=8){
  if(!Number.isInteger(width)||!Number.isInteger(height)||width<64||height<64)
    throw RangeError('dimensions');
  const s=fcg7State(steps);
  const point=(panel,p,n)=>({
    x:Math.min(width-1,Math.max(0,Math.floor(width*(panel+p[0])/3))),
    y:Math.min(height-1,Math.max(0,Math.floor(height*p[1]))),
    label:'particle '+n+' / '+(panel?'FLIP':'PIC'),
    rgba:panel?[245,145,38,255]:[26,204,240,255]
  });
  const grid=(i,j)=>{
    const x=Math.floor(width*(2+(i+0.5)/Q)/3),
      y=Math.floor(height*(j+0.5)/Q);
    const v=byte(s.speed[node(i,j)]/0.7);
    return {x,y,label:'grid ('+i+','+j+')',rgba:[v,51,255-v,255]};
  };
  return [point(0,s.pic[0],0),point(1,s.flip[0],0),
    point(0,s.pic[10],10),point(1,s.flip[10],10),grid(2,3),grid(5,5)];
}
export function compareFCG7Readback(got,width,height,steps=8,tolerance=2){
  return expectedFCG7Samples(width,height,steps).map((ref,k)=>{
    const a=got?.[k],valid=a&&a.x===ref.x&&a.y===ref.y&&
      Array.isArray(a.rgba)&&a.rgba.length===4&&a.rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255);
    const difference=valid?ref.rgba.map((v,i)=>Math.abs(v-a.rgba[i])):[Infinity,Infinity,Infinity,Infinity];
    return {...ref,actual:valid?a.rgba:null,difference,
      pass:!!valid&&difference.every(v=>v<=tolerance)};
  });
}
