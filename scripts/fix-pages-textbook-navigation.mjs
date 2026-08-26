import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceRoot = path.join(root, 'textbook', 'volumes');
const siteIndexPath = path.join(root, '_site', 'textbook', 'index.md');
const sidebarPath = path.join(root, '_site', '_sidebar.md');

if (!fs.existsSync(sourceRoot) || !fs.existsSync(siteIndexPath) || !fs.existsSync(sidebarPath)) {
  throw new Error('textbook Pages tree is not ready; run build-pages and single-page preparation first.');
}

let textbookIndex = fs.readFileSync(siteIndexPath, 'utf8');
let sidebar = fs.readFileSync(sidebarPath, 'utf8');
let fixed = 0;

for (const volume of fs.readdirSync(sourceRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
  const volumeDir = path.join(sourceRoot, volume.name);
  for (const chapter of fs.readdirSync(volumeDir, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
    const chapterDir = path.join(volumeDir, chapter.name);
    const canonical = path.join(chapterDir, 'index.md');
    const legacyOverview = fs.readdirSync(chapterDir).find((name) => /^00_.*\.md$/.test(name));

    let source = null;
    if (fs.existsSync(canonical)) {
      source = fs.readFileSync(canonical, 'utf8');
    } else if (legacyOverview) {
      source = fs.readFileSync(path.join(chapterDir, legacyOverview), 'utf8');
    }
    if (!source) continue;

    const title = source.match(/^#\s+(.+)$/m)?.[1]?.trim();
    if (!title) continue;

    const href = path.posix.join('textbook', 'volumes', volume.name, chapter.name, 'index.md');
    const pattern = new RegExp(`\\[[^\\]]*\\]\\(${escapeRegExp(href)}\\)`, 'g');
    const replacement = `[${title.replace(/`/g, '')}](${href})`;

    const nextIndex = textbookIndex.replace(pattern, replacement);
    const nextSidebar = sidebar.replace(pattern, replacement);
    if (nextIndex !== textbookIndex || nextSidebar !== sidebar) fixed += 1;
    textbookIndex = nextIndex;
    sidebar = nextSidebar;
  }
}

fs.writeFileSync(siteIndexPath, textbookIndex, 'utf8');
fs.writeFileSync(sidebarPath, sidebar, 'utf8');
console.log(`Textbook navigation titles normalized from chapter source: ${fixed}`);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
