// WGL2: gl, canvas, vertexSource, fragmentSource, report は隔離フレームから渡されます。
function compile(kind, source, stage) {
  const shader = gl.createShader(kind);
  if (!shader) throw new Error(stage + ": シェーダ作成失敗");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) || "ログなし";
    gl.deleteShader(shader);
    throw new Error(stage + " shader compile: " + log);
  }
  return shader;
}
const vertex = compile(gl.VERTEX_SHADER, vertexSource, "VERTEX");
const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource, "FRAGMENT");
const program = gl.createProgram();
if (!program) throw new Error("プログラム作成失敗");
gl.attachShader(program, vertex);
gl.attachShader(program, fragment);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  throw new Error("LINK: " + (gl.getProgramInfoLog(program) || "ログなし"));
}
gl.deleteShader(vertex);
gl.deleteShader(fragment);

// 1頂点=座標2個と色3個。位置と色は同じ頂点番号で対応します。
const vertices = new Float32Array([
  -0.8, -0.8, 1.0, 0.0, 0.0, // A: 赤
   0.8, -0.8, 0.0, 1.0, 0.0, // B: 緑
   0.0,  0.8, 0.0, 0.0, 1.0  // C: 青
]);
const vao = gl.createVertexArray();
if (!vao) throw new Error("VAO 作成失敗");
gl.bindVertexArray(vao);
const vbo = gl.createBuffer();
if (!vbo) throw new Error("VBO 作成失敗");
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// 5個のfloatが1頂点。stride=20 byte、色の開始offset=8 byte。
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 20, 0);
gl.enableVertexAttribArray(1);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 20, 8);

gl.useProgram(program);
const gain = gl.getUniformLocation(program, "u_gain");
if (gain === null) throw new Error("u_gain uniform が見つかりません");
gl.uniform3f(gain, 1.0, 1.0, 1.0);
gl.viewport(0, 0, canvas.width, canvas.height);
gl.disable(gl.DITHER);
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, 3);
gl.flush();
report("DRAW", "頂点色3組・uniform u_gain=(1,1,1)・drawArrays(3)");
