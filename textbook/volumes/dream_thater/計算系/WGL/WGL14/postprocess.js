// WGL14: render A -> filter B -> reveal the identical UV before/after.
// GUI edits THESE constants in the executed JavaScript, then reruns this shader.
// The 8x8 impulse is an optional precision exercise; start with the actual image.
const imageMode = 'illustration'; // 'illustration' (128x128) or 'impulse' (8x8)
const filterMode = 'blur';        // 'blur' or 'edge' (positive Laplacian)
const blurRadius = 1;            // 1..4 texels; radius=1 means 3x3, radius=2 means 5x5
const exposure = 1.0;            // 0..4; dimensionless Reinhard scale
const processOrder = 'filter-first'; // 'filter-first' or 'tone-first'
const comparison = 0.5;          // 0..1; share of canvas showing unprocessed A
if (!['illustration', 'impulse'].includes(imageMode) ||
    !['blur', 'edge'].includes(filterMode) ||
    !['filter-first', 'tone-first'].includes(processOrder) ||
    !Number.isInteger(blurRadius) || blurRadius < 1 || blurRadius > 4 ||
    !Number.isFinite(exposure) || exposure < 0 || exposure > 4 ||
    !Number.isFinite(comparison) || comparison < 0 || comparison > 1)
  throw new RangeError('WGL14: invalid mode, radius, exposure or comparison');
const gridSize = imageMode === 'impulse' ? 8 : 128;

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
gl.uniform1i(loc('u_source'),0);
gl.uniform1i(loc('u_processed'),1);
gl.uniform1i(loc('u_sceneMode'),imageMode==='illustration'?1:0);
gl.uniform1i(loc('u_size'),gridSize);
gl.uniform1i(filter,filterMode==='blur'?0:1);
gl.uniform1i(loc('u_blurRadius'),blurRadius);
gl.uniform1i(loc('u_toneFirst'),processOrder==='tone-first'?1:0);
gl.uniform1f(loc('u_exposure'),exposure);
gl.uniform1f(loc('u_compare'),comparison);
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
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,gridSize,gridSize,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
  gl.bindTexture(gl.TEXTURE_2D,null);
  gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,texture,0);
  const status=gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  if(status!==gl.FRAMEBUFFER_COMPLETE)
    throw new Error(label+' FBO incomplete: 0x'+status.toString(16));
  return {texture,fbo};
}
const A=makeTarget('scene A'),B=makeTarget('filter B');
report('FBO','A/B: independent '+gridSize+'x'+gridSize+' RGBA8, NEAREST; comparison canvas '+canvas.width+'x'+canvas.height);
gl.viewport(0,0,gridSize,gridSize);

// Pass 0: generate a complete illustrated scene or the optional 8x8 test grid.
gl.bindFramebuffer(gl.FRAMEBUFFER,A.fbo);
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D,null);
gl.activeTexture(gl.TEXTURE1);
gl.bindTexture(gl.TEXTURE_2D,null);
gl.uniform1i(pass,0);
gl.drawArrays(gl.TRIANGLES,0,6);

// Pass 1: sample A, write only B. No read/write feedback on the same texture.
gl.bindFramebuffer(gl.FRAMEBUFFER,B.fbo);
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D,A.texture);
gl.uniform1i(pass,1);
gl.drawArrays(gl.TRIANGLES,0,6);
const raw=new Uint8Array(4);
gl.readPixels(Math.floor(gridSize/2),Math.floor(gridSize/2),1,1,gl.RGBA,gl.UNSIGNED_BYTE,raw);
report('FILTER','mode='+filterMode+', radius='+blurRadius+
  ', B midpoint rgba='+Array.from(raw).join(','));

// Pass 2: render a full-resolution before/after wipe of the SAME image coordinates.
gl.bindFramebuffer(gl.FRAMEBUFFER,null);
gl.viewport(0,0,canvas.width,canvas.height);
gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D,A.texture);
gl.activeTexture(gl.TEXTURE1);
gl.bindTexture(gl.TEXTURE_2D,B.texture);
gl.uniform1i(pass,2);
gl.drawArrays(gl.TRIANGLES,0,6);
gl.flush();
report('DISPLAY','before < '+Math.round(comparison*100)+'% | after >= '+Math.round(comparison*100)+
  '%; '+processOrder+', exposure '+exposure);
report('BOUNDARY','texelFetch with explicit clamp; blur uses '+(2*blurRadius+1)+'x'+(2*blurRadius+1)+' samples');
report('PRECISION','A and B are RGBA8; display is nearest-neighbour magnification');
const err=gl.getError();
if(err!==gl.NO_ERROR) throw new Error('GL error 0x'+err.toString(16));
gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,null);
gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,null);
gl.deleteFramebuffer(A.fbo);gl.deleteFramebuffer(B.fbo);
gl.deleteTexture(A.texture);gl.deleteTexture(B.texture);
gl.deleteBuffer(vbo);gl.deleteVertexArray(vao);gl.deleteProgram(program);
