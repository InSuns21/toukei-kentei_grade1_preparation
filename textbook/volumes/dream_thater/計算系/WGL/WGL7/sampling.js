// WGL7: two viewports share a generated, local 8x8 checkerboard.
// Left: NEAREST without mipmaps. Right: LINEAR_MIPMAP_LINEAR.
// Change to 'data' to inspect a 4x4 RGBA data texture instead.
const textureKind = 'checker'; // 'checker' or 'data'
const repeats = 128;           // 1 magnifies; 128 strongly minifies
const wrapMode = 'repeat';      // 'repeat', 'clamp', or 'mirror'
const leftMinFilter = 'nearest'; // 'nearest' or 'linear'
const rightMinFilter = 'mipmap'; // 'mipmap', 'nearest', or 'linear'
const offset = [0.017125, 0.0365]; // non-boundary probe coordinates
if (!['checker','data'].includes(textureKind) ||
    !['repeat','clamp','mirror'].includes(wrapMode) ||
    !['nearest','linear'].includes(leftMinFilter) ||
    !['mipmap','nearest','linear'].includes(rightMinFilter) ||
    !(Number.isFinite(repeats) && repeats > 0 && repeats <= 256)) {
  throw new RangeError('invalid texture experiment settings');
}
const size = textureKind === 'checker' ? 8 : 4;
const pixels = new Uint8Array(size * size * 4);
for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
  const at = 4 * (y * size + x);
  if (textureKind === 'checker') {
    const gray = ((x + y) % 2) ? 224 : 32;
    pixels.set([gray, gray, gray, 255], at);
  } else {
    // Unsigned RGBA8: data are quantized to bytes before upload.
    pixels.set([Math.round(255*x/(size-1)),
                Math.round(255*y/(size-1)),64,255], at);
  }
}
function compile(type, source, stage) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error(stage + ': createShader failed');
  gl.shaderSource(shader, source); gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) || 'no log';
    gl.deleteShader(shader);
    throw new Error(stage + ' compile: ' + log);
  }
  return shader;
}
const vs = compile(gl.VERTEX_SHADER, vertexSource, 'VERTEX');
const fs = compile(gl.FRAGMENT_SHADER, fragmentSource, 'FRAGMENT');
const program = gl.createProgram();
if (!program) throw new Error('createProgram failed');
gl.attachShader(program, vs); gl.attachShader(program, fs);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  throw new Error('LINK: ' + (gl.getProgramInfoLog(program) || 'no log'));
}
gl.deleteShader(vs); gl.deleteShader(fs);
const vao = gl.createVertexArray(), buffer = gl.createBuffer();
const texture = gl.createTexture();
if (!vao || !buffer || !texture) throw new Error('WebGL resource creation failed');
gl.bindVertexArray(vao);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
// Two triangles cover the NDC square. UV is affine in screen space (w=1).
const quad = new Float32Array([
  -1,-1, 0,0,   1,-1, 1,0,  -1,1, 0,1,
  -1, 1, 0,1,   1,-1, 1,0,   1,1, 1,1
]);
gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
gl.enableVertexAttribArray(1);
gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, size, size, 0,
              gl.RGBA, gl.UNSIGNED_BYTE, pixels);
gl.generateMipmap(gl.TEXTURE_2D);
const wraps = {repeat:gl.REPEAT, clamp:gl.CLAMP_TO_EDGE, mirror:gl.MIRRORED_REPEAT};
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wraps[wrapMode]);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wraps[wrapMode]);
gl.useProgram(program);
const loc = name => {
  const l = gl.getUniformLocation(program, name);
  if (l === null) throw new Error('missing uniform ' + name);
  return l;
};
gl.uniform1i(loc('u_texture'), 0);
gl.uniform1f(loc('u_repeats'), repeats);
gl.uniform2f(loc('u_offset'), offset[0], offset[1]);
gl.disable(gl.BLEND); gl.disable(gl.DITHER);
gl.disable(gl.DEPTH_TEST); gl.disable(gl.CULL_FACE);
gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT);
const filters = {
  nearest:gl.NEAREST, linear:gl.LINEAR, mipmap:gl.LINEAR_MIPMAP_LINEAR
};
const leftWidth = Math.floor(canvas.width / 2);
const rightWidth = canvas.width - leftWidth;
for (const [x, width, filter] of [[0,leftWidth,leftMinFilter],
                                 [leftWidth,rightWidth,rightMinFilter]]) {
  gl.viewport(x,0,width,canvas.height);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filters[filter]);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER,
                   filter === 'nearest' ? gl.NEAREST : gl.LINEAR);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}
gl.flush();
report('WGL7', 'left='+leftMinFilter+', right='+rightMinFilter+
       ', texture='+textureKind+' '+size+'x'+size+', wrap='+wrapMode);
report('FOOTPRINT', 'repeat='+repeats+
       ', texels/pixel x(left)='+(size*repeats/leftWidth).toFixed(3)+
       ', y='+(size*repeats/canvas.height).toFixed(3));
report('UPLOAD', 'RGBA8/UNSIGNED_BYTE, UNPACK_ALIGNMENT=1; mipmap generated locally');
