import { buildDesign, fitLeastSquares, SCENARIOS } from "./ml1-04-model.mjs";

const get = id => document.getElementById(id);
const finiteValue = id => {
  const element = get(id);
  const text = element.value.trim();
  if (!text) throw new RangeError(element.id + " が空欄です");
  const value = Number(text);
  if (!Number.isFinite(value) || Math.abs(value) > 1e6) {
    throw new RangeError(element.id + " は絶対値100万以下の有限数を入力してください");
  }
  return value;
};
const fmt = value => Math.abs(value) < 1e-11 ? "0" : Number(value.toPrecision(7)).toString();
const escapeText = value => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;");

function draw(x, y, fitted, mode, beta) {
  const canvas = get("plot");
  const ctx = canvas.getContext("2d");
  const width = canvas.width, height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, width, height);
  const pad = { left: 66, right: 28, top: 28, bottom: 56 };
  const xMinRaw = Math.min(0, ...x), xMaxRaw = Math.max(0, ...x);
  const xMargin = Math.max(0.8, (xMaxRaw - xMinRaw) * 0.15);
  const minX = xMinRaw - xMargin, maxX = xMaxRaw + xMargin;
  const predict = u => mode === "intercept" ? beta[0] + beta[1] * u :
    (beta[0] + beta[1]) * u;
  const lineEnds = [predict(minX), predict(maxX)];
  const allY = [...y, ...fitted, ...lineEnds, 0];
  const minYRaw = Math.min(...allY), maxYRaw = Math.max(...allY);
  const yMargin = Math.max(0.8, (maxYRaw - minYRaw) * 0.18);
  const minY = minYRaw - yMargin, maxY = maxYRaw + yMargin;
  const px = u => pad.left + (u - minX) / (maxX - minX) * (width - pad.left - pad.right);
  const py = v => height - pad.bottom - (v - minY) / (maxY - minY) * (height - pad.top - pad.bottom);
  ctx.strokeStyle = "#d4d7dc"; ctx.lineWidth = 1;
  for (let j = 0; j <= 4; j++) {
    const u = minX + (maxX - minX) * j / 4;
    const v = minY + (maxY - minY) * j / 4;
    ctx.beginPath(); ctx.moveTo(px(u), pad.top); ctx.lineTo(px(u), height-pad.bottom); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pad.left, py(v)); ctx.lineTo(width-pad.right, py(v)); ctx.stroke();
    ctx.fillStyle = "#28313f";ctx.font="14px sans-serif";
    ctx.fillText(fmt(u), px(u)-14, height-pad.bottom+21);
    ctx.fillText(fmt(v), 8, py(v)+5);
  }
  ctx.strokeStyle = "#53616e";ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(pad.left, py(0));ctx.lineTo(width-pad.right,py(0));ctx.stroke();
  ctx.beginPath();ctx.moveTo(px(0),pad.top);ctx.lineTo(px(0),height-pad.bottom);ctx.stroke();
  ctx.fillStyle="#28313f";ctx.fillText("x",width-20,height-17);ctx.fillText("y",24,22);

  // Solid line: fitted prediction
  ctx.beginPath();ctx.strokeStyle="#176a9f";ctx.lineWidth=3;ctx.setLineDash([]);
  ctx.moveTo(px(minX),py(lineEnds[0]));ctx.lineTo(px(maxX),py(lineEnds[1]));ctx.stroke();

  // Dashed vertical segments: residuals
  ctx.strokeStyle="#884f11";ctx.lineWidth=2;ctx.setLineDash([6,5]);
  for (let i=0;i<x.length;i++){
    ctx.beginPath();ctx.moveTo(px(x[i]),py(fitted[i]));ctx.lineTo(px(x[i]),py(y[i]));ctx.stroke();
  }
  ctx.setLineDash([]);
  for (let i=0;i<x.length;i++){
    ctx.beginPath();ctx.fillStyle="#ad471d";ctx.strokeStyle="#53250e";
    ctx.arc(px(x[i]),py(y[i]),7,0,2*Math.PI);ctx.fill();ctx.stroke();
    ctx.fillStyle="#222";ctx.font="13px sans-serif";ctx.fillText(String(i+1),px(x[i])+9,py(y[i])-10);
  }
  ctx.fillStyle="#222";ctx.font="14px sans-serif";
  ctx.fillText("● 観測点  — 適合直線  - - 残差", pad.left + 6, 19);
}

function render() {
  try {
    const x = [0,1,2].map(i=>finiteValue("x"+i));
    const y = [0,1,2].map(i=>finiteValue("y"+i));
    const mode = get("mode").value;
    const rows = buildDesign(x, mode);
    const out = fitLeastSquares(rows, y);
    draw(x,y,out.fitted,mode,out.beta);
    const data = rows.map((r,i) => [i+1,x[i],y[i],r[0],r[1],out.fitted[i],out.residuals[i]]);
    get("obs-table").innerHTML =
      '<table><caption>計算された各観測と残差（応答−予測）</caption><thead><tr>' +
      ['点','x','y','Xの第1列','Xの第2列','予測','残差'].map(z=>'<th scope="col">'+z+'</th>').join('')+
      '</tr></thead><tbody>' + data.map(row=>'<tr>'+row.map((z,j)=>
      (j===0?'<th scope="row">':'<td>')+escapeText(fmt(z))+(j===0?'</th>':'</td>')).join('')+'</tr>').join('')+
      '</tbody></table>';
    const msg = [
      '設計行列の数値的階数: ' + out.rank + ' / 2',
      'Gram行列 XᵀX = [['+out.gram[0].map(fmt).join(', ')+'], ['+out.gram[1].map(fmt).join(', ')+']]',
      'Xᵀy = [' + out.cross.map(fmt).join(', ') + ']',
      'Gram固有値 = [' + out.eigenvalues.map(fmt).join(', ') + ']',
      '最小ノルム解 β† = [' + out.beta.map(fmt).join(', ') + ']',
      '係数のEuclidノルム = ' + fmt(out.coefficientNorm),
      '平方残差目的 ||Xβ−y||²/(2n) = ' + fmt(out.loss),
      '直交条件 Xᵀ(y−Xβ) = [' + out.orthogonality.map(fmt).join(', ') + ']',
      out.rank<2
        ? '注意: 係数は一意ではありません。表示係数は最小ノルムの選択です。'
        : '列フルランク: この標本では係数も一意です。'
    ];
    get("status").textContent=msg.join('\n');
    get("plot-details").textContent = '横軸 x、縦軸 y。丸印は観測、実線は適合直線、破線は残差。'
      + '階数は'+out.rank+'、損失は'+fmt(out.loss)+'。各点の実数値は表を参照してください。';
  } catch (err) {
    get("status").textContent = '入力エラー: ' + err.message;
    get("obs-table").textContent = '';
    const ctx=get("plot").getContext("2d");ctx.clearRect(0,0,860,400);
  }
}

function loadScenario(name) {
  const example = SCENARIOS[name];
  if (!example) return;
  for (let i=0;i<3;i++){
    get("x"+i).value=example.x[i];
    get("y"+i).value=example.y[i];
  }
  get("mode").value=example.mode;
  render();
}

for (const button of document.querySelectorAll("[data-preset]")) {
  button.addEventListener("click",()=>loadScenario(button.dataset.preset));
}
for (const field of document.querySelectorAll("input, select")) {
  field.addEventListener("input",render);
  field.addEventListener("change",render);
}
loadScenario("straight");
