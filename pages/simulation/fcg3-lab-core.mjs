// Independent FCG3 CPU oracle. This does not execute learner JS/GLSL.
export const FCG3_N=32, FCG3_DT=1/32, FCG3_OMEGA=2*Math.PI;
const RADIUS=0.14;
export function fcg3Initial(x,y) {
  if(!Number.isFinite(x)||!Number.isFinite(y))throw new RangeError('non-finite point');
  const s=((x-0.7)**2+(y-0.5)**2)/(RADIUS*RADIUS);
  return s<1?(1-s)**2:0;
}
export function fcg3Exact(x,y,steps) {
  if(!Number.isInteger(steps)||steps<0||steps>32)throw new RangeError('steps 0..32');
  const angle=FCG3_OMEGA*FCG3_DT*steps,c=Math.cos(angle),s=Math.sin(angle);
  // The inverse of the exact rigid rotation maps the target to time zero.
  const dx=x-0.5,dy=y-0.5;
  return fcg3Initial(0.5+c*dx+s*dy,0.5-s*dx+c*dy);
}
export function fcg3Bilinear(q,x,y,N=FCG3_N) {
  if(!Number.isInteger(N)||N<2||!Number.isFinite(x)||!Number.isFinite(y))
    throw new RangeError('invalid interpolation');
  // Samples live at cell centers. All exterior/ghost cells are zero.
  const a=N*x-0.5,b=N*y-0.5;
  const i=Math.floor(a),j=Math.floor(b),u=a-i,v=b-j;
  const get=(ii,jj)=>ii>=0&&ii<N&&jj>=0&&jj<N?q[ii+N*jj]:0;
  return (1-u)*(1-v)*get(i,j)+u*(1-v)*get(i+1,j)+
    (1-u)*v*get(i,j+1)+u*v*get(i+1,j+1);
}
export function fcg3Grid(steps,N=FCG3_N) {
  if(!Number.isInteger(steps)||steps<0||steps>32||!Number.isInteger(N)||N<4||N>128)
    throw new RangeError('invalid step/grid');
  const center=(i)=>(i+0.5)/N;
  let q=Float64Array.from({length:N*N},(_,k)=>fcg3Initial(center(k%N),center(Math.floor(k/N))));
  const a=FCG3_OMEGA*FCG3_DT,c=Math.cos(a),s=Math.sin(a);
  for(let t=0;t<steps;t++) {
    const out=new Float64Array(N*N);
    for(let j=0;j<N;j++)for(let i=0;i<N;i++){
      const dx=center(i)-0.5,dy=center(j)-0.5;
      out[i+N*j]=fcg3Bilinear(q,0.5+c*dx+s*dy,0.5-s*dx+c*dy,N);
    }
    q=out;
  }
  return q;
}
export function fcg3Metrics(steps,N=FCG3_N) {
  const grid=fcg3Grid(steps,N),area=1/(N*N);
  let mass=0,exactMass=0,l1=0,max=0,peak=0;
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const k=i+N*j,exact=fcg3Exact((i+0.5)/N,(j+0.5)/N,steps);
    mass+=grid[k]*area;exactMass+=exact*area;
    l1+=Math.abs(grid[k]-exact)*area;max=Math.max(max,Math.abs(grid[k]-exact));
    peak=Math.max(peak,grid[k]);
  }
  return {mass,exactMass,l1,max,peak};
}
export function fcg3PixelCell(x,y,width,height){
  if(!Number.isInteger(width)||!Number.isInteger(height)||width<64||height<64||
     width>1024||height>1024||width*height>524288||
     !Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||x>=width||y>=height)
    throw new RangeError('invalid viewport/pixel');
  const left=(x+0.5)/width<0.5;
  const u=2*(x+0.5)/width-(left?0:1);
  return {i:Math.min(31,Math.floor(32*u)),j:Math.min(31,Math.floor(32*(y+0.5)/height)),
    panel:left?'density':'error'};
}
const enc=q=>Math.round(255*Math.max(0,Math.min(1,q)));
export function expectedFCG3Samples(width,height,steps=1) {
  const grid=fcg3Grid(steps);
  const points=[[21,15,'density'],[16,16,'density'],[11,16,'density'],[21,15,'error'],[11,16,'error'],[16,16,'error']];
  return points.map(([i,j,panel])=>{
    const x=Math.floor((i+0.5)*width/64+(panel==='error'?width/2:0));
    const y=Math.floor((j+0.5)*height/32);
    const cell=fcg3PixelCell(x,y,width,height),k=cell.i+32*cell.j;
    const numeric=grid[k],exact=fcg3Exact((cell.i+0.5)/32,(cell.j+0.5)/32,steps);
    const byte=enc(numeric),analyticByte=enc(exact);
    const rgba=cell.panel==='density'?[byte,38,255-byte,255]:
      [enc(Math.min(1,5*Math.abs(byte-analyticByte)/255)),20,26,255];
    return {label:cell.panel+'('+cell.i+','+cell.j+')',x,y,value:numeric,analytic:exact,byte,
      rgba};
  });
}
export function compareFCG3Readback(actual,width,height,steps=1,tolerance=2){
  if(!Number.isFinite(tolerance)||tolerance<0)throw new RangeError('invalid tolerance');
  return expectedFCG3Samples(width,height,steps).map((p,k)=>{
    const a=actual[k],valid=!!a&&a.x===p.x&&a.y===p.y&&Array.isArray(a.rgba)&&
      a.rgba.length===4&&a.rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255);
    const difference=valid?p.rgba.map((v,i)=>Math.abs(v-a.rgba[i])):[Infinity,Infinity,Infinity,Infinity];
    return {...p,actual:valid?a.rgba:null,difference,pass:valid&&difference.every(v=>v<=tolerance)};
  });
}
