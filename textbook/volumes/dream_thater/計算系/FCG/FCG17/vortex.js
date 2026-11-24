// FCG17: two copies of the FCG5 MAC split step, differing only in confinement.
const N=24;
const epsilon=12;
const mode=0;
const h=1/N,dt=.05,rho=1,nu=.0005;
if(![16,24,32].includes(N)||!Number.isFinite(epsilon)||epsilon<0||epsilon>24||![0,1,2].includes(mode))throw RangeError('FCG17 parameter range');
function createModel(strength){
const ci=(i,j)=>i+N*j,ui=(i,j)=>i+(N+1)*j,vi=(i,j)=>i+N*j;
const clip=(a,lo,hi)=>Math.max(lo,Math.min(hi,a));
const psi=(i,j,A)=>A*Math.sin(2*Math.PI*i/N)*Math.sin(Math.PI*j/N);
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
  dye[ci(i,j)]=Math.min(1,Math.exp(-((x-.50)**2)/(.055**2))*Math.exp(-((y-.48)**2)/(.33**2))+.32*Math.exp(-((x-.22)**2+(y-.25)**2)/(.07**2)));
}
for(let j=0;j<N;j++)for(let i=1;i<N;i++)
  u[ui(i,j)]=(psi(i,j+1,0.065)-psi(i,j,0.065))/h;
for(let j=1;j<N;j++)for(let i=0;i<N;i++)
  v[vi(i,j)]=-(psi(i+1,j,0.065)-psi(i,j,0.065))/h;
