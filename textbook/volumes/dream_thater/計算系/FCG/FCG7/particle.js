// FCG7: dense dyed vortex, periodic 1 m square. Pure transfer experiment.
const N=24, count=2304, dt=0.08, steps=settings.steps;
const damp=1, force=0, picMix=0;
const flipMix=1;
const noise=0.18;
if(!Number.isFinite(flipMix)||flipMix<0||flipMix>1||!Number.isFinite(noise)||noise<0||noise>0.3)throw new RangeError('mix 0..1; noise 0..0.3 m/s');
if(!Number.isInteger(steps)||steps<0||steps>24)throw new RangeError('steps must be 0..24');
const wrap=x=>x-Math.floor(x), idx=(i,j)=>(i+N)%N+N*((j+N)%N);
const weights=(x,y)=>{
  const X=N*wrap(x),Y=N*wrap(y),i=Math.floor(X),j=Math.floor(Y),a=X-i,b=Y-j;
  return [[idx(i,j),(1-a)*(1-b)],[idx(i+1,j),a*(1-b)],
    [idx(i,j+1),(1-a)*b],[idx(i+1,j+1),a*b]];
};
function initial(){
  const p=[];
  for(let j=0;j<48;j++)for(let i=0;i<48;i++){
    const radius=0.36*Math.sqrt((j+0.5)/48);
    const angle=2*Math.PI*(i+0.5*(j%2))/48;
    const x=0.5+radius*Math.cos(angle),y=0.5+radius*Math.sin(angle);
    const sign=(i+j)%2?1:-1;
    // Four passive dye bands; the alternating velocity is smaller than a grid cell in wavelength.
    const dye=1+Math.floor(((i+3*Math.floor(j/8))%48)/12);
    p.push({x,y,vx:-0.65*(y-0.5)+noise*sign,vy:0.65*(x-0.5)-noise*sign,dye});
  }
  return p;
}
function p2g(particles){
  const mass=new Float64Array(N*N),gx=new Float64Array(N*N),gy=new Float64Array(N*N);
  for(const p of particles)for(const [i,w] of weights(p.x,p.y)){
    mass[i]+=w;gx[i]+=w*p.vx;gy[i]+=w*p.vy;
  }
  for(let i=0;i<N*N;i++)if(mass[i]>0){gx[i]/=mass[i];gy[i]/=mass[i];}
  return {mass,gx,gy};
}
function transfer(particles,blend){
  const grid=p2g(particles);
  const nextX=grid.gx.slice(),nextY=grid.gy.slice();
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const k=idx(i,j);
    if(grid.mass[k]>0){
      nextX[k]=damp*grid.gx[k]+dt*force*Math.sin(2*Math.PI*(j+0.5)/N);
      nextY[k]=damp*grid.gy[k]-dt*force*Math.cos(2*Math.PI*(i+0.5)/N);
    }
  }
  let crossings=0;
  const out=particles.map(p=>{
    let picX=0,picY=0,dvX=0,dvY=0;
    for(const [i,w] of weights(p.x,p.y)){
      picX+=w*nextX[i];picY+=w*nextY[i];
      dvX+=w*(nextX[i]-grid.gx[i]);dvY+=w*(nextY[i]-grid.gy[i]);
    }
    const vx=(1-blend)*picX+blend*(p.vx+dvX);
    const vy=(1-blend)*picY+blend*(p.vy+dvY);
    const rawX=p.x+dt*vx,rawY=p.y+dt*vy;
    if(rawX<0||rawX>=1||rawY<0||rawY>=1)crossings++;
    return {x:wrap(rawX),y:wrap(rawY),vx,vy,dye:p.dye};
  });
  return {out,crossings};
}
let pic=initial(),flip=initial(),picCrossings=0,flipCrossings=0,stepIndex=0;
const energy=p=>p.reduce((s,q)=>s+(q.vx*q.vx+q.vy*q.vy)/2,0);
const momentum=p=>p.reduce((s,q)=>[s[0]+q.vx,s[1]+q.vy],[0,0]);
const initialEnergy=energy(pic);
function advance(){
  const a=transfer(pic,picMix),b=transfer(flip,flipMix);
  pic=a.out;flip=b.out;picCrossings+=a.crossings;flipCrossings+=b.crossings;stepIndex++;
}
for(let t=0;t<steps;t++)advance();
const encode=v=>Math.round(255*Math.min(1,Math.max(0,v)));
const displaySize=256; // Raster marks only, not the velocity grid.
function dyeRaster(particles){
  const raster=new Uint8Array(displaySize*displaySize);
  for(const p of particles){
    const x=Math.floor(p.x*displaySize),y=Math.floor(p.y*displaySize);
    for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++){
      const k=(x+i+displaySize)%displaySize+displaySize*((y+j+displaySize)%displaySize);
      raster[k]=Math.max(raster[k],p.dye);
    }
  }
  return raster;
}
function texture(unit){
  const t=gl.createTexture();if(!t)throw Error('texture allocation');
  gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,t);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  return t;
}
const textures=[texture(0),texture(1),texture(2)];
function upload(unit,n,bytes){
  gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,textures[unit]);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.R8,n,n,0,gl.RED,gl.UNSIGNED_BYTE,bytes);
}
function compile(type,src){
  const s=gl.createShader(type);if(!s)throw Error('shader allocation');
  gl.shaderSource(s,src);gl.compileShader(s);
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s)||'compile failed');
  return s;
}
const vs=compile(gl.VERTEX_SHADER,vertexSource),fs=compile(gl.FRAGMENT_SHADER,fragmentSource);
const program=gl.createProgram();if(!program)throw Error('program allocation');
gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program)||'link failed');
gl.deleteShader(vs);gl.deleteShader(fs);gl.useProgram(program);
for(const [i,name] of ['u_pic','u_flip','u_speed'].entries()){
  const loc=gl.getUniformLocation(program,name);
  if(loc===null)throw Error('missing '+name);
  gl.uniform1i(loc,i);
}
const vao=gl.createVertexArray();if(!vao)throw Error('VAO allocation');
gl.bindVertexArray(vao);
gl.disable(gl.DITHER);gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);gl.disable(gl.SCISSOR_TEST);
let timer=null;
function snapshot(){
  return {steps:stepIndex,time:stepIndex*dt,playing:timer!==null,initialEnergy,
    energyPic:energy(pic),energyFlip:energy(flip),flipMix,noise,
    picCrossings,flipCrossings};
}
function render(){
  if([...pic,...flip].some(p=>![p.x,p.y,p.vx,p.vy].every(Number.isFinite)))throw Error('nonfinite particle state');
  const grid=p2g(pic);
  upload(0,displaySize,dyeRaster(pic));upload(1,displaySize,dyeRaster(flip));
  upload(2,N,Uint8Array.from({length:N*N},(_,k)=>encode(Math.hypot(grid.gx[k],grid.gy[k])/0.7)));
  gl.viewport(0,0,canvas.width,canvas.height);
  gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,3);
}
function notify(){canvas.dispatchEvent(new CustomEvent('fcg7-progress',{detail:snapshot()}));}
function pause(){if(timer!==null)clearInterval(timer);timer=null;notify();}
function step(){
  pause();if(stepIndex<24){advance();render();}notify();
}
function reset(){
  pause();pic=initial();flip=initial();picCrossings=flipCrossings=stepIndex=0;render();notify();
}
function play(){
  if(timer!==null)return;
  if(stepIndex>=24)reset();
  timer=setInterval(()=>{
    try{
      if(stepIndex>=24){pause();return;}
      advance();render();
      if(stepIndex>=24)pause();else notify();
    }catch(error){pause();canvas.dispatchEvent(new CustomEvent('fcg7-error',{detail:String(error.message||error)}));}
  },160);
  notify();
}
canvas.addEventListener('webglcontextlost',pause);
render();
const grid=p2g(pic),constant=initial().map(p=>({...p,vx:0.2,vy:-0.1})),cg=p2g(constant);
let constantError=0;
for(const p of constant){
  let x=0,y=0;
  for(const [i,w] of weights(p.x,p.y)){x+=w*cg.gx[i];y+=w*cg.gy[i];}
  constantError=Math.max(constantError,Math.abs(x-0.2),Math.abs(y+0.1));
}
report('SIM','step='+steps+' physical time='+(steps*dt).toFixed(3)+'s, dt='+dt+'s');
report('PARAM','PIC mix='+picMix+', FLIP mix='+flipMix+', grid damping='+damp+', kick='+force+', noise='+noise);
report('PARTICLES',count+' equal-mass particles per cohort; periodic 1m square');
report('TRANSFER','sum grid nodal masses='+grid.mass.reduce((a,b)=>a+b,0).toPrecision(12)+', constant velocity reproduction error='+constantError.toExponential(2));
report('ENERGY','PIC='+energy(pic).toPrecision(9)+', FLIP='+energy(flip).toPrecision(9));
report('MOMENTUM','PIC='+momentum(pic).map(x=>x.toPrecision(6))+'; FLIP='+momentum(flip).map(x=>x.toPrecision(6)));
report('DISPLAY','same four passive dye bands in both cohorts; right PIC nodal speed / 0.7');
return {play,pause,step,reset,snapshot,inspect:()=>({pic,flip,grid:p2g(pic)})};
