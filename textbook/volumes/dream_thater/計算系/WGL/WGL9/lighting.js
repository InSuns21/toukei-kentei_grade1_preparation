// WGL9. Left: flat-shaded cube; right: smoothly shaded sphere.
// Change the scale and switch useCorrectNormals to see why M^(-T) matters.
const scale = [1.25, 0.75, 1.0];
const rotationYDegrees = 30;
const useCorrectNormals = true;
const lightDirection = [0.6, 0.2, Math.sqrt(0.6)];
const lightPower = 1.0; // set to 0 for a zero-light test
const shininess = 16;
const showNormals = false; // display encoded normal components instead of light
if (scale.length !== 3 || scale.some(x => !Number.isFinite(x) || x <= 0) ||
    !Number.isFinite(rotationYDegrees) ||
    lightDirection.length !== 3 ||
    lightDirection.some(x => !Number.isFinite(x)) ||
    Math.hypot(...lightDirection) < 1e-8 ||
    Math.hypot(lightDirection[0], lightDirection[1],
               lightDirection[2] + Math.hypot(...lightDirection)) < 1e-8 ||
    !Number.isFinite(lightPower) || lightPower < 0 || lightPower > 2 ||
    !Number.isFinite(shininess) || shininess < 1 || shininess > 128) {
  throw new RangeError('Invalid model/lighting parameters');
}
function compile(stage, src, label) {
  const shader = gl.createShader(stage);
  if (!shader) throw new Error(label + ' createShader failed');
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) || 'unknown error';
    gl.deleteShader(shader);
    throw new Error(label + ' shader compilation: ' + log);
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
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  throw new Error('LINK: ' + (gl.getProgramInfoLog(program) || 'unknown error'));
}
gl.deleteShader(vs);
gl.deleteShader(fs);
gl.useProgram(program);
function loc(name) {
  const at = gl.getUniformLocation(program, name);
  if (at === null) throw new Error('Missing uniform ' + name);
  return at;
}
// Column-major 3x3 matrix for R_y(theta) * diag(sx,sy,sz).
const theta = rotationYDegrees * Math.PI / 180;
const c = Math.cos(theta), s = Math.sin(theta);
function rotationScale(a,b,d) {
  return new Float32Array([c*a,0,-s*a, 0,b,0, s*d,0,c*d]);
}
gl.uniformMatrix3fv(loc('u_model'), false, rotationScale(...scale));
gl.uniformMatrix3fv(loc('u_normalMatrix'), false,
  useCorrectNormals ? rotationScale(...scale.map(x => 1/x)) :
                      rotationScale(...scale));
