import { access, cp, readFile, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const execFileAsync = promisify(execFile);
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

async function git(...args) {
  const { stdout } = await execFileAsync('git', args, { cwd: root });
  return stdout.trim();
}

let revision = process.env.GITHUB_SHA || '';
if (!revision) {
  try {
    revision = await git('rev-parse', 'HEAD');
  } catch {
    revision = 'local';
  }
}

let updatedAt = '';
if (revision !== 'local') {
  try {
    updatedAt = await git('show', '-s', '--format=%cI', revision);
  } catch {
    updatedAt = '';
  }
}
if (!updatedAt) updatedAt = new Date().toISOString();

const siteMeta = {
  schemaVersion: 1,
  revision,
  updatedAt,
  builtAt: new Date().toISOString(),
};
await writeFile(
  path.join(outDir, 'site-meta.json'),
  `${JSON.stringify(siteMeta, null, 2)}\n`,
  'utf8',
);

console.log(`Service Worker assets validated and published: ${files.join(', ')}`);
console.log(`Site metadata published: ${revision.slice(0, 8)} @ ${updatedAt}`);
