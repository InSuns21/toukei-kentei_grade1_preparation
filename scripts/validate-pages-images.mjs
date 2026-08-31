import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const siteDir = path.join(root, '_site');

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

function maskCode(markdown) {
  const preserveLines = (text) => text.replace(/[^\n]/g, ' ');
  return markdown
    .replace(/(^|\n)(`{3,}|~{3,})[^\n]*\n[\s\S]*?\n\2[^\n]*(?=\n|$)/g, preserveLines)
    .replace(/`[^`\n]*`/g, preserveLines);
}

function extractImageRefs(markdown) {
  const refs = [];
  const masked = maskCode(markdown);

  const markdownImage = /!\[[^\]]*\]\(\s*(<[^>]+>|[^\s)]+)(?:\s+["'][^"']*["'])?\s*\)/g;
  for (const match of masked.matchAll(markdownImage)) {
    const raw = match[1];
    refs.push({
      href: raw.startsWith('<') && raw.endsWith('>') ? raw.slice(1, -1) : raw,
      index: match.index,
      kind: 'Markdown image',
    });
  }

  const htmlImage = /<img\b[^>]*\bsrc\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))[^>]*>/gi;
  for (const match of masked.matchAll(htmlImage)) {
    refs.push({
      href: match[1] ?? match[2] ?? match[3],
      index: match.index,
      kind: 'HTML img',
    });
  }

  return refs;
}

function lineNumber(markdown, index) {
  return markdown.slice(0, index).split('\n').length;
}

function localImageTarget(href, siteRelativeFile) {
  if (!href || href.startsWith('#')) return null;
  if (/^(?:https?:|data:|blob:)/i.test(href) || href.startsWith('//')) return null;

  const suffixAt = href.search(/[?#]/);
  const hrefPath = suffixAt >= 0 ? href.slice(0, suffixAt) : href;
  if (!hrefPath) return null;

  if (hrefPath.startsWith('/')) {
    throw new Error(`project-site absolute image path is not allowed: ${href}`);
  }

  let decoded;
  try {
    decoded = decodeURIComponent(hrefPath).replaceAll('\\', '/');
  } catch {
    throw new Error(`image path has invalid percent-encoding: ${href}`);
  }

  const sourceDir = path.posix.dirname(siteRelativeFile);
  const resolved = path.posix.normalize(path.posix.join(sourceDir, decoded.replace(/^\.\//, '')));
  if (resolved === '..' || resolved.startsWith('../')) {
    throw new Error(`image path escapes the generated site: ${href}`);
  }
  return resolved;
}

if (!(await exists(siteDir))) {
  console.error('Pages image validation failed: _site does not exist. Build the Pages site first.');
  process.exit(1);
}

const markdownFiles = await recursiveMarkdownFiles(siteDir);
const errors = [];
let imageCount = 0;
let localImageCount = 0;

for (const siteRelative of markdownFiles) {
  const filePath = path.join(siteDir, ...siteRelative.split('/'));
  const markdown = await readFile(filePath, 'utf8');

  for (const ref of extractImageRefs(markdown)) {
    imageCount += 1;
    let target;
    try {
      target = localImageTarget(ref.href, siteRelative);
    } catch (error) {
      errors.push(`${siteRelative}:${lineNumber(markdown, ref.index)}: ${ref.kind}: ${error.message}`);
      continue;
    }

    if (!target) continue;
    localImageCount += 1;

    const targetPath = path.resolve(siteDir, ...target.split('/'));
    const siteRoot = path.resolve(siteDir) + path.sep;
    if (targetPath !== path.resolve(siteDir) && !targetPath.startsWith(siteRoot)) {
      errors.push(`${siteRelative}:${lineNumber(markdown, ref.index)}: ${ref.kind}: image escapes _site: ${ref.href}`);
      continue;
    }

    if (!(await exists(targetPath))) {
      errors.push(
        `${siteRelative}:${lineNumber(markdown, ref.index)}: ${ref.kind}: image does not resolve from its Markdown page: ${ref.href} -> ${target}`,
      );
    }
  }
}

if (errors.length > 0) {
  console.error(`Pages image validation failed for ${errors.length} reference(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Pages image validation passed: ${markdownFiles.length} Markdown files scanned, ${imageCount} image reference(s), ${localImageCount} local image reference(s).`,
);
