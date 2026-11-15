// WGL4: モデル空間のxy長方形と2本のローカル軸を、列ベクトル規約で変換する。
// gl, canvas, vertexSource, fragmentSource, report は隔離フレームから受け取る。
const tx = 0.25, ty = -0.10;
const angleDegrees = 90, scaleX = 1.0, scaleY = 0.5;
// 変換の順序: p_world = T * R * S * p_model（右から適用）。
function multiply4(a, b) {
  const c = new Float32Array(16);
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 4; row++) {
      for (let k = 0; k < 4; k++) c[4 * col + row] += a[4 * k + row] * b[4 * col + k];
    }
  }
  return c;
}
const rad = angleDegrees * Math.PI / 180;
const cc = Math.cos(rad), ss = Math.sin(rad);
const S = new Float32Array([
  scaleX,0,0,0, 0,scaleY,0,0, 0,0,1,0, 0,0,0,1
]);
const R = new Float32Array([
  cc,ss,0,0, -ss,cc,0,0, 0,0,1,0, 0,0,0,1
]);
const T = new Float32Array([
  1,0,0,0, 0,1,0,0, 0,0,1,0, tx,ty,0,1
]);
const model = multiply4(multiply4(T, R), S);
if (![tx,ty,angleDegrees,scaleX,scaleY].every(Number.isFinite) || scaleX === 0 || scaleY === 0) {
  throw new RangeError('座標と回転は有限値、逆変換にはscaleX/scaleYが非零で必要です');
}
function compile(kind, source, stage) {
  const shader = gl.createShader(kind);
  if (!shader) throw new Error(stage + ': createShader失敗');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) || 'ログなし';
    gl.deleteShader(shader);
    throw new Error(stage + ' compile: ' + log);
  }
  return shader;
}
const vertex = compile(gl.VERTEX_SHADER, vertexSource, 'VERTEX');
const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource, 'FRAGMENT');
const program = gl.createProgram();
if (!program) throw new Error('createProgram失敗');
gl.attachShader(program, vertex);
gl.attachShader(program, fragment);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  throw new Error('LINK: ' + (gl.getProgramInfoLog(program) || 'ログなし'));
}
gl.deleteShader(vertex); gl.deleteShader(fragment);

// モデル空間にある四角形: (A,B,C,D)。前講の添字メッシュを使う。
const corners = new Float32Array([
  -0.4,-0.3,0, 0.4,-0.3,0, 0.4,0.3,0, -0.4,0.3,0
]);
const elements = new Uint16Array([0,1,2,0,2,3]);
// 原点から伸びるx軸・y軸の線分（描画時に同じモデル行列で変換）。
const axis = new Float32Array([
  0,0,0, 0.65,0,0, 0,0,0, 0,0.65,0
]);
const vao = gl.createVertexArray(), vbo = gl.createBuffer(), ebo = gl.createBuffer();
const axisVao = gl.createVertexArray(), axisVbo = gl.createBuffer();
if (![vao,vbo,ebo,axisVao,axisVbo].every(Boolean)) throw new Error('buffer/VAOの確保失敗');
gl.bindVertexArray(vao);
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, corners, gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 12, 0);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, elements, gl.STATIC_DRAW);
gl.bindVertexArray(axisVao);
gl.bindBuffer(gl.ARRAY_BUFFER, axisVbo);
gl.bufferData(gl.ARRAY_BUFFER, axis, gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 12, 0);

gl.useProgram(program);
const modelLocation = gl.getUniformLocation(program, 'u_model');
const colorLocation = gl.getUniformLocation(program, 'u_color');
if (modelLocation === null || colorLocation === null) throw new Error('uniformの宣言が不一致です');
gl.uniformMatrix4fv(modelLocation, false, model); // transpose=false、列優先格納
gl.viewport(0, 0, canvas.width, canvas.height);
gl.disable(gl.DITHER); gl.disable(gl.BLEND); gl.disable(gl.DEPTH_TEST);
gl.disable(gl.CULL_FACE);
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.bindVertexArray(vao);
gl.uniform4f(colorLocation, 0.2, 0.6, 0.8, 1);
gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
gl.bindVertexArray(axisVao);
gl.uniform4f(colorLocation, 1, 0.25, 0.25, 1); // x軸は赤
gl.drawArrays(gl.LINES, 0, 2);
gl.uniform4f(colorLocation, 0.3, 1, 0.3, 1);  // y軸は緑
gl.drawArrays(gl.LINES, 2, 2);
gl.flush();
// CPU診断は行列の列ベクトル演算、GPUの画素判定は別の参照モデルで行う。
function apply(m, p) {
  return [m[0]*p[0]+m[4]*p[1]+m[12], m[1]*p[0]+m[5]*p[1]+m[13]];
}
report('MATRIX', '列優先: T*R*S、tx=' + tx + ' ty=' + ty +
  ' angle=' + angleDegrees + ' sx=' + scaleX + ' sy=' + scaleY);
for (let k = 0; k < 4; k++) {
  const p = [corners[3*k], corners[3*k+1]];
  const q = apply(model, p);
  report('VERTEX ' + 'ABCD'[k], p.map(x=>x.toFixed(2)).join(',') + ' -> ' +
    q.map(x=>x.toFixed(3)).join(','));
}
