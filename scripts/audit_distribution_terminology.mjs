import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const strict = process.argv.includes('--strict');

const targetRoots = [
  'statistical-mathematics',
  'applied-rikou-80',
  'textbook/volumes',
  'anki/cards',
];

const rules = [
  { token: 'Cauchy', preferred: 'コーシー', pattern: /\bCauchy\b/gi },
  { token: 'カウチー', preferred: 'コーシー', pattern: /カウチー/g },
  { token: 'Weibull', preferred: 'ワイブル', pattern: /\bWeibull\b/gi },
  { token: 'ウェイブル', preferred: 'ワイブル', pattern: /ウェイブル/g },
  { token: 'レイブル', preferred: 'ワイブル', pattern: /レイブル/g },
  { token: 'Pareto', preferred: 'パレート', pattern: /\bPareto\b/gi },
];

const findings = [];

for (const targetRoot of targetRoots) {
  const base = path.join(root, targetRoot);
  if (!fs.existsSync(base)) continue;

  for (const file of walk(base).filter((value) => value.endsWith('.md'))) {
    const source = fs.readFileSync(file, 'utf8');
    const searchable = stripNonProse(source);

    for (const rule of rules) {
      for (const match of searchable.matchAll(rule.pattern)) {
        findings.push({
          file: relative(file),
          line: lineAt(searchable, match.index ?? 0),
          token: match[0],
          preferred: rule.preferred,
        });
      }
    }
  }
}

console.log('分布名表記検証');
console.log('主表記: コーシー分布 / ワイブル分布 / パレート分布');
console.log(`表記揺れ: ${findings.length} 件`);

for (const item of findings) {
  const message = `${item.token} -> ${item.preferred}`;
  console.log(`- ${item.file}:${item.line} ${message}`);
  if (strict) {
    console.error(`::error file=${item.file},line=${item.line}::分布名の表記を統一してください: ${message}`);
  }
}

if (strict && findings.length) {
  console.error('分布名表記検証に失敗しました。references/terminology-guide.md の主表記へ統一してください。');
  process.exit(1);
}

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

function preserveLines(value) {
  return '\n'.repeat((value.match(/\n/g) ?? []).length);
}

function preserveWidth(value) {
  return ' '.repeat(value.length);
}

function lineAt(source, index) {
  return source.slice(0, index).split('\n').length;
}

function relative(file) {
  return path.relative(root, file).replaceAll('\\', '/');
}
