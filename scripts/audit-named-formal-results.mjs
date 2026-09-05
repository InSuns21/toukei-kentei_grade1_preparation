import fs from 'node:fs';
import path from 'node:path';

const ROOTS = [
  path.resolve('textbook/volumes'),
  path.resolve('statistical-mathematics'),
  path.resolve('applied-rikou-80'),
];
const START = '<!-- formal-statement-start -->';
const END = '<!-- formal-statement-end -->';
// Explicit ref-* anchors are also stable authored anchors. Keep accepting them
// for legacy canonical links while new theorem-like results use typed prefixes.
const STABLE_ANCHOR_RE = /<a\s+id="(?:thm|prop|lem|cor|principle|ref)-[^"]+"><\/a>/u;

// A named-result heading is treated as a declaration candidate only when the
// heading names the mathematical result itself. Usage/review headings such as
// "中心極限定理を使う" are intentionally outside this validator.
const RESULT_NAME_RE = /(?:定理|補題|命題|不等式|等式|原理)(?:\s*$|\s*[（(：:])/u;
// "系" is ambiguous in Japanese (corollary / system). Only a formal term at
// the beginning of the heading, after an optional section number, is a corollary.
const COROLLARY_RE = /^(?:\d+(?:\.\d+)*[.)．]?\s*)?系(?:\s*$|\s*[（(：:])/u;
const GENERIC_RE = /(基本命題|主要定理|三定理|定理群|定理一覧|結果一覧)/u;
const EXERCISE_RE = /(?:^|\s)[A-Z][A-Z0-9-]*-[ABCD]\d{2}\b/u;
// Example/example-problem headings may legitimately contain words such as
// "等式" or "不等式" in the example title. They are pedagogy, not declarations.
const EXAMPLE_HEADING_RE = /^(?:\d+(?:\.\d+)*[.)．]?\s*)?(?:例|例題)(?:\s*$|\s*[（(：:])/u;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['review', 'archive', 'reports'].includes(entry.name)) continue;
      out.push(...walk(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      out.push(full);
    }
  }
  return out;
}

function headingText(line) {
  return line.replace(/^#{1,6}\s+/, '').replace(/<a\s+id="[^"]+"><\/a>/gu, '').trim();
}

function isNamedResultHeading(heading) {
  if (GENERIC_RE.test(heading) || EXERCISE_RE.test(heading) || EXAMPLE_HEADING_RE.test(heading)) return false;
  return RESULT_NAME_RE.test(heading) || COROLLARY_RE.test(heading);
}

function classifySection(lines, start) {
  const match = lines[start].match(/^(#{1,6})\s+/u);
  if (!match) return null;
  const level = match[1].length;
  const heading = headingText(lines[start]);
  let hasPanel = false;
  let hasAnchor = false;

  // Stable anchors are used in both supported layouts:
  //   <a id="thm-..."></a>   then heading
  //   heading               then <a id="thm-..."></a>
  // Look immediately backward across blank lines so legacy canonical anchors
  // placed just before the heading are not falsely reported as missing.
  for (let i = start - 1; i >= 0; i -= 1) {
    const t = lines[i].trim();
    if (!t) continue;
    if (STABLE_ANCHOR_RE.test(lines[i])) hasAnchor = true;
    break;
  }

  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    const hm = line.match(/^(#{1,6})\s+/u);
    if (hm && hm[1].length <= level) break;
    const t = line.trim();
    if (t === START) hasPanel = true;
    if (STABLE_ANCHOR_RE.test(line)) hasAnchor = true;
  }
  return { heading, hasPanel, hasAnchor };
}

const all = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const rel = path.relative(process.cwd(), file).replaceAll(path.sep, '/');
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    let fence = null;
    let panelDepth = 0;
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const t = line.trim();
      if (fence) {
        if (new RegExp(`^ {0,3}${fence.char}{${fence.length},}\\s*$`).test(line)) fence = null;
        continue;
      }
      const openFence = line.match(/^ {0,3}(`{3,}|~{3,})/u);
      if (openFence) {
        fence = { char: openFence[1][0], length: openFence[1].length };
        continue;
      }
      if (t === START) { panelDepth += 1; continue; }
      if (t === END) { panelDepth = Math.max(0, panelDepth - 1); continue; }
      if (panelDepth > 0) continue;
      if (!/^#{1,6}\s+/u.test(line)) continue;
      // The first H1 is the document title, not a theorem declaration section.
      if (i === 0 && /^#\s+/u.test(line)) continue;
      const section = classifySection(lines, i);
      if (!section || !isNamedResultHeading(section.heading)) continue;
      all.push({ rel, line: i + 1, ...section });
    }
  }
}

const candidates = all.filter((x) => !x.hasPanel || !x.hasAnchor);
console.log(`Named-result heading audit: ${all.length} result-name heading(s), ${candidates.length} incomplete formal candidate(s).`);
for (const item of candidates) {
  const missing = [!item.hasPanel ? 'panel' : null, !item.hasAnchor ? 'anchor' : null].filter(Boolean).join('+');
  console.log(`CANDIDATE\t${item.rel}:${item.line}\t${item.heading}\tmissing=${missing}`);
}
if (candidates.length) process.exit(1);
