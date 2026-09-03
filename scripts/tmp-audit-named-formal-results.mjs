import fs from 'node:fs';
import path from 'node:path';

const roots = [
  'textbook/volumes',
  'applied-rikou-80',
  'statistical-mathematics',
];
const START = '<!-- formal-statement-start -->';
const END = '<!-- formal-statement-end -->';
const resultWord = '(?:定理|命題|補題|系|不等式|等式|恒等式)';
const headingRe = new RegExp(`^#{2,6}\\s+(.{1,140}${resultWord}.*?)\\s*$`, 'u');
const boldDeclRe = new RegExp(`\\*\\*([^*]{1,120}${resultWord}[^*]{0,40})\\*\\*[^\\n]{0,80}(?:です|である|と呼びます|といいます|が成り立ちます|が成り立つ|を得ます|となります)`, 'u');
const proseDeclRe = new RegExp(`(?:これが|これは|次を|以下を|ここで)[^。\\n]{0,80}(${resultWord}|[^。\\n]{1,80}${resultWord})[^。\\n]{0,80}(?:です|である|と呼びます|といいます|が成り立ちます|が成り立つ)`, 'u');
const theoremLikeNameRe = /(?:Cauchy|Schwarz|Bessel|Parseval|Hölder|Holder|Minkowski|Fatou|Tonelli|Fubini|Riesz|Fischer|Heine|Borel|Bolzano|Weierstrass|Banach|Steinitz|Pythagoras|Jensen|Markov|Chebyshev|Slutsky|Cram[eé]r|Wold|Cochran|Gauss|Newton|Neyman|Pearson|Rao|Blackwell|Lehmann|Scheff[eé]|Fisher|Wilks|Wald|Borel|Cantelli|Stone|Weierstrass|Arzel[aà]|Ascoli|Radon|Nikodym|Monotone|Dominated|Central Limit|Law of Large Numbers|大数|中心極限定理|単調収束|優収束|収束定理|交換定理|表現定理|分解定理|スペクトル定理)/iu;
const exerciseHeadingRe = /(?:演習|問題|解答|採点|本番答案|チェックポイント|練習)/u;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else if (e.isFile() && e.name.endsWith('.md')) out.push(full);
  }
  return out;
}

function hasNearbyPanel(lines, i) {
  for (let j = i + 1; j < Math.min(lines.length, i + 20); j++) {
    const t = lines[j].trim();
    if (t === START) return true;
    if (/^#{2,6}\\s+/.test(lines[j])) return false;
  }
  return false;
}

const found = [];
for (const root of roots) {
  for (const file of walk(root)) {
    const rel = file.replaceAll(path.sep, '/');
    const lines = fs.readFileSync(file, 'utf8').split(/\\r?\\n/);
    let depth = 0;
    let fence = null;
    let heading = '';
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const t = line.trim();
      if (fence) {
        if (new RegExp(`^ {0,3}${fence.char}{${fence.length},}\\s*$`).test(line)) fence = null;
        continue;
      }
      const open = line.match(/^ {0,3}(`{3,}|~{3,})/);
      if (open) { fence = { char: open[1][0], length: open[1].length }; continue; }
      if (/^#{2,6}\\s+/.test(line)) heading = t.replace(/^#{2,6}\\s+/, '');
      if (t === START) { depth++; continue; }
      if (t === END) { depth = Math.max(0, depth - 1); continue; }
      if (depth > 0) continue;

      const h = headingRe.exec(line);
      if (h && !exerciseHeadingRe.test(h[1]) && !hasNearbyPanel(lines, i)) {
        found.push({ kind: 'HEADING', rel, line: i + 1, heading, text: t });
        continue;
      }
      const b = boldDeclRe.exec(line);
      if (b) {
        found.push({ kind: 'BOLD_DECL', rel, line: i + 1, heading, text: t });
        continue;
      }
      const p = proseDeclRe.exec(line);
      if (p) {
        found.push({ kind: 'PROSE_DECL', rel, line: i + 1, heading, text: t });
        continue;
      }
      if (theoremLikeNameRe.test(line) && /(?:成り立つ|成り立ちます|等号|不等号|ならば|である。|です。)/u.test(line) && !exerciseHeadingRe.test(heading)) {
        found.push({ kind: 'NAMED_SENTENCE', rel, line: i + 1, heading, text: t });
      }
    }
  }
}

const dedup = [];
const seen = new Set();
for (const x of found) {
  const key = `${x.rel}:${x.line}`;
  if (!seen.has(key)) { seen.add(key); dedup.push(x); }
}

console.log(`named formal audit candidates: ${dedup.length}`);
for (const x of dedup) {
  console.log(`@@ ${x.kind} ${x.rel}:${x.line}`);
  console.log(`   heading: ${x.heading}`);
  console.log(`   text: ${x.text}`);
}
