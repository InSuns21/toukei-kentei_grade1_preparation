import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, '_site');
const pagesDir = path.join(root, 'pages');

const books = [
  {
    dir: 'statistical-mathematics',
    label: '統計数理 100大問',
  },
  {
    dir: 'applied-rikou-80',
    label: '統計応用（理工学）80大問',
  },
];

const sections = ['core', 'standard', 'advanced'];
const sectionLabels = {
  core: 'Core',
  standard: 'Standard',
  advanced: 'Advanced',
};

function linksFromIndex(indexText) {
  return [...indexText.matchAll(/\[([^\]]+)\]\(((?:core|standard|advanced)\/[^)]+\.md)\)/g)]
    .map((match) => ({
      title: match[1].replace(/`/g, ''),
      href: match[2],
      section: match[2].split('/')[0],
    }));
}

async function linksFromFiles(sourceDir) {
  const links = [];

  for (const section of sections) {
    const sectionDir = path.join(sourceDir, section);
    const files = (await readdir(sectionDir, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

    for (const file of files) {
      const text = await readFile(path.join(sectionDir, file), 'utf8');
      const heading = text.match(/^#\s+(.+)$/m)?.[1]?.trim();
      const fallback = file.replace(/\.md$/, '').replace(/^\d+_?/, '').replaceAll('_', ' ');
      links.push({
        title: (heading || fallback).replace(/`/g, ''),
        href: `${section}/${file}`,
        section,
      });
    }
  }

  return links;
}

function mergeOrderedLinks(indexLinks, fileLinks) {
  const seen = new Set(indexLinks.map((item) => item.href));
  return [
    ...indexLinks,
    ...fileLinks.filter((item) => !seen.has(item.href)),
  ];
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

await cp(path.join(pagesDir, 'index.html'), path.join(outDir, 'index.html'));
await cp(path.join(pagesDir, 'home.md'), path.join(outDir, 'home.md'));
await writeFile(path.join(outDir, '.nojekyll'), '', 'utf8');

let sidebar = '- [トップ](home.md)\n\n';
let exerciseCount = 0;

for (const book of books) {
  const sourceDir = path.join(root, book.dir);
  const targetDir = path.join(outDir, book.dir);

  await cp(sourceDir, targetDir, { recursive: true });

  const indexText = await readFile(path.join(sourceDir, 'index.md'), 'utf8');
  const indexLinks = linksFromIndex(indexText);
  const fileLinks = await linksFromFiles(sourceDir);
  const links = mergeOrderedLinks(indexLinks, fileLinks);

  exerciseCount += links.length;
  sidebar += `- [${book.label}](${book.dir}/index.md)\n`;

  for (const section of sections) {
    const items = links.filter((item) => item.section === section);
    if (items.length === 0) continue;

    sidebar += `  - **${sectionLabels[section]}**\n`;
    for (const item of items) {
      sidebar += `    - [${item.title}](${book.dir}/${item.href})\n`;
    }
  }

  sidebar += '\n';

  console.log(`${book.dir}: ${fileLinks.length} tiered Markdown files published`);
}

await writeFile(path.join(outDir, '_sidebar.md'), sidebar, 'utf8');

console.log(`GitHub Pages site assembled at ${path.relative(root, outDir)}/`);
console.log(`Tiered Markdown links in sidebar: ${exerciseCount}`);
