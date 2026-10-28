// ML I/II plan closure inventory. Not a substitute for mathematical peer review.
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { mlLabSpecs } from '../pages/simulation/ml-completion-models.mjs';

const root = process.cwd();
const preflight = process.argv.includes('--preflight');
const read = file => readFileSync(path.join(root, file), 'utf8');
const manifest = YAML.parse(read('textbook/dream-theater-series/ML.yaml'));
const expectedPlan = 'textbook/' + (preflight ? 'plans_progress' : 'plan_done') +
  '/DREAM_THEATER_MACHINE_LEARNING_I_II_PLAN.md';
assert.equal(manifest.plan, expectedPlan, 'ML manifest must route to the current plan');
assert.ok(existsSync(path.join(root, expectedPlan)));
assert.ok(!existsSync(path.join(root, 'textbook/' + (preflight ? 'plan_done' : 'plans_progress') +
  '/DREAM_THEATER_MACHINE_LEARNING_I_II_PLAN.md')), 'plan must exist in only one lifecycle directory');
const plan = read(expectedPlan);
const modes = new Map();
for (const [, id, mode] of plan.matchAll(/^\| (ML[12]-\d{2}) \| (対話|計算) \|/gm)) {
  assert.ok(!modes.has(id), 'duplicate plan mode: ' + id);
  modes.set(id, mode);
}
assert.equal(modes.size, 46);
assert.equal([...modes.values()].filter(m => m === '対話').length, 21);
assert.equal(manifest.chapters.length, 46);
const totals = { chapters: 0, proofBlocks: 0, formalAnchors: 0, exercises: 0,
  solutions: 0, interactive: 0, computational: 0 };
const seen = new Set();
for (const c of manifest.chapters) {
  assert.match(c.id, /^ML[12]-\d{2}$/);
  assert.ok(!seen.has(c.id), 'duplicate manifest chapter: ' + c.id);
  seen.add(c.id);
  assert.equal(c.status, 'completed', c.id + ' must be completed');
  assert.equal(c.path, 'textbook/volumes/dream_thater/応用系/ML/' + c.id);
  const chapter = YAML.parse(read(c.path + '/chapter.yaml'));
  const knowledge = YAML.parse(read(c.path + '/knowledge.yaml'));
  const source = read(c.path + '/index.md');
  assert.equal(chapter.id, c.id);
  assert.equal(knowledge.chapter, c.id);
  assert.ok(Array.isArray(chapter.learning_objectives) && chapter.learning_objectives.length >= 2,
    c.id + ': missing learning objectives');
  assert.ok(Array.isArray(chapter.prerequisites) && Array.isArray(knowledge.prerequisites),
    c.id + ': missing prerequisite declarations');
  assert.deepEqual(chapter.prerequisites, knowledge.prerequisites, c.id + ': inconsistent prerequisites');
  const proofs = (source.match(/<!-- proof-start -->/g) || []).length;
  const ends = (source.match(/<!-- proof-end -->/g) || []).length;
  assert.ok(proofs >= 1 && proofs === ends, c.id + ': incomplete proof blocks');
  const anchors = [...source.matchAll(/<a id="((?:def|prop|thm|lemma)-[a-z0-9-]+)"><\/a>/g)]
    .map(m => m[1]);
  assert.ok(anchors.length >= 2 && anchors.every(a => a.includes(c.id.toLowerCase())),
    c.id + ': missing stable anchors');
  const anchorSet = new Set(anchors);
  assert.equal(anchors.length, anchorSet.size, c.id + ': duplicate canonical anchor');
  for (const [, anchor] of source.matchAll(/\]\(#((?:def|prop|thm|lemma)-[a-z0-9-]+)\)/g)) {
    assert.ok(anchorSet.has(anchor), c.id + ': broken self-link ' + anchor);
  }
  const ids = new Set(source.match(/ML[12]-\d{2}-[ABC]\d{2}/g) || []);
  const scores = { A: 0, B: 0, C: 0 };
  for (const id of ids) {
    assert.ok(id.startsWith(c.id + '-'), c.id + ' has foreign exercise ID ' + id);
    scores[id.split('-')[2][0]]++;
  }
  assert.ok(scores.A >= 4 && scores.B >= 3 && scores.C >= 1,
    c.id + ': exercise lower bound not met');
  const solutions = (source.match(/<!-- solution-start -->/g) || []).length;
  assert.equal(ids.size, solutions, c.id + ': exercise/solution count mismatch');
  const links = [...source.matchAll(/simulation\/([a-z0-9-]+\.html)(?:\?chapter=(ML[12]-\d{2}))?/g)];
  const workingLinks = links.filter(([, filename, chapterId]) =>
    (!chapterId || chapterId === c.id) &&
    existsSync(path.join(root, 'pages/simulation', filename)));
  if (mlLabSpecs[c.id]) {
    assert.ok(source.includes('simulation/ml-completion.html?chapter=' + c.id),
      c.id + ': shared interactive page absent from chapter');
    assert.ok(anchorSet.has(mlLabSpecs[c.id].theory.slice(1)),
      c.id + ': interactive model points to a nonexistent theory anchor');
  }
  const python = /(?:~~~|```)python(?:-lab)?\b/.test(source);
  if (modes.get(c.id) === '対話') {
    assert.ok(workingLinks.length, c.id + ': missing implemented interactive page');
    totals.interactive++;
  } else {
    assert.ok(python || workingLinks.length, c.id + ': missing executable computation lab');
    totals.computational++;
  }
  totals.chapters++; totals.proofBlocks += proofs; totals.formalAnchors += anchors.length;
  totals.exercises += ids.size; totals.solutions += solutions;
}
assert.equal(seen.size, 46);
assert.ok(read('pages/simulation/index.html').includes('ml-completion.html?chapter=ML1-08'));
assert.ok(existsSync(path.join(root, 'pages/simulation/ml-completion-models.test.mjs')));
assert.ok(existsSync(path.join(root, 'scripts/validate-ml-completion-browser.mjs')));
console.log('ML plan completion inventory:', JSON.stringify(totals));
console.log('All 46 manifest statuses, metadata, 21 interactive/25 computational modes, proof blocks,');
console.log('canonical self-links, exercises, detailed solutions and lab paths verified.');
console.log('Reminder: inventory checks do not prove theorem/exercise correctness or browser behavior.');
