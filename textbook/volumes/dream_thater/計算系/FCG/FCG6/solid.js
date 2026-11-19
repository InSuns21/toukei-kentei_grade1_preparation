// FCG6 editable educational MAC obstacle solver. Physics: CPU Float64;
// GPU visualizes R8 fields. This is a staircase-mask approximation, not CFD validation.
// Change shape ('circle'/'rectangle'), centerY, wall speed, or acceleration here.
const N=16,h=1/N,dt=0.05,rho=1,shape='circle',centerY=0.5;
const wallAmplitude=0.10,wallFrequency=1.8,acceleration=0.07;
const steps=settings.steps;
if(!Number.isInteger(steps)||steps<0||steps>24)throw new RangeError('steps: 0..24');
const ci=(i,j)=>i+N*j,ui=(i,j)=>i+(N+1)*j,vi=(i,j)=>i+N*j;
const clip=(x,a,b)=>Math.max(a,Math.min(b,x));
const valid=(i,j)=>i>=0&&i<N&&j>=0&&j<N;
function geometry(t){
  const cx=0.5+wallAmplitude*Math.sin(wallFrequency*t);
  const wallU=wallAmplitude*wallFrequency*Math.cos(wallFrequency*t);
  const s=new Uint8Array(N*N);
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const x=(i+0.5)*h-cx,y=(j+0.5)*h-centerY;
    s[ci(i,j)]=Number(shape==='rectangle'?
      (Math.abs(x)<0.17&&Math.abs(y)<0.12):(x*x+y*y<0.19*0.19));
  }
  return {cx,wallU,s};
}
const solidAt=(s,i,j)=>valid(i,j)&&s[ci(i,j)]===1;
const fluidAt=(s,i,j)=>valid(i,j)&&!s[ci(i,j)];
// An interface face has exactly one adjacent fluid cell. Outer wall faces
// have zero normal velocity; solid-solid faces are unused by D_h.
function openU(s,i,j){return i>0&&i<N&&fluidAt(s,i-1,j)&&fluidAt(s,i,j);}
function openV(s,i,j){return j>0&&j<N&&fluidAt(s,i,j-1)&&fluidAt(s,i,j);}
function blockedU(s,i,j){return i>0&&i<N&&(solidAt(s,i-1,j)!==solidAt(s,i,j));}
function blockedV(s,i,j){return j>0&&j<N&&(solidAt(s,i,j-1)!==solidAt(s,i,j));}
function boundary(U,V,s,wallU){
  for(let j=0;j<N;j++)for(let i=0;i<=N;i++){
    if(!openU(s,i,j))U[ui(i,j)]=blockedU(s,i,j)?wallU:0;
  }
  for(let j=0;j<=N;j++)for(let i=0;i<N;i++){
    if(!openV(s,i,j))V[vi(i,j)]=0;
  }
}
function divergence(U,V,i,j){
  return (U[ui(i+1,j)]-U[ui(i,j)]+V[vi(i,j+1)]-V[vi(i,j)])/h;
}
const spin=(i,j)=>Math.sin(Math.PI*i/N)*Math.sin(Math.PI*j/N);
function sampleDye(q,s,x,y,fallback){
  // A failed footprint in solid returns the value at the arrival fluid cell.
  const X=clip(x/h-0.5,0,N-1),Y=clip(y/h-0.5,0,N-1);
  const i=Math.floor(X),j=Math.floor(Y),a=X-i,b=Y-j;
  let total=0,weight=0;
  for(const [ii,jj,w] of [[i,j,(1-a)*(1-b)],[Math.min(N-1,i+1),j,a*(1-b)],
    [i,Math.min(N-1,j+1),(1-a)*b],
    [Math.min(N-1,i+1),Math.min(N-1,j+1),a*b]]){
    if(fluidAt(s,ii,jj)){total+=w*q[ci(ii,jj)];weight+=w;}
  }
  return weight>1e-12?total/weight:fallback;
}
let u=new Float64Array((N+1)*N),v=new Float64Array(N*(N+1));
let dye=new Float64Array(N*N);
for(let j=0;j<N;j++)for(let i=0;i<N;i++){
  const x=(i+0.5)*h,y=(j+0.5)*h;
  dye[ci(i,j)]=Math.exp(-((x-0.26)**2+(y-0.46)**2)/(0.105**2));
}
let geom=geometry(0),p=new Float64Array(N*N);
for(let k=0;k<N*N;k++)if(geom.s[k])dye[k]=0;
boundary(u,v,geom.s,geom.wallU);
let before=0,after=0,residual=0,identity=0,meanRemoved=0;
let forceX=0,forceY=0,cutCount=0,changedMask=0;
for(let step=0;step<steps;step++){
  const old=geom.s;
  geom=geometry((step+1)*dt);
  const s=geom.s;
  for(let k=0;k<N*N;k++){
    if(s[k]!==old[k])changedMask++;
    if(s[k])dye[k]=0;
  }
  // FCG5's advection/viscosity are deliberately frozen for this
  // boundary-isolation experiment. Every step still updates momentum,
  // solves masked pressure, and transports dye.
  const a=u.slice(),b=v.slice();
  for(let j=0;j<N;j++)for(let i=1;i<N;i++)
    if(openU(s,i,j))a[ui(i,j)]+=dt*acceleration*
      (spin(i,j+1)-spin(i,j))/h;
  for(let j=1;j<N;j++)for(let i=0;i<N;i++)
    if(openV(s,i,j))b[vi(i,j)]-=dt*acceleration*
      (spin(i+1,j)-spin(i,j))/h;
  boundary(a,b,s,geom.wallU);
  const rhs=new Float64Array(N*N),degree=new Uint8Array(N*N);
  let count=0,sum=0;before=0;
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    if(!fluidAt(s,i,j))continue;
    const k=ci(i,j),d=divergence(a,b,i,j);
    rhs[k]=rho/dt*d;sum+=rhs[k];count++;
    degree[k]=Number(fluidAt(s,i-1,j))+Number(fluidAt(s,i+1,j))+
      Number(fluidAt(s,i,j-1))+Number(fluidAt(s,i,j+1));
    before=Math.max(before,Math.abs(d));
  }
  if(!count||[...degree].some((m,k)=>!s[k]&&m===0))
    throw new Error('disconnected isolated fluid cell');
  // Moving staircase remeshing may break discrete volume compatibility.
  // Remove constant RHS component and report it; this leaves a measurable
  // divergence defect instead of falsely claiming incompressibility.
  meanRemoved=sum/count;
  for(let k=0;k<N*N;k++)if(!s[k])rhs[k]-=meanRemoved;
  p=new Float64Array(N*N);
  const next=new Float64Array(N*N),omega=2/3;
  for(let it=0;it<240;it++){
    let pMean=0;
    for(let j=0;j<N;j++)for(let i=0;i<N;i++){
      const k=ci(i,j);if(s[k])continue;
      let neighbors=0;
      if(fluidAt(s,i-1,j))neighbors+=p[ci(i-1,j)];
      if(fluidAt(s,i+1,j))neighbors+=p[ci(i+1,j)];
      if(fluidAt(s,i,j-1))neighbors+=p[ci(i,j-1)];
      if(fluidAt(s,i,j+1))neighbors+=p[ci(i,j+1)];
      const target=(neighbors-h*h*rhs[k])/degree[k];
      next[k]=(1-omega)*p[k]+omega*target;pMean+=next[k];
    }
    pMean/=count;
    for(let k=0;k<N*N;k++)if(!s[k])next[k]-=pMean;
    p.set(next);
  }
  // Pressure changes ONLY fluid-fluid faces, preserving prescribed wall flux.
  u=a;v=b;
  for(let j=0;j<N;j++)for(let i=1;i<N;i++)if(openU(s,i,j))
    u[ui(i,j)]-=dt/rho*(p[ci(i,j)]-p[ci(i-1,j)])/h;
  for(let j=1;j<N;j++)for(let i=0;i<N;i++)if(openV(s,i,j))
    v[vi(i,j)]-=dt/rho*(p[ci(i,j)]-p[ci(i,j-1)])/h;
  after=residual=identity=0;forceX=forceY=0;cutCount=0;
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    if(!fluidAt(s,i,j))continue;
    const k=ci(i,j),neighbors=[];
    if(fluidAt(s,i-1,j))neighbors.push(ci(i-1,j));
    if(fluidAt(s,i+1,j))neighbors.push(ci(i+1,j));
    if(fluidAt(s,i,j-1))neighbors.push(ci(i,j-1));
    if(fluidAt(s,i,j+1))neighbors.push(ci(i,j+1));
    const L=(neighbors.reduce((acc,z)=>acc+p[z],0)-neighbors.length*p[k])/(h*h);
    const R=L-rhs[k],div=divergence(u,v,i,j);
    residual=Math.max(residual,Math.abs(R));
    after=Math.max(after,Math.abs(div));
    identity=Math.max(identity,Math.abs(div+dt/rho*R-dt/rho*meanRemoved));
    // outward normal from fluid into solid; force ON solid = +p*n*h
    for(const [di,dj] of [[1,0],[-1,0],[0,1],[0,-1]])
      if(solidAt(s,i+di,j+dj)){
        forceX+=p[k]*di*h;forceY+=p[k]*dj*h;cutCount++;
      }
  }
  const qNext=new Float64Array(N*N);
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    if(!fluidAt(s,i,j))continue;
    const k=ci(i,j),x=(i+0.5)*h,y=(j+0.5)*h;
    const vx=0.5*(u[ui(i,j)]+u[ui(i+1,j)]);
    const vy=0.5*(v[vi(i,j)]+v[vi(i,j+1)]);
    const footX=x-dt*vx,footY=y-dt*vy;
    qNext[k]=solidAt(s,Math.floor(footX/h),Math.floor(footY/h))?
      dye[k]:sampleDye(dye,s,footX,footY,dye[k]);
  }
  dye=qNext;
}
const solid=geom.s;
const divField=new Float64Array(N*N),speedField=new Float64Array(N*N);
let integral=0,maxSpeed=0,wallError=0;
for(let j=0;j<N;j++)for(let i=0;i<N;i++){
  const k=ci(i,j);if(solid[k])continue;
  const vx=0.5*(u[ui(i,j)]+u[ui(i+1,j)]),
        vy=0.5*(v[vi(i,j)]+v[vi(i,j+1)]);
  divField[k]=divergence(u,v,i,j);
  speedField[k]=Math.hypot(vx,vy);
  maxSpeed=Math.max(maxSpeed,speedField[k]);
  integral+=h*h*dye[k];
}
for(let j=0;j<N;j++)for(let i=0;i<=N;i++)
  if(blockedU(solid,i,j))wallError=Math.max(wallError,Math.abs(u[ui(i,j)]-geom.wallU));
