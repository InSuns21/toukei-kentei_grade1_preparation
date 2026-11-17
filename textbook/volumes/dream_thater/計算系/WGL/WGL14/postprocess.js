// WGL14: scene FBO A -> convolution FBO B -> canvas (left=A, right=tone(B)).
// Edit these settings, then execute again. The CPU oracle checks the initial state.
const filterMode = 'blur'; // 'blur' (3x3 mean) or 'edge' (positive Laplacian)
const exposure = 1.0;     // display-only Reinhard curve; no HDR input in this lesson
if (!['blur','edge'].includes(filterMode) ||
    !Number.isFinite(exposure) || exposure < 0 || exposure > 8)
  throw new RangeError('filterMode must be blur/edge; exposure must be in [0,8]');

function compile(type,source,stage) {
  const shader=gl.createShader(type);
  if(!shader) throw new Error(stage+' createShader failed');
  gl.shaderSource(shader,source);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) {
    const msg=gl.getShaderInfoLog(shader)||'no driver log';
    gl.deleteShader(shader);
    throw new Error(stage+' compile: '+msg);
  }
  return shader;
}
const vs=compile(gl.VERTEX_SHADER,vertexSource,'VERTEX');
const fs=compile(gl.FRAGMENT_SHADER,fragmentSource,'FRAGMENT');
const program=gl.createProgram();
if(!program) throw new Error('createProgram failed');
gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))
  throw new Error('LINK: '+(gl.getProgramInfoLog(program)||'no driver log'));
gl.deleteShader(vs);gl.deleteShader(fs);
gl.useProgram(program);
function loc(name) {
  const value=gl.getUniformLocation(program,name);
  if(value===null) throw new Error('Missing uniform: '+name);
  return value;
}
const pass=loc('u_pass'),filter=loc('u_filterMode');
const tone=loc('u_applyTone'),expo=loc('u_exposure');
gl.uniform1i(loc('u_source'),0);
gl.uniform1i(filter,filterMode==='blur'?0:1);
gl.uniform1f(expo,exposure);
gl.disable(gl.BLEND);gl.disable(gl.DITHER);gl.disable(gl.DEPTH_TEST);
gl.disable(gl.SCISSOR_TEST);gl.disable(gl.CULL_FACE);
const vao=gl.createVertexArray(),vbo=gl.createBuffer();
if(!vao||!vbo) throw new Error('Cannot create full-screen quad');
gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([
  -1,-1,1,-1,-1,1, -1,1,1,-1,1,1
]),gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);

function makeTarget(label) {
  const texture=gl.createTexture(),fbo=gl.createFramebuffer();
  if(!texture||!fbo) throw new Error('Cannot allocate '+label);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D,texture);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,8,8,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
  gl.bindTexture(gl.TEXTURE_2D,null);
  gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,texture,0);
  const status=gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  if(status!==gl.FRAMEBUFFER_COMPLETE)
    throw new Error(label+' FBO incomplete: 0x'+status.toString(16));
  return {texture,fbo};
}
const A=makeTarget('scene A'),B=makeTarget('filter B');
report('FBO','2 independent complete 8x8 RGBA8 targets; no float-render extension');
gl.viewport(0,0,8,8);

// Pass 0: construct the exact scene in A. Never sample from attached A.
gl.bindFramebuffer(gl.FRAMEBUFFER,A.fbo);
gl.bindTexture(gl.TEXTURE_2D,null);
gl.uniform1i(pass,0);gl.uniform1i(tone,0);
gl.drawArrays(gl.TRIANGLES,0,6);

// Pass 1: write B, sampling A with integer-addressed texelFetch.
gl.bindFramebuffer(gl.FRAMEBUFFER,B.fbo);
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D,A.texture);
gl.uniform1i(pass,1);
gl.drawArrays(gl.TRIANGLES,0,6);
const raw=new Uint8Array(4);
gl.readPixels(3,3,1,1,gl.RGBA,gl.UNSIGNED_BYTE,raw);
report('FILTER','mode='+filterMode+', B[3,3]='+Array.from(raw).join(',')+
  '; expected blur about 28 or edge 255');

// Pass 2: no FBO is attached. Left copies A, right copies B and tone-maps it.
gl.bindFramebuffer(gl.FRAMEBUFFER,null);
gl.viewport(0,0,canvas.width,canvas.height);
gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);
gl.uniform1i(pass,2);
const left=Math.floor(canvas.width/2);
gl.bindTexture(gl.TEXTURE_2D,A.texture);
gl.uniform1i(tone,0);
gl.viewport(0,0,left,canvas.height);
gl.drawArrays(gl.TRIANGLES,0,6);
gl.bindTexture(gl.TEXTURE_2D,B.texture);
gl.uniform1i(tone,1);
gl.viewport(left,0,canvas.width-left,canvas.height);
gl.drawArrays(gl.TRIANGLES,0,6);
gl.flush();
report('DISPLAY','left scene; right '+filterMode+' + Reinhard exposure '+exposure);
report('BOUNDARY','3x3 CLAMP_TO_EDGE with repeated boundary texels, not zero padding');
report('PRECISION','A and B each quantized to RGBA8; CPU initial baseline uses ±2 bytes');
const err=gl.getError();
if(err!==gl.NO_ERROR) throw new Error('GL error 0x'+err.toString(16));
gl.bindTexture(gl.TEXTURE_2D,null);
gl.deleteFramebuffer(A.fbo);gl.deleteFramebuffer(B.fbo);
gl.deleteTexture(A.texture);gl.deleteTexture(B.texture);
gl.deleteBuffer(vbo);gl.deleteVertexArray(vao);gl.deleteProgram(program);
