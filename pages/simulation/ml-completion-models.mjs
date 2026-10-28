// Eight previously Python-only ML experiments. All values shown by the UI are
// computed here; fixed seeds are for reproducibility, not a claim of independence.
const integer = (value, lo, hi) => Number.isSafeInteger(value) && value >= lo && value <= hi;
const clamp = (x, lo = 1e-12, hi = 1 - 1e-12) => Math.max(lo, Math.min(hi, x));
const sq = x => x * x;
const average = values => values.reduce((a, b) => a + b, 0) / values.length;
const sigmoid = x => x >= 0 ? 1 / (1 + Math.exp(-x)) : Math.exp(x) / (1 + Math.exp(x));
const softplus = x => Math.max(x, 0) + Math.log1p(Math.exp(-Math.abs(x)));
const entropy = p => -p * Math.log(clamp(p)) - (1 - p) * Math.log(clamp(1 - p));

function random32(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let x = state;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}
function gaussian(random) {
  return Math.sqrt(-2 * Math.log(Math.max(random(), Number.MIN_VALUE))) * Math.cos(2 * Math.PI * random());
}
const metric = (name, value) => ({ name, value });
const chart = (title, xLabel, yLabel, series) => ({ title, xLabel, yLabel, series });
const curve = (name, points, scatter = false) => ({ name, points, scatter });
const numbered = values => values.map((y, x) => [x, y]);

function logisticExperiment(p) {
  const random = random32(p.seed);
  const xx = [-2, -1.4, -0.8, -0.3, 0.3, 0.8, 1.4, 2].map(x => x + 0.12 * (random() - 0.5));
  const yy = p.separation === 'separated' ? [0, 0, 0, 0, 1, 1, 1, 1] : [0, 0, 1, 0, 1, 0, 1, 1];
  let w = 0, b = 0;
  const losses = [], norms = [];
  const loss = () => average(xx.map((x, i) => softplus(w * x + b) - yy[i] * (w * x + b))) +
    p.ridge * (sq(w) + sq(b)) / 2;
  for (let t = 0; t <= p.steps; t++) {
    losses.push(loss()); norms.push(Math.hypot(w, b));
    if (t === p.steps) break;
    const errors = xx.map((x, i) => sigmoid(w * x + b) - yy[i]);
    const dw = average(errors.map((e, i) => e * xx[i])) + p.ridge * w;
    const db = average(errors) + p.ridge * b;
    w -= p.rate * dw; b -= p.rate * db;
  }
  const probs = xx.map(x => sigmoid(w * x + b));
  const boundary = Math.abs(w) > 1e-10 ? -b / w : null;
  return {
    metrics: [metric('係数 w', w), metric('切片 b', b), metric('境界 x = −b/w', boundary),
      metric('最終負対数尤度＋L2', losses.at(-1)), metric('係数ノルム', norms.at(-1)),
      metric('訓練正解率', average(probs.map((q, i) => Number((q >= .5) === Boolean(yy[i])))))],
    charts: [chart('確率曲線・観測ラベル', '特徴量 x', 'P(Y=1|x)', [
      curve('学習確率', Array.from({ length: 61 }, (_, i) => [-2.5 + i / 12, sigmoid(w * (-2.5 + i / 12) + b)])),
      curve('観測ラベル', xx.map((x, i) => [x, yy[i]]), true)]),
    chart('学習履歴', '勾配更新回数', '値', [curve('損失', numbered(losses)), curve('|| (w,b) ||', numbered(norms))])],
    note: p.separation === 'separated' && p.ridge === 0
      ? '完全分離・正則化なし：有限の最尤解が存在せず、反復を増やすほど係数が大きくなる。有限反復での数値値は発散の証明ではない。'
      : '重複ラベルまたは正則化の効果を比較。大きすぎる学習率では損失が減るとは限らない。',
  };
}

