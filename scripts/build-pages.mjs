import { access, cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
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

const textbookVolumeLabels = {
  '00_foundations': '基礎',
  '01_probability': '確率',
  '02_distributions': '確率分布',
  '03_inference': '統計的推測',
};

function linksFromIndex(indexText) {
  return [...indexText.matchAll(/\[([^\]]+)\]\(((?:core|standard|advanced)\/[^)]+\.md)\)/g)]
    .map((match) => ({
      title: match[1].replace(/`/g, ''),
      href: match[2],
      section: match[2].split('/')[0],
    }));
}

function indexForPages(indexText, bookDir) {
  return indexText.replace(/(\[[^\]]+\]\()([^)]+)(\))/g, (match, open, href, close) => {
    const trimmed = href.trim();

    if (
      !trimmed ||
      trimmed.startsWith('#') ||
      trimmed.startsWith('/') ||
      trimmed.startsWith('../') ||
      trimmed.startsWith(`${bookDir}/`) ||
      /^(?:https?:|mailto:|tel:)/i.test(trimmed)
    ) {
      return match;
    }

    const localHref = trimmed.replace(/^\.\//, '');
    return `${open}${bookDir}/${localHref}${close}`;
  });
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

async function recursiveFiles(baseDir, predicate, relativeDir = '') {
  const dir = path.join(baseDir, relativeDir);
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relative = path.posix.join(relativeDir.replaceAll('\\', '/'), entry.name);
    if (entry.isDirectory()) {
      files.push(...await recursiveFiles(baseDir, predicate, relative));
    } else if (entry.isFile() && predicate(entry.name, relative)) {
      files.push(relative);
    }
  }

  return files.sort((a, b) => a.localeCompare(b, 'ja', { numeric: true }));
}

function markdownHeading(text, fallback) {
  return (text.match(/^#\s+(.+)$/m)?.[1]?.trim() || fallback).replace(/`/g, '');
}

function humanizePathName(name) {
  return name
    .replace(/\.md$/i, '')
    .replace(/^\d+_?/, '')
    .replaceAll('_', ' ')
    .trim();
}

function orientMarkdownLinks(markdown, siteRelativeFile) {
  const sourceDir = path.posix.dirname(siteRelativeFile);

  return markdown.replace(/(!?\[[^\]]*\]\()([^)]+)(\))/g, (match, open, rawHref, close) => {
    const trimmed = rawHref.trim();
    if (
      !trimmed ||
      trimmed.startsWith('#') ||
      trimmed.startsWith('/') ||
      /^(?:https?:|mailto:|tel:|data:)/i.test(trimmed)
    ) {
      return match;
    }

    const destination = trimmed.match(/^(\S+)(\s+(?:"[^"]*"|'[^']*'))?$/);
    if (!destination) return match;

    const href = destination[1];
    const titleSuffix = destination[2] || '';
    const suffixAt = href.search(/[?#]/);
    const hrefPath = suffixAt >= 0 ? href.slice(0, suffixAt) : href;
    const hrefSuffix = suffixAt >= 0 ? href.slice(suffixAt) : '';
    if (!hrefPath) return match;

    const alreadyRootOriented = /^(?:textbook|anki|references|statistical-mathematics|applied-rikou-80)\//.test(hrefPath);
    const resolved = alreadyRootOriented
      ? path.posix.normalize(hrefPath)
      : path.posix.normalize(path.posix.join(sourceDir, hrefPath.replace(/^\.\//, '')));

    if (resolved === '..' || resolved.startsWith('../')) {
      throw new Error(`${siteRelativeFile}: link escapes the generated site: ${trimmed}`);
    }

    return `${open}${resolved}${hrefSuffix}${titleSuffix}${close}`;
  });
}

async function orientPublishedMarkdownTree(targetDir, siteRoot) {
  const markdownFiles = await recursiveFiles(targetDir, (name) => name.endsWith('.md'));
  for (const relative of markdownFiles) {
    const filePath = path.join(targetDir, ...relative.split('/'));
    const text = await readFile(filePath, 'utf8');
    await writeFile(
      filePath,
      orientMarkdownLinks(text, path.posix.join(siteRoot, relative)),
      'utf8',
    );
  }
  return markdownFiles;
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

await cp(path.join(pagesDir, 'index.html'), path.join(outDir, 'index.html'));
await cp(path.join(pagesDir, 'math-renderer.js'), path.join(outDir, 'math-renderer.js'));
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

  // Docsify is configured with relativePath: false so navigation links are
  // resolved from the Pages site root. Keep repository Markdown unchanged,
  // but make every local link in the generated index site-root oriented.
  await writeFile(
    path.join(targetDir, 'index.md'),
    indexForPages(indexText, book.dir),
    'utf8',
  );

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

// Publish the normal textbook as Docsify-readable Markdown. The source tree is
// copied unchanged first, then only the generated Pages copy has its relative
// Markdown links rewritten to site-root-oriented links for relativePath:false.
const textbookSourceDir = path.join(root, 'textbook');
const textbookTargetDir = path.join(outDir, 'textbook');
await cp(textbookSourceDir, textbookTargetDir, {
  recursive: true,
  filter: (source) => {
    const relative = path.relative(textbookSourceDir, source);
    return relative === '' || relative.split(path.sep)[0] !== 'templates';
  },
});
await orientPublishedMarkdownTree(textbookTargetDir, 'textbook');

const volumeEntries = (await readdir(path.join(textbookSourceDir, 'volumes'), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

let textbookIndex = '# 通常教材\n\n';
textbookIndex += '統計検定1級の通常章教材です。章ごとの目次から、導入・定義・定理・例題・演習・詳細解答・本番ドリルへ移動できます。\n\n';
textbookIndex += '- [教材の説明](textbook/README.md)\n';
textbookIndex += '- [記法規約](textbook/notation.md)\n';
textbookIndex += '- [章間依存](textbook/dependency-graph.md)\n';
textbookIndex += '- [執筆規約](textbook/style-guide.md)\n\n';

sidebar += '- [通常教材](textbook/index.md)\n';
let textbookMarkdownCount = 0;
let textbookChapterCount = 0;

for (const volume of volumeEntries) {
  const volumeSourceDir = path.join(textbookSourceDir, 'volumes', volume);
  const volumeTargetDir = path.join(textbookTargetDir, 'volumes', volume);
  const volumeLabel = textbookVolumeLabels[volume] || humanizePathName(volume);
  const chapterEntries = (await readdir(volumeSourceDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, 'ja', { numeric: true }));

  textbookIndex += `## ${volumeLabel}\n\n`;
  sidebar += `  - **${volumeLabel}**\n`;

  for (const chapter of chapterEntries) {
    const chapterSourceDir = path.join(volumeSourceDir, chapter);
    const chapterTargetDir = path.join(volumeTargetDir, chapter);
    const chapterFiles = await recursiveFiles(
      chapterSourceDir,
      (name) => name.endsWith('.md') && name !== 'index.md',
    );
    if (chapterFiles.length === 0) continue;

    const overviewRelative = chapterFiles.includes('00_overview.md') ? '00_overview.md' : chapterFiles[0];
    const overviewText = await readFile(path.join(chapterSourceDir, ...overviewRelative.split('/')), 'utf8');
    const chapterTitle = markdownHeading(overviewText, humanizePathName(chapter));
    const chapterSiteDir = path.posix.join('textbook', 'volumes', volume, chapter);
    const chapterIndexHref = path.posix.join(chapterSiteDir, 'index.md');

    let chapterIndex = `# ${chapterTitle}\n\n`;
    chapterIndex += '[通常教材の目次へ戻る](textbook/index.md)\n\n';
    chapterIndex += '## この章の教材\n\n';

    for (const relative of chapterFiles) {
      const text = await readFile(path.join(chapterSourceDir, ...relative.split('/')), 'utf8');
      const title = markdownHeading(text, humanizePathName(relative));
      const href = path.posix.join(chapterSiteDir, relative);
      chapterIndex += `- [${title}](${href})\n`;
    }

    await writeFile(path.join(chapterTargetDir, 'index.md'), chapterIndex, 'utf8');
    textbookIndex += `- [${chapterTitle}](${chapterIndexHref})\n`;
    sidebar += `    - [${chapterTitle}](${chapterIndexHref})\n`;
    textbookMarkdownCount += chapterFiles.length;
    textbookChapterCount += 1;
  }

  textbookIndex += '\n';
}

await writeFile(path.join(textbookTargetDir, 'index.md'), textbookIndex, 'utf8');
sidebar += '\n';

// The Anki subsystem already has a purpose-built static HTML renderer with
// category navigation, filtering, KaTeX and curated-card selection. Reuse that
// output instead of rendering card-source Markdown through Docsify.
const ankiDistDir = path.join(root, 'anki', 'dist');
await access(path.join(ankiDistDir, 'index.html'));
await cp(ankiDistDir, path.join(outDir, 'anki'), { recursive: true });
sidebar += '- <a href="./anki/index.html" data-no-router>Ankiカード</a>\n\n';

// Textbook chapters refer to shared repository references. Include them in the
// Pages artifact so those links never fall through to a 404.
const referencesSourceDir = path.join(root, 'references');
const referencesTargetDir = path.join(outDir, 'references');
await cp(referencesSourceDir, referencesTargetDir, { recursive: true });
await orientPublishedMarkdownTree(referencesTargetDir, 'references');

await writeFile(path.join(outDir, '_sidebar.md'), sidebar, 'utf8');

console.log(`GitHub Pages site assembled at ${path.relative(root, outDir)}/`);
console.log(`Tiered Markdown links in sidebar: ${exerciseCount}`);
console.log(`Textbook: ${textbookChapterCount} chapters, ${textbookMarkdownCount} chapter Markdown files published`);
console.log('Anki: curated static HTML site published at anki/index.html');
