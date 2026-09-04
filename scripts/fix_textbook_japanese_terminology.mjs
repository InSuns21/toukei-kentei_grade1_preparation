import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targetRoots = [
  'textbook/volumes/01_probability',
  'textbook/volumes/02_distributions',
  'textbook/volumes/03_inference',
  'textbook/volumes/04_linear_models',
  'textbook/volumes/05_engineering',
];

const rules = [
  always(/\bWald\s+test\b/gi, 'ワルド検定'),
  always(/\bScore\s+test\b/gi, 'スコア検定'),
  always(/\bNP\s+lemma\b/gi, 'ネイマン・ピアソンの基本定理'),
  always(/\bMP\s+test\b/gi, '最強力検定'),
  always(/\bNeyman\s*(?:--|–|—|-)\s*Pearson\b/g, 'ネイマン・ピアソン'),
  always(/\bLehmann\s*(?:--|–|—|-)\s*Scheff(?:é|e)\b/g, 'レーマン・シェッフェ'),
  always(/\bCram(?:é|e)r\s*(?:--|–|—|-)\s*Rao\b/g, 'クラーメル・ラオ'),
  always(/\bDelta\s+method\b/gi, 'デルタ法'),
  always(/\bnuisance\s+parameter\b/gi, '局外母数'),
  always(/\bcovariance\s+matrix\b/gi, '分散共分散行列'),

  always(/\bBernoulli\b/g, 'ベルヌーイ'),
  always(/\bPoisson\b/g, 'ポアソン'),
  always(/\bGamma\b/g, 'ガンマ'),
  always(/\bFisher\b/g, 'フィッシャー'),
  always(/\bBayes\b/g, 'ベイズ'),
  always(/\bWald\b/g, 'ワルド'),
  always(/\bScore\b/g, 'スコア'),
  always(/\bCauchy\b(?!\s*(?:--|–|—|-)\s*Schwarz)/g, 'コーシー'),
  always(/カウチー/g, 'コーシー'),
  always(/\bWeibull\b/g, 'ワイブル'),
  always(/ウェイブル/g, 'ワイブル'),
  always(/レイブル/g, 'ワイブル'),
  always(/\bPareto\b/g, 'パレート'),
  always(/積率母関数/g, 'モーメント母関数'),
  always(/累積密度関数/g, '累積分布関数'),
  always(/(?<!分散)共分散行列/g, '分散共分散行列'),
  always(/p値/g, 'P値'),
  always(/p\s+値/g, 'P値'),
  always(/P\s+値/g, 'P値'),
  always(/\bp-value\b/gi, 'P値'),

  withJapanese(/\bPMF\b/g, '確率質量関数'),
  withJapanese(/\bPDF\b/g, '確率密度関数'),
  withJapanese(/\bCDF\b/g, '累積分布関数'),
  withJapanese(/\bPGF\b/g, '確率母関数'),
  withJapanese(/\bMGF\b/g, 'モーメント母関数'),
  withJapanese(/\bCF\b/g, '特性関数'),
  withJapanese(/\bCGF\b/g, 'キュムラント母関数'),
  withJapanese(/(?<![A-Za-z0-9_])i\.i\.d\.(?![A-Za-z0-9_])/gi, '独立同分布'),
  withJapanese(/\biid\b/gi, '独立同分布'),
  withJapanese(/\bMLE\b/g, '最尤推定量', /最尤(?:推定量|推定|法|推定値)/),
  withJapanese(/\bLRT\b/g, '尤度比検定'),
  withJapanese(/\bLR\b/g, '尤度比'),
  withJapanese(/\bCRLB\b/g, 'クラーメル・ラオの不等式'),
  withJapanese(/\bUMP\b/g, '一様最強力検定'),
  withJapanese(/\bUMPU\b/g, '一様最強力不偏検定'),
  withJapanese(/\bUMVU\b/g, '一様最小分散不偏推定量'),
  withJapanese(/\bCI\b/g, '信頼区間'),
  withJapanese(/\bSE\b/g, '標準誤差'),
  withJapanese(/\bMSE\b/g, '平均二乗誤差'),
  withJapanese(/\bCLT\b/g, '中心極限定理'),
  withJapanese(/\bLLN\b/g, '大数の法則'),
  withJapanese(/\bOLS\b/g, '通常最小二乗法'),
  withJapanese(/\bGLS\b/g, '一般化最小二乗法'),
  withJapanese(/\bANOVA\b/g, '分散分析'),
  withJapanese(/\bANCOVA\b/g, '共分散分析'),
  withJapanese(/\bGLM\b/g, '一般化線形モデル'),
  withJapanese(/\bSVD\b/g, '特異値分解'),
  withJapanese(/\bPCA\b/g, '主成分分析'),
];

let changedFiles = 0;
let changedTerms = 0;

for (const targetRoot of targetRoots) {
  const base = path.join(root, targetRoot);
  for (const file of walk(base).filter((value) => value.endsWith('.md'))) {
    const source = fs.readFileSync(file, 'utf8');
    const edits = collectEdits(source);
    if (!edits.length) continue;

    let output = source;
    for (const edit of edits.sort((a, b) => b.start - a.start)) {
      output = output.slice(0, edit.start) + edit.replacement + output.slice(edit.end);
    }
    fs.writeFileSync(file, output);
    changedFiles += 1;
    changedTerms += edits.length;
    console.log(`${relative(file)}: ${edits.length} 件修正`);
  }
}

console.log(`修正完了: ${changedFiles} ファイル / ${changedTerms} 件`);

function collectEdits(source) {
  const searchable = maskNonProse(source);
  const edits = [];

  for (const rule of rules) {
    for (const match of searchable.matchAll(rule.pattern)) {
      const start = match.index ?? 0;
      const end = start + match[0].length;
      if (edits.some((edit) => start < edit.end && end > edit.start)) continue;

      const line = sourceLine(source, start);
      if (rule.allowPattern?.test(line)) continue;
      edits.push({ start, end, replacement: rule.replacement });
    }
  }
  return edits;
}

function always(pattern, replacement) {
  return { pattern, replacement, allowPattern: null };
}

function withJapanese(pattern, replacement, allowPattern = new RegExp(escapeRegExp(replacement))) {
  return { pattern, replacement, allowPattern };
}

function maskNonProse(source) {
  let value = source;
  value = value.replace(/```[\s\S]*?```/g, preserveShape);
  value = value.replace(/`[^`\n]*`/g, preserveShape);
  value = value.replace(/\$\$[\s\S]*?\$\$/g, preserveShape);
  value = value.replace(/\$(?:\\.|[^$\n])+\$/g, preserveShape);
  value = value.replace(/\]\([^\n)]*\)/g, preserveShape);
  value = value.replace(/https?:\/\/\S+/g, preserveShape);
  value = value.replace(/^\s*<a\s+id=[^\n]*$/gm, preserveShape);
  value = value.replace(/^\s*(?:id|topic):[^\n]*$/gm, preserveShape);
  return value;
}

function preserveShape(value) {
  return value.replace(/[^\n]/g, ' ');
}

function sourceLine(source, index) {
  const start = source.lastIndexOf('\n', index - 1) + 1;
  const end = source.indexOf('\n', index);
  return source.slice(start, end < 0 ? source.length : end);
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

function relative(file) { return path.relative(root, file).replaceAll('\\', '/'); }
function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
