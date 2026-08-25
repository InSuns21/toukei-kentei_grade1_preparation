import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
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

const sectionLabels = {
  core: 'Core',
  standard: 'Standard',
  advanced: 'Advanced',
};

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

await cp(path.join(pagesDir, 'index.html'), path.join(outDir, 'index.html'));
await cp(path.join(pagesDir, 'home.md'), path.join(outDir, 'home.md'));
await writeFile(path.join(outDir, '.nojekyll'), '', 'utf8');

let sidebar = '- [トップ](home.md)\n\n';

for (const book of books) {
  const sourceDir = path.join(root, book.dir);
  const targetDir = path.join(outDir, book.dir);

  await cp(sourceDir, targetDir, { recursive: true });

  const indexText = await readFile(path.join(sourceDir, 'index.md'), 'utf8');
  const links = [...indexText.matchAll(/\[([^\]]+)\]\(((?:core|standard|advanced)\/[^)]+\.md)\)/g)]
    .map((match) => ({
      title: match[1].replace(/`/g, ''),
      href: match[2],
      section: match[2].split('/')[0],
    }));

  sidebar += `- [${book.label}](${book.dir}/index.md)\n`;

  for (const section of ['core', 'standard', 'advanced']) {
    const items = links.filter((item) => item.section === section);
    if (items.length === 0) continue;

    sidebar += `  - **${sectionLabels[section]}**\n`;
    for (const item of items) {
      sidebar += `    - [${item.title}](${book.dir}/${item.href})\n`;
    }
  }

  sidebar += '\n';
}

await writeFile(path.join(outDir, '_sidebar.md'), sidebar, 'utf8');

console.log(`GitHub Pages site assembled at ${path.relative(root, outDir)}/`);
console.log(`Sidebar entries: ${(sidebar.match(/^\s*- \[/gm) ?? []).length}`);
