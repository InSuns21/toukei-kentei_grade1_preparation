import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const strict = process.argv.includes('--strict');
const changedOnly = process.argv.includes('--changed-only');

const targetRoots = [
  'statistical-mathematics',
  'applied-rikou-80',
  'textbook/volumes',
  'anki/cards',
];

const rules = [
  acronym('PMF', ['確率質量関数'], ['Probability Mass Function']),
  acronym('PDF', ['確率密度関数'], ['Probability Density Function']),
  acronym('CDF', ['累積分布関数'], ['Cumulative Distribution Function']),
  acronym('PGF', ['確率母関数'], ['Probability Generating Function']),
  acronym('MGF', ['モーメント母関数'], ['Moment Generating Function']),
  acronym('CF', ['特性関数'], ['Characteristic Function']),
  acronym('CGF', ['キュムラント母関数'], ['Cumulant Generating Function']),
  custom('iid', /(?<![A-Za-z0-9_])(?:iid|i\.i\.d\.)(?![A-Za-z0-9_])/i,
    ['独立同分布'], ['independent and identically distributed']),

  acronym('MLE', ['最尤推定', '最尤推定量', '最尤法'], ['Maximum Likelihood Estimation', 'Maximum Likelihood Estimator', 'Maximum Likelihood']),
  acronym('LRT', ['尤度比検定'], ['Likelihood Ratio Test']),
  acronym('LR', ['尤度比'], ['Likelihood Ratio']),
  acronym('CRLB', ['クラーメル・ラオの不等式', 'クラーメル・ラオ下限'], ['Cramér–Rao Lower Bound', 'Cramer-Rao Lower Bound']),
  custom('NP lemma', /\bNP\s+lemma\b/i,
    ['ネイマン・ピアソンの基本定理', 'ネイマン・ピアソンの補題'], ['Neyman–Pearson Lemma', 'Neyman-Pearson Lemma']),
  custom('MP test', /\bMP\s+test\b/i,
    ['最強力検定'], ['Most Powerful Test']),
  acronym('UMP', ['一様最強力検定'], ['Uniformly Most Powerful']),
  acronym('UMPU', ['一様最強力不偏検定'], ['Uniformly Most Powerful Unbiased']),
  acronym('UMVU', ['一様最小分散不偏推定量'], ['Uniformly Minimum Variance Unbiased']),
  acronym('CI', ['信頼区間'], ['Confidence Interval']),
  acronym('SE', ['標準誤差'], ['Standard Error']),
  acronym('MSE', ['平均二乗誤差'], ['Mean Squared Error', 'Mean Square Error']),

  acronym('CLT', ['中心極限定理'], ['Central Limit Theorem']),
  acronym('LLN', ['大数の法則'], ['Law of Large Numbers']),
  acronym('OLS', ['通常最小二乗法'], ['Ordinary Least Squares']),
  acronym('GLS', ['一般化最小二乗法'], ['Generalized Least Squares']),
  acronym('ANOVA', ['分散分析'], ['Analysis of Variance']),
  acronym('ANCOVA', ['共分散分析'], ['Analysis of Covariance']),
  acronym('GLM', ['一般化線形モデル'], ['Generalized Linear Model']),
  acronym('SVD', ['特異値分解'], ['Singular Value Decomposition']),
  acronym('PCA', ['主成分分析'], ['Principal Component Analysis']),

  acronym('MCT', ['単調収束定理'], ['Monotone Convergence Theorem']),
  acronym('DCT', ['優収束定理', 'Lebesgueの優収束定理', 'ルベーグの優収束定理'], ['Dominated Convergence Theorem']),
  custom('a.e.', /(?<![A-Za-z0-9_])a\.e\.(?![A-Za-z0-9_])/i,
    ['ほとんど至る所', 'ほとんどいたる所'], ['almost everywhere']),
];

const files = changedOnly ? collectChangedMarkdownFiles() : collectAllMarkdownFiles();
const findings = [];