// Least-squares piecewise-constant regression. Validation leakage means its
// labels enter the fit before model selection. The independent test is untouched.
function segmentedFit(data, bins, useValidation = []) {
  const all = data.concat(useValidation);
  const total = average(all.map(row => row.y));
  const sums = Array(bins).fill(0), counts = Array(bins).fill(0);
  for (const row of all) {
    const k = Math.min(bins - 1, Math.floor(row.x * bins));
    sums[k] += row.y; counts[k]++;
  }
  return x => { const k = Math.min(bins - 1, Math.floor(x * bins)); return counts[k] ? sums[k] / counts[k] : total; };
}
const mse = (data, predict) => average(data.map(row => sq(row.y - predict(row.x))));
function validationExperiment(p) {
  const random = random32(p.seed);
  const make = n => Array.from({ length: n }, () => {
    const x = random(); return { x, y: x + 0.32 * Math.sin(4 * Math.PI * x) + p.noise * gaussian(random) };
  });
  const train = make(Math.round(100 * (1 - p.validationFraction)));
  const validation = make(Math.round(100 * p.validationFraction));
  const test = make(200);
  const choices = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16].slice(0, p.candidates);
  const candidates = choices.map(bins => {
    const fitted = segmentedFit(train, bins, p.leakage === 'leaked' ? validation : []);
    const holdout = mse(validation, fitted);
    const tested = mse(test, fitted);
    const folds = Array.from({ length: 3 }, (_, k) => train.filter((_, i) => i % 3 === k));
    const cv = average(folds.map((fold, k) => mse(fold,
      segmentedFit(train.filter((_, i) => i % 3 !== k), bins))));
    return { bins, holdout, tested, cv, prediction: fitted };
  });
  const chosen = candidates.reduce((best, item) => item.holdout < best.holdout ? item : best);
  return {
    metrics: [metric('選択区間数', chosen.bins), metric('選択した保留MSE', chosen.holdout),
      metric('独立テストMSE', chosen.tested), metric('同じ候補の3-fold CV MSE', chosen.cv),
      metric('検証に使った標本数', validation.length)],
    charts: [chart('候補ごとの検証・独立評価', '区間数', '平均平方誤差', [
      curve('検証MSE', candidates.map(o => [o.bins, o.holdout])),
      curve('独立テストMSE', candidates.map(o => [o.bins, o.tested])),
      curve('3-fold CV', candidates.map(o => [o.bins, o.cv]))]),
    chart('選択した予測器と保留標本', 'x', 'y', [
      curve('選択モデル', Array.from({ length: 101 }, (_, i) => [i / 100, chosen.prediction(i / 100)])),
      curve('検証標本', validation.map(o => [o.x, o.y]), true)])],
    note: p.leakage === 'leaked'
      ? '漏洩モード：検証ラベルを予測器の学習にも使用。選択に用いた検証誤差は独立な保留評価ではない。独立テストは学習に利用していない。'
      : 'trainのみで候補を学習し検証で選択。検証最小値は選択バイアスを受け得る。CVは訓練部分だけで3分割し、独立テストには触れない。',
  };
}

