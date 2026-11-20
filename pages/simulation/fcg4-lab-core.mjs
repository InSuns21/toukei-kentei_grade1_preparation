// FCG4 CPU oracle: independent of the learner-editable JS and GL shader.
export const FCG4_N=8, FCG4_DT=0.1, FCG4_RHO=1, FCG4_OMEGA=2/3;
const N=FCG4_N, H=1/N;
const ix=(i,j)=>i+N*j, horiz=(i,j)=>i+(N+1)*j, vert=(i,j)=>i+N*j;
export function fcg4ExactPressure(i,j){
  if(!Number.isInteger(i)||!Number.isInteger(j)||i<0||i>=N||j<0||j>=N)
    throw new RangeError('cell coordinates');
  return Math.cos(Math.PI*(i+0.5)/N)*Math.cos(Math.PI*(j+0.5)/N);
}
function stream(i,j){return 0.05*Math.sin(Math.PI*i/N)*Math.sin(Math.PI*j/N);}
function buildInitial(){
  const a=new Float64Array(N*(N+1)),c=new Float64Array((N+1)*N);
  for(let j=0;j<N;j++)for(let i=1;i<N;i++)
    c[horiz(i,j)]=(stream(i,j+1)-stream(i,j))/H+
      FCG4_DT/FCG4_RHO*(fcg4ExactPressure(i,j)-fcg4ExactPressure(i-1,j))/H;
  for(let j=1;j<N;j++)for(let i=0;i<N;i++)
    a[vert(i,j)]=-(stream(i+1,j)-stream(i,j))/H+
      FCG4_DT/FCG4_RHO*(fcg4ExactPressure(i,j)-fcg4ExactPressure(i,j-1))/H;
  return {u:c,v:a};
}
const divergence=(u,v,i,j)=>(u[horiz(i+1,j)]-u[horiz(i,j)]+v[vert(i,j+1)]-v[vert(i,j)])/H;
export function fcg4State(iterations=128){
  if(!Number.isInteger(iterations)||iterations<0||iterations>160)
    throw new RangeError('iterations must be 0..160');
  const {u:initialU,v:initialV}=buildInitial();
  const source=new Float64Array(N*N);
  for(let j=0;j<N;j++)for(let i=0;i<N;i++)
    source[ix(i,j)]=FCG4_RHO/FCG4_DT*divergence(initialU,initialV,i,j);
  let pressure=new Float64Array(N*N);
  // Independent oracle: iterate by flat cell indices and build the neighbor
  // adjacency afresh. Nothing in this module executes the learner's source.
  const adjacent=Array.from({length:N*N},(_,k)=>{
    const i=k%N,j=Math.floor(k/N),a=[];
    if(i>0)a.push(k-1);
    if(i+1<N)a.push(k+1);
    if(j>0)a.push(k-N);
    if(j+1<N)a.push(k+N);
    return a;
  });
  for(let step=0;step<iterations;step++){
    const fresh=new Float64Array(N*N);
    let total=0;
    for(let k=0;k<fresh.length;k++){
      const neighbors=adjacent[k];
      const sum=neighbors.reduce((acc,id)=>acc+pressure[id],0);
      fresh[k]=pressure[k]+FCG4_OMEGA*
        ((sum-H*H*source[k])/neighbors.length-pressure[k]);
      total+=fresh[k];
    }
    const mean=total/(N*N);
    for(let k=0;k<fresh.length;k++)fresh[k]-=mean;
    pressure=fresh;
  }
  const u=new Float64Array(initialU),v=new Float64Array(initialV);
  for(let j=0;j<N;j++)for(let i=1;i<N;i++)
    u[horiz(i,j)]-=FCG4_DT/FCG4_RHO*(pressure[ix(i,j)]-pressure[ix(i-1,j)])/H;
  for(let j=1;j<N;j++)for(let i=0;i<N;i++)
    v[vert(i,j)]-=FCG4_DT/FCG4_RHO*(pressure[ix(i,j)]-pressure[ix(i,j-1)])/H;
  const div=new Float64Array(N*N),speed=new Float64Array(N*N);
  let poissonMax=0,divBefore=0,divAfter=0,identityError=0,pressureError=0,
      wallMax=0,sourceSum=0,pressureSum=0;
  for(let k=0;k<N*N;k++){
    const i=k%N,j=Math.floor(k/N);
    const lap=(adjacent[k].reduce((acc,id)=>acc+pressure[id],0)-
      adjacent[k].length*pressure[k])/(H*H);
    const residual=lap-source[k];
    const pre=divergence(initialU,initialV,i,j),post=divergence(u,v,i,j);
    div[k]=post;
    speed[k]=Math.hypot((u[horiz(i,j)]+u[horiz(i+1,j)])/2,
      (v[vert(i,j)]+v[vert(i,j+1)])/2);
    divBefore=Math.max(divBefore,Math.abs(pre));
    divAfter=Math.max(divAfter,Math.abs(post));
    poissonMax=Math.max(poissonMax,Math.abs(residual));
    identityError=Math.max(identityError,Math.abs(post+FCG4_DT/FCG4_RHO*residual));
    pressureError=Math.max(pressureError,Math.abs(pressure[k]-fcg4ExactPressure(i,j)));
    sourceSum+=source[k];pressureSum+=pressure[k];
  }
  for(let j=0;j<N;j++)wallMax=Math.max(wallMax,
    Math.abs(u[horiz(0,j)]),Math.abs(u[horiz(N,j)]));
  for(let i=0;i<N;i++)wallMax=Math.max(wallMax,
    Math.abs(v[vert(i,0)]),Math.abs(v[vert(i,N)]));
  return {pressure,div,speed,source,u,v,initialU,initialV,
    poissonMax,divBefore,divAfter,identityError,pressureError,wallMax,
    sourceSum,pressureMean:pressureSum/(N*N)};
}
export function fcg4PixelCell(x,y,width,height){
  if(!Number.isInteger(width)||!Number.isInteger(height)||width<64||height<64||
     width>2048||height>2048||width*height>2097152||
     !Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||x>=width||y>=height)
    throw new RangeError('pixel/viewport');
  const panel=Math.min(2,Math.floor(3*(x+0.5)/width));
  const local=3*(x+0.5)/width-panel;
  const i=Math.min(N-1,Math.floor(N*local));
  const j=Math.min(N-1,Math.floor(N*(y+0.5)/height));
  return {panel:['pressure','divergence','speed'][panel],i,j};
}
const quantize=q=>Math.round(255*Math.max(0,Math.min(1,q)));
export function expectedFCG4Samples(width,height,iterations=128){
  const state=fcg4State(iterations);
  const probes=[[1,1],[4,3],[6,6]];
  return ['pressure','divergence','speed'].flatMap((panel,panelIndex)=>
    probes.map(([i,j])=>{
      const x=Math.floor((panelIndex+(i+0.5)/N)*width/3);
      const y=Math.floor((j+0.5)*height/N);
      const mapped=fcg4PixelCell(x,y,width,height),k=ix(mapped.i,mapped.j);
      const val=panel==='pressure'?state.pressure[k]:panel==='divergence'?state.div[k]:state.speed[k];
      const encoded=panel==='pressure'?quantize(0.5+0.35*val):
        panel==='divergence'?quantize(Math.abs(val)/20):quantize(val/0.25);
      const rgba=panel==='pressure'?[encoded,38,255-encoded,255]:
        panel==='divergence'?[encoded,20,20,255]:
        [31,encoded,quantize(0.8-0.5*encoded/255),255];
      return {label:panel+'('+mapped.i+','+mapped.j+')',panel,x,y,
        value:val,rgba};
    }));
}
export function compareFCG4Readback(actual,width,height,iterations=128,tolerance=2){
  if(!Number.isFinite(tolerance)||tolerance<0)throw new RangeError('tolerance');
  return expectedFCG4Samples(width,height,iterations).map((p,k)=>{
    const a=actual[k],valid=!!a&&a.x===p.x&&a.y===p.y&&
      Array.isArray(a.rgba)&&a.rgba.length===4&&
      a.rgba.every(c=>Number.isInteger(c)&&c>=0&&c<=255);
    const difference=valid?p.rgba.map((v,i)=>Math.abs(v-a.rgba[i])):[Infinity,Infinity,Infinity,Infinity];
    return {...p,actual:valid?a.rgba:null,difference,pass:valid&&difference.every(v=>v<=tolerance)};
  });
}
