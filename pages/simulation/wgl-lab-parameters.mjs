// G2: the slider edits the learner's JS literal, not a parallel GPU/CPU model.
// An unsupported expression disables the GUI; the learner source is never overwritten.
const decimal = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;

export const LAB_PARAMETERS = Object.freeze({
  WGL10: Object.freeze([
    Object.freeze({
      id: 'offscreen-scale', type: 'number', label: 'FBOの解像度倍率',
      default: 1, min: 0.5, max: 1, step: 0.25, unit: '画面列に対する倍率',
      meaning: 'RGBA8テクスチャの縦横の画素数。0.5にすると細部が最近傍で画素化する',
      sourceLocation: 'framebuffer.js / offscreenScale → textureWidth, textureHeight',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const offscreenScale[ \t]*=[ \t]*)([^;\n]+)(;)/gm
    }),
    Object.freeze({
      id: 'filter-mode', type: 'enum', values: ['invert','grayscale','copy'],
      label: '保存画像の後処理', default: 'invert', unit: '処理',
      meaning: '同じFBOを反転・数値グレースケール・無加工で表示',
      sourceLocation: 'framebuffer.js / filterMode → processedPass → framebuffer.frag u_pass',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const filterMode[ \t]*=[ \t]*)([^;\n]+)(;)/gm
    }),
    Object.freeze({
      id: 'inspection-pass', type: 'enum',
      values: ['all','scene','texture','processed'],
      label: '表示する段階', default: 'all', unit: '描画列',
      meaning: '3列または1段階の実GPU画像を全幅で表示する',
      sourceLocation: 'framebuffer.js / inspectionPass → drawView → framebuffer.frag u_pass',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const inspectionPass[ \t]*=[ \t]*)([^;\n]+)(;)/gm
    })
  ]),


  WGL17: Object.freeze([
    Object.freeze({
      id: 'format', type: 'enum', values: ['r8', 'r8ui', 'r32f'],
      label: 'GPUに保存する形式', default: 'r8', unit: 'R8／R8UI／R32F',
      meaning: 'R8とR8UIは同じ8ビット符号を異なる型で読み、R32Fは物理値をfloat32で読む',
      sourceLocation: 'data-grid.js / const mode → texImage2D と fragment shader の u_mode',
      sourceFile: 'js', index: null,
      matcher: /^(const mode[ ]*=[ ]*)([^;]+)(;)/gm
    }),
    Object.freeze({
      id: 'probe', type: 'number', label: '下段2列目の入力値 x', default: -1.3,
      min: -2, max: 2, step: 0.1, unit: '物理値（例：m）',
      meaning: '1セルだけ変更し、8ビットの段差・ゼロ付近のずれ・float32の誤差を観察する',
      sourceLocation: 'data-grid.js / const probeValue → physicalValues[1] → Uint8Array / Float32Array → GPU',
      sourceFile: 'js', index: null,
      matcher: /^(const probeValue[ ]*=[ ]*)([^;]+)(;)/gm
    })
  ]),
  WGL14: Object.freeze([
    Object.freeze({
      id: 'image-mode', type: 'enum', values: ['illustration', 'impulse'],
      label: '入力画像', default: 'illustration', unit: '画像種別',
      meaning: 'illustration＝家・太陽・木の128×128色画像、impulse＝8×8の手計算用白点と灰点',
      sourceLocation: 'postprocess.js / imageMode → gridSize → postprocess.frag / sceneAt',
      sourceFile: 'js', index: null,
      matcher: /^([ 	]*const imageMode[ 	]*=[ 	]*)([^;\n]+)(;)/gm
    }),
    Object.freeze({
      id: 'filter-mode', type: 'enum', values: ['blur', 'edge'],
      label: '画像フィルタ', default: 'blur', unit: '方式',
      meaning: 'blur＝周辺平均、edge＝正の4近傍Laplacianによる輪郭抽出',
      sourceLocation: 'postprocess.js / filterMode → u_filterMode → postprocess.frag / pass 1',
      sourceFile: 'js', index: null,
      matcher: /^([ 	]*const filterMode[ 	]*=[ 	]*)([^;\n]+)(;)/gm
    }),
    Object.freeze({
      id: 'blur-radius', type: 'integer',
      label: 'ぼかし半径', default: 1, min: 1, max: 4, step: 1, unit: 'texel',
      meaning: 'blurのみ：1＝3×3、2＝5×5、3＝7×7、4＝9×9。フィルタBの実サンプル数が変わる',
      sourceLocation: 'postprocess.js / blurRadius → u_blurRadius → postprocess.frag / 2重for',
      sourceFile: 'js', index: null,
      matcher: /^([ 	]*const blurRadius[ 	]*=[ 	]*)([^;\n]+)(;)/gm
    }),
    Object.freeze({
      id: 'exposure', type: 'number',
      label: '露出係数', default: 1, min: 0, max: 4, step: 0.5, unit: '無次元',
      meaning: 'T_e(x)=ex/(1+ex)。加工側の明るさを変える（0は黒）',
      sourceLocation: 'postprocess.js / exposure → u_exposure → postprocess.frag / toneMap',
      sourceFile: 'js', index: null,
      matcher: /^([ 	]*const exposure[ 	]*=[ 	]*)([^;\n]+)(;)/gm
    }),
    Object.freeze({
      id: 'process-order', type: 'enum', values: ['filter-first', 'tone-first'],
      label: '処理順', default: 'filter-first', unit: '処理順',
      meaning: 'filter-first＝Bを作ってから表示時にtoneMap、tone-first＝Aの各参照値をtoneMapしてBへ書く',
      sourceLocation: 'postprocess.js / processOrder → u_toneFirst → postprocess.frag / sourceAt',
      sourceFile: 'js', index: null,
      matcher: /^([ 	]*const processOrder[ 	]*=[ 	]*)([^;\n]+)(;)/gm
    }),
    Object.freeze({
      id: 'comparison', type: 'number',
      label: '原画を表示する割合', default: 0.5, min: 0, max: 1, step: 0.1, unit: '画面幅に対する割合',
      meaning: '0＝加工のみ、0.5＝左半分が原画、1＝原画のみ。同じUV座標の2枚を比較',
      sourceLocation: 'postprocess.js / comparison → u_compare → postprocess.frag / pass 2',
      sourceFile: 'js', index: null,
      matcher: /^([ 	]*const comparison[ 	]*=[ 	]*)([^;\n]+)(;)/gm
    })
  ]),

  WGL19: Object.freeze([
    Object.freeze({
      id: 'rate', type: 'number', label: '拡散係数 r', default: 0.2,
      min: 0, max: 0.25, step: 0.05, unit: '無次元',
      meaning: '4近傍拡散の1数値stepで隣接セルへ配分する割合',
      sourceLocation: 'audit.js / const rate → u_rate（GPU更新）',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const rate[ \t]*=[ \t]*)([^;\n]+)(;)/gm
    }),
    Object.freeze({
      id: 'fixed-ms', type: 'integer', label: '数値stepの刻み', default: 20,
      min: 10, max: 40, step: 10, unit: 'ms/数値step',
      meaning: '合成フレーム経過時間を積算し、何回GPU拡散を更新するか決める時間（描画FPSとは別）',
      sourceLocation: 'audit.js / const fixedMs → while (accumulator >= fixedMs)',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const fixedMs[ \t]*=[ \t]*)([^;\n]+)(;)/gm
    }),
    Object.freeze({
      id: 'max-steps-per-frame', type: 'integer', label: 'フレーム当たり最大更新回数', default: 4,
      min: 1, max: 4, step: 1, unit: '数値step/合成フレーム',
      meaning: '1回の描画で計算を打ち切る上限。残った整数step分は破棄時間として計上',
      sourceLocation: 'audit.js / const maxStepsPerFrame → while の上限',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const maxStepsPerFrame[ \t]*=[ \t]*)([^;\n]+)(;)/gm
    })
  ]),
  FCG6: Object.freeze([
    Object.freeze({
      id: 'grid', type: 'integer', label: '実計算格子 N×N', default: 48,
      min: 32, max: 64, step: 16, unit: 'セル/辺',
      meaning: '32/48/64で固体マスク・MAC速度・圧力・染料・実GPUテクスチャを同じ格子で再計算。描画ピクセル数とは別',
      sourceLocation: 'solid.js / const N → h、面速度、Poisson、4枚のR8テクスチャ',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const N=)([^,\n]+)(,h=1\/N,dt=0\.05,rho=1,shape=[^;\n]+;)/gm
    }),
    Object.freeze({
      id: 'shape', type: 'enum', values: ['circle','rectangle'],
      label: '固体の形状', default: 'circle', unit: '形状',
      meaning: '円か矩形のセル中心マスク。固体・境界面・圧力射影・描画を同じ格子から更新',
      sourceLocation: 'solid.js / const shape → geometry() → 固体マスク',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const N=(?:32|48|64),h=1\/N,dt=0\.05,rho=1,shape=)([^,\n]+)(,centerY=[^;\n]+;)/gm
    }),
    Object.freeze({
      id: 'centerY', type: 'number', label: '固体中心の高さ', default: 0.5,
      min: 0.35, max: 0.65, step: 0.05, unit: 'm（領域は1×1 m）',
      meaning: '壁の位置と染料の回り込みを変える。初期値へ戻すと元の障害物位置',
      sourceLocation: 'solid.js / const centerY → geometry()',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const N=(?:32|48|64),h=1\/N,dt=0\.05,rho=1,shape=[^,\n]+,centerY=)([^;\n]+)(;)/gm
    }),
    Object.freeze({
      id: 'wallAmplitude', type: 'number', label: '壁の水平移動振幅', default: 0.1,
      min: 0, max: 0.15, step: 0.01, unit: 'm',
      meaning: 'cx=0.5+A sin(ωt)、壁速度は Aω cos(ωt) [m/s]。A=0で静止',
      sourceLocation: 'solid.js / const wallAmplitude → geometry()',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const wallAmplitude=)([^,\n]+)(,wallFrequency=[^;\n]+;)/gm
    }),
    Object.freeze({
      id: 'wallFrequency', type: 'number', label: '壁の角周波数', default: 1.8,
      min: 0.6, max: 3, step: 0.2, unit: 'rad/s',
      meaning: '移動する固体の位相・壁速度に同時に反映。描画FPSや物理刻みとは別',
      sourceLocation: 'solid.js / const wallFrequency → geometry()',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const wallAmplitude=[^,\n]+,wallFrequency=)([^,\n]+)(,acceleration=[^;\n]+;)/gm
    })
  ]),
  FCG5: Object.freeze([
    Object.freeze({
      id: 'grid', type: 'integer', label: '実計算格子 N×N', default: 48,
      min: 12, max: 48, step: 12, unit: 'セル/辺',
      meaning: 'MAC面速度・圧力・染料を同じ格子で再計算。表示ピクセル数とは別（12/24/36/48）',
      sourceLocation: 'fluid.js / const N → h、MAC面配列、Poisson、R8テクスチャ',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const N=)([^,\n]+)(,h=1\/N,dt=[^,\n]+,rho=1,nu=[^,\n]+,forceAmplitude=[^;\n]+;)/gm
    }),
    Object.freeze({
      id: 'nu', type: 'number', label: '動粘性係数 ν', default: 0.002,
      min: 0, max: 0.0025, step: 0.0005, unit: 'm²/s',
      meaning: '陽的粘性 r=dt·ν·N²≤1/4 をdt≤0.04 s、N≤48でも満たす範囲',
      sourceLocation: 'fluid.js / const nu → advanceFluidStep() の r',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const N=[^,\n]+,h=1\/N,dt=[^,\n]+,rho=1,nu=)([^,\n]+)(,forceAmplitude=[^;\n]+;)/gm
    }),
    Object.freeze({
      id: 'force', type: 'number', label: '外力の流れ関数振幅', default: 0.08,
      min: 0, max: 0.2, step: 0.01, unit: 'm²/s²',
      meaning: '外力加速度の回転差分に用いる流れ関数の振幅（0では外力なし）',
      sourceLocation: 'fluid.js / const forceAmplitude → psi() → starU/starV',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const N=[^,\n]+,h=1\/N,dt=[^,\n]+,rho=1,nu=[^,\n]+,forceAmplitude=)([^;\n]+)(;)/gm
    }),
    Object.freeze({
      id: 'dt', type: 'number', label: '物理時間刻み Δt', default: 0.04,
      min: 0.01, max: 0.04, step: 0.005, unit: 's/物理step',
      meaning: '1stepで進む物理時間。描画FPSとは別。N≤48、ν≤0.0025で陽的粘性 r=dt·ν·N²≤1/4',
      sourceLocation: 'fluid.js / const dt → advanceFluidStep() の移流・粘性・外力・圧力射影',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const N=[^,\n]+,h=1\/N,dt=)([^,\n]+)(,rho=1,nu=[^,\n]+,forceAmplitude=[^;\n]+;)/gm
    }),
    Object.freeze({
      id: 'brush-radius', type: 'number', label: '染料ブラシの半径', default: 0.085,
      min: 0.03, max: 0.15, step: 0.005, unit: 'm',
      meaning: 'Shift+ドラッグ時のガウス型外部染料源の広がり。実染料配列へ直接加算',
      sourceLocation: 'fluid.js / const dyeBrushRadius → inject() → dye[]',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const dyeBrushRadius=)([^,\n]+)(,dyeBrushStrength=[^;\n]+;)/gm
    }),
    Object.freeze({
      id: 'brush-strength', type: 'number', label: '染料ブラシの強さ', default: 0.48,
      min: 0, max: 1, step: 0.01, unit: '染料値/入力イベント（無次元）',
      meaning: 'Shift+ドラッグ1回の入力強度。0なら追加せず、値域[0,1]に飽和',
      sourceLocation: 'fluid.js / const dyeBrushStrength → inject() → dye[]',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const dyeBrushRadius=[^,\n]+,dyeBrushStrength=)([^;\n]+)(;)/gm
    }),
    Object.freeze({
      id: 'playback-ms', type: 'integer', label: 'ライブ再生の間隔', default: 140,
      min: 70, max: 280, step: 70, unit: 'ms/物理step（表示時計）',
      meaning: '小さいほど速い目標表示間隔。実行負荷で遅くなる場合がある。物理時間刻みdtや数値解は変えない',
      sourceLocation: 'fluid.js / const playbackIntervalMs → frame() の実時間accumulator',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const playbackIntervalMs=)([^;\n]+)(;)/gm
    })
  ]),
  WGL18: Object.freeze([Object.freeze({
    id: 'rate', type: 'number', label: '拡散係数 r', default: 0.2,
    min: 0, max: 0.25, step: 0.05, unit: '無次元',
    meaning: '1回の4近傍GPU更新で隣接セルへ移る割合',
    sourceLocation: 'diffusion.js / const rate → u_rate',
    sourceFile: 'js', index: null,
    matcher: /^([ \t]*const rate[ \t]*=[ \t]*)([^;\n]+)(;)/gm
  })]),
  WGL12: Object.freeze([Object.freeze({
    id: 'roughness-middle', type: 'number', label: '中央球の粗さ', default: 0.55,
    min: 0.08, max: 1, step: 0.01, unit: '無次元',
    meaning: '中央球のGGXハイライトの広がり',
    sourceLocation: 'pbr.js / roughness[1] → u_roughness[1]',
    sourceFile: 'js', index: 1,
    matcher: /^([ \t]*const roughness[ \t]*=[ \t]*\[)([^\]\n]+)(\][ \t]*;)/gm
  })]),
  FCG8: Object.freeze([
    Object.freeze({
      id: 'grid', type: 'integer', label: '実Level Set格子 N×N', default: 48,
      min: 48, max: 96, step: 16, unit: 'セル/辺',
      meaning: '48/64/80/96セルで同じ半Lagrange移流・Godunov再初期化・R8 GPUテクスチャを再計算。描画ピクセルとは独立',
      sourceLocation: 'levelset.js / const N → h、field0、advect、redistance、texImage2D。levelset.frag は textureSize を参照',
      sourceFile: 'js', index: null,
      matcher: /^([ 	]*const N=)([^,\n]+)(,h=1\/N,dt=0\.04,steps=settings\.steps,shear=[^;\n]+;)/gm
    }),
    Object.freeze({
      id: 'shear', type: 'number', label: '水平せん断率', default: 0.6,
      min: 0, max: 1, step: 0.1, unit: 's⁻¹',
      meaning: '流速 u_x=shear·(y−0.5) m/s。厳密輪郭・粒子と実Level Set移流の両方が同じ値で変化',
      sourceLocation: 'levelset.js / const shear → advect、particles、u_shear',
      sourceFile: 'js', index: null,
      matcher: /^([ 	]*const N=[^,\n]+,h=1\/N,dt=0\.04,steps=settings\.steps,shear=)([^,\n]+)(,radius=0\.18;)/gm
    }),
    Object.freeze({
      id: 'redistance', type: 'integer', label: '再初期化の擬似時間反復数', default: 6,
      min: 0, max: 8, step: 2, unit: '反復/物理step',
      meaning: '0なら再初期化なし。2/4/6/8反復で界面付近の距離勾配と離散面積を比較。物理時間刻みと混同しない',
      sourceLocation: 'levelset.js / const redistanceIterations → redistance()',
      sourceFile: 'js', index: null,
      matcher: /^([ 	]*const redistanceIterations=)([^,\n]+)(,redistanceCFL=0\.30,particlesCount=64;)/gm
    })
  ]),
  FCG3: Object.freeze([Object.freeze({
    id: 'radius', type: 'number', label: '初期染料の半径', default: 0.14,
    min: 0.08, max: 0.3, step: 0.01, unit: '領域幅を1とする無次元座標',
    meaning: '実計算N×N格子の初期染料半径。格子数と物理stepを固定したときの染料輪郭を比較',
    sourceLocation: 'advection.js / const at の後の radius → initial()',
    sourceFile: 'js', index: null,
    matcher: /^([ \t]*const at=i=>[^\n]*?,[ \t]*radius[ \t]*=[ \t]*)([^;\n]+)(;)/gm
  }),Object.freeze({
    id: 'grid', type: 'integer', label: '実移流格子 N×N', default: 32,
    min: 32, max: 96, step: 32, unit: 'セル/辺',
    meaning: '32・64・96で同じ編集JSの半Lagrange移流とR8テクスチャを再計算。物理刻みdt=1/32 s・初期半径は保持し、表示画素とは区別',
    sourceLocation: 'advection.js / const N → at、sample、Float64配列、R8テクスチャ。advection.frag は textureSize を参照',
    sourceFile: 'js', index: null,
    matcher: /^([ \t]*const N=)([^,\n]+)(,[ \t]*dt=1\/32,[ \t]*omega=2\*Math\.PI;)/gm
  })])
});