function classificationExperiment(p) {
  const random = random32(p.seed);
  const data = Array.from({ length: p.count }, () => {
    const y = Number(random() < p.prevalence);
    const base = clamp((y ? 0.7 : 0.2) + p.spread * gaussian(random));
    const q = clamp(sigmoid(p.scale * Math.log(base / (1 - base)) + p.bias));
    return { y, q };
  });
  const confusion = threshold => data.reduce((a, o) => {
    const positive = o.q >= threshold;
    a[positive ? o.y ? 'tp' : 'fp' : o.y ? 'fn' : 'tn']++;
    return a;
  }, { tp: 0, fp: 0, tn: 0, fn: 0 });
  const c = confusion(p.threshold);
  const precision = c.tp + c.fp ? c.tp / (c.tp + c.fp) : null;
  const recall = c.tp + c.fn ? c.tp / (c.tp + c.fn) : null;
  const roc = [], pr = [];
  const positives = data.filter(o => o.y === 1).length;
  const negatives = data.length - positives;
  for (let i = 0; i <= 50; i++) {
    const t = 1.000001 - i / 50;
    const k = confusion(t);
    const tpr = k.tp + k.fn ? k.tp / (k.tp + k.fn) : 0;
    const fpr = k.fp + k.tn ? k.fp / (k.fp + k.tn) : 0;
    if (positives && negatives) roc.push([fpr, tpr]);
    if (positives && k.tp + k.fp > 0) pr.push([tpr, k.tp / (k.tp + k.fp)]);
  }
  const bins = Array.from({ length: 5 }, () => ({ sum: 0, pos: 0, n: 0 }));
  for (const o of data) { const a = bins[Math.min(4, Math.floor(o.q * 5))]; a.sum += o.q; a.pos += o.y; a.n++; }
  return {
    metrics: [metric('TP', c.tp), metric('FP', c.fp), metric('TN', c.tn), metric('FN', c.fn),
      metric('適合率 precision', precision), metric('再現率 recall', recall),
      metric('Brier損失', average(data.map(o => sq(o.q - o.y)))),
      metric('対数損失 (nat)', average(data.map(o => -o.y * Math.log(o.q) - (1 - o.y) * Math.log(1 - o.q))))],
    charts: [chart('校正：同じ確率帯の平均', '平均予測確率', '実際の陽性率', [
      curve('理想校正', [[0, 0], [1, 1]]),
      curve('観測帯（非空のみ）', bins.filter(o => o.n).map(o => [o.sum / o.n, o.pos / o.n]), true)]),
    chart('ROC（右上へ）', 'FPR', 'TPR', roc.length
      ? [curve('ROC', roc), curve('対角基準', [[0, 0], [1, 1]])]
      : [curve('両クラスの標本がなく未定義', [])]),
    chart('PR（右上へ）', 'Recall', 'Precision', [curve('PR', pr)])],
    note: '混同行列は閾値で変わる一方、同じ確率値のBrierと対数損失は閾値には依存しない。陽性がいない標本・陽性予測がない閾値では率を未定義と表示。',
  };
}

function pcaExperiment(p) {
  const random = random32(p.seed), angle = p.angle * Math.PI / 180;
  const ca = Math.cos(angle), sa = Math.sin(angle);
  const data = Array.from({ length: p.count }, () => {
    const a = p.aspect * gaussian(random), b = gaussian(random);
    return [ca * a - sa * b + p.noise * gaussian(random) + 2,
      sa * a + ca * b + p.noise * gaussian(random) - 1];
  });
  const mean = [average(data.map(o => o[0])), average(data.map(o => o[1]))];
  const centered = data.map(o => [o[0] - mean[0], o[1] - mean[1]]);
  const a = average(centered.map(o => sq(o[0]))), b = average(centered.map(o => o[0] * o[1]));
  const d = average(centered.map(o => sq(o[1])));
  const disc = Math.hypot(a - d, 2 * b);
  const values = [(a + d + disc) / 2, Math.max(0, (a + d - disc) / 2)];
  const theta = Math.atan2(2 * b, a - d) / 2;
  const axes = [[Math.cos(theta), Math.sin(theta)], [-Math.sin(theta), Math.cos(theta)]];
  const reconstructed = centered.map(v => {
    const vhat = [0, 0];
    for (let k = 0; k < p.rank; k++) {
      const projection = v[0] * axes[k][0] + v[1] * axes[k][1];
      vhat[0] += projection * axes[k][0]; vhat[1] += projection * axes[k][1];
    }
    return [vhat[0] + mean[0], vhat[1] + mean[1]];
  });
  const residual = average(data.map((v, i) => sq(v[0] - reconstructed[i][0]) + sq(v[1] - reconstructed[i][1])));
  return {
    metrics: [metric('第一固有値 λ₁', values[0]), metric('第二固有値 λ₂', values[1]),
      metric('第一特異値 σ₁', Math.sqrt(p.count * values[0])),
      metric('第二特異値 σ₂', Math.sqrt(p.count * values[1])),
      metric('再構成誤差 / n', residual), metric('理論の捨てた固有値和', values.slice(p.rank).reduce((s, x) => s + x, 0))],
    charts: [chart('元点群・保持次元で復元した点', 'x₁', 'x₂', [
      curve('中心化前データ', data, true), curve('PCA復元', reconstructed, true),
      curve('第一主成分方向', [[mean[0] - 2 * axes[0][0], mean[1] - 2 * axes[0][1]],
        [mean[0] + 2 * axes[0][0], mean[1] + 2 * axes[0][1]]])]),
    chart('固有値とランク保持', '主成分番号', 'σ² / n', [curve('固有値', [[1, values[0]], [2, values[1]]])])],
    note: '中心化標本の共分散を n で割った模型。標本再構成誤差/n は捨てた固有値和と一致する。固有値が一致すると軸は一意でない。',
  };
}

