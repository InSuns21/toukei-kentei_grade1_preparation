import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const exerciseRoots = ['statistical-mathematics', 'applied-rikou-80']
  .map((name) => path.join(root, name))
  .filter(fs.existsSync);

const categories = [
  {
    name: '強い省略表現',
    weight: 5,
    pattern: /定数を除いて|定数項を除いて|比例定数を(?:無視|除いて)|簡単な計算(?:で|により)|計算すると|計算すれば|整理すると|整理すれば|直ちに(?:分かる|わかる|得られる|従う)/g,
  },
  {
    name: '微分の省略候補',
    weight: 4,
    pattern: /(?:偏|全)?微分すると|(?:偏|全)?微分すれば|行列微分(?:すると|により|より)|勾配を取ると/g,
  },
  {
    name: '積分の省略候補',
    weight: 4,
    pattern: /積分すると|積分すれば|部分積分すると|部分積分すれば|置換積分すると|置換すると/g,
  },
  {
    name: '線形代数・最小二乗の省略候補',
    weight: 5,
    pattern: /正規方程式(?:より|から|は)|固有方程式(?:より|から)|特性方程式(?:より|から)|逆行列(?:は|を求めると)|固有値(?:は|を求めると)/g,
  },
  {
    name: '変数変換・平方完成の省略候補',
    weight: 5,
    pattern: /ヤコビアン(?:は|より|から)|Jacobian(?:は|より|から)|平方完成すると|平方完成すれば|変数変換すると/g,
  },
  {
    name: '尤度・情報量の省略候補',
    weight: 3,
    pattern: /対数尤度(?:は|を取ると)|尤度(?:は|を作ると)|スコア(?:は|を求めると)|フィッシャー情報量(?:は|を求めると)/g,
  },
  {
    name: '分布・期待値の省略候補',
    weight: 2,
    pattern: /分布(?:より|から)|独立性より|正規性より|期待値を取ると|分散を取ると/g,
  },
  {
    name: '漸近展開の省略候補',
    weight: 4,
    pattern: /テイラー展開すると|Taylor展開すると|デルタ法より|中心極限定理より|大数の法則より|Slutsky(?:の定理)?より|スルツキー(?:の定理)?より/g,
  },
  {
    name: '式変形の省略候補',
    weight: 3,
    pattern: /展開すると|変形すると|代入すると|両辺を整理すると|これを解くと|連立すると/g,
  },
];

const files = exerciseRoots
  .flatMap(walk)
  .filter((file) => file.endsWith('.md'))
  .filter((file) => ['core', 'standard', 'advanced'].some((part) => file.split(path.sep).includes(part)));

const findings = [];
const categoryCounts = new Map(categories.map(({ name }) => [name, 0]));
let missingDetailedAnswer = 0;

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const detailed = extractDetailedAnswer(source);
  if (!detailed) {
    missingDetailedAnswer += 1;
    continue;
  }

  for (const category of categories) {
    for (const match of detailed.text.matchAll(category.pattern)) {
      const localLine = lineAt(detailed.text, match.index ?? 0);
      const line = detailed.startLine + localLine - 1;
      categoryCounts.set(category.name, categoryCounts.get(category.name) + 1);
      findings.push({
        file: relative(file),
        line,
        phrase: match[0],
        category: category.name,
        weight: category.weight,
      });
    }
  }
}

const byFile = new Map();
for (const finding of findings) {
  const current = byFile.get(finding.file) ?? { score: 0, findings: [] };
  current.score += finding.weight;
  current.findings.push(finding);
  byFile.set(finding.file, current);
}

const ranked = [...byFile.entries()]
  .map(([file, data]) => ({ file, ...data }))
  .sort((a, b) => b.score - a.score || b.findings.length - a.findings.length || a.file.localeCompare(b.file));

const lines = [];
lines.push('詳細解答の行間監査（候補抽出・非ブロッキング）');
lines.push(`対象: ${files.length} ファイル / 候補: ${findings.length} 件 / 候補を含むファイル: ${ranked.length} 件`);
if (missingDetailedAnswer) lines.push(`詳細解答セクションなし: ${missingDetailedAnswer} ファイル`);
lines.push('');
lines.push('カテゴリ別件数:');
for (const category of categories) {
  lines.push(`- ${category.name}: ${categoryCounts.get(category.name)} 件`);
}
lines.push('');
lines.push('優先監査ファイル（上位40件）:');
for (const item of ranked.slice(0, 40)) {
  const examples = item.findings
    .slice(0, 4)
    .map((finding) => `${finding.line}:${finding.phrase}`)
    .join(', ');
  lines.push(`- score=${item.score} ${item.file} — ${examples}`);
}
lines.push('');
lines.push('注意: この監査は語句ベースの候補抽出であり、検出=誤りではない。問題の採点対象か、直前直後に途中式が十分あるかを人手で確認して本文を修正する。');

console.log(lines.join('\n'));

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
if (summaryPath) {
  const markdown = [];
  markdown.push('## 詳細解答の行間監査');
  markdown.push('');
  markdown.push(`対象 **${files.length}** ファイル、候補 **${findings.length}** 件、候補を含むファイル **${ranked.length}** 件。`);
  markdown.push('');
  markdown.push('| カテゴリ | 件数 |');
  markdown.push('| --- | ---: |');
  for (const category of categories) {
    markdown.push(`| ${category.name} | ${categoryCounts.get(category.name)} |`);
  }
  markdown.push('');
  markdown.push('### 優先監査ファイル');
  markdown.push('');
  for (const item of ranked.slice(0, 25)) {
    markdown.push(`- \`${item.file}\` — score ${item.score}, ${item.findings.length} candidates`);
  }
  markdown.push('');
  markdown.push('> 語句ベースの候補抽出なので、このステップ自体は失敗させない。採点対象の導出を飛ばしているかを人手で判定する。');
  fs.appendFileSync(summaryPath, `${markdown.join('\n')}\n`, 'utf8');
}

function extractDetailedAnswer(source) {
  const startMatch = /^## 詳細解答\s*$/m.exec(source);
  if (!startMatch) return null;
  const startIndex = (startMatch.index ?? 0) + startMatch[0].length;
  const tail = source.slice(startIndex);
  const endMatch = /^## (?:本番答案|採点基準)\s*$/m.exec(tail);
  const endIndex = endMatch ? startIndex + (endMatch.index ?? tail.length) : source.length;
  return {
    text: source.slice(startIndex, endIndex),
    startLine: lineAt(source, startIndex),
  };
}

function walk(directory) {
  const ignored = new Set(['.git', 'node_modules', 'build', 'dist', 'sources']);
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
