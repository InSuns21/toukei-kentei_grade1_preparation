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
    clock: () => '初期の静止画素検査→同じGPU頂点データで左右の比較描画（物理stepなし）',
    mode: '左drawElements（共有）・右drawArrays（展開）を同時表示。共有点の移動を同期し、右側1複製だけ切り離す',
    source: 'mesh.js（gridSteps, drawMode, indices, shiftX, shiftY, bufferSubData）/ mesh.vert / mesh.frag'
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
    grid: snapshot => (snapshot.gridN || 32)+'×'+(snapshot.gridN || 32)+'（実Float64移流格子・数値/解析2枚のR8テクスチャ）',
    color: '左: 数値染料 q → (q, 0.15, 1−q)。右: 数値と解析の差 5|q−q_exact| を1で上限処理して赤で表示',
    clock: step => '物理step '+step+'、t='+(step/32).toFixed(5)+' s（dt=1/32 s）',
    mode: '左右は同じ編集JSのN×N実計算を最近傍表示。物理dt=1/32秒と描画フレームは別で、格子数を変えても同じ物理時刻を比較する',
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
    grid: snapshot => '実計算'+(snapshot.gridN || 48)+'×'+(snapshot.gridN || 48)+'（MAC格子、R8転送）',
    color: '連続表示: 染料の濃さを青・橙の色と明るさで表現。初期検算: 染料（赤青）・|発散|（赤）・速度（緑）の3列',
    clock: (step, snapshot) => Number.isFinite(snapshot.dt) && snapshot.dt > 0 ?
      '物理step '+step+'、t='+(step*snapshot.dt).toFixed(3)+' s（dt='+snapshot.dt+' s）' :
      '物理step '+step+'、時刻は編集JSのdtを確認',
    mode: '染料表示の線形補間は描画のみ。GLSL補間でセル数は増えない。GUIでNを変えると実計算から変更する',
    source: 'fluid.js / fluid.frag'
  }),
  FCG6: Object.freeze({
    grid: snapshot => {
      const n=[32,48,64].includes(snapshot.gridN)?snapshot.gridN:48;
      return n+'×'+n+'（実MAC格子：染料・発散・速さ・固体mask、面速度u='+(n+1)+'×'+n+'／v='+n+'×'+(n+1)+'）。GPUは4枚のR8テクスチャ';
    },
    color: '連続表示: 染料は青〜橙、固体セルは灰、流体側の階段境界とmask差分による法線矢印は黄。初期3列: 染料(q, 0.15, 1−q)、70|発散|の赤、速さ/0.6の緑（R8は0〜1に制限）',
    clock: step => '物理step '+step+'、t='+(step*0.05).toFixed(2)+' s（dt=0.05 s）',
    mode: '初期CPU/GPU照合は3列のu_viewMode=0。連続表示は選択した同じ実MAC格子をu_viewMode=1で拡大し染料のみ描画補間。法線は階段maskの差分で円の解析法線ではない',
    source: 'solid.js（N, dt, shape, centerY, wallAmplitude, wallFrequency, acceleration, advanceObstacleStep）/ solid.frag（u_viewMode, u_dye, u_div, u_speed, u_solid）'
  }),
  FCG7: Object.freeze({
    grid: '8×8周期節点速度格子（粒子はPIC/FLIP各16個、描画は3列）。格子の速さをR8テクスチャに格納',
    color: '左PIC粒子は水色、中央FLIP粒子は橙。右はPIC格子の速さ/0.7を0〜1に制限してR8化し、RGB=(q, 0.2, 1−q)の赤青で表示',
    clock: step => '物理step '+step+'、t='+(step*0.08).toFixed(2)+' s（dt=0.08 s）',
    mode: 'PICはpicMix=0、FLIPはflipMix=1。粒子の位置と速度を物理stepごとに更新し、右列の8×8節点値は画面画素へ最近傍表示。描画フレームとの同一視をしない',
    source: 'particle.js（N, count, dt, damp, force, picMix, flipMix, transfer）/ particle.frag（u_pic, u_flip, u_speed）'
  }),
  FCG8: Object.freeze({
    grid: snapshot => {
      const n=snapshot.gridN===undefined ? 48 :
        [48,64,80,96].includes(snapshot.gridN)?snapshot.gridN:null;
      return n ? n+'×'+n+'セル中心のLevel SetをFloat64で実計算。'+
        n+'×'+n+'のR8 GPUテクスチャ2枚を3列へ表示' :
        '編集ソースの格子数は未検証。初期モデルは48×48セル中心・R8テクスチャ2枚';
    },
    color: '左: 移流のみ、中央: 毎step再初期化6反復、右: 解析輪郭＋64粒子。内側は青、界面帯|φ|≤0.014 mは黄、外側は暗色、解析粒子は橙',
    clock: step => '物理step '+step+'、t='+(step*0.04).toFixed(2)+' s（dt=0.04 s）',
    mode: 'R8はclamp(0.5+2φ,0,1)に丸め、表示時は双線形補間してφ=(q−0.5)/2へ復元。補間は物理格子の細分化ではない。連続再生・step操作は初期GPU照合後の同じ編集ソースを更新',
    source: 'levelset.js（N, dt, shear, redistanceIterations, advanceOne）/ levelset.frag（u_raw, u_reinit, u_time, u_particles）'
  }),
  WGL7: Object.freeze({
    requiresSteps: false,
    grid: '初期checker模様は8×8 RGBA8、data模様へ変更した場合は4×4 RGBA8（計算格子ではなく入力テクスチャ）',
    color: '左は初期NEAREST、右は初期LINEAR_MIPMAP_LINEAR。実際のフィルタ・繰返し数はsampling.jsの設定が優先',
    clock: () => '初期UVオフセットでの静止画素（物理時間ではない）',
    mode: '再生は同一GLSLのUVオフセットだけを移動。模様の8×8 texelと描画バッファの画素を区別',
    source: 'sampling.js / sampling.frag（u_repeats, u_offset, gl.TEXTURE_MIN_FILTER）'
  }),
  WGL11: Object.freeze({
    requiresSteps: false,
    grid: '影の深度FBOは初期256×256 px・DEPTH_COMPONENT24（shadowResolutionで変更）。数値計算格子ではなく床と箱の幾何',
    color: '床は線形RGB=(0.38, 0.53, 0.64)、箱は(0.82, 0.25, 0.15)を光と影で調整しsRGB表示。左下4画素の白黒は可視／遮蔽の診断',
    clock: () => '初期の光源条件での静止GPU画素検算（物理stepなし）',
    mode: '第1パスで光源からの深度を記録、第2パスでdepthBiasを使い影を比較。以後の影の動きは同じ編集GLSLの描画更新で、初期4画素検算とは別',
    source: 'shadow.js（shadowResolution, depthBias, useShadow, gl.framebufferTexture2D）/ shadow.frag（u_bias, visibility）'
  }),
  WGL12: Object.freeze({
    requiresSteps: false,
    grid: '数値計算格子なし（fragment shaderが画素ごとに3球のBRDFを評価）',
    color: '3球の反射は線形RGBからsRGBへ変換して表示。左下4画素のFresnel診断は線形値',
    clock: () => 'JSで指定した初期光源方向の静止フレーム',
    mode: '光源の回転はuniformだけを更新。画素ごとのGGX評価と初期Fresnel診断は異なる測定',
    source: 'pbr.js / pbr.frag（roughness, metallic, u_lightDirection）'
  }),
  WGL13: Object.freeze({
    requiresSteps: false,
    grid: '数値計算格子なし（キューブマップ6面はそれぞれ2×2 texelのRGBA8入力。表示GPU画素とは別）',
    color: '±X・±Y・±Zの6面それぞれにRGB色、各面4 texelに明度0.55／0.70／0.85／1。反射色にSchlickのF0を混合',
    clock: () => '6面の方向を固定した12画素GPU検算（物理stepなし）',
    mode: '球面は反射ベクトル、外側は背景用の方向でキューブマップを標本化。yawDegreesと手動回転は描画方向を変え、12画素検算方向は固定',
    source: 'environment.js（faceColors, brightness, yawDegrees, fresnelF0）/ environment.frag（u_env, u_yaw, schlick）'
  }),
  WGL14: Object.freeze({
    requiresSteps: false,
    grid: '2枚の8×8 RGBA8 FBO（A=原画、B=3×3フィルタ）。左右のGPU表示画素はその結果を拡大表示',
    color: '原画は(0,0)に90/255、(3,3)に1の灰度値。右側はBの値へReinhard露出変換を適用しRGBの0〜1で表示',
    clock: () => '原画A→畳込みB→画面の左右比較という3パス（物理stepなし）',
    mode: '左は原画A、右はfilterModeのblur（3×3平均）またはedge（正の4近傍Laplacian）をexposureで調整。境界はCLAMP_TO_EDGE',
    source: 'postprocess.js（filterMode, exposure, makeTarget）/ postprocess.frag（u_pass, u_filterMode, u_exposure）'
  }),
  WGL15: Object.freeze({
    requiresSteps: false,
    grid: '数値計算格子なし（奥d=3と手前d=2の2枚の矩形、各2三角形）。選択用FBOは画面と同寸のRGBA8 IDテクスチャ＋DEPTH_COMPONENT16深度',
    color: '初期表示：ID1の手前面は橙RGB=(230,70,35)、ID2の奥面は青RGB=(30,150,220)、背景RGB=(10,18,29)。選択時は対象面を明るく強調（8bit値、0〜255）',
    clock: () => '初期の静止描画・ID画素検査（物理stepなし）',
    mode: '画素選択でGPUのID赤成分（0=背景、1=手前、2=奥）とCPU射線の交点を照合。深度LESSで重なりを解決し、選択後は同じGLSLで色を更新',
    source: 'picking.js（panels, enableDepthTest, reverseDrawOrder, cpuRayId, pick）/ picking.frag（u_idMode, u_selected）'
  }),
  WGL16: Object.freeze({
    requiresSteps: false,
    grid: '初期gridSize=8の8×8配置＝64個の四角形（各2三角形、6頂点）。描画インスタンスの配置であり数値計算格子ではない',
    color: '初期は行＋列の偶奇で橙RGB=(230,80,40)と青RGB=(40,150,220)を交互に配置。背景RGB=(12,20,32)、全成分0〜255',
    clock: () => '通常ループとインスタンス描画を各1回実行・全画素比較（物理stepなし）',
    mode: '初期64個ならloopは64 draw calls、instancedは1 draw call。表示はdrawModeで選択。gl.finish同期込み時間は環境依存の参考値',
    source: 'instancing.js（gridSize, drawMode, gl.vertexAttribDivisor, gl.drawArraysInstanced）/ instancing.vert（u_instanced）/ instancing.frag（v_color）'
  }),
  WGL17: Object.freeze({
    requiresSteps: false,
    grid: '物理値8点の4×2データテクスチャ（初期R8、各texelが1セル）。表示用GPUバッファ画素は別で最近傍表示',
    color: '入力の物理値範囲は−2〜2。初期R8の0〜255へ丸めた値qを正規化してRGB=(q/255, 0.2, 1−q/255)の赤青へ写像',
    clock: () => '4×2の8値を静止GPU画素として読み戻す（物理stepなし）',
    mode: 'modeでR8正規化／R8UI整数／R32F浮動小数点を切替。初期mode=r8。画面RGBA8読戻しとEXT_color_buffer_float使用時のFLOAT検算を区別',
    source: 'data-grid.js（mode, physicalValues, lower, upper, gl.texImage2D）/ data-grid.frag（texelFetch, u_mode, normalized）'
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
  WGL20: Object.freeze({
    requiresSteps: false,
    grid: '合成DEMは初期4×4セル・5×5頂点（gridStepsで変更）。PLATEAU実LOD1建物は別メッシュ。いずれも物理流体の計算格子ではない',
    color: '合成地形は緑、LOD1建物は茶色、仮想水面は半透明の青（α=0.48）。画面下12pxの4色帯はGPU画素照合用で地理データではない',
    clock: () => '地形・建物・水面の静止GPU描画（物理stepなし）',
    mode: '原点近傍の東・北・上をmで表す。PLATEAU標本の座標系はEPSG:6697。初期水面標高32 mと標高強調1.5倍は描画条件で、水深はmax(0, 水面標高−合成地盤標高) m',
    source: 'terrain.js（scenario, zExaggeration, waterLevelM, usePlateau, showWater, gridSteps, dem, depth）/ terrain.frag（v_kind, u_attributeMode）'
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
    grid: typeof item.grid === 'function' ? item.grid(snapshot) : item.grid, pixels: width+'×'+height+' px（GPU描画バッファ）',
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
