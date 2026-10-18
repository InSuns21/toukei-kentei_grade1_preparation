import {experiment} from "./ml1-05-model.mjs";
const el=id=>document.getElementById(id);
const format=x=>Math.abs(x)<1e-10?"0":Number(x.toPrecision(6)).toString();
const esc=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;");
const num=id=>{
  const v=el(id).value.trim();if(!v) throw new RangeError(id+"を入力してください");
  const n=Number(v);if(!Number.isFinite(n)) throw new RangeError(id+"は有限の数を入力してください");
  return n;
};
function drawPath(path,truth){
  const canvas=el("path"),ctx=canvas.getContext("2d"),W=canvas.width,H=canvas.height;
  ctx.clearRect(0,0,W,H);ctx.fillStyle="#fff";ctx.fillRect(0,0,W,H);
  const left=74,right=34,top=38,bottom=64;
  const values=[0,...truth,...path.flatMap(p=>p.beta)];
  const ymin=Math.min(...values),ymax=Math.max(...values),margin=Math.max(0.3,(ymax-ymin)*0.14);
  const lo=ymin-margin,hi=ymax+margin;
  const px=i=>left+i*(W-left-right)/(path.length-1);
  const py=y=>top+(hi-y)/(hi-lo)*(H-top-bottom);
  ctx.font="15px sans-serif";
  for(let k=0;k<=4;k++){
    const v=lo+(hi-lo)*k/4,y=py(v);
    ctx.strokeStyle="#dde3e9";ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(left,y);ctx.lineTo(W-right,y);ctx.stroke();
    ctx.fillStyle="#202b36";ctx.fillText(format(v),7,y+5);
  }
  const colors=["#12669b","#b34d25"], symbols=["circle","square"];
  path.forEach((p,i)=>{
    ctx.fillStyle="#29333c";ctx.fillText(String(p.lambda),px(i)-15,H-bottom+24);
  });
  for(let j=0;j<2;j++){
    ctx.beginPath();ctx.strokeStyle=colors[j];ctx.lineWidth=3;
    path.forEach((p,i)=>{if(i===0)ctx.moveTo(px(i),py(p.beta[j]));else ctx.lineTo(px(i),py(p.beta[j]));});
    ctx.stroke();
    for(let i=0;i<path.length;i++){
      ctx.fillStyle=colors[j];const x=px(i),y=py(path[i].beta[j]);
      if(symbols[j]==="circle"){ctx.beginPath();ctx.arc(x,y,5,0,2*Math.PI);ctx.fill();}
      else ctx.fillRect(x-5,y-5,10,10);
    }
    ctx.setLineDash([j===0?5:2,5]);ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(left,py(truth[j]));ctx.lineTo(W-right,py(truth[j]));ctx.stroke();ctx.setLineDash([]);
  }
  ctx.fillStyle="#202b36";
  ctx.fillText("● 係数1／実線　■ 係数2／実線　真値は破線",left,24);
  ctx.fillText("λ（表示した離散値）",W-205,H-14);
}
function render(){
 try{
  const params={rho:num("rho"),lambda:num("lambda"),sigma:num("sigma"),
    repetitions:num("repetitions"),seed:num("seed")};
  if(params.lambda<0||params.lambda>10||params.sigma<0||params.sigma>10||
     !Number.isInteger(params.repetitions)||!Number.isInteger(params.seed)){
    throw new RangeError("λは0〜10、雑音標準偏差は0〜10、回数とseedは整数にしてください");
  }
  const o=experiment(params);
  drawPath(o.path,o.truth);
  const t=o.theoretical,e=o.empirical;
  const rows=[
    ["真の係数",o.truth],
    ["1標本のRidge推定",o.sampleFit.beta],
    ["理論平均",t.mean],
    ["反復平均",e.mean],
    ["理論偏り",t.bias],
    ["反復偏り",e.bias],
    ["理論分散",t.covariance.map((r,i)=>r[i])],
    ["反復分散（R分母）",e.variance]
  ];
  el("diagnostics").innerHTML="<table><caption>真値、理論二次モーメントと反復推定</caption><thead><tr><th scope='col'>項目</th><th scope='col'>係数1</th><th scope='col'>係数2</th></tr></thead><tbody>"+
    rows.map(([name,v])=>"<tr><th scope='row'>"+esc(name)+"</th>"+
    v.map(x=>"<td>"+esc(format(x))+"</td>").join("")+"</tr>").join("")+"</tbody></table>";
  el("summary").textContent=[
    "設計行列：n=24、2列、平均0、Gram行列/n = [[1, "+format(params.rho)+"], ["+format(params.rho)+", 1]]",
    "反復係数平均二乗誤差 = "+format(e.risk),
    "理論係数リスク = 偏り² "+format(t.bias2)+" + 分散の跡 "+format(t.traceCov)+" = "+format(t.risk),
    "理論固定デザイン予測リスク = "+format(t.fitBias2)+" (偏り寄与) + "+format(t.fitVariance)+" (分散寄与) = "+format(t.fitRisk),
    "同じseedは同じ標準正規乱数列を生成します。λを変えても反復番号ごとに同一雑音を再利用する比較です。"
  ].join("\n");
  el("path-table").innerHTML="<table><caption>最初の雑音標本を固定したλ別推定係数経路</caption><thead><tr><th scope='col'>λ</th><th scope='col'>係数1</th><th scope='col'>係数2</th></tr></thead><tbody>"+
    o.path.map(p=>"<tr><th scope='row'>"+format(p.lambda)+"</th><td>"+format(p.beta[0])+"</td><td>"+format(p.beta[1])+"</td></tr>").join("")+"</tbody></table>";
  el("plot-description").textContent="同じ乱数標本での係数1と係数2の正則化経路。数値は直後の表を参照。相関"+format(params.rho)+"、雑音標準偏差"+format(params.sigma)+"。";
  el("error").textContent="";
 }catch(error){
  el("error").textContent="入力エラー："+error.message;
  el("diagnostics").textContent="";el("summary").textContent="";el("path-table").textContent="";
  el("path").getContext("2d").clearRect(0,0,860,420);
 }
}
document.querySelectorAll("input").forEach(x=>{x.addEventListener("input",render);x.addEventListener("change",render);});
document.querySelectorAll("[data-preset]").forEach(b=>b.addEventListener("click",()=>{
  const items={
    orthogonal:[0,0.2,1,100,42],correlated:[0.98,0.2,1,100,42],
    noiseless:[0,0,1,100,42],highnoise:[0.98,0.2,3,500,42]
  }[b.dataset.preset];
  ["rho","lambda","sigma","repetitions","seed"].forEach((k,i)=>el(k).value=items[i]);
  render();
}));
render();
