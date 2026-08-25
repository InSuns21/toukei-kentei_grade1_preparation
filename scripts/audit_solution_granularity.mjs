import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const exerciseRoots = ['statistical-mathematics', 'applied-rikou-80']
  .map((name) => path.join(root, name))
  .filter(fs.existsSync);

const phraseCategories = [
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

const structuralCategories = [
  { name: '小問対応見出し不足', weight: 6 },
  { name: '詳細解答量の要確認', weight: 4 },
];

const categoryCounts = new Map(
  [...phraseCategories, ...structuralCategories].map(({ name }) => [name, 0]),
);

const tierNames = new Set(['core', 'standard', 'advanced']);
const files = exerciseRoots
  .flatMap(walk)
  .filter((file) => /^\d+_.+\.md$/.test(path.basename(file)))
  .filter((file) => file.split(path.sep).some((part) => tierNames.has(part)));

const benchmarkPath = path.join(
  root,
  'statistical-mathematics',
  'core',
  '40_fisher_information_delta_mle_efficiency.md',
);
const benchmarkDetailed = fs.existsSync(benchmarkPath)
  ? extractDetailedAnswer(fs.readFileSync(benchmarkPath, 'utf8'))
  : null;
const benchmarkLength = benchmarkDetailed ? compactLength(benchmarkDetailed.text) : null;

const findings = [];
let missingDetailedAnswer = 0;

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const problem = extractProblem(source);
  const detailed = extractDetailedAnswer(source);

  if (!detailed) {
    missingDetailedAnswer += 1;
    continue;
  }

  for (const category of phraseCategories) {
    for (const match of detailed.text.matchAll(category.pattern)) {
      const localLine = lineAt(detailed.text, match.index ?? 0);
      const line = detailed.startLine + localLine - 1;
      addFinding({
        file: relative(file),
        line,
        phrase: match[0],
        category: category.name,
        weight: category.weight,
      });
    }
  }

  if (!problem) continue;

  const taskCount = countProblemTasks(problem.text);
  const headingCount = countDetailedTaskHeadings(detailed.text);
  const detailLength = compactLength(detailed.text);

  if (taskCount >= 3 && headingCount < taskCount) {
    const category = structuralCategories[0];
    addFinding({
      file: relative(file),
      line: detailed.startLine,
      phrase: `小問${taskCount}題 / 対応見出し${headingCount}個`,
      category: category.name,
      weight: category.weight + Math.min(taskCount - headingCount, 4),
    });
  }

  // 文字数だけで品質を決めない。これは「短いため人手で優先確認する」ための非ブロッキング候補。
  // 4小問なら約1040文字、5小問なら約1300文字を目安に、詳細解答が極端に圧縮されていないかを見る。
  const minimumReviewLength = taskCount >= 3 ? taskCount * 260 : 0;
  if (minimumReviewLength > 0 && detailLength < minimumReviewLength) {
    const category = structuralCategories[1];
    addFinding({
      file: relative(file),
      line: detailed.startLine,
      phrase: `詳細解答${detailLength}文字 / 小問${taskCount}題`,
      category: category.name,
      weight: category.weight,
    });
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
if (benchmarkLength !== null) {
  lines.push(`代表的な粒度参照: statistical-mathematics/core/40_fisher_information_delta_mle_efficiency.md（詳細解答の非空白文字数 ${benchmarkLength}）`);
  lines.push('注意: 参照例との文字数一致は要求しない。採点対象の出発点・条件・途中計算・結論が再現可能かを優先する。');
}
if (missingDetailedAnswer) lines.push(`詳細解答セクションなし: ${missingDetailedAnswer} ファイル`);
lines.push('');
lines.push('カテゴリ別件数:');
for (const category of [...phraseCategories, ...structuralCategories]) {
  lines.push(`- ${category.name}: ${categoryCounts.get(category.name)} 件`);
}
lines.push('');
lines.push('優先監査ファイル（上位60件）:');
for (const item of ranked.slice(0, 60)) {
  const examples = item.findings
    .slice(0, 5)
    .map((finding) => `${finding.line}:${finding.phrase}`)
    .join(', ');
  lines.push(`- score=${item.score} ${item.file} — ${examples}`);
}
lines.push('');
lines.push('注意: この監査は候補抽出であり、検出=誤りではない。短さを機械的に水増しせず、問題の採点対象か、直前直後に途中式が十分あるかを人手で確認して本文を修正する。');

console.log(lines.join('\n'));

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
if (summaryPath) {
  const markdown = [];
  markdown.push('## 詳細解答の行間監査');
  markdown.push('');
  markdown.push(`対象 **${files.length}** ファイル、候補 **${findings.length}** 件、候補を含むファイル **${ranked.length}** 件。`);
  if (benchmarkLength !== null) {
    markdown.push('');
    markdown.push(`代表的な粒度参照は \`statistical-mathematics/core/40_fisher_information_delta_mle_efficiency.md\`（詳細解答の非空白文字数 ${benchmarkLength}）。文字数一致ではなく、出発点・条件・途中計算・結論の再現可能性を基準にする。`);
  }
  markdown.push('');
  markdown.push('| カテゴリ | 件数 |');
  markdown.push('| --- | ---: |');
  for (const category of [...phraseCategories, ...structuralCategories]) {
    markdown.push(`| ${category.name} | ${categoryCounts.get(category.name)} |`);
  }
  markdown.push('');
  markdown.push('### 優先監査ファイル');
  markdown.push('');
  for (const item of ranked.slice(0, 40)) {
    markdown.push(`- \`${item.file}\` — score ${item.score}, ${item.findings.length} candidates`);
  }
  markdown.push('');
  markdown.push('> 語句・構造・短さから候補を抽出する非ブロッキング監査。検出だけで不合格にはせず、採点対象の導出が実際に飛んでいるかを確認する。');
  fs.appendFileSync(summaryPath, `${markdown.join('\n')}\n`, 'utf8');
}

function addFinding(finding) {
  findings.push(finding);
  categoryCounts.set(
    finding.category,
    (categoryCounts.get(finding.category) ?? 0) + 1,
  );
}

function extractProblem(source) {
  const startMatch = /^## 問題\s*$/m.exec(source);
  if (!startMatch) return null;
  const startIndex = (startMatch.index ?? 0) + startMatch[0].length;
  const tail = source.slice(startIndex);
  const endMatch = /^## 詳細解答\s*$/m.exec(tail);
  const endIndex = endMatch ? startIndex + (endMatch.index ?? tail.length) : source.length;
  return {
    text: source.slice(startIndex, endIndex),
    startLine: lineAt(source, startIndex),
  };
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

function countProblemTasks(text) {
  return (text.match(/^\s*\d+\.\s+/gm) ?? []).length;
}

function countDetailedTaskHeadings(text) {
  return (text.match(/^###\s+\d+\./gm) ?? []).length;
}

function compactLength(text) {
  return text.replace(/\s/g, '').length;
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
