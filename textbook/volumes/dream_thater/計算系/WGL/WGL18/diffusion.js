// WGL18: explicit diffusion, 4x4 lower-left origin, zero normal flux.
const rate = 0.2; // edit this in [0, 0.25] to preserve nonnegative values
const steps = 2; // edit: integer from 0 through 12
if (!Number.isFinite(rate) || rate < 0 || rate > 0.25 ||
    !Number.isInteger(steps) || steps < 0 || steps > 12)
  throw new RangeError('rate must be 0..0.25; steps must be 0..12');
const N = 4;
const input = new Float32Array(N*N*4);
for (let k=0;k<N*N;k++) input[4*k+3]=1;
input[4*(1+N*1)]=1; // impulse at (1,1), all other concentrations zero
const ext=gl.getExtension('EXT_color_buffer_float');
if (!ext) throw new Error('EXT_color_buffer_float unavailable: GPU float evolution NOT verified');
function compile(type,source,stage) {
  const sh=gl.createShader(type);
  if(!sh) throw new Error(stage+' shader allocation failure');
  gl.shaderSource(sh,source);gl.compileShader(sh);
  if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))
    throw new Error(stage+': '+(gl.getShaderInfoLog(sh)||'compile failure'));
  return sh;
}
const v=compile(gl.VERTEX_SHADER,vertexSource,'VERTEX');
const f=compile(gl.FRAGMENT_SHADER,fragmentSource,'FRAGMENT');
const program=gl.createProgram();
if(!program) throw new Error('program allocation failure');
gl.attachShader(program,v);gl.attachShader(program,f);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))
  throw new Error('LINK: '+(gl.getProgramInfoLog(program)||'link failure'));
gl.deleteShader(v);gl.deleteShader(f);gl.useProgram(program);
function uniform(name){
  const location=gl.getUniformLocation(program,name);
  if(location===null)throw new Error('missing uniform '+name);
  return location;
}
const uState=uniform('u_state'),uStage=uniform('u_stage'),
      uRate=uniform('u_rate'),uTarget=uniform('u_targetSize');
gl.uniform1i(uState,0);
gl.uniform1f(uRate,rate);
const vao=gl.createVertexArray(),buffer=gl.createBuffer();
if(!vao||!buffer)throw new Error('fullscreen triangle resources unavailable');
gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([
  -1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1
]),gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
gl.disable(gl.BLEND);gl.disable(gl.DITHER);gl.disable(gl.DEPTH_TEST);
gl.disable(gl.SCISSOR_TEST);gl.disable(gl.CULL_FACE);
gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
const textures=[], fbos=[];
for(let k=0;k<2;k++){
  const tex=gl.createTexture(),fbo=gl.createFramebuffer();
  if(!tex||!fbo)throw new Error('float framebuffer allocation failed');
  textures.push(tex);fbos.push(fbo);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA32F,N,N,0,gl.RGBA,gl.FLOAT,k===0?input:null);
  gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,tex,0);
  const status=gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  if(status!==gl.FRAMEBUFFER_COMPLETE)
    throw new Error('float FBO '+k+' incomplete: 0x'+status.toString(16));
}
let active=0;
// The initial CPU/GPU oracle and live image use precisely this update pass.
function advanceDiffusionStep(n){
  const destination=1-active;
  gl.bindFramebuffer(gl.FRAMEBUFFER,fbos[destination]); // write to other texture
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D,textures[active]); // read current texture only
  gl.viewport(0,0,N,N);
  gl.uniform1i(uStage,0);gl.uniform2f(uTarget,N,N);
  gl.drawArrays(gl.TRIANGLES,0,6);
  const error=gl.getError();
  if(error!==gl.NO_ERROR)throw new Error('step '+n+' GL error: 0x'+error.toString(16));
  active=destination;
}
for(let n=0;n<steps;n++)advanceDiffusionStep(n);
gl.bindFramebuffer(gl.FRAMEBUFFER,fbos[active]);
const raw=new Float32Array(N*N*4);
gl.readPixels(0,0,N,N,gl.RGBA,gl.FLOAT,raw);
const readError=gl.getError();
if(readError!==gl.NO_ERROR)throw new Error('FLOAT readPixels failed: 0x'+readError.toString(16));
const floatValues=Array.from({length:N*N},(_,k)=>raw[4*k]);
const mass=floatValues.reduce((sum,value)=>sum+value,0);
report('GPU_FLOAT','RGBA32F readback 4x4; steps='+steps+', rate='+rate+
  '; mass='+mass.toPrecision(9)+' (initial=1); min='+Math.min(...floatValues).toPrecision(6));
report('GRID','bottom row first; values='+floatValues.map(v=>v.toFixed(5)).join(','));
report('BOUNDARY','clamped texelFetch: no outward edge flux; two distinct textures/framebuffers');
gl.bindFramebuffer(gl.FRAMEBUFFER,null);
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D,textures[active]);
gl.viewport(0,0,canvas.width,canvas.height);
gl.uniform1i(uStage,1);
gl.uniform2f(uTarget,canvas.width,canvas.height);
gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES,0,6);

