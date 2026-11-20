// G3: describe the actual editable sandbox canvas; never compute or display a second simulation.
const descriptions = Object.freeze({
  WGL1: Object.freeze({
    requiresSteps: false,
    grid: '数値計算格子なし（3頂点から三角形をラスタライズ）',
    color: '初期シェーダは三角形内部をRGBA=(1, 0.5, 0, 1)の橙色、背景を黒に描画',
    clock: () => '静止描画1回（物理stepなし）',
    mode: '位置はclip座標w=1のためNDCと一致。GPUが描画画素ごとに三角形の内外を判定',
    source: 'triangle.js（coordinates）/ triangle.vert（a_position）/ triangle.frag（outColor）'
  }),
  WGL2: Object.freeze({
    requiresSteps: false,
    grid: '数値計算格子なし（3頂点の位置と色をGPUへ入力）',
    color: '初期の頂点A=赤・B=緑・C=青。内部画素では3色を補間し、fragment shaderでu_gainを乗算',
    clock: () => '静止描画1回（物理stepなし）',
    mode: '位置のclip座標w=1。画素中心の色は頂点間補間で決まり、表示はGPU描画バッファの画素',
    source: 'colors.js（vertices, gl.uniform3f）/ colors.vert（v_color）/ colors.frag（u_gain）'
  }),
  WGL3: Object.freeze({
    requiresSteps: false,
    grid: 'gridSteps=nでn×nに分割する幾何メッシュ（頂点(n+1)²、三角形2n²）。数値計算格子ではない',
    color: '初期fragment shaderは正方形の内側をRGBA=(0.2, 0.6, 0.8, 1)、背景を黒に描画',
    clock: () => '静止描画1回（物理stepなし）',
    mode: 'drawModeでdrawElements（頂点共有）とdrawArrays（頂点展開）を切替。三角形の面積と画素の色を比較',
    source: 'mesh.js（gridSteps, drawMode, indices）/ mesh.vert / mesh.frag'
  }),
  WGL4: Object.freeze({
    requiresSteps: false,
    grid: '数値計算格子なし（長方形の4頂点・2三角形と局所座標軸2本）',
    color: '初期長方形はRGBA=(0.2, 0.6, 0.8, 1)、x軸は赤、y軸は緑、背景は黒',
    clock: () => '編集ソースの静止描画1回（物理stepなし）',
    mode: 'モデル点をT×R×Sの順序で変換。別の観察ビューの回転角はこの初期GPU画素検算の時計ではない',
    source: 'model.js（tx, ty, angleDegrees, scaleX, scaleY）/ model.vert（u_model）/ model.frag（u_color）'
  }),
  WGL5: Object.freeze({
    requiresSteps: false,
    grid: '数値計算格子なし（8頂点・12面三角形の立方体を手前と奥へ2回描画）',
    color: '手前はRGBA=(0.9, 0.3, 0.2, 1)の橙、奥は(0.2, 0.6, 0.9, 1)の青。背景は黒',
    clock: () => '初期カメラの静止画素検算（物理stepなし）',
    mode: '初期は透視投影・近遠面1/9・縦FOV90°・深度テストON。後の視点往復は同じ実GLSLの表示更新',
    source: 'camera.js（eye, target, nearPlane, farPlane, fovYDegrees, projectionMode, depthEnabled）/ camera.vert / camera.frag'
  }),
  WGL6: Object.freeze({
    requiresSteps: false,
    grid: '数値計算格子なし（同じ3頂点の三角形を左右のGPU viewportへ各1回描画）',
    color: 'UVの無次元値をRGB=(u, v, 0.25)で表示。gridFrequencyの格子線は暗灰色、背景は黒',
    clock: () => '左右の静止比較描画1回（物理stepなし）',
    mode: '左はclip w=1,2,4に基づく透視補正UV、右は画面重心座標による線形UV。左右の表示画素は幅をほぼ半分ずつ使用',
    source: 'interpolation.js（gridFrequency, reverseWinding, cullBackFaces）/ interpolation.vert（a_clip, a_uv）/ interpolation.frag（u_mode, u_gridFrequency）'
  }),
  WGL8: Object.freeze({
    requiresSteps: false,
    grid: '数値計算格子なし（左・右のGPU viewportで同じ背景と2枚の半透明矩形を比較）',
    color: '初期背景RGB=(0.2, 0.2, 0.2)、層Aのα=0.5、層Bのα=0.4。左はsRGB符号化成分を直接ブレンド、右は線形光で合成してsRGBへ再符号化（αは無次元0〜1）',
    clock: () => '初期の静止合成1回（物理stepなし）',
    mode: '左は固定機能SRC_ALPHA / ONE_MINUS_SRC_ALPHA、右はfragment shader内のsource-over。既定はA→B、順序はreverseOrderで変更',
    source: 'blending.js（background, layerA, layerB, reverseOrder, gl.blendFuncSeparate）/ blending.frag（toLinear, toSrgb, overLayer）'
  }),
  WGL9: Object.freeze({
    requiresSteps: false,
    grid: '数値計算格子なし（左：立方体12三角形の面法線、右：球48×72×2三角形の補間法線）',
    color: '初期は線形RGBのLambert拡散＋Blinn–Phong鏡面を0〜1に制限してsRGBへ符号化。showNormals時は法線NをRGB=(N+1)/2へ写像',
    clock: () => '初期光源方向の静止GPU画素検算（物理stepなし）',
    mode: '初期検算後、同じ編集GLSLのu_lightDirectionだけを回転更新。光源の往復は物理時間・CPU画素基準の更新ではない',
    source: 'lighting.js（scale, useCorrectNormals, lightDirection, shininess, showNormals）/ lighting.vert（u_normalMatrix）/ lighting.frag（Lambert, specular）'
  }),
  WGL10: Object.freeze({
    requiresSteps: false,
    grid: '第1パスはRGBA8のオフスクリーンFBO（既定は左viewport幅×高さ、offscreenScaleで縮小、最小1×1）。実寸法はFBO実行ログに表示',
    color: '第1パスの4象限はRGB=(0.2/0.8, 0.3/0.7, 0.4)をRGBA8へ丸める。第2パスの左はコピー、右は初期設定でRGBを1−値に反転（α=1）',
    clock: () => 'FBOへ描く第1パス→画面へ描く第2パス（物理stepなし）',
    mode: '左・右の画面viewportは同じRGBA8テクスチャをNEARESTで標本化。FBOのtexel数と画面のpixel数は別。縮小・反転は編集JSが優先',
    source: 'framebuffer.js（offscreenScale, invertRight, gl.framebufferTexture2D, viewport）/ framebuffer.frag（u_pass, u_scene）'
  }),
  FCG2: Object.freeze({
    grid: '8×8（実際のスカラー場、R8テクスチャ2枚を交互に更新）',
    color: '解析値 q=0.5+0.25 sin(2πx) cos(2πy) sin(t)。R8への丸め後、(q, 0.15, 1−q) の赤青で表示',
    clock: step => '解析場の基準step '+step+'、t='+(step*Math.PI/2).toFixed(5)+' s（dt=π/2 s）',
    mode: '連続再生は現在の物理時刻で解析式を評価。R8は最近傍表示、更新時刻と描画フレームは別',
    source: 'density.js / density.frag'
  }),
  FCG3: Object.freeze({
    grid: '32×32（2枚のR8格子）',
    color: '左: 数値染料 q → (q, 0.15, 1−q)。右: 数値と解析の差 5|q−q_exact| を1で上限処理して赤で表示',
    clock: step => '物理step '+step+'、t='+(step/32).toFixed(5)+' s（dt=1/32 s）',
    mode: '左右の各パネルは同じ32×32計算格子。再生は計算stepを進め、描画フレームとは別',
    source: 'advection.js / advection.frag'
  }),
  FCG4: Object.freeze({
    grid: '8×8（圧力・発散・速度のR8格子）',
    color: '左: 正規化圧力（青→赤）。中央: |発散| のR8表示（赤）。右: 速度の大きさのR8表示（緑）',
    clock: step => 'Poisson反復 '+step+' 回（物理時刻は固定）',
    mode: '3分割表示。反復は物理stepではなく、圧力Poisson方程式の数値反復',
    source: 'projection.js / projection.frag'
  }),
  FCG5: Object.freeze({
    grid: '12×12（染料・発散・速度のR8格子）',
    color: '連続表示: 染料の濃さを青・橙の色と明るさで表現。初期検算: 染料（赤青）・|発散|（赤）・速度（緑）の3列',
    clock: step => '物理step '+step+'、t='+(step*0.04).toFixed(2)+' s（dt=0.04 s）',
    mode: '染料表示の線形補間は描画のみ。12×12計算格子を高解像度で再計算してはいない',
    source: 'fluid.js / fluid.frag'
  }),
  WGL7: Object.freeze({
    requiresSteps: false,
    grid: '初期checker模様は8×8 RGBA8、data模様へ変更した場合は4×4 RGBA8（計算格子ではなく入力テクスチャ）',
    color: '左は初期NEAREST、右は初期LINEAR_MIPMAP_LINEAR。実際のフィルタ・繰返し数はsampling.jsの設定が優先',
    clock: () => '初期UVオフセットでの静止画素（物理時間ではない）',
    mode: '再生は同一GLSLのUVオフセットだけを移動。模様の8×8 texelと描画バッファの画素を区別',
    source: 'sampling.js / sampling.frag（u_repeats, u_offset, gl.TEXTURE_MIN_FILTER）'
  }),
  WGL12: Object.freeze({
    requiresSteps: false,
    grid: '数値計算格子なし（fragment shaderが画素ごとに3球のBRDFを評価）',
    color: '3球の反射は線形RGBからsRGBへ変換して表示。左下4画素のFresnel診断は線形値',
    clock: () => 'JSで指定した初期光源方向の静止フレーム',
    mode: '光源の回転はuniformだけを更新。画素ごとのGGX評価と初期Fresnel診断は異なる測定',
    source: 'pbr.js / pbr.frag（roughness, metallic, u_lightDirection）'
  }),
  WGL19: Object.freeze({
    grid: '4×4（GPUのRGBA32F濃度格子、2枚のping-pongテクスチャ）',
    color: '濃度qを0〜1に切り詰め、(q, 0.2, 1−q)の赤青で画素に表示',
    clock: (step, snapshot) => '物理更新 '+step+' step、計算時間 '+
      (step*snapshot.frameAudit.fixedMs)+' ms（固定dt='+snapshot.frameAudit.fixedMs+' ms）',
    mode: snapshot => '合成フレーム '+snapshot.frameAudit.frames+' 回、更新しきれず破棄した時間 '+
      snapshot.frameAudit.droppedMs+' ms。実ブラウザのRAF間隔・FPSとは別',
    source: 'audit.js / audit.frag（fixedMs, frameDeltasMs, maxStepsPerFrame）'
  }),
  WGL18: Object.freeze({
    grid: '4×4（GPUの浮動小数点濃度格子）',
    color: '濃度 q を0〜1に切り詰め、(q, 0.2, 1−q) の赤青で表示。正方形セルのまま拡大',
    clock: step => 'GPU拡散の更新 '+step+' step（描画フレームとは別）',
    mode: '連続表示と初期画素検算に同じGPU ping-pong格子を使用',
    source: 'diffusion.js / diffusion.frag'
  })
});