gl.uniform3fv(loc('u_lightDirection'), lightDirection);
gl.uniform1f(loc('u_lightPower'), lightPower);
gl.uniform1f(loc('u_shininess'), shininess);
gl.uniform1i(loc('u_showNormals'), showNormals ? 1 : 0);
gl.disable(gl.CULL_FACE);
gl.disable(gl.BLEND);
gl.disable(gl.DITHER);
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LESS);
gl.clearDepth(1.0);
gl.clearColor(0.02, 0.025, 0.04, 1.0);
const vao = gl.createVertexArray(), buffer = gl.createBuffer();
if (!vao || !buffer) throw new Error('VAO/buffer creation failed');
gl.bindVertexArray(vao);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
gl.enableVertexAttribArray(1);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);
// One vertex = position (xyz) and object-space normal (xyz).
function pushVertex(out, p, n) {
  out.push(...p, ...n);
}
function cubeVertices() {
  const out = [], half = 0.6;
  const faces = [
    [[0,0,1],  [1,0,0],  [0,1,0]],
    [[0,0,-1], [-1,0,0], [0,1,0]],
    [[1,0,0],  [0,0,-1], [0,1,0]],
    [[-1,0,0], [0,0,1],  [0,1,0]],
    [[0,1,0],  [1,0,0],  [0,0,-1]],
    [[0,-1,0], [1,0,0],  [0,0,1]],
  ];
  for (const [n,u,v] of faces) {
    const point = (a,b) => n.map((t,i) => half*(t+a*u[i]+b*v[i]));
    const p0=point(-1,-1), p1=point(1,-1);
    const p2=point(1,1), p3=point(-1,1);
    for (const p of [p0,p1,p2,p0,p2,p3]) pushVertex(out,p,n);
  }
  return new Float32Array(out);
}
function sphereVertices() {
  const out=[], latitudeSteps=48, longitudeSteps=72, radius=0.65;
  function vertex(phi,theta) {
    const n=[Math.sin(phi)*Math.cos(theta),
             Math.sin(phi)*Math.sin(theta), Math.cos(phi)];
    return {point:n.map(a=>radius*a), normal:n};
  }
  for (let row=0; row<latitudeSteps; row++) {
    const a=Math.PI*row/latitudeSteps, b=Math.PI*(row+1)/latitudeSteps;
    for(let col=0; col<longitudeSteps; col++) {
      const c=2*Math.PI*col/longitudeSteps, d=2*Math.PI*(col+1)/longitudeSteps;
      const p=vertex(a,c), q=vertex(b,c), r=vertex(b,d), t=vertex(a,d);
      for(const v of [p,q,r,p,r,t]) pushVertex(out,v.point,v.normal);
    }
  }
  return new Float32Array(out);
}
const meshes=[
  {array:cubeVertices(), base:[0.1,0.45,0.75]},
  {array:sphereVertices(),base:[0.65,0.20,0.08]}
];
const leftWidth = Math.floor(canvas.width/2);
for (let i=0; i<2; i++) {
  const x=i===0 ? 0 : leftWidth;
  const w=i===0 ? leftWidth : canvas.width-leftWidth;
  gl.viewport(x,0,w,canvas.height);
  gl.scissor(x,0,w,canvas.height);
  gl.enable(gl.SCISSOR_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.uniform3fv(loc('u_baseColor'),meshes[i].base);
  gl.bufferData(gl.ARRAY_BUFFER,meshes[i].array,gl.STATIC_DRAW);
  gl.drawArrays(gl.TRIANGLES,0,meshes[i].array.length/6);
}
gl.disable(gl.SCISSOR_TEST);
gl.flush();
report('WGL9', 'left=cube flat normals, right=sphere interpolated normals');
report('MODEL', 'R_y(' + rotationYDegrees + 'deg) * S(' + scale.join(',') + ')');
report('NORMAL', useCorrectNormals ? 'inverse transpose (correct)' : 'M (intentionally wrong)');
report('LIGHT', 'direction=' + lightDirection.join(',') + ', power=' + lightPower +
  ', shininess=' + shininess);
report('SPACE', 'linear-light Lambert/Blinn-Phong, manual sRGB encode, alpha=1');
report('MESH', 'cube=12 triangles, sphere=' + (48*72*2) + ' triangles');


// Source-linked observation: the exact original shader, meshes, material and
// user-edited constants are retained; only the directional light orbits after
// the isolated runner has sampled the initial frame for CPU/GPU validation.
const wgl9Reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let wgl9Playing=!wgl9Reduced.matches,wgl9Stamp=null,wgl9Phase=0;
canvas.tabIndex=0;
canvas.setAttribute('aria-label','WGL9 ライトの往復アニメーション。クリック・Spaceで一時停止と再生');
canvas.title='クリック／Space：ライトの再生・停止（GPU検算値は時刻0の静止画）';
function wgl9Toggle(){wgl9Playing=!wgl9Playing;wgl9Stamp=null;}
canvas.addEventListener('click',wgl9Toggle);
canvas.addEventListener('keydown',e=>{
  if(e.key===' '||e.key==='Enter'){e.preventDefault();wgl9Toggle();}
});
const wgl9LightLoc=loc('u_lightDirection');
const wgl9Base=[...lightDirection];
function wgl9Draw(phase){
  const a=.8*Math.sin(phase),ca=Math.cos(a),sa=Math.sin(a);
  const orbit=[ca*wgl9Base[0]+sa*wgl9Base[2],wgl9Base[1],
               -sa*wgl9Base[0]+ca*wgl9Base[2]];
  gl.useProgram(program);
  gl.uniform3fv(wgl9LightLoc,orbit);
  gl.bindVertexArray(vao);
  for(let i=0;i<2;i++){
    const x=i===0?0:leftWidth,w=i===0?leftWidth:canvas.width-leftWidth;
    gl.viewport(x,0,w,canvas.height);
    gl.scissor(x,0,w,canvas.height);gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.uniform3fv(loc('u_baseColor'),meshes[i].base);
    gl.bufferData(gl.ARRAY_BUFFER,meshes[i].array,gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES,0,meshes[i].array.length/6);
  }
  gl.disable(gl.SCISSOR_TEST);
}
function wgl9Frame(now){
  if(wgl9Playing&&!document.hidden){
    if(wgl9Stamp===null)wgl9Stamp=now;
    const delta=Math.min(.08,Math.max(0,(now-wgl9Stamp)/1000));
    wgl9Stamp=now;wgl9Phase+=delta*.8;wgl9Draw(wgl9Phase);
  }else wgl9Stamp=null;
  requestAnimationFrame(wgl9Frame);
}
requestAnimationFrame(wgl9Frame);
