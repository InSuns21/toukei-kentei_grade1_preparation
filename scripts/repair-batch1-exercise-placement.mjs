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
installPlacementGuard();

console.log(`Moved ${targets.length} Batch 1 exercise blocks into their Level sections.`);

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

  const slot = findLevelSlot(source, file, level);
  const lines = block.split('\n');
  const headingIndex = lines.findIndex((line) => /^#{1,6}\s+/.test(line));
  if (headingIndex < 0) throw new Error(`${file}: ${anchor} has no heading`);
  lines[headingIndex] = lines[headingIndex].replace(/^#{1,6}/, '#'.repeat(slot.depth + 1));
  block = lines.join('\n');

  const insertion = `\n\n${block}\n\n`;
  source = source.slice(0, slot.end) + insertion + source.slice(slot.end).replace(/^\n+/, '');
  fs.writeFileSync(file, source, 'utf8');
}

function findLevelSlot(source, file, wantedLevel) {
  const headings = collectHeadings(source);
  const exerciseHeadings = headings.filter((heading) => heading.text.includes('演習') && !heading.text.includes('実過去問演習'));

  for (const exercise of exerciseHeadings) {
    const exerciseEnd = headings.find((heading) => heading.pos > exercise.pos && heading.depth <= exercise.depth)?.pos ?? source.length;
    const levelHeading = headings.find((heading) => {
      if (heading.pos <= exercise.pos || heading.pos >= exerciseEnd) return false;
      const match = heading.text.match(/^Level\s+([A-D])(?:\b|[:：])/i);
      return match?.[1].toUpperCase() === wantedLevel;
    });
    if (!levelHeading) continue;

    const levelEnd = headings.find((heading) => heading.pos > levelHeading.pos && heading.depth <= levelHeading.depth)?.pos ?? exerciseEnd;
    return { depth: levelHeading.depth, end: levelEnd };
  }

  throw new Error(`${file}: cannot find exercise Level ${wantedLevel}`);
}

function collectHeadings(source) {
  return [...source.matchAll(/^(#{1,6})\s+(.+)$/gm)].map((match) => ({
    pos: match.index,
    depth: match[1].length,
    text: match[2].trim(),
  }));
}

function installPlacementGuard() {
  const file = 'scripts/validate_textbook_structure.mjs';
  let source = fs.readFileSync(file, 'utf8');
  if (source.includes('function validateExercisePlacement()')) return;

  source = source.replace(
    'validateCanonicalTemplate();\n',
    'validateCanonicalTemplate();\nvalidateExercisePlacement();\n',
  );

  const guard = String.raw`
function validateExercisePlacement() {
  const volumesRoot = path.join(textbookRoot, 'volumes');
  if (!fs.existsSync(volumesRoot)) return;

  for (const volume of fs.readdirSync(volumesRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
    const volumeDir = path.join(volumesRoot, volume.name);
    for (const chapter of fs.readdirSync(volumeDir, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
      const chapterDir = path.join(volumeDir, chapter.name);
      const indexPath = path.join(chapterDir, 'index.md');
      const manifestPath = path.join(chapterDir, 'chapter.yaml');
      if (!fs.existsSync(indexPath) || !fs.existsSync(manifestPath)) continue;

      let manifest;
      try {
        manifest = YAML.parse(fs.readFileSync(manifestPath, 'utf8'));
      } catch {
        continue;
      }
      if (manifest?.status === 'supplementary') continue;

      const content = fs.readFileSync(indexPath, 'utf8');
      const headings = [...content.matchAll(/^(#{1,6})\s+(.+)$/gm)].map((match) => ({
        pos: match.index,
        depth: match[1].length,
        text: match[2].trim(),
      }));
      const levelHeadings = headings
        .map((heading) => {
          const match = heading.text.match(/^Level\s+([A-D])(?:\b|[:：])/i);
          return match ? { ...heading, level: match[1].toUpperCase() } : null;
        })
        .filter(Boolean);

      const exercisePattern = /<a id="ex-[^"]+"><\/a>\s*\n(#{1,6})\s+([^\n]+)\n(?:[^\n]*\n){0,8}?-\s*Level:\s*([A-D])\b/g;
      for (const match of content.matchAll(exercisePattern)) {
        const problemPos = match.index;
        const problemDepth = match[1].length;
        const level = match[3].toUpperCase();
        const levelHeading = [...levelHeadings]
          .reverse()
          .find((heading) => heading.pos < problemPos && heading.level === level);

        if (!levelHeading) {
          errors.push(`${relative(indexPath)}:${lineAt(content, problemPos)} anchored Level ${level} exercise is outside a Level ${level} section`);
          continue;
        }

        const levelEnd = headings.find((heading) => heading.pos > levelHeading.pos && heading.depth <= levelHeading.depth)?.pos ?? content.length;
        const parent = [...headings]
          .reverse()
          .find((heading) => heading.pos < levelHeading.pos && heading.depth < levelHeading.depth);

        if (problemPos >= levelEnd || !parent?.text.includes('演習')) {
          errors.push(`${relative(indexPath)}:${lineAt(content, problemPos)} anchored Level ${level} exercise is not inside the exercise Level ${level} block`);
        }
        if (problemDepth !== levelHeading.depth + 1) {
          errors.push(`${relative(indexPath)}:${lineAt(content, problemPos)} exercise heading depth ${problemDepth} must be one level below Level ${level} heading depth ${levelHeading.depth}`);
        }
      }
    }
  }
}

function lineAt(source, index) {
  return source.slice(0, index).split('\n').length;
}
`;

  const insertionPoint = '\nfunction relative(file) {';
  if (!source.includes(insertionPoint)) throw new Error(`${file}: insertion point not found`);
  source = source.replace(insertionPoint, `${guard}${insertionPoint}`);
  fs.writeFileSync(file, source, 'utf8');
}