// First, the parent samples the step=steps result and compares independent
// CPU/GPU RGBA8 and RGBA32F values. The following rAF loop is observation,
// NOT an assertion that each subsequent frame passed the original oracle.
if(typeof window!=='undefined' && typeof requestAnimationFrame==='function'){
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
  const note=document.createElement('output');
  note.style.cssText='display:block;box-sizing:border-box;width:100%;padding:4px 6px;background:#10253b;color:#cde8f6;font:clamp(11px,1.6vw,13px)/1.4 system-ui';
  note.setAttribute('aria-live','off');
  canvas.insertAdjacentElement('afterend',note);
  canvas.tabIndex=0;
  canvas.title='WGL18 実GPU 4×4拡散：Space/Enter再生・停止、→1数値step、R初期化';
  canvas.setAttribute('aria-label','GPU拡散。SpaceまたはEnterで再生停止、右矢印で1数値step、Rで初期化');
  let playing=!reduced, stepNumber=steps, last=0, raf=0, firstFrame=true;
  let initialOracleCaptured=false;
  window.addEventListener('wgl18-initial-oracle-captured',()=>{initialOracleCaptured=true;},{once:true});
  const MAX_STEP=24; // bounded cycle; no claim that GPU frames are independently verified
  const liveRaw=new Float32Array(N*N*4);
  function liveReadback(){
    gl.bindFramebuffer(gl.FRAMEBUFFER,fbos[active]);
    gl.readPixels(0,0,N,N,gl.RGBA,gl.FLOAT,liveRaw);
    const error=gl.getError();
    if(error!==gl.NO_ERROR)throw Error('live FLOAT readback error 0x'+error.toString(16));
    let mass=0,min=Infinity,max=-Infinity;
    for(let k=0;k<N*N;k++){
      const value=liveRaw[4*k];
      mass+=value;min=Math.min(min,value);max=Math.max(max,value);
    }
    return {mass,min,max};
  }
  function drawLive(){
    const {mass,min,max}=liveReadback();
    // Stage 2 displays square physical cells and letterboxes the other axis.
    // Stage 1 was deliberately retained for the original 16 CPU/GPU probes.
    gl.bindFramebuffer(gl.FRAMEBUFFER,null);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D,textures[active]);
    gl.useProgram(program);gl.bindVertexArray(vao);
    gl.uniform1i(uStage,2);
    gl.uniform2f(uTarget,canvas.width,canvas.height);
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.drawArrays(gl.TRIANGLES,0,6);
    const error=gl.getError();
    if(error!==gl.NO_ERROR)throw Error('live DISPLAY error 0x'+error.toString(16));
    note.textContent='実GPU 4×4：数値step '+stepNumber+
      ' / '+MAX_STEP+'（r='+rate+'、物理時間ではない）、FLOAT総和='+
      mass.toFixed(7)+'、最小='+min.toFixed(5)+'、最大='+max.toFixed(5)+
      '。Space/Enter停止・再生、→1段、Rで初期化。初期独立検算は'+steps+'段のみ。';
  }
  function resetLive(){
    // Upload the SAME initial impulse, not the previous cycle's final field.
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D,textures[0]);
    gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,N,N,gl.RGBA,gl.FLOAT,input);
    active=0;stepNumber=0;
    drawLive();
  }
  function advanceLive(){
    if(stepNumber===MAX_STEP){resetLive();return;}
    advanceDiffusionStep(stepNumber);
    stepNumber++;
    drawLive();
  }
  function safeAdvance(){
    try{advanceLive();}
    catch(error){playing=false;note.textContent='GPU更新を停止：'+String(error.message||error);}
  }
  canvas.addEventListener('keydown',event=>{
    if(event.key===' '||event.key==='Enter'){
      event.preventDefault();playing=!playing;last=0;canvas.focus();
    }else if(event.key==='ArrowRight'){
      event.preventDefault();playing=false;last=0;
      safeAdvance();
    }else if(event.key==='r'||event.key==='R'){
      event.preventDefault();playing=false;last=0;
      try{resetLive();}catch(error){note.textContent=String(error);}
    }
  });
  function frame(now){
    if(initialOracleCaptured && playing&&!document.hidden){
      if(!last)last=now;
      // Preserve the verified still frame briefly before entering the live run.
      if(now-last>=(firstFrame?750:180)){
        firstFrame=false;last=now;safeAdvance();
      }
    }else last=0;
    raf=requestAnimationFrame(frame);
  }
  note.textContent='初期'+steps+'段をCPU/GPU独立検算。実GPUを750ms後から追加更新（初期結果と動的値を区別）。'+
    'Space/Enter停止・再生、→1数値step、R初期化'+(reduced?'。低減モーション設定により一時停止中':'');
  raf=requestAnimationFrame(frame);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
}
// The parent uses its OWN CPU oracle, not the JS/GLSL source, to compare this readback.
return {floatReadback:floatValues,floatParameters:{rate,steps}};