// A discrete curl starts divergence-free. Advection and viscosity will not
// generally preserve that property: pressure correction is still required.
let p=new Float64Array(N*N),rhs=new Float64Array(N*N);
let divBefore=0,divAfter=0,poissonMax=0,identityError=0,pressureIterations=0;
const q=(a,i,j)=>a[ci(clip(i,0,N-1),clip(j,0,N-1))];
function fields(U,V){
 const X=new Float64Array(N*N),Y=new Float64Array(N*N),W=new Float64Array(N*N);
 for(let j=0;j<N;j++)for(let i=0;i<N;i++){
  const k=ci(i,j);X[k]=(U[ui(i,j)]+U[ui(i+1,j)])/2;
  Y[k]=(V[vi(i,j)]+V[vi(i,j+1)])/2;
 }
 for(let j=0;j<N;j++)for(let i=0;i<N;i++)
  W[ci(i,j)]=(q(Y,i+1,j)-q(Y,i-1,j)-q(X,i,j+1)+q(X,i,j-1))/(2*h);
 return {X,Y,W};
}
function energy(U,V){
 let sum=0;for(const x of U)sum+=x*x;for(const y of V)sum+=y*y;
 return .5*h*h*sum;
}
let kick=0,workError=0;
function confine(U,V){
 const {W}=fields(U,V),fx=new Float64Array(N*N),fy=new Float64Array(N*N);
 for(let j=0;j<N;j++)for(let i=0;i<N;i++){
  const k=ci(i,j),gx=(Math.abs(q(W,i+1,j))-Math.abs(q(W,i-1,j)))/(2*h),
   gy=(Math.abs(q(W,i,j+1))-Math.abs(q(W,i,j-1)))/(2*h),norm=Math.hypot(gx,gy);
  if(norm>1e-10){fx[k]=strength*h*W[k]*gy/norm;fy[k]=-strength*h*W[k]*gx/norm;}
 }
 const before=energy(U,V);let predicted=0;
 function apply(a,k,f){predicted+=h*h*(dt*a[k]*f+.5*dt*dt*f*f);a[k]+=dt*f;}
 for(let j=0;j<N;j++)for(let i=1;i<N;i++)apply(U,ui(i,j),.5*(fx[ci(i-1,j)]+fx[ci(i,j)]));
 for(let j=1;j<N;j++)for(let i=0;i<N;i++)apply(V,vi(i,j),.5*(fy[ci(i,j-1)]+fy[ci(i,j)]));
 kick=energy(U,V)-before;workError=Math.abs(kick-predicted);
 if(workError>1e-10)throw Error('confinement energy identity');
}
function advanceFluidStep(){
  const starU=new Float64Array(u.length),starV=new Float64Array(v.length);
  const r=dt*nu/(h*h);
  for(let j=0;j<N;j++)for(let i=1;i<N;i++){
    const x=i*h,y=(j+0.5)*h,old=u[ui(i,j)];
    const vx=sample(u,N+1,N,0,0.5,x,y),vy=sample(v,N,N+1,0.5,0,x,y);
    const lap=u[ui(i-1,j)]+u[ui(i+1,j)]+
      u[ui(i,Math.max(0,j-1))]+u[ui(i,Math.min(N-1,j+1))]-4*old;
    const f=0;
    starU[ui(i,j)]=sample(u,N+1,N,0,0.5,x-dt*vx,y-dt*vy)+r*lap+dt*f;
  }
  for(let j=1;j<N;j++)for(let i=0;i<N;i++){
    const x=(i+0.5)*h,y=j*h,old=v[vi(i,j)];
    const vx=sample(u,N+1,N,0,0.5,x,y),vy=sample(v,N,N+1,0.5,0,x,y);
    const lap=v[vi(Math.max(0,i-1),j)]+v[vi(Math.min(N-1,i+1),j)]+
      v[vi(i,j-1)]+v[vi(i,j+1)]-4*old;
    const f=0;
    starV[vi(i,j)]=sample(v,N,N+1,0.5,0,x-dt*vx,y-dt*vy)+r*lap+dt*f;
  }
  confine(starU,starV);
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

return {advance:advanceFluidStep,snapshot:()=>({...fields(u,v),dye,energy:energy(u,v),kick,workError,divAfter,identityError,wall:Math.max(...Array.from({length:N},(_,j)=>Math.max(Math.abs(u[ui(0,j)]),Math.abs(u[ui(N,j)]),Math.abs(v[vi(j,0)]),Math.abs(v[vi(j,N)]))))})};
}
let states,history,frame=0,playing=false,timer=null;
function initialize(){states=[createModel(0),createModel(epsilon)];frame=0;history=[states.map(s=>s.snapshot().energy)];}
function advance(){
 for(const state of states)state.advance();
 frame++;const snapshots=states.map(s=>s.snapshot());
 for(const q of snapshots)if(!Number.isFinite(q.energy)||q.energy>10||q.divAfter>1e-5||q.wall!==0||q.workError>1e-10)throw Error('invalid flow state');
 history.push(snapshots.map(s=>s.energy));
}
initialize();
// GPU DISPLAY
function compile(type,source){
 const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);
 if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;
}
const vs=compile(gl.VERTEX_SHADER,vertexSource),fs=compile(gl.FRAGMENT_SHADER,fragmentSource);
const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
gl.deleteShader(vs);gl.deleteShader(fs);gl.useProgram(program);
gl.bindVertexArray(gl.createVertexArray());gl.disable(gl.DITHER);gl.disable(gl.BLEND);
gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
const uniform=name=>gl.getUniformLocation(program,name);
function texture(unit,w,height){
 const tex=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tex);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 gl.texStorage2D(gl.TEXTURE_2D,1,gl.RGBA8,w,height);return tex;
}
const flow=texture(0,2*N,N),chart=texture(1,81,1);
gl.uniform1i(uniform('u_flow'),0);gl.uniform1i(uniform('u_chart'),1);gl.uniform1i(uniform('u_mode'),mode);
const data=new Uint8Array(8*N*N),graph=new Uint8Array(4*81);
const byte=x=>Math.round(255*Math.max(0,Math.min(1,x)));
const metrics=document.createElement('p');
metrics.setAttribute('aria-label','運動エネルギーと追加力の仕事');canvas.after(metrics);
function draw(){
 const snapshots=states.map(s=>s.snapshot());
 for(let side=0;side<2;side++)for(let j=0;j<N;j++)for(let i=0;i<N;i++){
  const q=snapshots[side],k=i+N*j,d=4*(i+side*N+2*N*j);
  data.set([byte(q.dye[k]),byte(.5+q.W[k]/20),byte(Math.hypot(q.X[k],q.Y[k])),255],d);
 }
 graph.fill(0);for(let i=0;i<history.length;i++)graph.set([byte(history[i][0]/.5),byte(history[i][1]/.5),0,255],4*i);
 gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,flow);gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,2*N,N,gl.RGBA,gl.UNSIGNED_BYTE,data);
 gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,chart);gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,81,1,gl.RGBA,gl.UNSIGNED_BYTE,graph);
 gl.viewport(0,0,canvas.width,canvas.height);gl.drawArrays(gl.TRIANGLES,0,3);
 if(gl.getError()!==gl.NO_ERROR)throw Error('WebGL confinement draw failed');
 metrics.textContent='E（左／右） '+snapshots.map(s=>s.energy.toFixed(5)).join(' / ')+' m⁴/s²；右の追加力によるΔE '+snapshots[1].kick.toExponential(3)+'；右の最大発散 '+snapshots[1].divAfter.toExponential(2)+' s⁻¹'+(snapshots.some(s=>s.energy>.5)?'（グラフ上限0.5超過）':'');
}
function emit(){canvas.dispatchEvent(new CustomEvent('fcg-time-progress',{detail:{value:frame*dt,playing}}));}
function pause(){playing=false;if(timer!==null)clearTimeout(timer);timer=null;emit();}
function step(){pause();if(frame<80){advance();draw();}emit();}
function reset(){pause();initialize();draw();emit();}
function play(){
 if(playing)return;if(frame===80){initialize();draw();}
 playing=true;emit();
 function tick(){if(!playing)return;try{if(!document.hidden){advance();draw();if(frame===80){pause();return;}emit();}timer=setTimeout(tick,100);}
 catch(e){pause();canvas.dispatchEvent(new CustomEvent('fcg-time-failure',{detail:String(e)}));}}
 timer=setTimeout(tick,100);
}
draw();
report('MODEL','左：強調なし、右：渦度強調。下：両者の運動エネルギー履歴（白／橙の点線）');
report('GRID',N+'×'+N+' cells; dt='+dt+' s; CPU Float64, RGBA8 display');
report('ENERGY','initial='+history[0][0]+' m^4/s^2');
canvas.tabIndex=0;canvas.setAttribute('aria-label','左：強調なし、右：強調あり。下は運動エネルギー。Spaceで再生・停止');
canvas.addEventListener('keydown',e=>{if(e.key===' '){e.preventDefault();playing?pause():play();}});
canvas.addEventListener('webglcontextlost',pause);
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{if(e.matches)pause();});
window.addEventListener('pagehide',pause,{once:true});
return {play,pause,step,reset};
