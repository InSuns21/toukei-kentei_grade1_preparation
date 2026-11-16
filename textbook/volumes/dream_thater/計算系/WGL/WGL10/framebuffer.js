// WGL10: render to an RGBA8 texture, then use it in a different framebuffer.
// Left half: unchanged texture. Right half: inverse RGB filter.
const invertRight = true; // try false to compare the two outputs
const offscreenScale = 1.0; // try 0.5 and observe nearest-texel sampling
if (![invertRight].every(v => typeof v === 'boolean') ||
    !Number.isFinite(offscreenScale) || offscreenScale <= 0 || offscreenScale > 1) {
  throw new RangeError('Invalid FBO lesson parameters');
}
function compile(type, source, stage) {
  const sh = gl.createShader(type);
  if (!sh) throw new Error(stage + ' createShader failed');
  gl.shaderSource(sh, source);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(sh) || 'no driver log';
    gl.deleteShader(sh);
    throw new Error(stage + ' compilation: ' + message);
  }
  return sh;
}
const vs = compile(gl.VERTEX_SHADER, vertexSource, 'VERTEX');
const fs = compile(gl.FRAGMENT_SHADER, fragmentSource, 'FRAGMENT');
const program = gl.createProgram();
if (!program) throw new Error('createProgram failed');
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
if (uPass === null || uScene === null) throw new Error('Missing shader uniform');
gl.uniform1i(uScene, 0);
const vao = gl.createVertexArray();
const buffer = gl.createBuffer();
if (!vao || !buffer) throw new Error('Cannot create quad geometry');
gl.bindVertexArray(vao);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -1,-1,  1,-1, -1, 1,
  -1, 1,  1,-1,  1, 1
]), gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
gl.disable(gl.DEPTH_TEST);
gl.disable(gl.BLEND);
gl.disable(gl.DITHER);
gl.disable(gl.SCISSOR_TEST);
gl.disable(gl.CULL_FACE);
const leftWidth = Math.floor(canvas.width / 2);
const rightWidth = canvas.width - leftWidth;
const textureWidth = Math.max(1, Math.floor(leftWidth * offscreenScale));
const textureHeight = Math.max(1, Math.floor(canvas.height * offscreenScale));
const colorTexture = gl.createTexture();
const fbo = gl.createFramebuffer();
if (!colorTexture || !fbo) throw new Error('Cannot allocate framebuffer resources');
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
report('FBO', 'FRAMEBUFFER_COMPLETE, RGBA8 ' + textureWidth + 'x' + textureHeight);
// Pass 1. The attachment is a drawing target, not a sampler in this pass.
gl.bindTexture(gl.TEXTURE_2D, null);
gl.viewport(0, 0, textureWidth, textureHeight);
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.uniform1i(uPass, 0);
gl.drawArrays(gl.TRIANGLES, 0, 6);
const intermediate = new Uint8Array(4);
gl.readPixels(Math.floor(textureWidth / 4), Math.floor(textureHeight / 4),
              1, 1, gl.RGBA, gl.UNSIGNED_BYTE, intermediate);
report('PASS1', 'offscreen lower-left quarter RGBA=' + Array.from(intermediate).join(','));
// Pass 2. Unbind the drawing FBO BEFORE sampling its former attachment.
// Never sample an image simultaneously attached to the active drawing FBO.
gl.bindFramebuffer(gl.FRAMEBUFFER, null);
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, colorTexture);
gl.clearColor(0, 0, 0, 1);
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.viewport(0, 0, leftWidth, canvas.height);
gl.uniform1i(uPass, 1); // copy, first half of the default framebuffer
gl.drawArrays(gl.TRIANGLES, 0, 6);
gl.viewport(leftWidth, 0, rightWidth, canvas.height);
gl.uniform1i(uPass, invertRight ? 2 : 1);
gl.drawArrays(gl.TRIANGLES, 0, 6);
gl.flush();
report('PASS2', 'default framebuffer: left=copy, right=' +
  (invertRight ? 'RGB inverse' : 'copy'));
report('RESIZE', 'canvas=' + canvas.width + 'x' + canvas.height +
  ', offscreen=' + textureWidth + 'x' + textureHeight +
  '; rebuilt per run, viewport switched on each pass');
report('SAMPLING', 'NEAREST, CLAMP_TO_EDGE; no mipmaps / no depth attachment');
gl.bindTexture(gl.TEXTURE_2D, null);
gl.deleteFramebuffer(fbo);
gl.deleteTexture(colorTexture);
gl.deleteBuffer(buffer);
gl.deleteVertexArray(vao);
gl.deleteProgram(program);
