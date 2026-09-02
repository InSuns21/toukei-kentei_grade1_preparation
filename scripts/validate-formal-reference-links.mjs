import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('textbook/volumes');
const REPO = process.cwd();

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name === 'index.md' && !full.includes(`${path.sep}review${path.sep}`)) out.push(full);
  }
  return out;
}

const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
const anchorRe = /<a\s+id=["']((?:thm|ref)-[a-z0-9][a-z0-9-]*)["']\s*><\/a>/giu;
const formalWord = /(定理|命題|補題|不等式|法則|公式|Farkas|KKT|Riesz|Hahn--Banach|Lax--Milgram|Borel--Cantelli|中心極限定理|theorem|lemma|proposition|corollary)/iu;
const dependencyCue = /(証明|導出|出所|由来|遡|参照|詳しく|使(?:う|って|い)|用い|から従|から|より|により|示した|示しました|証明した|導いた)/u;
const formalSource = '(?:定理|命題|補題|不等式|法則|公式|Farkas(?:の補題)?|KKT(?:条件)?|Borel--Cantelli(?:第[12]補題)?|中心極限定理|Riesz(?:表現定理)?|Hahn--Banach(?:定理)?|Lax--Milgram(?:定理)?)';
const chapterSource = '(?:F0-[0-9A-Z]+(?:-[0-9A-Z]+)?|P\\d+[A-Z]?|D\\d+[A-Z]?|C\\d+[A-Z]?|E\\d+[A-Z]?|F\\d+[A-Z]?|G\\d+[A-Z]?)';
const priorDependencyRe = new RegExp(`(?:前章|前節|前講義)の.{0,45}${formalSource}.{0,24}(?:から|より|により|を使|を用)`, 'u');
const chapterDependencyRe = new RegExp(`${chapterSource}(?:の|で).{0,45}${formalSource}.{0,24}(?:から|より|により|を使|を用|を証明|で証明|を導出|で導出)`, 'u');
const proofLocationRe = new RegExp(`(?:証明|導出|出所|由来).{0,55}${chapterSource}(?:(?:の|で).{0,35}${formalSource})?`, 'u');

function splitHref(href) {
  const [beforeHash, rawFragment = ''] = href.split('#', 2);
  return {
    pathPart: beforeHash.split('?', 1)[0],
    fragment: rawFragment.split('?', 1)[0],
  };
}

function resolveTarget(sourceFile, href) {
  const { pathPart, fragment } = splitHref(href);
  let target;
  if (!pathPart) target = sourceFile;
  else if (pathPart.startsWith('textbook/')) target = path.resolve(REPO, pathPart);
  else target = path.resolve(path.dirname(sourceFile), pathPart);
  return { target, fragment };
}

function explicitAnchors(markdown) {
  return new Set([...markdown.matchAll(anchorRe)].map((m) => m[1]));
}

function preciseDependency(line, label, index, fullMatch) {
  const start = Math.max(0, index - 70);
  const end = Math.min(line.length, index + fullMatch.length + 70);
  const local = line.slice(start, end);
  if (formalWord.test(label) && dependencyCue.test(local)) return true;

  const before = line.slice(Math.max(0, index - 55), index);
  const after = line.slice(index + fullMatch.length, Math.min(line.length, index + fullMatch.length + 70));
  if (/(?:この部分|その部分|ここ|以下|上記).{0,12}(?:の)?(?:証明|導出)(?:は|を)?\s*$/u.test(before)) return true;
  if (/^.{0,30}の「[^」]*(?:定理|補題|証明|導出|Farkas|KKT)[^」]*」を参照/u.test(after)) return true;
  return false;
}

function stripLinksAndCode(line) {
  return line
    .replace(linkRe, '')
    .replace(/`[^`]*`/g, '')
    .replace(/<[^>]+>/g, '');
}

const files = walk(ROOT);
const contents = new Map(files.map((file) => [file, fs.readFileSync(file, 'utf8')]));
const anchors = new Map([...contents].map(([file, text]) => [file, explicitAnchors(text)]));
const errors = [];
let checkedPreciseLinks = 0;
let checkedAnchors = 0;

for (const [file, markdown] of contents) {
  const rel = path.relative(REPO, file).replaceAll(path.sep, '/');
  const lines = markdown.split(/\r?\n/);
  let inFence = false;

  const seen = new Set();
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    for (const m of line.matchAll(anchorRe)) {
      const id = m[1];
      checkedAnchors += 1;
      if (seen.has(id)) errors.push(`${rel}:${i + 1}: duplicate formal reference anchor #${id}`);
      seen.add(id);
      const nearby = lines.slice(i, i + 9).join(' ');
      if (id.startsWith('thm-') && !formalWord.test(nearby)) {
        errors.push(`${rel}:${i + 1}: theorem anchor #${id} is not adjacent to a theorem/lemma/formal result`);
      }
      if (id.startsWith('ref-') && !/^\s*#{2,6}\s+/m.test(lines.slice(i, i + 9).join('\n'))) {
        errors.push(`${rel}:${i + 1}: reference anchor #${id} is not adjacent to a Markdown section heading`);
      }
    }
  }

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^\s*```/.test(line)) { inFence = !inFence; continue; }
    if (inFence || /^\s*#/.test(line) || /^\s*<!--/.test(line)) continue;

    for (const m of line.matchAll(linkRe)) {
      const label = m[1].trim();
      const href = m[2].trim();
      if (/^(?:https?:|mailto:|tel:|javascript:)/i.test(href)) continue;
      if (!preciseDependency(line, label, m.index ?? 0, m[0])) continue;

      checkedPreciseLinks += 1;
      const { target, fragment } = resolveTarget(file, href);
      if (!fragment) {
        errors.push(`${rel}:${i + 1}: formal dependency link must jump to the exact theorem/derivation, not only the chapter: [${label}](${href})`);
        continue;
      }
      if (!/^(?:thm|ref)-[a-z0-9][a-z0-9-]*$/.test(fragment)) {
        errors.push(`${rel}:${i + 1}: formal dependency fragment must use a stable thm-/ref- anchor: #${fragment}`);
        continue;
      }
      if (!contents.has(target)) {
        errors.push(`${rel}:${i + 1}: formal dependency target is not a user-facing textbook index.md: ${href}`);
        continue;
      }
      if (!anchors.get(target).has(fragment)) {
        const targetRel = path.relative(REPO, target).replaceAll(path.sep, '/');
        errors.push(`${rel}:${i + 1}: fragment #${fragment} does not exist as an explicit anchor in ${targetRel}`);
      }
    }

    const stripped = stripLinksAndCode(line);
    if (!formalWord.test(stripped) || !dependencyCue.test(stripped)) continue;

    if (priorDependencyRe.test(stripped)) {
      errors.push(`${rel}:${i + 1}: prior formal result is referenced in prose but is not linked to a stable anchor: ${stripped.trim()}`);
      continue;
    }
    if (chapterDependencyRe.test(stripped)) {
      errors.push(`${rel}:${i + 1}: chapter-qualified formal result is referenced without a link: ${stripped.trim()}`);
      continue;
    }
    if (proofLocationRe.test(stripped)) {
      errors.push(`${rel}:${i + 1}: proof/derivation location names another chapter but is not linked: ${stripped.trim()}`);
    }
  }
}

if (errors.length) {
  console.error(`Formal reference validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Formal reference validation passed: ${checkedPreciseLinks} precise dependency link(s), ${checkedAnchors} stable anchor(s), ${files.length} user-facing textbook page(s).`);
