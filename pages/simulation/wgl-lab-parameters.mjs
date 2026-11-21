// G2: the slider edits the learner's JS literal, not a parallel GPU/CPU model.
// An unsupported expression disables the GUI; the learner source is never overwritten.
const decimal = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;

export const LAB_PARAMETERS = Object.freeze({
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
  FCG5: Object.freeze([
    Object.freeze({
      id: 'nu', type: 'number', label: '動粘性係数 ν', default: 0.002,
      min: 0, max: 0.02, step: 0.001, unit: 'm²/s',
      meaning: '面速度の陽的粘性拡散（既定のN=12、dt=0.04ではr=dt·ν/h²≤1/4）',
      sourceLocation: 'fluid.js / const nu → advanceFluidStep() の r',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const N=12,h=1\/N,dt=0\.04,rho=1,nu=)([^,\n]+)(,forceAmplitude=[^;\n]+;)/gm
    }),
    Object.freeze({
      id: 'force', type: 'number', label: '外力の流れ関数振幅', default: 0.08,
      min: 0, max: 0.2, step: 0.01, unit: 'm²/s²',
      meaning: '外力加速度の回転差分に用いる流れ関数の振幅（0では外力なし）',
      sourceLocation: 'fluid.js / const forceAmplitude → psi() → starU/starV',
      sourceFile: 'js', index: null,
      matcher: /^([ \t]*const N=12,h=1\/N,dt=0\.04,rho=1,nu=[^,\n]+,forceAmplitude=)([^;\n]+)(;)/gm
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
  FCG3: Object.freeze([Object.freeze({
    id: 'radius', type: 'number', label: '初期染料の半径', default: 0.14,
    min: 0.08, max: 0.3, step: 0.01, unit: '領域幅を1とする無次元座標',
    meaning: '染料の初期分布の半径（32×32計算格子は変更しない）',
    sourceLocation: 'advection.js / const at の後の radius → initial()',
    sourceFile: 'js', index: null,
    matcher: /^([ \t]*const at=i=>[^\n]*?,[ \t]*radius[ \t]*=[ \t]*)([^;\n]+)(;)/gm
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
  const value = Number(proposed);
  if (!Number.isFinite(value) || value < spec.min || value > spec.max ||
      (spec.type === 'integer' && !Number.isInteger(value)) ||
      Math.abs((value - spec.min) / spec.step -
        Math.round((value - spec.min) / spec.step)) > 1e-7) {
    throw new RangeError(spec.id + ': GUI値は範囲と刻みに従ってください');
  }
  const found = inspect(source, spec);
  if (!found.ok) throw new Error(found.reason);
  const {match, literals} = found;
  let replacement;
  if (spec.index === null) {
    replacement = match[1] + String(value) + match[3];
  } else {
    literals[spec.index] = literals[spec.index].replace(
      literals[spec.index].trim(), String(value));
    replacement = match[1] + literals.join(',') + match[3];
  }
  return source.slice(0, match.index) + replacement +
    source.slice(match.index + match[0].length);
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
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.id = id;
    slider.min = String(spec.min);
    slider.max = String(spec.max);
    slider.step = String(spec.step);
    slider.value = String(spec.default);
    slider.disabled = true;
    const display = document.createElement('output');
    display.htmlFor = id;
    display.textContent = String(spec.default);
    const description = document.createElement('small');
    description.textContent = spec.meaning + ' / 初期値 ' + spec.default +
      ' / ' + spec.min + '〜' + spec.max + '（刻み ' + spec.step + '） / ' +
      spec.unit + ' / ' + spec.sourceLocation;
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
  };
  refresh();
  return refresh;
}
