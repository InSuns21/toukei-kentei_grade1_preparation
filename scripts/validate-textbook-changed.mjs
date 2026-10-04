import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import katex from 'katex';
import YAML from 'yaml';

const root = process.cwd();
const errors = [];

function argValue(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : null;
}

const base = argValue('--base') || (process.env.TEXTBOOK_BASE_SHA || '').trim();
if (!base) {
  console.error('Changed-textbook validation requires --base <sha> or TEXTBOOK_BASE_SHA.');
  process.exit(2);
}

const diff = spawnSync('git', ['diff', '--name-only', '--diff-filter=ACMR', base + '...HEAD'], {
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
});
if (diff.status !== 0) {
  console.error(diff.stderr || 'git diff failed');
  process.exit(diff.status || 2);
}

const changed = diff.stdout.split(/\r?\n/u).map((x) => x.trim()).filter(Boolean);
const targetRe = /^(?:textbook|references|agents)\/|^(?:AGENTS|CONTENT_GUIDELINES|EXERCISE_GUIDELINES)\.md$/u;
const targets = changed
  .filter((rel) => targetRe.test(rel) && /\.(?:md|ya?ml)$/u.test(rel))
  .filter((rel) => fs.existsSync(path.join(root, rel)));

const forbidden = [
  [/\\\(/gu, String.raw`\(`],
  [/\\\)/gu, String.raw`\)`],
  [/(?<!\\)\\\[/gu, String.raw`\[`],
  [/(?<!\\)\\\]/gu, String.raw`\]`],
  [/\\begin\{(?:equation|align\*?)\}/gu, 'equation/align environment'],
  [/\\(?:label|ref|eqref|tag|newcommand|renewcommand|def)\b/gu, 'unsupported command'],
];

for (const rel of targets) {
  const file = path.join(root, rel);
  const source = fs.readFileSync(file, 'utf8');

  if (source.includes('\uFFFD')) errors.push(rel + ': replacement character U+FFFD found');
  const control = [...source].findIndex((ch) => ch.charCodeAt(0) < 32 && !['\n', '\r', '\t'].includes(ch));
  if (control >= 0) errors.push(rel + ': unsupported control character found');

  if (/\.ya?ml$/u.test(rel)) {
    try {
      YAML.parse(source);
    } catch (error) {
      errors.push(rel + ': YAML parse failed: ' + error.message);
    }
    continue;
  }

  const searchable = stripCode(source);

  for (const [lineIndex, line] of searchable.split(/\r?\n/u).entries()) {
    if (line.trim() === '$') {
      errors.push(rel + ':' + (lineIndex + 1) + ': standalone $ line; a $$ display delimiter may have been damaged');
    }
    if (/^\s*>\s*\$\$\s*$/u.test(line)) {
      errors.push(rel + ':' + (lineIndex + 1) + ': do not put $$ display math inside a Markdown blockquote');
    }
    if (/\\text\s*\{\s*vs\s*\}/iu.test(line)) {
      errors.push(rel + ':' + (lineIndex + 1) + ': write prose comparisons as Markdown instead of \\text{vs} in math');
    }
  }

  for (const [pattern, label] of forbidden) {
    pattern.lastIndex = 0;
    const match = pattern.exec(searchable);
    if (match) errors.push(rel + ':' + lineAt(searchable, match.index) + ': forbidden math syntax ' + label);
  }

  for (const item of extractMath(searchable, rel)) {
    try {
      katex.renderToString(item.value, {
        displayMode: item.display,
        throwOnError: true,
        strict: 'error',
        trust: false,
      });
    } catch (error) {
      errors.push(rel + ':' + lineAt(searchable, item.index) + ': KaTeX: ' + error.message);
    }
  }

  checkPair(searchable, rel, '<!-- proof-start -->', '<!-- proof-end -->', 'proof');
  checkPair(searchable, rel, '<!-- solution-start -->', '<!-- solution-end -->', 'solution');
  checkPair(searchable, rel, '<!-- formal-statement-start -->', '<!-- formal-statement-end -->', 'formal statement');
  checkDefinitionExamplePairs(searchable, rel);

  if (/\b(?:TODO|TBD)(?!\(reference\))/iu.test(source) && isReviewedChapter(rel)) {
    errors.push(rel + ': reviewed textbook artifact contains TODO/TBD');
  }
}

