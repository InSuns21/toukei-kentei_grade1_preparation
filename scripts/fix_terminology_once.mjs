import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targetRoots = [
  'statistical-mathematics',
  'applied-rikou-80',
  'textbook/volumes',
  'anki/cards',
];
const targets = targetRoots.map((value) => path.join(root, value)).filter(fs.existsSync);

const rules = [
  rule(/積率母関数/g, 'モーメント母関数', /モーメント母関数/),
  rule(/累積密度関数/g, '累積分布関数'),
  rule(/(?<!分散)共分散行列/g, '分散共分散行列', /分散共分散行列/),
  rule(/Fisher情報量/g, 'フィッシャー情報量', /フィッシャー情報量/),
  rule(/Chebyshev\s*(?:の\s*)?不等式/g, 'チェビシェフの不等式'),
  rule(/チェビシェフ\s*不等式/g, 'チェビシェフの不等式'),
  rule(/チェビシェフ\s+の\s*不等式/g, 'チェビシェフの不等式'),
  rule(/p値/g, 'P値'),
  rule(/p\s+値/g, 'P値'),
  rule(/P\s+値/g, 'P値'),
  rule(/\bp-value\b/gi, 'P値'),

  rule(/\bCauchy\s+distribution\b/g, 'コーシー分布', /コーシー分布/),
  rule(/\bCauchy\s*分布/g, 'コーシー分布', /コーシー分布/),
  rule(/\bCauchy\b(?!\s+distribution)(?!\s*分布)(?!\s*(?:--|-|–|—)?\s*Schwarz)/g, 'コーシー', /コーシー/),
  rule(/カウチー/g, 'コーシー'),
  rule(/\bWeibull\s+distribution\b/g, 'ワイブル分布', /ワイブル分布/),
  rule(/\bWeibull\s*分布/g, 'ワイブル分布', /ワイブル分布/),
  rule(/\bWeibull\b(?!\s+distribution)(?!\s*分布)/g, 'ワイブル', /ワイブル/),
  rule(/ウェイブル/g, 'ワイブル'),
  rule(/レイブル/g, 'ワイブル'),
  rule(/\bPareto\s+distribution\b/g, 'パレート分布', /パレート分布/),
  rule(/\bPareto\s*分布/g, 'パレート分布', /パレート分布/),
  rule(/\bPareto\b(?!\s+distribution)(?!\s*分布)/g, 'パレート', /パレート/),

  acronym(/\bPMF\b/g, '確率質量関数'),
  acronym(/\bPDF\b/g, '確率密度関数'),
  acronym(/\bCDF\b/g, '累積分布関数'),
  acronym(/\bPGF\b/g, '確率母関数'),
  acronym(/\bMGF\b/g, 'モーメント母関数'),
  acronym(/\bCF\b/g, '特性関数'),
  acronym(/\bCGF\b/g, 'キュムラント母関数'),
  acronym(/\biid\b/gi, '独立同分布'),
  acronym(/(?<![A-Za-z0-9_])i\.i\.d\.(?![A-Za-z0-9_])/gi, '独立同分布'),

  rule(/\bMLE\b/g, '最尤推定量', /最尤(?:推定量|推定|法)/),
  acronym(/\bLRT\b/g, '尤度比検定'),
  acronym(/\bLR\b/g, '尤度比'),
  acronym(/\bCRLB\b/g, 'クラーメル・ラオの不等式'),
  rule(/\bNP\s+lemma\b/gi, 'ネイマン・ピアソンの基本定理', /ネイマン・ピアソン/),
  acronym(/\bMP\s+test\b/gi, '最強力検定'),
  acronym(/\bUMP\b/g, '一様最強力検定'),
  acronym(/\bUMPU\b/g, '一様最強力不偏検定'),
  acronym(/\bUMVU\b/g, '一様最小分散不偏推定量'),
  acronym(/\bCI\b/g, '信頼区間'),
  acronym(/\bSE\b/g, '標準誤差'),
  acronym(/\bMSE\b/g, '平均二乗誤差'),

  acronym(/\bCLT\b/g, '中心極限定理'),
  acronym(/\bLLN\b/g, '大数の法則'),
  acronym(/\bOLS\b/g, '通常最小二乗法'),
  acronym(/\bGLS\b/g, '一般化最小二乗法'),
  acronym(/\bANOVA\b/g, '分散分析'),
  acronym(/\bANCOVA\b/g, '共分散分析'),
  acronym(/\bGLM\b/g, '一般化線形モデル'),
  acronym(/\bSVD\b/g, '特異値分解'),
  acronym(/\bPCA\b/g, '主成分分析'),
];

const normalizedTerms = [...new Set(rules.map((item) => item.replacement))]
  .sort((a, b) => b.length - a.length)
  .map(escapeRegExp)
  .join('|');
const termPattern = new RegExp(`(?:${normalizedTerms})`, 'g');

const changedFiles = [];
for (const base of targets) {
  for (const file of walk(base).filter((value) => value.endsWith('.md'))) {
    const source = fs.readFileSync(file, 'utf8');
    const sourceLines = source.split('\n');
    const maskedLines = stripNonProse(source).split('\n');
    let changed = false;

    for (let i = 0; i < sourceLines.length; i += 1) {
      if (!(maskedLines[i] ?? '').trim()) continue;
      let line = sourceLines[i];
      let searchable = maskedLines[i] ?? '';

      for (const current of rules) {
        if (current.allowPattern?.test(searchable)) continue;
        const matches = [...searchable.matchAll(current.pattern)];
        if (!matches.length) continue;
        for (const match of matches.reverse()) {
          const start = match.index ?? 0;
          const end = start + match[0].length;
          line = `${line.slice(0, start)}${current.replacement}${line.slice(end)}`;
          changed = true;
        }
        searchable = stripNonProse(line);
      }

      const polished = normalizeSpacing(line);
      if (polished !== line) {
        line = polished;
        changed = true;
      }
      sourceLines[i] = line;
    }

    if (changed) {
      fs.writeFileSync(file, sourceLines.join('\n'));
      changedFiles.push(relative(file));
    }
  }
}

console.log(`用語一括修正: ${changedFiles.length} ファイル`);
for (const file of changedFiles) console.log(`- ${file}`);

function rule(pattern, replacement, allowPattern = null) {
  return { pattern, replacement, allowPattern };
}

function acronym(pattern, replacement) {
  return rule(pattern, replacement, new RegExp(escapeRegExp(replacement)));
}

function normalizeSpacing(line) {
  if (!termPattern.test(line)) {
    termPattern.lastIndex = 0;
    return line;
  }
  termPattern.lastIndex = 0;
  let value = line;
  const left = new RegExp(`([ぁ-んァ-ヶ一-龠々）】])\\s+((?:${normalizedTerms}))`, 'g');
  const right = new RegExp(`((?:${normalizedTerms}))\\s+([ぁ-んァ-ヶ一-龠々、。・はがをにでとのへもやかばならより])`, 'g');
  value = value.replace(left, '$1$2').replace(right, '$1$2');
  return value;
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
  value = value.replace(/^\s*(?:id|topic):[^\n]*$/gm, preserveWidth);
  return value;
}

function preserveLines(value) { return '\n'.repeat((value.match(/\n/g) ?? []).length); }
function preserveWidth(value) { return ' '.repeat(value.length); }
function relative(file) { return path.relative(root, file).replaceAll('\\', '/'); }
function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