for (const rel of files) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) continue;
  const source = fs.readFileSync(full, 'utf8');
  const ignored = collectIgnoredTokens(source);
  const searchable = stripNonReaderContent(source);

  for (const rule of rules) {
    if (ignored.has(rule.token)) continue;
    const match = rule.pattern.exec(searchable);
    if (!match) continue;

    const line = lineAt(searchable, match.index ?? 0);
    const context = lineText(searchable, line);
    const hasJapanese = rule.japanese.some((term) => context.includes(term));
    const folded = context.toLocaleLowerCase('en-US');
    const hasEnglish = rule.english.some((term) => folded.includes(term.toLocaleLowerCase('en-US')));

    if (!hasJapanese || !hasEnglish) {
      findings.push({
        file: rel,
        line,
        token: rule.token,
        missing: [!hasJapanese ? '日本語正式名' : null, !hasEnglish ? '英語正式名' : null].filter(Boolean),
        example: `${rule.japanese[0]}（${rule.english[0]}; ${rule.token}）`,
      });
    }
  }
}

console.log(strict ? '略称のページ内初出検証（strict）' : '略称のページ内初出監査');
console.log(`対象ページ: ${files.length} / 登録略称: ${rules.length}`);
if (changedOnly) console.log('CI差分検査: 変更された Markdown ページ全体の初出を検査');
console.log(`違反候補: ${findings.length} 件`);
for (const item of findings) {
  console.log(`- ${item.file}:${item.line} ${item.token}: ${item.missing.join('・')}が初出にありません`);
  console.log(`  例: ${item.example}`);
}

if (!strict) {
  console.log('監査モードは候補抽出のみです。コード、数式、URL、HTMLコメントは読者向け初出から除外します。');
  console.log('例外が必要な同形略語は <!-- acronym-first-use-ignore: CI --> のようにページ内で明示できます。');
}

if (strict && findings.length) {
  console.error('略称の初出検証に失敗しました。各ページの最初の使用で「日本語正式名（English Full Name; 略称）」を示してください。');
  process.exit(1);
}

function acronym(token, japanese, english) {
  return custom(token, new RegExp(`\\b${escapeRegExp(token)}\\b`), japanese, english);
}

function custom(token, pattern, japanese, english) {
  return { token, pattern, japanese, english };
}

function collectAllMarkdownFiles() {
  const files = [];
  for (const target of targetRoots) {
    const full = path.join(root, target);
    if (!fs.existsSync(full)) continue;
    for (const file of walk(full)) {
      if (file.endsWith('.md')) files.push(relative(file));
    }
  }
  return files.sort();
}

function collectChangedMarkdownFiles() {
  const base = resolveDiffBase();
  if (!base) {
    console.warn('CI差分の基準コミットを取得できないため、変更ページは0件として扱います。');
    return [];
  }

  try {
    const output = execFileSync('git', ['diff', '--name-only', '--diff-filter=ACMR', base, 'HEAD', '--', ...targetRoots], {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
    });
    return [...new Set(output.split('\n').map((value) => value.trim()).filter((value) => value.endsWith('.md')))];
  } catch (error) {
    console.warn(`git diff に失敗したため、変更ページは0件として扱います: ${error.message}`);
    return [];
  }
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

function collectIgnoredTokens(source) {
  const ignored = new Set();
  for (const match of source.matchAll(/<!--\s*acronym-first-use-ignore:\s*([^>]+?)\s*-->/gi)) {
    for (const token of match[1].split(',').map((value) => value.trim()).filter(Boolean)) ignored.add(token);
  }
  return ignored;
}

function walk(directory) {
  const ignored = new Set(['.git', 'node_modules', 'dist', 'build', 'sources', 'review']);
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function stripNonReaderContent(source) {
  let value = source;
  value = value.replace(/<!--[\s\S]*?-->/g, preserveLines);
  value = value.replace(/```[\s\S]*?```/g, preserveLines);
  value = value.replace(/`[^`\n]*`/g, preserveWidth);
  value = value.replace(/\$\$[\s\S]*?\$\$/g, preserveLines);
  value = value.replace(/\$(?:\\.|[^$\n])+\$/g, preserveWidth);
  value = value.replace(/\]\([^\n)]*\)/g, (text) => ']'.padEnd(text.length, ' '));
  value = value.replace(/https?:\/\/\S+/g, preserveWidth);
  value = value.replace(/^\s*(?:id|topic):[^\n]*$/gm, preserveWidth);
  return value;
}

function preserveLines(value) { return '\n'.repeat((value.match(/\n/g) ?? []).length); }
function preserveWidth(value) { return ' '.repeat(value.length); }
function lineAt(source, index) { return source.slice(0, index).split('\n').length; }
function lineText(source, line) { return source.split('\n')[line - 1] ?? ''; }
function relative(file) { return path.relative(root, file).replaceAll('\\', '/'); }
function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
