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

await access(sidebarPath);
await access(indexPath);

const [sidebar, indexHtml] = await Promise.all([
  readFile(sidebarPath, 'utf8'),
  readFile(indexPath, 'utf8'),
]);

const errors = [];
const resolvedTargets = new Set();
const duplicateTargets = new Set();

// The 2026-08-25 regression was caused by Docsify resolving root-oriented
// sidebar links relative to the current nested page, producing paths such as
// statistical-mathematics/core/statistical-mathematics/core/....
if (/\brelativePath\s*:\s*true\b/.test(indexHtml)) {
  errors.push(
    'pages/index.html enables Docsify relativePath: true; this duplicates sidebar paths when navigating from nested exercises.',
  );
}

const hrefs = extractLinks(sidebar);
for (const href of hrefs) {
  let normalized;
  try {
    normalized = normalizeInternalHref(href);
  } catch (error) {
    errors.push(error.message);
    continue;
  }
  if (!normalized) continue;

  if (resolvedTargets.has(normalized)) duplicateTargets.add(normalized);
  resolvedTargets.add(normalized);

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
  if (!resolvedTargets.has(expected)) {
    errors.push(`generated exercise is missing from sidebar: ${expected}`);
  }
}

const sidebarExerciseTargets = [...resolvedTargets].filter((target) =>
  books.some((book) => sections.some((section) => target.startsWith(`${book}/${section}/`))),
);

if (sidebarExerciseTargets.length !== expectedExerciseTargets.size) {
  errors.push(
    `sidebar exercise count mismatch: sidebar=${sidebarExerciseTargets.length}, generated=${expectedExerciseTargets.size}`,
  );
}

if (errors.length > 0) {
  console.error('GitHub Pages link validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `GitHub Pages link validation passed: ${hrefs.length} sidebar links, ${expectedExerciseTargets.size} tiered exercises.`,
);
console.log('Docsify route safety passed: relativePath is not enabled.');
