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

// Learner-visible mesh inspector: derive every line and selected face from
// the same positions/indices actually uploaded to the GPU. No second scene.
if(typeof document!=='undefined'){
  const ns='http://www.w3.org/2000/svg';
  const svg=document.createElementNS(ns,'svg');
  svg.setAttribute('viewBox','0 0 100 100');
  svg.setAttribute('preserveAspectRatio','none');
  svg.setAttribute('role','img');
  svg.setAttribute('aria-label','GPUの正方形と同一頂点番号・三角形分割');
  svg.style.cssText='position:absolute;inset:0;width:100%;height:100%;'+
    'pointer-events:none;z-index:1';
  document.body.style.position='relative';
  const add=(tag,attrs)=>{const el=document.createElementNS(ns,tag);
    for(const [key,value]of Object.entries(attrs))el.setAttribute(key,String(value));
    svg.append(el);return el;};
  const point=id=>[20+60*(id%(n+1))/n,80-60*Math.floor(id/(n+1))/n];
  // Dense grids remain honest GPU meshes, but do not flood the overlay with
  // thousands of fine lines or illegible indices.
  if(n<=12){
    for(let k=0;k<=n;k++){
      const p=20+60*k/n;
      add('line',{x1:p,y1:20,x2:p,y2:80,stroke:'#fff',
        'stroke-opacity':.72,'stroke-width':.20});
      add('line',{x1:20,y1:p,x2:80,y2:p,stroke:'#fff',
        'stroke-opacity':.72,'stroke-width':.20});
    }
    for(let j=0;j<n;j++)for(let i=0;i<n;i++){
      const [x1,y1]=point(j*(n+1)+i),[x2,y2]=point((j+1)*(n+1)+i+1);
      add('line',{x1,y1,x2,y2,stroke:'#ffd984',
        'stroke-dasharray':'.65 .45','stroke-width':.25});
    }
    if(n<=4)for(let id=0;id<(n+1)**2;id++){
      const [x,y]=point(id);
      add('circle',{cx:x,cy:y,r:1.4,fill:'#fff',stroke:'#122035','stroke-width':.35});
      const label=add('text',{x:x+1.35,y:y-1.6,fill:'#fff','font-size':2.8,
        'font-family':'system-ui','paint-order':'stroke',stroke:'#081c34',
        'stroke-width':.75});label.textContent=String(id);
    }
  }
  const selected=add('polygon',{fill:'#ffe08b','fill-opacity':.30,
    stroke:'#ffe08b','stroke-width':.8});
  const panel=document.createElement('details');
  panel.className='wgl3-mesh-inspector';
  const toggle=document.createElement('summary');
  toggle.style.cssText='cursor:pointer;font-weight:600';
  panel.style.cssText='position:absolute;left:8px;bottom:8px;z-index:2;'+
    'background:rgba(4,21,37,.93);color:#fff;padding:7px 9px;'+
    'font:12px/1.5 system-ui;max-width:calc(100% - 32px)';
  const title=document.createElement('strong');title.textContent='格子の頂点と三角形';
  const detail=document.createElement('output');detail.setAttribute('aria-live','polite');
  detail.style.cssText='display:block;white-space:normal';
  const back=document.createElement('button'),next=document.createElement('button');
  back.textContent='前の三角形';next.textContent='次の三角形';
  for(const button of [back,next]){
    button.type='button';
    button.style.cssText='padding:3px 6px;margin:4px 5px 0 0;font:inherit';
  }
  let face=0;
  function selectFace(){
    const ids=indices.slice(face*3,face*3+3);
    selected.setAttribute('points',ids.map(id=>point(id).join(',')).join(' '));
    toggle.textContent='三角形 '+(face+1)+' / '+(indices.length/3)+'：頂点 '+ids.join(', ')+'（選択）';
    detail.textContent='三角形 '+(face+1)+' / '+(indices.length/3)+
      ' ／頂点ID ['+ids.join(', ')+']　'+
      '\n共有頂点 '+(vertices.length/2)+' 個・展開頂点 '+indices.length+' 個'+
      ' ／転送 '+(vertices.byteLength+elements.byteLength)+' / '+
      expanded.byteLength+' byte（indexed / arrays）'+
      ' ／実描画 '+drawMode;
  }
  back.addEventListener('click',()=>{face=(face-1+indices.length/3)%(indices.length/3);selectFace();});
  next.addEventListener('click',()=>{face=(face+1)%(indices.length/3);selectFace();});
  panel.append(toggle,title,detail,back,next);
  canvas.insertAdjacentElement('afterend',svg);
  svg.insertAdjacentElement('afterend',panel);
  selectFace();
}
