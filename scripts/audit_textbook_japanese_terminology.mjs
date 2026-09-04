import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const strict = process.argv.includes('--strict');
const changedOnly = process.argv.includes('--changed-only');
const targetRoot = 'textbook/volumes';
const targetPath = path.join(root, targetRoot);

// references/terminology-guide.md の主要規約を、通常教材向けに強制する。
// 初出併記が明示的に許可されている略語は、日本語正式名が同じ行にある場合のみ許可する。
const rules = [
  // 今回問題になった主要な分布名。公式シラバスの日本語表記を主表記にする。
  always('Bernoulli', 'ベルヌーイ', /\bBernoulli\b/g),
  always('Poisson', 'ポアソン', /\bPoisson\b/g),
  always('Gamma', 'ガンマ', /\bGamma\b/g),

  // CIで統一する代表表記
  withJapanese('PMF', '確率質量関数', /\bPMF\b/g),
  withJapanese('PDF', '確率密度関数', /\bPDF\b/g),
  withJapanese('CDF', '累積分布関数', /\bCDF\b/g),
  withJapanese('PGF', '確率母関数', /\bPGF\b/g),
  withJapanese('MGF', 'モーメント母関数', /\bMGF\b/g),
  withJapanese('CF', '特性関数', /\bCF\b/g),
  withJapanese('CGF', 'キュムラント母関数', /\bCGF\b/g),
  withJapanese('iid', '独立同分布', /\biid\b/gi),
  withJapanese('i.i.d.', '独立同分布', /(?<![A-Za-z0-9_])i\.i\.d\.(?![A-Za-z0-9_])/gi),
  withJapanese('積率母関数', 'モーメント母関数', /積率母関数/g),
  always('累積密度関数', '累積分布関数', /累積密度関数/g),
  always('共分散行列', '分散共分散行列', /(?<!分散)共分散行列/g),
  always('covariance matrix', '分散共分散行列', /\bcovariance\s+matrix\b/gi),
  always('p値', 'P値', /p値/g),
  always('p 値', 'P値', /p\s+値/g),
  always('P 値', 'P値', /P\s+値/g),
  always('p-value', 'P値', /\bp-value\b/gi),
  always('Fisher情報量', 'フィッシャー情報量', /Fisher情報量/g),
  always('Cauchy', 'コーシー', /\bCauchy\b(?!\s*(?:--|–|—|-)\s*Schwarz)/g),
  always('カウチー', 'コーシー', /カウチー/g),
  always('Weibull', 'ワイブル', /\bWeibull\b/g),
  always('ウェイブル', 'ワイブル', /ウェイブル/g),
  always('レイブル', 'ワイブル', /レイブル/g),
  always('Pareto', 'パレート', /\bPareto\b/g),

  // 推定・検定
  withJapanese('MLE', '最尤推定量', /\bMLE\b/g, /最尤(?:推定量|推定|法|推定値)/),
  withJapanese('LRT', '尤度比検定', /\bLRT\b/g),
  withJapanese('LR', '尤度比', /\bLR\b/g),
  always('Wald test', 'ワルド検定', /\bWald\s+test\b/gi),
  always('Score test', 'スコア検定', /\bScore\s+test\b/gi),
  withJapanese('CRLB', 'クラーメル・ラオの不等式', /\bCRLB\b/g),
  withJapanese('NP lemma', 'ネイマン・ピアソンの基本定理', /\bNP\s+lemma\b/gi),
  withJapanese('MP test', '最強力検定', /\bMP\s+test\b/gi),
  withJapanese('UMP', '一様最強力検定', /\bUMP\b/g),
  withJapanese('UMPU', '一様最強力不偏検定', /\bUMPU\b/g),
  withJapanese('UMVU', '一様最小分散不偏推定量', /\bUMVU\b/g),
  withJapanese('CI', '信頼区間', /\bCI\b/g),
  withJapanese('SE', '標準誤差', /\bSE\b/g),
  withJapanese('MSE', '平均二乗誤差', /\bMSE\b/g),

  // 漸近論・線形モデル
  withJapanese('CLT', '中心極限定理', /\bCLT\b/g),
  withJapanese('LLN', '大数の法則', /\bLLN\b/g),
  always('Delta method', 'デルタ法', /\bDelta\s+method\b/gi),
  withJapanese('OLS', '通常最小二乗法', /\bOLS\b/g),
  withJapanese('GLS', '一般化最小二乗法', /\bGLS\b/g),
  withJapanese('ANOVA', '分散分析', /\bANOVA\b/g),
  withJapanese('ANCOVA', '共分散分析', /\bANCOVA\b/g),
  withJapanese('GLM', '一般化線形モデル', /\bGLM\b/g),
  withJapanese('SVD', '特異値分解', /\bSVD\b/g),
  withJapanese('PCA', '主成分分析', /\bPCA\b/g),

  // 固有名詞・表記
  always('Neyman–Pearson', 'ネイマン・ピアソン', /\bNeyman\s*(?:--|–|—|-)\s*Pearson\b/g),
  always('Fisher', 'フィッシャー', /\bFisher\b/g),
  always('Bayes', 'ベイズ', /\bBayes\b/g),
  always('Wald', 'ワルド', /\bWald\b/g),
  always('Score', 'スコア', /\bScore\b/g),
  always('Lehmann–Scheffé', 'レーマン・シェッフェ', /\bLehmann\s*(?:--|–|—|-)\s*Scheff(?:é|e)\b/g),
  always('Cramér–Rao', 'クラーメル・ラオ', /\bCram(?:é|e)r\s*(?:--|–|—|-)\s*Rao\b/g),

  // 通常教材では英語説明語を主表記にしない。
  always('nuisance parameter', '局外母数', /\bnuisance\s+parameter\b/gi),
];

