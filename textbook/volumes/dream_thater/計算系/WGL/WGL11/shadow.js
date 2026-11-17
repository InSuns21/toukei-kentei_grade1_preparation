// WGL11: shadow-map depth pass -> shaded scene pass -> four independent probes.
// Edit bias: 0 = possible surface acne, excessively large = detached shadows.
const shadowResolution = 256; // try 64, 256, 512
const depthBias = 0.002;      // light-depth units; try -0.05 or 0.30
const useShadow = true;      // false draws direct lighting without visibility
if (!Number.isInteger(shadowResolution) || shadowResolution < 32 ||
    shadowResolution > 1024 || !Number.isFinite(depthBias) ||
    depthBias < -0.5 || depthBias > 0.5 || typeof useShadow !== 'boolean') {
  throw new RangeError('Invalid shadow-map parameters');
}
function shader(type, source, label) {
  const object = gl.createShader(type);
  if (!object) throw new Error(label + ' createShader failed');
  gl.shaderSource(object, source);
  gl.compileShader(object);
  if (!gl.getShaderParameter(object, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(object) || 'no driver log';
    gl.deleteShader(object);
    throw new Error(label + ' compilation: ' + log);
  }
  return object;
}
const vsh = shader(gl.VERTEX_SHADER, vertexSource, 'VERTEX');
const fsh = shader(gl.FRAGMENT_SHADER, fragmentSource, 'FRAGMENT');
const program = gl.createProgram();
if (!program) throw new Error('createProgram failed');
gl.attachShader(program,vsh); gl.attachShader(program,fsh);
gl.linkProgram(program);
if (!gl.getProgramParameter(program,gl.LINK_STATUS))
  throw new Error('LINK: ' + (gl.getProgramInfoLog(program)||'no driver log'));
gl.deleteShader(vsh);gl.deleteShader(fsh);gl.useProgram(program);
function uniform(name) {
  const location = gl.getUniformLocation(program,name);
  if (location===null) throw new Error('Missing uniform '+name);
  return location;
}
const mvpLoc=uniform('u_mvp'),lightLoc=uniform('u_lightMatrix'),
      passLoc=uniform('u_pass'),biasLoc=uniform('u_bias'),
      samplerLoc=uniform('u_shadow'),useShadowLoc=uniform('u_useShadow');
// Column-major orthographic SHEAR projection. A ray P+t(.5,.25,1)
// retains (x-.5z,y-.25z). Its depth is .75-z/4 (nearer = smaller).
const light = new Float32Array([
  .5,0,0,0, 0,.5,0,0, -.25,-.125,-.5,0, 0,0,.5,1
]);
function dot(a,b){return a.reduce((s,x,i)=>s+x*b[i],0);}
function sub(a,b){return a.map((x,i)=>x-b[i]);}
function cross(a,b){return [a[1]*b[2]-a[2]*b[1],
                            a[2]*b[0]-a[0]*b[2],
                            a[0]*b[1]-a[1]*b[0]];}
function unit(a){const len=Math.hypot(...a);return a.map(x=>x/len);}
const target=[0,0,0.25], eye=[3,-4,3.0];
const forward=unit(sub(target,eye));
const right=unit(cross(forward,[0,0,1]));
const up=cross(right,forward);
const camera=new Float32Array([
 right[0]/2.3,up[0]/2.3,forward[0]/5,0,
 right[1]/2.3,up[1]/2.3,forward[1]/5,0,
 right[2]/2.3,up[2]/2.3,forward[2]/5,0,
 -dot(right,target)/2.3,-dot(up,target)/2.3,-dot(forward,target)/5,1
]);
gl.uniformMatrix4fv(lightLoc,false,light);
gl.uniform1i(samplerLoc,0);
gl.uniform1f(biasLoc,depthBias);
gl.uniform1i(useShadowLoc,useShadow?1:0);
gl.disable(gl.CULL_FACE);
gl.disable(gl.DITHER);
gl.disable(gl.BLEND);
gl.disable(gl.SCISSOR_TEST);
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LESS);
gl.clearDepth(1.0);
function quad(a,b,c,d,n,out) {
  for (const p of [a,b,c,a,c,d]) out.push(...p,...n);
}
const data=[];
quad([-1.9,-1.9,0],[1.9,-1.9,0],[1.9,1.9,0],[-1.9,1.9,0],[0,0,1],data);
const a=-0.45, b=0.45, h=1.0;
quad([a,a,h],[b,a,h],[b,b,h],[a,b,h],[0,0,1],data);
quad([a,a,0],[a,a,h],[a,b,h],[a,b,0],[-1,0,0],data);
quad([b,a,0],[b,b,0],[b,b,h],[b,a,h],[1,0,0],data);
quad([a,a,0],[b,a,0],[b,a,h],[a,a,h],[0,-1,0],data);
quad([a,b,0],[a,b,h],[b,b,h],[b,b,0],[0,1,0],data);
const vertices=new Float32Array(data);
const vao=gl.createVertexArray(),vbo=gl.createBuffer();
if (!vao||!vbo) throw new Error('Cannot allocate mesh');
gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0,3,gl.FLOAT,false,24,0);
gl.enableVertexAttribArray(1);
gl.vertexAttribPointer(1,3,gl.FLOAT,false,24,12);
const depthTexture=gl.createTexture(), fbo=gl.createFramebuffer();
if (!depthTexture||!fbo) throw new Error('Cannot allocate depth FBO');
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D,depthTexture);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_COMPARE_MODE,gl.NONE);
gl.texImage2D(gl.TEXTURE_2D,0,gl.DEPTH_COMPONENT24,
  shadowResolution,shadowResolution,0,gl.DEPTH_COMPONENT,gl.UNSIGNED_INT,null);
gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);
gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,
  gl.TEXTURE_2D,depthTexture,0);
gl.drawBuffers([gl.NONE]);gl.readBuffer(gl.NONE);
const completeness=gl.checkFramebufferStatus(gl.FRAMEBUFFER);
if(completeness!==gl.FRAMEBUFFER_COMPLETE)
  throw new Error('DEPTH FBO INCOMPLETE 0x'+completeness.toString(16));
report('FBO','FRAMEBUFFER_COMPLETE; DEPTH_COMPONENT24 '+shadowResolution+'x'+shadowResolution);
// Pass 1: depth only. Unbind the image from its sampler while it is attached.
gl.bindTexture(gl.TEXTURE_2D,null);
gl.viewport(0,0,shadowResolution,shadowResolution);
gl.clear(gl.DEPTH_BUFFER_BIT);
gl.uniformMatrix4fv(mvpLoc,false,light);
gl.uniform1i(passLoc,0);
gl.drawArrays(gl.TRIANGLES,0,vertices.length/6);
// Pass 2: change the drawing target BEFORE binding the depth texture as input.
gl.bindFramebuffer(gl.FRAMEBUFFER,null);
gl.drawBuffers([gl.BACK]);
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D,depthTexture);
gl.viewport(0,0,canvas.width,canvas.height);
gl.clearColor(.04,.055,.08,1);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
gl.uniformMatrix4fv(mvpLoc,false,camera);
gl.uniform1i(passLoc,1);
gl.drawArrays(gl.TRIANGLES,0,vertices.length/6);
// Pass 3: read four fixed test receivers with GPU shadow lookups.
// The 4x1 diagnostic strip occupies only the bottom-left four canvas pixels.
const probeVbo=gl.createBuffer(), probeVao=gl.createVertexArray();
if(!probeVbo||!probeVao) throw new Error('Cannot allocate probe');
gl.bindVertexArray(probeVao);
gl.bindBuffer(gl.ARRAY_BUFFER,probeVbo);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([
  -1,-1,0, 1,-1,0, -1,1,0, -1,1,0, 1,-1,0, 1,1,0
]),gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0,3,gl.FLOAT,false,0,0);
gl.disableVertexAttribArray(1);
gl.vertexAttrib3f(1,0,0,1);
gl.disable(gl.DEPTH_TEST);
gl.viewport(0,0,4,1);
gl.uniform1i(passLoc,2);
gl.drawArrays(gl.TRIANGLES,0,6);
const pixels=new Uint8Array(16);
gl.readPixels(0,0,4,1,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
report('PROBES','GPU visibility x4 (0=shadow,255=lit): '+
  [0,1,2,3].map(i=>pixels[4*i]).join(','));
report('REFERENCE','CPU rays: shadow,lit,lit,lit at default bias 0.002');
report('BIAS','depthBias='+depthBias+'; visibility=receiverDepth-bias <= nearestDepth');
report('STATE','depth pass and shaded pass use distinct framebuffer targets');
gl.bindTexture(gl.TEXTURE_2D,null);
gl.deleteBuffer(probeVbo);gl.deleteVertexArray(probeVao);
gl.deleteFramebuffer(fbo);gl.deleteTexture(depthTexture);
gl.deleteBuffer(vbo);gl.deleteVertexArray(vao);gl.deleteProgram(program);
