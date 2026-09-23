import { access, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const siteDir = path.join(root, '_site');
const facadePath = path.join(root, 'textbook', 'dream-theater.md');
const manifestPath = path.join(root, 'textbook', 'dream-theater-index.json');
const outputPath = path.join(siteDir, 'dream-theater-navigation.js');

await access(siteDir);

const [facade, manifestText] = await Promise.all([
  readFile(facadePath, 'utf8'),
  readFile(manifestPath, 'utf8'),
]);
const manifest = JSON.parse(manifestText);
const expectedPaths = manifest.sections.flatMap((section) => section.paths);
const expectedSet = new Set(expectedPaths);

const sections = [];
let currentSection = null;
let currentSubsection = null;
const parsedPaths = [];

for (const rawLine of facade.split(/\r?\n/)) {
  const line = rawLine.trim();
  const h2 = line.match(/^##\s+(.+)$/);
  if (h2) {
    currentSection = {
      title: stripNumberPrefix(h2[1]),
      links: [],
      subsections: [],
    };
    sections.push(currentSection);
    currentSubsection = null;
    continue;
  }

  const h3 = line.match(/^###\s+(.+)$/);
  if (h3 && currentSection) {
    currentSubsection = {
      title: h3[1].trim(),
      links: [],
    };
    currentSection.subsections.push(currentSubsection);
    continue;
  }

  const links = [...line.matchAll(/\[([^\]]+)\]\((textbook\/volumes\/[^)]+\/index\.md)\)/g)];
  for (const match of links) {
    const target = match[2];
    if (!expectedSet.has(target)) continue;

    const item = { title: match[1].replace(/`/g, '').trim(), target };
    if (currentSubsection) currentSubsection.links.push(item);
    else if (currentSection) currentSection.links.push(item);
    else throw new Error(`DREAM THEATER link appears before a section heading: ${target}`);
    parsedPaths.push(target);
  }
}

const filteredSections = sections
  .map((section) => ({
    ...section,
    subsections: section.subsections.filter((subsection) => subsection.links.length > 0),
  }))
  .filter((section) => section.links.length > 0 || section.subsections.length > 0);

if (parsedPaths.length !== expectedPaths.length) {
  throw new Error(
    `DREAM THEATER navigation count mismatch: manifest ${expectedPaths.length}, facade ${parsedPaths.length}`,
  );
}
for (let i = 0; i < expectedPaths.length; i += 1) {
  if (parsedPaths[i] !== expectedPaths[i]) {
    throw new Error(
      `DREAM THEATER navigation order mismatch at ${i + 1}: expected ${expectedPaths[i]}, got ${parsedPaths[i] ?? '<missing>'}`,
    );
  }
}

const routePaths = [
  'textbook/dream-theater.md',
  'textbook/dream-theater-standard-math-core.md',
  ...expectedPaths,
];
const routes = [...new Set(routePaths.map(canonicalRoute))];
const html = renderSidebar(filteredSections);
const payload = `window.DreamTheaterNavigation = ${JSON.stringify({ routes, html })};\n`;
await writeFile(outputPath, payload, 'utf8');

console.log(
  `DREAM THEATER navigation generated: ${expectedPaths.length} indexed pages across ${filteredSections.length} section(s).`,
);

function stripNumberPrefix(value) {
  return value.replace(/^\d+\.\s*/, '').trim();
}

function canonicalRoute(value) {
  return String(value)
    .replace(/^#\/?/, '')
    .replace(/^\/+/, '')
    .replace(/[?#].*$/, '')
    .replace(/\.md$/i, '')
    .replace(/\/index$/i, '')
    .replace(/\/+$/, '');
}

function routeHref(target) {
  return `#/${target.replace(/\.md$/i, '')}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderLink(item, className = '') {
  const classAttr = className ? ` class="${className}"` : '';
  const title = escapeHtml(item.title);
  return `<li><a${classAttr} data-dream-route="${escapeHtml(canonicalRoute(item.target))}" href="${escapeHtml(routeHref(item.target))}" title="${title}">${title}</a></li>`;
}

function renderSidebar(navSections) {
  const out = [
    '<div class="dream-theater-sidebar-brand">',
    '<a class="dream-theater-back-home" data-dream-route="" href="#/" title="統計検定1級ホーム">← 統計検定1級ホーム</a>',
    '<strong>DREAM THEATER</strong>',
    '<ul class="dream-theater-sidebar-primary">',
    renderLink({ title: '全体目次', target: 'textbook/dream-theater.md' }, 'dream-theater-primary-link'),
    renderLink({ title: '標準数学コア', target: 'textbook/dream-theater-standard-math-core.md' }, 'dream-theater-primary-link'),
    '</ul>',
    '</div>',
  ];

  for (const section of navSections) {
    out.push('<details class="dream-theater-nav-section">');
    out.push(`<summary title="${escapeHtml(section.title)}">${escapeHtml(section.title)}</summary>`);
    if (section.links.length > 0) {
      out.push('<ul>');
      for (const item of section.links) out.push(renderLink(item));
      out.push('</ul>');
    }
    for (const subsection of section.subsections) {
      out.push('<details class="dream-theater-nav-subsection">');
      out.push(`<summary title="${escapeHtml(subsection.title)}">${escapeHtml(subsection.title)}</summary>`);
      out.push('<ul>');
      for (const item of subsection.links) out.push(renderLink(item));
      out.push('</ul>');
      out.push('</details>');
    }
    out.push('</details>');
  }

  return out.join('');
}
