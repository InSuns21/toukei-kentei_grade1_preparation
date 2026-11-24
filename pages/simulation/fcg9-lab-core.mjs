// Independent CPU reference: construct crossing points by scanning grid edges,
// then derive cell connectivity and a flat-shaded orthographic pixel probe.
export const FCG9_DEFAULTS=Object.freeze({N:12,steps:0,heightM:0.2,mode:'face'});
export function referenceFCG9(options={}){
  const {N,steps,heightM,mode}={...FCG9_DEFAULTS,...options};
  const h=1/N,at=(i,j)=>i+N*j;
  let rows=Array.from({length:N},(_,j)=>Array.from({length:N},(_,i)=>
    Math.hypot((i+0.5)/N-0.5,(j+0.5)/N-0.5)-0.18));
  // Independent row recurrence: upstream neighbour and fractional shift.
  for(let k=0;k<steps;k++)rows=rows.map((row,j)=>{
    const shift=0.04*0.6*((j+0.5)/N-0.5)*N;
    const amount=Math.abs(shift),whole=Math.floor(amount),f=amount-whole,sgn=Math.sign(shift);
    const get=i=>row[Math.max(0,Math.min(N-1,i))];
    return row.map((_,i)=>(1-f)*get(i-sgn*whole)+f*get(i-sgn*(whole+1)));
  });
  const value=(i,j)=>rows[j][i]===0?1e-12:rows[j][i];
  const edges=new Map();
  function edge(i,j,x,y){
    const a=value(i,j),b=value(x,y);
    if((a<0)===(b<0))return;
    const t=Math.abs(a)/(Math.abs(a)+Math.abs(b)),k=at(i,j),l=at(x,y);
    const grad=(i,j)=>[(value(Math.min(N-1,i+1),j)-value(Math.max(0,i-1),j))/
      ((Math.min(N-1,i+1)-Math.max(0,i-1))*h),
      (value(i,Math.min(N-1,j+1))-value(i,Math.max(0,j-1)))/
      ((Math.min(N-1,j+1)-Math.max(0,j-1))*h)];
    const g=grad(i,j),g2=grad(x,y);
    edges.set(k+':'+l,{p:[(i+0.5+t*(x-i))/N,(j+0.5+t*(y-j))/N],
      g:[(1-t)*g[0]+t*g2[0],(1-t)*g[1]+t*g2[1]],edge:[k,l]});
  }
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    if(i+1<N)edge(i,j,i+1,j);
    if(j+1<N)edge(i,j,i,j+1);
  }
  const segments=[];
  for(let j=0;j<N-1;j++)for(let i=0;i<N-1;i++){
    const a=at(i,j),b=a+1,c=b+N,d=a+N;
    const e=[edges.get(a+':'+b),edges.get(b+':'+c),edges.get(d+':'+c),edges.get(a+':'+d)];
    const v=[value(i,j),value(i+1,j),value(i+1,j+1),value(i,j+1)];
    const ids=e.map((p,k)=>p?k:-1).filter(k=>k>=0);
    const pairs=ids.length===2?[ids]:ids.length===4?
      (v[0]*v[2]>=v[1]*v[3]?[[0,1],[2,3]]:[[0,3],[1,2]]):[];
    for(const [x,y] of pairs)segments.push(v[x]<0?[e[x],e[y]]:[e[y],e[x]]);
  }
  return {N,steps,heightM,mode,rows,edges,segments};
}
function panels(w,h){
  if(w>=h){let a=Math.floor(w/2);return [[0,0,a,h],[a,0,w-a,h]];}
  let a=Math.floor(h/2);return [[0,a,w,h-a],[0,0,w,a]];
}
const bg=[17,24,39,255];
function screen(p,z,box,H,view){
  const [x,y]=p.map(x=>x-0.5),zz=z-H*0.5,a=box[2]/box[3];
  const X=(view?3.4*x:1.8*x)*Math.min(1,1/a);
  const Y=(view?3.4*(0.6*y+0.8*zz):1.8*y)*Math.min(1,a);
  return [box[0]+(X+1)*box[2]/2,box[1]+(Y+1)*box[3]/2,0.8*y-0.6*zz];
}
function triangleWeights(p,[a,b,c]){
  const cross=(u,v)=>u[0]*v[1]-u[1]*v[0],sub=(u,v)=>[u[0]-v[0],u[1]-v[1]];
  const area=cross(sub(b,a),sub(c,a));if(Math.abs(area)<1e-10)return null;
  const u=cross(sub(p,a),sub(c,a))/area,v=cross(sub(b,a),sub(p,a))/area;
  return [1-u-v,u,v];
}
export function expectedFCG9Samples(width,height,options={}){
  const s=referenceFCG9(options),[left,right]=panels(width,height),H=s.heightM;
  const samples=[{label:'格子外背景',x:left[0],y:left[1],rgba:bg},
    {label:'メッシュ外背景',x:right[0],y:right[1],rgba:bg}];
  if(s.N<=24&&Math.min(left[2],left[3])>=240){
    for(const [label,i,j,color] of [['内部標本',Math.floor(s.N/2),Math.floor(s.N/2),[70,175,210,255]],
      ['外部標本',1,1,[100,112,130,255]]]){
      const p=screen([(i+0.5)/s.N,(j+0.5)/s.N],0,left,H,0);
      samples.push({label,x:Math.floor(p[0]),y:Math.floor(p[1]),rgba:color});
    }
  }
  if(s.mode==='wire')return samples;
  const tris=[];
  for(const [a,b] of s.segments){
    const dx=b.p[0]-a.p[0],dy=b.p[1]-a.p[1],len=Math.hypot(dx,dy);
    if(!len)continue;
    const n=[dy/len,-dx/len];
    const norm=v=>{const l=Math.hypot(...v.g);return s.mode==='gradient'&&l>1e-12?v.g.map(x=>x/l):n;};
    for(const t of [[[a,0],[b,0],[b,H]],[[a,0],[b,H],[a,H]]])
      tris.push({p:t.map(([v,z])=>screen(v.p,z,right,H,1)),n:t.map(([v])=>norm(v))});
  }
  for(const tri of tris){
    const x=Math.floor(tri.p.reduce((sum,p)=>sum+p[0],0)/3),
      y=Math.floor(tri.p.reduce((sum,p)=>sum+p[1],0)/3);
    if(x<right[0]||x>=right[0]+right[2]||y<right[1]||y>=right[1]+right[3])continue;
    const hits=[];
    for(const t of tris){
      const w=triangleWeights([x+0.5,y+0.5],t.p);
      if(w&&Math.min(...w)>=0)hits.push({t,w,z:w.reduce((sum,v,i)=>sum+v*t.p[i][2],0)});
    }
    hits.sort((a,b)=>a.z-b.z);
    const hit=hits[0];
    if(!hit||Math.min(...hit.w)<0.12||(hits[1]&&hits[1].z-hit.z<1e-4))continue;
    const n=[0,1].map(d=>hit.w.reduce((sum,v,i)=>sum+v*hit.t.n[i][d],0));
    const dot=(-0.6*n[0]-0.8*n[1])/Math.hypot(...n),f=0.28+0.72*Math.max(dot,0);
    samples.push({label:'側面内点の陰影',x,y,rgba:[51,158,224].map(v=>Math.round(v*f)).concat(255)});
    break;
  }
  return samples;
}
export function compareFCG9Readback(samples,width,height,options={}){
  return expectedFCG9Samples(width,height,options).map((p,i)=>{
    const actual=samples[i],valid=actual&&actual.x===p.x&&actual.y===p.y&&Array.isArray(actual.rgba)&&actual.rgba.length===4;
    const difference=valid?p.rgba.map((v,k)=>Math.abs(v-actual.rgba[k])):[Infinity,Infinity,Infinity,Infinity];
    return {...p,actual:valid?actual.rgba:null,difference,pass:valid&&difference.every(v=>v<=3)};
  });
}
