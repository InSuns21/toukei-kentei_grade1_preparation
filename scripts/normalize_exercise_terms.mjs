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
  ['PCA', '主成分分析'],
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
];

let changedFiles = 0;
let replacementsCount = 0;

for (const file of exerciseRoots
  .flatMap(walk)
  .filter((file) => file.endsWith('.md'))
  .filter((file) => !file.split(path.sep).includes('sources'))
  .filter((file) => !ignoredBasenames.has(path.basename(file)))) {
  const source = fs.readFileSync(file, 'utf8');
  const normalized = normalizeMarkdown(source);
  if (normalized !== source) {
    fs.writeFileSync(file, normalized, 'utf8');
    changedFiles += 1;
  }
}

console.log(`${changedFiles} ファイルを更新し、${replacementsCount} 箇所の非自明な略語を日本語表記へ正規化しました。`);

function normalizeMarkdown(source) {
  return source.replace(/```[\s\S]*?```|[^`]+|`[^`\n]*`/g, (chunk) => {
    if (chunk.startsWith('```') || (chunk.startsWith('`') && chunk.endsWith('`'))) return chunk;
    return normalizeProse(chunk);
  });
}

function normalizeProse(source) {
  const protectedValues = [];
  let value = source;
  const protect = (pattern) => {
    value = value.replace(pattern, (match) => {
      const marker = `\uE000${protectedValues.length}\uE001`;
      protectedValues.push(match);
      return marker;
    });
  };

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

  value = value.replace(/\uE000(\d+)\uE001/g, (_, index) => protectedValues[Number(index)]);
  return value;
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
