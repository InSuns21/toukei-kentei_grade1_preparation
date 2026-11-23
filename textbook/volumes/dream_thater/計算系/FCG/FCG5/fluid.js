// FCG5 learner-editable 2D incompressible toy solver (Float64 CPU + R8 GPU).
// Selectable 12/24/36/48 MAC grid; no-normal-flux walls, free-slip tangential approximation.
// This is a visualization model, not a validated CFD prediction.
const N=48,h=1/N,dt=0.04,rho=1,nu=0.002,forceAmplitude=0.08;
const dyeBrushRadius=0.085,dyeBrushStrength=0.48;
// Wall-clock presentation interval; it does not alter physical dt or the solver.
const playbackIntervalMs=140;
if(!Number.isInteger(playbackIntervalMs)||playbackIntervalMs<70||playbackIntervalMs>280)
  throw new RangeError('playback interval must be 70..280 ms');
const steps=settings.steps;
if(!Number.isInteger(steps)||steps<0||steps>32)throw new RangeError('physical steps 0..32');
if(![12,24,36,48].includes(N))throw new RangeError('grid N must be 12,24,36,48');
if(dt*nu/(h*h)>0.25)throw new Error('explicit viscosity bound violated');
const ci=(i,j)=>i+N*j,ui=(i,j)=>i+(N+1)*j,vi=(i,j)=>i+N*j;
const clip=(a,lo,hi)=>Math.max(lo,Math.min(hi,a));
const psi=(i,j,A)=>A*Math.sin(Math.PI*i/N)*Math.sin(Math.PI*j/N);
function sample(a,w,height,ox,oy,x,y){
  const X=clip(x/h-ox,0,w-1),Y=clip(y/h-oy,0,height-1);
  const i=Math.floor(X),j=Math.floor(Y),I=Math.min(i+1,w-1),J=Math.min(j+1,height-1);
  const s=X-i,t=Y-j;
  return (1-t)*((1-s)*a[i+w*j]+s*a[I+w*j])+
    t*((1-s)*a[i+w*J]+s*a[I+w*J]);
}
function D(U,V,i,j){
  return (U[ui(i+1,j)]-U[ui(i,j)]+V[vi(i,j+1)]-V[vi(i,j)])/h;
}
let u=new Float64Array((N+1)*N),v=new Float64Array(N*(N+1)),dye=new Float64Array(N*N);
for(let j=0;j<N;j++)for(let i=0;i<N;i++){
  const x=(i+0.5)*h,y=(j+0.5)*h;
  dye[ci(i,j)]=Math.exp(-((x-0.73)**2+(y-0.48)**2)/(0.11**2));
}
for(let j=0;j<N;j++)for(let i=1;i<N;i++)
  u[ui(i,j)]=(psi(i,j+1,0.075)-psi(i,j,0.075))/h;
for(let j=1;j<N;j++)for(let i=0;i<N;i++)
  v[vi(i,j)]=-(psi(i+1,j,0.075)-psi(i,j,0.075))/h;
