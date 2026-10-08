import assert from 'node:assert/strict';
import { access, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';

const root = process.cwd();
const volumesRoot = path.join(root, 'textbook', 'volumes');
const siteRoot = path.join(root, '_site');
const manifestPath = path.join(root, 'textbook', 'dream-theater-index.json');
const label = '> **前提講座（直接）**：';
const mode = process.argv[2] ?? '--write';

function escapeText(value) {
  return String(value).replaceAll('\\', '\\\\').replaceAll('[', '\\[').replaceAll(']', '\\]');
}

function prerequisiteLine(record, records) {
  const dependencies = record.data.prerequisites ?? [];
  if (!Array.isArray(dependencies)) {
    throw new Error(record.href + ': prerequisites must be an array');
  }
  if (dependencies.length === 0) return label + 'なし';

  const seen = new Set();
  const links = dependencies.map((raw) => {
    if (typeof raw !== 'string' || !raw.trim()) {
      throw new Error(record.href + ': invalid prerequisite ' + JSON.stringify(raw));
    }
    const id = raw.trim();
    if (seen.has(id)) throw new Error(record.href + ': repeated prerequisite ' + id);
    if (id === record.id) throw new Error(record.href + ': self dependency ' + id);
    seen.add(id);
    const target = records.get(id);
    if (!target) throw new Error(record.href + ': unresolved prerequisite ' + id);
    return '[' + escapeText(target.id + ' ' + target.title) + '](' + target.href + ')';
  });
  return label + ' ' + links.join('・');
}

function placeAfterH1(text, line, strict = true) {
  const heading = /^# .+$/m.exec(text);
  if (!heading) throw new Error('missing chapter H1');
  const end = heading.index + heading[0].length;
  const before = text.slice(0, end);
  let rest = text.slice(end).replace(/^\r?\n*/, '');
  if (rest.startsWith(label)) {
    // Re-running the generator should not accumulate duplicate blocks.
    rest = rest.slice(rest.indexOf('\n') >= 0 ? rest.indexOf('\n') : rest.length).replace(/^\r?\n*/, '');
  } else if (strict && new RegExp('^> \\*\\*前提講座（直接）\\*\\*：', 'm').test(rest)) {
    throw new Error('prerequisite block exists away from the H1; remove the stale manual block');
  }
  return before + '\n\n' + line + '\n\n' + rest;
}

function runTests() {
  const map = new Map([
    ['MQ0', { id: 'MQ0', title: '量子化への橋', href: 'textbook/volumes/00_foundations/MQ0/index.md' }],
    ['QM6', { id: 'QM6', title: 'スペクトル理論', href: 'textbook/volumes/00_foundations/QM6/index.md' }],
  ]);
  const chapter = { id: 'MQ1', href: 'textbook/volumes/00_foundations/MQ1/index.md', data: { prerequisites: ['MQ0', 'QM6'] } };
  const direct = prerequisiteLine(chapter, map);
  assert.match(direct, /\[MQ0 量子化への橋\]/);
  assert.match(direct, /\[QM6 スペクトル理論\]/);
  assert.equal((direct.match(/\]\(/g) ?? []).length, 2);
  assert.equal(prerequisiteLine({ ...chapter, data: { prerequisites: [] } }, map), label + 'なし');
  assert.throws(() => prerequisiteLine({ ...chapter, data: { prerequisites: ['NOT-FOUND'] } }, map), /unresolved/);
  assert.throws(() => prerequisiteLine({ ...chapter, data: { prerequisites: ['MQ0', 'MQ0'] } }, map), /repeated/);
  const source = '# MQ1 題名\n\n導入文\n\n## 1. 本文\n';
  const converted = placeAfterH1(source, direct);
  assert.match(converted, /^# MQ1 題名\n\n> \*\*前提講座（直接）\*\*： /);
  assert.equal(placeAfterH1(converted, direct), converted);
  assert.ok(converted.includes('導入文\n\n## 1. 本文'));
  console.log('DREAM THEATER prerequisite navigation self-test passed');
}

async function exists(file) {
  try { await access(file); return true; } catch { return false; }
}

async function loadChapters() {
  const volumes = (await readdir(volumesRoot, { withFileTypes: true })).filter((entry) => entry.isDirectory());
  const records = new Map();
  const hrefs = new Map();
  for (const volume of volumes) {
    const entries = await readdir(path.join(volumesRoot, volume.name), { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const dir = path.join(volumesRoot, volume.name, entry.name);
      const yamlFile = path.join(dir, 'chapter.yaml');
      if (!(await exists(yamlFile))) continue;
      const data = YAML.parse(await readFile(yamlFile, 'utf8')) ?? {};
      const id = String(data.id ?? '').trim();
      if (!id) throw new Error(yamlFile + ': chapter id missing');
      const title = String(data.title ?? '').trim();
      if (!title) throw new Error(yamlFile + ': chapter title missing');
      const href = 'textbook/volumes/' + volume.name + '/' + entry.name + '/index.md';
      const record = { id, title, href, data };
      if (records.has(id)) {
        // An indexed canonical chapter wins over historical duplicates.
        if (!Array.isArray(records.get(id))) records.set(id, [records.get(id)]);
        records.get(id).push(record);
      } else records.set(id, record);
      hrefs.set(href, record);
    }
  }
  return { records, hrefs };
}

async function main() {
  if (mode === '--self-test') { runTests(); return; }
  if (!['--write', '--check-pages', '--validate-source'].includes(mode)) {
    throw new Error('Usage: node scripts/prepare-pages-dream-theater-prerequisites.mjs [--write|--check-pages|--validate-source|--self-test]');
  }

  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const paths = manifest.sections.flatMap((section) => section.paths);
  const seenPaths = new Set(paths);
  if (paths.length !== seenPaths.size) throw new Error('duplicate chapter in DREAM THEATER manifest');

  const { records, hrefs } = await loadChapters();
  for (const [id, record] of records) {
    if (!Array.isArray(record)) continue;
    const canonical = record.filter((item) => seenPaths.has(item.href));
    if (canonical.length === 1) records.set(id, canonical[0]);
    else throw new Error('ambiguous chapter id ' + id + ': ' + record.map((v) => v.href).join(', '));
  }

  let count = 0;
  let refs = 0;
  for (const href of paths) {
    const record = hrefs.get(href);
    if (!record) throw new Error('indexed DREAM THEATER chapter is missing chapter.yaml: ' + href);
    const deps = record.data.prerequisites ?? [];
    const expected = prerequisiteLine(record, records);
    refs += deps.length;
    // Some ordinary textbook chapters use legacy multi-file source pages;
    // their public index.md is assembled at build time, not stored in source.
    // --check-pages verifies the actual generated destination for every link.
    if (mode === '--validate-source') { count += 1; continue; }
    const publishedPath = path.join(siteRoot, href);
    if (!(await exists(publishedPath))) throw new Error('missing published DREAM THEATER chapter: ' + href);
    const source = await readFile(publishedPath, 'utf8');
    if (mode === '--write') {
      const generated = placeAfterH1(source, expected);
      if (generated !== source) await writeFile(publishedPath, generated, 'utf8');
    } else {
      const heading = /^# .+$/m.exec(source);
      if (!heading) throw new Error(href + ': missing H1');
      const opening = source.slice(heading.index + heading[0].length).replace(/^\r?\n*/, '').split(/\r?\n/, 1)[0];
      if (opening !== expected) throw new Error(href + ': published prerequisite line differs from chapter.yaml');
      if (source.split(label).length !== 2) throw new Error(href + ': duplicate or missing prerequisite block');
      for (const id of deps) {
        const target = records.get(id);
        if (!(await exists(path.join(siteRoot, target.href)))) {
          throw new Error(href + ': prerequisite not published: ' + id);
        }
      }
    }
    count += 1;
  }
  console.log('DREAM THEATER direct prerequisites: ' + mode + ' OK (' + count + ' chapters, ' + refs + ' direct links)');
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
