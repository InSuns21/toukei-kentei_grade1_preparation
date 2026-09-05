import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const sourceRoot = path.join(root, 'textbook', 'volumes');
const targetRoot = path.join(root, '_site', 'textbook', 'volumes');
const inlineAppendixName = 'linear_algebra_singular_null_span.md';
const determinantInverseAppendixName = 'linear_algebra_determinant_inverse.md';
const calculationDrillAppendixName = 'calculation_drills.md';
const differentiationUnderIntegralAppendixName = 'differentiate_under_integral.md';
const integrationOrderAppendixName = 'integration_order_exchange.md';
const eigenCalculationAppendixName = 'linear_algebra_eigen_calculation.md';
const positiveDefiniteAppendixName = 'linear_algebra_positive_definite.md';
const matrixDifferentiationAppendixName = 'matrix_differentiation_calculation.md';

if (!fs.existsSync(sourceRoot) || !fs.existsSync(targetRoot)) {
  console.error('先に scripts/build-pages.mjs を実行してください。');
  process.exit(1);
}

let converted = 0;
let canonical = 0;
let removedAuxiliaryMarkdown = 0;
let inlinedAppendices = 0;

for (const volume of fs.readdirSync(sourceRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
  const sourceVolume = path.join(root, 'textbook', 'volumes', volume.name);
  const targetVolume = path.join(targetRoot, volume.name);
  if (!fs.existsSync(targetVolume)) continue;

  for (const chapter of fs.readdirSync(sourceVolume, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
    const sourceChapter = path.join(sourceVolume, chapter.name);
    const targetChapter = path.join(targetVolume, chapter.name);
    if (!fs.existsSync(targetChapter)) continue;

    const canonicalPath = path.join(sourceChapter, 'index.md');
    if (fs.existsSync(canonicalPath)) {
      const siteRelative = path.posix.join('textbook', 'volumes', volume.name, chapter.name, 'index.md');
      let text = orientMarkdownLinks(fs.readFileSync(canonicalPath, 'utf8'), siteRelative);

      if (chapter.name.startsWith('F0_00_')) {
        text = replaceF000SectionFromFile(
          text,
          sourceChapter,
          differentiationUnderIntegralAppendixName,
          /^### 4\.4 積分記号下の微分\s*$/m,
          /^## 5\. ガウス積分：/m,
          2,
        );
        text = replaceF000SectionFromFile(
          text,
          sourceChapter,
          integrationOrderAppendixName,
          /^### 6\.2 /m,
          /^### 6\.3 /m,
          2,
        );
      }

      const determinantInversePath = path.join(sourceChapter, determinantInverseAppendixName);
      if (chapter.name.startsWith('F0_00_') && fs.existsSync(determinantInversePath)) {
        text = inlineDeterminantInverseAppendix(text, fs.readFileSync(determinantInversePath, 'utf8'));
        inlinedAppendices += 1;
      }

      const appendixPath = path.join(sourceChapter, inlineAppendixName);
      if (fs.existsSync(appendixPath)) {
        text = inlineLinearAlgebraAppendix(text, fs.readFileSync(appendixPath, 'utf8'));
        inlinedAppendices += 1;
      }

      if (chapter.name.startsWith('F0_00_')) {
        text = replaceF000SectionFromFile(
          text,
          sourceChapter,
          eigenCalculationAppendixName,
          /^### 9\.6 /m,
          /^### 9\.7 /m,
          2,
        );
        text = replaceF000SectionFromFile(
          text,
          sourceChapter,
          positiveDefiniteAppendixName,
          /^### 9\.9 /m,
          /^### 9\.10 /m,
          2,
        );
        text = replaceF000SectionFromFile(
          text,
          sourceChapter,
          matrixDifferentiationAppendixName,
          /^## 10\. /m,
          /^## 11\. /m,
          1,
        );
        text = sanitizeF000Vocabulary(text);
      }

      const calculationDrillPath = path.join(sourceChapter, calculationDrillAppendixName);
      if (chapter.name.startsWith('F0_00_') && fs.existsSync(calculationDrillPath)) {
        text = inlineCalculationDrills(text, fs.readFileSync(calculationDrillPath, 'utf8'));
        inlinedAppendices += 1;
      }
      fs.writeFileSync(path.join(targetChapter, 'index.md'), text, 'utf8');
      removedAuxiliaryMarkdown += removeAuxiliaryMarkdown(targetChapter);
      canonical += 1;
      continue;
    }

    const legacy = legacyPaths(targetChapter);
    if (!legacy.every((file) => fs.existsSync(file))) continue;

    fs.writeFileSync(path.join(targetChapter, 'index.md'), composeLegacyChapter(legacy), 'utf8');
    removedAuxiliaryMarkdown += removeAuxiliaryMarkdown(targetChapter);
    converted += 1;
  }
}

console.log(
  `Textbook single-page rendering: canonical ${canonical}, legacy-composed ${converted}, inlined appendices ${inlinedAppendices}, auxiliary Markdown removed ${removedAuxiliaryMarkdown}`,
);

function legacyPaths(chapterDir) {
  return Array.from({ length: 10 }, (_, i) => {
    const prefix = String(i).padStart(2, '0');
    const entry = fs.readdirSync(chapterDir).find((name) => name.startsWith(`${prefix}_`) && name.endsWith('.md'));
    return entry ? path.join(chapterDir, entry) : path.join(chapterDir, `__missing_${prefix}.md`);
  });
}

function removeAuxiliaryMarkdown(chapterDir) {
  const canonicalIndex = path.resolve(chapterDir, 'index.md');
  let removed = 0;

  for (const file of walkMarkdown(chapterDir)) {
    if (path.resolve(file) === canonicalIndex) continue;
    fs.unlinkSync(file);
    removed += 1;
  }
  return removed;
}

function walkMarkdown(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkMarkdown(full);
    return entry.isFile() && entry.name.endsWith('.md') ? [full] : [];
  });
}

