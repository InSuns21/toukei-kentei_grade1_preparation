import { access, cp, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, '_site');
const katexDist = path.join(root, 'node_modules', 'katex', 'dist');
const targetDir = path.join(outDir, 'vendor', 'katex');

await access(outDir);
await access(path.join(katexDist, 'katex.min.js'));
await access(path.join(katexDist, 'katex.min.css'));
await mkdir(targetDir, { recursive: true });

await cp(path.join(katexDist, 'katex.min.js'), path.join(targetDir, 'katex.min.js'));
await cp(path.join(katexDist, 'katex.min.css'), path.join(targetDir, 'katex.min.css'));
await cp(path.join(katexDist, 'fonts'), path.join(targetDir, 'fonts'), { recursive: true });

const fontCount = (await readdir(path.join(targetDir, 'fonts'), { withFileTypes: true }))
  .filter((entry) => entry.isFile() && /\.(?:woff2?|ttf)$/i.test(entry.name))
  .length;

console.log(`Local KaTeX fallback published: JS, CSS, ${fontCount} font files.`);
