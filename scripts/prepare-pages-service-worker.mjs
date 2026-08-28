import { access, cp, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const pagesDir = path.join(root, 'pages');
const outDir = path.join(root, '_site');
const files = ['service-worker.js', 'sw-config.js'];

await access(outDir);

for (const file of files) {
  const sourcePath = path.join(pagesDir, file);
  const source = await readFile(sourcePath, 'utf8');

  // Parse the browser script during CI without executing Service Worker APIs.
  // This catches syntax errors before the Pages artifact is uploaded.
  new Function(source);

  await cp(sourcePath, path.join(outDir, file));
}

console.log(`Service Worker assets validated and published: ${files.join(', ')}`);