// A discrete curl starts divergence-free. Advection and viscosity will not
// generally preserve that property: pressure correction is still required.
let p=new Float64Array(N*N),rhs=new Float64Array(N*N);
let divBefore=0,divAfter=0,poissonMax=0,identityError=0,pressureIterations=0;
const initialU=u.slice(),initialV=v.slice(),initialDye=dye.slice();
function advanceFluidStep(){
  const starU=new Float64Array(u.length),starV=new Float64Array(v.length);
  const r=dt*nu/(h*h);
  for(let j=0;j<N;j++)for(let i=1;i<N;i++){
    const x=i*h,y=(j+0.5)*h,old=u[ui(i,j)];
    const vx=sample(u,N+1,N,0,0.5,x,y),vy=sample(v,N,N+1,0.5,0,x,y);
    const lap=u[ui(i-1,j)]+u[ui(i+1,j)]+
      u[ui(i,Math.max(0,j-1))]+u[ui(i,Math.min(N-1,j+1))]-4*old;
    const f=(psi(i,j+1,forceAmplitude)-psi(i,j,forceAmplitude))/h;
    starU[ui(i,j)]=sample(u,N+1,N,0,0.5,x-dt*vx,y-dt*vy)+r*lap+dt*f;
  }
  for(let j=1;j<N;j++)for(let i=0;i<N;i++){
    const x=(i+0.5)*h,y=j*h,old=v[vi(i,j)];
    const vx=sample(u,N+1,N,0,0.5,x,y),vy=sample(v,N,N+1,0.5,0,x,y);
    const lap=v[vi(Math.max(0,i-1),j)]+v[vi(Math.min(N-1,i+1),j)]+
      v[vi(i,j-1)]+v[vi(i,j+1)]-4*old;
    const f=-(psi(i+1,j,forceAmplitude)-psi(i,j,forceAmplitude))/h;
    starV[vi(i,j)]=sample(v,N,N+1,0.5,0,x-dt*vx,y-dt*vy)+r*lap+dt*f;
  }
  rhs=new Float64Array(N*N);divBefore=0;
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const d=D(starU,starV,i,j);
    divBefore=Math.max(divBefore,Math.abs(d));
    rhs[ci(i,j)]=rho/dt*d;
  }
  p=new Float64Array(N*N);
  // Neumann Poisson solve; convergence is checked on the actual fine grid.
  // The fixed 120 Jacobi sweeps are replaced by red/black SOR.
  const omega=2/(1+Math.sin(Math.PI/N));
  let converged=false;
  for(let it=1;it<=12*N;it++){
    for(let parity=0;parity<2;parity++)
      for(let j=0;j<N;j++)for(let i=(j+parity)%2;i<N;i+=2){
        let sum=0,m=0;
        if(i>0){sum+=p[ci(i-1,j)];m++;}
        if(i<N-1){sum+=p[ci(i+1,j)];m++;}
        if(j>0){sum+=p[ci(i,j-1)];m++;}
        if(j<N-1){sum+=p[ci(i,j+1)];m++;}
        const k=ci(i,j);
        p[k]+=omega*((sum-h*h*rhs[k])/m-p[k]);
      }
    if(it%4===0||it===12*N){
      let maxR=0;
      for(let j=0;j<N;j++)for(let i=0;i<N;i++){
        let sum=0,m=0;
        if(i>0){sum+=p[ci(i-1,j)];m++;}
        if(i<N-1){sum+=p[ci(i+1,j)];m++;}
        if(j>0){sum+=p[ci(i,j-1)];m++;}
        if(j<N-1){sum+=p[ci(i,j+1)];m++;}
        maxR=Math.max(maxR,Math.abs((sum-m*p[ci(i,j)])/(h*h)-rhs[ci(i,j)]));
      }
      if(maxR<1e-6){converged=true;pressureIterations=it;break;}
    }
  }
  if(!converged)throw new Error('Neumann Poisson SOR did not converge');
  // Fix the constant nullspace by choosing a mean-zero pressure.
  let pmean=0;for(const value of p)pmean+=value;
  pmean/=N*N;for(let k=0;k<N*N;k++)p[k]-=pmean;
  u=starU;v=starV;
  for(let j=0;j<N;j++)for(let i=1;i<N;i++)
    u[ui(i,j)]-=dt/rho*(p[ci(i,j)]-p[ci(i-1,j)])/h;
  for(let j=1;j<N;j++)for(let i=0;i<N;i++)
    v[vi(i,j)]-=dt/rho*(p[ci(i,j)]-p[ci(i,j-1)])/h;
  divAfter=poissonMax=identityError=0;
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const k=ci(i,j);let sum=0,m=0;
    if(i>0){sum+=p[ci(i-1,j)];m++;}
    if(i<N-1){sum+=p[ci(i+1,j)];m++;}
    if(j>0){sum+=p[ci(i,j-1)];m++;}
    if(j<N-1){sum+=p[ci(i,j+1)];m++;}
    const R=(sum-m*p[k])/(h*h)-rhs[k],d=D(u,v,i,j);
    poissonMax=Math.max(poissonMax,Math.abs(R));
    divAfter=Math.max(divAfter,Math.abs(d));
    identityError=Math.max(identityError,Math.abs(d+dt/rho*R));
  }
  const dyeNext=new Float64Array(dye.length);
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const x=(i+0.5)*h,y=(j+0.5)*h;
    const ux=(u[ui(i,j)]+u[ui(i+1,j)])/2;
    const vy=(v[vi(i,j)]+v[vi(i,j+1)])/2;
    dyeNext[ci(i,j)]=sample(dye,N,N,0.5,0.5,x-dt*ux,y-dt*vy);
  }
  dye=dyeNext;
}
for(let t=0;t<steps;t++)advanceFluidStep();
// Three physical fields, separately encoded for visualization; not the solver's state.
const divField=new Float64Array(N*N),speedField=new Float64Array(N*N);
let mass=0,peak=0,kinetic=0,maxDiv=0,maxWall=0;
for(let j=0;j<N;j++)for(let i=0;i<N;i++){
  const k=ci(i,j),ux=(u[ui(i,j)]+u[ui(i+1,j)])/2,
    vy=(v[vi(i,j)]+v[vi(i,j+1)])/2;
  divField[k]=D(u,v,i,j);
  speedField[k]=Math.hypot(ux,vy);
  maxDiv=Math.max(maxDiv,Math.abs(divField[k]));
  mass+=h*h*dye[k];peak=Math.max(peak,dye[k]);
  kinetic+=0.5*h*h*(ux*ux+vy*vy);
}
for(let j=0;j<N;j++)maxWall=Math.max(maxWall,Math.abs(u[ui(0,j)]),Math.abs(u[ui(N,j)]));
for(let i=0;i<N;i++)maxWall=Math.max(maxWall,Math.abs(v[vi(i,0)]),Math.abs(v[vi(i,N)]));
if([...dye,...u,...v,...p].some(z=>!Number.isFinite(z)))
  throw new Error('nonfinite fluid field: stopped');