export function parametersFor(lesson) {
  return LAB_PARAMETERS[lesson] || [];
}

function inspect(source, spec) {
  const matches = [...source.matchAll(spec.matcher)];
  if (matches.length !== 1) return {ok: false, reason: '対象の宣言が一意に見つかりません'};
  const match = matches[0];
  const literals = spec.index === null ? [match[2]] : match[2].split(',');
  if (spec.type === 'enum') {
    const raw = match[2].trim();
    const value = /^'[^']*'$/.test(raw) ? raw.slice(1,-1) : null;
    return value !== null && spec.values.includes(value) ?
      {ok: true, value, match, literals} :
      {ok: false, reason: 'GUI対象の文字列リテラルではありません。JSソースを直接編集してください'};
  }
  if (spec.index !== null && literals.length !== 3)
    return {ok: false, reason: '配列は3要素の数値リテラルを使用してください'};
  const values = literals.map(raw => {
    const text = raw.trim();
    return decimal.test(text) ? Number(text) : NaN;
  });
  if (values.some(value => !Number.isFinite(value)))
    return {ok: false, reason: '式はGUIで変更できません。JSソースを直接編集してください'};
  const value = values[spec.index === null ? 0 : spec.index];
  if (value < spec.min || value > spec.max)
    return {ok: false, reason: '現在値がGUIの設定範囲外です。JSソースを確認してください'};
  if (Math.abs((value - spec.min) / spec.step -
      Math.round((value - spec.min) / spec.step)) > 1e-7)
    return {ok: false, reason: '現在値がGUIの刻みと異なります。JSソースを優先します'};
  return {ok: true, value, match, literals};
}

