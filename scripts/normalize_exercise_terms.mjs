import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const exerciseRoots = ['statistical-mathematics', 'applied-rikou-80']
  .map((name) => path.join(root, name))
  .filter(fs.existsSync);

const ignoredBasenames = new Set([
  'AUDIT_REMAINING_52_2026-08-25.md',
  'AUDIT_REMAINING_40_2026-08-25.md',
  'THEOREM_APPLICATION_AUDIT_2026-08-25.md',
  'AUDIT_2026-08-25.md',
  'AUGMENTATION_2026-08-25.md',
  'CALCULATOR_AUDIT_2026-08-25.md',
  'CALCULATOR_POLICY.md',
]);

const replacements = [
  ['MGF', 'モーメント母関数'],
  ['PGF', '確率母関数'],
  ['PDF', '確率密度関数'],
  ['PMF', '確率質量関数'],
  ['CDF', '累積分布関数'],
  ['CF', '特性関数'],
  ['MLE', '最尤推定量'],
  ['LRT', '尤度比検定'],
  ['LR', '尤度比'],
  ['CLT', '中心極限定理'],
  ['LLN', '大数の法則'],
  ['OLS', '通常最小二乗法'],
  ['GLS', '一般化最小二乗法'],
  ['BLUE', '最良線形不偏推定量'],
  ['UMVU', '一様最小分散不偏推定量'],
  ['UMPU', '一様最強力不偏検定'],
  ['UMP', '一様最強力検定'],
  ['MSE', '平均二乗誤差'],
  ['VIF', '分散拡大係数'],
  ['CI', '信頼区間'],
  ['CRLB', 'Cramér–Rao下限'],
  ['ANOVA', '分散分析'],
  ['ANCOVA', '共分散分析'],
  ['PCA', '主成分分析'],
  ['LDA', '線形判別分析'],
  ['QDA', '二次判別分析'],
  ['GLM', '一般化線形モデル'],
  ['MCMC', 'マルコフ連鎖モンテカルロ法'],
  ['MAP', '最大事後確率推定'],
  ['AIC', '赤池情報量規準'],
  ['BIC', 'ベイズ情報量規準'],
  ['RMSE', '二乗平均平方根誤差'],
  ['FDR', '偽発見率'],
  ['FWER', '家族内誤差率'],
  ['SVD', '特異値分解'],
  ['HMM', '隠れマルコフモデル'],
  ['EM', '期待値最大化法'],
  ['ARIMA', '自己回帰和分移動平均'],
  ['ARMA', '自己回帰移動平均'],
  ['PACF', '偏自己相関関数'],
  ['ACF', '自己相関関数'],
  ['AR', '自己回帰'],
  ['MA', '移動平均'],
  ['MTTF', '平均故障時間'],
  ['MTTR', '平均修復時間'],
  ['MTBF', '平均故障間隔'],
  ['EWMA', '指数加重移動平均'],
  ['CUSUM', '累積和'],
  ['ICC', '級内相関係数'],
  ['ARL', '平均連長'],
  ['SE', '標準誤差'],
  ['SSE', '誤差平方和'],
  ['HT', 'Horvitz–Thompson'],
  ['KL', 'Kullback–Leibler'],
  ['NP', 'Neyman–Pearson'],
  ['CCD', '中心複合計画'],
  ['CR', 'Cramér–Rao'],
  ['EMS', '期待平均平方'],
  ['KM', 'Kaplan–Meier'],
  ['MMSE', '最小平均二乗誤差'],
  ['BM', 'ブラウン運動'],
  ['CRD', '完全無作為化計画'],
  ['NB', '負の二項分布'],
  ['PC1', '第1主成分'],
  ['PC', '主成分'],
  ['PIT', '確率積分変換'],
  ['RSE', '相対標準誤差'],
  ['SRS', '単純無作為抽出'],
  ['YW', 'Yule–Walker'],
  ['R2', '決定係数'],
];

