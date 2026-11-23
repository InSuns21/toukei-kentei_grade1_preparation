// WGL3: gl, canvas, vertexSource, fragmentSource, report は隔離フレームから渡される。
// まず静止状態のCPU/GPU画素を照合し、その後、同じ実頂点データの2方式を比較する。
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

// 初期3画素の独立CPU照合は上の静止描画に対して行う。
// ホストはこの関数の復帰直後に readPixels を実行するため、次のタイマーで
// 同じWebGL2 contextを2画面の実験へ切り替える。検算前に画面を上書きしない。
setTimeout(() => {
  if (typeof document === 'undefined') return;

  const h = 1.2 / n;
  const original = new Float32Array(vertices);
  const indexedLive = new Float32Array(vertices);
  const arraysLive = new Float32Array(expanded);
  const focus = n > 1
    ? Math.floor(n / 2) * (n + 1) + Math.floor(n / 2)
    : 0;
  const firstCopy = indices.indexOf(focus);
  if (firstCopy < 0) return;
  const connectedFaces = indices.reduce((acc, id, k) =>
    id === focus ? acc.concat(Math.floor(k / 3)) : acc, []);
  let selectedFace = connectedFaces[0];
  // 単位は1セルの幅 h。位置の変更は同じ頂点表の座標に反映する。
  let shiftX = 0.30, shiftY = 0.20;
  let detachOneCopy = false;

  const ns = 'http://www.w3.org/2000/svg';
  const stage = document.createElement('div');
  stage.style.cssText = 'position:relative;width:100%;background:#081725';
  canvas.parentElement.insertBefore(stage, canvas);
  stage.append(canvas);
  canvas.style.cssText = 'width:100%;height:auto;display:block';
  document.body.style.cssText =
    'margin:0;display:block;background:#f5f8fb;color:#15273b;' +
    'font:14px/1.5 system-ui,"Noto Sans JP",sans-serif';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', '実GPU頂点に対応する三角形の辺・頂点番号と選択面');
  svg.style.cssText =
    'position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
  stage.append(svg);
  const add = (tag, attrs, parent = svg) => {
    const el = document.createElementNS(ns, tag);
    for (const [key, value] of Object.entries(attrs))
      el.setAttribute(key, String(value));
    parent.append(el);
    return el;
  };

  const controls = document.createElement('section');
  controls.setAttribute('aria-label', '共有頂点と複製頂点の比較操作');
  controls.style.cssText = 'padding:10px 12px;border-top:1px solid #a7bacb';
  const intro = document.createElement('div');
  intro.style.cssText = 'font-weight:650;margin-bottom:7px';
  intro.textContent = '左：共有（drawElements）　｜　右：展開（drawArrays）';
  controls.append(intro);
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:8px 16px;align-items:center;flex-wrap:wrap';
  controls.append(row);
  function slider(labelText, value, onChange) {
    const label = document.createElement('label');
    label.style.cssText =
      'display:flex;align-items:center;gap:5px;flex-wrap:wrap';
    const name = document.createElement('span');
    name.textContent = labelText;
    const input = document.createElement('input');
    input.type = 'range';
    input.min = '-0.35'; input.max = '0.35'; input.step = '0.05';
    input.value = String(value);
    input.style.width = 'min(28vw,140px)';
    const output = document.createElement('output');
    output.textContent = Number(value).toFixed(2);
    input.setAttribute('aria-label', labelText + '（セル幅に対する割合）');
    input.addEventListener('input', () => {
      output.textContent = Number(input.value).toFixed(2);
      onChange(Number(input.value));
      redraw();
    });
    label.append(name, input, output);
    row.append(label);
    return input;
  }
  const xControl = slider('共有点 Δx/h', shiftX, v => { shiftX = v; });
  const yControl = slider('共有点 Δy/h', shiftY, v => { shiftY = v; });
  const splitLabel = document.createElement('label');
  splitLabel.style.cssText = 'display:flex;align-items:center;gap:5px';
  const splitControl = document.createElement('input');
  splitControl.type = 'checkbox';
  splitControl.addEventListener('change', () => {
    detachOneCopy = splitControl.checked;
    selectedFace = Math.floor(firstCopy / 3);
    redraw();
  });
  splitLabel.append(splitControl, document.createTextNode('右の1参照だけ切り離す'));
  row.append(splitLabel);
  const faceRow = document.createElement('div');
  faceRow.style.cssText =
    'display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-top:8px';
  controls.append(faceRow);
  const back = document.createElement('button');
  const next = document.createElement('button');
  const reset = document.createElement('button');
  for (const [button, caption] of [
    [back, '前の三角形'], [next, '次の三角形'], [reset, '位置を戻す']]) {
    button.type = 'button';
    button.textContent = caption;
    button.style.cssText =
      'border:1px solid #8fa7bf;background:white;color:#173b5b;' +
      'padding:5px 10px;cursor:pointer;border-radius:3px';
  }
  const faceText = document.createElement('output');
  faceText.setAttribute('aria-live', 'polite');
  const stats = document.createElement('output');
  stats.style.cssText = 'display:block;margin-top:7px;font-size:13px';
  const help = document.createElement('p');
  help.style.cssText = 'font-size:12px;margin:6px 0 0;color:#334e68';
  help.textContent =
    '操作対象は mesh.js の頂点表（位置：NDC、無次元）。移動はセル幅 h=1.2/n ' +
    'に対する比率。切り離し時のみ、右の1枚の三角形で使う複製点を下へ0.50h、左へ0.12h移す。' +
    '線と番号はGPUへ渡した位置と添字から作った案内、色面はWebGL2の描画。';
  faceRow.append(back, faceText, next, reset);
  controls.append(stats, help);
  stage.insertAdjacentElement('afterend', controls);

  back.addEventListener('click', () => {
    selectedFace = (selectedFace - 1 + indices.length / 3) % (indices.length / 3);
    redraw();
  });
  next.addEventListener('click', () => {
    selectedFace = (selectedFace + 1) % (indices.length / 3);
    redraw();
  });
  reset.addEventListener('click', () => {
    shiftX = 0; shiftY = 0; detachOneCopy = false;
    xControl.value = '0'; yControl.value = '0'; splitControl.checked = false;
    xControl.dispatchEvent(new Event('input'));
    yControl.dispatchEvent(new Event('input'));
    redraw();
  });

  // SVG案内も両GPUの実バッファと全く同じ座標を使用する。
  const panelPoint = (panel, xy) => [
    100 * (panel * 0.5 + (xy[0] + 1) * 0.25),
    100 * (1 - (xy[1] + 1) * 0.5)
  ];
  const faceXY = (panel, face, corner) => {
    const k = face * 3 + corner;
    return panel === 0
      ? [indexedLive[2 * indices[k]], indexedLive[2 * indices[k] + 1]]
      : [arraysLive[2 * k], arraysLive[2 * k + 1]];
  };
  function drawGuide() {
    svg.replaceChildren();
    add('line', {x1:50, y1:0, x2:50, y2:100, stroke:'#a8c2d5',
      'stroke-width':0.25, 'stroke-opacity':0.7});
    for (let panel = 0; panel < 2; panel++) {
      const color = panel === 0 ? '#99ebfb' : '#ffd3a1';
      const cap = add('text', {x:panel * 50 + 3, y:7, fill:'#ffffff',
        'font-size':2.45, 'font-weight':700, 'font-family':'system-ui'});
      cap.textContent = panel === 0 ? 'INDEXED  /  共有' : 'EXPANDED  /  複製';
      // 大きいnではラベルの重複を避け、選択面だけを表示する。
      if (n <= 8) {
        for (let face = 0; face < indices.length / 3; face++) {
          for (let edge = 0; edge < 3; edge++) {
            const a = panelPoint(panel, faceXY(panel, face, edge));
            const b = panelPoint(panel, faceXY(panel, face, (edge + 1) % 3));
            add('line', {x1:a[0], y1:a[1], x2:b[0], y2:b[1],
              stroke:color, 'stroke-width':0.18, 'stroke-opacity':0.85});
          }
        }
      }
      const corners = [0, 1, 2].map(k => panelPoint(
        panel, faceXY(panel, selectedFace, k)));
      add('polygon', {
        points:corners.map(p => p.join(',')).join(' '),
        fill:'#fcd76d', 'fill-opacity':0.27,
        stroke:'#ffe07a', 'stroke-width':0.50
      });
      if (n <= 4) {
        for (let id = 0; id < vertices.length / 2; id++) {
          const position = panel === 0
            ? [indexedLive[2 * id], indexedLive[2 * id + 1]]
            : [indexedLive[2 * id], indexedLive[2 * id + 1]];
          const p = panelPoint(panel, position);
          add('circle', {cx:p[0], cy:p[1], r:id === focus ? 0.88 : 0.48,
            fill:id === focus ? '#ffe07a' : '#fff',
            stroke:'#12354b', 'stroke-width':0.18});
          const label = add('text', {
            x:p[0] + 0.9, y:p[1] - 0.9, fill:'#fff', 'font-size':1.95,
            'font-family':'ui-monospace,monospace', 'paint-order':'stroke',
            stroke:'#071827', 'stroke-width':0.42
          });
          label.textContent = String(id);
        }
      }
      if (detachOneCopy && panel === 1) {
        const p0 = panelPoint(panel,
          [indexedLive[2 * focus], indexedLive[2 * focus + 1]]);
        const p1 = panelPoint(panel,
          [arraysLive[2 * firstCopy], arraysLive[2 * firstCopy + 1]]);
        add('line', {x1:p0[0], y1:p0[1], x2:p1[0], y2:p1[1],
          stroke:'#fff', 'stroke-dasharray':'0.5 0.4', 'stroke-width':0.28});
        add('circle', {cx:p1[0], cy:p1[1], r:0.9, fill:'#fb7185',
          stroke:'#fff', 'stroke-width':0.25});
        const label = add('text', {x:p1[0]+1, y:p1[1]+2.8,
          fill:'#fff', 'font-size':2.1, 'paint-order':'stroke',
          stroke:'#071827', 'stroke-width':0.45});
        label.textContent = '複製';
      }
    }
  }
  function redraw() {
    indexedLive.set(original);
    indexedLive[2 * focus] += shiftX * h;
    indexedLive[2 * focus + 1] += shiftY * h;
    for (let k = 0; k < indices.length; k++) {
      const id = indices[k];
      arraysLive[2 * k] = indexedLive[2 * id];
      arraysLive[2 * k + 1] = indexedLive[2 * id + 1];
    }
    if (detachOneCopy) {
      arraysLive[2 * firstCopy] -= 0.12 * h;
      arraysLive[2 * firstCopy + 1] -= 0.50 * h;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, indexedVbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, indexedLive);
    gl.bindBuffer(gl.ARRAY_BUFFER, expandedVbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, arraysLive);
    gl.useProgram(program);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.035, 0.09, 0.15, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    const leftWidth = Math.floor(canvas.width / 2);
    gl.viewport(0, 0, leftWidth, canvas.height);
    gl.bindVertexArray(indexedVao);
    gl.drawElements(gl.TRIANGLES, elements.length, gl.UNSIGNED_SHORT, 0);
    gl.viewport(leftWidth, 0, canvas.width - leftWidth, canvas.height);
    gl.bindVertexArray(expandedVao);
    gl.drawArrays(gl.TRIANGLES, 0, elements.length);
    gl.flush();
    drawGuide();
    const ids = indices.slice(selectedFace * 3, selectedFace * 3 + 3);
    faceText.textContent = '三角形 ' + (selectedFace + 1) + '/' +
      (elements.length / 3) + '：[' + ids.join(', ') + ']';
    stats.textContent = '共有点 #' + focus + ' は ' + connectedFaces.length +
      ' 枚の三角形から参照 ／頂点 ' + (vertices.length / 2) +
      ' 個 vs 展開 ' + elements.length + ' 個 ／ ' +
      (vertices.byteLength + elements.byteLength) + ' byte vs ' +
      expanded.byteLength + ' byte（Float32位置＋Uint16添字）／' +
      (detachOneCopy ? '右の複製1個を変更：同じ画像ではなくなる' :
        '両方式は同じ座標列を描画');
  }
  redraw();
}, 70);
