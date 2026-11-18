// FCG2: prescribed scalar field, NOT a fluid PDE solver.
// Grid i=0..7, j=0..7; row 0 is the bottom row. Time is in seconds.
// User editing happens only inside the opaque-origin WebGL sandbox.
const N=8, dt=Math.PI/2;
const steps=settings.steps; // FCG2 1step / play buttons pass 0..4.
if(!Number.isInteger(steps)||steps<0||steps>4) throw new RangeError('steps must be 0..4');
// CPU state is recomputed at every physical time; the two buffers alternate.
let current=new Float64Array(N*N), next=new Float64Array(N*N);
const textures=[];
gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
for(let k=0;k<2;k++){
  const tex=gl.createTexture(); if(!tex) throw new Error('texture allocation failed');
  textures.push(tex);
  gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.R8,N,N,0,gl.RED,gl.UNSIGNED_BYTE,null);
}
let active=0, largestError=0;
for(let n=0;n<=steps;n++){
  const t=n*dt;
  for(let j=0;j<N;j++) for(let i=0;i<N;i++){
    const x=(i+0.5)/N, y=(j+0.5)/N;
    next[i+N*j]=0.5+0.25*Math.sin(2*Math.PI*x)*Math.cos(2*Math.PI*y)*Math.sin(t);
  }
  // Swap distinct CPU buffers; upload into a distinct GPU texture.
  [current,next]=[next,current];
  active=n%2;
  const encoded=new Uint8Array(N*N);
  for(let k=0;k<encoded.length;k++){
    encoded[k]=Math.round(255*current[k]);
    largestError=Math.max(largestError,Math.abs(current[k]-encoded[k]/255));
  }
  gl.bindTexture(gl.TEXTURE_2D,textures[active]);
  gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,N,N,gl.RED,gl.UNSIGNED_BYTE,encoded);
  const error=gl.getError();
  if(error!==gl.NO_ERROR) throw new Error('R8 texture upload failed: 0x'+error.toString(16));
}
function compile(type,source,name){
  const shader=gl.createShader(type);
  if(!shader)throw new Error(name+' allocation failed');
  gl.shaderSource(shader,source);gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))
    throw new Error(name+': '+(gl.getShaderInfoLog(shader)||'compile failed'));
  return shader;
}
const vert=compile(gl.VERTEX_SHADER,vertexSource,'VERTEX');
const frag=compile(gl.FRAGMENT_SHADER,fragmentSource,'FRAGMENT');
const program=gl.createProgram();
if(!program)throw new Error('shader program allocation failed');
gl.attachShader(program,vert);gl.attachShader(program,frag);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))
  throw new Error('LINK: '+(gl.getProgramInfoLog(program)||'link failed'));
gl.deleteShader(vert);gl.deleteShader(frag);gl.useProgram(program);
const sampler=gl.getUniformLocation(program,'u_density');
if(sampler===null)throw new Error('missing u_density uniform');
gl.uniform1i(sampler,0);
gl.bindTexture(gl.TEXTURE_2D,textures[active]);
const vao=gl.createVertexArray();
if(!vao)throw new Error('VAO allocation failed');
gl.bindVertexArray(vao);
gl.disable(gl.DITHER);gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);
gl.disable(gl.SCISSOR_TEST);gl.disable(gl.CULL_FACE);
gl.viewport(0,0,canvas.width,canvas.height);
gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES,0,3);
report('TIME','step='+steps+', dt=pi/2 s, physical t='+(steps*dt).toFixed(5)+' s');
report('FIELD','analytic prescribed scalar; NOT Navier-Stokes or advection');
report('GRID','8x8, bottom row first; R8=64 bytes per active texture; nearest sampling');
report('ERROR','max |q - R8/255| = '+largestError.toPrecision(6)+' (bound 1/510)');
report('GPU','ping-pong upload targets alternated; CPU computes values, GPU only renders');
report('FORMAT','R8/RED/UNSIGNED_BYTE: no float render-target extension required');