function kmeansExperiment(p) {
  const random = random32(p.seed);
  const centers = [[-2, -1], [2, 0], [0, 3]];
  const data = centers.flatMap(c => Array.from({ length: 30 }, () =>
    [c[0] + p.noise * gaussian(random), c[1] + p.noise * gaussian(random)]));
  let centroids = p.initial === 'poor'
    ? data.slice(0, p.k).map(v => v.slice())
    : [data[0], data[30], data[60]].slice(0, p.k).map(v => v.slice());
  const distance = (x, y) => sq(x[0] - y[0]) + sq(x[1] - y[1]);
  const assign = (c, previous = null) => data.map((x, i) => {
    let best = previous ? previous[i] : 0, bestDistance = distance(x, c[best]);
    for (let j = 0; j < c.length; j++) {
      const d = distance(x, c[j]);
      if (d < bestDistance - 1e-12) { best = j; bestDistance = d; }
    }
    return best; // equal-distance ties retain the previous label when available
  });
  const objective = c => average(data.map(x => Math.min(...c.map(v => distance(x, v)))));
  const history = [objective(centroids)];
  const paths = centroids.map((v) => [v.slice()]);
  let labels = assign(centroids);
  for (let t = 0; t < p.steps; t++) {
    centroids = centroids.map((old, k) => {
      const subset = data.filter((_, i) => labels[i] === k);
      return subset.length ? [average(subset.map(v => v[0])), average(subset.map(v => v[1]))] : old;
    });
    centroids.forEach((v, i) => paths[i].push(v.slice()));
    history.push(objective(centroids));
    labels = assign(centroids, labels);
  }
  const sizes = centroids.map((_, j) => labels.filter(i => i === j).length);
  const means = centers.map((_, j) => [average(data.slice(30 * j, 30 * (j + 1)).map(v => v[0])),
    average(data.slice(30 * j, 30 * (j + 1)).map(v => v[1]))]);
  const ward = 15 * distance(means[0], means[1]); // nA=nB=30, Δ=nAnB/(nA+nB)||meanA−meanB||²
  return {
    metrics: [metric('最初の群内平方和/n', history[0]), metric('現在の群内平方和/n', history.at(-1)),
      metric('空群数', sizes.filter(n => n === 0).length), metric('真の群0/1のWard増分', ward)],
    charts: [chart('観測点・現在重心・重心軌道', 'x₁', 'x₂', [
      curve('標本点', data, true), ...paths.map((path, i) => curve('重心' + (i + 1) + 'の軌道', path)),
      curve('最終重心', centroids, true)]),
    chart('Lloyd目的関数（非増加）', '更新回数', '平方和 / n', [curve('目的値', numbered(history))])],
    note: p.initial === 'poor'
      ? '悪い初期値：重心をすべて最初の群から選ぶ。空群は旧重心を維持し、局所解・初期値依存を観察する。'
      : '各真の群から初期重心を採用。各反復で割当→非空群の平均を更新するため目的値は増加しない（有限精度を除く）。',
    history,
  };
}

