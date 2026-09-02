import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('textbook');

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.isFile() && e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const formal = /(定理|命題|補題|系(?:[（(：:]|$)|不等式|法則|公式|criterion|theorem|lemma|proposition|corollary)/iu;
const proofContext = /(証明|示した|示しました|示せる|導いた|導きました|証明した|証明しました|前章|前節|先ほど|先に)/u;
const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;

const rows = [];
for (const file of walk(ROOT)) {
  const rel = path.relative(process.cwd(), file).replaceAll(path.sep, '/');
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const m of line.matchAll(linkRe)) {
      const label = m[1].trim();
      const href = m[2].trim();
      if (/^(?:https?:|mailto:|tel:|#)/i.test(href)) continue;
      const context = `${lines[i - 1] ?? ''} ${line} ${lines[i + 1] ?? ''}`;
      if (!formal.test(label) && !(formal.test(context) && proofContext.test(context))) continue;
      rows.push({ rel, line: i + 1, label, href, context: context.replace(/\s+/g, ' ').slice(0, 260) });
    }
  }
}

console.log(`formal/proof-like cross references: ${rows.length}`);
for (const r of rows) {
  console.log(`\n${r.rel}:${r.line}`);
  console.log(`  [${r.label}](${r.href})`);
  console.log(`  ${r.context}`);
}
