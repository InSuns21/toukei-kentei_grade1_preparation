import fs from 'node:fs';
import { access, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const siteDir = path.join(root, '_site');
const books = ['statistical-mathematics', 'applied-rikou-80'];

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function recursiveMarkdownFiles(baseDir, relativeDir = '') {
  const dir = path.join(baseDir, ...relativeDir.split('/').filter(Boolean));
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relative = path.posix.join(relativeDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await recursiveMarkdownFiles(baseDir, relative));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(relative);
    }
  }

  return files.sort((a, b) => a.localeCompare(b, 'ja', { numeric: true }));
}

function orientMarkdownLinks(markdown, siteRelativeFile) {
  const sourceDir = path.posix.dirname(siteRelativeFile);

  return markdown.replace(/(!?\[[^\]]*\]\()([^)]+)(\))/g, (match, open, rawHref, close) => {
    // Docsify resolves image sources relative to the Markdown page. Keep image
    // paths page-relative instead of rewriting them like navigation links.
    if (open.startsWith('![')) return match;

    const trimmed = rawHref.trim();
    if (
      !trimmed ||
      trimmed.startsWith('#') ||
      trimmed.startsWith('/') ||
      /^(?:https?:|mailto:|tel:|data:)/i.test(trimmed)
    ) {
      return match;
    }

    const destination = trimmed.match(/^(\S+)(\s+(?:"[^"]*"|'[^']*'))?$/);
    if (!destination) return match;

    const href = destination[1];
    const titleSuffix = destination[2] || '';
    const suffixAt = href.search(/[?#]/);
    const hrefPath = suffixAt >= 0 ? href.slice(0, suffixAt) : href;
    const hrefSuffix = suffixAt >= 0 ? href.slice(suffixAt) : '';
    if (!hrefPath) return match;

    const alreadyRootOriented = /^(?:textbook|anki|references|statistical-mathematics|applied-rikou-80)\//.test(hrefPath);
    const resolved = alreadyRootOriented
      ? path.posix.normalize(hrefPath)
      : path.posix.normalize(path.posix.join(sourceDir, hrefPath.replace(/^\.\//, '')));

    if (resolved === '..' || resolved.startsWith('../')) {
      throw new Error(`${siteRelativeFile}: link escapes the generated site: ${trimmed}`);
    }

    return `${open}${resolved}${hrefSuffix}${titleSuffix}${close}`;
  });
}

function canonicalizeRemovedTextbookLinks(markdown) {
  return markdown.replace(/(!?\[[^\]]*\]\()([^)]+)(\))/g, (match, open, rawHref, close) => {
    const trimmed = rawHref.trim();
    const destination = trimmed.match(/^(\S+)(\s+(?:"[^"]*"|'[^']*'))?$/);
    if (!destination) return match;

    const href = destination[1];
    const titleSuffix = destination[2] || '';
    const suffixAt = href.search(/[?#]/);
    const hrefPath = suffixAt >= 0 ? href.slice(0, suffixAt) : href;
    const hrefSuffix = suffixAt >= 0 ? href.slice(suffixAt) : '';
    if (!hrefPath.startsWith('textbook/volumes/') || !hrefPath.endsWith('.md')) return match;

    const targetPath = path.resolve(siteDir, ...hrefPath.split('/'));
    if (fs.existsSync(targetPath)) return match;

    const canonicalHref = path.posix.join(path.posix.dirname(hrefPath), 'index.md');
    const canonicalPath = path.resolve(siteDir, ...canonicalHref.split('/'));
    if (!fs.existsSync(canonicalPath)) return match;

    return `${open}${canonicalHref}${hrefSuffix}${titleSuffix}${close}`;
  });
}

function extractLinks(markdown) {
  return [...markdown.matchAll(/(!?)\[[^\]]*\]\(([^)]+)\)/g)]
    .filter((match) => match[1] !== '!')
    .map((match) => match[2].trim());
}

function localTarget(href) {
  if (!href || href.startsWith('#')) return null;
  if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(href)) return null;

  const withoutFragment = href.split('#', 1)[0].split('?', 1)[0];
  if (!withoutFragment) return null;
  if (withoutFragment.startsWith('/')) {
    throw new Error(`project-site absolute path is not allowed: ${href}`);
  }

  const decoded = decodeURIComponent(withoutFragment).replaceAll('\\', '/');
  const normalized = path.posix.normalize(decoded.replace(/^\.\//, ''));
  if (normalized === '..' || normalized.startsWith('../')) {
    throw new Error(`path escapes the generated site: ${href}`);
  }
  return normalized;
}

let markdownCount = 0;
let linkCount = 0;
let canonicalizedTextbookLinks = 0;
const errors = [];

for (const book of books) {
  const bookDir = path.join(siteDir, book);
  const files = await recursiveMarkdownFiles(bookDir);

  for (const relative of files) {
    const filePath = path.join(bookDir, ...relative.split('/'));
    const siteRelative = path.posix.join(book, relative);
    const source = await readFile(filePath, 'utf8');
    const oriented = orientMarkdownLinks(source, siteRelative);
    const canonicalized = canonicalizeRemovedTextbookLinks(oriented);
    if (canonicalized !== oriented) canonicalizedTextbookLinks += 1;
    await writeFile(filePath, canonicalized, 'utf8');
    markdownCount += 1;

    for (const href of extractLinks(canonicalized)) {
      let target;
      try {
        target = localTarget(href);
      } catch (error) {
        errors.push(`${siteRelative}: ${error.message}`);
        continue;
      }
      if (!target) continue;
      linkCount += 1;

      const targetPath = path.resolve(siteDir, ...target.split('/'));
      const siteRoot = path.resolve(siteDir) + path.sep;
      if (targetPath !== path.resolve(siteDir) && !targetPath.startsWith(siteRoot)) {
        errors.push(`${siteRelative}: link escapes _site: ${href}`);
        continue;
      }
      if (!(await exists(targetPath))) {
        errors.push(`${siteRelative}: link does not resolve to a generated file: ${href}`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error('Exercise Markdown Pages-link preparation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Exercise Markdown Pages links prepared: ${markdownCount} Markdown files, ${linkCount} local links validated, ${canonicalizedTextbookLinks} file(s) redirected to canonical textbook pages.`,
);
