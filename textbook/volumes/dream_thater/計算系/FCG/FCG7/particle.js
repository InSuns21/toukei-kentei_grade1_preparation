// FCG7: two particle populations, periodic [0,1)^2, 8x8 nodal velocity grid.
// This isolates PIC/FLIP transfers. No pressure solve or free-surface force.
const N=8, count=16, dt=0.08, steps=settings.steps;
const damp=0.995, force=0.08, picMix=0, flipMix=1;
if(!Number.isInteger(steps)||steps<0||steps>24)throw new RangeError('steps must be 0..24');
const wrap=x=>x-Math.floor(x), idx=(i,j)=>(i+N)%N+N*((j+N)%N);
const weights=(x,y)=>{
  const X=N*wrap(x),Y=N*wrap(y),i=Math.floor(X),j=Math.floor(Y),a=X-i,b=Y-j;
  return [[idx(i,j),(1-a)*(1-b)],[idx(i+1,j),a*(1-b)],
    [idx(i,j+1),(1-a)*b],[idx(i+1,j+1),a*b]];
};
function initial(){
  const p=[];
  for(let j=0;j<4;j++)for(let i=0;i<4;i++){
    const x=0.24+0.24*i,y=0.16+0.24*j;
    const checker=(i+j)%2?1:-1;
    p.push({x,y,vx:0.35+0.06*Math.sin(2*Math.PI*y)+0.13*checker,
      vy:0.06*Math.cos(2*Math.PI*x)+0.09*checker});
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
    return {x:wrap(rawX),y:wrap(rawY),vx,vy};
  });
  return {out,crossings};
}
let pic=initial(),flip=initial(),picCrossings=0,flipCrossings=0;
for(let t=0;t<steps;t++){
  const a=transfer(pic,picMix),b=transfer(flip,flipMix);
  pic=a.out;flip=b.out;picCrossings+=a.crossings;flipCrossings+=b.crossings;
}
const grid=p2g(pic);
const energy=p=>p.reduce((s,q)=>s+(q.vx*q.vx+q.vy*q.vy)/2,0);
const momentum=p=>p.reduce((s,q)=>[s[0]+q.vx,s[1]+q.vy],[0,0]);
const totalMass=grid.mass.reduce((a,b)=>a+b,0);
const constant=initial().map(p=>({...p,vx:0.2,vy:-0.1}));
const cg=p2g(constant);
let constantError=0;
for(const p of constant){
  let x=0,y=0;
  for(const [i,w] of weights(p.x,p.y)){x+=w*cg.gx[i];y+=w*cg.gy[i];}
  constantError=Math.max(constantError,Math.abs(x-0.2),Math.abs(y+0.1));
}
if([...pic,...flip].some(p=>![p.x,p.y,p.vx,p.vy].every(Number.isFinite)))
  throw Error('nonfinite particle state');
const encode=v=>Math.round(255*Math.min(1,Math.max(0,v)));
const pixels=Uint8Array.from({length:N*N},(_,k)=>encode(Math.hypot(grid.gx[k],grid.gy[k])/0.7));
const texture=gl.createTexture();if(!texture)throw Error('texture allocation');
gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texture);
gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
gl.texImage2D(gl.TEXTURE_2D,0,gl.R8,N,N,0,gl.RED,gl.UNSIGNED_BYTE,pixels);
function compile(type,src){
  const s=gl.createShader(type);if(!s)throw Error('shader allocation');
  gl.shaderSource(s,src);gl.compileShader(s);
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))
    throw Error(gl.getShaderInfoLog(s)||'compile failed');
  return s;
}
const vs=compile(gl.VERTEX_SHADER,vertexSource),fs=compile(gl.FRAGMENT_SHADER,fragmentSource);
const program=gl.createProgram();if(!program)throw Error('program allocation');
gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))
  throw Error(gl.getProgramInfoLog(program)||'link failed');
gl.deleteShader(vs);gl.deleteShader(fs);gl.useProgram(program);
const loc=n=>{const l=gl.getUniformLocation(program,n);if(l===null)throw Error('missing '+n);return l;};
const coords=particles=>new Float32Array(particles.flatMap(p=>[p.x,p.y]));
gl.uniform2fv(loc('u_pic[0]'),coords(pic));
gl.uniform2fv(loc('u_flip[0]'),coords(flip));
gl.uniform1i(loc('u_speed'),0);
const vao=gl.createVertexArray();if(!vao)throw Error('VAO allocation');
gl.bindVertexArray(vao);
gl.disable(gl.DITHER);gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);
gl.disable(gl.SCISSOR_TEST);gl.viewport(0,0,canvas.width,canvas.height);
gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES,0,3);
report('SIM','step='+steps+' physical time='+(steps*dt).toFixed(3)+'s, dt='+dt+'s');
report('PARAM','PIC mix='+picMix+', FLIP mix='+flipMix+', grid damping='+damp+', kick='+force);
report('PARTICLES','16 equal-mass particles in each cohort; periodic square; wraps PIC='+picCrossings+', FLIP='+flipCrossings);
report('TRANSFER','sum grid nodal masses='+totalMass.toPrecision(12)+', constant velocity reproduction error='+constantError.toExponential(2));
report('ENERGY','PIC='+energy(pic).toPrecision(9)+', FLIP='+energy(flip).toPrecision(9)+' mass-weighted, no density conversion');
report('MOMENTUM','PIC='+momentum(pic).map(x=>x.toPrecision(6))+'; FLIP='+momentum(flip).map(x=>x.toPrecision(6)));
report('DISPLAY','left PIC point positions, middle FLIP point positions, right PIC nodal speed / 0.7 in R8');
report('LIMIT','periodic boundary; no MAC pressure projection, physical free surface, wall collision or full Navier-Stokes solution');
