import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const siteDir = path.join(root, '_site');

const sharedGuidelines = [
  'CONTENT_GUIDELINES.md',
  'EXERCISE_GUIDELINES.md',
];

await mkdir(siteDir, { recursive: true });
for (const file of sharedGuidelines) {
  await copyFile(
    path.join(root, file),
    path.join(siteDir, file),
  );
}

console.log(`Published shared guidelines to GitHub Pages artifact: ${sharedGuidelines.join(', ')}`);
