// WGL12: real WebGL2 GGX + four independently computed Fresnel probes.
// Change these three roughness/metallic values; each column is one sphere.
const roughness = [0.16, 0.55, 0.32]; // (0,1]; try 0.1 / 0.8
const metallic = [0.0, 0.0, 1.0];    // [0,1]; try 0 / 0.5 / 1
const baseColor = [0.80, 0.30, 0.10]; // linear RGB components in [0,1]
if (roughness.length !== 3 || metallic.length !== 3 ||
    baseColor.length !== 3 ||
    roughness.some(v => !Number.isFinite(v) || v < 0.08 || v > 1) ||
    metallic.some(v => !Number.isFinite(v) || v < 0 || v > 1) ||
    baseColor.some(v => !Number.isFinite(v) || v < 0 || v > 1)) {
  throw new RangeError('Expected three roughness in [0.08,1], three metallic in [0,1], and linear RGB in [0,1].');
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
const res = uniform('u_resolution');
const base = uniform('u_baseColor');
const rough = uniform('u_roughness[0]');
const metal = uniform('u_metallic[0]');
const probe = uniform('u_probe');
const light = uniform('u_lightDirection');
const initialLight=[0.40,0.55,1.0];
gl.uniform3fv(light,new Float32Array(initialLight));
gl.uniform2f(res, canvas.width, canvas.height);
gl.uniform3fv(base, new Float32Array(baseColor));
gl.uniform1fv(rough, new Float32Array(roughness));
gl.uniform1fv(metal, new Float32Array(metallic));
gl.disable(gl.BLEND);
gl.disable(gl.DITHER);
gl.disable(gl.DEPTH_TEST);
gl.disable(gl.SCISSOR_TEST);
const vertices = new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]);
const vao = gl.createVertexArray();
const vbo = gl.createBuffer();
if (!vao || !vbo) throw new Error('Could not allocate VAO/VBO');
gl.bindVertexArray(vao);
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
// The visible spheres are a direct shader evaluation of the BRDF.
gl.viewport(0, 0, canvas.width, canvas.height);
gl.uniform1i(probe, 0);
gl.drawArrays(gl.TRIANGLES, 0, 6);
report('MATERIALS', 'left: ' + roughness[0] + '/' + metallic[0] +
  '; middle: ' + roughness[1] + '/' + metallic[1] +
  '; right: ' + roughness[2] + '/' + metallic[2] +
  ' (roughness/metallic).');
report('LIGHT', 'orthographic view V=(0,0,1), L=normalize(0.40,0.55,1); integrated directional-light weight J=1 (radiance times solid angle).');
// Separate diagnostic pass: four bottom-left RGBA8 pixels, linear Fresnel F.
// Expected independent arithmetic: F(1)=F0; F(0.5)=F0+(1-F0)/32.
gl.viewport(0, 0, 4, 1);
gl.uniform1i(probe, 1);
gl.drawArrays(gl.TRIANGLES, 0, 6);
gl.finish();
const pixels = new Uint8Array(16);
gl.readPixels(0, 0, 4, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
const err = gl.getError();
if (err !== gl.NO_ERROR) throw new Error('GL error: 0x' + err.toString(16));
const f0Dielectric = 0.04;
const f0MetalRed = baseColor[0];
const expected = [f0Dielectric, f0Dielectric + (1 - f0Dielectric) / 32,
                  f0MetalRed, f0MetalRed + (1 - f0MetalRed) / 32];
const actual = [0, 1, 2, 3].map(i => pixels[4 * i] / 255);
const maxError = Math.max(...actual.map((v, i) => Math.abs(v - expected[i])));
report('CPU REFERENCE', 'F red (dielectric cos=1/0.5, metal cos=1/0.5): ' +
  expected.map(v => v.toFixed(6)).join(', '));
report('GPU READBACK', actual.map(v => v.toFixed(6)).join(', ') +
  '; max abs error=' + maxError.toFixed(6));
report('CHECK', maxError <= 2/255 ? 'PASS: 4/4 Fresnel probes within 2/255' :
  'FAIL: GPU/CPU Fresnel disagreement');
report('SCOPE', 'Fresnel probes test F only; they do NOT prove GGX energy conservation or browser pixel appearance.');

// The initial CPU/GPU Fresnel probes above are a deterministic snapshot.
// Only AFTER that pass do we animate the *same editable* GGX shader.
// Probe mode and existing pixel oracles never depend on this moving light.
// The program/buffers live until the opaque sandbox iframe is disposed.
if(typeof window!=='undefined'&&typeof requestAnimationFrame==='function'){
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
  let playing=!reduced,stamp=null,phase=0,raf=0;
  canvas.tabIndex=0;
  canvas.title='WGL12 光源の往復：Space/Enterで再生・一時停止。初期画素検算は動く前の4点です。';
  canvas.setAttribute('aria-label','WGL12 GGX材質の3球。Spaceで光源を再生または停止');
  canvas.addEventListener('keydown',event=>{
    if(event.key===' '||event.key==='Enter'){
      event.preventDefault();playing=!playing;stamp=null;
    }
  });
  function drawMovingMaterial(a){
    const c=Math.cos(a),s=Math.sin(a);
    const x=c*initialLight[0]+s*initialLight[2],
      y=initialLight[1],z=-s*initialLight[0]+c*initialLight[2];
    gl.useProgram(program);gl.bindVertexArray(vao);
    gl.uniform3f(light,x,y,z);
    gl.uniform1i(probe,0);
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.drawArrays(gl.TRIANGLES,0,6);
  }
  function frame(t){
    if(playing&&!document.hidden){
      if(stamp===null)stamp=t;
      const delta=Math.min(.08,Math.max(0,(t-stamp)/1000));stamp=t;
      phase+=delta*.6;
      drawMovingMaterial(.60*Math.sin(phase));
    }else stamp=null;
    raf=requestAnimationFrame(frame);
  }
  raf=requestAnimationFrame(frame);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
}
