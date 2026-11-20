// FCG8 editable simulation: 1m square, divergence-free horizontal shear.
// This solves a prescribed advection test, NOT a Navier-Stokes/free-boundary solver.
const N=48,h=1/N,dt=0.04,steps=settings.steps,shear=0.6,radius=0.18;
const maxSteps=96; // finite 1m window; late-time contours may reach its boundary
const redistanceIterations=6,redistanceCFL=0.30,particlesCount=64;
if(!Number.isInteger(steps)||steps<0||steps>maxSteps)throw RangeError('steps must be 0..96');
const id=(i,j)=>i+N*j, clamp=(a,l,r)=>Math.max(l,Math.min(r,a));
const field0=new Float64Array(N*N);
for(let j=0;j<N;j++)for(let i=0;i<N;i++){
  const x=(i+0.5)*h-0.5,y=(j+0.5)*h-0.5;
  field0[id(i,j)]=Math.hypot(x,y)-radius;
}
function bilinear(field,x,y){
  // Node values reside at cell centers. Constant extension at the box boundary.
  const X=clamp(x/h-0.5,0,N-1),Y=clamp(y/h-0.5,0,N-1);
  const i=Math.floor(X),j=Math.floor(Y),a=X-i,b=Y-j;
  const i1=Math.min(N-1,i+1),j1=Math.min(N-1,j+1);
  return (1-b)*((1-a)*field[id(i,j)]+a*field[id(i1,j)])+
    b*((1-a)*field[id(i,j1)]+a*field[id(i1,j1)]);
}
function advect(phi){
  const next=new Float64Array(phi.length);
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const x=(i+0.5)*h,y=(j+0.5)*h;
    next[id(i,j)]=bilinear(phi,x-dt*shear*(y-0.5),y);
  }
  return next;
}
function redistance(phi,iterations){
  // Frozen regularized sign, Godunov one-sided |grad phi|; pseudo-time Euler.
  const origin=phi.slice(),pseudoDt=redistanceCFL*h;
  let q=phi.slice();
  for(let iter=0;iter<iterations;iter++){
    const next=q.slice();
    for(let j=1;j<N-1;j++)for(let i=1;i<N-1;i++){
      const k=id(i,j),s=origin[k]/Math.hypot(origin[k],h);
      const xm=(q[k]-q[id(i-1,j)])/h,xp=(q[id(i+1,j)]-q[k])/h;
      const ym=(q[k]-q[id(i,j-1)])/h,yp=(q[id(i,j+1)]-q[k])/h;
      const a=s>=0 ? Math.max(Math.max(xm,0)**2,Math.min(xp,0)**2) :
                       Math.max(Math.min(xm,0)**2,Math.max(xp,0)**2);
      const b=s>=0 ? Math.max(Math.max(ym,0)**2,Math.min(yp,0)**2) :
                       Math.max(Math.min(ym,0)**2,Math.max(yp,0)**2);
      next[k]=q[k]-pseudoDt*s*(Math.sqrt(a+b)-1);
    }
    q=next;
  }
  return q;
}
let raw=field0.slice(),reinit=field0.slice();
let particles=Array.from({length:particlesCount},(_,k)=>{
  const a=2*Math.PI*k/particlesCount;
  return [0.5+radius*Math.cos(a),0.5+radius*Math.sin(a)];
});
let currentStep=0;
function advanceOne(){
  raw=advect(raw);
  reinit=redistance(advect(reinit),redistanceIterations);
  particles=particles.map(([x,y])=>[x+dt*shear*(y-0.5),y]);
  currentStep++;
}
for(let t=0;t<steps;t++)advanceOne();
function metrics(phi){
  let area=0,grad=0,samples=0,max=0;
  for(let j=1;j<N-1;j++)for(let i=1;i<N-1;i++){
    const k=id(i,j);
    if(phi[k]<0)area+=h*h;
    if(Math.abs(phi[k])<3*h){
      const gx=(phi[id(i+1,j)]-phi[id(i-1,j)])/(2*h);
      const gy=(phi[id(i,j+1)]-phi[id(i,j-1)])/(2*h);
      const err=Math.abs(Math.hypot(gx,gy)-1);
      grad+=err;max=Math.max(max,err);samples++;
    }
  }
  return {area,meanGradientError:samples?grad/samples:NaN,maxGradientError:max,samples};
}
const ma=metrics(raw),mb=metrics(reinit),exactArea=Math.PI*radius*radius;
for(const v of [...raw,...reinit,...particles.flat()])if(!Number.isFinite(v))throw Error('nonfinite level-set state');
const encode=v=>Math.round(255*clamp(0.5+2*v,0,1));
function texture(field,unit){
  const tex=gl.createTexture();if(!tex)throw Error('texture allocation failed');
  gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.R8,N,N,0,gl.RED,gl.UNSIGNED_BYTE,
    Uint8Array.from(field,encode));
  return tex;
}
const rawTexture=texture(raw,0),reinitTexture=texture(reinit,1);
function compile(type,source){
  const shader=gl.createShader(type);if(!shader)throw Error('shader allocation failed');
  gl.shaderSource(shader,source);gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))
    throw Error(gl.getShaderInfoLog(shader)||'shader compilation failed');
  return shader;
}
const vs=compile(gl.VERTEX_SHADER,vertexSource),fs=compile(gl.FRAGMENT_SHADER,fragmentSource);
const program=gl.createProgram();if(!program)throw Error('program allocation failed');
gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))
  throw Error(gl.getProgramInfoLog(program)||'program link failed');
