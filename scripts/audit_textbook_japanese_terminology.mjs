import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const strict = process.argv.includes('--strict');
const changedOnly = process.argv.includes('--changed-only');
const targetRoot = 'textbook/volumes';
const targetPath = path.join(root, targetRoot);

const rules = [
  japaneseRule('Bernoulli', 'ベルヌーイ', /\bBernoulli\b/g),
  japaneseRule('Poisson', 'ポアソン', /\bPoisson\b/g),
  japaneseRule('Gamma', 'ガンマ', /\bGamma\b/g),
  japaneseRule('Bayes', 'ベイズ', /\bBayes\b/g),
  japaneseRule('Fisher', 'フィッシャー', /\bFisher\b/g),
  japaneseRule('Wald', 'ワルド', /\bWald\b/g),
  japaneseRule('Score', 'スコア', /\bScore\b/g),
  japaneseRule('Cramér--Rao / Cramér–Rao', 'クラーメル・ラオ', /\bCram(?:é|e)r\s*(?:--|–|—|-)\s*Rao\b/g),
  japaneseRule('nuisance parameter', '局外母数', /\bnuisance\s+parameter\b/gi),
  japaneseRule('MLE', '最尤推定量／最尤法', /\bMLE\b/g, /最尤(?:推定量|推定|法)/),
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
  console.error('通常教材では、公式シラバスと共通用語ガイドに合わせて日本語主表記へ統一してください。');
  process.exit(1);
}

function japaneseRule(token, preferred, pattern, allowPattern = new RegExp(escapeRegExp(preferred))) {
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
