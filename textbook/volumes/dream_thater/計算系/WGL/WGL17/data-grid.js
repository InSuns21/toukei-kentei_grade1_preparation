// WGL17: compare 8-bit normalized, integer, and float 4x2 textures.
const mode = 'r8'; // edit: 'r8', 'r8ui', 'r32f'
const physicalValues = [-2.0, -1.3, -0.2, 0.6, 1.2, 1.75, 0.0, 2.0];
const lower=-2, upper=2, gridWidth=4, gridHeight=2;
if (!['r8','r8ui','r32f'].includes(mode)) throw new RangeError('bad mode');
const bytes = Uint8Array.from(physicalValues, value => Math.round(255*(value-lower)/(upper-lower)));
const floatData = new Float32Array(physicalValues);
function compile(type,src,stage) {
  const shader=gl.createShader(type);
  if(!shader) throw new Error(stage+' shader allocation failed');
  gl.shaderSource(shader,src); gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))
    throw new Error(stage+': '+(gl.getShaderInfoLog(shader)||'unknown error'));
  return shader;
}
const vs=compile(gl.VERTEX_SHADER,vertexSource,'VERTEX');
const fs=compile(gl.FRAGMENT_SHADER,fragmentSource,'FRAGMENT');
const program=gl.createProgram();
if(!program) throw new Error('program allocation failed');
gl.attachShader(program,vs); gl.attachShader(program,fs);
gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))
  throw new Error('LINK: '+(gl.getProgramInfoLog(program)||'unknown'));
gl.deleteShader(vs); gl.deleteShader(fs); gl.useProgram(program);
function loc(name) {
  const l=gl.getUniformLocation(program,name);
  if(l===null) throw new Error('missing uniform '+name);
  return l;
}
const uFloat=loc('u_floatData'),uInteger=loc('u_integerData'),
      uMode=loc('u_mode'),uTarget=loc('u_floatTarget'),uSize=loc('u_targetSize');
const vao=gl.createVertexArray(),buffer=gl.createBuffer();
if(!vao||!buffer) throw new Error('quad allocation failed');
gl.bindVertexArray(vao); gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
function upload(unit,internal,format,type,data) {
  const t=gl.createTexture(); if(!t) throw new Error('texture allocation failed');
  gl.activeTexture(gl.TEXTURE0+unit);
  gl.bindTexture(gl.TEXTURE_2D,t);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
  gl.texImage2D(gl.TEXTURE_2D,0,internal,gridWidth,gridHeight,0,format,type,data);
  const error=gl.getError();
  if(error!==gl.NO_ERROR) throw new Error('texture upload error 0x'+error.toString(16));
  return t;
}
// Every sampler type has a complete texture on a separate texture unit.
const floatTexture=mode==='r32f'
  ? upload(0,gl.R32F,gl.RED,gl.FLOAT,floatData)
  : upload(0,gl.R8,gl.RED,gl.UNSIGNED_BYTE,bytes);
const integerTexture=upload(1,gl.R8UI,gl.RED_INTEGER,gl.UNSIGNED_BYTE,bytes);
gl.uniform1i(uFloat,0);gl.uniform1i(uInteger,1);
gl.uniform1i(uMode,mode==='r8'?0:mode==='r8ui'?1:2);
gl.disable(gl.BLEND);gl.disable(gl.DITHER);
gl.disable(gl.DEPTH_TEST);gl.disable(gl.SCISSOR_TEST);gl.disable(gl.CULL_FACE);
function draw(w,h,floatTarget) {
  gl.viewport(0,0,w,h);gl.uniform2f(uSize,w,h);
  gl.uniform1i(uTarget,floatTarget?1:0);
  gl.drawArrays(gl.TRIANGLES,0,6);
}
let maxInputError=0;
for(let i=0;i<8;i++){
  const reconstructed=mode==='r32f'?floatData[i]:lower+4*bytes[i]/255;
  maxInputError=Math.max(maxInputError,Math.abs(reconstructed-physicalValues[i]));
}
report('FORMAT',mode==='r32f'?'R32F / RED / FLOAT, 32 bits/texel':
  mode==='r8ui'?'R8UI / RED_INTEGER / UNSIGNED_BYTE, 8 bits/texel':
                 'R8 / RED / UNSIGNED_BYTE, normalized 8 bits/texel');
report('CPU','grid 4x2; bottom [-2,-1.3,-0.2,0.6]; top [1.2,1.75,0,2]');
report('BYTES',Array.from(bytes).join(',')+'; max input-to-reconstruction error '+
  maxInputError.toPrecision(6));
report('SAMPLER',mode==='r8ui'?'usampler2D yields uint (not normalized)':
  'sampler2D yields float; texelFetch with integer coordinate and level 0');
const ext=gl.getExtension('EXT_color_buffer_float');
if(ext&&mode==='r32f') {
  const color=gl.createTexture(),fbo=gl.createFramebuffer();
  if(!color||!fbo) throw new Error('float attachment allocation failed');
  gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,color);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA32F,4,2,0,gl.RGBA,gl.FLOAT,null);
  gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,color,0);
  const status=gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  if(status===gl.FRAMEBUFFER_COMPLETE) {
    draw(4,2,true);
    const actual=new Float32Array(32);
    gl.readPixels(0,0,4,2,gl.RGBA,gl.FLOAT,actual);
    const error=gl.getError();
    if(error===gl.NO_ERROR) {
      const delta=physicalValues.map((v,i)=>Math.abs(actual[4*i]-v));
      report('FLOAT_READBACK','RGBA32F/FLOAT: max |GPU-original|='+Math.max(...delta).toPrecision(6));
    } else report('FLOAT_READBACK','readPixels FLOAT failed: 0x'+error.toString(16));
  } else report('FLOAT_READBACK','FBO incomplete: 0x'+status.toString(16));
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  gl.deleteFramebuffer(fbo);gl.deleteTexture(color);
} else report('FLOAT_READBACK',ext?
  'extension present; switch to r32f for float readback':
  'EXT_color_buffer_float unavailable; float attachment not verified');
gl.bindFramebuffer(gl.FRAMEBUFFER,null);
gl.activeTexture(gl.TEXTURE0);
gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);
draw(canvas.width,canvas.height,false);
report('DISPLAY','RGBA8 readPixels is 8-bit even after R32F sampling; do not infer float storage accuracy');
