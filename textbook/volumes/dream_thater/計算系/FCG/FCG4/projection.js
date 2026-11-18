// FCG4: MAC pressure projection, fixed no-flux walls; learner-editable JS.
// Physical numbers use Float64; WebGL2 renders three independent R8 snapshots.
const N=8,h=1/N,rho=1,dt=0.1,relax=2/3,iterations=settings.steps;
if(!Number.isInteger(iterations)||iterations<0||iterations>160)
  throw new RangeError('Poisson iterations must be 0..160');
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
for(let k=0;k<iterations;k++){
  let mean=0;
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const id=cell(i,j),[sum,count]=neighbours(p,i,j);
    next[id]=(1-relax)*p[id]+relax*(sum-h*h*rhs[id])/count;
    mean+=next[id]/(N*N);
  }
  for(let n=0;n<N*N;n++)next[n]-=mean;
  [p,next]=[next,p];
}
const u=new Float64Array(uStar),v=new Float64Array(vStar);
for(let j=0;j<N;j++)for(let i=1;i<N;i++)
  u[ui(i,j)]-=dt/rho*(p[cell(i,j)]-p[cell(i-1,j)])/h;
for(let j=1;j<N;j++)for(let i=0;i<N;i++)
  v[vi(i,j)]-=dt/rho*(p[cell(i,j)]-p[cell(i,j-1)])/h;
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
report('ITER','relaxed Jacobi '+iterations+'/160, omega='+relax+', physical dt='+dt+' s (not animation fps)');
report('POISSON','max |L p-b|='+poissMax.toPrecision(8)+' Pa/m^2'+
 (poissMax>0.02?' / 未収束の可能性あり':' / chosen threshold 0.02以下'));
report('DIV','max |div initial|='+divBefore.toPrecision(8)+
 ', |div projected|='+divAfter.toPrecision(8)+' s^-1');
report('IDENTITY','max |div + dt/rho*residual|='+residualIdentityError.toExponential(3));
report('BOUNDARY','max wall normal |u|='+wallMax.toExponential(3)+' m/s, sum rhs='+compatibility.toExponential(3));
report('MANUFACTURED','max |p-phi|='+manufacturedError.toPrecision(8)+
 ' Pa, mean p='+(meanPressure/(N*N)).toExponential(3));
report('DISPLAY','left pressure (0.5+0.35p), middle abs(div)/20, right cell speed/0.25; R8 quantized');