const texel=(field,unit,encode)=>{
  const bytes=Uint8Array.from(field,val=>Math.round(255*clip(encode(val),0,1)));
  const tex=gl.createTexture();if(!tex)throw new Error('texture allocation');
  gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.R8,N,N,0,gl.RED,gl.UNSIGNED_BYTE,bytes);
  if(gl.getError()!==gl.NO_ERROR)throw new Error('R8 upload');
  return tex;
};
const textures=[texel(dye,0,x=>x),texel(divField,1,x=>Math.abs(x)*80),
  texel(speedField,2,x=>x/0.4)];
function compile(type,src,label){
  const sh=gl.createShader(type);
  if(!sh)throw new Error(label+' allocation');
  gl.shaderSource(sh,src);gl.compileShader(sh);
  if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))
    throw new Error(label+' '+(gl.getShaderInfoLog(sh)||'compile failed'));
  return sh;
}
const vs=compile(gl.VERTEX_SHADER,vertexSource,'VERTEX');
const fs=compile(gl.FRAGMENT_SHADER,fragmentSource,'FRAGMENT');
const prog=gl.createProgram();
if(!prog)throw new Error('program allocation');
gl.attachShader(prog,vs);gl.attachShader(prog,fs);gl.linkProgram(prog);
if(!gl.getProgramParameter(prog,gl.LINK_STATUS))
  throw new Error('LINK '+(gl.getProgramInfoLog(prog)||'failed'));
gl.deleteShader(vs);gl.deleteShader(fs);gl.useProgram(prog);
for(const [unit,name] of ['u_dye','u_div','u_speed'].entries()){
  const loc=gl.getUniformLocation(prog,name);
  if(loc===null)throw new Error('uniform missing '+name);
  gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,textures[unit]);
  gl.uniform1i(loc,unit);
}
const vao=gl.createVertexArray();if(!vao)throw new Error('VAO allocation');
gl.bindVertexArray(vao);gl.disable(gl.DITHER);gl.disable(gl.BLEND);
gl.disable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);gl.disable(gl.SCISSOR_TEST);
gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,3);
report('TIME','physical steps='+steps+', t='+(steps*dt).toFixed(3)+' s, dt='+dt+' s, render FPS is separate');
report('SPLIT','backtrace + explicit viscosity nu='+nu+' + curl force='+forceAmplitude+' + red/black SOR '+pressureIterations+' sweeps + dye');
report('DIVERGENCE','before='+divBefore.toExponential(5)+', after='+maxDiv.toExponential(5)+' s^-1');
report('POISSON','max residual='+poissonMax.toExponential(5)+' Pa/m^2'+(poissonMax>0.02?' / 未収束注意':''));
report('IDENTITY','max |div+dt/rho*residual|='+identityError.toExponential(3));
report('BOUNDARY','max wall-normal='+maxWall.toExponential(3)+' m/s (tangential free-slip approximation)');
report('DYE','integral='+mass.toPrecision(8)+', peak='+peak.toPrecision(7)+' (semi-Lagrange not conservative)');
report('ENERGY','cell-centred 0.5*integral speed^2='+kinetic.toPrecision(8)+' m^4/s^2');
report('DISPLAY','left=dye, middle=80*abs(div), right=speed/0.4; R8 only for display');