if (errors.length) {
  console.error('Changed-textbook validation failed with ' + errors.length + ' issue(s):');
  for (const error of errors) console.error('- ' + error);
  process.exit(1);
}

console.log('Changed-textbook fast validation passed: ' + targets.length + ' changed Markdown/YAML file(s) checked out of ' + changed.length + ' changed file(s).');

function stripCode(source) {
  return source
    .replace(/(?:^|\n) {0,3}(F{3,}|~{3,})[^\n]*\n[\s\S]*?\n {0,3}\1[^\n]*(?=\n|$)/gu,
      (block) => '\n'.repeat((block.match(/\n/gu) || []).length))
    .replace(/`[^`\n]*`/gu, '');
}

function extractMath(source, rel) {
  const result = [];
  let index = 0;
  while (index < source.length) {
    if (source[index] !== '$' || isEscaped(source, index)) {
      index += 1;
      continue;
    }
    const display = source[index + 1] === '$';
    const delimiter = display ? '$$' : '$';
    const start = index;
    index += delimiter.length;
    const end = findClosing(source, delimiter, index);
    if (end === -1) {
      errors.push(rel + ':' + lineAt(source, start) + ': unclosed math delimiter ' + delimiter);
      break;
    }
    const value = source.slice(index, end);
    if (!display && value.includes('\n')) {
      errors.push(rel + ':' + lineAt(source, start) + ': inline math contains a newline');
    }
    result.push({ value, display, index: start });
    index = end + delimiter.length;
  }
  return result;
}

function findClosing(source, delimiter, from) {
  for (let i = from; i < source.length; i += 1) {
    if (source.startsWith(delimiter, i) && !isEscaped(source, i)) return i;
  }
  return -1;
}

function isEscaped(source, index) {
  let count = 0;
  for (let i = index - 1; i >= 0 && source[i] === '\\'; i -= 1) count += 1;
  return count % 2 === 1;
}

function lineAt(source, index) {
  return source.slice(0, index).split('\n').length;
}

function checkPair(source, rel, start, end, label) {
  let depth = 0;
  for (const [i, line] of source.split(/\r?\n/u).entries()) {
    const t = line.trim();
    if (t === start) depth += 1;
    if (t === end) {
      if (depth === 0) errors.push(rel + ':' + (i + 1) + ': ' + label + ' end marker without start marker');
      else depth -= 1;
    }
  }
  if (depth !== 0) errors.push(rel + ': unclosed ' + label + ' marker block (' + depth + ' open)');
}

function checkDefinitionExamplePairs(source, rel) {
  let depth = 0;
  for (const [i, line] of source.split(/\r?\n/u).entries()) {
    const t = line.trim();
    if (/^<!--\s*definition-example-start:/u.test(t)) depth += 1;
    if (t === '<!-- definition-example-end -->') {
      if (depth === 0) errors.push(rel + ':' + (i + 1) + ': definition-example-end without start marker');
      else depth -= 1;
    }
  }
  if (depth !== 0) errors.push(rel + ': unclosed definition-example block (' + depth + ' open)');
}

function isReviewedChapter(rel) {
  const m = /^textbook\/volumes\/([^/]+)\/([^/]+)\//u.exec(rel);
  if (!m) return false;
  const manifest = path.join(root, 'textbook', 'volumes', m[1], m[2], 'chapter.yaml');
  if (!fs.existsSync(manifest)) return false;
  return /^status:\s*reviewed\s*$/mu.test(fs.readFileSync(manifest, 'utf8'));
}