function composeLegacyChapter(files) {
  const parts = files.map((file) => fs.readFileSync(file, 'utf8'));
  const title = parts[0].match(/^#\s+(.+)$/m)?.[1]?.trim() ?? '通常教材';
  const out = [`# ${title}`, '', stripTopHeading(parts[0]).trim(), ''];

  for (let i = 1; i <= 5; i += 1) {
    out.push(demoteTopHeading(parts[i]).trim(), '');
  }

  out.push(interleaveExercises(parts[6], parts[7]).trim(), '');
  out.push(demoteTopHeading(parts[8]).trim(), '');
  out.push(demoteTopHeading(parts[9]).trim(), '');
  return out.filter((value, index, values) => value !== '' || values[index - 1] !== '').join('\n').trim() + '\n';
}

function replaceF000SectionFromFile(indexText, chapterDir, fileName, startPattern, endPattern, demotion) {
  const filePath = path.join(chapterDir, fileName);
  if (!fs.existsSync(filePath)) return indexText;

  const startMatch = startPattern.exec(indexText);
  const endMatch = endPattern.exec(indexText);
  if (!startMatch || !endMatch || endMatch.index <= startMatch.index) {
    throw new Error(`Could not replace F0-00 section from ${fileName}`);
  }

  const replacement = demoteHeadings(fs.readFileSync(filePath, 'utf8'), demotion).trim();
  const output = `${indexText.slice(0, startMatch.index)}${replacement}\n\n${indexText.slice(endMatch.index)}`;
  if (countOccurrences(output, '$$') % 2 !== 0) {
    throw new Error(`Replacing section from ${fileName} left unbalanced display-math delimiters`);
  }
  inlinedAppendices += 1;
  return output;
}

function sanitizeF000Vocabulary(text) {
  return text
    .replace('端点付近の積分可能性は、まずこの2本へ比較できないか考えます。', '端点付近の収束判定では、まずこの2本へ比較できないか考えます。')
    .replace('右辺は実数全体で積分可能です。したがって積分記号下で微分でき、', '右辺の実数全体での積分は有限です。したがって積分記号下で微分でき、');
}

function inlineDeterminantInverseAppendix(indexText, appendixText) {
  const appendix = demoteHeadings(appendixText, 2).trim();
  const insertionPoint = /^### 9\.5 階数と列フルランク\s*$/m;
  const expectedDisplayDelimiters = countOccurrences(indexText, '$$') + countOccurrences(appendix, '$$');

  const output = insertionPoint.test(indexText)
    ? indexText.replace(
        insertionPoint,
        () => `${appendix}\n\n### 9.5 階数と列フルランク`,
      )
    : `${indexText.trimEnd()}\n\n---\n\n${appendix}\n`;

  const actualDisplayDelimiters = countOccurrences(output, '$$');
  if (actualDisplayDelimiters !== expectedDisplayDelimiters) {
    throw new Error(
      `Inlining ${determinantInverseAppendixName} changed display-math delimiters: expected ${expectedDisplayDelimiters}, got ${actualDisplayDelimiters}`,
    );
  }

  return output;
}

function inlineLinearAlgebraAppendix(indexText, appendixText) {
  const appendix = demoteHeadings(appendixText, 2).trim();
  const insertionPoint = /^### 9\.5 階数と列フルランク\s*$/m;
  const expectedDisplayDelimiters = countOccurrences(indexText, '$$') + countOccurrences(appendix, '$$');

  const output = insertionPoint.test(indexText)
    ? indexText.replace(
        insertionPoint,
        () => `${appendix}\n\n### 9.5 階数と列フルランク`,
      )
    : `${indexText.trimEnd()}\n\n---\n\n${appendix}\n`;

  const actualDisplayDelimiters = countOccurrences(output, '$$');
  if (actualDisplayDelimiters !== expectedDisplayDelimiters) {
    throw new Error(
      `Inlining ${inlineAppendixName} changed display-math delimiters: expected ${expectedDisplayDelimiters}, got ${actualDisplayDelimiters}`,
    );
  }

  return output;
}

function inlineCalculationDrills(indexText, appendixText) {
  const drillOnlyText = stripCalculationFormulaSection(appendixText);
  const appendix = demoteHeadings(drillOnlyText, 1).trim();
  const insertionPoint = /^## 14\. 本番ドリル\s*$/m;
  const expectedDisplayDelimiters = countOccurrences(indexText, '$$') + countOccurrences(appendix, '$$');

  const output = insertionPoint.test(indexText)
    ? indexText.replace(
        insertionPoint,
        () => `${appendix}\n\n---\n\n## 14. 本番ドリル`,
      )
    : `${indexText.trimEnd()}\n\n---\n\n${appendix}\n`;

  const actualDisplayDelimiters = countOccurrences(output, '$$');
  if (actualDisplayDelimiters !== expectedDisplayDelimiters) {
    throw new Error(
      `Inlining ${calculationDrillAppendixName} changed display-math delimiters: expected ${expectedDisplayDelimiters}, got ${actualDisplayDelimiters}`,
    );
  }

  return output;
}

function stripCalculationFormulaSection(text) {
  return text.replace(
    /^## 追加公式：手計算でよく使うもの[\s\S]*?(?=^## F0M-A10\b)/m,
    '',
  );
}

function countOccurrences(text, token) {
  return text.split(token).length - 1;
}

function demoteHeadings(text, levels) {
  return text.replace(/^(#{1,4})\s+(.+)$/gm, (_, marks, title) => `${'#'.repeat(Math.min(6, marks.length + levels))} ${title}`);
}

function interleaveExercises(exercises, solutions) {
  const solutionMap = parseSolutions(solutions);
  const used = new Set();
  const lines = exercises.replace(/^#\s+問題集\s*$/m, '## 演習').split('\n');
  const out = [];

  for (let i = 0; i < lines.length;) {
    const match = lines[i].match(/^###\s+([A-Za-z0-9]+(?:-[A-Za-z0-9]+)+)\b/);
    if (!match) {
      out.push(lines[i]);
      i += 1;
      continue;
    }

    const id = match[1];
    const block = [lines[i]];
    i += 1;
    while (i < lines.length && !/^##\s+/.test(lines[i]) && !/^###\s+/.test(lines[i])) {
      block.push(lines[i]);
      i += 1;
    }
    out.push(...block);

    const solution = solutionMap.get(id);
    if (solution) {
      used.add(id);
      out.push('', '<!-- solution-start -->', '', '#### 解答', '', normalizeSolutionHeadings(solution).trim(), '', '<!-- solution-end -->', '');
    }
  }

  const leftovers = [...solutionMap.entries()].filter(([id]) => !used.has(id));
  if (leftovers.length) {
    out.push('', '## 対応問題を自動判定できなかった解答', '');
    for (const [id, solution] of leftovers) {
      out.push(`### ${id}`, '', '<!-- solution-start -->', '', '#### 解答', '', normalizeSolutionHeadings(solution).trim(), '', '<!-- solution-end -->', '');
    }
  }

  return out.join('\n');
}

function parseSolutions(source) {
  const lines = source.split('\n');
  const result = new Map();
  for (let i = 0; i < lines.length;) {
    const match = lines[i].match(/^##\s+([A-Za-z0-9]+(?:-[A-Za-z0-9]+)+)\s+解答\b/);
    if (!match) {
      i += 1;
      continue;
    }
    const id = match[1];
    const block = [];
    i += 1;
    while (i < lines.length && !/^##\s+/.test(lines[i])) {
      block.push(lines[i]);
      i += 1;
    }
    result.set(id, block.join('\n'));
  }
  return result;
}

function normalizeSolutionHeadings(text) {
  return text
    .replace(/^####\s+/gm, '###### ')
    .replace(/^###\s+/gm, '##### ');
}

function stripTopHeading(text) {
  return text.replace(/^#\s+[^\n]+\n+/, '');
}

function demoteTopHeading(text) {
  return text.replace(/^#\s+([^\n]+)$/m, '## $1');
}

function orientMarkdownLinks(markdown, siteRelativeFile) {
  const sourceDir = path.posix.dirname(siteRelativeFile);
  return markdown.replace(/(!?\[[^\]]*\]\()([^)]+)(\))/g, (match, open, rawHref, close) => {
    const trimmed = rawHref.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('/') || /^(?:https?:|mailto:|tel:|data:)/i.test(trimmed)) return match;
    const destination = trimmed.match(/^(\S+)(\s+(?:"[^"]*"|'[^']*'))?$/);
    if (!destination) return match;
    const href = destination[1];
    const titleSuffix = destination[2] || '';
    const suffixAt = href.search(/[?#]/);
    const hrefPath = suffixAt >= 0 ? href.slice(0, suffixAt) : href;
    const hrefSuffix = suffixAt >= 0 ? href.slice(suffixAt) : '';
    const rootOriented = /^(?:textbook|anki|references|statistical-mathematics|applied-rikou-80)\//.test(hrefPath);
    const resolved = rootOriented ? path.posix.normalize(hrefPath) : path.posix.normalize(path.posix.join(sourceDir, hrefPath.replace(/^\.\//, '')));
    if (resolved === '..' || resolved.startsWith('../')) throw new Error(`${siteRelativeFile}: link escapes site: ${trimmed}`);
    return `${open}${resolved}${hrefSuffix}${titleSuffix}${close}`;
  });
}
