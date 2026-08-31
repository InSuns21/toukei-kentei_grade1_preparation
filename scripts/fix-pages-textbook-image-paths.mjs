import { access, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const siteDir = path.join(root, '_site');
const textbookVolumesDir = path.join(siteDir, 'textbook', 'volumes');
const rootOrientedPrefixes = [
  'textbook/',
  'references/',
  'statistical-mathematics/',
  'applied-rikou-80/',
  'anki/',
];

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function recursiveMarkdownFiles(baseDir, relativeDir = '') {
  const directory = path.join(baseDir, ...relativeDir.split('/').filter(Boolean));
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relative = path.posix.join(relativeDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await recursiveMarkdownFiles(baseDir, relative));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(relative);
    }
  }

  return files;
}

function splitDestination(rawHref) {
  const trimmed = rawHref.trim();
  const match = trimmed.match(/^(\S+)(\s+(?:"[^"]*"|'[^']*'))?$/);
  if (!match) return null;

  const href = match[1];
  const titleSuffix = match[2] || '';
  const suffixAt = href.search(/[?#]/);
  return {
    hrefPath: suffixAt >= 0 ? href.slice(0, suffixAt) : href,
    hrefSuffix: suffixAt >= 0 ? href.slice(suffixAt) : '',
    titleSuffix,
  };
}

function toRouteRelative(siteRelativeFile, rootOrientedPath) {
  const sourceDir = path.posix.dirname(siteRelativeFile);
  let relative = path.posix.relative(sourceDir, rootOrientedPath);
  if (!relative) relative = path.posix.basename(rootOrientedPath);
  if (!relative.startsWith('.')) relative = `./${relative}`;
  return relative;
}

function targetWithinSite(siteRelativeFile, hrefPath) {
  const sourceDir = path.posix.dirname(siteRelativeFile);
  const normalized = path.posix.normalize(path.posix.join(sourceDir, hrefPath));
  if (normalized === '..' || normalized.startsWith('../')) return null;

  const target = path.resolve(siteDir, ...normalized.split('/'));
  const siteRoot = path.resolve(siteDir);
  if (target !== siteRoot && !target.startsWith(`${siteRoot}${path.sep}`)) return null;
  return target;
}

await access(textbookVolumesDir);

const markdownFiles = await recursiveMarkdownFiles(textbookVolumesDir);
let rewritten = 0;
let checked = 0;
const errors = [];

for (const relative of markdownFiles) {
  const filePath = path.join(textbookVolumesDir, ...relative.split('/'));
  const siteRelativeFile = path.posix.join('textbook', 'volumes', relative);
  const original = await readFile(filePath, 'utf8');

  const updated = original.replace(/(!\[[^\]]*\]\()([^)]+)(\))/g, (match, open, rawHref, close) => {
    const trimmed = rawHref.trim();
    if (
      !trimmed ||
      trimmed.startsWith('#') ||
      trimmed.startsWith('/') ||
      /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(trimmed)
    ) {
      return match;
    }

    const destination = splitDestination(rawHref);
    if (!destination || !destination.hrefPath) return match;

    const isRootOriented = rootOrientedPrefixes.some((prefix) => destination.hrefPath.startsWith(prefix));
    if (!isRootOriented) return match;

    const relativeHref = toRouteRelative(siteRelativeFile, destination.hrefPath);
    rewritten += 1;
    return `${open}${relativeHref}${destination.hrefSuffix}${destination.titleSuffix}${close}`;
  });

  if (updated !== original) {
    await writeFile(filePath, updated, 'utf8');
  }

  for (const match of updated.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
    const rawHref = match[1].trim();
    if (
      !rawHref ||
      rawHref.startsWith('#') ||
      /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(rawHref)
    ) {
      continue;
    }

    const destination = splitDestination(rawHref);
    if (!destination || !destination.hrefPath) continue;
    checked += 1;

    if (destination.hrefPath.startsWith('/')) {
      errors.push(`${siteRelativeFile}: project-site absolute image path is not allowed: ${rawHref}`);
      continue;
    }

    const target = targetWithinSite(siteRelativeFile, destination.hrefPath);
    if (!target) {
      errors.push(`${siteRelativeFile}: image path escapes generated site: ${rawHref}`);
      continue;
    }

    if (!(await exists(target))) {
      errors.push(`${siteRelativeFile}: image does not resolve relative to its Docsify route: ${rawHref}`);
    }
  }
}

if (errors.length > 0) {
  console.error('Textbook image-path fix/validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Textbook image paths fixed for Docsify: ${rewritten} root-oriented image reference(s) rewritten, ${checked} local image reference(s) validated.`,
);
