// WGL1: この JavaScript は隔離された iframe だけで実行されます。
// gl, canvas, vertexSource, fragmentSource, report はホストから渡されます。
function compile(kind, text, stage) {
  const shader = gl.createShader(kind);
  if (!shader) throw new Error(stage + ": シェーダの作成に失敗");
  gl.shaderSource(shader, text);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || "ログなし";
    gl.deleteShader(shader);
    throw new Error(stage + " shader compile: " + message);
  }
  return shader;
}
const vertex = compile(gl.VERTEX_SHADER, vertexSource, "VERTEX");
const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource, "FRAGMENT");
const program = gl.createProgram();
if (!program) throw new Error("プログラムの作成に失敗");
gl.attachShader(program, vertex);
gl.attachShader(program, fragment);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  throw new Error("LINK: " + (gl.getProgramInfoLog(program) || "ログなし"));
}
gl.deleteShader(vertex);
gl.deleteShader(fragment);

// 三角形の座標（clip座標 w=1 のためそのまま NDC）。
const coordinates = new Float32Array([
  -0.8, -0.8,
   0.8, -0.8,
   0.0,  0.8
]);
const vao = gl.createVertexArray();
gl.bindVertexArray(vao);
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, coordinates, gl.STATIC_DRAW);
const location = gl.getAttribLocation(program, "a_position");
if (location < 0) throw new Error("VERTEX の a_position が見つかりません");
gl.enableVertexAttribArray(location);
gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);

gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 3);
gl.flush();
report("DRAW", "gl.drawArrays(TRIANGLES, 0, 3) を実行しました");