export function readLabParameter(source, spec) {
  const state = inspect(source, spec);
  return state.ok ? {ok: true, value: state.value} : {ok: false, reason: state.reason};
}

export function writeLabParameter(source, spec, proposed) {
  const value = spec.type === 'enum' ? proposed : Number(proposed);
  if (spec.type === 'enum' ? !spec.values.includes(value) :
      (!Number.isFinite(value) || value < spec.min || value > spec.max ||
       (spec.type === 'integer' && !Number.isInteger(value)) ||
       Math.abs((value - spec.min) / spec.step -
         Math.round((value - spec.min) / spec.step)) > 1e-7)) {
    throw new RangeError(spec.id + ': GUI値は範囲と刻みに従ってください');
  }
  const found = inspect(source, spec);
  if (!found.ok) throw new Error(found.reason);
  const {match, literals} = found;
  let replacement;
  if (spec.index === null) {
    replacement = match[1] + (spec.type === 'enum' ? "'"+value+"'" : String(value)) + match[3];
  } else {
    literals[spec.index] = literals[spec.index].replace(
      literals[spec.index].trim(), String(value));
    replacement = match[1] + literals.join(',') + match[3];
  }
  return source.slice(0, match.index) + replacement +
    source.slice(match.index + match[0].length);
}


// An editable presentation interval must not disable the independent physics
// oracle. Admit *only* the current known source-linked FCG5 literal controls:
// all other JS/GLSL edits remain unverified rather than claiming a false pass.
const FCG5_VERIFIED_PARAMETER_IDS = Object.freeze([
  'grid','nu','force','dt','brush-radius','brush-strength','playback-ms'
]);

