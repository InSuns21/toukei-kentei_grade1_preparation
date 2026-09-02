import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const scanRoots = [
  path.join(root, 'textbook'),
  path.join(root, 'statistical-mathematics'),
  path.join(root, 'applied-rikou-80'),
];

const markdownFiles = [];

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error?.code === 'ENOENT') return;
    throw error;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      markdownFiles.push(fullPath);
    }
  }
}

for (const dir of scanRoots) await walk(dir);

const violations = [];

for (const file of markdownFiles) {
  const source = await readFile(file, 'utf8');
  const lines = source.split(/\r?\n/);

  lines.forEach((line, index) => {
    // Prose comparisons such as "A vs B" must be ordinary Markdown, not TeX.
    // Keep prose out of display math so renderer-specific parsing cannot turn
    // separators or spacing into stray mathematical glyphs.
    if (/\\text\s*\{\s*vs\s*\}/i.test(line)) {
      violations.push({
        file,
        line: index + 1,
        reason: String.raw`Do not use \text{vs} inside math; write the comparison as normal Markdown prose/table/list.`,
      });
    }

    // Docsify/KaTeX can process display math before Markdown blockquote markers
    // are fully stripped.  In a construct such as
    //
    //   > $$
    //   > a \le b
    //   > $$
    //
    // the leading '>' may leak into the TeX input and render as mysterious
    // extra greater-than signs around the intended inequality.  Definitions
    // and theorems should therefore keep display math outside blockquotes.
    if (/^\s*>\s*\$\$\s*$/.test(line)) {
      violations.push({
        file,
        line: index + 1,
        reason: 'Do not put $$ display math inside a Markdown blockquote; the leading > can leak into rendered TeX.',
      });
    }
  });
}

if (violations.length) {
  console.error('Prose/math-rendering validation failed:');
  for (const violation of violations) {
    console.error(`- ${path.relative(root, violation.file)}:${violation.line}: ${violation.reason}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Prose/math-rendering validation passed: ${markdownFiles.length} Markdown files scanned.`);
}