for(let j=0;j<=N;j++)for(let i=0;i<N;i++)
  if(blockedV(solid,i,j))wallError=Math.max(wallError,Math.abs(v[vi(i,j)]));
if([...u,...v,...dye,...p].some(x=>!Number.isFinite(x)))throw new Error('nonfinite state');
const enc=(x)=>Math.round(255*clip(x,0,1));
const texel=(field,unit,scale)=>{
  const data=Uint8Array.from(field,x=>enc(scale(x)));
  const texture=gl.createTexture();if(!texture)throw new Error('texture allocation');
  gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,texture);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.R8,N,N,0,gl.RED,gl.UNSIGNED_BYTE,data);
  if(gl.getError()!==gl.NO_ERROR)throw new Error('R8 texture upload failed');
  return texture;
};
const textures=[texel(dye,0,x=>x),texel(divField,1,x=>70*Math.abs(x)),
  texel(speedField,2,x=>x/0.6),texel(solid,3,x=>x)];
function compile(type,source){
  const shader=gl.createShader(type);if(!shader)throw new Error('shader allocation');
  gl.shaderSource(shader,source);gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(shader)||'GLSL compile error');
  return shader;
}
const vs=compile(gl.VERTEX_SHADER,vertexSource),fs=compile(gl.FRAGMENT_SHADER,fragmentSource);
const prog=gl.createProgram();if(!prog)throw new Error('program allocation');
gl.attachShader(prog,vs);gl.attachShader(prog,fs);gl.linkProgram(prog);
if(!gl.getProgramParameter(prog,gl.LINK_STATUS))
  throw new Error(gl.getProgramInfoLog(prog)||'GLSL link error');
