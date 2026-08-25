import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const siteDir = path.join(root, '_site');
const sidebarPath = path.join(siteDir, '_sidebar.md');
const indexPath = path.join(siteDir, 'index.html');
const homePath = path.join(siteDir, 'home.md');

const books = ['statistical-mathematics', 'applied-rikou-80'];
const sections = ['core', 'standard', 'advanced'];

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function recursiveFiles(baseDir, predicate, relativeDir = '') {
  const dir = path.join(baseDir, ...relativeDir.split('/').filter(Boolean));
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relative = path.posix.join(relativeDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await recursiveFiles(baseDir, predicate, relative));
    } else if (entry.isFile() && predicate(entry.name, relative)) {
      files.push(relative);
    }
  }

  return files.sort((a, b) => a.localeCompare(b, 'ja', { numeric: true }));
}

function extractLinks(markdown) {
  return [...markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map((match) => match[1].trim());
}

function extractHtmlLinks(html) {
  return [...html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)].map((match) => match[1].trim());
}

function extractCssUrls(css) {
  return [...css.matchAll(/url\((['"]?)([^)'"\s]+)\1\)/gi)].map((match) => match[2].trim());
}

function normalizeInternalHref(href) {
  if (!href || href.startsWith('#')) return null;
  if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(href)) return null;

  const withoutFragment = href.split('#', 1)[0].split('?', 1)[0];
  if (!withoutFragment) return null;

  // This repository is deployed as a GitHub Pages project site, so a leading
  // slash would escape /toukei-kentei_grade1_preparation/ and point at the
  // github.io domain root instead.
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

function isTieredExerciseTarget(target) {
  return books.some((book) =>
    sections.some((section) => target.startsWith(`${book}/${section}/`)),
  );
}

async function validateRootOrientedLinks(markdown, sourceLabel, errors, targets = null) {
  const hrefs = extractLinks(markdown);

  for (const href of hrefs) {
    let normalized;
    try {
      normalized = normalizeInternalHref(href);
    } catch (error) {
      errors.push(`${sourceLabel}: ${error.message}`);
      continue;
    }
    if (!normalized) continue;

    if (targets) targets.add(normalized);

    const target = path.resolve(siteDir, ...normalized.split('/'));
    const siteRoot = path.resolve(siteDir) + path.sep;
    if (target !== path.resolve(siteDir) && !target.startsWith(siteRoot)) {
      errors.push(`${sourceLabel}: link escapes _site: ${href}`);
      continue;
    }

    if (!(await exists(target))) {
      errors.push(`${sourceLabel}: link does not resolve to a generated file: ${href}`);
    }
  }

  return hrefs.length;
}

async function validateRelativeAssetLinks(hrefs, siteRelativeFile, sourceLabel, errors) {
  const sourceDir = path.posix.dirname(siteRelativeFile);

  for (const href of hrefs) {
    if (!href || href.startsWith('#')) continue;
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(href)) continue;

    const withoutFragment = href.split('#', 1)[0].split('?', 1)[0];
    if (!withoutFragment) continue;
    if (withoutFragment.startsWith('/')) {
      errors.push(`${sourceLabel}: project-site absolute path is not allowed: ${href}`);
      continue;
    }

    let decoded;
    try {
      decoded = decodeURIComponent(withoutFragment).replaceAll('\\', '/');
    } catch (error) {
      errors.push(`${sourceLabel}: malformed URL encoding in ${href}: ${error.message}`);
      continue;
    }

    const normalized = path.posix.normalize(path.posix.join(sourceDir, decoded));
    if (normalized === '..' || normalized.startsWith('../')) {
      errors.push(`${sourceLabel}: path escapes the generated site: ${href}`);
      continue;
    }

    const target = path.resolve(siteDir, ...normalized.split('/'));
    if (!(await exists(target))) {
      errors.push(`${sourceLabel}: local asset/page does not exist: ${href}`);
    }
  }
}

await Promise.all([access(sidebarPath), access(indexPath), access(homePath)]);

const [sidebar, indexHtml, homeMarkdown] = await Promise.all([
  readFile(sidebarPath, 'utf8'),
  readFile(indexPath, 'utf8'),
  readFile(homePath, 'utf8'),
]);

const errors = [];
const resolvedSidebarTargets = new Set();
const duplicateTargets = new Set();

// The 2026-08-25 regression was caused by Docsify resolving root-oriented
// sidebar links relative to the current nested page, producing paths such as
// statistical-mathematics/core/statistical-mathematics/core/....
if (/\brelativePath\s*:\s*true\b/.test(indexHtml)) {
  errors.push(
    'pages/index.html enables Docsify relativePath: true; this duplicates sidebar paths when navigating from nested exercises.',
  );
}

const sidebarHrefs = extractLinks(sidebar);
for (const href of sidebarHrefs) {
  let normalized;
  try {
    normalized = normalizeInternalHref(href);
  } catch (error) {
    errors.push(`sidebar: ${error.message}`);
    continue;
  }
  if (!normalized) continue;

  if (resolvedSidebarTargets.has(normalized)) duplicateTargets.add(normalized);
  resolvedSidebarTargets.add(normalized);

  const target = path.resolve(siteDir, ...normalized.split('/'));
  const siteRoot = path.resolve(siteDir) + path.sep;
  if (target !== path.resolve(siteDir) && !target.startsWith(siteRoot)) {
    errors.push(`sidebar link escapes _site: ${href}`);
    continue;
  }

  if (!(await exists(target))) {
    errors.push(`sidebar link does not resolve to a generated file: ${href}`);
  }
}

for (const target of duplicateTargets) {
  errors.push(`duplicate sidebar target: ${target}`);
}

const expectedExerciseTargets = new Set();
for (const book of books) {
  for (const section of sections) {
    const sectionDir = path.join(siteDir, book, section);
    const entries = await readdir(sectionDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
      expectedExerciseTargets.add(`${book}/${section}/${entry.name}`);
    }
  }
}

for (const expected of expectedExerciseTargets) {
  if (!resolvedSidebarTargets.has(expected)) {
    errors.push(`generated exercise is missing from sidebar: ${expected}`);
  }
}

const sidebarExerciseTargets = [...resolvedSidebarTargets].filter(isTieredExerciseTarget);
if (sidebarExerciseTargets.length !== expectedExerciseTargets.size) {
  errors.push(
    `sidebar exercise count mismatch: sidebar=${sidebarExerciseTargets.length}, generated=${expectedExerciseTargets.size}`,
  );
}

// The repository-source index files intentionally use links such as core/foo.md
// so they work when browsing Markdown on GitHub. With Docsify relativePath:false,
// the generated Pages copies must instead use site-root-oriented links such as
// statistical-mathematics/core/foo.md. Validate the generated copies, not the
// source Markdown, so the two use cases can coexist safely.
let indexLinkCount = 0;
for (const book of books) {
  const generatedIndexPath = path.join(siteDir, book, 'index.md');
  const generatedIndex = await readFile(generatedIndexPath, 'utf8');
  const hrefs = extractLinks(generatedIndex);
  indexLinkCount += hrefs.length;

  for (const href of hrefs) {
    const pathOnly = href.split('#', 1)[0].split('?', 1)[0];
    if (sections.some((section) => pathOnly.startsWith(`${section}/`))) {
      errors.push(
        `${book}/index.md: tier link is still directory-relative under Docsify relativePath:false: ${href}`,
      );
    }
  }

  await validateRootOrientedLinks(generatedIndex, `${book}/index.md`, errors);
}

// Home page must expose the new textbook entry point, while Anki uses a raw
// data-no-router anchor because it is a standalone static HTML application.
const homeTargets = new Set();
await validateRootOrientedLinks(homeMarkdown, 'home.md', errors, homeTargets);
if (!homeTargets.has('textbook/index.md')) {
  errors.push('home.md is missing the textbook Pages entry point.');
}
if (!/href=["']\.\/anki\/index\.html["'][^>]*data-no-router/i.test(homeMarkdown)) {
  errors.push('home.md is missing the standalone Anki Pages entry point with data-no-router.');
}
if (!(await exists(path.join(siteDir, 'anki', 'index.html')))) {
  errors.push('Anki Pages entry point does not exist: anki/index.html');
}

// Every user-facing textbook Markdown file under volumes must be present in a
// generated chapter index, and every local link in those files must resolve in
// the generated site. This catches both missing copied files and Docsify path
// regressions before deployment.
const textbookDir = path.join(siteDir, 'textbook');
await access(path.join(textbookDir, 'index.md'));
const textbookVolumeFiles = await recursiveFiles(
  path.join(textbookDir, 'volumes'),
  (name) => name.endsWith('.md'),
);
const textbookNavigationTargets = new Set();
let textbookLinkCount = 0;

const textbookIndex = await readFile(path.join(textbookDir, 'index.md'), 'utf8');
textbookLinkCount += await validateRootOrientedLinks(
  textbookIndex,
  'textbook/index.md',
  errors,
  textbookNavigationTargets,
);

for (const relative of textbookVolumeFiles) {
  const filePath = path.join(textbookDir, 'volumes', ...relative.split('/'));
  const markdown = await readFile(filePath, 'utf8');
  const siteRelative = `textbook/volumes/${relative}`;
  textbookLinkCount += await validateRootOrientedLinks(markdown, siteRelative, errors);

  if (relative.endsWith('/index.md')) {
    await validateRootOrientedLinks(markdown, siteRelative, errors, textbookNavigationTargets);
  }
}

const expectedTextbookPages = textbookVolumeFiles
  .filter((relative) => !relative.endsWith('/index.md'))
  .map((relative) => `textbook/volumes/${relative}`);
for (const expected of expectedTextbookPages) {
  if (!textbookNavigationTargets.has(expected)) {
    errors.push(`textbook page is missing from generated chapter navigation: ${expected}`);
  }
}

for (const supportPage of ['README.md', 'notation.md', 'dependency-graph.md', 'style-guide.md']) {
  const target = `textbook/${supportPage}`;
  if (!textbookNavigationTargets.has(target)) {
    errors.push(`textbook root index is missing support page: ${target}`);
  }
}

// Anki is a standalone HTML application generated by anki:build. Verify every
// HTML href/src and every CSS url() target so category navigation, JavaScript,
// CSS and KaTeX fonts cannot deploy with local 404s.
const ankiDir = path.join(siteDir, 'anki');
const ankiHtmlFiles = await recursiveFiles(ankiDir, (name) => name.endsWith('.html'));
const ankiCssFiles = await recursiveFiles(ankiDir, (name) => name.endsWith('.css'));
let ankiLocalLinkCount = 0;

for (const relative of ankiHtmlFiles) {
  const html = await readFile(path.join(ankiDir, ...relative.split('/')), 'utf8');
  const hrefs = extractHtmlLinks(html);
  ankiLocalLinkCount += hrefs.filter((href) => !/^(?:https?:|mailto:|tel:|data:|javascript:|#)/i.test(href)).length;
  await validateRelativeAssetLinks(hrefs, `anki/${relative}`, `anki/${relative}`, errors);
}

for (const relative of ankiCssFiles) {
  const css = await readFile(path.join(ankiDir, ...relative.split('/')), 'utf8');
  const hrefs = extractCssUrls(css);
  ankiLocalLinkCount += hrefs.filter((href) => !/^(?:https?:|data:)/i.test(href)).length;
  await validateRelativeAssetLinks(hrefs, `anki/${relative}`, `anki/${relative}`, errors);
}

for (const required of ['index.html', 'notation.html', 'formulae.html', 'assets/style.css', 'assets/app.js', 'assets/katex.min.css']) {
  if (!(await exists(path.join(ankiDir, ...required.split('/'))))) {
    errors.push(`Anki generated site is missing required file: anki/${required}`);
  }
}

if (errors.length > 0) {
  console.error('GitHub Pages link validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `GitHub Pages link validation passed: ${sidebarHrefs.length} sidebar links, ${indexLinkCount} exercise-index links, ${expectedExerciseTargets.size} tiered exercises.`,
);
console.log(
  `Textbook validation passed: ${expectedTextbookPages.length} chapter pages, ${textbookLinkCount} checked Markdown links.`,
);
console.log(
  `Anki validation passed: ${ankiHtmlFiles.length} HTML pages, ${ankiCssFiles.length} CSS files, ${ankiLocalLinkCount} local links/assets checked.`,
);
console.log('Docsify route safety passed: relativePath is not enabled and generated Markdown navigation is site-root oriented.');