export function verifiedFCG5Physics(js,vertex,fragment,defaults) {
  if(typeof js!=='string'||vertex!==defaults?.vertex||fragment!==defaults?.fragment)
    return null;
  const specs=parametersFor('FCG5');
  if(specs.length!==FCG5_VERIFIED_PARAMETER_IDS.length||
     specs.some((spec,i)=>spec.id!==FCG5_VERIFIED_PARAMETER_IDS[i]))return null;
  const readings=specs.map(spec=>readLabParameter(js,spec));
  if(!readings.every(state=>state.ok))return null;
  try {
    let normalized=js,baseline=defaults.js;
    for(const spec of specs){
      normalized=writeLabParameter(normalized,spec,spec.default);
      baseline=writeLabParameter(baseline,spec,spec.default);
    }
    if(normalized!==baseline)return null;
  }catch{return null;}
  const value=Object.fromEntries(specs.map((spec,i)=>[spec.id,readings[i].value]));
  return {
    N:value.grid,nu:value.nu,force:value.force,dt:value.dt,
    brushRadius:value['brush-radius'],brushStrength:value['brush-strength']
  };
}


// Only known scalar/grid source edits may pass the independent FCG3 GPU oracle.
const FCG3_VERIFIED_PARAMETER_IDS=Object.freeze(['radius','grid']);
export function verifiedFCG3Physics(js,vertex,fragment,defaults) {
  if(typeof js!=='string'||vertex!==defaults?.vertex||fragment!==defaults?.fragment)
    return null;
  const specs=parametersFor('FCG3');
  if(specs.length!==FCG3_VERIFIED_PARAMETER_IDS.length||
     specs.some((spec,i)=>spec.id!==FCG3_VERIFIED_PARAMETER_IDS[i]))return null;
  const readings=specs.map(spec=>readLabParameter(js,spec));
  if(!readings.every(state=>state.ok))return null;
  try{
    let canonical=js,baseline=defaults.js;
    for(const spec of specs){
      canonical=writeLabParameter(canonical,spec,spec.default);
      baseline=writeLabParameter(baseline,spec,spec.default);
    }
    if(canonical!==baseline)return null;
  }catch{return null;}
  return {radius:readings[0].value,N:readings[1].value};
}