const files = changedOnly ? collectChangedMarkdownFiles() : walk(targetPath).filter(isMarkdown);
const findings = [];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const rel = relative(file);
  const source = fs.readFileSync(file, 'utf8');
  const searchable = stripNonProse(source);

  for (const currentRule of rules) {
    for (const match of searchable.matchAll(currentRule.pattern)) {
      const line = lineAt(searchable, match.index ?? 0);
      const text = lineText(searchable, line);
      if (currentRule.allowPattern?.test(text)) continue;
      findings.push({ file: rel, line, token: currentRule.token, preferred: currentRule.preferred });
    }
  }
}

console.log(strict ? '通常教材 日本語用語検証（strict）' : '通常教材 日本語用語監査');
console.log(`対象Markdown: ${files.length} ファイル`);
console.log(`日本語主表記からの揺れ: ${findings.length} 件`);
for (const item of findings.slice(0, 200)) {
  console.log(`  ${item.file}:${item.line} ${item.token} -> ${item.preferred}`);
}
if (findings.length > 200) console.log(`  ...ほか ${findings.length - 200} 件`);

if (strict && findings.length) {
  console.error('通常教材では、公式シラバスと references/terminology-guide.md に合わせて日本語主表記へ統一してください。');
  process.exit(1);
}

function always(token, preferred, pattern) {
  return { token, preferred, pattern, allowPattern: null };
}

function withJapanese(token, preferred, pattern, allowPattern = new RegExp(escapeRegExp(preferred))) {
  return { token, preferred, pattern, allowPattern };
}

function collectChangedMarkdownFiles() {
  const base = resolveDiffBase();
  if (!base) {
    console.warn('差分基準コミットを取得できないため、通常教材全体を検査します。');
    return walk(targetPath).filter(isMarkdown);
  }

  let output;
  try {
    output = execFileSync('git', ['diff', '--name-only', '--diff-filter=ACMR', base, 'HEAD', '--', targetRoot], {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024,
    });
  } catch (error) {
    console.warn(`git diff に失敗したため、通常教材全体を検査します: ${error.message}`);
    return walk(targetPath).filter(isMarkdown);
  }

  return output
    .split('\n')
    .map((value) => value.trim())
    .filter((value) => value.endsWith('.md'))
    .filter((value) => !value.split('/').includes('review'))
    .map((value) => path.join(root, value));
}

function resolveDiffBase() {
  const explicit = process.env.TERMINOLOGY_BASE_SHA?.trim();
  if (explicit && !/^0+$/.test(explicit)) return explicit;
  try {
    return execFileSync('git', ['rev-parse', 'HEAD^'], { cwd: root, encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  const ignored = new Set(['.git', 'node_modules', 'dist', 'build', 'sources', 'review']);
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function stripNonProse(source) {
  let value = source;
  value = value.replace(/```[\s\S]*?```/g, preserveLines);
  value = value.replace(/`[^`\n]*`/g, preserveWidth);
  value = value.replace(/\$\$[\s\S]*?\$\$/g, preserveLines);
  value = value.replace(/\$(?:\\.|[^$\n])+\$/g, preserveWidth);
  value = value.replace(/\]\([^\n)]*\)/g, (text) => ']'.padEnd(text.length, ' '));
  value = value.replace(/https?:\/\/\S+/g, preserveWidth);
  value = value.replace(/^\s*<a\s+id=[^\n]*$/gm, preserveWidth);
  value = value.replace(/^\s*(?:id|topic):[^\n]*$/gm, preserveWidth);
  return value;
}

function isMarkdown(value) { return value.endsWith('.md'); }
function preserveLines(value) { return '\n'.repeat((value.match(/\n/g) ?? []).length); }
function preserveWidth(value) { return ' '.repeat(value.length); }
function lineAt(source, index) { return source.slice(0, index).split('\n').length; }
function lineText(source, line) { return source.split('\n')[line - 1] ?? ''; }
function relative(file) { return path.relative(root, file).replaceAll('\\', '/'); }
function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
