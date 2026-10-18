import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const opts = process.argv;
const has = (v) => opts.includes(v);
const val = (v) => opts[opts.indexOf(v) + 1];
const chapterSvg = /^textbook\/volumes\/(?:00_foundations\/[^/]+|dream_thater\/[^/]+\/[^/]+\/[^/]+)\/assets\/[^/]+\.svg$/u;

function inspect(svg, location, markdown = null) {
  const errors = [], warnings = [], ids = new Map(), refs = [], stack = [];
  const error = (s) => errors.push(location + ': ' + s);
  const warn = (s) => warnings.push(location + ': ' + s);
  if (/<!DOCTYPE\b|<!ENTITY\b|javascript\s*:|@import\b/iu.test(svg)) error('Unsafe DTD, entity, script URL or @import.');
  // A static/print renderer ignores animation keyframes. Do not hide core diagram content by default.
  if (/\.[\w-]+\s*\{\s*opacity\s*:\s*0\s*;\s*animation\s*:/iu.test(svg)) {
    error('Animated SVG hides core figure content at opacity:0; keep the static base visible and animate only within no-preference media.');
  }
  const tokens = [...svg.matchAll(/<(?:"[^"]*"|'[^']*'|[^'">])*>/gu)];
  let root = null;
  for (const m of tokens) {
    const token = m[0];
    if (/^<\?|^<!--|^<!/u.test(token)) continue;
    const close = /^<\s*\/\s*([\w:-]+)/u.exec(token);
    if (close) {
      if (stack.pop() !== close[1]) error('Unbalanced closing XML tag: ' + close[1]);
      continue;
    }
    const open = /^<\s*([\w:-]+)/u.exec(token);
    if (!open) continue;
    const tag = open[1], attrs = {};
    for (const a of token.slice(open[0].length).matchAll(/([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/gu)) {
      attrs[a[1]] = a[2] ?? a[3] ?? '';
    }
    if (!root) root = { tag, attrs };
    if (['script', 'foreignObject', 'iframe', 'object', 'embed'].includes(tag)) error('Forbidden SVG element: ' + tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (/^on[a-z]+/iu.test(key)) error('Inline event handler: ' + key);
      if (key === 'id') {
        if (ids.has(value)) error('Duplicate id: ' + value);
        ids.set(value, true);
      }
      if (key === 'href' || key === 'xlink:href') {
        if (!value.startsWith('#')) error('External href: ' + value);
        else refs.push(value.slice(1));
      }
      if (key === 'aria-labelledby' || key === 'aria-describedby') {
        refs.push(...value.split(/\s+/u).filter(Boolean));
      }
      for (const r of value.matchAll(/url\(\s*['"]?([^)'"]+)/gu)) {
        if (!r[1].startsWith('#')) error('External url() reference.');
        else refs.push(r[1].slice(1));
      }
      if (key === 'data-layout-ignore' && !/^text-overlap:\s*\S.{7,}$/u.test(value)) {
        error('Local text-overlap exception requires a specific reason.');
      }
    }
    if (!/\/\s*>$/u.test(token)) stack.push(tag);
  }
  if (stack.length) error('Unclosed XML elements: ' + stack.join(', '));
  if (svg.replace(/<(?:"[^"]*"|'[^']*'|[^'">])*>/gu, '').includes('<')) error('Malformed XML tag or unescaped less-than sign.');
  if (!root || root.tag !== 'svg') {
    error('SVG root missing.');
    return { errors, warnings };
  }
  if (root.attrs.xmlns !== 'http://www.w3.org/2000/svg') error('Missing SVG xmlns namespace.');
  const box = (root.attrs.viewBox ?? '').trim().split(/[\s,]+/u).map(Number);
  if (box.length !== 4 || !box.every(Number.isFinite) || box[2] <= 0 || box[3] <= 0) {
    error('viewBox must be four finite numbers with positive width and height.');
  }
  for (const name of ['title', 'desc']) {
    const re = new RegExp('<' + name + '\\b[^>]*>([\\s\\S]*?)<\\/' + name + '\\s*>', 'giu');
    const meaningful = [...svg.matchAll(re)].some((m) => m[1].replace(/<[^>]*>/gu, '').trim().length >= (name === 'desc' ? 8 : 2));
    if (!meaningful) error('Meaningful <' + name + '> required.');
  }
  for (const id of refs) if (!ids.has(id)) error('Missing local SVG ID reference: #' + id);
  let minMobileFont = Infinity;
  let mobileSmallCount = 0;
  for (const text of svg.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text\s*>/gu)) {
    const label = text[2].replace(/<[^>]*>/gu, '').trim();
    if (label.length > 36) warn('Visible label is too long; move prose to Markdown.');
    const font = /\bfont-size\s*=\s*["']([\d.]+)["']/u.exec(text[1]);
    if (font) {
      const mobilePx = Number(font[1]) * Math.min(1, 360 / box[2]);
      minMobileFont = Math.min(minMobileFont, mobilePx);
      if (mobilePx < 12) mobileSmallCount += 1;
    }
    const x = /\bx\s*=\s*["']([-+]?\d+(?:\.\d+)?)["']/u.exec(text[1]);
    const y = /\by\s*=\s*["']([-+]?\d+(?:\.\d+)?)["']/u.exec(text[1]);
    if (box.length === 4 && box.every(Number.isFinite) && x && y && !/\btransform\s*=/u.test(text[1])) {
      const tx = Number(x[1]), ty = Number(y[1]);
      if (tx < box[0] || tx > box[0] + box[2] || ty < box[1] || ty > box[1] + box[3]) {
        warn('Text anchor outside viewBox; inspect clipping (transforms and glyph extents require rendered review).');
      }
    }
  }
  if (mobileSmallCount) {
    warn(mobileSmallCount + ' explicitly sized text label(s) may fall below 12px at 360px width; smallest estimated ' +
      minMobileFont.toFixed(1) + 'px. This is advisory, not a claim about final CSS scaling or text rendered from styles.');
  }
  if (markdown !== null) {
    const filename = path.basename(location).replaceAll('.', '\\.');
    const re = new RegExp('!\\[([^\\]]*)\\]\\([^)]*' + filename + '[^)]*\\)', 'gu');
    const images = [...markdown.matchAll(re)];
    if (!images.length) warn('No Markdown inclusion found for the SVG.');
    for (const image of images) {
      if (!image[1].trim() || /^(図|画像|svg|diagram|image)$/iu.test(image[1].trim())) {
        error('Markdown alt must describe the represented mathematical relationship.');
      }
    }
  }
  return { errors, warnings };
}

function test() {
  const svg = (body) => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120"><title>ベクトル場</title><desc>平面の曲線とベクトルの関係を示している。</desc>' + body + '</svg>';
  const good = svg('<defs><marker id="arrow"/></defs><path d="M20 20L90 50" marker-end="url(#arrow)"/>');
  if (inspect(good, 'x.svg', '![曲線とベクトルの対応](assets/x.svg)').errors.length) throw new Error('Valid SVG rejected.');
  const bads = [
    [svg('<line id="a"/><line id="a"/>'), 'Duplicate id'],
    [svg('<line marker-end="url(#lost)"/>'), 'Missing local'],
    [svg('<script/>'), 'Forbidden'],
    [svg('<image href="https://example.test/x.png"/>'), 'External href'],
    [svg('<text><g></text>'), 'Unbalanced'],
    [svg('<line data-layout-ignore="text-overlap"/>'), 'requires a specific reason'],
    [svg('<style>.step{opacity:0;animation:reveal 1s forwards}</style><g class="step"><circle/></g>'), 'hides core figure'],
    [good.replace('viewBox="0 0 200 120"', 'viewBox="0 0 -1 120"'), 'viewBox'],
    [good.replace(/<desc>.*?<\/desc>/u, ''), '<desc>'],
  ];
  for (const [bad, fragment] of bads) {
    if (!inspect(bad, 'x.svg').errors.some((e) => e.includes(fragment))) throw new Error('Missed: ' + fragment);
  }
  if (!inspect(good, 'x.svg', '![](assets/x.svg)').errors.some((e) => e.includes('alt'))) throw new Error('Blank Markdown alt passed.');
  console.log('SVG quality self-test passed.');
}

function collectExistingSvg(dir) {
  if (!fs.existsSync(dir)) return [];
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const loc = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...collectExistingSvg(loc));
    else if (entry.isFile() && entry.name.endsWith('.svg')) result.push(loc.replaceAll('\\', '/'));
  }
  return result;
}

if (has('--self-test')) {
  test();
} else {
  let files = [];
  const existingAudit = has('--audit-existing');
  if (existingAudit) {
    files = collectExistingSvg(path.join('textbook', 'volumes')).sort();
  } else if (has('--file')) {
    files = [val('--file')];
  } else if (has('--changed-only')) {
    const base = has('--base') ? val('--base') : process.env.TEXTBOOK_BASE_SHA;
    if (!base) throw new Error('--changed-only requires --base or TEXTBOOK_BASE_SHA.');
    const diff = spawnSync('git', ['diff', '--name-only', '--diff-filter=ACMR', base + '...HEAD'], { encoding: 'utf8' });
    if (diff.status !== 0) throw new Error(diff.stderr || 'git diff failed.');
    files = diff.stdout.split(/\r?\n/u).filter((p) => chapterSvg.test(p));
  } else {
    console.log('Use --self-test, --file <svg>, --changed-only --base <sha>, or --audit-existing.');
    process.exit(0);
  }
  const errors = [], warnings = [];
  for (const rel of files) {
    if (!fs.existsSync(rel)) continue;
    const svg = fs.readFileSync(rel, 'utf8');
    if (!/<svg\b[^>]*\bdata-layout-lint\s*=\s*["']strict["']/iu.test(svg)) {
      if (!existingAudit) {
        errors.push(rel + ': missing data-layout-lint="strict".');
        continue;
      }
      warnings.push(rel + ': legacy SVG without strict layout lint (review before converting).');
    }
    const dir = path.dirname(rel);
    const markdownPaths = [
      path.join(dir, 'index.md'),
      path.join(path.dirname(dir), 'index.md'),
      path.join(dir, 'README.md'),
    ];
    const doc = markdownPaths.find((p) => fs.existsSync(p));
    const md = doc ? fs.readFileSync(doc, 'utf8') : null;
    const result = inspect(svg, rel, md);
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }
  if (existingAudit) {
    // Existing figures are inventoried, not grandfathered into a false pass/fail claim.
    // These are migration candidates, never a blocking CI regression.
    for (const e of errors) console.warn('EXISTING SVG error candidate: ' + e);
    for (const w of warnings) console.warn('EXISTING SVG warning: ' + w);
    console.log('Existing SVG audit: ' + files.length + ' figures, ' +
      errors.length + ' structural/accessibility candidate(s), ' +
      warnings.length + ' advisory finding(s). Result is non-blocking; mathematical semantics and rendered layout need review.');
    process.exit(0);
  }
  for (const w of warnings) console.warn('SVG quality warning: ' + w);
  for (const e of errors) console.error('SVG quality error: ' + e);
  if (errors.length) process.exit(1);
  console.log('SVG quality passed: ' + files.length + ' changed SVG(s).');
}