// A modified FCG8 shader or arbitrary learner JS cannot inherit the initial CPU oracle.
const FCG8_VERIFIED_PARAMETER_IDS=Object.freeze(['grid','shear','redistance']);
export function verifiedFCG8Physics(js,vertex,fragment,defaults) {
  if(typeof js!=='string'||vertex!==defaults?.vertex||fragment!==defaults?.fragment)
    return null;
  const specs=parametersFor('FCG8');
  if(specs.length!==FCG8_VERIFIED_PARAMETER_IDS.length||
     specs.some((spec,i)=>spec.id!==FCG8_VERIFIED_PARAMETER_IDS[i]))return null;
  const readings=specs.map(spec=>readLabParameter(js,spec));
  if(!readings.every(state=>state.ok))return null;
  try{
    let normalized=js,baseline=defaults.js;
    for(const spec of specs){
      normalized=writeLabParameter(normalized,spec,spec.default);
      baseline=writeLabParameter(baseline,spec,spec.default);
    }
    if(normalized!==baseline)return null;
  }catch{return null;}
  return {N:readings[0].value,shear:readings[1].value,
    redistanceIterations:readings[2].value};
}

export const FCG5_OBSERVATION_PRESETS = Object.freeze([
  Object.freeze({id:'baseline',label:'基準：渦と染料',nu:0.002,force:0.08}),
  Object.freeze({id:'no-force',label:'外力なし：初期渦の移動',nu:0.002,force:0}),
  Object.freeze({id:'stir',label:'強めの外力・低粘性',nu:0.001,force:0.16})
]);

