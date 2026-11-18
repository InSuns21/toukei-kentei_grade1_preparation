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
for(let n=0;n<steps;n++){
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
// The parent uses its OWN CPU oracle, not the JS/GLSL source, to compare this readback.
return {floatReadback:floatValues};
