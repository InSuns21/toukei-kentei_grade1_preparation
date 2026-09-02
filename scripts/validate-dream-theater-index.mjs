import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const facadePath = path.join(repoRoot, 'textbook', 'dream-theater.md');
const manifestPath = path.join(repoRoot, 'textbook', 'dream-theater-index.json');
const foundationsDir = path.join(repoRoot, 'textbook', 'volumes', '00_foundations');

const toPosix = (p) => p.split(path.sep).join('/');
const fail = (messages) => {
  console.error('DREAM THEATER index validation failed:');
  for (const message of messages) console.error(`- ${message}`);
  process.exit(1);
};

for (const required of [facadePath, manifestPath, foundationsDir]) {
  if (!fs.existsSync(required)) fail([`required path does not exist: ${toPosix(path.relative(repoRoot, required))}`]);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
if (!Array.isArray(manifest.sections)) fail(['manifest.sections must be an array']);

const expected = [];
const seenManifest = new Set();
const errors = [];

for (const section of manifest.sections) {
  if (!section || typeof section.name !== 'string' || !Array.isArray(section.paths)) {
    errors.push('each manifest section must have string name and array paths');
    continue;
  }
  for (const p of section.paths) {
    if (typeof p !== 'string') {
      errors.push(`non-string path in section ${section.name}`);
      continue;
    }
    if (seenManifest.has(p)) errors.push(`duplicate manifest entry: ${p}`);
    seenManifest.add(p);
    expected.push(p);
  }
}

// Every direct chapter directory under 00_foundations that has index.md belongs in the facade.
const discovered = fs.readdirSync(foundationsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(foundationsDir, entry.name, 'index.md'))
  .filter((p) => fs.existsSync(p))
  .map((p) => toPosix(path.relative(repoRoot, p)))
  .sort();

const expectedSet = new Set(expected);
const discoveredSet = new Set(discovered);

for (const p of expected) {
  if (!fs.existsSync(path.join(repoRoot, p))) errors.push(`manifest target does not exist: ${p}`);
}
for (const p of discovered) {
  if (!expectedSet.has(p)) errors.push(`foundation chapter missing from manifest/facade scope: ${p}`);
}
for (const p of expected) {
  if (!discoveredSet.has(p)) errors.push(`manifest entry is not a direct foundation chapter: ${p}`);
}

const facade = fs.readFileSync(facadePath, 'utf8');
const chapterLinkPattern = /\]\((textbook\/volumes\/00_foundations\/[^)]+\/index\.md)\)/g;
const actual = [...facade.matchAll(chapterLinkPattern)].map((m) => m[1]);
const counts = new Map();
for (const p of actual) counts.set(p, (counts.get(p) ?? 0) + 1);

for (const p of expected) {
  const count = counts.get(p) ?? 0;
  if (count === 0) errors.push(`facade is missing chapter link: ${p}`);
  if (count > 1) errors.push(`facade contains duplicate chapter link (${count}x): ${p}`);
}
for (const p of actual) {
  if (!expectedSet.has(p)) errors.push(`facade contains extra foundation chapter link: ${p}`);
}

if (actual.length === expected.length) {
  for (let i = 0; i < expected.length; i += 1) {
    if (actual[i] !== expected[i]) {
      errors.push(`facade order mismatch at position ${i + 1}: expected ${expected[i]}, got ${actual[i] ?? '<missing>'}`);
      break;
    }
  }
} else {
  errors.push(`facade chapter-link count mismatch: expected ${expected.length}, got ${actual.length}`);
}

if (errors.length) fail(errors);

console.log(`DREAM THEATER index OK: ${expected.length} chapters/roadmaps, no omissions, extras, duplicates, broken targets, or order drift.`);