// Edit the *actual learner source* as one transaction. A non-literal control
// prevents every write, so preset selection cannot partially rewrite the code.
export function applyFCG5ObservationPreset(source,id) {
  const preset=FCG5_OBSERVATION_PRESETS.find(item=>item.id===id);
  if(!preset)throw new RangeError('unknown FCG5 preset');
  const specs=parametersFor('FCG5');
  const target=['nu','force'].map(key=>specs.find(spec=>spec.id===key));
  if(target.some(spec=>!spec||!readLabParameter(source,spec).ok))
    throw new Error('編集済みのJS式はプリセットで上書きできません');
  let changed=source;
  for(const [spec,value] of [[target[0],preset.nu],[target[1],preset.force]])
    changed=writeLabParameter(changed,spec,value);
  return changed;
}

export function mountLabParameters(lesson, container,
                                   {getSource, setSource, rerun, isReady}) {
  const specs = parametersFor(lesson);
  if (!specs.length) return () => {};
  container.hidden = false;
  const heading = document.createElement('h2');
  heading.textContent = '実験パラメータ';
  const note = document.createElement('p');
  note.textContent = '値を動かすと実際のJSソースを書き換え、操作を終えると再実行します。コード編集も同じ値に反映されます。';
  container.append(heading, note);
  const controls = specs.map(spec => {
    const row = document.createElement('div');
    row.className = 'lab-parameter-row';
    const label = document.createElement('label');
    const id = 'parameter-' + spec.id;
    label.htmlFor = id;
    label.textContent = spec.label;
    const slider = document.createElement(spec.type === 'enum' ? 'select' : 'input');
    if (spec.type === 'enum') {
      for (const value of spec.values) {
        const option=document.createElement('option');
        option.value=value;option.textContent=value;
        slider.append(option);
      }
    } else {
      slider.type = 'range';
      slider.min = String(spec.min);
      slider.max = String(spec.max);
      slider.step = String(spec.step);
    }
    slider.id = id;
    slider.value = String(spec.default);
    slider.disabled = true;
    const display = document.createElement('output');
    display.htmlFor = id;
    display.textContent = String(spec.default);
    const description = document.createElement('small');
    description.textContent = spec.meaning + ' / 初期値 ' + spec.default +
      (spec.type === 'enum' ? ' / 選択肢 ' + spec.values.join(' / ') :
        ' / ' + spec.min + '〜' + spec.max + '（刻み ' + spec.step + '）') +
      ' / ' + spec.unit + ' / ' + spec.sourceLocation;
    const status = document.createElement('p');
    status.className = 'lab-parameter-status';
    status.setAttribute('role', 'status');
    row.append(label, slider, display, description, status);
    container.append(row);
    let changed = false;
    slider.addEventListener('input', () => {
      try {
        const next = writeLabParameter(getSource(), spec, slider.value);
        setSource(next);
        changed = true;
        status.textContent = '編集ソースに反映しました';
      } catch (error) {
        changed = false;
        status.textContent = String(error.message);
      }
    });
    slider.addEventListener('change', () => {
      if (changed && isReady()) {
        changed = false;
        rerun();
      }
    });
    return {spec, slider, display, status};
  });
  // FCG5: comparison presets alter nu and force only in the editable fluid.js.
  // Applying is explicit, so selecting an option never executes stored code.
  let refreshPreset=()=>{};
  if(lesson==='FCG5'){
    const row=document.createElement('div');
    row.className='lab-parameter-row fcg5-preset-row';
    const label=document.createElement('label');
    label.htmlFor='fcg5-observation-preset';
    label.textContent='流れの比較条件';
    const selector=document.createElement('select');
    selector.id='fcg5-observation-preset';
    for(const item of FCG5_OBSERVATION_PRESETS){
      const option=document.createElement('option');
      option.value=item.id;option.textContent=item.label;
      selector.append(option);
    }
    const apply=document.createElement('button');
    apply.type='button';apply.className='action';
    apply.textContent='この条件で実行';
    const description=document.createElement('small');
    description.textContent='選択後に押すと fluid.js の nu・forceAmplitude だけを書き換えて再実行します。N・dt・染料ブラシと手動コード編集は保持します。';
    const status=document.createElement('p');
    status.className='lab-parameter-status';
    status.setAttribute('role','status');
    apply.addEventListener('click',()=>{
      try{
        if(!isReady())return;
        const updated=applyFCG5ObservationPreset(getSource(),selector.value);
        setSource(updated);
        status.textContent='実編集ソースに反映して実行します';
        rerun();
      }catch(error){
        status.textContent=String(error.message);
      }
    });
    row.append(label,selector,apply,description,status);
    container.append(row);
    refreshPreset=()=>{
      const source=getSource();
      const targets=parametersFor('FCG5').filter(s=>['nu','force'].includes(s.id));
      apply.disabled=!isReady()||targets.length!==2||
        targets.some(s=>!readLabParameter(source,s).ok);
      if(apply.disabled&&isReady())
        status.textContent='nu・forceAmplitude は JS を直接編集してください';
      else if(!apply.disabled&&status.textContent.includes('直接編集'))
        status.textContent='';
    };
  }
  const refresh = () => {
    for (const {spec, slider, display, status} of controls) {
      const state = readLabParameter(getSource(), spec);
      slider.disabled = !isReady() || !state.ok;
      if (state.ok) {
        slider.value = String(state.value);
        display.textContent = String(state.value); // unit and scale are in the adjacent description
        if (!status.textContent.startsWith('編集ソースに反映')) status.textContent = '';
      } else {
        display.textContent = 'JSで編集';
        status.textContent = state.reason;
      }
    }
    refreshPreset();
  };
  refresh();
  return refresh;
}
