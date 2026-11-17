// WGL16: identical squares in separate draw calls vs one instanced draw.
// Change gridSize (2..16), or drawMode to 'loop'; keep both renders for pixel comparison.
const gridSize = 8;
const drawMode = 'instanced'; // 'loop' or 'instanced'
if (!Number.isInteger(gridSize) || gridSize < 2 || gridSize > 16)
  throw new RangeError('gridSize must be an integer from 2 to 16');
if (!['loop','instanced'].includes(drawMode))
  throw new RangeError("drawMode must be 'loop' or 'instanced'");
const instanceCount = gridSize * gridSize;
const half = 0.7 / gridSize;
const vertices = new Float32Array([
  -half,-half, half,-half, -half,half,
  -half,half, half,-half, half,half
]);
const inst = new Float32Array(instanceCount*5);
const positions = [];
const colors = [];
let j=0;
for(let row=0;row<gridSize;row++){
  for(let col=0;col<gridSize;col++){
    const x=-1+(col+0.5)*2/gridSize;
    const y=-1+(row+0.5)*2/gridSize;
    const rgb=(row+col)%2===0?[230,80,40]:[40,150,220];
    positions.push([x,y]);
    colors.push(rgb.map(v=>v/255));
    inst.set([x,y,...rgb.map(v=>v/255)],5*j);
    j++;
  }
}
function shader(type,src,label){
  const s=gl.createShader(type);
  if(!s) throw new Error('createShader failed '+label);
  gl.shaderSource(s,src); gl.compileShader(s);
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))
    throw new Error(label+' shader: '+(gl.getShaderInfoLog(s)||'unknown'));
  return s;
}
const vs=shader(gl.VERTEX_SHADER,vertexSource,'VERTEX');
const fs=shader(gl.FRAGMENT_SHADER,fragmentSource,'FRAGMENT');
const program=gl.createProgram();
if(!program) throw new Error('createProgram failed');
gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))
  throw new Error('LINK: '+(gl.getProgramInfoLog(program)||'unknown'));
gl.deleteShader(vs);gl.deleteShader(fs);
gl.useProgram(program);
function uniform(name) {
  const u=gl.getUniformLocation(program,name);
  if(u===null)throw new Error('Missing uniform '+name);
  return u;
}
const ui=uniform('u_instanced'),uo=uniform('u_offset'),uc=uniform('u_color');
const vao=gl.createVertexArray(),mesh=gl.createBuffer(),instances=gl.createBuffer();
if(!vao||!mesh||!instances)throw new Error('GPU buffer allocation failed');
gl.bindVertexArray(vao);
gl.bindBuffer(gl.ARRAY_BUFFER,mesh);
gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0,2,gl.FLOAT,false,8,0);
gl.bindBuffer(gl.ARRAY_BUFFER,instances);
gl.bufferData(gl.ARRAY_BUFFER,inst,gl.STATIC_DRAW);
gl.enableVertexAttribArray(1);
gl.vertexAttribPointer(1,2,gl.FLOAT,false,20,0);
gl.vertexAttribDivisor(1,1);
gl.enableVertexAttribArray(2);
gl.vertexAttribPointer(2,3,gl.FLOAT,false,20,8);
gl.vertexAttribDivisor(2,1);
gl.disable(gl.DITHER);gl.disable(gl.BLEND);
gl.disable(gl.DEPTH_TEST);gl.disable(gl.SCISSOR_TEST);
gl.disable(gl.CULL_FACE);
gl.bindFramebuffer(gl.FRAMEBUFFER,null);
gl.viewport(0,0,canvas.width,canvas.height);
function drawScene(method) {
  const useInstance=method==='instanced';
  gl.clearColor(12/255,20/255,32/255,1);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  gl.uniform1i(ui,useInstance?1:0);
  if(useInstance) {
    gl.drawArraysInstanced(gl.TRIANGLES,0,6,instanceCount);
  } else {
    for(let k=0;k<instanceCount;k++){
      gl.uniform2f(uo,positions[k][0],positions[k][1]);
      gl.uniform3f(uc,...colors[k]);
      gl.drawArrays(gl.TRIANGLES,0,6);
    }
  }
}
function measureAndRead(method){
  const start=performance.now();
  drawScene(method);
  gl.finish(); // includes command submission, GPU completion, and synchronization
  const elapsed=performance.now()-start;
  const pixels=new Uint8Array(canvas.width*canvas.height*4);
  gl.readPixels(0,0,canvas.width,canvas.height,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
  const error=gl.getError();
  if(error!==gl.NO_ERROR)throw new Error('GL readback 0x'+error.toString(16));
  return {elapsed,pixels};
}
const repeated=measureAndRead('loop');
const batched=measureAndRead('instanced');
let mismatchedPixels=0;
for(let i=0;i<repeated.pixels.length;i+=4){
  if(repeated.pixels[i]!==batched.pixels[i] ||
     repeated.pixels[i+1]!==batched.pixels[i+1] ||
     repeated.pixels[i+2]!==batched.pixels[i+2] ||
     repeated.pixels[i+3]!==batched.pixels[i+3])mismatchedPixels++;
}
drawScene(drawMode); // final visible framebuffer is the selected method
report('GEOMETRY',instanceCount+' squares, '+(6*instanceCount)+' vertex invocations per rendering');
report('CALLS','loop '+instanceCount+' draw calls; instanced 1 draw call (per rendering)');
report('DATA','mesh '+vertices.byteLength+' bytes; instance attributes '+inst.byteLength+' bytes');
report('PIXELS',mismatchedPixels+' mismatched RGBA pixels between loop and instanced');
report('TIMING','single synchronized run: loop '+repeated.elapsed.toFixed(2)+'ms; instanced '+batched.elapsed.toFixed(2)+'ms');
report('CAUTION','gl.finish timings are environment-dependent; they do not isolate GPU time or guarantee speedup');
