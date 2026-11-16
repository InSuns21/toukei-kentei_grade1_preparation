// WGL8: two viewports, same sRGB input swatches and source-over order.
// Left: ordinary RGBA8 fixed-function blending of encoded components.
// Right: explicit decode -> linear-light source-over -> encode, no GL blending.
const background = [0.2, 0.2, 0.2, 1.0];
const layerA = [0.8, 0.2, 0.1, 0.5];
const layerB = [0.1, 0.3, 0.9, 0.4];
const reverseOrder = false; // Change to true to draw B before A.
for (const color of [background, layerA, layerB]) {
  if (!Array.isArray(color) || color.length !== 4 ||
      !color.every(v => Number.isFinite(v) && v >= 0 && v <= 1)) {
    throw new RangeError('All RGBA channels must be finite numbers in [0,1]');
  }
}
function compile(type, source, stage) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error(stage + ': createShader failed');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
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
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  throw new Error('LINK: ' + (gl.getProgramInfoLog(program) || 'no log'));
}
gl.deleteShader(vs);
gl.deleteShader(fs);
const vao = gl.createVertexArray();
const buffer = gl.createBuffer();
if (!vao || !buffer) throw new Error('VAO or buffer creation failed');
gl.bindVertexArray(vao);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
gl.enableVertexAttribArray(1);
gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);
gl.useProgram(program);
function uniform(name) {
  const location = gl.getUniformLocation(program, name);
  if (location === null) throw new Error('missing uniform: ' + name);
  return location;
}
const uMode = uniform('u_mode');
const uDrawColor = uniform('u_drawColor');
const uBackground = uniform('u_background');
const uLayerA = uniform('u_layerA');
const uLayerB = uniform('u_layerB');
const uReverse = uniform('u_reverse');
gl.uniform4fv(uBackground, background);
gl.uniform4fv(uLayerA, layerA);
gl.uniform4fv(uLayerB, layerB);
gl.uniform1i(uReverse, reverseOrder ? 1 : 0);
gl.disable(gl.DITHER);
gl.disable(gl.DEPTH_TEST);
gl.disable(gl.CULL_FACE);
gl.disable(gl.SCISSOR_TEST);
gl.disable(gl.BLEND);
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
function rectangle(x0, y0, x1, y1) {
  // x/y live in [0,1] of the current viewport; uv matches the screen.
  const verts = new Float32Array([
    2*x0-1, 2*y0-1, x0,y0, 2*x1-1, 2*y0-1, x1,y0, 2*x0-1, 2*y1-1, x0,y1,
    2*x0-1, 2*y1-1, x0,y1, 2*x1-1, 2*y0-1, x1,y0, 2*x1-1, 2*y1-1, x1,y1
  ]);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, verts, gl.DYNAMIC_DRAW);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}
function drawLayer(rgba, bounds) {
  gl.uniform4fv(uDrawColor, rgba);
  rectangle(...bounds);
}
const aBounds = [0.1, 0.2, 0.75, 0.85];
const bBounds = [0.4, 0.4, 0.9, 0.75];
const layers = reverseOrder ?
  [[layerB, bBounds], [layerA, aBounds]] :
  [[layerA, aBounds], [layerB, bBounds]];
const leftWidth = Math.floor(canvas.width / 2);
gl.viewport(0, 0, leftWidth, canvas.height);
gl.uniform1i(uMode, 0);
drawLayer(background, [0, 0, 1, 1]); // opaque background
gl.enable(gl.BLEND);
gl.blendEquation(gl.FUNC_ADD);
gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,
                     gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
for (const [color, bounds] of layers) drawLayer(color, bounds);
gl.disable(gl.BLEND);
gl.viewport(leftWidth, 0, canvas.width-leftWidth, canvas.height);
gl.uniform1i(uMode, 1);
rectangle(0, 0, 1, 1); // single full-viewport linear-light evaluation
gl.flush();
report('WGL8', 'left=encoded fixed-function blend; right=linear-light shader');
report('LAYERS', 'background=[0.2,0.2,0.2]; A alpha=0.5; B alpha=0.4');
report('ORDER', reverseOrder ? 'B then A' : 'A then B');
report('STATE', 'blendFuncSeparate SRC_ALPHA/ONE_MINUS_SRC_ALPHA, ONE/ONE_MINUS_SRC_ALPHA; alpha:false');
report('SPACE', 'right decodes sRGB RGB only; alpha is not gamma-decoded');
