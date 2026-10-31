import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

// Advisory only: a stale branch can accidentally carry changes to chapters
// outside the chapter(s) named in the PR. Review-evidence validation remains
// the blocking gate for substantive edits.
const chapterPath = /^textbook\/volumes\/dream_thater\/[^/]+\/[^/]+\/([A-Z][A-Z0-9_-]+)\/index\.md$/;
const targetMarker = /<!--\s*DT-(?:REVIEW|FOLLOWUP-AUDIT):\s*([A-Z][A-Z0-9_-]+)(?:\s+(?:local-math|substantive))?\s*-->/g;
const extraMarker = /<!--\s*DT-SCOPE-EXTRA:\s*([^>]*?)\s*-->/g;

function declaredTargets(body) {
  return new Set([...body.matchAll(targetMarker)].map(match => match[1]));
}

function acknowledgedExtras(body) {
  const extras = new Set();
  for (const match of body.matchAll(extraMarker)) {
    for (const id of match[1].split(/[\s,、]+/).filter(Boolean)) {
      if (/^[A-Z][A-Z0-9_-]+$/.test(id)) extras.add(id);
    }
  }
  return extras;
}

function inspectScope(paths, body) {
  const changed = [...new Set(paths.map(file => file.match(chapterPath)?.[1]).filter(Boolean))].sort();
  const declared = declaredTargets(body);
  // Without an explicit chapter target, there is no reliable basis for
  // deciding whether a multi-chapter edit was unintended.
  if (declared.size === 0 || changed.length === 0) {
    return {changed, declared: [...declared].sort(), unexpected: []};
  }
  const extras = acknowledgedExtras(body);
  return {
    changed,
    declared: [...declared].sort(),
    unexpected: changed.filter(id => !declared.has(id) && !extras.has(id))
  };
}

function reviewBody() {
  if (process.env.GITHUB_EVENT_PATH) {
    const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
    return typeof event.pull_request?.body === 'string' ? event.pull_request.body : '';
  }
  return process.env.DREAM_THEATER_PR_BODY || '';
}

function changedFiles(base) {
  // NUL-separated paths preserve Japanese category names and rename safety.
  return execFileSync('git', ['diff', '--name-only', '-z', '--diff-filter=ACMR',
    base, 'HEAD', '--', 'textbook/volumes/dream_thater'], {encoding: 'utf8'})
    .split('\0').filter(Boolean);
}

function warn(message) {
  const escaped = message.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
  console.log('::warning title=DREAM THEATER PR scope::' + escaped);
}

function selfTest() {
  const h = 'textbook/volumes/dream_thater/幾何系/HOD/HOD1-07/index.md';
  const m = 'textbook/volumes/dream_thater/解析系/MICA/MICA6/index.md';
  const q = 'textbook/volumes/dream_thater/物理系/QFT/QFT25/index.md';
  const all = [h, m, q];
  const target = '<!-- DT-FOLLOWUP-AUDIT: HOD1-07 -->\n<!-- DT-REVIEW: HOD1-07 local-math -->';
  assert.deepEqual(inspectScope([h], target).unexpected, []);
  assert.deepEqual(inspectScope(all, target).unexpected, ['MICA6', 'QFT25']);
  assert.deepEqual(inspectScope(all, target + '\n<!-- DT-REVIEW: MICA6 local-math -->\n<!-- DT-REVIEW: QFT25 -->').unexpected, []);
  assert.deepEqual(inspectScope(all, target + '\n<!-- DT-SCOPE-EXTRA: MICA6, QFT25 -->').unexpected, []);
  assert.deepEqual(inspectScope(all, '').unexpected, []);
  assert.deepEqual(inspectScope(['textbook/dream-theater-toc/001.md'], target).unexpected, []);
  assert.deepEqual(inspectScope([m, m], '<!-- DT-REVIEW: MICA6 -->').changed, ['MICA6']);
  assert.deepEqual(inspectScope(all, target + '\n<!-- DT-SCOPE-EXTRA: MICA6 -->').unexpected, ['QFT25']);
  console.log('DREAM THEATER PR scope advisory self-test passed');
}

if (process.argv.includes('--self-test')) {
  selfTest();
} else {
  // This check intentionally exits 0 even when an unexpected chapter is
  // found. A warning invites review; it must never block a legitimate PR.
  try {
    const index = process.argv.indexOf('--base');
    const base = index >= 0 ? process.argv[index + 1] : process.env.TEXTBOOK_BASE_SHA;
    if (!/^[0-9a-f]{40}$/i.test(base || '')) {
      warn('Comparison base unavailable; skipped chapter-scope advisory');
    } else {
      const result = inspectScope(changedFiles(base), reviewBody());
      if (result.unexpected.length) {
        warn('PR対象 [' + result.declared.join(', ') + '] 以外の章 index.md に差分: ' +
          result.unexpected.join(', ') +
          '。意図しない混入ならブランチの差分を確認。正当な横断修正なら各章の査読記録、または理由付き DT-SCOPE-EXTRA をPR本文へ記載してください。');
      } else {
        console.log('DREAM THEATER chapter scope: no unexpected change relative to declared PR targets');
      }
    }
  } catch (error) {
    warn('Could not check chapter scope: ' + (error?.message || String(error)));
  }
}
