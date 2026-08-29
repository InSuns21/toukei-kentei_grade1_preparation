import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const sourceRoot = path.join(root, 'textbook', 'volumes');
const targetRoot = path.join(root, '_site', 'textbook', 'volumes');
const inlineAppendixName = 'linear_algebra_singular_null_span.md';

if (!fs.existsSync(sourceRoot) || !fs.existsSync(targetRoot)) {
  console.error('先に scripts/build-pages.mjs を実行してください。');
  process.exit(1);
}

let converted = 0;
let canonical = 0;
let removedAuxiliaryMarkdown = 0;
let inlinedAppendices = 0;

for (const volume of fs.readdirSync(sourceRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
  const sourceVolume = path.join(sourceRoot, volume.name);
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
      const appendixPath = path.join(sourceChapter, inlineAppendixName);
      if (fs.existsSync(appendixPath)) {
        text = inlineLinearAlgebraAppendix(text, fs.readFileSync(appendixPath, 'utf8'));
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

function inlineLinearAlgebraAppendix(indexText, appendixText) {
  const appendix = demoteHeadings(appendixText, 2).trim();
  const insertionPoint = /^### 9\.5 階数と列フルランク\s*$/m;
  const expectedDisplayDelimiters = countOccurrences(indexText, '$$') + countOccurrences(appendix, '$$');

  // String.prototype.replace interprets `$$` in a replacement string as one literal `$`.
  // Use a replacer callback so TeX display delimiters from the appendix are copied verbatim.
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
