import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targets = [
  'statistical-mathematics',
  'applied-rikou-80',
  'textbook/volumes',
  'anki/cards',
].map((value) => path.join(root, value)).filter(fs.existsSync);

const rules = [
  ['積率母関数', 'モーメント母関数', /積率母関数/g],
  ['PMF', '確率質量関数', /\bPMF\b/g],
  ['PDF', '確率密度関数', /\bPDF\b/g],
  ['CDF', '累積分布関数', /\bCDF\b/g],
  ['PGF', '確率母関数', /\bPGF\b/g],
  ['MGF', 'モーメント母関数', /\bMGF\b/g],
  ['MLE', '最尤推定量／最尤法', /\bMLE\b/g],
  ['LRT', '尤度比検定', /\bLRT\b/g],
  ['CLT', '中心極限定理', /\bCLT\b/g],
  ['LLN', '大数の法則', /\bLLN\b/g],
  ['OLS', '通常最小二乗法', /\bOLS\b/g],
  ['GLS', '一般化最小二乗法', /\bGLS\b/g],
  ['UMVU', '一様最小分散不偏推定量', /\bUMVU\b/g],
  ['UMPU', '一様最強力不偏検定', /\bUMPU\b/g],
  ['UMP', '一様最強力検定', /\bUMP\b/g],
  ['CI', '信頼区間', /\bCI\b/g],
  ['MSE', '平均二乗誤差', /\bMSE\b/g],
];

const findings = [];
for (const base of targets) {
  for (const file of walk(base).filter((value) => value.endsWith('.md'))) {
    const source = fs.readFileSync(file, 'utf8');
    const searchable = stripNonProse(source);
    for (const [token, preferred, pattern] of rules) {
      for (const match of searchable.matchAll(pattern)) {
        findings.push({ file: relative(file), line: lineAt(searchable, match.index ?? 0), token, preferred });
      }
    }
  }
}

const counts = new Map();
for (const finding of findings) counts.set(finding.token, (counts.get(finding.token) ?? 0) + 1);

console.log('4教材横断 用語統一監査（非ブロッキング）');
console.log(`候補: ${findings.length} 件`);
for (const [token, count] of [...counts.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`- ${token}: ${count}`);
}
for (const item of findings.slice(0, 200)) {
  console.log(`  ${item.file}:${item.line} ${item.token} -> ${item.preferred}`);
}
if (findings.length > 200) console.log(`  ...ほか ${findings.length - 200} 件`);
console.log('監査は候補抽出のみです。引用・ID・コード等の正当な英字表記は本文を確認して除外してください。');

function walk(directory) {
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
  return value;
}

function preserveLines(value) { return '\n'.repeat((value.match(/\n/g) ?? []).length); }
function preserveWidth(value) { return ' '.repeat(value.length); }
function lineAt(source, index) { return source.slice(0, index).split('\n').length; }
function relative(file) { return path.relative(root, file).replaceAll('\\', '/'); }