const cleanupReplacements = [
  ['最尤推定量法', '最尤法'],
  ['最大事後確率推定推定量', '最大事後確率推定量'],
  ['partial 決定係数', '偏決定係数'],
  ['Kullback–Leibler divergence', 'Kullback–Leiblerダイバージェンス'],
  ['推定量推定量', '推定量'],
  ['検定検定', '検定'],
  ['モデルモデル', 'モデル'],
  ['分析分析', '分析'],
  ['関数関数', '関数'],
  ['定理定理', '定理'],
  ['区間区間', '区間'],
  ['分解分解', '分解'],
  ['係数係数', '係数'],
  ['誤差誤差', '誤差'],
  ['規準基準', '規準'],
];

let changedFiles = 0;
let replacementsCount = 0;
let restoredMathFiles = 0;
const baseSha = resolveBaseSha();

for (const file of exerciseRoots
  .flatMap(walk)
  .filter((file) => file.endsWith('.md'))
  .filter((file) => !file.split(path.sep).includes('sources'))
  .filter((file) => !ignoredBasenames.has(path.basename(file)))) {
  const source = fs.readFileSync(file, 'utf8');
  const relative = path.relative(root, file).replaceAll('\\', '/');
  const baseSource = readBaseFile(relative);
  const restored = baseSource === null ? source : restoreMathFromBase(source, baseSource, relative);
  if (restored !== source) restoredMathFiles += 1;
  const normalized = normalizeProseOnly(restored);
  if (normalized !== source) {
    fs.writeFileSync(file, normalized, 'utf8');
    changedFiles += 1;
  }
}

console.log(`${changedFiles} ファイルを更新し、${replacementsCount} 箇所の非自明な略語を日本語表記へ正規化しました。`);
console.log(`${restoredMathFiles} ファイルの数式を共通規約変更前の内容へ復元しました。`);

function resolveBaseSha() {
  try {
    return execFileSync('git', ['merge-base', 'origin/main', 'HEAD'], { encoding: 'utf8' }).trim();
  } catch {
    console.warn('origin/main との merge-base を取得できなかったため、数式復元は省略します。');
    return null;
  }
}

function readBaseFile(relative) {
  if (!baseSha) return null;
  try {
    return execFileSync('git', ['show', `${baseSha}:${relative}`], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  } catch {
    return null;
  }
}

function restoreMathFromBase(current, base, relative) {
  const currentMath = [...current.matchAll(mathPattern())].map((match) => match[0]);
  const baseMath = [...base.matchAll(mathPattern())].map((match) => match[0]);
  if (currentMath.length !== baseMath.length) {
    console.warn(`${relative}: 数式ブロック数が基準版と異なるため数式復元を省略します (${currentMath.length} != ${baseMath.length})。`);
    return current;
  }
  let index = 0;
  return current.replace(mathPattern(), () => baseMath[index++]);
}

function normalizeProseOnly(source) {
  const protectedValues = [];
  let value = source;
  const protect = (pattern) => {
    value = value.replace(pattern, (match) => {
      const marker = `\uE000${protectedValues.length}\uE001`;
      protectedValues.push(match);
      return marker;
    });
  };

  protect(/```[\s\S]*?```/g);
  protect(/`[^`\n]*`/g);
  protect(/\$\$[\s\S]*?\$\$/g);
  protect(/\$(?:\\.|[^$\n])+\$/g);
  protect(/\]\([^\n)]*\)/g);
  protect(/<https?:\/\/[^>]+>/g);
  protect(/https?:\/\/\S+/g);

  for (const [token, replacement] of replacements) {
    const pattern = new RegExp(`\\b${escapeRegExp(token)}\\b`, 'g');
    value = value.replace(pattern, () => {
      replacementsCount += 1;
      return replacement;
    });
  }

  value = value.replace(/\bi\.i\.d\.(?!\w)/gi, () => {
    replacementsCount += 1;
    return '独立同分布';
  });

  for (const [from, to] of cleanupReplacements) {
    value = value.split(from).join(to);
  }

  value = value.replace(/\uE000(\d+)\uE001/g, (_, index) => protectedValues[Number(index)]);
  return value;
}

function mathPattern() {
  return /\$\$[\s\S]*?\$\$|\$(?:\\.|[^$\n])+\$/g;
}

function walk(directory) {
  const ignored = new Set(['.git', 'node_modules', 'build', 'dist']);
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
