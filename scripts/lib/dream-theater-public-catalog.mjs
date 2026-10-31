import fs from 'node:fs';
import path from 'node:path';

const CHAPTER_ROOT = 'textbook/volumes/dream_thater';
const FACADE = 'textbook/dream-theater.md';
const CHAPTER_LINK_RE = /\[([^\]]+)\]\((textbook\/volumes\/(?:dream_thater|00_foundations)\/[^)]+\/index\.md)\)/gu;

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
  const index = parseDreamTheaterFacade(fs.readFileSync(path.join(root, FACADE), 'utf8'));
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
