import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

// house style は用語ごとに段階移行する。
// 既存の地下世界を一括置換せず、監査済みの章をここへ追加して再発を防ぐ。
const migratedFiles = [
  'textbook/volumes/00_foundations/F0_00D_Cauchy列_完備性_無限次元/index.md',
];

const rules = [
  rule('コーシー', 'Cauchy', /コーシー/g),
  rule('カウチー', 'Cauchy', /カウチー/g),
];

const findings = [];

for (const rel of migratedFiles) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) {
    findings.push({ file: rel, line: 0, token: 'missing file', preferred: '存在する監査対象' });
    continue;
  }

  const source = fs.readFileSync(file, 'utf8');
  const searchable = stripNonProse(source);

  for (const currentRule of rules) {
    for (const match of searchable.matchAll(currentRule.pattern)) {
      findings.push({
        file: rel,
        line: lineAt(searchable, match.index ?? 0),
        token: currentRule.token,
        preferred: currentRule.preferred,
      });
    }
  }
}

console.log('地下世界 house style 用語監査');
console.log(`移行済み章: ${migratedFiles.length} / 表記揺れ: ${findings.length} 件`);
for (const item of findings) {
  console.log(`- ${item.file}:${item.line} ${item.token} -> ${item.preferred}`);
}

if (findings.length) {
  console.error('地下世界の正規表記に反する箇所があります。references/house-style-terminology.md を確認してください。');
  process.exit(1);
}

function rule(token, preferred, pattern) {
  return { token, preferred, pattern };
}

function stripNonProse(source) {
  let value = source;
  value = value.replace(/```[\s\S]*?```/g, preserveLines);
  value = value.replace(/`[^`\n]*`/g, preserveWidth);
  value = value.replace(/\$\$[\s\S]*?\$\$/g, preserveLines);
  value = value.replace(/\$(?:\\.|[^$\n])+\$/g, preserveWidth);
  value = value.replace(/\]\([^\n)]*\)/g, (text) => ']'.padEnd(text.length, ' '));
  value = value.replace(/https?:\/\/\S+/g, preserveWidth);
  value = value.replace(/<[^>]+>/g, preserveWidth);
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
