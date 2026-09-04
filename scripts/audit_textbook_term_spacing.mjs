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

// 用語統一で日本語化した語の前後に、英語表記時代の半角空白を残さない。
// 例: 「ベルヌーイ 分布」「と 通常最小二乗法 の復習」。
const terms = [
  'ベルヌーイ', 'ポアソン', 'ガンマ', 'フィッシャー', 'コーシー', 'ワイブル', 'パレート',
  '確率質量関数', '確率密度関数', '累積分布関数', '確率母関数', 'モーメント母関数',
  '特性関数', 'キュムラント母関数', '独立同分布', '分散共分散行列', '平均二乗誤差',
  '最尤推定量', '尤度比検定', '尤度比', 'ワルド検定', 'スコア検定',
  'クラーメル・ラオ', 'ネイマン・ピアソン', '最強力検定', '一様最強力検定',
  '一様最強力不偏検定', '一様最小分散不偏推定量', '信頼区間', '標準誤差',
  '中心極限定理', '大数の法則', 'デルタ法', '通常最小二乗法', '一般化最小二乗法',
  '分散分析', '共分散分析', '一般化線形モデル', '特異値分解', '主成分分析',
  'レーマン・シェッフェ', '局外母数',
];

const japanese = '[\\p{Script=Hiragana}\\p{Script=Katakana}\\p{Script=Han}]';
const findings = [];

for (const targetRoot of targetRoots) {
  for (const file of walk(path.join(root, targetRoot)).filter((value) => value.endsWith('.md'))) {
    const source = fs.readFileSync(file, 'utf8');
    const searchable = stripNonProse(source);
    for (const term of terms) {
      const escaped = escapeRegExp(term);
      const pattern = new RegExp(`(?:${japanese}[ \\t]+${escaped}|${escaped}[ \\t]+${japanese})`, 'gu');
      for (const match of searchable.matchAll(pattern)) {
        findings.push({ file: relative(file), line: lineAt(searchable, match.index ?? 0), text: match[0] });
      }
    }
  }
}

console.log(`統計検定1級通常教材 日本語用語の空白監査: ${findings.length} 件`);
for (const item of findings.slice(0, 300)) {
  console.log(`  ${item.file}:${item.line} ${item.text}`);
}
if (findings.length > 300) console.log(`  ...ほか ${findings.length - 300} 件`);

if (findings.length) {
  console.error('日本語化した用語の前後に不要な半角空白があります。和文として詰めてください。');
  process.exit(1);
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

function preserveShape(value) { return value.replace(/[^\n]/g, ' '); }
function lineAt(source, index) { return source.slice(0, index).split('\n').length; }
function relative(file) { return path.relative(root, file).replaceAll('\\', '/'); }
function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