gl.deleteShader(vs);gl.deleteShader(fs);gl.useProgram(prog);
for(const [unit,name] of ['u_dye','u_div','u_speed','u_solid'].entries()){
  const loc=gl.getUniformLocation(prog,name);
  if(loc===null)throw new Error('missing uniform '+name);
  gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,textures[unit]);
  gl.uniform1i(loc,unit);
}
const vao=gl.createVertexArray();gl.bindVertexArray(vao);
gl.disable(gl.DITHER);gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);
gl.disable(gl.SCISSOR_TEST);gl.viewport(0,0,canvas.width,canvas.height);
gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES,0,3);
report('MODEL','staircase '+shape+' mask, N='+N+', dt='+dt+' s, steps='+steps);
report('BODY','center=('+geom.cx.toFixed(4)+','+centerY+'), wallUx='+geom.wallU.toFixed(5)+' m/s');
report('FLUX','max |face normal-wall normal|='+wallError.toExponential(3)+' m/s');
report('PROJECTION','pre='+before.toExponential(3)+', post='+after.toExponential(3)+' s^-1');
report('POISSON','residual='+residual.toExponential(3)+' Pa/m^2, mean(rhs) removed='+meanRemoved.toExponential(3));
report('IDENTITY','max |D+dt/rho*R-dt/rho*mean|='+identity.toExponential(3));
report('REACTION','pressure-only Fx='+forceX.toExponential(4)+', Fy='+forceY.toExponential(4)+' N per m depth');
report('GEOMETRY','cut faces='+cutCount+', mask cell transitions='+changedMask+' (volume transfer not conservative)');
report('DYE','area integral='+integral.toPrecision(8)+' m^2, max center speed='+maxSpeed.toPrecision(5)+' m/s');
report('DISPLAY','3 panels dye | 70*abs(div) | speed/0.6; solid gray, normal arrows yellow; R8 only');
