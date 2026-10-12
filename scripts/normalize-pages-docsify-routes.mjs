import { access, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const siteDir = path.join(root, '_site');

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

  return files;
}

function normalizeExplicitDocsifyRoutes(markdown) {
  return markdown.replace(/(\[[^\]]*\]\()#\/([^\s)]+)(\))/g, (match, open, route, close) => {
    const suffixAt = route.search(/[?#]/);
    const routePath = suffixAt >= 0 ? route.slice(0, suffixAt) : route;
    const routeSuffix = suffixAt >= 0 ? route.slice(suffixAt) : '';
    const markdownPath = routePath.endsWith('.md') ? routePath : `${routePath}.md`;
    return `${open}${markdownPath}${routeSuffix}${close}`;
  });
}

// Convert GitHub-friendly "../OTHER/index.md" links only in generated
// textbook pages; Docsify is configured with relativePath:false.
function normalizeVolumeRelativeLinks(markdown, relative) {
  if (!relative.startsWith('textbook/volumes/')) return markdown;
  const sourceDir = path.posix.dirname(relative);
  return markdown.replace(/(\]\()(\.\.\/[^)\s]+)(\))/g, (match, open, href, close) => {
    const suffixAt = href.search(/[?#]/);
    const targetPath = suffixAt < 0 ? href : href.slice(0, suffixAt);
    const suffix = suffixAt < 0 ? '' : href.slice(suffixAt);
    const resolved = path.posix.normalize(path.posix.join(sourceDir, targetPath));
    if (!resolved.startsWith('textbook/volumes/')) return match;
    return open + resolved + suffix + close;
  });
}

function selfTestVolumeRelativeLinks() {
  const source = '[result $[X,Y]$](../LIE2/index.md#anchor) and [external](https://example.org)';
  const actual = normalizeVolumeRelativeLinks(source, 'textbook/volumes/dream_thater/代数系/LIE4/index.md');
  const expected = '[result $[X,Y]$](textbook/volumes/dream_thater/代数系/LIE2/index.md#anchor) and [external](https://example.org)';
  if (actual !== expected) throw new Error('Docsify volume-relative link normalization regression');
}
selfTestVolumeRelativeLinks();

await access(siteDir);
const files = await recursiveMarkdownFiles(siteDir);
let changedFiles = 0;
let changedLinks = 0;

for (const relative of files) {
  const filePath = path.join(siteDir, ...relative.split('/'));
  const before = await readFile(filePath, 'utf8');
  const matches = [...before.matchAll(/\[[^\]]*\]\(#\/[^\s)]+\)/g)].length;
  const relativeMatches = relative.startsWith('textbook/volumes/')
    ? [...before.matchAll(/\]\(\.\.\/[^)\s]+\)/g)].length : 0;
  if (matches === 0 && relativeMatches === 0) continue;

  const after = normalizeVolumeRelativeLinks(normalizeExplicitDocsifyRoutes(before), relative);
  if (after === before) continue;
  await writeFile(filePath, after, 'utf8');
  changedFiles += 1;
  changedLinks += matches + relativeMatches;
}

console.log(`Normalized ${changedLinks} explicit Docsify route link(s) across ${changedFiles} generated Markdown file(s).`);
