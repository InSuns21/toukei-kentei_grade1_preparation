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

// 公式シラバス自身が使う英字表記（MCMC, ARIMA, AIC, BLUE）と、
// 標準的な時系列モデル記号（AR, MA, ARMA）は禁止対象に含めない。
const replacements = new Map([
  ['MGF', 'モーメント母関数'],
  ['PGF', '確率母関数'],
  ['PDF', '確率密度関数'],
  ['PMF', '確率質量関数'],
  ['CDF', '累積分布関数'],
  ['CF', '特性関数'],
  ['MLE', '最尤推定量／最尤法'],
  ['LRT', '尤度比検定'],
  ['LR', '尤度比'],
  ['CLT', '中心極限定理'],
  ['LLN', '大数の法則'],
  ['OLS', '通常最小二乗法'],
  ['GLS', '一般化最小二乗法'],
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
  ['EM', '期待値最大化法'],
  ['MAP', '最大事後確率推定'],
  ['BIC', 'ベイズ情報量規準'],
  ['RMSE', '二乗平均平方根誤差'],
  ['FDR', '偽発見率'],
  ['FWER', '家族内誤差率'],
  ['SVD', '特異値分解'],
  ['HMM', '隠れマルコフモデル'],
  ['PACF', '偏自己相関関数'],
  ['ACF', '自己相関関数'],
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
  ['EMS2', '期待平均平方2本など文脈を明示'],
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
  ['LS', 'Lehmann–Scheffé定理／最小二乗法など文脈に応じた正式名称'],
]);

// 学習者向け教材では測度論を前提にしない。これらが必要になる議論は、
// 正則条件を問題文で与えるか、通常の和・積分で追える導出へ置き換える。
const measureTheoryPatterns = [
  {
    pattern: /測度論|確率測度|測度空間|測度/g,
    guidance: '測度論を前提にせず、確率・密度・分布関数・通常の積分で記述する',
  },
  {
    pattern: /σ\s*[-‐‑–—]?\s*(?:加法族|代数)|シグマ\s*[-‐‑–—]?\s*(?:加法族|代数)|sigma\s*[-‐‑–— ]?\s*(?:algebra|field)/gi,
    guidance: 'σ-加法族・σ-代数を前提にしない',
  },
  {
    pattern: /可測(?:性|関数|集合)?/g,
    guidance: '可測性を前提にしない',
  },
  {
    pattern: /Lebesgue|ルベーグ/gi,
    guidance: 'Lebesgue積分を前提にせず、通常の積分の範囲で記述する',
  },
  {
    pattern: /Borel|ボレル/gi,
    guidance: 'Borel集合を前提にしない',
  },
  {
    pattern: /Radon\s*[-‐‑–—]?\s*Nikodym|ラドン\s*[-‐‑–—]?\s*ニコディム/gi,
    guidance: 'Radon–Nikodymの定理を前提にしない',
  },
  {
    pattern: /Fubini|フビニ|Tonelli|トネリ/gi,
    guidance: '積分順序の交換は測度論の定理を前提にせず扱う',
  },
  {
    pattern: /単調収束定理|monotone convergence theorem/gi,
    guidance: '単調収束定理を前提にしない',
  },
  {
    pattern: /優収束定理|支配収束定理|dominated convergence theorem/gi,
    guidance: '優収束定理を前提にしない',
  },
  {
    pattern: /ほとんど確実(?:に|な|で)?|概収束|almost surely|\ba\.s\.(?=\s|[,;:.)]|$)/gi,
    guidance: '測度論的な収束概念を前提にせず、シラバス範囲の収束概念で記述する',
  },
];

const errors = [];
const files = exerciseRoots
  .flatMap(walk)
  .filter((file) => file.endsWith('.md'))
  .filter((file) => !file.split(path.sep).includes('sources'))
  .filter((file) => !ignoredBasenames.has(path.basename(file)));

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const searchable = stripNonProse(source);
  const measureSearchable = stripCodeAndLinks(source);

  for (const [token, replacement] of replacements) {
    const pattern = new RegExp(`\\b${escapeRegExp(token)}\\b`, 'g');
    for (const match of searchable.matchAll(pattern)) {
      errors.push(`${relative(file)}:${lineAt(searchable, match.index)} シラバスにない非自明な略語 ${token} → ${replacement}`);
    }
  }

  for (const match of searchable.matchAll(/\bi\.i\.d\.(?!\w)/gi)) {
    errors.push(`${relative(file)}:${lineAt(searchable, match.index)} 非自明な略語 ${match[0]} → 独立同分布`);
  }

  for (const { pattern, guidance } of measureTheoryPatterns) {
    for (const match of measureSearchable.matchAll(pattern)) {
      errors.push(
        `${relative(file)}:${lineAt(measureSearchable, match.index)} 測度論を前提とする記載 ${match[0]} → ${guidance}`,
      );
    }
  }
}

if (errors.length) {
  console.error(`演習表記検証で ${errors.length} 件の問題が見つかりました:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`${files.length} 個の演習 Markdown ファイルを公式シラバス優先・非測度論の共通規約で検証しました。`);

function stripNonProse(source) {
  let value = source;
  value = value.replace(/```[\s\S]*?```/g, preserveLines);
  value = value.replace(/`[^`\n]*`/g, preserveWidth);
  value = value.replace(/\$\$[\s\S]*?\$\$/g, preserveLines);
  value = value.replace(/\$(?:\\.|[^$\n])+\$/g, preserveWidth);
  value = value.replace(/\]\([^\n)]*\)/g, (destination) => ']'.padEnd(destination.length, ' '));
  value = value.replace(/<https?:\/\/[^>]+>/g, preserveWidth);
  value = value.replace(/https?:\/\/\S+/g, preserveWidth);
  return value;
}

function stripCodeAndLinks(source) {
  let value = source;
  value = value.replace(/```[\s\S]*?```/g, preserveLines);
  value = value.replace(/\]\([^\n)]*\)/g, (destination) => ']'.padEnd(destination.length, ' '));
  value = value.replace(/<https?:\/\/[^>]+>/g, preserveWidth);
  value = value.replace(/https?:\/\/\S+/g, preserveWidth);
  return value;
}

function preserveLines(value) {
  return '\n'.repeat((value.match(/\n/g) ?? []).length);
}

function preserveWidth(value) {
  return ' '.repeat(value.length);
}

function walk(directory) {
  const ignored = new Set(['.git', 'node_modules', 'build', 'dist']);
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function lineAt(source, index) {
  return source.slice(0, index).split('\n').length;
}

function relative(file) {
  return path.relative(root, file).replaceAll('\\', '/');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
