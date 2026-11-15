// WGL3: gl, canvas, vertexSource, fragmentSource, report は隔離フレームから渡される。
// gridSteps と drawMode を変更し、同じ正方形の描画結果を比較する。
const gridSteps = 2; // 1〜64 の整数
const drawMode = 'elements'; // 'elements' (共有) または 'arrays' (展開)
if (!Number.isInteger(gridSteps) || gridSteps < 1 || gridSteps > 64) {
  throw new RangeError('gridSteps は1〜64の整数にしてください');
}
if (!['elements', 'arrays'].includes(drawMode)) throw new Error('drawMode が不正です');

function compile(kind, source, stage) {
  const shader = gl.createShader(kind);
  if (!shader) throw new Error(stage + ': shader create failed');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) || 'ログなし';
    gl.deleteShader(shader);
    throw new Error(stage + ' shader compile: ' + log);
  }
  return shader;
}
const vertex = compile(gl.VERTEX_SHADER, vertexSource, 'VERTEX');
const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource, 'FRAGMENT');
const program = gl.createProgram();
if (!program) throw new Error('program create failed');
gl.attachShader(program, vertex);
gl.attachShader(program, fragment);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  throw new Error('LINK: ' + (gl.getProgramInfoLog(program) || 'ログなし'));
}
gl.deleteShader(vertex);
gl.deleteShader(fragment);

// 頂点表：各格子点のxyを1回だけ格納。番号はj*(n+1)+i。
const n = gridSteps;
const positions = [];
for (let j = 0; j <= n; j++) {
  for (let i = 0; i <= n; i++) {
    positions.push(-0.6 + 1.2 * i / n, -0.6 + 1.2 * j / n);
  }
}
const indices = [];
for (let j = 0; j < n; j++) {
  for (let i = 0; i < n; i++) {
    const a = j * (n + 1) + i;
    indices.push(a, a + 1, a + n + 2, a, a + n + 2, a + n + 1);
  }
}
const vertices = new Float32Array(positions);
const elements = new Uint16Array(indices);
if (vertices.length / 2 !== (n + 1) ** 2 || elements.length !== 6 * n ** 2) {
  throw new Error('格子の個数が公式と一致しません');
}
if (!indices.every(index => index >= 0 && index < vertices.length / 2)) {
  throw new RangeError('頂点表の範囲外を参照しています');
}

// この教材では2通りのVAOを独立に作り、描画する方だけを選択する。
const indexedVao = gl.createVertexArray();
const indexedVbo = gl.createBuffer();
const ebo = gl.createBuffer();
const expandedVao = gl.createVertexArray();
const expandedVbo = gl.createBuffer();
if (![indexedVao, indexedVbo, ebo, expandedVao, expandedVbo].every(Boolean)) {
  throw new Error('VAO / buffer を作成できません');
}
gl.bindVertexArray(indexedVao);
gl.bindBuffer(gl.ARRAY_BUFFER, indexedVbo);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 8, 0);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo); // 現在のVAOにEBOが記録される
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, elements, gl.STATIC_DRAW);

const expanded = new Float32Array(indices.length * 2);
for (let k = 0; k < indices.length; k++) {
  expanded[2 * k] = vertices[2 * indices[k]];
  expanded[2 * k + 1] = vertices[2 * indices[k] + 1];
}
gl.bindVertexArray(expandedVao);
gl.bindBuffer(gl.ARRAY_BUFFER, expandedVbo);
gl.bufferData(gl.ARRAY_BUFFER, expanded, gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 8, 0);

gl.useProgram(program);
gl.viewport(0, 0, canvas.width, canvas.height);
gl.disable(gl.DITHER);
gl.disable(gl.BLEND);
gl.disable(gl.DEPTH_TEST);
gl.disable(gl.CULL_FACE);
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
if (drawMode === 'elements') {
  gl.bindVertexArray(indexedVao);
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
} else {
  gl.bindVertexArray(expandedVao);
  gl.drawArrays(gl.TRIANGLES, 0, indices.length);
}
gl.flush();
report('DRAW', 'mode=' + drawMode + ' grid=' + n + 'x' + n +
  ' vertices=' + (vertices.length / 2) + ' triangles=' + (indices.length / 3) +
  ' references=' + indices.length + ' indexedBytes=' + (vertices.byteLength + elements.byteLength) +
  ' expandedBytes=' + expanded.byteLength + ' area=1.44');
