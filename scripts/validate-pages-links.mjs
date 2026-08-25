import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const siteDir = path.join(root, '_site');
const sidebarPath = path.join(siteDir, '_sidebar.md');
const indexPath = path.join(siteDir, 'index.html');

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

function extractLinks(markdown) {
  return [...markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map((match) => match[1].trim());
}

function normalizeInternalHref(href) {
  if (!href || href.startsWith('#')) return null;
  if (/^(?:https?:|mailto:|tel:)/i.test(href)) return null;

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

await access(sidebarPath);
await access(indexPath);

const [sidebar, indexHtml] = await Promise.all([
  readFile(sidebarPath, 'utf8'),
  readFile(indexPath, 'utf8'),
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

if (errors.length > 0) {
  console.error('GitHub Pages link validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `GitHub Pages link validation passed: ${sidebarHrefs.length} sidebar links, ${indexLinkCount} index links, ${expectedExerciseTargets.size} tiered exercises.`,
);
console.log('Docsify route safety passed: relativePath is not enabled and generated index links are site-root oriented.');
