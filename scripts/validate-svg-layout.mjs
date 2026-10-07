import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const strictRoot = /^textbook\/volumes\/00_foundations\/[^/]+\/assets\/.*\.svg$/u;
const errors = [];

function argValue(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : null;
}

function hasArg(name) {
  return process.argv.includes(name);
}

if (hasArg('--self-test')) {
  runSelfTest();
  process.exit(0);
}

const changedOnly = hasArg('--changed-only');
const base = argValue('--base') || (process.env.TEXTBOOK_BASE_SHA || '').trim();
let files;

if (changedOnly) {
  if (!base) {
    console.error('SVG layout validation requires --base <sha> or TEXTBOOK_BASE_SHA in --changed-only mode.');
    process.exit(2);
  }
  const diff = spawnSync('git', ['diff', '--name-only', '--diff-filter=ACMR', base + '...HEAD'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (diff.status !== 0) {
    console.error(diff.stderr || 'git diff failed');
    process.exit(diff.status || 2);
  }
  files = diff.stdout.split(/\r?\n/u).map((x) => x.trim()).filter((x) => x.endsWith('.svg'));
} else {
  files = recursiveSvgFiles(path.join(root, 'textbook')).map((abs) => path.relative(root, abs).replaceAll('\\', '/'));
}

let checked = 0;
for (const rel of files) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) continue;
  const source = fs.readFileSync(abs, 'utf8');
  const strict = /<svg\b[^>]*\bdata-layout-lint\s*=\s*["']strict["']/iu.test(source);

  if (changedOnly && strictRoot.test(rel) && !strict) {
    errors.push(`${rel}: changed DREAM THEATER SVG must opt in with data-layout-lint="strict"`);
    continue;
  }
  if (!strict) continue;

  checked += 1;
  const issues = validateSvg(source);
  for (const issue of issues) {
    errors.push(`${rel}:${issue.line}: ${issue.message}`);
  }
}

if (errors.length) {
  console.error(`SVG layout validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error('- ' + error);
  process.exit(1);
}

console.log(`SVG layout validation passed: ${checked} strict SVG file(s) checked${changedOnly ? ' from changed files' : ''}.`);

function recursiveSvgFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...recursiveSvgFiles(abs));
    else if (entry.isFile() && entry.name.endsWith('.svg')) out.push(abs);
  }
  return out;
}

function parseAttrs(raw) {
  const attrs = {};
  const re = /([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/gu;
  for (const m of raw.matchAll(re)) attrs[m[1]] = m[2] ?? m[3] ?? '';
  return attrs;
}

function num(value, fallback = 0) {
  if (value == null) return fallback;
  const m = /^\s*(-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?)/iu.exec(String(value));
  return m ? Number(m[1]) : fallback;
}

function inherited(parent, attrs) {
  return {
    fontSize: attrs['font-size'] ?? parent.fontSize ?? '16',
    textAnchor: attrs['text-anchor'] ?? parent.textAnchor ?? 'start',
    stroke: attrs.stroke ?? parent.stroke ?? 'none',
    strokeWidth: attrs['stroke-width'] ?? parent.strokeWidth ?? '1',
    transform: attrs.transform ?? parent.transform ?? '',
  };
}

function validateSvg(source) {
  const issues = [];
  const stack = [{
    tag: '#root',
    attrs: {},
    fontSize: '16',
    textAnchor: 'start',
    stroke: 'none',
    strokeWidth: '1',
    skip: false,
    textContent: '',
    startIndex: 0,
  }];
  const texts = [];
  const segments = [];
  const tokenRe = /<[^>]+>|[^<]+/gu;

  for (const match of source.matchAll(tokenRe)) {
    const token = match[0];
    const index = match.index ?? 0;
    if (!token.startsWith('<')) {
      for (let i = stack.length - 1; i >= 0; i -= 1) {
        if (stack[i].tag === 'text') {
          stack[i].textContent += token;
          break;
        }
      }
      continue;
    }
    if (/^<\?/.test(token) || /^<!--/.test(token) || /^<!DOCTYPE/i.test(token)) continue;
    if (/^<\//.test(token)) {
      const name = /^<\/\s*([\w:-]+)/u.exec(token)?.[1] ?? '';
      const ctx = stack.pop();
      if (!ctx || ctx.tag !== name) continue;
      if (ctx.tag === 'text') texts.push(makeText(ctx, source));
      continue;
    }

    const start = /^<\s*([\w:-]+)([\s\S]*?)\/?\s*>$/u.exec(token);
    if (!start) continue;
    const tag = start[1];
    const attrs = parseAttrs(start[2]);
    const parent = stack[stack.length - 1];
    const state = inherited(parent, attrs);
    const skip = parent.skip || ['defs', 'marker', 'title', 'desc', 'style', 'script'].includes(tag);
    const ctx = {
      tag,
      attrs,
      ...state,
      skip,
      textContent: '',
      startIndex: index,
    };

    if (!skip && ['line', 'rect', 'circle', 'path', 'polyline', 'polygon'].includes(tag)) {
      const ignore = attrs['data-layout-ignore'] ?? '';
      if (!ignore.includes('text-overlap')) {
        segments.push(...geometrySegments(tag, attrs, state, index, source));
      }
    }

    const selfClosing = /\/\s*>$/.test(token) || ['line', 'rect', 'circle', 'path', 'polyline', 'polygon'].includes(tag);
    if (!selfClosing) stack.push(ctx);
  }

  for (const text of texts) {
    if (!text.value.trim()) continue;
    const ignore = text.attrs['data-layout-ignore'] ?? '';
    if (ignore.includes('text-overlap')) continue;
    const box = textBox(text);
    for (const seg of segments) {
      if (!segmentHitsBox(seg, box)) continue;
      issues.push({
        line: text.line,
        message: `text "${text.value.trim().replace(/\s+/gu, ' ')}" overlaps ${seg.kind} near line ${seg.line}; move the label or split the diagram instead of relying on color/z-order`,
      });
      break;
    }
  }

  return dedupe(issues);
}

function makeText(ctx, source) {
  return {
    attrs: ctx.attrs,
    value: decodeEntities(ctx.textContent.replace(/<[^>]*>/gu, '')),
    x: num(ctx.attrs.x),
    y: num(ctx.attrs.y),
    fontSize: num(ctx.fontSize, 16),
    textAnchor: ctx.attrs['text-anchor'] ?? ctx.textAnchor ?? 'start',
    line: lineAt(source, ctx.startIndex),
  };
}

function decodeEntities(value) {
  return value
    .replaceAll('&gt;', '>')
    .replaceAll('&lt;', '<')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function charWidth(ch, em) {
  if (/\s/u.test(ch)) return 0.36 * em;
  if (/[\u3000-\u30ff\u3400-\u9fff\uff00-\uffef]/u.test(ch)) return 1.02 * em;
  if (/[A-Z0-9]/u.test(ch)) return 0.68 * em;
  if (/[a-z]/u.test(ch)) return 0.58 * em;
  return 0.52 * em;
}

function textBox(text) {
  const width = [...text.value].reduce((sum, ch) => sum + charWidth(ch, text.fontSize), 0) * 1.05;
  let x1 = text.x;
  if (text.textAnchor === 'middle') x1 -= width / 2;
  else if (text.textAnchor === 'end') x1 -= width;
  const pad = Math.max(4, text.fontSize * 0.16);
  return {
    x1: x1 - pad,
    x2: x1 + width + pad,
    y1: text.y - text.fontSize * 0.92 - pad,
    y2: text.y + text.fontSize * 0.28 + pad,
  };
}

function geometrySegments(tag, attrs, state, index, source) {
  const line = lineAt(source, index);
  const sw = Math.max(1, num(attrs['stroke-width'] ?? state.strokeWidth, 1));
  if ((attrs.stroke ?? state.stroke) === 'none' && tag !== 'path') return [];
  if (tag === 'line') {
    return [seg(num(attrs.x1), num(attrs.y1), num(attrs.x2), num(attrs.y2), sw, tag, line)];
  }
  if (tag === 'rect') {
    const x = num(attrs.x), y = num(attrs.y), w = num(attrs.width), h = num(attrs.height);
    return [
      seg(x, y, x + w, y, sw, tag, line),
      seg(x + w, y, x + w, y + h, sw, tag, line),
      seg(x + w, y + h, x, y + h, sw, tag, line),
      seg(x, y + h, x, y, sw, tag, line),
    ];
  }
  if (tag === 'circle') {
    const cx = num(attrs.cx), cy = num(attrs.cy), r = num(attrs.r);
    const points = [];
    for (let i = 0; i <= 48; i += 1) {
      const a = (Math.PI * 2 * i) / 48;
      points.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    return pointsToSegments(points, false, sw, tag, line);
  }
  if (tag === 'polyline' || tag === 'polygon') {
    const points = (attrs.points ?? '').trim().split(/\s+/u)
      .map((pair) => pair.split(',').map(Number))
      .filter((p) => p.length === 2 && p.every(Number.isFinite));
    return pointsToSegments(points, tag === 'polygon', sw, tag, line);
  }
  if (tag === 'path') {
    if ((attrs.stroke ?? state.stroke) === 'none') return [];
    return pathSegments(attrs.d ?? '', sw, line);
  }
  return [];
}

function seg(x1, y1, x2, y2, sw, kind, line) {
  return { x1, y1, x2, y2, sw, kind, line };
}

function pointsToSegments(points, close, sw, kind, line) {
  const out = [];
  for (let i = 1; i < points.length; i += 1) out.push(seg(...points[i - 1], ...points[i], sw, kind, line));
  if (close && points.length > 2) out.push(seg(...points.at(-1), ...points[0], sw, kind, line));
  return out;
}

function pathSegments(d, sw, line) {
  const tokens = [...d.matchAll(/[MmLlHhVvQqCcZz]|-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?/gu)]
    .map((m) => /[A-Za-z]/u.test(m[0]) ? m[0] : Number(m[0]));
  const out = [];
  let i = 0, cmd = null, x = 0, y = 0, sx = 0, sy = 0;
  const nextNum = () => typeof tokens[i] === 'number' ? tokens[i++] : null;
  while (i < tokens.length) {
    if (typeof tokens[i] === 'string') cmd = tokens[i++];
    if (!cmd) break;
    const rel = cmd === cmd.toLowerCase();
    const C = cmd.toUpperCase();
    if (C === 'Z') {
      out.push(seg(x, y, sx, sy, sw, 'path', line));
      x = sx; y = sy; cmd = null; continue;
    }
    if (C === 'M' || C === 'L') {
      const a = nextNum(), b = nextNum();
      if (a == null || b == null) break;
      const nx = rel ? x + a : a, ny = rel ? y + b : b;
      if (C === 'M') { x = nx; y = ny; sx = x; sy = y; cmd = rel ? 'l' : 'L'; }
      else { out.push(seg(x, y, nx, ny, sw, 'path', line)); x = nx; y = ny; }
      continue;
    }
    if (C === 'H') {
      const a = nextNum(); if (a == null) break;
      const nx = rel ? x + a : a;
      out.push(seg(x, y, nx, y, sw, 'path', line)); x = nx; continue;
    }
    if (C === 'V') {
      const a = nextNum(); if (a == null) break;
      const ny = rel ? y + a : a;
      out.push(seg(x, y, x, ny, sw, 'path', line)); y = ny; continue;
    }
    if (C === 'Q') {
      const a = nextNum(), b = nextNum(), c = nextNum(), e = nextNum();
      if ([a,b,c,e].some((v) => v == null)) break;
      const cx = rel ? x + a : a, cy = rel ? y + b : b;
      const nx = rel ? x + c : c, ny = rel ? y + e : e;
      let px = x, py = y;
      for (let k = 1; k <= 24; k += 1) {
        const t = k / 24, u = 1 - t;
        const qx = u*u*x + 2*u*t*cx + t*t*nx;
        const qy = u*u*y + 2*u*t*cy + t*t*ny;
        out.push(seg(px, py, qx, qy, sw, 'path', line)); px = qx; py = qy;
      }
      x = nx; y = ny; continue;
    }
    if (C === 'C') {
      const a = nextNum(), b = nextNum(), c = nextNum(), e = nextNum(), f = nextNum(), g = nextNum();
      if ([a,b,c,e,f,g].some((v) => v == null)) break;
      const c1x = rel ? x + a : a, c1y = rel ? y + b : b;
      const c2x = rel ? x + c : c, c2y = rel ? y + e : e;
      const nx = rel ? x + f : f, ny = rel ? y + g : g;
      let px = x, py = y;
      for (let k = 1; k <= 32; k += 1) {
        const t = k / 32, u = 1 - t;
        const qx = u*u*u*x + 3*u*u*t*c1x + 3*u*t*t*c2x + t*t*t*nx;
        const qy = u*u*u*y + 3*u*u*t*c1y + 3*u*t*t*c2y + t*t*t*ny;
        out.push(seg(px, py, qx, qy, sw, 'path', line)); px = qx; py = qy;
      }
      x = nx; y = ny; continue;
    }
    // Unsupported path command (notably A/T/S): stop rather than pretending it is safe.
    break;
  }
  return out;
}

function segmentHitsBox(s, box) {
  const pad = s.sw / 2 + 2;
  const b = { x1: box.x1 - pad, x2: box.x2 + pad, y1: box.y1 - pad, y2: box.y2 + pad };
  if (pointIn(s.x1, s.y1, b) || pointIn(s.x2, s.y2, b)) return true;
  return segmentIntersect(s.x1, s.y1, s.x2, s.y2, b.x1, b.y1, b.x2, b.y1)
    || segmentIntersect(s.x1, s.y1, s.x2, s.y2, b.x2, b.y1, b.x2, b.y2)
    || segmentIntersect(s.x1, s.y1, s.x2, s.y2, b.x2, b.y2, b.x1, b.y2)
    || segmentIntersect(s.x1, s.y1, s.x2, s.y2, b.x1, b.y2, b.x1, b.y1);
}

function pointIn(x, y, b) {
  return x >= b.x1 && x <= b.x2 && y >= b.y1 && y <= b.y2;
}

function segmentIntersect(ax, ay, bx, by, cx, cy, dx, dy) {
  const orient = (px, py, qx, qy, rx, ry) => (qx - px) * (ry - py) - (qy - py) * (rx - px);
  const o1 = orient(ax, ay, bx, by, cx, cy);
  const o2 = orient(ax, ay, bx, by, dx, dy);
  const o3 = orient(cx, cy, dx, dy, ax, ay);
  const o4 = orient(cx, cy, dx, dy, bx, by);
  return (o1 === 0 || o2 === 0 || Math.sign(o1) !== Math.sign(o2))
    && (o3 === 0 || o4 === 0 || Math.sign(o3) !== Math.sign(o4));
}

function lineAt(source, index) {
  return source.slice(0, index).split('\n').length;
}

function dedupe(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.line + '|' + item.message;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function runSelfTest() {
  const bad = `<svg data-layout-lint="strict"><line x1="0" y1="20" x2="100" y2="20" stroke="#000"/><text x="30" y="24" font-size="16">label</text></svg>`;
  const good = `<svg data-layout-lint="strict"><line x1="0" y1="20" x2="100" y2="20" stroke="#000"/><text x="30" y="60" font-size="16">label</text></svg>`;
  const grouped = `<svg data-layout-lint="strict"><g font-size="20"><line x1="0" y1="40" x2="100" y2="40" stroke="#000"/><text x="40" y="45">A</text></g></svg>`;
  if (validateSvg(bad).length === 0) throw new Error('self-test: overlapping text was not detected');
  if (validateSvg(good).length !== 0) throw new Error('self-test: separated text was falsely rejected');
  if (validateSvg(grouped).length === 0) throw new Error('self-test: inherited font-size overlap was not detected');
  console.log('SVG layout validator self-test passed.');
}
