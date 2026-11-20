// WGL13: WebGL2 cube-map sampling and independent 12-pixel direction probes.
// Each 2x2 face has a different base hue and four different brightness levels.
const yawDegrees = 0; // try 90, -90, 180; rotates the sampling direction about Y
const fresnelF0 = 0.75; // display-only Schlick mix, not a rough-surface IBL integral
const faceColors = [
  [224,48,48], [48,224,48], [48,48,224],
  [224,224,48], [224,48,224], [48,224,224]
]; // +X, -X, +Y, -Y, +Z, -Z
const brightness = [0.55,0.70,0.85,1.0]; // texel order: lower-left, lower-right, upper-left, upper-right
if (!Number.isFinite(yawDegrees) || !Number.isFinite(fresnelF0) ||
    fresnelF0 < 0 || fresnelF0 > 1 || faceColors.length !== 6 ||
    faceColors.some(c => c.length !== 3 || c.some(v => !Number.isInteger(v) || v < 0 || v > 255))) {
  throw new RangeError('Require finite yaw, F0 in [0,1], and six RGB8 face colours');
}
function compile(type, source, stage) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error(stage + ': createShader failed');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) || 'no driver log';
    gl.deleteShader(shader);
    throw new Error(stage + ' compilation: ' + log);
  }
  return shader;
}
const vs = compile(gl.VERTEX_SHADER, vertexSource, 'VERTEX');
const fs = compile(gl.FRAGMENT_SHADER, fragmentSource, 'FRAGMENT');
const program = gl.createProgram();
if (!program) throw new Error('createProgram failed');
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS))
  throw new Error('LINK: ' + (gl.getProgramInfoLog(program) || 'no driver log'));
gl.deleteShader(vs);
gl.deleteShader(fs);
gl.useProgram(program);
function uniform(name) {
  const loc = gl.getUniformLocation(program, name);
  if (loc === null) throw new Error('Missing uniform: ' + name);
  return loc;
}
const env = gl.createTexture();
if (!env) throw new Error('createTexture failed');
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_CUBE_MAP, env);
gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
for (let face = 0; face < 6; face++) {
  const bytes = new Uint8Array(16);
  for (let cell = 0; cell < 4; cell++) {
    for (let channel = 0; channel < 3; channel++)
      bytes[4 * cell + channel] = Math.round(faceColors[face][channel] * brightness[cell]);
    bytes[4 * cell + 3] = 255;
  }
  // All six faces must have the same dimensions, format and mip level.
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, 0, gl.RGBA8,
    2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, bytes);
}
gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.uniform1i(uniform('u_env'), 0);
gl.uniform2f(uniform('u_resolution'), canvas.width, canvas.height);
gl.uniform1f(uniform('u_yaw'), yawDegrees * Math.PI / 180);
gl.uniform1f(uniform('u_fresnelF0'), fresnelF0);
// Six axis centres, then six off-axis lower-left texels in face-local UV.
// Not rotated by yaw: probe the cube-map orientation separately from the illustration.
const dirs = [
  [1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1],
  [1,0.5,0.5],[-1,0.5,-0.5],[-0.5,1,-0.5],
  [-0.5,-1,0.5],[-0.5,0.5,1],[0.5,0.5,-1]
];
gl.uniform3fv(uniform('u_probeDirections[0]'),new Float32Array(dirs.flat()));
const probe = uniform('u_probe');
gl.disable(gl.BLEND);
gl.disable(gl.DITHER);
gl.disable(gl.DEPTH_TEST);
gl.disable(gl.SCISSOR_TEST);
gl.disable(gl.CULL_FACE);
const vertices = new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);
const vao = gl.createVertexArray(), vbo = gl.createBuffer();
if (!vao || !vbo) throw new Error('createVertexArray/createBuffer failed');
gl.bindVertexArray(vao);
gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
gl.viewport(0,0,canvas.width,canvas.height);
gl.uniform1i(probe,0);
gl.drawArrays(gl.TRIANGLES,0,6);
gl.viewport(0,0,12,1);
gl.uniform1i(probe,1);
gl.drawArrays(gl.TRIANGLES,0,6);
gl.finish();
const readback = new Uint8Array(12 * 4);
gl.readPixels(0,0,12,1,gl.RGBA,gl.UNSIGNED_BYTE,readback);
const err=gl.getError();
if (err !== gl.NO_ERROR) throw new Error('GL error: 0x'+err.toString(16));
// CPU oracle: explicitly select the major axis, orient each cube face,
// then apply nearest-neighbour selection in face-local 2x2 texel coordinates.
function selectFace(d) {
  const [x,y,z]=d, a=Math.abs(x),b=Math.abs(y),c=Math.abs(z);
  if (a>=b && a>=c) return x>0?[0,-z/a,-y/a]:[1,z/a,-y/a];
  if (b>=a && b>=c) return y>0?[2,x/b,z/b]:[3,x/b,-z/b];
  return z>0?[4,x/c,-y/c]:[5,-x/c,-y/c];
}
const expected=dirs.map(d=>{
  const [face,sc,tc]=selectFace(d);
  const col=(sc+1)/2>=0.5?1:0, row=(tc+1)/2>=0.5?1:0;
  const factor=brightness[2*row+col];
  return [...faceColors[face].map(v=>Math.round(v*factor)),255];
});
const errors=expected.map((e,i)=>Math.max(...e.map((v,k)=>Math.abs(v-readback[4*i+k]))));
report('CUBE MAP', '6 RGBA8 2x2 faces; +X,-X,+Y,-Y,+Z,-Z; 4 brightness cells per face');
report('MATERIAL', 'yaw='+yawDegrees+' deg, F0='+fresnelF0+'; display is a single-direction illustration');
report('PROBES','6 axis + 6 off-axis probes. CPU predicted RGB: '+expected.map(e=>e.slice(0,3).join('/')).join(' | '));
report('GPU READBACK',Array.from({length:12},(_,i)=>Array.from(readback.slice(4*i,4*i+3)).join('/')).join(' | '));
report('CHECK', errors.every(e=>e<=1)?'PASS: all 12 cube-face/orientation probes within 1 byte':'FAIL: max channel errors '+errors.join(','));
report('SEAMS','NEAREST and deliberately different face colours can show sharp edges; this checks mapping, not seamless filtering.');

