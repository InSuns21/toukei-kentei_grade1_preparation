// FCG6 editable educational MAC obstacle solver. Physics: CPU Float64;
// GPU visualizes R8 fields. This is a staircase-mask approximation, not CFD validation.
// Change shape ('circle'/'rectangle'), centerY, wall speed, or acceleration here.
const N=48,h=1/N,dt=0.05,rho=1,shape='circle',centerY=0.5;
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
let before=0,after=0,residual=0,identity=0,meanRemoved=0,sweeps=0;
let forceX=0,forceY=0,cutCount=0,changedMask=0;
function advanceObstacleStep(step){
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
  // Build the active fluid graph once per moving-mask step. Only
  // those cells participate in SOR; all wall-face values stay prescribed.
  const adj=new Int32Array(4*N*N);adj.fill(-1);
  const colors=[[],[]],fluid=[];
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const k=ci(i,j);if(s[k])continue;
    fluid.push(k);colors[(i+j)&1].push(k);
    adj.set([fluidAt(s,i-1,j)?ci(i-1,j):-1,
      fluidAt(s,i+1,j)?ci(i+1,j):-1,
      fluidAt(s,i,j-1)?ci(i,j-1):-1,
      fluidAt(s,i,j+1)?ci(i,j+1):-1],4*k);
  }
  p=new Float64Array(N*N);
  const omega=1.94,maxSweeps=32*N,tolerance=1e-6;
  sweeps=0;let converged=false;
  for(let it=0;it<maxSweeps;it++){
    for(const cells of colors)for(const k of cells){
      let neighbors=0,base=4*k;
      for(let a=0;a<4;a++){
        const z=adj[base+a];if(z>=0)neighbors+=p[z];
      }
      p[k]+=omega*((neighbors-h*h*rhs[k])/degree[k]-p[k]);
    }
    sweeps=it+1;
    if(sweeps%8!==0&&sweeps!==maxSweeps)continue;
    let maxResidual=0,pressureMean=0;
    for(const k of fluid){
      let sum=0,base=4*k;
      for(let a=0;a<4;a++){
        const z=adj[base+a];if(z>=0)sum+=p[z];
      }
      maxResidual=Math.max(maxResidual,Math.abs((sum-degree[k]*p[k])/(h*h)-rhs[k]));
      pressureMean+=p[k];
    }
    pressureMean/=count;
    for(const k of fluid)p[k]-=pressureMean;
    if(maxResidual<tolerance){converged=true;break;}
  }
  if(!converged)throw new Error('masked Neumann SOR residual failed: N='+N+', sweeps='+sweeps);
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
for(let step=0;step<steps;step++)advanceObstacleStep(step);
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
report('POISSON','red-black SOR '+(steps?sweeps:0)+' sweeps, residual='+residual.toExponential(3)+' Pa/m^2, mean(rhs) removed='+meanRemoved.toExponential(3));
report('IDENTITY','max |D+dt/rho*R-dt/rho*mean|='+identity.toExponential(3));
report('REACTION','pressure-only Fx='+forceX.toExponential(4)+', Fy='+forceY.toExponential(4)+' N per m depth');
report('GEOMETRY','cut faces='+cutCount+', mask cell transitions='+changedMask+' (volume transfer not conservative)');
report('DYE','area integral='+integral.toPrecision(8)+' m^2, max center speed='+maxSpeed.toPrecision(5)+' m/s');
report('DISPLAY','3 panels dye | 70*abs(div) | speed/0.6; solid gray, normal arrows yellow; R8 only');


