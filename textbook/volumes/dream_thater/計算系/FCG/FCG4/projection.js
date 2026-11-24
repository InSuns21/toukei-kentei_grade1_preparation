// FCG4: MAC pressure projection, fixed no-flux walls; learner-editable JS.
// Float64 MAC solver; R8 diagnostic snapshot and live signed fields use the same arrays.
const N=32;
const h=1/N,rho=1,dt=0.1,relax=2/3,iterations=settings.steps;
if(![8,16,24,32,40,48].includes(N))throw new RangeError('N must be 8,16,24,32,40,48');
const maxIterations=160*(N/8)**2;
if(!Number.isInteger(iterations)||iterations<0||iterations>maxIterations)
  throw new RangeError('Poisson iterations must be 0..'+maxIterations);
const cell=(i,j)=>i+N*j,ui=(i,j)=>i+(N+1)*j,vi=(i,j)=>i+N*j;
const phi=(i,j)=>Math.cos(Math.PI*(i+0.5)/N)*Math.cos(Math.PI*(j+0.5)/N);
const psi=(i,j)=>0.05*Math.sin(Math.PI*i/N)*Math.sin(Math.PI*j/N);
const pressureExact=Float64Array.from({length:N*N},(_,k)=>phi(k%N,Math.floor(k/N)));
const uStar=new Float64Array((N+1)*N),vStar=new Float64Array(N*(N+1));
for(let j=0;j<N;j++)for(let i=1;i<N;i++)
  uStar[ui(i,j)]=(psi(i,j+1)-psi(i,j))/h+dt/rho*(phi(i,j)-phi(i-1,j))/h;
for(let j=1;j<N;j++)for(let i=0;i<N;i++)
  vStar[vi(i,j)]=-(psi(i+1,j)-psi(i,j))/h+dt/rho*(phi(i,j)-phi(i,j-1))/h;
// All four exterior normal velocity arrays remain exactly zero.
function divergence(u,v,i,j) {
  return (u[ui(i+1,j)]-u[ui(i,j)]+v[vi(i,j+1)]-v[vi(i,j)])/h;
}
const rhs=new Float64Array(N*N);
for(let j=0;j<N;j++)for(let i=0;i<N;i++)
  rhs[cell(i,j)]=rho/dt*divergence(uStar,vStar,i,j);
let p=new Float64Array(N*N),next=new Float64Array(N*N);
function neighbours(q,i,j) {
  let sum=0,count=0;
  if(i>0){sum+=q[cell(i-1,j)];count++;}
  if(i<N-1){sum+=q[cell(i+1,j)];count++;}
  if(j>0){sum+=q[cell(i,j-1)];count++;}
  if(j<N-1){sum+=q[cell(i,j+1)];count++;}
  return [sum,count];
}
function jacobiIteration(){
  let mean=0;
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const id=cell(i,j),[sum,count]=neighbours(p,i,j);
    next[id]=(1-relax)*p[id]+relax*(sum-h*h*rhs[id])/count;
    mean+=next[id]/(N*N);
  }
  for(let n=0;n<N*N;n++)next[n]-=mean;
  [p,next]=[next,p];
}
for(let k=0;k<iterations;k++)jacobiIteration();
const u=new Float64Array(uStar),v=new Float64Array(vStar);
function projectVelocity(){
  u.set(uStar);v.set(vStar);
  for(let j=0;j<N;j++)for(let i=1;i<N;i++)
    u[ui(i,j)]-=dt/rho*(p[cell(i,j)]-p[cell(i-1,j)])/h;
  for(let j=1;j<N;j++)for(let i=0;i<N;i++)
    v[vi(i,j)]-=dt/rho*(p[cell(i,j)]-p[cell(i,j-1)])/h;
}
projectVelocity();
const pressureTex=new Float64Array(N*N),divTex=new Float64Array(N*N),
  speedTex=new Float64Array(N*N);
let poissMax=0,divBefore=0,divAfter=0,manufacturedError=0,
    residualIdentityError=0,compatibility=0,meanPressure=0;
