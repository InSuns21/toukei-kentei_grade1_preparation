// Cross-series observation guide for every *implemented* WGL1..20 / FCG2..8
// (FCG1 uses its separate Canvas2D lab). This module does not run user source:
// the Run button hands off to the existing isolated WebGL laboratory.
export const VISUAL_GUIDES=Object.freeze({
 WGL1:['三角形と画素','橙の三角形と黒い背景','頂点を動かし、中心画素の色を確かめる','画素中心・NDC・描画範囲'],
 WGL2:['頂点色の補間','RGBが混ざる三角形','頂点色・uniform gainを変更する','頂点・中間色・CPU重心座標'],
 WGL3:['共有頂点と格子','三角形で敷き詰めた平面','格子数とdrawArrays/drawElementsを変更する','見た目が同じでも転送データ量は異なる'],
 WGL4:['モデル行列と回転','長方形と赤・緑の局所軸','回転角・伸縮・行列の積の順を変更する','座標軸も同じ変換を受ける'],
 WGL5:['カメラと深度','手前の橙・奥の青の2つの立方体','視点・投影・深度テストを変更する','遠近感・前後関係・遮蔽'],
 WGL6:['透視補正補間','三角形内のUV格子を左右で比較','格子の密度・背面判定を変更する','補正あり/なしで曲がり方が異なる'],
 WGL7:['ミップマップの効果','同じUVで揺れるチェッカーの左右比較','repeats・nearest/mipmapを変え、移動時のちらつきを見る','固定初期GPU画素と動的UVの違い、縮小画素平均'],
 WGL8:['透明度と色空間','重なる半透明の赤・青レイヤー','アルファ・描画順・合成の色空間を変更する','重なり色と左右の違い'],
 WGL9:['光源と法線','面法線の立方体と補間法線の球','法線変換・光源・光沢を変更する','明るい面・陰・ハイライト'],
 WGL10:['多段描画とFBO','原画とRGB反転画像の左右比較','中間テクスチャ寸法・反転を変更する','2回目の描画は1回目の画素を読む'],
 WGL11:['影の生成','深度マップを再描画して動く床と箱の影','光源を左右矢印で変え、biasとshadowResolutionを編集する','同じFBOの2パスと初期4点のCPU/GPU光線検算の差'],

 WGL12:['粗さと金属度','同じGGXシェーダで3球の光源を連続回転','roughness/metallicを編集し、光の往復と陰影を比べる','滑らか/粗い/金属のハイライト差、初期Fresnel 4画素'],
 WGL13:['環境マッピング','6面キューブマップに映る球を回して観察','矢印キー・Shift+ドラッグで環境参照の角度を変える','6面の向き、反射方向、色の急変と12画素の検算範囲'],
 WGL14:['ポストエフェクト','原画とフィルタ後の画像','blur/edge/露出を変更する','ぼかし・エッジ抽出・色調'],
 WGL15:['クリックと物体ID','手前・奥・背景の選択結果','画面をクリック・キーボードで選択','CSS画素・GPU画素・3D交差の一致'],
 WGL16:['インスタンス描画','同じメッシュの反復格子','個数とinstancingを変更する','見た目の同値とdraw callの差'],
 WGL17:['GPU数値テクスチャ','格子のR8・整数・float可視化','データ型・量子化を変更する','数値と表示色の差'],
 WGL18:['GPU上の時間発展','拡散した4×4格子の計算結果','更新ステップと拡散率を変更する','濃度の広がり・総量・float誤差'],
 WGL19:['物理時計と描画時計','更新回数ごとの濃度分布','仮想フレーム間隔を変える','物理step・表示FPS・捨てた時間'],
 WGL20:['地形・建物・水深','合成地形とPLATEAU建物・仮想浸水','標高誇張・ケース・視点を変更する','標高・水深・表示座標を区別'],
 FCG2:['場から色への変換','物理格子のスカラー値とGPU色','物理step・R8画素の色を変更する','CPU格子値・テクスチャ値・表示色'],
 FCG3:['染料の数値拡散','回転する染料と数値誤差の左右比較','時間step・逆追跡法を変更する','形状のぼやけ・染料総量・誤差'],
 FCG4:['発散と圧力射影','同じJacobi反復が圧力・発散・速度の3画面を更新','Spaceで収束を停止し右矢印で1反復、Rで0へ戻す','反復数と物理時間の区別、Poisson残差と発散恒等式'],
 FCG5:['染料・速度・発散の連動','編集できる12×12 MACソルバーの染料をGPUで観察','粘性・外力を変えた同じJSで実行し、Shift+ドラッグで染料追加','物理stepと表示フレームの区別、Spaceで再生・停止、圧力残差'],
 FCG6:['流れと動く固体','実16×16 MACソルバーの染料・固体セル・境界面','形状・速度を編集しSpaceと矢印で物理stepを操作する','移動マスクと壁の非貫通条件、連続表示と初期CPU/GPU検算'],

 FCG7:['PICとFLIPの比較','2方式の粒子群と格子速度','step・混合係数を変更する','粒子の散逸・エネルギー・ノイズ'],
 FCG8:['自由表面の形','移流・再初期化・粒子軌道の3列','時間を動かし、再初期化の有無を変える','黄の数値輪郭・白破線の厳密界面・面積差']
});
export const visualGuideIds=Object.freeze(Object.keys(VISUAL_GUIDES));
export function mountVisualGuide(lesson,parent,{run,focusResult}={}){
  const values=VISUAL_GUIDES[lesson];
  if(!values||!parent||typeof run!=='function')return null;
  const section=document.createElement('section');
  section.className='visual-lesson-guide';
  section.setAttribute('aria-label',lesson+' 画面を見るための導入');
  const heading=document.createElement('h2');
  heading.textContent=lesson+' · 観察と操作';
  const main=document.createElement('strong');
  main.className='visual-guide-focus';
  main.textContent=values[0];
  const grid=document.createElement('dl');
  grid.className='visual-guide-steps';
  for(const [key,value]of [['表示',values[1]],['操作',values[2]]]){
    const item=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');
    dt.textContent=key;dd.textContent=value;item.append(dt,dd);grid.append(item);
  }
  // The numeric/technical observation belongs in optional details, not the default task.
  const details=document.createElement('details');
  details.className='visual-guide-details';
  const summary=document.createElement('summary');
  summary.textContent='詳しい観察ポイント';
  const detailText=document.createElement('p');
  detailText.textContent=values[3];
  details.append(summary,detailText);
  const row=document.createElement('div');row.className='visual-guide-actions';
  const view=document.createElement('button');view.type='button';
  view.textContent='描画して観察';
  view.className='action primary';
  view.addEventListener('click',()=>run());
  const code=document.createElement('button');code.type='button';
  code.className='action';code.textContent='コードを編集';
  code.addEventListener('click',()=>focusResult?.('code'));
  row.append(view,code);
  section.append(heading,main,grid,row,details);
  // When a real animated scene exists, let learners see the *motion* first;
  // explanations follow below. Static labs keep the guide as their entry point.
  const scene=parent.querySelector('.visual-observation');
  if(scene)scene.after(section);else parent.prepend(section);
  return section;
}
