import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('textbook/volumes');
const BASELINE = path.resolve('scripts/implicit-formal-baseline.txt');
const WRITE = process.argv.includes('--write-baseline');
const START = '<!-- formal-statement-start -->';
const END = '<!-- formal-statement-end -->';
const boldDefinitionRe = /\*\*([^*]{1,60})\*\*\s*と(?:いいます|呼びます|定義します)/u;

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name === 'index.md' && !full.includes(`${path.sep}review${path.sep}`)) out.push(full);
  }
  return out;
}

function normalizeHeading(heading) {
  return heading.replace(/^#{2,6}\s+/, '').replace(/\s+/g, ' ').trim();
}

function scan() {
  const found = [];
  for (const file of walk(ROOT)) {
    const rel = path.relative(process.cwd(), file).replaceAll(path.sep, '/');
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    let panelDepth = 0;
    let fence = null;
    let heading = '';

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const t = line.trim();

      if (fence) {
        if (new RegExp(`^ {0,3}${fence.char}{${fence.length},}\\s*$`).test(line)) fence = null;
        continue;
      }
      const openFence = line.match(/^ {0,3}(`{3,}|~{3,})/);
      if (openFence) {
        fence = { char: openFence[1][0], length: openFence[1].length };
        continue;
      }
      if (/^#{2,6}\s+/.test(line)) heading = normalizeHeading(line);
      if (t === START) { panelDepth += 1; continue; }
      if (t === END) { panelDepth = Math.max(0, panelDepth - 1); continue; }
      if (panelDepth > 0) continue;

      const m = boldDefinitionRe.exec(line);
      if (m) {
        const term = m[1].trim();
        if (!/^(?:ZFC|Schwartz超関数|distribution)$/iu.test(term)) {
          found.push({
            key: `${rel}\t${heading}\t${term}`,
            rel,
            line: i + 1,
            heading,
            term,
            text: t,
          });
        }
      }

      const unlabeledFormal = /^>\s+/.test(line)
        && !/^>\s+\*\*(?:定義|定理|命題|補題|系|公理|原理)/u.test(line)
        && /(?:公理|定理|補題|命題|原理)(?:\s|$|[（(])/u.test(heading)
        && /(?:存在する|同値である|成り立つ|拡張できる|持つ。|である。)/u.test(line);
      if (unlabeledFormal) {
        found.push({
          key: `${rel}\t${heading}\t__UNLABELED_FORMAL__`,
          rel,
          line: i + 1,
          heading,
          term: '__UNLABELED_FORMAL__',
          text: t,
        });
      }
    }
  }
  return found;
}

const found = scan();
const keys = [...new Set(found.map((item) => item.key))].sort();

if (WRITE) {
  fs.writeFileSync(BASELINE, `${keys.join('\n')}\n`);
  console.log(`Implicit-formal baseline written: ${keys.length} legacy candidate(s).`);
  process.exit(0);
}

if (!fs.existsSync(BASELINE)) {
  console.error('Implicit formal validation failed: scripts/implicit-formal-baseline.txt is missing.');
  process.exit(1);
}

const baseline = new Set(fs.readFileSync(BASELINE, 'utf8').split(/\r?\n/).filter(Boolean));
const newItems = found.filter((item) => !baseline.has(item.key));

if (newItems.length) {
  console.error(`Implicit formal validation failed with ${newItems.length} new candidate(s). Formalize them with a blue statement panel instead of adding them to the baseline:`);
  for (const item of newItems) {
    console.error(`- ${item.rel}:${item.line}: [${item.heading}] ${item.term}: ${item.text}`);
  }
  process.exit(1);
}

const currentKeys = new Set(keys);
const retired = [...baseline].filter((key) => !currentKeys.has(key));
console.log(`Implicit formal validation passed: ${keys.length} legacy candidate(s) remain; ${retired.length} baseline candidate(s) have been retired. New implicit definitions/formal quotes are forbidden.`);
