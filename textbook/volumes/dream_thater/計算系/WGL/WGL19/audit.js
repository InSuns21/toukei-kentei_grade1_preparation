// WGL19: edit the clock and the WebGL2 lifecycle; the CPU reference is outside this iframe.
const rate=0.2;                     // 0 <= rate <= 0.25
const fixedMs=20;                   // simulation time per diffusion step
const frameDeltasMs=[16,16,72,16]; // synthetic elapsed milliseconds for reproducible audit
const maxStepsPerFrame=4;           // prevents unbounded catch-up work
const simulateLoss=false;           // change to true to try WEBGL_lose_context
if(!Number.isFinite(rate)||rate<0||rate>0.25||
   !Number.isFinite(fixedMs)||fixedMs<=0||fixedMs>1000||
   !Number.isInteger(maxStepsPerFrame)||maxStepsPerFrame<1||maxStepsPerFrame>12||
   !Array.isArray(frameDeltasMs)||frameDeltasMs.length<1||frameDeltasMs.length>12||
   frameDeltasMs.some(d=>!Number.isFinite(d)||d<0||d>1000))
  throw new RangeError('clock inputs outside safe range');
const N=4;
if(!gl.getExtension('EXT_color_buffer_float'))
  throw new Error('EXT_color_buffer_float unavailable: no GPU float claim');
