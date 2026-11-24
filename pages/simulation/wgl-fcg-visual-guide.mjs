// Cross-series observation guide for every *implemented* WGL1..20 / FCG2..9
// (FCG1 uses its separate Canvas2D lab). This module does not run user source:
// the Run button hands off to the existing isolated WebGL laboratory.
export const VISUAL_GUIDES=Object.freeze({
 WGL1:['三角形と画素','橙の三角形と黒い背景','頂点を動かし、中心画素の色を確かめる','画素中心・NDC・描画範囲'],
 WGL2:['頂点色の補間','RGBが混ざる三角形','頂点色・uniform gainを変更する','頂点・中間色・CPU重心座標'],
 WGL3:['頂点共有はどう効く？','左右の実GPU格子：左は共有、右は三角形ごとの頂点複製','共有点をスライダーで動かし、右側の複製1件を切り離して継ぎ目を比べる','n=2：共有9頂点＋24添字=120 byte、展開24頂点=192 byte。切り離すまで描画位置は同一'],
 WGL4:['モデル行列と回転','長方形と赤・緑の局所軸','回転角・伸縮・行列の積の順を変更する','座標軸も同じ変換を受ける'],
 WGL5:['立方体は視点を変えるとどう映る？','2つの立方体を水平・上下・距離の3軸で観察','ドラッグで水平・上下、ホイールで距離を変え、Spaceで自動周回を停止する','左手前=橙、奥=青。FOV・near/far・深度テストはcamera.jsで変更'],
 WGL6:['透視補正補間','三角形内のUV格子を左右で比較','格子の密度・背面判定を変更する','補正あり/なしで曲がり方が異なる'],
 WGL7:['遠くの床はなぜちらつく？','左右に同じ模様の床。手前のタイルと奥の偽の縞を比較','6種のフィルタ・模様密度・UV境界を操作し、模様を移動する','拡大ではテクセルの角と中間色、縮小ではちらつきと平均化を見る'],
 WGL8:['透明度と色空間','重なる半透明の赤・青レイヤー','アルファ・描画順・合成の色空間を変更する','重なり色と左右の違い'],
 WGL9:['面がなぜ平らに／丸く見える？','同じ光を当てた立方体の面法線と球の補間法線','Spaceで停止、矢印で2物体の上下・水平姿勢を変え、showNormalsを編集する','初期GPU画素は固定。動くモデル行列と逆転置法線行列は同じ回転を受ける'],
 WGL10:['シーン→FBO→後処理の実画素','左=シーン直描き／中=RGBA8保存画像／右=同じテクスチャの反転','FBO倍率0.5で細部の画素化を見て、処理と表示段階を切替える','3列ともframebuffer.fragの同じGPUプログラムを使い、中・右だけ中間RGBA8を読む'],
 WGL11:['影の生成','深度マップを再描画して動く床と箱の影','光源を左右矢印で変え、biasとshadowResolutionを編集する','同じFBOの2パスと初期4点のCPU/GPU光線検算の差'],

 WGL12:['粗さと金属度','同じGGXシェーダで3球の光源を連続回転','roughness/metallicを編集し、光の往復と陰影を比べる','滑らか/粗い/金属のハイライト差、初期Fresnel 4画素'],
 WGL13:['反射した方向は6面のどこ？','左に反射球、右に同じキューブマップの6面展開図','球面をクリックして参照先を選び、環境回転・境界線・風景/2×2診断を切り替える','橙の枠が参照面。UV・RGBは画面下に表示。12画素検算は2×2元画像の面と向きの検査'],
 WGL14:['ポストエフェクト','原画とフィルタ後の画像','blur/edge/露出を変更する','ぼかし・エッジ抽出・色調'],
 WGL15:['クリックと物体ID','手前・奥・背景の選択結果','画面をクリック・キーボードで選択','CSS画素・GPU画素・3D交差の一致'],
 WGL16:['インスタンス描画','同じメッシュの反復格子','個数とinstancingを変更する','見た目の同値とdraw callの差'],
 WGL17:['数値はGPUへ送るとどれだけ変わる？','同じ4×2の水位をR8／R8UI／R32Fで保存し、色・元値・復元値・誤差を同時に読む','保存形式と下段2列目の値を動かして実行。結果のセルを選び誤差バーを比較する','4×2は数値格子、拡大したCanvasは表示画素。画面RGBA8とfloat読戻しを区別する'],
 WGL18:['点状の濃度はどのように広がる？','4×4格子のGPU拡散画像と各セルの実FLOAT値を並べる','Spaceで停止、右矢印で1step進め、拡散率rを編集して変化を比べる','色は固定0〜1の表示。4×4の実計算値・総和と拡散の平坦化を追う'],
 WGL19:['4回の描画でGPUの拡散は何step進む？','GPUの4×4濃度を数値付きでスロー再生し、フレームごとの更新数を追う','実行後に一時停止・次の描画・最初からを操作し、条件タブの3つの時計とaudit.jsのGLSLを編集する','色とセル数値は同じGPUテクスチャ。初期設定は4描画・6step、仮想Δと実測rAF FPSは区別'],
 WGL20:['地形・建物・水深','合成地形とPLATEAU建物・仮想浸水','標高誇張・ケース・視点を変更する','標高・水深・表示座標を区別'],
 FCG2:['回転する水で染料が渦巻きになる','中心からの距離で回転速度が違う流れに、黄色い染料の帯が引き伸ばされる','再生→shearを0に→再実行→巻かれ方を比較','染料濃度q、反時計回りの角速度Ω(r)、128×128計算格子とGPU描画'],
 FCG3:['染料の数値拡散','回転する染料と数値誤差の左右比較','時間step・逆追跡法を変更する','形状のぼやけ・染料総量・誤差'],
 FCG4:['流れはどこで膨張・圧縮する？','予測速度と射影後を同じ色・矢印で比較し、中央の圧力がどう変わるかを見る','反復スライダー、再生、一時停止、1反復、反復0へ戻す','赤＝正の発散、青＝負の発散。反復は物理時間ではない'],
 FCG5:['インクを流して渦をつくる','48×48の実計算格子で染料が運ばれる様子を観察','ドラッグでかき混ぜる、Shift+ドラッグで染料だけ追加。外力と粘性で流れを比較','圧力射影による発散の減少は数値詳細で確認'],
 FCG6:['流れと動く固体','白い速度矢印と粒子軌跡、斜線の固体と橙の境界面','水槽をクリックして染料を足す。圧力・速さ・発散へ切り替え、固体の振幅を変えて再実行','32/48/64の実MAC格子。白い粒子は観察用で格子への力は与えない'],

 FCG7:['同じ渦のPICとFLIP','同じ4色の粒子群とPIC格子速度','step 0へ戻し再生。右側の混合係数を0へ変えると両群が一致','粒子の色模様と初期エネルギーに対する割合'],
 FCG9:['格子の値から水の形を作る','格子標本と黄の輪郭、その同じ頂点を押し出した側面（横長は左右、縦長は上下）','Nと物理stepを変えて再実行。wire・face・gradientで辺と陰影を比べる','粗い格子では角ばる。法線の補間で滑らかに見えても輪郭頂点の位置は変わらない'],
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
