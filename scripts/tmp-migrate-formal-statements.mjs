import fs from 'node:fs';
import path from 'node:path';

const START = '<!-- formal-statement-start -->';
const END = '<!-- formal-statement-end -->';
const LABEL = '(?:定義|定理|命題|補題|系|公理|原理)';
const labelRe = new RegExp(`^\\s*(?:>\\s*)?\\*\\*${LABEL}(?:[（(：:].*)?\\*\\*`, 'u');
const formalHeadingRe = new RegExp(`^#{2,6}\\s+(?:\\d+(?:\\.\\d+)*(?:[.)．])?\\s*)?${LABEL}(?:[（(：:]|$)`, 'u');
const roots = ['textbook/volumes', 'applied-rikou-80', 'statistical-mathematics'];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

function fencedLineMask(lines) {
  const masked = new Set();
  let fence = null;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (fence) {
      masked.add(i);
      if (new RegExp(`^ {0,3}${fence.char}{${fence.length},}\\s*$`).test(line)) fence = null;
      continue;
    }
    const open = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (open) {
      masked.add(i);
      fence = { char: open[1][0], length: open[1].length };
    }
  }
  return masked;
}

function markerDepthAt(lines) {
  const depths = [];
  let depth = 0;
  for (let i = 0; i < lines.length; i += 1) {
    depths[i] = depth;
    if (lines[i].trim() === START) depth += 1;
    if (lines[i].trim() === END) depth = Math.max(0, depth - 1);
  }
  return depths;
}