const compile=(type,source,stage)=>{
  const shader=gl.createShader(type);
  if(!shader)throw new Error(stage+' allocation failed');
  gl.shaderSource(shader,source);gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
    const log=gl.getShaderInfoLog(shader)||'compile failed';
    gl.deleteShader(shader);throw new Error(stage+': '+log);
  }
  return shader;
};
let gpu=null;
function initialize(){
  const vertex=compile(gl.VERTEX_SHADER,vertexSource,'VERTEX');
  const fragment=compile(gl.FRAGMENT_SHADER,fragmentSource,'FRAGMENT');
  const program=gl.createProgram();
  if(!program)throw new Error('program allocation failed');
  gl.attachShader(program,vertex);gl.attachShader(program,fragment);
  gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))
    throw new Error('LINK: '+(gl.getProgramInfoLog(program)||'link failed'));
  gl.deleteShader(vertex);gl.deleteShader(fragment);
  const loc=name=>{
    const value=gl.getUniformLocation(program,name);
    if(value===null)throw new Error('missing uniform '+name);
    return value;
  };
  const uniforms={state:loc('u_state'),stage:loc('u_stage'),
                  rate:loc('u_rate'),target:loc('u_targetSize')};
  const vao=gl.createVertexArray(),buffer=gl.createBuffer();
  if(!vao||!buffer)throw new Error('VAO/buffer allocation failed');
  gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([
    -1,-1,1,-1,-1,1,-1,1,1,-1,1,1
  ]),gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
  gl.disable(gl.BLEND);gl.disable(gl.DITHER);gl.disable(gl.DEPTH_TEST);
  gl.disable(gl.SCISSOR_TEST);gl.disable(gl.CULL_FACE);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
  const seed=new Float32Array(N*N*4);
  for(let k=0;k<N*N;k++)seed[4*k+3]=1;
  seed[4*5]=1; // (i,j)=(1,1), lower-left origin
  const textures=[],fbos=[];
  for(let k=0;k<2;k++){
    const tex=gl.createTexture(),fbo=gl.createFramebuffer();
    if(!tex||!fbo)throw new Error('texture/FBO allocation failed');
    textures.push(tex);fbos.push(fbo);
    gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tex);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA32F,N,N,0,gl.RGBA,gl.FLOAT,k===0?seed:null);
    gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,tex,0);
    const status=gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if(status!==gl.FRAMEBUFFER_COMPLETE)
      throw new Error('FBO '+k+' incomplete: 0x'+status.toString(16));
  }
  gl.useProgram(program);gl.uniform1i(uniforms.state,0);gl.uniform1f(uniforms.rate,rate);
  gpu={program,vao,buffer,textures,fbos,uniforms,active:0};
  return gpu;
}
function tick(){
  const to=1-gpu.active;
  gl.useProgram(gpu.program);gl.bindVertexArray(gpu.vao);
  gl.bindFramebuffer(gl.FRAMEBUFFER,gpu.fbos[to]);
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,gpu.textures[gpu.active]);
  gl.viewport(0,0,N,N);
  gl.uniform1i(gpu.uniforms.stage,0);
  gl.uniform2f(gpu.uniforms.target,N,N);
  gl.drawArrays(gl.TRIANGLES,0,6);
  gpu.active=to;
  const error=gl.getError();
  if(error!==gl.NO_ERROR)throw new Error('update GL error 0x'+error.toString(16));
}
function drawScreen(){
  gl.useProgram(gpu.program);gl.bindVertexArray(gpu.vao);
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,gpu.textures[gpu.active]);
  gl.viewport(0,0,canvas.width,canvas.height);
  gl.uniform1i(gpu.uniforms.stage,1);
  gl.uniform2f(gpu.uniforms.target,canvas.width,canvas.height);
  gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES,0,6);
}
function readState(){
  gl.bindFramebuffer(gl.FRAMEBUFFER,gpu.fbos[gpu.active]);
  const raw=new Float32Array(N*N*4);
  gl.readPixels(0,0,N,N,gl.RGBA,gl.FLOAT,raw);
  const error=gl.getError();
  if(error!==gl.NO_ERROR)throw new Error('float readPixels error 0x'+error.toString(16));
  return Array.from({length:N*N},(_,k)=>raw[4*k]);
}
function dispose(){
  if(!gpu)return;
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  gl.bindTexture(gl.TEXTURE_2D,null);
  gl.bindBuffer(gl.ARRAY_BUFFER,null);gl.bindVertexArray(null);gl.useProgram(null);
  gpu.fbos.forEach(v=>gl.deleteFramebuffer(v));
  gpu.textures.forEach(v=>gl.deleteTexture(v));
  gl.deleteBuffer(gpu.buffer);gl.deleteVertexArray(gpu.vao);gl.deleteProgram(gpu.program);
  const removed=gpu.fbos.every(v=>!gl.isFramebuffer(v))&&
    gpu.textures.every(v=>!gl.isTexture(v))&&
    !gl.isBuffer(gpu.buffer)&&!gl.isVertexArray(gpu.vao)&&!gl.isProgram(gpu.program);
  if(!removed)throw new Error('GPU object deletion not confirmed');
  report('RESOURCES','2 textures, 2 FBOs, VAO, VBO, program deleted; checks passed');
  gpu=null;
}
return (async()=>{
  initialize();
  let accumulator=0,steps=0,droppedMs=0;
  const frames=[];let firstRaf=null,lastRaf=null;
  const startMs=performance.now();
  for(const delta of frameDeltasMs){
    const stamp=await new Promise(resolve=>requestAnimationFrame(resolve));
    if(firstRaf===null)firstRaf=stamp;
    lastRaf=stamp;
    accumulator+=delta;
    let thisFrame=0;
    while(accumulator+1e-9>=fixedMs && thisFrame<maxStepsPerFrame){
      tick();accumulator-=fixedMs;steps++;thisFrame++;
    }
    // Drop only complete overdue ticks, not the fractional remainder.
    if(accumulator+1e-9>=fixedMs){
      const skipped=Math.floor((accumulator+1e-9)/fixedMs);
      droppedMs+=skipped*fixedMs;
      accumulator-=skipped*fixedMs;
    }
    drawScreen();
    frames.push(thisFrame);
  }
  const measuredFps=frameDeltasMs.length>1&&lastRaf>firstRaf?
    (frameDeltasMs.length-1)*1000/(lastRaf-firstRaf):null;
  report('CLOCK','synthetic deltas='+frameDeltasMs.join(',')+
    'ms; ticks/frame='+frames.join(',')+'; total ticks='+steps+
    '; remainder='+accumulator.toFixed(5)+'ms; dropped='+droppedMs+'ms');
  report('FRAME','actual RAF cadence '+(measuredFps===null?'not measurable':measuredFps.toFixed(2)+' fps')+
    '; wall='+ (performance.now()-startMs).toFixed(2)+'ms; not GPU execution time');
  report('TIMER_QUERY',gl.getExtension('EXT_disjoint_timer_query_webgl2')?
    'available; timing requires query/disjoint checks (not performed)':
    'unavailable; GPU duration not measured');
  if(simulateLoss){
    const ext=gl.getExtension('WEBGL_lose_context');
    if(!ext)report('CONTEXT','WEBGL_lose_context not exposed: recovery unverified');
    else {
      const lost=new Promise(resolve=>canvas.addEventListener('webglcontextlost',resolve,{once:true}));
      const restored=new Promise(resolve=>canvas.addEventListener('webglcontextrestored',resolve,{once:true}));
      ext.loseContext();await lost;
      await new Promise(resolve=>setTimeout(resolve,60));
      ext.restoreContext();await restored;
      // Every old GL object is invalid after restoration. Rebuild and replay, never reuse it.
      gpu=null;initialize();
      for(let k=0;k<steps;k++)tick();
      drawScreen();
      report('CONTEXT','context lost/restored; all resources rebuilt; '+steps+' ticks replayed');
    }
  }else report('CONTEXT','simulation disabled; set simulateLoss=true to test actual loss/rebuild');
  if(steps>12)throw new RangeError('12 total steps maximum for independent CPU audit');
  const floatReadback=readState();
  drawScreen();
  const mass=floatReadback.reduce((a,b)=>a+b,0);
  report('FLOAT','16 RGBA32F red values; mass='+mass.toPrecision(9)+
    '; min='+Math.min(...floatReadback).toPrecision(7));
  const renderError=gl.getError();
  if(renderError!==gl.NO_ERROR)throw new Error('final GL error 0x'+renderError.toString(16));
  dispose();
  return {floatReadback,floatParameters:{rate,steps},
    frameAudit:{deltas:frameDeltasMs,fixedMs,maxStepsPerFrame,
                droppedMs,steps,frames:frameDeltasMs.length,
                restored:simulateLoss?'attempted':'not-requested'}};
})();