// Initial independent CPU/R8 pixel probes have already been obtained by the
// outer runner before the next animation frame. The *same editable* MAC step
// and NxN solid mask now update the animated scene; no separate solver.
if(typeof window!=='undefined'&&typeof requestAnimationFrame==='function'){
  const mode=gl.getUniformLocation(prog,'u_viewMode');
  const aspect=gl.getUniformLocation(prog,'u_aspect');
  if(mode===null||aspect===null)throw Error('missing FCG6 view uniforms');
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
  let playing=!reduced,stepNumber=steps,last=0,raf=0,firstCycle=true;
  // Only the visualized textures use bilinear filtering; the MAC solver
  // always works with un-interpolated Float64 cell/face values.
  for(const unit of [0,2]){
    gl.activeTexture(gl.TEXTURE0+unit);
    gl.bindTexture(gl.TEXTURE_2D,textures[unit]);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  }
  const initialDye=Float64Array.from({length:N*N},(_,k)=>{
    const i=k%N,j=Math.floor(k/N),x=(i+.5)*h,y=(j+.5)*h;
    const dyeAt=Math.exp(-((x-.26)**2+(y-.46)**2)/(.105**2));
    return geometry(0).s[k]?0:dyeAt;
  });
  const note=document.createElement('output');
  note.style.cssText='display:block;margin:5px 0;color:#c8eaff;font:13px system-ui';
  note.setAttribute('aria-live','off');
  canvas.insertAdjacentElement('afterend',note);
  canvas.tabIndex=0;
  canvas.title='FCG6 '+N+'×'+N+'障害物流れ。Space/Enter再生停止、→1物理step、R初期化';
  canvas.setAttribute('aria-label','FCG6 動く階段境界マスクと染料。Spaceで再生停止、矢印右で一歩進める');
  function resetState(){
    u=new Float64Array((N+1)*N);
    v=new Float64Array(N*(N+1));
    dye=initialDye.slice();geom=geometry(0);
    p=new Float64Array(N*N);
    before=after=residual=identity=meanRemoved=sweeps=0;
    forceX=forceY=cutCount=changedMask=0;
    boundary(u,v,geom.s,geom.wallU);
    stepNumber=0;
  }
  function uploadState(){
    const solidMask=geom.s;
    const displayDye=new Float64Array(N*N),div=new Float64Array(N*N),
      speed=new Float64Array(N*N);
    let peak=0,wallFlux=0;
    for(let j=0;j<N;j++)for(let i=0;i<N;i++){
      const k=ci(i,j);
      if(solidMask[k])continue;
      displayDye[k]=dye[k];
      const vx=.5*(u[ui(i,j)]+u[ui(i+1,j)]),
            vy=.5*(v[vi(i,j)]+v[vi(i,j+1)]);
      div[k]=divergence(u,v,i,j);
      speed[k]=Math.hypot(vx,vy);
      peak=Math.max(peak,Math.abs(div[k]));
    }
    for(let j=0;j<N;j++)for(let i=0;i<=N;i++)
      if(blockedU(solidMask,i,j))
        wallFlux=Math.max(wallFlux,Math.abs(u[ui(i,j)]-geom.wallU));
    for(let j=0;j<=N;j++)for(let i=0;i<N;i++)
      if(blockedV(solidMask,i,j))
        wallFlux=Math.max(wallFlux,Math.abs(v[vi(i,j)]));
    for(const [unit,arr,convert] of [
      [0,displayDye,x=>x],[1,div,x=>70*Math.abs(x)],
      [2,speed,x=>x/.6],[3,solidMask,x=>x]]){
      gl.activeTexture(gl.TEXTURE0+unit);
      gl.bindTexture(gl.TEXTURE_2D,textures[unit]);
      gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,N,N,gl.RED,gl.UNSIGNED_BYTE,
        Uint8Array.from(arr,x=>enc(convert(x))));
    }
    gl.useProgram(prog);gl.bindVertexArray(vao);
    gl.uniform1i(mode,1);
    gl.uniform1f(aspect,canvas.width/canvas.height);
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.drawArrays(gl.TRIANGLES,0,3);
    note.textContent='実'+N+'×'+N+' MAC：t='+(stepNumber*dt).toFixed(2)+' s'+
      '、固体中心x='+geom.cx.toFixed(3)+' m、壁速度x='+geom.wallU.toFixed(3)+' m/s'+
      '、最大|発散|='+peak.toExponential(2)+' s⁻¹'+
      '、壁法線誤差='+wallFlux.toExponential(1)+' m/s'+
      ' ／ Space停止/再生・→1step・R初期化';
  }
  function advance(){
    if(stepNumber>=24)resetState();
    else{advanceObstacleStep(stepNumber);stepNumber++;}
  }
  canvas.addEventListener('keydown',e=>{
    if(e.key===' '||e.key==='Enter'){
      e.preventDefault();playing=!playing;last=0;
    }else if(e.key==='ArrowRight'){
      e.preventDefault();playing=false;last=0;
      if(firstCycle){firstCycle=false;resetState();}
      advance();uploadState();
    }else if(e.key==='r'||e.key==='R'){
      e.preventDefault();playing=false;last=0;firstCycle=false;
      resetState();uploadState();
    }
  });
  function frame(now){
    if(playing&&!document.hidden){
      if(firstCycle){firstCycle=false;resetState();uploadState();}
      if(!last)last=now;
      if(now-last>=140){
        last=now;advance();uploadState();
      }
    }else last=0;
    raf=requestAnimationFrame(frame);
  }
  note.textContent='初期'+steps+'stepの画素検算後、同じ編集ソルバーをt=0から再生します。Space停止/再生、→1step、R初期化';
  raf=requestAnimationFrame(frame);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
}
