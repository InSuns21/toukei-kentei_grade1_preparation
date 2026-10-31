import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const CHAPTER_ROOT = 'textbook/volumes/dream_thater';
const TOC_ROOT = 'textbook/dream-theater-toc';
const CHAPTER_LINK_RE = /\[([^\]]+)\]\((textbook\/volumes\/(?:dream_thater|00_foundations)\/[^)]+\/index\.md)\)/gu;

/**
 * Source of the public Markdown page. Each subject owns one file; the numeric
 * prefixes of directory and file names own category and subject order. No
 * generated, shared dream-theater.md is checked into Git.
 */
export function assembleDreamTheaterContents(sourceFiles) {
  const intro = sourceFiles.get(`${TOC_ROOT}/intro.md`);
  if (!intro?.startsWith('# DREAM THEATER 本編\n')) {
    throw new Error('missing DREAM THEATER introduction: ' + TOC_ROOT + '/intro.md');
  }
  const categories = new Map();
  for (const [file, content] of sourceFiles) {
    if (file === `${TOC_ROOT}/intro.md`) continue;
    const match = /^textbook\/dream-theater-toc\/(\d{3})_([^/]+)\/(\d{3})_([a-z0-9-]+)\.md$/u.exec(file);
    if (!match) throw new Error('unexpected DREAM THEATER contents source: ' + file);
    const [, categoryOrder, category, subjectOrder] = match;
    const entry = categories.get(categoryOrder) ?? { category, subjects: new Map() };
    if (entry.category !== category) throw new Error('duplicate DREAM THEATER category order: ' + categoryOrder);
    if (entry.subjects.has(subjectOrder)) throw new Error('duplicate DREAM THEATER subject order: ' + file);
    if (!/^<a id="dt-subject-[^"]+"><\/a>\n/u.test(content) ||
        (content.match(/^###\s+.+$/gmu) ?? []).length !== 1 ||
        /^##\s/mu.test(content)) {
      throw new Error('invalid DREAM THEATER subject fragment: ' + file);
    }
    entry.subjects.set(subjectOrder, content);
    categories.set(categoryOrder, entry);
  }
  if (!categories.size) throw new Error('DREAM THEATER contents have no subjects');
  const pieces = [intro];
  const anchors = new Set();
  for (const [, { category, subjects }] of [...categories].sort(([a], [b]) => a.localeCompare(b))) {
    pieces.push(`## ${category}\n\n`);
    for (const [, fragment] of [...subjects].sort(([a], [b]) => a.localeCompare(b))) {
      for (const [, anchor] of fragment.matchAll(/^<a id="([^"]+)"><\/a>$/gmu)) {
        if (anchors.has(anchor)) throw new Error('duplicate DREAM THEATER anchor: ' + anchor);
        anchors.add(anchor);
      }
      pieces.push(fragment);
    }
  }
  return pieces.join('');
}

/** Reads only source fragments, without touching the generated Pages artifact. */
export function readDreamTheaterContents(root = process.cwd()) {
  const sourceRoot = path.join(root, TOC_ROOT);
  const files = new Map();
  files.set(`${TOC_ROOT}/intro.md`, fs.readFileSync(path.join(sourceRoot, 'intro.md'), 'utf8'));
  for (const category of fs.readdirSync(sourceRoot, { withFileTypes: true })) {
    if (category.name === 'intro.md') continue;
    if (!category.isDirectory()) throw new Error('unexpected DREAM THEATER contents source: ' + category.name);
    const categoryRoot = path.join(sourceRoot, category.name);
    for (const subject of fs.readdirSync(categoryRoot, { withFileTypes: true })) {
      if (!subject.isFile()) throw new Error('unexpected DREAM THEATER contents directory: ' + subject.name);
      const relative = `${TOC_ROOT}/${category.name}/${subject.name}`;
      files.set(relative, fs.readFileSync(path.join(categoryRoot, subject.name), 'utf8'));
    }
  }
  return assembleDreamTheaterContents(files);
}

