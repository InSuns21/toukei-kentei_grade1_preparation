import fs from 'node:fs';

const targets = [
  ['textbook/volumes/01_probability/P2_02_期待値_分散_共分散_母関数/index.md', 'ex-p2-02-syllabus-characteristics', 'B'],
  ['textbook/volumes/02_distributions/P4_02_確率変数の収束_大数則_中心極限定理/index.md', 'ex-p4-02-law-small-numbers', 'A'],
  ['textbook/volumes/02_distributions/P4_03_経験分布_乱数生成_monte_carlo/index.md', 'ex-p4-03-bootstrap', 'B'],
  ['textbook/volumes/02_distributions/P4_03_経験分布_乱数生成_monte_carlo/index.md', 'ex-p4-03-mcmc', 'C'],
  ['textbook/volumes/03_inference/I1_02_推定法と推定量の評価/index.md', 'ex-i1-02-relative-efficiency', 'B'],
  ['textbook/volumes/03_inference/I3_01_検定の基礎とネイマン_ピアソン理論/index.md', 'ex-i3-01-power-curve', 'A'],
  ['textbook/volumes/03_inference/I3_03_正規母集団_適合度_ノンパラメトリック検定/index.md', 'ex-i3-03-basic-distribution-tests', 'B'],
  ['textbook/volumes/03_inference/I3_03_正規母集団_適合度_ノンパラメトリック検定/index.md', 'ex-i3-03-fisher-yates', 'B'],
  ['textbook/volumes/03_inference/I3_03_正規母集団_適合度_ノンパラメトリック検定/index.md', 'ex-i3-03-mcnemar-rank', 'C'],
  ['textbook/volumes/03_inference/I4_01_ベイズ推定_事後分布_予測分布/index.md', 'ex-i4-01-hierarchical-bayes', 'B'],
  ['textbook/volumes/03_inference/I4_01_ベイズ推定_事後分布_予測分布/index.md', 'ex-i4-01-gibbs', 'C'],
  ['textbook/volumes/04_linear_models/L1_01_単回帰と最小二乗法/index.md', 'ex-l1-01-regression-to-mean', 'B'],
  ['textbook/volumes/04_linear_models/L1_02_重回帰_線形モデルの行列表現/index.md', 'ex-l1-02-multiple-correlation', 'A'],
  ['textbook/volumes/04_linear_models/L1_03_分散分析/index.md', 'ex-l1-03-ancova', 'B'],
  ['textbook/volumes/05_engineering/E1_04_プロビット_非線形回帰_SVM/index.md', 'ex-e1-04-tobit', 'B'],
];

for (const [file, anchor, level] of targets) moveExercise(file, anchor, level);
console.log(`Moved ${targets.length} Batch 1 exercise blocks into their exercise sections.`);

function moveExercise(file, anchor, level) {
  let source = fs.readFileSync(file, 'utf8');
  const marker = `<a id="${anchor}"></a>`;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`${file}: missing ${anchor}`);

  const solutionEndToken = '<!-- solution-end -->';
  const solutionEnd = source.indexOf(solutionEndToken, start);
  if (solutionEnd < 0) throw new Error(`${file}: ${anchor} has no solution-end`);
  let end = solutionEnd + solutionEndToken.length;
  while (source[end] === '\n' && source[end + 1] === '\n') end += 1;

  let block = source.slice(start, end).trim();
  source = source.slice(0, start) + source.slice(end);
  source = source.replace(/\n{4,}/g, '\n\n\n');

  const slot = findExerciseSlot(source, file, level);
  const lines = block.split('\n');
  const headingIndex = lines.findIndex((line) => /^#{1,6}\s+/.test(line));
  if (headingIndex < 0) throw new Error(`${file}: ${anchor} has no heading`);
  lines[headingIndex] = lines[headingIndex].replace(/^#{1,6}/, '#'.repeat(slot.problemDepth));
  block = lines.join('\n');

  source = source.slice(0, slot.end) + `\n\n${block}\n\n` + source.slice(slot.end).replace(/^\n+/, '');
  fs.writeFileSync(file, source, 'utf8');
}

function findExerciseSlot(source, file, wantedLevel) {
  const headings = collectHeadings(source);
  const exerciseHeadings = headings.filter((heading) => heading.text.includes('演習') && !heading.text.includes('実過去問演習'));

  for (const exercise of exerciseHeadings) {
    const sectionLevel = exercise.text.match(/演習\s+Level\s+([A-D])(?:\b|[:：])/i)?.[1]?.toUpperCase();
    const exerciseEnd = headings.find((heading) => heading.pos > exercise.pos && heading.depth <= exercise.depth)?.pos ?? source.length;
    if (sectionLevel) {
      if (sectionLevel === wantedLevel) return { problemDepth: exercise.depth + 1, end: exerciseEnd };
      continue;
    }

    const inExercise = headings.filter((heading) => heading.pos > exercise.pos && heading.pos < exerciseEnd);
    const grouped = inExercise.find((heading) => {
      const match = heading.text.match(/^Level\s+([A-D])(?:\b|[:：])/i);
      return match?.[1].toUpperCase() === wantedLevel;
    });
    if (grouped) {
      const levelEnd = headings.find((heading) => heading.pos > grouped.pos && heading.depth <= grouped.depth)?.pos ?? exerciseEnd;
      return { problemDepth: grouped.depth + 1, end: levelEnd };
    }

    const problems = inExercise.flatMap((heading, index) => {
      if (heading.depth <= exercise.depth || /^Level\s+/i.test(heading.text)) return [];
      const nextPos = inExercise[index + 1]?.pos ?? exerciseEnd;
      const lead = source.slice(heading.pos, nextPos);
      const meta = lead.match(/^-\s*level:\s*([A-D])\b/im);
      return meta ? [{ ...heading, level: meta[1].toUpperCase() }] : [];
    });
    if (!problems.length) continue;

    const sameLevel = problems.filter((problem) => problem.level === wantedLevel);
    if (sameLevel.length) {
      const last = sameLevel.at(-1);
      const nextProblem = problems.find((problem) => problem.pos > last.pos);
      return { problemDepth: last.depth, end: nextProblem?.pos ?? exerciseEnd };
    }

    const order = { A: 0, B: 1, C: 2, D: 3 };
    const later = problems.find((problem) => order[problem.level] > order[wantedLevel]);
    return { problemDepth: problems[0].depth, end: later?.pos ?? exerciseEnd };
  }

  throw new Error(`${file}: cannot find exercise slot for Level ${wantedLevel}`);
}

function collectHeadings(source) {
  return [...source.matchAll(/^(#{1,6})\s+(.+)$/gm)].map((match) => ({
    pos: match.index,
    depth: match[1].length,
    text: match[2].trim(),
  }));
}
