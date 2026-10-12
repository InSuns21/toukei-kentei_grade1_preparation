import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import YAML from 'yaml';

// The shared router contains configuration only; each series manifest owns progress.
function validate(root) {
  const errors = [];
  const summaries = [];
  const fail = message => errors.push(message);
  const workFile = path.join(root, 'textbook/dream-theater-work.yaml');

  function readYaml(file) {
    try {
      return YAML.parse(fs.readFileSync(file, 'utf8'));
    } catch (error) {
      fail(path.relative(root, file) + ': YAML parse failed: ' + error.message);
      return null;
    }
  }
  function localPath(relative, label) {
    if (typeof relative !== 'string' || !relative.trim()) {
      fail(label + ' must be a non-empty relative path');
      return null;
    }
    const resolved = path.resolve(root, relative);
    if (resolved === root || !resolved.startsWith(root + path.sep)) {
      fail(label + ' must stay within repository root: ' + relative);
      return null;
    }
    return resolved;
  }
  if (!fs.existsSync(workFile)) {
    fail('textbook/dream-theater-work.yaml is missing');
    return { errors, summaries };
  }
  const work = readYaml(workFile);
  if (!work) return { errors, summaries };
  if (work.version !== 2) fail('dream-theater-work.yaml: version must be 2');
  for (const key of ['active_series', 'active_plan', 'series_manifest', 'completed_through', 'next_work', 'after_next', 'review_handoff']) {
    if (Object.hasOwn(work, key)) fail('dream-theater-work.yaml: legacy singleton field forbidden: ' + key);
  }
  const routing = work.routing || {};
  const seriesDir = localPath(routing.series_directory, 'routing.series_directory');
  const chapterRoot = routing.chapter_root;
  if (typeof chapterRoot !== 'string' || !chapterRoot.trim()) fail('routing.chapter_root is required');
  if (!seriesDir || !fs.existsSync(seriesDir) || !fs.statSync(seriesDir).isDirectory()) {
    fail('routing.series_directory does not exist');
    return { errors, summaries };
  }
  const names = fs.readdirSync(seriesDir).filter(name => name.endsWith('.yaml')).sort();
  if (!names.length) fail('no series manifests in routing.series_directory');
  const globalIds = new Set();
  for (const name of names) {
    const series = readYaml(path.join(seriesDir, name));
    if (!series) continue;
    const label = name + ': ';
    if (!/^[A-Z][A-Z0-9_-]*\.yaml$/.test(name)) fail(label + 'invalid filename');
    if (series.id !== name.slice(0, -5)) fail(label + 'manifest ID must match filename');
    // In the move-only transition, existing series and migrated series may
    // temporarily use different roots. A categorized path must end at the
    // stable chapter ID, not a guessed long directory name.
    const categorizedRoot = 'textbook/volumes/dream_thater';
    if (series.chapter_root !== chapterRoot && series.chapter_root !== categorizedRoot) {
      fail(label + 'chapter_root differs from supported DREAM THEATER routing roots');
    }
    const planPath = localPath(series.plan, label + 'plan');
    if (planPath && !fs.existsSync(planPath)) fail(label + 'plan missing: ' + series.plan);
    if (!Array.isArray(series.chapters) || !series.chapters.length) {
      fail(label + 'chapters must be nonempty');
      continue;
    }
    let firstPlanned = -1;
    let completedThrough = null;
    const ids = new Set();
    for (const [i, chapter] of series.chapters.entries()) {
      const id = chapter?.id;
      if (typeof id !== 'string' || !id.trim() || ids.has(id)) {
        fail(label + 'missing or duplicate chapter ID at position ' + i);
        continue;
      }
      ids.add(id);
      if (globalIds.has(id)) fail(label + 'duplicate chapter ID across series: ' + id);
      globalIds.add(id);
      if (!['planned', 'completed'].includes(chapter.status)) {
        fail(label + id + ': unsupported status ' + chapter.status);
      } else if (chapter.status === 'planned') {
        if (firstPlanned < 0) firstPlanned = i;
      } else {
        if (firstPlanned >= 0) fail(label + id + ': completed chapter follows a planned chapter');
        completedThrough = id;
        const completedPath = localPath(chapter.path, label + id + '.path');
        if (completedPath && !fs.existsSync(completedPath)) fail(label + id + ': chapter path missing: ' + chapter.path);
      }
      const legacyPath = 'textbook/volumes/00_foundations/' + id;
      const categorizedParts = typeof chapter.path === 'string' ? chapter.path.split('/') : [];
      const categorizedPath = categorizedParts.length === 6 &&
        categorizedParts.slice(0, 3).join('/') === categorizedRoot &&
        categorizedParts[3].trim() !== '' && categorizedParts[4] === series.id && categorizedParts[5] === id;
      if ((chapterRoot === categorizedRoot && !categorizedPath) ||
          (chapterRoot !== categorizedRoot && chapter.path !== legacyPath && !categorizedPath)) {
        fail(label + id + ': chapter path does not match legacy or category/course/ID layout');
      }
    }
    const next = firstPlanned >= 0 ? series.chapters[firstPlanned].id : null;
    const afterNext = firstPlanned >= 0 ? series.chapters[firstPlanned + 1]?.id ?? null : null;
    if (next && series.plan?.startsWith('textbook/plan_done/')) {
      fail(label + 'unfinished series points to plan_done');
    }
    if (next && planPath && fs.existsSync(planPath)) {
      const plan = fs.readFileSync(planPath, 'utf8');
      if (!plan.includes(next)) fail(label + 'plan does not mention next chapter ' + next);
    }
    summaries.push({ id: series.id || name, completedThrough, next, afterNext });
  }
  return { errors, summaries };
}

