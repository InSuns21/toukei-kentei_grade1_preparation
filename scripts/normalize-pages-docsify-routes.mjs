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

await access(siteDir);
const files = await recursiveMarkdownFiles(siteDir);
let changedFiles = 0;
let changedLinks = 0;

for (const relative of files) {
  const filePath = path.join(siteDir, ...relative.split('/'));
  const before = await readFile(filePath, 'utf8');
  const matches = [...before.matchAll(/\[[^\]]*\]\(#\/[^\s)]+\)/g)].length;
  if (matches === 0) continue;

  const after = normalizeExplicitDocsifyRoutes(before);
  await writeFile(filePath, after, 'utf8');
  changedFiles += 1;
  changedLinks += matches;
}

console.log(`Normalized ${changedLinks} explicit Docsify route link(s) across ${changedFiles} generated Markdown file(s).`);
