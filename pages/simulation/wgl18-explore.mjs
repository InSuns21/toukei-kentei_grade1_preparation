// WGL18 observation: the very same diffusion.frag used by the 4x4 editable oracle lab.
// The CPU writes initial conditions / pointer stamps only; time stepping is always GPU ping-pong.
const $=id=>document.getElementById(id),canvas=$('field');
const controls={play:$('play'),once:$('once'),reset:$('reset'),rate:$('rate'),
  grid:$('grid'),speed:$('speed'),pattern:$('pattern')};
const gl=canvas.getContext('webgl2',{alpha:false,antialias:false,preserveDrawingBuffer:true});
let N=64,rate=.2,playing=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let program=null,vao=null,vbo=null,textures=[],fbos=[],active=0,steps=0,baseline=0;
let gpuValues=null,readRaw=null,raf=0,lastTick=0,painting=false,ready=false;
const uniforms={},fail=error=>{
  playing=false;ready=false;controls.play.textContent='再生';
  $('status').textContent='GPU計算を停止：'+String(error?.message||error);
};
function compile(type,source){
  const shader=gl.createShader(type);if(!shader)throw Error('shader allocation failure');
  gl.shaderSource(shader,source);gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
    const reason=gl.getShaderInfoLog(shader);gl.deleteShader(shader);throw Error(reason);
  }
  return shader;
}
function initProgram(vertex,fragment){
  const v=compile(gl.VERTEX_SHADER,vertex),f=compile(gl.FRAGMENT_SHADER,fragment);
  program=gl.createProgram();gl.attachShader(program,v);gl.attachShader(program,f);
  gl.linkProgram(program);gl.deleteShader(v);gl.deleteShader(f);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);
  for(const name of ['u_state','u_stage','u_rate','u_targetSize','u_gridSize']){
    uniforms[name]=gl.getUniformLocation(program,name);
    if(uniforms[name]===null)throw Error('missing uniform '+name);
  }
  gl.uniform1i(uniforms.u_state,0);
  vao=gl.createVertexArray();vbo=gl.createBuffer();
  gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
  gl.disable(gl.BLEND);gl.disable(gl.DITHER);gl.disable(gl.DEPTH_TEST);
}
function destroyTextures(){
  for(const fbo of fbos)gl.deleteFramebuffer(fbo);
  for(const texture of textures)gl.deleteTexture(texture);
  fbos=[];textures=[];
}
function allocate(){
  destroyTextures();gpuValues=new Float32Array(N*N*4);readRaw=new Float32Array(N*N*4);
  for(let k=0;k<2;k++){
    const tex=gl.createTexture(),fbo=gl.createFramebuffer();
    if(!tex||!fbo)throw Error('RGBA32F allocation failed');
    textures.push(tex);fbos.push(fbo);
    gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tex);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA32F,N,N,0,gl.RGBA,gl.FLOAT,null);
    gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,tex,0);
    if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)
      throw Error('浮動小数点フレームバッファが使用できません');
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  gl.useProgram(program);gl.uniform2i(uniforms.u_gridSize,N,N);
  gl.uniform1f(uniforms.u_rate,rate);
}
function fillInitial(){
  const kind=controls.pattern.value;
  let total=0;
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const x=(i+.5)/N,y=(j+.5)/N;
    const gaussian=(cx,cy,s)=>Math.exp(-((x-cx)**2+(y-cy)**2)/(2*s*s));
    const value=kind==='one'?gaussian(.5,.5,.046)
      :kind==='two'?Math.max(gaussian(.28,.53,.044),gaussian(.72,.47,.044))
      :kind==='stripe'?Math.exp(-(((x-.5)/.06)**2)/2)
      :gaussian(.08,.5,.055);
    const k=4*(i+N*j);
    gpuValues[k]=value;gpuValues[k+1]=0;gpuValues[k+2]=0;gpuValues[k+3]=1;
    total+=value;
  }
  baseline=total;
}
function upload(){
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,textures[active]);
  gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,N,N,gl.RGBA,gl.FLOAT,gpuValues);
  const e=gl.getError();if(e!==gl.NO_ERROR)throw Error('upload GL 0x'+e.toString(16));
}
function reset(){
  active=0;steps=0;lastTick=0;fillInitial();upload();render();
}
function update(){
  const destination=1-active;
  gl.useProgram(program);gl.bindVertexArray(vao);
  gl.bindFramebuffer(gl.FRAMEBUFFER,fbos[destination]);
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,textures[active]);
  gl.viewport(0,0,N,N);gl.uniform1i(uniforms.u_stage,0);
  gl.uniform2f(uniforms.u_targetSize,N,N);
  gl.drawArrays(gl.TRIANGLES,0,6);
  const e=gl.getError();if(e!==gl.NO_ERROR)throw Error('GPU更新 0x'+e.toString(16));
  active=destination;steps++;
}
function render(){
  if(!ready)return;
  gl.bindFramebuffer(gl.FRAMEBUFFER,fbos[active]);
  gl.readPixels(0,0,N,N,gl.RGBA,gl.FLOAT,readRaw);
  let err=gl.getError();if(err!==gl.NO_ERROR)throw Error('FLOAT読戻し 0x'+err.toString(16));
  let mass=0,max=0;
  for(let k=0;k<N*N;k++){const v=readRaw[k*4];mass+=v;max=Math.max(max,v);}
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D,textures[active]);
  gl.useProgram(program);gl.bindVertexArray(vao);
  gl.viewport(0,0,canvas.width,canvas.height);
  gl.uniform1i(uniforms.u_stage,3);
  gl.uniform2f(uniforms.u_targetSize,canvas.width,canvas.height);
  gl.drawArrays(gl.TRIANGLES,0,6);
  err=gl.getError();if(err!==gl.NO_ERROR)throw Error('画面描画 0x'+err.toString(16));
  $('steps').textContent=String(steps);
  $('active').textContent=active===0?'A':'B';
  $('mass').textContent=mass.toFixed(3);
  $('maximum').textContent=max.toFixed(4);
  $('ratio').textContent=(100*mass/baseline).toFixed(2)+'%';
  controls.play.textContent=playing?'一時停止':'再生';
  $('status').textContent='GPUで更新中｜'+N+'×'+N+'セル、r='+rate.toFixed(2);
}
function step(count=1){for(let k=0;k<count;k++)update();render();}
function setRate(){
  rate=Number(controls.rate.value);$('rate-val').textContent=rate.toFixed(2);
  gl.useProgram(program);gl.uniform1f(uniforms.u_rate,rate);reset();
}
function coordinates(event){
  const rect=canvas.getBoundingClientRect();
  const x=(event.clientX-rect.left)/rect.width;
  const y=1-(event.clientY-rect.top)/rect.height;
  if(x<0||x>=1||y<=0||y>1)return null;
  return [Math.min(N-1,Math.floor(x*N)),Math.min(N-1,Math.floor(y*N))];
}
function paint(event){
  if(!ready)return;
  const p=coordinates(event);if(!p)return;
  const [i,j]=p;
  gl.bindFramebuffer(gl.FRAMEBUFFER,fbos[active]);
  gl.readPixels(0,0,N,N,gl.RGBA,gl.FLOAT,readRaw);
  const e=gl.getError();if(e!==gl.NO_ERROR)throw Error('brush readback 0x'+e.toString(16));
  gpuValues.set(readRaw);
  const radius=Math.max(2,N*.045);
  for(let y=Math.max(0,Math.floor(j-radius));y<=Math.min(N-1,Math.ceil(j+radius));y++)
    for(let x=Math.max(0,Math.floor(i-radius));x<=Math.min(N-1,Math.ceil(i+radius));x++){
      const d=Math.hypot(x-i,y-j);
      if(d<radius){const k=4*(x+N*y);gpuValues[k]=Math.max(gpuValues[k],Math.max(0,1-d/radius));}
    }
  upload();render();
  $('picked').textContent='('+i+','+j+') / '+readRaw[4*(i+N*j)].toFixed(4);
}
function loop(now){
  if(ready&&playing&&!document.hidden&&now-lastTick>=120){
    try{step(Number(controls.speed.value));}catch(e){fail(e);}
    lastTick=now;
  }
  raf=requestAnimationFrame(loop);
}
controls.play.addEventListener('click',()=>{playing=!playing;lastTick=0;controls.play.textContent=playing?'一時停止':'再生';});
controls.once.addEventListener('click',()=>{playing=false;try{step();}catch(e){fail(e);}});
controls.reset.addEventListener('click',()=>{try{reset();}catch(e){fail(e);}});
controls.rate.addEventListener('input',()=>{$('rate-val').textContent=Number(controls.rate.value).toFixed(2);});
controls.rate.addEventListener('change',()=>{if(ready)try{setRate();}catch(e){fail(e);}});
controls.pattern.addEventListener('change',()=>{if(ready)try{reset();}catch(e){fail(e);}});
controls.grid.addEventListener('change',()=>{if(ready)try{N=Number(controls.grid.value);allocate();reset();}catch(e){fail(e);}});
canvas.addEventListener('pointerdown',e=>{painting=true;canvas.setPointerCapture(e.pointerId);try{paint(e);}catch(error){fail(error);}});
canvas.addEventListener('pointermove',e=>{if(painting)try{paint(e);}catch(error){fail(error);}else if(ready){const p=coordinates(e);if(p)$('picked').textContent='('+p+ ') / '+readRaw[4*(p[0]+N*p[1])].toFixed(4);}});
canvas.addEventListener('pointerup',()=>{painting=false;});
canvas.addEventListener('pointercancel',()=>{painting=false;});
canvas.addEventListener('keydown',e=>{
  if(e.key===' '||e.key==='Enter'){e.preventDefault();controls.play.click();}
  else if(e.key==='ArrowRight'){e.preventDefault();controls.once.click();}
  else if(e.key.toLowerCase()==='r'){e.preventDefault();controls.reset.click();}
});
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{
  if(e.matches){playing=false;controls.play.textContent='再生';}
});
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();fail('WebGL context lost。復旧後に再初期化します');});
canvas.addEventListener('webglcontextrestored',()=>{location.reload();});
window.addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
async function start(){
  if(!gl){$('status').textContent='WebGL2非対応のためGPUデモを実行できません';return;}
  try{
    if(!gl.getExtension('EXT_color_buffer_float'))throw Error('EXT_color_buffer_floatが必要です');
    const base=new URL('../textbook/volumes/dream_thater/計算系/WGL/WGL18/',import.meta.url);
    const sources=await Promise.all(['diffusion.vert','diffusion.frag'].map(async name=>{
      const response=await fetch(new URL(name,base),{cache:'no-store'});
      if(!response.ok)throw Error(name+' HTTP '+response.status);
      return response.text();
    }));
    initProgram(...sources);allocate();ready=true;reset();raf=requestAnimationFrame(loop);
  }catch(e){fail(e);}
}
start();
