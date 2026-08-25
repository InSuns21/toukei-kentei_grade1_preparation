import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const siteDir = path.join(root, '_site');

await mkdir(siteDir, { recursive: true });
await copyFile(
  path.join(root, 'EXERCISE_GUIDELINES.md'),
  path.join(siteDir, 'EXERCISE_GUIDELINES.md'),
);

console.log('Published EXERCISE_GUIDELINES.md to GitHub Pages artifact.');