export function sceneDescription(lesson, snapshot) {
  const item = descriptions[lesson];
  if (!item || !snapshot) return null;
  const {width, height, steps} = snapshot;
  if (!Number.isInteger(width) || width < 1 || !Number.isInteger(height) || height < 1 ||
      (item.requiresSteps !== false && (!Number.isInteger(steps) || steps < 0))) return null;
  if (lesson === 'WGL19' &&
      (!snapshot.frameAudit ||
       !Number.isFinite(snapshot.frameAudit.fixedMs) || snapshot.frameAudit.fixedMs <= 0 ||
       !Number.isInteger(snapshot.frameAudit.frames) || snapshot.frameAudit.frames < 1 ||
       !Number.isFinite(snapshot.frameAudit.droppedMs) || snapshot.frameAudit.droppedMs < 0 ||
       snapshot.frameAudit.steps !== steps)) return null;
  return Object.freeze({
    grid: item.grid, pixels: width+'×'+height+' px（GPU描画バッファ）',
    color: item.color, clock: item.clock(steps, snapshot),
    mode: typeof item.mode === 'function' ? item.mode(snapshot) : item.mode,
    source: item.source
  });
}

export function mountSceneInfo(lesson, parent) {
  if (!parent || !descriptions[lesson]) return () => {};
  const title = document.createElement('h3');
  title.textContent = 'この画面の値と時間';
  const list = document.createElement('dl');
  list.className = 'scene-info-list';
  const keys = [
    ['grid','計算格子'],['pixels','表示画素'],['color','色と量'],
    ['clock','実行直後の基準'],['mode','時間・補間'],['source','編集箇所']
  ];
  const displays = new Map();
  for (const [key, caption] of keys) {
    const row = document.createElement('div');
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = caption;
    dd.textContent = '—';
    row.append(dt, dd);
    list.append(row);
    displays.set(key, dd);
  }
  const note = document.createElement('p');
  note.className = 'scene-info-note';
  note.textContent = 'ここに示す時計は実行直後の基準です。連続再生しても、初期CPU/GPU画素照合の条件は変わりません。';
  parent.append(title, list, note);
  parent.hidden = false;
  return snapshot => {
    const info = sceneDescription(lesson, snapshot);
    for (const [key, element] of displays) {
      element.textContent = info ? info[key] : '未実行';
    }
  };
}