for(let j=0;j<N;j++)for(let i=0;i<N;i++){
  const k=cell(i,j),[sum,n]=neighbours(p,i,j);
  const residual=(sum-n*p[k])/(h*h)-rhs[k];
  const pre=divergence(uStar,vStar,i,j),post=divergence(u,v,i,j);
  const cx=(u[ui(i,j)]+u[ui(i+1,j)])/2,
    cy=(v[vi(i,j)]+v[vi(i,j+1)])/2;
  poissMax=Math.max(poissMax,Math.abs(residual));
  divBefore=Math.max(divBefore,Math.abs(pre));
  divAfter=Math.max(divAfter,Math.abs(post));
  residualIdentityError=Math.max(residualIdentityError,Math.abs(post+dt/rho*residual));
  manufacturedError=Math.max(manufacturedError,Math.abs(p[k]-pressureExact[k]));
  compatibility+=rhs[k];meanPressure+=p[k];
  pressureTex[k]=Math.max(0,Math.min(1,0.5+0.35*p[k]));
  divTex[k]=Math.max(0,Math.min(1,Math.abs(post)/20));
  speedTex[k]=Math.max(0,Math.min(1,Math.hypot(cx,cy)/0.25));
}
let wallMax=0;
for(let j=0;j<N;j++)wallMax=Math.max(wallMax,Math.abs(u[ui(0,j)]),Math.abs(u[ui(N,j)]));
for(let i=0;i<N;i++)wallMax=Math.max(wallMax,Math.abs(v[vi(i,0)]),Math.abs(v[vi(i,N)]));
if([poissMax,divBefore,divAfter,manufacturedError,residualIdentityError,
    wallMax,compatibility,meanPressure].some(x=>!Number.isFinite(x)))
  throw new Error('nonfinite MAC diagnostic');
function texture(values,unit){
  const bytes=Uint8Array.from(values,q=>Math.round(255*q));
  const tex=gl.createTexture();if(!tex)throw new Error('texture allocation failed');
  gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.R8,N,N,0,gl.RED,gl.UNSIGNED_BYTE,bytes);
  if(gl.getError()!==gl.NO_ERROR)throw new Error('R8 texture upload failed');
  return tex;
}
const textures=[texture(pressureTex,0),texture(divTex,1),texture(speedTex,2)];
function compile(type,source,label){
  const sh=gl.createShader(type);if(!sh)throw new Error(label+' allocation');
  gl.shaderSource(sh,source);gl.compileShader(sh);
  if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))
    throw new Error(label+' '+(gl.getShaderInfoLog(sh)||'compile failed'));
  return sh;
}
const vertex=compile(gl.VERTEX_SHADER,vertexSource,'VERTEX');
const fragment=compile(gl.FRAGMENT_SHADER,fragmentSource,'FRAGMENT');
const program=gl.createProgram();if(!program)throw new Error('program allocation');
gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))
  throw new Error('LINK '+(gl.getProgramInfoLog(program)||'failed'));
gl.deleteShader(vertex);gl.deleteShader(fragment);
gl.useProgram(program);
for(const [k,name] of ['u_pressure','u_div','u_speed'].entries()){
  const loc=gl.getUniformLocation(program,name);
  if(loc===null)throw new Error('uniform missing '+name);
  gl.activeTexture(gl.TEXTURE0+k);gl.bindTexture(gl.TEXTURE_2D,textures[k]);
  gl.uniform1i(loc,k);
}
const vao=gl.createVertexArray();if(!vao)throw new Error('VAO allocation');
gl.bindVertexArray(vao);gl.disable(gl.DITHER);gl.disable(gl.BLEND);
gl.disable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);gl.disable(gl.SCISSOR_TEST);
gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,3);
report('ITER','relaxed Jacobi '+iterations+'/'+maxIterations+', omega='+relax+', physical dt='+dt+' s (not animation fps)');
report('POISSON','max |L p-b|='+poissMax.toPrecision(8)+' Pa/m^2'+
 (poissMax>0.02?' / 未収束の可能性あり':' / chosen threshold 0.02以下'));
report('DIV','max |div initial|='+divBefore.toPrecision(8)+
 ', |div projected|='+divAfter.toPrecision(8)+' s^-1');
report('IDENTITY','max |div + dt/rho*residual|='+residualIdentityError.toExponential(3));
report('BOUNDARY','max wall normal |u|='+wallMax.toExponential(3)+' m/s, sum rhs='+compatibility.toExponential(3));
report('MANUFACTURED','max |p-phi|='+manufacturedError.toPrecision(8)+
 ' Pa, mean p='+(meanPressure/(N*N)).toExponential(3));
report('DISPLAY','left pressure (0.5+0.35p), middle abs(div)/20, right cell speed/0.25; R8 quantized');


