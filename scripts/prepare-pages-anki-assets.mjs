import { cp, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sourceDir = path.join(root, 'node_modules', 'katex', 'dist', 'fonts');
const targetDir = path.join(root, 'anki', 'dist', 'assets', 'fonts');

await mkdir(targetDir, { recursive: true });

const fonts = (await readdir(sourceDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && /\.(?:woff2?|ttf)$/i.test(entry.name))
  .map((entry) => entry.name)
  .sort();

for (const font of fonts) {
  await cp(path.join(sourceDir, font), path.join(targetDir, font));
}

console.log(`Prepared ${fonts.length} KaTeX font files for GitHub Pages.`);
