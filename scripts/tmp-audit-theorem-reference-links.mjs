import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('textbook/volumes');

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.isFile() && e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const formal = /(定理|命題|補題|不等式|法則|公式|criterion|theorem|lemma|proposition|corollary)/iu;
const dependencyCue = /(証明|導出|出所|由来|遡|使って|用いて|から従|から|より|により|参照|詳しく扱|示した|示しました|証明した|導いた)/u;
const priorCue = /(前章|前節|前講義|先ほど|先に|F0-[0-9A-Z-]+|P\d+[A-Z]?|D\d+[A-Z]?|C\d+[A-Z]?|E\d+[A-Z]?|F\d+[A-Z]?|G\d+[A-Z]?)/u;
const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;

const noFragment = [];
const bare = [];
for (const file of walk(ROOT)) {
  const rel = path.relative(process.cwd(), file).replaceAll(path.sep, '/');
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*(?:\*\*)?次[：:]/u.test(line)) continue;

    for (const m of line.matchAll(linkRe)) {
      const label = m[1].trim();
      const href = m[2].trim();
      if (/^(?:https?:|mailto:|tel:|#)/i.test(href)) continue;
      if (href.includes('#')) continue;
      const context = `${lines[i - 1] ?? ''} ${line} ${lines[i + 1] ?? ''}`.replace(/\s+/g, ' ');
      if (!formal.test(`${label} ${context}`) || !dependencyCue.test(context)) continue;
      noFragment.push({ rel, line: i + 1, label, href, context: context.slice(0, 300) });
    }

    const stripped = line.replace(linkRe, '');
    if (!priorCue.test(stripped) || !formal.test(stripped) || !dependencyCue.test(stripped)) continue;
    bare.push({ rel, line: i + 1, text: stripped.trim().replace(/\s+/g, ' ').slice(0, 320) });
  }
}

console.log(`cross-page formal links missing fragment: ${noFragment.length}`);
for (const r of noFragment) {
  console.log(`\n${r.rel}:${r.line}`);
  console.log(`  [${r.label}](${r.href})`);
  console.log(`  ${r.context}`);
}

console.log(`\nbare prior-formal references that likely need links: ${bare.length}`);
for (const r of bare) {
  console.log(`\n${r.rel}:${r.line}`);
  console.log(`  ${r.text}`);
}