// The host captures the original nine R8 probes first, then calls this
// observation hook. No second solver or independent animation clock is used.
if(typeof window!=='undefined'&&typeof requestAnimationFrame==='function'){
  let iter=iterations,playing=false,last=0,raf=0,visible=false;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const observation=gl.getUniformLocation(program,'u_observe');
  const fieldBefore=gl.getUniformLocation(program,'u_before');
  const fieldAfter=gl.getUniformLocation(program,'u_after');
  const displayScale=gl.getUniformLocation(program,'u_divScale');
  const stacked=gl.getUniformLocation(program,'u_stacked');
  let beforeTex,afterTex;
  const field=new Float32Array(4*N*N);
  function encodeField(a,b){
    for(let j=0;j<N;j++)for(let i=0;i<N;i++){
      const k=cell(i,j)*4;
      field[k]=(a[ui(i,j)]+a[ui(i+1,j)])/2;
      field[k+1]=(b[vi(i,j)]+b[vi(i,j+1)])/2;
      field[k+2]=divergence(a,b,i,j);
      field[k+3]=p[cell(i,j)];
    }
    return field;
  }
  function makeField(unit,values){
    const tex=gl.createTexture();if(!tex)throw Error('field texture allocation');
    gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tex);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA32F,N,N,0,gl.RGBA,gl.FLOAT,values);
    return tex;
  }
  const compact=window.matchMedia('(max-width: 560px)');
  function redraw(){
    if(!visible)return;
    projectVelocity();
    let maxResidual=0,maxDivergence=0,identity=0;
    for(let j=0;j<N;j++)for(let i=0;i<N;i++){
      const k=cell(i,j),[sum,n]=neighbours(p,i,j);
      const residual=(sum-n*p[k])/(h*h)-rhs[k];
      const div=divergence(u,v,i,j);
      maxResidual=Math.max(maxResidual,Math.abs(residual));
      maxDivergence=Math.max(maxDivergence,Math.abs(div));
      identity=Math.max(identity,Math.abs(div+dt/rho*residual));
    }
    gl.activeTexture(gl.TEXTURE0+4);gl.bindTexture(gl.TEXTURE_2D,afterTex);
    gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,N,N,gl.RGBA,gl.FLOAT,encodeField(u,v));
    gl.useProgram(program);gl.bindVertexArray(vao);
    gl.uniform1i(observation,1);
    gl.uniform1i(stacked,compact.matches?1:0);
    gl.uniform1f(displayScale,Math.max(divBefore,1e-8));
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.drawArrays(gl.TRIANGLES,0,3);
    canvas.dispatchEvent(new CustomEvent('fcg4-progress',{detail:{
      iter,maxIterations,N,playing,before:divBefore,after:maxDivergence,residual:maxResidual,identity
    }}));
  }
  function resetPressure(){p.fill(0);next.fill(0);iter=0;}
  function seek(target){
    if(!Number.isInteger(target)||target<0||target>maxIterations)return;
    playing=false;last=0;
    if(target<iter)resetPressure();
    while(iter<target){jacobiIteration();iter++;}
    redraw();
  }
  function play(){
    if(iter===maxIterations)resetPressure();
    playing=true;last=0;redraw();
  }
  function pause(){playing=false;last=0;redraw();}
  function step(){seek(Math.min(maxIterations,iter+1));}
  function reset(){seek(0);}
  function frame(now){
    if(playing&&!document.hidden){
      if(!last)last=now;
      if(now-last>=100){
        last=now;
        for(let k=0;k<Math.max(1,Math.round(maxIterations/54))&&iter<maxIterations;k++){jacobiIteration();iter++;}
        if(iter===maxIterations)playing=false;
        redraw();
      }
    }else last=0;
    raf=requestAnimationFrame(frame);
  }
  function showObservation(){
    if(visible)return;
    beforeTex=makeField(3,encodeField(uStar,vStar));
    afterTex=makeField(4,encodeField(u,v));
    gl.useProgram(program);
    gl.uniform1i(fieldBefore,3);gl.uniform1i(fieldAfter,4);
    visible=true;
    canvas.tabIndex=0;
    canvas.setAttribute('aria-label','予測速度、圧力、射影後速度。Spaceで再生停止、右矢印で一反復、Rで初期化');
    canvas.addEventListener('keydown',e=>{
      if(e.key===' '||e.key==='Enter'){e.preventDefault();playing?pause():play();}
      else if(e.key==='ArrowRight'){e.preventDefault();step();}
      else if(e.key==='r'||e.key==='R'){e.preventDefault();reset();}
    });
    motion.addEventListener('change',e=>{if(e.matches)pause();});
    compact.addEventListener('change',redraw);
    window.addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
    resetPressure();playing=!motion.matches;redraw();
    raf=requestAnimationFrame(frame);
  }
  return {showObservation,play,pause,step,reset,seek};
}
