// WGL6: draw the same nondegenerate triangle in two viewports.
// Left: WebGL2 smooth interpolation (perspective corrected).
// Right: rebuild screen barycentric coordinates in fragment GLSL (affine).
const gridFrequency = 3.0;     // Try 18.0 to observe aliasing.
const reverseWinding = false; // true reverses projected CCW to CW.
const cullBackFaces = true;   // false displays either winding.
if (!(Number.isFinite(gridFrequency) && gridFrequency > 0 && gridFrequency <= 64)) {
  throw new RangeError('gridFrequency must be finite and in (0, 64]');
}
const vertices = [
  {ndc:[-0.75,-0.65], w:1, uv:[0,0]},
  {ndc:[ 0.75,-0.65], w:2, uv:[1,0]},
  {ndc:[ 0.00, 0.80], w:4, uv:[0,1]}
];
if (reverseWinding) [vertices[1],vertices[2]]=[vertices[2],vertices[1]];
function compile(type,source,label) {
  const shader=gl.createShader(type);
  if(!shader) throw new Error(label+': createShader failed');
  gl.shaderSource(shader,source); gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
    const log=gl.getShaderInfoLog(shader)||'no log';
    gl.deleteShader(shader);
    throw new Error(label+' compile: '+log);
  }
  return shader;
}
const vs=compile(gl.VERTEX_SHADER,vertexSource,'VERTEX');
const fs=compile(gl.FRAGMENT_SHADER,fragmentSource,'FRAGMENT');
const program=gl.createProgram();
if(!program)throw new Error('createProgram failed');
gl.attachShader(program,vs);gl.attachShader(program,fs);
gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
  throw new Error('LINK: '+(gl.getProgramInfoLog(program)||'no log'));
}
gl.deleteShader(vs);gl.deleteShader(fs);
const data = new Float32Array(vertices.flatMap(v=>[
  v.ndc[0]*v.w,v.ndc[1]*v.w,0,v.w,v.uv[0],v.uv[1]
]));
const vao=gl.createVertexArray(),vbo=gl.createBuffer();
if(!vao||!vbo)throw new Error('VAO or buffer allocation failed');
gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0,4,gl.FLOAT,false,24,0);
gl.enableVertexAttribArray(1);
gl.vertexAttribPointer(1,2,gl.FLOAT,false,24,16);
gl.useProgram(program);
function uniform(name) {
  const location=gl.getUniformLocation(program,name);
  if(location===null)throw new Error('missing uniform: '+name);
  return location;
}
const uMode=uniform('u_mode'),uViewport=uniform('u_viewport');
const uGrid=uniform('u_gridFrequency');
gl.disable(gl.BLEND); gl.disable(gl.DITHER); gl.disable(gl.DEPTH_TEST);
gl.frontFace(gl.CCW); gl.cullFace(gl.BACK);
if(cullBackFaces)gl.enable(gl.CULL_FACE);
else gl.disable(gl.CULL_FACE);
gl.clearColor(0,0,0,1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
gl.uniform1f(uGrid,gridFrequency);
const leftWidth=Math.floor(canvas.width/2);
const rightWidth=canvas.width-leftWidth;
for(const [mode,x,width] of [[0,0,leftWidth],[1,leftWidth,rightWidth]]) {
  gl.viewport(x,0,width,canvas.height);
  gl.uniform1i(uMode,mode);
  gl.uniform4f(uViewport,x,0,width,canvas.height);
  gl.drawArrays(gl.TRIANGLES,0,3);
}
gl.flush();
report('WGL6','left=smooth perspective; right=affine barycentric; grid='+gridFrequency);
report('GEOMETRY','w=1,2,4; clip-z=0; reverseWinding='+reverseWinding+
  '; cullBackFaces='+cullBackFaces);
report('VIEWPORT','left='+leftWidth+'x'+canvas.height+
  '; right='+rightWidth+'x'+canvas.height);