/** Compare PR merge bases without materializing the generated Markdown in Git. */
export function readDreamTheaterContentsAtRef(ref, root = process.cwd()) {
  const git = (...args) => execFileSync('git', args, {
    cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024,
  });
  const paths = git('-c', 'core.quotepath=false', 'ls-tree', '-r', '--name-only', ref, '--', TOC_ROOT)
    .split(/\r?\n/u).filter(Boolean);
  if (!paths.length) {
    // Only for PRs straddling the flat-to-fragment migration.
    return git('show', `${ref}:textbook/dream-theater.md`);
  }
  return assembleDreamTheaterContents(new Map(
    paths.map((file) => [file, git('show', `${ref}:${file}`)]),
  ));
}

/**
 * The reader-facing contents page owns category and display order. Chapter
 * directories own existence; no separately maintained JSON index is needed.
 */
export function parseDreamTheaterFacade(markdown) {
  const sections = [];
  const seen = new Set();
  let section = null;

  for (const line of String(markdown).split(/\r?\n/u)) {
    const heading = /^##\s+(.+?)\s*$/u.exec(line);
    if (heading) {
      section = { name: heading[1].trim(), paths: [] };
      if (sections.some((prior) => prior.name === section.name)) {
        throw new Error('duplicate DREAM THEATER section: ' + section.name);
      }
      sections.push(section);
    }

    for (const match of line.matchAll(CHAPTER_LINK_RE)) {
      const href = match[2];
      if (!section) throw new Error('chapter link before a DREAM THEATER section: ' + href);
      const expectedPrefix = `${CHAPTER_ROOT}/${section.name}/`;
      if (!href.startsWith(expectedPrefix) ||
          !/^textbook\/volumes\/dream_thater\/[^/]+\/[^/]+\/[^/]+\/index\.md$/u.test(href)) {
        throw new Error('noncanonical DREAM THEATER chapter link: ' + href);
      }
      if (seen.has(href)) throw new Error('duplicate DREAM THEATER chapter link: ' + href);
      seen.add(href);
      section.paths.push(href);
    }
  }

  if (!sections.length || !seen.size) throw new Error('DREAM THEATER contents page has no indexed chapters');
  return { sections };
}

/** Discover only canonical category/course/chapter/index.md files. */
export function discoverDreamTheaterChapters(root = process.cwd()) {
  const chapterRoot = path.join(root, CHAPTER_ROOT);
  const paths = [];
  for (const category of fs.readdirSync(chapterRoot, { withFileTypes: true })) {
    if (!category.isDirectory()) continue;
    const categoryDir = path.join(chapterRoot, category.name);
    for (const course of fs.readdirSync(categoryDir, { withFileTypes: true })) {
      if (!course.isDirectory()) continue;
      const courseDir = path.join(categoryDir, course.name);
      for (const chapter of fs.readdirSync(courseDir, { withFileTypes: true })) {
        if (!chapter.isDirectory()) continue;
        const href = path.posix.join(CHAPTER_ROOT, category.name, course.name, chapter.name, 'index.md');
        if (fs.existsSync(path.join(root, href))) paths.push(href);
      }
    }
  }
  return paths.sort();
}

/**
 * Return the previous {sections:[{name,paths}]} interface in memory. Require
 * the contents page and discovered chapter directories to agree exactly, so
 * unpublished or forgotten chapters cannot silently enter or leave the site.
 */
export function loadDreamTheaterIndex(root = process.cwd()) {
  const index = parseDreamTheaterFacade(readDreamTheaterContents(root));
  const listed = index.sections.flatMap((section) => section.paths);
  const listedSet = new Set(listed);
  const discovered = discoverDreamTheaterChapters(root);
  const discoveredSet = new Set(discovered);
  const missing = discovered.filter((href) => !listedSet.has(href));
  const stale = listed.filter((href) => !discoveredSet.has(href));
  if (missing.length || stale.length) {
    throw new Error([
      ...missing.map((href) => 'chapter missing from DREAM THEATER contents: ' + href),
      ...stale.map((href) => 'contents link has no canonical chapter: ' + href),
    ].join('\n'));
  }
  return index;
}