function shiftExperiment(p) {
  const n = 500;
  const make = (count, px, random) => Array.from({ length: count }, () => {
    const x = Number(random() < px), y = Number(random() < (x ? .8 : .1));
    const response = p.missing === 'mcar' ? .8 : p.missing === 'mar'
      ? (x ? .35 : .9) : (y ? .3 : .9);
    return { x, y, observed: random() < response };
  });
  const train = make(n, .3, random32(p.seed ^ 0x5a9ef021));
  const test = make(n, p.shift, random32(p.seed ^ 0x62f1ab83));
  const audit = make(n, p.shift, random32(p.seed ^ 0xa60dc5b9));
  const training = p.leak === 'on' ? train.filter(o => o.observed).concat(test) : train.filter(o => o.observed);
  const q = [0, 1].map(x => {
    const subset = training.filter(o => o.x === x);
    return (subset.reduce((s, o) => s + o.y, 0) + 1) / (subset.length + 2);
  });
  const brier = data => average(data.map(o => sq(q[o.x] - o.y)));
  const calibration = data => average(data.map(o => q[o.x] - o.y));
  const trainObserved = train.filter(o => o.observed);
  return {
    metrics: [metric('訓練回答率', trainObserved.length / n), metric('推定 P(Y=1|X=0)', q[0]),
      metric('推定 P(Y=1|X=1)', q[1]), metric('訓練回答者Brier', brier(trainObserved)),
      metric('運用テストBrier', brier(test)), metric('独立監査Brier', brier(audit)),
      metric('運用校正差（予測−実現）', calibration(test)),
      metric('運用母集団陽性率（理論）', (1 - p.shift) * .1 + p.shift * .8)],
    charts: [chart('条件付き陽性率', '二値特徴量 X', 'P(Y=1|X)', [
      curve('真の条件付き確率', [[0, .1], [1, .8]]), curve('学習した予測', [[0, q[0]], [1, q[1]]])]),
    chart('評価に使った標本ごとのBrier', 'train回答者=0, test=1, 独立=2', '平均Brier', [
      curve('実測損失', [[0, brier(trainObserved)], [1, brier(test)], [2, brier(audit)]])])],
    note: (p.missing === 'mnar' ? 'MNAR：回答確率は未観測のYにも依存し、観測だけでは一般に識別不能。' :
      p.missing === 'mar' ? 'MAR：回答確率は観測Xで変わる。完全ケースの平均はそのまま母集団平均ではない。' :
      'MCAR：回答確率はX,Yに依存しない。') + (p.leak === 'on'
      ? ' 【漏洩】運用テストの正解ラベルを予測器の学習に混入。テスト値を独立評価と呼べない。監査用標本は未使用。'
      : ' 独立テストは学習と分離。シフト下でも条件付き確率の模型自体は不変。'),
  };
}

function meanFieldExperiment(p) {
  let a = p.q1, b = p.q2;
  const logZ = Math.log(3 + Math.exp(p.coupling));
  const elbo = () => p.coupling * a * b + entropy(a) + entropy(b);
  const trueMarginal = (1 + Math.exp(p.coupling)) / (3 + Math.exp(p.coupling));
  const history = [], q1 = [], q2 = [];
  for (let t = 0; t <= p.steps; t++) {
    if (p.family === 'full') { a = trueMarginal; b = trueMarginal; }
    history.push(p.family === 'full' ? logZ : elbo());
    q1.push(a); q2.push(b);
    if (t === p.steps || p.family === 'full') continue;
    if (p.order === '12') { a = sigmoid(p.coupling * b); b = sigmoid(p.coupling * a); }
    else { b = sigmoid(p.coupling * a); a = sigmoid(p.coupling * b); }
  }
  return {
    metrics: [metric('最終 q₁(1)', a), metric('最終 q₂(1)', b),
      metric('真の P(Z₁=1) = P(Z₂=1)', trueMarginal), metric('ELBO', history.at(-1)),
      metric('log evidence = log Z', logZ), metric('KL(q||posterior)', logZ - history.at(-1))],
    charts: [chart('逐次座標更新と真の周辺', '更新回数', '確率', [
      curve('q₁(1)', numbered(q1)), curve('q₂(1)', numbered(q2)),
      curve('真の周辺', [[0, trueMarginal], [p.steps, trueMarginal]])]),
    chart('証拠下界（非減少）', '更新回数', 'ELBO', [curve('ELBO', numbered(history)),
      curve('log Z', [[0, logZ], [p.steps, logZ]])])],
    note: p.family === 'full'
      ? '全結合変分族：4状態を正規化して真の事後をそのまま表現し、KL=0。初期因子・座標更新順は適用されない（曲線は同じ厳密値）。'
      : '独立Mean-field族：全4状態を列挙する p(z₁,z₂) ∝ exp(c z₁z₂) の逐次座標更新。q₁q₂ は真の相関を表せない。ELBOの単調性は各座標を厳密最大化した場合に限る。',
    history,
  };
}