gl.deleteShader(vs);gl.deleteShader(fs);gl.useProgram(program);
const loc=n=>{const l=gl.getUniformLocation(program,n);if(l===null)throw Error('missing uniform '+n);return l;};
gl.uniform1i(loc('u_raw'),0);gl.uniform1i(loc('u_reinit'),1);
const timeLocation=loc('u_time'),particleLocation=loc('u_particles[0]');
gl.uniform1f(timeLocation,steps*dt);
gl.uniform1f(loc('u_shear'),shear);
gl.uniform2fv(particleLocation,new Float32Array(particles.flat()));
const vao=gl.createVertexArray();if(!vao)throw Error('VAO allocation');
gl.bindVertexArray(vao);
gl.disable(gl.DITHER);gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);
gl.disable(gl.SCISSOR_TEST);gl.viewport(0,0,canvas.width,canvas.height);
gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES,0,3);
report('MODEL','prescribed shear u=(0.6(y-0.5),0) m/s, div u=0; not Navier-Stokes');
report('TIME','step='+steps+', physical t='+(steps*dt).toFixed(2)+'s; 48x48 cell centers');
report('AREA','exact='+exactArea.toFixed(8)+'m2; raw='+ma.area.toFixed(8)+
  'm2 ('+((ma.area/exactArea-1)*100).toFixed(3)+'%); redistanced='+mb.area.toFixed(8)+
  'm2 ('+((mb.area/exactArea-1)*100).toFixed(3)+'%)');
report('DISTANCE','mean ||grad(phi)|-1| in |phi|<3h: raw='+ma.meanGradientError.toPrecision(6)+
  ', redistanced='+mb.meanGradientError.toPrecision(6)+
  ' (central differences, not a proof of signed-distance correctness)');
report('PARTICLES','64 contour markers follow exact shear characteristics; markers do not conserve level-set area');
report('DISPLAY','left: advected phi, middle: six pseudo-time redistance iterations per step, right: exact contour/particles');
report('LIMIT','cell-count area is a proxy, not an exact mass or volume; reinitialization does not guarantee conservation');

// These controls operate the SAME editable solver and shader, not an observer clone.
// Initial readPixels is performed by the sandbox host before it sends any control
// command. Live frames are intentionally not compared with the initial CPU oracle.
let playing=false,frameRequest=0,lastFrame=0,accumulator=0;
const animationStepMs=75; // about 13 physical steps/s; 96 steps ≈ 7 seconds
const initialParticles=()=>Array.from({length:particlesCount},(_,k)=>{
  const a=2*Math.PI*k/particlesCount;
  return [0.5+radius*Math.cos(a),0.5+radius*Math.sin(a)];
});
function progress(){
  canvas.dispatchEvent(new CustomEvent('fcg8-progress',{
    detail:{steps:currentStep,playing,time:currentStep*dt,maxSteps}
  }));
}
function liveDraw(){
  for(const [unit,tex,field] of [[0,rawTexture,raw],[1,reinitTexture,reinit]]){
    gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tex);
    gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,N,N,gl.RED,gl.UNSIGNED_BYTE,
      Uint8Array.from(field,encode));
  }
  gl.useProgram(program);
  gl.uniform1f(timeLocation,currentStep*dt);
  gl.uniform2fv(particleLocation,new Float32Array(particles.flat()));
  gl.viewport(0,0,canvas.width,canvas.height);
  gl.drawArrays(gl.TRIANGLES,0,3);
}
function pauseLive(){
  playing=false;
  if(frameRequest)cancelAnimationFrame(frameRequest);
  frameRequest=0;lastFrame=0;accumulator=0;progress();
}
function stepLive(){
  pauseLive();
  if(currentStep<maxSteps){advanceOne();liveDraw();}
  progress();
}
function resetLive(){
  pauseLive();
  raw=field0.slice();reinit=field0.slice();particles=initialParticles();currentStep=0;
  liveDraw();progress();
}
function liveFrame(now){
  frameRequest=0;
  if(!playing)return;
  if(document.hidden){lastFrame=now;frameRequest=requestAnimationFrame(liveFrame);return;}
  if(lastFrame)accumulator+=Math.min(120,Math.max(0,now-lastFrame));
  lastFrame=now;
  const count=Math.min(2,Math.floor(accumulator/animationStepMs));
  if(count){
    for(let k=0;k<count&&currentStep<maxSteps;k++)advanceOne();
    accumulator-=count*animationStepMs;
    liveDraw();progress();
  }
  if(currentStep>=maxSteps){pauseLive();return;}
  frameRequest=requestAnimationFrame(liveFrame);
}
function playLive(){
  if(currentStep>=maxSteps)resetLive();
  if(playing)return;
  playing=true;lastFrame=0;accumulator=0;progress();
  frameRequest=requestAnimationFrame(liveFrame);
}
// Keeping these hooks inside the opaque-origin runner makes student code edits
// affect the playing result directly, without re-creating an iframe every step.
return {play:playLive,pause:pauseLive,step:stepLive,reset:resetLive};
