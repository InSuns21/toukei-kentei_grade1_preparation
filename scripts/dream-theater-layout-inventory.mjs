import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

// R0: read-only inventory. This script must never move or edit a chapter.
const root = process.cwd();
const oldRoot = 'textbook/volumes/00_foundations';
const newRoot = 'textbook/volumes/dream_thater';
const manifestPath = 'textbook/dream-theater-index.json';
const seriesDir = 'textbook/dream-theater-series';
const expectedCategories = [
  '基礎科目', '基礎論系', '解析系', '計算系',
  '幾何系', '代数系', '応用系', '物理系',
];
const flags = new Set(process.argv.slice(2));
const allowedFlags = new Set(['--json', '--strict', '--help']);
for (const flag of flags) {
  if (!allowedFlags.has(flag)) {
    console.error('Unknown argument: ' + flag);
    process.exit(2);
  }
}
if (flags.has('--help')) {
  console.log('Usage: node scripts/dream-theater-layout-inventory.mjs [--json] [--strict]');
  process.exit(0);
}

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8');
}
function exists(relative) {
  return fs.existsSync(path.join(root, relative));
}
function slash(value) {
  return value.split(path.sep).join('/');
}
function fail(errors, message) {
  errors.push(message);
}
function normalizeId(value) {
  if (typeof value !== 'string') return null;
  const id = value.trim();
  return /^[A-Za-z][A-Za-z0-9_-]*$/.test(id) ? id : null;
}

const errors = [];
const sourceIndex = JSON.parse(read(manifestPath));
if (!Array.isArray(sourceIndex.sections)) throw Error('Invalid sections in ' + manifestPath);
const actualCategories = sourceIndex.sections.map(section => section.name);
if (JSON.stringify(actualCategories) !== JSON.stringify(expectedCategories)) {
  fail(errors, 'Category names or order changed; review classification against the published index.');
}
const entries = [];
const seenSources = new Set();
const seenIds = new Map();
const seenTargets = new Map();

for (const section of sourceIndex.sections) {
  if (!Array.isArray(section.paths)) {
    fail(errors, 'Missing paths array in section ' + section.name);
    continue;
  }
  for (const indexedPath of section.paths) {
    if (typeof indexedPath !== 'string' ||
        !indexedPath.startsWith(oldRoot + '/') ||
        !indexedPath.endsWith('/index.md')) {
      fail(errors, 'Unexpected indexed chapter path: ' + indexedPath);
      continue;
    }
    if (seenSources.has(indexedPath)) {
      fail(errors, 'Duplicate source path in index: ' + indexedPath);
      continue;
    }
    seenSources.add(indexedPath);
    const directory = path.posix.dirname(indexedPath);
    const chapterYaml = directory + '/chapter.yaml';
    if (!exists(indexedPath)) {
      fail(errors, 'Missing index.md: ' + indexedPath);
      continue;
    }
    if (!exists(chapterYaml)) {
      fail(errors, 'Missing chapter.yaml: ' + chapterYaml);
      continue;
    }
    let metadata;
    try {
      metadata = YAML.parse(read(chapterYaml));
    } catch (error) {
      fail(errors, chapterYaml + ': YAML parse error: ' + error.message);
      continue;
    }
    const id = normalizeId(metadata?.id);
    if (!id) {
      fail(errors, chapterYaml + ': invalid or missing chapter ID');
      continue;
    }
    if (seenIds.has(id)) {
      fail(errors, 'Duplicate chapter ID ' + id + ' in ' + seenIds.get(id) + ' and ' + directory);
    }
    seenIds.set(id, directory);
    const target = newRoot + '/' + section.name + '/' + id;
    if (seenTargets.has(target)) {
      fail(errors, 'Destination collision: ' + target);
    }
    seenTargets.set(target, directory);
    if (exists(target)) {
      fail(errors, 'Destination already exists: ' + target);
    }
    entries.push({
      id, category: section.name, source: directory,
      destination: target,
      index_before: indexedPath, index_after: target + '/index.md',
      directory_renamed: path.posix.basename(directory) !== id,
    });
  }
}

const byId = new Map(entries.map(entry => [entry.id, entry.category]));
const series = [];
if (!exists(seriesDir)) {
  fail(errors, 'Missing series directory: ' + seriesDir);
} else {
  for (const name of fs.readdirSync(path.join(root, seriesDir)).filter(name => name.endsWith('.yaml')).sort()) {
    const manifestFile = seriesDir + '/' + name;
    let seriesData;
    try {
      seriesData = YAML.parse(read(manifestFile));
    } catch (error) {
      fail(errors, manifestFile + ': YAML parse error: ' + error.message);
      continue;
    }
    const chapters = Array.isArray(seriesData?.chapters) ? seriesData.chapters : [];
    const categories = [...new Set(chapters.map(chapter => byId.get(chapter?.id)).filter(Boolean))];
    const future = chapters.filter(chapter => !byId.has(chapter?.id)).map(chapter => chapter.id);
    series.push({
      id: seriesData?.id ?? name.replace(/\.yaml$/, ''),
      category: categories.length === 1 ? categories[0] : null,
      categories,
      future_count: future.length,
      unresolved: categories.length !== 1 ? future : [],
    });
  }
}

const categoryCounts = Object.fromEntries(expectedCategories.map(category => [
  category, entries.filter(entry => entry.category === category).length,
]));
const unresolvedSeries = series.filter(item => item.unresolved.length);
const report = {
  source: manifestPath,
  old_root: oldRoot,
  new_root: newRoot,
  indexed_paths: sourceIndex.sections.reduce((sum, section) => sum + (section.paths?.length ?? 0), 0),
  matched_chapters: entries.length,
  rename_count: entries.filter(entry => entry.directory_renamed).length,
  category_counts: categoryCounts,
  series_total: series.length,
  future_series_needing_manual_classification: unresolvedSeries,
  errors,
  mapping: entries,
};

if (flags.has('--json')) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log('DREAM THEATER category migration R0 inventory (read-only)');
  console.log('Indexed: ' + report.indexed_paths + ', verified: ' + entries.length);
  console.log('Directories that need ID renaming: ' + report.rename_count);
  for (const [category, count] of Object.entries(categoryCounts)) {
    console.log('  ' + category + ': ' + count);
  }
  console.log('Series manifests: ' + series.length);
  if (unresolvedSeries.length) {
    console.log('Series with chapters needing explicit category selection:');
    for (const item of unresolvedSeries) {
      console.log('  ' + item.id + ': ' + item.unresolved.join(', '));
    }
  }
  if (errors.length) {
    console.error('Pre-migration problems (' + errors.length + '):');
    for (const error of errors) console.error('  - ' + error);
  } else {
    console.log('Pre-migration source and destination checks: OK');
  }
}
if (flags.has('--strict') && errors.length) process.exitCode = 1;
