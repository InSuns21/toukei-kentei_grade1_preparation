import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('textbook/volumes');
const START = '<!-- formal-statement-start -->';
const END = '<!-- formal-statement-end -->';
const KEYWORD_RE = /(定理|補題|命題|系|不等式|等式|公式|法則|原理)/u;
const EXCLUDE_RE = /(証明|導出|使う|適用|例題|演習|練習|まとめ|復習|見方|意味|直感|なぜ|比較|関係|計算|手順|チェック|ポイント|注意|補足|役割|読み方|一般化|特殊例|解釈|一覧|ロードマップ|前提知識)/u;

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name === 'index.md' && !full.includes(`${path.sep}review${path.sep}`)) out.push(full);
  }
  return out;
}

function headingText(line) {
  return line.replace(/^#{2,6}\s+/, '').replace(/<a\s+id="[^"]+"><\/a>/gu, '').trim();
}

function classifySection(lines, start) {
  const match = lines[start].match(/^(#{2,6})\s+/u);
  if (!match) return null;
  const level = match[1].length;
  const heading = headingText(lines[start]);
  let hasPanel = false;
  let hasAnchor = false;
  let panelDepth = 0;
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    const hm = line.match(/^(#{2,6})\s+/u);
    if (hm && hm[1].length <= level) break;
    const t = line.trim();
    if (t === START) { hasPanel = true; panelDepth += 1; }
    if (t === END) panelDepth = Math.max(0, panelDepth - 1);
    if (/<a\s+id="(?:thm|prop|lem|cor)-[^"]+"><\/a>/u.test(line)) hasAnchor = true;
  }
  return { heading, hasPanel, hasAnchor };
}

const all = [];
for (const file of walk(ROOT)) {
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
    if (!/^#{2,6}\s+/u.test(line)) continue;
    const section = classifySection(lines, i);
    if (!section || !KEYWORD_RE.test(section.heading)) continue;
    all.push({ rel, line: i + 1, ...section });
  }
}

const candidates = all.filter((x) => !x.hasPanel && !EXCLUDE_RE.test(x.heading));
console.log(`Named-result heading audit: ${all.length} keyword heading(s), ${candidates.length} non-formal candidate(s).`);
for (const item of candidates) {
  console.log(`CANDIDATE\t${item.rel}:${item.line}\t${item.heading}\tanchor=${item.hasAnchor ? 'yes' : 'no'}`);
}
if (candidates.length) process.exit(1);
