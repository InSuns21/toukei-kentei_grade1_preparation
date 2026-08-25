import fs from 'node:fs';
import path from 'node:path';

const roots = ['statistical-mathematics', 'applied-rikou-80'];
const ignored = new Set([
  'AUDIT_REMAINING_52_2026-08-25.md',
  'AUDIT_REMAINING_40_2026-08-25.md',
  'THEOREM_APPLICATION_AUDIT_2026-08-25.md',
  'AUDIT_2026-08-25.md',
  'AUGMENTATION_2026-08-25.md',
  'CALCULATOR_AUDIT_2026-08-25.md',
  'CALCULATOR_POLICY.md',
]);
const occurrences = new Map();
const artifacts = [];
const suspiciousPatterns = [
  /推定量推定量/g,
  /検定検定/g,
  /モデルモデル/g,
  /分析分析/g,
  /関数関数/g,
  /定理定理/g,
  /区間区間/g,
  /分解分解/g,
  /係数係数/g,
  /誤差誤差/g,
  /最尤推定量法/g,
  /最大事後確率推定推定量/g,
];

for (const root of roots) {
  for (const file of walk(root)) {
    if (!file.endsWith('.md') || file.split(path.sep).includes('sources') || ignored.has(path.basename(file))) continue;
    let text = fs.readFileSync(file, 'utf8');
    text = text.replace(/```[\s\S]*?```/g, ' ');
    text = text.replace(/`[^`\n]*`/g, ' ');
    text = text.replace(/\$\$[\s\S]*?\$\$/g, ' ');
    text = text.replace(/\$(?:\\.|[^$\n])+\$/g, ' ');
    text = text.replace(/\]\([^\n)]*\)/g, ']');
    text = text.replace(/<https?:\/\/[^>]+>/g, ' ');
    text = text.replace(/https?:\/\/\S+/g, ' ');

    for (const match of text.matchAll(/\b[A-Z][A-Z0-9]{1,}(?:-[A-Z0-9]+)*\b/g)) {
      const token = match[0];
      if (!occurrences.has(token)) occurrences.set(token, []);
      occurrences.get(token).push(file.replaceAll('\\', '/'));
    }

    for (const pattern of suspiciousPatterns) {
      for (const match of text.matchAll(pattern)) {
        artifacts.push(`${file.replaceAll('\\', '/')}: ${match[0]}`);
      }
    }
  }
}

console.log('=== remaining uppercase prose tokens ===');
for (const [token, files] of [...occurrences.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))) {
  const unique = [...new Set(files)];
  console.log(`${token}\t${files.length}\t${unique.length}\t${unique.slice(0, 5).join(', ')}`);
}

console.log('=== suspicious normalization artifacts ===');
if (artifacts.length === 0) console.log('none');
else artifacts.forEach((item) => console.log(item));

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
