// WGL10: the same editable GLSL draws a scene into RGBA8, then samples it.
// Display: direct scene | the FBO's saved image | a filtered FBO image.
const offscreenScale = 1; // 0.5, 0.75, 1: texture pixels / output pixels
const filterMode = 'invert'; // invert | grayscale | copy
const inspectionPass = 'all'; // all | scene | texture | processed
if (!Number.isFinite(offscreenScale) || offscreenScale < 0.5 || offscreenScale > 1 ||
    !['invert', 'grayscale', 'copy'].includes(filterMode) ||
    !['all', 'scene', 'texture', 'processed'].includes(inspectionPass)) {
  throw new RangeError('Invalid WGL10 parameters');
}
function compile(type, source, stage) {
  const sh = gl.createShader(type);
  if (!sh) throw new Error(stage + ': shader allocation failed');
  gl.shaderSource(sh, source);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh) || 'no driver log';
    gl.deleteShader(sh);
    throw new Error(stage + ': ' + log);
  }
  return sh;
}
const vs = compile(gl.VERTEX_SHADER, vertexSource, 'VERTEX');
const fs = compile(gl.FRAGMENT_SHADER, fragmentSource, 'FRAGMENT');
const program = gl.createProgram();
if (!program) throw new Error('Program allocation failed');
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  throw new Error('LINK: ' + (gl.getProgramInfoLog(program) || 'no driver log'));
}
gl.deleteShader(vs);
gl.deleteShader(fs);
gl.useProgram(program);
const uPass = gl.getUniformLocation(program, 'u_pass');
const uScene = gl.getUniformLocation(program, 'u_scene');
if (uPass === null || uScene === null) throw new Error('u_pass/u_scene not found');
gl.uniform1i(uScene, 0);

const vao = gl.createVertexArray();
const buffer = gl.createBuffer();
if (!vao || !buffer) throw new Error('Fullscreen quad allocation failed');
gl.bindVertexArray(vao);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -1, -1,  1, -1, -1, 1,
  -1,  1,  1, -1,  1, 1
]), gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
gl.disable(gl.DEPTH_TEST);
gl.disable(gl.BLEND);
gl.disable(gl.DITHER);
gl.disable(gl.SCISSOR_TEST);
gl.disable(gl.CULL_FACE);

const panelWidth = Math.floor(canvas.width / 3);
const finalWidth = canvas.width - 2 * panelWidth;
const textureWidth = Math.max(1, Math.floor(panelWidth * offscreenScale));
const textureHeight = Math.max(1, Math.floor(canvas.height * offscreenScale));
const colorTexture = gl.createTexture();
const fbo = gl.createFramebuffer();
if (!colorTexture || !fbo) throw new Error('Color attachment/FBO allocation failed');

gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, colorTexture);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, textureWidth, textureHeight, 0,
              gl.RGBA, gl.UNSIGNED_BYTE, null);
gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
                        gl.TEXTURE_2D, colorTexture, 0);
const completeness = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
if (completeness !== gl.FRAMEBUFFER_COMPLETE) {
  throw new Error('FBO INCOMPLETE 0x' + completeness.toString(16));
}
report('FBO', 'FRAMEBUFFER_COMPLETE / RGBA8 ' + textureWidth + 'x' + textureHeight +
  ' texels / NEAREST / CLAMP_TO_EDGE');

// Pass A: write into the offscreen color texture.
// No sampling from the image being written.
gl.bindTexture(gl.TEXTURE_2D, null);
gl.viewport(0, 0, textureWidth, textureHeight);
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.uniform1i(uPass, 0);
gl.drawArrays(gl.TRIANGLES, 0, 6);
const intermediate = new Uint8Array(4);
gl.readPixels(Math.floor(textureWidth / 4), Math.floor(textureHeight / 4),
              1, 1, gl.RGBA, gl.UNSIGNED_BYTE, intermediate);
report('PASS A', 'scene shader → FBO; sample near 1/4,1/4 = ' +
  Array.from(intermediate).join('/'));

// Pass B: switch drawing target before sampling the former attachment.
gl.bindFramebuffer(gl.FRAMEBUFFER, null);
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, colorTexture);
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
const processedPass = filterMode === 'invert' ? 2 : filterMode === 'grayscale' ? 3 : 1;
function drawView(x, width, pass) {
  gl.viewport(x, 0, width, canvas.height);
  gl.uniform1i(uPass, pass);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}
if (inspectionPass === 'all') {
  // Left: direct reference (same source shader, but no intermediate RGBA8).
  // Center: stored FBO image; right: filter applied to that exact image.
  drawView(0, panelWidth, 0);
  drawView(panelWidth, panelWidth, 1);
  drawView(2 * panelWidth, finalWidth, processedPass);
  // Two slim dividers follow the *actual viewport* boundaries; they do not
  // fabricate results or cover any of the 12 reference pixels.
  gl.enable(gl.SCISSOR_TEST);
  gl.clearColor(0.96, 0.97, 0.99, 1.0);
  for (const boundary of [panelWidth, 2 * panelWidth]) {
    gl.scissor(Math.max(0, boundary - 1), 0, 2, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
  gl.disable(gl.SCISSOR_TEST);
} else {
  drawView(0, canvas.width, {
    scene: 0, texture: 1, processed: processedPass
  }[inspectionPass]);
}
gl.flush();
report('PASS B', 'canvas=' + canvas.width + 'x' + canvas.height +
  '; stages=' + inspectionPass + '; post=' + filterMode);
report('DIMENSIONS', 'reference viewport=' + panelWidth + 'x' + canvas.height +
  '; color attachment=' + textureWidth + 'x' + textureHeight +
  '; view width=' + (inspectionPass === 'all' ? panelWidth : canvas.width));
report('RULE', 'FBO detached before sampling; direct/reference and FBO share u_pass=0 GLSL');
gl.bindTexture(gl.TEXTURE_2D, null);
gl.deleteFramebuffer(fbo);
gl.deleteTexture(colorTexture);
gl.deleteBuffer(buffer);
gl.deleteVertexArray(vao);
gl.deleteProgram(program);