// Learner-source-linked N×N presentation, after the initial GPU snapshot.
// The original draw/readPixels checks three R8 fields in mode 0. Animated mode
// 1 changes only the display mapping; physical steps still use advanceFluidStep.
if(typeof window!=='undefined'&&typeof requestAnimationFrame==='function'){
  const modeLoc=gl.getUniformLocation(prog,'u_displayMode');
  const aspectLoc=gl.getUniformLocation(prog,'u_aspect');
  if(modeLoc!==null&&aspectLoc!==null){
    const motionPreference=window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let stateStep=steps,playing=!(motionPreference?.matches??false);
    let last=0,acc=0,raf=0,dragging=false;
    // This progress event is relayed by the isolated host with its session token.
    // The UI's live clock and the rendered solver therefore share one state.
    function emitProgress(){
      canvas.dispatchEvent(new CustomEvent('fcg5-physics-progress',{
        detail:{step:stateStep,playing}
      }));
    }
    // The sandbox host installs its authenticated relay only after run() returns.
    // Answer its handshake with the current *real* solver state, without
    // inventing progress or waiting for an animation frame.
    canvas.addEventListener('fcg5-request-progress',emitProgress);
    function pauseForMotionPreference(){
      playing=false;last=0;acc=0;
      canvas.title='FCG5 再生停止中（OSの動きを減らす設定）。Spaceで手動再生';
      emitProgress();
    }
    const onMotionPreferenceChange=event=>{
      if(event.matches)pauseForMotionPreference();
    };
    // A sandboxed iframe can have a separate media-emulation target. Mirror
    // the parent's OS preference through a one-way, parent-only message.
    const onParentMotion=event=>{
      if(event.source!==window.parent||event.data?.type!=='fcg5-motion-policy')return;
      if(event.data.reduced===true)pauseForMotionPreference();
      else emitProgress(); // Removing the preference never resumes playback.
    };
    motionPreference?.addEventListener?.('change',onMotionPreferenceChange);
    window.addEventListener('message',onParentMotion);
    canvas.tabIndex=0;
    canvas.title='FCG5 '+N+'×'+N+'実ソルバー：Spaceで再生・停止、Shift+ドラッグ（タッチならドラッグ）で染料追加。通常クリックはGPU画素診断です。';
    canvas.setAttribute('aria-label','FCG5 実際のMAC格子ソルバーの染料アニメーション。Spaceで再生停止、Shift+ドラッグで色を投入');
    for(const tex of [textures[0],textures[2]]){
      gl.bindTexture(gl.TEXTURE_2D,tex);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    }
    function resetPhysics(){
      u=initialU.slice();v=initialV.slice();dye=initialDye.slice();
      stateStep=0;divBefore=divAfter=poissonMax=identityError=0;
    }
    function refreshGpuFields(){
      for(let j=0;j<N;j++)for(let i=0;i<N;i++){
        const k=ci(i,j),vx=(u[ui(i,j)]+u[ui(i+1,j)])/2,
          vy=(v[vi(i,j)]+v[vi(i,j+1)])/2;
        divField[k]=D(u,v,i,j);
        speedField[k]=Math.hypot(vx,vy);
      }
      const fields=[dye,divField,speedField];
      const convert=[x=>x,x=>80*Math.abs(x),x=>x/.4];
      for(let unit=0;unit<3;unit++){
        gl.activeTexture(gl.TEXTURE0+unit);
        gl.bindTexture(gl.TEXTURE_2D,textures[unit]);
        gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,N,N,gl.RED,gl.UNSIGNED_BYTE,
          Uint8Array.from(fields[unit],v=>Math.round(255*clip(convert[unit](v),0,1))));
      }
    }
    function drawPhysicalDye(){
      gl.useProgram(prog);gl.bindVertexArray(vao);
      gl.uniform1i(modeLoc,1);
      gl.uniform1f(aspectLoc,canvas.width/canvas.height);
      gl.viewport(0,0,canvas.width,canvas.height);
      gl.drawArrays(gl.TRIANGLES,0,3);
    }
    // Inject dye into the editable numerical state. This is an *external dye
    // source*, not a conservative update or a fluid pressure/velocity input.
    function inject(e){
      const rect=canvas.getBoundingClientRect();
      const x=((e.clientX-rect.left)/rect.width-.5)*(canvas.width/canvas.height)+.5,
        y=1-(e.clientY-rect.top)/rect.height;
      if(x<0||x>1||y<0||y>1)return;
      for(let j=0;j<N;j++)for(let i=0;i<N;i++){
        const dx=(i+.5)*h-x,dy=(j+.5)*h-y;
        dye[ci(i,j)]=clip(dye[ci(i,j)]+dyeBrushStrength*Math.exp(-(dx*dx+dy*dy)/(dyeBrushRadius*dyeBrushRadius)),0,1);
      }
      refreshGpuFields();drawPhysicalDye();
    }
    canvas.addEventListener('pointerdown',e=>{
      if(e.pointerType!=='touch'&&!e.shiftKey)return;
      dragging=true;canvas.setPointerCapture?.(e.pointerId);
      e.preventDefault();inject(e);
    });
    canvas.addEventListener('pointermove',e=>{if(dragging)inject(e);});
    const release=()=>{dragging=false;};
    canvas.addEventListener('pointerup',release);
    canvas.addEventListener('pointercancel',release);
    function toggleLivePlayback(){
      playing=!playing;last=0;acc=0;
      canvas.title=playing?'FCG5 再生中：Spaceで停止、Shift+ドラッグで染料追加':
        'FCG5 一時停止中：Spaceで再生、Shift+ドラッグで染料追加';
      emitProgress();
    }
    const onLiveControl=event=>{
      const action=event.detail?.action;
      if(action==='toggle'){toggleLivePlayback();return;}
      if(action!=='step'&&action!=='reset')return;
      // Manual controls use the same MAC arrays as continuous playback.
      playing=false;last=0;acc=0;
      if(action==='reset')resetPhysics();
      else if(stateStep<32){advanceFluidStep();stateStep++;}
      refreshGpuFields();drawPhysicalDye();
      canvas.title='FCG5 一時停止中：Spaceで再生、Shift+ドラッグで染料追加';
      emitProgress();
    };
    canvas.addEventListener('fcg5-physics-control',onLiveControl);
    canvas.addEventListener('keydown',e=>{
      if(e.key===' '){e.preventDefault();toggleLivePlayback();}
    });
    // Draw the first presentation frame on rAF. The runner has already read
    // the untouched 3-panel oracle because it executes synchronously before
    // the browser begins the next animation frame.
    function frame(now){
      if(playing&&!document.hidden){
        if(!last)last=now;
        const delta=Math.min(.10,Math.max(0,(now-last)/1000));
        last=now;acc+=delta;
        const interval=playbackIntervalMs/1000;
        if(acc>=interval){
          acc-=interval;
          if(stateStep>=32)resetPhysics();
          else{advanceFluidStep();stateStep++;}
          refreshGpuFields();
          emitProgress();
        }
      }else last=0;
      // Avoid continuously issuing WebGL draw calls in a background tab.
      if(!document.hidden)drawPhysicalDye();
      raf=requestAnimationFrame(frame);
    }
    raf=requestAnimationFrame(frame);
    window.addEventListener('pagehide',()=>{
      cancelAnimationFrame(raf);
      motionPreference?.removeEventListener?.('change',onMotionPreferenceChange);
      window.removeEventListener('message',onParentMotion);
      canvas.removeEventListener('fcg5-request-progress',emitProgress);
      canvas.removeEventListener('fcg5-physics-control',onLiveControl);
    },{once:true});
    report('ANIMATION','N='+N+' EDITABLE solver draws the same dye state after the static R8 pixel oracle; playback interval='+playbackIntervalMs+' ms/step (wall time), physical dt='+dt+' s/step; Shift+drag adds dye, Space pauses');
  }
}
