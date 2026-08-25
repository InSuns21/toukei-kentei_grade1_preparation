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
  'CALCULATOR_POLICY.md',
]);

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
  ['BLUE', '最良線形不偏推定量'],
  ['UMVU', '一様最小分散不偏推定量'],
  ['UMP', '一様最強力検定'],
  ['UMPU', '一様最強力不偏検定'],
  ['MSE', '平均二乗誤差'],
  ['VIF', '分散拡大係数'],
]);

const errors = [];
const files = exerciseRoots
  .flatMap(walk)
  .filter((file) => file.endsWith('.md'))
  .filter((file) => !file.split(path.sep).includes('sources'))
  .filter((file) => !ignoredBasenames.has(path.basename(file)));

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const searchable = stripNonProse(source);

  for (const [token, replacement] of replacements) {
    const pattern = new RegExp(`\\b${escapeRegExp(token)}\\b`, 'g');
    for (const match of searchable.matchAll(pattern)) {
      errors.push(`${relative(file)}:${lineAt(searchable, match.index)} 非自明な略語 ${token} → ${replacement}`);
    }
  }

  for (const match of searchable.matchAll(/\bi\.i\.d\.\b/gi)) {
    errors.push(`${relative(file)}:${lineAt(searchable, match.index)} 非自明な略語 ${match[0]} → 独立同分布`);
  }
}

if (errors.length) {
  console.error(`演習表記検証で ${errors.length} 件の問題が見つかりました:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`${files.length} 個の演習 Markdown ファイルを共通表記規約で検証しました。`);

function stripNonProse(source) {
  let value = source;
  value = value.replace(/```[\s\S]*?```/g, (block) => '\n'.repeat((block.match(/\n/g) ?? []).length));
  value = value.replace(/`[^`\n]*`/g, (inline) => ' '.repeat(inline.length));
  value = value.replace(/\]\([^\n)]*\)/g, (destination) => ']'.padEnd(destination.length, ' '));
  value = value.replace(/<https?:\/\/[^>]+>/g, (url) => ' '.repeat(url.length));
  value = value.replace(/https?:\/\/\S+/g, (url) => ' '.repeat(url.length));
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

function lineAt(source, index) {
  return source.slice(0, index).split('\n').length;
}

function relative(file) {
  return path.relative(root, file).replaceAll('\\', '/');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
