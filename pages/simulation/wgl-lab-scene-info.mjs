// G3: describe the actual editable sandbox canvas; never compute or display a second simulation.
const descriptions = Object.freeze({
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
      !Number.isInteger(steps) || steps < 0) return null;
  return Object.freeze({
    grid: item.grid, pixels: width+'×'+height+' px（GPU描画バッファ）',
    color: item.color, clock: item.clock(steps),
    mode: item.mode, source: item.source
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
  note.textContent = 'ここに示すstepは実行直後の値。再生中の表示が進んでも、初期CPU/GPU画素照合の基準値は更新されません。';
  parent.append(title, list, note);
  parent.hidden = false;
  return snapshot => {
    const info = sceneDescription(lesson, snapshot);
    for (const [key, element] of displays) {
      element.textContent = info ? info[key] : '未実行';
    }
  };
}