function selfTest() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'dt-series-router-'));
  const write = (file, content) => {
    const full = path.join(root, file);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
  };
  const manifest = (id, statuses, plan) => YAML.stringify({
    version: 1, id, title: id, plan,
    chapter_root: 'textbook/volumes/00_foundations',
    chapters: statuses.map((status, i) => ({
      id: id + (i + 1),
      path: 'textbook/volumes/00_foundations/' + id + (i + 1),
      status, title: id + (i + 1)
    }))
  });
  try {
    write('textbook/dream-theater-work.yaml', YAML.stringify({
      version: 2, routing: {
        series_directory: 'textbook/dream-theater-series',
        chapter_root: 'textbook/volumes/00_foundations'
      }
    }));
    write('textbook/dream-theater-series/A.yaml', manifest('A', ['completed', 'planned'], 'textbook/plans_progress/A.md'));
    write('textbook/dream-theater-series/B.yaml', manifest('B', ['completed'], 'textbook/plan_done/B.md'));
    write('textbook/plans_progress/A.md', '### A2\n');
    write('textbook/plan_done/B.md', '# B\n');
    fs.mkdirSync(path.join(root, 'textbook/volumes/00_foundations/A1'), { recursive: true });
    fs.mkdirSync(path.join(root, 'textbook/volumes/00_foundations/B1'), { recursive: true });
    const first = validate(root);
    assert.deepEqual(first.errors, []);
    assert.deepEqual(first.summaries.map(s => [s.id, s.completedThrough, s.next, s.afterNext]),
      [['A', 'A1', 'A2', null], ['B', 'B1', null, null]]);
    // During the category migration a series may be moved before the shared
    // routing is switched. Both completed and planned paths must validate.
    const nestedA = YAML.parse(fs.readFileSync(path.join(root, 'textbook/dream-theater-series/A.yaml'), 'utf8'));
    nestedA.chapter_root = 'textbook/volumes/dream_thater';
    for (const ch of nestedA.chapters) {
      ch.path = 'textbook/volumes/dream_thater/解析系/A/' + ch.id;
    }
    fs.mkdirSync(path.join(root, nestedA.chapters[0].path), { recursive: true });
    write('textbook/dream-theater-series/A.yaml', YAML.stringify(nestedA));
    assert.deepEqual(validate(root).errors, [], 'categorized chapter paths must validate during migration');
    write('textbook/dream-theater-series/A.yaml', manifest('A', ['completed', 'planned'], 'textbook/plans_progress/A.md'));
    // Advance series A; series B and shared routing must remain unchanged.
    fs.mkdirSync(path.join(root, 'textbook/volumes/00_foundations/A2'), { recursive: true });
    write('textbook/dream-theater-series/A.yaml', manifest('A', ['completed', 'completed'], 'textbook/plan_done/A.md'));
    write('textbook/plan_done/A.md', '# A\n');
    const advanced = validate(root);
    assert.deepEqual(advanced.errors, []);
    assert.equal(advanced.summaries.find(s => s.id === 'B').completedThrough, 'B1');
    assert.equal(advanced.summaries.find(s => s.id === 'A').next, null);
    write('textbook/dream-theater-series/A.yaml', manifest('A', ['planned', 'completed'], 'textbook/plans_progress/A.md'));
    assert(validate(root).errors.some(e => e.includes('completed chapter follows a planned chapter')));
    write('textbook/dream-theater-series/A.yaml', manifest('A', ['completed', 'completed'], 'textbook/plan_done/A.md'));
    const currentWork = fs.readFileSync(path.join(root, 'textbook/dream-theater-work.yaml'), 'utf8');
    write('textbook/dream-theater-work.yaml', currentWork + 'active_series: A\n');
    assert(validate(root).errors.some(e => e.includes('legacy singleton field')));
    console.log('DREAM THEATER multi-series router self-test passed');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}
if (process.argv.includes('--self-test')) {
  selfTest();
} else {
  const { errors, summaries } = validate(process.cwd());
  if (errors.length) {
    console.error('DREAM THEATER work-state validation failed with ' + errors.length + ' issue(s):');
    errors.forEach(e => console.error('- ' + e));
    process.exit(1);
  }
  console.log('DREAM THEATER series router consistent (' + summaries.length + ' series):');
  for (const { id, completedThrough, next, afterNext } of summaries) {
    console.log('- ' + id + ': completed through ' + (completedThrough || '<none>') +
      ' / next ' + (next || '<series complete>') +
      (afterNext ? ' / after ' + afterNext : ''));
  }
}
