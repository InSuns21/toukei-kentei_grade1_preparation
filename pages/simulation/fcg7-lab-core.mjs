// Independent CPU oracle for the FCG7 default sources. Does not run editable student JS.
const Q=24,DT=0.08,M=2304;
const rem=x=>((x%1)+1)%1;
const node=(i,j)=>((i%Q)+Q)%Q+Q*(((j%Q)+Q)%Q);
function corners(x,y){
  const u=Q*rem(x),v=Q*rem(y),a=Math.floor(u),b=Math.floor(v),s=u-a,t=v-b;
  return [[node(a,b),(1-s)*(1-t)],[node(a+1,b),s*(1-t)],
    [node(a,b+1),(1-s)*t],[node(a+1,b+1),s*t]];
}
function start(){
  return Array.from({length:M},(_,k)=>{
    const i=k%48,j=Math.floor(k/48),r=0.36*Math.sqrt((j+0.5)/48),
      theta=Math.PI*(2*i+(j%2))/48;
    const x=0.5+r*Math.cos(theta),y=0.5+r*Math.sin(theta),sign=k%48%2===j%2?-1:1;
    return [x,y,-0.65*(y-0.5)+0.18*sign,0.65*(x-0.5)-0.18*sign,
      1+Math.floor(((i+3*Math.floor(j/8))%48)/12)];
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
  const base=deposit(pts),modified=base.v.map(v=>v.slice());
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
    return [rem(x),rem(y),vx,vy,p[4]];
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
  // Independent point queries: no learner raster or shader is executed.
  const palette=[[15,20,31],[80,148,255],[38,222,193],[255,220,104],[248,125,81]];
  const probe=(panel,u,v,label)=>{
    const x=Math.min(width-1,Math.max(0,Math.floor(width*(panel+u)/3)));
    const y=Math.min(height-1,Math.max(0,Math.floor(height*v)));
    const X=3*(x+0.5)/width-panel,Y=(y+0.5)/height;
    if(panel===2){
      const i=Math.min(Q-1,Math.max(0,Math.floor(X*Q))),j=Math.min(Q-1,Math.max(0,Math.floor(Y*Q)));
      const b=byte(s.speed[node(i,j)]/0.7);
      return {x,y,label,rgba:[b,51,255-b,255]};
    }
    const a=Math.min(255,Math.max(0,Math.floor(X*256))),b=Math.min(255,Math.max(0,Math.floor(Y*256)));
    let dye=0;
    for(const p of panel===0?s.pic:s.flip){
      const dx=Math.abs(Math.floor(p[0]*256)-a),dy=Math.abs(Math.floor(p[1]*256)-b);
      if(Math.min(dx,256-dx)<=1&&Math.min(dy,256-dy)<=1)dye=Math.max(dye,p[4]);
    }
    return {x,y,label,rgba:[...palette[dye],255]};
  };
  return [probe(0,s.pic[600][0],s.pic[600][1],'PIC tracer 600'),
    probe(1,s.flip[600][0],s.flip[600][1],'FLIP tracer 600'),
    probe(0,s.pic[1800][0],s.pic[1800][1],'PIC tracer 1800'),
    probe(1,s.flip[1800][0],s.flip[1800][1],'FLIP tracer 1800'),
    probe(2,10.5/Q,12.5/Q,'PIC grid (10,12)'),probe(2,15.5/Q,14.5/Q,'PIC grid (15,14)')];
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