function headingStatementEnd(lines, start) {
  let end = start;
  for (let j = start + 1; j < lines.length; j += 1) {
    const t = lines[j].trim();
    if (/^#{1,6}\s+/u.test(lines[j]) || /^---+$/u.test(t) || t === '<!-- proof-start -->' || t === '<!-- solution-end -->' || /^<a\s+id=/u.test(t)) break;
    end = j;
  }
  while (end > start && lines[end].trim() === '') end -= 1;
  return end;
}

function quotedStatementEnd(lines, start) {
  let end = start;
  let inDollar = false;
  let inBracket = false;
  for (let j = start + 1; j < lines.length; j += 1) {
    const line = lines[j];
    const t = line.trim();
    if (inDollar) {
      end = j;
      if (t === '$$' || (t.endsWith('$$') && t !== '$$')) inDollar = false;
      continue;
    }
    if (inBracket) {
      end = j;
      if (t === '\\]') inBracket = false;
      continue;
    }
    if (t === '') { end = j; continue; }
    if (/^\s*>/u.test(line)) { end = j; continue; }
    if (t === '$$' || (/^\$\$.+\$\$$/u.test(t))) {
      end = j;
      if (t === '$$') inDollar = true;
      continue;
    }
    if (t === '\\[') { end = j; inBracket = true; continue; }
    break;
  }
  while (end > start && lines[end].trim() === '') end -= 1;
  return end;
}

let migrated = 0;
let touched = 0;
for (const file of roots.flatMap((root) => walk(path.resolve(root)))) {
  let lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const masked = fencedLineMask(lines);
  const depths = markerDepthAt(lines);
  const candidates = [];
  for (let i = 0; i < lines.length; i += 1) {
    if (masked.has(i) || depths[i] > 0) continue;
    if (formalHeadingRe.test(lines[i])) candidates.push({ i, kind: 'heading' });
    else if (labelRe.test(lines[i])) candidates.push({ i, kind: 'label' });
  }
  if (!candidates.length) continue;
  for (const candidate of candidates.reverse()) {
    const end = candidate.kind === 'heading'
      ? headingStatementEnd(lines, candidate.i)
      : quotedStatementEnd(lines, candidate.i);
    lines.splice(end + 1, 0, END);
    lines.splice(candidate.i, 0, START);
    migrated += 1;
  }
  fs.writeFileSync(file, `${lines.join('\n').replace(/\n+$/, '')}\n`);
  touched += 1;
}

// Pages runtime: one continuous blue rule around the complete statement,
// including display math that cannot safely carry Markdown quote prefixes.
{
  const p = path.resolve('pages/index.html');
  let s = fs.readFileSync(p, 'utf8');
  s = s.replace(':root { --theme-color: #2f6f9f; }', ':root { --theme-color: #2f6f9f; --formal-statement-rule: #2f6f9f; }');
  const needle = '    .toukei-math-display { display: block; }\n';
  const css = `    .formal-statement { margin: 1rem 0 1.4rem; border-left: 5px solid var(--formal-statement-rule); padding: 0.12rem 0 0.12rem 1.3rem; }\n    .formal-statement > blockquote { margin: 0; padding: 0; border-left: 0; color: inherit; }\n    .formal-statement > h2, .formal-statement > h3, .formal-statement > h4, .formal-statement > h5, .formal-statement > h6 { margin: 0.1rem 0 0.55rem; font-size: 1rem; line-height: 1.55; font-weight: 700; }\n    .formal-statement > :first-child, .formal-statement > blockquote > :first-child { margin-top: 0; }\n    .formal-statement > :last-child, .formal-statement > blockquote > :last-child { margin-bottom: 0; }\n`;
  if (!s.includes('.formal-statement {')) s = s.replace(needle, needle + css);
  fs.writeFileSync(p, s);
}

{
  const p = path.resolve('pages/math-renderer.js');
  let s = fs.readFileSync(p, 'utf8');
  if (!s.includes('function wrapFormalStatementBlocks')) {
    const needle = `  function foldProofBlocks(html) {\n    return html.replace(\n      /<!-- proof-start -->([\\s\\S]*?)<!-- proof-end -->/g,\n      '<details class="solution-details proof-details"><summary>証明を表示</summary><div class="proof-body">$1</div></details>'\n    );\n  }\n`;
    const addition = `${needle}\n  function wrapFormalStatementBlocks(html) {\n    return html.replace(\n      /<!-- formal-statement-start -->([\\s\\S]*?)<!-- formal-statement-end -->/g,\n      '<div class="formal-statement">$1</div>'\n    );\n  }\n`;
    if (!s.includes(needle)) throw new Error('foldProofBlocks insertion point not found');
    s = s.replace(needle, addition);
  }
  s = s.replace('      return foldProofBlocks(html);', '      return wrapFormalStatementBlocks(foldProofBlocks(html));');
  s = s.replace('    foldProofBlocks,\n    docsifyPlugin,', '    foldProofBlocks,\n    wrapFormalStatementBlocks,\n    docsifyPlugin,');
  fs.writeFileSync(p, s);
}

// Common authoring contract.
{
  const p = path.resolve('CONTENT_GUIDELINES.md');
  let s = fs.readFileSync(p, 'utf8');
  const marker = '### 3.2 共通基礎定理を演習で前提にする場合';
  const section = `### 3.1.2 定義・定理・命題・補題などのステートメント表示\n\n定義・定理・命題・補題・系・公理・原理の **ステートメント本体** は、GitHub Pages上で共通の青い左罫線を持つformal statement panelとして表示する。証明、証明の見取り図、例、意味説明はpanelの外に置く。\n\nMarkdownではステートメント範囲を次のmarkerで囲む。数式を含む場合も、数式行へMarkdownの \\`>\\` を強制しない。表示数式へblockquote記号が混入する事故を避けるため、panel全体の青線はPages runtimeがmarkerから生成する。\n\n\\`\\`\\`md\n<!-- formal-statement-start -->\n> **命題（収束列はコーシー列）**  \n> 距離空間 \\`$(X,d)$\\` の点列 \\`$(x_n)$\\` が収束するなら、\\`$(x_n)$\\` はコーシー列である。\n<!-- formal-statement-end -->\n\\`\\`\\`\n\n既存の \\`### 定義（...）\\` / \\`### 定理（...）\\` のようなformal declaration headingを使う場合も、そのheadingとステートメント本体を同じmarkerで囲む。Pagesではheadingをステートメント見出し相当の大きさで表示する。\n\nCIでは \\`npm run validate:formal-statements\\` が、marker外に露出したformal label / formal declaration heading、markerの不整合、1panel内の複数宣言、folded proof内への誤配置を拒否する。\\`npm run validate:pages\\` は生成後Pagesでもmarker・runtime・青線CSSが残っていることを再検証する。\n\n`;
  if (!s.includes('### 3.1.2 定義・定理・命題・補題などのステートメント表示')) {
    if (!s.includes(marker)) throw new Error('CONTENT_GUIDELINES insertion point not found');
    s = s.replace(marker, section + marker);
  }
  fs.writeFileSync(p, s);
}

{
  const p = path.resolve('textbook/templates/chapter/index.md');
  let s = fs.readFileSync(p, 'utf8');
  const needle = '## 3. 定理・公式と導出\n\nTODO: 定理の仮定と結論を明記し、非自明な式は必要な途中式を示す。問題で導出させる公式を暗記前提で置かない。\n';
  const addition = `${needle}\n定義・定理・命題・補題などのステートメントは、次のformal statement markerで囲む。\n\n\\`\\`\\`md\n<!-- formal-statement-start -->\n> **定理（TODO）**  \n> TODO: 対象・仮定・結論をこのblockだけで自己完結させる。\n<!-- formal-statement-end -->\n\\`\\`\\`\n`;
  if (!s.includes('<!-- formal-statement-start -->')) {
    if (!s.includes(needle)) throw new Error('chapter template insertion point not found');
    s = s.replace(needle, addition);
  }
  fs.writeFileSync(p, s);
}

// Package scripts: block source regressions and verify generated Pages too.
{
  const p = path.resolve('package.json');
  const pkg = JSON.parse(fs.readFileSync(p, 'utf8'));
  pkg.scripts['validate:formal-statements'] = 'node scripts/validate-formal-statement-panels.mjs';
  if (!pkg.scripts.validate.includes('validate:formal-statements')) {
    pkg.scripts.validate = pkg.scripts.validate.replace('npm run validate:proof-folding &&', 'npm run validate:proof-folding && npm run validate:formal-statements &&');
  }
  if (!pkg.scripts['validate:pages'].includes('npm run validate:formal-statements')) {
    pkg.scripts['validate:pages'] = pkg.scripts['validate:pages'].replace('npm run validate:proof-folding &&', 'npm run validate:proof-folding && npm run validate:formal-statements &&');
  }
  if (!pkg.scripts['validate:pages'].includes('validate-formal-statement-panels.mjs --pages')) {
    pkg.scripts['validate:pages'] = pkg.scripts['validate:pages'].replace('node scripts/build-pages.mjs &&', 'node scripts/build-pages.mjs && node scripts/validate-formal-statement-panels.mjs --pages &&');
  }
  fs.writeFileSync(p, `${JSON.stringify(pkg, null, 2)}\n`);
}

console.log(`Migrated ${migrated} formal statement(s) across ${touched} file(s).`);
