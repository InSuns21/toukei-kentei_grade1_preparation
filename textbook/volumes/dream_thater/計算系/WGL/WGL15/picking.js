// WGL15: two world-space panels -> ID/depth FBO + visible canvas.
// The source is freely editable; the separate host CPU oracle is not taken from this code.
const enableDepthTest = true;
const reverseDrawOrder = false; // true draws the near rectangle first
if(typeof enableDepthTest!=='boolean'||typeof reverseDrawOrder!=='boolean')
  throw new RangeError('depth and draw order must be booleans');
const width=canvas.width,height=canvas.height;
const aspect=width/height,near=1,far=9;
const panels=[
  {id:1,d:2,left:-1,right:0.15,bottom:-0.6,top:0.7},
  {id:2,d:3,left:-0.1,right:1.5,bottom:-0.5,top:0.7}
];
function compile(type,source,label) {
  const shader=gl.createShader(type);
  if(!shader)throw new Error('createShader failed: '+label);
  gl.shaderSource(shader,source);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) {
    const log=gl.getShaderInfoLog(shader)||'unknown compile error';
    gl.deleteShader(shader);
    throw new Error(label+' compile: '+log);
  }
  return shader;
}
const vert=compile(gl.VERTEX_SHADER,vertexSource,'VERTEX');
const frag=compile(gl.FRAGMENT_SHADER,fragmentSource,'FRAGMENT');
const program=gl.createProgram();
if(!program)throw new Error('createProgram failed');
gl.attachShader(program,vert);gl.attachShader(program,frag);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))
  throw new Error('LINK: '+(gl.getProgramInfoLog(program)||'unknown link error'));
gl.deleteShader(vert);gl.deleteShader(frag);
gl.useProgram(program);
function uniform(name) {
  const place=gl.getUniformLocation(program,name);
  if(place===null)throw new Error('Missing uniform '+name);
  return place;
}
const uProj=uniform('u_projection'),uIdMode=uniform('u_idMode'),
      uSelected=uniform('u_selected');
const projection=new Float32Array([
  1/aspect,0,0,0,
  0,1,0,0,
  0,0,-(far+near)/(far-near),-1,
  0,0,-2*near*far/(far-near),0
]); // column-major, P*vec4(world,1)
gl.uniformMatrix4fv(uProj,false,projection);
gl.disable(gl.BLEND);gl.disable(gl.DITHER);gl.disable(gl.CULL_FACE);
gl.disable(gl.SCISSOR_TEST);
if(enableDepthTest) {gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LESS);}
else gl.disable(gl.DEPTH_TEST);
gl.depthMask(true);gl.clearDepth(1.0);
const vao=gl.createVertexArray(),vbo=gl.createBuffer();
if(!vao||!vbo)throw new Error('Cannot create geometry buffers');
const vertices=[];
function addQuad(panel) {
  const {left:l,right:r,bottom:b,top:t,d,id}=panel;
  for(const [x,y] of [[l,b],[r,b],[l,t],[l,t],[r,b],[r,t]])
    vertices.push(x,y,-d,id);
}
addQuad(panels[1]); // ID2 behind, 6 vertices
addQuad(panels[0]); // ID1 in front, 6 vertices
gl.bindVertexArray(vao);
gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0,3,gl.FLOAT,false,16,0);
gl.enableVertexAttribArray(1);
gl.vertexAttribPointer(1,1,gl.FLOAT,false,16,12);
function drawGeometry() {
  if(reverseDrawOrder) {
    gl.drawArrays(gl.TRIANGLES,6,6);
    gl.drawArrays(gl.TRIANGLES,0,6);
  } else gl.drawArrays(gl.TRIANGLES,0,12);
}
const idTex=gl.createTexture(),idFbo=gl.createFramebuffer(),depthRb=gl.createRenderbuffer();
if(!idTex||!idFbo||!depthRb)throw new Error('Cannot allocate ID/depth target');
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D,idTex);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,width,height,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
gl.bindFramebuffer(gl.FRAMEBUFFER,idFbo);
gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,idTex,0);
gl.bindRenderbuffer(gl.RENDERBUFFER,depthRb);
gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,width,height);
gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,depthRb);
const complete=gl.checkFramebufferStatus(gl.FRAMEBUFFER);
if(complete!==gl.FRAMEBUFFER_COMPLETE)
  throw new Error('ID FBO incomplete: 0x'+complete.toString(16));
gl.viewport(0,0,width,height);
function drawIds() {
  gl.bindFramebuffer(gl.FRAMEBUFFER,idFbo);
  gl.viewport(0,0,width,height);
  gl.clearColor(0,0,0,1);
  gl.clearDepth(1);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  gl.uniform1i(uIdMode,1);
  gl.uniform1i(uSelected,0);
  drawGeometry();
}
let selected=0;
function paintScene() {
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  gl.viewport(0,0,width,height);
  gl.clearColor(10/255,18/255,29/255,1);
  gl.clearDepth(1);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  gl.uniform1i(uIdMode,0);
  gl.uniform1i(uSelected,selected);
  drawGeometry();
}
function cpuRayId(x,y) {
  const nx=2*(x+0.5)/width-1,ny=2*(y+0.5)/height-1;
  const hx=aspect*nx,hy=ny;
  let best=Infinity,id=0;
  for(const panel of panels) {
    const px=panel.d*hx,py=panel.d*hy;
    if(px>=panel.left&&px<=panel.right&&py>=panel.bottom&&py<=panel.top&&
        panel.d<best) {best=panel.d;id=panel.id;}
  }
  return id;
}
drawIds();
paintScene();
report('WGL15','RGBA8 ID texture + DEPTH_COMPONENT16 renderbuffer, FBO complete');
report('INPUT','Click canvas or focus then arrow keys and Enter/Space; buffer '+width+'x'+height);
report('DEPTH','depth LESS '+enableDepthTest+'; reverseDrawOrder '+reverseDrawOrder);
report('ORACLE','GPU ID from FBO readPixels; CPU ID from independent ray intersections');
return {
  pick(x,y) {
    if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||x>=width||y<0||y>=height)
      throw new RangeError('pick outside drawing buffer');
    gl.bindFramebuffer(gl.FRAMEBUFFER,idFbo);
    gl.readBuffer(gl.COLOR_ATTACHMENT0);
    const bytes=new Uint8Array(4);
    gl.readPixels(x,y,1,1,gl.RGBA,gl.UNSIGNED_BYTE,bytes);
    const error=gl.getError();
    if(error!==gl.NO_ERROR)throw new Error('ID readPixels GL error 0x'+error.toString(16));
    const gpuId=bytes[0],cpuId=cpuRayId(x,y);
    selected=gpuId;
    paintScene();
    return {gpuId,cpuId};
  }
};
