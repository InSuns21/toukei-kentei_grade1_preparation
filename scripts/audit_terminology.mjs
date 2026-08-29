import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import YAML from 'yaml';

const root = process.cwd();
const strict = process.argv.includes('--strict');
const changedOnly = process.argv.includes('--changed-only');

const targetRoots = [
  'statistical-mathematics',
  'applied-rikou-80',
  'textbook/volumes',
  'anki/cards',
];
const targets = targetRoots.map((value) => path.join(root, value)).filter(fs.existsSync);

const rules = [
  rule('積率母関数', 'モーメント母関数', /積率母関数/g, /モーメント母関数/),
  rule('累積密度関数', '累積分布関数', /累積密度関数/g),
  rule('共分散行列', '分散共分散行列', /(?<!分散)共分散行列/g, /分散共分散行列/),
  rule('Fisher情報量', 'フィッシャー情報量', /Fisher情報量/g, /フィッシャー情報量/),
  rule('Chebyshev系不等式表記', 'チェビシェフの不等式', /Chebyshev\s*(?:の\s*)?不等式/g),
  rule('チェビシェフ不等式', 'チェビシェフの不等式', /チェビシェフ\s*不等式/g),
  rule('チェビシェフ の不等式', 'チェビシェフの不等式', /チェビシェフ\s+の\s*不等式/g),
  rule('p値', 'P値', /p値/g),
  rule('p 値', 'P値', /p\s+値/g),
  rule('P 値', 'P値', /P\s+値/g),
  rule('p-value', 'P値', /\bp-value\b/gi),

  rule('Cauchy', 'コーシー', /\bCauchy\b/gi, /コーシー/),
  rule('カウチー', 'コーシー', /カウチー/g),
  rule('Weibull', 'ワイブル', /\bWeibull\b/gi, /ワイブル/),
  rule('ウェイブル', 'ワイブル', /ウェイブル/g),
  rule('レイブル', 'ワイブル', /レイブル/g),
  rule('Pareto', 'パレート', /\bPareto\b/gi, /パレート/),

  acronym('PMF', '確率質量関数', /\bPMF\b/g),
  acronym('PDF', '確率密度関数', /\bPDF\b/g),
  acronym('CDF', '累積分布関数', /\bCDF\b/g),
  acronym('PGF', '確率母関数', /\bPGF\b/g),
  acronym('MGF', 'モーメント母関数', /\bMGF\b/g),
  acronym('CF', '特性関数', /\bCF\b/g),
  acronym('CGF', 'キュムラント母関数', /\bCGF\b/g),
  acronym('iid', '独立同分布', /\biid\b/gi),
  acronym('i.i.d.', '独立同分布', /(?<![A-Za-z0-9_])i\.i\.d\.(?![A-Za-z0-9_])/gi),

  acronym('MLE', '最尤推定量／最尤法', /\bMLE\b/g, /最尤(?:推定量|推定|法)/),
  acronym('LRT', '尤度比検定', /\bLRT\b/g),
  acronym('LR', '尤度比', /\bLR\b/g),
  acronym('CRLB', 'クラーメル・ラオの不等式', /\bCRLB\b/g),
  acronym('NP lemma', 'ネイマン・ピアソンの基本定理', /\bNP\s+lemma\b/gi, /ネイマン・ピアソン/),
  acronym('MP test', '最強力検定', /\bMP\s+test\b/gi, /最強力検定/),
  acronym('UMP', '一様最強力検定', /\bUMP\b/g),
  acronym('UMPU', '一様最強力不偏検定', /\bUMPU\b/g),
  acronym('UMVU', '一様最小分散不偏推定量', /\bUMVU\b/g),
  acronym('CI', '信頼区間', /\bCI\b/g),
  acronym('SE', '標準誤差', /\bSE\b/g),
  acronym('MSE', '平均二乗誤差', /\bMSE\b/g),

  acronym('CLT', '中心極限定理', /\bCLT\b/g),
  acronym('LLN', '大数の法則', /\bLLN\b/g),
  acronym('OLS', '通常最小二乗法', /\bOLS\b/g),
  acronym('GLS', '一般化最小二乗法', /\bGLS\b/g),
  acronym('ANOVA', '分散分析', /\bANOVA\b/g),
  acronym('ANCOVA', '共分散分析', /\bANCOVA\b/g),
  acronym('GLM', '一般化線形モデル', /\bGLM\b/g),
  acronym('SVD', '特異値分解', /\bSVD\b/g),
  acronym('PCA', '主成分分析', /\bPCA\b/g),
];

const syllabusCheck = checkSyllabusTermsInGuide();
const changedLines = changedOnly ? collectChangedLines() : null;
const findings = [];