function vaeExperiment(p) {
  const w = [p.weight1, p.weight2];
  const mu = [p.encoderMean1, p.encoderMean2];
  const std = [p.encoderStd1, p.encoderStd2];
  const variances = std.map(sq), priorVar = sq(p.priorStd), decoderVar = sq(p.decoderStd);
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
  const priorMean = [p.priorMean, p.priorMean];
  const evidenceMean = dot(w, priorMean);
  const evidenceVar = decoderVar + priorVar * dot(w, w);
  const posteriorMean = w.map(v => p.priorMean + priorVar * v * (p.x - evidenceMean) / evidenceVar);
  const posteriorDiagonal = w.map(v => priorVar - sq(priorVar * v) / evidenceVar);
  const posteriorOffDiagonal = -sq(priorVar) * w[0] * w[1] / evidenceVar;
  const detPosterior = posteriorDiagonal[0] * posteriorDiagonal[1] - sq(posteriorOffDiagonal);
  const inv00 = posteriorDiagonal[1] / detPosterior;
  const inv11 = posteriorDiagonal[0] / detPosterior;
  const inv01 = -posteriorOffDiagonal / detPosterior;
  const recon = -.5 * (Math.log(2 * Math.PI * decoderVar) +
    (sq(p.x - dot(w, mu)) + w.reduce((s, v, j) => s + sq(v) * variances[j], 0)) / decoderVar);
  const klPrior = .5 * mu.reduce((sum, v, j) => sum +
    Math.log(priorVar / variances[j]) + (variances[j] + sq(v - p.priorMean)) / priorVar - 1, 0);
  const elbo = recon - klPrior;
  const logEvidence = -.5 * (Math.log(2 * Math.PI * evidenceVar) + sq(p.x - evidenceMean) / evidenceVar);
  const delta = mu.map((v, i) => v - posteriorMean[i]);
  const posteriorKl = .5 * (Math.log(detPosterior / (variances[0] * variances[1])) - 2 +
    inv00 * variances[0] + inv11 * variances[1] +
    inv00 * sq(delta[0]) + 2 * inv01 * delta[0] * delta[1] + inv11 * sq(delta[1]));
  const random = random32(p.seed);
  const generated = [], reconstructed = [], priorLatents = [], encoderLatents = [];
  for (let i = 0; i < p.samples; i++) {
    const zPrior = priorMean.map(v => v + p.priorStd * gaussian(random));
    const zPost = mu.map((v, j) => v + std[j] * gaussian(random));
    priorLatents.push(zPrior); encoderLatents.push(zPost);
    generated.push([i, dot(w, zPrior) + p.decoderStd * gaussian(random)]);
    reconstructed.push([i, dot(w, zPost) + p.decoderStd * gaussian(random)]);
  }
  return {
    metrics: [metric('E_q log p(x|z) 再構成項', recon), metric('KL(q||prior)', klPrior),
      metric('通常の ELBO（β=1）', elbo), metric('β目的（β≠1はELBOではない）', recon - p.beta * klPrior),
      metric('真の log p(x)', logEvidence), metric('KL(q||真の事後)', posteriorKl),
      metric('真の事後平均 z₁', posteriorMean[0]), metric('真の事後平均 z₂', posteriorMean[1]),
      metric('真の事後分散 z₁', posteriorDiagonal[0]), metric('真の事後分散 z₂', posteriorDiagonal[1]),
      metric('真の事後共分散 (1,2)', posteriorOffDiagonal)],
    charts: [chart('二次元潜在空間：事前とencoder標本', 'z₁', 'z₂', [
      curve('prior N(m,vI)', priorLatents, true), curve('encoder q', encoderLatents, true)]),
    chart('生成 x と再構成 x の標本列', '標本番号', '出力 x', [
      curve('事前→生成', generated, true), curve('encoder→再構成', reconstructed, true),
      curve('観測x', [[0, p.x], [p.samples - 1, p.x]])])],
    note: w.every(v => v === 0)
      ? '潜在崩壊の対照：decoderがz₁,z₂を無視し、真の事後は指定された事前と一致。encoderを事前にするとKL=0。'
      : '二次元潜在の線形Gaussian VAE。β=1で log p(x)−ELBO=KL(q||真の事後)。両係数が非零なら真の事後は一般に相関し、対角Gaussian encoderでは完全一致できない。標本雲はMonte Carlo可視化、閉形式の値には標本誤差を入れていない。',
  };
}