// Same six user-editable RGBA8 faces and the same reflection GLSL are reused.
// First all 12 raw-face probes were read synchronously (without yaw). Only
// THEN does the independent display angle change. No new environment model.
if(typeof window!=='undefined'&&typeof requestAnimationFrame==='function'){
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
  let playing=!reduced,phase=0,offsetAngle=0,last=0,raf=0,dragging=false,prevX=0;
  const originalAngle=yawDegrees*Math.PI/180,yawLocation=uniform('u_yaw');
  canvas.tabIndex=0;
  canvas.title='WGL13 キューブマップ参照を回す：Spaceで停止/再生、Shift+ドラッグまたは左右矢印で角度操作';
  canvas.setAttribute('aria-label','WGL13 同じキューブマップの反射と継ぎ目を回転観察。Space停止、矢印で角度変更');
  const note=document.createElement('output');
  note.setAttribute('aria-live','off');
  note.style.cssText='display:block;color:#c8eaff;margin:5px 0;font:13px system-ui';
  canvas.insertAdjacentElement('afterend',note);
  function paintEnvironment(){
    const animated=playing?.85*Math.sin(phase):0;
    const angle=originalAngle+offsetAngle+animated;
    gl.useProgram(program);gl.bindVertexArray(vao);
    gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_CUBE_MAP,env);
    gl.uniform1i(probe,0);gl.uniform1f(yawLocation,angle);
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.drawArrays(gl.TRIANGLES,0,6);
    note.textContent='環境参照の回転角 '+(angle*180/Math.PI).toFixed(1)+
      '°／左右矢印・Shift+ドラッグで操作／Spaceで'+(playing?'停止':'再生')+
      '／12画素のCPU/GPU検算は固定した6面の初期結果';
  }
  canvas.addEventListener('keydown',e=>{
    if(e.key===' '||e.key==='Enter'){
      e.preventDefault();playing=!playing;last=0;paintEnvironment();
    }else if(e.key==='ArrowLeft'||e.key==='ArrowRight'){
      e.preventDefault();playing=false;last=0;
      offsetAngle+=(e.key==='ArrowRight'?1:-1)*Math.PI/18;
      paintEnvironment();
    }
  });
  canvas.addEventListener('pointerdown',e=>{
    if(e.pointerType!=='touch'&&!e.shiftKey)return;
    e.preventDefault();dragging=true;prevX=e.clientX;playing=false;last=0;
    canvas.setPointerCapture?.(e.pointerId);
  });
  canvas.addEventListener('pointermove',e=>{
    if(!dragging)return;
    const width=Math.max(1,canvas.getBoundingClientRect().width);
    offsetAngle+=(e.clientX-prevX)*Math.PI/width;
    prevX=e.clientX;paintEnvironment();
  });
  const release=()=>{dragging=false;};
  canvas.addEventListener('pointerup',release);
  canvas.addEventListener('pointercancel',release);
  function frame(t){
    if(playing&&!document.hidden){
      if(!last)last=t;
      const delta=Math.min(.08,Math.max(0,(t-last)/1000));
      if(delta>=1/30){last=t;phase+=delta*.9;paintEnvironment();}
    }else last=0;
    raf=requestAnimationFrame(frame);
  }
  raf=requestAnimationFrame(frame);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
  note.textContent='環境参照方向のみを回転します。Spaceで一時停止、Shift+ドラッグ・左右矢印で角度調整';
}
// GPU program/VAO/texture live until sandbox disposal, so rAF can draw.
// All resources are released with the opaque sandbox iframe upon Stop.
