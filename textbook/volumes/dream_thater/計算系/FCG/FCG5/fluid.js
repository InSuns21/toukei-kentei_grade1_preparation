// FCG5 learner-editable 2D incompressible toy solver (Float64 CPU + R8 GPU).
// 12x12 MAC mesh, fixed zero normal walls; tangential ghost values are copied.
// This is a visualization model, not a validated CFD prediction.
const N=12,h=1/N,dt=0.04,rho=1,nu=0.002,forceAmplitude=0.08;
const steps=settings.steps;
if(!Number.isInteger(steps)||steps<0||steps>32)throw new RangeError('physical steps 0..32');
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
let divBefore=0,divAfter=0,poissonMax=0,identityError=0;
for(let t=0;t<steps;t++){
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
  p=new Float64Array(N*N);let next=new Float64Array(N*N);
  const omega=2/3;
  for(let it=0;it<120;it++){
    let mean=0;
    for(let j=0;j<N;j++)for(let i=0;i<N;i++){
      let sum=0,m=0;
      if(i>0){sum+=p[ci(i-1,j)];m++;}
      if(i<N-1){sum+=p[ci(i+1,j)];m++;}
      if(j>0){sum+=p[ci(i,j-1)];m++;}
      if(j<N-1){sum+=p[ci(i,j+1)];m++;}
      const k=ci(i,j);
      next[k]=(1-omega)*p[k]+omega*(sum-h*h*rhs[k])/m;
      mean+=next[k];
    }
    mean/=N*N;
    for(let k=0;k<N*N;k++)next[k]-=mean;
    [p,next]=[next,p];
  }
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
report('SPLIT','backtrace + explicit viscosity nu='+nu+' + curl force='+forceAmplitude+' + Jacobi 120 + dye');
report('DIVERGENCE','before='+divBefore.toExponential(5)+', after='+maxDiv.toExponential(5)+' s^-1');
report('POISSON','max residual='+poissonMax.toExponential(5)+' Pa/m^2'+(poissonMax>0.02?' / 未収束注意':''));
report('IDENTITY','max |div+dt/rho*residual|='+identityError.toExponential(3));
report('BOUNDARY','max wall-normal='+maxWall.toExponential(3)+' m/s (tangential free-slip approximation)');
report('DYE','integral='+mass.toPrecision(8)+', peak='+peak.toPrecision(7)+' (semi-Lagrange not conservative)');
report('ENERGY','cell-centred 0.5*integral speed^2='+kinetic.toPrecision(8)+' m^4/s^2');
report('DISPLAY','left=dye, middle=80*abs(div), right=speed/0.4; R8 only for display');