for (const base of targets) {
  for (const file of walk(base).filter((value) => value.endsWith('.md'))) {
    const rel = relative(file);
    if (changedOnly && !changedLines?.has(rel)) continue;

    const source = fs.readFileSync(file, 'utf8');
    const searchable = stripNonProse(source);
    for (const currentRule of rules) {
      for (const match of searchable.matchAll(currentRule.pattern)) {
        const line = lineAt(searchable, match.index ?? 0);
        if (changedOnly && !changedLines.get(rel)?.has(line)) continue;

        const text = lineText(searchable, line);
        if (currentRule.allowPattern?.test(text)) continue;
        findings.push({ file: rel, line, token: currentRule.token, preferred: currentRule.preferred });
      }
    }
  }
}

const counts = new Map();
for (const finding of findings) counts.set(finding.token, (counts.get(finding.token) ?? 0) + 1);

console.log(strict ? '4教材横断 用語統一検証（strict）' : '4教材横断 用語統一監査');
console.log(`公式シラバス用語例: ${syllabusCheck.total} 語 / ガイド未反映: ${syllabusCheck.missing.length} 語`);
if (syllabusCheck.missing.length) {
  for (const term of syllabusCheck.missing) console.log(`- [guide missing] ${term}`);
}
if (changedOnly) {
  console.log(`CI差分検査: ${changedLines?.size ?? 0} ファイル`);
}
console.log(`表記揺れ候補: ${findings.length} 件`);
for (const [token, count] of [...counts.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`- ${token}: ${count}`);
}
for (const item of findings.slice(0, 200)) {
  console.log(`  ${item.file}:${item.line} ${item.token} -> ${item.preferred}`);
}
if (findings.length > 200) console.log(`  ...ほか ${findings.length - 200} 件`);

if (!strict) {
  console.log('監査モードは候補抽出のみです。日本語正式名と同じ行の初出併記、コード、数式、URLは除外しています。');
}

if (strict && (syllabusCheck.missing.length || findings.length)) {
  console.error('用語統一検証に失敗しました。references/terminology-guide.md と本文表記を確認してください。');
  process.exit(1);
}

function rule(token, preferred, pattern, allowPattern = null) {
  return { token, preferred, pattern, allowPattern };
}

function acronym(token, preferred, pattern, allowPattern = null) {
  return rule(token, preferred, pattern, allowPattern ?? new RegExp(escapeRegExp(preferred)));
}

function checkSyllabusTermsInGuide() {
  const syllabusPath = path.join(root, 'anki/syllabus/syllabus.yaml');
  const guidePath = path.join(root, 'references/terminology-guide.md');
  if (!fs.existsSync(syllabusPath) || !fs.existsSync(guidePath)) {
    return { total: 0, missing: ['syllabus.yaml または terminology-guide.md が見つかりません'] };
  }

  const syllabus = YAML.parse(fs.readFileSync(syllabusPath, 'utf8'));
  const guide = fs.readFileSync(guidePath, 'utf8');
  const terms = [...new Set((syllabus.items ?? []).flatMap((item) => item.terms ?? []))];
  return {
    total: terms.length,
    missing: terms.filter((term) => !guide.includes(term)),
  };
}

function collectChangedLines() {
  const base = resolveDiffBase();
  if (!base) {
    console.warn('CI差分の基準コミットを取得できないため、表記揺れの差分検査はスキップします。');
    return new Map();
  }

  let diff;
  try {
    diff = execFileSync('git', ['diff', '--unified=0', '--no-color', base, 'HEAD', '--', ...targetRoots], {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
    });
  } catch (error) {
    console.warn(`git diff に失敗したため差分検査をスキップします: ${error.message}`);
    return new Map();
  }

  const changed = new Map();
  let currentFile = null;
  let newLine = null;

  for (const line of diff.split('\n')) {
    if (line.startsWith('+++ b/')) {
      currentFile = line.slice(6);
      if (!changed.has(currentFile)) changed.set(currentFile, new Set());
      continue;
    }
    if (line.startsWith('+++ /dev/null')) {
      currentFile = null;
      continue;
    }
    const hunk = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (hunk) {
      newLine = Number(hunk[1]);
      continue;
    }
    if (!currentFile || newLine == null) continue;
    if (line.startsWith('+') && !line.startsWith('+++')) {
      changed.get(currentFile).add(newLine);
      newLine += 1;
      continue;
    }
    if (line.startsWith('-') && !line.startsWith('---')) continue;
    if (!line.startsWith('\\ No newline at end of file')) newLine += 1;
  }

  for (const [file, lines] of [...changed.entries()]) {
    if (!lines.size || !file.endsWith('.md')) changed.delete(file);
  }
  return changed;
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
function lineText(source, line) { return source.split('\n')[line - 1] ?? ''; }
function relative(file) { return path.relative(root, file).replaceAll('\\', '/'); }
function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