const number = (label, value, min, max, step = .1) => ({ label, value, min, max, step });
const select = (label, value, options) => ({ label, value, options });
const sharedSeed = number('乱数seed', 123, 0, 4294967295, 1);
const sharedSteps = (value, max = 300) => number('更新回数（再生/1歩でも操作可能）', value, 0, max, 1);
export const mlLabSpecs = Object.freeze({
  'ML1-08': { title: 'Logistic回帰・分離', mode: 'steps', theory: '#thm-ml1-08-separation-no-mle',
    inputs: { separation: select('点群ラベル', 'separated', [['separated', '完全分離'], ['overlap', '重なりあり']]),
      rate: number('学習率', .6, .01, 8, .05), ridge: number('L2係数', 0, 0, 2, .05),
      steps: sharedSteps(40), seed: sharedSeed }, run: logisticExperiment },
  'ML1-12': { title: '検証分割・選択・漏洩', theory: '#thm-ml1-12-selection-optimism',
    inputs: { validationFraction: number('検証の比率', .3, .15, .7, .05),
      noise: number('観測ノイズ標準偏差', .3, .05, 2, .05),
      candidates: number('比較候補数（同じ検証の再利用）', 8, 2, 10, 1),
      leakage: select('検証ラベル漏洩', 'clean', [['clean', 'なし'], ['leaked', 'あり（反例）']]), seed: sharedSeed }, run: validationExperiment },
  'ML1-13': { title: '閾値・ROC/PR・校正', theory: '#def-ml1-13-calibration',
    inputs: { prevalence: number('陽性率', .2, .02, .8, .02),
      threshold: number('決定閾値', .5, 0, 1, .05),
      scale: number('logit尺度', 1, .2, 3, .1), bias: number('logitずれ', 0, -2, 2, .1),
      spread: number('予測点群のばらつき', .14, .01, .6, .01),
      count: number('評価標本数', 300, 100, 2000, 50), seed: sharedSeed }, run: classificationExperiment },
  'ML1-19': { title: 'PCA・特異値・再構成', theory: '#thm-ml1-19-pca-reconstruction',
    inputs: { angle: number('楕円の回転角（度）', 35, 0, 180, 5),
      aspect: number('長軸/短軸の標準偏差比', 3, 1, 6, .25),
      noise: number('等方ノイズ標準偏差', .15, 0, 2, .05),
      rank: number('保持次元', 1, 0, 2, 1), count: number('標本数', 180, 20, 500, 20),
      seed: sharedSeed }, run: pcaExperiment },
  'ML1-20': { title: 'Lloyd k-means・初期値', mode: 'steps', theory: '#thm-ml1-20-lloyd-descent',
    inputs: { k: number('群数 k', 3, 2, 3, 1),
      initial: select('初期重心', 'good', [['good', '各群から'], ['poor', '最初の一群から（反例）']]),
      noise: number('点群ノイズ', .55, .05, 2, .05), steps: sharedSteps(8, 40),
      seed: sharedSeed }, run: kmeansExperiment },
  'ML1-21': { title: '分布シフト・欠測・漏洩', theory: '#thm-ml1-21-joint-weighting',
    inputs: { shift: number('運用P(X=1)', .7, .05, .95, .05),
      missing: select('欠測機構', 'mar', [['mcar', 'MCAR'], ['mar', 'MAR'], ['mnar', 'MNAR']]),
      leak: select('評価ラベル漏洩', 'off', [['off', 'なし'], ['on', 'あり（反例）']]),
      seed: sharedSeed }, run: shiftExperiment },
  'ML2-09': { title: 'Mean-field座標更新・ELBO', mode: 'steps', theory: '#thm-ml2-09-coordinate',
    inputs: { q1: number('初期 q₁(1)', .2, .01, .99, .01), q2: number('初期 q₂(1)', .7, .01, .99, .01),
      coupling: number('結合係数 c', 1.38629436112, -2, 4, .1),
      order: select('更新順序', '12', [['12', 'q₁→q₂'], ['21', 'q₂→q₁']]),
      family: select('変分族', 'factorized', [['factorized', '独立Bernoulli積'], ['full', '全結合4状態（対照）']]),
      steps: sharedSteps(8, 80) }, run: meanFieldExperiment },
  'ML2-20': { title: '線形Gaussian VAE・ELBO・潜在崩壊', theory: '#thm-ml2-20-elbo',
    inputs: { x: number('観測 x', 1, -4, 4, .1),
      weight1: number('decoder係数 w₁', 1.5, -3, 3, .1),
      weight2: number('decoder係数 w₂（両方0で崩壊）', .7, -3, 3, .1),
      priorMean: number('事前平均 m（両座標）', 0, -2, 2, .1),
      priorStd: number('事前標準偏差', 1, .2, 3, .1),
      decoderStd: number('decoder標準偏差 σ', .7, .1, 3, .1),
      encoderMean1: number('encoder平均 μ₁', .6, -3, 3, .1),
      encoderMean2: number('encoder平均 μ₂', .1, -3, 3, .1),
      encoderStd1: number('encoder標準偏差 s₁', .6, .1, 3, .1),
      encoderStd2: number('encoder標準偏差 s₂', .8, .1, 3, .1),
      beta: number('KL重み β', 1, 0, 6, .2), samples: number('表示標本数', 120, 20, 500, 20),
      seed: sharedSeed }, run: vaeExperiment },
});

export function runMlLab(id, input = {}) {
  const spec = mlLabSpecs[id];
  if (!spec) throw new RangeError('未登録のMLラボ: ' + id);
  const config = {};
  for (const [key, field] of Object.entries(spec.inputs)) {
    const value = Object.hasOwn(input, key) ? input[key] : field.value;
    if (field.options) {
      if (typeof value !== 'string' || !field.options.some(option => option[0] === value)) {
        throw new RangeError(key + ': 選択肢にありません');
      }
    } else if (!Number.isFinite(value) || value < field.min || value > field.max ||
      (Number.isInteger(field.step) && !integer(value, field.min, field.max))) {
      throw new RangeError(key + ': 範囲外または不正な数値');
    }
    config[key] = value;
  }
  const result = spec.run(config);
  if (result.metrics.some(m => m.value !== null && !Number.isFinite(m.value)) ||
    result.charts.some(c => c.series.some(s => s.points.some(v => !v.every(Number.isFinite))))) {
    throw new Error('非有限値の計算結果');
  }
  return { chapter: id, config, ...result };
}
