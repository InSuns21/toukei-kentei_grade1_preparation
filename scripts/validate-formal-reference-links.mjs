import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('textbook/volumes');
const REPO = process.cwd();
const STABLE_PREFIX = '(?:def|thm|prop|lem|cor|axiom|principle|ref)';

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
const anchorRe = new RegExp(`<a\\s+id=["']((${STABLE_PREFIX})-[a-z0-9][a-z0-9-]*)["']\\s*><\\/a>`, 'giu');
const stableFragmentRe = new RegExp(`^${STABLE_PREFIX}-[a-z0-9][a-z0-9-]*$`);
const stableFragmentInHrefRe = new RegExp(`#${STABLE_PREFIX}-[a-z0-9][a-z0-9-]*`);
const formalWord = /(定義|定理|命題|補題|系|公理|原理|不等式|法則|公式|Farkas|KKT|Riesz|Hahn--Banach|Lax--Milgram|Borel--Cantelli|中心極限定理|theorem|lemma|proposition|corollary)/iu;
const dependencyCue = /(証明|導出|出所|由来|遡|参照|詳しく|使(?:う|って|い)|用い|から従|から|より|により|示した|示しました|証明した|導いた)/u;
const formalSource = '(?:定義|定理|命題|補題|系|公理|原理|不等式|法則|公式|Farkas(?:の補題)?|KKT(?:条件)?|Borel--Cantelli(?:第[12]補題)?|中心極限定理|Riesz(?:表現定理)?|Hahn--Banach(?:定理)?|Lax--Milgram(?:定理)?)';
const chapterSource = '(?:F0-[0-9A-Z]+(?:-[0-9A-Z]+)?|P\\d+[A-Z]?|D\\d+[A-Z]?|C\\d+[A-Z]?|E\\d+[A-Z]?|F\\d+[A-Z]?|G\\d+[A-Z]?)';
const priorDependencyRe = new RegExp(`(?:前章|前節|前講義)の.{0,28}${formalSource}.{0,20}(?:から|より|により|を使|を用)`, 'u');
const chapterDependencyRe = new RegExp(`${chapterSource}(?:の|で).{0,18}${formalSource}.{0,20}(?:から|より|により|を使|を用|を証明|で証明|を導出|で導出)`, 'u');
const proofLocationRe = new RegExp(`(?:証明|導出|出所|由来)(?:そのもの)?(?:は|を|が|まで)?\\s*.{0,35}${chapterSource}(?:へ|に|で)`, 'u');

const canonicalResults = [
  {
    name: 'Tonelliの定理',
    pattern: /(?:Tonelli|トネリ)の定理/u,
    target: 'textbook/volumes/00_foundations/F0_00D2C_積測度_Tonelli_Fubini/index.md',
    fragment: 'thm-tonelli',
  },
  {
    name: 'Borel--Cantelli第1補題',
    pattern: /Borel[-–—]{1,2}Cantelli第1補題/u,
    target: 'textbook/volumes/00_foundations/F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md',
    fragment: 'thm-borel-cantelli-1',
  },
  {
    name: 'Zornの補題',
    pattern: /Zornの補題/u,
    target: 'textbook/volumes/00_foundations/F0_00A3_半順序_Zorn_極大延長/index.md',
    fragment: 'thm-zorn',
  },
  {
    name: '基底延長定理',
    pattern: /基底延長定理/u,
    target: 'textbook/volumes/00_foundations/F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md',
    fragment: 'thm-basis-extension',
  },
  {
    name: 'Kolmogorov最大不等式',
    pattern: /(?:Kolmogorov|コルモゴロフ)最大不等式/u,
    target: 'textbook/volumes/00_foundations/F0_00P5_大数の強法則/index.md',
    fragment: 'thm-kolmogorov-maximal',
  },
];

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
  if (/^.{0,30}の「[^」]*(?:定義|定理|補題|証明|導出|Farkas|KKT)[^」]*」を参照/u.test(after)) return true;
  return false;
}

function stripLinksAndCode(line) {
  return line
    .replace(linkRe, '')
    .replace(/`[^`]*`/g, '')
    .replace(/<[^>]+>/g, '');
}

function stableLinksOnLine(line) {
  return [...line.matchAll(linkRe)].filter((m) => stableFragmentInHrefRe.test(m[2]));
}

function canonicalResultIsInvoked(unlinked, result) {
  const match = result.pattern.exec(unlinked);
  if (!match) return false;
  const after = unlinked.slice(match.index + match[0].length, match.index + match[0].length + 24);
  return /^[^。！？\n]{0,10}(?:から|より|により|を使(?:う|って|い)|を用(?:いる|いて)?)/u.test(after);
}

const files = walk(ROOT);
const contents = new Map(files.map((file) => [file, fs.readFileSync(file, 'utf8')]));
const anchors = new Map([...contents].map(([file, text]) => [file, explicitAnchors(text)]));
const errors = [];
let checkedPreciseLinks = 0;
let checkedAnchors = 0;
let checkedCanonicalUses = 0;

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
      const nearby = lines.slice(i, i + 10).join(' ');
      if (!id.startsWith('ref-') && !formalWord.test(nearby)) {
        errors.push(`${rel}:${i + 1}: formal anchor #${id} is not adjacent to a definition/theorem/lemma/formal result`);
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
        errors.push(`${rel}:${i + 1}: formal dependency link must jump to the exact definition/theorem/derivation, not only the chapter: [${label}](${href})`);
        continue;
      }
      if (!stableFragmentRe.test(fragment)) {
        errors.push(`${rel}:${i + 1}: formal dependency fragment must use a stable def-/thm-/prop-/lem-/cor-/axiom-/principle-/ref- anchor: #${fragment}`);
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

    const unlinked = stripLinksAndCode(line);

    for (const result of canonicalResults) {
      if (rel === result.target) continue;
      if (!canonicalResultIsInvoked(unlinked, result)) continue;
      checkedCanonicalUses += 1;
      errors.push(
        `${rel}:${i + 1}: ${result.name} is invoked in prose but is not linked; use ${result.target}#${result.fragment}`,
      );
    }

    if (stableLinksOnLine(line).length > 0) continue;
    if (!formalWord.test(unlinked) || !dependencyCue.test(unlinked)) continue;

    if (priorDependencyRe.test(unlinked)) {
      errors.push(`${rel}:${i + 1}: prior formal result is referenced in prose but is not linked to a stable anchor: ${unlinked.trim()}`);
      continue;
    }
    if (chapterDependencyRe.test(unlinked)) {
      errors.push(`${rel}:${i + 1}: chapter-qualified formal result is referenced without a link: ${unlinked.trim()}`);
      continue;
    }
    if (proofLocationRe.test(unlinked)) {
      errors.push(`${rel}:${i + 1}: proof/derivation location names another chapter but is not linked: ${unlinked.trim()}`);
    }
  }
}

if (errors.length) {
  console.error(`Formal reference validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Formal reference validation passed: ${checkedPreciseLinks} precise dependency link(s), ${checkedAnchors} stable formal anchor(s), ${checkedCanonicalUses} bare canonical use(s), ${files.length} user-facing textbook page(s).`);
